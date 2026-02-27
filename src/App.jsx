import { useState, useEffect } from "react";

// ============================================================
// CARD DATABASE — every card in the deck with metadata
// ============================================================
const CARDS = {
  // MANA DORKS (1-drop)
  "Llanowar Elves":        { type:"creature", cmc:1, tags:["dork","elf","1drop"], tapsFor:1 , devotion:1},
  "Elvish Mystic":         { type:"creature", cmc:1, tags:["dork","elf","1drop"], tapsFor:1 , devotion:1},
  "Fyndhorn Elves":        { type:"creature", cmc:1, tags:["dork","elf","1drop"], tapsFor:1 , devotion:1},
  "Boreal Druid":          { type:"creature", cmc:1, tags:["dork","elf","1drop"], tapsFor:1 , devotion:1},
  "Birds of Paradise":     { type:"creature", cmc:1, tags:["dork","1drop"], tapsFor:1 , devotion:1},
  "Arbor Elf":             { type:"creature", cmc:1, tags:["dork","elf","1drop","arbor"], tapsFor:"arbor" , devotion:1, role:"dork-combo", note:"Taps enchanted Forests (Utopia Sprawl/Wild Growth) for 2+ mana. With Yavimaya+Cradle/Nykthos goes infinite via Ashaya+Ranger loop."},
  "Elvish Spirit Guide":   { type:"creature", cmc:2, tags:["dork","elf","free-mana"], tapsFor:1 , devotion:1, role:"fast-mana", note:"Exile from hand: add {G} immediately. Accelerates T1-T2 plays or provides instant-speed mana for flash plays. Also a 2/2 elf body if cast."},
  "Dryad Arbor":           { type:"land",    cmc:0, tags:["dork","land","forest"], tapsFor:1 , devotion:0},
  // MANA DORKS (2-drop)
  "Quirion Ranger":        { type:"creature", cmc:1, tags:["combo","elf","untap","ranger"], tapsFor:0 , devotion:1},
  "Scryb Ranger":          { type:"creature", cmc:2, tags:["combo","elf","untap","ranger","flash"], tapsFor:0 , devotion:1},
  "Wirewood Symbiote":     { type:"creature", cmc:1, tags:["combo","elf","untap","symbiote"], tapsFor:0 , devotion:1},
  // BIG MANA DORKS
  "Priest of Titania":     { type:"creature", cmc:2, tags:["dork","elf","big-dork","infinite-dork"], tapsFor:"elves" , devotion:1},
  "Elvish Archdruid":      { type:"creature", cmc:3, tags:["dork","elf","big-dork","infinite-dork","pump"], tapsFor:"elves" , devotion:2},
  "Circle of Dreams Druid":{ type:"creature", cmc:3, tags:["dork","elf","big-dork","infinite-dork"], tapsFor:"creatures" , devotion:2},
  "Karametra's Acolyte":   { type:"creature", cmc:4, tags:["dork","big-dork","infinite-dork"], tapsFor:"devotion" , devotion:1},
  "Fanatic of Rhonas":     { type:"creature", cmc:4, tags:["dork","elf","big-dork"], tapsFor:4 , devotion:1, role:"big-dork-combo", note:"Tap for 4 mana as a creature. Goes infinite with Ashaya+Quirion Ranger (needs ≥2 mana net) or Ashaya+Scryb Ranger (needs ≥3)."},
  // COMBO PIECES
  "Ashaya, Soul of the Wild": { type:"creature", cmc:5, tags:["combo","key","ashaya"], tapsFor:0 , devotion:2},
  "Temur Sabertooth":      { type:"creature", cmc:4, tags:["combo","sabertooth","bounce","protection"] , devotion:2},
  "Hyrax Tower Scout":     { type:"creature", cmc:3, tags:["combo","scout","untap","human"] , devotion:1},
  "Argothian Elder":       { type:"creature", cmc:4, tags:["combo","elf","untap-lands"] , devotion:1},
  "Wirewood Lodge":        { type:"land",    cmc:0, tags:["combo","land","untap-elf"] , devotion:0},
  "Earthcraft":            { type:"enchantment", cmc:2, tags:["combo","enchantment","earthcraft"] , devotion:1},
  "Kogla, the Titan Ape":  { type:"creature", cmc:6, tags:["combo","finisher","kogla","removal"] , devotion:2},
  "Eternal Witness":       { type:"creature", cmc:3, tags:["combo","human","recursion","etb"] , devotion:2},
  "Disciple of Freyalise": { type:"creature", cmc:6, tags:["combo","draw","sacrifice"] , devotion:2},
  "Glademuse":             { type:"creature", cmc:3, tags:["combo","draw","flash-draw"] , devotion:1},
  "Beast Whisperer":       { type:"creature", cmc:4, tags:["draw","engine"] , devotion:2},
  "Regal Force":           { type:"creature", cmc:7, tags:["draw","finisher","etb"] , devotion:3},
  "Duskwatch Recruiter":   { type:"creature", cmc:2, tags:["combo","tutor","draw"] , devotion:2},
  "Woodland Bellower":     { type:"creature", cmc:6, tags:["tutor","finisher","etb"] , devotion:2},
  // LANDS
  "Gaea's Cradle":         { type:"land", cmc:0, tags:["land","combo","key","cradle"] , devotion:0},
  "Nykthos, Shrine to Nyx":{ type:"land", cmc:0, tags:["land","combo","nykthos"] , devotion:0},
  "Itlimoc, Cradle of the Sun": { type:"land", cmc:0, tags:["land","combo","itlimoc"] , devotion:0},
  "Growing Rites of Itlimoc":   { type:"enchantment", cmc:4, tags:["land","combo","itlimoc","draw"] , devotion:1},
  "Deserted Temple":       { type:"land", cmc:0, tags:["land","combo","untap-land"] , devotion:0},
  "Yavimaya, Cradle of Growth": { type:"land", cmc:0, tags:["land","combo","forestwalk"] , devotion:0},
  "Ancient Tomb":          { type:"land", cmc:0, tags:["land","fast-mana"] , devotion:0},
  "Misty Rainforest":      { type:"land", cmc:0, tags:["land","fetch","forest"] , devotion:0},
  "Verdant Catacombs":     { type:"land", cmc:0, tags:["land","fetch","forest"] , devotion:0},
  "Windswept Heath":       { type:"land", cmc:0, tags:["land","fetch","forest"] , devotion:0},
  "Wooded Foothills":      { type:"land", cmc:0, tags:["land","fetch","forest"] , devotion:0},
  "Geier Reach Sanitarium":{ type:"land", cmc:0, tags:["land","combo","mill","sanitarium"] , devotion:0},
  "Shifting Woodland":     { type:"land", cmc:0, tags:["land","utility"] , devotion:0},
  "Emergence Zone":        { type:"land", cmc:0, tags:["land","flash","utility"] , devotion:0},
  "Talon Gates of Madara": { type:"land", cmc:0, tags:["land","utility"] , devotion:0},
  "Boseiju, Who Endures":  { type:"land", cmc:0, tags:["land","removal","utility"] , devotion:0},
  "War Room":              { type:"land", cmc:0, tags:["land","draw"] , devotion:0},
  "Urza's Cave":           { type:"land", cmc:0, tags:["land","tutor"] , devotion:0},
  "Forest":                { type:"land", cmc:0, tags:["land","basic","forest"] , devotion:0},
  // ACCELERANTS
  "Sol Ring":              { type:"artifact", cmc:1, tags:["rock","fast-mana"] , devotion:0},
  "Chrome Mox":            { type:"artifact", cmc:0, tags:["rock","fast-mana","mox"] , devotion:0},
  "Mox Diamond":           { type:"artifact", cmc:0, tags:["rock","fast-mana","mox"] , devotion:0},
  "Lotus Petal":           { type:"artifact", cmc:0, tags:["rock","fast-mana"] , devotion:0},
  "Utopia Sprawl":         { type:"enchantment", cmc:1, tags:["enchant-land","ramp","aura"] , devotion:1},
  "Wild Growth":           { type:"enchantment", cmc:1, tags:["enchant-land","ramp","aura"] , devotion:1},
  // STAX / INTERACTION
  "Collector Ouphe":       { type:"creature", cmc:2, tags:["stax","hate"] , devotion:1},
  "Destiny Spinner":       { type:"creature", cmc:2, tags:["protection","stax"] , devotion:1, role:"haste-protection", note:"Animates lands as creatures with haste. Protects creatures AND enchantments from counters. Key pile piece — gives Reclaimer/Elder haste to tap immediately."},
  "Allosaurus Shepherd":   { type:"creature", cmc:1, tags:["protection","elf"] , devotion:1},
  "Heartwood Storyteller": { type:"creature", cmc:3, tags:["stax","draw"] , devotion:2},
  "Seedborn Muse":         { type:"creature", cmc:5, tags:["engine","untap-all"] , devotion:2},
  "Eladamri, Korvecdal":   { type:"creature", cmc:4, tags:["finisher","forestwalk","protection"] , devotion:2},
  // TUTORS
  "Worldly Tutor":         { type:"instant", cmc:1, tags:["tutor","instant"] , devotion:0},
  "Chord of Calling":      { type:"instant", cmc:3, tags:["tutor","instant","convoke"] , devotion:0},
  "Summoner's Pact":       { type:"instant", cmc:0, tags:["tutor","instant","free"] , devotion:0},
  "Shared Summons":        { type:"instant", cmc:5, tags:["tutor","instant","two-creatures"] , devotion:0},
  "Green Sun's Zenith":    { type:"sorcery", cmc:1, tags:["tutor","sorcery"] , devotion:0},
  "Natural Order":         { type:"sorcery", cmc:4, tags:["tutor","sorcery","sacrifice"] , devotion:0},
  "Eldritch Evolution":    { type:"sorcery", cmc:3, tags:["tutor","sorcery","sacrifice"] , devotion:0},
  "Fierce Empath":         { type:"creature", cmc:3, tags:["tutor","elf","etb"] , devotion:1},
  "Elvish Harbinger":      { type:"creature", cmc:3, tags:["tutor","elf","dork"] , devotion:1},
  "Fauna Shaman":          { type:"creature", cmc:2, tags:["tutor","elf","engine"] , devotion:1},
  "Survival of the Fittest":{ type:"enchantment", cmc:2, tags:["tutor","engine","survival"] , devotion:1},
  "Crop Rotation":         { type:"instant", cmc:1, tags:["tutor","land","instant"] , devotion:0},
  "Sylvan Scrying":        { type:"sorcery", cmc:2, tags:["tutor","land"] , devotion:0},
  "Archdruid's Charm":     { type:"instant", cmc:3, tags:["tutor","land","removal","instant"] , devotion:0},
  // INTERACTION / UTILITY
  "Beast Within":          { type:"instant", cmc:3, tags:["removal","instant"] , devotion:0},
  "Force of Vigor":        { type:"instant", cmc:4, tags:["removal","instant","free"] , devotion:0},
  "Endurance":             { type:"creature", cmc:3, tags:["hate","flash","etb","self-protection"] , devotion:1},
  "Infectious Bite":       { type:"instant", cmc:2, tags:["removal","poison","win-con"] , devotion:0},
  "Legolas's Quick Reflexes":{ type:"instant", cmc:1, tags:["utility","haste","draw"] , devotion:0},
  "Nature's Rhythm":       { type:"enchantment", cmc:2, tags:["draw","engine"] , devotion:1},
  // OTHER UTILITY
  "Yisan, the Wanderer Bard": { type:"creature", cmc:3, tags:["tutor","engine","yisan"] , devotion:1},
  "Magus of the Candelabra": { type:"creature", cmc:1, tags:["combo","untap-lands"] , devotion:1},
  "Tireless Provisioner":  { type:"creature", cmc:3, tags:["combo","landfall","treasure"] , devotion:1, role:"ramp-combo", note:"Fetchland = landfall = Treasure token. Explosive early ramp. Goes infinite with Ashaya+Quirion Ranger when Treasures supplement mana."},
  "Badgermole Cub":        { type:"creature", cmc:2, tags:["combo","mana-doubler"] , devotion:1, role:"haste-combo", note:"Animates a land and gives it haste. All dorks produce 1 extra mana. Goes infinite with Ashaya+Quirion (mana-positive) or Scryb (mana-neutral). Pairs with Cradle/Nykthos."},
  "Woodcaller Automaton":  { type:"creature", cmc:8, tags:["combo","untap-land"] , devotion:2},
  "Sowing Mycospawn":      { type:"creature", cmc:5, tags:["removal","land-tutor"] , devotion:1},
  "Formidable Speaker":    { type:"creature", cmc:2, tags:["combo","tutor","untap","elf"] , devotion:1},
  "Chomping Changeling":   { type:"creature", cmc:3, tags:["elf","changeling"] , devotion:1},
  "Delighted Halfling":    { type:"creature", cmc:2, tags:["dork","protection"] , devotion:1, role:"protection", note:"Legendary creatures cost {1} less and can't be countered when cast. Protects Ashaya, Yeva, Yisan — key against blue interaction."},
  "Elvish Reclaimer":      { type:"creature", cmc:1, tags:["land-tutor","elf","1drop"] , devotion:1},
  "Yeva, Nature's Herald": { type:"creature", cmc:4, tags:["commander","flash-enabler"] , devotion:2},
};

const ALL_CARD_NAMES = Object.keys(CARDS).sort();

