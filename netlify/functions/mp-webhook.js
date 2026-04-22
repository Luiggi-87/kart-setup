const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

exports.handler = async (event) => {
  // Mercado Pago envia POST com query params: topic e id
  const { topic, id, type } = event.queryStringParameters || {};

  // Aceita tanto IPN clássico (topic=preapproval) quanto Webhooks v2 (type=subscription_preapproval)
  const isSubscriptionEvent =
    topic === 'preapproval' ||
    type === 'subscription_preapproval' ||
    type === 'subscription_authorized_payment';

  if (!isSubscriptionEvent) {
    return { statusCode: 200, body: 'ignored' };
  }

  // Verificar assinatura HMAC (Webhooks v2)
  const xSignature = event.headers['x-signature'];
  const xRequestId = event.headers['x-request-id'];
  if (xSignature && process.env.MP_WEBHOOK_SECRET) {
    if (!verifySignature(event, xSignature, xRequestId, id)) {
      console.warn('Assinatura MP inválida — ignorando');
      return { statusCode: 401, body: 'Invalid signature' };
    }
  }

  const resourceId = id || (JSON.parse(event.body || '{}').data?.id);
  if (!resourceId) {
    return { statusCode: 400, body: 'ID de recurso ausente' };
  }

  // Buscar detalhes da assinatura na API do MP (nunca confiar no payload bruto)
  let subscription;
  try {
    const mpRes = await fetch(`https://api.mercadopago.com/preapproval/${resourceId}`, {
      headers: { 'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}` },
    });
    subscription = await mpRes.json();
  } catch (err) {
    console.error('Erro ao buscar assinatura no MP:', err);
    return { statusCode: 500, body: 'Erro ao consultar MP' };
  }

  if (!subscription || !subscription.external_reference) {
    console.warn('Assinatura sem external_reference:', subscription?.id);
    return { statusCode: 200, body: 'sem referência de usuário' };
  }

  const userId = subscription.external_reference; // Supabase user ID
  const mpStatus = subscription.status; // authorized | paused | cancelled | pending

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  let subscriptionStatus;
  let periodEnd = null;

  switch (mpStatus) {
    case 'authorized':
      subscriptionStatus = 'active';
      periodEnd = subscription.next_payment_date
        || new Date(Date.now() + 31 * 24 * 60 * 60 * 1000).toISOString();
      break;
    case 'paused':
      subscriptionStatus = 'active'; // Mantém acesso durante pausa
      break;
    case 'cancelled':
      subscriptionStatus = 'cancelled';
      break;
    default:
      subscriptionStatus = 'inactive';
  }

  const updatePayload = {
    subscription_status: subscriptionStatus,
    subscription_id: resourceId,
    updated_at: new Date().toISOString(),
  };
  if (periodEnd) updatePayload.current_period_end = periodEnd;

  const { error: dbError } = await supabase
    .from('profiles')
    .update(updatePayload)
    .eq('id', userId);

  if (dbError) {
    console.error('Erro ao atualizar profile no Supabase:', dbError);
    return { statusCode: 500, body: 'Erro ao atualizar banco de dados' };
  }

  console.log(`Assinatura ${resourceId} → usuário ${userId}: ${mpStatus} → ${subscriptionStatus}`);
  return { statusCode: 200, body: 'ok' };
};

function verifySignature(event, xSignature, xRequestId, dataId) {
  try {
    const parts = Object.fromEntries(
      xSignature.split(',').map(p => p.trim().split('='))
    );
    const ts = parts.ts;
    const v1 = parts.v1;
    if (!ts || !v1) return false;

    const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;
    const expected = crypto
      .createHmac('sha256', process.env.MP_WEBHOOK_SECRET)
      .update(manifest)
      .digest('hex');

    return expected === v1;
  } catch {
    return false;
  }
}
