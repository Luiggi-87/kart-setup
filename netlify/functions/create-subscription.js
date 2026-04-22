const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  // Apenas GET é necessário (browser redireciona para cá)
  const corsHeaders = {
    'Access-Control-Allow-Origin': process.env.SITE_URL || '*',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  // Extrair token do header Authorization
  const authHeader = event.headers['authorization'] || event.headers['Authorization'] || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();

  if (!token) {
    return { statusCode: 401, headers: corsHeaders, body: JSON.stringify({ error: 'Token não fornecido' }) };
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  // Verificar usuário pelo token
  const { data: { user }, error: userError } = await supabase.auth.getUser(token);
  if (userError || !user) {
    return { statusCode: 401, headers: corsHeaders, body: JSON.stringify({ error: 'Token inválido' }) };
  }

  // Criar pre-approval no Mercado Pago
  try {
    const mpRes = await fetch('https://api.mercadopago.com/preapproval', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        preapproval_plan_id: process.env.MP_PLAN_ID,
        payer_email: user.email,
        back_url: `${process.env.SITE_URL}/app.html?payment=success`,
        external_reference: user.id,
        auto_recurring: {
          frequency: 1,
          frequency_type: 'months',
          transaction_amount: 49.00,
          currency_id: 'BRL',
          free_trial: {
            frequency: 7,
            frequency_type: 'days',
          },
        },
      }),
    });

    const mpData = await mpRes.json();

    if (!mpData.init_point) {
      console.error('MP response sem init_point:', mpData);
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Erro ao criar assinatura no Mercado Pago', detail: mpData }),
      };
    }

    // Salvar subscription_id e marcar como trial no Supabase
    const trialEnd = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    await supabase.from('profiles').update({
      subscription_id: mpData.id,
      subscription_status: 'trial',
      trial_ends_at: trialEnd,
      updated_at: new Date().toISOString(),
    }).eq('id', user.id);

    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ checkout_url: mpData.init_point }),
    };

  } catch (err) {
    console.error('Erro ao chamar Mercado Pago:', err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Erro interno ao criar assinatura' }),
    };
  }
};