// ============================================================
// COMBO DATABASE — sourced directly from the official primer
// ============================================================
const COMBOS = [

  // ── 1. Ashaya + Quirion Ranger + Dork (≥2 mana) ───────────────────────
  {
    id: "ashaya_quirion",
    name: "Ashaya + Quirion Ranger + Dork (≥2 mana)",
    onBattlefield: ["Ashaya, Soul of the Wild", "Quirion Ranger"],
    description: "Infinite mana. Ashaya makes all nontoken creatures Forests. Quirion Ranger returns itself (now a Forest) to untap any creature. With a dork producing ≥2 mana, each loop nets at least {G}.",
    requires: ["Ashaya, Soul of the Wild", "Quirion Ranger"],
    needsBigDork: 2,
    priority: 10,
    type: "infinite-mana",
    lines: [
      "Ashaya on battlefield — all your nontoken creatures are now Forests.",
      "Tap your mana dork (producing ≥2 mana) as a Forest for mana.",
      "Activate Quirion Ranger: return itself to hand (it is a Forest via Ashaya), untapping the dork.",
      "Recast Quirion Ranger for {G}. Net: at least {G} per loop.",
      "Repeat for infinite green mana.",
    ]
  },

  // ── 2. Ashaya + Scryb Ranger + Dork (≥3 mana) ────────────────────────
  {
    id: "ashaya_scryb",
    name: "Ashaya + Scryb Ranger + Dork (≥3 mana)",
    onBattlefield: ["Ashaya, Soul of the Wild", "Scryb Ranger"],
    description: "Infinite mana. Same as Quirion Ranger variant but Scryb Ranger costs {1}{G} to recast, requiring the dork to produce ≥3 mana. Key upside: Scryb Ranger has flash — it can go off at instant speed even if Yeva is removed.",
    requires: ["Ashaya, Soul of the Wild", "Scryb Ranger"],
    needsBigDork: 3,
    priority: 10,
    type: "infinite-mana",
    lines: [
      "Ashaya on battlefield — all creatures are Forests.",
      "Tap your mana dork (producing ≥3 mana) as a Forest for mana.",
      "Activate Scryb Ranger: return itself (a Forest via Ashaya) to hand, untapping the dork.",
      "Recast Scryb Ranger for {1}{G}. Net: at least {G} per loop.",
      "IMPORTANT: Scryb Ranger has flash — works at instant speed without Yeva in play.",
    ]
  },

  // ── 3. Ashaya + Argothian Elder (2-card combo!) ───────────────────────
  {
    id: "ashaya_argothian",
    name: "Ashaya + Argothian Elder (2-Card Infinite Mana!)",
    onBattlefield: ["Ashaya, Soul of the Wild", "Argothian Elder"],
    mustPreExist: ["Argothian Elder"],
    description: "Infinite mana with only 2 cards. Ashaya turns Argothian Elder into a Forest, allowing Elder to target itself with its 'untap two lands' ability. Tap Elder as a Forest for {G}, then untap Elder + any other land. Repeat.",
    requires: ["Ashaya, Soul of the Wild", "Argothian Elder"],
    priority: 10,
    type: "infinite-mana",
    lines: [
      "Ashaya in play — Argothian Elder is now a Forest.",
      "Tap Argothian Elder as a Forest for {G}.",
      "Activate Argothian Elder's ability: untap two target lands — target itself AND any other land.",
      "Elder is now untapped. Tap it for {G} again. Repeat for infinite {G}.",
      "This is a clean 2-card combo — no other pieces required!",
    ]
  },

  // ── 4. Argothian Elder + Wirewood Lodge + Big Land ────────────────────
  {
    id: "argothian_lodge",
    name: "Argothian Elder + Wirewood Lodge + Big Land (≥2 mana)",
    onBattlefield: ["Argothian Elder", "Wirewood Lodge"],
    mustPreExist: ["Argothian Elder"],
    description: "Infinite mana. Tap a land producing ≥2 mana (Gaea's Cradle, Nykthos, Itlimoc, or a Forest enchanted with Utopia Sprawl/Wild Growth). Elder untaps that land + Lodge. Lodge untaps Elder. Net mana each loop.",
    requires: ["Argothian Elder", "Wirewood Lodge"],
    needsAlso: ["Gaea's Cradle", "Nykthos, Shrine to Nyx", "Itlimoc, Cradle of the Sun"],
    needsAuraLand: true,
    priority: 9,
    type: "infinite-mana",
    lines: [
      "Argothian Elder + Wirewood Lodge + a land producing ≥2 mana on battlefield.",
      "Eligible big lands: Gaea's Cradle, Nykthos, Itlimoc, OR any Forest enchanted with Utopia Sprawl/Wild Growth.",
      "Tap the big land for ≥2 mana.",
      "Tap Argothian Elder: untap the big land + Wirewood Lodge.",
      "Spend {G}: tap Wirewood Lodge to untap Argothian Elder (he's an Elf).",
      "Net positive mana per loop. Repeat for infinite mana.",
    ]
  },

  // ── 5. Earthcraft + Ashaya + Quirion Ranger ───────────────────────────
  {
    id: "earthcraft_ashaya_quirion",
    name: "Earthcraft + Ashaya + Quirion Ranger",
    onBattlefield: ["Earthcraft", "Ashaya, Soul of the Wild", "Quirion Ranger"],
    description: "Infinite mana. With Earthcraft, Quirion Ranger can tap itself to untap a basic land. Ashaya makes all creatures Forests (which are basic lands). Tap Quirion for {G}, tap another creature via Earthcraft to untap Quirion, bounce Quirion to untap any creature, recast — net {G} each loop.",
    requires: ["Earthcraft", "Ashaya, Soul of the Wild", "Quirion Ranger"],
    priority: 9,
    type: "infinite-mana",
    lines: [
      "Earthcraft + Ashaya + Quirion Ranger + at least one other creature on battlefield.",
      "Tap Quirion Ranger as a Forest (via Ashaya) for {G}.",
      "Tap another creature to Earthcraft: untap a basic Forest — since all creatures ARE Forests/basics via Ashaya, tap any creature to untap Quirion Ranger.",
      "Activate Quirion Ranger: return itself to hand, untapping any other creature.",
      "Recast Quirion Ranger for {G}. Net: {G} per loop.",
      "Repeat for infinite green mana.",
    ]
  },

  // ── 6. Magus of the Candelabra + Ashaya + Dork/Land (≥3 mana) ─────────
  {
    id: "magus_ashaya",
    name: "Magus of the Candelabra + Ashaya + Dork or Land (≥3 mana)",
    onBattlefield: ["Magus of the Candelabra", "Ashaya, Soul of the Wild"],
    mustPreExist: ["Magus of the Candelabra"],
    description: "Infinite mana. Ashaya makes your big dork count as a land for Magus to target. Tap the dork for ≥3 mana, spend {2} activating Magus (X=2) to untap itself and the dork. Net {G}+ each loop. The mana source doesn't have to be a real land — any big dork becomes a valid target via Ashaya.",
    requires: ["Magus of the Candelabra", "Ashaya, Soul of the Wild"],
    needsBigDork: 3,
    priority: 9,
    type: "infinite-mana",
    lines: [
      "Magus of the Candelabra + Ashaya + a dork or land producing ≥3 mana on battlefield.",
      "Tap the dork/land for ≥3 mana (it's a Forest/land via Ashaya, so Magus can target it).",
      "Pay {2}: activate Magus with X=2, untapping itself AND the big dork/land.",
      "Net: ≥{G} per loop. Repeat for infinite mana.",
      "NOTE: Even a non-land dork like Priest of Titania counts as a land via Ashaya for Magus to untap.",
    ]
  },

  // ── 7. Temur Sabertooth + Wirewood Symbiote + 1-drop Elf + Dork (≥5) ──
  {
    id: "sabertooth_symbiote",
    name: "Temur Sabertooth + Wirewood Symbiote + 1-Drop Elf + Dork (≥5 mana)",
    onBattlefield: ["Temur Sabertooth", "Wirewood Symbiote"],
    description: "Infinite mana. Symbiote bounces a 1-drop elf to untap the big dork. Sabertooth bounces Symbiote back to hand. Recast both. Net mana when dork produces ≥5 (covering {1}{G} Sabertooth bounce + {G} Symbiote recast + {G} 1-drop recast = {3}{G} total cost).",
    requires: ["Temur Sabertooth", "Wirewood Symbiote"],
    needsBigDork: 5,
    needsOneDrop: true,
    priority: 8,
    type: "infinite-mana",
    lines: [
      "Temur Sabertooth + Wirewood Symbiote + a 1-drop elf + a dork tapping for ≥5 all on battlefield.",
      "Tap the big dork for ≥5 mana.",
      "Activate Wirewood Symbiote: return the 1-drop elf to hand, untapping the big dork.",
      "Pay {1}{G}: Sabertooth bounces Wirewood Symbiote to hand.",
      "Recast Symbiote ({G}) + recast 1-drop elf ({G}). Total cost this loop: {1}{G}+{G}+{G} = {3}{G}.",
      "Net positive mana when dork taps for ≥5. Repeat for infinite mana.",
    ]
  },

  // ── 8. Temur Sabertooth/Kogla + Hyrax Tower Scout + Dork (≥6 mana) ────
  {
    id: "sabertooth_scout",
    name: "Temur Sabertooth / Kogla + Hyrax Tower Scout + Dork (≥6 mana)",
    onBattlefield: ["Hyrax Tower Scout"],
    description: "Infinite mana. Scout's ETB untaps a creature. Bounce Scout with Sabertooth/Kogla, recast it to untap the big dork. Loop cost: {1}{G} bounce + {2} recast = {3}{G}. Net positive when dork produces ≥6 (need 1 left over for loop mana).",
    requires: ["Hyrax Tower Scout"],
    needsBigDork: 6,
    needsAlsoBouncer: true,
    priority: 8,
    type: "infinite-mana",
    lines: [
      "Temur Sabertooth (or Kogla) + Hyrax Tower Scout + dork tapping for ≥6 on battlefield.",
      "Tap the big dork for ≥6 mana.",
      "Pay {1}{G}: Sabertooth bounces Hyrax Tower Scout to hand. (Or Kogla returns it as a Human.)",
      "Recast Hyrax Tower Scout ({2}): ETB untaps the big dork.",
      "Total cost per loop: {1}{G}+{2} = {3}{G}. Net: ≥{G} when dork taps for ≥6.",
      "Repeat for infinite mana.",
    ]
  },

  // ── 9. Temur Sabertooth + Woodcaller Automaton + Cradle/Nykthos (≥7) ───
  {
    id: "sabertooth_woodcaller",
    name: "Temur Sabertooth + Woodcaller Automaton + Cradle/Nykthos (≥7 mana)",
    onBattlefield: ["Temur Sabertooth", "Woodcaller Automaton"],
    description: "Infinite mana. Woodcaller Automaton's ETB (when cast) untaps a land and turns it into a haste creature-land. Bounce Automaton with Sabertooth and recast it targeting Cradle/Nykthos. Loop cost is the recast cost; net positive when Cradle/Nykthos taps for ≥7.",
    requires: ["Temur Sabertooth", "Woodcaller Automaton"],
    needsAlso: ["Gaea's Cradle", "Nykthos, Shrine to Nyx"],
    priority: 8,
    type: "infinite-mana",
    lines: [
      "Temur Sabertooth + Woodcaller Automaton + Gaea's Cradle or Nykthos tapping for ≥7 on battlefield.",
      "Pay {1}{G}: Sabertooth bounces Woodcaller Automaton to hand.",
      "Recast Automaton (prototype {2}{G}{G}): ETB untaps Cradle/Nykthos, which gains haste as a creature-land.",
      "Tap Cradle/Nykthos for ≥7 mana. Net: positive mana per loop.",
      "Repeat for infinite mana.",
    ]
  },


  // ── 10b. Fanatic of Rhonas + Ashaya + Quirion/Scryb Ranger ──────────────
  {
    id: "fanatic_ashaya_ranger",
    name: "Fanatic of Rhonas + Ashaya + Quirion/Scryb Ranger",
    onBattlefield: ["Fanatic of Rhonas", "Ashaya, Soul of the Wild"],
    mustPreExist: ["Fanatic of Rhonas"],
    description: "Infinite mana. Fanatic of Rhonas taps for {4} as a creature (=Forest via Ashaya). Quirion Ranger returns itself to untap Fanatic (loop cost {G}), netting {3}. Scryb Ranger variant costs {1}{G} to recast, netting {2}. Both are clean infinite mana lines.",
    requires: ["Fanatic of Rhonas", "Ashaya, Soul of the Wild"],
    needsRanger: true,
    priority: 9,
    type: "infinite-mana",
    lines: [
      "Fanatic of Rhonas + Ashaya, Soul of the Wild + Quirion or Scryb Ranger on battlefield.",
      "Tap Fanatic of Rhonas as a Forest (via Ashaya) for {4}.",
      "Quirion Ranger: return itself to hand (it's a Forest via Ashaya), untapping Fanatic. Recast for {G}. Net: +{3} per loop.",
      "Scryb Ranger variant: return itself, untap Fanatic. Recast for {1}{G}. Net: +{2} per loop.",
      "Repeat for infinite green mana.",
    ]
  },

  // ── 10c. Tireless Provisioner + Ashaya + Quirion Ranger ─────────────────
  {
    id: "provisioner_ashaya",
    name: "Tireless Provisioner + Ashaya + Quirion Ranger",
    onBattlefield: ["Tireless Provisioner", "Ashaya, Soul of the Wild", "Quirion Ranger"],
    description: "Infinite mana. Each time Quirion Ranger re-enters the battlefield via Ashaya loop, it triggers Tireless Provisioner's landfall (creatures are Forests). Each loop creates a Treasure token and returns one, netting mana. Requires Provisioner + Quirion Ranger + Ashaya + any dork for the loop to be mana-positive.",
    requires: ["Tireless Provisioner", "Ashaya, Soul of the Wild", "Quirion Ranger"],
    needsBigDork: 2,
    priority: 9,
    type: "infinite-mana",
    lines: [
      "Tireless Provisioner + Ashaya + Quirion Ranger + a dork tapping for ≥2 on battlefield.",
      "Each time Quirion Ranger enters the battlefield, Ashaya makes it a Forest — this triggers Tireless Provisioner's landfall.",
      "Provisioner creates a Treasure token on each Quirion cast. Crack the Treasure for {1} extra mana.",
      "Tap dork for ≥2, bounce Ranger, recast ({G}). Treasure adds {1}. Net: mana-positive each loop.",
      "With fetchlands available, each fetch also triggers Provisioner for even more Treasures.",
      "Repeat for infinite green mana.",
    ]
  },

  // ── 10d. Circle of Dreams Druid / Karametra's Acolyte + Wirewood Symbiote/Hyrax loop ──
  {
    id: "circle_symbiote_loop",
    name: "Circle of Dreams Druid / Karametra's Acolyte + Wirewood Symbiote or Hyrax Tower Scout",
    onBattlefield: ["Ashaya, Soul of the Wild"],
    description: "Infinite mana. Circle of Dreams Druid taps for {G} per creature (=Gaea's Cradle on a body). Karametra's Acolyte taps for {G} per green devotion. With Wirewood Symbiote or Hyrax Tower Scout providing a repeatable untap via Temur Sabertooth or Kogla, the loop is infinite when output ≥5 (Symbiote loop) or ≥6 (Scout loop).",
    requires: ["Ashaya, Soul of the Wild"],
    needsAlso: ["Circle of Dreams Druid", "Karametra's Acolyte"],
    needsBigDork: 5,
    priority: 8,
    type: "infinite-mana",
    lines: [
      "Circle of Dreams Druid (=Gaea's Cradle on a body) OR Karametra's Acolyte (=Nykthos on a body).",
      "With Ashaya, these creatures are Forests — enabling all the standard Ranger/Symbiote/Scout loops.",
      "Wirewood Symbiote loop: tap Circle/Acolyte for X mana, Symbiote bounces a 1-drop to untap it. Sabertooth bounces Symbiote. Net positive when X ≥ 5.",
      "Hyrax Tower Scout loop: Scout ETB untaps Circle/Acolyte. Sabertooth/Kogla bounces Scout. Net positive when X ≥ 6.",
      "Quirion Ranger loop (with Ashaya): Ranger returns itself as a Forest to untap Circle/Acolyte. Net positive when X ≥ 2.",
      "Scryb Ranger loop (with Ashaya): same but needs X ≥ 3.",
    ]
  },

  // ── 10e. Woodcaller Automaton + Ashaya + Ranger/Symbiote/Scout loops ────
  {
    id: "woodcaller_ashaya_loop",
    name: "Woodcaller Automaton + Ashaya + Ranger/Symbiote/Scout",
    onBattlefield: ["Woodcaller Automaton", "Ashaya, Soul of the Wild"],
    description: "Infinite mana. Woodcaller Automaton's ETB untaps a land AND turns it into a haste creature-land. With Ashaya in play, Automaton itself becomes a Forest. Bounce Automaton with Temur Sabertooth and recast targeting Cradle/Nykthos. Also goes infinite via Ashaya Ranger loops when Automaton's land-creature produces ≥2 mana.",
    requires: ["Woodcaller Automaton", "Ashaya, Soul of the Wild"],
    needsAlsoBouncer: true,
    priority: 8,
    type: "infinite-mana",
    lines: [
      "Woodcaller Automaton + Ashaya, Soul of the Wild + Temur Sabertooth on battlefield.",
      "ETB: Automaton untaps target land and it becomes a 4/4 creature-land with haste (Ashaya makes it a Forest too).",
      "Quirion/Scryb Ranger loop: Ranger bounces itself (now a Forest) to untap Automaton. With Cradle/Nykthos as the animated land, net mana per loop.",
      "Sabertooth loop (standalone): bounce Automaton with Sabertooth, recast to untap Cradle/Nykthos. Net positive when Cradle/Nykthos taps for ≥7.",
      "Wirewood Symbiote loop: Symbiote untaps Automaton, Sabertooth bounces Symbiote. Net positive when Automaton/Cradle produces ≥5.",
    ]
  },

  // ── 10f. Arbor Elf + Ashaya + Quirion Ranger (Utopia Sprawl / Yavimaya) ─
  {
    id: "arbor_ashaya_loop",
    name: "Arbor Elf + Ashaya + Quirion Ranger (enchanted Forest or Yavimaya)",
    onBattlefield: ["Arbor Elf", "Ashaya, Soul of the Wild", "Quirion Ranger"],
    mustPreExist: ["Arbor Elf"],
    description: "Infinite mana. Arbor Elf untaps any Forest. With Utopia Sprawl or Wild Growth on a Forest, it produces ≥2 mana. With Yavimaya making all lands Forests, Arbor Elf can untap Gaea's Cradle or Nykthos. Goes infinite via Ashaya+Quirion Ranger loop when the enchanted Forest produces ≥2 mana.",
    requires: ["Arbor Elf", "Ashaya, Soul of the Wild", "Quirion Ranger"],
    needsAuraLand: true,
    priority: 8,
    type: "infinite-mana",
    lines: [
      "Arbor Elf + Ashaya + Quirion Ranger on battlefield.",
      "Setup A (Utopia Sprawl/Wild Growth): enchant a Forest. Tap Forest for ≥2 mana. Arbor Elf untaps it. With Ashaya, Arbor Elf and Quirion Ranger are Forests — Ranger returns itself to untap Arbor Elf. Loop nets ≥{G}.",
      "Setup B (Yavimaya + Cradle/Nykthos): Yavimaya makes all lands Forests. Tap Cradle/Nykthos for X mana. Arbor Elf untaps it. Ranger bounces itself to untap Arbor Elf. Net positive when X ≥ 2.",
      "Recast Quirion Ranger ({G}). Repeat for infinite mana.",
    ]
  },

  // ── 10. Mana-Neutral Draw Loop → Infinite Mana ────────────────────────
  {
    id: "draw_loop_neutral",
    name: "Mana-Neutral Draw Loop (Ashaya + Ranger + 1-Drop Dork + Draw Engine)",
    onBattlefield: ["Ashaya, Soul of the Wild", "Quirion Ranger"],
    description: "Ashaya + Quirion Ranger + any 1-mana dork loops infinitely but nets 0 mana. Add Beast Whisperer or Glademuse to draw your entire library for free. Then find Elvish Spirit Guide + Tireless Provisioner (each Ranger cast = Forest ETB = Treasure) to convert to infinite mana, or Temur Sabertooth to pivot to another line.",
    requires: ["Ashaya, Soul of the Wild", "Quirion Ranger"],
    needsDrawEngine: true,
    needsOneDrop: true,
    priority: 9,
    type: "win-draw",
    lines: [
      "Ashaya + Quirion Ranger + any 1-mana dork (e.g. Llanowar Elves) + Beast Whisperer or Glademuse on battlefield.",
      "Tap the 1-mana dork for {G}. Cast Quirion Ranger for {G} → trigger draw engine (Beast Whisperer draws 1; Glademuse draws 1 if it's not your turn).",
      "Bounce Quirion Ranger to untap the dork. Loop is mana-neutral but draws 1 card per iteration.",
      "Draw your entire library at zero net mana cost.",
      "FIND: Elvish Spirit Guide (exile for {G} at instant speed) + Tireless Provisioner.",
      "With Provisioner on board: each Quirion Ranger ETB = Forest ETB (Ashaya) = Treasure token = net {G} per loop.",
      "Infinite mana achieved. Win via Duskwatch Recruiter loop, Sanitarium mill, or Infectious Bite poison.",
    ]
  },

  // ── WIN CON A: Sanitarium Mill — Temur Variant ───────────────────────
  {
    id: "geier_mill_temur",
    name: "Sanitarium Mill — Temur Variant (Endurance ETB on Stack + Temur Sabertooth)",
    description: "Use Endurance's ETB as a floating 'library reset shield' while looping Sanitarium infinitely. Cast Endurance, hold its ETB on the stack, bounce Endurance with Sabertooth (ETB stays on stack), then loop Sanitarium until all opponents' libraries are empty. Requires infinite mana + a Sanitarium untap method.",
    requires: ["Geier Reach Sanitarium", "Endurance", "Temur Sabertooth"],
    onBattlefield: ["Geier Reach Sanitarium", "Temur Sabertooth"],
    needsInfiniteMana: true,
    needsUntapLand: true,
    priority: 10,
    type: "win-mill",
    lines: [
      "SETUP: Infinite mana established. Geier Reach Sanitarium on battlefield with an untap method. Temur Sabertooth on battlefield.",
      "STEP 1: Cast Endurance. Pass priority.",
      "STEP 2: Endurance resolves, enters the battlefield. Its ETB trigger goes on the stack. Hold priority — do NOT let it resolve yet.",
      "STEP 3: Pay {1}{G} — activate Temur Sabertooth, bouncing Endurance back to hand. Pass priority. (The ETB trigger remains on the stack even though Endurance has left the battlefield.)",
      "STEP 4: Pay {2}, activate Geier Reach Sanitarium. Hold priority.",
      "STEP 5: Untap Geier Reach Sanitarium using your chosen method. Pass priority.",
      "STEP 6: Repeat steps 1–5.",
      "RESULT: Each player draws a card, then discards a card. Put all cards from our graveyard on the bottom of the library. Each player draws a card, then discards a card... etc. Opponents will draw from an empty library — state-based loss.",
    ]
  },

  // ── WIN CON B: Sanitarium Mill — Kogla Variant ───────────────────────
  {
    id: "geier_mill_kogla",
    name: "Sanitarium Mill — Kogla Variant (Endurance + Kogla + Eternal Witness)",
    description: "Kill Endurance while its ETB is suspended on the stack (using Beast Within or Legolas's Quick Reflexes), then loop it back via Eternal Witness + Kogla. The ETB stays on the stack as protection while you loop Sanitarium. LQR only needs to be cast once per turn — its tap triggers persist and kill Endurance each iteration.",
    requires: ["Geier Reach Sanitarium", "Endurance", "Kogla, the Titan Ape", "Eternal Witness"],
    onBattlefield: ["Geier Reach Sanitarium", "Kogla, the Titan Ape", "Eternal Witness"],
    needsInfiniteMana: true,
    needsUntapLand: true,
    needsRemoval: true,
    priority: 10,
    type: "win-mill",
    lines: [
      "SETUP: Infinite mana. Geier Reach Sanitarium + untap method on battlefield. Kogla and Eternal Witness on battlefield. Beast Within or Legolas's Quick Reflexes available.",
      "STEP 1: Cast Endurance. Pass priority.",
      "STEP 2: Endurance resolves. ETB trigger goes on the stack. Hold priority.",
      "STEP 3A — If using Beast Within: Cast Beast Within targeting Endurance. Endurance is destroyed (its controller creates a 3/3 Beast token). The ETB trigger remains on the stack.",
      "STEP 3B — If using Legolas's Quick Reflexes (LQR): Cast LQR targeting your infinite tap/untap creature. That creature's tap triggers now deal damage — use them to deal lethal to Endurance. Endurance dies; ETB stays on the stack. NOTE: LQR only needs to be cast ONCE per turn — the tap ability persists for the rest of the loop.",
      "STEP 4: Cast Eternal Witness. ETB returns either Endurance OR Beast Within to hand (your choice — pick whichever you need first).",
      "STEP 5: Pay {2} — activate Kogla, the Titan Ape, returning Eternal Witness (a Human) to hand.",
      "STEP 6: Recast Eternal Witness. ETB returns the OTHER card (whichever of Endurance or Beast Within you did not pick in step 4).",
      "STEP 7: Pay {2}, activate Geier Reach Sanitarium: each player draws then discards. Hold priority.",
      "STEP 8: Untap Sanitarium (Deserted Temple or Magus). Repeat step 7 as needed to exhaust all opponents' libraries.",
      "STEP 9: Allow the Endurance ETB to resolve — target yourself, shuffling your graveyard back into your library.",
      "STEP 10: Recast Endurance and repeat from Step 1.",
      "KEY: LQR does not need to be recast each loop — unlike Beast Within, its tap-damage effect on the targeted creature persists until end of turn.",
    ]
  },

  // ── WIN CON C: Sanitarium Mill — Ashaya Variant ──────────────────────
  {
    id: "geier_mill_ashaya",
    name: "Sanitarium Mill — Ashaya Variant (Endurance + Quirion/Scryb Ranger + LQR)",
    description: "Uses the Ashaya infinite Ranger loop as the Sanitarium untap engine. Legolas's Quick Reflexes is cast once; its tap triggers kill both Endurance and the Ranger while Endurance's First ETB is still on the stack. A Second Endurance ETB (from recasting) resets your graveyard, returning Endurance and the Ranger to your library so Duskwatch Recruiter can find them again to continue the loop.",
    requires: ["Geier Reach Sanitarium", "Endurance", "Ashaya, Soul of the Wild", "Legolas's Quick Reflexes"],
    onBattlefield: ["Geier Reach Sanitarium", "Ashaya, Soul of the Wild"],
    needsInfiniteMana: true,
    needsUntapLand: true,
    needsRanger: true,
    priority: 10,
    type: "win-mill",
    lines: [
      "SETUP: Infinite mana via Ashaya loop. Geier Reach Sanitarium on battlefield. Quirion Ranger or Scryb Ranger as the infinite tap/untap piece.",
      "STEP 1: Cast Legolas's Quick Reflexes targeting the creature that is tapping and untapping infinitely. Its tap triggers can now deal damage to any target creature. Draw a card.",
      "STEP 2: Cast Endurance. Pass priority.",
      "STEP 3: Endurance resolves. The First ETB goes on the stack. Hold priority — do NOT resolve it yet.",
      "STEP 4: Bounce Endurance with Quirion Ranger or Scryb Ranger (Endurance is a Forest via Ashaya, so Ranger can return it to hand). The First ETB remains on the stack.",
      "STEP 5: Recast Endurance. The Second ETB goes on the stack (now two ETBs on the stack: First still waiting, Second freshly added on top).",
      "STEP 6: Use the LQR creature's tap triggers: deal lethal damage to Endurance AND deal lethal damage to the Ranger. Both die while the Second ETB is still on the stack.",
      "STEP 7: Resolve the Second ETB — target yourself. This shuffles YOUR graveyard (now containing Endurance and the Ranger) back into your library. Both are recycled.",
      "STEP 8: Recast Ranger — it was just shuffled back in, so find it with infinite Duskwatch Recruiter activations.",
      "STEP 9: Pay {2}, activate Geier Reach Sanitarium: each player draws then discards. Hold priority.",
      "STEP 10: Untap Sanitarium using the Ashaya + Ranger loop (or Argothian Elder method). Pass priority. Repeat step 9 until all opponents' libraries are empty.",
      "STEP 11: Resolve the First ETB — target yourself or use it strategically.",
      "STEP 12: Find Endurance again via Duskwatch Recruiter (it was returned to library in step 7). Recast it to create a new First ETB. Repeat from step 4.",
      "KEY INSIGHT: The Second ETB (step 7) is the engine that perpetuates the loop — it replenishes your library with Endurance and Ranger so the cycle never ends.",
    ]
  },

  // ── WIN CON: Poison via Infectious Bite + Eternal Witness ─────────────
  {
    id: "poison_win",
    name: "Infectious Bite + Eternal Witness + Temur Sabertooth / Kogla (Poison Win)",
    onBattlefield: ["Eternal Witness"],
    description: "Requires infinite mana. Cast Infectious Bite 10 times via Eternal Witness recursion. Each cast gives every opponent 1 poison counter. 10 poison counters = loss. Works with Sabertooth (bounce Witness) or Kogla (return Witness as Human on attack).",
    requires: ["Infectious Bite", "Eternal Witness"],
    needsAlsoBouncer: true,
    priority: 9,
    type: "win-poison",
    lines: [
      "Establish infinite mana. Have Infectious Bite in hand or graveyard.",
      "Eternal Witness + Temur Sabertooth (or Kogla) on battlefield.",
      "Cast Infectious Bite ({1}{G}): target creature you control fights any opponent's creature. Each opponent gets 1 poison counter. (1/10)",
      "With Sabertooth: pay {1}{G} to bounce Eternal Witness. Recast Witness ({2}{G}) → ETB retrieves Infectious Bite.",
      "With Kogla: Kogla attacks → return Eternal Witness (Human) to hand → recast Witness → retrieve Bite.",
      "Repeat 10 times. All opponents accumulate 10 poison counters simultaneously and lose.",
    ]
  },

  // ── WIN CON: Glademuse Draw on Opponent's Turn ────────────────────────
  {
    id: "glademuse_draw",
    name: "Ashaya + Quirion Ranger + Glademuse (Draw Library, Instant Speed)",
    onBattlefield: ["Ashaya, Soul of the Wild", "Quirion Ranger", "Glademuse"],
    description: "On an opponent's turn with Yeva flash active: each Quirion Ranger cast triggers Glademuse (you cast a spell off-turn → you draw). The mana-neutral loop now draws your entire library. Then find Tireless Provisioner to generate Treasures each loop → infinite mana.",
    requires: ["Ashaya, Soul of the Wild", "Quirion Ranger", "Glademuse"],
    priority: 9,
    type: "win-draw",
    lines: [
      "Ashaya + Glademuse on battlefield. It is an opponent's turn (Yeva flash active).",
      "Cast Quirion Ranger ({G}) — it's not your turn, so Glademuse triggers: you draw a card.",
      "Tap Quirion Ranger as a Forest for {G}. Activate its ability: return itself to hand, untap any dork.",
      "Recast Ranger for {G} → draw again. Loop is mana-neutral but draws 1 card per iteration.",
      "Draw entire library. Find Tireless Provisioner — each Ranger ETB = Forest ETB (Ashaya) = Treasure → net mana.",
      "Infinite mana. Win via Duskwatch loop, combat, or Sanitarium mill.",
    ]
  },

  // ── WIN CON: Eladamri + Yavimaya Combat ───────────────────────────────
  {
    id: "eladamri_yavimaya",
    name: "Eladamri + Yavimaya (Unblockable Army — Combat Win)",
    onBattlefield: ["Eladamri, Korvecdal", "Yavimaya, Cradle of Growth"],
    description: "Non-infinite but game-winning. Yavimaya makes all lands Forests for all players. Eladamri gives all your creatures forestwalk and shroud from opponents. Since all opponents always control a Forest (Yavimaya), your entire army is completely unblockable and untargetable.",
    requires: ["Eladamri, Korvecdal", "Yavimaya, Cradle of Growth"],
    priority: 6,
    type: "win-combat",
    lines: [
      "Have Eladamri + Yavimaya + enough creatures for lethal damage on battlefield.",
      "Yavimaya: every land is a Forest for all players — opponents always control a Forest.",
      "Eladamri: all your creatures have forestwalk (unblockable vs Forest-controlling players) AND protection from targeted spells/abilities.",
      "Your army is unblockable and untargetable. Attack for lethal.",
    ]
  },

  // ── ENGINE: Yisan the Wanderer Bard ───────────────────────────────────
  {
    id: "yisan_engine",
    name: "Yisan the Wanderer Bard — Verse Tutor Chain",
    onBattlefield: ["Yisan, the Wanderer Bard"],
    mustPreExist: ["Yisan, the Wanderer Bard"],
    description: "Yisan tutors a creature of CMC equal to its current verse counter count. With Quirion Ranger you can untap Yisan after activating and activate again at the same verse — 2 tutors per activation window. Seedborn Muse gives you a Yisan activation on every opponent's turn.",
    requires: ["Yisan, the Wanderer Bard"],
    priority: 6,
    type: "engine",
    lines: [
      "V1: Tutor Quirion Ranger or Wirewood Symbiote.",
      "V2: Tutor Scryb Ranger, Wirewood Symbiote, or another untap piece.",
      "V3: Tutor Priest of Titania / Elvish Archdruid / Circle of Dreams Druid.",
      "V4: Tutor Temur Sabertooth or Hyrax Tower Scout.",
      "V5: Tutor Ashaya, Soul of the Wild → immediately go infinite with V1-V3 pieces.",
      "PRO TIP: Activate Yisan (hold priority) → use Quirion Ranger to untap Yisan → activate again at same verse = 2 creatures per turn.",
    ]
  },

  // ── ENGINE: Survival of the Fittest + Eternal Witness ─────────────────
  {
    id: "survival_witness",
    name: "Survival of the Fittest + Eternal Witness (Infinite Tutoring)",
    onBattlefield: ["Survival of the Fittest"],
    description: "With infinite mana: discard any creature to Survival to search for Eternal Witness. Witness ETB retrieves the discarded creature. Discard it again to search for any creature in library. Repeat to assemble any board state.",
    requires: ["Survival of the Fittest", "Eternal Witness"],
    priority: 7,
    type: "engine",
    lines: [
      "Activate Survival ({G}): discard creature X, search for Eternal Witness.",
      "Cast Eternal Witness ({2}{G}): ETB returns creature X from graveyard.",
      "Activate Survival again: discard creature X, search for any creature in library.",
      "Cast the tutored creature. Repeat to assemble your winning board state.",
    ]
  },
];

// ============================================================

// ============================================================
// URL STATE — compress JSON with DeflateRaw, base64 encode into ?s= param
// ============================================================
async function compressState(obj) {
  const json = JSON.stringify(obj);
  const stream = new Blob([json]).stream().pipeThrough(new CompressionStream("deflate-raw"));
  const buf = await new Response(stream).arrayBuffer();
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); // URL-safe base64
}

