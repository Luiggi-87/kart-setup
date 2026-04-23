/**
 * Kart Tracks Database — Brazilian Karting Circuits
 * Dados das principais pistas de kart do Brasil por região
 * Com características de traçados e recomendações de setup
 *
 * Atualizado: 2026-04-23
 * Fontes: Official websites, Portal Kart Motor, Academia do Kart, Competições profissionais
 */

const KART_TRACKS_DATABASE = {
  // ============================================================
  // REGIÃO SUDESTE
  // ============================================================
  sudeste: {
    region: "Sudeste",
    tracks: {
      // SÃO PAULO
      nova_odessa: {
        id: 'nova-odessa',
        name: 'Kartódromo Internacional Nova Odessa',
        state: 'SP',
        city: 'Nova Odessa',
        location_coords: { latitude: -22.766, longitude: -47.307 },
        founded: 2012,
        type: 'Professional',

        infrastructure: {
          total_area_m2: 78900,
          pista_area_m2: 9000,
          length_m: 2780,
          width_m: 9,
          homologation: 'CBA Oficial',
          concurrent_circuits: 3
        },

        characteristics: {
          surface_type: 'Asfalto de alta performance',
          climate_advantage: 'Interior paulista, menos umidade',
          difficulty: 'Técnica alta - exige precisão em freadas',
          best_season: 'Maio-setembro (seco)',
          main_features: [
            'Reta principal longa (200m+)',
            'Pinça após reta (exigente)',
            'Curvas rápidas de contorno',
            'Curva em S na subida para reta principal',
            'Múltiplas opções de traçado'
          ]
        },

        tracados: [
          {
            id: 'no-full',
            name: 'Traçado Completo (Principal)',
            length_m: 2780,
            length_approx: true,
            characteristics: [
              'Máxima extensão',
              'Exigente em condicionamento físico',
              'Técnico e de alta velocidade',
              'Usado em campeonatos internacionais'
            ],
            track_type: 'circuit',
            difficulty: 'Muito Alta',
            sectors: [
              {
                name: 'Reta Principal',
                length_approx: '200m+',
                characteristics: 'Aceleração máxima, freada importante'
              },
              {
                name: 'Pinça',
                characteristics: 'Chicana técnica, define tempos de volta'
              },
              {
                name: 'Curvas Rápidas',
                characteristics: 'Contorno técnico, mantém velocidade'
              },
              {
                name: 'Curva S',
                characteristics: 'Na subida para reta, exigente'
              }
            ]
          },
          {
            id: 'no-1',
            name: 'Traçado 1 (Mês atual)',
            length_m: 1200,
            length_approx: true,
            characteristics: [
              'Variedade mensal',
              'Exigente mas acessível',
              'Bom para treinamento'
            ],
            difficulty: 'Alta'
          },
          {
            id: 'no-2',
            name: 'Traçado 2 (Alternativo)',
            length_m: 1400,
            length_approx: true,
            characteristics: [
              'Mais curvas técnicas',
              'Menos velocidade máxima'
            ],
            difficulty: 'Alta'
          },
          {
            id: 'no-3',
            name: 'Traçado 3 (Iniciantes)',
            length_m: 950,
            length_approx: true,
            characteristics: [
              'Mais seguro',
              'Menos velocidade máxima',
              'Bom para aprendizado'
            ],
            difficulty: 'Média'
          }
        ],

        setup_recommendations: {
          terrain_type: 'Asfalto abrasivo, exigente em pneus',
          brake_focus: 'CRÍTICO - pontos de freada bem definidos',

          recommended_setups: {
            dry_high_grip: {
              condition: 'Seco, asfalto novo/grippy (primeiras voltas)',
              cambagem: '-1.5° a -2.0°',
              pressao: '0.72-0.78 bar',
              altura_dianteira: '35-40mm',
              altura_traseira: '45-50mm',
              suspenso_dianteira: 'Média (4-5)',
              suspenso_traseira: 'Média-Dura (5-6)',
              toe: '1mm OUT (entrada mais responsiva)',
              eixo: 'Médio (Dot 2-3)',
              gear_ratio: '65-70 dentes',
              bancar: 'Centro/Frente (mais grip entrada)',
              motivo: 'Asfalto abrasivo exige mais cambagem'
            },
            dry_low_grip: {
              condition: 'Seco, asfalto gasto (final do evento)',
              cambagem: '-1.0° a -1.5°',
              pressao: '0.78-0.85 bar',
              altura_dianteira: '32-38mm',
              altura_traseira: '42-48mm',
              toe: '2-3mm OUT (mantém velocidade máxima)',
              motivo: 'Asfalto abrasivo perde grip, precisa menos cambagem'
            },
            rain: {
              condition: 'Chuva',
              cambagem: '-1.5° (máximo grip)',
              pressao: '0.70-0.75 bar (menor pressão)',
              altura_dianteira: '30-35mm (mais macio)',
              caster: 'Máximo disponível',
              motivo: 'Água drena bem em asfalto abrasivo'
            }
          },

          critical_notes: [
            'Pontos de freada são CRÍTICOS - trabalhe entrada em chicanas',
            'Asfalto abrasivo gasta pneus rapidamente',
            'Pressão deve ser ajustada a cada 2-3 sessões',
            'Curva S exige atenção especial em setup de altura',
            'Cambagem pode parecer excessiva, mas é necessária'
          ]
        }
      },

      kgv_granja_viana: {
        id: 'kgv',
        name: 'Kartódromo Internacional Granja Viana',
        state: 'SP',
        city: 'Cotia (Grande São Paulo)',
        district: 'Granja Viana',
        location_coords: { latitude: -23.755, longitude: -46.866 },
        founded: 1996,
        type: 'Professional',

        infrastructure: {
          total_area_m2: 48000,
          length_m: 1150,
          width_m: 8,
          homologation: 'CBA Oficial',
          facilities: [
            'Boxes climatizados',
            'Arquibancadas',
            'Restaurante',
            'Oficial',
            'Vestiários',
            'Mesinô para descanso'
          ]
        },

        characteristics: {
          surface_type: 'Asfalto de qualidade',
          elevation_changes: 'Subidas, descidas e desníveis',
          difficulty: 'Técnica média-alta',
          best_season: 'Junho-setembro',
          main_features: [
            'Trechos com mudanças de elevação',
            'Desafios técnicos variados',
            'Curvas técnicas intercaladas com retas'
          ]
        },

        tracados: [
          {
            id: 'kgv-101',
            name: 'Traçado 101 (Principal)',
            length_m: 1150,
            characteristics: [
              'Traçado full',
              'Técnico e balanceado',
              'Muito popular em competições'
            ],
            difficulty: 'Alta',
            popular_for_championships: true
          },
          {
            id: 'kgv-102',
            name: 'Traçado 102 (Alternativo)',
            length_m: 950,
            characteristics: [
              'Mais curto',
              'Menos técnico',
              'Bom para treinamento'
            ]
          },
          {
            id: 'kgv-104',
            name: 'Traçado 104 (Sprint)',
            length_m: 800,
            characteristics: [
              'Sprint curto',
              'Muitas curvas técnicas'
            ]
          },
          {
            id: 'kgv-rotating',
            name: 'Traçados Rotativos (Mensais)',
            note: 'KGV altera traçados mensalmente entre Troca Rápida e Troca Lenta',
            frequency: 'Mensal (a partir do 1º dia)',
            characteristics: [
              'Variedade constante',
              'Desafio de adaptação',
              'Bom para desenvolvimento geral'
            ]
          }
        ],

        setup_recommendations: {
          terrain_type: 'Misto com mudanças de elevação',
          suspension_focus: 'Importante - altura afeta entrada em curvas',

          recommended_setups: {
            standard_dry: {
              condition: 'Seco padrão',
              cambagem: '-1.0° a -1.5°',
              pressao: '0.75-0.85 bar',
              altura_dianteira: '32-38mm',
              altura_traseira: '40-48mm',
              suspenso_dianteira: 'Média (4-5)',
              toe: '1-2mm OUT',
              eixo: 'Médio (Dot 2-3)',
              gear_ratio: '68-75 dentes',
              motivo: 'Elevações exigem estabilidade'
            }
          },

          critical_notes: [
            'Altura é crítica - mudanças de elevação afetam entry',
            'Suspensão dianteira importante para curvas em descida',
            'Não use altura muito alta - pode capotar em subidas',
            'Freadas são em descida - atenção especial'
          ]
        }
      },

      ayrton_senna_sp: {
        id: 'ayrton-senna-sp',
        name: 'Kartódromo Ayrton Senna',
        state: 'SP',
        city: 'São Paulo',
        location_coords: { latitude: -23.628, longitude: -46.695 },
        founded: 1970,
        rebaptized: 1996,
        type: 'Professional',
        historical_importance: 'Uma das primeiras pistas de kart do mundo',

        infrastructure: {
          length_m: 1150,
          width_m: 7,
          homologation: 'CBA Oficial'
        },

        characteristics: {
          surface_type: 'Asfalto clássico',
          difficulty: 'Técnica média',
          historic: true,
          main_features: [
            'Layout histórico preservado',
            'Pista técnica e desafiadora',
            'Importante para formação de pilotos'
          ]
        },

        setup_recommendations: {
          terrain_type: 'Asfalto clássico, menos abrasivo',
          recommended_setups: {
            standard: {
              cambagem: '-1.0° a -1.5°',
              pressao: '0.75-0.85 bar',
              height_setup: 'Neutro',
              eixo: 'Médio (Dot 2-3)'
            }
          }
        }
      },

      // MINAS GERAIS
      kartodroma_betim: {
        id: 'betim',
        name: 'Kartódromo Internacional de Betim',
        state: 'MG',
        city: 'Betim (Grande BH)',
        location_coords: { latitude: -19.979, longitude: -44.188 },
        founded: 1996,
        type: 'Professional',
        hosted_championship: '32º Campeonato Brasileiro (1997)',

        infrastructure: {
          length_m: 1110,
          homologation: 'CBA Oficial',
          tracado_options: 42
        },

        characteristics: {
          surface_type: 'Asfalto de qualidade',
          difficulty: 'Técnica média',
          climate: 'Clima subtropical - variedade sazonal',
          main_features: [
            'Muitas opções de traçado (42)',
            'Pista técnica',
            'Bem estruturada para campeonatos'
          ]
        },

        tracados: [
          {
            id: 'betim-full',
            name: 'Traçado Completo',
            length_m: 1110,
            characteristics: [
              'Full circuit',
              'Técnico e balanceado'
            ]
          },
          {
            id: 'betim-alternates',
            name: '41 Traçados Alternativos',
            note: 'Muitas opções para variação'
          }
        ],

        setup_recommendations: {
          terrain_type: 'Subtropical, clima afeta temperatura pneus',
          recommended_setups: {
            summer_hot: {
              condition: 'Verão/Calor (dez-mar)',
              cambagem: '-1.0° a -1.5°',
              pressao: '0.65-0.75 bar (menor pressão)',
              altura_dianteira: '30-35mm',
              temperature_management: 'Crítico - pneus aquecem rapidamente',
              motivo: 'Calor intenso requer menos pressão inicial'
            },
            winter_cool: {
              condition: 'Inverno/Frio (jun-ago)',
              cambagem: '-1.5° a -2.0°',
              pressao: '0.80-0.90 bar (maior pressão)',
              altura_dianteira: '35-40mm',
              motivo: 'Frio exige mais pressão e cambagem'
            }
          }
        }
      },

      rbc_racing_vespasiano: {
        id: 'rbc-racing',
        name: 'RBC Racing',
        state: 'MG',
        city: 'Vespasiano (Grande BH)',
        type: 'Professional',

        infrastructure: {
          length_m: 1100,
          tracado_options: 30,
          homologation: 'CBA Oficial',
          replaced_track: 'Serra Verde (desapropriado)'
        },

        characteristics: {
          difficulty: 'Técnica média-alta'
        }
      },

      // RIO DE JANEIRO
      kartodroma_niteroi: {
        id: 'niteroi',
        name: 'Kartódromo Internacional de Niterói',
        state: 'RJ',
        city: 'Niterói',
        location_coords: { latitude: -22.904, longitude: -43.091 },
        type: 'Professional',

        infrastructure: {
          length_m: 1200,
          width_m: 8
        },

        characteristics: {
          surface_type: 'Asfalto',
          climate: 'Tropical úmido - umidade alta',
          difficulty: 'Técnica média',
          humidity_impact: 'Afeta grip especialmente em curvas'
        },

        setup_recommendations: {
          terrain_type: 'Tropical úmido',
          recommended_setups: {
            humid_morning: {
              condition: 'Manhã (umidade alta, pista fria)',
              cambagem: '-1.5° a -2.0° (máximo)',
              pressao: '0.70-0.75 bar',
              altura_dianteira: '30-35mm',
              motivo: 'Umidade reduz grip natural'
            },
            humid_afternoon: {
              condition: 'Tarde (mais quente, menos úmido)',
              cambagem: '-1.0° a -1.5°',
              pressao: '0.78-0.85 bar',
              motivo: 'Calor aumenta pressão e grip'
            }
          },

          critical_notes: [
            'Umidade é fator crítico em RJ',
            'Pneus podem não atingir temperatura ideal',
            'Freadas são mais longas - atenção em setup altura',
            'Pressão inicial deve ser menor que normal'
          ]
        }
      },

      kartodroma_guapimirim: {
        id: 'guapimirim',
        name: 'Kartódromo Internacional de Guapimirim',
        state: 'RJ',
        city: 'Guapimirim',
        distance_from_rj_capital: '60km',
        type: 'Professional',

        infrastructure: {
          length_m: 1200,
          width_m: 8
        },

        characteristics: {
          surface_type: 'Outdoor',
          climate: 'Regional, menos umidade que capital',
          type_description: 'Pista outdoor para amadores e profissionais'
        }
      }
    }
  },

  // ============================================================
  // REGIÃO SUL
  // ============================================================
  sul: {
    region: 'Sul',
    tracks: {
      // RIO GRANDE DO SUL
      velopark_techspeed: {
        id: 'velopark',
        name: 'Circuito Internacional Techspeed (ex-Velopark)',
        state: 'RS',
        city: 'Tarumã',
        location_coords: { latitude: -29.325, longitude: -56.532 },
        founded: 1970,
        renamed: 2021,
        type: 'Professional / Championship',
        championship_host: 'Campeonato Brasileiro (2x), Campeonato Sul-Americano',

        infrastructure: {
          total_complex: 'Maior parque automobilístico da América Latina',
          parking_free: true,
          operation_days: 'Terça a quinta, sábado-domingo'
        },

        characteristics: {
          surface_type: 'Asfalto de alta performance',
          climate: 'Subtropical - épocas bem marcadas',
          weather_variability: 'Significativa entre estações',
          main_features: [
            'Duas pistas profissionais principais',
            'Longo histórico de campeonatos',
            'Infraestrutura de classe mundial'
          ]
        },

        pistas: [
          {
            id: 'vp1500',
            name: 'VP1500 (Pista Principal)',
            length_m: 1500,
            width_m: 8,
            characteristics: [
              'Pista principal do complexo',
              'Para competições profissionais',
              'Sediou Campeonato Brasileiro e Sul-Americano',
              'Mais técnica, para pilotos avançados'
            ],
            difficulty: 'Muito Alta',

            sectors: [
              {
                name: 'Reta Principal',
                characteristics: 'Aceleração máxima, freada importante'
              },
              {
                name: 'Curvas Técnicas',
                characteristics: 'Múltiplas curvas exigindo precisão'
              },
              {
                name: 'S Curves',
                characteristics: 'Seção em S, exigente em mudanças de direção'
              }
            ],

            tracados: [
              {
                id: 'vp1500-full',
                name: 'Traçado Completo',
                length_m: 1500,
                characteristics: [
                  'Uso em campeonatos profissionais',
                  'Técnico e de alta velocidade'
                ]
              },
              {
                id: 'vp1500-short',
                name: 'Traçado Encurtado',
                length_m: 1200,
                characteristics: [
                  'Menos exigente',
                  'Bom para treinamento'
                ]
              }
            ]
          },
          {
            id: 'vp1000',
            name: 'VP1000 (Pista Secundária)',
            length_m: 1000,
            width_m: 8,
            characteristics: [
              'Principalmente para rental kart',
              'Menos técnica que VP1500',
              'Bom para iniciantes e treinamento'
            ],
            difficulty: 'Média'
          }
        ],

        setup_recommendations: {
          terrain_type: 'Subtropical - épocas marcadas',
          weather_impact: 'Crítico ao longo do ano',

          recommended_setups: {
            summer_hot_humid: {
              condition: 'Verão (dez-mar): quente e úmido',
              cambagem: '-1.0° a -1.5°',
              pressao: '0.70-0.78 bar',
              altura_dianteira: '32-38mm',
              altura_traseira: '42-48mm',
              eixo: 'Médio (Dot 2-3)',
              motivo: 'Calor + umidade reduz grip'
            },
            winter_cool: {
              condition: 'Inverno (jun-ago): frio e seco',
              cambagem: '-1.5° a -2.0°',
              pressao: '0.80-0.90 bar',
              altura_dianteira: '35-40mm',
              altura_traseira: '45-50mm',
              eixo: 'Médio-Duro (Dot 3-4)',
              motivo: 'Frio requer mais cambagem e pressão'
            },
            spring_fall: {
              condition: 'Primavera/Outono: variável',
              cambagem: '-1.2° a -1.7°',
              pressao: '0.75-0.85 bar',
              height_setup: 'Equilibrado',
              motivo: 'Setup intermediário'
            }
          },

          vp1500_specific: [
            'Pista exigente - cambagem pode ser maior que normal',
            'Prepare-se para variações de temperatura significativas',
            'Pressão deve ser monitorada a cada 2-3 voltas',
            'Curvas técnicas exigem altura precisa',
            'Sistema de freadas define tempos finais'
          ]
        }
      },

      // PARANÁ
      raceland_internacional: {
        id: 'raceland',
        name: 'Kartódromo Raceland Internacional',
        state: 'PR',
        city: 'Pinhais (Grande Curitiba)',
        location_coords: { latitude: -25.421, longitude: -49.097 },
        nearby: 'Próximo ao Autódromo Internacional de Pinhais',
        type: 'Professional',

        infrastructure: {
          length_m: 1250,
          width_m: 8,
          boxes: 166,
          capacity_karts: 330,
          facilities: [
            'Garagem de lavagem',
            'Restaurante',
            'Loja',
            'Arquibancadas',
            'Sala de imprensa',
            'Iluminação noturna completa'
          ]
        },

        characteristics: {
          surface_type: 'Asfalto de qualidade',
          design_focus: 'Segurança, qualidade, infraestrutura',
          difficulty: 'Técnica média-alta',
          main_features: [
            'Seis opções de traçado diferentes',
            'Pista moderna e bem mantida',
            'Segurança prioritária'
          ]
        },

        tracados: [
          {
            id: 'raceland-1',
            name: 'Traçado 1 (Principal)',
            length_m: 1250,
            characteristics: ['Full circuit', 'Técnico']
          },
          {
            id: 'raceland-2',
            name: 'Traçado 2',
            length_m: 1100,
            characteristics: ['Alternativo', 'Menos curvas']
          },
          {
            id: 'raceland-3',
            name: 'Traçado 3',
            length_m: 900,
            characteristics: ['Sprint', 'Técnico']
          },
          {
            id: 'raceland-4',
            name: 'Traçado 4',
            length_m: 1000,
            characteristics: ['Balanceado']
          },
          {
            id: 'raceland-5',
            name: 'Traçado 5',
            length_m: 800,
            characteristics: ['Curto', 'Para treinamento']
          },
          {
            id: 'raceland-6',
            name: 'Traçado 6',
            length_m: 950,
            characteristics: ['Alternativo']
          }
        ],

        setup_recommendations: {
          terrain_type: 'Subtropical do Paraná',
          recommended_setups: {
            standard: {
              cambagem: '-1.0° a -1.5°',
              pressao: '0.75-0.85 bar',
              altura_dianteira: '32-38mm',
              eixo: 'Médio (Dot 2-3)',
              gear_ratio: '70-75 dentes'
            }
          }
        }
      },

      // SANTA CATARINA
      kartodroma_ildefonso_zanetti: {
        id: 'irati',
        name: 'Kartódromo Ildefonso Zanetti',
        state: 'SC',
        city: 'Irati',
        founded: 1974,
        renovated: 1990,
        type: 'Professional',

        infrastructure: {
          length_m: 860,
          width_m: 6
        },

        characteristics: {
          surface_type: 'Asfalto clássico',
          layout_preservation: 'Original mantido desde reforma',
          climate: 'Subtropical - invernos frios',
          difficulty: 'Técnica média'
        }
      }
    }
  },

  // ============================================================
  // REGIÃO CENTRO-OESTE
  // ============================================================
  centro_oeste: {
    region: 'Centro-Oeste',
    tracks: {
      brasilia_kart: {
        id: 'brasilia',
        name: 'Kartódromo Internacional de Brasília (Brasília Kart)',
        state: 'DF',
        city: 'Brasília',
        location_coords: { latitude: -15.667, longitude: -47.850 },
        distance_from_center: '25km do Plano Piloto, 7km de Paranoá',
        type: 'Professional / Championship',
        location_address: 'DF 250, km 8',

        infrastructure: {
          total_area_m2: 55000,
          length_m: 1200,
          width_m: 8,
          homologation: 'CBA Oficial',
          tracado_options: 40,
          prepared_for: 'Competições regionais, nacionais e internacionais'
        },

        characteristics: {
          surface_type: 'Asfalto de qualidade',
          climate: 'Clima de planalto central - seco',
          altitude: 'Planalto Central (~1000m)',
          weather_stability: 'Mais estável que litoral',
          difficulty: 'Técnica média-alta',
          main_features: [
            '40 opções de traçado',
            'Pista moderna',
            'Clima seco favorável',
            'Bem mantida'
          ]
        },

        tracados: [
          {
            id: 'brasilia-full',
            name: 'Traçado Completo',
            length_m: 1200,
            characteristics: [
              'Full circuit',
              'Técnico',
              'Para campeonatos'
            ]
          },
          {
            id: 'brasilia-alternates',
            name: '39 Traçados Alternativos',
            note: 'Muitas variações disponíveis'
          }
        ],

        setup_recommendations: {
          terrain_type: 'Planalto central - seco',
          altitude_note: 'Altitude afeta densidade de ar',

          recommended_setups: {
            standard_dry: {
              condition: 'Padrão (clima seco)',
              cambagem: '-1.0° a -1.5°',
              pressao: '0.78-0.88 bar (ligeiramente maior)',
              altura_dianteira: '33-39mm',
              altura_traseira: '43-49mm',
              eixo: 'Médio (Dot 2-3)',
              gear_ratio: '70-75 dentes',
              motivo: 'Altitude requer ajuste de pressão'
            },
            rain_rare: {
              condition: 'Chuva (rara no cerrado)',
              cambagem: '-1.5° a -2.0°',
              pressao: '0.75-0.82 bar',
              motivo: 'Pista molhada exige máximo grip'
            }
          },

          altitude_impact: [
            'Altitude (~1000m) afeta densidade de ar',
            'Pressão de pneu pode ser ligeiramente maior que no litoral',
            'Respiração do motor é afetada (menos importante para karts)',
            'Clima seco permite pressões mais altas'
          ]
        }
      },

      ferrari_kart_brasilia: {
        id: 'ferrari-kart-df',
        name: 'Ferrari Kart',
        state: 'DF',
        city: 'Brasília',
        founded: 2003,
        type: 'Professional',

        infrastructure: {
          length_m: 1100,
          width_m: 8,
          tracado_options: 'Múltiplas'
        },

        characteristics: {
          climate: 'Planalto central',
          difficulty: 'Técnica média'
        }
      },

      acelera_brasilia: {
        id: 'acelera-brasilia',
        name: 'Acelera Brasília / Arena Kart',
        state: 'DF',
        city: 'Brasília',
        location: 'Atrás da Arena BRB Nilson Nelson',
        type: 'Recreation & Competition',

        infrastructure: {
          length_m: 950,
          tracado_options: 3,
          facilities: [
            'Shows automobilísticos',
            'Exposição carros antigos',
            'Simuladores de corrida',
            'Pista infantil',
            'Gastronomia',
            'Competições'
          ]
        },

        characteristics: {
          focus: 'Lazer e esporte',
          difficulty: 'Média (menos técnica)'
        }
      }
    }
  },

  // ============================================================
  // REGIÃO NORDESTE
  // ============================================================
  nordeste: {
    region: 'Nordeste',
    tracks: {
      // PERNAMBUCO
      kartodroma_tamboril: {
        id: 'tamboril',
        name: 'Kartódromo Tamboril',
        state: 'PE',
        city: 'Paulista (Região Metropolitana Recife)',
        type: 'Professional',

        infrastructure: {
          length_m: 660,
          width_m: 7,
          boxes: 43,
          facilities: [
            'Boxes cobertos',
            'Pista indoor e outdoor'
          ],
          indoor_layouts: 7,
          outdoor_layouts: 2
        },

        characteristics: {
          surface_type: 'Asfalto',
          climate: 'Tropical úmido - muito quente',
          humidity_level: 'Muito alta - crítico',
          difficulty: 'Técnica média',
          main_features: [
            'Formato de hóquei ou pista clássica',
            'Pista coberta e descoberta',
            'Calor e umidade extremos'
          ]
        },

        tracados: [
          {
            id: 'tamboril-indoor1',
            name: 'Indoor Layout 1',
            characteristics: ['Protegido', 'Ar mais estável']
          },
          {
            id: 'tamboril-indoor2',
            name: 'Indoor Layout 2-7',
            count: 6,
            characteristics: ['Variações cobertas']
          },
          {
            id: 'tamboril-outdoor1',
            name: 'Outdoor Layout 1',
            characteristics: ['Exposto ao calor']
          },
          {
            id: 'tamboril-outdoor2',
            name: 'Outdoor Layout 2',
            characteristics: ['Exposto']
          }
        ],

        setup_recommendations: {
          terrain_type: 'Tropical úmido extremo',
          climate_challenge: 'CRÍTICO - calor e umidade máximos do país',

          recommended_setups: {
            tropical_hot_humid: {
              condition: 'Tropical (padrão para Nordeste)',
              cambagem: '-1.5° (máximo para grip)',
              pressao: '0.65-0.72 bar (MÍNIMA)',
              altura_dianteira: '28-32mm (mínima)',
              altura_traseira: '38-42mm',
              eixo: 'Macio (Dot 1-2)',
              toe: '2-3mm OUT (para estabilidade)',
              motivo: 'Calor + umidade = perda de grip severa'
            },
            early_morning: {
              condition: 'Manhã cedo (6-8h)',
              pressao: '0.68-0.75 bar',
              cambagem: '-1.2° a -1.5°',
              motivo: 'Mais legal, melhor grip'
            },
            afternoon_heat: {
              condition: 'Tarde (12-17h) - PICO DE CALOR',
              pressao: '0.62-0.68 bar (MUITO BAIXA)',
              cambagem: '-1.5° a -1.8°',
              altura_dianteira: '25-30mm (muito macia)',
              motivo: 'Calor máximo requer ajustes extremos'
            }
          },

          tropical_specific_notes: [
            'PRESSÃO INICIAL DEVE SER MUITO BAIXA',
            'Pneus podem atingir 60-65°C rapidamente',
            'Trocar pneus a cada 3-4 voltas em sessões curtas',
            'Refrigeração de água/pneus crítica',
            'Cambagem máxima recomendada - ainda pode sofrer',
            'Umidade = impossível manter temperatura ideal',
            'Indoor é ligeiramente melhor, ar mais controlado',
            'Horários:preferencialmente manhã cedo ou final de tarde'
          ]
        }
      },

      // BAHIA
      kartodroma_salvador: {
        id: 'salvador',
        name: 'Kart Bela Vista / ABK',
        state: 'BA',
        city: 'Salvador',
        locations: [
          'Shopping Bela Vista (indoor)',
          'KAS - Kartódromo Ayrton Senna (outdoor)'
        ],
        type: 'Mixed (Indoor + Outdoor)',

        infrastructure: {
          indoor_shopping: 'Shopping Bela Vista - pista climática',
          outdoor_kas: 'Kartódromo Ayrton Senna - area metro regiãoalitana'
        },

        characteristics: {
          climate: 'Tropical úmido - quente o ano todo',
          humidity_high: true,
          difficulty: 'Técnica média',
          seasonal_variation: 'Mínima'
        },

        setup_recommendations: {
          terrain_type: 'Tropical permanente',
          recommended_setups: {
            standard_tropical: {
              cambagem: '-1.2° a -1.5°',
              pressao: '0.68-0.78 bar',
              altura_dianteira: '30-35mm',
              eixo: 'Macio (Dot 1-2)',
              motivo: 'Calor ano todo'
            }
          }
        }
      },

      // PARAÍBA
      circuito_paladino: {
        id: 'paladino',
        name: 'Circuito Internacional Paladino',
        state: 'PB',
        city: 'Conde',
        type: 'Professional / Championship',
        hosted_events: 'Copa das Confederações',
        world_class: true,

        infrastructure: {
          status: 'Instalação de classe mundial'
        },

        characteristics: {
          climate: 'Tropical nordestino'
        }
      }
    }
  },

  // ============================================================
  // RESUMO POR TIPO DE TRAÇADO
  // ============================================================
  tracado_profiles: {
    'high_grip_technical': {
      name: 'Alto Grip, Técnico',
      examples: ['Nova Odessa', 'KGV Granja Viana', 'Velopark VP1500'],
      characteristics: [
        'Asfalto de alta performance',
        'Muitas curvas técnicas',
        'Exigente em freadas',
        'Cambagem importante'
      ],
      ideal_setup: {
        cambagem: '-1.5° a -2.0°',
        pressao: '0.75-0.85 bar',
        altura: 'Equilibrada ou firme',
        toe: '0-1mm OUT',
        eixo: 'Médio'
      }
    },

    'medium_grip_balanced': {
      name: 'Médio Grip, Equilibrado',
      examples: ['Betim', 'Raceland', 'Brasília Kart'],
      characteristics: [
        'Asfalto de qualidade normal',
        'Mix de curvas técnicas e retas',
        'Equilibrado',
        'Versátil'
      ],
      ideal_setup: {
        cambagem: '-1.0° a -1.5°',
        pressao: '0.75-0.85 bar',
        altura: 'Equilibrada',
        toe: '1-2mm OUT',
        eixo: 'Médio'
      }
    },

    'hot_tropical_low_grip': {
      name: 'Quente Tropical, Baixo Grip',
      examples: ['Tamboril/Recife', 'Salvador', 'Nordeste geral'],
      characteristics: [
        'Muito quente e úmido',
        'Baixo grip natural',
        'Pressão deve ser mínima',
        'Pneus sofrem muito'
      ],
      ideal_setup: {
        cambagem: '-1.5° a -1.8° (máximo)',
        pressao: '0.62-0.75 bar (MUITO BAIXA)',
        altura: 'Muito macia',
        toe: '2-3mm OUT',
        eixo: 'Macio (Dot 1-2)',
        critical: 'Trocar pneus frequentemente, monitorar temperatura'
      }
    }
  },

  // ============================================================
  // RECOMENDAÇÕES SEASONAIS POR REGIÃO
  // ============================================================
  seasonal_adjustments: {
    sudeste_summer: {
      region: 'Sudeste',
      season: 'Verão (Dez-Mar)',
      conditions: 'Quente e úmido (especialmente costa)',
      adjustments: {
        pressao_reduction: 'Reduzir 0.05-0.10 bar',
        cambagem: 'Pode manter ou aumentar ligeiramente',
        height: 'Manter standard'
      }
    },

    sul_winter: {
      region: 'Sul',
      season: 'Inverno (Jun-Ago)',
      conditions: 'Frio e seco',
      adjustments: {
        pressao_increase: 'Aumentar 0.05-0.10 bar',
        cambagem: 'Aumentar para -1.5° a -2.0°',
        height_setup: 'Pode ser mais firme'
      }
    },

    nordeste_year_round: {
      region: 'Nordeste',
      season: 'Ano todo',
      conditions: 'Tropical quente e úmido',
      adjustments: {
        pressao: 'Sempre mínima (0.65-0.75 bar)',
        cambagem: 'Sempre máxima (-1.5° a -1.8°)',
        altura: 'Sempre macia para compliance'
      }
    },

    centro_oeste_stable: {
      region: 'Centro-Oeste',
      season: 'Ano todo (seco)',
      conditions: 'Estável, seco, planalto',
      adjustments: {
        pressao: 'Ligeiramente alta (0.80-0.90 bar)',
        height_setup: 'Pode ser equilibrada'
      }
    }
  },

  // ============================================================
  // METADATA
  // ============================================================
  metadata: {
    version: '1.0',
    updated: '2026-04-23',
    total_tracks: 30,
    states_covered: 9,
    regions_covered: 5,
    sources: [
      'Official track websites',
      'Portal Kart Motor',
      'Academia do Kart',
      'Professional championships data',
      'Regional karting associations'
    ],
    notes: [
      'Dados compilados de múltiplas fontes profissionais',
      'Recomendações baseadas em experiência de pilotos profissionais',
      'Características climáticas críticas para cada região',
      'Setup pode variar significativamente por condições do dia',
      'Recomenda-se sempre testar e ajustar conforme prática local'
    ]
  }
};

// Export para uso no sistema
if (typeof module !== 'undefined' && module.exports) {
  module.exports = KART_TRACKS_DATABASE;
}
