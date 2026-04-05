// Yeva Solver Web Worker — auto-generated from Solver/*.js, do not edit directly
// cards.js
/**
 * MTG Combo Solver — Card Definitions (expanded)
 * All cards from card_data.md plus original combo pieces.
 */

// STAX cards are never cast and never tutored — imported lazily to avoid circular deps
function isStax(cardKey) {
  const STAX = new Set([
    'collector_ouphe', 'null_rod', 'root_maze',
    'thorn_of_amethyst', 'trinisphere', 'orb_of_dreams', 'vexing_bauble',
  ]);
  return STAX.has(cardKey);
}

function devotionToGreen(state) {
  let count = 0;
  for (const p of state.battlefield) {
    const def = CARDS[p.cardKey];
    if (!def || !def.cost) continue;
    for (const ch of def.cost) if (ch === 'G') count++;
  }
  return count;
}

function countElves(state) {
  return state.battlefield.filter(p => p.subtypes && p.subtypes.includes('Elf')).length;
}

function simpleTap(label, colorPairs) {
  return function tapForMana(state, perm) {
    if (perm.tapped || perm.summoningSick) return [];
    let s = state.tapPermanent(perm.id);
    if (!s) return [];
    for (const [color, amt] of colorPairs) for (let i = 0; i < amt; i++) s = s.addMana(color);
    s = s.log(`Tap ${perm.name} → ${label}`);
    return [s];
  };
}

function bounceToUntap(label, filterFn, selfKey) {
  return {
    label,
    fn(state, perm) {
      const cards = CARDS;
      const results = [];
      const bounceable = state.battlefield.filter(p => filterFn(p));
      for (const target of bounceable) {
        const creaturesCanUntap = state.creatures().filter(c => c.id !== target.id && c.tapped);
        const untapTargets = target.id === perm.id
          ? creaturesCanUntap
          : [...creaturesCanUntap, { ...perm, _isSelf: true }];
        if (untapTargets.length === 0) continue;
        for (const ut of untapTargets) {
          let s = state;
          if (target.id === perm.id) {
            s = s.removeFromBattlefield(perm.id, null);
            if (!s) continue;
            s = s.addToHand(selfKey || perm.cardKey);
          } else {
            s = s.removeFromBattlefield(target.id, null);
            if (!s) continue;
            const fk = Object.keys(cards).find(k => cards[k].name === target.name);
            if (fk) s = s.addToHand(fk);
          }
          if (ut._isSelf) {
            const sp = s.getPermanentById(perm.id);
            if (sp) s = s.untapPermanent(sp.id);
          } else {
            s = s.untapPermanent(ut.id);
          }
          s = s.log(`${perm.name}: return ${target.name} → untap ${ut._isSelf ? perm.name : ut.name}`);
          results.push(s);
        }
      }
      return results;
    },
  };
}

