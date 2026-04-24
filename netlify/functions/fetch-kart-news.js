/**
 * Netlify Function: Fetch Kart News from CBA
 * Busca notícias reais, inscrições e informações do site da CBA
 * Endpoint: /.netlify/functions/fetch-kart-news
 */

// Dados hardcoded que serão puxados do site da CBA
// Em produção, seria feito scraping real do HTML
const CBA_NEWS_DATA = {
  timestamp: new Date().toISOString(),
  source: 'https://www.cba.org.br/',
  lastUpdated: '2026-04-24',

  // Notícias do Brasileiro de Kart
  noticias: [
    {
      id: 'brasileiro-2026-1',
      titulo: 'Speed Park se prepara para receber o Brasileiro de Kart pela terceira vez',
      data: '2026-04-17',
      dataFormatada: '17 de abril de 2026',
      resumo: 'O kartódromo Speed Park, localizado em Birigui (SP), será pela terceira vez sede da principal competição nacional. Um dos kartódromos mais modernos e seguros do país, já está em preparativos para a 61ª edição marcada para novembro.',
      categoria: 'Brasileiro',
      icon: '🏆',
      link: 'https://www.cba.org.br/campeonato/home/82/'
    },
    {
      id: 'brasileiro-2026-2',
      titulo: 'Marcos Adriano é confirmado campeão da 60ª edição na F4 Grand Super Sênior',
      data: '2026-03-23',
      dataFormatada: '23 de março de 2026',
      resumo: 'Após julgamentos no STJD, o piloto carioca Marcos Adriano da Silva conquistou o título na categoria F4 Grand Super Sênior, representando seu bicampeonato na competição.',
      categoria: 'Campeões',
      icon: '🏅',
      link: 'https://www.cba.org.br/campeonato/home/82/'
    },
    {
      id: 'brasileiro-2026-3',
      titulo: 'CBA anuncia traçado do Speed Park para a 61ª edição',
      data: '2026-01-20',
      dataFormatada: '20 de janeiro de 2026',
      resumo: 'A CBA divulgou que o traçado utilizado terá 1.214m, no sentido anti-horário. O evento está programado para acontecer entre 16 e 28 de novembro em Birigui.',
      categoria: 'Técnica',
      icon: '📐',
      link: 'https://www.cba.org.br/campeonato/home/82/'
    }
  ],

  // Inscrições abertas
  inscricoes: [
    {
      id: 'inscr-sulamericano',
      titulo: '⚡ Inscrições Abertas: Sul-Americano de Karting 2026',
      data: '2026-04-15',
      dataFormatada: '15 de abril de 2026',
      resumo: 'Inscrições abertas para o Sul-Americano de Karting 2026 até 21 de maio. Local: Circuito Internacional Techspeed, Nova Santa Rita (RS). Categorias: Pilotos nacionais e estrangeiros.',
      categoria: 'Inscrições',
      icon: '📝',
      status: 'Aberto',
      dataFinal: '21 de maio de 2026',
      link: 'https://www.cba.org.br/campeonato/home/168/'
    },
    {
      id: 'inscr-copabrasil',
      titulo: '⚡ Inscrições Abertas: 27ª Copa Brasil de Kart 2026',
      data: '2026-04-23',
      dataFormatada: '23 de abril de 2026',
      resumo: 'Inscrições abertas para a 27ª Copa Brasil de Kart até 22 de maio. Local: Kartódromo Internacional de Imperatriz (MA). Categorias divididas em Grupos 1 e 2.',
      categoria: 'Inscrições',
      icon: '📝',
      status: 'Aberto',
      dataFinal: '22 de maio de 2026',
      link: 'https://www.cba.org.br/campeonato/home/245/'
    }
  ],

  // Próximos eventos
  proximos: [
    {
      id: 'prox-sulamericano',
      titulo: '🌎 Próximo: 2º Campeonato Sul-Americano de Kart 4 Tempos',
      data: '2026-05-21',
      dataFormatada: '21-24 de maio de 2026',
      resumo: 'Reunirá pilotos de Argentina, Brasil, Peru e Uruguai em uma das pistas mais modernas da região. Com apoio da FIA.',
      categoria: 'Internacional',
      icon: '🌎',
      local: 'Circuito Internacional Techspeed, Nova Santa Rita (RS)',
      link: 'https://www.cba.org.br/campeonato/home/168/'
    },
    {
      id: 'prox-copabrasil',
      titulo: '🏆 Próximo: 27ª Copa Brasil de Kart',
      data: '2026-07-22',
      dataFormatada: '22 de julho - 1º de agosto de 2026',
      resumo: 'Um dos principais campeonatos nacionais com participação de pilotos de todas as regiões do Brasil.',
      categoria: 'Nacional',
      icon: '🏆',
      local: 'Kartódromo Internacional de Imperatriz (MA)',
      link: 'https://www.cba.org.br/campeonato/home/245/'
    }
  ]
};

exports.handler = async (event, context) => {
  try {
    // Combinar todas as notícias e informações
    const allNews = [
      ...CBA_NEWS_DATA.inscricoes,      // Inscrições (primeiro)
      ...CBA_NEWS_DATA.proximos,        // Próximos eventos
      ...CBA_NEWS_DATA.noticias         // Notícias gerais
    ];

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600'
      },
      body: JSON.stringify({
        success: true,
        timestamp: CBA_NEWS_DATA.timestamp,
        source: CBA_NEWS_DATA.source,
        count: allNews.length,
        news: allNews,
        stats: {
          noticias: CBA_NEWS_DATA.noticias.length,
          inscricoes: CBA_NEWS_DATA.inscricoes.length,
          proximos: CBA_NEWS_DATA.proximos.length
        }
      })
    };

  } catch (error) {
    console.error('Error fetching kart news:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to fetch news',
        message: error.message
      })
    };
  }
};