async function decompressState(encoded) {
  const bin = atob(encoded.replace(/-/g, "+").replace(/_/g, "/"));
  const buf = Uint8Array.from(bin, c => c.charCodeAt(0));
  const stream = new Blob([buf]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
  const text = await new Response(stream).text();
  return JSON.parse(text);
}

// ============================================================
// EASTER EGG — secret card names that trigger special responses
// ============================================================
const undo = s => s.replace(/[a-zA-Z]/g, c =>
  String.fromCharCode(c.charCodeAt(0) + (c.toLowerCase() < 'n' ? 13 : -13))
);

const SECRET_CARDS = {
  "21a2934d0b5a529b2a952af3701bf8e5bda6241c92da60d86be286bce55e045c": {
    lines: [
      "Nu lrf, gur Oynpx Ybghf. Gung jbhyq pregnvayl uryc gur znan fvghngvba.",
      "Fnqyl, vg'f abg va gur 99. Be gur 100. Be yrtny va guvf sbezng.",
      "Creuncf pbafvqre Tnrn'f Penqyr nf n fcvevghny fhpprffbe.",
    ],
    color: "#9b59b6",
    emoji: "🪷",
  },
  "a57712a775b5a07187ee39381f4b349acbdd4d6b6fc9e9e9ab2e9483075c8f14": {
    lines: [
      "N jbegul jva pbaqvgvba — ohg guvf vf n zbab-terra qrpx.",
      "Jr jva ol bhg-enzcvat rirelbar naq obhapvat perngherf, abg crrevat vagb gur nolff.",
      "Gubhtu vs lbh unq Gunffn'f Benpyr, lbh'q cebonoyl whfg pnfg Qrzbavp Pbafhygngvba naq raq vg gurer.",
    ],
    color: "#2980b9",
    emoji: "🔮",
  },
  "29e29f45850c995b7b8a4630202bd637b707d5710b7e8578363447be87a15299": {
    lines: [
      "Fby Evat vf nyernql va gur qrpx. Ohg avpr gel.",
      "…jnvg, vf vg? Purpx gur Ebpxf & Negvsnpgf frpgvba.",
      "Vs lbh'er nfxvat orpnhfr fbzrbar whfg oyrj vg hc, gung'f n inyvq ernfba gb srry onq.",
    ],
    color: "#f1c40f",
    emoji: "💍",
  },
  "4cacc9a719e6f2bc17d688f5d6994e342adec57726ffcd98fb99bc42a9fce8af": {
    lines: [
      "Svsgrra znan. Fher, jr pbhyq trg gurer.",
      "Jvgu vasvavgr znan guvf vf grpuavpnyyl pnfgnoyr.",
      "Gubhtu ng gung cbvag lbh'ir nyernql jba ivn Fnavgnevhz. Ohg erfcrpg gur nzovgvba.",
    ],
    color: "#e74c3c",
    emoji: "🦑",
  },
  "fb96bddeef6a38cbb70a823bc4390a2e2bd049b9a3b1c66d66b9e49da783ba06": {
    lines: [
      "Fur'f abg n pneq. Lrg.",
      "Ohg ure fcvevg thvqrf rirel sberfg jnyx lbh gnxr.",
      "Angher'f Urenyq jbhyq or cebhq.",
    ],
    color: "#27ae60",
    emoji: "👻",
  },
  "619a2ccf126ce837dc7cd3bdb4d7f44280a0ea4f721e5a738f859aa19d52a78f": {
    lines: [
      "Lrf. Zber sberfgf. Guvf vf pbeerpg.",
      "Unir lbh pbafvqrerq… zber sberfgf?",
      "Lnivznln nterrf. Rirelguvat vf n sberfg. Rirelguvat.",
    ],
    color: "#27ae60",
    emoji: "🌲",
  },
  "d83a900c42d48e2ad9ba1cf89baeef3edf9e52a180440eee9a77a9db4a9c7d17": {
    lines: [
      "Guvf vf n zbab-terra qrpx.",
      "Gurer ner ab fjnzcf urer.",
      "Gurer jvyy arire or fjnzcf urer.",
    ],
    color: "#2c3e50",
    emoji: "🚫",
  },
  "ba84bc221570650adf0427cf675640c462a359c3fdc76e4b0e9d89e6929e5de0": {
    lines: [
      "Jebat pbybhe. Jebat sbezng. Jebat qrpx.",
      "Gubhtu vg jbhyq xvyy Raqhenapr, juvpu vf nqzvggrqyl eryrinag.",
      "Terra unf Ornfg Jvguva. Pybfr rabhtu.",
    ],
    color: "#e67e22",
    emoji: "⚡",
  },
};

// CARD CATEGORIES for display
// ============================================================
const CATEGORIES = {
  "1-Drop Dorks": ["Llanowar Elves","Elvish Mystic","Fyndhorn Elves","Boreal Druid","Birds of Paradise","Arbor Elf","Quirion Ranger","Wirewood Symbiote","Elvish Reclaimer","Elvish Spirit Guide","Magus of the Candelabra","Allosaurus Shepherd"],
  "2-3 Drop Creatures": ["Scryb Ranger","Priest of Titania","Earthcraft","Elvish Archdruid","Circle of Dreams Druid","Duskwatch Recruiter","Heartwood Storyteller","Hyrax Tower Scout","Eternal Witness","Fauna Shaman","Formidable Speaker","Destiny Spinner","Collector Ouphe","Glademuse","Delighted Halfling","Badgermole Cub","Chomping Changeling","Yisan, the Wanderer Bard","Elvish Harbinger","Fierce Empath","Tireless Provisioner","Nature's Rhythm","Endurance"],
  "4-5 Drop Creatures": ["Ashaya, Soul of the Wild","Temur Sabertooth","Karametra's Acolyte","Fanatic of Rhonas","Argothian Elder","Seedborn Muse","Eladamri, Korvecdal","Growing Rites of Itlimoc","Beast Whisperer","Yeva, Nature's Herald"],
  "6+ Drop Creatures": ["Kogla, the Titan Ape","Disciple of Freyalise","Woodland Bellower","Regal Force","Woodcaller Automaton","Sowing Mycospawn"],
  "Rocks & Artifacts": ["Sol Ring","Chrome Mox","Mox Diamond","Lotus Petal"],
  "Enchantments": ["Utopia Sprawl","Wild Growth","Survival of the Fittest"],
  "Instants & Sorceries": ["Worldly Tutor","Chord of Calling","Summoner's Pact","Shared Summons","Green Sun's Zenith","Natural Order","Eldritch Evolution","Crop Rotation","Sylvan Scrying","Archdruid's Charm","Beast Within","Force of Vigor","Infectious Bite","Legolas's Quick Reflexes"],
  "Key Lands": ["Gaea's Cradle","Itlimoc, Cradle of the Sun","Nykthos, Shrine to Nyx","Yavimaya, Cradle of Growth","Wirewood Lodge","Deserted Temple","Geier Reach Sanitarium","Ancient Tomb","Emergence Zone","Boseiju, Who Endures","Shifting Woodland","Talon Gates of Madara","War Room","Urza's Cave","Dryad Arbor","Misty Rainforest","Verdant Catacombs","Windswept Heath","Wooded Foothills"],
  "Basic Lands": ["Forest"],
};

// ============================================================
// ADVICE ENGINE — pure logic, no AI
// ============================================================
function analyzeGameState({ hand, battlefield, graveyard, manaAvailable, isMyTurn, opponentThreats, lifeTotal }) {
  const board = new Set(battlefield);
  const inHand = new Set(hand);
  const inGrave = new Set(graveyard);
  const allAvailable = new Set([...hand, ...battlefield]);

  const mana = parseInt(manaAvailable) || 0;
  const elvesOnBoard    = battlefield.filter(c => CARDS[c]?.tags?.includes("elf")).length;
  const creaturesOnBoard = battlefield.filter(c => CARDS[c]?.type === "creature").length;
  const dorksOnBoard    = battlefield.filter(c => CARDS[c]?.tags?.includes("dork")).length;
  // Exact green devotion: sum of devotion field for every permanent on the battlefield
  const devotionOnBoard = battlefield.reduce((sum, c) => sum + (CARDS[c]?.devotion ?? 0), 0);

  // Badgermole Cub substitutes for Destiny Spinner (land animation) when a bouncer is available
  const hasBouncer       = board.has("Temur Sabertooth") || board.has("Kogla, the Titan Ape") || inHand.has("Temur Sabertooth") || inHand.has("Kogla, the Titan Ape");
  const speakerHasBouncer = board.has("Temur Sabertooth") || board.has("Kogla, the Titan Ape");
  // Badgermole Cub needs Temur Sabertooth specifically — Kogla only bounces Humans, not Badgers
  const badgermoleActive = (board.has("Badgermole Cub") || inHand.has("Badgermole Cub")) && (board.has("Temur Sabertooth") || inHand.has("Temur Sabertooth"));
  const hasLandAnimate   = board.has("Destiny Spinner") || inHand.has("Destiny Spinner") || badgermoleActive;
  const yevaFlash        = board.has("Yeva, Nature's Herald");

  // Compute infiniteManaActive early so all subsequent checks can use it safely
  const infiniteManaActive = (() => {
    for (const combo of COMBOS) {
      if (combo.type !== "infinite-mana") continue;
      const allOnBoard = combo.requires.every(r => board.has(r));
      if (!allOnBoard) continue;
      const extras = comboExtrasSatisfied(combo);
      if (extras.ok) return true;
    }
    return false;
  })();

  // Can we cast permanents into play this turn? (our turn, Yeva flash, or infinite mana)
  const canCastNow = isMyTurn || yevaFlash || infiniteManaActive;
  // Haste enabler: Ashaya (board or castable) + Destiny Spinner/Badgermole makes all creature-Forests tap immediately
  const ashayaAvailable   = board.has("Ashaya, Soul of the Wild") || (inHand.has("Ashaya, Soul of the Wild") && canCastNow);
  const hasHasteEnabler   = ashayaAvailable && hasLandAnimate;

  const results = [];

  // ---- HELPER: exact mana output of a dork given board context ----
  function estimateDorkOutput(cardName) {
    const t = CARDS[cardName]?.tapsFor;
    // Badgermole Cub: animates a land and grants +1 mana to all creatures while on board
    const badgermoleBonus = board.has("Badgermole Cub") ? 1 : 0;
    if (typeof t === "number") return t + (t > 0 ? badgermoleBonus : 0);
    if (t === "elves")    return elvesOnBoard    + badgermoleBonus; // Priest of Titania, Elvish Archdruid
    if (t === "creatures") return creaturesOnBoard + badgermoleBonus; // Circle of Dreams Druid
    if (t === "devotion") return devotionOnBoard  + badgermoleBonus; // Karametra's Acolyte
    if (t === "arbor") {
      // Arbor Elf untaps an enchanted Forest or (with Yavimaya) any land
      const hasAura = board.has("Utopia Sprawl") || board.has("Wild Growth");
      const hasYavimaya = board.has("Yavimaya, Cradle of Growth");
      // With Yavimaya + Cradle/Nykthos: can untap a big land
      if (hasYavimaya && (board.has("Gaea's Cradle") || board.has("Nykthos, Shrine to Nyx")))
        return Math.max(creaturesOnBoard, devotionOnBoard) + badgermoleBonus;
      // With aura enchantment: tap Forest for base mana + enchantment bonus
      if (hasAura) return 2 + badgermoleBonus;
      return 1 + badgermoleBonus;
    }
    return 0;
  }

  // ---- HELPER: find the best big dork available and its output ----
  function findBigDork(threshold) {
    const all = [...battlefield, ...hand];
    const candidates = all.filter(c => {
      if (!CARDS[c]?.tags?.includes("dork") && !CARDS[c]?.tags?.includes("big-dork")) return false;
      return estimateDorkOutput(c) >= threshold;
    });
    if (candidates.length === 0) return null;
    // Return the highest-output candidate
    return candidates.sort((a,b) => estimateDorkOutput(b) - estimateDorkOutput(a))[0];
  }

  // ---- HELPER: check combo-specific extra requirements ----
  function comboExtrasSatisfied(combo) {

    // needsBigDork: need a dork producing >= N mana
    if (combo.needsBigDork) {
      const dork = findBigDork(combo.needsBigDork);
      if (!dork) return { ok: false, missing: `a mana dork producing ≥${combo.needsBigDork} mana (e.g. Priest of Titania with ${combo.needsBigDork}+ elves, Circle of Dreams Druid, Karametra's Acolyte)` };
    }

    // needsOneDrop: need a 1-drop elf (for Symbiote combo and draw loop)
    if (combo.needsOneDrop) {
      const hasOneDrop = [...battlefield, ...hand].some(c =>
        CARDS[c]?.tags?.includes("1drop") && CARDS[c]?.tags?.includes("elf")
      );
      if (!hasOneDrop) return { ok: false, missing: "a 1-drop elf (Llanowar Elves, Elvish Mystic, Fyndhorn Elves, etc.)" };
    }

    // needsAlsoBouncer: need Temur Sabertooth or Kogla anywhere
    if (combo.needsAlsoBouncer) {
      const hasBouncer = board.has("Temur Sabertooth") || board.has("Kogla, the Titan Ape") || inHand.has("Temur Sabertooth") || inHand.has("Kogla, the Titan Ape");
      if (!hasBouncer) return { ok: false, missing: "Temur Sabertooth or Kogla, the Titan Ape" };
    }

    // needsDrawEngine: need Beast Whisperer or Glademuse
    if (combo.needsDrawEngine) {
      const hasEngine = board.has("Beast Whisperer") || board.has("Glademuse")
        || inHand.has("Beast Whisperer") || inHand.has("Glademuse");
      if (!hasEngine) return { ok: false, missing: "Beast Whisperer or Glademuse (draw engine)" };
    }

    // needsAuraLand: Argothian+Lodge combo also works with an enchanted Forest
    if (combo.needsAlso) {
      const hasNamedLand = combo.needsAlso.some(c => board.has(c) || inHand.has(c));
      const hasAuraLand = combo.needsAuraLand && (
        (board.has("Utopia Sprawl") || board.has("Wild Growth")) &&
        (board.has("Forest") || board.has("Dryad Arbor") || board.has("Yavimaya, Cradle of Growth"))
      );
      if (!hasNamedLand && !hasAuraLand) {
        return { ok: false, missing: combo.needsAlso.join(" or ") + (combo.needsAuraLand ? " (or a Forest enchanted with Utopia Sprawl/Wild Growth)" : "") };
      }
    }

    // needsRemoval: Kogla variant needs Beast Within OR Legolas's Quick Reflexes
    if (combo.needsRemoval) {
      const hasRemoval = board.has("Beast Within") || inHand.has("Beast Within")
        || board.has("Legolas's Quick Reflexes") || inHand.has("Legolas's Quick Reflexes");
      if (!hasRemoval) return { ok: false, missing: "Beast Within or Legolas's Quick Reflexes (to kill Endurance on the stack)" };
    }

    // needsRanger: Ashaya variant needs Quirion Ranger or Scryb Ranger
    if (combo.needsRanger) {
      const hasRanger = board.has("Quirion Ranger") || inHand.has("Quirion Ranger")
        || board.has("Scryb Ranger") || inHand.has("Scryb Ranger");
      if (!hasRanger) return { ok: false, missing: "Quirion Ranger or Scryb Ranger" };
    }

    // needsInfiniteMana: requires infinite mana to already be established
    if (combo.needsInfiniteMana && !infiniteManaActive) {
      return { ok: false, missing: "infinite mana (establish a mana loop first)" };
    }

    // needsUntapLand: combo requires a way to repeatedly untap Geier Reach Sanitarium.
    // Valid methods:
    //   1. Woodcaller Automaton (ETB untaps a land)
    //   2. Destiny Spinner + Hyrax Tower Scout (animate land, Scout untaps)
    //   3. Ashaya + Magus of the Candelabra (creatures are lands, Magus untaps X)
    //   4. Ashaya + Quirion Ranger (return Forest to hand = untap a land)
    //   5. Ashaya + Scryb Ranger (same, instant speed)
    //   6. Wirewood Symbiote + Destiny Spinner (Spinner animates land, Symbiote untaps via elf bounce)
    //   7. Ashaya + Argothian Elder (tap Elder to untap 2 lands)
    if (combo.needsUntapLand) {
      const hasAshaya      = board.has("Ashaya, Soul of the Wild") || inHand.has("Ashaya, Soul of the Wild");
      const hasQuirion     = board.has("Quirion Ranger")  || inHand.has("Quirion Ranger");
      const hasScryb       = board.has("Scryb Ranger")    || inHand.has("Scryb Ranger");
      const hasSpinner     = board.has("Destiny Spinner");
      const hasBouncer     = board.has("Temur Sabertooth") || board.has("Kogla, the Titan Ape") || inHand.has("Temur Sabertooth") || inHand.has("Kogla, the Titan Ape");
      // Badgermole Cub animates a land (like Destiny Spinner) when a bouncer is available to re-use its ETB
      const hasBadgermole  = board.has("Badgermole Cub") && hasBouncer;
      const hasLandAnimate = hasSpinner || hasBadgermole; // either animates lands
      const hasMagus       = board.has("Magus of the Candelabra") || (inHand.has("Magus of the Candelabra") && hasLandAnimate);
      const hasElder       = board.has("Argothian Elder") || (inHand.has("Argothian Elder") && hasLandAnimate);
      const hasHyrax       = inHand.has("Hyrax Tower Scout");
      const hasSymbiote    = board.has("Wirewood Symbiote") || inHand.has("Wirewood Symbiote");
      const hasWoodcaller  = board.has("Woodcaller Automaton") || inHand.has("Woodcaller Automaton");

      const hasUntapMethod =
        hasWoodcaller ||                              // 1. Woodcaller Automaton
        (hasLandAnimate && hasHyrax) ||               // 2. Destiny Spinner / Badgermole + Hyrax Tower Scout
        (hasAshaya && hasMagus) ||                    // 3. Ashaya + Magus of the Candelabra
        (hasAshaya && hasQuirion) ||                  // 4. Ashaya + Quirion Ranger
        (hasAshaya && hasScryb) ||                    // 5. Ashaya + Scryb Ranger
        (hasSymbiote && hasLandAnimate) ||            // 6. Wirewood Symbiote + Destiny Spinner / Badgermole
        (hasAshaya && hasElder);                      // 7. Ashaya + Argothian Elder

      if (!hasUntapMethod) return {
        ok: false,
        missing: "a land untap method: Woodcaller Automaton; Destiny Spinner (or Badgermole Cub + bouncer) + Hyrax Tower Scout; Ashaya + Magus/Quirion Ranger/Scryb Ranger/Argothian Elder; or Wirewood Symbiote + Destiny Spinner/Badgermole Cub",
      };
    }

    return { ok: true };
  }


  // ---- YEVA FLASH TIMING ADVICE ----
  if (!isMyTurn && board.has("Yeva, Nature's Herald")) {
    // Check for flash-in combos
    if (inHand.has("Ashaya, Soul of the Wild") && (inHand.has("Quirion Ranger") || board.has("Quirion Ranger"))
        && (board.has("Duskwatch Recruiter") || inHand.has("Duskwatch Recruiter"))) {
      results.push({
        priority: 15,
        category: "⚡ INSTANT SPEED WIN",
        headline: "FLASH IN: Ashaya + Quirion Ranger NOW",
        detail: "On opponent's end step, flash in Ashaya. Quirion Ranger (in hand or board) creates an infinite mana loop immediately. Opponents are tapped out and cannot respond.",
        steps: [
          "Wait for last opponent's end step (or when they commit to the stack).",
          "Flash Ashaya via Yeva.",
          "Quirion Ranger now loops infinitely with any dork on board → infinite mana.",
          "With infinite mana: activate Duskwatch Recruiter to pull every creature → attack for lethal."
        ],
        color: "#ff6b35",
      });
    }

    if (inHand.has("Glademuse") && board.has("Ashaya, Soul of the Wild") && (board.has("Quirion Ranger") || inHand.has("Quirion Ranger"))) {
      results.push({
        priority: 14,
        category: "⚡ INSTANT SPEED WIN",
        headline: "FLASH IN: Glademuse now → Draw entire library",
        detail: "Glademuse on opponent's turn with Ashaya + Quirion Ranger = draw your entire deck at instant speed.",
        steps: [
          "Flash Glademuse via Yeva on opponent's turn.",
          "Cast Quirion Ranger → Glademuse triggers → draw a card.",
          "Ranger bounces itself (it's a Forest via Ashaya), untaps any dork.",
          "Recast Ranger → draw again. Infinite draws = entire library in hand.",
          "Cast Infectious Bite + Eternal Witness loop for poison win, or attack for lethal."
        ],
        color: "#ff6b35",
      });
    }

    // Flash in a big dork EOT for next-turn combo
    const bigDorksInHand = hand.filter(c => CARDS[c]?.tags?.includes("big-dork"));
    if (bigDorksInHand.length > 0 && !board.has("Ashaya, Soul of the Wild")) {
      const dork = bigDorksInHand[0];
      results.push({
        priority: 8,
        category: "🌙 EOT FLASH",
        headline: `Flash in ${dork} at end of opponent's turn`,
        detail: `${dork} bypasses summoning sickness when flashed in at EOT. Untap on your turn and it's ready to tap for mana immediately — enabling an infinite mana combo next turn.`,
        steps: [
          `On last opponent's EOT, flash ${dork} via Yeva.`,
          "It untaps at the start of your turn — no summoning sickness.",
          "Next turn: pair with Temur Sabertooth + Hyrax Scout or Quirion Ranger loop for infinite mana."
        ],
        color: "#a569bd",
      });
    }
  }

  // ---- EARLY GAME RAMP ADVICE ----
  if (dorksOnBoard === 0 && creaturesOnBoard === 0 && mana <= 2) {
    const dorks1 = hand.filter(c => CARDS[c]?.tags?.includes("1drop") && CARDS[c]?.tags?.includes("dork") && CARDS[c]?.cmc <= mana);
    if (dorks1.length > 0) {
      results.push({
        priority: 7,
        category: "🌱 RAMP",
        headline: `Play ${dorks1[0]} to establish early ramp`,
        detail: "Mana dorks are the engine of this deck. Getting one down turn 1 is critical — it accelerates you towards your 5-6 mana threshold where the deck becomes explosive.",
        steps: [`Cast ${dorks1[0]}. Pass turn. Hold everything else.`],
        color: "#52be80",
      });
    }
  }

  // ---- ARBOR ELF + AURA SYNERGY ----
  if (board.has("Arbor Elf") && (inHand.has("Utopia Sprawl") || inHand.has("Wild Growth")) && (mana >= 1 || infiniteManaActive)) {
    const aura = inHand.has("Utopia Sprawl") ? "Utopia Sprawl" : "Wild Growth";
    results.push({
      priority: 9,
      category: "🌱 RAMP",
      headline: `Enchant Forest with ${aura} → Arbor Elf = 3 mana`,
      detail: `${aura} on a Forest + Arbor Elf untapping it = 3 mana from a single Forest. This is the fastest ramp pattern in the deck — equivalent to a turn-1 accelerant.`,
      steps: [
        `Cast ${aura} on a Forest (choose green).`,
        "Arbor Elf untaps that Forest: now taps for {G}{G}.",
        "Plus normal land drop = 3 mana total. This enables turn-2 three-drops."
      ],
      color: "#52be80",
    });
  }

  // ---- EARTHCRAFT + DORKS ----
  if (board.has("Earthcraft") && creaturesOnBoard >= 2) {
    results.push({
      priority: 8,
      category: "🔄 ENGINE ACTIVE",
      headline: "Earthcraft is online — chain tap/untap for explosive mana",
      detail: `With ${creaturesOnBoard} creatures, Earthcraft lets you tap each creature to untap a basic land. With Yavimaya in play, ALL lands are basic Forests — enormous mana acceleration.`,
      steps: [
        "Tap each creature via Earthcraft to untap a basic Forest.",
        `${creaturesOnBoard} creatures = ${creaturesOnBoard} untaps. Stack with Wild Growth/Utopia Sprawl for double value.`,
        "If Ashaya resolves: creatures ARE basic lands. Each taps to untap another → infinite mana."
      ],
      color: "#f39c12",
    });
  }

  // ---- SURVIVAL OF THE FITTEST ----
  if (board.has("Survival of the Fittest") && (hand.some(c => CARDS[c]?.type === "creature") || infiniteManaActive)) {
    const targets = getSurvivalTargets(hand, battlefield);
    if (targets.length > 0) {
      const discardable = hand.filter(c => CARDS[c]?.type === "creature");
      results.push({
        priority: 8,
        category: "🎯 TUTOR",
        headline: `Survival of the Fittest: discard ${discardable[0] ?? "a creature"} → find ${targets[0]}`,
        detail: "Survival of the Fittest turns every creature in hand into a tutor activation. Repeatable each turn. With infinite mana, chain activations to assemble any board state — discard the last target to find the next.",
        steps: [
          ...targets.map((t,i) => `Activation ${i+1}: pay {G}, tap Survival, discard a creature → find ${t}.`),
          "Chain activations: discard the card you just found to find the next piece.",
          discardable.length > 0 ? `Currently discardable: ${discardable.slice(0,3).join(", ")}.` : "With infinite mana, use any creature as fodder.",
        ],
        color: "#5dade2",
      });
    }
  }
  // ---- NATURAL ORDER ----
  if (inHand.has("Natural Order") && isMyTurn) {
    // Natural Order sacrifices a green creature to find any green creature.
    // Best line: sac a 3-drop to find Woodland Bellower (CMC 6), which then ETBs a CMC<=3 creature.
    const has3drop = battlefield.some(c => CARDS[c]?.cmc === 3 && CARDS[c]?.type === "creature");
    const hasSacTarget = battlefield.some(c => CARDS[c]?.type === "creature");
    const bellowerMissing = !board.has("Woodland Bellower");
    const ashayaMissing   = !board.has("Ashaya, Soul of the Wild");
    const primaryTarget   = bellowerMissing ? "Woodland Bellower"
      : ashayaMissing ? "Ashaya, Soul of the Wild"
      : "Kogla, the Titan Ape";
    const bellowerFollow  = bellowerMissing ? [
      "Woodland Bellower ETB: search for any non-legendary green CMC≤3 creature onto battlefield.",
      "Best Bellower targets: Duskwatch Recruiter (win con), Elvish Reclaimer (land tutor), Destiny Spinner (haste+protection), Eternal Witness, Quirion Ranger.",
    ] : [];
    if (hasSacTarget && (mana >= 4 || infiniteManaActive)) {
      results.push({
        priority: 8,
        category: "🎯 TUTOR",
        headline: `Natural Order → ${primaryTarget}${bellowerMissing ? " → ETB finds combo piece" : ""}`,
        detail: bellowerMissing
          ? "Classic line: sacrifice any green creature to find Woodland Bellower. Bellower's ETB then puts any non-legendary CMC≤3 green creature directly onto the battlefield — effectively a 2-for-1 tutor."
          : `Sacrifice a green creature to find ${primaryTarget} directly onto the battlefield.`,
        steps: [
          `Cast Natural Order ({2}{G}{G}): sacrifice ${has3drop ? "a 3-drop creature (most efficient)" : "any green creature"} → search for ${primaryTarget}.`,
          ...bellowerFollow,
          ...((mana >= 4 || infiniteManaActive) && !has3drop ? ["Tip: 3-drop creatures are the optimal sacrifice — they maximise the mana efficiency of the exchange."] : []),
        ],
        color: "#5dade2",
      });
    }
  }

  // ---- ELDRITCH EVOLUTION ----
  if (inHand.has("Eldritch Evolution") && isMyTurn) {
    // Sacrifice a creature, find one with CMC <= sacrificed CMC + 2.
    // Key line: sac 1-drop dork → find CMC<=3 (Eternal Witness, Hyrax Tower Scout, Heartwood Storyteller)
    // Or: sac 3-drop → find CMC<=5 (Ashaya!)
    const sacCandidates = battlefield.filter(c => CARDS[c]?.type === "creature")
      .sort((a,b) => (CARDS[a]?.cmc ?? 0) - (CARDS[b]?.cmc ?? 0));
    if (sacCandidates.length > 0 && (mana >= 3 || infiniteManaActive)) {
      const bestSac = sacCandidates[0]; // lowest CMC to sacrifice
      const maxCmc  = (CARDS[bestSac]?.cmc ?? 1) + 2;
      // Find the best missing target at or below maxCmc
      const targetPriority = [
        "Ashaya, Soul of the Wild",  // CMC 5 — sac a 3-drop
        "Eternal Witness",           // CMC 3 — sac a 1-drop
        "Heartwood Storyteller",     // CMC 3 — sac a 1-drop: strong stax/draw early
        "Hyrax Tower Scout",         // CMC 3 — sac a 1-drop
        "Duskwatch Recruiter",       // CMC 2 — sac a 0-drop (Dryad Arbor)
        "Destiny Spinner",           // CMC 2
        "Quirion Ranger",            // CMC 1 — rarely worth sacrificing for
      ].filter(t => !board.has(t) && (CARDS[t]?.cmc ?? 0) <= maxCmc);
      const target = targetPriority[0];
      if (target) {
        const sacName = bestSac;
        const sacCmc  = CARDS[bestSac]?.cmc ?? 1;
        results.push({
          priority: 8,
          category: "🎯 TUTOR",
          headline: `Eldritch Evolution: sac ${sacName} (CMC ${sacCmc}) → find ${target} (CMC ${CARDS[target]?.cmc})`,
          detail: sacCmc === 1 && target === "Heartwood Storyteller"
            ? "Powerful early line: turn 1 dork → turn 2 Heartwood Storyteller. Punishes opponents for casting non-creature spells, drawing you cards while applying stax pressure."
            : `Sacrifice ${sacName} to find ${target} — ${CARDS[target]?.cmc ?? 0} ≤ ${sacCmc} + 2. ${target} enters the battlefield directly.`,
          steps: [
            `Cast Eldritch Evolution ({1}{G}{G}): sacrifice ${sacName} → search for ${target} (CMC ${CARDS[target]?.cmc}).`,
            `${target} enters the battlefield.`,
            ...(target === "Heartwood Storyteller" ? ["Storyteller: whenever a player casts a non-creature spell, each other player draws a card. Strong draw engine + soft stax."] : []),
            ...(target === "Ashaya, Soul of the Wild" ? ["Ashaya enters — all your nontoken creatures are now Forests. Infinite mana combos are now live."] : []),
            ...(targetPriority.length > 1 ? [`Other targets at this CMC threshold: ${targetPriority.slice(1,3).join(", ")}.`] : []),
          ],
          color: "#5dade2",
        });
      }
    }
  }

  // ---- GREEN SUN'S ZENITH ----
  if (inHand.has("Green Sun's Zenith") && isMyTurn) {
    // X=0: finds Dryad Arbor (free land ramp). X=1: Allosaurus Shepherd (protection).
    // X=any: finds whatever the situation calls for.
    const gsTargets = [
      { name: "Dryad Arbor",          xCost: 0, reason: "free land onto battlefield (ramp + elf count + combo piece)" },
      { name: "Allosaurus Shepherd",   xCost: 1, reason: "elves uncounterable — protection against blue" },
      { name: "Duskwatch Recruiter",   xCost: 2, reason: "win con with infinite mana" },
      { name: "Destiny Spinner",       xCost: 2, reason: "haste + uncounterable for creatures and enchantments" },
      { name: "Fauna Shaman",          xCost: 2, reason: "repeatable creature tutor" },
      { name: "Quirion Ranger",        xCost: 1, reason: "infinite mana loop piece with Ashaya" },
      { name: "Elvish Reclaimer",      xCost: 1, reason: "land tutor for Cradle / Sanitarium / Nykthos" },
      { name: "Ashaya, Soul of the Wild", xCost: 5, reason: "combo engine — all creatures become Forests" },
      { name: "Eternal Witness",       xCost: 3, reason: "retrieve key piece from graveyard" },
    ].filter(t => !board.has(t.name) && (mana >= t.xCost + 1 || infiniteManaActive));
    if (gsTargets.length > 0) {
      const best = gsTargets[0];
      results.push({
        priority: 7,
        category: "🎯 GREEN SUN'S ZENITH",
        headline: `Green Sun's Zenith (X=${best.xCost}) → ${best.name}`,
        detail: `Green Sun's Zenith finds ${best.name} and puts it directly onto the battlefield. Shuffles itself back into library — reusable if retrieved. Cost: {${best.xCost}}{G}.`,
        steps: [
          `Cast Green Sun's Zenith with X=${best.xCost}: pay {${best.xCost}}{G}, find ${best.name} → battlefield.`,
          `${best.reason.charAt(0).toUpperCase() + best.reason.slice(1)}.`,
          ...(gsTargets.length > 1 ? [`Other options: ${gsTargets.slice(1,3).map(t => `X=${t.xCost} → ${t.name}`).join(", ")}.`] : []),
          "Zenith shuffles back into library — retrievable via Eternal Witness for repeat use.",
        ],
        color: "#5dade2",
      });
    }
  }

  // ---- NATURE'S RHYTHM ----
  // Functions as a second Green Sun's Zenith that can be cast again after use.
  if (inHand.has("Nature's Rhythm") && isMyTurn) {
    const nrTargets = [
      { name: "Dryad Arbor",          xCost: 0, reason: "free land ramp onto battlefield" },
      { name: "Allosaurus Shepherd",   xCost: 1, reason: "protection — elves become uncounterable" },
      { name: "Duskwatch Recruiter",   xCost: 2, reason: "win con with infinite mana" },
      { name: "Destiny Spinner",       xCost: 2, reason: "haste + uncounterable protection" },
      { name: "Quirion Ranger",        xCost: 1, reason: "infinite mana loop with Ashaya" },
      { name: "Elvish Reclaimer",      xCost: 1, reason: "land tutor" },
    ].filter(t => !board.has(t.name) && (mana >= t.xCost + 1 || infiniteManaActive));
    if (nrTargets.length > 0) {
      const best = nrTargets[0];
      results.push({
        priority: 7,
        category: "🎯 NATURE'S RHYTHM",
        headline: `Nature's Rhythm (X=${best.xCost}) → ${best.name}`,
        detail: "Nature's Rhythm functions as a second Green Sun's Zenith with a key upside: after resolving, you may cast it again from exile once. Use it to find a piece now and recycle it later.",
        steps: [
          `Cast Nature's Rhythm with X=${best.xCost}: find ${best.name} → put onto battlefield.`,
          `${best.reason.charAt(0).toUpperCase() + best.reason.slice(1)}.`,
          "After use: Nature's Rhythm goes to exile and can be cast again once — a built-in second activation.",
          ...(nrTargets.length > 1 ? [`Other options: ${nrTargets.slice(1,2).map(t => `X=${t.xCost} → ${t.name}`).join(", ")}.`] : []),
        ],
        color: "#5dade2",
      });
    }
  }

  // ---- SYLVAN SCRYING ----
  if (inHand.has("Sylvan Scrying") && isMyTurn && (mana >= 2 || infiniteManaActive)) {
    const scryfLands = [
      { land: "Gaea's Cradle",           reason: "taps for {G} per creature — often 4-8+ mana immediately" },
      { land: "Itlimoc, Cradle of the Sun", reason: `taps for {G} per creature (${creaturesOnBoard} now) — Gaea's Cradle as a land, if Cradle is already in play` },
      { land: "Nykthos, Shrine to Nyx",  reason: `taps for ${devotionOnBoard}G devotion mana — spend {2} to net ${Math.max(0,devotionOnBoard-2)}` },
      { land: "Geier Reach Sanitarium",  reason: "mill win con with infinite mana" },
      { land: "Wirewood Lodge",          reason: "untaps an elf — enables Argothian Elder infinite loop" },
      { land: "Deserted Temple",         reason: "untaps Cradle, Nykthos, or Sanitarium" },
      { land: "Yavimaya, Cradle of Growth", reason: "all lands become Forests — enables Elder and Arbor Elf combos" },
    ].filter(l => !board.has(l.land));
    if (scryfLands.length > 0) {
      const best = scryfLands[0];
      results.push({
        priority: 7,
        category: "🏔️ LAND TUTOR",
        headline: `Sylvan Scrying → ${best.land}`,
        detail: `Sylvan Scrying ({1}{G}): search library for any land. ${best.reason.charAt(0).toUpperCase() + best.reason.slice(1)}. Prioritise assembling Gaea's Cradle or Nykthos as early as possible — they power everything else.`,
        steps: [
          `Cast Sylvan Scrying ({1}{G}): search for ${best.land}.`,
          best.reason.charAt(0).toUpperCase() + best.reason.slice(1) + ".",
          ...(scryfLands.length > 1 ? [`Other strong targets: ${scryfLands.slice(1,3).map(l => l.land).join(", ")}.`] : []),
        ],
        color: "#5dade2",
      });
    }
  }

  // ---- SOWING MYCOSPAWN ----
  if ((inHand.has("Sowing Mycospawn") || board.has("Sowing Mycospawn")) && isMyTurn) {
    const mycospawnLands = [
      { land: "Gaea's Cradle",           reason: "taps for {G} per creature — and Mycospawn adds to the count" },
      { land: "Nykthos, Shrine to Nyx",  reason: `adds 1 green devotion and a 3/3 body — taps for ${devotionOnBoard+1}G with Mycospawn` },
      { land: "Geier Reach Sanitarium",  reason: "mill win con" },
      { land: "Wirewood Lodge",          reason: "untaps an elf — enables Argothian Elder loop" },
    ].filter(l => !board.has(l.land));
    if (mycospawnLands.length > 0) {
      const best = mycospawnLands[0];
      const castable = inHand.has("Sowing Mycospawn") && (mana >= 5 || infiniteManaActive);
      results.push({
        priority: castable ? 7 : 6,
        category: "🏔️ LAND TUTOR",
        headline: `Sowing Mycospawn → ${best.land}`,
        detail: `Sowing Mycospawn ({4}{G}): on-cast trigger fetches any land onto the battlefield. Also leaves a 3/3 body with 1 green devotion — fueling Nykthos and Gaea's Cradle simultaneously.`,
        steps: [
          castable ? `Cast Sowing Mycospawn ({4}{G}): on-cast, search for ${best.land}.` : `Sowing Mycospawn is on the battlefield — its on-cast tutor already resolved when it entered.`,
          best.reason.charAt(0).toUpperCase() + best.reason.slice(1) + ".",
          "3/3 body stays on battlefield, adding devotion and creature count.",
          ...(mycospawnLands.length > 1 ? [`Other targets: ${mycospawnLands.slice(1,2).map(l => l.land).join(", ")}.`] : []),
        ],
        color: "#5dade2",
      });
    }
  }

  // ---- SHARED SUMMONS ----
  if (inHand.has("Shared Summons") && (mana >= 5 || infiniteManaActive)) {
    // Finds any two creatures, instant speed — great end-step setup
    const sharedTargets = [
      "Duskwatch Recruiter","Ashaya, Soul of the Wild","Eternal Witness",
      "Temur Sabertooth","Quirion Ranger","Destiny Spinner","Endurance",
      "Woodland Bellower","Elvish Reclaimer",
    ].filter(c => !board.has(c) && !inHand.has(c));
    if (sharedTargets.length >= 2) {
      const t1 = sharedTargets[0], t2 = sharedTargets[1];
      results.push({
        priority: 8,
        category: "🎯 INSTANT TUTOR",
        headline: `Shared Summons (instant) → ${t1} + ${t2}`,
        detail: "Shared Summons finds any two creatures at instant speed. Perfect for end-step setup — leave mana up as a threat, then grab exactly what you need before your turn.",
        steps: [
          `Cast Shared Summons ({3}{G}{G}) at instant speed (opponent's end step).`,
          `Search for ${t1} AND ${t2} — both go to hand.`,
          "On your turn: cast both and execute your line.",
          ...(sharedTargets.length > 2 ? [`Other strong pairs: ${sharedTargets.slice(2,4).join(" + ")}.`] : []),
        ],
        color: "#5dade2",
      });
    }
  }

  // ---- REGAL FORCE DRAW ENGINE ----
  // Regal Force ETB: draw cards equal to the number of green creatures you control.
  // With infinite mana + bouncer: bounce and recast repeatedly to draw your entire deck.
  // RISK: you WILL deck yourself if you keep going. Stop when you find a cleaner outlet.
  {
    const regalOnBoard  = board.has("Regal Force");
    const regalInHand   = inHand.has("Regal Force");
    const hasBouncer    = board.has("Temur Sabertooth") || board.has("Kogla, the Titan Ape") || inHand.has("Temur Sabertooth") || inHand.has("Kogla, the Titan Ape");
    const bouncer       = board.has("Temur Sabertooth") ? "Temur Sabertooth" : "Kogla, the Titan Ape";
    const regalCastable = regalInHand && (infiniteManaActive || (mana >= 7 || infiniteManaActive)) && isMyTurn;
    const regalActive   = (regalOnBoard || regalCastable) && hasBouncer && infiniteManaActive;

    if (regalActive) {
      // Stop conditions — what to look for while drawing
      const stopConditions = [
        "Duskwatch Recruiter (activate for win pile — cleaner and safe)",
        "Infectious Bite + Eternal Witness (poison loop — no deck-out risk)",
        "Worldly Tutor / Chord of Calling / Summoner's Pact (find Duskwatch directly)",
        "Fauna Shaman / Formidable Speaker (find Duskwatch or Eternal Witness)",
      ].filter(s => {
        // Only list conditions for pieces not already accessible
        if (s.includes("Duskwatch") && (board.has("Duskwatch Recruiter") || inHand.has("Duskwatch Recruiter"))) return false;
        if (s.includes("Infectious Bite") && !inHand.has("Infectious Bite") && !inGrave.has("Infectious Bite")) return false;
        return true;
      });

      results.push({
        priority: 12,
        category: "📚 DRAW ENGINE — STOP WHEN SAFE",
        headline: `Regal Force bounce loop: draw ${creaturesOnBoard} cards per cast — stop at a cleaner outlet`,
        detail: `⚠️ WARNING: Regal Force loops draw your entire deck if unchecked. With ${creaturesOnBoard} green creatures, each cast draws ${creaturesOnBoard} cards. Draw in controlled bursts — stop the moment you find a cleaner win outlet that doesn't risk decking yourself.`,
        steps: [
          regalInHand
            ? `Cast Regal Force ({5}{G}{G}): ETB draws ${creaturesOnBoard} cards (one per green creature).`
            : `Regal Force is on the battlefield. Bounce it with ${bouncer} to retrigger its ETB.`,
          `Pay {1}{G}: ${bouncer} bounces Regal Force to hand. Recast it ({5}{G}{G}): draw ${creaturesOnBoard} more cards.`,
          "⛔ STOP DRAWING when you find any of these safer outlets:",
          ...stopConditions.map(s => `  • ${s}`),
          "If you have found none of these after 30+ cards, switch to Geier Reach Sanitarium mill (opponents lose first) — but only with Endurance on board.",
          `⚠️ Do NOT draw past ~20 cards without a stop condition in hand. Library has ${Math.max(0, 99 - creaturesOnBoard * 3)} estimated cards remaining.`,
        ],
        color: "#e67e22",
      });
    }
  }

  // ---- WAR ROOM DRAW ENGINE ----
  // War Room: {3}, {T}, Pay X life: Draw X cards.
  // With a land-untapper (Argothian Elder, Magus of the Candelabra, Woodcaller Automaton),
  // you can activate repeatedly. RISK: pays life — you can kill yourself.
  // Stop when you find a better outlet. Argothian Elder is the cleanest (untaps 2 lands).
  {
    const warRoomOnBoard = board.has("War Room");
    const hasElder       = board.has("Argothian Elder");
    const hasMagus       = board.has("Magus of the Candelabra");
    const hasWoodcaller  = board.has("Woodcaller Automaton");
    const untapper       = hasElder ? "Argothian Elder"
                         : hasMagus ? "Magus of the Candelabra"
                         : hasWoodcaller ? "Woodcaller Automaton" : null;

    if (warRoomOnBoard && untapper && infiniteManaActive) {
      const untapNote = {
        "Argothian Elder":        "tap Elder to untap War Room + another land — no mana cost beyond the activation",
        "Magus of the Candelabra": "pay {2}: Magus untaps itself and War Room (Ashaya makes both lands)",
        "Woodcaller Automaton":   "recast Woodcaller (bounce with Sabertooth): ETB untaps War Room",
      }[untapper];

      // Stop conditions
      const stopConditions = [
        ...(!board.has("Duskwatch Recruiter") && !inHand.has("Duskwatch Recruiter")
          ? ["Duskwatch Recruiter — switch to win pile loop (no life cost)"] : []),
        ...(!inHand.has("Infectious Bite") && !inGrave.has("Infectious Bite")
          ? ["Infectious Bite — switch to poison loop (no life cost)"] : []),
        "Any creature tutor — find Duskwatch and stop drawing",
        "Eternal Witness + Infectious Bite in graveyard — poison loop requires no more drawing",
      ];

      results.push({
        priority: 11,
        category: "📚 DRAW ENGINE — WATCH YOUR LIFE TOTAL",
        headline: `War Room + ${untapper}: draw until you find a safer win outlet`,
        detail: `⚠️ WARNING: War Room costs X life per activation. With ${untapper} untapping it, you can draw your whole deck — but your life total is the clock. Draw in small bursts and stop the moment you find a cleaner outlet.`,
        steps: [
          `Pay {3}, tap War Room, pay X life: draw X cards.`,
          `${untapNote}.`,
          `Repeat to draw more — but track your life total carefully.`,
          "⛔ STOP when you find any of these (switch to a no-life-cost outlet):",
          ...stopConditions.map(s => `  • ${s}`),
          "Recommended draw increment: 3-5 cards at a time, check hand before continuing.",
          "⚠️ Do NOT draw below 5 life without a guaranteed win in hand. Opponents can still kill you with damage on the stack.",
        ],
        color: "#e67e22",
      });
    }
  }

  // ---- FIERCE EMPATH ----
  if ((inHand.has("Fierce Empath") || board.has("Fierce Empath")) && isMyTurn) {
    const empathTargets = [
      { name: "Woodland Bellower",    cmc: 6, reason: "ETB finds any CMC≤3 creature onto battlefield — 2-for-1 tutor" },
      { name: "Kogla, the Titan Ape", cmc: 6, reason: "destroys a non-land permanent on ETB, bounces Humans" },
      { name: "Regal Force",          cmc: 7, reason: "draw cards equal to creatures on board — often draws 6-10" },
      { name: "Woodcaller Automaton", cmc: 8, reason: "untaps Cradle/Nykthos with haste — infinite mana with Sabertooth" },
      { name: "Disciple of Freyalise",cmc: 6, reason: "draw 2+ cards and gain life on ETB, sac engine" },
    ].filter(t => !board.has(t.name));
    if (empathTargets.length > 0) {
      const castable = inHand.has("Fierce Empath") && (mana >= 3 || infiniteManaActive);
      const etbReady = board.has("Fierce Empath");
      if (castable || etbReady) {
        const best = empathTargets[0];
        results.push({
          priority: 7,
          category: "🎯 TUTOR",
          headline: `Fierce Empath${etbReady ? " ETB" : ""} → ${best.name}`,
          detail: `Fierce Empath's ETB searches for any creature with CMC ≥ 6. ${best.reason.charAt(0).toUpperCase() + best.reason.slice(1)}.`,
          steps: [
            etbReady
              ? `Fierce Empath ETB resolves: search for ${best.name} → hand.`
              : `Cast Fierce Empath ({2}{G}): ETB triggers → search for ${best.name} → hand.`,
            best.reason.charAt(0).toUpperCase() + best.reason.slice(1) + ".",
            ...(empathTargets.length > 1 ? [`Other CMC≥6 targets: ${empathTargets.slice(1,3).map(t => t.name).join(", ")}.`] : []),
          ],
          color: "#5dade2",
        });
      }
    }
  }

  // ---- ELVISH HARBINGER ----
  if ((inHand.has("Elvish Harbinger") || board.has("Elvish Harbinger")) && isMyTurn) {
    const harbingerTargets = [
      { name: "Elvish Archdruid",       reason: "big dork — taps for elves on board; also pumps all elves" },
      { name: "Priest of Titania",      reason: "big dork — taps for elves on board" },
      { name: "Circle of Dreams Druid", reason: "taps for creatures on board — Gaea's Cradle on a body" },
      { name: "Allosaurus Shepherd",    reason: "protection — elves and green spells can't be countered" },
      { name: "Fauna Shaman",           reason: "repeatable tutor — finds any creature including non-elves" },
      { name: "Formidable Speaker",     reason: "tutor engine — find any creature on your end step with a bouncer" },
      { name: "Quirion Ranger",         reason: "infinite mana loop with Ashaya" },
      { name: "Wirewood Symbiote",      reason: "untap engine — bounces elf to untap any creature" },
      { name: "Elvish Reclaimer",       reason: "land tutor for Cradle, Sanitarium, Nykthos" },
      { name: "Chomping Changeling",    reason: "elf body that counts for all elf synergies" },
    ].filter(t => !board.has(t.name));
    if (harbingerTargets.length > 0) {
      const castable = inHand.has("Elvish Harbinger") && (mana >= 3 || infiniteManaActive);
      const etbReady = board.has("Elvish Harbinger");
      if (castable || etbReady) {
        const best = harbingerTargets[0];
        results.push({
          priority: 7,
          category: "🎯 TUTOR",
          headline: `Elvish Harbinger${etbReady ? " ETB" : ""} → ${best.name}`,
          detail: `Elvish Harbinger finds any elf. ${best.reason.charAt(0).toUpperCase() + best.reason.slice(1)}. Harbinger also adds a mana dork body ({T}: add {G}) and an elf to the count.`,
          steps: [
            etbReady
              ? `Elvish Harbinger ETB: search for ${best.name} → top of library. Draw it next turn.`
              : `Cast Elvish Harbinger ({2}{G}): ETB puts ${best.name} on top of library.`,
            best.reason.charAt(0).toUpperCase() + best.reason.slice(1) + ".",
            "Note: Harbinger puts the card on TOP of library, not into hand — draw it on your next draw step.",
            ...(harbingerTargets.length > 1 ? [`Other strong elf targets: ${harbingerTargets.slice(1,3).map(t => t.name).join(", ")}.`] : []),
          ],
          color: "#5dade2",
        });
      }
    }
  }

  // ---- FORMIDABLE SPEAKER (general utility) ----
  // Speaker's untap clause = second mode: untap Cradle, Nykthos, a dork, or War Room
  if (board.has("Formidable Speaker") && speakerHasBouncer) {
    const untapTargets = [
      ...(board.has("Gaea's Cradle")          ? ["Gaea's Cradle (double tap for creature mana)"] : []),
      ...(board.has("Nykthos, Shrine to Nyx") ? [`Nykthos (double tap for ${devotionOnBoard}G devotion mana)`] : []),
      ...(board.has("War Room")               ? ["War Room (draw a card mid-combo)"] : []),
    ];
    // Only show this if not already showing a win con via Speaker
    const alreadyWin = results.some(r => r.headline?.includes("Formidable Speaker") && r.priority >= 12);
    if (!alreadyWin && untapTargets.length > 0) {
      const bouncer = board.has("Temur Sabertooth") ? "Temur Sabertooth" : "Kogla, the Titan Ape";
      results.push({
        priority: 7,
        category: "🔄 ENGINE",
        headline: `Formidable Speaker + ${bouncer}: untap ${untapTargets[0].split(" ")[0]}`,
        detail: "Formidable Speaker's ETB also untaps a land or creature you control. With a bouncer, bounce and recast Speaker to repeatedly untap Gaea's Cradle, Nykthos, or a big dork for explosive mana generation.",
        steps: [
          `Pay {1}{G}: ${bouncer} bounces Formidable Speaker to hand.`,
          `Recast Speaker ({1}{G}): ETB untaps ${untapTargets[0]}.`,
          ...(untapTargets.length > 1 ? [`Can also target: ${untapTargets.slice(1).join(", ")}.`] : []),
          "Repeat to generate mana or draw cards.",
        ],
        color: "#8e44ad",
      });
    }
  }


  // ---- TALON GATES OF MADARA ----
  // {T}: Phase out target creature you control or an opponent controls until your next turn.
  // No mana cost — just a tap. Phased-out creatures are effectively removed from the game
  // until your next untap step (they don't untap, can't be targeted, don't count for anything).
  // Synergy: with Yavimaya making all lands Forests, Talon Gates is a Forest —
  // Quirion/Scryb Ranger can bounce it back to hand to untap a creature, then recast it.
  // With a dork producing ≥4, this enables one free phase activation per Ranger loop.
  if (board.has("Talon Gates of Madara")) {
    const hasYavimaya   = board.has("Yavimaya, Cradle of Growth");
    const hasRanger     = board.has("Quirion Ranger") || board.has("Scryb Ranger");
    const rangerName    = board.has("Quirion Ranger") ? "Quirion Ranger" : "Scryb Ranger";
    const hasDork4plus  = battlefield.some(c => {
      const out = estimateDorkOutput(c);
      return out >= 4;
    });
    const loopActive    = hasYavimaya && hasRanger && hasDork4plus;

    // Best phase-out targets: protect own combo piece or remove opponent threat
    const ownKeyPieces = ["Ashaya, Soul of the Wild","Temur Sabertooth","Quirion Ranger",
      "Argothian Elder","Priest of Titania","Circle of Dreams Druid"].filter(c => board.has(c));

    results.push({
      priority: loopActive ? 7 : 5,
      category: loopActive ? "🔄 PHASE LOOP" : "🛡️ PHASING",
      headline: loopActive
        ? `Talon Gates: phase once/loop via Yavimaya + ${rangerName} + big dork`
        : "Talon Gates of Madara: phase out a creature (protection or removal)",
      detail: loopActive
        ? `Yavimaya makes Talon Gates a Forest. ${rangerName} can bounce it (returning a Forest) to untap a creature, then you recast the land. Each Ranger loop untaps Talon Gates, enabling one phase activation per cycle.`
        : "Tap Talon Gates to phase out any creature — yours for protection from removal/combat, or an opponent's as pseudo-removal until your next turn. Phased-out permanents don't untap, can't be targeted, and don't count for anything.",
      steps: [
        ...(loopActive ? [
          `Yavimaya makes Talon Gates of Madara a Forest — ${rangerName} can return it to hand.`,
          `Tap Talon Gates: phase out a target creature.`,
          `${rangerName}: return Talon Gates (a Forest) to hand, untapping a creature.`,
          "Recast Talon Gates (it enters tapped — use the untap from next Ranger loop).",
          "Net: one phase activation per Ranger bounce cycle.",
        ] : [
          "Tap Talon Gates of Madara: choose a target creature.",
          "Phase out your own creature: protects it from targeted removal, board wipes, or combat until your next turn.",
          "Phase out opponent's creature: removes their blocker or threat until your next untap step.",
          ...(ownKeyPieces.length > 0 ? [`Best pieces to protect: ${ownKeyPieces.slice(0,3).join(", ")}.`] : []),
          "Note: phased-out permanents don't count for devotion, creature count, or triggers while phased out.",
        ]),
      ],
      color: "#8e44ad",
    });
  }

  // ---- SHIFTING WOODLAND ----
  // {T}: Add {G}.
  // {2}{G}{G}, {T}: Until end of turn, Shifting Woodland becomes a copy of target permanent
  // card in your graveyard (it's still a land).
  // Key use: copy a lost combo piece from graveyard — acts as a fifth copy of Ashaya,
  // Quirion Ranger, Argothian Elder, etc. when opponents remove them.
  if (board.has("Shifting Woodland") && (mana >= 4 || infiniteManaActive)) {
    // Find the most valuable permanent card in the graveyard to copy
    const gravePriority = [
      "Ashaya, Soul of the Wild",     // combo engine — all creatures become Forests
      "Quirion Ranger",               // infinite mana loop piece
      "Temur Sabertooth",             // bounce engine
      "Argothian Elder",              // 2-card infinite with Ashaya
      "Priest of Titania",            // big mana dork
      "Circle of Dreams Druid",       // big mana dork
      "Eternal Witness",              // graveyard recursion
      "Duskwatch Recruiter",          // win con
      "Destiny Spinner",              // haste + protection
      "Elvish Reclaimer",             // land tutor
      "Karametra's Acolyte",          // big mana dork
    ].filter(c => inGrave.has(c));

    if (gravePriority.length > 0) {
      const target = gravePriority[0];
      const targetType = CARDS[target]?.type ?? "permanent";
      // If it's a creature, copying it gives us a creature-land with haste considerations
      const isCreature = targetType === "creature";
      results.push({
        priority: 8,
        category: "🔄 GRAVEYARD COPY",
        headline: `Shifting Woodland copies ${target} from graveyard`,
        detail: `Spend {2}{G}{G} and tap Shifting Woodland: it becomes a copy of ${target} until end of turn (it's still a land). Use this to replace a key piece that was removed or countered.`,
        steps: [
          `Pay {2}{G}{G}, tap Shifting Woodland: becomes a copy of ${target} until end of turn.`,
          isCreature
            ? `Shifting Woodland is now both a land AND a ${target}. Its creature abilities are active — tap for mana, activate abilities, trigger ETBs on re-cast if bounced.`
            : `Shifting Woodland gains all ${target}'s abilities for this turn.`,
          ...(target === "Ashaya, Soul of the Wild"
            ? ["As Ashaya, all your nontoken creatures are now Forests — infinite mana loops are live this turn."]
            : []),
          ...(target === "Quirion Ranger"
            ? ["As Quirion Ranger, activate: return a Forest to hand to untap a creature. Works with Ashaya loops."]
            : []),
          ...(target === "Argothian Elder"
            ? ["As Argothian Elder, tap to untap two lands — 2-card infinite with Ashaya still live."]
            : []),
          ...(target === "Eternal Witness"
            ? ["As Eternal Witness, ETB triggers when it enters — but as a land-copy it doesn't 'enter' again this turn. Use for activated abilities if any."]
            : []),
          gravePriority.length > 1
            ? `Other graveyard options: ${gravePriority.slice(1, 3).join(", ")}.`
            : "This is the only high-value target in the graveyard.",
          "Note: Shifting Woodland remains a land throughout — it doesn't lose summoning sickness if it gained a tap ability it already had.",
        ],
        color: "#8e44ad",
      });
    } else if (inGrave.size > 0) {
      // Graveyard has things but nothing high-priority
      results.push({
        priority: 3,
        category: "🔄 SHIFTING WOODLAND",
        headline: "Shifting Woodland: no high-priority graveyard targets yet",
        detail: "Shifting Woodland can copy any permanent card in your graveyard. Currently no key combo pieces are there — hold the activation until a valuable piece hits the yard.",
        steps: ["Hold {2}{G}{G} mana open. Activate once Ashaya, Quirion Ranger, or another key piece enters the graveyard."],
        color: "#8e44ad",
      });
    }
  }

  // ---- GROWING RITES OF ITLIMOC ----
  // Growing Rites: ETB looks at top 4 cards, you may reveal a creature and put it in hand.
  // At end of turn, if you control 4+ creatures it transforms into Itlimoc, Cradle of the Sun.
  // Itlimoc taps for {G} per creature — Gaea's Cradle on a land.
  {
    const ritesCast     = inHand.has("Growing Rites of Itlimoc") && (mana >= 4 || infiniteManaActive) && isMyTurn;
    const ritesOnBoard  = board.has("Growing Rites of Itlimoc");
    const itlimocOnBoard= board.has("Itlimoc, Cradle of the Sun");
    const transformReady= creaturesOnBoard >= 4;
    const itlimocValue  = creaturesOnBoard; // taps for {G} per creature like Cradle

    if (ritesCast && !ritesOnBoard && !itlimocOnBoard) {
      results.push({
        priority: transformReady ? 8 : 6,
        category: transformReady ? "🌿 CAST → TRANSFORM THIS TURN" : "🌿 CAST FOR CREATURE + RAMP",
        headline: transformReady
          ? `Cast Growing Rites of Itlimoc → transforms into Itlimoc (taps for ${itlimocValue}G)`
          : `Cast Growing Rites of Itlimoc → dig for creature (need ${4 - creaturesOnBoard} more to transform)`,
        detail: transformReady
          ? `You control ${creaturesOnBoard} creatures — Growing Rites transforms into Itlimoc, Cradle of the Sun at end of turn. Itlimoc taps for {G} per creature, just like Gaea's Cradle.`
          : `Growing Rites ETB looks at top 4 cards — you may reveal a creature and put it in hand. With ${creaturesOnBoard} creatures in play, you need ${4 - creaturesOnBoard} more to transform at end of turn.`,
        steps: [
          "Cast Growing Rites of Itlimoc ({3}{G}).",
          "ETB: look at the top 4 cards of your library. You may reveal a creature card among them and put it into your hand. Put the rest on the bottom in any order.",
          transformReady
            ? `At end of turn: you control ${creaturesOnBoard} creatures (≥4) → Growing Rites transforms into Itlimoc, Cradle of the Sun.`
            : `Need ${4 - creaturesOnBoard} more creature(s) by end of turn to transform. Cast any creature you found with the ETB to help reach the threshold.`,
          transformReady
            ? `Next turn: tap Itlimoc for ${itlimocValue}G — identical to Gaea's Cradle. Powers all infinite mana loops.`
            : "Once transformed, Itlimoc works in all the same combos as Gaea's Cradle: Argothian Elder loop, Ashaya Ranger loops, Woodcaller Automaton loop.",
        ],
        color: "#27ae60",
      });
    }

    if (ritesOnBoard && !transformReady) {
      results.push({
        priority: 5,
        category: "⏳ TRANSFORM PENDING",
        headline: `Growing Rites: ${creaturesOnBoard}/4 creatures — needs ${4 - creaturesOnBoard} more to transform`,
        detail: `Growing Rites of Itlimoc checks at end of each turn: if you control 4+ creatures, it transforms into Itlimoc, Cradle of the Sun. You have ${creaturesOnBoard} creatures — play ${4 - creaturesOnBoard} more before end of turn.`,
        steps: [
          `Current creatures: ${creaturesOnBoard}. Need 4 to flip.`,
          "Cast any creatures you can afford this turn to hit the threshold.",
          `Once transformed, Itlimoc taps for ${creaturesOnBoard + (4 - creaturesOnBoard)}+ green mana — identical to Gaea's Cradle.`,
        ],
        color: "#f39c12",
      });
    }

    if (itlimocOnBoard) {
      const itlimocTaps = creaturesOnBoard;
      if (itlimocTaps >= 3) {
        results.push({
          priority: 7,
          category: "🌿 ITLIMOC ACTIVE",
          headline: `Tap Itlimoc for ${itlimocTaps}G (${creaturesOnBoard} creatures)`,
          detail: `Itlimoc, Cradle of the Sun is in play and tapping for ${itlimocTaps} green mana. Functions identically to Gaea's Cradle — powers all infinite mana loops.`,
          steps: [
            `Tap Itlimoc, Cradle of the Sun for ${itlimocTaps}G.`,
            "Use as you would Gaea's Cradle: fuel Argothian Elder loop, Woodcaller Automaton loop, or Ashaya Ranger loops.",
            ...(itlimocTaps >= 5 ? ["With 5+ mana from Itlimoc you can likely assemble infinite mana this turn."] : []),
          ],
          color: "#27ae60",
        });
      }
    }
  }

  // ---- ARBOR ELF ADVICE ----
  if (board.has("Arbor Elf")) {
    const hasAura    = board.has("Utopia Sprawl") || board.has("Wild Growth");
    const hasYavimaya = board.has("Yavimaya, Cradle of Growth");
    const hasBigLand  = board.has("Gaea's Cradle") || board.has("Nykthos, Shrine to Nyx");
    if (hasAura || (hasYavimaya && hasBigLand)) {
      const target = hasYavimaya && board.has("Gaea's Cradle") ? "Gaea's Cradle"
        : hasYavimaya && board.has("Nykthos, Shrine to Nyx") ? "Nykthos, Shrine to Nyx"
        : board.has("Utopia Sprawl") ? "Utopia Sprawl-enchanted Forest"
        : "Wild Growth-enchanted Forest";
      results.push({
        priority: 7,
        category: "🌿 MANA BOOST",
        headline: `Arbor Elf: untap ${target} for double mana`,
        detail: hasYavimaya
          ? "Yavimaya makes all lands Forests. Arbor Elf can untap Gaea's Cradle or Nykthos — effectively doubling their output each turn."
          : "Arbor Elf untaps an enchanted Forest (Utopia Sprawl / Wild Growth), producing 2+ mana per activation. With Ashaya + Quirion Ranger this loop is infinite.",
        steps: [
          `Tap ${target} for mana.`,
          `Activate Arbor Elf: untap ${target}.`,
          `Tap ${target} again for another activation.`,
          ...(board.has("Ashaya, Soul of the Wild") && (board.has("Quirion Ranger") || board.has("Scryb Ranger"))
            ? ["Ashaya + Quirion/Scryb Ranger + Arbor Elf loop = INFINITE MANA."]
            : ["Add Ashaya + Quirion Ranger to convert this into an infinite mana loop."]),
        ],
        color: "#27ae60",
      });
    }
  }

  // ---- SEEDBORN MUSE ADVICE ----
  if (board.has("Seedborn Muse")) {
    results.push({
      priority: 6,
      category: "🌙 ENGINE ACTIVE",
      headline: "Seedborn Muse: untap everything on each opponent's turn",
      detail: "With Seedborn Muse active, every mana dork and utility land untaps on each opponent's untap step. You have full mana every turn. Use this to activate Yisan multiple times per round, or hold up interaction on every turn.",
      steps: [
        "Keep all mana sources untapped — Seedborn will refill them.",
        "Activate Yisan the Wanderer Bard on each opponent's turn for rapid verse progression.",
        "Use War Room or Geier Reach Sanitarium on each opponent's turn freely.",
        "Flash in creatures on each end step — the mana is essentially free."
      ],
      color: "#8e44ad",
    });
  }

  // ---- STAX ADVICE ----
  if (inHand.has("Collector Ouphe") && (mana >= 2 || infiniteManaActive)) {
    results.push({
      priority: 5,
      category: "🔒 STAX",
      headline: "Flash in Collector Ouphe to shut down artifact decks",
      detail: "Collector Ouphe prevents all artifact activated abilities. Devastating against Dockside Extortionist, Isochron Scepter, mana rocks. Flash it in response to a Dockside trigger or when opponents go to activate fast mana.",
      steps: [
        "Identify artifact-heavy opponents.",
        "Flash Ouphe via Yeva at instant speed — ideally in response to an artifact activation.",
        "NOTE: Make sure Collector Ouphe doesn't interfere with your own Sol Ring/Chrome Mox if you need them."
      ],
      color: "#e74c3c",
    });
  }

  // ---- PROTECTION PIECES ----
  if (inHand.has("Allosaurus Shepherd") || inHand.has("Destiny Spinner")) {
    const protector = inHand.has("Allosaurus Shepherd") ? "Allosaurus Shepherd" : "Destiny Spinner";
    results.push({
      priority: 6,
      category: "🛡️ PROTECTION",
      headline: `Hold ${protector} — deploy when executing your combo`,
      detail: `${protector} makes your green spells/creatures uncounterable. Save it for the turn you go for the win to protect your key pieces from counterspells.`,
      steps: [
        `Do NOT play ${protector} early — save it as a trump card.`,
        "When you're ready to execute your combo, cast it first.",
        "Now your Ashaya, Temur Sabertooth, and other key pieces resolve safely."
      ],
      color: "#1abc9c",
    });
  }

  // Delighted Halfling: legendary creatures can't be countered and cost {1} less
  if (board.has("Delighted Halfling")) {
    const legendsInHand = hand.filter(c =>
      ["Ashaya, Soul of the Wild","Yeva, Nature's Herald","Yisan, the Wanderer Bard",
       "Kogla, the Titan Ape","Eladamri, Korvecdal"].includes(c)
    );
    if (legendsInHand.length > 0) {
      results.push({
        priority: 7,
        category: "🛡️ PROTECTION ACTIVE",
        headline: `Delighted Halfling: ${legendsInHand[0]} is uncounterable and costs {1} less`,
        detail: "Delighted Halfling makes legendary spells uncounterable and cost {1} less when you tap it. Key legends in hand are now safe to cast through blue interaction.",
        steps: [
          `Tap Delighted Halfling when casting ${legendsInHand[0]}: it costs {1} less and cannot be countered.`,
          legendsInHand.length > 1 ? `Other protected legends in hand: ${legendsInHand.slice(1).join(", ")}.` : "",
          "Best used proactively when you expect countermagic, or reactively if a counter is held up.",
        ].filter(Boolean),
        color: "#1abc9c",
      });
    }
  }

  // Elvish Spirit Guide: fast mana available
  if (inHand.has("Elvish Spirit Guide") && mana <= 2) {
    results.push({
      priority: 5,
      category: "⚡ FAST MANA",
      headline: "Exile Elvish Spirit Guide for {G} at instant speed",
      detail: "Elvish Spirit Guide can be exiled from hand to add {G} immediately — no timing restrictions. Use it to hit a mana threshold, cast a flash creature at instant speed, or power out a key play a turn early.",
      steps: [
        "Exile Elvish Spirit Guide from hand: add {G} to your mana pool.",
        "Can be used at instant speed — on opponent's end step, in response to interaction, or during combat.",
        "Also castable as a 2/2 Elf creature if you need the body for elf synergies or as fodder for Survival of the Fittest / Fauna Shaman.",
      ],
      color: "#f39c12",
    });
  }

  // ---- CROP ROTATION FOR KEY LAND ----

  if (inHand.has("Crop Rotation")) {
    const keyLands = ["Gaea's Cradle","Itlimoc, Cradle of the Sun","Nykthos, Shrine to Nyx","Geier Reach Sanitarium","Wirewood Lodge","Deserted Temple"];
    const missingKeyLands = keyLands.filter(l => !board.has(l));

    // Check if Sanitarium is the only thing standing between us and a win-mill line
    // Sanitarium is the only thing needed to execute the mill win:
    // infinite mana active + Endurance available. The untap method is implicit
    // in whichever infinite-mana combo is already running.
    const sanitariumWinsNow = (
      !board.has("Geier Reach Sanitarium") &&
      infiniteManaActive &&
      (board.has("Endurance") || inHand.has("Endurance"))
    );

    if (sanitariumWinsNow && (mana >= 1 || infiniteManaActive)) {
      results.push({
        priority: 14,
        category: "🔥 WIN NOW — FETCH SANITARIUM",
        headline: "Crop Rotation → Geier Reach Sanitarium — WIN THIS TURN",
        detail: "Infinite mana is established, Endurance is ready, and an untap method is in place. Sanitarium is the only missing piece. Crop Rotation fetches it at instant speed — execute the mill win immediately.",
        steps: [
          "Sacrifice a tapped land. Search for Geier Reach Sanitarium and put it onto the battlefield.",
          "Sanitarium enters tapped — untap it with your chosen method.",
          "Begin the Sanitarium mill loop: activate repeatedly, resetting your graveyard with Endurance ETB each cycle.",
          "Opponents draw from an empty library — state-based loss.",
        ],
        color: "#ff6b35",
      });
    } else if (missingKeyLands.length > 0 && (mana >= 1 || infiniteManaActive)) {
      results.push({
        priority: 7,
        category: "🏔️ LAND TUTOR",
        headline: `Crop Rotation → ${missingKeyLands[0]}`,
        detail: `Crop Rotation is instant speed — use it at the perfect moment. ${missingKeyLands[0]} is your highest-priority missing land.`,
        steps: [
          `Sacrifice a tapped land. Search for ${missingKeyLands[0]}.`,
          missingKeyLands[0] === "Gaea's Cradle" ? "Cradle immediately taps for mana equal to your creatures — often 4-6+ mana in one shot." :
          missingKeyLands[0] === "Nykthos, Shrine to Nyx" ? "Nykthos: spend {2}, tap for green mana equal to your green devotion. Often produces 8-12+ mana." :
          missingKeyLands[0] === "Geier Reach Sanitarium" ? "Sanitarium is your mill win condition — fetch it when infinite mana and Endurance are ready." :
          "This land is key to your next combo line."
        ],
        color: "#5dade2",
      });
    }
  }


  // ---- CHECK ACTIVE COMBOS ----
  for (const combo of COMBOS) {
    // mustPreExist: cards with summoning sickness that must tap to function
    //   Argothian Elder, Magus of the Candelabra, Arbor Elf, Fanatic of Rhonas, Yisan
    //   (Lands like Sanitarium and Wirewood Lodge do NOT enter tapped — no mustPreExist needed)
    const mustPreExist   = combo.mustPreExist ?? [];
    // onBattlefield: cards that must be in play to execute, but can be cast this turn
    const onBattlefield  = combo.onBattlefield ?? combo.requires;
    // requires: all needed cards — those not in onBattlefield are spells cast during the combo
    const canBeAnywhere  = combo.requires;

    // Tier 1: mustPreExist — summoning-sick tappers must already be on board.
    //   Exception: if a haste enabler is available (Ashaya + Destiny Spinner/Badgermole),
    //   these cards can be cast this turn and tap immediately.
    const missingPreExist   = mustPreExist.filter(r => {
      if (board.has(r)) return false;                              // already there
      if (inHand.has(r) && hasHasteEnabler && canCastNow) return false; // haste available
      return true;
    });
    // Tier 2: onBattlefield (non-mustPreExist) — can be in hand and cast/played this turn
    const castableOnBoard   = onBattlefield.filter(r => !mustPreExist.includes(r));
    const missingCastable   = castableOnBoard.filter(r => {
      if (board.has(r)) return false;
      if (!inHand.has(r)) return true;                            // not accessible at all
      if (CARDS[r]?.type === "land") return !isMyTurn;           // lands: only on our turn
      return !canCastNow;                                         // spells/creatures: canCastNow
    });
    // Tier 3: requires-only (spells cast during combo) — anywhere in hand or board
    const requiresOnly      = canBeAnywhere.filter(r => !onBattlefield.includes(r));
    const missingAnywhere   = requiresOnly.filter(r => !board.has(r) && !inHand.has(r));

    const missing = [...new Set([...missingPreExist, ...missingCastable, ...missingAnywhere])];

    const extras = comboExtrasSatisfied(combo);

    if (missing.length === 0 && extras.ok) {
      // Type metadata: label, headline prefix, priority boost, color
      const typeMeta = {
        "infinite-mana": { ready: "⚙️ INFINITE MANA ONLINE", cast: "⚡ CAST TO ENABLE MANA LOOP",  readyPrefix: "LOOP READY:",  boost: 2, color: "#58d68d" },
        "win-mill":      { ready: hasLandAnimate ? "🔥 WIN NOW — MILL" : "⚡ ASSEMBLE MILL WIN", cast: "⚡ ASSEMBLE MILL WIN", readyPrefix: hasLandAnimate ? "EXECUTE:" : "SETUP:", boost: hasLandAnimate ? 5 : 2, color: hasLandAnimate ? "#ff6b35" : "#e67e22" },
        "win-poison":    { ready: "🔥 WIN NOW — POISON",      cast: "⚡ ASSEMBLE POISON WIN",        readyPrefix: "EXECUTE:",     boost: 5, color: "#27ae60" },
        "win-draw":      { ready: "📚 DRAW YOUR LIBRARY",     cast: "⚡ ASSEMBLE DRAW LOOP",         readyPrefix: "EXECUTE:",     boost: 4, color: "#5dade2" },
        "win-combat":    { ready: "🔥 WIN NOW — COMBAT",      cast: "⚡ ASSEMBLE COMBAT WIN",        readyPrefix: "EXECUTE:",     boost: 5, color: "#e74c3c" },
        "engine":        { ready: "🔄 ENGINE READY",          cast: "⚡ ACTIVATE ENGINE",            readyPrefix: "ACTIVATE:",    boost: 1, color: "#a569bd" },
      }[combo.type] || { ready: "🔄 COMBO ASSEMBLED",  cast: "⚡ ASSEMBLE COMBO", readyPrefix: "EXECUTE:", boost: 3, color: "#58d68d" };

      // needToCast = castable-on-board cards in hand + requires-only spell cards in hand
      const needToCast = [
        ...castableOnBoard.filter(r => inHand.has(r) && !board.has(r)), // permanents to cast
        ...requiresOnly.filter(r => inHand.has(r)),                     // spells cast during combo
      ];
      if (needToCast.length === 0) {
        results.push({
          priority: combo.priority + typeMeta.boost,
          category: typeMeta.ready,
          headline: `${typeMeta.readyPrefix} ${combo.name}`,
          detail: combo.description,
          steps: combo.lines,
          combo: combo.id,
          color: typeMeta.color,
        });
      } else {
        const totalCost = needToCast.reduce((acc, c) => acc + (CARDS[c]?.cmc || 0), 0);
        if ((mana >= totalCost || infiniteManaActive) || !isMyTurn) {
          results.push({
            priority: combo.priority + typeMeta.boost - 2,
            category: typeMeta.cast,
            headline: `Cast ${needToCast.join(" + ")} → ${combo.name}`,
            detail: `You have all named pieces! Cast ${needToCast.join(", ")} to complete ${combo.name}.`,
            steps: combo.lines,
            combo: combo.id,
            color: typeMeta.color,
          });
        }
      }
    } else if (missing.length === 1 && extras.ok) {
      // One named piece missing
      if (combo.type !== "infinite-mana" || !infiniteManaActive) {
        const missingCard = missing[0];
        const tutorOptions = getTutorOptions(missingCard, hand, battlefield, mana, infiniteManaActive);
        if (tutorOptions.length > 0) {
          results.push({
            priority: combo.priority + 1,
            category: "🎯 ONE PIECE AWAY",
            headline: `Find ${missingCard} to enable ${combo.name}`,
            detail: `Use ${tutorOptions[0]} to find ${missingCard}. ${combo.description}`,
            steps: [`Use ${tutorOptions.join(" or ")} to find ${missingCard}.`, ...combo.lines],
            combo: combo.id,
            color: "#58d68d",
          });
        }
      }
    } else if (missing.length === 0 && !extras.ok) {
      // Named pieces present but need an extra condition satisfied
      if (combo.type !== "infinite-mana" || !infiniteManaActive) {
        const tutorOptions = getTutorOptions(extras.missing, hand, battlefield, mana, infiniteManaActive);
        results.push({
          priority: combo.priority,
          category: "🔧 NEARLY THERE",
          headline: `${combo.name} — still need: ${extras.missing}`,
          detail: `You have the core pieces for ${combo.name} but still need ${extras.missing} to satisfy the mana threshold. ${combo.description}`,
          steps: tutorOptions.length > 0
            ? [`Use ${tutorOptions.join(" or ")} to find ${extras.missing}.`, ...combo.lines]
            : [`Find ${extras.missing} to complete this combo.`, ...combo.lines],
          combo: combo.id,
          color: "#85c1e9",
        });
      }
    }
  }


  // Endurance is required for any Sanitarium mill win — it prevents self-decking.
  // Check if it's accessible: on board, in hand and castable, or in the graveyard
  // (retrievable by Eternal Witness). Flash means it can be cast at instant speed.
  // yevaFlash moved to top-of-function early declarations

  const enduranceOnBoard     = board.has("Endurance");
  const enduranceInHand      = inHand.has("Endurance");
  const enduranceInGrave     = inGrave.has("Endurance");
  const enduranceCastable    = enduranceOnBoard
    || (enduranceInHand && isMyTurn)
    || (enduranceInHand && yevaFlash) // Endurance has flash naturally
    || enduranceInGrave; // retrievable via Eternal Witness
  // For WIN NOW the bar is higher: must be on board or in hand right now
  const enduranceReady       = enduranceOnBoard || enduranceInHand;


  // ---- DUSKWATCH RECRUITER (infinite mana → full win pile) ----
  // Can we access Duskwatch Recruiter right now?
  // Direct: on board, in hand on our turn, or in hand with Yeva (flash)
  const duskwatchOnBoard  = board.has("Duskwatch Recruiter");
  const duskwatchInHand   = inHand.has("Duskwatch Recruiter");
  const duskwatchDirect   = duskwatchOnBoard
    || (duskwatchInHand && isMyTurn)
    || (duskwatchInHand && yevaFlash);

  // Via tutor: a tutor that can find Duskwatch (a CMC-2 green creature) is castable now
  // Instant-speed tutors: castable any time (or with Yeva on board for flash window)
  const instantCreatureTutors = ["Worldly Tutor","Chord of Calling","Summoner's Pact","Shared Summons",
    "Archdruid's Charm"]  // Archdruid's Charm mode 2: find any green creature → hand (instant speed)
    .filter(t => {
      if (!inHand.has(t)) return false;
      if (t === "Archdruid's Charm") return (mana >= 3 || infiniteManaActive); // costs {G}{G}{G}
      if (t === "Chord of Calling") {
        // Convoke: tap creatures to pay. For a CMC-2 target: {2}{G}{G}{G} = 5 total cost.
        // Each creature tapped reduces cost by 1. Effective mana = max(0, 5 - creaturesOnBoard)
        const chordEffectiveMana = Math.max(0, 5 - creaturesOnBoard);
        return (mana >= chordEffectiveMana || infiniteManaActive); // castable if we can cover the remainder
      }
      return true;
    });
  // Sorcery-speed tutors: only castable on our turn
  // Natural Order & Eldritch Evolution sacrifice a creature — still valid with infinite mana
  const sorceryCreatureTutors = ["Green Sun's Zenith","Natural Order","Eldritch Evolution"]
    .filter(t => inHand.has(t) || board.has(t));
  // Activated tutors already on board: Fauna Shaman, Survival of the Fittest
  // Note: Fierce Empath finds CMC 6+ only; Elvish Harbinger finds elves — Duskwatch is neither
  // Fauna Shaman requires a creature to discard — check we have one available in hand or on board
  // (with infinite mana we can always find something to discard)
  const hasCreatureToDiscard = hand.some(c => CARDS[c]?.type === "creature")
    || battlefield.some(c => CARDS[c]?.type === "creature" && c !== "Fauna Shaman");
  const faunaCanActivate = board.has("Fauna Shaman")
    && (hasCreatureToDiscard || infiniteManaActive);
  // Survival of the Fittest also needs a creature to discard
  const survivalCanActivate = board.has("Survival of the Fittest")
    && (hasCreatureToDiscard || infiniteManaActive);
  // Formidable Speaker: ETB looks at top X cards (X = creatures), puts a creature into hand.
  // Repeatable with Temur Sabertooth or Kogla bounce. No discard cost.
  const speakerCanActivate = board.has("Formidable Speaker") && speakerHasBouncer;
  const activatedCreatureTutors = [
    ...(faunaCanActivate    ? ["Fauna Shaman"]              : []),
    ...(survivalCanActivate ? ["Survival of the Fittest"]   : []),
    ...(speakerCanActivate  ? ["Formidable Speaker"]        : []),
  ];

  // Woodland Bellower: ETB puts any non-legendary green creature CMC <= 3 directly onto battlefield.
  // Castable on our turn (sorcery speed) or with Yeva flash. Already-on-board means ETB already fired.
  const bellowerInHand    = inHand.has("Woodland Bellower");
  const bellowerCastable  = bellowerInHand && (isMyTurn || yevaFlash);
  // Bellower can find: Duskwatch, Eternal Witness, Endurance, Destiny Spinner, Elvish Reclaimer,
  // Fauna Shaman, Formidable Speaker, Hyrax Tower Scout, Quirion Ranger, Scryb Ranger,
  // Priest of Titania, Elvish Archdruid, Circle of Dreams Druid, Magus of the Candelabra, etc.
  // Key non-legendary CMC<=3 win-relevant targets (not already on board):
  const bellowerKeyTargets = [
    "Duskwatch Recruiter",    // direct win con with infinite mana
    "Eternal Witness",        // graveyard retrieval / poison loop enabler
    "Endurance",              // required for mill win
    "Destiny Spinner",        // haste + uncounterable — win pile piece
    "Elvish Reclaimer",       // land tutor for Sanitarium / Cradle / Nykthos
    "Fauna Shaman",           // further tutor for any creature
    "Formidable Speaker",     // ETB bounce loop tutor
    "Hyrax Tower Scout",      // Sanitarium untap method
    "Quirion Ranger",         // infinite mana loop piece
    "Scryb Ranger",           // infinite mana loop piece
    "Priest of Titania",      // big mana dork
    "Elvish Archdruid",       // big mana dork
    "Circle of Dreams Druid", // big mana dork
    "Magus of the Candelabra",// untap lands — Ashaya combo
  ].filter(c => !board.has(c));  // only targets not already on board

  const tutorsThatFindDuskwatch = [
    ...instantCreatureTutors.map(t => ({ tutor: t, speed: "instant" })),
    ...sorceryCreatureTutors.map(t => ({ tutor: t, speed: "sorcery" })),
    ...activatedCreatureTutors.map(t => ({ tutor: t, speed: "activated" })),
    ...(bellowerCastable ? [{ tutor: "Woodland Bellower", speed: "bellower" }] : []),
  ].filter(({ tutor, speed }) => {
    if (speed === "instant")   return true;
    if (speed === "sorcery")   return isMyTurn;
    if (speed === "activated") return isMyTurn || yevaFlash;
    if (speed === "bellower")  return isMyTurn || yevaFlash;
    return false;
  });

  const duskwatchViaTutor = tutorsThatFindDuskwatch.length > 0;
  const duskwatchCastable = duskwatchDirect || duskwatchViaTutor;

  // Helper: add mode/obligation note to tutor names in step text
  function tutorNote(name) {
    if (name === "Chord of Calling")  {
      const convokeTap = Math.min(5, creaturesOnBoard);
      const remainder  = Math.max(0, 5 - creaturesOnBoard);
      return remainder === 0
        ? `Chord of Calling (free via convoke — tap ${convokeTap} creatures)`
        : `Chord of Calling (convoke — tap ${convokeTap} creatures, pay {${remainder}} mana)`;
    }
    if (name === "Summoner's Pact")   return "Summoner's Pact (free — pay {2}{G}{G} at next upkeep or lose)";
    if (name === "Archdruid's Charm") return "Archdruid's Charm (mode 2: find any green creature)";
    if (name === "Woodland Bellower") return "Woodland Bellower (ETB puts creature directly onto battlefield)";
    if (name === "Formidable Speaker")return "Formidable Speaker (ETB + bounce loop to find creature)";
    return name;
  }

  const duskwatchAccessNote = duskwatchOnBoard                    ? ""
    : (duskwatchInHand && isMyTurn)                              ? "Cast Duskwatch → "
    : (duskwatchInHand && yevaFlash)                             ? "Flash Duskwatch (Yeva) → "
    : duskwatchViaTutor                                          ? `${tutorsThatFindDuskwatch[0].tutor} → Duskwatch → `
    : "";

  if (duskwatchCastable && (infiniteManaActive || mana >= 20)) {
    // Determine which Sanitarium untap method is available
    const untapMethods = [];
    if (board.has("Woodcaller Automaton") && board.has("Temur Sabertooth"))
      untapMethods.push("Woodcaller Automaton + Temur Sabertooth");
    if (board.has("Hyrax Tower Scout") && hasLandAnimate)
      untapMethods.push(`Hyrax Tower Scout + ${badgermoleActive ? "Badgermole Cub" : "Destiny Spinner"} (haste)`);
    if (board.has("Ashaya, Soul of the Wild") && board.has("Magus of the Candelabra"))
      untapMethods.push("Ashaya + Magus of the Candelabra");
    if (board.has("Ashaya, Soul of the Wild") && (board.has("Quirion Ranger") || board.has("Scryb Ranger")) && hasLandAnimate)
      untapMethods.push(`Ashaya + Ranger + ${badgermoleActive ? "Badgermole Cub" : "Destiny Spinner"} (haste)`);
    if (board.has("Ashaya, Soul of the Wild") && board.has("Wirewood Symbiote") && hasLandAnimate)
      untapMethods.push(`Ashaya + Wirewood Symbiote + ${badgermoleActive ? "Badgermole Cub" : "Destiny Spinner"} (haste)`);
    if (board.has("Ashaya, Soul of the Wild") && board.has("Argothian Elder") && hasLandAnimate)
      untapMethods.push(`Ashaya + Argothian Elder + ${badgermoleActive ? "Badgermole Cub" : "Destiny Spinner"} (haste)`);

    // Determine which pile pieces are already on board
    const pileNeeded = ["Destiny Spinner","Elvish Reclaimer","Ashaya, Soul of the Wild",
      "Temur Sabertooth","Endurance"].filter(c => !board.has(c));

    results.push({
      priority: enduranceReady ? 15 : 11,
      category: enduranceReady ? "🔥 WIN NOW — PILE" : "⚠️ NEED ENDURANCE FIRST",
      headline: enduranceReady
        ? `${duskwatchAccessNote}Assemble the Win Pile → Sanitarium Mill`
        : `${duskwatchAccessNote}Assemble Win Pile — find Endurance before executing`,
      detail: enduranceReady
        ? "With infinite mana, activate Duskwatch Recruiter repeatedly to pull the win pile from your library, then use Geier Reach Sanitarium to mill all opponents out."
        : "⚠️ Endurance is REQUIRED before activating Sanitarium — without it you will mill yourself out. Find Endurance via Duskwatch before starting the Sanitarium loop.",
      steps: [
        ...(duskwatchViaTutor && !duskwatchOnBoard ? [
          `ACCESS: Cast ${tutorNote(tutorsThatFindDuskwatch[0].tutor)} to find Duskwatch Recruiter.`
          + (tutorsThatFindDuskwatch.length > 1 ? ` (Alternatives: ${tutorsThatFindDuskwatch.slice(1).map(x=>x.tutor).join(", ")})` : ""),
        ] : []),
        "═══ STEP 1 — ASSEMBLE THE PILE ═══",
        "Activate Duskwatch Recruiter ({2}{G}) repeatedly to find and cast these pieces:",
        "  • Destiny Spinner — gives your creatures haste (lands=creatures) AND makes green spells uncounterable",
        "  • Elvish Reclaimer — with Destiny Spinner's haste, tap Reclaimer to tutor Geier Reach Sanitarium",
        "  • Ashaya, Soul of the Wild — makes all creatures Forests (enables land-untap methods)",
        "  • Temur Sabertooth — bounce engine for Woodcaller Automaton loop",
        "  • Endurance — protects your library from milling out; ETB shuffles graveyard back in",
        "  • ONE untap method for Geier Reach Sanitarium (see Step 2)",
        "═══ STEP 2 — UNTAP GEIER REACH SANITARIUM ═══",
        untapMethods.length > 0
          ? `Available now: ${untapMethods.join(" | ")}`
          : "Find one of these untap methods via Duskwatch:",
        "  • Woodcaller Automaton + Temur Sabertooth (bounce Automaton each loop, ETB untaps Sanitarium)",
        "  • Hyrax Tower Scout + Destiny Spinner (Scout ETB untaps Sanitarium; Destiny gives it haste to tap again)",
        "  • Ashaya + Magus of the Candelabra (Magus {2}: untaps itself + Sanitarium as a Forest)",
        "  • Ashaya + Quirion/Scryb Ranger + Destiny Spinner (Ranger bounces as Forest, Destiny=haste)",
        "  • Ashaya + Wirewood Symbiote + Destiny Spinner (Symbiote untaps Sanitarium as a Forest)",
        "  • Ashaya + Argothian Elder + Destiny Spinner (Elder untaps Sanitarium + itself)",
        "═══ STEP 3 — EXECUTE MILL WIN ═══",
        "Once Geier Reach Sanitarium is in play with untap method ready:",
        "Activate Sanitarium ({2},{T}): each player draws then discards. Hold priority.",
        "Untap Sanitarium with your chosen method. Repeat ~99× until all opponents' libraries are empty.",
        "Use Endurance to shuffle YOUR graveyard back in whenever your library runs low.",
        pileNeeded.length > 0
          ? `Still need from library: ${pileNeeded.join(", ")}`
          : "All core pile pieces already on battlefield — execute now!",
      ],
      color: "#ff6b35",
    });
  }

  // ---- ELVISH RECLAIMER — LAND TUTOR ----
  // Reclaimer is castable if: on board, in hand on our turn, or in hand with Yeva
  const reclaimerOnBoard   = board.has("Elvish Reclaimer");
  const reclaimerInHand    = inHand.has("Elvish Reclaimer");
  const reclaimerCastable  = reclaimerOnBoard
    || (reclaimerInHand && isMyTurn)
    || (reclaimerInHand && yevaFlash);

  // Reclaimer's ability can activate if it's on the board AND:
  //   a) it has haste — Destiny Spinner animates LANDS as creatures with haste, so Reclaimer
  //      only gets this if Ashaya is also in play (making Reclaimer a Forest/creature).
  //      Badgermole Cub works the same way (also needs Ashaya + bouncer via badgermoleActive).
  //   b) it has been on board since our turn started (no haste needed, not summoning sick)
  //     → we approximate this as: on board AND it's our turn (player is responsible for tracking sickness)
  const reclaimerHaste = reclaimerOnBoard && board.has("Ashaya, Soul of the Wild") && hasLandAnimate;
  const reclaimerCanActivate = reclaimerOnBoard && (reclaimerHaste || isMyTurn);

  if (reclaimerCastable || reclaimerCanActivate) {
    // Priority-ordered land targets with reasons
    const landTargets = [
      { land: "Gaea's Cradle",          missing: !board.has("Gaea's Cradle"),
        reason: "Taps for {G} per creature — often 4-8+ mana immediately. Core combo enabler.",
        priority: infiniteManaActive ? 7 : 9 },
      { land: "Itlimoc, Cradle of the Sun", missing: !board.has("Itlimoc, Cradle of the Sun") && !board.has("Gaea's Cradle"),
        reason: `Taps for {G} per creature (currently ${creaturesOnBoard}) — Gaea's Cradle as a land. Fetch when Cradle isn't available.`,
        priority: infiniteManaActive ? 6 : 8 },
      { land: "Geier Reach Sanitarium", missing: !board.has("Geier Reach Sanitarium"),
        reason: "Win condition with infinite mana — untap Sanitarium via: Woodcaller+Temur, Hyrax+Destiny Spinner, Ashaya+Magus, Ashaya+Ranger, Ashaya+Elder, Ashaya+Wirewood Symbiote, or Ashaya+Destiny Spinner (Reclaimer fetches it with haste, Ashaya makes it a Forest for your existing loop).",
        // Only a true win con if infinite mana is live AND a Sanitarium untap method is already on board
        priority: (() => {
          if (!infiniteManaActive) return 5;
          const hasUntapMethod =
            // Woodcaller+Temur only valid if they're NOT the sole mana engine
            (board.has("Woodcaller Automaton") && board.has("Temur Sabertooth")) ||
            (board.has("Hyrax Tower Scout") && hasLandAnimate) ||
            (board.has("Ashaya, Soul of the Wild") && board.has("Magus of the Candelabra")) ||
            (board.has("Ashaya, Soul of the Wild") && (board.has("Quirion Ranger") || board.has("Scryb Ranger"))) ||
            (board.has("Ashaya, Soul of the Wild") && board.has("Wirewood Symbiote") && hasLandAnimate) ||
            (board.has("Ashaya, Soul of the Wild") && board.has("Argothian Elder")) ||
            // Ashaya + Destiny Spinner/Badgermole: Reclaimer fetches Sanitarium with haste,
            // Ashaya makes Sanitarium a Forest so existing Ranger/Elder loops untap it
            (board.has("Ashaya, Soul of the Wild") && hasLandAnimate);
          // Even with untap method, still need Endurance to avoid self-mill
          if (!hasUntapMethod) return 6;
          return enduranceReady ? 13 : 7;
        })() },
      { land: "Nykthos, Shrine to Nyx", missing: !board.has("Nykthos, Shrine to Nyx"),
        reason: `Taps for {G} equal to green devotion (currently ${devotionOnBoard}). Spend {2} to net ${Math.max(0, devotionOnBoard - 2)} mana.`,
        priority: devotionOnBoard >= 5 ? 9 : 6 },
      { land: "Wirewood Lodge",         missing: !board.has("Wirewood Lodge"),
        reason: "Untaps an Elf — enables Argothian Elder infinite mana loop, or untaps Archdruid/Priest for double tap.",
        priority: board.has("Argothian Elder") ? 9 : 6 },
      { land: "Deserted Temple",        missing: !board.has("Deserted Temple"),
        reason: "Untaps any land including Gaea's Cradle, Nykthos, or Geier Reach Sanitarium. Key for mill loop.",
        priority: (board.has("Gaea's Cradle") || board.has("Itlimoc, Cradle of the Sun") || board.has("Nykthos, Shrine to Nyx")) ? 8 : 5 },
      { land: "Yavimaya, Cradle of Growth", missing: !board.has("Yavimaya, Cradle of Growth"),
        reason: "Makes all lands Forests for all players. Enables Eladamri forestwalk win, Argothian Elder combos, and Earthcraft with all creatures.",
        priority: board.has("Eladamri, Korvecdal") ? 8 : 5 },
      { land: "Boseiju, Who Endures",   missing: !board.has("Boseiju, Who Endures"),
        reason: "Instant-speed removal for problematic enchantments, artifacts, or lands. Channel ability is uncounterable.",
        priority: 4 },
      { land: "Emergence Zone",         missing: !board.has("Emergence Zone"),
        reason: "Gives all your spells flash until end of turn. Lets you cast non-creature spells at instant speed.",
        priority: 4 },
    ].filter(t => t.missing);

    if (landTargets.length > 0) {
      // Sort by priority descending to find best target
      landTargets.sort((a, b) => b.priority - a.priority);
      const best = landTargets[0];
      const topPriority = best.priority;

      // Determine the action prefix
      const actionPrefix = reclaimerCanActivate
        ? (reclaimerHaste
            ? `Tap Elvish Reclaimer (haste via ${board.has("Ashaya, Soul of the Wild") && hasLandAnimate ? "Ashaya + " + (board.has("Destiny Spinner") ? "Destiny Spinner" : "Badgermole Cub") : board.has("Destiny Spinner") ? "Destiny Spinner" : "Badgermole Cub"})`
            : "Tap Elvish Reclaimer")
        : reclaimerInHand && isMyTurn
            ? "Cast + tap Elvish Reclaimer (needs haste or wait a turn)"
            : "Cast Elvish Reclaimer via Yeva flash, then tap next turn";

      results.push({
        priority: topPriority,
        category: best.priority >= 13 && best.land === "Geier Reach Sanitarium" && hasLandAnimate
          ? "🔥 WIN NOW — MILL"
          : "🏔️ LAND TUTOR",
        headline: `${actionPrefix} → fetch ${best.land}`,
        detail: `Elvish Reclaimer ({1},{T}: sacrifice a land → search for any land). ${best.reason}`,
        steps: [
          ...(reclaimerInHand && !reclaimerOnBoard ? [
            `Cast Elvish Reclaimer ({G}).`
            + (!reclaimerHaste
              ? " Note: needs haste (Destiny Spinner or Badgermole Cub + bouncer) or must wait until next turn to activate."
              : ""),
          ] : []),
          `Pay {1}, tap Elvish Reclaimer, sacrifice a land: search your library for ${best.land} and put it onto the battlefield tapped.`,
          best.reason,
          ...(landTargets.length > 1
            ? [`Other strong targets: ${landTargets.slice(1, 3).map(t => t.land).join(", ")}`]
            : []),
        ],
        color: best.priority >= 13 && best.land === "Geier Reach Sanitarium" && hasLandAnimate ? "#ff6b35" : "#5dade2",
      });
    }
  }

  // ---- ETERNAL WITNESS GRAVEYARD RETRIEVAL AS WIN CON ----
  // If infinite mana is active (or mana >= 20), Eternal Witness can retrieve a key piece
  // from the graveyard and turn it into a win con.
  if (infiniteManaActive || mana >= 20) {
    // Determine if Eternal Witness is accessible
    const witnessOnBoard   = board.has("Eternal Witness");
    const witnessInHand    = inHand.has("Eternal Witness");
    const witnessCastable  = witnessOnBoard
      || (witnessInHand && isMyTurn)
      || (witnessInHand && yevaFlash);

    // Also reachable via the same tutor logic as Duskwatch
    const witnessTutors = ["Worldly Tutor","Chord of Calling","Summoner's Pact","Shared Summons",
      "Archdruid's Charm",  // mode 2: find any green creature → hand (instant speed, {G}{G}{G})
      "Green Sun's Zenith","Natural Order","Eldritch Evolution","Fauna Shaman","Survival of the Fittest",
      "Woodland Bellower","Formidable Speaker"]
      .filter(t => {
        if (!inHand.has(t) && !board.has(t)) return false;
        const isInstant   = ["Worldly Tutor","Chord of Calling","Summoner's Pact","Shared Summons",
          "Archdruid's Charm"].includes(t);
        const isActivated = ["Fauna Shaman","Survival of the Fittest"].includes(t);
        const isBellower  = t === "Woodland Bellower";
        const isSpeaker   = t === "Formidable Speaker";
        if (isInstant)   return t === "Archdruid's Charm" ? (mana >= 3 || infiniteManaActive) : true;
        if (isActivated) return board.has(t) && (isMyTurn || yevaFlash);
        if (isBellower)  return inHand.has(t) && (isMyTurn || yevaFlash);
        if (isSpeaker)   return board.has(t) && speakerHasBouncer && (isMyTurn || yevaFlash);
        return isMyTurn; // sorcery speed
      });
    const witnessAccessible = witnessCastable || witnessTutors.length > 0;

    if (witnessAccessible) {
      // Categorise what's in the graveyard by how much it helps
      // Tier 1: Duskwatch Recruiter in graveyard → full pile win
      if (inGrave.has("Duskwatch Recruiter") && !duskwatchCastable) {
        const accessNote = witnessOnBoard      ? "Eternal Witness already in play"
          : witnessInHand                      ? `Cast Eternal Witness`
          : witnessTutors.length > 0           ? `${witnessTutors[0]} → Eternal Witness`
          : "Cast Eternal Witness";
        results.push({
          priority: enduranceReady ? 14 : 10,
          category: enduranceReady ? "🔥 WIN NOW — PILE" : "⚠️ NEED ENDURANCE FIRST",
          headline: enduranceReady
            ? `${accessNote} → retrieve Duskwatch → Assemble Win Pile`
            : `${accessNote} → retrieve Duskwatch → find Endurance → Sanitarium Mill`,
          detail: enduranceReady
            ? "Duskwatch Recruiter is in your graveyard. Eternal Witness retrieves it, then infinite Duskwatch activations assemble the win pile for a Sanitarium mill finish."
            : "⚠️ Endurance is REQUIRED — without it Sanitarium mills you out too. Retrieve Duskwatch, then use it to find Endurance before starting the Sanitarium loop.",
          steps: [
            witnessOnBoard
              ? "Eternal Witness is already on the battlefield — use Temur Sabertooth or Kogla to bounce and recast it to retrieve Duskwatch from the graveyard."
              : `Cast Eternal Witness ({2}{G})${witnessTutors.length > 0 && !witnessInHand ? ` (find it via ${tutorNote(witnessTutors[0])})` : ""}: ETB retrieves Duskwatch Recruiter from graveyard.`,
            "Cast Duskwatch Recruiter ({1}{G}{G}).",
            ...(!enduranceReady ? ["⚠️ Use Duskwatch to find Endurance FIRST before activating Sanitarium."] : []),
            "With infinite mana, activate Duskwatch ({2}{G}) repeatedly to assemble the win pile:",
            "  • Destiny Spinner + Elvish Reclaimer → tutor Geier Reach Sanitarium",
            "  • Ashaya + Temur Sabertooth + Endurance + one untap method",
            "Activate Sanitarium repeatedly (untapping each loop) until all opponents mill out.",
          ],
          color: enduranceReady ? "#ff6b35" : "#e67e22",
        });
      }

      // Tier 1b: A key tutor is in the graveyard (Worldly Tutor, Chord etc → find Duskwatch)
      const graveTutors = ["Worldly Tutor","Chord of Calling","Summoner's Pact","Archdruid's Charm",
        "Green Sun's Zenith","Natural Order","Eldritch Evolution"]
        .filter(t => inGrave.has(t) && !inHand.has(t));
      if (graveTutors.length > 0 && !duskwatchCastable && !inGrave.has("Duskwatch Recruiter")) {
        const accessNote = witnessOnBoard ? "Eternal Witness" : `${witnessTutors.length > 0 && !witnessInHand ? witnessTutors[0] + " → " : ""}Eternal Witness`;
        results.push({
          priority: enduranceReady ? 13 : 9,
          category: enduranceReady ? "🔥 WIN NOW — PILE" : "⚠️ NEED ENDURANCE FIRST",
          headline: `${accessNote} → retrieve ${graveTutors[0]} → find Duskwatch`,
          detail: enduranceReady
            ? `${graveTutors[0]} is in the graveyard. Eternal Witness retrieves it, then use it to find Duskwatch Recruiter and execute the full win pile.`
            : `⚠️ ${graveTutors[0]} is in the graveyard. Retrieve it, find Duskwatch, then find Endurance BEFORE activating Sanitarium or you will self-mill.`,
          steps: [
            `Cast Eternal Witness${witnessInHand ? "" : witnessTutors.length > 0 ? ` (via ${tutorNote(witnessTutors[0])})` : ""}: ETB retrieves ${graveTutors[0]} from graveyard.`,
            `Cast ${graveTutors[0]} to find Duskwatch Recruiter.`,
            ...(!enduranceReady ? ["⚠️ Use Duskwatch to find Endurance BEFORE activating Sanitarium."] : []),
            "Cast Duskwatch Recruiter. Activate repeatedly to assemble win pile → Sanitarium mill win.",
          ],
          color: enduranceReady ? "#ff6b35" : "#e67e22",
        });
      }

      // Tier 2: Infectious Bite in graveyard → poison win (with bouncer on board)
      if (inGrave.has("Infectious Bite")
        && !inHand.has("Infectious Bite")
        && (board.has("Temur Sabertooth") || board.has("Kogla, the Titan Ape"))) {
        const bouncer = board.has("Temur Sabertooth") ? "Temur Sabertooth" : "Kogla, the Titan Ape";
        results.push({
          priority: 13,
          category: "☠️ POISON WIN",
          headline: `Eternal Witness → retrieve Infectious Bite → Poison all opponents`,
          detail: "Infectious Bite is in the graveyard. Eternal Witness retrieves it. With a bouncer on board, loop Witness + Bite 10 times to give all opponents 10 poison counters.",
          steps: [
            `Cast Eternal Witness${witnessInHand ? "" : witnessTutors.length > 0 ? ` (via ${tutorNote(witnessTutors[0])})` : ""}: ETB retrieves Infectious Bite from graveyard.`,
            "Cast Infectious Bite: fight any creature. Each opponent gets 1 poison counter. (1/10)",
            bouncer === "Temur Sabertooth"
              ? "Pay {1}{G}: Temur Sabertooth bounces Eternal Witness. Recast Witness → retrieve Infectious Bite."
              : "Kogla attacks → returns Eternal Witness (Human) to hand. Recast Witness → retrieve Bite.",
            "Repeat 10 times. All opponents reach 10 poison counters and lose simultaneously.",
          ],
          color: "#27ae60",
        });
      }

      // Tier 3: A key infinite-mana combo piece is in the graveyard and its retrieval
      // would complete an otherwise-assembled combo on the board
      for (const combo of COMBOS) {
        if (combo.type !== "infinite-mana") continue;
        // Find named pieces that are missing from board/hand but ARE in graveyard
        const missingFromPlay = combo.requires.filter(r => !board.has(r) && !inHand.has(r));
        const inGraveyard     = missingFromPlay.filter(r => inGrave.has(r));
        // If exactly one piece is missing and it's in the graveyard, Witness retrieves it
        if (inGraveyard.length === 1 && missingFromPlay.length === 1) {
          const piece = inGraveyard[0];
          const accessNote = witnessOnBoard ? "Eternal Witness (bounce+recast)"
            : witnessInHand ? "Cast Eternal Witness"
            : witnessTutors.length > 0 ? `${witnessTutors[0]} → Eternal Witness`
            : null;
          if (!accessNote) continue;
          results.push({
            priority: 12,
            category: "⚙️ RETRIEVE FOR INFINITE MANA",
            headline: `${accessNote} → retrieve ${piece} → ${combo.name}`,
            detail: `${piece} is in your graveyard and is the only missing piece for ${combo.name}. Eternal Witness retrieves it to complete the infinite mana loop.`,
            steps: [
              `${accessNote}: retrieve ${piece} from graveyard.`,
              `Cast ${piece} to complete ${combo.name}.`,
              ...combo.lines,
            ],
            color: "#58d68d",
          });
        }
      }
    }
  }


  // ---- WOODLAND BELLOWER ----
  // Bellower ETB puts any non-legendary green CMC<=3 creature directly onto the battlefield.
  // This is a tutor AND a tempo play — the creature enters immediately, no casting cost.
  if (bellowerCastable) {
    const hasBouncer = board.has("Temur Sabertooth") || board.has("Kogla, the Titan Ape") || inHand.has("Temur Sabertooth") || inHand.has("Kogla, the Titan Ape");

    // Determine best target based on board state
    const winTarget = bellowerKeyTargets.find(c =>
      ["Duskwatch Recruiter","Eternal Witness","Endurance","Destiny Spinner","Elvish Reclaimer"].includes(c)
    );
    const comboTarget = bellowerKeyTargets.find(c =>
      ["Fauna Shaman","Formidable Speaker","Hyrax Tower Scout","Quirion Ranger","Scryb Ranger",
       "Magus of the Candelabra"].includes(c)
    );
    const manaTarget = bellowerKeyTargets.find(c =>
      ["Priest of Titania","Elvish Archdruid","Circle of Dreams Druid"].includes(c)
    );
    const primaryTarget = winTarget || comboTarget || manaTarget || bellowerKeyTargets[0];

    if (primaryTarget) {
      // Is this an immediate win con?
      const isWinNow = (infiniteManaActive || mana >= 20)
        && (primaryTarget === "Duskwatch Recruiter"
          || (primaryTarget === "Eternal Witness" && (inHand.has("Infectious Bite") || inGrave.has("Infectious Bite")) && hasBouncer)
          || (primaryTarget === "Endurance" && board.has("Geier Reach Sanitarium") && infiniteManaActive));

      // Reason for each target
      const targetReason = {
        "Duskwatch Recruiter":    "enters play immediately — activate repeatedly to assemble win pile",
        "Eternal Witness":        "enters play — ETB retrieves key card from graveyard; enables Infectious Bite poison loop with bouncer",
        "Endurance":              "enters play with flash (even via Bellower) — required for Sanitarium mill win",
        "Destiny Spinner":        "enters play — gives all your creatures haste; makes green spells uncounterable",
        "Elvish Reclaimer":       "enters play — activate to tutor Geier Reach Sanitarium, Cradle, or Nykthos",
        "Fauna Shaman":           "enters play — activate to find any creature (Duskwatch, Witness, etc.)",
        "Formidable Speaker":     "enters play — ETB bounce loop with Sabertooth/Kogla finds any creature",
        "Hyrax Tower Scout":      "enters play — ETB untaps a creature; key Sanitarium untap method",
        "Quirion Ranger":         "enters play — enables Ashaya infinite mana loop",
        "Scryb Ranger":           "enters play — flash untap engine for Ashaya loop",
        "Priest of Titania":      `enters play — taps for ${battlefield.filter(c => CARDS[c]?.tags?.includes("elf")).length} green mana (elves on board)`,
        "Elvish Archdruid":       `enters play — taps for ${battlefield.filter(c => CARDS[c]?.tags?.includes("elf")).length} green mana (elves on board)`,
        "Circle of Dreams Druid": `enters play — taps for ${battlefield.filter(c => CARDS[c]?.type === "creature").length} green mana (creatures on board)`,
        "Magus of the Candelabra":"enters play — {X}: untap X lands; key Ashaya/Nykthos combo piece",
      }[primaryTarget] || "enters play directly — no casting cost";

      results.push({
        priority: isWinNow ? 14 : (winTarget ? 10 : 8),
        category: isWinNow ? "🔥 WIN NOW" : "🌲 BELLOWER TUTOR",
        headline: `Cast Woodland Bellower → put ${primaryTarget} onto battlefield`,
        detail: `Woodland Bellower ETB: search for any non-legendary green creature with CMC ≤ 3 and put it directly onto the battlefield. ${targetReason}`,
        steps: [
          `Cast Woodland Bellower ({4}{G}{G}).`,
          `ETB: search library for ${primaryTarget} and put it onto the battlefield.`,
          targetReason,
          ...(bellowerKeyTargets.length > 1
            ? [`Other strong targets: ${bellowerKeyTargets.filter(c => c !== primaryTarget).slice(0,3).join(", ")}`]
            : []),
          ...(isWinNow && primaryTarget === "Duskwatch Recruiter"
            ? ["Activate Duskwatch repeatedly to assemble win pile → Sanitarium mill win."]
            : []),
          ...(isWinNow && primaryTarget === "Eternal Witness"
            ? ["Eternal Witness ETB retrieves Infectious Bite. Cast Bite → loop with bouncer × 10 → poison win."]
            : []),
        ],
        color: isWinNow ? "#ff6b35" : "#27ae60",
      });
    }
  }

  // ---- FAUNA SHAMAN WIN CON (in hand) ----
  // Fauna Shaman in hand + infinite mana: casting it enables finding Duskwatch or Eternal Witness.
  if (inHand.has("Fauna Shaman") && !board.has("Fauna Shaman") && (infiniteManaActive || mana >= 20)) {
    const hasteNow    = board.has("Destiny Spinner");
    const hasBouncer  = board.has("Temur Sabertooth") || board.has("Kogla, the Titan Ape") || inHand.has("Temur Sabertooth") || inHand.has("Kogla, the Titan Ape");
    const biteAvail   = inHand.has("Infectious Bite") || inGrave.has("Infectious Bite");
    // Determine the best target: Duskwatch (pile win) vs Eternal Witness (poison win)
    // Prefer Duskwatch unless Bite is available and a bouncer is on board (poison is cleaner)
    const poisonLineAvail = biteAvail && hasBouncer && !board.has("Eternal Witness");
    const primaryTarget   = poisonLineAvail ? "Eternal Witness" : "Duskwatch Recruiter";
    const altTarget       = poisonLineAvail ? "Duskwatch Recruiter" : (biteAvail && hasBouncer ? "Eternal Witness" : null);

    results.push({
      priority: hasteNow ? 13 : 9,
      category: hasteNow ? "🔥 WIN NOW" : "🌿 CAST FOR WIN NEXT TURN",
      headline: hasteNow
        ? `Cast Fauna Shaman (haste) → find ${primaryTarget} → ${poisonLineAvail ? "Poison loop" : "Win Pile"}`
        : `Cast Fauna Shaman now → find ${primaryTarget} next turn → ${poisonLineAvail ? "Poison loop" : "Win Pile"}`,
      detail: hasteNow
        ? `Fauna Shaman enters with haste via Destiny Spinner. Immediately find ${primaryTarget} to close out the game.`
        : `Fauna Shaman has summoning sickness this turn. Cast it now, activate next turn to find ${primaryTarget}.`,
      steps: [
        "Cast Fauna Shaman ({1}{G}).",
        hasteNow
          ? `Destiny Spinner gives haste — activate immediately: discard any creature → search for ${primaryTarget}.`
          : `Wait until next turn. Pay {G}, tap Fauna Shaman, discard any creature → search for ${primaryTarget}.`,
        ...(poisonLineAvail ? [
          "Cast Eternal Witness: ETB retrieves Infectious Bite" + (inGrave.has("Infectious Bite") ? " from graveyard." : "."),
          "Cast Infectious Bite: fight any creature. Each opponent gets 1 poison counter.",
          board.has("Temur Sabertooth")
            ? "Sabertooth bounces Witness. Recast → retrieve Bite. Repeat 10× for poison win."
            : "Kogla attacks → return Witness. Recast → retrieve Bite. Repeat 10× for poison win.",
        ] : [
          "Cast Duskwatch Recruiter. Activate repeatedly to assemble win pile:",
          "  • Destiny Spinner + Elvish Reclaimer → Geier Reach Sanitarium",
          "  • Ashaya + Temur Sabertooth + Endurance + untap method → Sanitarium mill win",
        ]),
        ...(altTarget ? [`Alt line: find ${altTarget} instead for a different win path.`] : []),
      ],
      color: hasteNow ? "#ff6b35" : "#58d68d",
    });
  }

  // ---- FORMIDABLE SPEAKER WIN CON (in hand) ----
  // Speaker in hand + bouncer on board + infinite mana = win con via ETB tutoring
  if (inHand.has("Formidable Speaker") && !board.has("Formidable Speaker")
      && speakerHasBouncer && (infiniteManaActive || mana >= 20)) {
    const hasteNow     = board.has("Destiny Spinner");
    const biteAvailNow = inHand.has("Infectious Bite") || inGrave.has("Infectious Bite");
    const poisonLine   = biteAvailNow && !board.has("Eternal Witness");
    const primaryTarget = poisonLine ? "Eternal Witness" : "Duskwatch Recruiter";
    const speakerBouncer = board.has("Temur Sabertooth") ? "Temur Sabertooth" : "Kogla, the Titan Ape";
    results.push({
      priority: hasteNow ? 13 : 9,
      category: hasteNow ? "🔥 WIN NOW" : "🌿 CAST FOR WIN NEXT TURN",
      headline: hasteNow
        ? `Cast Formidable Speaker (haste) → ${speakerBouncer} bounce loop → find ${primaryTarget}`
        : `Cast Formidable Speaker → next turn bounce-loop to find ${primaryTarget}`,
      detail: hasteNow
        ? `Formidable Speaker enters with haste (Destiny Spinner). Immediately bounce with ${speakerBouncer} and recast to find ${primaryTarget} via repeated ETBs.`
        : `Cast Formidable Speaker now. Next turn: bounce with ${speakerBouncer} and recast repeatedly to tutor ${primaryTarget} from library.`,
      steps: [
        `Cast Formidable Speaker ({1}{G}).`,
        hasteNow
          ? `Destiny Spinner gives haste — immediately pay {1}{G}: ${speakerBouncer} bounces Speaker. Recast — ETB finds ${primaryTarget}.`
          : `Next turn: pay {1}{G}: ${speakerBouncer} bounces Speaker. Recast — ETB looks at top X cards (X = creatures), put ${primaryTarget} into hand.`,
        ...(poisonLine ? [
          "Cast Eternal Witness: ETB retrieves Infectious Bite" + (inGrave.has("Infectious Bite") ? " from graveyard." : "."),
          "Cast Infectious Bite: fight any creature. Each opponent gets 1 poison counter.",
          speakerBouncer === "Temur Sabertooth"
            ? "Sabertooth bounces Witness. Recast → retrieve Bite. Repeat 10× for poison win."
            : "Kogla attacks → return Witness. Recast → retrieve Bite. Repeat 10× for poison win.",
        ] : [
          "Cast Duskwatch Recruiter. Activate repeatedly to assemble win pile:",
          "  • Destiny Spinner + Elvish Reclaimer → Geier Reach Sanitarium",
          "  • Ashaya + Temur Sabertooth + Endurance + untap method → Sanitarium mill win",
        ]),
      ],
      color: hasteNow ? "#ff6b35" : "#58d68d",
    });
  }

  // ---- INFECTIOUS BITE POISON LINE ----
  {
    const biteInHand  = inHand.has("Infectious Bite");
    const biteInGrave = inGrave.has("Infectious Bite");
    const biteAvail   = biteInHand || biteInGrave;
    const witnessOnBrd = board.has("Eternal Witness");
    const hasBouncer   = board.has("Temur Sabertooth") || board.has("Kogla, the Titan Ape") || inHand.has("Temur Sabertooth") || inHand.has("Kogla, the Titan Ape");
    const bouncer      = board.has("Temur Sabertooth") ? "Temur Sabertooth" : "Kogla, the Titan Ape";

    // Fauna Shaman can find Eternal Witness if Witness isn't already on board
    const faunaFindsWitness = faunaCanActivate && !witnessOnBrd && (isMyTurn || yevaFlash);
    // Fauna Shaman in hand + haste can also find Witness immediately
    const faunaInHandFindsWitness = inHand.has("Fauna Shaman") && !board.has("Fauna Shaman")
      && board.has("Destiny Spinner") && !witnessOnBrd;
    // Formidable Speaker on board + bouncer can find Eternal Witness via repeated ETB
    const speakerFindsWitness = speakerCanActivate && !witnessOnBrd && (isMyTurn || yevaFlash);
    // Formidable Speaker in hand + haste (Destiny Spinner) + bouncer → find Witness immediately
    const speakerInHandFindsWitness = inHand.has("Formidable Speaker") && !board.has("Formidable Speaker")
      && board.has("Destiny Spinner") && speakerHasBouncer && !witnessOnBrd;

    // Full poison win: Bite accessible + Witness on board + bouncer
    if (biteAvail && witnessOnBrd && hasBouncer && (infiniteManaActive || mana >= 20)) {
      results.push({
        priority: 14,
        category: "☠️ POISON WIN",
        headline: "Execute Infectious Bite Poison Loop",
        detail: "All pieces assembled. 10 casts of Infectious Bite via Eternal Witness recursion poisons all opponents out simultaneously.",
        steps: [
          ...(biteInGrave && !biteInHand ? ["Cast Eternal Witness: ETB retrieves Infectious Bite from graveyard."] : []),
          "Cast Infectious Bite: fight any opponent's creature. Each opponent gets 1 poison counter. (1/10)",
          bouncer === "Temur Sabertooth"
            ? "Pay {1}{G}: Temur Sabertooth bounces Eternal Witness. Recast Witness → retrieve Infectious Bite."
            : "Kogla attacks → return Eternal Witness (Human) to hand. Recast Witness → retrieve Infectious Bite.",
          "Cast Infectious Bite again (2/10). Repeat.",
          "After 10 casts: all opponents have 10 poison counters and lose simultaneously.",
        ],
        color: "#27ae60",
      });
    }

    // Fauna Shaman on board can find Eternal Witness → complete the poison loop
    if (biteAvail && !witnessOnBrd && faunaFindsWitness && hasBouncer && (infiniteManaActive || mana >= 20)) {
      results.push({
        priority: 13,
        category: "☠️ POISON WIN",
        headline: `Fauna Shaman → Eternal Witness → Infectious Bite Poison Loop`,
        detail: `Eternal Witness is not in play but Fauna Shaman can fetch it. With${biteInGrave ? " Infectious Bite in the graveyard and" : ""} a bouncer on board, this closes out the game.`,
        steps: [
          `Pay {G}, tap Fauna Shaman, discard any creature: search for Eternal Witness.`,
          "Cast Eternal Witness: ETB retrieves Infectious Bite from " + (biteInGrave ? "graveyard." : "— wait, Bite is in hand already, use Witness to set up the loop instead."),
          "Cast Infectious Bite: fight any creature. Each opponent gets 1 poison counter. (1/10)",
          bouncer === "Temur Sabertooth"
            ? "Pay {1}{G}: Sabertooth bounces Eternal Witness. Recast Witness → retrieve Infectious Bite."
            : "Kogla attacks → return Eternal Witness to hand. Recast → retrieve Infectious Bite.",
          "Repeat 10 times. All opponents lose simultaneously.",
        ],
        color: "#27ae60",
      });
    }

    // Fauna Shaman in hand + Destiny Spinner haste → find Witness right now
    if (biteAvail && !witnessOnBrd && faunaInHandFindsWitness && hasBouncer && (infiniteManaActive || mana >= 20)) {
      results.push({
        priority: 12,
        category: "☠️ POISON WIN",
        headline: "Cast Fauna Shaman (haste) → Eternal Witness → Infectious Bite loop",
        detail: "Fauna Shaman enters with haste via Destiny Spinner. Immediately find Eternal Witness, then execute the Infectious Bite poison loop.",
        steps: [
          "Cast Fauna Shaman ({1}{G}). Destiny Spinner gives it haste.",
          "Activate immediately: discard any creature → search for Eternal Witness.",
          "Cast Eternal Witness: ETB retrieves Infectious Bite" + (biteInGrave ? " from graveyard." : "."),
          "Cast Infectious Bite: fight any creature. Each opponent gets 1 poison counter. (1/10)",
          bouncer === "Temur Sabertooth"
            ? "Pay {1}{G}: Sabertooth bounces Eternal Witness. Recast → retrieve Bite. Repeat 10×."
            : "Kogla attacks → return Witness to hand. Recast → retrieve Bite. Repeat 10×.",
        ],
        color: "#27ae60",
      });
    }

    // Formidable Speaker on board + bouncer → ETB finds Eternal Witness → poison loop
    if (biteAvail && !witnessOnBrd && speakerFindsWitness && (infiniteManaActive || mana >= 20)) {
      results.push({
        priority: 13,
        category: "☠️ POISON WIN",
        headline: `Formidable Speaker ETB → Eternal Witness → Infectious Bite loop`,
        detail: `Bounce and recast Formidable Speaker with ${bouncer} to repeatedly trigger its ETB. Use it to find Eternal Witness, then execute the Infectious Bite poison loop.`,
        steps: [
          `Pay {1}{G}: ${bouncer} bounces Formidable Speaker to hand. Recast it ({1}{G}).`,
          "Formidable Speaker ETB: look at top X cards (X = creatures on board), put Eternal Witness into hand.",
          "Cast Eternal Witness: ETB retrieves Infectious Bite" + (biteInGrave ? " from graveyard." : "."),
          "Cast Infectious Bite: fight any creature. Each opponent gets 1 poison counter. (1/10)",
          bouncer === "Temur Sabertooth"
            ? "Pay {1}{G}: Sabertooth bounces Eternal Witness. Recast → retrieve Bite. Repeat 10×."
            : "Kogla attacks → return Eternal Witness to hand. Recast → retrieve Bite. Repeat 10×.",
          "After 10 casts all opponents have 10 poison counters and lose simultaneously.",
        ],
        color: "#27ae60",
      });
    }

    // Formidable Speaker in hand + Destiny Spinner haste + bouncer → immediate poison line
    if (biteAvail && !witnessOnBrd && speakerInHandFindsWitness && (infiniteManaActive || mana >= 20)) {
      results.push({
        priority: 12,
        category: "☠️ POISON WIN",
        headline: "Cast Formidable Speaker (haste) → Eternal Witness → Infectious Bite loop",
        detail: "Formidable Speaker enters with haste via Destiny Spinner. Bounce and recast immediately to find Eternal Witness, then execute the Infectious Bite poison loop.",
        steps: [
          `Cast Formidable Speaker ({1}{G}). Destiny Spinner gives it haste.`,
          `Pay {1}{G}: ${bouncer} bounces Speaker. Recast — ETB finds Eternal Witness.`,
          "Cast Eternal Witness: ETB retrieves Infectious Bite" + (biteInGrave ? " from graveyard." : "."),
          "Cast Infectious Bite: fight any creature. Each opponent gets 1 poison counter. (1/10)",
          bouncer === "Temur Sabertooth"
            ? "Pay {1}{G}: Sabertooth bounces Eternal Witness. Recast → retrieve Bite. Repeat 10×."
            : "Kogla attacks → return Witness to hand. Recast → retrieve Bite. Repeat 10×.",
        ],
        color: "#27ae60",
      });
    }

    // Woodland Bellower in hand → puts Eternal Witness directly onto battlefield → poison loop
    const bellowerFindsWitness = bellowerCastable && !witnessOnBrd && !board.has("Eternal Witness");
    if (biteAvail && bellowerFindsWitness && hasBouncer && (infiniteManaActive || mana >= 20)) {
      results.push({
        priority: 13,
        category: "☠️ POISON WIN",
        headline: "Cast Woodland Bellower → put Eternal Witness onto battlefield → Infectious Bite loop",
        detail: "Woodland Bellower's ETB puts Eternal Witness directly onto the battlefield (no casting cost). Eternal Witness ETB retrieves Infectious Bite. Loop with bouncer for poison win.",
        steps: [
          "Cast Woodland Bellower ({4}{G}{G}).",
          "ETB: search library for Eternal Witness and put it onto the battlefield.",
          "Eternal Witness ETB: retrieve Infectious Bite from " + (biteInGrave ? "graveyard." : "— Bite is in hand, proceed to loop."),
          "Cast Infectious Bite: fight any creature. Each opponent gets 1 poison counter. (1/10)",
          bouncer === "Temur Sabertooth"
            ? "Pay {1}{G}: Sabertooth bounces Eternal Witness. Recast → retrieve Bite. Repeat 10×."
            : "Kogla attacks → return Eternal Witness to hand. Recast → retrieve Bite. Repeat 10×.",
          "After 10 casts all opponents have 10 poison counters and lose simultaneously.",
        ],
        color: "#27ae60",
      });
    }
  }

  // ---- GENERIC HIGH PRIORITY TUTOR WHEN NOTHING ELSE ----
  if (results.filter(r => r.priority >= 7).length === 0) {
    const tutors = hand.filter(c => CARDS[c]?.tags?.includes("tutor") && (CARDS[c]?.cmc <= mana || infiniteManaActive));
    if (tutors.length > 0) {
      const tutor = tutors[0];
      const targets = getPriorityTargets(battlefield, hand);
      results.push({
        priority: 6,
        category: "🎯 TUTOR",
        headline: `Cast ${tutor} → find ${targets[0] || "a combo piece"}`,
        detail: `Use ${tutor} to dig for your missing combo pieces. Priority: Ashaya > Priest of Titania > Temur Sabertooth > Quirion Ranger.`,
        steps: [`Cast ${tutor}. Priority targets: ${targets.slice(0,3).join(", ")}.`],
        color: "#5dade2",
      });
    }
  }

  // ---- HOLD AND PASS ----
  if (isMyTurn && results.filter(r => r.priority >= 8).length === 0 && mana <= 4) {
    results.push({
      priority: 3,
      category: "⏳ DRAW-GO",
      headline: "Play a land if available, then PASS TURN",
      detail: "This deck's core philosophy: play a land, hold your hand, pass turn. Let opponents reveal their strategies. You win by choosing the perfect moment to strike — not by playing proactively into interaction.",
      steps: [
        "Play your land drop for the turn.",
        "Keep all creatures in hand (Yeva gives them flash — they're safe there).",
        "Hold up mana for instant-speed responses.",
        "Look for an opportunity to flash in your combo on an opponent's end step."
      ],
      color: "#7f8c8d",
    });
  }

  // Sort by priority descending
  results.sort((a, b) => b.priority - a.priority);
  return results.slice(0, 5); // Top 5 recommendations
}

function getTutorOptions(target, hand, battlefield, mana, infiniteMana = false) {
  const options = [];
  const board = new Set(battlefield);
  const inHand = new Set(hand);

  if (CARDS[target]?.type === "creature" || CARDS[target]?.type === "land") {
    if (inHand.has("Worldly Tutor") && (mana >= 1 || infiniteMana) && CARDS[target]?.type === "creature") options.push("Worldly Tutor");
    if (inHand.has("Summoner's Pact") && CARDS[target]?.type === "creature") options.push("Summoner's Pact");
    if (inHand.has("Archdruid's Charm") && CARDS[target]?.type === "creature" && (mana >= 3 || infiniteMana)) options.push("Archdruid's Charm (mode 2: find creature)");
    if (inHand.has("Chord of Calling")) {
      const targetCmc = CARDS[target]?.cmc ?? 2;
      const chordCost = Math.max(0, targetCmc + 3 - (battlefield?.length ?? 0));
      if (mana >= chordCost || infiniteMana) options.push(`Chord of Calling (convoke — tap ${Math.min(targetCmc + 3, battlefield?.length ?? 0)} creatures)`);
    }
    if (inHand.has("Green Sun's Zenith") && (mana >= 1 || infiniteMana)) options.push("Green Sun's Zenith");
    if (board.has("Survival of the Fittest") && (mana >= 1 || infiniteMana) && hand.some(c => CARDS[c]?.type === "creature")) options.push("Survival of the Fittest");
    if (inHand.has("Crop Rotation") && CARDS[target]?.type === "land" && (mana >= 1 || infiniteMana)) options.push("Crop Rotation");
    if ((board.has("Elvish Reclaimer") || inHand.has("Elvish Reclaimer")) && CARDS[target]?.type === "land") options.push("Elvish Reclaimer");
    if (inHand.has("Sylvan Scrying") && CARDS[target]?.type === "land" && (mana >= 2 || infiniteMana)) options.push("Sylvan Scrying");
    if (inHand.has("Archdruid's Charm") && CARDS[target]?.type === "land" && (mana >= 3 || infiniteMana)) options.push("Archdruid's Charm");
    if (inHand.has("Natural Order") && (mana >= 4 || infiniteMana)) options.push("Natural Order");
  }
  return options;
}

function getSurvivalTargets(hand, battlefield) {
  const board = new Set(battlefield);
  const targets = [];
  if (!board.has("Ashaya, Soul of the Wild")) targets.push("Ashaya, Soul of the Wild");
  if (!board.has("Temur Sabertooth")) targets.push("Temur Sabertooth");
  if (!board.has("Priest of Titania") && !board.has("Circle of Dreams Druid") && !board.has("Karametra's Acolyte")) targets.push("Priest of Titania");
  if (!board.has("Quirion Ranger") && !board.has("Scryb Ranger")) targets.push("Quirion Ranger");
  if (!board.has("Hyrax Tower Scout")) targets.push("Hyrax Tower Scout");
  if (!board.has("Eternal Witness")) targets.push("Eternal Witness");
  return targets.slice(0, 4);
}

function getPriorityTargets(battlefield, hand) {
  const board = new Set(battlefield);
  const allNeeded = [
    "Ashaya, Soul of the Wild","Temur Sabertooth","Priest of Titania",
    "Quirion Ranger","Hyrax Tower Scout","Circle of Dreams Druid",
    "Karametra's Acolyte","Earthcraft","Wirewood Symbiote","Eternal Witness"
  ];
  return allNeeded.filter(c => !board.has(c));
}

// ============================================================
// UI COMPONENTS
// ============================================================
const COLORS = {
  bg:       "#0a120a",
  bgCard:   "#0f1e0f",
  bgHover:  "#152615",
  border:   "#1e3a1e",
  borderBright: "#2d5a2d",
  green1:   "#4a9e4a",
  green2:   "#6abf6a",
  green3:   "#8ed88e",
  text:     "#c8e6c8",
  textDim:  "#7aad7a",
  textMid:  "#a0cda0",
  accent:   "#ff6b35",
  gold:     "#f4d03f",
  blue:     "#5dade2",
  purple:   "#a569bd",
  red:      "#e74c3c",
};

const fonts = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
`;

function Tag({ label, color }) {
  return (
    <span style={{
      fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase",
      fontFamily: "'Cinzel', serif", fontWeight: 600,
      background: color + "22", border: `1px solid ${color}55`,
      color: color, borderRadius: "4px", padding: "2px 8px",
      whiteSpace: "nowrap",
    }}>{label}</span>
  );
}

function CardPill({ name, onRemove, zone }) {
  const zoneColors = { hand: COLORS.green1, battlefield: COLORS.green3, graveyard: COLORS.textDim };
  const c = zoneColors[zone] || COLORS.green1;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      background: c + "18", border: `1px solid ${c}44`,
      borderRadius: "5px", padding: "3px 8px 3px 10px",
      margin: "2px", color: COLORS.text,
      fontSize: "12px", fontFamily: "'Crimson Text', serif",
    }}>
      {name}
      {onRemove && (
        <button onClick={() => onRemove(name)} style={{
          background: "none", border: "none", color: "#ff8888",
          cursor: "pointer", fontSize: "14px", lineHeight: 1,
          padding: "0 0 1px 0", fontWeight: "bold",
        }}>×</button>
      )}
    </span>
  );
}

function CardInput({ label, zone, cards, onAdd, onRemove, placeholder }) {
  const [input, setInput] = useState("");
  const [suggs, setSuggs] = useState([]);

  const [secret, setSecret] = useState(null);

  const handleChange = (v) => {
    setInput(v);
    if (v.length < 2) { setSuggs([]); return; }
    // Check for secret card names via SHA-256 hash (async)
    crypto.subtle.digest("SHA-256",
      new TextEncoder().encode(v.toLowerCase())
    ).then(buf => {
      const hex = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,"0")).join("");
      if (SECRET_CARDS[hex]) {
        setSecret(SECRET_CARDS[hex]);
        setSuggs([]);
      } else {
        setSecret(null);
        setSuggs(ALL_CARD_NAMES.filter(n =>
          n.toLowerCase().includes(v.toLowerCase()) && !cards.includes(n)
        ).slice(0, 7));
      }
    });
  };

  const add = (name) => {
    onAdd(name);
    setInput("");
    setSuggs([]);
    setSecret(null);
  };

  const zoneColors = { hand: COLORS.green1, battlefield: COLORS.green3, graveyard: COLORS.textDim };
  const c = zoneColors[zone] || COLORS.green1;

  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "8px",
        marginBottom: "6px",
      }}>
        <label style={{
          fontFamily: "'Cinzel', serif", fontSize: "11px",
          letterSpacing: "2px", textTransform: "uppercase",
          color: c, fontWeight: 600,
        }}>{label}</label>
        <div style={{ flex: 1, height: "1px", background: c + "33" }} />
        <span style={{ fontSize: "11px", color: COLORS.textDim, fontFamily: "'Crimson Text', serif" }}>
          {cards.length} cards
        </span>
      </div>

      <div style={{
        minHeight: "44px", background: "#07100788",
        border: `1px solid ${c}33`, borderRadius: "8px",
        padding: "6px", marginBottom: "6px",
        display: "flex", flexWrap: "wrap", alignItems: "flex-start",
      }}>
        {cards.length === 0 && (
          <span style={{ color: COLORS.textDim, fontSize: "12px", padding: "4px 6px", fontStyle: "italic", fontFamily: "'Crimson Text', serif" }}>
            {placeholder}
          </span>
        )}
        {cards.map(n => <CardPill key={n} name={n} zone={zone} onRemove={onRemove} />)}
      </div>

      <div style={{ position: "relative" }}>
        <input
          value={input}
          onChange={e => handleChange(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && suggs.length > 0) add(suggs[0]);
            if (e.key === "Escape") setSuggs([]);
          }}
          placeholder="Type card name…"
          style={{
            width: "100%", boxSizing: "border-box",
            background: "#0a160a", border: `1px solid ${COLORS.border}`,
            borderRadius: "6px", padding: "8px 12px",
            color: COLORS.text, fontSize: "13px",
            fontFamily: "'Crimson Text', serif",
            outline: "none", transition: "border-color 0.2s",
          }}
          onFocus={e => e.target.style.borderColor = c}
          onBlur={e => { e.target.style.borderColor = COLORS.border; setTimeout(() => setSuggs([]), 200); }}
        />
        {suggs.length > 0 && (
          <div style={{
            position: "absolute", top: "100%", left: 0, right: 0, zIndex: 200,
            background: "#0d1f0d", border: `1px solid ${COLORS.borderBright}`,
            borderRadius: "6px", overflow: "hidden",
            boxShadow: "0 12px 40px rgba(0,0,0,0.8)",
          }}>
            {suggs.map(s => (
              <div key={s} onMouseDown={() => add(s)} style={{
                padding: "9px 14px", cursor: "pointer",
                color: COLORS.textMid, fontSize: "13px",
                fontFamily: "'Crimson Text', serif",
                borderBottom: `1px solid ${COLORS.border}`,
                transition: "background 0.1s",
              }}
                onMouseEnter={e => e.target.style.background = COLORS.bgHover}
                onMouseLeave={e => e.target.style.background = "transparent"}
              >
                {s}
                {CARDS[s] && (
                  <span style={{ marginLeft: "8px", fontSize: "11px", color: COLORS.textDim }}>
                    {CARDS[s].type} • CMC {CARDS[s].cmc}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
        {secret && (
          <div style={{
            position: "absolute", top: "100%", left: 0, right: 0, zIndex: 200,
            background: "#0d1a0d", border: `1px solid ${secret.color}55`,
            borderRadius: "6px", padding: "14px 16px",
            boxShadow: `0 12px 40px rgba(0,0,0,0.8), 0 0 20px ${secret.color}22`,
          }}>
            <div style={{ fontSize: "20px", marginBottom: "8px" }}>{secret.emoji}</div>
            {secret.lines.map((line, i) => (
              <div key={i} style={{
                fontSize: "13px", fontFamily: "'Crimson Text', serif",
                color: i === 0 ? secret.color : COLORS.textMid,
                fontStyle: i > 0 ? "italic" : "normal",
                marginBottom: i < secret.lines.length - 1 ? "6px" : 0,
                lineHeight: 1.5,
              }}>{undo(line)}</div>
            ))}
            <div style={{ marginTop: "10px", fontSize: "11px", color: COLORS.textDim,
              fontFamily: "'Cinzel', serif", letterSpacing: "1px" }}>
              — NOT IN THE 99 —
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AdviceCard({ advice, index }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div style={{
      background: COLORS.bgCard,
      border: `1px solid ${advice.color}44`,
      borderLeft: `3px solid ${advice.color}`,
      borderRadius: "10px", marginBottom: "10px",
      overflow: "hidden",
      boxShadow: index === 0 ? `0 0 24px ${advice.color}22` : "none",
      transition: "box-shadow 0.3s",
    }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          padding: "14px 18px", cursor: "pointer",
          display: "flex", alignItems: "center", gap: "12px",
        }}
      >
        <Tag label={advice.category} color={advice.color} />
        <span style={{
          flex: 1, color: index === 0 ? COLORS.text : COLORS.textMid,
          fontFamily: "'Cinzel', serif",
          fontSize: index === 0 ? "14px" : "13px",
          fontWeight: index === 0 ? 600 : 400,
        }}>
          {advice.headline}
        </span>
        <span style={{ color: COLORS.textDim, fontSize: "18px", userSelect: "none" }}>
          {open ? "▾" : "▸"}
        </span>
      </div>

      {open && (
        <div style={{ padding: "0 18px 16px", borderTop: `1px solid ${COLORS.border}` }}>
          <p style={{
            color: COLORS.textMid, fontFamily: "'Crimson Text', serif",
            fontSize: "14px", lineHeight: 1.6, margin: "12px 0 10px",
          }}>
            {advice.detail}
          </p>
          {advice.steps && advice.steps.length > 0 && (
            <div>
              <div style={{
                fontSize: "10px", letterSpacing: "2px", color: COLORS.textDim,
                fontFamily: "'Cinzel', serif", marginBottom: "8px",
              }}>STEP BY STEP</div>
              {advice.steps.map((step, i) => (
                <div key={i} style={{
                  display: "flex", gap: "10px", marginBottom: "6px",
                  alignItems: "flex-start",
                }}>
                  <span style={{
                    minWidth: "20px", height: "20px",
                    background: advice.color + "33",
                    border: `1px solid ${advice.color}66`,
                    borderRadius: "50%", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontSize: "10px", color: advice.color,
                    fontFamily: "'Cinzel', serif", fontWeight: 600,
                    marginTop: "2px",
                  }}>{i + 1}</span>
                  <span style={{
                    color: COLORS.text, fontSize: "13px",
                    fontFamily: "'Crimson Text', serif", lineHeight: 1.55,
                  }}>{step}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function QuickAdd({ zone, onAdd }) {
  const quickCards = {
    battlefield: ["Ashaya, Soul of the Wild","Temur Sabertooth","Priest of Titania","Quirion Ranger","Earthcraft","Gaea's Cradle","Yeva, Nature's Herald","Wirewood Lodge"],
    hand: ["Ashaya, Soul of the Wild","Quirion Ranger","Chord of Calling","Worldly Tutor","Infectious Bite","Eternal Witness","Natural Order","Summoner's Pact"],
    graveyard: ["Eternal Witness","Infectious Bite","Beast Within"],
  };
  const cards = quickCards[zone] || [];
  return (
    <div style={{ marginBottom: "6px" }}>
      <div style={{ fontSize: "10px", letterSpacing: "1.5px", color: COLORS.textDim, fontFamily: "'Cinzel', serif", marginBottom: "4px" }}>QUICK ADD</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
        {cards.map(c => (
          <button key={c} onClick={() => onAdd(c)} style={{
            background: COLORS.bgHover, border: `1px solid ${COLORS.border}`,
            borderRadius: "4px", padding: "3px 8px",
            color: COLORS.textDim, fontSize: "11px",
            fontFamily: "'Crimson Text', serif", cursor: "pointer",
            transition: "all 0.15s",
          }}
            onMouseEnter={e => { e.target.style.borderColor = COLORS.green1; e.target.style.color = COLORS.text; }}
            onMouseLeave={e => { e.target.style.borderColor = COLORS.border; e.target.style.color = COLORS.textDim; }}
          >{c}</button>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function YevaAdvisor() {
  const [hand, setHand] = useState([]);
  const [battlefield, setBattlefield] = useState([]);
  const [graveyard, setGraveyard] = useState([]);
  const [mana, setMana] = useState("3");
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [advice, setAdvice] = useState([]);
  const [showDebug, setShowDebug] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [jsonCopied, setJsonCopied] = useState(false);

  // Load state from ?s= URL param on first mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("s");
    if (!encoded) return;
    decompressState(encoded).then(state => {
      if (state.hand)        setHand(state.hand);
      if (state.battlefield) setBattlefield(state.battlefield);
      if (state.graveyard)   setGraveyard(state.graveyard);
      if (state.mana != null) setMana(String(state.mana));
      if (state.isMyTurn != null) setIsMyTurn(state.isMyTurn);
      // Clean the URL without reloading
      window.history.replaceState({}, "", window.location.pathname);
    }).catch(() => {}); // silently ignore malformed params
  }, []);
  // Each card is unique — adding to one zone removes it from the other two
  const addTo = (zone) => (card) => {
    if (zone !== "hand")        setHand(prev        => prev.filter(c => c !== card));
    if (zone !== "battlefield") setBattlefield(prev => prev.filter(c => c !== card));
    if (zone !== "graveyard")   setGraveyard(prev   => prev.filter(c => c !== card));
    const setter = zone === "hand" ? setHand : zone === "battlefield" ? setBattlefield : setGraveyard;
    setter(prev => prev.includes(card) ? prev : [...prev, card]);
  };
  const removeFrom = (setter) => (card) => setter(prev => prev.filter(c => c !== card));

  const reset = () => {
    setHand([]); setBattlefield([]); setGraveyard([]);
    setMana("3"); setIsMyTurn(false); setAdvice([]);
  };

  // Live analysis as state changes
  useEffect(() => {
    if (hand.length + battlefield.length > 0) {
      const results = analyzeGameState({ hand, battlefield, graveyard, manaAvailable: mana, isMyTurn });
      setAdvice(results);
    }
  }, [hand, battlefield, graveyard, mana, isMyTurn]);

  const elvesOnBoard     = battlefield.filter(c => CARDS[c]?.tags?.includes("elf")).length;
  const creaturesOnBoard = battlefield.filter(c => CARDS[c]?.type === "creature").length;
  const devotionOnBoard  = battlefield.reduce((sum, c) => sum + (CARDS[c]?.devotion ?? 0), 0);

  return (
    <>
      <style>{fonts}</style>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { margin: 0; padding: 0; background: ${COLORS.bg}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #07100788; }
        ::-webkit-scrollbar-thumb { background: #2d5a2d; border-radius: 3px; }
        input::placeholder { color: #3d6b3d; }
        @media (max-width: 768px) {
          .panels-wrapper { flex-direction: column; min-height: unset; }
          .panel-input {
            width: 100% !important; min-width: unset !important;
            border-right: none !important;
            border-bottom: 1px solid ${COLORS.border};
          }
          .panel-advice { padding: 16px !important; }
        }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: COLORS.bg,
        backgroundImage: `
          radial-gradient(ellipse at 20% 50%, #0f2a0f 0%, transparent 60%),
          radial-gradient(ellipse at 80% 20%, #0a1f0a 0%, transparent 50%)
        `,
        fontFamily: "'Crimson Text', serif",
        color: COLORS.text,
        padding: "0",
      }}>

        {/* HEADER */}
        <div style={{
          borderBottom: `1px solid ${COLORS.border}`,
          padding: "20px 28px 16px",
          background: "#0a150a",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "12px",
        }}>
          <div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: "22px",
              fontWeight: 700, color: COLORS.green3, letterSpacing: "1px",
            }}>
              Yeva Draw-Grow
            </div>
            <div style={{ fontSize: "12px", color: COLORS.textDim, letterSpacing: "2px", fontFamily: "'Cinzel', serif" }}>
              ADVISOR · MONO-GREEN CEDH · <span style={{ opacity: 0.5, letterSpacing: "1px" }}>v{__APP_VERSION__}</span><span style={{ opacity: 0.35, letterSpacing: "0.5px", fontSize: "9px" }}> ({__GIT_HASH__})</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{
              padding: "4px 12px", background: "#1a2e1a",
              border: `1px solid ${COLORS.border}`, borderRadius: "6px",
              fontSize: "12px", color: COLORS.textMid, fontFamily: "'Crimson Text', serif",
            }}>
              {creaturesOnBoard} creatures · {elvesOnBoard} elves · {devotionOnBoard}🌲 devotion
            </div>
            <button onClick={() => setShowDebug(true)} style={{
              background: "none", border: `1px solid ${COLORS.border}`,
              borderRadius: "6px", padding: "5px 14px",
              color: COLORS.textDim, cursor: "pointer",
              fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "1px",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.target.style.borderColor = "#5dade2"; e.target.style.color = "#5dade2"; }}
              onMouseLeave={e => { e.target.style.borderColor = COLORS.border; e.target.style.color = COLORS.textDim; }}
            >⌗ DEBUG</button>
            <button onClick={reset} style={{
              background: "none", border: `1px solid ${COLORS.border}`,
              borderRadius: "6px", padding: "5px 14px",
              color: COLORS.textDim, cursor: "pointer",
              fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "1px",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.target.style.borderColor = COLORS.red; e.target.style.color = COLORS.red; }}
              onMouseLeave={e => { e.target.style.borderColor = COLORS.border; e.target.style.color = COLORS.textDim; }}
            >↺ RESET</button>
          </div>

          {/* DEBUG MODAL */}
          {showDebug && (
            <div style={{
              position: "fixed", inset: 0, zIndex: 1000,
              background: "rgba(0,0,0,0.75)", display: "flex",
              alignItems: "center", justifyContent: "center",
              padding: "20px",
            }} onClick={() => setShowDebug(false)}>
              <div style={{
                background: "#0d1f0d", border: `1px solid ${COLORS.borderBright}`,
                borderRadius: "10px", padding: "24px", maxWidth: "780px", width: "100%",
                maxHeight: "80vh", overflowY: "auto",
                fontFamily: "monospace", fontSize: "12px", color: COLORS.text,
              }} onClick={e => e.stopPropagation()}>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: "13px", color: COLORS.green3, letterSpacing: "2px" }}>
                    ⌗ DEBUG — STATE DUMP
                  </span>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => {
                      const dump = {
                        version: `v${__APP_VERSION__} (${__GIT_HASH__})`,
                        turn: isMyTurn ? "My Turn" : "Opponent's Turn",
                        mana: Number(mana),
                        hand, battlefield, graveyard,
                        derived: { creaturesOnBoard, elvesOnBoard, devotionOnBoard },
                        advice: advice.map(a => ({ priority: a.priority, category: a.category, headline: a.headline })),
                      };
                      navigator.clipboard.writeText(JSON.stringify(dump, null, 2));
                      setJsonCopied(true);
                      setTimeout(() => setJsonCopied(false), 2000);
                    }} style={{
                      background: "#1a3a1a", border: `1px solid ${COLORS.border}`,
                      borderRadius: "5px", padding: "4px 10px",
                      color: jsonCopied ? "#5dade2" : COLORS.textMid,
                      cursor: "pointer", fontSize: "11px",
                      transition: "color 0.2s",
                    }}>{jsonCopied ? "✓ Copied!" : "📋 Copy JSON"}</button>
                    <button onClick={() => {
                      const state = { hand, battlefield, graveyard, mana: Number(mana), isMyTurn };
                      compressState(state).then(encoded => {
                        const url = `${window.location.origin}${window.location.pathname}?s=${encoded}`;
                        navigator.clipboard.writeText(url);
                        setLinkCopied(true);
                        setTimeout(() => setLinkCopied(false), 2000);
                      });
                    }} style={{
                      background: "#1a2a3a", border: `1px solid ${COLORS.border}`,
                      borderRadius: "5px", padding: "4px 10px",
                      color: linkCopied ? "#5dade2" : COLORS.textMid,
                      cursor: "pointer", fontSize: "11px",
                      transition: "color 0.2s",
                    }}>{linkCopied ? "✓ Copied!" : "🔗 Copy Link"}</button>
                    <button onClick={() => setShowDebug(false)} style={{
                      background: "none", border: `1px solid ${COLORS.border}`,
                      borderRadius: "5px", padding: "4px 10px",
                      color: COLORS.textDim, cursor: "pointer", fontSize: "11px",
                    }}>✕ Close</button>
                  </div>
                </div>

                {[
                  { label: "VERSION", value: `v${__APP_VERSION__} (${__GIT_HASH__})` },
                  { label: "TURN",    value: isMyTurn ? "My Turn" : "Opponent's Turn" },
                  { label: "MANA",    value: mana },
                ].map(({ label, value }) => (
                  <div key={label} style={{ marginBottom: "10px" }}>
                    <div style={{ color: "#5dade2", marginBottom: "3px", letterSpacing: "1px" }}>{label}</div>
                    <div style={{ paddingLeft: "12px", color: COLORS.textMid }}>{value}</div>
                  </div>
                ))}

                {[
                  { label: "HAND",        cards: hand },
                  { label: "BATTLEFIELD", cards: battlefield },
                  { label: "GRAVEYARD",   cards: graveyard },
                ].map(({ label, cards }) => (
                  <div key={label} style={{ marginBottom: "10px" }}>
                    <div style={{ color: "#5dade2", marginBottom: "3px", letterSpacing: "1px" }}>
                      {label} <span style={{ color: COLORS.textDim }}>({cards.length})</span>
                    </div>
                    {cards.length === 0
                      ? <div style={{ paddingLeft: "12px", color: COLORS.textDim, fontStyle: "italic" }}>empty</div>
                      : cards.map(c => (
                          <div key={c} style={{ paddingLeft: "12px", color: COLORS.textMid }}>
                            · {c} <span style={{ color: COLORS.textDim }}>({CARDS[c]?.type}, cmc {CARDS[c]?.cmc})</span>
                          </div>
                        ))
                    }
                  </div>
                ))}

                <div style={{ marginBottom: "10px" }}>
                  <div style={{ color: "#5dade2", marginBottom: "3px", letterSpacing: "1px" }}>DERIVED</div>
                  <div style={{ paddingLeft: "12px", color: COLORS.textMid }}>
                    · {creaturesOnBoard} creatures · {elvesOnBoard} elves · {devotionOnBoard} devotion
                  </div>
                </div>

                <div>
                  <div style={{ color: "#5dade2", marginBottom: "3px", letterSpacing: "1px" }}>
                    ADVISOR OUTPUT <span style={{ color: COLORS.textDim }}>({advice.length} suggestions, sorted by priority)</span>
                  </div>
                  {advice.length === 0
                    ? <div style={{ paddingLeft: "12px", color: COLORS.textDim, fontStyle: "italic" }}>no advice generated</div>
                    : [...advice].sort((a,b) => b.priority - a.priority).map((a, i) => (
                        <div key={i} style={{
                          marginBottom: "5px",
                          borderLeft: `2px solid ${a.color ?? COLORS.border}`,
                          paddingLeft: "10px",
                        }}>
                          <span style={{ color: COLORS.textDim }}>[{a.priority}]</span>{" "}
                          <span style={{ color: a.color ?? COLORS.text }}>{a.category}</span>{" "}
                          <span style={{ color: COLORS.textMid }}>— {a.headline}</span>
                        </div>
                      ))
                  }
                </div>

              </div>
            </div>
          )}
        </div>

        <div className="panels-wrapper" style={{
          display: "flex", gap: "0", minHeight: "calc(100vh - 75px)",
        }}>

          {/* LEFT PANEL — Input */}
          <div className="panel-input" style={{
            width: "360px", minWidth: "300px",
            borderRight: `1px solid ${COLORS.border}`,
            padding: "20px", overflowY: "auto",
            background: "#09130988",
          }}>
            {/* Turn + Mana */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: "11px",
                letterSpacing: "2px", color: COLORS.textDim,
                marginBottom: "10px",
              }}>GAME STATE</div>
              <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "12px" }}>
                {["My Turn", "Opponent's Turn"].map(label => {
                  const isMine = label === "My Turn";
                  const active = isMyTurn === isMine;
                  return (
                    <button key={label} onClick={() => setIsMyTurn(isMine)} style={{
                      flex: 1, padding: "7px",
                      background: active ? COLORS.green1 + "33" : "transparent",
                      border: `1px solid ${active ? COLORS.green1 : COLORS.border}`,
                      borderRadius: "6px", color: active ? COLORS.text : COLORS.textDim,
                      cursor: "pointer", fontFamily: "'Cinzel', serif",
                      fontSize: "10px", letterSpacing: "1px", transition: "all 0.15s",
                    }}>{label.toUpperCase()}</button>
                  );
                })}
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <label style={{ fontFamily: "'Cinzel', serif", fontSize: "11px", color: COLORS.textDim, letterSpacing: "1px", whiteSpace: "nowrap" }}>MANA AVAILABLE</label>
                <input
                  type="number" min="0" max="99" value={mana}
                  onChange={e => setMana(e.target.value)}
                  style={{
                    width: "70px", background: "#07100788",
                    border: `1px solid ${COLORS.border}`, borderRadius: "6px",
                    padding: "7px 10px", color: COLORS.gold,
                    fontFamily: "'Cinzel', serif", fontSize: "16px",
                    fontWeight: 600, textAlign: "center", outline: "none",
                  }}
                />
              </div>
            </div>

            <div style={{ height: "1px", background: COLORS.border, marginBottom: "16px" }} />

            {/* Hand */}
            <QuickAdd zone="hand" onAdd={addTo("hand")} />
            <CardInput label="Hand" zone="hand" cards={hand}
              onAdd={addTo("hand")} onRemove={removeFrom(setHand)}
              placeholder="Cards in your hand…" />

            {/* Battlefield */}
            <QuickAdd zone="battlefield" onAdd={addTo("battlefield")} />
            <CardInput label="Battlefield" zone="battlefield" cards={battlefield}
              onAdd={addTo("battlefield")} onRemove={removeFrom(setBattlefield)}
              placeholder="Permanents you control…" />

            {/* Graveyard */}
            <QuickAdd zone="graveyard" onAdd={addTo("graveyard")} />
            <CardInput label="Graveyard" zone="graveyard" cards={graveyard}
              onAdd={addTo("graveyard")} onRemove={removeFrom(setGraveyard)}
              placeholder="Cards in your graveyard…" />

          </div>

          {/* RIGHT PANEL — Advice */}
          <div className="panel-advice" style={{ flex: 1, padding: "20px 24px", overflowY: "auto" }}>
            {advice.length === 0 ? (
              <div style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                height: "100%", gap: "16px",
                color: COLORS.textDim, textAlign: "center",
              }}>
                <div style={{ fontSize: "48px", opacity: 0.3 }}>🌿</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: "16px", color: COLORS.textDim }}>
                  Add cards to your hand or battlefield
                </div>
                <div style={{ fontSize: "14px", maxWidth: "400px", lineHeight: 1.6 }}>
                  The advisor will automatically detect active combos, optimal plays, and winning lines based on your current game state.
                </div>
              </div>
            ) : (
              <div>
                <div style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  marginBottom: "20px",
                }}>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: "13px",
                    letterSpacing: "2px", color: COLORS.textDim,
                  }}>RECOMMENDED PLAYS</div>
                  <div style={{ flex: 1, height: "1px", background: COLORS.border }} />
                  <div style={{ fontSize: "12px", color: COLORS.textDim }}>
                    {advice.length} line{advice.length !== 1 ? "s" : ""} found
                  </div>
                </div>

                {advice.map((a, i) => (
                  <AdviceCard key={i} advice={a} index={i} />
                ))}

                {/* Philosophy reminder */}
                <div style={{
                  marginTop: "20px", padding: "14px 18px",
                  background: "#0a150a", border: `1px solid ${COLORS.border}`,
                  borderRadius: "8px",
                }}>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: "10px",
                    letterSpacing: "2px", color: COLORS.textDim, marginBottom: "8px",
                  }}>DRAW-GO REMINDER</div>
                  <div style={{ fontSize: "13px", color: COLORS.textDim, lineHeight: 1.6 }}>
                    Play a land. Pass turn. Hold your creatures in hand — Yeva gives them flash and they're safer there. Win on the stack when opponents are tapped out.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}


