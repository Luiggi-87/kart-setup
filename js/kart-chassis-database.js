/**
 * Kart Chassis Database — Professional Reference Data
 * Compiled from FIA Karting regulations, manufacturer specifications,
 * and professional racing data (2024-2026)
 *
 * Sources:
 * - CRG Technical Documentation
 * - OTK/Tony Kart/Kosmic Setup Guides
 * - Birel ART Technical Specs
 * - Praga Kart Specifications
 * - FIA Karting Regulations
 * - Professional Racing Teams Data
 */

const KART_CHASSIS_DATABASE = {
  // ========================================
  // MANUFACTURERS
  // ========================================

  manufacturers: {
    crg: {
      name: 'CRG',
      country: 'Italy',
      established: 1986,
      championships: 'Most world championships by significant margin',
      characteristics: 'Versatile, works well in long races, medium grip',
      recommended_axle: 'Type N (medium)',
      best_for: ['OK', 'KZ', 'KZ2', 'Shifter'],
      pros: ['Excellent support', 'Proven performance', 'Easy tuning'],
      cons: ['Higher price point'],
      references: ['CRG Setup Manual 2024']
    },

    otk: {
      name: 'OTK Group',
      country: 'Italy',
      established: 1992,
      brands: ['Tony Kart', 'Kosmic', 'Exprit', 'FA Kart', 'EOS', 'Redspeed'],
      characteristics: 'Sharp front-end response, strong mid-corner rotation',
      recommended_axle: 'Type N (medium) standard',
      best_for: ['Rotax', 'OK', 'TaG', 'KZ'],
      pros: ['Massive aftermarket support', 'Multiple brand options', 'Outstanding performance'],
      cons: ['Can be nervous on entry'],
      references: ['OTK Setup Guide', 'Tony Kart Technical Docs']
    },

    birel_art: {
      name: 'Birel ART',
      country: 'Italy',
      established: 1955,
      characteristics: 'Forgiving setup window, predictable balance, medium-grip circuits',
      recommended_axle: 'Standard configuration',
      best_for: ['Briggs LO206', 'Rotax', 'OK', 'Cadet'],
      pros: ['Adjustable caster/camber', 'Predictable handling', 'Excellent for learning'],
      cons: ['Less sharp than competitors'],
      ccs_system: {
        description: 'Camber Caster System (CCS)',
        camber_range: '±2°',
        caster_range: '±2°',
        height_adjustment: '12-14mm'
      },
      references: ['Birel ART Technical Documentation 2026']
    },

    praga: {
      name: 'Praga Kart',
      country: 'Czech Republic',
      established: 1990,
      characteristics: 'Reliable, good grip characteristics, adjustable systems',
      recommended_pressure: '15-17 PSI',
      ccs_system: {
        description: 'Camber Caster System (CCS)',
        camber_range: '-2° to +2° per wheel (upper bushing)',
        caster_range: '-2° to +2° additional',
        height_adjustment: 'Center of gravity tuning'
      },
      references: ['Praga Setup Guide', 'IPK Documentation']
    },

    kosmic: {
      name: 'Kosmic Kart',
      country: 'Italy',
      brand_group: 'OTK Group',
      tube_diameter: '30mm chrome molybdenum',
      characteristics: 'Proven geometry, balance between rigidity and precision',
      best_for: ['OK', 'KF'],
      suspension_setup: {
        front_torsion_bar: 'Flat steel standard (replaceable)',
        rear_torsion_bar: '470mm blade configuration',
        seat_struts: '1-2 per side',
        axle_standard: 'OTK Type N (medium)'
      },
      references: ['Kosmic Setup Manual']
    },

    parolin: {
      name: 'Parolin',
      country: 'Italy',
      established: 1986,
      tube_diameter: '28mm',
      characteristics: 'Adaptable to all grip conditions, many adjustments',
      best_for: ['OK', 'OKJ', 'KF'],
      models: ['Le Mans', 'Laguna'],
      references: ['Parolin Technical Specs 2026']
    },

    exprit: {
      name: 'Exprit',
      country: 'Italy',
      brand_group: 'OTK Group',
      characteristics: 'Sharp handling, competitive performance',
      best_for: ['OK', 'KZ', 'Rotax'],
      references: ['OTK Setup Guide']
    },

    dr: {
      name: 'DR',
      country: 'Italy',
      brand_group: 'CRG based',
      characteristics: 'Same as CRG with different graphics',
      recommended_axle: 'CRG Type N',
      best_for: ['OK', 'KZ', 'Sprint Racing'],
      features: ['Sniper front end adjustments'],
      references: ['CRG Setup Manual']
    }
  },

  // ========================================
  // TIRE SPECIFICATIONS
  // ========================================

  tires: {
    manufacturers: {
      vega: {
        name: 'Vega',
        country: 'Italy',
        homologated: true,
        compounds: {
          vah_red: {
            type: 'Slick - Medium',
            grip: 'High',
            wear: 'Minimal',
            best_for: 'Club racing, all conditions',
            optimal_pressure_bar: '0.75-0.85'
          },
          vah_blue: {
            type: 'Slick - Soft',
            grip: 'Very High',
            wear: 'Moderate',
            best_for: 'Cold track, low grip',
            optimal_pressure_bar: '0.70-0.80'
          },
          vah_yellow: {
            type: 'Slick - Hard',
            grip: 'Medium',
            wear: 'Low',
            best_for: 'Hot track, high grip',
            optimal_pressure_bar: '0.80-0.90'
          },
          vah_rain: {
            type: 'Wet',
            grip: 'High (wet)',
            best_for: 'Rain conditions',
            optimal_pressure_bar: '0.65-0.75'
          }
        },
        references: ['Vega USA Technical Data']
      },

      bridgestone: {
        name: 'Bridgestone',
        country: 'Japan',
        characteristics: 'Long life, high grip',
        compounds: {
          standard: {
            grip: 'High',
            wear: 'Low',
            best_for: 'General racing'
          }
        }
      }
    },

    pressure_guidelines: {
      cold_pressure: '0.65-0.70 bar',
      race_pressure: '0.75-0.85 bar',
      hot_pressure: '1.0-1.05 bar (can increase 0.2-0.3 bar during run)',

      by_condition: {
        low_grip: {
          description: 'Cold track, new asphalt',
          pressure: '0.65-0.70 bar',
          reason: 'Higher pressure helps tire heat up faster'
        },

        medium_grip: {
          description: 'Standard dry conditions',
          pressure: '0.75-0.85 bar',
          reason: 'Optimal balance for most tracks'
        },

        high_grip: {
          description: 'Hot track, worn rubber',
          pressure: '0.45-0.60 bar',
          reason: 'Lower pressure prevents overheating'
        },

        rain: {
          description: 'Wet conditions',
          pressure: '0.65-0.75 bar',
          reason: 'Slightly higher than dry for water displacement'
        }
      },

      pressure_adjustment_effects: {
        too_high: ['Center tread runs hot', 'Overheating', 'Reduced grip', 'Understeer tendency'],
        too_low: ['Shoulder wear increases', 'Overheating', 'Unpredictable', 'Oversteer tendency'],
        correct: ['Even wear pattern', 'Optimal grip', 'Predictable handling', 'Consistent performance']
      }
    }
  },

  // ========================================
  // RACING CATEGORIES
  // ========================================

  categories: {
    cadet: {
      age_range: '8-12 years',
      weight_minimum_kg: 97,
      weight_minimum_lbs: 215,
      chassis_wheelbase_mm: '900-950',
      chassis_width_max_mm: 1270,
      tube_diameter_mm: '28-30',
      engine_type: 'Rotax 125 Mini Max or equivalent',
      max_speed_kmh: 80,

      setup_recommendations: {
        camber: '-0.5° to -1.5°',
        caster: '4-6°',
        toe: '0-2mm out',
        pressure: '0.65-0.75 bar',
        seat_position: 'Forward for more front grip',
        axle_hardness: 'Soft to medium (lighter weight)',
        suspension: 'Light setup to reduce power absorption'
      },

      chassis_popular: ['CRG KF1', 'Kosmic', 'Birel ART K1', 'Parolin Laguna'],
      references: ['FIA Cadet Category Regs', 'KartClass']
    },

    junior: {
      age_range: '12-15 years',
      weight_minimum_kg: 141,
      weight_minimum_lbs: 310,
      chassis_wheelbase_mm: '1000-1010',
      chassis_width_max_mm: 1400,
      tube_diameter_mm: '28-30',
      engine_type: 'Rotax 125 Junior Max or equivalent',
      max_speed_kmh: 110,

      setup_recommendations: {
        camber: '-1.0° to -1.5°',
        caster: '5-7°',
        toe: '0-3mm out',
        pressure: '0.70-0.80 bar',
        seat_position: 'Slightly back for balance',
        axle_hardness: 'Medium',
        suspension: 'Balanced setup'
      },

      chassis_popular: ['CRG', 'Tony Kart', 'Kosmic', 'Birel ART'],
      references: ['FIA Junior Category Regs']
    },

    ok_senior: {
      age_range: '15+ years (no upper limit)',
      weight_minimum_kg: 150,
      weight_minimum_lbs: 330,
      chassis_wheelbase_mm: '1010-1050',
      chassis_width_max_mm: 1400,
      tube_diameter_mm: '30-32',
      engine_type: '125cc direct-coupled water-cooled 2-stroke',

      engine_specs: {
        displacement: '125cc',
        cooling: 'Water-cooled',
        coupling: 'Direct coupled (no gearbox)',
        max_rpm: '16,000',
        eliminations: ['No front brake', 'No electric starter', 'No battery', 'No clutch']
      },

      brake_system: 'Single rear hydraulic brake',

      setup_recommendations: {
        camber: '-1.0° to -1.5°',
        caster: '6-8°',
        toe: '0-3mm',
        pressure: '0.75-0.85 bar',
        seat_position: 'Back for more rear grip',
        axle_hardness: 'Medium (allows free-up)',
        suspension: 'Light setup (prevent sticking)',
        note: 'OK sticks less, needs light setup to avoid losing acceleration'
      },

      chassis_characteristics: {
        tube_diameter: '30mm (less grip than KZ)',
        trait: 'Slides freely, requires light setup',
        grip_strategy: 'Avoid maximum grip to prevent sticking'
      },

      chassis_popular: ['CRG', 'Tony Kart', 'Kosmic', 'Birel ART', 'Parolin'],
      references: ['FIA OK Category Regs 2024-2026']
    },

    kz_shifter: {
      age_range: '15+ years (no upper limit)',
      weight_minimum_kg: 170,
      weight_minimum_lbs: 375,
      chassis_wheelbase_mm: '1010-1050',
      chassis_width_max_mm: 1400,
      tube_diameter_mm: '32',
      engine_type: '125cc water-cooled 2-stroke with 6-speed gearbox',

      engine_specs: {
        displacement: '125cc',
        cooling: 'Water-cooled',
        gearbox: '6-speed sequential mechanical',
        clutch: 'Manual',
        max_rpm: '16,000',
        horsepower: '52 hp (approx)',
        power_delivery: 'Torque-rich, aggressive acceleration'
      },

      brake_system: 'Front and rear hydraulic brakes',

      setup_recommendations: {
        camber: '-1.0° to -2.0°',
        caster: '6-8°',
        toe: '0-2mm',
        pressure: '0.75-0.90 bar',
        seat_position: 'Centered for weight transfer',
        axle_hardness: 'Medium to hard (more grip needed)',
        suspension: 'Stiffer setup for torque transfer',
        note: 'KZ needs greater grip to transfer torque - requires stiffer setup than OK'
      },

      chassis_characteristics: {
        tube_diameter: '32mm (stiffer than OK)',
        trait: 'Needs grip to transfer power',
        grip_strategy: 'Maximize grip setup'
      },

      chassis_popular: ['CRG', 'Tony Kart', 'Kosmic', 'Birel ART', 'Exprit'],
      references: ['FIA KZ Category Regs 2024-2026']
    },

    kz2_master: {
      age_range: '15+ years, typically 25+',
      weight_minimum_kg: 175,
      weight_minimum_lbs: 385,
      engine_type: '125cc water-cooled 2-stroke with 6-speed gearbox',

      engine_specs: {
        displacement: '125cc',
        cooling: 'Water-cooled',
        gearbox: '6-speed mechanical (hand-operated, no servo)',
        horsepower: '52 hp (approx)',
        power_delivery: 'Torque-rich',
        note: 'All specs same as KZ, but strictly mechanical transmission'
      },

      setup_recommendations: {
        camber: '-1.0° to -2.0°',
        caster: '6-8°',
        pressure: '0.75-0.90 bar',
        axle_hardness: 'Medium to hard',
        suspension: 'Stiffer for torque'
      },

      references: ['FIA KZ2 Category Regs']
    }
  },

  // ========================================
  // DETAILED SETUP PARAMETERS
  // ========================================

  setup_parameters: {
    camber: {
      description: 'Angle of wheel relative to vertical',
      unit: 'degrees (°)',
      negative: 'Top of wheel tilted inward',

      effects: {
        too_negative: ['Excessive corner grip', 'Inner tire wear', 'Poor straight-line grip'],
        optimal: ['Balanced grip in all conditions', 'Even tire wear', 'Predictable handling'],
        not_negative: ['Insufficient corner grip', 'Oversteer', 'Poor turn-in']
      },

      recommendations: {
        ok_category: '-1.0° to -1.5°',
        kz_category: '-1.0° to -2.0°',
        cadet: '-0.5° to -1.5°',
        notes: 'Measured in millimeters at rim edge (~8-12mm = ~1°)'
      },

      adjustment_methods: {
        upper_bushing: 'Praga CCS system',
        stub_axle_position: 'Birel ART system',
        shim_method: 'Traditional method'
      }
    },

    caster: {
      description: 'Forward/backward angle of steering axis',
      unit: 'degrees (°)',
      range: '4-8 degrees typical',

      effects: {
        increase: ['More turn-in grip', 'Sharper steering response', 'More feedback to driver'],
        decrease: ['Lighter steering', 'Less front feedback', 'More understeer'],
        too_much: ['Nervous, twitchy kart', 'Difficult to control entry'],
        wet: ['Run full caster (maximum) for wet conditions']
      },

      recommendations: {
        dry_conditions: '6-8°',
        wet_conditions: 'Maximum available',
        sprint_tracks: '6-7°',
        road_courses: '7-8°'
      }
    },

    toe: {
      description: 'Angle between wheels pointing inward (toe-in) or outward (toe-out)',
      unit: 'millimeters (mm)',
      positive: 'Toe-out (improves turn-in)',
      range_optimal: '0-3mm toe-out',

      effects: {
        toe_out: ['Better turn-in response', 'Helps corner entry', 'Can cause instability'],
        zero: ['Better on high-speed tracks', 'Stable straight-line'],
        too_much_out: ['Very nervous', 'Hard to control']
      },

      recommendations: {
        high_speed_tracks: '0-1mm (zero preferred)',
        sprint_tracks: '1-3mm out',
        road_courses: '2-3mm out',
        general: '0-3mm out'
      }
    },

    height: {
      description: 'Ground clearance of chassis body',
      unit: 'millimeters (mm)',
      affects: 'Center of gravity and rotational momentum',

      effects: {
        higher: ['Higher center of gravity', 'More rotational momentum', 'Loads supporting wheels', 'Increases grip'],
        lower: ['Lower center of gravity', 'Less load on outside wheels', 'Reduces grip']
      },

      recommendations: {
        ok_category: '30-40mm',
        kz_category: '35-45mm',
        starting_point: 'Manufacturer recommendation',
        adjustment: 'Fine-tune based on track grip'
      }
    },

    pressure: {
      description: 'Tire air pressure',
      unit: 'bar (1 bar ≈ 14.5 PSI)',
      range_cold: '0.65-0.75 bar',
      range_race: '0.75-0.85 bar',
      range_hot: '0.95-1.05 bar',

      pressure_difference: {
        front_rear: 'Front ~0.05-0.10 bar lower than rear',
        typical: '0.75 bar front, 0.80 bar rear',
        reason: 'Better weight distribution and handling balance'
      },

      adjustment: {
        increase_pressure: ['Tire heats up faster', 'Better for cold tracks', 'Reduce overheating'],
        decrease_pressure: ['Better grip in warm conditions', 'Prevents overheating', 'Risk of overheating if too low']
      },

      monitoring: [
        'Center tread hot = too much pressure',
        'Center tread cold = too little pressure',
        'Even wear = optimal pressure'
      ]
    },

    suspension: {
      front_torsion_bar: {
        description: 'Stiffness of front suspension',
        options: ['Flat (softest)', 'Round 1.0mm wall', 'Round 1.5mm wall', 'Round 2.0mm wall (stiffest)'],
        effects_softer: ['More grip', 'Smoother ride', 'Less responsive'],
        effects_stiffer: ['Sharper response', 'Less grip', 'More nervous']
      },

      rear_torsion_bar: {
        description: 'Stiffness of rear suspension',
        blade_configuration: '470mm standard',
        position: 'Horizontal (blade flat) is recommended'
      },

      axle_hardness: {
        types: ['Soft (Dot 1)', 'Medium (Dot 2)', 'Hard (Dot 3)', 'Very Hard (Dot 4)'],
        soft: {
          flex: 'Maximum',
          grip: 'Good (in cold/slippery)',
          best_for: 'Cadet, junior, low-power classes',
          track: 'Cold track, new asphalt, low grip'
        },
        medium: {
          flex: 'Standard',
          grip: 'Versatile',
          best_for: 'Most categories',
          track: 'Most conditions',
          note: 'Default on most manufacturer chassis'
        },
        hard: {
          flex: 'Minimal',
          grip: 'Maximum',
          best_for: 'High-power classes (KZ, shifter)',
          track: 'Grippy track, hot conditions, high power',
          reason: 'Doesn\'t flex, forces energy into tires'
        },
        very_hard: {
          best_for: 'Extreme grip conditions',
          track: 'Very hot track with high grip'
        }
      },

      seat_position: {
        forward: ['Increases front grip', 'More understeer tendency', 'Better for entry'],
        backward: ['Increases rear grip', 'More oversteer tendency', 'Better for traction'],
        ideal: 'Balanced between driver comfort and setup needs'
      }
    }
  },

  // ========================================
  // PROFESSIONAL SETUP EXAMPLES
  // ========================================

  professional_setups: {
    ok_dry_grippy: {
      category: 'OK (Direct-Drive Senior)',
      condition: 'Dry, high-grip track',
      camber: '-1.5°',
      caster: '7°',
      toe: '0-1mm out',
      height_mm: '35',
      pressure_front_bar: '0.75',
      pressure_rear_bar: '0.80',
      seat_position: 'Back (for rear grip)',
      axle_hardness: 'Medium',
      torsion_bar: 'Flat',
      characteristics: 'Balanced setup for predictable handling',
      tire_recommendation: 'Vega Medium compound'
    },

    ok_dry_lowgrip: {
      category: 'OK (Direct-Drive Senior)',
      condition: 'Dry, low-grip track',
      camber: '-1.0°',
      caster: '6°',
      toe: '2-3mm out',
      height_mm: '38',
      pressure_front_bar: '0.80',
      pressure_rear_bar: '0.85',
      seat_position: 'Slightly forward',
      axle_hardness: 'Medium-Soft',
      torsion_bar: 'Round 1.0mm',
      characteristics: 'Looser setup for more free-up and drift',
      tire_recommendation: 'Vega Soft compound'
    },

    kz_dry_grippy: {
      category: 'KZ (Shifter Senior)',
      condition: 'Dry, high-grip track',
      camber: '-1.5° to -2.0°',
      caster: '7-8°',
      toe: '0-2mm out',
      height_mm: '40',
      pressure_front_bar: '0.80',
      pressure_rear_bar: '0.85',
      seat_position: 'Centered',
      axle_hardness: 'Hard',
      torsion_bar: 'Round 1.5mm',
      characteristics: 'Stiff setup to transfer power and maintain grip',
      tire_recommendation: 'Vega Medium/Hard compound',
      note: 'Stiffer than OK due to higher power'
    },

    kz_dry_lowgrip: {
      category: 'KZ (Shifter Senior)',
      condition: 'Dry, low-grip track',
      camber: '-1.0° to -1.5°',
      caster: '6-7°',
      toe: '1-2mm out',
      height_mm: '42',
      pressure_front_bar: '0.75',
      pressure_rear_bar: '0.80',
      seat_position: 'Slightly back',
      axle_hardness: 'Medium-Hard',
      torsion_bar: 'Round 1.0mm',
      characteristics: 'Balanced power transfer with some free-up',
      tire_recommendation: 'Vega Medium compound'
    },

    cadet_dry: {
      category: 'Cadet',
      condition: 'Dry conditions',
      camber: '-1.0°',
      caster: '5-6°',
      toe: '1-2mm out',
      height_mm: '33',
      pressure_front_bar: '0.70',
      pressure_rear_bar: '0.75',
      seat_position: 'Forward for more front grip',
      axle_hardness: 'Soft-Medium',
      torsion_bar: 'Flat',
      characteristics: 'Forgiving setup for junior drivers',
      tire_recommendation: 'Vega Medium compound'
    }
  },

  // ========================================
  // TROUBLESHOOTING GUIDE
  // ========================================

  troubleshooting: {
    oversteer_signs: [
      'Rear slides out on corner exit',
      'Difficult to control mid-corner',
      'Spinner on acceleration',
      'Snap oversteer on trail braking'
    ],

    oversteer_fixes: [
      'Decrease rear pressure (0.05 bar)',
      'Increase caster (add 1°)',
      'Move seat forward (increase front grip)',
      'Soften rear torsion bar',
      'Use softer rear axle'
    ],

    understeer_signs: [
      'Kart pushes wide on entry',
      'Difficulty turning into corner',
      'Front slides before rear',
      'Need excessive steering input'
    ],

    understeer_fixes: [
      'Decrease front pressure (0.05 bar)',
      'Reduce caster (remove 1°)',
      'Move seat back (increase rear grip)',
      'Stiffen front torsion bar',
      'Use harder front axle'
    ],

    tire_temperature_issues: {
      center_tread_hot: ['Too much pressure', 'Solution: Reduce pressure 0.05 bar'],
      center_tread_cold: ['Too little pressure', 'Solution: Increase pressure 0.05 bar'],
      outer_edge_hot: ['Too much camber', 'Solution: Reduce camber 0.5°'],
      inner_edge_hot: ['Not enough camber', 'Solution: Increase camber 0.5°']
    },

    acceleration_issues: {
      losing_traction: ['Axle too soft', 'Too much camber', 'Low pressure'],
      fixes: ['Use harder axle', 'Reduce camber', 'Increase pressure slightly']
    },

    braking_issues: {
      unstable_under_braking: ['Too much caster', 'Pressure imbalance', 'Seat too far back'],
      fixes: ['Reduce caster 1°', 'Check pressure difference', 'Move seat forward']
    }
  },

  // ========================================
  // TRACK CONDITION ADJUSTMENTS
  // ========================================

  track_conditions: {
    cold_new_asphalt: {
      characteristic: 'Low grip',
      pressure_adjustment: 'Increase 0.05-0.10 bar (helps tire heat up)',
      axle: 'Softer (medium-soft)',
      camber: 'Reduce slightly (-0.5° to -1.0°)',
      notes: [
        'Tire heats slowly',
        'More pressure helps warmup',
        'Softer axle provides compliance'
      ]
    },

    hot_worn_rubber: {
      characteristic: 'High grip',
      pressure_adjustment: 'Decrease 0.05-0.10 bar (prevent overheating)',
      axle: 'Harder (medium-hard)',
      camber: 'Increase (-1.5° to -2.0°)',
      notes: [
        'Tire heats quickly',
        'Lower pressure prevents overheat',
        'Stiffer axle maximizes grip'
      ]
    },

    rain: {
      characteristic: 'Variable grip',
      pressure: '0.65-0.75 bar',
      caster: 'Maximum available',
      notes: [
        'Higher caster critical in wet',
        'Slightly higher pressure for water displacement',
        'Avoid extreme camber'
      ]
    },

    intermediate_conditions: {
      characteristic: 'Medium grip',
      pressure: '0.75-0.80 bar',
      axle: 'Medium',
      notes: ['Use baseline setup', 'Monitor tire temps', 'Be ready to adjust']
    }
  },

  // ========================================
  // QUICK REFERENCE TABLES
  // ========================================

  quick_reference: {
    pressure_quick_guide: {
      'Cold New Track': '0.80-0.85 bar',
      'Standard Dry': '0.75-0.85 bar',
      'Hot High Grip': '0.65-0.75 bar',
      'Rain': '0.65-0.75 bar',
      'During Race': '0.95-1.05 bar (expected)'
    },

    axle_hardness_guide: {
      'Cold Track': 'Soft-Medium',
      'Standard': 'Medium',
      'Hot Track': 'Medium-Hard',
      'High Power (KZ)': 'Hard'
    },

    camber_quick_guide: {
      'Cadet': '-0.5° to -1.5°',
      'Junior': '-1.0° to -1.5°',
      'OK Senior': '-1.0° to -1.5°',
      'KZ Senior': '-1.0° to -2.0°'
    }
  },

  // ========================================
  // DATA METADATA
  // ========================================

  metadata: {
    version: '1.0',
    last_updated: '2026-04-23',
    sources: [
      'CRG Technical Setup Manual 2024',
      'OTK Setup Guide 2024-2026',
      'Birel ART Technical Documentation 2026',
      'Praga Kart Setup Specifications',
      'FIA Karting Regulations 2024-2026',
      'Professional Racing Teams Data',
      'ANGRI Racing Academy',
      'KartPulse Forums Professional Discussions',
      'Manufacturer Technical Specifications'
    ],

    disclaimer: 'This database contains professional racing data compiled from official manufacturer documentation and FIA regulations. Setup recommendations should be adapted to individual driver style, track conditions, and specific kart configurations. Consult official chassis manuals for your specific model.',

    usage_notes: [
      'Use as reference, not absolute rules',
      'Adjust for local track and weather',
      'Monitor tire temperatures closely',
      'Test incrementally (0.05 bar, 0.5° at a time)',
      'Keep setup notes for consistency',
      'Work with experienced mechanics when possible'
    ]
  }
};

// Export for use in analysis functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = KART_CHASSIS_DATABASE;
}