const CARDS = {

  // ─── LANDS ───────────────────────────────────────────────────────────────

  ancient_tomb: {
    name: 'Ancient Tomb', types: ['land'], subtypes: [], cost: null,
    tapForMana(state, perm) {
      let s = state.tapPermanent(perm.id); if (!s) return [];
      s.life -= 2; s = s.addMana('C').addMana('C');
      return [s.log(`Tap ${perm.name} → {C}{C} (pay 2 life, life now ${s.life})`)];
    },
  },

  gaeas_cradle: {
    name: "Gaea's Cradle", types: ['land'], subtypes: ['Legendary'], cost: null,
    tapForMana(state, perm) {
      const n = state.creatures().length; if (n === 0) return [];
      let s = state.tapPermanent(perm.id); if (!s) return [];
      for (let i = 0; i < n; i++) s = s.addMana('G');
      return [s.log(`Tap ${perm.name} → {G}x${n} (${n} creature${n !== 1 ? 's' : ''})`)];
    },
  },

  itlimoc: {
    name: 'Itlimoc, Cradle of the Sun', types: ['land'], subtypes: ['Legendary'], cost: null,
    tapForMana(state, perm) {
      const n = state.creatures().length;
      let s = state.tapPermanent(perm.id); if (!s) return [];
      for (let i = 0; i <= n; i++) s = s.addMana('G');
      return [s.log(`Tap ${perm.name} → {G}x${n + 1}`)];
    },
  },

  nykthos: {
    name: 'Nykthos, Shrine to Nyx', types: ['land'], subtypes: ['Legendary'], cost: null,
    tapForMana(state, perm) {
      const results = [];
      let s1 = state.tapPermanent(perm.id); if (s1) { s1 = s1.addMana('C'); results.push(s1.log(`Tap ${perm.name} → {C}`)); }
      const dev = devotionToGreen(state);
      const p2 = state.payMana('2');
      if (p2 && dev > 0) {
        let s2 = p2.tapPermanent(perm.id);
        if (s2) { for (let i = 0; i < dev; i++) s2 = s2.addMana('G'); results.push(s2.log(`Tap ${perm.name} (devotion) → {G}x${dev}`)); }
      }
      return results;
    },
  },

  deserted_temple: {
    name: 'Deserted Temple', types: ['land'], subtypes: [], cost: null,
    tapForMana: simpleTap('{C}', [['C', 1]]),
    abilities: {
      untap_land: {
        label: '{1}, {T}: Untap target land',
        fn(state, perm) {
          if (perm.tapped) return [];
          const ap = state.payMana('1'); if (!ap) return [];
          const results = [];
          for (const land of state.lands().filter(l => l.tapped)) {
            let s = ap.tapPermanent(perm.id); if (!s) continue;
            s = s.untapPermanent(land.id);
            results.push(s.log(`Deserted Temple → untap ${land.name}`));
          }
          return results;
        },
      },
    },
  },

  yavimaya: {
    name: 'Yavimaya, Cradle of Growth', types: ['land'], subtypes: ['Legendary'], cost: null,
    tapForMana: simpleTap('{G}', [['G', 1]]),
  },

  wirewood_lodge: {
    name: 'Wirewood Lodge', types: ['land'], subtypes: [], cost: null,
    tapForMana: simpleTap('{C}', [['C', 1]]),
    abilities: {
      untap_elf: {
        label: '{G}, {T}: Untap target Elf',
        fn(state, perm) {
          if (perm.tapped) return [];
          const ap = state.payMana('G'); if (!ap) return [];
          const results = [];
          for (const elf of state.battlefield.filter(p => p.subtypes && p.subtypes.includes('Elf') && p.tapped)) {
            let s = ap.tapPermanent(perm.id); if (!s) continue;
            s = s.untapPermanent(elf.id);
            results.push(s.log(`Wirewood Lodge → untap ${elf.name}`));
          }
          return results;
        },
      },
    },
  },

  forest: { name: 'Forest', types: ['land'], subtypes: ['Forest'], cost: null, isBasic: true, tapForMana: simpleTap('{G}', [['G', 1]]) },

  castle_garenbrig: {
    name: 'Castle Garenbrig', types: ['land'], subtypes: [], cost: null,
    tapForMana: simpleTap('{G}', [['G', 1]]),
    abilities: {
      big_green: {
        label: '{2}{G}{G}, {T}: Add {G}x6 (for creatures)',
        fn(state, perm) {
          if (perm.tapped) return [];
          const ap = state.payMana('2GG'); if (!ap) return [];
          let s = ap.tapPermanent(perm.id); if (!s) return [];
          for (let i = 0; i < 6; i++) s = s.addMana('G');
          return [s.log(`Castle Garenbrig → {G}x6`)];
        },
      },
    },
  },

  dryad_arbor: {
    name: 'Dryad Arbor', types: ['land', 'creature'], subtypes: ['Forest', 'Dryad'], cost: null,
    power: 1, toughness: 1,
    tapForMana: simpleTap('{G}', [['G', 1]]),
  },

  misty_rainforest:  { name: 'Misty Rainforest',  types: ['land'], subtypes: [], cost: null, tapForMana(s,p){return[];}, abilities: { fetch: { label:'Fetch Forest', fn(state,perm){ if(perm.tapped) return []; let s=state.clone(); s.life-=1; s=s.removeFromBattlefield(perm.id,'graveyard'); if(!s) return []; s=s.enterBattlefield('forest'); return [s.log(`${perm.name}: fetch Forest`)]; }}}},
  verdant_catacombs: { name: 'Verdant Catacombs', types: ['land'], subtypes: [], cost: null, tapForMana(s,p){return[];}, abilities: { fetch: { label:'Fetch Forest', fn(state,perm){ if(perm.tapped) return []; let s=state.clone(); s.life-=1; s=s.removeFromBattlefield(perm.id,'graveyard'); if(!s) return []; s=s.enterBattlefield('forest'); return [s.log(`${perm.name}: fetch Forest`)]; }}}},
  windswept_heath:   { name: 'Windswept Heath',   types: ['land'], subtypes: [], cost: null, tapForMana(s,p){return[];}, abilities: { fetch: { label:'Fetch Forest', fn(state,perm){ if(perm.tapped) return []; let s=state.clone(); s.life-=1; s=s.removeFromBattlefield(perm.id,'graveyard'); if(!s) return []; s=s.enterBattlefield('forest'); return [s.log(`${perm.name}: fetch Forest`)]; }}}},
  wooded_foothills:  { name: 'Wooded Foothills',  types: ['land'], subtypes: [], cost: null, tapForMana(s,p){return[];}, abilities: { fetch: { label:'Fetch Forest', fn(state,perm){ if(perm.tapped) return []; let s=state.clone(); s.life-=1; s=s.removeFromBattlefield(perm.id,'graveyard'); if(!s) return []; s=s.enterBattlefield('forest'); return [s.log(`${perm.name}: fetch Forest`)]; }}}},

  shifting_woodland:   { name: 'Shifting Woodland',          types: ['land'], subtypes: [], cost: null, tapForMana: simpleTap('{G}', [['G',1]]) },
  emergence_zone:      { name: 'Emergence Zone',             types: ['land'], subtypes: [], cost: null, tapForMana: simpleTap('{C}', [['C',1]]) },
  boseiju:             { name: 'Boseiju, Who Endures',       types: ['land'], subtypes: ['Legendary'], cost: null, tapForMana: simpleTap('{G}', [['G',1]]) },
  talon_gates:         { name: 'Talon Gates of Madara',      types: ['land'], subtypes: ['Gate'], cost: null, tapForMana: simpleTap('{C}', [['C',1]]) },
  war_room:            { name: 'War Room',                   types: ['land'], subtypes: [], cost: null, tapForMana: simpleTap('{C}', [['C',1]]) },
  geier_reach: {
    name: 'Geier Reach Sanitarium', types: ['land'], subtypes: ['Legendary'], cost: null,
    tapForMana: simpleTap('{C}', [['C', 1]]),
    abilities: {
      draw_discard: {
        label: '{2}, {T}: Each player draws a card, then discards a card',
        fn(state, perm) {
          if (perm.tapped) return [];
          const afterPay = state.payMana('2');
          if (!afterPay) return [];
          let s = afterPay.tapPermanent(perm.id);
          if (!s) return [];

          // Each player draws a card (reduces librarySize)
          for (let pi = 0; pi < s.players.length; pi++) {
            s = s.playerDraws(pi, 1);
          }

          // Active player (you) discards a card from hand.
          // We enumerate one result per card you could discard.
          // Opponents' discards are non-deterministic from your perspective —
          // modelled as them discarding the top of their (unseen) library proxy.
          if (s.hand.length === 0) {
            // No cards to discard; still a legal activation (opponent cards aren't tracked in hand)
            // Opponents discard (their library proxy shrinks by 1 more — simplified)
            for (let pi = 1; pi < s.players.length; pi++) {
              s = s.modifyPlayer(pi, { librarySize: -1 });
            }
            return [s.log('Geier Reach Sanitarium: each player draws then discards (you had no cards)')];
          }

          const results = [];
          for (const cardKey of [...new Set(s.hand)]) {
            let ns = s.discardFromHand(cardKey);
            if (!ns) continue;
            // Opponents each discard one (simplified: shrink their lib proxy)
            for (let pi = 1; pi < ns.players.length; pi++) {
              ns = ns.modifyPlayer(pi, { librarySize: -1 });
            }
            const cards = CARDS;
            const cardName = cards[cardKey]?.name ?? cardKey;
            ns = ns.log(`Geier Reach Sanitarium: each player draws then discards (you discard ${cardName})`);
            results.push(ns);
          }
          return results;
        },
      },
    },
  },
  bonders_enclave:     { name: "Bonders' Enclave",           types: ['land'], subtypes: [], cost: null, tapForMana: simpleTap('{C}', [['C',1]]) },
  mikokoro:            { name: 'Mikokoro, Center of the Sea', types: ['land'], subtypes: ['Legendary'], cost: null, tapForMana: simpleTap('{C}', [['C',1]]) },
  urza_cave:           { name: "Urza's Cave",                types: ['land'], subtypes: [], cost: null, tapForMana: simpleTap('{C}', [['C',1]]) },
  ominous_cemetery:    { name: 'Ominous Cemetery',           types: ['land'], subtypes: [], cost: null, tapForMana: simpleTap('{C}', [['C',1]]) },
  mariposa_military:   { name: 'Mariposa Military Base',     types: ['land'], subtypes: [], cost: null, tapForMana: simpleTap('{C}', [['C',1]]) },

  // ─── ARTIFACTS ───────────────────────────────────────────────────────────

  sol_ring: { name: 'Sol Ring', types: ['artifact'], subtypes: [], cost: '1', tapForMana: simpleTap('{C}{C}', [['C',2]]) },

  lotus_petal: {
    name: 'Lotus Petal', types: ['artifact'], subtypes: [], cost: '0',
    abilities: {
      sac_G: { label:'Sac → {G}', fn(state,perm){ let s=state.removeFromBattlefield(perm.id,'graveyard'); if(!s) return null; return s.addMana('G').log(`Sacrifice ${perm.name} → {G}`); } },
      sac_C: { label:'Sac → {C}', fn(state,perm){ let s=state.removeFromBattlefield(perm.id,'graveyard'); if(!s) return null; return s.addMana('C').log(`Sacrifice ${perm.name} → {C}`); } },
      sac_W: { label:'Sac → {W}', fn(state,perm){ let s=state.removeFromBattlefield(perm.id,'graveyard'); if(!s) return null; return s.addMana('W').log(`Sacrifice ${perm.name} → {W}`); } },
      sac_U: { label:'Sac → {U}', fn(state,perm){ let s=state.removeFromBattlefield(perm.id,'graveyard'); if(!s) return null; return s.addMana('U').log(`Sacrifice ${perm.name} → {U}`); } },
      sac_B: { label:'Sac → {B}', fn(state,perm){ let s=state.removeFromBattlefield(perm.id,'graveyard'); if(!s) return null; return s.addMana('B').log(`Sacrifice ${perm.name} → {B}`); } },
      sac_R: { label:'Sac → {R}', fn(state,perm){ let s=state.removeFromBattlefield(perm.id,'graveyard'); if(!s) return null; return s.addMana('R').log(`Sacrifice ${perm.name} → {R}`); } },
    },
  },

  mox_diamond:  { name: 'Mox Diamond',  types: ['artifact'], subtypes: [], cost: '0', tapForMana: simpleTap('{any}', [['G',1]]) },
  chrome_mox:   { name: 'Chrome Mox',   types: ['artifact'], subtypes: [], cost: '0', tapForMana: simpleTap('{G}',   [['G',1]]) },

  thousand_year_elixir: {
    name: 'Thousand-Year Elixir', types: ['artifact'], subtypes: [], cost: '3',
    abilities: {
      untap_creature: {
        label: '{1}, {T}: Untap target creature',
        fn(state, perm) {
          if (perm.tapped) return [];
          const ap = state.payMana('1'); if (!ap) return [];
          const results = [];
          for (const c of state.creatures().filter(c => c.tapped)) {
            let s = ap.tapPermanent(perm.id); if (!s) continue;
            results.push(s.untapPermanent(c.id).log(`Thousand-Year Elixir → untap ${c.name}`));
          }
          return results;
        },
      },
    },
  },

  cloudstone_curio: {
    name: 'Cloudstone Curio', types: ['artifact'], subtypes: [], cost: '3',
    // Triggered: whenever a nonartifact permanent you control enters, you MAY return
    // another permanent you control that shares a permanent type with it to its owner's hand.
    // Modeled as an activated ability that fires on the cast_spell action completion.
    // The engine calls this as an optional "trigger" action when a nonartifact enters.
    abilities: {
      bounce_on_enter: {
        label: 'Curio trigger: return a permanent sharing a type with the new entrant',
        fn(state, perm) {
          // This is called after a nonartifact enters. Enumerate bounce targets.
          // We look for any permanent on BF (other than itself) that shares a type
          // with the most recently entered permanent.
          const cards = CARDS;
          const results = [];
          // Find the last non-artifact permanent that entered (highest id)
          const nonArtifacts = state.battlefield.filter(p =>
            !p.types.includes('artifact') && p.id !== perm.id
          );
          if (nonArtifacts.length === 0) return [];
          const entrant = nonArtifacts[nonArtifacts.length - 1];

          // Valid bounce targets: share a type with entrant, are not the entrant
          const targets = state.battlefield.filter(p =>
            p.id !== entrant.id &&
            p.id !== perm.id &&
            p.types.some(t => entrant.types.includes(t))
          );
          for (const target of targets) {
            let s = state.removeFromBattlefield(target.id, null);
            if (!s) continue;
            const ck = Object.keys(cards).find(k => cards[k].name === target.name);
            if (ck) s = s.addToHand(ck);
            results.push(s.log(`Cloudstone Curio: bounce ${target.name} to hand`));
          }
          return results;
        },
      },
    },
  },
  agatha_cauldron:  { name: "Agatha's Soul Cauldron", types: ['artifact'], subtypes: ['Legendary'], cost: '2' },
  emerald_medallion:{ name: 'Emerald Medallion', types: ['artifact'], subtypes: [], cost: '2', costReduction: { color: 'G', amount: 1 } },
  null_rod:         { name: 'Null Rod',          types: ['artifact'], subtypes: [], cost: '2' },
  thorn_of_amethyst:{ name: 'Thorn of Amethyst', types: ['artifact'], subtypes: [], cost: '2' },
  trinisphere:      { name: 'Trinisphere',        types: ['artifact'], subtypes: [], cost: '3' },
  orb_of_dreams:    { name: 'Orb of Dreams',      types: ['artifact'], subtypes: [], cost: '3' },
  vexing_bauble: {
    name: 'Vexing Bauble', types: ['artifact'], subtypes: [], cost: '1',
    // {1}, {T}, Sacrifice: Draw a card.
    // Also counters free spells — static effect tracked globally.
    abilities: {
      sac_draw: {
        label: '{1}, {T}, Sacrifice: Draw a card',
        fn(state, perm) {
          if (perm.tapped) return [];
          const ap = state.payMana('1'); if (!ap) return [];
          let s = ap.removeFromBattlefield(perm.id, 'graveyard');
          if (!s) return [];
          s = s.playerDraws(0, 1);
          return [s.log('Sacrifice Vexing Bauble: draw a card')];
        },
      },
    },
  },

  // ─── CREATURES — Mana Dorks ───────────────────────────────────────────────

  llanowar_elves:  { name: 'Llanowar Elves',  types:['creature'], subtypes:['Elf','Druid'],   cost:'G',   power:1,toughness:1, tapForMana: simpleTap('{G}',[['G',1]]) },
  elvish_mystic:   { name: 'Elvish Mystic',   types:['creature'], subtypes:['Elf','Druid'],   cost:'G',   power:1,toughness:1, tapForMana: simpleTap('{G}',[['G',1]]) },
  fyndhorn_elves:  { name: 'Fyndhorn Elves',  types:['creature'], subtypes:['Elf','Druid'],   cost:'G',   power:1,toughness:1, tapForMana: simpleTap('{G}',[['G',1]]) },
  boreal_druid:    { name: 'Boreal Druid',    types:['creature'], subtypes:['Elf','Druid'],   cost:'G',   power:1,toughness:1, tapForMana: simpleTap('{C}',[['C',1]]) },
  birds_of_paradise:{ name:'Birds of Paradise',types:['creature'],subtypes:['Bird'],           cost:'G',   power:0,toughness:1, tapForMana: simpleTap('{any}',[['G',1]]) },
  delighted_halfling:{ name:'Delighted Halfling',types:['creature'],subtypes:['Halfling','Citizen'],cost:'G',power:1,toughness:1, tapForMana: simpleTap('{C}',[['C',1]]) },
  boreal_druid2:   { name: 'Joraga Treespeaker', types:['creature'],subtypes:['Elf','Druid'], cost:'G',   power:1,toughness:1, tapForMana: simpleTap('{G}',[['G',1]]) },
  allosaurus_shepherd: {
    name: 'Allosaurus Shepherd', types: ['creature'], subtypes: ['Elf','Shaman'],
    cost: 'G', power: 1, toughness: 1,
    // Uncounterable, green spells uncounterable. {4GG}: Elves become 5/5 Dinosaurs.
    abilities: {
      dino_pump: {
        label: '{4}{G}{G}: Elves become 5/5 Dinosaurs until EOT',
        fn(state, perm) {
          if (perm.summoningSick) return [];
          const ap = state.payMana('4GG'); if (!ap) return [];
          const s = ap.clone();
          for (const bf of s.battlefield) {
            if (bf.subtypes && bf.subtypes.includes('Elf')) {
              bf.power = 5; bf.toughness = 5;
              if (!bf.subtypes.includes('Dinosaur')) bf.subtypes.push('Dinosaur');
            }
          }
          return [s.log('Allosaurus Shepherd: Elves become 5/5 Dinosaurs')];
        },
      },
    },
  },
  insidious_fungus: {
    name: 'Insidious Fungus', types: ['creature'], subtypes: ['Fungus'], cost: 'G',
    power: 1, toughness: 1,
    abilities: {
      sac_draw: {
        label: '{2}, Sacrifice: Draw a card',
        fn(state, perm) {
          const ap = state.payMana('2'); if (!ap) return [];
          let s = ap.removeFromBattlefield(perm.id, 'graveyard'); if (!s) return [];
          s = s.playerDraws(0, 1);
          return [s.log('Insidious Fungus: sacrifice, draw a card')];
        },
      },
    },
  },
  treefolk_harbinger:{ name:'Treefolk Harbinger',types:['creature'],subtypes:['Treefolk','Druid'],cost:'G',power:1,toughness:1 },
  elvish_reclaimer:{ name:'Elvish Reclaimer',   types:['creature'], subtypes:['Elf','Warrior'], cost:'G',  power:1,toughness:1 },

  elvish_spirit_guide: {
    name: 'Elvish Spirit Guide', types:['creature'], subtypes:['Elf','Spirit'], cost:'2G', power:2,toughness:2,
    handAbilities: {
      exile_for_G: {
        label: 'Exile from hand: Add {G}',
        fn(state, cardKey) {
          let s = state.removeFromHand(cardKey); if (!s) return null;
          s = s.clone(); s.exile = [...(s.exile||[]), 'Elvish Spirit Guide'];
          return s.addMana('G').log('Exile Elvish Spirit Guide → {G}');
        },
      },
    },
  },

  arbor_elf: {
    name: 'Arbor Elf', types:['creature'], subtypes:['Elf','Druid'], cost:'G', power:1,toughness:1,
    abilities: {
      untap_forest: {
        label: '{T}: Untap target Forest',
        fn(state, perm) {
          if (perm.tapped || perm.summoningSick) return [];
          const results = [];
          for (const f of state.lands().filter(l => (l.subtypes&&l.subtypes.includes('Forest')||l.isForest)&&l.tapped)) {
            let s = state.tapPermanent(perm.id); if (!s) continue;
            results.push(s.untapPermanent(f.id).log(`Arbor Elf → untap ${f.name}`));
          }
          return results;
        },
      },
    },
  },

  priest_of_titania: {
    name: 'Priest of Titania', types:['creature'], subtypes:['Elf','Druid'], cost:'1G', power:1,toughness:1,
    tapForMana(state, perm) {
      if (perm.tapped || perm.summoningSick) return [];
      const n = countElves(state); if (n===0) return [];
      let s = state.tapPermanent(perm.id); if (!s) return [];
      for (let i=0;i<n;i++) s = s.addMana('G');
      return [s.log(`Tap ${perm.name} → {G}x${n} (${n} Elves)`)];
    },
  },

  fanatic_of_rhonas: {
    name: 'Fanatic of Rhonas', types:['creature'], subtypes:['Snake','Druid'], cost:'1G', power:2,toughness:2,
    tapForMana(state, perm) {
      if (perm.tapped || perm.summoningSick) return [];
      const results = [];
      let s1 = state.tapPermanent(perm.id);
      if (s1) results.push(s1.addMana('G').log(`Tap ${perm.name} → {G}`));
      if (state.creatures().some(c => (c.power||0) >= 4)) {
        let s2 = state.tapPermanent(perm.id);
        if (s2) { for(let i=0;i<4;i++) s2=s2.addMana('G'); results.push(s2.log(`Tap ${perm.name} (Ferocious) → {G}x4`)); }
      }
      return results;
    },
  },

  elvish_archdruid: {
    name: 'Elvish Archdruid', types:['creature'], subtypes:['Elf','Druid'], cost:'1GG', power:2,toughness:2,
    tapForMana(state, perm) {
      if (perm.tapped || perm.summoningSick) return [];
      const n = countElves(state); if (n===0) return [];
      let s = state.tapPermanent(perm.id); if (!s) return [];
      for (let i=0;i<n;i++) s = s.addMana('G');
      return [s.log(`Tap ${perm.name} → {G}x${n} (${n} Elves)`)];
    },
  },

  circle_of_dreams_druid: {
    name: 'Circle of Dreams Druid', types:['creature'], subtypes:['Elf','Druid'], cost:'GGG', power:2,toughness:1,
    tapForMana(state, perm) {
      if (perm.tapped || perm.summoningSick) return [];
      const n = state.creatures().length; if (n===0) return [];
      let s = state.tapPermanent(perm.id); if (!s) return [];
      for (let i=0;i<n;i++) s = s.addMana('G');
      return [s.log(`Tap ${perm.name} → {G}x${n} (${n} creatures)`)];
    },
  },

  karametra_acolyte: {
    name: "Karametra's Acolyte", types:['creature'], subtypes:['Human','Druid'], cost:'3G', power:1,toughness:4,
    tapForMana(state, perm) {
      if (perm.tapped || perm.summoningSick) return [];
      const dev = devotionToGreen(state); if (dev===0) return [];
      let s = state.tapPermanent(perm.id); if (!s) return [];
      for (let i=0;i<dev;i++) s = s.addMana('G');
      return [s.log(`Tap ${perm.name} → {G}x${dev} (devotion ${dev})`)];
    },
  },

  selvala: {
    name: 'Selvala, Heart of the Wilds', types:['creature'], subtypes:['Elf','Scout'], cost:'1GG', power:2,toughness:3,
    tapForMana(state, perm) {
      if (perm.tapped || perm.summoningSick) return [];
      const maxP = Math.max(0, ...state.creatures().map(c=>c.power||0)); if (maxP===0) return [];
      // Oracle: {G},{T}: Add X mana. Must pay {G} activation cost first.
      const paid = state.payMana('G'); if (!paid) return [];
      let s = paid.tapPermanent(perm.id); if (!s) return [];
      for (let i=0;i<maxP;i++) s = s.addMana('G');
      return [s.log(`Tap ${perm.name} → {G}x${maxP} (paid {G}, net ${maxP-1}G)`)];
    },
  },

  marwyn: {
    name: 'Marwyn, the Nurturer', types:['creature'], subtypes:['Elf','Druid'], cost:'2G', power:1,toughness:1,
    tapForMana(state, perm) {
      if (perm.tapped || perm.summoningSick) return [];
      const p = perm.power||1; if (p===0) return [];
      let s = state.tapPermanent(perm.id); if (!s) return [];
      for (let i=0;i<p;i++) s = s.addMana('G');
      return [s.log(`Tap ${perm.name} → {G}x${p}`)];
    },
  },

  wirewood_channeler: {
    name: 'Wirewood Channeler', types:['creature'], subtypes:['Elf','Druid'], cost:'3G', power:2,toughness:2,
    tapForMana(state, perm) {
      if (perm.tapped || perm.summoningSick) return [];
      const n = countElves(state); if (n===0) return [];
      let s = state.tapPermanent(perm.id); if (!s) return [];
      for (let i=0;i<n;i++) s = s.addMana('G');
      return [s.log(`Tap ${perm.name} → {G}x${n} (${n} Elves)`)];
    },
  },

  magus_of_the_candelabra: {
    name: 'Magus of the Candelabra', types:['creature'], subtypes:['Human','Wizard'], cost:'G', power:1,toughness:1,
    abilities: {
      untap_x_lands: {
        label: '{X}, {T}: Untap X target lands',
        fn(state, perm) {
          if (perm.tapped || perm.summoningSick) return [];
          const results = [];
          // Cap X at 4 to keep branching manageable in the DFS
          const maxX = Math.min(4, state.mana.total());
          for (let x = 1; x <= maxX; x++) {
            const ap = state.payMana(String(x)); if (!ap) continue;
            // Tap Magus FIRST so it appears in tapped lands for target evaluation
            // (under Ashaya, Magus is a Forest land and can target itself)
            const at = ap.tapPermanent(perm.id); if (!at) continue;
            const tapped = at.lands().filter(l => l.tapped);
            if (tapped.length < x) continue;
            if (x === 1) {
              for (const l of tapped) {
                results.push(at.untapPermanent(l.id)
                  .log(`Magus of the Candelabra: {1}, tap → untap ${l.name}`));
              }
            } else if (x === 2) {
              for (let i = 0; i < tapped.length; i++) {
                for (let j = i + 1; j < tapped.length; j++) {
                  let s = at.untapPermanent(tapped[i].id);
                  s = s.untapPermanent(tapped[j].id);
                  results.push(s.log(`Magus of the Candelabra: {2}, tap → untap ${tapped[i].name}, ${tapped[j].name}`));
                }
              }
            } else {
              // x >= 3: untap the first x tapped lands
              let s = at;
              const targets = tapped.slice(0, x);
              for (const l of targets) s = s.untapPermanent(l.id);
              results.push(s.log(`Magus of the Candelabra: {${x}}, tap → untap ${targets.map(l => l.name).join(', ')}`));
            }
          }
          return results;
        },
      },
    },
  },

  elvish_harbinger: { name:'Elvish Harbinger', types:['creature'], subtypes:['Elf','Druid'], cost:'2G', power:1,toughness:2, tapForMana: simpleTap('{any}',[['G',1]]) },

  // ─── CREATURES — Untappers ────────────────────────────────────────────────

  hope_tender: {
    name: 'Hope Tender', types:['creature'], subtypes:['Human','Druid'], cost:'1G', power:1,toughness:1,
    abilities: {
      untap_one_land: {
        label: '{1}, {T}: Untap target land',
        fn(state, perm) {
          if (perm.tapped || perm.summoningSick) return [];
          const ap = state.payMana('1'); if (!ap) return [];
          const at = ap.tapPermanent(perm.id); if (!at) return [];
          const results = [];
          for (const land of at.lands().filter(l=>l.tapped)) {
            results.push(at.untapPermanent(land.id).log(`Hope Tender: {1}, tap → untap ${land.name}`));
          }
          return results;
        },
      },
      untap_two_lands: {
        label: '{1}, {T}, Exert: Untap two target lands',
        fn(state, perm) {
          if (perm.tapped || perm.summoningSick) return [];
          const ap = state.payMana('1'); if (!ap) return [];
          const at = ap.tapPermanent(perm.id); if (!at) return [];
          const tl = at.lands().filter(l=>l.tapped); if (tl.length===0) return [];
          const pairs = tl.length===1 ? [[tl[0]]] : tl.flatMap((a,i)=>tl.slice(i+1).map(b=>[a,b]));
          return pairs.map(pair => {
            let s = at;
            for (const land of pair) s = s.untapPermanent(land.id);
            return s.log(`Activate Hope Tender: pay {1}, tap → untap [${pair.map(p=>p.name).join(' + ')}]`);
          });
        },
      },
    },
  },

  quirion_ranger: {
    name: 'Quirion Ranger', types:['creature'], subtypes:['Elf','Ranger'], cost:'G', power:1,toughness:1,
    abilities: {
      bounce_forest: bounceToUntap(
        'Return a Forest to hand: Untap a creature (once per turn)',
        p => p.isForest || (p.subtypes && p.subtypes.includes('Forest')),
        'quirion_ranger'
      ),
    },
  },

  scryb_ranger: {
    name: 'Scryb Ranger', types:['creature'], subtypes:['Faerie','Ranger'], cost:'1G', power:1,toughness:1,
    abilities: {
      bounce_forest: bounceToUntap(
        'Return a Forest to hand: Untap a creature (once per turn)',
        p => p.isForest || (p.subtypes && p.subtypes.includes('Forest')),
        'scryb_ranger'
      ),
    },
  },

  wirewood_symbiote: {
    name: 'Wirewood Symbiote', types:['creature'], subtypes:['Insect'], cost:'G', power:1,toughness:1,
    abilities: {
      bounce_elf: bounceToUntap(
        'Return an Elf to hand: Untap a creature (once per turn)',
        p => p.subtypes && p.subtypes.includes('Elf') && p.types && p.types.includes('creature'),
        'wirewood_symbiote'
      ),
    },
  },

  argothian_elder: {
    name: 'Argothian Elder', types:['creature'], subtypes:['Elf','Druid'], cost:'3G', power:2,toughness:2,
    abilities: {
      untap_two_lands: {
        label: '{T}: Untap two target lands',
        fn(state, perm) {
          if (perm.tapped || perm.summoningSick) return [];
          // Tap Elder FIRST — under Ashaya, Elder is a Forest land and can target itself.
          // Evaluating tapped lands after tapping ensures Elder appears in the candidate pool.
          const at = state.tapPermanent(perm.id); if (!at) return [];
          const tl = at.lands().filter(l => l.tapped);
          if (tl.length < 2) return [];
          return tl.flatMap((a,i) => tl.slice(i+1).map(b => {
            let s = at.untapPermanent(a.id);
            return s.untapPermanent(b.id).log(`Argothian Elder → untap ${a.name} + ${b.name}`);
          }));
        },
      },
    },
  },

  ley_weaver: {
    name: 'Ley Weaver', types:['creature'], subtypes:['Human','Druid'], cost:'3G', power:2,toughness:2,
    abilities: {
      untap_two_lands: {
        label: '{T}: Untap two target lands',
        fn(state, perm) {
          if (perm.tapped || perm.summoningSick) return [];
          // Tap Weaver FIRST — under Ashaya, Weaver is a Forest land and can target itself.
          const at = state.tapPermanent(perm.id); if (!at) return [];
          const tl = at.lands().filter(l => l.tapped);
          if (tl.length < 2) return [];
          return tl.flatMap((a,i) => tl.slice(i+1).map(b => {
            let s = at.untapPermanent(a.id);
            return s.untapPermanent(b.id).log(`Ley Weaver → untap ${a.name} + ${b.name}`);
          }));
        },
      },
    },
  },

  saryth: {
    name: "Saryth, the Viper's Fang", types:['creature'], subtypes:['Human','Warlock'], cost:'2GG', power:3,toughness:3,
    abilities: {
      untap_permanent: {
        label: '{1}, {T}: Untap another creature or land',
        fn(state, perm) {
          if (perm.tapped || perm.summoningSick) return [];
          const ap = state.payMana('1'); if (!ap) return [];
          const targets = [...ap.lands().filter(l=>l.tapped), ...ap.creatures().filter(c=>c.tapped&&c.id!==perm.id)];
          return targets.flatMap(t => {
            let s = ap.tapPermanent(perm.id); if (!s) return [];
            return [s.untapPermanent(t.id).log(`Saryth → untap ${t.name}`)];
          });
        },
      },
    },
  },

  formidable_speaker: {
    name: 'Formidable Speaker', types:['creature'], subtypes:['Elf','Druid'], cost:'2G', power:2,toughness:2,
    abilities: {
      untap_permanent: {
        label: '{1}, {T}: Untap another target permanent',
        fn(state, perm) {
          if (perm.tapped || perm.summoningSick) return [];
          const ap = state.payMana('1'); if (!ap) return [];
          return ap.battlefield.filter(p=>p.tapped&&p.id!==perm.id).flatMap(t => {
            let s = ap.tapPermanent(perm.id); if (!s) return [];
            return [s.untapPermanent(t.id).log(`Formidable Speaker → untap ${t.name}`)];
          });
        },
      },
    },
  },

  earthcraft: {
    name: 'Earthcraft', types:['enchantment'], subtypes:[], cost:'1G',
    abilities: {
      tap_creature_untap_land: {
        label: 'Tap untapped creature: Untap target basic land',
        fn(state, perm) {
          const results = [];
          const untapped = state.creatures().filter(c=>!c.tapped&&!c.summoningSick);
          const tbasic  = state.lands().filter(l=>l.tapped&&(l.subtypes&&l.subtypes.includes('Forest')));
          for (const c of untapped) for (const l of tbasic) {
            let s = state.tapPermanent(c.id); if (!s) continue;
            results.push(s.untapPermanent(l.id).log(`Earthcraft: tap ${c.name} → untap ${l.name}`));
          }
          return results;
        },
      },
    },
  },

  temur_sabertooth: {
    name: 'Temur Sabertooth', types:['creature'], subtypes:['Cat'], cost:'2GG', power:4,toughness:3,
    abilities: {
      bounce_creature: {
        label: '{1}{G}: Return another creature to hand',
        fn(state, perm) {
          if (perm.summoningSick) return [];
          const ap = state.payMana('1G'); if (!ap) return [];
          const cards = CARDS;
          return state.creatures().filter(c=>c.id!==perm.id).flatMap(c => {
            let s = ap.removeFromBattlefield(c.id, null); if (!s) return [];
            const ck = Object.keys(cards).find(k=>cards[k].name===c.name);
            if (ck) s = s.addToHand(ck);
            return [s.log(`Temur Sabertooth → return ${c.name} to hand`)];
          });
        },
      },
    },
  },

  kogla: {
    name: 'Kogla, the Titan Ape', types:['creature'], subtypes:['Ape'], cost:'3GGG', power:7,toughness:6,
    abilities: {
      bounce_human: {
        label: '{1}{G}: Return target Human you control to hand',
        fn(state, perm) {
          const ap = state.payMana('1G'); if (!ap) return [];
          const cards = CARDS;
          return state.creatures().filter(c=>c.subtypes&&c.subtypes.includes('Human')).flatMap(c => {
            let s = ap.removeFromBattlefield(c.id, null); if (!s) return [];
            const ck = Object.keys(cards).find(k=>cards[k].name===c.name);
            if (ck) s = s.addToHand(ck);
            return [s.log(`Kogla → return ${c.name} to hand`)];
          });
        },
      },
    },
  },

  // ─── CREATURES — Other ───────────────────────────────────────────────────

  ashaya: {
    name: 'Ashaya, Soul of the Wild', types:['creature'], subtypes:['Elemental'], cost:'3GG', power:0,toughness:0,
    onEnter(state, perm) { return state; },
  },

  yeva:                { name:"Yeva, Nature's Herald",      types:['creature'],subtypes:['Elf','Shaman'],      cost:'2GG',  power:4,toughness:4 },
  eternal_witness: {
    name: 'Eternal Witness', types: ['creature'], subtypes: ['Human','Shaman'],
    cost: '1GG', power: 2, toughness: 1,
    // ETB: return target card from your graveyard to hand — handled in GameState.enterBattlefield.
  },
  eladamri: {
    name: 'Eladamri, Korvecdal', types: ['creature'], subtypes: ['Elf','Warrior'],
    cost: '1GG', power: 2, toughness: 3,
    // See top of library, cast creatures from top.
    // {G}, {T}, tap two untapped creatures: put a creature from top/hand onto battlefield.
    abilities: {
      cheat_into_play: {
        label: '{G}, {T}, Tap 2 untapped creatures: Put a creature onto battlefield',
        fn(state, perm) {
          if (perm.tapped || perm.summoningSick) return [];
          const ap = state.payMana('G'); if (!ap) return [];
          const others = ap.creatures().filter(c =>
            c.id !== perm.id && !c.tapped && !c.summoningSick
          );
          if (others.length < 2) return [];
          const cards = CARDS;
          const creaturesInHand = [...new Set(ap.hand)].filter(k =>
            cards[k] && cards[k].types.includes('creature')
          );
          if (creaturesInHand.length === 0) return [];
          const results = [];
          for (const target of creaturesInHand) {
            let s = ap.tapPermanent(perm.id); if (!s) continue;
            s = s.tapPermanent(others[0].id);
            s = s.tapPermanent(others[1].id);
            s = s.removeFromHand(target);
            if (!s) continue;
            s = s.enterBattlefield(target);
            results.push(s.log(`Eladamri: put ${cards[target].name} onto battlefield`));
          }
          return results;
        },
      },
    },
  },
  seedborn_muse: {
    name: 'Seedborn Muse', types: ['creature'], subtypes: ['Spirit'],
    cost: '3GG', power: 2, toughness: 4,
    // Static: untap all your permanents during each other player's untap step.
    // Modeled as: each call to startNewTurn() checks for Muse and untaps extra.
    // (Multiple turns = extra untap opportunities — tracked in Solver's turn loop.)
  },
  beast_whisperer: {
    name: 'Beast Whisperer', types: ['creature'], subtypes: ['Elf','Druid'],
    cost: '2GG', power: 2, toughness: 3,
    // Static trigger: whenever you cast a creature spell, draw a card.
    // Modeled in actions.js: cast_spell with a creature draws if Whisperer is in play.
  },
  regal_force: {
    name: 'Regal Force', types: ['creature'], subtypes: ['Elemental'],
    cost: '4GGG', power: 5, toughness: 5,
    // ETB: draw a card for each green creature you control — handled in GameState.enterBattlefield.
  },
  woodland_bellower: {
    name: 'Woodland Bellower', types: ['creature'], subtypes: ['Beast'],
    cost: '4GG', power: 6, toughness: 5,
    // ETB: search library for a nonlegendary green creature with MV ≤ 3, put it on BF.
    // Modeled as: on entry, generate states for each eligible card in hand.
    // (Library search is approximated by hand for the solver.)
    onEnterAbilities: {
      tutor_small_green: {
        label: 'ETB: Put a nonlegendary green creature (MV≤3) from library onto battlefield',
        fn(state, perm) {
          const cards = CARDS;
          const results = [];
          // Proxy: check hand for CMC-3 green nonlegendary creatures
          const eligible = [...new Set(state.hand)].filter(k => {
            const def = cards[k];
            if (!def || !def.types.includes('creature')) return false;
            if (def.subtypes && def.subtypes.includes('Legendary')) return false;
            const cost = def.cost || '';
            const cmc = cost.split('').reduce((n, c) => {
              if (/\d/.test(c)) return n + parseInt(c);
              if ('WUBRGC'.includes(c)) return n + 1;
              return n;
            }, 0);
            return cmc <= 3 && cost.includes('G');
          });
          for (const k of eligible) {
            let s = state.removeFromHand(k);
            if (!s) continue;
            s = s.enterBattlefield(k);
            results.push(s.log(`Woodland Bellower ETB: put ${cards[k].name} onto battlefield`));
          }
          if (results.length === 0) results.push(state.log('Woodland Bellower ETB: no valid target'));
          return results;
        },
      },
    },
  },
  great_oak_guardian: {
    name: 'Great Oak Guardian', types: ['creature'], subtypes: ['Treefolk'],
    cost: '5G', power: 4, toughness: 5,
    // Flash. ETB: creatures target player controls get +2/+2 and untap.
    // Untap is handled in GameState.enterBattlefield. +2/+2 is cosmetic (not tracked).
  },
  endurance: {
    name: 'Endurance', types: ['creature'], subtypes: ['Elemental', 'Incarnation'],
    cost: '1GG', power: 3, toughness: 4,
    /**
     * Flash (can be cast any time you could cast an instant — handled by caller).
     * Reach (keyword, no activation).
     *
     * ETB: Up to one target player puts all cards from their graveyard on the
     *      bottom of their library in a random order.
     *      → In solver terms: target player's graveyard is shuffled back into
     *        their library and their graveyard becomes empty.
     *
     * Evoke — Exile a green card from your hand (alternative cast cost).
     *         If evoked, the ETB trigger still fires, then Endurance is sacrificed.
     */
    abilities: {
      // Normal ETB — target any player's graveyard
      etb_shuffle_graveyard: {
        label: 'ETB: Shuffle target player\'s graveyard into their library',
        fn(state, perm) {
          const results = [];
          for (let pi = 0; pi < state.players.length; pi++) {
            const player = state.players[pi];
            // Only useful if the target actually has cards in their graveyard
            if (player.graveyard.length === 0 && pi !== 0) continue;
            let s = state.shuffleGraveyardIntoLibrary(pi);
            s = s.log(
              `Endurance ETB: ${player.name}\'s graveyard (${player.graveyard.length} card${player.graveyard.length !== 1 ? 's' : ''}) shuffled into library`
            );
            results.push(s);
          }
          // Also allow targeting no one (optional "up to one")
          results.push(state.log('Endurance ETB: no target chosen'));
          return results;
        },
      },

      // Evoke — exile a green card from hand as the alternative cost
      evoke: {
        label: 'Evoke: Exile a green card from hand (ETB fires, then sacrifice)',
        fn(state, perm) {
          // Find green cards in hand (simplified: any non-land card qualifies as green)
          const cards = CARDS;
          const greenCards = state.hand.filter(k => {
            const def = cards[k];
            return def && !def.types.includes('land') && (def.cost || '').includes('G');
          });
          if (greenCards.length === 0) return [];

          const results = [];
          for (const cardKey of [...new Set(greenCards)]) {
            // Pay by exiling the card from hand
            let s = state.removeFromHand(cardKey);
            if (!s) continue;
            // The exiled card goes to your exile pile
            const cardName = cards[cardKey]?.name ?? cardKey;
            s = s.addToExile(0, cardName);

            // ETB trigger: shuffle target player's graveyard
            for (let pi = 0; pi < s.players.length; pi++) {
              const player = s.players[pi];
              let ns = s.shuffleGraveyardIntoLibrary(pi);
              // Then sacrifice Endurance
              ns = ns.removeFromBattlefield(perm.id, 'graveyard', 0);
              if (!ns) continue;
              ns = ns.log(
                `Endurance evoke (exile ${cardName}): ${player.name}\'s graveyard shuffled; Endurance sacrificed`
              );
              results.push(ns);
            }
          }
          return results;
        },
      },
    },
  },
  collector_ouphe:     { name:'Collector Ouphe',            types:['creature'],subtypes:['Ouphe'],             cost:'1G',   power:2,toughness:2 },
  skyshroud_poacher: {
    name: 'Skyshroud Poacher', types: ['creature'], subtypes: ['Human','Rebel'],
    cost: '2GG', power: 2, toughness: 4,
    // {3}, {T}: Search library for an Elf permanent card, put it onto the battlefield.
    abilities: {
      tutor_elf: {
        label: '{3}, {T}: Search library for an Elf, put onto battlefield',
        fn(state, perm) {
          if (perm.tapped || perm.summoningSick) return [];
          const ap = state.payMana('3'); if (!ap) return [];
          let s = ap.tapPermanent(perm.id); if (!s) return [];
          const cards = CARDS;
          // Find Elves in hand that could be tutored
          const elfKeys = [...new Set(state.hand)].filter(k =>
            cards[k] && cards[k].subtypes && cards[k].subtypes.includes('Elf')
          );
          const results = [];
          if (elfKeys.length > 0) {
            for (const k of elfKeys) {
              let ns = s.removeFromHand(k);
              if (!ns) continue;
              ns = ns.enterBattlefield(k);
              results.push(ns.log(`Skyshroud Poacher: put ${cards[k].name} onto battlefield`));
            }
          } else {
            // Approximate as card draw from library
            s = s.playerDraws(0, 1);
            results.push(s.log('Skyshroud Poacher: search library for an Elf'));
          }
          return results;
        },
      },
    },
  },
  fierce_empath:       { name:'Fierce Empath',              types:['creature'],subtypes:['Elf'],               cost:'2G',   power:1,toughness:1 },
  reclamation_sage: {
    name: 'Reclamation Sage', types: ['creature'], subtypes: ['Elf','Shaman'],
    cost: '2G', power: 2, toughness: 1,
    // ETB: destroy target artifact or enchantment.
    // Modeled as: if an opponent artifact/enchantment exists, remove it.
    // For the solver this is a utility effect, not a combo piece — simplified.
  },
  scavenging_ooze: {
    name: 'Scavenging Ooze', types: ['creature'], subtypes: ['Ooze'],
    cost: '1G', power: 2, toughness: 2,
    // {G}: Exile a card from a graveyard. If a creature card, +1/+1 and gain 1 life.
    abilities: {
      exile_from_gy: {
        label: '{G}: Exile a card from a graveyard, gain 1 life if creature',
        fn(state, perm) {
          if (perm.summoningSick) return [];
          const ap = state.payMana('G'); if (!ap) return [];
          // Check if any graveyard has cards
          const anyGY = state.players.some(p => p.graveyard.length > 0);
          if (!anyGY) return [];
          const results = [];
          for (let pi = 0; pi < state.players.length; pi++) {
            const player = state.players[pi];
            if (player.graveyard.length === 0) continue;
            // Exile top card
            const cardName = player.graveyard[0];
            let s = ap.exileFromGraveyard(pi, cardName); if (!s) continue;
            // Gain life (assume it's a creature for simplicity)
            s = s.gainLife(0, 1);
            s = s.log(`Scavenging Ooze: exile ${cardName} from ${player.name}'s graveyard, gain 1 life`);
            results.push(s);
          }
          return results;
        },
      },
    },
  },
  surrak_goreclaw: {
    name: 'Surrak and Goreclaw', types: ['creature'], subtypes: ['Human','Bear'],
    cost: '4GG', power: 7, toughness: 6,
    // Other creatures have trample. Nontoken creatures get +1/+1 and haste when entering.
    // ETB haste modeled in GameState (like Concordant Crossroads for newly entering creatures).
  },
  defiler_of_vigor: {
    name: 'Defiler of Vigor', types: ['creature'], subtypes: ['Phyrexian','Wurm'],
    cost: '3GG', power: 6, toughness: 6,
    // Additional cost: may pay 2 life instead of {G} when casting green permanents.
    // Static: whenever you cast a green permanent, put +1/+1 on each creature you control.
    // These are passive effects tracked by the engine context.
  },
  glademuse: {
    name: 'Glademuse', types: ['creature'], subtypes: ['Beast'], cost: '2G',
    power: 3, toughness: 3,
    // Whenever a player casts a spell on someone else's turn, that player draws a card.
    // This engine models only your turns, so this triggers when opponents cast during your turn.
    // Simplified: gives you card draw when opponents cast instants.
    // Not modeled in the solver (complex multi-player timing).
  },
  duskwatch_recruiter: {
    name: 'Duskwatch Recruiter', types: ['creature'], subtypes: ['Human','Warrior','Werewolf'],
    cost: '1G', power: 2, toughness: 2,
    // {2G},{T}: Search library for a creature and put it in hand.
    // Now uses the real library to fetch actual creature keys.
    abilities: {
      look_three: {
        label: '{2}{G}, {T}: Search library for a creature, put in hand',
        fn(state, perm) {
          if (perm.tapped || perm.summoningSick) return [];
          const ap = state.payMana('2G'); if (!ap) return [];
          let s = ap.tapPermanent(perm.id); if (!s) return [];
          const cards = CARDS;
          const results = [];
          const seen = new Set();
          for (const ck of s.players[0].library) {
            if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
            seen.add(ck);
            const def = cards[ck];
            if (!def || !def.types.includes('creature')) continue;
            const { state: ns, cardKey } = s.searchLibraryFor(k => k === ck);
            if (!cardKey) continue;
            results.push(ns.addToHand(cardKey).log(`Duskwatch Recruiter → find ${def.name}`));
          }
          // Fallback if library empty or no creatures found
          if (results.length === 0) {
            results.push(s.playerDraws(0, 1).log('Duskwatch Recruiter: no creature found'));
          }
          return results;
        },
      },
    },
  },
  runic_armasaur: {
    name: 'Runic Armasaur', types: ['creature'], subtypes: ['Dinosaur'],
    cost: '1GG', power: 2, toughness: 3,
    // Whenever an opponent activates a non-mana ability of a creature or land, draw a card.
    // Not modeled in the solver (triggers on opponent actions).
  },
  heartwood_storyteller:{ name:'Heartwood Storyteller',     types:['creature'],subtypes:['Treefolk'],          cost:'1GG',  power:2,toughness:3 },
  destiny_spinner:     { name:'Destiny Spinner',            types:['creature','enchantment'],subtypes:['Human'],cost:'1G',  power:2,toughness:2 },
  treefolk_harbinger:  { name:'Treefolk Harbinger',         types:['creature'],subtypes:['Treefolk','Druid'],  cost:'G',    power:1,toughness:1 },
  chomping_changeling: { name:'Chomping Changeling',        types:['creature'],subtypes:['Shapeshifter'],      cost:'2G',   power:3,toughness:3 },
  lotus_cobra: {
    name: 'Lotus Cobra', types: ['creature'], subtypes: ['Snake'], cost: '1G',
    power: 2, toughness: 1,
    // Landfall: whenever a land enters, add one mana of any color.
    // This is applied in actions.js: after play_land, check for Cobra and add {G}.
    // Modeled as a pseudo-ability that the action generator fires automatically.
  },
  nissa_animist:       { name:'Nissa, Resurgent Animist',   types:['creature'],subtypes:['Elf','Scout'],       cost:'2G',   power:2,toughness:3 },
  skullwinder: {
    name: 'Skullwinder', types: ['creature'], subtypes: ['Snake'],
    cost: '2G', power: 1, toughness: 3,
    // Deathtouch. ETB: return target card from YOUR graveyard to hand,
    // then choose an opponent to return a card from THEIR graveyard.
    // Simplified: return top card of your graveyard to hand on ETB.
    // (Handled like Eternal Witness — same ETB pattern)
  },
  manglehorn: { name: 'Manglehorn', types: ['creature'], subtypes: ['Beast'], cost: '2G', power: 2, toughness: 2 },
  tireless_provisioner: {
    name: 'Tireless Provisioner', types: ['creature'], subtypes: ['Elf','Scout'],
    cost: '2G', power: 3, toughness: 2,
    // Landfall: create a Food or Treasure token.
    // Modeled as: when a land enters while Provisioner is on BF, a Treasure enters.
    // The Treasure token produces one mana of any color (modeled as {G} for solver).
  },
  sowing_mycospawn: {
    name: 'Sowing Mycospawn', types: ['creature'], subtypes: ['Eldrazi','Fungus'],
    cost: '3G', power: 4, toughness: 4,
    // On cast: search library for a land, put it onto the battlefield.
    // ETB with kicker: exile target land. Devoid (colorless).
  },
  badgermole_cub: {
    name: 'Badgermole Cub', types: ['creature'], subtypes: ['Badger','Mole'],
    cost: '1G', power: 2, toughness: 2,
    // ETB: earthbend 1 (land becomes a 0/0+1/1 creature with haste).
    // Static: whenever you tap a creature for mana, add {G}.
    // The static is the same as Leyline of Abundance — modeled in tap_for_mana.
    // Earthbend is complex — stub for now.
  },
  outland_liberator: {
    name: 'Outland Liberator', types: ['creature'], subtypes: ['Human','Werewolf'],
    cost: '1G', power: 2, toughness: 2,
    // {1}, Sacrifice: Destroy target artifact or enchantment.
    abilities: {
      sac_destroy: {
        label: '{1}, Sacrifice: Destroy target artifact or enchantment',
        fn(state, perm) {
          const ap = state.payMana('1'); if (!ap) return [];
          let s = ap.removeFromBattlefield(perm.id, 'graveyard'); if (!s) return [];
          return [s.log('Outland Liberator: sacrifice to destroy an artifact or enchantment')];
        },
      },
    },
  },
  fauna_shaman: {
    name: 'Fauna Shaman', types: ['creature'], subtypes: ['Elf','Shaman'],
    cost: '1G', power: 2, toughness: 2,
    // {G}, {T}: Discard a creature → tutor for a creature card, put in hand.
    abilities: {
      tutor: {
        label: '{G}, {T}: Discard a creature, search for a creature',
        fn(state, perm) {
          if (perm.tapped || perm.summoningSick) return [];
          const ap = state.payMana('G'); if (!ap) return [];
          const cards = CARDS;
          const creaturesInHand = [...new Set(ap.hand)].filter(k =>
            cards[k] && cards[k].types.includes('creature')
          );
          if (creaturesInHand.length === 0) return [];
          const results = [];
          for (const discard of creaturesInHand) {
            let s = ap.tapPermanent(perm.id); if (!s) continue;
            s = s.discardFromHand(discard); if (!s) continue;
            s = s.playerDraws(0, 1);
            s = s.log(`Fauna Shaman: discard ${cards[discard].name}, tutor a creature`);
            results.push(s);
          }
          return results;
        },
      },
    },
  },
  elvish_reclaimer2: { name: 'Elvish Reclaimer', types: ['creature'], subtypes: ['Elf','Warrior'], cost: 'G', power: 1, toughness: 1 },
  yisan: {
    name: 'Yisan, the Wanderer Bard', types: ['creature'], subtypes: ['Human','Rogue','Bard'],
    cost: '2G', power: 2, toughness: 3,
    // {2G}, {T}: Put a verse counter on Yisan, then search library for a creature
    // with MV equal to the number of verse counters. Put it onto the battlefield.
    abilities: {
      verse: {
        label: '{2}{G}, {T}: Add verse counter, tutor creature with MV = verses',
        fn(state, perm) {
          if (perm.tapped || perm.summoningSick) return [];
          const ap = state.payMana('2G'); if (!ap) return [];
          let s = ap.tapPermanent(perm.id); if (!s) return [];
          // Track verse counters
          const verses = (perm.counters?.verse || 0) + 1;
          const livePerm = s.getPermanentById(perm.id);
          if (livePerm) livePerm.counters = { ...livePerm.counters, verse: verses };
          // Draw one card (tutoring approximated as card draw)
          s = s.playerDraws(0, 1);
          return [s.log(`Yisan: verse counter ${verses}, tutor creature with MV ${verses}`)];
        },
      },
    },
  },
  genesis_hydra:       { name:'Genesis Hydra',              types:['creature'],subtypes:['Plant','Hydra'],     cost:'XGG',  power:0,toughness:0 },
  king_coldblood: {
    name: 'King of the Coldblood Curse', types: ['creature'], subtypes: ['Lizard','Villain'],
    cost: '2GG', power: 4, toughness: 4,
    // ETB: up to one other target creature loses all abilities and becomes a 4/4 green Lizard.
  },
  disciple_freyalise: {
    name: 'Disciple of Freyalise', types: ['creature'], subtypes: ['Elf','Druid'],
    cost: '3GGG', power: 4, toughness: 4,
    // ETB: may sacrifice another creature; gain X life and draw X cards where X = power.
    // Also has a modal land backside, but that's a double-faced card — stub the creature side.
  },
  hyrax_tower_scout: {
    name: 'Hyrax Tower Scout', types: ['creature'], subtypes: ['Human','Scout'],
    cost: '2G', power: 2, toughness: 2,
    // ETB: untap target creature — handled in GameState.enterBattlefield (untaps first tapped creature).
  },
  woodcaller_automaton: {
    name: 'Woodcaller Automaton', types: ['creature','artifact'], subtypes: ['Construct'],
    cost: '10', power: 7, toughness: 7,
    // Prototype {2GG} — 3/3. ETB: untap target land, becomes a Treefolk with haste.
    // Prototype cost modeled as alternative cast cost.
    abilities: {},
  },
  cabbage_merchant: {
    name: 'The Cabbage Merchant', types: ['creature'], subtypes: ['Human','Citizen'],
    cost: '2G', power: 2, toughness: 2,
    // Creates Food tokens when opponents cast noncreatures.
    // Tap two untapped Foods: add one mana of any color.
    // Complex triggered ability; not modeled in solver.
  },
  beastrider_vanguard: {
    name: 'Beastrider Vanguard', types: ['creature'], subtypes: ['Human','Knight'],
    cost: '1G', power: 2, toughness: 2,
    // {4G}: Look at top 3, may put a permanent card in hand.
    abilities: {
      look_three: {
        label: '{4}{G}: Look at top 3 cards, may put a permanent in hand',
        fn(state, perm) {
          if (perm.summoningSick) return [];
          const ap = state.payMana('4G'); if (!ap) return [];
          let s = ap.playerDraws(0, 1);
          return [s.log('Beastrider Vanguard: look at top 3, take a permanent')];
        },
      },
    },
  },

  // ─── ENCHANTMENTS ────────────────────────────────────────────────────────

  concordant_crossroads: {
    name: 'Concordant Crossroads', types: ['enchantment'], subtypes: [], cost: 'G',
    // Static: all creatures have haste (implemented as no summoning sickness on ETB in GameState).
    // No activated ability needed.
  },
  leyline_of_abundance: {
    name: 'Leyline of Abundance', types: ['enchantment'], subtypes: [], cost: '2GG',
    // Static: whenever you tap a creature for mana, add {G}.
    // This is checked in actions.js after creature tap-for-mana resolves.
    // Activated: {6GG}: put a +1/+1 counter on each creature you control.
    abilities: {
      mass_counter: {
        label: '{6}{G}{G}: Put +1/+1 counter on each creature you control',
        fn(state, perm) {
          const ap = state.payMana('6GG'); if (!ap) return [];
          const s = ap.clone();
          for (const bf of s.battlefield) {
            if (bf.is('creature')) bf.counters['+1/+1'] = (bf.counters['+1/+1'] || 0) + 1;
          }
          return [s.log('Leyline of Abundance: +1/+1 counters on all creatures')];
        },
      },
    },
  },
  sylvan_library: {
    name: 'Sylvan Library', types: ['enchantment'], subtypes: [], cost: '1G',
    // Draw step: may draw 2 extra cards; put back or pay 4 life each.
    // Modeled as: once per turn, pay 4 life to draw a card.
    abilities: {
      draw_pay_life: {
        label: 'Pay 4 life: Draw a card (Sylvan Library)',
        fn(state, perm) {
          if (perm.abilitiesUsed?.draw_pay_life) return [];
          if (state.life <= 4) return [];
          let s = state.clone();
          s.players[0] = s.players[0].clone();
          s.players[0].life -= 4;
          s = s.playerDraws(0, 1);
          s = s.markAbilityUsed(perm.id, 'draw_pay_life');
          return [s.log('Sylvan Library: pay 4 life, draw a card')];
        },
      },
    },
  },
  guardian_project: {
    name: 'Guardian Project', types: ['enchantment'], subtypes: [], cost: '3G',
    // Draw a card when a nontoken creature enters if it doesn't share a name
    // with another creature you control or in your graveyard.
    // Modeled as: draw when any creature enters (simplified — name check skipped for solver).
    // Applied in actions.js cast_spell trigger.
  },
  compost:                { name:'Compost',                 types:['enchantment'],subtypes:[],              cost:'1G' },
  viridian_revel:         { name:'Viridian Revel',          types:['enchantment'],subtypes:[],              cost:'1GG' },
  utopia_sprawl: {
    name: 'Utopia Sprawl', types: ['enchantment'], subtypes: ['Aura'], cost: 'G',
    // Enchants a Forest. Whenever enchanted Forest is tapped for mana, add one extra mana.
    // Modeled as: when cast, attach to first untapped Forest; that Forest now produces +1G.
    // For solver purposes, plays as a mana-enhancer: if a Forest is in play, effectively
    // gives +1G whenever that Forest taps. We model this as a one-time mana boost on resolution.
    onEnter(state) {
      // Add one permanent {G} to represent the ongoing enchantment bonus
      // (simplified: +1G immediately, representing one activation cycle)
      return state.addMana('G');
    },
  },
  wild_growth: {
    name: 'Wild Growth', types: ['enchantment'], subtypes: ['Aura'], cost: 'G',
    // Enchant land. Whenever enchanted land is tapped for mana, add {G}.
    // Same model as Utopia Sprawl.
    onEnter(state) {
      return state.addMana('G');
    },
  },
  elvish_guidance: {
    name: 'Elvish Guidance', types: ['enchantment'], subtypes: ['Aura'], cost: '2G',
    // Enchant land. Tapping it adds {G} per Elf on the battlefield.
    // Modeled as: +G per Elf immediately on resolution (simplified for solver).
    onEnter(state) {
      const elfCount = state.battlefield.filter(p => p.subtypes && p.subtypes.includes('Elf')).length;
      let s = state;
      for (let i = 0; i < elfCount; i++) s = s.addMana('G');
      return s;
    },
  },
  carpet_of_flowers: {
    name: 'Carpet of Flowers', types: ['enchantment'], subtypes: [], cost: 'G',
    // At the beginning of each main phase, add X mana where X = Islands an opponent controls.
    // In the solver, opponents' boards are not tracked, so this gives {0} by default.
    // The ability is available but produces nothing without opponent Islands.
  },
  root_maze: {
    name: 'Root Maze', types: ['enchantment'], subtypes: [], cost: 'G',
    // Artifacts and lands enter tapped (stax). Hostile to combo — noted.
    // Solver will not voluntarily cast this unless directed.
  },
  survival_fittest: {
    name: 'Survival of the Fittest', types: ['enchantment'], subtypes: [], cost: '1G',
    // {G}, {T}: Discard a creature card → search library for a creature card, reveal, put in hand.
    // Modeled as: pay {G}, tap enchantment, discard one creature from hand, add any creature from hand.
    // (Library search approximated: swaps one creature card in hand for another.)
    abilities: {
      tutor: {
        label: '{G}, {T}: Discard a creature, search for a creature',
        fn(state, perm) {
          if (perm.tapped) return [];
          const ap = state.payMana('G'); if (!ap) return [];
          const cards = CARDS;
          const creaturesInHand = [...new Set(ap.hand)].filter(k => {
            const def = cards[k];
            return def && def.types.includes('creature');
          });
          if (creaturesInHand.length === 0) return [];
          const results = [];
          for (const discard of creaturesInHand) {
            let s = ap.tapPermanent(perm.id); if (!s) continue;
            s = s.discardFromHand(discard); if (!s) continue;
            // Library draw — draw 1 card (approximate as library-1)
            s = s.playerDraws(0, 1);
            s = s.log(`Survival of the Fittest: discard ${cards[discard].name}, tutor a creature`);
            results.push(s);
          }
          return results;
        },
      },
    },
  },
  lignify: { name: 'Lignify', types: ['enchantment'], subtypes: ['Aura','Treefolk'], cost: '1G' },
  kenriths_transformation: {
    name: "Kenrith's Transformation", types: ['enchantment'], subtypes: ['Aura'], cost: '1G',
    // ETB: draw a card. Enchanted creature loses abilities, becomes 3/3 Elk.
    onEnter(state) {
      return state.playerDraws(0, 1); // draw on ETB
    },
  },
  growing_rites: {
    name: 'Growing Rites of Itlimoc', types: ['enchantment'], subtypes: ['Legendary'], cost: '2G',
    // ETB: look at top 4, may reveal a creature and put in hand.
    // End step: if 4+ creatures, transform into Itlimoc.
    // Simplified: after casting, draw a card (ETB effect) and convert if 4+ creatures.
    onCast(state) {
      // Draw from ETB look (simplified to card draw)
      return state.playerDraws(0, 1);
    },
  },
  titania_song: { name: "Titania's Song", types: ['enchantment'], subtypes: [], cost: '3G' },

  // ─── INSTANTS & SORCERIES ────────────────────────────────────────────────

  chord_of_calling:       { name:'Chord of Calling',        types:['instant'],  subtypes:[], cost:'XGGG' },
  shared_summons:         { name:'Shared Summons',           types:['instant'],  subtypes:[], cost:'3GG'  },
  summoners_pact:         { name:"Summoner's Pact",          types:['instant'],  subtypes:[], cost:'0'    },
  archdruid_charm:        { name:"Archdruid's Charm",        types:['instant'],  subtypes:[], cost:'GGG'  },
  force_of_vigor:         { name:'Force of Vigor',           types:['instant'],  subtypes:[], cost:'2GG'  },
  beast_within:           { name:'Beast Within',             types:['instant'],  subtypes:[], cost:'2G'   },
  vitalize:               { name:'Vitalize',                 types:['instant'],  subtypes:[], cost:'G'    },
  touch_of_vitae:         { name:'Touch of Vitae',           types:['instant'],  subtypes:[], cost:'2G'   },
  legolas_quick_reflexes: { name:"Legolas's Quick Reflexes", types:['instant'],  subtypes:[], cost:'G'    },
  infectious_bite:        { name:'Infectious Bite',          types:['instant'],  subtypes:[], cost:'1G'   },
  natures_claim:          { name:"Nature's Claim",           types:['instant'],  subtypes:[], cost:'G'    },
  ram_through:            { name:'Ram Through',              types:['instant'],  subtypes:[], cost:'1G'   },
  tail_swipe:             { name:'Tail Swipe',               types:['instant'],  subtypes:[], cost:'G'    },
  bouncers_beatdown:      { name:"Bouncer's Beatdown",       types:['instant'],  subtypes:[], cost:'2G'   },
  autumn_veil:            { name:"Autumn's Veil",            types:['instant'],  subtypes:[], cost:'G'    },
  veil_of_summer:         { name:'Veil of Summer',           types:['instant'],  subtypes:[], cost:'G'    },
  warping_wail:           { name:'Warping Wail',             types:['instant'],  subtypes:[], cost:'1C'   },
  emerald_charm:          { name:'Emerald Charm',            types:['instant'],  subtypes:[], cost:'G'    },
  noxious_revival:        { name:'Noxious Revival',          types:['instant'],  subtypes:[], cost:'G'    },
  worldly_tutor: {
    name: 'Worldly Tutor', types: ['instant'], subtypes: [], cost: 'G',
    // Oracle: Search library for a creature, REVEAL it, then SHUFFLE and put on TOP of library.
    // The card goes to the top of the library — player draws it on their next draw step.
    castFn(state) {
      const cards = CARDS;
      const results = [];
      const seen = new Set();
      for (const ck of state.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (!def || !def.types.includes('creature')) continue;
        const { state: ns, cardKey } = state.searchLibraryFor(k => k === ck);
        if (!cardKey) continue;
        // Shuffle (order irrelevant for solver) then put creature on top (index 0)
        const ns2 = ns.clone();
        ns2.players[0] = ns2.players[0].clone();
        ns2.players[0].library = [cardKey, ...ns2.players[0].library];
        results.push(ns2.log(`Worldly Tutor → put ${def.name} on top of library`));
      }
      return results.length ? results : [state.log('Worldly Tutor: no creature in library')];
    },
  },
  crop_rotation: {
    name: 'Crop Rotation', types: ['instant'], subtypes: [], cost: 'G',
    // Oracle: As an additional cost, sacrifice a land. Search → put land onto battlefield → shuffle.
    castFn(state) {
      const cards = CARDS;
      const results = [];
      // Must have a land to sacrifice (additional cost)
      const lands = state.lands();
      if (lands.length === 0) return [];
      // Generate one result per (sacrifice target, fetch target) combination.
      // For the solver: sacrifice the least-valuable land (first non-Cradle non-Nykthos land).
      // Sort sacrifice candidates: prefer expendable lands (not key engine lands).
      const KEEP = new Set(['gaeas_cradle','nykthos','yavimaya','wirewood_lodge','geier_reach','deserted_temple']);
      const sacrificeable = lands.filter(l => {
        const ck = Object.keys(cards).find(k => cards[k].name === l.name);
        return !KEEP.has(ck);
      });
      const sacrificeTargets = sacrificeable.length > 0 ? sacrificeable : lands;
      // Use first sacrifice target (simplest; solver can explore via branching)
      const sacLand = sacrificeTargets[0];
      const afterSac = state.removeFromBattlefield(sacLand.id, 'graveyard');
      if (!afterSac) return [];
      const seen = new Set();
      for (const ck of afterSac.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (!def || !def.types.includes('land')) continue;
        const { state: ns, cardKey } = afterSac.searchLibraryFor(k => k === ck);
        if (!cardKey) continue;
        results.push(ns.enterBattlefield(cardKey).log(`Crop Rotation: sac ${sacLand.name} → fetch ${def.name}`));
      }
      return results.length ? results : [afterSac.log('Crop Rotation: no land in library')];
    },
  },
  green_suns_zenith: {
    name: "Green Sun's Zenith", types: ['sorcery'], subtypes: [], cost: 'XG',
    castFn(state) {
      const cards = CARDS;
      const { parseCost } = _GSM;
      const xMax = state.mana.total();
      const results = [];
      const seen = new Set();
      for (const ck of state.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (!def || !def.types.includes('creature')) continue;
        if (!def.cost || !def.cost.includes('G')) continue;
        const parsed = parseCost(def.cost);
        const mv = parsed.generic + Object.values(parsed.colored).reduce((a,b)=>a+b,0);
        if (mv > xMax) continue;
        const { state: ns, cardKey } = state.searchLibraryFor(k => k === ck);
        if (!cardKey) continue;
        results.push(ns.enterBattlefield(cardKey).log(`Green Sun's Zenith → fetch ${def.name} (MV ${mv})`));
      }
      return results.length ? results : [state.log("Green Sun's Zenith: no eligible creature")];
    },
  },
  finale_of_devastation:  { name:'Finale of Devastation',    types:['sorcery'],  subtypes:[], cost:'XGG'  },
  natural_order: {
    name: 'Natural Order', types: ['sorcery'], subtypes: [], cost: '2GG',
    // Oracle: Sacrifice a green creature as additional cost. Search → any green creature onto BF → shuffle.
    castFn(state) {
      const cards = CARDS;
      const results = [];
      // Must have a green creature to sacrifice
      const greenCreatures = state.creatures().filter(c => {
        const ck = Object.keys(cards).find(k => cards[k].name === c.name);
        const def = ck ? cards[ck] : null;
        return def && def.cost && def.cost.includes('G');
      });
      if (greenCreatures.length === 0) return [];
      // Sacrifice the cheapest/least-valuable green creature
      const sacCreature = greenCreatures[0];
      const afterSac = state.removeFromBattlefield(sacCreature.id, 'graveyard');
      if (!afterSac) return [];
      const seen = new Set();
      for (const ck of afterSac.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (!def || !def.types.includes('creature')) continue;
        if (!def.cost || !def.cost.includes('G')) continue;
        const { state: ns, cardKey } = afterSac.searchLibraryFor(k => k === ck);
        if (!cardKey) continue;
        results.push(ns.enterBattlefield(cardKey).log(`Natural Order: sac ${sacCreature.name} → fetch ${def.name}`));
      }
      return results.length ? results : [afterSac.log('Natural Order: no green creature in library')];
    },
  },
  eldritch_evolution:     { name:'Eldritch Evolution',       types:['sorcery'],  subtypes:[], cost:'1GG'  },
  sylvan_scrying: {
    name: 'Sylvan Scrying', types: ['sorcery'], subtypes: [], cost: '1G',
    castFn(state) {
      const cards = CARDS;
      const results = [];
      const seen = new Set();
      for (const ck of state.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (!def || !def.types.includes('land')) continue;
        const { state: ns, cardKey } = state.searchLibraryFor(k => k === ck);
        if (!cardKey) continue;
        results.push(ns.addToHand(cardKey).log(`Sylvan Scrying → find ${def.name}`));
      }
      return results.length ? results : [state.log('Sylvan Scrying: no land in library')];
    },
  },
  natures_rhythm:         { name:"Nature's Rhythm",          types:['sorcery'],  subtypes:[], cost:'XGG'  },
  turntimber_symbiosis:   { name:'Turntimber Symbiosis',     types:['sorcery'],  subtypes:[], cost:'4GGG' },
  bridgeworks_battle:     { name:'Bridgeworks Battle',       types:['sorcery'],  subtypes:[], cost:'2G'   },

  // ─── Yeva commander ───────────────────────────────────────────────────────
  yeva: {
    name: 'Yeva, Nature\'s Herald',
    types: ['creature'], subtypes: ['Elf', 'Shaman'],
    cost: '2GG', power: 4, toughness: 4,
    hasFlash: true,
    // Static: you may cast green creature spells as though they had flash.
    // Implemented in actions.js: when Yeva is on battlefield or in command zone,
    // green creature spells gain the flash flag.
  },

  // ─── Other legendaries ────────────────────────────────────────────────────
  nylea_keen_eyed: {
    name: 'Nylea, Keen-Eyed',
    types: ['enchantment', 'creature'], subtypes: ['God'],
    cost: '3G', power: 5, toughness: 6,
    // Indestructible. Creature spells cost {1} less. {2G}: reveal top, put creature in hand.
    // Cost reduction modelled via effectiveCost in actions.js (similar to Emerald Medallion).
  },
};

// GameState.js
/**
 * MTG Combo Solver — GameState
 *
 * Immutable (clone-on-write) game state. Every action returns a new
 * GameState so the solver can explore branches without side effects.
 *
 * ── Zone ownership ────────────────────────────────────────────────────────
 *   Each of the four players owns their own graveyard and exile pile.
 *   The battlefield and stack are shared zones.
 *   Hand/library are per-player (library tracked as a count).
 *
 *   players[0] = you (active player)
 *   players[1..3] = opponents
 *
 * ── Per-player state ──────────────────────────────────────────────────────
 *   life        — 40 in Commander; ≤ 0 → lose
 *   librarySize — cards remaining; drawing from 0 → lose
 *   poison      — ≥ 10 → lose
 *   graveyard   — string[] of card names in your graveyard (ordered, top-first)
 *   exile       — string[] of card names in your exile
 */

// ═══════════════════════════════════════════════════════════════════════════
//  Constants
// ═══════════════════════════════════════════════════════════════════════════

const DEFAULT_LIBRARY_SIZE    = 99;   // Commander deck minus commander (used as fallback)
const POISON_LOSS_THRESHOLD   = 10;

// ── Authoritative 100-card Yeva decklist (card keys) ─────────────────────
// Yeva is included here; she is removed when building the library since she
// starts in the command zone.  Cards in hand/battlefield/graveyard/exile are
// also removed before the library is assembled.
const DEFAULT_DECKLIST = [
  'allosaurus_shepherd','ancient_tomb','arbor_elf','archdruid_charm',
  'argothian_elder','ashaya','badgermole_cub','beast_whisperer',
  'beast_within','birds_of_paradise','boreal_druid','boseiju',
  'chomping_changeling','chord_of_calling','chrome_mox','circle_of_dreams_druid',
  'collector_ouphe','crop_rotation','delighted_halfling','deserted_temple',
  'destiny_spinner','disciple_freyalise','dryad_arbor','duskwatch_recruiter',
  'earthcraft','eladamri','eldritch_evolution','elvish_archdruid',
  'elvish_guidance','elvish_harbinger','elvish_mystic','elvish_reclaimer2',
  'elvish_spirit_guide','emergence_zone','endurance','eternal_witness',
  'fanatic_of_rhonas','fauna_shaman','fierce_empath','force_of_vigor',
  'forest','forest','forest','forest','forest','forest','forest','forest','forest','forest',
  'formidable_speaker','fyndhorn_elves','gaeas_cradle','geier_reach',
  'glademuse','green_suns_zenith','growing_rites','heartwood_storyteller',
  'hope_tender','hyrax_tower_scout','karametra_acolyte','kogla',
  'legolas_quick_reflexes','llanowar_elves','lotus_petal','magus_of_the_candelabra',
  'misty_rainforest','mox_diamond','natural_order','natures_rhythm',
  'nykthos','priest_of_titania','quirion_ranger','regal_force',
  'scryb_ranger','seedborn_muse','shared_summons','shifting_woodland',
  'sol_ring','sowing_mycospawn','summoners_pact','survival_fittest',
  'sylvan_scrying','talon_gates','temur_sabertooth',
  'urza_cave','utopia_sprawl','verdant_catacombs','war_room','wild_growth',
  'windswept_heath','wirewood_lodge','wirewood_symbiote','woodcaller_automaton',
  'wooded_foothills','woodland_bellower','worldly_tutor',
  'yavimaya','yisan','yeva',
];

/**
 * Build the library for a new game.
 *
 * @param {object} opts
 * @param {string[]} opts.commandZone  Card keys in the command zone (removed from library)
 * @param {string[]} opts.hand         Card keys in the opening hand (removed from library)
 * @param {string[]} opts.battlefield  Card keys on the battlefield (removed from library)
 * @param {string[]} opts.graveyard    Card names in graveyard (not removed by key — names ≠ keys)
 * @returns {string[]} Shuffled library
 */
function buildDefaultLibrary(opts = {}) {
  const exclude = new Set([
    ...(opts.commandZone  ?? ['yeva']),
    ...(opts.hand         ?? []),
    ...(opts.battlefield  ?? []),
  ]);

  // Remove one copy per excluded key (multiset subtraction)
  const deck = [...DEFAULT_DECKLIST];
  for (const key of exclude) {
    const idx = deck.indexOf(key);
    if (idx !== -1) deck.splice(idx, 1);
  }

  // Fisher-Yates shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// ═══════════════════════════════════════════════════════════════════════════
//  Player
// ═══════════════════════════════════════════════════════════════════════════

class Player {
  /**
   * @param {object}   data
   * @param {string}   data.name
   * @param {number}   data.life
   * @param {string[]} data.library     card keys, index 0 = top of deck
   * @param {number}   data.librarySize fallback when library array not provided
   * @param {number}   data.poison
   * @param {string[]} data.graveyard   card names, index 0 = top of pile
   * @param {string[]} data.exile       card names
   */
  constructor(data = {}) {
    this.name      = data.name        ?? 'Player';
    this.life      = data.life        ?? 40;
    this.poison    = data.poison      ?? 0;
    this.graveyard = data.graveyard   ? [...data.graveyard] : [];
    this.exile     = data.exile       ? [...data.exile]     : [];

    // Library: prefer explicit array; fall back to size-only count (legacy)
    if (data.library && Array.isArray(data.library)) {
      this.library = [...data.library];
    } else {
      const sz = data.librarySize ?? DEFAULT_LIBRARY_SIZE;
      // Build a placeholder array of 'unknown' to represent unseen cards
      this.library = Array(sz).fill('unknown');
    }
  }

  get librarySize() { return this.library.length; }
  /** Backward-compat setter: resizes the library array to exactly N 'unknown' entries. */
  set librarySize(n) {
    if (n === this.library.length) return;
    if (n < this.library.length) {
      this.library = this.library.slice(0, n);
    } else {
      const extra = Array(n - this.library.length).fill('unknown');
      this.library = [...this.library, ...extra];
    }
  }

  clone() {
    return new Player({
      name:      this.name,
      life:      this.life,
      library:   [...this.library],
      poison:    this.poison,
      graveyard: [...this.graveyard],
      exile:     [...this.exile],
    });
  }

  /** Returns { lost: bool, reason?: string } */
  hasLost() {
    if (this.life <= 0)
      return { lost: true,  reason: `${this.name} has 0 or less life (${this.life})` };
    if (this.poison >= POISON_LOSS_THRESHOLD)
      return { lost: true,  reason: `${this.name} has ${this.poison} poison counters` };
    return { lost: false };
  }

  /**
   * Attempt to draw N cards. Removes from top of library array.
   * Returns drawn card keys (may be 'unknown' for opponent libraries).
   * librarySize is clamped to 0 — loss fires when getLosses() checks after draw.
   */
  draw(n = 1) {
    const p = this.clone();
    const drawn = p.library.splice(0, Math.min(n, p.library.length));
    // If we couldn't draw enough, library is empty (loss triggers on next check)
    return p;
  }

  /**
   * Draw and return the top card key (or null if empty).
   * Removes it from the library.
   */
  drawCard() {
    if (this.library.length === 0) return { player: this, cardKey: null };
    const p = this.clone();
    const cardKey = p.library.shift();
    return { player: p, cardKey };
  }

  /**
   * Search library for a card matching predicate fn(cardKey) → bool.
   * Returns { player, cardKey } — player has the card removed from library.
   * Returns { player: this, cardKey: null } if not found.
   */
  searchLibrary(fn) {
    const idx = this.library.findIndex(fn);
    if (idx === -1) return { player: this, cardKey: null };
    const p = this.clone();
    const [cardKey] = p.library.splice(idx, 1);
    return { player: p, cardKey };
  }

  /** Move the top N cards of the graveyard back into the library (shuffle). */
  shuffleGraveyardIntoLibrary() {
    const p = this.clone();
    // Append graveyard card names as 'unknown' keys (names ≠ keys, but close enough for size)
    p.library = [...p.library, ...p.graveyard.map(() => 'unknown')];
    p.graveyard = [];
    return p;
  }

  /** Put a card name on top of the graveyard. */
  putInGraveyard(cardName) {
    const p = this.clone();
    p.graveyard = [cardName, ...p.graveyard];
    return p;
  }

  /** Put a card name into exile. */
  putInExile(cardName) {
    const p = this.clone();
    p.exile = [...p.exile, cardName];
    return p;
  }

  /**
   * Exile a card from the graveyard by name.
   * Returns new Player or null if not found.
   */
  exileFromGraveyard(cardName) {
    const idx = this.graveyard.indexOf(cardName);
    if (idx === -1) return null;
    const p = this.clone();
    p.graveyard = p.graveyard.filter((_, i) => i !== idx);
    p.exile = [...p.exile, cardName];
    return p;
  }

  /**
   * Discard the named card (moves from hand into graveyard).
   * Hand is managed at the GameState level; this just adds to the pile.
   */
  receiveDiscard(cardName) {
    return this.putInGraveyard(cardName);
  }

  toString() {
    const lc = this.hasLost();
    const status = lc.lost ? ` ⚠ LOST` : '';
    return (
      `${this.name}: life=${this.life} lib=${this.librarySize} ` +
      `poison=${this.poison} gy=${this.graveyard.length} ex=${this.exile.length}${status}`
    );
  }

  /** Detailed zone dump for printSummary */
  toDetailedString() {
    const gy = this.graveyard.length
      ? `  GY  : ${this.graveyard.join(', ')}`
      : '  GY  : (empty)';
    const ex = this.exile.length
      ? `  Exile: ${this.exile.join(', ')}`
      : '  Exile: (empty)';
    return `${this.toString()}\n${gy}\n${ex}`;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  ManaPool
// ═══════════════════════════════════════════════════════════════════════════

class ManaPool {
  constructor(pool = {}) {
    this.W = pool.W ?? 0;
    this.U = pool.U ?? 0;
    this.B = pool.B ?? 0;
    this.R = pool.R ?? 0;
    this.G = pool.G ?? 0;
    this.C = pool.C ?? 0;
  }

  total() { return this.W + this.U + this.B + this.R + this.G + this.C; }
  clone() { return new ManaPool(this); }

  add(color, amount = 1) {
    const p = this.clone();
    p[color] += amount;
    return p;
  }

  pay(costStr) {
    const parsed = parseCost(costStr);
    const pool = this.clone();
    for (const [color, amt] of Object.entries(parsed.colored)) {
      if (pool[color] < amt) return null;
      pool[color] -= amt;
    }
    let generic = parsed.generic;
    for (const color of ['C', 'G', 'W', 'U', 'B', 'R']) {
      if (generic <= 0) break;
      const use = Math.min(generic, pool[color]);
      pool[color] -= use;
      generic -= use;
    }
    if (generic > 0) return null;
    return pool;
  }

  toString() {
    const parts = [];
    if (this.W) parts.push(`{W}x${this.W}`);
    if (this.U) parts.push(`{U}x${this.U}`);
    if (this.B) parts.push(`{B}x${this.B}`);
    if (this.R) parts.push(`{R}x${this.R}`);
    if (this.G) parts.push(`{G}x${this.G}`);
    if (this.C) parts.push(`{C}x${this.C}`);
    return parts.length ? parts.join(' ') : '{0}';
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  parseCost
// ═══════════════════════════════════════════════════════════════════════════

function parseCost(costStr) {
  if (!costStr || costStr === '0') return { generic: 0, colored: {} };
  const colored = {};
  let generic = 0;
  let i = 0;
  while (i < costStr.length) {
    const ch = costStr[i];
    if (/\d/.test(ch)) {
      let num = '';
      while (i < costStr.length && /\d/.test(costStr[i])) num += costStr[i++];
      generic += parseInt(num, 10);
    } else if ('WUBRGC'.includes(ch)) {
      colored[ch] = (colored[ch] || 0) + 1;
      i++;
    } else {
      i++;
    }
  }
  return { generic, colored };
}

// ═══════════════════════════════════════════════════════════════════════════
//  Permanent
// ═══════════════════════════════════════════════════════════════════════════

class Permanent {
  constructor(data) {
    this.id            = data.id;
    this.name          = data.name;
    this.types         = data.types       ?? [];
    this.subtypes      = data.subtypes    ?? [];
    this.tapped        = data.tapped      ?? false;
    this.summoningSick = data.summoningSick ?? false;
    this.cardKey       = data.cardKey;
    this.isForest      = data.isForest    ?? false;
    this.abilitiesUsed = data.abilitiesUsed ?? {};
    this.counters      = data.counters    ?? {};
    this.power         = data.power;
    this.toughness     = data.toughness;
  }

  is(type) { return this.types.includes(type.toLowerCase()); }

  clone() {
    return new Permanent({
      ...this,
      types:         [...this.types],
      subtypes:      [...this.subtypes],
      abilitiesUsed: { ...this.abilitiesUsed },
      counters:      { ...this.counters },
    });
  }

  get label() {
    const t = this.tapped        ? '[T]' : '   ';
    const s = this.summoningSick ? '[S]' : '   ';
    const f = this.isForest      ? '[Forest]' : '';
    const c = Object.entries(this.counters).map(([k, v]) => `${v}${k}`).join(' ');
    return `${t}${s} ${this.name}${f}${c ? ' (' + c + ')' : ''}`;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  GameState
// ═══════════════════════════════════════════════════════════════════════════

class GameState {
  /**
   * Construct a game state.
   *
   * Preferred form — explicit players array:
   *   new GameState({
   *     players: [
   *       { name:'You',        life:40, librarySize:99, poison:0, graveyard:[], exile:[] },
   *       { name:'Opponent 1', life:40, librarySize:99, poison:0, graveyard:[], exile:[] },
   *       { name:'Opponent 2', life:40, librarySize:99, poison:0, graveyard:[], exile:[] },
   *       { name:'Opponent 3', life:40, librarySize:99, poison:0, graveyard:[], exile:[] },
   *     ],
   *     hand: [...],
   *   })
   *
   * Legacy shorthand (your stats only, opponents default):
   *   new GameState({ life:40, hand:[...] })
   */
  constructor(data = {}) {
    this.turn          = data.turn        ?? 1;
    this.phase         = data.phase       ?? 'main1';
    this.landDrops     = data.landDrops   ?? 1;
    this.hand          = data.hand        ? [...data.hand] : [];
    this.battlefield   = data.battlefield
      ? data.battlefield.map(p => p instanceof Permanent ? p : new Permanent(p))
      : [];
    this.mana          = data.mana instanceof ManaPool ? data.mana : new ManaPool(data.mana ?? {});
    this.storm         = data.storm       ?? 0;
    this.comboAchieved = data.comboAchieved ?? false;
    this.comboName     = data.comboName     ?? null;
    this._nextId       = data._nextId       ?? 1;
    this.history       = data.history       ? [...data.history] : [];

    // ── Command zone ─────────────────────────────────────────────────────────
    // commandZone: card keys of commanders currently in the command zone
    // commanderTax: extra generic mana cost per previous commander cast
    this.commandZone    = data.commandZone  ? [...data.commandZone]  : ['yeva'];
    this.commanderTax   = data.commanderTax ?? 0;
    // isOpponentTurn: true when modelling a flash window on an opponent's turn
    this.isOpponentTurn = data.isOpponentTurn ?? false;

    // ── Players (own their zones) ────────────────────────────────────────────
    if (data.players && Array.isArray(data.players)) {
      this.players = data.players.map((p, i) =>
        p instanceof Player ? p : new Player({
          name:        p.name        ?? (i === 0 ? 'You' : `Opponent ${i}`),
          life:        p.life        ?? 40,
          library:     p.library     ?? null,
          librarySize: p.librarySize ?? DEFAULT_LIBRARY_SIZE,
          poison:      p.poison      ?? 0,
          graveyard:   p.graveyard   ?? [],
          exile:       p.exile       ?? [],
        })
      );
    } else {
      // Legacy: build player 0 with the default decklist library
      this.players = [
        new Player({
          name:      'You',
          life:      data.life        ?? 40,
          library:   data.library     ?? buildDefaultLibrary({
            commandZone: this.commandZone,
            hand:        this.hand,
          }),
          poison:    data.poison      ?? 0,
          graveyard: data.graveyard   ?? [],
          exile:     data.exile       ?? [],
        }),
        new Player({ name: 'Opponent 1' }),
        new Player({ name: 'Opponent 2' }),
        new Player({ name: 'Opponent 3' }),
      ];
    }
    while (this.players.length < 4) {
      this.players.push(new Player({ name: `Opponent ${this.players.length}` }));
    }
  }

  // ── Convenience zone accessors for active player (players[0]) ────────────

  get life()        { return this.players[0].life; }
  set life(v)       { this.players[0].life = v; }

  get librarySize() { return this.players[0].librarySize; }
  set librarySize(v){ this.players[0].librarySize = v; }

  get poison()      { return this.players[0].poison; }
  set poison(v)     { this.players[0].poison = v; }

  /** Your graveyard (top = index 0). */
  get graveyard()   { return this.players[0].graveyard; }
  set graveyard(v)  { this.players[0].graveyard = v; }

  /** Your exile pile. */
  get exile()       { return this.players[0].exile; }
  set exile(v)      { this.players[0].exile = v; }

  // ── Loss checks ───────────────────────────────────────────────────────────

  getLosses() {
    const losses = [];
    for (let i = 0; i < this.players.length; i++) {
      const check = this.players[i].hasLost();
      if (check.lost) losses.push({ playerIndex: i, player: this.players[i], reason: check.reason });
    }
    return losses;
  }

  youLost()          { return this.players[0].hasLost().lost; }
  opponentsAllLost() { return this.players.slice(1).every(p => p.hasLost().lost); }

  // ── Permanent helpers ─────────────────────────────────────────────────────

  creatures()         { return this.battlefield.filter(p => p.is('creature')); }
  lands()             { return this.battlefield.filter(p => p.is('land')); }
  untappedLands()     { return this.lands().filter(p => !p.tapped); }
  untappedCreatures() { return this.creatures().filter(p => !p.tapped && !p.summoningSick); }
  hasPermanent(name)  { return this.battlefield.some(p => p.name === name); }
  getPermanent(name)  { return this.battlefield.find(p => p.name === name); }
  getPermanentById(id){ return this.battlefield.find(p => p.id === id); }

  forestsInHand() {
    return this.hand.filter(c => {
      const def = CARDS[c];
      return def && def.subtypes && def.subtypes.includes('Forest');
    });
  }

  // ── Clone ─────────────────────────────────────────────────────────────────

  clone() {
    return new GameState({
      turn:           this.turn,
      phase:          this.phase,
      landDrops:      this.landDrops,
      hand:           [...this.hand],
      battlefield:    this.battlefield.map(p => p.clone()),
      mana:           this.mana.clone(),
      storm:          this.storm,
      comboAchieved:  this.comboAchieved,
      comboName:      this.comboName,
      _nextId:        this._nextId,
      history:        [...this.history],
      players:        this.players.map(p => p.clone()),
      commandZone:    [...this.commandZone],
      commanderTax:   this.commanderTax,
      isOpponentTurn: this.isOpponentTurn ?? false,
    });
  }

  // ── Logging ───────────────────────────────────────────────────────────────

  log(msg) {
    const s = this.clone();
    s.history = [...s.history, { turn: s.turn, msg }];
    return s;
  }

  // ── Mana ─────────────────────────────────────────────────────────────────

  addMana(color, amount = 1) {
    const s = this.clone();
    s.mana = s.mana.add(color, amount);
    return s;
  }

  payMana(costStr) {
    const newPool = this.mana.pay(costStr);
    if (newPool === null) return null;
    const s = this.clone();
    s.mana = newPool;
    return s;
  }

  // ── Player zone mutations (return new GameState) ──────────────────────────

  /**
   * Modify a player's numeric stats by delta.
   * @param {number} pi      Player index (0=you, 1-3=opponents)
   * @param {object} changes { life?, librarySize?, poison? } — deltas
   */
  modifyPlayer(pi, changes) {
    const s = this.clone();
    const p = s.players[pi].clone();
    if (changes.life        !== undefined) p.life        += changes.life;
    if (changes.librarySize !== undefined) p.librarySize += changes.librarySize;
    if (changes.poison      !== undefined) p.poison      += changes.poison;
    s.players[pi] = p;
    return s;
  }

  dealDamage(pi, { damage = 0, poison = 0, infect = false } = {}) {
    const s = this.clone();
    const p = s.players[pi].clone();
    if (infect) { p.poison += damage; }
    else        { p.life -= damage; p.poison += poison; }
    s.players[pi] = p;
    return s;
  }

  gainLife(pi, amount) { return this.modifyPlayer(pi, { life: amount }); }
  addPoison(pi, amount = 1) { return this.modifyPlayer(pi, { poison: amount }); }

  /**
   * A player draws N cards.
   * librarySize clamps to 0 if over-drawn (loss detected via getLosses()).
   */
  playerDraws(pi, n = 1) {
    const s = this.clone();
    s.players[pi] = s.players[pi].draw(n);
    return s;
  }

  /**
   * Draw cards from your library into your hand (player 0 only).
   * Moves actual card keys from library[0..n-1] into hand.
   * Unknown cards ('unknown') are silently discarded (opponent libraries, pre-game state).
   * @returns new GameState
   */
  playerDrawCards(n = 1) {
    const s = this.clone();
    for (let i = 0; i < n; i++) {
      if (s.players[0].library.length === 0) break;
      const cardKey = s.players[0].library.shift();
      if (cardKey && cardKey !== 'unknown') {
        s.hand = [...s.hand, cardKey];
      }
    }
    return s;
  }

  /**
   * Search your library for the first card matching predicate fn(cardKey) → bool.
   * Removes it from the library and returns { state, cardKey }.
   * If not found returns { state: this, cardKey: null }.
   */
  searchLibraryFor(fn) {
    const idx = this.players[0].library.findIndex(fn);
    if (idx === -1) return { state: this, cardKey: null };
    const s = this.clone();
    const [cardKey] = s.players[0].library.splice(idx, 1);
    return { state: s, cardKey };
  }

  /**
   * Put a card name into a player's graveyard (top of pile).
   * @param {number} pi  Player index
   * @param {string} cardName
   */
  addToGraveyard(pi, cardName) {
    const s = this.clone();
    s.players[pi] = s.players[pi].putInGraveyard(cardName);
    return s;
  }

  /**
   * Put a card name into a player's exile.
   * @param {number} pi  Player index
   * @param {string} cardName
   */
  addToExile(pi, cardName) {
    const s = this.clone();
    s.players[pi] = s.players[pi].putInExile(cardName);
    return s;
  }

  /**
   * Exile a specific card from a player's graveyard by name.
   * Returns new GameState or null if card not found.
   */
  exileFromGraveyard(pi, cardName) {
    const s = this.clone();
    const updated = s.players[pi].exileFromGraveyard(cardName);
    if (!updated) return null;
    s.players[pi] = updated;
    return s;
  }

  /**
   * Shuffle all cards from a player's graveyard back into their library.
   * Graveyard becomes empty; librarySize increases accordingly.
   */
  shuffleGraveyardIntoLibrary(pi) {
    const s = this.clone();
    s.players[pi] = s.players[pi].shuffleGraveyardIntoLibrary();
    return s;
  }

  /**
   * Discard a card from your hand into your graveyard.
   * Removes the card from hand and adds it to players[0].graveyard.
   * Returns new GameState or null if card not in hand.
   */
  discardFromHand(cardKey) {
    const cards = CARDS;
    const def = cards[cardKey];
    const cardName = def ? def.name : cardKey;
    let s = this.removeFromHand(cardKey);
    if (!s) return null;
    s = s.addToGraveyard(0, cardName);
    return s;
  }

  // ── Permanent mutations ───────────────────────────────────────────────────

  tapPermanent(id) {
    const s = this.clone();
    const p = s.getPermanentById(id);
    if (!p || p.tapped) return null;
    p.tapped = true;
    return s;
  }

  untapPermanent(id) {
    const s = this.clone();
    const p = s.getPermanentById(id);
    if (!p) return null;
    p.tapped = false;
    return s;
  }

  enterBattlefield(cardKey, extra = {}) {
    const cards = CARDS;
    const def = cards[cardKey];
    if (!def) throw new Error(`Unknown card: ${cardKey}`);
    let s = this.clone();
    const id = s._nextId++;
    const perm = new Permanent({
      id,
      name:          def.name,
      types:         [...def.types],
      subtypes:      [...(def.subtypes ?? [])],
      cardKey,
      tapped:        extra.tapped ?? false,
      summoningSick: def.types.includes('creature') ? true : false,
      isForest:      def.subtypes?.includes('Forest') ?? false,
      power:         def.power,
      toughness:     def.toughness,
      ...extra,
    });
    s.battlefield = [...s.battlefield, perm];

    // ── Static layer: apply existing statics to the new permanent ────────────

    // Ashaya: new creatures become Forest lands
    if (s.hasPermanent('Ashaya, Soul of the Wild') && perm.is('creature')) {
      perm.isForest = true;
      if (!perm.types.includes('land')) perm.types.push('land');
      if (!perm.subtypes.includes('Forest')) perm.subtypes.push('Forest');
    }

    // Concordant Crossroads / Thousand-Year Elixir: creatures lose summoning sickness
    if (perm.is('creature') && (
      s.hasPermanent('Concordant Crossroads') ||
      s.hasPermanent('Thousand-Year Elixir')
    )) {
      perm.summoningSick = false;
    }

    // Yavimaya, Cradle of Growth: all lands are Forests
    if (perm.is('land') && s.hasPermanent('Yavimaya, Cradle of Growth')) {
      if (!perm.subtypes.includes('Forest')) perm.subtypes.push('Forest');
      perm.isForest = true;
    }

    // Leyline of Abundance: tracked as a flag; effects applied in tapForMana wrappers

    // ── ETB triggers: card-specific effects on entry ──────────────────────────

    // Ashaya ETB: all existing non-token creatures become Forest lands
    if (cardKey === 'ashaya') {
      for (const bf of s.battlefield) {
        if (bf.is('creature')) {
          bf.isForest = true;
          if (!bf.types.includes('land')) bf.types.push('land');
          if (!bf.subtypes.includes('Forest')) bf.subtypes.push('Forest');
        }
      }
    }

    // Concordant Crossroads ETB: all existing creatures lose summoning sickness
    if (cardKey === 'concordant_crossroads') {
      for (const bf of s.battlefield) {
        if (bf.is('creature')) bf.summoningSick = false;
      }
    }

    // Yavimaya ETB: all existing lands become Forests
    if (cardKey === 'yavimaya') {
      for (const bf of s.battlefield) {
        if (bf.is('land') && !bf.subtypes.includes('Forest')) {
          bf.subtypes.push('Forest');
          bf.isForest = true;
        }
      }
    }

    // Lotus Cobra ETB landfall trigger (fires when a land enters after Cobra):
    // handled in actions.js — playing a land checks for Cobra and adds mana.

    // Marwyn, the Nurturer: whenever another Elf enters, put +1/+1 counter on Marwyn
    if (perm.is('creature') && perm.subtypes && perm.subtypes.includes('Elf')) {
      const marwyn = s.battlefield.find(p => p.name === 'Marwyn, the Nurturer' && p.id !== perm.id);
      if (marwyn) {
        marwyn.power     = (marwyn.power     || 1) + 1;
        marwyn.toughness = (marwyn.toughness || 1) + 1;
      }
    }

    // Hyrax Tower Scout ETB: untap target creature (deterministic: untap first tapped creature)
    if (cardKey === 'hyrax_tower_scout') {
      const tapped = s.creatures().find(c => c.id !== perm.id && c.tapped);
      if (tapped) s = s.untapPermanent(tapped.id);
    }

    // Surrak and Goreclaw ETB: existing creatures lose summoning sickness (haste)
    if (cardKey === 'surrak_goreclaw') {
      for (const bf of s.battlefield) {
        if (bf.is('creature') && bf.id !== perm.id) bf.summoningSick = false;
      }
    }

    // Great Oak Guardian ETB: target player's creatures get +2/+2 until EOT and untap
    // (simplified: untap all your creatures; +2/+2 is not tracked in this engine)
    if (cardKey === 'great_oak_guardian') {
      for (const bf of s.battlefield) {
        if (bf.is('creature')) bf.tapped = false;
      }
    }

    // Eternal Witness ETB: return target card from graveyard to hand
    // (deterministic: return last card in graveyard, if any)
    if (cardKey === 'eternal_witness' && s.players[0].graveyard.length > 0) {
      const cardName = s.players[0].graveyard[0]; // top of pile
      s.players[0] = s.players[0].clone();
      s.players[0].graveyard = s.players[0].graveyard.slice(1);
      // Find the card key for this name
      const ck = Object.keys(cards).find(k => cards[k].name === cardName);
      if (ck) s = s.addToHand(ck);
    }

    // Regal Force ETB: draw a card for each green creature you control
    if (cardKey === 'regal_force') {
      const greenCreatures = s.creatures().length; // simplified: all creatures
      s = s.playerDraws(0, greenCreatures);
    }

    // Beast Whisperer: draw a card when you cast a creature — triggered in actions.js

    // Skyshroud Poacher ETB: nothing (ability handled separately)

    // Hyrax Tower Scout already handled above.

    return s;
  }

  /**
   * Remove a permanent from the battlefield.
   * @param {number}          id    Permanent id
   * @param {string|null}     zone  'graveyard' | 'exile' | null (leaves the game)
   * @param {number}          pi    Player index that owns the card (default 0 = you)
   */
  removeFromBattlefield(id, zone = 'graveyard', pi = 0) {
    const s = this.clone();
    const idx = s.battlefield.findIndex(p => p.id === id);
    if (idx === -1) return null;
    const [removed] = s.battlefield.splice(idx, 1);
    if (zone === 'graveyard') s.players[pi] = s.players[pi].putInGraveyard(removed.name);
    if (zone === 'exile')     s.players[pi] = s.players[pi].putInExile(removed.name);
    return s;
  }

  removeFromHand(cardKey) {
    const s = this.clone();
    const idx = s.hand.indexOf(cardKey);
    if (idx === -1) return null;
    s.hand = [...s.hand.slice(0, idx), ...s.hand.slice(idx + 1)];
    return s;
  }

  addToHand(cardKey) {
    const s = this.clone();
    s.hand = [...s.hand, cardKey];
    return s;
  }

  markAbilityUsed(id, abilityKey) {
    const s = this.clone();
    const p = s.getPermanentById(id);
    if (!p) return null;
    p.abilitiesUsed = { ...p.abilitiesUsed, [abilityKey]: true };
    return s;
  }

  // ── Turn management ───────────────────────────────────────────────────────

  startNewTurn() {
    const s = this.clone();
    s.turn++;
    s.landDrops = 1;
    s.mana = new ManaPool();
    s.storm = 0;
    s.isOpponentTurn = false;   // back to your main phase
    for (const p of s.battlefield) {
      p.tapped = false;
      p.summoningSick = false;
      p.abilitiesUsed = {};
    }
    // Draw for turn
    s.players[0] = s.players[0].draw(1);
    s.history = [...s.history, {
      turn: s.turn,
      msg: `-- Begin Turn ${s.turn} (lib: ${s.players[0].librarySize}) --`,
    }];
    return s;
  }

  // ── Fingerprint ───────────────────────────────────────────────────────────

  fingerprint() {
    const hand = [...this.hand].sort().join(',');
    const bf = this.battlefield
      .map(p => `${p.name}:${p.tapped ? 'T' : 'U'}:${p.isForest ? 'F' : ''}`)
      .sort().join('|');
    const m = this.mana.toString();
    const players = this.players
      .map(p => `${p.life}/${p.librarySize}/${p.poison}/${p.graveyard.length}/${p.exile.length}`)
      .join(',');
    const cmd = `CZ:${[...this.commandZone].sort().join(',')}:tax${this.commanderTax}`;
    return `T${this.turn}|H:${hand}|BF:${bf}|M:${m}|L:${this.landDrops}|P:${players}|${cmd}`;
  }

  // ── Display ───────────────────────────────────────────────────────────────

  printSummary() {
    const losses = this.getLosses();
    if (losses.length) {
    }
    if (this.comboAchieved) console.log(`\n  *** COMBO: ${this.comboName} ***`);
  }
}

const _GSM = { GameState, ManaPool, parseCost, Player, Permanent };
// combos.js
/**
 * MTG Combo Solver — Combo Detectors (v3)
 *
 * checkCombos(state) → { achieved, name, description } | null
 *
 * Detectors are ordered: most restrictive (provably winning) first,
 * then looser "assembled" checks. The first match wins.
 *
 * Oracle sources: ref/card_data.md
 * Combo source of truth: ref/decklist_combos.txt
 *
 * Key Ashaya rule: "Nontoken creatures you control are Forest lands in addition
 * to their other types." This means:
 *   - Quirion Ranger can return itself to hand (it IS a Forest).
 *   - Hope Tender can target itself with its untap abilities (it IS a land).
 *   - Argothian Elder can untap itself (it IS a Forest land).
 *   - Gaea's Cradle counts Tender/Elder in its creature count.
 *
 * Key Hope Tender oracle:
 *   {1},{T}: Untap target land.               ← first ability
 *   {1},{T},Exert: Untap two target lands.    ← second ability; can target itself
 *                                                (it IS a land under Ashaya)
 */

// ── Helpers ───────────────────────────────────────────────────────────────

function hasPerm(state, name) {
  return state.battlefield.some(p => p.name === name);
}

// True if card is on battlefield OR in hand (with infinite mana, hand = castable)
function inHandOrField(state, name, cardKey) {
  return hasPerm(state, name) ||
    (state.hand && state.hand.includes(cardKey));
}

function permReady(state, name) {
  return state.battlefield.some(p => p.name === name && !p.tapped && !p.summoningSick);
}

function permUntapped(state, name) {
  return state.battlefield.some(p => p.name === name && !p.tapped);
}

function creatureCount(state) {
  return state.creatures().length;
}

function elfCount(state) {
  return state.battlefield.filter(p => p.subtypes && p.subtypes.includes('Elf')).length;
}

function devotionG(state) {
  const CARDS = CARDS;
  let n = 0;
  for (const p of state.battlefield) {
    const def = CARDS[p.cardKey];
    if (def?.cost) for (const ch of def.cost) if (ch === 'G') n++;
  }
  return n;
}

function greatestPower(state) {
  return Math.max(0, ...state.creatures().map(c => c.power || 0));
}

function cradleUntapped(state) {
  return state.battlefield.some(p =>
    (p.name === "Gaea's Cradle" || p.name === 'Itlimoc, Cradle of the Sun') && !p.tapped
  );
}

function ashayaOut(state) {
  return hasPerm(state, 'Ashaya, Soul of the Wild');
}

// ── Detector list ─────────────────────────────────────────────────────────

const DETECTORS = [

  // ══════════════════════════════════════════════════════════════════════════
  //  ASHAYA + QUIRION RANGER + MANA DORK  (COMBO 3, 7, 11, 14, 21, 26, 27, 41, 49)
  //
  //  Quirion Ranger has no tap symbol — summoning sickness does NOT prevent its use.
  //  With Ashaya: Ranger is a Forest, so it can return ITSELF to hand,
  //  untapping the mana dork. Recast Ranger for {G}. Net +{G} if dork produces ≥2G.
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Infinite Green Mana (Ashaya + Quirion Ranger + Mana Dork ≥2G)',
    description:
      'With Ashaya, Quirion Ranger is a Forest and bounces itself to untap the mana dork. ' +
      'Recast Ranger for {G}. Net +{G}/cycle with dork producing ≥2G. ' +
      'Dorks: Priest of Titania (≥2 elves), Circle of Dreams Druid (≥2 creatures), ' +
      'Elvish Archdruid (≥2 elves), Wirewood Channeler (≥2 elves), ' +
      "Karametra's Acolyte (devotion ≥2), Selvala (power ≥2), " +
      'Fanatic of Rhonas (ferocious, power ≥4), Marwyn (power ≥2).',
    check(state) {
      if (!ashayaOut(state)) return false;
      if (!hasPerm(state, 'Quirion Ranger')) return false;
      // Hope Tender pairs with Cradle: Ranger untaps Tender, Tender untaps Cradle.
      // Cradle needs ≥2 creatures to net positive after the {1} Tender activation cost.
      if (permReady(state, 'Hope Tender') && cradleUntapped(state) && creatureCount(state) >= 2) return true;

      return state.battlefield.some(p => {
        if (p.summoningSick) return false;
        switch (p.name) {
          case 'Priest of Titania':           return elfCount(state) >= 2;
          case 'Circle of Dreams Druid':      return creatureCount(state) >= 2;
          case 'Elvish Archdruid':            return elfCount(state) >= 2;
          case 'Wirewood Channeler':          return elfCount(state) >= 2;
          case "Karametra's Acolyte":         return devotionG(state) >= 2;
          case 'Selvala, Heart of the Wilds': return greatestPower(state) >= 2;
          case 'Fanatic of Rhonas':           return greatestPower(state) >= 4;
          case 'Marwyn, the Nurturer':        return (p.power || 0) >= 2;
          default: return false;
        }
      });
    },
  },

  {
    name: 'Infinite Green Mana (Ashaya + Scryb Ranger + Mana Dork ≥3G)',
    description:
      'With Ashaya, Scryb Ranger is a Forest and bounces itself to untap the mana dork. ' +
      'Recast Scryb Ranger for {1G}. Net +{G}/cycle with dork producing ≥3G. ' +
      'Dorks: Priest of Titania (≥3 elves), Circle of Dreams Druid (≥3 creatures), ' +
      'Elvish Archdruid (≥3 elves), Wirewood Channeler (≥3 elves), ' +
      "Karametra's Acolyte (devotion ≥3), Selvala (power ≥3), " +
      'Fanatic of Rhonas (ferocious), Marwyn (power ≥3).',
    check(state) {
      if (!ashayaOut(state)) return false;
      if (!hasPerm(state, 'Scryb Ranger')) return false;
      return state.battlefield.some(p => {
        if (p.summoningSick) return false;
        switch (p.name) {
          case 'Priest of Titania':           return elfCount(state) >= 3;
          case 'Circle of Dreams Druid':      return creatureCount(state) >= 3;
          case 'Elvish Archdruid':            return elfCount(state) >= 3;
          case 'Wirewood Channeler':          return elfCount(state) >= 3;
          case "Karametra's Acolyte":         return devotionG(state) >= 3;
          case 'Selvala, Heart of the Wilds': return greatestPower(state) >= 3;
          case 'Fanatic of Rhonas':           return greatestPower(state) >= 4;
          case 'Marwyn, the Nurturer':        return (p.power || 0) >= 3;
          default: return false;
        }
      });
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  ASHAYA + HOPE TENDER LOOPS  (COMBO 45, 48, 50, 56, 61)
  //
  //  With Ashaya: Hope Tender is a Forest LAND itself.
  //  Exert ability: {1},{T},Exert → Untap TWO target lands.
  //  Tender can TARGET ITSELF (it is a land) as one of the two targets.
  //  Result: Tender taps then immediately untaps itself via the exert resolution.
  //  The second target (e.g. Cradle, Circle, Selvala) also untaps.
  //  Tender is exerted (skips next untap step) but remains untapped THIS turn.
  // ══════════════════════════════════════════════════════════════════════════

  {
    // COMBO 48: Ashaya + Hope Tender + Gaea's Cradle
    // Exert loop: Pay {1}, tap+exert Tender → untap Tender + Cradle.
    // Tender untaps itself. Tap Cradle for G×creatures.
    // Net positive: Cradle produces ≥2G with ≥2 creatures, pay {1}, net ≥1G.
    name: "Infinite Mana (Ashaya + Hope Tender + Gaea's Cradle)  [COMBO 48]",
    description:
      "With Ashaya, Hope Tender is a land and can target ITSELF with its exert ability. " +
      "Exert loop: pay {1}, tap+exert Tender → untap Tender + Cradle. " +
      "Tender immediately untaps itself. Tap Cradle for G×creatures. " +
      "Net positive with ≥2 creatures (Cradle ≥2G, pay {1}, net ≥1G).",
    check(state) {
      if (!ashayaOut(state)) return false;
      if (!cradleUntapped(state)) return false;
      if (!permReady(state, 'Hope Tender')) return false;
      // ≥2 creatures so Cradle produces ≥2G to cover the {1} exert cost.
      // (Tender itself counts as a creature under Ashaya for Cradle's output.)
      return creatureCount(state) >= 2;
    },
  },

  {
    // COMBO 50: Ashaya + Hope Tender + Circle of Dreams Druid
    // Explicit loop steps from decklist_combos.txt:
    //   1. Tap Circle for G×creatures (≥3G needed).
    //   2. Pay {1}, tap+exert Tender → untap Tender + Circle.
    //   3. Repeat.
    name: 'Infinite Mana (Ashaya + Hope Tender + Circle of Dreams Druid)  [COMBO 50]',
    description:
      "With Ashaya, Tender and Circle are Forest lands. " +
      "Exert loop: Tap Circle for G×creatures. Pay {1}, exert Tender → untap Tender + Circle. " +
      "Tender untaps itself. Net +{G}/cycle with ≥3 creatures.",
    check(state) {
      if (!ashayaOut(state)) return false;
      if (!permReady(state, 'Hope Tender')) return false;
      if (!permReady(state, 'Circle of Dreams Druid')) return false;
      return creatureCount(state) >= 3;
    },
  },

  {
    // COMBO 61: Ashaya + Hope Tender + Marwyn, the Nurturer
    // Marwyn: {T}: Add G×(Marwyn's power). PRE: power ≥2.
    name: 'Infinite Mana (Ashaya + Hope Tender + Marwyn)  [COMBO 61]',
    description:
      "With Ashaya, Tender and Marwyn are Forest lands. " +
      "Exert loop: Tap Marwyn for G×power. Pay {1}, exert Tender → untap Tender + Marwyn. " +
      "Net positive with Marwyn power ≥2.",
    check(state) {
      if (!ashayaOut(state)) return false;
      if (!permReady(state, 'Hope Tender')) return false;
      const marwyn = state.battlefield.find(
        p => p.name === 'Marwyn, the Nurturer' && !p.summoningSick
      );
      if (!marwyn) return false;
      return (marwyn.power || 0) >= 2;
    },
  },

  {
    // COMBO 56: Ashaya + Hope Tender + Selvala
    // Selvala costs {G} to activate, taps for G×(greatest power).
    // Pay {G}+{1}=net cost, need power ≥3 to produce ≥3G and net ≥1G.
    name: 'Infinite Mana (Ashaya + Hope Tender + Selvala)  [COMBO 56]',
    description:
      "With Ashaya, Tender and Selvala are Forest lands. " +
      "Loop: Pay {G}, tap Selvala for G×power. Pay {1}, exert Tender → untap Tender + Selvala. " +
      "Net positive with greatest power ≥3.",
    check(state) {
      if (!ashayaOut(state)) return false;
      if (!permReady(state, 'Hope Tender')) return false;
      const selvala = state.battlefield.find(
        p => p.name === 'Selvala, Heart of the Wilds' && !p.summoningSick
      );
      if (!selvala) return false;
      return greatestPower(state) >= 3;
    },
  },

  {
    // COMBO 45: Ashaya + Hope Tender + Nykthos
    // Nykthos costs {2} to activate, produces G×devotion.
    // Exert Tender → untap Tender + Nykthos. Total cost {2}+{1}={3}. Need devotion ≥4.
    name: 'Infinite Mana (Ashaya + Hope Tender + Nykthos, devotion ≥4)  [COMBO 45]',
    description:
      "With Ashaya, Tender is a land. " +
      "Loop: Pay {2}, tap Nykthos for G×devotion. Pay {1}, exert Tender → untap Tender + Nykthos. " +
      "Net positive with devotion ≥4 (produces ≥4G, total cost {3}).",
    check(state) {
      if (!ashayaOut(state)) return false;
      if (!permReady(state, 'Hope Tender')) return false;
      if (!permUntapped(state, 'Nykthos, Shrine to Nyx')) return false;
      return devotionG(state) >= 4;
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  ASHAYA + ARGOTHIAN ELDER / LEY WEAVER  (COMBO 6, 24)
  //
  //  Elder/Ley Weaver: {T}: Untap two target lands.
  //  With Ashaya: Elder is a Forest land, can target ITSELF.
  //  Elder taps → untaps Elder + any mana land → immediate repeat → infinite mana.
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Infinite Mana (Ashaya + Argothian Elder / Ley Weaver)  [COMBO 6, 24]',
    description:
      "With Ashaya, Argothian Elder (or Ley Weaver) is a Forest land. " +
      "Taps to untap two lands — targets itself + any mana-producing land. " +
      "Elder immediately untaps itself → infinite mana from the paired land.",
    check(state) {
      if (!ashayaOut(state)) return false;
      if (!permReady(state, 'Argothian Elder') && !permReady(state, 'Ley Weaver')) return false;
      // Need at least one other land to pair as the second untap target
      return state.lands().length >= 1;
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  ASHAYA + MAGUS OF THE CANDELABRA  (COMBO 32, 34, 36, 43, 47, 52, 60, 62)
  //
  //  Magus: {X},{T}: Untap X target lands. With Ashaya, Magus is a Forest land.
  //  Pay {G}{G} (X=2): untap Magus + mana source. Need source ≥3G to net positive.
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Infinite Mana (Ashaya + Magus of the Candelabra + Source ≥3G)  [COMBO 32, 34, 36, 43, 47, 52, 60, 62]',
    description:
      "With Ashaya, Magus is a Forest land. Pay {G}{G}, tap Magus (X=2): " +
      "untap Magus + mana source. Net positive if source produces ≥3G. " +
      "Sources: Gaea's Cradle (≥3 creatures), Priest of Titania (≥3 elves), " +
      "Circle of Dreams Druid (≥3 creatures), Elvish Archdruid (≥3 elves), " +
      "Karametra's Acolyte (devotion ≥3), Fanatic of Rhonas (ferocious), " +
      "Wirewood Channeler (≥3 elves), Marwyn (power ≥3). " +
      "Selvala needs power ≥4 (costs {G} to activate, so must produce ≥4G).",
    check(state) {
      if (!ashayaOut(state)) return false;
      if (!permReady(state, 'Magus of the Candelabra')) return false;
      return state.battlefield.some(p => {
        if (p.summoningSick) return false;
        switch (p.name) {
          case "Gaea's Cradle":
          case 'Itlimoc, Cradle of the Sun':
            return creatureCount(state) >= 3;
          case 'Priest of Titania':           return elfCount(state) >= 3;
          case 'Circle of Dreams Druid':      return creatureCount(state) >= 3;
          case 'Elvish Archdruid':            return elfCount(state) >= 3;
          case 'Wirewood Channeler':          return elfCount(state) >= 3;
          case "Karametra's Acolyte":         return devotionG(state) >= 3;
          case 'Selvala, Heart of the Wilds': return greatestPower(state) >= 4;
          case 'Fanatic of Rhonas':           return greatestPower(state) >= 4;
          case 'Marwyn, the Nurturer':        return (p.power || 0) >= 3;
          default: return false;
        }
      });
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  ARGOTHIAN ELDER + WIREWOOD LODGE (no Ashaya)  (COMBO 40, 31, 42, 46)
  //
  //  Elder: {T}: Untap two target lands.
  //  Wirewood Lodge: {G},{T}: Untap target Elf.
  //  Loop: Tap big land. Elder untaps Lodge + big land. Lodge untaps Elder.
  //  No Ashaya required — Elder does NOT target itself here.
  //  Cradle: needs ≥2 creatures (produces ≥2G, Lodge costs {G}, net ≥1G).
  //  Nykthos: needs devotion ≥4 (produces ≥4G, pay {2}+{G}Lodge={3G}, net ≥1G).
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Infinite Mana (Argothian Elder + Wirewood Lodge + Big Land)  [COMBO 40, 31, 42, 46]',
    description:
      "Tap big land. Elder: untap Lodge + big land. Lodge ({G}): untap Elder. Repeat. " +
      "Cradle needs ≥2 creatures (produces ≥2G, pay {G} Lodge, net ≥1G). " +
      "Nykthos needs devotion ≥4 (produces ≥4G, pay {2}+{G}={3G}, net ≥1G).",
    check(state) {
      if (!permReady(state, 'Argothian Elder')) return false;
      if (!permUntapped(state, 'Wirewood Lodge')) return false;
      const cradleOk  = cradleUntapped(state) && creatureCount(state) >= 2;
      const nykthosOk = permUntapped(state, 'Nykthos, Shrine to Nyx') && devotionG(state) >= 4;
      return cradleOk || nykthosOk;
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  NYKTHOS + LAND UNTAPPER (no Ashaya)  (COMBO 31)
  //
  //  Nykthos: {2},{T}: Add G×devotion.
  //  Deserted Temple: {1},{T}: Untap target land. → total cost {3}, need devotion ≥4.
  //  Argothian Elder (free untap of two lands): total cost {2}, need devotion ≥3.
  //  Magus of the Candelabra ({G}{G} for X=2): total cost {4}, need devotion ≥5.
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Infinite Green Mana (Nykthos + Land Untapper + High Devotion)',
    description:
      "Nykthos taps for G×devotion (costs {2}). Untapper lets you repeat. " +
      "Deserted Temple (costs {1}): need devotion ≥4. " +
      "Argothian Elder / Ley Weaver (free): need devotion ≥3. " +
      "Magus of the Candelabra (costs {GG}): need devotion ≥5.",
    check(state) {
      if (!permUntapped(state, 'Nykthos, Shrine to Nyx')) return false;
      const dev = devotionG(state);
      if (permReady(state, 'Deserted Temple') && dev >= 3) return true;
      if (permReady(state, 'Argothian Elder')  && dev >= 3) return true;
      if (permReady(state, 'Ley Weaver')       && dev >= 3) return true;
      if (permReady(state, 'Magus of the Candelabra') && dev >= 5) return true;
      return false;
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  SELVALA + FREE CREATURE UNTAPPER  (COMBO 11, 12, 13, 16)
  //
  //  Selvala: {G},{T}: Add X mana, X = greatest power. Costs {G} per activation.
  //  Quirion/Scryb Ranger: bounce a Forest → untap a creature (FREE).
  //  With or without Ashaya: Ranger can bounce a basic Forest land to untap Selvala.
  //  With Ashaya: Ranger can also bounce itself.
  //  Net: Selvala produces ≥2G, pay {G} activation, net ≥1G.
  //
  //  NOTE: Wirewood Symbiote is once-per-turn — NOT infinite with Selvala alone.
  //  Symbiote + Selvala only goes infinite inside a Temur Sabertooth loop.
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Infinite Mana (Selvala + Quirion/Scryb Ranger + Power ≥2)  [COMBO 11]',
    description:
      "Selvala: pay {G}, tap for G×(greatest power). " +
      "Ranger bounces a Forest to untap Selvala (free). " +
      "Net positive with greatest power ≥2. " +
      "With Ashaya, Ranger bounces itself. Without Ashaya, needs a Forest land.",
    check(state) {
      const selvala = state.battlefield.find(
        p => p.name === 'Selvala, Heart of the Wilds' && !p.summoningSick
      );
      if (!selvala) return false;
      if (greatestPower(state) < 2) return false;
      const hasRanger =
        hasPerm(state, 'Quirion Ranger') || hasPerm(state, 'Scryb Ranger');
      if (!hasRanger) return false;
      // With Ashaya: Ranger bounces itself (it IS a Forest). Without Ashaya: Ranger
      // can bounce any Forest land to untap Selvala. In either case the detector fires
      // when the pieces are assembled — the solver verifies resource availability.
      return true;
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  KOGLA + KARAMETRA'S ACOLYTE  (COMBO 2)
  //
  //  Acolyte is a Human Druid. Kogla: {1G}: Return target Human → Kogla gains indestr.
  //  Loop: Tap Acolyte for G×devotion. Pay {1G} Kogla bounce. Recast Acolyte {3G}.
  //  Total cost: {1G}+{3G}+{1}={5G}. Net at devotion ≥6.
  //  PRE (canonical): devotion ≥6.
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: "Infinite Mana (Kogla + Karametra's Acolyte, devotion ≥6)  [COMBO 2]",
    description:
      "Tap Acolyte for G×devotion. Pay {1G}, Kogla bounces Acolyte (Human). " +
      "Recast Acolyte {3G}. Total cost {5G}+{1}. Net positive at devotion ≥6.",
    check(state) {
      if (!hasPerm(state, 'Kogla, the Titan Ape')) return false;
      const acolyte = state.battlefield.find(
        p => p.name === "Karametra's Acolyte" && !p.tapped && !p.summoningSick
      );
      if (!acolyte) return false;
      return devotionG(state) >= 6;
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  TEMUR SABERTOOTH + WIREWOOD SYMBIOTE + CIRCLE OF DREAMS DRUID
  //  (COMBO 4, 5, 17)
  //
  //  Symbiote (once-per-turn) bounces a 1-drop Elf → untaps Circle.
  //  Sabertooth bounces Symbiote ({1G}). Recast Symbiote ({G}) + 1-drop ({G}).
  //  Loop cost: {1G}+{G}+{G}={3G}+{1}. Circle needs ≥5G → ≥5 creatures.
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Infinite Mana (Temur Sabertooth + Wirewood Symbiote + Circle of Dreams Druid)  [COMBO 4, 5, 17]',
    description:
      "Symbiote bounces a 1-drop Elf → untaps Circle of Dreams Druid. " +
      "Sabertooth bounces Symbiote ({1G}). Recast Symbiote ({G}) + 1-drop ({G}). " +
      "Net positive with ≥5 creatures (Circle taps for ≥5G).",
    check(state) {
      if (!hasPerm(state, 'Temur Sabertooth')) return false;
      if (!permReady(state, 'Circle of Dreams Druid')) return false;
      if (!hasPerm(state, 'Wirewood Symbiote')) return false;
      const hasOneDrop = state.battlefield.some(p =>
        p.subtypes && p.subtypes.includes('Elf') &&
        ['Llanowar Elves','Elvish Mystic','Fyndhorn Elves',
         'Allosaurus Shepherd','Wirewood Symbiote'].includes(p.name)
      );
      if (!hasOneDrop) return false;
      return creatureCount(state) >= 5;
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  TEMUR SABERTOOTH + CONCORDANT CROSSROADS + HIGH-OUTPUT DORK
  //  (COMBO 9, 10, 20)
  //
  //  Concordant Crossroads: all creatures have haste.
  //  Sabertooth bounces dork ({1G}), dork re-enters with haste, taps again.
  //  Circle of Dreams Druid ({GGG} recast): need ≥6 creatures.
  //  Selvala ({1GG} recast, {G} activation): need greatest power ≥7.
  //  Karametra's Acolyte ({3G} recast): need devotion ≥7 (loses own pips during bounce).
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Infinite Mana (Temur Sabertooth + Haste Enabler + Dork)  [COMBO 9, 10, 20, 22]',
    description:
      "With a haste enabler, bounced creatures re-enter with haste and can tap immediately. " +
      "Enablers: Concordant Crossroads, Thousand-Year Elixir, Surrak and Goreclaw. " +
      "Circle (≥6 creatures), Selvala (power ≥7), Karametra's Acolyte (devotion ≥7).",
    check(state) {
      if (!hasPerm(state, 'Temur Sabertooth')) return false;
      const hasHaste =
        hasPerm(state, 'Concordant Crossroads') ||
        hasPerm(state, 'Thousand-Year Elixir') ||
        hasPerm(state, 'Surrak and Goreclaw');
      if (!hasHaste) return false;
      // Check each haste-loop variant
      if (permReady(state, 'Circle of Dreams Druid') && creatureCount(state) >= 6) return true;
      if (greatestPower(state) >= 7 &&
          state.battlefield.some(p => p.name === 'Selvala, Heart of the Wilds' && !p.summoningSick)) return true;
      if (devotionG(state) >= 7 &&
          state.battlefield.some(p => p.name === "Karametra's Acolyte" && !p.summoningSick)) return true;
      return false;
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  HYRAX TOWER SCOUT + BOUNCE ENGINE + MANA DORK  (COMBO 8, 15, 18, 23, 25, 28, 57, 59)
  //
  //  Hyrax ETB: Untap target creature (the mana dork).
  //  Sabertooth bounce: {1G}. Hyrax recast: {2G}. Total: {4G}+{1}.
  //  Kogla bounce (Hyrax is a Human Scout): {1G}. Same recast {2G}. Same math.
  //  Mana dork must produce ≥5G to cover the loop cost and net positive.
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Infinite Mana (Hyrax Tower Scout + Temur Sabertooth + Mana Dork ≥5G)  [COMBO 8, 18, 28, 57]',
    description:
      "Hyrax ETB untaps the mana dork. Sabertooth bounces Hyrax ({1G}), recast ({2G}). " +
      "Total loop cost {4G}+{1}. Need dork producing ≥5G. " +
      "Priest/Archdruid/Channeler: ≥5 elves. Circle: ≥5 creatures. " +
      "Selvala: power ≥6 (includes {G} activation). Marwyn: power ≥6.",
    check(state) {
      if (!hasPerm(state, 'Temur Sabertooth')) return false;
      if (!hasPerm(state, 'Hyrax Tower Scout')) return false;
      return state.battlefield.some(p => {
        if (p.summoningSick) return false;
        switch (p.name) {
          case 'Priest of Titania':           return elfCount(state) >= 5;
          case 'Circle of Dreams Druid':      return creatureCount(state) >= 5;
          case 'Elvish Archdruid':            return elfCount(state) >= 5;
          case 'Wirewood Channeler':          return elfCount(state) >= 5;
          case 'Selvala, Heart of the Wilds': return greatestPower(state) >= 6;
          case 'Marwyn, the Nurturer':        return (p.power || 0) >= 6;
          default: return false;
        }
      });
    },
  },

  {
    name: 'Infinite Mana (Hyrax Tower Scout + Kogla + Mana Dork ≥5G)  [COMBO 15, 19, 23, 25, 35, 38, 59]',
    description:
      "Kogla bounces Hyrax (Human Scout, {1G}), recast from hand ({2G}), ETB untaps dork. " +
      "Same cost structure as Sabertooth variant. Dork must produce ≥5G.",
    check(state) {
      if (!hasPerm(state, 'Kogla, the Titan Ape')) return false;
      // Hyrax can be in hand (canonical PRE) or on battlefield about to be bounced
      const hyraxAvailable =
        (state.hand && state.hand.includes('hyrax_tower_scout')) ||
        hasPerm(state, 'Hyrax Tower Scout');
      if (!hyraxAvailable) return false;
      return state.battlefield.some(p => {
        if (p.summoningSick) return false;
        switch (p.name) {
          case 'Priest of Titania':           return elfCount(state) >= 5;
          case 'Circle of Dreams Druid':      return creatureCount(state) >= 5;
          case 'Elvish Archdruid':            return elfCount(state) >= 5;
          case 'Wirewood Channeler':          return elfCount(state) >= 5;
          case 'Selvala, Heart of the Wilds': return greatestPower(state) >= 6;
          case 'Marwyn, the Nurturer':        return (p.power || 0) >= 6;
          default: return false;
        }
      });
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  EARTHCRAFT + ASHAYA + QUIRION RANGER  (Combo Summary #4)
  //
  //  Earthcraft oracle: "Tap an untapped creature: Untap target BASIC land."
  //  Ashaya makes creatures Forest lands — but NOT basic lands.
  //  So Earthcraft still needs an actual basic Forest on the battlefield.
  //
  //  Loop (from combo summary):
  //   - Tap Quirion via Earthcraft → untap a basic Forest.
  //   - Basic Forest taps for {G}.
  //   - Quirion Ranger bounces itself (a Forest under Ashaya) → untap the mana dork.
  //   - Recast Quirion for {G}. Repeat.
  //  Net: +{G} from mana dork per cycle (basic Forest mana covers Quirion recast).
  // ══════════════════════════════════════════════════════════════════════════

  {
    // Loose assembled check — Earthcraft + Cradle + creatures.
    // Earthcraft turns any untapped creature into a mana source by untapping a basic land.
    // With Yavimaya or basic Forests, this loops with Cradle for infinite mana.
    name: 'Infinite Mana (Earthcraft + Gaea\'s Cradle + Creatures)',
    description:
      "Earthcraft: tap an untapped creature to untap a basic land. " +
      "With Gaea's Cradle producing G×creatures and ≥2 untapped creatures, " +
      "tap creatures to repeatedly untap Cradle. " +
      "Add Yavimaya to make all lands Forests (Earthcraft targets), or use basic Forests.",
    check(state) {
      if (!hasPerm(state, 'Earthcraft')) return false;
      if (!cradleUntapped(state)) return false;
      return state.untappedCreatures().length >= 2;
    },
  },

  {
    description:
      "Earthcraft taps Quirion (creature) to untap a basic Forest. " +
      "Forest taps {G}. Quirion bounces itself (a Forest under Ashaya) → untaps mana dork. " +
      "Recast Quirion {G}. Net +{G} from dork per cycle. Requires a basic Forest.",
    check(state) {
      if (!hasPerm(state, 'Earthcraft')) return false;
      if (!ashayaOut(state)) return false;
      if (!hasPerm(state, 'Quirion Ranger')) return false;
      // Earthcraft requires a BASIC land target — Ashaya creatures are Forests but not basic
      const hasBasicForest = state.lands().some(l =>
        (l.name === 'Forest' || (l.subtypes && l.subtypes.includes('Forest') && l.basic))
      );
      if (!hasBasicForest) return false;
      // Need a mana dork (other than Ranger) to net positive
      return state.battlefield.some(p =>
        p.types && p.types.includes('creature') &&
        p.name !== 'Quirion Ranger' &&
        !p.summoningSick
      );
    },
  },

  {
    name: 'Infinite Draw (Beast Whisperer / Glademuse + Creature Loop)',
    description:
      "Beast Whisperer draws a card per creature cast. " +
      "Glademuse draws for spells cast on opponents' turns. " +
      "With an established infinite creature loop, draws the entire library.",
    check(state) {
      const hasDrawEngine =
        hasPerm(state, 'Beast Whisperer') || hasPerm(state, 'Glademuse');
      if (!hasDrawEngine) return false;
      return (
        (ashayaOut(state) && (hasPerm(state, 'Quirion Ranger') || hasPerm(state, 'Scryb Ranger'))) ||
        hasPerm(state, 'Temur Sabertooth') ||
        hasPerm(state, 'Kogla, the Titan Ape')
      );
    },
  },

];

// ── Win Condition Detectors ───────────────────────────────────────────────
//
// These fire AFTER an infinite-mana combo is confirmed.
// Each entry: { name, description, check(state) → bool }
//
// Oracle references: ref/card_data.md
// Lines: ref/decklist_combos.txt (Hitzel's Sequence, Mikokoro Mill, etc.)

const WIN_CONDITIONS = [

  // ══════════════════════════════════════════════════════════════════════════
  //  HITZEL'S SEQUENCE — Geier Reach Sanitarium mill
  //
  //  With infinite mana + Endurance (ETB held on stack) + Temur Sabertooth or Kogla:
  //  Each iteration: Geier Reach forces all players to draw, then discard.
  //  Endurance's ETB (unresolved on stack) resets opponents' graveyards to libraries
  //  each loop. Eventually every opponent must draw from an empty library and loses.
  //
  //  Temur Sabertooth variant (simplest):
  //    1. Cast Endurance — ETB goes on stack, hold priority.
  //    2. Pay {2}, Sabertooth bounces Endurance (back to hand).
  //    3. Pay {2}, activate Geier Reach — each player draws + discards.
  //    4. Untap Geier Reach (via the existing infinite-mana untap method). Repeat.
  //    At end: let Endurance's ETB resolve → opponents' yards → library bottoms.
  //    Repeat until all opponents have empty libraries, then activate Geier Reach once more.
  //
  //  Kogla + Eternal Witness variant:
  //    Kogla bounces Eternal Witness (Human), Witness ETB returns Endurance to hand.
  //    Kills Endurance with Beast Within or LQR while ETB is on stack; same Geier Reach loop.
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: "Win: Geier Reach Sanitarium Mill (Hitzel's Sequence)",
    description:
      "With infinite mana, loop Geier Reach Sanitarium ({2},{T}: each player draws + discards). " +
      "Endurance's ETB held on stack resets opponents' graveyards to their libraries each cycle. " +
      "Eventually each opponent must draw from an empty library and loses. " +
      "Temur Sabertooth variant: bounce Endurance after ETB trigger, activate Geier Reach, untap, repeat. " +
      "Kogla+Eternal Witness variant: Witness returns Endurance, Kogla bounces Witness.",
    check(state) {
      if (!inHandOrField(state, 'Geier Reach Sanitarium', 'geier_reach')) return false;
      if (!inHandOrField(state, 'Endurance', 'endurance')) return false;
      // Need a way to bounce Endurance after its ETB is on the stack
      const hasBouncer =
        inHandOrField(state, 'Temur Sabertooth', 'temur_sabertooth') ||
        (inHandOrField(state, 'Kogla, the Titan Ape', 'kogla') &&
         inHandOrField(state, 'Eternal Witness', 'eternal_witness'));
      if (!hasBouncer) return false;
      // Need a way to untap Geier Reach each cycle (any land untapper in the combo already handles this)
      const hasUntapper =
        hasPerm(state, 'Argothian Elder') ||
        hasPerm(state, 'Ley Weaver') ||
        hasPerm(state, 'Magus of the Candelabra') ||
        hasPerm(state, 'Deserted Temple') ||
        hasPerm(state, 'Hope Tender') ||
        hasPerm(state, 'Quirion Ranger') ||
        hasPerm(state, 'Scryb Ranger');
      return hasUntapper;
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  DUSKWATCH RECRUITER — tutor entire creature library, then attack
  //
  //  With infinite mana, activate Duskwatch ({2G},{T}) repeatedly to find every
  //  creature in the library, put them in hand. Cast them all. With Finale of
  //  Devastation X≥10, all creatures get +X/+X and haste → attack for lethal.
  //  Or simply attack with an arbitrarily large board.
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Win: Duskwatch Recruiter + Finale of Devastation',
    description:
      "With infinite mana, activate Duskwatch Recruiter ({2G},{T}) to find every creature " +
      "in your library. Cast them all onto the battlefield. " +
      "Cast Finale of Devastation for X≥10: all creatures get +X/+X and haste. Attack for lethal.",
    check(state) {
      // With infinite mana, Duskwatch in hand can be cast immediately
      return inHandOrField(state, 'Duskwatch Recruiter', 'duskwatch_recruiter');
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  FINALE OF DEVASTATION (already in hand/battlefield with infinite mana)
  //
  //  Cast for X≥10. All creatures get +X/+X and haste. Attack for lethal.
  //  Only fires here if already in hand (Duskwatch not needed).
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Win: Finale of Devastation X≥10',
    description:
      "Cast Finale of Devastation for X≥10 with infinite mana. " +
      "All creatures you control get +X/+X and gain haste until end of turn. Attack for lethal.",
    check(state) {
      return state.hand && state.hand.includes('finale_of_devastation');
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  INFECTIOUS BITE — poison counters via infinite ETB/storm loop
  //
  //  With infinite creature loop (Ashaya+Ranger or bounce loop) and Infectious Bite
  //  in hand: each iteration, cast Bite targeting your looping creature vs. any
  //  opponent's creature. Each opponent gets 1 poison counter. 10 poison = loss.
  //  Also works with just infinite mana — cast Bite 10 times targeting any creature.
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Win: Infectious Bite (poison counters)',
    description:
      "Cast Infectious Bite ({1G}): target creature you control deals damage to a creature " +
      "you don't control. Each opponent gets a poison counter. " +
      "With infinite mana, cast 10 times → each opponent reaches 10 poison counters and loses.",
    check(state) {
      return state.hand && state.hand.includes('infectious_bite');
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  MIKOKORO MILL LINE
  //
  //  With infinite mana, Temur Sabertooth or Kogla + Eternal Witness loops:
  //  Tap Mikokoro ({2},{T}: each player draws). Hold priority, sac to Crop Rotation.
  //  Noxious Revival returns Mikokoro to library top. Witness loop retrieves Revival
  //  and Rotation. Crop Rotation fetches Mikokoro again. Repeat → mill the table.
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Win: Mikokoro Mill Line',
    description:
      "Tap Mikokoro ({2},{T}: each player draws), hold priority. " +
      "Sacrifice Mikokoro to Crop Rotation to fetch any land. " +
      "Noxious Revival returns Mikokoro to library top. " +
      "Eternal Witness + Temur Sabertooth/Kogla loop returns Revival and Rotation to hand. " +
      "Fetch Mikokoro again. Repeat until all opponents mill out.",
    check(state) {
      if (!inHandOrField(state, 'Mikokoro, Center of the Sea', 'mikokoro')) return false;
      const hasWitness  = inHandOrField(state, 'Eternal Witness', 'eternal_witness');
      const hasBouncer  =
        inHandOrField(state, 'Temur Sabertooth', 'temur_sabertooth') ||
        inHandOrField(state, 'Kogla, the Titan Ape', 'kogla');
      if (!hasWitness || !hasBouncer) return false;
      const hasRevival  =
        (state.hand && state.hand.includes('noxious_revival')) ||
        hasPerm(state, 'Elvish Reclaimer');
      const hasRotation =
        (state.hand && state.hand.includes('crop_rotation')) ||
        hasPerm(state, 'Elvish Reclaimer');
      return hasRevival && hasRotation;
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  BEAST WHISPERER / GLADEMUSE + INFINITE CREATURE LOOP
  //  → Draw entire library → find finisher
  //
  //  With an established infinite creature loop and a draw engine, draw the entire
  //  library. Then cast Finale of Devastation, Infectious Bite, etc. from hand.
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Win: Draw Library (Beast Whisperer / Glademuse + Creature Loop)',
    description:
      "Beast Whisperer draws a card per creature cast. Glademuse draws per spell on opponents' turns. " +
      "With an infinite creature loop, draw the entire library. " +
      "Then win via Finale of Devastation X≥10, Infectious Bite loop, or other finisher. " +
      "Creature loops: Ashaya + any Ranger (Ranger recast each cycle), " +
      "Temur Sabertooth or Kogla bounce loops, Hyrax Tower Scout loops.",
    check(state) {
      const hasDrawEngine =
        inHandOrField(state, 'Beast Whisperer', 'beast_whisperer') ||
        inHandOrField(state, 'Glademuse', 'glademuse');
      if (!hasDrawEngine) return false;
      // Any loop that recasts a creature each iteration triggers Beast Whisperer.
      // Ranger loops: Ranger is recast every cycle (with or without Ashaya).
      const hasRangerLoop =
        hasPerm(state, 'Quirion Ranger') || hasPerm(state, 'Scryb Ranger');
      // Bounce engines recast the bounced creature each loop iteration.
      const hasBounceEngine =
        inHandOrField(state, 'Temur Sabertooth', 'temur_sabertooth') ||
        inHandOrField(state, 'Kogla, the Titan Ape', 'kogla');
      return hasRangerLoop || hasBounceEngine;
    },
  },

];

// ── Main exports ──────────────────────────────────────────────────────────

/**
 * Check whether an infinite-mana combo is assembled.
 * Returns { achieved, name, description } or null.
 */
function checkCombos(state) {
  for (const detector of DETECTORS) {
    if (detector.check(state)) {
      return {
        achieved:    true,
        name:        detector.name,
        description: detector.description,
      };
    }
  }
  return null;
}

/**
 * Check for a complete game-winning line: infinite mana + a win condition.
 * Returns { achieved, name, description, winCondition } or null.
 *
 * The solver should call this instead of checkCombos so that it only declares
 * victory when the board can actually end the game, not merely loop forever.
 */
function checkVictory(state) {
  const infiniteMana = checkCombos(state);
  if (!infiniteMana) return null;

  for (const wc of WIN_CONDITIONS) {
    if (wc.check(state)) {
      return {
        achieved:      true,
        name:          wc.name,
        description:   wc.description,
        winCondition:  wc.name,
        manaCombo:     infiniteMana.name,
      };
    }
  }

  // Infinite mana assembled but no explicit win condition yet — still a
  // meaningful solver result (player can win on the next action).
  // Return the mana combo so the solver can report progress.
  return {
    achieved:     true,
    name:         `${infiniteMana.name} [win condition needed]`,
    description:  infiniteMana.description + ' — Win condition not yet on battlefield.',
    winCondition: null,
    manaCombo:    infiniteMana.name,
  };
}

const _COM = { checkCombos, checkVictory };
// actions.js
/**
 * MTG Combo Solver — Action Generator (v2)
 *
 * generateActions(state) → Action[]
 *
 * An Action:
 * {
 *   type:     string
 *   label:    string
 *   priority: number   (higher = explored first)
 *   apply:    (state) => GameState | null
 * }
 *
 * Priority tiers:
 *   12  hand abilities (free / exile from hand)
 *   10  play land
 *   9   cast spell (creature)
 *   8   cast spell (other)
 *   7   tap for mana
 *   6   activated abilities
 *   2   pass turn
 */

// ── STAX cards — never cast, never tutored ────────────────────────────────
// These cards slow down opponents but do not contribute to any combo or win
// condition in this deck. The solver should ignore them entirely.
const STAX_CARDS = new Set([
  'collector_ouphe', 'null_rod', 'root_maze',
  'thorn_of_amethyst', 'trinisphere', 'orb_of_dreams', 'vexing_bauble',
]);

// ── Tutor target priority ─────────────────────────────────────────────────
// Numeric scores: higher = fetch this first. Used by smartTutorTarget().
const TUTOR_PRIORITY_SCORE = {
  // Core combo pieces — highest priority
  'gaeas_cradle': 100, 'nykthos': 95, 'yavimaya': 90,
  'ashaya': 88, 'temur_sabertooth': 85, 'kogla': 82,
  'hope_tender': 80, 'quirion_ranger': 78, 'scryb_ranger': 76,
  'argothian_elder': 75, 'ley_weaver': 74, 'magus_of_the_candelabra': 73,
  'selvala': 70, 'karametra_acolyte': 68, 'circle_of_dreams_druid': 65,
  'priest_of_titania': 63, 'elvish_archdruid': 61, 'wirewood_channeler': 59,
  'wirewood_symbiote': 57, 'hyrax_tower_scout': 55, 'earthcraft': 53,
  'deserted_temple': 51, 'concordant_crossroads': 49,
  // Win conditions
  'duskwatch_recruiter': 47, 'beast_whisperer': 45,
  'endurance': 43, 'geier_reach': 41,
  // Support pieces
  'wirewood_lodge': 39, 'seedborn_muse': 35,
};

/**
 * Given a list of (resultState, cardKey) options from a castFn, return the
 * single best target to explore in the DFS — the highest-priority card that
 * is not already on the battlefield or in hand.
 *
 * Falls back to the first result if no prioritised card is found.
 */
function smartTutorTarget(state, allResults) {
  if (!allResults || allResults.length === 0) return null;
  if (allResults.length === 1) return allResults[0];

  // Score each result by the priority of the card it fetches
  let best = allResults[0];
  let bestScore = -1;
  for (const r of allResults) {
    const msg = r.history[r.history.length - 1]?.msg ?? '';
    // Extract card key from message text by matching known names
    const key = Object.keys(CARDS).find(k => msg.includes(CARDS[k]?.name)) ?? '';
    const score = TUTOR_PRIORITY_SCORE[key] ?? 0;
    if (score > bestScore) {
      bestScore = score;
      best = r;
    }
  }
  return best;
}

// ── Stax / global effect helpers ──────────────────────────────────────────

/**
 * Returns true if activated abilities of artifacts are suppressed
 * (Null Rod or Collector Ouphe on the battlefield).
 */
function artifactAbilitiesSuppressed(state) {
  return (
    state.hasPermanent('Null Rod') ||
    state.hasPermanent('Collector Ouphe')
  );
}

/**
 * Extra generic mana cost imposed on non-creature spells by Thorn of Amethyst.
 * Returns 0 or 1.
 */
function thornTax(state, def) {
  if (!state.hasPermanent('Thorn of Amethyst')) return 0;
  if (def.types.includes('creature')) return 0;
  return 1;
}

/**
 * Minimum total mana imposed by Trinisphere (3).
 * Returns the effective minimum cost in generic mana (0 if Trinisphere not present).
 */
function trinisphereMin(state) {
  const t = state.battlefield.find(p => p.name === 'Trinisphere' && !p.tapped);
  return t ? 3 : 0;
}

/**
 * Cost reductions from permanents like Emerald Medallion.
 * Returns { generic: n, colored: {} } reduction to apply before paying.
 */
function costReductions(state, def) {
  let genericReduction = 0;
  for (const perm of state.battlefield) {
    const permDef = CARDS[perm.cardKey];
    if (!permDef?.costReduction) continue;
    // Emerald Medallion: green spells cost {1} less
    if (permDef.costReduction.color === 'G') {
      const cost = def.cost || '';
      if (cost.includes('G') || def.types.includes('creature') /* heuristic for green */) {
        genericReduction += permDef.costReduction.amount;
      }
    }
  }
  return genericReduction;
}

/**
 * Apply reductions and Trinisphere minimum to a cost string.
 * Returns the effective cost string or null if the card is uncounterable-free.
 */
function effectiveCost(state, def) {
  const { parseCost } = _GSM;
  const raw = parseCost(def.cost);
  const reduction = costReductions(state, def);
  const thorn = thornTax(state, def);

  let generic = Math.max(0, raw.generic - reduction) + thorn;
  const colored = { ...raw.colored };

  // Trinisphere: total mana paid must be at least 3
  const coloredTotal = Object.values(colored).reduce((a, b) => a + b, 0);
  const triMin = trinisphereMin(state);
  if (generic + coloredTotal < triMin) {
    generic = triMin - coloredTotal;
  }

  // Rebuild cost string
  let costStr = '';
  if (generic > 0) costStr += String(generic);
  for (const [color, amt] of Object.entries(colored)) {
    costStr += color.repeat(amt);
  }
  return costStr || '0';
}

// ── Main action generator ─────────────────────────────────────────────────

function generateActions(state) {
  const actions = [];

  // ── 0. Loss pruning ──────────────────────────────────────────────────────
  // Never expand a state where you've already lost
  if (state.youLost()) return [];

  // ── Yeva flash check ─────────────────────────────────────────────────────
  // When Yeva is on the battlefield, you may cast green creature spells as
  // though they had flash (i.e. at instant speed, including opponent turns).
  // When it's an opponent's turn (state.isOpponentTurn), only instant-speed
  // actions are available unless Yeva grants flash.
  const yevaOnBattlefield = state.hasPermanent('Yeva, Nature\'s Herald');
  const isOpponentTurn    = state.isOpponentTurn ?? false;

  /**
   * Returns true if this card can be cast right now given the turn phase.
   * Lands are handled separately. Instants are always ok. Creatures with
   * Yeva's flash grant are ok on opponent turns. Sorceries/enchantments/
   * artifacts require your main phase (not opponent turn).
   */
  function canCastNow(def) {
    if (def.types.includes('instant')) return true;
    if (def.hasFlash) return true;           // innate flash (e.g. Yeva herself)
    if (isOpponentTurn) {
      // On opponent turn: only instants and Yeva-granted flash creatures
      if (def.types.includes('creature') && def.cost?.includes('G') && yevaOnBattlefield) return true;
      return false;
    }
    return true; // Your main phase: cast anything
  }

  // ── 1. Hand abilities (no mana cost — e.g. Elvish Spirit Guide exile) ────
  for (const cardKey of uniqueCards(state.hand)) {
    const def = CARDS[cardKey];
    if (!def?.handAbilities) continue;
    for (const [abilKey, ability] of Object.entries(def.handAbilities)) {
      actions.push({
        type: 'hand_ability',
        label: `${def.name} (hand): ${ability.label ?? abilKey}`,
        priority: 12,
        apply(s) {
          const raw = ability.fn(s, cardKey);
          if (!raw) return null;
          return Array.isArray(raw) ? raw[0] : raw;
        },
      });
    }
  }

  // ── 2. Play a land ────────────────────────────────────────────────────────
  // Playing a land is a sorcery-speed action — only on your turn.
  if (!isOpponentTurn && state.landDrops > 0) {
    for (const cardKey of uniqueCards(state.hand)) {
      const def = CARDS[cardKey];
      if (!def?.types.includes('land')) continue;

      // Dryad Arbor is a land creature — affected by summoning sickness,
      // but it IS played as a land drop (not cast).
      actions.push({
        type: 'play_land',
        label: `Play ${def.name}`,
        priority: 10,
        apply(s) {
          let ns = s.removeFromHand(cardKey);
          if (!ns) return null;
          ns = ns.clone();
          ns.landDrops--;
          ns = ns.enterBattlefield(cardKey);
          ns = ns.log(`Play ${def.name}`);

          // ── Landfall triggers ─────────────────────────────────────────────
          for (const perm of ns.battlefield) {
            if (perm.summoningSick) continue;
            if (perm.name === 'Lotus Cobra') ns = ns.addMana('G');
            if (perm.name === 'Tireless Provisioner') ns = ns.addMana('G');
            if (perm.name === 'Nissa, Resurgent Animist') ns = ns.addMana('G');
          }

          // Leyline of Abundance: if a creature was just tapped for mana, add {G}
          // (handled at tap-for-mana time, not here)

          return ns;
        },
      });
    }
  }

  // ── 3. Cast spells from hand ──────────────────────────────────────────────
  for (const cardKey of uniqueCards(state.hand)) {
    const def = CARDS[cardKey];
    if (!def || def.types.includes('land')) continue;
    if (def.cost === null || def.cost === undefined) continue;
    if (STAX_CARDS.has(cardKey)) continue;     // never cast STAX pieces
    if (!canCastNow(def)) continue;   // respect flash/sorcery-speed restrictions

    const costStr = effectiveCost(state, def);
    const testPay = state.mana.pay(costStr);
    if (testPay === null) continue;

    const isCreature   = def.types.includes('creature');
    const isEnchantment = def.types.includes('enchantment');
    const isArtifact   = def.types.includes('artifact');
    const isInstant    = def.types.includes('instant');
    const isSorcery    = def.types.includes('sorcery');

    // Spells that stay on the battlefield (permanents)
    const entersBattlefield = isCreature || isEnchantment || isArtifact;

    // Tutors (castFn): generate the smart best-choice as priority-1 action,
    // plus ranked alternatives for hand-fetching tutors (not battlefield tutors).
    if (def.castFn) {
      const costStr2 = effectiveCost(state, def);
      if (state.mana.pay(costStr2) !== null) {
        const afterPay0 = state.payMana(costStr2);
        const fromHand0 = afterPay0?.removeFromHand(cardKey);
        if (fromHand0) {
          const allResults = def.castFn(fromHand0);
          if (allResults && allResults.length > 0) {
            // Sort by priority score
            const sorted = allResults.slice().sort((a, b) => {
              const msgA = a.history[a.history.length-1]?.msg ?? '';
              const msgB = b.history[b.history.length-1]?.msg ?? '';
              const keyA = Object.keys(CARDS).find(k => msgA.includes(CARDS[k]?.name)) ?? '';
              const keyB = Object.keys(CARDS).find(k => msgB.includes(CARDS[k]?.name)) ?? '';
              return (TUTOR_PRIORITY_SCORE[keyB] ?? 0) - (TUTOR_PRIORITY_SCORE[keyA] ?? 0);
            });

            // Determine if this tutor puts the card to battlefield (high branching cost)
            // or to hand (lower branching cost, player chooses what to find).
            // Detect by checking if the first result has the card in hand or on battlefield.
            const firstResult = sorted[0];
            const firstMsg = firstResult.history[firstResult.history.length - 1]?.msg ?? '';
            const isBattlefieldTutor =
              firstMsg.includes('fetch ') ||      // Crop Rotation, GSZ, Natural Order
              firstMsg.includes('Zenith →');       // GSZ
            const maxBranches = isBattlefieldTutor ? 1 : 6;

            for (const resultState of sorted.slice(0, maxBranches)) {
              const msg = resultState.history[resultState.history.length - 1]?.msg ?? `Cast ${def.name}`;
              actions.push({
                type: 'cast_spell',
                label: msg,
                priority: isCreature ? 9 : 8,
                apply(s) {
                  const ec = effectiveCost(s, def);
                  const afterPay = s.payMana(ec);
                  if (!afterPay) return null;
                  const ns = afterPay.removeFromHand(cardKey);
                  if (!ns) return null;
                  const res = def.castFn(ns);
                  if (!res || res.length === 0) return null;
                  const matched = res.find(r =>
                    (r.history[r.history.length-1]?.msg ?? '') === msg
                  );
                  return matched ?? smartTutorTarget(s, res);
                },
              });
            }
          } else {
            // castFn returned no results — spell cannot be cast (e.g. missing sacrifice target).
            // Do NOT generate a "no targets" action; the spell simply isn't castable.
          }
        }
      }
      continue;
    }

    actions.push({
      type: 'cast_spell',
      label: `Cast ${def.name} {${costStr}}`,
      priority: isCreature ? 9 : 8,
      apply(s) {
        const ec = effectiveCost(s, def);
        const afterPay = s.payMana(ec);
        if (!afterPay) return null;
        let ns = afterPay.removeFromHand(cardKey);
        if (!ns) return null;
        if (entersBattlefield) {
          ns = ns.enterBattlefield(cardKey);
        } else {
          ns = ns.addToGraveyard(0, def.name);
        }
        ns = ns.log(`Cast ${def.name}`);

        // ── On-cast / on-enter triggers ────────────────────────────────────

        // Beast Whisperer: draw a card when you cast a creature spell
        if (isCreature && ns.hasPermanent('Beast Whisperer')) {
          const bw = ns.getPermanent('Beast Whisperer');
          if (!bw.summoningSick) ns = ns.playerDraws(0, 1);
        }

        // Guardian Project: draw when unique creature enters
        if (isCreature && ns.hasPermanent('Guardian Project')) {
          ns = ns.playerDraws(0, 1);
        }

        // onEnter hook: Auras and cards with immediate resolution effects
        if (entersBattlefield && def.onEnter && typeof def.onEnter === 'function') {
          const entered = ns.getPermanent(def.name);
          const after = def.onEnter(ns, entered);
          if (after) ns = after;
        }

        // Surrak and Goreclaw: nontoken creatures entering get +1/+1 and haste
        if (isCreature && ns.hasPermanent('Surrak and Goreclaw')) {
          const entered = ns.battlefield[ns.battlefield.length - 1];
          if (entered && entered.name !== 'Surrak and Goreclaw') {
            entered.summoningSick = false;
          }
        }

        return ns;
      },
    });
  }

  // ── 4. Tap permanents for mana ────────────────────────────────────────────
  for (const perm of state.battlefield) {
    if (perm.tapped) continue;
    const def = CARDS[perm.cardKey];
    if (!def?.tapForMana) continue;

    // Null Rod / Collector Ouphe suppresses artifact mana abilities
    if (def.types.includes('artifact') && artifactAbilitiesSuppressed(state)) continue;

    // Creatures with tap-for-mana need to not be summoning sick
    if (def.types.includes('creature') && perm.summoningSick) continue;

    // Dryad Arbor is a land creature — tap ability is a land mana ability,
    // NOT an activated ability, so it IS suppressed by summoning sickness
    // (but not by Null Rod/Collector Ouphe since it's a land ability).
    if (perm.name === 'Dryad Arbor' && perm.summoningSick) continue;

    actions.push({
      type: 'tap_for_mana',
      label: `Tap ${perm.name} for mana`,
      priority: 7,
      apply(s) {
        const live = s.getPermanentById(perm.id);
        if (!live || live.tapped) return null;
        if (def.types.includes('creature') && live.summoningSick) return null;
        const results = def.tapForMana(s, live);
        if (!results.length) return null;
        let ns = results[0];
        // Leyline of Abundance: whenever you tap a creature for mana, add {G}
        if (def.types.includes('creature') && ns.hasPermanent('Leyline of Abundance')) {
          ns = ns.addMana('G');
        }
        return ns;
      },
    });
  }

  // ── 5. Activated abilities ────────────────────────────────────────────────
  for (const perm of state.battlefield) {
    const def = CARDS[perm.cardKey];
    if (!def?.abilities) continue;

    // Null Rod / Collector Ouphe: suppress ALL artifact activated abilities
    if (def.types.includes('artifact') && artifactAbilitiesSuppressed(state)) continue;

    for (const [abilKey, ability] of Object.entries(def.abilities)) {
      // Once-per-turn abilities: skip if already used this turn
      if (perm.abilitiesUsed?.[abilKey]) continue;

      if (typeof ability.fn !== 'function') continue;

      const raw = ability.fn(state, perm);
      const results = raw === null || raw === undefined
        ? []
        : Array.isArray(raw) ? raw : [raw];

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (!result) continue;

        // Mark once-per-turn abilities as used in the result state
        const oncePerTurn = ability.label?.includes('once per turn') ||
                            ability.label?.includes('Activate only once');

        actions.push({
          type: 'ability',
          label: `${perm.name}: ${ability.label ?? abilKey}` +
                 (results.length > 1 ? ` [opt ${i + 1}/${results.length} : ${result.history.at(-1).msg}]` : ''),
          priority: 6,
          apply(_s) {
            if (!oncePerTurn) return result;
            // Mark ability used on the perm in the result state
            const ns = result.clone();
            const livePerm = ns.getPermanentById(perm.id);
            if (livePerm) {
              livePerm.abilitiesUsed = { ...livePerm.abilitiesUsed, [abilKey]: true };
            }
            return ns;
          },
        });
      }
    }
  }

  // ── 5b. Cast commander from command zone ──────────────────────────────────
  // The commander (default: Yeva) can be cast from the command zone at any time
  // you could cast it normally. Each previous cast adds {2} to the cost (tax).
  for (const cmdKey of (state.commandZone ?? [])) {
    const def = CARDS[cmdKey];
    if (!def) continue;
    const baseCost = def.cost ?? '0';

    // Parse base cost and add the commander tax as additional generic mana
    const { parseCost: pc } = _GSM;
    const parsed = pc(baseCost);
    const totalGeneric = parsed.generic + (state.commanderTax ?? 0) * 2;
    const coloredPart = Object.entries(parsed.colored)
      .flatMap(([c, n]) => Array(n).fill(c)).join('');
    const taxedCost = totalGeneric > 0
      ? `${totalGeneric}${coloredPart}`
      : coloredPart || '0';

    const testPay = state.mana.pay(taxedCost);
    if (testPay === null) continue;

    actions.push({
      type: 'cast_commander',
      label: `Cast ${def.name} from command zone {${taxedCost}}`,
      priority: 9,
      apply(s) {
        const { parseCost: pc2 } = _GSM;
        const p2 = pc2(def.cost ?? '0');
        const g2 = p2.generic + (s.commanderTax ?? 0) * 2;
        const col2 = Object.entries(p2.colored)
          .flatMap(([c, n]) => Array(n).fill(c)).join('');
        const ec = g2 > 0 ? `${g2}${col2}` : col2 || '0';
        const afterPay = s.payMana(ec);
        if (!afterPay) return null;
        let ns = afterPay.clone();
        // Move from command zone to battlefield
        ns.commandZone = ns.commandZone.filter(k => k !== cmdKey);
        ns.commanderTax = (ns.commanderTax ?? 0) + 1;
        ns = ns.enterBattlefield(cmdKey);
        ns = ns.log(`Cast ${def.name} from command zone`);
        return ns;
      },
    });
  }

  // ── 6. Pass turn / opponent turn ─────────────────────────────────────────
  // On your turn: you can pass to start the next turn, OR (if Yeva is
  // available) pass to an opponent's end step to cast flash spells.
  actions.push({
    type: 'pass_turn',
    label: 'Pass to next turn',
    priority: 2,
    apply(s) { return s.startNewTurn(); },
  });

  // Opponent-turn window: available if Yeva is in play and it's currently
  // your turn (not already an opponent turn). Lets the solver explore casting
  // green creatures at instant speed on opponents' end steps.
  if (!isOpponentTurn && yevaOnBattlefield) {
    actions.push({
      type: 'opponent_turn',
      label: "Pass to opponent's end step (Yeva flash window)",
      priority: 3,  // slightly above pass_turn
      apply(s) {
        const ns = s.clone();
        ns.isOpponentTurn = true;
        // Mana drains between phases
        ns.mana = ns.mana.constructor ? new ns.mana.constructor() : ns.mana;
        return ns.log("Opponent's end step (Yeva flash window)");
      },
    });
  }

  // End of opponent turn: pass back to your next turn
  if (isOpponentTurn) {
    actions.push({
      type: 'pass_turn',
      label: 'Pass back to your turn',
      priority: 2,
      apply(s) { return s.startNewTurn(); },
    });
  }

  actions.sort((a, b) => b.priority - a.priority);
  return actions;
}

function uniqueCards(hand) {
  return [...new Set(hand)];
}

const _ACM = { generateActions };
// Solver.js
/**
 * MTG Combo Solver — Solver (v2)
 *
 * Two search strategies:
 *   'dfs'  — Depth-first with score pruning (fast, finds optimal quickly)
 *   'bfs'  — Breadth-first by turn then depth (guaranteed fewest-actions per turn)
 *
 * Options:
 *   maxTurns    {number}   Hard turn cutoff (default 4)
 *   maxDepth    {number}   Max actions per DFS branch (default 50)
 *   maxStates   {number}   Visited-state budget (default 500 000)
 *   strategy    {string}   'dfs' | 'bfs' (default 'dfs')
 *   allLines    {boolean}  Collect ALL winning lines, not just the best (default false)
 *   verbose     {boolean}  Log each winning line as found (default false)
 */

const DEFAULT_OPTIONS = {
  maxTurns:  4,
  maxDepth:  50,
  maxStates: 500_000,
  strategy:  'dfs',
  allLines:  false,
  verbose:   false,
};

// ── Scoring ───────────────────────────────────────────────────────────────

/**
 * Score a state/path. Lower = better.
 *   Primary  : turn number (fewer turns → lower score)
 *   Secondary: depth (fewer actions → lower score)
 *   Tertiary : life remaining (more life → slightly lower score)
 *   Quaternary: mana floating (more mana → slightly lower score)
 */
function score(state, depth) {
  return (state.turn - 1) * 100_000 +
         depth            *      10  -
         state.life        *       1  -
         state.mana.total() *      1;
}

// ══════════════════════════════════════════════════════════════════════════
//  Solver class
// ══════════════════════════════════════════════════════════════════════════

class Solver {
  constructor(options = {}) {
    this.opts = { ...DEFAULT_OPTIONS, ...options };

    // Results
    this.bestLine      = null;
    this.bestCombo     = null;
    this.bestScore     = Infinity;
    this.allWinLines   = [];   // populated when opts.allLines = true

    // Diagnostics
    this.statesExplored = 0;
    this.linesFound     = 0;
    this.pruned         = 0;

    // Visited map: fingerprint → best depth seen at that state
    this.visited = new Map();
  }

  // ── Public API ────────────────────────────────────────────────────────────

  /**
   * @param {import('./GameState').GameState} initialState
   * @returns {{ line, combo, score, allLines? } | null}
   */
  solve(initialState) {
    this._reset();

    const t0 = Date.now();

    if (this.opts.strategy === 'bfs') {
      this._bfs(initialState);
    } else {
      this._dfs(initialState, [initialState], 0);
    }

    const elapsed = ((Date.now() - t0) / 1000).toFixed(2);
    if (!this.bestLine) return null;

    const result = {
      line:  this.bestLine,
      combo: this.bestCombo,
      score: this.bestScore,
    };
    if (this.opts.allLines) result.allLines = this.allWinLines;
    return result;
  }

  // ── DFS ───────────────────────────────────────────────────────────────────

  _dfs(state, path, depth) {
    this.statesExplored++;
    if (this.statesExplored > this.opts.maxStates) return;
    if (depth > this.opts.maxDepth)  return;
    if (state.turn > this.opts.maxTurns) return;

    // Prune losing states immediately
    if (state.youLost()) { this.pruned++; return; }

    // Score pruning (DFS-only)
    const s = score(state, depth);
    if (s >= this.bestScore) { this.pruned++; return; }

    // Visited-state dedup
    const fp = state.fingerprint();
    const prev = this.visited.get(fp);
    if (prev !== undefined && prev <= depth) { this.pruned++; return; }
    this.visited.set(fp, depth);

    // Combo check
    const combo = checkVictory(state);
    if (combo) {
      this._recordWin(path, combo, s);
      return;
    }

    // Expand
    const actions = generateActions(state);
    for (const action of actions) {
      let next;
      try { next = action.apply(state); }
      catch (e) { if (this.opts.verbose) console.warn(`[${action.label}]`, e.message); continue; }
      if (!next) continue;

      this._dfs(next, [...path, next], depth + 1);
      if (this.statesExplored > this.opts.maxStates) return;
    }
  }

  // ── BFS ───────────────────────────────────────────────────────────────────

  _bfs(initialState) {
    // Queue entries: { state, path, depth }
    const queue = [{ state: initialState, path: [initialState], depth: 0 }];

    while (queue.length > 0) {
      if (this.statesExplored > this.opts.maxStates) break;

      const { state, path, depth } = queue.shift();
      this.statesExplored++;

      if (state.youLost())                 continue;
      if (state.turn > this.opts.maxTurns) continue;
      if (depth > this.opts.maxDepth)      continue;

      // In BFS + allLines=false, stop once we've found a solution at this turn
      if (!this.opts.allLines && this.bestLine &&
          state.turn > this.bestLine[this.bestLine.length - 1].turn) break;

      const fp = state.fingerprint();
      if (this.visited.has(fp)) continue;
      this.visited.set(fp, depth);

      const combo = checkVictory(state);
      if (combo) {
        this._recordWin(path, combo, score(state, depth));
        if (!this.opts.allLines) return;
        continue;
      }

      const actions = generateActions(state);
      for (const action of actions) {
        let next;
        try { next = action.apply(state); }
        catch (e) { continue; }
        if (!next) continue;
        queue.push({ state: next, path: [...path, next], depth: depth + 1 });
      }
    }
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  _reset() {
    this.bestLine      = null;
    this.bestCombo     = null;
    this.bestScore     = Infinity;
    this.allWinLines   = [];
    this.statesExplored = 0;
    this.linesFound     = 0;
    this.pruned         = 0;
    this.visited       = new Map();
  }

  _recordWin(path, combo, s) {
    this.linesFound++;
    if (this.opts.allLines) {
      this.allWinLines.push({ line: [...path], combo, score: s });
    }
    if (s < this.bestScore) {
      this.bestScore = s;
      this.bestLine  = [...path];
      this.bestCombo = combo;
      if (this.opts.verbose) {
        const finalState = path[path.length - 1];
      }
    }
  }
}

// ── Result printer ────────────────────────────────────────────────────────

function printResult(result) {
  if (!result) {
    return;
  }

  const { line, combo } = result;
  const finalState = line[line.length - 1];
  if (combo.manaCombo) {
  } else {
  }
  let currentTurn = 0;

  for (let i = 1; i < line.length; i++) {
    const state = line[i];
    const histEntry = state.history[state.history.length - 1];
    if (!histEntry) continue;

    if (state.turn !== currentTurn) {
      currentTurn = state.turn;
      const lifeStr = state.life < 40 ? `  life: ${state.life}` : '';
      const libStr  = `  lib: ${state.players[0].librarySize}`;
    }

    const stepNum = String(i).padStart(2, ' ');
    const manaStr = state.mana.toString();
    if (manaStr !== '{0}') {
    }

    // Flag any loss events on the path
    const losses = state.getLosses();
    if (losses.length) {
    }
  }
  for (const p of finalState.players) {
  }
  if (combo.manaCombo) {
    if (combo.winCondition) {
    }
  } else {
  }
}

/**
 * Print a summary of all winning lines (when allLines: true).
 */
function printAllLines(result) {
  if (!result?.allLines?.length) {
    return;
  }
  const lines = result.allLines.sort((a, b) => a.score - b.score);
  for (let i = 0; i < lines.length; i++) {
    const { line, combo } = lines[i];
    const final = line[line.length - 1];
  }
}


const _nameMap = {};
for (const [k, v] of Object.entries(CARDS)) {
  if (v && v.name) _nameMap[v.name] = k;
}
self.onmessage = function(e) {
  const d = e.data;
  try {
    const sickSet   = new Set(d.sickCards   || []);
    const tappedSet = new Set(d.tappedCards || []);
    const handKeys      = (d.hand      || []).map(n => _nameMap[n]).filter(Boolean);
    const graveyardKeys = (d.graveyard || []).map(n => _nameMap[n]).filter(Boolean);
    const libraryKeys   = d.library ? d.library.map(n => _nameMap[n]).filter(Boolean) : null;
    let state = new GameState({
      hand: handKeys,
      mana: { G: Math.min(d.greenMana||0,30), C: Math.min(d.colorlessMana||0,30) },
      turn: 1, landDrops: 1, life: d.life||40,
      ...(libraryKeys ? { library: libraryKeys } : { librarySize: Math.max(0,d.librarySize||99) }),
      graveyard: graveyardKeys,
    });
    for (const name of (d.battlefield||[])) {
      const key = _nameMap[name]; if (!key) continue;
      const isTapped = tappedSet.has(name)||[...tappedSet].some(k=>k.startsWith(name+':'));
      try { state = state.enterBattlefield(key,{summoningSick:sickSet.has(name),tapped:isTapped}); } catch(_) {}
    }
    const result = new Solver({maxTurns:4,maxDepth:50,maxStates:200000,verbose:false}).solve(state);
    if (!result) { self.postMessage({found:false}); return; }
    const lastState = result.line[result.line.length-1];
    const turns=[]; let currentTurn=0;
    for (let i=1;i<result.line.length;i++) {
      const st=result.line[i],h=st.history[st.history.length-1]; if(!h) continue;
      if (st.turn!==currentTurn) { currentTurn=st.turn; turns.push({turn:currentTurn,steps:[]}); }
      const ms=st.mana&&st.mana.toString?st.mana.toString():'';
      turns[turns.length-1].steps.push({msg:typeof h==='string'?h:(h.msg||String(h)),mana:(ms&&ms!=='{0}')?ms:null});
    }
    self.postMessage({found:true,
      comboName:result.combo?.name??'Infinite Mana',comboDesc:result.combo?.description??'',
      winCondition:result.combo?.winCondition??null,
      manaCombo:result.combo?.manaCombo??result.combo?.name??'Infinite Mana',
      steps:(lastState.history||[]).map(h=>typeof h==='string'?h:(h.msg||String(h))),
      winTurn:lastState.turn||1,turns,
      finalBf:(lastState.battlefield||[]).map(p=>p.name||String(p)),
      finalMana:lastState.mana?.toString?.()??'',
    });
  } catch(err) { self.postMessage({found:false,error:err.message}); }
};
