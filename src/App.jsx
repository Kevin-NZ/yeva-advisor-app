import React, { useState, useEffect, useRef, useCallback } from "react";

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
  "Arbor Elf":             { type:"creature", cmc:1, tags:["dork","elf","1drop","arbor"], tapsFor:"arbor" , devotion:1, role:"dork-combo"},
  "Elvish Spirit Guide":   { type:"creature", cmc:2, tags:["dork","elf","free-mana"], tapsFor:1 , devotion:1, role:"fast-mana"},
  "Dryad Arbor":           { type:"land",    cmc:0, tags:["dork","land","forest"], tapsFor:1 , devotion:0},
  // MANA DORKS (2-drop)
  "Quirion Ranger":        { type:"creature", cmc:1, tags:["combo","elf","untap","ranger"], tapsFor:0 , devotion:1},
  "Scryb Ranger":          { type:"creature", cmc:2, tags:["combo","elf","untap","ranger","flash"], tapsFor:0 , devotion:1},
  "Wirewood Symbiote":     { type:"creature", cmc:1, tags:["combo","elf","untap","symbiote"], tapsFor:0 , devotion:1},
  // BIG MANA DORKS
  "Priest of Titania":     { type:"creature", cmc:2, tags:["dork","elf","big-dork","infinite-dork"], tapsFor:"elves" , devotion:1},
  "Elvish Archdruid":      { type:"creature", cmc:3, tags:["dork","elf","big-dork","infinite-dork","pump"], tapsFor:"elves" , devotion:2},
  "Circle of Dreams Druid":{ type:"creature", cmc:3, tags:["dork","elf","big-dork","infinite-dork"], tapsFor:"creatures" , devotion:2},
  "Karametra's Acolyte":   { type:"creature", cmc:4, tags:["dork","big-dork","infinite-dork","human"], tapsFor:"devotion" , devotion:1},
  "Fanatic of Rhonas":     { type:"creature", cmc:4, tags:["dork","elf","big-dork","human"], tapsFor:4 , devotion:1, role:"big-dork-combo"},
  "Hope Tender":           { type:"creature", cmc:2, tags:["dork","elf","human","untap-lands","exert"], tapsFor:1 , devotion:1, role:"untap-combo"},
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
  "Elvish Guidance":       { type:"enchantment", cmc:3, tags:["enchant-land","ramp","aura","elf-synergy"], devotion:1, role:"elf-mana"},
  // STAX / INTERACTION
  "Collector Ouphe":       { type:"creature", cmc:2, tags:["stax","hate"] , devotion:1},
  "Destiny Spinner":       { type:"creature", cmc:2, tags:["protection","stax"] , devotion:1, role:"haste-protection"},
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
  "Nature's Rhythm":       { type:"enchantment", cmc:2, tags:["draw","engine","land-draw"] , devotion:1, role:"land-draw"},
  // OTHER UTILITY
  "Yisan, the Wanderer Bard": { type:"creature", cmc:3, tags:["tutor","engine","yisan"] , devotion:1},
  "Magus of the Candelabra": { type:"creature", cmc:1, tags:["combo","untap-lands"] , devotion:1},
  "Tireless Provisioner":  { type:"creature", cmc:3, tags:["combo","landfall","treasure"] , devotion:1, role:"ramp-combo"},
  "Badgermole Cub":        { type:"creature", cmc:2, tags:["combo","mana-doubler"] , devotion:1, role:"haste-combo"},
  "Woodcaller Automaton":  { type:"creature", cmc:8, tags:["combo","untap-land"] , devotion:2},
  "Sowing Mycospawn":      { type:"creature", cmc:5, tags:["removal","land-tutor"] , devotion:1},
  "Formidable Speaker":    { type:"creature", cmc:3, tags:["combo","tutor","untap","elf"] , devotion:1},
  "Chomping Changeling":   { type:"creature", cmc:3, tags:["elf","changeling"] , devotion:1},
  "Delighted Halfling":    { type:"creature", cmc:2, tags:["dork","protection"] , devotion:1, role:"protection"},
  "Elvish Reclaimer":      { type:"creature", cmc:1, tags:["land-tutor","elf","1drop"] , devotion:1},
  "Yeva, Nature's Herald": { type:"creature", cmc:4, tags:["commander","flash-enabler"] , devotion:2},

  // ── VARIANT / SIDEBOARD CARDS ──────────────────────────────────────────
  // Mana dorks & big dorks
  "Joraga Treespeaker":    { type:"creature", cmc:1, tags:["dork","elf","1drop","big-dork","infinite-dork"], tapsFor:"elves", devotion:1, role:"dork-combo"},
  "Marwyn, the Nurturer":  { type:"creature", cmc:3, tags:["dork","elf","big-dork","infinite-dork","human"], tapsFor:"elves", devotion:1, role:"big-dork-combo"},
  "Selvala, Heart of the Wilds": { type:"creature", cmc:3, tags:["dork","elf","big-dork","human"], tapsFor:"power", devotion:2, role:"big-dork-combo"},
  "Wirewood Channeler":    { type:"creature", cmc:4, tags:["dork","elf","big-dork","infinite-dork"], tapsFor:"elves", devotion:1, role:"big-dork-combo"},
  "Defiler of Vigor":      { type:"creature", cmc:5, tags:["combo","storm","phyrexian"], devotion:4, role:"storm-engine"},
  // Untap & haste combo pieces
  "Ley Weaver":            { type:"creature", cmc:4, tags:["combo","human","untap-lands"], devotion:1, role:"untap-combo"},
  "Cloudstone Curio":      { type:"artifact", cmc:3, tags:["combo","bounce","sabertooth"], devotion:0, role:"bounce-combo"},
  "Thousand-Year Elixir":  { type:"artifact", cmc:3, tags:["combo","haste","untap"], devotion:0, role:"haste-combo"},
  "Concordant Crossroads": { type:"enchantment", cmc:1, tags:["combo","haste","enchantment"], devotion:1, role:"haste-enabler"},
  "Surrak and Goreclaw":   { type:"creature", cmc:5, tags:["combo","haste","pump"], devotion:2, role:"haste-enabler"},
  "Touch of Vitae":        { type:"instant", cmc:2, tags:["combo","haste","untap","instant"], devotion:0, role:"haste-combo"},
  "Ulvenwald Oddity":      { type:"creature", cmc:4, tags:["combo","haste","mana-sink"], devotion:2, role:"haste-enabler"},
  "Vitalize":              { type:"instant", cmc:1, tags:["combo","untap","storm","instant"], devotion:0, role:"storm-ritual"},
  "Leyline of Abundance":  { type:"enchantment", cmc:4, tags:["combo","ramp","elf-synergy","enchantment"], devotion:2, role:"mana-boost"},
  "Great Oak Guardian":    { type:"creature", cmc:6, tags:["combo","flash","pump","untap"], devotion:2, role:"flash-combo"},
  "Genesis Hydra":         { type:"creature", cmc:2, tags:["combo","outlet","etb"], devotion:1, role:"infinite-outlet"},
  "Agatha's Soul Cauldron":{ type:"artifact", cmc:2, tags:["combo","graveyard","recursion"], devotion:0, role:"graveyard-engine"},
  "Beastrider Vanguard":   { type:"creature", cmc:3, tags:["combo","outlet","mana-sink"], devotion:1, role:"infinite-outlet"},
  "Lotus Cobra":           { type:"creature", cmc:2, tags:["combo","landfall","ramp"], devotion:1, role:"ramp-combo"},
  "Nissa, Resurgent Animist": { type:"creature", cmc:3, tags:["combo","elf","landfall","tutor"], devotion:2, role:"ramp-combo"},
  // Tutors
  "Finale of Devastation": { type:"sorcery", cmc:2, tags:["tutor","finisher","sorcery"], devotion:0, role:"tutor-finisher"},
  "Invasion of Ikoria":    { type:"battle", cmc:4, tags:["tutor","recursion"], devotion:0, role:"tutor"},
  "Skyshroud Poacher":     { type:"creature", cmc:4, tags:["tutor","elf","engine"], devotion:1, role:"elf-tutor"},
  "Treefolk Harbinger":    { type:"creature", cmc:1, tags:["tutor","treefolk","1drop"], devotion:1, role:"tutor"},
  "Lignify":               { type:"enchantment", cmc:2, tags:["removal","aura","treefolk"], devotion:1, role:"removal"},
  // Ramp & utility lands
  "Carpet of Flowers":     { type:"enchantment", cmc:1, tags:["ramp","enchantment","meta"], devotion:1, role:"meta-ramp"},
  "Castle Garenbrig":      { type:"land", cmc:0, tags:["land","ramp","combo"], devotion:0},
  "Bonders' Enclave":      { type:"land", cmc:0, tags:["land","draw","utility"], devotion:0},
  "Bridgeworks Battle":    { type:"land", cmc:0, tags:["land","removal","utility"], devotion:0},
  "Mariposa Military Base":{ type:"land", cmc:0, tags:["land","draw","utility"], devotion:0},
  "Mikokoro, Center of the Sea": { type:"land", cmc:0, tags:["land","utility","draw"], devotion:0},
  "Ominous Cemetery":      { type:"land", cmc:0, tags:["land","removal","utility"], devotion:0},
  "Turntimber Symbiosis":  { type:"land", cmc:0, tags:["land","utility","forest"], devotion:0},
  "Emerald Medallion":     { type:"artifact", cmc:2, tags:["ramp","cost-reducer"], devotion:0, role:"cost-reducer"},
  "Nylea, Keen-Eyed":      { type:"creature", cmc:5, tags:["combo","mana-sink","cost-reducer"], devotion:4, role:"storm-engine"},
  // Draw engines
  "Sylvan Library":        { type:"enchantment", cmc:2, tags:["draw","engine","enchantment"], devotion:1, role:"draw-engine"},
  "Guardian Project":      { type:"enchantment", cmc:4, tags:["draw","engine","enchantment"], devotion:1, role:"draw-engine"},
  "Runic Armasaur":        { type:"creature", cmc:3, tags:["draw","engine","meta"], devotion:1, role:"draw-engine"},
  "Compost":               { type:"enchantment", cmc:2, tags:["draw","engine","meta","enchantment"], devotion:1, role:"meta-draw"},
  "Viridian Revel":        { type:"enchantment", cmc:3, tags:["draw","engine","meta","enchantment"], devotion:1, role:"meta-draw"},
  // Interaction & removal
  "Reclamation Sage":      { type:"creature", cmc:3, tags:["removal","elf","etb"], devotion:1, role:"removal"},
  "Outland Liberator":     { type:"creature", cmc:2, tags:["removal","werewolf"], devotion:1, role:"removal"},
  "Manglehorn":            { type:"creature", cmc:3, tags:["removal","stax","hate"], devotion:1, role:"removal"},
  "Nature's Claim":        { type:"instant", cmc:1, tags:["removal","instant"], devotion:0, role:"removal"},
  "Ram Through":           { type:"instant", cmc:2, tags:["removal","instant","trample"], devotion:0, role:"removal"},
  "Tail Swipe":            { type:"instant", cmc:2, tags:["removal","instant"], devotion:0, role:"removal"},
  "Bouncer's Beatdown":    { type:"instant", cmc:2, tags:["removal","instant","meta"], devotion:0, role:"removal"},
  "Kenrith's Transformation": { type:"enchantment", cmc:2, tags:["removal","aura","draw"], devotion:1, role:"removal"},
  "King of the Coldblood Curse": { type:"creature", cmc:4, tags:["removal","etb","commander-hate"], devotion:2, role:"removal"},
  "Insidious Fungus":      { type:"creature", cmc:3, tags:["removal","land-tutor","fungus"], devotion:1, role:"removal"},
  "Saryth, the Viper's Fang": { type:"creature", cmc:4, tags:["protection","untap","dork"], devotion:2, role:"protection"},
  "Skullwinder":           { type:"creature", cmc:3, tags:["recursion","etb","snake","politics"], devotion:1, role:"recursion"},
  "Noxious Revival":       { type:"instant", cmc:0, tags:["recursion","graveyard","instant","free"], devotion:0, role:"recursion"},
  "Emerald Charm":         { type:"instant", cmc:1, tags:["utility","untap","removal","instant"], devotion:0, role:"ritual"},
  "Warping Wail":          { type:"instant", cmc:2, tags:["utility","counter","removal","instant"], devotion:0, role:"interaction"},
  "Scavenging Ooze":       { type:"creature", cmc:2, tags:["hate","graveyard"], devotion:1, role:"hate"},
  "Autumn's Veil":         { type:"instant", cmc:1, tags:["protection","instant","meta"], devotion:0, role:"protection"},
  "Veil of Summer":        { type:"instant", cmc:1, tags:["protection","instant","draw"], devotion:0, role:"protection"},
  // Stax
  "Root Maze":             { type:"enchantment", cmc:2, tags:["stax","enchantment"], devotion:1, role:"stax"},
  "Orb of Dreams":         { type:"artifact", cmc:3, tags:["stax"], devotion:0, role:"stax"},
  "Null Rod":              { type:"artifact", cmc:2, tags:["stax","hate"], devotion:0, role:"stax"},
  "Thorn of Amethyst":     { type:"artifact", cmc:2, tags:["stax","tax"], devotion:0, role:"stax"},
  "Trinisphere":           { type:"artifact", cmc:3, tags:["stax"], devotion:0, role:"stax"},
  "Titania's Song":        { type:"enchantment", cmc:4, tags:["stax","hate","enchantment"], devotion:1, role:"stax"},
  "Vexing Bauble":         { type:"artifact", cmc:1, tags:["stax","hate","free"], devotion:0, role:"stax"},
  "The Cabbage Merchant":  { type:"creature", cmc:3, tags:["stax","storm-hate"], devotion:1, role:"stax"},
};

const ALL_CARD_NAMES = Object.keys(CARDS).sort();

// Short-name alias map: maps "Ashaya" → "Ashaya, Soul of the Wild" etc.
// Derived automatically: for each card with a comma, the part before the comma is an alias.
// Also adds first-word aliases for unambiguous single-word first names.
const CARD_ALIASES = (() => {
  const map = new Map(); // alias (lowercase) → canonical name
  for (const name of ALL_CARD_NAMES) {
    // Full name always maps to itself
    map.set(name.toLowerCase(), name);
    // "Firstname, Rest of Name" → alias is "Firstname"
    const commaIdx = name.indexOf(",");
    if (commaIdx !== -1) {
      const before = name.slice(0, commaIdx).trim();
      if (before && !map.has(before.toLowerCase())) {
        map.set(before.toLowerCase(), name);
      }
    }
  }
  // Resolve ambiguous aliases — if two cards share a first-word, remove that alias
  const counts = new Map();
  for (const name of ALL_CARD_NAMES) {
    const commaIdx = name.indexOf(",");
    if (commaIdx !== -1) {
      const before = name.slice(0, commaIdx).trim().toLowerCase();
      counts.set(before, (counts.get(before) || 0) + 1);
    }
  }
  for (const [alias, count] of counts) {
    if (count > 1) map.delete(alias);
  }
  return map;
})();


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
    description: "Infinite mana with only 2 cards. Ashaya turns Argothian Elder into a Forest/land, allowing Elder to target itself with its 'untap two lands' ability. Tap Elder as a land for {G} (via Ashaya making it a Forest), then activate Elder's untap ability targeting itself + any other land. Elder untaps, tap it again for {G}. Repeat.",
    requires: ["Ashaya, Soul of the Wild", "Argothian Elder"],
    priority: 10,
    type: "infinite-mana",
    lines: [
      "Ashaya in play — Argothian Elder is now a Forest land (taps for {G} like any Forest).",
      "Tap Argothian Elder for {G} (its Forest mana ability via Ashaya).",
      "Activate Argothian Elder's tap ability ({T}): untap two target lands — target itself AND any other land.",
      "Elder resolves: it untaps itself. It is now untapped again and ready.",
      "Tap Elder for {G} again. Also tap the second untapped land for bonus mana. Repeat for infinite {G}.",
      "This is a clean 2-card combo. The second land untapped each loop is a free bonus.",
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

  // ── 4b. Argothian Elder + Deserted Temple + Wirewood Lodge + Big Land ──
  {
    id: "argothian_deserted_lodge",
    name: "Argothian Elder + Deserted Temple + Wirewood Lodge + Big Land",
    onBattlefield: ["Argothian Elder", "Deserted Temple", "Wirewood Lodge"],
    mustPreExist: ["Argothian Elder"],
    description: "Infinite mana. Elder taps two lands: Cradle + Deserted Temple. Temple then untaps Cradle for a second tap. Lodge untaps Elder. Result: Cradle taps twice per loop while only spending {G} (Lodge). Net: (2 × Cradle output) − 1 per loop. Enormous output with even a modest Cradle.",
    requires: ["Argothian Elder", "Deserted Temple", "Wirewood Lodge"],
    needsAlso: ["Gaea's Cradle", "Nykthos, Shrine to Nyx", "Itlimoc, Cradle of the Sun"],
    priority: 10,
    type: "infinite-mana",
    lines: [
      "Argothian Elder + Deserted Temple + Wirewood Lodge + Gaea's Cradle or Nykthos on battlefield.",
      "Tap big land for N mana.",
      "Tap Argothian Elder: untap two lands — target the big land AND Deserted Temple.",
      "Tap Deserted Temple (free — just tap): untap the big land again.",
      "Tap big land again for N mana. (Two taps of Cradle per Elder activation.)",
      "Spend {G}: activate Wirewood Lodge, untapping Argothian Elder.",
      "Net: (2N − 1) mana per loop. With even a 3-creature Cradle nets 5 per loop. Repeat for infinite.",
    ]
  },

  // ── 5. Earthcraft + Ashaya + Quirion Ranger + Yavimaya ────────────────
  // IMPORTANT: Ashaya makes creatures Forest lands but NOT basic lands.
  // Earthcraft requires "basic land" — needs Yavimaya to make lands basic Forests.
  {
    id: "earthcraft_ashaya_quirion",
    name: "Earthcraft + Ashaya + Quirion Ranger + Yavimaya",
    onBattlefield: ["Earthcraft", "Ashaya, Soul of the Wild", "Quirion Ranger", "Yavimaya, Cradle of Growth"],
    description: "Infinite mana. Earthcraft requires basic lands — Ashaya makes creatures Forest lands but NOT basic. Yavimaya, Cradle of Growth fixes this by making all lands (including creature-lands) basic Forests. With Yavimaya + Ashaya, tap Quirion Ranger as a Forest for {G}, tap another creature via Earthcraft to untap a basic Forest (=any creature via Yavimaya+Ashaya), bounce Ranger to untap the dork, recast — net {G} each loop.",
    requires: ["Earthcraft", "Ashaya, Soul of the Wild", "Quirion Ranger", "Yavimaya, Cradle of Growth"],
    priority: 9,
    type: "infinite-mana",
    lines: [
      "Earthcraft + Ashaya + Quirion Ranger + Yavimaya, Cradle of Growth + at least one other creature on battlefield.",
      "WHY YAVIMAYA: Ashaya makes creatures Forest lands but not BASIC lands. Earthcraft needs basic lands. Yavimaya makes all lands basic Forests — including creature-lands via Ashaya.",
      "Tap Quirion Ranger as a Forest (via Ashaya+Yavimaya) for {G}.",
      "Tap another creature to Earthcraft: untap a basic Forest (all creature-lands are basic via Yavimaya) — untap Quirion Ranger.",
      "Activate Quirion Ranger: return itself to hand, untapping any other creature.",
      "Recast Quirion Ranger for {G}. Net: {G} per loop.",
      "Repeat for infinite green mana.",
    ]
  },

  // ── 5b. Earthcraft + Ashaya + Scryb Ranger + Yavimaya (Flash! Instant Speed) ─
  // Same Yavimaya requirement as Quirion variant — Ashaya creatures are non-basic.
  {
    id: "earthcraft_ashaya_scryb",
    name: "Earthcraft + Ashaya + Scryb Ranger + Yavimaya (Instant Speed!)",
    onBattlefield: ["Earthcraft", "Ashaya, Soul of the Wild", "Scryb Ranger", "Yavimaya, Cradle of Growth"],
    description: "Infinite mana at instant speed. Same as the Quirion Ranger variant but Scryb Ranger has flash — goes off on any opponent's turn without needing Yeva. Requires Yavimaya to make creature-lands basic (Ashaya alone is not enough for Earthcraft). Costs {1}{G} to recast, so needs two Earthcraft targets per loop.",
    requires: ["Earthcraft", "Ashaya, Soul of the Wild", "Scryb Ranger", "Yavimaya, Cradle of Growth"],
    priority: 9,
    type: "infinite-mana",
    lines: [
      "Earthcraft + Ashaya + Scryb Ranger + Yavimaya + at least two other creatures on battlefield.",
      "KEY ADVANTAGE: Scryb Ranger has flash — this loop works on any player's turn without Yeva.",
      "WHY YAVIMAYA: Ashaya makes creatures Forest lands but not BASIC. Yavimaya makes all lands basic Forests.",
      "Tap Scryb Ranger as a Forest for {G}.",
      "Tap two creatures to Earthcraft: untap two basic Forests (all creature-lands are basic via Yavimaya+Ashaya), untapping Scryb Ranger and one other creature.",
      "Activate Scryb Ranger: return itself to hand, untapping any creature.",
      "Recast Scryb Ranger for {1}{G}. Net: {G} per loop.",
      "Repeat for infinite green mana at instant speed.",
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
    description: "Infinite mana. Symbiote bounces a 1-drop elf to untap the big dork. Sabertooth bounces Symbiote to hand (resetting its once-per-turn restriction — it re-enters as a new object). Recast both. Net mana when dork produces ≥5 (covering {1}{G} Sabertooth bounce + {G} Symbiote recast + {G} 1-drop recast = {3}{G} total cost).",
    requires: ["Temur Sabertooth", "Wirewood Symbiote"],
    needsBigDork: 5,
    needsOneDrop: true,
    priority: 8,
    type: "infinite-mana",
    lines: [
      "Temur Sabertooth + Wirewood Symbiote + a 1-drop elf + a dork tapping for ≥5 all on battlefield.",
      "Tap the big dork for ≥5 mana.",
      "Activate Wirewood Symbiote: return the 1-drop elf to hand, untapping the big dork.",
      "Pay {1}{G}: Sabertooth bounces Wirewood Symbiote to hand — this resets its once-per-turn restriction (re-enters as a new object).",
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
    description: "Infinite mana. Circle of Dreams Druid taps for {G} per creature (=Gaea's Cradle on a body). Karametra's Acolyte taps for {G} per green devotion. Wirewood Symbiote bounces a 1-drop to untap the dork; Sabertooth bounces Symbiote resetting its once-per-turn restriction. Net positive when output ≥5 (Symbiote loop) or ≥6 (Scout loop).",
    requires: ["Ashaya, Soul of the Wild"],
    needsAlso: ["Circle of Dreams Druid", "Karametra's Acolyte"],
    needsBigDork: 5,
    priority: 8,
    type: "infinite-mana",
    lines: [
      "Circle of Dreams Druid (=Gaea's Cradle on a body) OR Karametra's Acolyte (=Nykthos on a body).",
      "With Ashaya, these creatures are Forests — enabling all the standard Ranger/Symbiote/Scout loops.",
      "Wirewood Symbiote loop: tap Circle/Acolyte for X mana, Symbiote bounces a 1-drop to untap it. Sabertooth bounces Symbiote (resetting once-per-turn). Net positive when X ≥ 5.",
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
    description: "Ashaya + Quirion Ranger + any 1-mana dork loops infinitely but nets 0 mana. Beast Whisperer draws on every creature cast (any turn). Glademuse draws only off-turn. Drawing your library converts to infinite mana via Tireless Provisioner or Elvish Spirit Guide. This is a library-draw engine -- you need a conversion piece to win.",
    requires: ["Ashaya, Soul of the Wild", "Quirion Ranger"],
    needsDrawEngine: true,
    needsOneDrop: true,
    needsInfiniteMana: true,   // mana-neutral loop alone cannot convert to a win without inf mana
    priority: 9,
    type: "win-draw",
    lines: [
      "Ashaya + Quirion Ranger + any 1-mana dork + Beast Whisperer or Glademuse on battlefield.",
      "TIMING: Beast Whisperer triggers on any turn (cast a creature = draw). Glademuse only triggers off-turn.",
      "Tap the 1-mana dork for {G}. Cast Quirion Ranger for {G} -- trigger draw engine (draw 1 card).",
      "Bounce Quirion Ranger to untap the dork. Loop is mana-neutral but draws 1 card per iteration.",
      "Draw your entire library at zero net mana cost.",
      "CONVERSION: find Tireless Provisioner (each Ranger ETB = Forest ETB = Treasure = net {G}) or Elvish Spirit Guide (exile for instant {G}).",
      "Once mana-positive: win via Duskwatch Recruiter loop, Sanitarium mill, or Infectious Bite poison.",
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

  // ── WIN CON: Disciple of Freyalise bounce loop ────────────────────────
  {
    id: "disciple_freyalise_loop",
    name: "Disciple of Freyalise + Bouncer + Infinite Mana (Board Wipe + Draw)",
    onBattlefield: ["Disciple of Freyalise"],
    mustPreExist: ["Disciple of Freyalise"],
    description: "With infinite mana: Disciple of Freyalise ETB has each opponent sacrifice a creature (removal), then you draw cards equal to creatures you control (draw). Bounce with Temur Sabertooth or Kogla and recast repeatedly. Clears all opposing creatures and draws your entire library.",
    requires: ["Disciple of Freyalise"],
    needsAlsoBouncer: true,
    needsInfiniteMana: true,
    priority: 9,
    type: "win-draw",
    lines: [
      "Infinite mana established. Disciple of Freyalise + Temur Sabertooth on battlefield (Disciple is an Elf, not a Human — Kogla cannot bounce it).",
      "Disciple ETB: each opponent sacrifices a creature. Then you draw cards equal to creatures you control.",
      "Pay {1}{G}: Temur Sabertooth bounces Disciple to hand.",
      "Recast Disciple ({5}{G}): ETB again — each opponent sacrifices another creature, you draw again.",
      "Loop to clear all opposing creatures. Stop drawing once you find Duskwatch Recruiter or another win outlet.",
      "Win via Duskwatch Recruiter activation loop → Sanitarium mill.",
    ]
  },

  // ── WIN CON: Elvish Archdruid + Eladamri + Yavimaya (Pump Combat Win) ──
  {
    id: "archdruid_eladamri_pump",
    name: "Elvish Archdruid + Eladamri + Yavimaya (Infinite Pump Combat Win)",
    onBattlefield: ["Elvish Archdruid", "Eladamri, Korvecdal", "Yavimaya, Cradle of Growth"],
    mustPreExist: ["Elvish Archdruid"],
    description: "With infinite mana: Elvish Archdruid's second ability ({T}: all elves get +N/+N until end of turn, where N = elves you control) can be activated infinitely via bouncing Archdruid. Combined with Eladamri's forestwalk (unblockable) and Yavimaya (all lands are Forests), your entire elf army becomes infinitely large and completely unblockable.",
    requires: ["Elvish Archdruid", "Eladamri, Korvecdal", "Yavimaya, Cradle of Growth"],
    needsInfiniteMana: true,
    priority: 10,
    type: "win-combat",
    lines: [
      "Infinite mana active. Elvish Archdruid + Eladamri, Korvecdal + Yavimaya, Cradle of Growth on battlefield.",
      "Yavimaya: all lands are Forests for all players — opponents always have a Forest.",
      "Eladamri: all your creatures have forestwalk (unblockable vs players controlling a Forest) AND shroud from opponents' spells and abilities.",
      "Tap Elvish Archdruid: all elves you control get +N/+N until end of turn (N = elf count). With infinite mana, repeat this multiple times or use a bounce loop.",
      "With Temur Sabertooth: bounce Archdruid, recast, activate again — stacks pump on all elves infinitely.",
      "Attack with your infinitely large, completely unblockable, shrouded elf army. All opponents take lethal simultaneously.",
      "TIP: You only need pump equal to your opponents' life totals — no need to loop more than necessary.",
    ]
  },

  // ── ENGINE: Formidable Speaker + Ashaya (Infinite Tutor Loop) ─────────
  {
    id: "speaker_ashaya_tutor",
    name: "Formidable Speaker + Ashaya + Quirion Ranger (Repeating Creature Tutor)",
    onBattlefield: ["Ashaya, Soul of the Wild", "Quirion Ranger"],
    description: "With infinite mana active: Formidable Speaker + Ashaya + Quirion Ranger is an instant win. Speaker ETB: discard a card → search your entire library for any creature (guaranteed every time). Each loop: Quirion returns Speaker to hand (untapping the dork), recast for {2}{G}. Free with infinite mana. Fetch Duskwatch Recruiter → activate for win pile.",
    requires: ["Formidable Speaker", "Ashaya, Soul of the Wild", "Quirion Ranger"],
    needsBigDork: 3,
    needsInfiniteMana: true,
    priority: 13,
    type: "win-now",
    lines: [
      "SETUP: Infinite mana active. Formidable Speaker + Ashaya + Quirion Ranger + dork (≥3 mana) on battlefield.",
      "Ashaya makes Formidable Speaker a Forest. Quirion Ranger can return any Forest to hand to untap a creature.",
      "Activate Quirion Ranger: return Formidable Speaker (a Forest via Ashaya) to hand, untapping the dork.",
      "Tap the dork for ≥3 mana. Recast Formidable Speaker ({2}{G}): ETB — you may discard a card. If you do, search your entire library for any creature card, reveal it, put it into your hand, then shuffle.",
      "This is a GUARANTEED full library search every loop — not a look-at-top-X. Discard whatever is least relevant and fetch exactly what you need.",
      "Repeat until you find Duskwatch Recruiter. Cast Duskwatch Recruiter. Activate ({2}{G}) repeatedly — looks at top 3 cards, reveals a creature if found. With infinite mana, keep looping to assemble the full win pile.",
      "WIN: Ashaya + Temur Sabertooth + Endurance + Geier Reach Sanitarium → mill all opponents.",
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

  // ── WIN CON: Badgermole Cub + Ashaya + Infinite Mana (Infinite Counters) ─
  {
    id: "badgermole_ashaya_counters",
    name: "Badgermole Cub + Bouncer + Infinite Mana (Infinite +1/+1 Counters)",
    onBattlefield: ["Badgermole Cub"],
    description: "Win condition. Badgermole Cub ETB: earthbend 1 — target land becomes a 0/0 creature with haste, gets a +1/+1 counter. KEY RULE: you can target a land that is ALREADY animated — it just gets another +1/+1 counter each time. With a bouncer (Temur Sabertooth or Kogla) and infinite mana: bounce Badgermole Cub to hand, recast ({1}{G}), ETB targets the same already-animated land again. Repeat infinitely — the land-creature accumulates infinite counters. Attack for lethal. Bonus: Badgermole's static 'Whenever you tap a creature for mana, add {G}' sustains and amplifies mana loops throughout.",
    requires: ["Badgermole Cub"],
    needsInfiniteMana: true,
    needsBouncer: true,
    priority: 11,
    type: "win-combat",
    lines: [
      "Infinite mana established. Badgermole Cub on battlefield with Temur Sabertooth or Kogla (bouncer).",
      "Badgermole ETB fires: earthbend 1 — target any land you control. It becomes a 0/0 creature with haste and gets a +1/+1 counter. It's now a 1/1 with haste.",
      "Pay {1}{G}: bounce Badgermole Cub to hand (Temur Sabertooth) or return it (Kogla).",
      "Recast Badgermole Cub ({1}{G}). ETB fires again — target the SAME already-animated land. Base power/toughness resets to 0/0 but it keeps existing counters and gains one more.",
      "Repeat. After N casts the land-creature is N/N with haste.",
      "Repeat infinitely with infinite mana — the land-creature grows arbitrarily large.",
      "Attack with the arbitrarily large haste land-creature for lethal.",
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

  // ── Hope Tender + Kogla + Big Land (Infinite Mana) ────────────────────
  {
    id: "hope_tender_kogla",
    name: "Hope Tender + Kogla + Big Land (≥4 mana)",
    onBattlefield: ["Hope Tender", "Kogla, the Titan Ape"],
    mustPreExist: ["Hope Tender", "Kogla, the Titan Ape"],
    description: "Infinite mana. Tap Hope Tender for {G}, exert it to untap a big land (Gaea's Cradle or Nykthos producing ≥4). Pay {2} to activate Kogla, returning Hope Tender (a Human) to hand — fully resetting the exert. Recast Hope Tender for {1}{G}. Each loop nets mana equal to land output minus 3.",
    requires: ["Hope Tender", "Kogla, the Titan Ape"],
    needsAlso: ["Gaea's Cradle", "Nykthos, Shrine to Nyx", "Itlimoc, Cradle of the Sun"],
    priority: 10,
    type: "infinite-mana",
    lines: [
      "Hope Tender and Kogla, the Titan Ape on battlefield. Big land (Cradle/Nykthos/Itlimoc) producing ≥4 mana.",
      "Tap Hope Tender for {G}.",
      "Exert Hope Tender: untap the big land.",
      "Tap big land for {N} mana (≥4).",
      "Pay {2}: activate Kogla, return Hope Tender (a Human) to hand — exert is fully reset.",
      "Recast Hope Tender for {1}{G}. Net: (land output − 3) mana per loop.",
      "Repeat for infinite green mana.",
    ]
  },

  // ── Hope Tender + Wirewood Lodge + Land (≥3 mana) ─────────────────────
  {
    id: "hope_tender_lodge",
    name: "Hope Tender + Wirewood Lodge + Land (≥3 mana)",
    onBattlefield: ["Hope Tender", "Wirewood Lodge"],
    mustPreExist: ["Hope Tender", "Wirewood Lodge"],
    description: "Infinite mana. Tap Hope Tender for {G} and exert it to untap a land producing ≥3. Spend {G} activating Wirewood Lodge to untap Hope Tender (an Elf) — this bypasses the exert restriction since Lodge forcibly untaps it. Net: (land output − 2) mana per loop. Infinite when land produces ≥3.",
    requires: ["Hope Tender", "Wirewood Lodge"],
    needsAlso: ["Gaea's Cradle", "Nykthos, Shrine to Nyx", "Itlimoc, Cradle of the Sun"],
    needsAuraLand: true,
    needsAuraLand3: true,
    priority: 10,
    type: "infinite-mana",
    lines: [
      "Hope Tender + Wirewood Lodge + a land producing ≥3 mana on battlefield.",
      "Eligible lands: Gaea's Cradle, Nykthos, Itlimoc, or a Forest enchanted with Utopia Sprawl/Wild Growth.",
      "Tap Hope Tender for {G}, then exert: untap the big land.",
      "Tap big land for ≥3 mana.",
      "Spend {G}: activate Wirewood Lodge, untapping Hope Tender (an Elf).",
      "Lodge's untap bypasses the exert — Hope Tender can tap and exert again immediately.",
      "Net: (land output − 2) mana per loop. Repeat for infinite mana.",
    ]
  },

  // ── Elvish Guidance + Arbor Elf + Wirewood Lodge (≥2 elves) ───────────
  {
    id: "elvish_guidance_arbor_lodge",
    name: "Elvish Guidance + Arbor Elf + Wirewood Lodge (≥2 elves)",
    onBattlefield: ["Elvish Guidance", "Arbor Elf", "Wirewood Lodge"],
    mustPreExist: ["Arbor Elf", "Wirewood Lodge"],
    description: "Infinite mana with 2+ elves. Elvish Guidance enchants a Forest making it tap for {G} per elf. Arbor Elf untaps that Forest (free). Wirewood Lodge ({G}) untaps Arbor Elf. Net: (elf count − 1) mana per loop. Infinite when you have ≥2 elves (most boards have far more).",
    requires: ["Elvish Guidance", "Arbor Elf", "Wirewood Lodge"],
    needsMinElves: 2,
    priority: 9,
    type: "infinite-mana",
    lines: [
      "Elvish Guidance enchanting a Forest. Arbor Elf + Wirewood Lodge on battlefield. ≥2 elves in play.",
      "Tap the Guidance-enchanted Forest for {G} × (elf count).",
      "Activate Arbor Elf: untap the enchanted Forest (free).",
      "Tap enchanted Forest again for {G} × (elf count) — second activation.",
      "Spend {G}: activate Wirewood Lodge, untapping Arbor Elf.",
      "Net: (elf count − 1) mana per full loop. With 3+ elves nets 2+. Repeat for infinite mana.",
    ]
  },

  // ── Big Elf Dork + Wirewood Lodge (≥2 elves / creatures) ──────────────
  // Covers: Priest of Titania, Elvish Archdruid, Circle of Dreams Druid
  // All tap for N (elves or creatures), Lodge untaps for {G}. Net: N−1 per loop.
  {
    id: "big_dork_lodge",
    name: "Big Elf Dork + Wirewood Lodge (≥2 elves/creatures)",
    onBattlefield: ["Wirewood Lodge"],
    mustPreExist: ["Wirewood Lodge"],
    description: "Infinite mana. Any big elf dork (Priest of Titania, Elvish Archdruid, Fanatic of Rhonas, Circle of Dreams Druid) taps for N ≥ 2 mana. Wirewood Lodge pays {G} to untap the dork (it's an elf). Net N−1 per loop. Infinite whenever N ≥ 2.",
    requires: ["Wirewood Lodge"],
    needsBigElfDorkOnBoard: 2,
    priority: 9,
    type: "infinite-mana",
    lines: [
      "A big elf dork on battlefield: Priest of Titania, Elvish Archdruid, Fanatic of Rhonas (fixed 4), or Circle of Dreams Druid — producing ≥2 mana.",
      "Wirewood Lodge on battlefield.",
      "Tap the big dork for N mana (N ≥ 2).",
      "Spend {G}: activate Wirewood Lodge to untap the big dork (it's an elf).",
      "Net: N − 1 mana per loop. Repeat for infinite green mana.",
      "Circle of Dreams Druid counts all creatures — counts itself, so minimum output is 1 (usually much more).",
    ]
  },

  // ── Magus of the Candelabra + Wirewood Symbiote + Big Land ───────────
  // NOTE: Magus is NOT an elf — Wirewood Lodge cannot untap it.
  // NOTE: Magus is NOT an elf — Wirewood Lodge cannot untap it.
  // Wirewood Symbiote bounces any elf to untap any creature (including Magus).
  // Sabertooth bounces Symbiote to hand, resetting its once-per-turn restriction.
  {
    id: "magus_symbiote",
    name: "Magus of the Candelabra + Wirewood Symbiote + Sabertooth + Big Land (≥5 mana)",
    onBattlefield: ["Magus of the Candelabra", "Wirewood Symbiote"],
    mustPreExist: ["Magus of the Candelabra", "Wirewood Symbiote"],
    description: "Infinite mana. Tap big land for N. Pay {1} to Magus to untap it, tap again. Symbiote bounces 1-drop elf to untap Magus. Sabertooth bounces Symbiote resetting its once-per-turn restriction. Recast both. Total cost per loop: {1}+{1}{G}+{G}+{G} = {3}{G}+{2}. Net positive when land produces ≥5.",
    requires: ["Magus of the Candelabra", "Wirewood Symbiote"],
    needsAlso: ["Gaea's Cradle", "Nykthos, Shrine to Nyx", "Itlimoc, Cradle of the Sun"],
    needsAuraLand: true,
    needsAuraLand3: true,
    needsOneDrop: true,
    needsAlsoBouncer: true,
    priority: 9,
    type: "infinite-mana",
    lines: [
      "Magus of the Candelabra + Wirewood Symbiote + Temur Sabertooth + a 1-drop elf + big land (≥5 mana) on battlefield.",
      "Tap big land for N mana.",
      "Pay {1}: activate Magus (X=1), untapping the big land.",
      "Tap big land again for N mana. (2N total so far.)",
      "Activate Wirewood Symbiote: bounce 1-drop elf to hand → untap Magus.",
      "Pay {1}{G}: Sabertooth bounces Symbiote to hand — re-entering resets its once-per-turn restriction.",
      "Recast Symbiote ({G}) and 1-drop elf ({G}).",
      "Total cost: {1}+{1}{G}+{G}+{G} = {3}{G}+{2}. Net positive when 2N ≥ 5. Repeat for infinite mana.",
    ]
  },

  // ── Seedborn Muse + Yeva / Yisan -- Free activations every opponent's turn ─
  {
    id: "seedborn_engine",
    name: "Seedborn Muse -- Untap Engine (Free Activations Every Turn)",
    onBattlefield: ["Seedborn Muse"],
    mustPreExist: ["Seedborn Muse"],
    description: "Seedborn Muse untaps all permanents on every opponent's upkeep. With Yeva in play you already have flash on every opponent's turn — cast, untap, repeat. Yisan would additionally get a free verse activation each upkeep.",
    requires: ["Seedborn Muse"],
    priority: 8,
    type: "engine",
    lines: [
      "Seedborn Muse on battlefield: all your permanents untap at the beginning of each opponent's upkeep.",
      "With Yeva on board: you have flash every opponent's turn — cast green creatures at instant speed and they untap for the next opponent's turn.",
      "In a 4-player game you get 3 extra untap steps per round — full mana production on every player's turn.",
      "TIP: Use Quirion Ranger on an opponent's turn to untap a dork and generate extra mana before passing back.",
    ]
  },

  // ── Regal Force draw loop (infinite mana + Sabertooth) ────────────────────
  {
    id: "regal_force_draw",
    name: "Regal Force Draw Loop (Infinite Mana + Temur Sabertooth)",
    onBattlefield: ["Regal Force", "Temur Sabertooth"],
    description: "With infinite mana and Temur Sabertooth: cast Regal Force, draw cards equal to green creatures on board, bounce with Sabertooth, recast, draw again. With even 5 green creatures you draw 5 cards per loop -- with infinite loops you draw your entire library. Then win via standard pile.",
    requires: ["Regal Force", "Temur Sabertooth"],
    needsInfiniteMana: true,
    priority: 10,
    type: "win-draw",
    lines: [
      "SETUP: Infinite mana active. Regal Force + Temur Sabertooth on battlefield.",
      "Regal Force ETB: draw cards equal to the number of green creatures you control.",
      "Pay {1}{G}: Temur Sabertooth bounces Regal Force to hand.",
      "Recast Regal Force ({5}{G}{G}): ETB triggers again -- draw another batch of cards.",
      "Repeat until you have drawn your entire library.",
      "Win via Duskwatch Recruiter activation, Sanitarium mill, or Infectious Bite from hand.",
    ]
  },

  // ── Disciple of Freyalise loop (infinite mana + bouncer) ──────────────────
  {
    id: "disciple_loop",
    name: "Disciple of Freyalise Loop (Infinite Mana -- Board Wipe + Draw)",
    onBattlefield: ["Disciple of Freyalise"],
    description: "With infinite mana and a bouncer: cast Disciple of Freyalise, each opponent sacrifices a creature, you draw cards equal to creatures you control. Bounce with Sabertooth/Kogla, recast. Each loop clears opponents' boards AND draws cards.",
    requires: ["Disciple of Freyalise"],
    needsInfiniteMana: true,
    needsAlsoBouncer: true,
    priority: 9,
    type: "win-draw",
    lines: [
      "SETUP: Infinite mana active. Disciple of Freyalise + Temur Sabertooth or Kogla on battlefield.",
      "Disciple ETB: each opponent sacrifices a creature, then you draw cards equal to creatures you control.",
      "Pay {1}{G} (Sabertooth) or {2} (Kogla): bounce Disciple to hand.",
      "Recast Disciple ({4}{G}): ETB triggers again -- opponents sacrifice again, you draw again.",
      "Each loop clears one creature from each opponent's board AND draws you cards.",
      "After opponents have no creatures: draw your library via repeated Disciple ETBs, then win via standard pile.",
    ]
  },

  // ── Formidable Speaker + Ashaya + Quirion Ranger (tutoring engine) ─────────
  {
    id: "speaker_ashaya_ranger",
    name: "Formidable Speaker + Ashaya + Quirion Ranger (Tutor Engine / Win Now)",
    onBattlefield: ["Formidable Speaker", "Ashaya, Soul of the Wild", "Quirion Ranger"],
    mustPreExist: ["Formidable Speaker"],
    description: "With Ashaya in play, Formidable Speaker is a Forest. Quirion Ranger returns Speaker to hand, untapping a dork, then you recast for the ETB. Speaker ETB: discard a card → search your entire library for any creature. Every iteration is a guaranteed tutor — costs only a discard and {2}{G} to recast. Net mana-positive when dork produces ≥3. Find Duskwatch Recruiter → guaranteed win.",
    requires: ["Formidable Speaker", "Ashaya, Soul of the Wild", "Quirion Ranger"],
    needsBigDork: 4,
    priority: 8,
    type: "engine",
    lines: [
      "Formidable Speaker + Ashaya + Quirion Ranger + a dork (≥4 mana) on battlefield.",
      "Speaker is a Forest via Ashaya. Quirion Ranger returns it to hand, untapping the dork.",
      "Recast Formidable Speaker ({2}{G}): ETB — discard any card from your hand. Search your ENTIRE library for any creature card and put it into your hand, then shuffle.",
      "This is a FULL library search every time — not a look-at-top-X. Every loop is a guaranteed tutor for any creature in your deck.",
      "WITHOUT infinite mana: net-positive when dork produces ≥4 ({2}{G} recast + {G} Quirion cost = 3 net). Use to fish for infinite mana pieces.",
      "WITH infinite mana: loop freely — fetch Duskwatch Recruiter, then activate Duskwatch repeatedly for the deterministic win pile.",
      "Key advantage over bouncer loops: no Temur Sabertooth or Kogla required.",
    ]
  },

  // ── Elvish Archdruid pump + Yavimaya + Eladamri combat win ────────────────
  {
    id: "archdruid_pump_win",
    name: "Elvish Archdruid Pump + Yavimaya + Eladamri (Infinite Combat Win)",
    onBattlefield: ["Elvish Archdruid", "Yavimaya, Cradle of Growth", "Eladamri, Korvecdal"],
    description: "With infinite mana: Elvish Archdruid's activated ability gives all elves +N/+N. Activate infinitely to give your elves arbitrarily large stats. Yavimaya makes all lands Forests for all players. Eladamri gives all your creatures forestwalk (unblockable vs Forest-controlling players) and shroud from opponents.",
    requires: ["Elvish Archdruid", "Yavimaya, Cradle of Growth", "Eladamri, Korvecdal"],
    needsInfiniteMana: true,
    priority: 10,
    type: "win-combat",
    lines: [
      "SETUP: Infinite mana active. Elvish Archdruid + Yavimaya + Eladamri on battlefield.",
      "Tap Elvish Archdruid: all elves you control get +N/+N until end of turn (N = elves on board).",
      "With infinite mana, activate Archdruid infinite times -- each activation layers +N/+N on top.",
      "Yavimaya: every land for every player is a Forest. All opponents always control a Forest.",
      "Eladamri: all your creatures have forestwalk (unblockable vs Forest controllers) AND shroud from opponents.",
      "Your elf army is now infinitely large, completely unblockable, and untargetable.",
      "Attack for lethal across all opponents simultaneously.",
    ]
  },

  // ── WIN CON: Destiny Spinner + Ashaya Trample + Finale of Devastation ────
  {
    id: "finale_trample_win",
    name: "Finale of Devastation (X≥10) + Ashaya + Destiny Spinner (Trample Combat Win)",
    onBattlefield: ["Ashaya, Soul of the Wild", "Destiny Spinner"],
    description: "With infinite mana: cast Finale of Devastation at a very large X (≥10 for the bonus). Finale puts any creature from your library or graveyard directly onto the battlefield, then gives ALL your creatures +X/+X and haste until end of turn. Ashaya makes all nontoken creatures Forests; Destiny Spinner gives all creatures with a Forest type trample. The result is an arbitrarily large, haste-enabled, trample-equipped army that attacks for lethal that turn.",
    requires: ["Finale of Devastation", "Ashaya, Soul of the Wild", "Destiny Spinner"],
    needsInfiniteMana: true,
    priority: 11,
    type: "win-combat",
    lines: [
      "SETUP: Infinite mana active. Ashaya, Soul of the Wild + Destiny Spinner on battlefield. Finale of Devastation in hand or accessible.",
      "Ashaya: all your nontoken creatures are Forests in addition to their other types.",
      "Destiny Spinner: creatures you control that are Forests have trample.",
      "Cast Finale of Devastation at X = your desired power boost (≥10 to also get the +X/+X and haste bonus).",
      "  • Finale finds ANY creature from your library or graveyard and puts it directly onto the battlefield.",
      "  • If X ≥ 10: ALL creatures you control get +X/+X and gain haste until end of turn.",
      "Choose X equal to your opponents' combined life totals (or simply use infinite mana for arbitrarily large X).",
      "Your entire army — all now Forests via Ashaya — gains trample from Destiny Spinner.",
      "Every creature has haste (Finale bonus), +X/+X (Finale bonus), and trample (Destiny Spinner + Ashaya).",
      "Attack with everything. Trample means excess damage punches through to players even if blockers are thrown in the way.",
      "TIP: If opponents try to chump-block, trample ensures lethal regardless. No combat tricks can save them with infinite power.",
    ]
  },

  // ── WIN CON: Infectious Bite fight-loop + Beast Within cleanup → combat ──
  {
    id: "bite_fight_pivot",
    name: "Infectious Bite Fight Loop + Beast Within Cleanup (Combat Win)",
    onBattlefield: ["Eternal Witness"],
    description: "With infinite mana: use Infectious Bite recursion via Eternal Witness to fight away blockers one by one (each fight also gives each opponent a poison counter), then attack for lethal. Beast Within can stop any combo win on the stack (countering by destroying the permanent mid-resolution), then the same looping plan removes the resulting Beast tokens and remaining blockers. A backup when opponents have enough blockers to prevent a direct poison kill but not enough life to survive a clean alpha strike.",
    requires: ["Infectious Bite", "Eternal Witness"],
    needsInfiniteMana: true,
    needsAlsoBouncer: true,
    priority: 8,
    type: "win-combat",
    lines: [
      "SETUP: Infinite mana. Eternal Witness + bouncer (Temur Sabertooth or Kogla) on battlefield. Infectious Bite in hand or graveyard.",
      "INTERRUPT PHASE (if needed): If an opponent has a win on the stack, cast Beast Within targeting the permanent driving their combo (Thassa's Oracle, Laboratory Maniac, Ad Nauseam, etc.). This destroys it mid-stack and neutralises the threat. They receive a 3/3 Beast token.",
      "CLEANUP PHASE: Use Infectious Bite to fight away all relevant blockers and the Beast token(s) just created.",
      "  • Each Bite cast: target one of your creatures — it fights target opponent's creature. Chosen opponent gets 1 poison counter per cast.",
      "  • Recover Bite: Sabertooth bounces Eternal Witness → recast Witness → ETB retrieves Infectious Bite. Repeat.",
      "  • With Kogla: attack with Kogla → return Eternal Witness (Human) to hand → recast Witness → retrieve Bite.",
      "After clearing all blockers (and incidentally accumulating poison counters), attack with your full team for lethal.",
      "NOTE: If opponents have already accumulated ≥10 poison counters during cleanup, that is also a win. Otherwise fall back to combat damage.",
      "TIP: Ram Through and Tail Swipe serve the same blocker-removal role without recursion if they are in hand and the target count is low.",
    ]
  },

  // ── Shifting Woodland + Ashaya + Argothian Elder (copy Elder from graveyard) ─
  {
    id: "shifting_woodland_elder",
    name: "Shifting Woodland copies Argothian Elder (Ashaya 2-Card Combo via Graveyard)",
    onBattlefield: ["Shifting Woodland", "Ashaya, Soul of the Wild"],
    mustPreExist: ["Shifting Woodland"],
    description: "Shifting Woodland can become a copy of any creature card in your graveyard until end of turn. If Argothian Elder is in your graveyard: activate Shifting Woodland to become Elder, then use the Ashaya 2-card combo (tap for {G} as a Forest, untap two lands -- target yourself + another land, repeat). This extends the Ashaya+Elder combo to graveyard availability.",
    requires: ["Shifting Woodland", "Ashaya, Soul of the Wild"],
    needsCardInGraveyard: "Argothian Elder",
    priority: 9,
    type: "infinite-mana",
    lines: [
      "Argothian Elder in graveyard. Shifting Woodland + Ashaya on battlefield.",
      "Pay {G}{G}: activate Shifting Woodland -- it becomes a copy of Argothian Elder until end of turn.",
      "Shifting Woodland is now a Forest AND a copy of Argothian Elder (lands can activate abilities).",
      "Tap Shifting Woodland as a Forest for {G} (it's a land via Ashaya).",
      "Activate Woodland-as-Elder's tap ability: untap two lands -- target itself AND any other land.",
      "Woodland untaps. Tap again for {G}. Repeat for infinite green mana.",
      "NOTE: Shifting Woodland must have been on the battlefield since the start of your turn (no haste needed -- it's a land), or use Destiny Spinner to give it haste as a creature.",
    ]
  },

  // ── Speaker + Quirion + Battlefield Forest + Big Dork (≥2 elves) ────────
  // No Ashaya needed. Speaker's activated ability {1},{T}: untap another permanent.
  // Quirion Ranger can return a Forest from the BATTLEFIELD (not hand) to hand to untap a creature.
  // Loop: Speaker {1},{T} untaps Dork → Dork taps for N mana → Quirion returns battlefield Forest

  // ── Ley Weaver + Ashaya (2-Card Infinite Mana — Argothian Elder variant) ─
  {
    id: "ley_weaver_ashaya",
    name: "Ley Weaver + Ashaya (2-Card Infinite Mana)",
    onBattlefield: ["Ashaya, Soul of the Wild", "Ley Weaver"],
    mustPreExist: ["Ley Weaver"],
    description: "Identical to the Argothian Elder + Ashaya combo. Ashaya makes Ley Weaver a Forest, allowing it to tap for {G} AND target itself with its 'untap two lands' ability. Tap Weaver for {G}, activate untap targeting itself + any other land. Repeat for infinite mana. Note: Ley Weaver is Human, not Elf — Wirewood Lodge cannot untap it.",
    requires: ["Ashaya, Soul of the Wild", "Ley Weaver"],
    priority: 10,
    type: "infinite-mana",
    lines: [
      "Ashaya in play — Ley Weaver is now a Forest land (taps for {G} like any Forest).",
      "Tap Ley Weaver for {G} (its Forest mana ability via Ashaya).",
      "Activate Ley Weaver's tap ability ({T}): untap two target lands — target itself AND any other land.",
      "Ley Weaver untaps. Tap again for {G}. Also tap the second untapped land for bonus mana.",
      "Repeat for infinite {G}.",
      "NOTE: Ley Weaver is Human (not Elf) — Wirewood Lodge cannot untap it. Use Hyrax Tower Scout, Temur Sabertooth, or Kogla for additional lines.",
    ]
  },

  // ── Cloudstone Curio + Big Dork + Another Creature (sorcery-speed Sabertooth) ─
  {
    id: "cloudstone_curio_loop",
    name: "Cloudstone Curio + Big Dork + Any Creature (Bounce Loop)",
    onBattlefield: ["Cloudstone Curio"],
    mustPreExist: ["Cloudstone Curio"],
    description: "Cloudstone Curio: whenever a nonartifact permanent enters, its controller may return another nonartifact, nonland permanent they control to hand. With two creatures in hand and a big dork on board (≥3 mana): cast creature A → Curio triggers → return creature B to hand. Cast B → Curio triggers → return A. Each cast nets mana from the dork. Sorcery-speed Temur Sabertooth analogue. More fragile (requires two creatures to alternate) but functions without Sabertooth.",
    requires: ["Cloudstone Curio"],
    needsBigDork: 3,
    priority: 8,
    type: "infinite-mana",
    lines: [
      "Cloudstone Curio on battlefield. Big dork producing ≥3 mana. Two cheap creatures to alternate (e.g. any two 1-mana elves, or Eternal Witness + any creature).",
      "Tap the big dork for {N} mana.",
      "Cast Creature A ({1}). Cloudstone Curio triggers: return Creature B (already on battlefield) to hand.",
      "Cast Creature B ({1}). Curio triggers: return Creature A to hand.",
      "Each cast of a creature untaps the big dork via normal untap — or use ETB effects to generate value.",
      "Net: N − (cost of alternating creatures) per loop. With free/1-mana creatures, nets N−2 per loop.",
      "Repeat for infinite mana. Pivot to draw loop or win condition once established.",
      "TIP: Eternal Witness in the loop retrieves any spell each cycle — Infectious Bite, tutors, etc.",
    ]
  },

  // ── Great Oak Guardian + Temur Sabertooth + Big Dork ─────────────────
  {
    id: "great_oak_guardian_loop",
    name: "Great Oak Guardian + Temur Sabertooth + Big Dork (≥6 mana, Flash)",
    onBattlefield: ["Temur Sabertooth"],
    mustPreExist: ["Temur Sabertooth"],
    description: "Great Oak Guardian has flash and ETB: untap all creatures you control, then give them all +2/+2 until end of turn. With Temur Sabertooth and a big dork producing ≥6 mana: cast Guardian (flash, instant speed) → ETB untaps the dork → tap dork for N ≥ 6 → pay {1}{G} to bounce Guardian → recast for {4}{G}. Net: N − 6 per loop. With a dork producing more it quickly snowballs. No Yeva required — flash is built in.",
    requires: ["Great Oak Guardian", "Temur Sabertooth"],
    needsBigDork: 6,
    priority: 9,
    type: "infinite-mana",
    lines: [
      "Temur Sabertooth + big dork (≥6 mana output) on battlefield. Great Oak Guardian in hand.",
      "Cast Great Oak Guardian ({4}{G}) — it has flash, no Yeva needed.",
      "ETB: untap ALL your creatures (including the big dork). All your creatures get +2/+2 until end of turn.",
      "Tap the big dork for N mana (N ≥ 6).",
      "Pay {1}{G}: activate Temur Sabertooth, returning Great Oak Guardian to hand.",
      "Net: N − 6 per loop. With Priest of Titania + 7 elves = 1 net mana; each additional elf adds 1.",
      "Repeat for infinite mana. Guardian's +2/+2 also stacks — army grows larger each iteration if needed.",
      "NOTE: Be aware of Deflecting Swat — opponents can redirect the ETB trigger targeting the bouncer.",
    ]
  },

  // ── Haste Enabler + Temur Sabertooth + Big Dork (CMC+3) ─────────────────
  {
    id: "haste_sabertooth_dork",
    name: "Haste Enabler + Temur Sabertooth + Big Dork (taps for CMC+3)",
    onBattlefield: ["Temur Sabertooth"],
    mustPreExist: ["Temur Sabertooth"],
    description: "Infinite mana. A haste enabler (Concordant Crossroads, Surrak and Goreclaw, Ulvenwald Oddity, or Thousand-Year Elixir) lets a freshly-cast big dork tap immediately. Temur Sabertooth bounces it to hand for {1}{G}, you recast it — the dork must produce at least its own CMC + 3 mana ({1}{G} Sabertooth bounce + CMC recast cost) to be net-positive. Any dork producing ≥ CMC+3 generates infinite mana this way. Quirion/Scryb Ranger variants also satisfy this with the untap line instead of bouncing.",
    requires: ["Temur Sabertooth"],
    needsBigDorkHasteCMC: true,
    needsHasteEnabler: true,
    priority: 7,
    type: "infinite-mana",
    lines: [
      "Haste enabler (Concordant Crossroads / Surrak / Ulvenwald Oddity / Elixir) + Temur Sabertooth on battlefield.",
      "Cast the big dork — haste lets it tap immediately for N mana (N ≥ dork's CMC + 3).",
      "Pay {1}{G}: Temur Sabertooth returns the dork to your hand.",
      "Recast the dork for its CMC. Total cost per loop: {1}{G} + CMC.",
      "Net mana per loop: N − CMC − 2 (≥ +1 when N ≥ CMC+3). Repeat for infinite mana.",
    ],
  },

  // ── Haste Enabler + Kogla + Human Big Dork (CMC+3) ──────────────────────
  {
    id: "haste_kogla_human_dork",
    name: "Haste Enabler + Kogla + Human Big Dork (taps for CMC+3)",
    onBattlefield: ["Kogla, the Titan Ape"],
    mustPreExist: ["Kogla, the Titan Ape"],
    description: "Infinite mana — Kogla variant. Kogla's activated ability returns a Human you control to hand for {2} (no green required). Pair with any Human big dork (Selvala, Heart of the Wilds; Marwyn; Karametra's Acolyte; Elvish Archdruid if Human; Fanatic of Rhonas) and a haste enabler. The dork taps immediately on ETB, then Kogla bounces it for {2}. Net positive when dork produces ≥ CMC+3 (covering {2} Kogla bounce + CMC recast). Kogla also destroys an artifact or enchantment each time you cast the Human, adding incidental disruption.",
    requires: ["Kogla, the Titan Ape"],
    needsBigDorkHasteCMC: true,
    needsHasteEnabler: true,
    needsHumanDork: true,
    priority: 7,
    type: "infinite-mana",
    lines: [
      "Haste enabler + Kogla, the Titan Ape on battlefield, plus a Human big dork in hand.",
      "Cast the Human dork — haste lets it tap immediately for N mana (N ≥ dork's CMC + 3).",
      "Pay {2}: Kogla returns the Human dork to your hand. Kogla also destroys target artifact or enchantment.",
      "Recast the Human dork for CMC. Total cost per loop: {2} + CMC.",
      "Net mana per loop: N − CMC − 2 (≥ +1 when N ≥ CMC+3). Repeat for infinite mana.",
    ],
  },


  // ── Ashaya + Scryb Ranger + Named Big Dork ───────────────────────────────
  // Covers Spellbook #3,7,11,14,21,26,27,41,49 — Scryb Ranger untaps dork (costs {1}{G})
  // Net positive when dork ≥3 mana. Named dorks: Priest, Circle, Selvala, Karametra,
  // Archdruid, Marwyn, Fanatic, Joraga (levelled), Wirewood Channeler.
  {
    id: "ashaya_scryb_named_dork",
    name: "Ashaya + Scryb Ranger + Big Dork (≥3 mana, named)",
    onBattlefield: ["Ashaya, Soul of the Wild", "Scryb Ranger"],
    description: "Infinite mana. Scryb Ranger returns itself to hand (as a Forest via Ashaya), untapping the big dork. Recast for {1}{G}. Net positive when dork produces ≥3. Covers: Priest of Titania (≥2 elves), Circle of Dreams Druid (≥3 creatures), Selvala (≥3 power creature + {G} input), Karametra's Acolyte (≥4 devotion), Elvish Archdruid (≥2 elves), Marwyn (≥2 power), Fanatic of Rhonas (taps for 4), Joraga Treespeaker (levelled, taps {G}{G}), Wirewood Channeler (≥2 elves).",
    requires: ["Ashaya, Soul of the Wild", "Scryb Ranger"],
    needsBigDork: 3,
    needsNamedDork: ["Priest of Titania", "Circle of Dreams Druid", "Selvala, Heart of the Wilds", "Karametra's Acolyte", "Elvish Archdruid", "Marwyn, the Nurturer", "Fanatic of Rhonas", "Joraga Treespeaker", "Wirewood Channeler"],
    priority: 9,
    type: "infinite-mana",
    lines: [
      "Ashaya, Soul of the Wild + Scryb Ranger + a big dork (≥3 mana) on battlefield.",
      "Tap the big dork as a Forest (via Ashaya) for ≥3 mana.",
      "Activate Scryb Ranger: return itself to hand (it's a Forest via Ashaya), untapping the big dork.",
      "Recast Scryb Ranger for {1}{G}. Net: ≥+{G} per loop.",
      "Scryb Ranger has flash — this line works at instant speed even without Yeva.",
    ],
  },

  // ── Hyrax Tower Scout + Temur Sabertooth + Named Big Dork ────────────────
  // Covers Spellbook #8,18,28,29,30,57 — Scout ETB untaps dork, bounce cost {1}{G}+{2}{G} recast
  // Net positive when dork ≥6. Named dorks: Priest, Selvala, Archdruid, Marwyn, Wirewood Channeler.
  {
    id: "hyrax_sabertooth_named_dork",
    name: "Hyrax Tower Scout + Temur Sabertooth + Big Dork (≥6 mana, named)",
    onBattlefield: ["Temur Sabertooth"],
    mustPreExist: ["Temur Sabertooth"],
    description: "Infinite mana. Sabertooth bounces Hyrax Tower Scout ({1}{G}), recast for {2}{G} — ETB untaps big dork. Total loop cost {3}{G}+{G} net, positive at ≥6. Covers: Priest of Titania (5+ elves), Selvala (power 7+ creature + {G}), Elvish Archdruid (5+ elves), Marwyn (6+ power), Wirewood Channeler (5+ elves).",
    requires: ["Hyrax Tower Scout", "Temur Sabertooth"],
    needsBigDork: 6,
    needsNamedDork: ["Priest of Titania", "Selvala, Heart of the Wilds", "Elvish Archdruid", "Marwyn, the Nurturer", "Wirewood Channeler", "Karametra's Acolyte"],
    priority: 8,
    type: "infinite-mana",
    lines: [
      "Hyrax Tower Scout + Temur Sabertooth + big dork (≥6 mana) on battlefield.",
      "Tap big dork for ≥6 mana.",
      "Pay {1}{G}: Sabertooth bounces Hyrax Tower Scout to hand.",
      "Recast Hyrax Tower Scout ({2}{G}): ETB untaps the big dork.",
      "Loop cost: {1}{G}+{2}{G} = {3}{G}. Net: ≥+{G}{G} when dork taps for ≥6. Repeat.",
    ],
  },

  // ── Kogla + Hyrax Tower Scout + Named Big Dork ───────────────────────────
  // Covers Spellbook #15,19,23,25,35,38,59 — Kogla bounces Scout ({1}{G}), recast {2}{G}
  // Same loop cost as Sabertooth variant. Dork must be non-Human (Kogla bounces Humans separately).
  {
    id: "kogla_hyrax_named_dork",
    name: "Kogla + Hyrax Tower Scout + Big Dork (≥6 mana, named)",
    onBattlefield: ["Kogla, the Titan Ape"],
    mustPreExist: ["Kogla, the Titan Ape"],
    description: "Infinite mana — Kogla variant. Kogla bounces Hyrax Tower Scout (a Human) for {1}{G}; recast Scout for {2}{G} to untap the big dork. Loop cost identical to Sabertooth line. Covers: Priest of Titania (5+ elves), Selvala (power 6+ + {G}), Karametra's Acolyte (6+ devotion), Circle of Dreams Druid (5+ creatures), Elvish Archdruid (5+ elves), Marwyn (5+ power), Wirewood Channeler (5+ elves). Kogla also destroys an artifact or enchantment each time Scout is recast.",
    requires: ["Kogla, the Titan Ape", "Hyrax Tower Scout"],
    needsBigDork: 6,
    needsNamedDork: ["Priest of Titania", "Selvala, Heart of the Wilds", "Karametra's Acolyte", "Circle of Dreams Druid", "Elvish Archdruid", "Marwyn, the Nurturer", "Wirewood Channeler"],
    priority: 8,
    type: "infinite-mana",
    lines: [
      "Kogla + Hyrax Tower Scout + big dork (≥6 mana) on battlefield.",
      "Tap big dork for ≥6 mana.",
      "Pay {1}{G}: Kogla bounces Hyrax Tower Scout (a Human) to hand. Kogla destroys target artifact/enchantment.",
      "Recast Hyrax Tower Scout ({2}{G}): ETB untaps the big dork.",
      "Loop cost: {3}{G}. Net: ≥+{G}{G} when dork taps for ≥6. Repeat.",
    ],
  },

  // ── Ashaya + Magus of the Candelabra + Named Big Dork ────────────────────
  // Covers Spellbook #32,34,36,43,47,52,60,62 — Magus pays {2} to untap itself + dork.
  // Net positive when dork produces ≥3 (pays for {2} activation + 1 net).
  {
    id: "magus_ashaya_named_dork",
    name: "Ashaya + Magus of the Candelabra + Big Dork (≥3 mana, named)",
    onBattlefield: ["Ashaya, Soul of the Wild", "Magus of the Candelabra"],
    mustPreExist: ["Magus of the Candelabra"],
    description: "Infinite mana. Magus of the Candelabra (a Forest via Ashaya) pays {X} and taps to untap X lands — targeting itself and the big dork. Pay {2}: untap both. Net positive when dork produces ≥3. Covers: Priest of Titania (≥2 elves), Circle of Dreams Druid (≥3 creatures), Selvala (≥4 power creature + {G}), Karametra's Acolyte (≥4 devotion), Fanatic of Rhonas (taps 4), Elvish Archdruid (≥2 elves), Marwyn (≥2 power), Wirewood Channeler (≥2 elves).",
    requires: ["Ashaya, Soul of the Wild", "Magus of the Candelabra"],
    needsBigDork: 3,
    needsNamedDork: ["Priest of Titania", "Circle of Dreams Druid", "Selvala, Heart of the Wilds", "Karametra's Acolyte", "Fanatic of Rhonas", "Elvish Archdruid", "Marwyn, the Nurturer", "Wirewood Channeler"],
    priority: 8,
    type: "infinite-mana",
    lines: [
      "Ashaya + Magus of the Candelabra + big dork (≥3 mana) on battlefield, both without summoning sickness.",
      "Tap the big dork as a Forest (via Ashaya) for ≥3 mana.",
      "Pay {2}, tap Magus of the Candelabra: untap Magus + the big dork (both are Forests via Ashaya).",
      "Net: ≥+{G} per loop (≥3 produced minus {2} Magus cost). Repeat for infinite mana.",
    ],
  },

  // ── Haste Enabler + Temur Sabertooth + Named Big Dork ────────────────────
  // Covers Spellbook #9,10,20,22,37 — Concordant/Surrak/Elixir gives haste, Sabertooth bounces dork
  // Loop cost {1}{G} bounce + CMC recast. Net positive when dork ≥ CMC+3.
  {
    id: "haste_sabertooth_named_dork",
    name: "Haste Enabler + Temur Sabertooth + Named Big Dork (≥CMC+3)",
    onBattlefield: ["Temur Sabertooth"],
    mustPreExist: ["Temur Sabertooth"],
    description: "Infinite mana. Haste enabler (Concordant Crossroads, Surrak and Goreclaw, Thousand-Year Elixir) lets a freshly-cast big dork tap immediately. Sabertooth bounces it for {1}{G}, recast. Net positive when dork produces ≥ its CMC+3. Covers: Circle of Dreams Druid ({G}{G}{G} CMC, needs 6+ creatures for 6+ mana), Selvala ({1}{G}{G} CMC=3, needs 7+ power creature), Karametra's Acolyte ({3}{G} CMC=4, needs 7+ devotion).",
    requires: ["Temur Sabertooth"],
    needsBigDorkHasteCMC: true,
    needsHasteEnabler: true,
    needsNamedDork: ["Circle of Dreams Druid", "Selvala, Heart of the Wilds", "Karametra's Acolyte", "Priest of Titania", "Elvish Archdruid", "Marwyn, the Nurturer", "Wirewood Channeler"],
    priority: 7,
    type: "infinite-mana",
    lines: [
      "Haste enabler + Temur Sabertooth + big dork on battlefield.",
      "Cast the big dork — haste lets it tap immediately for N mana (N ≥ CMC+3).",
      "Pay {1}{G}: Sabertooth bounces the dork to hand.",
      "Recast for CMC. Loop cost: {1}{G}+CMC. Net: ≥+{G} per loop. Repeat.",
    ],
  },

  // ── Ashaya + Hope Tender + Named Big Dork ────────────────────────────────
  // Covers Spellbook #45,48,50,56,61 — Hope Tender exerts ({1}) to untap itself + dork/land
  // Works with: Nykthos (4+ devotion), Gaea's Cradle (2+ creatures), Circle of Dreams Druid,
  // Selvala (power≥3 + {G}), Marwyn (power≥2).
  {
    id: "hope_tender_ashaya_dork",
    name: "Ashaya + Hope Tender + Big Dork or Cradle (exert loop)",
    onBattlefield: ["Ashaya, Soul of the Wild", "Hope Tender"],
    mustPreExist: ["Hope Tender"],
    description: "Infinite mana. Hope Tender exerts for {1} to untap itself and target land (or creature-land via Ashaya). Works with Nykthos (≥4 devotion), Gaea's Cradle (≥3 creatures), Circle of Dreams Druid (≥3 creatures via Ashaya), Selvala (power≥3), or Marwyn (power≥2). Loop cost {1} per activation; net positive when the untapped source produces ≥2.",
    requires: ["Ashaya, Soul of the Wild", "Hope Tender"],
    needsNamedDork: ["Nykthos, Shrine to Nyx", "Gaea's Cradle", "Circle of Dreams Druid", "Selvala, Heart of the Wilds", "Marwyn, the Nurturer"],
    priority: 7,
    type: "infinite-mana",
    lines: [
      "Ashaya + Hope Tender + a land or big dork producing ≥2 on battlefield, Hope Tender without summoning sickness.",
      "Tap the land/dork for ≥2 mana (Nykthos, Cradle, Circle, Selvala, or Marwyn).",
      "Pay {1}, tap and exert Hope Tender: untap Hope Tender AND the tapped source.",
      "Net: ≥+{G} per loop (≥2 produced minus {1} exert cost). Hope Tender re-readies for next activation.",
      "Repeat for infinite mana.",
    ],
  },

  // ── Vitalize + Eternal Witness + Big Dork ────────────────────────────────
  // Covers Spellbook #33,39,44,51 — Vitalize ({G}) untaps all, EWit recurses it, Sabertooth/Kogla bounces EWit
  // Dork must produce ≥8 to cover costs: {G} Vitalize + {1}{G}{G} EWit + {1}{G} Sabertooth bounce = {3}{G}{G}
  {
    id: "vitalize_ewit_dork_loop",
    name: "Vitalize + Eternal Witness + Big Dork (≥8 mana) + Bouncer",
    onBattlefield: ["Eternal Witness"],
    mustPreExist: ["Eternal Witness"],
    description: "Infinite mana. Vitalize ({G}) untaps all creatures. Eternal Witness recurs Vitalize from graveyard. Sabertooth or Kogla bounces EWit back to hand ({1}{G} or {2}) to replay next loop. Big dork must produce ≥8 mana per tap to cover total loop cost: {G} Vitalize + {1}{G}{G} EWit + {1}{G} Sabertooth bounce = {3}{G}{G}. Covers Marwyn (8+ power), Selvala (9+ power creature), and any dork reaching ≥8 output.",
    requires: ["Eternal Witness"],
    needsBigDork: 8,
    needsAlsoBouncer: true,
    needsVitalize: true,
    priority: 7,
    type: "infinite-mana",
    lines: [
      "Big dork (≥8) + Eternal Witness + Temur Sabertooth (or Kogla) on battlefield. Vitalize in hand.",
      "Tap big dork for ≥8 mana.",
      "Cast Vitalize ({G}): untap all creatures you control.",
      "Pay {1}{G}: Sabertooth bounces Eternal Witness to hand. (Or {2}: Kogla returns EWit as a Human.)",
      "Cast Eternal Witness ({1}{G}{G}): ETB returns Vitalize from graveyard to hand.",
      "Loop cost: {3}{G}{G}. Net: ≥+{G} when dork taps ≥8. Repeat for infinite mana.",
    ],
  },

  // ── Emerald Charm + Eternal Witness + Marwyn ─────────────────────────────
  // Covers Spellbook #58 — Emerald Charm ({G} instant) untaps one creature.
  // Marwyn (≥7 power) + EWit (recurs Charm) + Sabertooth (bounces EWit). Loop cost {3}{G}{G}.
  {
    id: "emerald_charm_ewit_marwyn",
    name: "Emerald Charm + Eternal Witness + Marwyn (≥7 power) + Sabertooth",
    onBattlefield: ["Eternal Witness", "Temur Sabertooth"],
    mustPreExist: ["Eternal Witness", "Temur Sabertooth"],
    description: "Infinite mana. Emerald Charm ({G} instant) in its 'untap target permanent' mode untaps Marwyn. Eternal Witness recurs Emerald Charm. Sabertooth bounces EWit. Marwyn needs ≥7 power (tapping for ≥7) to cover loop costs: {G} Charm + {1}{G}{G} EWit + {1}{G} Sabertooth = {3}{G}{G}. Net +{G} when Marwyn ≥7 power. Instant-speed option on non-summoning-sick Marwyn.",
    requires: ["Eternal Witness", "Temur Sabertooth", "Emerald Charm"],
    needsBigDork: 7,
    needsNamedDork: ["Marwyn, the Nurturer"],
    priority: 7,
    type: "infinite-mana",
    lines: [
      "Marwyn (≥7 power) + Eternal Witness + Temur Sabertooth on battlefield. Emerald Charm in hand.",
      "Tap Marwyn for ≥7 mana.",
      "Cast Emerald Charm ({G}), choosing 'untap target permanent': untap Marwyn.",
      "Pay {1}{G}: Sabertooth bounces Eternal Witness to hand.",
      "Cast Eternal Witness ({1}{G}{G}): ETB returns Emerald Charm from graveyard.",
      "Loop cost: {3}{G}{G}. Net: ≥+{G}. Repeat for infinite mana.",
    ],
  },

  // ── Genesis Hydra + Temur Sabertooth (Infinite Mana Outlet / Storm) ──
  {
    id: "genesis_hydra_sabertooth",
    name: "Genesis Hydra + Temur Sabertooth (Infinite Mana Loop / Storm)",
    onBattlefield: ["Temur Sabertooth"],
    mustPreExist: ["Temur Sabertooth"],
    description: "With infinite mana: cast Genesis Hydra at X=any value. Its cast trigger (not ETB — can't be countered separately) lets you reveal cards from library equal to X and put any nonland permanent with CMC ≤ X directly onto battlefield. With Temur Sabertooth: bounce Hydra between casts to find any nonland permanent from library while generating unlimited ETB triggers. Loops cleanly as a win pile assembler or pure storm piece.",
    requires: ["Genesis Hydra", "Temur Sabertooth"],
    needsInfiniteMana: true,
    priority: 10,
    type: "win-now",
    lines: [
      "Infinite mana established. Genesis Hydra in hand. Temur Sabertooth on battlefield.",
      "Cast Genesis Hydra for X = desired CMC target (or very large X).",
      "ON CAST (not ETB — uncounterable separately): reveal top X cards of library, put any nonland permanent with CMC ≤ X directly onto battlefield.",
      "Find Duskwatch Recruiter, Regal Force, Disciple of Freyalise, Eternal Witness, or any key piece.",
      "Pay {1}{G}: activate Temur Sabertooth, returning Genesis Hydra to hand.",
      "Recast Hydra for the next needed card. Repeat to assemble the entire win pile from library.",
      "WIN: Once Duskwatch Recruiter is on board, activate for {2}{G} to find remaining pieces (Endurance, Eternal Witness). Mill all opponents via Sanitarium loop.",
    ]
  },

  // ── Leyline of Abundance + Quirion Ranger + Ashaya + 1-Drop Dork ──────
  {
    id: "leyline_quirion_ashaya",
    name: "Leyline of Abundance + Ashaya + Quirion Ranger + 1-Drop Dork",
    onBattlefield: ["Leyline of Abundance", "Ashaya, Soul of the Wild", "Quirion Ranger"],
    description: "Leyline of Abundance: whenever you tap a creature for mana, add {G}. This effectively doubles every dork's output. With a 1-mana dork producing {G}: Leyline makes it tap for {G}{G}. Quirion Ranger loop (via Ashaya) then nets {G} per iteration where previously it was neutral. Converts any 1-drop dork into an infinite mana engine.",
    requires: ["Leyline of Abundance", "Ashaya, Soul of the Wild", "Quirion Ranger"],
    needsBigDork: 2,
    priority: 9,
    type: "infinite-mana",
    lines: [
      "Leyline of Abundance + Ashaya + Quirion Ranger + any creature dork on battlefield.",
      "Leyline: whenever you tap a creature for mana, add {G} in addition to normal output.",
      "Tap dork for {G} → Leyline adds {G} → dork effectively taps for {G}{G}.",
      "Tap Quirion Ranger as a Forest for {G} → Leyline adds {G} → Ranger taps for {G}{G}.",
      "Activate Quirion Ranger: return itself to hand (it's a Forest via Ashaya), untapping the dork.",
      "Recast Ranger for {G}. Net: {G}{G}{G} generated, {G}{G} spent = +{G} per loop.",
      "Repeat for infinite mana. Even Llanowar Elves becomes a full infinite mana engine.",
      "NOTE: Any creature dork qualifies — the Leyline bonus makes the math work regardless of base output.",
    ]
  },

  // ── Vitalize + Gaea's Cradle / Big Dorks (Mass Untap Ritual) ─────────
  {
    id: "vitalize_ritual",
    name: "Vitalize + Gaea's Cradle / Big Dorks (Mass Untap Ritual)",
    onBattlefield: [],
    description: "Vitalize ({G}) untaps all creatures you control at instant speed. With Gaea's Cradle and several creatures, or a board with multiple big dorks, Vitalize produces a massive mana surplus. With Eternal Witness recursion and infinite mana it becomes a true ritual. Most effective mid-combo to reset all creatures after a partial tap-out.",
    requires: ["Vitalize"],
    priority: 6,
    type: "engine",
    lines: [
      "Cast Vitalize ({G}): untap all creatures you control.",
      "With Gaea's Cradle: re-tap all creatures immediately for N mana (N = creature count). Net: N − 1.",
      "With big dorks (Priest of Titania, Circle of Dreams Druid): re-tap each for their full output.",
      "With Eternal Witness + Sabertooth/Kogla and infinite mana: retrieve Vitalize each loop for repeated use.",
      "TIP: Vitalize at instant speed (opponent's turn with Yeva) creates a surprise mana surge for a flash win.",
    ]
  },

  // ── Hope Tender + Castle Garenbrig (Restricted Mana Filter) ──────────
  {
    id: "hope_tender_castle",
    name: "Hope Tender + Castle Garenbrig (Restricted Mana Filter → Combo Enabler)",
    onBattlefield: ["Hope Tender", "Castle Garenbrig"],
    mustPreExist: ["Hope Tender", "Castle Garenbrig"],
    description: "Castle Garenbrig produces {G} that can only be spent to cast creatures or activated abilities of creatures. Hope Tender's exert ability ({T}, exert: untap up to two lands) combined with Castle Garenbrig's output enables sequences where restricted mana is filtered through creature costs. Garenbrig + Hope Tender exert untaps Cradle/Nykthos, effectively converting the restriction into free mana generation.",
    requires: ["Hope Tender", "Castle Garenbrig"],
    needsAlso: ["Gaea's Cradle", "Nykthos, Shrine to Nyx", "Itlimoc, Cradle of the Sun"],
    priority: 7,
    type: "engine",
    lines: [
      "Castle Garenbrig + Hope Tender on battlefield. A big land (Cradle, Nykthos, or Itlimoc) also in play.",
      "Tap Castle Garenbrig for {G}{G} (restricted to creature costs/activations).",
      "Tap Hope Tender for {G}. Use the Garenbrig mana to pay activation costs or recast costs.",
      "Exert Hope Tender: untap up to two lands — target Cradle/Nykthos + Castle Garenbrig.",
      "Tap Cradle/Nykthos for full unrestricted mana. Re-tap Castle Garenbrig next turn.",
      "TIP: This line enables the Hope Tender + Kogla or Hope Tender + Lodge combos with fewer green sources.",
    ]
  },

  // ── Lotus Cobra + Quirion Ranger + Ashaya (Landfall Mana) ────────────
  {
    id: "lotus_cobra_quirion_ashaya",
    name: "Lotus Cobra + Quirion Ranger + Ashaya (Landfall Infinite Mana)",
    onBattlefield: ["Lotus Cobra", "Ashaya, Soul of the Wild", "Quirion Ranger"],
    mustPreExist: ["Lotus Cobra"],
    description: "Ashaya makes all your nontoken creatures Forests. When Quirion Ranger enters the battlefield (or re-enters via its own bounce), it ETBs as a Forest — triggering Lotus Cobra's landfall for {G} of any color. Combined with the Quirion loop's mana from tapping the Ranger as a Forest, each iteration now generates additional landfall mana. With a dork producing ≥2, the loop becomes infinite.",
    requires: ["Lotus Cobra", "Ashaya, Soul of the Wild", "Quirion Ranger"],
    needsBigDork: 2,
    priority: 8,
    type: "infinite-mana",
    lines: [
      "Lotus Cobra + Ashaya + Quirion Ranger + a dork producing ≥2 mana on battlefield.",
      "Ashaya: all your nontoken creatures are Forests.",
      "Tap Quirion Ranger as a Forest for {G}. Activate: return itself to hand, untapping the dork.",
      "Lotus Cobra triggers: Quirion Ranger left the battlefield — no trigger. BUT when recast:",
      "Recast Quirion Ranger ({G}) → it ETBs as a Forest (Ashaya) → Lotus Cobra landfall: add {G} of any color.",
      "Tap the dork for ≥2 mana. Net per loop: dork output + Cobra trigger − Ranger recast cost.",
      "With a dork producing 2: net = 2 + 1 (Cobra) − 1 (Ranger) = +2 per loop. Infinite.",
      "TIP: Cobra's mana can be any color — useful for paying off-color activation costs.",
    ]
  },

  // ── Thousand-Year Elixir + Big Dork (Haste + Untap Engine) ───────────
  {
    id: "thousand_year_elixir",
    name: "Thousand-Year Elixir + Big Dork (Haste + Second Activation)",
    onBattlefield: ["Thousand-Year Elixir"],
    mustPreExist: ["Thousand-Year Elixir"],
    description: "Thousand-Year Elixir: creatures you control have haste. Once per turn, {1}: untap target creature. With a big dork: Elixir gives it haste (tap immediately on ETB) AND its {1} activation untaps it for a second tap that turn. Removes the final summoning-sickness bottleneck from freshly-cast dorks and allows mid-combo plays where a newly-cast dork needs to contribute mana immediately.",
    requires: ["Thousand-Year Elixir"],
    needsBigDork: 2,
    priority: 7,
    type: "engine",
    lines: [
      "Thousand-Year Elixir on battlefield. Cast a big dork (Priest of Titania, Elvish Archdruid, etc.).",
      "Elixir grants the dork haste — tap it immediately for N mana.",
      "Pay {1}: activate Elixir's second ability, untapping the dork.",
      "Tap the dork again for N more mana. Total: 2N − 1 mana from a single newly-cast dork.",
      "Combined with Wirewood Lodge (for elf dorks): Lodge + Elixir = 3 taps per turn from a single big dork.",
      "TIP: Elixir's haste also allows Ashaya + Quirion lines to function on the same turn Ashaya is cast.",
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
  "212136de72bb0811995b50253c32fe8ded19fa0a48ba4239cce808f884d6f351": {
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
  "2-3 Drop Creatures": ["Scryb Ranger","Priest of Titania","Earthcraft","Elvish Archdruid","Circle of Dreams Druid","Duskwatch Recruiter","Heartwood Storyteller","Hyrax Tower Scout","Eternal Witness","Fauna Shaman","Formidable Speaker","Destiny Spinner","Collector Ouphe","Glademuse","Delighted Halfling","Badgermole Cub","Chomping Changeling","Yisan, the Wanderer Bard","Elvish Harbinger","Fierce Empath","Tireless Provisioner","Nature's Rhythm","Endurance","Hope Tender"],
  "4-5 Drop Creatures": ["Ashaya, Soul of the Wild","Temur Sabertooth","Karametra's Acolyte","Fanatic of Rhonas","Argothian Elder","Seedborn Muse","Eladamri, Korvecdal","Growing Rites of Itlimoc","Beast Whisperer","Yeva, Nature's Herald"],
  "6+ Drop Creatures": ["Kogla, the Titan Ape","Disciple of Freyalise","Woodland Bellower","Regal Force","Woodcaller Automaton","Sowing Mycospawn"],
  "Rocks & Artifacts": ["Sol Ring","Chrome Mox","Mox Diamond","Lotus Petal"],
  "Enchantments": ["Utopia Sprawl","Wild Growth","Survival of the Fittest","Elvish Guidance"],
  "Instants & Sorceries": ["Worldly Tutor","Chord of Calling","Summoner's Pact","Shared Summons","Green Sun's Zenith","Natural Order","Eldritch Evolution","Crop Rotation","Sylvan Scrying","Archdruid's Charm","Beast Within","Force of Vigor","Infectious Bite","Legolas's Quick Reflexes"],
  "Key Lands": ["Gaea's Cradle","Itlimoc, Cradle of the Sun","Nykthos, Shrine to Nyx","Yavimaya, Cradle of Growth","Wirewood Lodge","Deserted Temple","Geier Reach Sanitarium","Ancient Tomb","Emergence Zone","Boseiju, Who Endures","Shifting Woodland","Talon Gates of Madara","War Room","Urza's Cave","Dryad Arbor","Misty Rainforest","Verdant Catacombs","Windswept Heath","Wooded Foothills"],
  "Basic Lands": ["Forest"],
};

// ============================================================
// ADVICE ENGINE — pure logic, no AI
// ============================================================
// ── MANA CALCULATOR ──────────────────────────────────────────────────────────
// Estimates total mana available from a battlefield, for auto-updating the mana input.
// Returns how much mana tapping a single card adds to the pool,
// using full board context for big dorks but flat values for lands.
function calculateCardManaForPool(card, battlefield) {
  const data = CARDS[card] ?? EXTRA_CARDS.get(card);
  if (!data) return 0;
  if (data.type === "land") {
    if (card === "Gaea's Cradle" || card === "Itlimoc, Cradle of the Sun") {
      const creatures = battlefield.filter(c => getCard(c)?.type === "creature").length;
      return creatures;
    } else if (card === "Nykthos, Shrine to Nyx") {
      const devotion = battlefield.reduce((s, c) => s + (getCard(c)?.devotion ?? 0), 0);
      return Math.max(0, devotion - 2);
    } else if (card === "Ancient Tomb") {
      return 2;
    } else if (data.tags?.includes("fetch")) {
      return 0;
    } else {
      return 1; // Forest, Yavimaya, Lodge, etc. — always 1 regardless of enchantments
    }
  } else if (data.tags?.includes("dork") || data.tags?.includes("big-dork")) {
    if (data.tapsFor === "arbor") return 1;
    const board = new Set(battlefield);
    const creatures = battlefield.filter(c => getCard(c)?.type === "creature");
    const elves = creatures.filter(c => getCard(c)?.tags?.includes("elf")).length;
    const creatureCount = creatures.length;
    const devotion = battlefield.reduce((s, c) => s + (getCard(c)?.devotion ?? 0), 0);
    const badgermoleBonus = board.has("Badgermole Cub") ? 1 : 0;
    const t = data.tapsFor;
    if (typeof t === "number") return t + (t > 0 ? badgermoleBonus : 0);
    if (t === "elves")     return elves + badgermoleBonus;
    if (t === "creatures") return creatureCount + badgermoleBonus;
    if (t === "devotion")  return devotion + badgermoleBonus;
    return 1 + badgermoleBonus;
  } else if (data.tags?.includes("rock")) {
    if (card === "Sol Ring") return 2;
    if (card === "Chrome Mox" || card === "Mox Diamond") return 1;
    return 0;
  }
  return 0;
}

function calculateBattlefieldMana(battlefield) {
  const board = new Set(battlefield);
  const creatures  = battlefield.filter(c => getCard(c)?.type === "creature");
  const elves      = creatures.filter(c => getCard(c)?.tags?.includes("elf")).length;
  const creatureCount = creatures.length;
  const devotion   = battlefield.reduce((s, c) => s + (getCard(c)?.devotion ?? 0), 0);
  const hasBadgermole = board.has("Badgermole Cub");
  const badgermoleBonus = hasBadgermole ? 1 : 0;
  const hasYavimaya = board.has("Yavimaya, Cradle of Growth");
  const hasAura     = board.has("Utopia Sprawl") || board.has("Wild Growth");
  const hasCradle   = board.has("Gaea's Cradle");
  const hasNykthos  = board.has("Nykthos, Shrine to Nyx");

  let total = 0;
  for (const card of battlefield) {
    const data = CARDS[card] ?? EXTRA_CARDS.get(card);
    if (!data) continue;
    if (data.type === "land") {
      if (card === "Gaea's Cradle" || card === "Itlimoc, Cradle of the Sun") {
        total += creatureCount;
      } else if (card === "Nykthos, Shrine to Nyx") {
        total += Math.max(0, devotion - 2); // spend {2} to activate
      } else if (card === "Ancient Tomb") {
        total += 2; // taps for {C}{C}
      } else if (data.tags?.includes("fetch")) {
        // fetch lands sacrifice themselves — no standing mana contribution
      } else {
        total += 1; // all other lands tap for at least 1 (Forest, Yavimaya, Lodge, Sanitarium, etc.)
      }
    } else if (data.tags?.includes("dork") || data.tags?.includes("big-dork")) {
      const t = data.tapsFor;
      if (typeof t === "number")  total += t + (t > 0 ? badgermoleBonus : 0);
      else if (t === "elves")     total += elves + badgermoleBonus;
      else if (t === "creatures") total += creatureCount + badgermoleBonus;
      else if (t === "devotion")  total += devotion + badgermoleBonus;
      else if (t === "arbor") {
        if (hasYavimaya && (hasCradle || hasNykthos))
          total += Math.max(creatureCount, devotion - 2) + badgermoleBonus;
        else if (hasAura) total += 2 + badgermoleBonus;
        else total += 1 + badgermoleBonus;
      } else {
        total += 1 + badgermoleBonus; // generic dork taps for {G}
      }
    } else if (data.tags?.includes("rock")) {
      // Mana rocks — only count reliable ongoing mana
      if (card === "Sol Ring")    total += 2; // {T}: add {C}{C}
      else if (card === "Chrome Mox" || card === "Mox Diamond") total += 1; // conditional but usually online
      // Lotus Petal sacrifices itself — no ongoing contribution
    }
  }

  // Earthcraft bonus: each creature can tap to untap a basic land.
  // With Yavimaya all lands are basic Forests, so each creature effectively doubles
  // its own mana output. Without Yavimaya only real basic Forests are untappable.
  if (board.has("Earthcraft")) {
    const basicForests = battlefield.filter(c =>
      getCard(c)?.tags?.includes("basic") || getCard(c)?.tags?.includes("forest")
    ).length;
    const untapTargets = hasYavimaya
      ? battlefield.filter(c => getCard(c)?.type === "land").length  // all lands are basics
      : basicForests;
    // Each creature can tap to untap one land — effectively adds 1 mana per creature
    // up to the number of untappable lands available (each creature + land pair = 1 extra {G})
    const earthcraftBonus = Math.min(creatureCount, untapTargets);
    total += earthcraftBonus;
  }

  // Utopia Sprawl / Wild Growth: each copy adds +1 to the enchanted Forest's output.
  // A Forest normally taps for 1, with an aura it taps for 2 (or 3 with both).
  // We already counted the Forest as 1, so add +1 per aura in play.
  const auraCount = battlefield.filter(c =>
    c === "Utopia Sprawl" || c === "Wild Growth"
  ).length;
  total += auraCount; // each aura enchants a Forest and adds +1 mana

  // Elvish Guidance: enchanted Forest taps for {G} per elf. We already counted the Forest
  // as 1, so add (elves - 1) extra. With Arbor Elf untapping it this doubles again
  // but that's handled by Arbor Elf's arbor tapsFor logic.
  if (board.has("Elvish Guidance")) {
    total += Math.max(0, elves - 1); // the Forest already gave 1; Guidance adds (elves-1) more
  }

  return total;
}

function analyzeGameState({ hand, battlefield, graveyard, manaAvailable, isMyTurn, yisanCounters = 0, opponentThreats, lifeTotal, deckList = null }) {
  // deckList: Set of card names in the player's deck. When set, ONE PIECE AWAY advice and
  // combo suggestions are filtered to only show cards that are actually in the deck.
  // null = no filter (all cards valid, legacy behaviour).
  const inDeck = deckList ? (c) => deckList.has(c) : () => true;
  const board = new Set(battlefield);
  const inHand = new Set(hand);
  const inGrave = new Set(graveyard);
  const allAvailable = new Set([...hand, ...battlefield]);

  // accessible(cardName) — true if the card is in hand OR retrievable from graveyard this turn.
  // Retrieval paths:
  //   1. Eternal Witness in hand → ETB retrieves any card from grave
  //   2. Fauna Shaman on board + Eternal Witness in grave → discard creature → find Witness → retrieve target
  //      (Fauna Shaman must be able to activate: needs a creature to discard + {G})
  const faunaCanFetchWitness = () =>
    board.has("Fauna Shaman") &&
    inGrave.has("Eternal Witness") &&
    hand.some(c => getCard(c)?.type === "creature") && // need a creature to discard
    mana >= 1; // Fauna Shaman activation cost
  const witnessRetrievable = (cardName) => {
    if (!inGrave.has(cardName)) return false;
    if (inHand.has("Eternal Witness") && !board.has("Eternal Witness")) return true;
    // Fauna Shaman on board → discard → find Witness → Witness retrieves cardName
    if (faunaCanFetchWitness()) return true;
    return false;
  };
  const accessible = (cardName) => inHand.has(cardName) || witnessRetrievable(cardName);

  const mana = parseInt(manaAvailable) || 0;
  const elvesOnBoard    = battlefield.filter(c => getCard(c)?.tags?.includes("elf")).length;
  const creaturesOnBoard = battlefield.filter(c => getCard(c)?.type === "creature").length;
  const dorksOnBoard    = battlefield.filter(c => getCard(c)?.tags?.includes("dork")).length;
  // Exact green devotion: sum of devotion field for every permanent on the battlefield
  const devotionOnBoard = battlefield.reduce((sum, c) => sum + (getCard(c)?.devotion ?? 0), 0);

  // Badgermole Cub substitutes for Destiny Spinner (land animation) when a bouncer is available
  const hasBouncer       = board.has("Temur Sabertooth") || board.has("Kogla, the Titan Ape") || accessible("Temur Sabertooth") || accessible("Kogla, the Titan Ape");
  const speakerHasBouncer = board.has("Temur Sabertooth") || board.has("Kogla, the Titan Ape");
  // Badgermole Cub needs Temur Sabertooth specifically — Kogla only bounces Humans, not Badgers
  const badgermoleActive = (board.has("Badgermole Cub") || accessible("Badgermole Cub")) && (board.has("Temur Sabertooth") || accessible("Temur Sabertooth"));
  const hasLandAnimate   = board.has("Destiny Spinner") || inHand.has("Destiny Spinner") || badgermoleActive;
  const yevaFlash = board.has("Yeva, Nature's Herald");

  // ---- HELPER: exact mana output of a dork given board context ----
  function estimateDorkOutput(cardName, extraElves = 0) {
    const t = getCard(cardName)?.tapsFor;
    // Badgermole Cub: static "whenever you tap a creature for mana, add {G}" — adds +1 mana per creature tap
    const badgermoleBonus = board.has("Badgermole Cub") ? 1 : 0;
    if (typeof t === "number") return t + (t > 0 ? badgermoleBonus : 0);
    if (t === "elves")    return elvesOnBoard + extraElves + badgermoleBonus; // Priest of Titania, Elvish Archdruid, Wirewood Channeler, Marwyn
    if (t === "creatures") return creaturesOnBoard + extraElves + badgermoleBonus; // Circle of Dreams Druid
    if (t === "devotion") return devotionOnBoard  + badgermoleBonus; // Karametra's Acolyte
    if (t === "power") {
      // Selvala, Heart of the Wilds: tap to add mana equal to the greatest power among creatures you control.
      // Estimate using creaturesOnBoard as a proxy for the largest power (conservative).
      const greatestPower = Math.max(0, creaturesOnBoard); // rough proxy
      return greatestPower + badgermoleBonus;
    }
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

  // Memoization cache for findBigDork — pure per threshold within a single analyzeGameState call.
  const _findBigDorkCache = new Map();
  function findBigDork(threshold) {
    if (_findBigDorkCache.has(threshold)) return _findBigDorkCache.get(threshold);
    const result = _findBigDorkUncached(threshold);
    _findBigDorkCache.set(threshold, result);
    return result;
  }
  // ---- HELPER: find the best big dork available and its output ----
  // extraElves: elves in hand that would enter the battlefield as part of assembling the combo,
  // boosting elf-counting dorks like Priest of Titania before the loop begins.
  // FIX #12: when a dork is in hand (not yet cast), its first-loop output must cover its
  // own cast cost before being net-positive. We reduce its effective threshold contribution
  // by its CMC when mana is not infinite, preventing false "ONE PIECE AWAY" advice when
  // the player has 0 available mana and the dork costs 2+ to cast.
  function _findBigDorkUncached(threshold) {
    // Count castable elves in hand — casting them first raises elf/creature count before the loop starts.
    // NOTE: canCastNow may not be initialized yet when called from the infiniteManaActive IIFE,
    // so we use a try/catch to safely fall back to false in that case.
    let _canCast = false;
    try { _canCast = canCastNow; } catch(e) { _canCast = false; }
    let _infMana = false;
    try { _infMana = infiniteManaActive; } catch(e) { _infMana = false; }
    const elvesInHand = _canCast
      ? hand.filter(c => getCard(c)?.tags?.includes("elf")).length
      : 0;
    const all = [...battlefield, ...hand];
    const candidates = all.filter(c => {
      if (!getCard(c)?.tags?.includes("dork") && !getCard(c)?.tags?.includes("big-dork")) return false;
      // If the dork itself is in hand and is an elf, don't double-count it in the bonus
      const effectiveBonus = Math.max(0, (inHand.has(c) && getCard(c)?.tags?.includes("elf")) ? elvesInHand - 1 : elvesInHand);
      const rawOutput = estimateDorkOutput(c, effectiveBonus);
      // If dork is in hand and mana is finite, first loop must also cover its cast cost
      const castCostPenalty = (inHand.has(c) && !_infMana) ? (getCard(c)?.cmc ?? 0) : 0;
      return (rawOutput - castCostPenalty) >= threshold;
    });
    if (candidates.length === 0) return null;
    return candidates.sort((a, b) => {
      const bonusA = Math.max(0, (inHand.has(a) && getCard(a)?.tags?.includes("elf")) ? elvesInHand - 1 : elvesInHand);
      const bonusB = Math.max(0, (inHand.has(b) && getCard(b)?.tags?.includes("elf")) ? elvesInHand - 1 : elvesInHand);
      return estimateDorkOutput(b, bonusB) - estimateDorkOutput(a, bonusA);
    })[0];
  }

  // ---- HELPER: check combo-specific extra requirements ----
  // infiniteMana is passed explicitly so this function is safe to call from the
  // infiniteManaActive IIFE before the closure variable is initialised.

  // Compute infiniteManaActive in two passes:
  //   Pass 1: all named pieces already on the board.
  //   Pass 2: pieces in hand castable on our turn or with Yeva flash.
  //           mustPreExist cards (summoning-sick tappers) must be on the board even in pass 2
  //           UNLESS a haste enabler (Ashaya + Destiny Spinner on board) is clearly present.
  let _inf = false, _infName = null;
  for (const combo of COMBOS) {
    if (combo.type !== "infinite-mana") continue;
    const allOnBoard = combo.requires.every(r => board.has(r));
    if (!allOnBoard) continue;
    const extras = comboExtrasSatisfied(combo, false);
    if (extras.ok) { _inf = true; _infName = combo.name; break; }
  }
  if (!_inf) {
    const _castable = isMyTurn || yevaFlash;
    // Bootstrap haste enabler: Ashaya + (Destiny Spinner OR Badgermole Cub+bouncer) must be on board.
    // Badgermole Cub animates lands just like Destiny Spinner when Temur Sabertooth is present.
    const _badgermoleHaste = board.has("Badgermole Cub") && board.has("Temur Sabertooth");
    const _hasteOnBoard = board.has("Ashaya, Soul of the Wild") && (board.has("Destiny Spinner") || _badgermoleHaste);
    if (_castable) {
      for (const combo of COMBOS) {
        if (combo.type !== "infinite-mana") continue;
        const mustPre = combo.mustPreExist ?? [];
        const allReachable = combo.requires.every(r => {
          if (board.has(r)) return true;
          if (!inHand.has(r)) return false;
          // mustPreExist cards (summoning sick) need to be on the board unless haste is up
          if (mustPre.includes(r) && !_hasteOnBoard) return false;
          if (getCard(r)?.type === "land") return isMyTurn;
          return _castable;
        });
        if (!allReachable) continue;
        const extras = comboExtrasSatisfied(combo, false);
        if (extras.ok) { _inf = true; _infName = combo.name; break; }
      }
    }
  }
  const infiniteManaActive = _inf;
  // Yeva is the commander — always castable from command zone for {2}{G}{G} (or more with tax).
  // yevaAvailable = flash already active, OR infinite mana (tax irrelevant), OR ≥4 mana to cast her.
  const yevaAvailable = yevaFlash || infiniteManaActive || mana >= 4;
  const activeComboName    = _infName;

  // Can we cast permanents into play this turn? (our turn, Yeva flash, or infinite mana)
  const canCastNow = isMyTurn || yevaFlash || infiniteManaActive;
  // Haste enabler: Ashaya (board or castable) + Destiny Spinner/Badgermole makes all creature-Forests tap immediately.
  // The land-animate piece must already be on the battlefield — if it is also only in hand we
  // would need to cast two cards sequentially before the mustPreExist tapper could fire, which
  // is too optimistic. Ashaya itself may still be in hand as long as the animator is in play.
  const ashayaAvailable      = board.has("Ashaya, Soul of the Wild") || (accessible("Ashaya, Soul of the Wild") && canCastNow);
  const landAnimateOnBoard   = board.has("Destiny Spinner") || (board.has("Badgermole Cub") && (board.has("Temur Sabertooth") || accessible("Temur Sabertooth")));
  const hasHasteEnabler      = ashayaAvailable && landAnimateOnBoard;

  const results = [];
  const suppressedWins = []; // { label, reason } — shown as collapsed notes at end

  function comboExtrasSatisfied(combo, infiniteMana = false) {

    // needsBigDork: need a dork producing >= N mana
    if (combo.needsBigDork) {
      const dork = findBigDork(combo.needsBigDork);
      if (!dork) return { ok: false, missing: `a mana dork producing ≥${combo.needsBigDork} mana (e.g. Priest of Titania with ${combo.needsBigDork}+ elves, Circle of Dreams Druid, Karametra's Acolyte)` };
    }

    // needsOneDrop: need a 1-drop elf (for Symbiote combo and draw loop).
    // Chomping Changeling is a changeling (all creature types including elf) — valid bounce
    // fodder for Wirewood Symbiote even though it costs {2}{G}. Symbiote only requires
    // "return an elf to hand", and changelings satisfy that requirement at any CMC.
    if (combo.needsOneDrop) {
      const hasOneDrop = [...battlefield, ...hand].some(c =>
        (getCard(c)?.tags?.includes("1drop") && getCard(c)?.tags?.includes("elf"))
        || getCard(c)?.tags?.includes("changeling") // changeling = all types including elf
      );
      if (!hasOneDrop) return { ok: false, missing: "a 1-drop elf (Llanowar Elves, Elvish Mystic, Fyndhorn Elves, etc.) — or Chomping Changeling as an elf of any cost" };
    }

    // needsAlsoBouncer: need Temur Sabertooth or Kogla.
    // Disciple of Freyalise is an Elf, not a Human — Kogla only bounces Humans.
    // Regal Force and Woodcaller Automaton are also not Humans.
    // Only combos bouncing a Human (Hyrax Scout, Eternal Witness, Hope Tender) can use Kogla.
    if (combo.needsAlsoBouncer) {
      const nonHumanBounce = combo.id === "disciple_freyalise_loop"
        || combo.id === "regal_force_draw"
        || combo.id === "sabertooth_woodcaller"
        || combo.id === "woodcaller_ashaya_loop";
      const hasBouncer = nonHumanBounce
        ? (board.has("Temur Sabertooth") || inHand.has("Temur Sabertooth"))
        : (board.has("Temur Sabertooth") || inHand.has("Temur Sabertooth")
            || board.has("Kogla, the Titan Ape") || inHand.has("Kogla, the Titan Ape"));
      if (!hasBouncer) return {
        ok: false,
        missing: nonHumanBounce
          ? "Temur Sabertooth (Kogla only bounces Humans — this creature is not a Human)"
          : "Temur Sabertooth or Kogla, the Titan Ape"
      };
    }

    // needsBigDorkHasteCMC: need a dork that produces >= its own CMC + 3 mana
    // (to cover {1}{G} Sabertooth bounce or {2} Kogla bounce + its own recast cost)
    if (combo.needsBigDorkHasteCMC) {
      const all = [...battlefield, ...hand];
      const humanOnly = !!combo.needsHumanDork;
      const found = all.find(c => {
        const data = getCard(c);
        if (!data) return false;
        if (!data.tags?.includes("dork") && !data.tags?.includes("big-dork")) return false;
        if (humanOnly && !data.tags?.includes("human")) return false;
        const output = estimateDorkOutput(c, 0);
        const cmc = data.cmc ?? 0;
        return output >= cmc + 3;
      });
      if (!found) return {
        ok: false,
        missing: humanOnly
          ? "a Human mana dork producing ≥ its CMC+3 mana (e.g. Selvala, Marwyn, Karametra's Acolyte, Fanatic of Rhonas with ≥6 creatures)"
          : "a mana dork producing ≥ its CMC+3 mana (e.g. Priest of Titania, Circle of Dreams Druid, Selvala with large creatures)",
      };
    }

    // needsHumanDork: (checked inside needsBigDorkHasteCMC above; also standalone guard)
    // No standalone check needed — always paired with needsBigDorkHasteCMC.

    // needsNamedDork: at least one of the listed named cards must be on battlefield or in hand
    if (combo.needsNamedDork) {
      const found = combo.needsNamedDork.some(name => board.has(name) || inHand.has(name));
      if (!found) return {
        ok: false,
        missing: "one of: " + combo.needsNamedDork.slice(0, 4).join(", ") + (combo.needsNamedDork.length > 4 ? ", …" : ""),
      };
    }

    // needsVitalize: Vitalize must be in hand or graveyard (for the Vitalize loop)
    if (combo.needsVitalize) {
      const hasVitalize = inHand.has("Vitalize") || graveyard.includes("Vitalize");
      if (!hasVitalize) return { ok: false, missing: "Vitalize (in hand or graveyard)" };
    }

    // needsHasteEnabler: need a haste source on the battlefield or in hand
    // Valid enablers: Concordant Crossroads, Surrak and Goreclaw, Ulvenwald Oddity,
    // Thousand-Year Elixir (grants haste to tapped creatures), Touch of Vitae (sorcery, grants haste until EOT)
    if (combo.needsHasteEnabler) {
      const HASTE_ENABLERS = [
        "Concordant Crossroads", "Surrak and Goreclaw", "Ulvenwald Oddity",
        "Thousand-Year Elixir", "Touch of Vitae",
      ];
      const hasHaste = HASTE_ENABLERS.some(h => board.has(h) || inHand.has(h));
      if (!hasHaste) return {
        ok: false,
        missing: "a haste enabler (Concordant Crossroads, Surrak and Goreclaw, Ulvenwald Oddity, or Thousand-Year Elixir)",
      };
    }

    // needsDrawEngine: need Beast Whisperer or Glademuse
    if (combo.needsDrawEngine) {
      const hasEngine = board.has("Beast Whisperer") || board.has("Glademuse")
        || inHand.has("Beast Whisperer") || inHand.has("Glademuse");
      if (!hasEngine) return { ok: false, missing: "Beast Whisperer or Glademuse (draw engine)" };
    }

    // needsMinElves: need at least N elves on the battlefield
    if (combo.needsMinElves) {
      const elfCount = battlefield.filter(c => getCard(c)?.tags?.includes("elf")).length;
      if (elfCount < combo.needsMinElves) {
        return { ok: false, missing: `at least ${combo.needsMinElves} elves on battlefield (have ${elfCount})` };
      }
    }

    // needsBigElfDorkOnBoard: like needsBigDork but restricted to battlefield only
    // and requires the dork to be an elf (so Wirewood Lodge can untap it).
    // Uses the same extraElves logic as findBigDork for consistency.
    if (combo.needsBigElfDorkOnBoard) {
      const threshold = combo.needsBigElfDorkOnBoard;
      let _canCast2 = false;
      try { _canCast2 = canCastNow; } catch(e) { _canCast2 = false; }
      const elvesInHand2 = _canCast2
        ? hand.filter(c => getCard(c)?.tags?.includes("elf")).length
        : 0;
      const dork = battlefield.find(c => {
        if (!getCard(c)?.tags?.includes("elf")) return false;
        if (!getCard(c)?.tags?.includes("dork") && !getCard(c)?.tags?.includes("big-dork")) return false;
        return estimateDorkOutput(c, elvesInHand2) >= threshold;
      });
      if (!dork) return { ok: false, missing: `a big elf dork on battlefield producing ≥${threshold} mana (Priest of Titania, Elvish Archdruid, or Circle of Dreams Druid with ${threshold}+ elves/creatures)` };
    }

    // needsAnyOf: combo requires at least one of a list of named cards (OR semantics).
    // More explicit than needsAlso — generates clean one-piece-away advice when all
    // options are missing. Returns the full list as the missing string so the player
    // knows all the alternatives.
    if (combo.needsAnyOf) {
      const hasOne = combo.needsAnyOf.some(c => board.has(c) || inHand.has(c));
      if (!hasOne) return { ok: false, missing: combo.needsAnyOf.join(" or ") };
    }

    // needsAlso / needsAuraLand: combo needs one of the named lands OR an enchanted Forest.
    // For Hope Tender + Lodge we need ≥3 mana output — needsAuraLand3 flag.
    // Both the aura AND a Forest must be on the battlefield (not merely in hand).
    if (combo.needsAlso) {
      const hasNamedLand = combo.needsAlso.some(c => board.has(c) || inHand.has(c));
      const aurasOnBoard = (board.has("Utopia Sprawl") ? 1 : 0) + (board.has("Wild Growth") ? 1 : 0)
        + (board.has("Elvish Guidance") ? 1 : 0);
      const forestOnBoard = board.has("Forest") || board.has("Dryad Arbor") || board.has("Yavimaya, Cradle of Growth");
      const auraLandReady = forestOnBoard && (
        combo.needsAuraLand3
          ? (aurasOnBoard >= 2 || (board.has("Elvish Guidance") && elvesOnBoard >= 3))
          : aurasOnBoard >= 1
      );
      const hasAuraLand = combo.needsAuraLand && auraLandReady;
      if (!hasNamedLand && !hasAuraLand) {
        return { ok: false, missing: combo.needsAlso.join(" or ") + (combo.needsAuraLand ? " (or a Forest enchanted with Utopia Sprawl/Wild Growth — both must be on the battlefield)" : "") };
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

    // needsCardInGraveyard: a specific card must be in the graveyard (e.g. for Shifting Woodland)
    if (combo.needsCardInGraveyard) {
      if (!inGrave.has(combo.needsCardInGraveyard)) {
        return { ok: false, missing: `${combo.needsCardInGraveyard} in your graveyard (Shifting Woodland will copy it)` };
      }
    }

    // needsBattlefieldForest: requires at least one Forest land on the battlefield
    // (for Quirion Ranger to return to hand to untap a creature — no Ashaya needed)
    if (combo.needsBattlefieldForest) {
      const hasForestOnBoard = battlefield.some(c => c === "Forest" || getCard(c)?.type === "land" && c.includes("Forest"))
        || board.has("Yavimaya, Cradle of Growth"); // Yavimaya makes all lands Forests
      if (!hasForestOnBoard) {
        return { ok: false, missing: "at least one Forest on the battlefield (for Quirion Ranger to return and untap Speaker)" };
      }
    }

    // needsInfiniteMana: requires infinite mana to already be established
    // Uses the explicit parameter so this is safe from the bootstrap IIFE.
    if (combo.needsInfiniteMana && !infiniteMana) {
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

      const hasHopeTender  = board.has("Hope Tender") || inHand.has("Hope Tender");
      const hasLodge       = board.has("Wirewood Lodge") || inHand.has("Wirewood Lodge");
      const hasUntapMethod =
        hasWoodcaller ||                              // 1. Woodcaller Automaton
        (hasLandAnimate && hasHyrax) ||               // 2. Destiny Spinner / Badgermole + Hyrax Tower Scout
        (hasAshaya && hasMagus) ||                    // 3. Ashaya + Magus of the Candelabra
        (hasAshaya && hasQuirion) ||                  // 4. Ashaya + Quirion Ranger
        (hasAshaya && hasScryb) ||                    // 5. Ashaya + Scryb Ranger
        (hasSymbiote && hasLandAnimate) ||            // 6. Wirewood Symbiote + Destiny Spinner / Badgermole
        (hasAshaya && hasElder) ||                    // 7. Ashaya + Argothian Elder
        (hasHopeTender && hasLodge);                  // 8. Hope Tender + Wirewood Lodge (exert + Lodge bypass)

      if (!hasUntapMethod) return {
        ok: false,
        missing: "a land untap method: Woodcaller Automaton; Destiny Spinner (or Badgermole + bouncer) + Hyrax Tower Scout; Ashaya + Magus/Quirion Ranger/Scryb Ranger/Argothian Elder; Wirewood Symbiote + Destiny Spinner/Badgermole; or Hope Tender + Wirewood Lodge",
      };
    }

    return { ok: true };
  }


  // ---- YEVA FLASH TIMING ADVICE ----
  // Fires when: Yeva on board (free flash), OR infinite mana active (cast from command zone free),
  // OR ≥4 mana available (cast Yeva from command zone for {2}{G}{G}).
  if (!isMyTurn && yevaAvailable) {
    const yevaNote = yevaFlash ? "via Yeva (on board)" : "via Yeva (cast from command zone)";
    // Check for flash-in combos
    if (inHand.has("Ashaya, Soul of the Wild") && (inHand.has("Quirion Ranger") || board.has("Quirion Ranger"))
        && (board.has("Duskwatch Recruiter") || inHand.has("Duskwatch Recruiter"))) {
      results.push({
        priority: 15,
        category: "⚡ INSTANT SPEED WIN",
        headline: `FLASH IN: Ashaya + Quirion Ranger NOW (${yevaNote})`,
        detail: `On opponent's end step, flash in Ashaya ${yevaNote}. Quirion Ranger (in hand or board) creates an infinite mana loop immediately. Opponents are tapped out and cannot respond.`,
        steps: [
          "Wait for last opponent's end step (or when they commit to the stack).",
          yevaFlash ? "Flash Ashaya via Yeva." : "Cast Yeva from command zone, then flash in Ashaya.",
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
        headline: `FLASH IN: Glademuse now → Draw entire library (${yevaNote})`,
        detail: "Glademuse on opponent's turn with Ashaya + Quirion Ranger = draw your entire deck at instant speed.",
        steps: [
          `Flash Glademuse ${yevaNote} on opponent's turn.`,
          "Cast Quirion Ranger → Glademuse triggers → draw a card.",
          "Ranger bounces itself (it's a Forest via Ashaya), untaps any dork.",
          "Recast Ranger → draw again. Infinite draws = entire library in hand.",
          "Cast Infectious Bite + Eternal Witness loop for poison win, or attack for lethal."
        ],
        color: "#ff6b35",
      });
    }

    // Flash in a big dork EOT for next-turn combo
    const bigDorksInHand = hand.filter(c => getCard(c)?.tags?.includes("big-dork"));
    if (bigDorksInHand.length > 0 && !board.has("Ashaya, Soul of the Wild")) {
      const dork = bigDorksInHand[0];
      results.push({
        priority: 8,
        category: "🌙 EOT FLASH",
        headline: `Flash in ${dork} at end of opponent's turn`,
        detail: `${dork} bypasses summoning sickness when flashed in at EOT. Untap on your turn and it's ready to tap for mana immediately — enabling an infinite mana combo next turn.`,
        steps: [
          `On last opponent's EOT, flash ${dork} ${yevaNote}.`,
          "It untaps at the start of your turn — no summoning sickness.",
          "Next turn: pair with Temur Sabertooth + Hyrax Scout or Quirion Ranger loop for infinite mana."
        ],
        color: "#a569bd",
      });
    }
  }

  // ---- EARLY GAME RAMP ADVICE ----
  if (dorksOnBoard === 0 && creaturesOnBoard === 0 && mana <= 2) {
    const dorks1 = hand.filter(c => getCard(c)?.tags?.includes("1drop") && getCard(c)?.tags?.includes("dork") && getCard(c)?.cmc <= mana);
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
  if (board.has("Arbor Elf") && (inHand.has("Utopia Sprawl") || inHand.has("Wild Growth") || inHand.has("Elvish Guidance")) && (mana >= 1 || infiniteManaActive)) {
    const aura = inHand.has("Elvish Guidance") ? "Elvish Guidance"
      : inHand.has("Utopia Sprawl") ? "Utopia Sprawl" : "Wild Growth";
    const guidanceOutput = aura === "Elvish Guidance" ? elvesOnBoard + 1 : 2; // +1 for the elf we'll have
    results.push({
      priority: 9,
      category: "🌱 RAMP",
      headline: aura === "Elvish Guidance"
        ? `Elvish Guidance on Forest → Arbor Elf = ${guidanceOutput * 2} mana (${elvesOnBoard + 1} elves)`
        : `Enchant Forest with ${aura} → Arbor Elf = 3 mana`,
      detail: aura === "Elvish Guidance"
        ? `Elvish Guidance makes a Forest tap for {G} per elf. With ${elvesOnBoard + 1} elves, the Forest taps for ${guidanceOutput}. Arbor Elf untaps it for a second activation — ${guidanceOutput * 2} mana total from one Forest.`
        : `${aura} on a Forest + Arbor Elf untapping it = 3 mana from a single Forest. This is the fastest ramp pattern in the deck.`,
      steps: [
        aura === "Elvish Guidance"
          ? `Cast Elvish Guidance on a Forest.`
          : `Cast ${aura} on a Forest (choose green).`,
        aura === "Elvish Guidance"
          ? `Forest now taps for ${guidanceOutput} {G} (${elvesOnBoard + 1} elves).`
          : "Forest now taps for {G}{G}.",
        "Activate Arbor Elf: untap that Forest.",
        aura === "Elvish Guidance"
          ? `Tap Forest again for another ${guidanceOutput} {G} — ${guidanceOutput * 2} mana total this activation window.`
          : "Tap Forest again — 3 mana total.",
        "Each new elf you cast increases output by {G}.",
      ],
      color: "#52be80",
    });
  }

  // ---- HOPE TENDER + BIG LAND ----
  if (inHand.has("Hope Tender") && (mana >= 2 || infiniteManaActive)) {
    const hasYavimaya = board.has("Yavimaya, Cradle of Growth");
    const hasBigLand  = board.has("Gaea's Cradle") || board.has("Nykthos, Shrine to Nyx");
    const hasKogla    = board.has("Kogla, the Titan Ape");
    const hasUntapper = hasKogla || board.has("Wirewood Lodge") || board.has("Quirion Ranger") || board.has("Scryb Ranger");
    if (hasBigLand || hasYavimaya || hasUntapper) {
      const target = board.has("Gaea's Cradle") ? "Gaea's Cradle"
        : board.has("Nykthos, Shrine to Nyx") ? "Nykthos, Shrine to Nyx"
        : "a key land";
      results.push({
        priority: hasBigLand ? 8 : 6,
        category: "🌱 RAMP",
        headline: hasKogla
          ? `Cast Hope Tender — Kogla resets exert for repeatable ${target} untap`
          : `Cast Hope Tender — exert to untap ${target}`,
        detail: hasKogla
          ? `Hope Tender is a Human — Kogla returns it to hand on attack, completely resetting the exert. Cast, tap, exert to untap ${target}, then Kogla bounces it back. Repeatable every turn, or freely with infinite mana.`
          : `Hope Tender taps for {G} and can exert to untap any land. With ${target} in play, untapping it effectively doubles your mana output.`,
        steps: [
          `Cast Hope Tender ({1}{G}).`,
          `Tap Hope Tender for {G}, then exert: untap ${target}.`,
          `Tap ${target} for big mana.`,
          ...(hasKogla ? [
            "Kogla attacks: return Hope Tender (Human) to hand — exert fully resets.",
            "Recast and repeat next turn (or immediately with infinite mana).",
          ] : hasUntapper ? [
            board.has("Wirewood Lodge") ? "Wirewood Lodge ({G}): untap Hope Tender to reset exert." :
            "Quirion Ranger: return itself to hand to untap Hope Tender — resets exert.",
          ] : ["Add Kogla (best), Wirewood Lodge, or Quirion Ranger to reset the exert each turn."]),
        ],
        color: "#52be80",
      });
    }
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
        "If Ashaya + Yavimaya both resolve: Yavimaya makes all lands (including creature-lands) basic Forests → each creature taps to untap another → infinite mana."
      ],
      color: "#f39c12",
    });
  }

  // ---- SURVIVAL OF THE FITTEST ----
  if (board.has("Survival of the Fittest") && (hand.some(c => getCard(c)?.type === "creature") || infiniteManaActive)) {
    const targets = getSurvivalTargets(hand, battlefield);
    if (targets.length > 0) {
      const discardable = hand.filter(c => getCard(c)?.type === "creature");
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
  if (inHand.has("Natural Order")) {
    // ---- Check if Natural Order is an immediate WIN LINE ----
    // Two paths depending on what's available:
    //
    // PATH A — Natural Order → Formidable Speaker (when Speaker is in library & hand has a Forest to discard):
    //   Speaker ETB: discard a Forest → search for Ashaya.
    //   Ashaya in play → Quirion/Scryb + Dork = infinite mana.
    //   With infinite mana: Quirion bounces Speaker (now a Forest via Ashaya) → recast Speaker
    //   → ETB: discard any card → search for Duskwatch Recruiter → activate → WIN.
    //   Requires: Ranger on board, big dork on board, Forest in hand (to discard for ETB).
    //
    // PATH B — Natural Order → Ashaya directly (when Duskwatch is already in hand or on board):
    //   Ashaya in play → Quirion/Scryb + Dork = infinite mana → cast Duskwatch → WIN.
    //   Requires: Ranger on board, big dork on board, Duskwatch accessible.
    //
    // Natural Order is a sorcery — flag as WIN NEXT TURN on opponent's turn.
    const hasSacTarget = battlefield.some(c => getCard(c)?.type === "creature");
    if (hasSacTarget && mana >= 4 && !board.has("Ashaya, Soul of the Wild")) {
      const hasRanger = board.has("Quirion Ranger") || board.has("Scryb Ranger");
      const rangerName = board.has("Quirion Ranger") ? "Quirion Ranger" : "Scryb Ranger";
      const rangerRecastCost = board.has("Quirion Ranger") ? 1 : 2;
      const dorkThreshold = 1 + rangerRecastCost;
      const bigDorkNO = battlefield.find(c => {
        if (!getCard(c)?.tags?.includes("big-dork") && !getCard(c)?.tags?.includes("dork")) return false;
        const t = getCard(c)?.tapsFor;
        if (typeof t === "number") return t >= dorkThreshold;
        if (t === "elves")    return elvesOnBoard >= dorkThreshold;
        if (t === "creatures") return creaturesOnBoard >= dorkThreshold;
        if (t === "devotion") return devotionOnBoard >= dorkThreshold;
        return false;
      });

      if (hasRanger && bigDorkNO && !results.some(r => r.combo === "natural_order_ashaya_win")) {
        // Rank sacrifice targets: prefer expendable dorks over combo pieces.
        // Combo pieces to avoid sacrificing: Quirion Ranger, Scryb Ranger, Priest of Titania,
        // Seedborn Muse, Yeva, Yisan, Temur Sabertooth, Kogla, Ashaya, Duskwatch, etc.
        const COMBO_PIECES = new Set([
          "Quirion Ranger","Scryb Ranger","Priest of Titania","Seedborn Muse",
          "Yeva, Nature's Herald","Yisan, the Wanderer Bard","Temur Sabertooth",
          "Kogla, the Titan Ape","Ashaya, Soul of the Wild","Duskwatch Recruiter",
          "Argothian Elder","Wirewood Symbiote","Devoted Druid","Selvala, Heart of the Wilds",
          "Woodland Bellower","Eternal Witness","Destiny Spinner","Hyrax Tower Scout",
          "Earthcraft","Tireless Provisioner","Circle of Dreams Druid","Elvish Archdruid",
          "Fanatic of Rhonas","Magus of the Candelabra","Formidable Speaker",
        ]);
        const sacCandidates = battlefield
          .filter(c => getCard(c)?.type === "creature" && c !== bigDorkNO)
          .sort((a, b) => {
            const aCombo = COMBO_PIECES.has(a) ? 1 : 0;
            const bCombo = COMBO_PIECES.has(b) ? 1 : 0;
            if (aCombo !== bCombo) return aCombo - bCombo; // non-combo first
            return (getCard(a)?.cmc ?? 0) - (getCard(b)?.cmc ?? 0); // then lowest CMC
          });
        const sacTarget = sacCandidates[0] || bigDorkNO;
        const dorkOutput = (() => {
          const t = getCard(bigDorkNO)?.tapsFor;
          if (typeof t === "number") return t;
          if (t === "elves")    return elvesOnBoard;
          if (t === "creatures") return creaturesOnBoard;
          if (t === "devotion") return devotionOnBoard;
          return dorkThreshold;
        })();
        const netMana = dorkOutput - rangerRecastCost;
        const loopDesc = `net +${netMana}G per loop (infinite)`;

        // Determine which path is valid
        const duskwatchReady = board.has("Duskwatch Recruiter") || accessible("Duskwatch Recruiter");
        // Path A: Speaker in library (always true if not on board), need something to discard for ETB.
        // The discard can come from: any card in hand (other than Natural Order itself),
        // OR a Forest bounced from battlefield via Scryb/Quirion Ranger.
        const hasForestInHand = hand.some(c => c === "Forest" || (getCard(c)?.type === "land" && c.toLowerCase().includes("forest")));
        const hasOtherCardInHand = hand.some(c => c !== "Natural Order");
        const hasBattlefieldForest = battlefield.some(c => c === "Forest" || getCard(c)?.tags?.includes("basic"));
        const scrybCanBounceForest = board.has("Scryb Ranger") && hasBattlefieldForest;
        const quirionCanBounceForest = board.has("Quirion Ranger") && hasBattlefieldForest;
        const hasDiscardForSpeaker = hasOtherCardInHand || scrybCanBounceForest || quirionCanBounceForest;
        const speakerNotOnBoard = !board.has("Formidable Speaker");
        const pathA = speakerNotOnBoard && hasDiscardForSpeaker;
        const pathB = duskwatchReady;

        if (!pathA && !pathB) {
          // No clean win line — fall through to generic advice
        } else {
          let headline, detail, steps;
          if (pathA) {
            // Preferred: Natural Order → Speaker → ETB → Ashaya → infinite → bounce Speaker → Duskwatch
            const forestInHand = hand.find(c => c === "Forest" || (getCard(c)?.type === "land" && c.toLowerCase().includes("forest")));
            const otherCardInHand = hand.find(c => c !== "Natural Order");
            const bounceRangerForForest = !hasOtherCardInHand && (scrybCanBounceForest || quirionCanBounceForest);
            const bounceRanger = scrybCanBounceForest ? "Scryb Ranger" : "Quirion Ranger";
            const discardSource = otherCardInHand || "Forest (bounced from battlefield)";
            headline = `Natural Order → Formidable Speaker → ETB finds Ashaya → ${rangerName} loop → bounce Speaker → find Duskwatch → WIN`;
            detail = `Natural Order puts Formidable Speaker onto the battlefield. Speaker ETB: discard ${discardSource} → search library for Ashaya, Soul of the Wild. Ashaya makes all creatures Forests — ${rangerName} bounces itself to untap ${bigDorkNO} (${loopDesc}). With infinite mana: ${rangerName} bounces Speaker back to hand, recast Speaker ({2}{G}), ETB again: discard any card → find Duskwatch Recruiter. Activate → WIN.`;
            steps = [
              ...(bounceRangerForForest ? [
                `Activate ${bounceRanger}: return a Forest from battlefield to hand — this gives you a card to discard for Speaker's ETB.`,
              ] : []),
              `Cast Natural Order ({2}{G}{G}): sacrifice ${sacTarget !== bigDorkNO ? sacTarget : "any green creature"} → search library for Formidable Speaker, put it onto the battlefield.`,
              `Formidable Speaker ETB: discard ${discardSource} from hand → search library for Ashaya, Soul of the Wild. Put Ashaya into your hand, then shuffle.`,
              `Cast Ashaya, Soul of the Wild. All your nontoken creatures are now Forest lands.`,
              `${rangerName} is now a Forest. Activate: return ${rangerName} to hand — untaps ${bigDorkNO}.`,
              `Tap ${bigDorkNO} for ${dorkOutput} mana. Recast ${rangerName} ({${rangerRecastCost === 1 ? "G" : "1}{G"}}). ${loopDesc}.`,
              `Repeat for infinite green mana.`,
              `Activate ${rangerName}: return Formidable Speaker (now a Forest via Ashaya) to your hand — untaps ${bigDorkNO}.`,
              `Recast Formidable Speaker ({2}{G}). ETB: discard any card → search library for Duskwatch Recruiter.`,
              `Cast Duskwatch Recruiter ({1}{G}). Activate ({2}{G}) repeatedly — assemble Endurance + Geier Reach Sanitarium win pile.`,
            ];
          } else {
            // Path B: Duskwatch already available — simpler
            headline = `Natural Order → Ashaya → ${rangerName} + ${bigDorkNO} = infinite mana → Duskwatch → WIN`;
            detail = `Natural Order fetches Ashaya, Soul of the Wild. Ashaya makes all nontoken creatures Forests — ${rangerName} bounces itself to untap ${bigDorkNO} (${dorkOutput} mana, ${loopDesc}). True infinite mana. Cast Duskwatch Recruiter (already in ${board.has("Duskwatch Recruiter") ? "play" : "hand"}) → activate → WIN.`;
            steps = [
              `Cast Natural Order ({2}{G}{G}): sacrifice ${sacTarget !== bigDorkNO ? sacTarget : "any green creature"} → search library for Ashaya, Soul of the Wild, put it onto the battlefield.`,
              `Ashaya enters — all your nontoken creatures are now Forest lands.`,
              `${rangerName} is now a Forest. Activate: return ${rangerName} to your hand — this untaps ${bigDorkNO}.`,
              `Tap ${bigDorkNO} for ${dorkOutput} mana. Recast ${rangerName}. ${loopDesc}.`,
              `Repeat for infinite green mana.`,
              `Cast Duskwatch Recruiter ({1}{G}). Activate ({2}{G}) repeatedly — assemble Endurance + Geier Reach Sanitarium win pile.`,
            ];
          }

          if (isMyTurn) {
            results.push({
              priority: 16,
              category: "⚡ CAST TO WIN",
              headline,
              combo: "natural_order_ashaya_win",
              detail,
              steps,
              color: "#ff4500",
            });
          } else {
            results.push({
              priority: 15,
              category: "⏭️ WIN NEXT TURN",
              headline: `NEXT TURN: ${headline}`,
              combo: "natural_order_ashaya_win",
              detail: `Natural Order is a sorcery — cast it on your next turn. ${detail} Hold your hand — do not sacrifice any creatures or discard Forests.`,
              steps: [`Wait for your turn. You have the win in hand.`, ...steps],
              color: "#e67e22",
            });
          }
        }
      }
    }
  }

  // ---- Eternal Witness retrieves Natural Order from graveyard → WIN ----
  // Cast Witness (3) → ETB retrieves Natural Order → cast Natural Order (4) → fetch Speaker
  // → Speaker ETB → find Ashaya (hand) → cast Ashaya (5) → loop → WIN.
  // Total mana needed: 3 + 4 + 5 = 12 minimum.
  // IMPORTANT: Natural Order requires sacrificing a creature. The ranger is required for the
  // loop and must NOT be the sac target — need a separate expendable creature.
  // Witness access paths:
  //   A) Eternal Witness in hand (standard)
  //   B) Fauna Shaman on board + Witness in graveyard + creature to discard (costs 1G extra → 13 mana)
  const witnessInHandForNO = inHand.has("Eternal Witness") && !board.has("Eternal Witness");
  const faunaFetchesWitnessForNO = faunaCanFetchWitness() && !board.has("Eternal Witness");
  const witnessAccessibleForNO = witnessInHandForNO || faunaFetchesWitnessForNO;
  const witnessManaCostNO = faunaFetchesWitnessForNO && !witnessInHandForNO ? 4 : 3; // Fauna(1) + Witness(3) vs Witness(3)
  // After Witness enters, tap any big dork for mana before casting Natural Order.
  // Witness itself adds 1 to elf/creature count — so Priest taps for elvesOnBoard+1, etc.
  // Calculate how much mana a dork can produce *after* Witness is on the battlefield.
  const dorkManaAfterWitness = (() => {
    for (const c of battlefield) {
      if (!getCard(c)) continue;
      const t = getCard(c).tapsFor;
      if (typeof t === "number" && t >= 2) return t;
      if (t === "elves")     return elvesOnBoard;          // Witness is NOT an elf
      if (t === "creatures") return creaturesOnBoard + 1;  // +1 for Witness (any creature)
      if (t === "devotion")  return devotionOnBoard + (getCard(c)?.devotion ?? 0); // Witness devotion 1
    }
    return 0;
  })();
  // Net cost = Witness + Natural Order + Ashaya, minus any dork mana tapped after Witness resolves
  const minManaNO = witnessManaCostNO + 4 + 5 - dorkManaAfterWitness;
  if (
    isMyTurn &&
    witnessAccessibleForNO &&
    inGrave.has("Natural Order") && !inHand.has("Natural Order") &&
    mana >= minManaNO &&
    !board.has("Ashaya, Soul of the Wild") &&
    !results.some(r => r.combo === "natural_order_ashaya_win")
  ) {
    const hasRanger = board.has("Quirion Ranger") || board.has("Scryb Ranger");
    const rangerName = board.has("Quirion Ranger") ? "Quirion Ranger" : "Scryb Ranger";
    const rangerRecastCost = board.has("Quirion Ranger") ? 1 : 2;
    const dorkThreshold = 1 + rangerRecastCost;
    // Ranger is essential for the loop — must NOT be sacrificed to Natural Order
    const LOOP_PIECES = new Set(["Quirion Ranger","Scryb Ranger","Priest of Titania","Seedborn Muse","Yeva, Nature's Herald","Elvish Archdruid","Circle of Dreams Druid"]);
    // Need a creature to sac that is NOT the ranger and NOT the dork powering the loop
    const bigDork = battlefield.find(c => {
      if (!getCard(c)?.tags?.includes("big-dork") && !getCard(c)?.tags?.includes("dork")) return false;
      const t = getCard(c)?.tapsFor;
      if (typeof t === "number") return t >= dorkThreshold;
      if (t === "elves")    return (elvesOnBoard + 1) >= dorkThreshold; // +1 for Witness
      if (t === "creatures") return (creaturesOnBoard + 1) >= dorkThreshold;
      if (t === "devotion") return (devotionOnBoard + 1) >= dorkThreshold;
      return false;
    });
    const sacCandidates = battlefield.filter(c =>
      getCard(c)?.type === "creature" &&
      c !== bigDork &&
      c !== rangerName &&        // ranger must survive for the loop
      !LOOP_PIECES.has(c)        // prefer not to sac other loop pieces either
    );
    // Fall back to any non-ranger, non-dork creature if no clean target
    const sacFallback = battlefield.filter(c =>
      getCard(c)?.type === "creature" && c !== bigDork && c !== rangerName
    );
    const sacTarget = sacCandidates[0] || sacFallback[0] || null;
    // Discard source for Speaker ETB
    const discardCard = hand.find(c => c !== "Eternal Witness") || null;
    const hasBattlefieldForest = battlefield.some(c => c === "Forest" || getCard(c)?.tags?.includes("basic"));
    const rangerCanBounce = hasBattlefieldForest && hasRanger;
    const hasDiscardForSpeaker = !!discardCard || rangerCanBounce;

    if (hasRanger && bigDork && sacTarget && hasDiscardForSpeaker) {
      const dorkOutput = (() => {
        const t = getCard(bigDork)?.tapsFor;
        if (typeof t === "number") return t;
        if (t === "elves")    return elvesOnBoard + 1;
        if (t === "creatures") return creaturesOnBoard + 1;
        if (t === "devotion") return devotionOnBoard + 1;
        return dorkThreshold;
      })();
      const netMana = dorkOutput - rangerRecastCost;
      const discardDesc = discardCard || `a Forest (bounce from battlefield via ${rangerName})`;
      const bounceFirstStep = !discardCard && rangerCanBounce
        ? [`Activate ${rangerName}: return a Forest from battlefield to hand — discard source for Speaker's ETB.`]
        : [];
      const faunaFirstSteps = faunaFetchesWitnessForNO && !witnessInHandForNO
        ? [`Activate Fauna Shaman ({G}): discard ${hand.find(c => getCard(c)?.type === "creature") || "a creature"} → search for Eternal Witness. Put Witness into your hand.`]
        : [];
      const headlinePrefix = faunaFetchesWitnessForNO && !witnessInHandForNO
        ? "Fauna Shaman → fetch Eternal Witness → retrieve Natural Order"
        : "Cast Eternal Witness → retrieve Natural Order";

      results.push({
        priority: 16,
        category: "⚡ CAST TO WIN",
        headline: `${headlinePrefix} → Speaker → find Ashaya → ${rangerName} loop → WIN`,
        combo: "natural_order_ashaya_win",
        detail: `${faunaFetchesWitnessForNO && !witnessInHandForNO ? "Fauna Shaman fetches Eternal Witness from graveyard. " : ""}Cast Eternal Witness (3 mana) → ETB retrieves Natural Order from graveyard. Cast Natural Order (4 mana, sacrifice ${sacTarget}) → fetch Formidable Speaker. Speaker ETB: discard ${discardDesc} → find Ashaya (5 mana to cast). Ashaya + ${rangerName} + ${bigDork} = infinite mana. Loop bounces Speaker → find Duskwatch → WIN.`,
        steps: [
          ...faunaFirstSteps,
          `Cast Eternal Witness ({2}{G}): ETB retrieves Natural Order from graveyard.`,
          ...bounceFirstStep,
          `Cast Natural Order ({2}{G}{G}): sacrifice ${sacTarget} → search for Formidable Speaker, put it onto the battlefield.`,
          `Formidable Speaker ETB: discard ${discardDesc} → search library for Ashaya, Soul of the Wild.`,
          `Cast Ashaya, Soul of the Wild ({3}{G}{G}). All your nontoken creatures are now Forest lands.`,
          `${rangerName} is now a Forest. Activate: return ${rangerName} to hand — untaps ${bigDork}.`,
          `Tap ${bigDork} for ${dorkOutput} mana. Recast ${rangerName}. Net +${netMana}G per loop (infinite).`,
          `Activate ${rangerName}: return Formidable Speaker to hand — untaps ${bigDork}. Recast Speaker ({2}{G}): ETB — discard any card → find Duskwatch Recruiter.`,
          `Cast Duskwatch Recruiter. Activate repeatedly → assemble win pile → Sanitarium mill win.`,
        ],
        color: "#ff4500",
      });
    }
  }

  if (inHand.has("Natural Order") && isMyTurn) {
    const hasSacTarget = battlefield.some(c => getCard(c)?.type === "creature");
    if (hasSacTarget && (mana >= 4 || infiniteManaActive)) {
      // Ashaya win line already handled above — only show generic advice if no win line
      if (results.some(r => r.combo === "natural_order_ashaya_win")) {
        // Win line already emitted — skip generic advice
      } else {
      // Prioritise targets based on current board state
      const has3drop = battlefield.some(c => getCard(c)?.cmc === 3 && getCard(c)?.type === "creature");
      const has1drop = battlefield.some(c => getCard(c)?.cmc === 1 && getCard(c)?.type === "creature");

      // Build ranked target list based on what's missing and what unlocks
      const targetList = [
        {
          name: "Woodland Bellower",
          condition: !board.has("Woodland Bellower") && !board.has("Duskwatch Recruiter"),
          why: "ETB fetches any non-legendary CMC≤3 creature — effectively 2 creatures for 1 card",
          sacNote: "Sac a 3-drop for best mana efficiency",
          follow: "Best Bellower targets: Duskwatch Recruiter (win con with ∞ mana), Destiny Spinner (haste), Eternal Witness, Quirion Ranger",
        },
        {
          name: "Ashaya, Soul of the Wild",
          condition: !board.has("Ashaya, Soul of the Wild"),
          why: "unlocks all infinite mana combos — all creatures become Forests",
          sacNote: "Sac a 3-drop (CMC 3 = optimal sacrifice for CMC 5 target)",
          follow: "With Ashaya in play, any dork + ranger creates infinite mana",
        },
        {
          name: "Temur Sabertooth",
          condition: !board.has("Temur Sabertooth") && !board.has("Kogla, the Titan Ape") && board.has("Ashaya, Soul of the Wild"),
          why: "bouncer for infinite ETB loops — needed to convert ∞ mana into a win",
          sacNote: "Sac any creature you can spare",
          follow: "Sabertooth + any ETB creature + infinite mana = loop to win",
        },
        {
          name: "Kogla, the Titan Ape",
          condition: !board.has("Kogla, the Titan Ape") && !board.has("Temur Sabertooth") && board.has("Ashaya, Soul of the Wild"),
          why: "bouncer for humans + artifact/enchantment removal",
          sacNote: "Sac any creature you can spare",
          follow: "Kogla returns humans to hand on attack — pairs with Eternal Witness",
        },
        {
          name: "Duskwatch Recruiter",
          condition: !board.has("Duskwatch Recruiter") && infiniteManaActive,
          why: "win condition — activate repeatedly to pull entire library",
          sacNote: "Sac anything",
          follow: "With infinite mana, Duskwatch finds Endurance + win pile",
        },
        {
          name: "Woodland Bellower",
          condition: !board.has("Woodland Bellower"),
          why: "ETB finds any non-legendary CMC≤3 creature",
          sacNote: "Sac a 3-drop",
          follow: "Best targets: Duskwatch Recruiter, Eternal Witness, Destiny Spinner",
        },
      ].filter(t => t.condition && !board.has(t.name));

      const best = targetList[0] || {
        name: "Ashaya, Soul of the Wild",
        why: "combo engine",
        sacNote: "Sac a 3-drop",
        follow: "",
      };

      results.push({
        priority: 9,
        category: "🎯 NATURAL ORDER",
        headline: `Natural Order → ${best.name}`,
        detail: `Sacrifice a green creature to put ${best.name} directly onto the battlefield. ${best.why}. Natural Order costs {2}{G}{G} — pay 4 total.`,
        steps: [
          `Cast Natural Order ({2}{G}{G}): ${best.sacNote}. Sacrifice → put ${best.name} onto battlefield.`,
          best.follow,
          ...(!has3drop && best.sacNote.includes("3-drop") ? ["Tip: no 3-drop available — sac any green creature. A 1-drop is still fine."] : []),
          ...(targetList.length > 1 ? [`Other strong targets right now: ${targetList.slice(1, 3).map(t => t.name).join(", ")}.`] : []),
        ].filter(Boolean),
        color: "#5dade2",
      });
      } // end else (generic Natural Order advice — no instant win line available)
    }
  }

  // ---- ELDRITCH EVOLUTION ----
  if (inHand.has("Eldritch Evolution") && isMyTurn) {
    // Sacrifice a creature, find one with CMC <= sacrificed CMC + 2.
    // Key line: sac 1-drop dork → find CMC<=3 (Eternal Witness, Hyrax Tower Scout, Heartwood Storyteller)
    // Or: sac 3-drop → find CMC<=5 (Ashaya!)
    const sacCandidates = battlefield.filter(c => getCard(c)?.type === "creature")
      .sort((a,b) => (getCard(a)?.cmc ?? 0) - (getCard(b)?.cmc ?? 0));
    if (sacCandidates.length > 0 && (mana >= 3 || infiniteManaActive)) {
      const bestSac = sacCandidates[0]; // lowest CMC to sacrifice
      const maxCmc  = (getCard(bestSac)?.cmc ?? 1) + 2;
      // Find the best missing target at or below maxCmc
      const targetPriority = [
        "Ashaya, Soul of the Wild",  // CMC 5 — sac a 3-drop
        "Eternal Witness",           // CMC 3 — sac a 1-drop
        "Heartwood Storyteller",     // CMC 3 — sac a 1-drop: strong stax/draw early
        "Hyrax Tower Scout",         // CMC 3 — sac a 1-drop
        "Duskwatch Recruiter",       // CMC 2 — sac a 0-drop (Dryad Arbor)
        "Destiny Spinner",           // CMC 2
        "Quirion Ranger",            // CMC 1 — rarely worth sacrificing for
      ].filter(t => !board.has(t) && (getCard(t)?.cmc ?? 0) <= maxCmc);
      const target = targetPriority[0];
      if (target) {
        const sacName = bestSac;
        const sacCmc  = getCard(bestSac)?.cmc ?? 1;
        results.push({
          priority: 8,
          category: "🎯 TUTOR",
          headline: `Eldritch Evolution: sac ${sacName} (CMC ${sacCmc}) → find ${target} (CMC ${getCard(target)?.cmc})`,
          detail: sacCmc === 1 && target === "Heartwood Storyteller"
            ? "Powerful early line: turn 1 dork → turn 2 Heartwood Storyteller. Punishes opponents for casting non-creature spells, drawing you cards while applying stax pressure."
            : `Sacrifice ${sacName} to find ${target} — ${getCard(target)?.cmc ?? 0} ≤ ${sacCmc} + 2. ${target} enters the battlefield directly.`,
          steps: [
            `Cast Eldritch Evolution ({1}{G}{G}): sacrifice ${sacName} → search for ${target} (CMC ${getCard(target)?.cmc}).`,
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
      { name: "Hope Tender",           xCost: 2, reason: "exert untaps Cradle or Nykthos — double your biggest land's output" },
      { name: "Destiny Spinner",       xCost: 2, reason: "haste + uncounterable for creatures and enchantments" },
      { name: "Fauna Shaman",          xCost: 2, reason: "repeatable creature tutor" },
      { name: "Quirion Ranger",        xCost: 1, reason: "infinite mana loop piece with Ashaya" },
      { name: "Elvish Reclaimer",      xCost: 1, reason: "land tutor for Cradle / Sanitarium / Nykthos" },
      { name: "Ashaya, Soul of the Wild", xCost: 5, reason: "combo engine — all creatures become Forests" },
      { name: "Seedborn Muse",           xCost: 4, reason: "untap all permanents on each opponent's untap — enables free activations every turn" },
      { name: "Eternal Witness",         xCost: 3, reason: "retrieve key piece from graveyard" },
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

  // ---- CHORD OF CALLING ----
  // Instant-speed creature tutor. Convoke reduces cost by tapping creatures.
  // Key: can be cast on opponent's end step at instant speed — huge with Yeva flash.
  if (accessible("Chord of Calling")) {
    const convokeTap   = Math.min(creaturesOnBoard, 7); // tap up to 7 creatures for convoke
    const remainder    = Math.max(0, 7 - convokeTap);   // remaining mana needed for X=5 (Ashaya)
    const effectiveMana = mana + convokeTap;             // mana + convoke = effective casting power

    // Build ranked target list based on what's castable and what's missing
    const chordTargets = [
      { name: "Duskwatch Recruiter",      xCost: 3, reason: "win condition — activate ({2}{G}) with infinite mana, looks at top 3 cards each time" },
      { name: "Quirion Ranger",           xCost: 1, reason: "infinite mana loop piece with Ashaya" },
      { name: "Hope Tender",              xCost: 2, reason: "exert untaps a key land like Cradle or Nykthos for double mana" },
      { name: "Wirewood Symbiote",        xCost: 1, reason: "untap engine — bounces an elf to untap any creature" },
      { name: "Elvish Reclaimer",         xCost: 1, reason: "tutors Cradle, Sanitarium, or Nykthos" },
      { name: "Destiny Spinner",          xCost: 2, reason: "gives haste to creature-lands + makes your spells uncounterable" },
      { name: "Eternal Witness",          xCost: 3, reason: "retrieves any card from graveyard" },
      { name: "Temur Sabertooth",         xCost: 4, reason: "bounce engine for infinite ETB loops" },
      { name: "Ashaya, Soul of the Wild", xCost: 5, reason: "all creatures become Forests — unlocks all infinite mana combos" },
      { name: "Hyrax Tower Scout",        xCost: 3, reason: "untaps a land on ETB — combo piece with Temur Sabertooth" },
      { name: "Seedborn Muse",            xCost: 5, reason: "untaps all permanents each opponent's turn — game-changing engine" },
      { name: "Kogla, the Titan Ape",     xCost: 6, reason: "bouncer + removal, returns humans on attack" },
    ].filter(t => !board.has(t.name) && effectiveMana >= t.xCost + 1);

    if (chordTargets.length > 0) {
      const best = chordTargets[0];
      const convokeCost = Math.min(convokeTap, best.xCost + 1);
      const payMana     = Math.max(0, best.xCost + 1 - convokeTap);
      const canFlash    = !isMyTurn; // Chord is instant — most powerful at flash timing

      results.push({
        priority: canFlash && board.has("Ashaya, Soul of the Wild") ? 9 : 8,
        category: canFlash ? "⚡ CHORD — INSTANT SPEED" : "🎯 CHORD OF CALLING",
        headline: `Chord of Calling (X=${best.xCost}) → ${best.name}${canFlash ? " — cast NOW at instant speed" : ""}`,
        detail: `Chord of Calling finds ${best.name} and puts it directly onto the battlefield. Convoke lets you tap creatures to reduce the cost — tap ${convokeCost} creature${convokeCost !== 1 ? "s" : ""} to pay {${convokeCost}} of the cost.${canFlash ? " Chord is an instant — cast this on an opponent's end step while they're tapped out." : ""}`,
        steps: [
          `Cast Chord of Calling with X=${best.xCost}: tap ${convokeCost} creature${convokeCost !== 1 ? "s" : ""} (convoke) + pay {${payMana}} mana.`,
          `${best.name} enters the battlefield — ${best.reason}.`,
          ...(canFlash ? [
            "INSTANT SPEED TIP: Cast on the end step of the opponent to your right — they've already taken their turn and the next player hasn't untapped yet.",
            board.has("Ashaya, Soul of the Wild") ? "With Ashaya in play, the creature enters as a Forest immediately — combo pieces can start untapping right away." : "",
          ].filter(Boolean) : []),
          ...(chordTargets.length > 1 ? [`Other strong targets: ${chordTargets.slice(1, 3).map(t => `X=${t.xCost} ${t.name}`).join(", ")}.`] : []),
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

  // ---- NATURE'S RHYTHM ON BATTLEFIELD ----
  // Each upkeep: search library for a creature with CMC ≤ lands you control.
  // Persistent tutor engine — advise what to find next upkeep based on current board.
  if (board.has("Nature's Rhythm")) {
    const landsOnBoard = battlefield.filter(c => getCard(c)?.type === "land").length;
    const nrBoardTargets = [
      { name: "Ashaya, Soul of the Wild",  xCost: 5, reason: "unlocks all infinite mana combos" },
      { name: "Duskwatch Recruiter",        xCost: 2, reason: "win condition with infinite mana" },
      { name: "Priest of Titania",          xCost: 2, reason: "big mana dork" },
      { name: "Elvish Archdruid",           xCost: 3, reason: "big mana dork + elf pump" },
      { name: "Quirion Ranger",             xCost: 1, reason: "infinite mana loop piece" },
      { name: "Argothian Elder",            xCost: 4, reason: "untap engine, goes infinite with Lodge" },
      { name: "Temur Sabertooth",           xCost: 4, reason: "bounce engine for ETB loops" },
      { name: "Eternal Witness",            xCost: 3, reason: "recursion for any missing piece" },
      { name: "Hope Tender",                xCost: 2, reason: "untap big land, Kogla resets exert" },
      { name: "Destiny Spinner",            xCost: 2, reason: "haste + uncounterable protection" },
      { name: "Allosaurus Shepherd",        xCost: 1, reason: "makes elves uncounterable" },
    ].filter(t => !board.has(t.name) && t.xCost <= landsOnBoard);

    if (nrBoardTargets.length > 0) {
      const best = nrBoardTargets[0];
      results.push({
        priority: 6,
        category: "🔄 NATURE'S RHYTHM ENGINE",
        headline: `Nature's Rhythm: fetch ${best.name} next upkeep (CMC ${best.xCost} ≤ ${landsOnBoard} lands)`,
        detail: `Nature's Rhythm tutors a creature with CMC ≤ your land count (${landsOnBoard}) at each upkeep for free. Plan your next fetch now.`,
        steps: [
          `Next upkeep: search for ${best.name} (CMC ${best.xCost}) — ${best.reason}.`,
          ...(nrBoardTargets.length > 1 ? [
            `Alternative targets: ${nrBoardTargets.slice(1, 3).map(t => `${t.name} (${t.xCost})`).join(", ")}.`,
          ] : []),
          `Current land count: ${landsOnBoard}. Max CMC you can find: ${landsOnBoard}.`,
          landsOnBoard >= 5 ? "With 5+ lands you can tutor Ashaya or Temur Sabertooth directly." : `Play more lands to unlock higher-CMC targets (need ${5 - landsOnBoard} more for Ashaya).`,
        ],
        color: "#5dade2",
      });
    }
  }

  // ---- SUMMONER'S PACT ----
  // Summoner's Pact is free to cast but creates a mandatory upkeep trigger:
  // "At the beginning of your next upkeep, pay {2}{G}{G}. If you don't, you lose."
  // This is a common mistake — forgetting to pay costs games.
  if (inHand.has("Summoner's Pact")) {
    const pactTargets = [
      { name: "Duskwatch Recruiter",      reason: "win condition with infinite mana — highest priority" },
      { name: "Quirion Ranger",           reason: "infinite mana loop piece with Ashaya" },
      { name: "Ashaya, Soul of the Wild", reason: "unlocks all infinite mana combos" },
      { name: "Eternal Witness",          reason: "retrieves key piece from graveyard" },
      { name: "Temur Sabertooth",         reason: "bounce engine for infinite ETB loops" },
      { name: "Hope Tender",              reason: "exert untaps big land, Kogla resets exert" },
      { name: "Destiny Spinner",          reason: "haste + uncounterable protection" },
      { name: "Wirewood Symbiote",        reason: "untap engine" },
    ].filter(t => !board.has(t.name));

    const best = pactTargets[0];
    results.push({
      priority: 7,
      category: "⚡ SUMMONER'S PACT — FREE",
      headline: best
        ? `Summoner's Pact (free) → ${best.name} — ⚠️ pay {2}{G}{G} next upkeep`
        : "Summoner's Pact available — ⚠️ pay {2}{G}{G} next upkeep or lose",
      detail: `Summoner's Pact costs {0} to cast but creates a mandatory delayed trigger: at the beginning of your NEXT upkeep you must pay {2}{G}{G} or you lose the game immediately. Cast it now ${best ? `to find ${best.name}` : "for the best available target"}, but only if you can pay 4 mana next turn.`,
      steps: [
        "⚠️ BEFORE casting: confirm you will have {2}{G}{G} (4 mana) available on your next upkeep.",
        `Cast Summoner's Pact ({0}): find ${best ? best.name : "target green creature"} → put into hand.`,
        ...(best ? [`${best.name}: ${best.reason}.`] : []),
        "MANDATORY: On your next upkeep, pay {2}{G}{G} immediately or you lose the game.",
        "TIP: If you will win this turn or next turn before your upkeep, the trigger is irrelevant.",
        ...(pactTargets.length > 1 ? [`Other targets: ${pactTargets.slice(1, 3).map(t => t.name).join(", ")}.`] : []),
      ],
      color: "#e74c3c",
    });
  }

  // ---- SUMMONER'S PACT UPKEEP REMINDER ----
  // Pact goes to the graveyard after resolving. If it's there on our turn,
  // the delayed trigger is live — pay {2}{G}{G} or lose.
  if (isMyTurn && inGrave.has("Summoner's Pact")) {
    results.push({
      priority: 14,
      category: "⚠️ PACT UPKEEP — PAY NOW",
      headline: "Summoner's Pact in graveyard — pay {2}{G}{G} this upkeep or lose",
      detail: "Summoner's Pact was cast last turn. Its delayed trigger is on the stack at the start of your upkeep: pay {2}{G}{G} immediately or you lose the game. Do this before any other actions.",
      steps: [
        "PAY {2}{G}{G} right now — this is mandatory, not optional.",
        "Only skip payment if you will win before your upkeep resolves (e.g. you have a kill on the stack).",
        "Move Pact to exile or hand after paying to clear this reminder.",
      ],
      color: "#e74c3c",
    });
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

  // ---- FETCH + TIRELESS PROVISIONER RAMP ----
  // Each fetch land cracking = landfall on Tireless Provisioner = free Treasure token.
  // With Ashaya: every creature ETB is also a Forest ETB → landfall → Treasure.
  // This pattern isn't infinite but provides powerful early acceleration toward combo.
  {
    const provisionerOnBoard = board.has("Tireless Provisioner");
    const provisionerInHand  = inHand.has("Tireless Provisioner") && (isMyTurn || yevaAvailable);
    const provisionerAvail   = provisionerOnBoard || provisionerInHand;
    const fetchesInHand      = hand.filter(c => getCard(c)?.tags?.includes("fetch")).length;
    const ashayaOnBoard      = board.has("Ashaya, Soul of the Wild");

    if (provisionerAvail && !infiniteManaActive) {
      const treasurePerFetch  = fetchesInHand;
      const creaturesInHand   = ashayaOnBoard
        ? hand.filter(c => getCard(c)?.type === "creature").length
        : 0;

      const bonuses = [];
      if (fetchesInHand > 0)
        bonuses.push(`${fetchesInHand} fetch land${fetchesInHand > 1 ? "s" : ""} in hand → ${fetchesInHand} free Treasure${fetchesInHand > 1 ? "s" : ""} when cracked`);
      if (ashayaOnBoard && creaturesInHand > 0)
        bonuses.push(`Ashaya + ${creaturesInHand} creature${creaturesInHand > 1 ? "s" : ""} in hand → ${creaturesInHand} Treasure${creaturesInHand > 1 ? "s" : ""} on ETB`);

      if (bonuses.length > 0 || provisionerOnBoard) {
        const totalTreasures = treasurePerFetch + (ashayaOnBoard ? creaturesInHand : 0);
        results.push({
          priority: 5,
          category: "💰 FETCH + PROVISIONER RAMP",
          headline: provisionerOnBoard
            ? `Tireless Provisioner: crack fetches or cast creatures for ${totalTreasures > 0 ? `${totalTreasures} free Treasure${totalTreasures > 1 ? "s" : ""}` : "Treasures"}`
            : `Cast Tireless Provisioner — each land/creature ETB generates a Treasure`,
          detail: `Tireless Provisioner creates a Treasure token whenever a land enters the battlefield. Fetch lands are a 1-for-1 Treasure source. With Ashaya, every creature cast also triggers landfall.`,
          steps: [
            ...(provisionerInHand ? [`Cast Tireless Provisioner ({2}{G}).`] : []),
            ...(fetchesInHand > 0 ? [`Crack ${fetchesInHand} fetch land${fetchesInHand > 1 ? "s" : ""}: each land ETB triggers Provisioner → ${fetchesInHand} Treasure token${fetchesInHand > 1 ? "s" : ""}. Net gain: ${fetchesInHand} mana (sacrifice Treasures later).`] : []),
            ...(ashayaOnBoard && creaturesInHand > 0 ? [`Ashaya is on board — every creature cast becomes a Forest ETB, triggering Provisioner. Cast ${creaturesInHand} creature${creaturesInHand > 1 ? "s" : ""} from hand → ${creaturesInHand} additional Treasure${creaturesInHand > 1 ? "s" : ""}.`] : []),
            "Each Treasure taps for {1} of any color — flexible mana for your next play.",
            "Priority: use this to bridge toward Ashaya or the first infinite mana piece rather than holding open.",
          ],
          color: "#f39c12",
        });
      }
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
    const regalCastable = regalInHand && (mana >= 7 || infiniteManaActive) && (isMyTurn || yevaAvailable);
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
        if (s.includes("Duskwatch") && (board.has("Duskwatch Recruiter") || accessible("Duskwatch Recruiter"))) return false;
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
        ...(!board.has("Duskwatch Recruiter") && !accessible("Duskwatch Recruiter")
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
  if ((inHand.has("Fierce Empath") || board.has("Fierce Empath")) && (isMyTurn || yevaAvailable)) {
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

  // ---- TUTOR → FORMIDABLE SPEAKER WIN PATH --------------------------------
  // If Quirion/Scryb Ranger + a big dork are on board and Speaker isn't accessible,
  // any tutor that can find Speaker (green creature, CMC 3) is effectively a win.
  // Cast tutor → get Speaker → bounce loop via Quirion → find Ashaya → loop freely.
  {
    const hasRangerForSpeaker   = board.has("Quirion Ranger") || board.has("Scryb Ranger");
    const speakerAlreadyAccess  = board.has("Formidable Speaker") || inHand.has("Formidable Speaker");
    const hasBigDorkForSpeaker  = board.has("Priest of Titania") || board.has("Circle of Dreams Druid")
      || board.has("Elvish Archdruid") || board.has("Karametra's Acolyte");

    if (hasRangerForSpeaker && !speakerAlreadyAccess && hasBigDorkForSpeaker) {
      const dorkName = board.has("Priest of Titania") ? "Priest of Titania"
        : board.has("Circle of Dreams Druid") ? "Circle of Dreams Druid"
        : board.has("Elvish Archdruid") ? "Elvish Archdruid"
        : "Karametra's Acolyte";

      // Determine the best available tutor for Speaker (green creature, CMC 3)
      const speakerCmc = 3;
      let tutorName = null, tutorCost = null, tutorNote = null, tutorNow = false;

      const gszCost = speakerCmc + 1; // X=3 + {G}
      if (inHand.has("Green Sun's Zenith") && isMyTurn && (mana >= gszCost || infiniteManaActive)) {
        tutorName = "Green Sun's Zenith"; tutorCost = `{${speakerCmc}}{G}`;
        tutorNote = `Green Sun's Zenith (X=${speakerCmc}): search library for Formidable Speaker, put it directly onto the battlefield.`;
        tutorNow = true;
      } else if (inHand.has("Green Sun's Zenith") && !isMyTurn && (mana >= gszCost || infiniteManaActive)) {
        // GSZ is a sorcery — can't cast on opponent's turn, but will be able to next turn
        tutorName = "Green Sun's Zenith (next turn)"; tutorCost = `{${speakerCmc}}{G}`;
        tutorNote = `On your next turn: cast Green Sun's Zenith (X=${speakerCmc}) → Formidable Speaker enters the battlefield directly.`;
        tutorNow = false;
      } else if ((inHand.has("Elvish Harbinger") || board.has("Elvish Harbinger"))
          && (mana >= 3 || infiniteManaActive) && (isMyTurn || yevaFlash)) {
        const etb = board.has("Elvish Harbinger");
        tutorName = "Elvish Harbinger"; tutorCost = "{2}{G}";
        tutorNote = etb
          ? "Elvish Harbinger ETB: search for Formidable Speaker, put it on top of library. Draw it next turn."
          : `Cast Elvish Harbinger ({2}{G})${!isMyTurn && yevaFlash ? " at instant speed via Yeva" : ""}: ETB puts Formidable Speaker on top of library.`;
        tutorNow = isMyTurn || yevaFlash;
      } else if ((inHand.has("Worldly Tutor") || inHand.has("Summoner's Pact"))
          && (mana >= 1 || infiniteManaActive)) {
        tutorName = inHand.has("Worldly Tutor") ? "Worldly Tutor" : "Summoner's Pact";
        tutorCost = tutorName === "Worldly Tutor" ? "{G}" : "{0}";
        tutorNote = `${tutorName}: search library for Formidable Speaker, put it on top.`;
        tutorNow = true;
      }

      if (tutorName) {
        const gszDirect = tutorName === "Green Sun's Zenith"; // puts directly onto battlefield
        const gszNextTurn = tutorName === "Green Sun's Zenith (next turn)";
        results.push({
          priority: 14,
          category: gszDirect ? "🔥 WIN NOW" : "🔥 WIN NEXT TURN",
          headline: gszDirect
            ? `Green Sun's Zenith (X=3) → Formidable Speaker → inevitable win this turn`
            : gszNextTurn
              ? `Green Sun's Zenith next turn (X=3) → Formidable Speaker → inevitable win`
              : `${tutorName} → Formidable Speaker → inevitable win`,
          detail: `With Quirion Ranger + ${dorkName} on board, fetching Formidable Speaker starts the full tutor loop: Speaker ETB finds any creature (discard to search entire library), Quirion bounces Speaker back to hand, ${dorkName} pays the recast. Find Ashaya → Speaker becomes a Forest → loop freely. Fetch Duskwatch Recruiter → win.`,
          steps: [
            tutorNote,
            (gszDirect || gszNextTurn)
              ? `Formidable Speaker enters the battlefield. ETB: discard a card → search your ENTIRE library for any creature → find Ashaya, Soul of the Wild.`
              : `Cast Formidable Speaker ({2}{G}): ETB — discard any card. Search your ENTIRE library for any creature → find Ashaya, Soul of the Wild.`,
            `Ashaya makes Formidable Speaker a Forest. Quirion Ranger returns Speaker to hand, untapping ${dorkName}.`,
            `${dorkName} taps for mana. Recast Speaker → ETB again → search for next piece. Repeat until you find Duskwatch Recruiter.`,
            "Activate Duskwatch Recruiter to assemble the full win pile → Sanitarium mill.",
          ],
          color: "#ff6b35",
          combo: "speaker_win_via_tutor",
        });
      }
    }
  }

  // ---- ELVISH HARBINGER ----
  if (inHand.has("Elvish Harbinger") || board.has("Elvish Harbinger")) {
    const castable = inHand.has("Elvish Harbinger") && (mana >= 3 || infiniteManaActive);
    const etbReady = board.has("Elvish Harbinger");
    const canActNow = castable || etbReady;
    // Can cast now at instant speed, or will be able to cast on our next turn
    const canFlashNow = canActNow && (isMyTurn || yevaFlash);
    const canCastNextTurn = inHand.has("Elvish Harbinger"); // always true if in hand

    // HIGH PRIORITY: handled by the generic TUTOR → SPEAKER WIN PATH block above.
    // Only emit the general Harbinger tutor advice if the Speaker win wasn't already shown.

    // General Harbinger targets (lower priority)
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
    ].filter(t => !board.has(t.name) && !inHand.has(t.name));
    const alreadyShowedSpeakerWin = results.some(r => r.combo === "speaker_win_via_tutor");
    if (harbingerTargets.length > 0 && (castable || etbReady) && (isMyTurn || yevaFlash) && !alreadyShowedSpeakerWin) {
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


  // ---- YISAN, THE WANDERER BARD ----
  if (board.has("Yisan, the Wanderer Bard")) {
    const hasRanger      = board.has("Quirion Ranger") || board.has("Scryb Ranger");
    const rangerName     = board.has("Quirion Ranger") ? "Quirion Ranger" : "Scryb Ranger";
    const hasSeedbornMuse = board.has("Seedborn Muse");
    const canActivate    = isMyTurn || hasSeedbornMuse;
    const canAfford      = mana >= 3 || infiniteManaActive;

    // What does each verse counter fetch?
    // verse 1 → CMC 1: Quirion Ranger, Arbor Elf, Wirewood Symbiote, Magus of the Candelabra
    // verse 2 → CMC 2: Priest of Titania, Wirewood Symbiote (already), Duskwatch Recruiter, Destiny Spinner, Earthcraft
    // verse 3 → CMC 3: Temur Sabertooth, Circle of Dreams Druid, Hyrax Tower Scout, Eternal Witness, Yisan himself
    // verse 4 → CMC 4: Argothian Elder, Temur Sabertooth, Fanatic of Rhonas, Karametra's Acolyte, Eladamri
    // verse 5+ → CMC 5+: Ashaya, Kogla, Woodcaller (8)
    const yisanTargetsByVerse = {
      1: [
        { name: "Quirion Ranger",         reason: "infinite mana loop with Ashaya — the most powerful 1-drop" },
        { name: "Arbor Elf",              reason: "untaps enchanted Forests or big lands with Yavimaya" },
        { name: "Wirewood Symbiote",      reason: "untap engine, also enables Yisan re-use via elf bounce" },
        { name: "Magus of the Candelabra",reason: "untaps lands equal to mana spent — key combo piece" },
      ],
      2: [
        { name: "Duskwatch Recruiter",    reason: "win condition — find this first if infinite mana is close" },
        { name: "Priest of Titania",      reason: "big dork tapping for elf count — often 3-6+ mana" },
        { name: "Hope Tender",            reason: "exert untaps Cradle or Nykthos — doubles your biggest land output" },
        { name: "Destiny Spinner",        reason: "haste enabler + land animation for combo sequencing" },
        { name: "Wirewood Symbiote",      reason: "untap engine if not yet in play" },
        { name: "Earthcraft",             reason: "tap creatures to untap basics — enables fast loops" },
      ],
      3: [
        { name: "Temur Sabertooth",       reason: "bouncer for infinite ETB loops — core win piece" },
        { name: "Circle of Dreams Druid", reason: "taps for creature count — Gaea's Cradle on a body" },
        { name: "Hyrax Tower Scout",      reason: "untaps a land on ETB — pairs with Temur Sabertooth for loops" },
        { name: "Eternal Witness",        reason: "retrieves key pieces from graveyard" },
      ],
      4: [
        { name: "Argothian Elder",        reason: "2-card infinite mana with Wirewood Lodge (already 2 pieces)" },
        { name: "Fanatic of Rhonas",      reason: "taps for {4} with Ashaya — big mana dork" },
        { name: "Karametra's Acolyte",    reason: "taps for devotion count — huge in a mono-green deck" },
        { name: "Eladamri, Korvecdal",    reason: "gives all creatures forestwalk and +1/+1 pump" },
      ],
      5: [
        { name: "Ashaya, Soul of the Wild", reason: "turns all creatures into Forests — enables all infinite mana loops" },
        { name: "Kogla, the Titan Ape",     reason: "bouncer for human ETB loops, destroys artifacts/enchantments" },
      ],
    };

    const nextVerse   = yisanCounters + 1;
    const targets     = (yisanTargetsByVerse[nextVerse] || yisanTargetsByVerse[5])
      .filter(t => !board.has(t.name) && !inHand.has(t.name));
    const bestTarget  = targets[0];

    // Build a look-ahead chain: how many activations until we hit win pieces?
    const WIN_PIECES = new Set(["Ashaya, Soul of the Wild","Duskwatch Recruiter","Temur Sabertooth","Kogla, the Titan Ape","Eternal Witness"]);
    const chainAhead = [];
    for (let v = nextVerse; v <= 5; v++) {
      const vtargets = (yisanTargetsByVerse[v] || []).filter(t => !board.has(t.name) && !inHand.has(t.name));
      if (vtargets[0]) chainAhead.push({ verse: v, name: vtargets[0].name, isWin: WIN_PIECES.has(vtargets[0].name) });
    }
    const activationsToWin = chainAhead.findIndex(c => c.isWin);
    const winChainEntry = activationsToWin >= 0 ? chainAhead[activationsToWin] : null;
    const chainSummary = chainAhead.slice(0, 4).map(c => `V${c.verse}→${c.name.split(",")[0]}`).join(" · ");

    if (canActivate && canAfford && bestTarget) {
      const doubleActivate = hasRanger && mana >= 6 && isMyTurn;
      const activationsNote = winChainEntry
        ? activationsToWin === 0
          ? ` Next activation reaches ${winChainEntry.name}.`
          : ` ${activationsToWin + 1} activation${activationsToWin > 0 ? "s" : ""} away from ${winChainEntry.name}.`
        : "";
      results.push({
        priority: 8,
        category: "🎯 YISAN TUTOR",
        headline: `Yisan verse ${nextVerse} → ${bestTarget.name}`,
        detail: `Yisan currently has ${yisanCounters} verse counter${yisanCounters !== 1 ? "s" : ""}. Next activation adds 1 counter (reaching verse ${nextVerse}) and tutors a CMC ${nextVerse} creature directly onto the battlefield.${activationsNote}${doubleActivate ? ` With ${rangerName} available, you can double-activate this turn.` : ""}`,
        steps: [
          `Pay {2}{G}, tap Yisan: add a verse counter (now at ${nextVerse}), search for a CMC ${nextVerse} creature → battlefield.`,
          `Best target: ${bestTarget.name} — ${bestTarget.reason}.`,
          ...(targets.length > 1 ? [`Alternatives: ${targets.slice(1, 3).map(t => t.name).join(", ")}.`] : []),
          ...(chainAhead.length > 1 ? [`Chain ahead: ${chainSummary}`] : []),
          ...(doubleActivate ? [
            `${rangerName}: return itself to hand, untapping Yisan.`,
            `Pay {2}{G} again: Yisan activates at verse ${nextVerse} again — fetch a second CMC ${nextVerse} creature.`,
          ] : []),
          ...(hasSeedbornMuse ? ["Seedborn Muse untaps Yisan on each opponent's turn — activate once per round for rapid verse progression."] : []),
          `After fetching, increment Yisan's counter in the tracker above.`,
        ],
        color: "#27ae60",
      });
    } else if (!canAfford) {
      results.push({
        priority: 3,
        category: "🎯 YISAN TUTOR",
        headline: `Yisan ready at verse ${nextVerse} — need {2}{G}`,
        detail: `Yisan has ${yisanCounters} verse counter${yisanCounters !== 1 ? "s" : ""}. Next activation costs {2}{G} and fetches a CMC ${nextVerse} creature. Generate at least 3 mana to activate.`,
        steps: [
          `Need {2}{G} (3 mana) to activate Yisan.`,
          ...(bestTarget ? [`Best target at verse ${nextVerse}: ${bestTarget.name} — ${bestTarget.reason}.`] : []),
        ],
        color: "#27ae60",
      });
    }
  }



  // ---- NATURE'S RHYTHM ----
  // Draw a card whenever a land enters the battlefield under your control.
  // With infinite mana + Elvish Reclaimer looping, or fetch lands still in library,
  // this becomes a draw engine. With Ashaya, every creature ETB is also a Forest ETB
  // — but Ashaya makes creatures INTO lands (they tap as Forests), not land drops.
  // NOTE: Ashaya does NOT trigger landfall from creature casts. Only real land plays trigger.
  if (board.has("Nature's Rhythm")) {
    const fetchesLeft   = hand.filter(c => getCard(c)?.tags?.includes("fetch")).length
      + battlefield.filter(c => getCard(c)?.tags?.includes("fetch")).length;
    const reclaimerUp   = (board.has("Elvish Reclaimer") || inHand.has("Elvish Reclaimer")) && infiniteManaActive;
    const cropRotation  = inHand.has("Crop Rotation");
    const sylvanScrying = inHand.has("Sylvan Scrying");

    const draws = [];
    if (fetchesLeft > 0)  draws.push(`${fetchesLeft} fetch land${fetchesLeft > 1 ? "s" : ""} available — each crack draws 1`);
    if (reclaimerUp)      draws.push("Elvish Reclaimer + infinite mana: loop land tutors for continuous draws");
    if (cropRotation)     draws.push("Crop Rotation fetches a land → draws 1");
    if (sylvanScrying)    draws.push("Sylvan Scrying finds a land → draws 1");

    if (draws.length > 0) {
      results.push({
        priority: infiniteManaActive ? 7 : 4,
        category: "📖 NATURE'S RHYTHM",
        headline: `Nature's Rhythm: draw a card for each land that enters`,
        detail: `Nature's Rhythm draws a card whenever a land enters the battlefield under your control. With fetch lands or Elvish Reclaimer, this generates significant card advantage.`,
        steps: [
          "Nature's Rhythm: draw 1 card each time a land ETBs under your control.",
          ...draws.map(d => `• ${d}.`),
          ...(reclaimerUp ? [
            "INFINITE DRAW with Reclaimer: Elvish Reclaimer ({1},{T}: sacrifice a land, fetch any land). Sacrifice the just-fetched land back, loop indefinitely — each land ETB draws 1.",
            "⚠️ Stop before decking yourself. Switch to Duskwatch or another outlet when you find one.",
          ] : []),
        ],
        color: "#27ae60",
      });
    }
  }

  // ---- SEEDBORN MUSE ENGINE ----
  // Seedborn Muse untaps ALL your permanents on each opponent's turn.
  // With Yeva flash: cast creatures at instant speed on every player's turn.
  // With Yisan: free {2}{G} verse activation on every opponent's upkeep.
  // With Gaea's Cradle/Elvish Guidance: effectively generate mana on every turn.
  if (board.has("Seedborn Muse")) {
    const hasYisan    = board.has("Yisan, the Wanderer Bard");
    const hasRanger   = board.has("Quirion Ranger") || board.has("Scryb Ranger");
    const hasCradle   = board.has("Gaea's Cradle") || board.has("Itlimoc, Cradle of the Sun");
    const hasGuidance = board.has("Elvish Guidance");

    const opponentBenefits = [];
    if (hasYisan)    opponentBenefits.push("Yisan gets a free verse activation on each opponent's upkeep" + (hasRanger ? " — double-activate with Ranger" : ""));
    if (hasCradle)   opponentBenefits.push("Gaea's Cradle untaps on each opponent's turn — tap it again before your own turn for double mana");
    if (hasGuidance) opponentBenefits.push("Elvish Guidance forest untaps — produce elf-count mana on every player's turn");
    // Yeva flash is NOT listed — it is always active when Yeva is on board, independent of Seedborn.

    // Headline only mentions what Seedborn specifically enables (not Yeva flash)
    const headlineParts = [];
    if (hasYisan)    headlineParts.push("free Yisan verse activation");
    if (hasCradle)   headlineParts.push("double Cradle taps");
    if (hasGuidance) headlineParts.push("double Guidance taps");
    const headlineSuffix = headlineParts.length > 0 ? ` — ${headlineParts.join(", ")}` : "";

    // Avoid generic "3× more Yisan" footer when Yisan is not on the battlefield
    const podNote = hasYisan
      ? "In a 4-player pod: 3 extra untap steps = 3× more Yisan activations, 3× more Cradle taps."
      : "In a 4-player pod: 3 extra untap steps = full mana production on every player\'s turn.";

    if (opponentBenefits.length > 0) {
      results.push({
        priority: infiniteManaActive ? 6 : 8,
        category: "🌙 SEEDBORN MUSE ENGINE",
        headline: `Seedborn Muse: untap all permanents every opponent's turn${headlineSuffix}`,
        combo: "seedborn_bespoke",
        detail: `Seedborn Muse gives you the equivalent of ${opponentBenefits.length + 1} full untap steps per round in a 4-player game. This is not infinite mana per turn — but it generates enormous advantage across all turns.`,
        steps: [
          "Seedborn Muse: at the beginning of each other player\'s untap step, untap all permanents you control.",
          ...opponentBenefits.map(b => `• ${b}.`),
          "IMPORTANT: mana pools empty between steps — you must spend mana on each player\'s turn individually.",
          podNote,
        ],
        color: "#9b59b6",
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
      const targetType = getCard(target)?.type ?? "permanent";
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

  // ---- YAVIMAYA + GAEA'S CRADLE / BOSEIJU LAND BOUNCE ----
  // Yavimaya makes all lands Forests. This unlocks two tactical plays:
  // 1. Crop Rotation can fetch ANY Forest — including utility lands like Wirewood Lodge,
  //    Geier Reach Sanitarium, or Deserted Temple (which can untap Cradle for a second tap).
  //    NOTE: Crop Rotation cannot fetch Gaea's Cradle back after sacrificing it (it goes to
  //    graveyard, not library). The correct line is to tap Cradle first, then Crop Rotation
  //    a basic Forest to fetch a utility land.
  // 2. Activate Boseiju to destroy any noncreature permanent (land/artifact/enchantment).
  if (board.has("Yavimaya, Cradle of Growth") && isMyTurn) {
    const hasCradle        = board.has("Gaea's Cradle");
    const hasBoseiju       = board.has("Boseiju, Who Endures");
    const hasDesTem        = board.has("Deserted Temple");
    const hasCropRot       = inHand.has("Crop Rotation");
    const hasReclaimer     = board.has("Elvish Reclaimer") || inHand.has("Elvish Reclaimer");
    const hasWirewoodLodge = board.has("Wirewood Lodge");
    const hasSanitarium    = board.has("Geier Reach Sanitarium");
    const cradleTap        = creaturesOnBoard;

    // Play 1a: Deserted Temple untaps Gaea's Cradle for a second tap (the real double-tap line)
    if (hasCradle && hasDesTem && !board.has("Argothian Elder")) {
      results.push({
        priority: cradleTap >= 4 ? 10 : 7,
        category: "🌿 MANA BOOST",
        headline: `Deserted Temple: untap Gaea's Cradle for a second ${cradleTap}-mana tap`,
        detail: `Tap Gaea's Cradle for ${cradleTap} mana, then activate Deserted Temple ({T}: untap target nonbasic land) to untap it for a second tap. Net: ${cradleTap * 2} mana from ${cradleTap * 2} gross (Temple taps itself so no mana cost). With ${creaturesOnBoard} creatures this generates ${cradleTap * 2} total green mana.`,
        steps: [
          `Tap Gaea's Cradle for ${cradleTap} mana.`,
          `Activate Deserted Temple: tap Temple → untap Gaea's Cradle.`,
          `Tap Gaea's Cradle again for ${cradleTap} more mana.`,
          `Total: ${cradleTap * 2} mana this turn from Cradle alone.`,
        ],
        color: "#27ae60",
      });
    }

    // Play 1b: Crop Rotation — sacrifice a basic Forest to fetch a utility land
    // (NOT Cradle → Cradle; the sacrificed land goes to graveyard, not library)
    if (hasCropRot) {
      const hasBasicForest = battlefield.some(c => c === "Forest");
      const fetchTargets = [
        !hasDesTem && hasCradle ? "Deserted Temple (untap Cradle for second tap)" : null,
        !hasSanitarium ? "Geier Reach Sanitarium (win condition)" : null,
        !hasWirewoodLodge && elvesOnBoard >= 2 ? "Wirewood Lodge (untap a dork)" : null,
        !board.has("Nykthos, Shrine to Nyx") ? "Nykthos, Shrine to Nyx (devotion mana)" : null,
      ].filter(Boolean);

      if (hasBasicForest && fetchTargets.length > 0) {
        results.push({
          priority: 7,
          category: "🌿 MANA BOOST",
          headline: `Yavimaya + Crop Rotation: sacrifice a Forest → fetch ${fetchTargets[0].split(" (")[0]}`,
          detail: `Yavimaya makes all lands Forests, so Crop Rotation can fetch any land in your deck. Sacrifice a basic Forest (not Gaea's Cradle — it would go to the graveyard, not the library) to find a utility land. Best targets right now: ${fetchTargets.join("; ")}.`,
          steps: [
            hasCradle ? `Tap Gaea's Cradle for ${cradleTap} mana first.` : null,
            `Cast Crop Rotation ({G}, instant): sacrifice a basic Forest → search library for ${fetchTargets[0].split(" (")[0]}, put it onto the battlefield.`,
            fetchTargets[0].includes("Deserted Temple") ? `Activate Deserted Temple: untap Gaea's Cradle → tap Cradle again for ${cradleTap} mana.` : null,
          ].filter(Boolean),
          color: "#27ae60",
        });
      }
    }

    // Play 2: Boseiju — destroy any noncreature permanent (land/artifact/enchantment)
    if (hasBoseiju && mana >= 1) {
      results.push({
        priority: 6,
        category: "🌿 REMOVAL AVAILABLE",
        headline: `Yavimaya + Boseiju: destroy any land, artifact, or enchantment (uncounterable)`,
        detail: `Boseiju, Who Endures is a Forest via Yavimaya. Its channel ability ({G}, discard Boseiju): destroy target artifact, enchantment, or nonbasic land. Uncounterable. With Yavimaya in play, Boseiju can also be fetched by any Forest-search effect (Crop Rotation, Elvish Reclaimer, fetchlands).`,
        steps: [
          `Identify the threat: an artifact (Collector Ouphe, Torpor Orb), enchantment (Rest in Peace, Rhystic Study), or nonbasic land.`,
          `Activate Boseiju's channel: pay {G}, discard Boseiju → destroy target artifact, enchantment, or nonbasic land. This ability can't be countered.`,
          `Note: Boseiju can be fetched via Crop Rotation, Elvish Reclaimer, or fetchlands since Yavimaya makes it a Forest.`,
        ],
        color: "#e74c3c",
      });
    }
  }

  // ---- HOPE TENDER ----
  if (board.has("Hope Tender")) {
    const hasYavimaya  = board.has("Yavimaya, Cradle of Growth");
    const hasAshaya    = board.has("Ashaya, Soul of the Wild");
    const hasBigLand   = board.has("Gaea's Cradle") || board.has("Nykthos, Shrine to Nyx");
    const hasKogla     = board.has("Kogla, the Titan Ape");
    const hasUntapper  = hasKogla || board.has("Wirewood Lodge") || board.has("Quirion Ranger") || board.has("Scryb Ranger") || board.has("Wirewood Symbiote");
    const hasExertSynergy = hasYavimaya && hasBigLand;

    if (hasExertSynergy || hasUntapper) {
      const exertTarget = board.has("Gaea's Cradle") ? "Gaea's Cradle"
        : board.has("Nykthos, Shrine to Nyx") ? "Nykthos, Shrine to Nyx"
        : "a key land";

      const resetMethod = hasKogla
        ? "Kogla attacks → returns Hope Tender (Human) to hand → recast → exert resets"
        : board.has("Wirewood Lodge") ? "Wirewood Lodge ({G}): untap Hope Tender, resetting the exert"
        : board.has("Quirion Ranger") ? "Quirion Ranger: return itself to hand to untap Hope Tender"
        : "Wirewood Symbiote: bounce an elf to untap Hope Tender";

      results.push({
        priority: hasExertSynergy ? 8 : 6,
        category: "🌿 HOPE TENDER",
        headline: hasKogla
          ? `Hope Tender + Kogla loop: exert → untap ${exertTarget} every turn`
          : `Hope Tender: exert to untap ${exertTarget} for double mana`,
        detail: hasKogla
          ? `Kogla attacks and returns Hope Tender (a Human) to hand — this resets the exert completely. Recast Hope Tender, tap for {G}, exert to untap ${exertTarget} again. With infinite mana this loops freely every turn.`
          : hasAshaya
          ? "With Ashaya, Hope Tender is itself a Forest. Tap it for {G}, then exert to untap a big land. Use an untapper to reset the exert each loop."
          : `Hope Tender's exert ability untaps ${exertTarget}. Pair with an untapper to reset it each turn.`,
        steps: [
          `Tap Hope Tender for {G}.`,
          `Exert Hope Tender: untap ${exertTarget}.`,
          `Tap ${exertTarget} for big mana.`,
          ...(hasKogla ? [
            "Kogla attacks: return Hope Tender (Human) to hand — exert is fully reset.",
            "Recast Hope Tender ({1}{G}), tap for {G}, exert again next activation.",
            "With infinite mana this loop repeats freely — double-tap a key land every iteration.",
          ] : [
            resetMethod + ".",
            ...(hasAshaya ? ["With Ashaya, Hope Tender is a Forest — Wirewood Lodge can untap it directly as an elf."] : []),
          ]),
          ...(!hasKogla && !hasUntapper ? ["Find Kogla (best), Wirewood Lodge, or Quirion Ranger to reset Hope Tender's exert each turn."] : []),
        ],
        color: "#27ae60",
      });
    }
  }

  // ---- ELVISH GUIDANCE ----
  if (board.has("Elvish Guidance")) {
    const guidanceOutput = elvesOnBoard; // taps for {G} per elf
    const hasArbor       = board.has("Arbor Elf");
    const hasLodge       = board.has("Wirewood Lodge");
    const hasYavimaya    = board.has("Yavimaya, Cradle of Growth");

    if (guidanceOutput >= 2 || hasArbor) {
      results.push({
        priority: hasArbor ? 8 : 6,
        category: "🌿 ELVISH GUIDANCE",
        headline: hasArbor
          ? `Elvish Guidance + Arbor Elf: double-tap enchanted Forest for ${guidanceOutput * 2} mana`
          : `Elvish Guidance: enchanted Forest taps for ${guidanceOutput} mana (${elvesOnBoard} elves)`,
        detail: `Elvish Guidance enchants a Forest, making it tap for {G} per elf you control. With ${elvesOnBoard} elf${elvesOnBoard !== 1 ? "s" : ""} in play it produces ${guidanceOutput} mana${hasArbor ? ` — Arbor Elf can untap it for a second activation, totalling ${guidanceOutput * 2} mana from one land` : ""}.`,
        steps: [
          `Tap Elvish Guidance-enchanted Forest for ${guidanceOutput} {G} (${elvesOnBoard} elves × {G}).`,
          ...(hasArbor ? [
            `Activate Arbor Elf: untap the enchanted Forest.`,
            `Tap Forest again for another ${guidanceOutput} {G} — total ${guidanceOutput * 2} mana this turn.`,
          ] : []),
          ...(hasLodge ? [
            `Wirewood Lodge: pay {G}, tap Lodge to untap Arbor Elf — enables a third activation.`,
          ] : []),
          ...(hasYavimaya ? ["Yavimaya makes ALL lands Forests — Arbor Elf can also untap Gaea's Cradle or Nykthos for even more value."] : []),
          `Every new elf you cast increases the Forest's output by {G}.`,
        ],
        color: "#27ae60",
      });
    }
  }

  // ---- SEEDBORN MUSE ADVICE (merged into bespoke block above) ----
  // This second Seedborn block is intentionally suppressed — the bespoke block at the
  // SEEDBORN MUSE ENGINE section already generates context-aware steps including
  // Cradle taps, Yeva flash, and Yisan (only when Yisan is actually on board).
  // Leaving this block as a no-op prevents three near-duplicate Seedborn entries.
  if (false && board.has("Seedborn Muse")) { // SUPPRESSED — handled by SEEDBORN MUSE ENGINE above
  }

  // ---- HEARTWOOD STORYTELLER ----
  // Suggest casting Heartwood Storyteller when it's in hand and we can reach 3 mana,
  // potentially via fast mana (Mox Diamond discarding a land, Chrome Mox, Lotus Petal).
  if (inHand.has("Heartwood Storyteller") && (isMyTurn || yevaAvailable) && !board.has("Heartwood Storyteller")) {
    // Calculate extra mana available from fast mana in hand
    const hasMoxDiamond  = inHand.has("Mox Diamond");
    const hasChromeMox   = inHand.has("Chrome Mox");
    const hasLotusPetal  = inHand.has("Lotus Petal");
    const landsInHand    = hand.filter(c => getCard(c)?.type === "land").length;
    const nonLandsInHand = hand.filter(c => getCard(c)?.type !== "land" && c !== "Heartwood Storyteller" && c !== "Chrome Mox").length;

    // Each fast mana that can realistically fire this turn.
    // Mox Diamond discards a land on entry — but if we have 2+ lands, we can
    // play one as our land drop AND discard a second one to Mox Diamond.
    const otherFastMana   = (hasChromeMox && nonLandsInHand >= 1 ? 1 : 0) + (hasLotusPetal ? 1 : 0);
    // Path A: play land drop only (no Mox)
    const pathA_mana = mana + (landsInHand >= 1 ? 1 : 0) + otherFastMana;
    // Path B: Mox Diamond without land drop (discard the only land)
    const pathB_mana = mana + (hasMoxDiamond && landsInHand >= 1 ? 1 : 0) + otherFastMana;
    // Path C: land drop + Mox Diamond (requires 2 separate lands)
    const pathC_mana = mana + (landsInHand >= 1 ? 1 : 0) + (hasMoxDiamond && landsInHand >= 2 ? 1 : 0) + otherFastMana;
    const effectiveMana = Math.max(pathA_mana, pathB_mana, pathC_mana);
    const bestPath = effectiveMana === pathC_mana && pathC_mana > pathA_mana && pathC_mana > pathB_mana ? "C"
                   : effectiveMana === pathB_mana && pathB_mana >= pathA_mana ? "B" : "A";
    const useMoxPath = bestPath === "B" || bestPath === "C";

    if (effectiveMana >= 3 || effectiveMana >= 2) {
      const castableNow = effectiveMana >= 3;
      // Build a clear description of how we get to 3 mana
      const manaSources = [];
      if (bestPath === "C") {
        const landToDrop    = hand.find(c => getCard(c)?.type === "land") || "a land";
        const landToDiscard = hand.filter(c => getCard(c)?.type === "land")[1] || "a second land";
        manaSources.push(`Play ${landToDrop} (land drop)`);
        manaSources.push(`Mox Diamond (discard ${landToDiscard} → tap for {G})`);
      } else if (bestPath === "B" && hasMoxDiamond && landsInHand >= 1) {
        const discardTarget = hand.find(c => getCard(c)?.type === "land") || "a land";
        manaSources.push(`Mox Diamond (discard ${discardTarget} → tap for {G})`);
      } else if (landsInHand >= 1) {
        const landToDrop = hand.find(c => getCard(c)?.type === "land") || "a land";
        manaSources.push(`Play ${landToDrop} (land drop)`);
      }
      if (hasChromeMox && nonLandsInHand >= 1) manaSources.push("Chrome Mox (imprint a non-land card)");
      if (hasLotusPetal) manaSources.push("Lotus Petal (sacrifice for {G})");
      const manaLine = manaSources.length > 0
        ? `${manaSources.join(", then ")} → tap for mana → total {G}{G}{G}.`
        : `Tap ${mana} mana.`;

      results.push({
        priority: castableNow ? 6 : 4,
        category: "📖 CARD ADVANTAGE",
        headline: castableNow
          ? "Cast Heartwood Storyteller — punishes non-creature spells, draws you cards"
          : "Heartwood Storyteller in hand — cast next turn for draw + stax pressure",
        detail: "Heartwood Storyteller: whenever any player casts a non-creature spell, each OTHER player draws a card. In cEDH this is a strong stax piece and draw engine — opponents casting tutors, interaction, or combos fill your hand. Especially powerful against blue decks relying on counterspells and artifact-based strategies.",
        steps: [
          castableNow
            ? (manaSources.length > 0 ? `${manaSources.join(", then ")} → tap for mana → cast Heartwood Storyteller ({1}{G}{G}).` : `Tap ${mana} mana → cast Heartwood Storyteller ({1}{G}{G}).`)
            : `Need one more mana source. Play a land next turn or find a mana dork to reach {1}{G}{G}.`,
          "Effect: whenever a player casts a non-creature spell, each other player draws a card.",
          "Strong against: counterspell-heavy decks, tutor chains, artifact combos.",
          "Note: opponents draw when YOU cast non-creature spells too. Lean into creature-based play while Storyteller is live.",
        ],
        color: "#5dade2",
      });
    }
  }

  // ---- JORAGA TREESPEAKER ----
  // 1-drop elf that levels up to tap for {G}{G} per elf — functions as a big dork once levelled
  if ((inHand.has("Joraga Treespeaker") || board.has("Joraga Treespeaker")) && (isMyTurn || yevaAvailable)) {
    const onBoard = board.has("Joraga Treespeaker");
    const canCast = inHand.has("Joraga Treespeaker") && mana >= 1;
    const canLevel1 = onBoard && mana >= 2; // {1}{G} to reach level 1 (taps for {G} per elf)
    const canLevel5 = onBoard && mana >= 8; // {7}{G} total to reach level 5 (all elves gain +1/+1)
    if (!onBoard && canCast && isMyTurn) {
      results.push({
        priority: 6,
        category: "🌿 RAMP",
        headline: "Cast Joraga Treespeaker ({G}) → level up to become a big dork",
        detail: "Joraga Treespeaker starts as a 1/1 mana dork but levels up into a serious engine. Level 2+ ({1}{G}): taps to add {G} per elf you control — equivalent to Priest of Titania. Level 5+ ({7}{G} total): all Elves you control get +1/+1. Once levelled, she enables Ashaya + Quirion/Scryb Ranger infinite mana loops.",
        steps: [
          "Cast Joraga Treespeaker ({G}). She enters as a 1/1 — wait one turn for summoning sickness.",
          "On next turn: pay {1}{G} to level up to level 2. She now taps to add {G} per elf you control.",
          "With Ashaya + Quirion/Scryb Ranger: Treespeaker (≥2 elves in play) enables the infinite mana loop.",
        ],
        color: "#27ae60",
      });
    }
    if (onBoard && canLevel1 && isMyTurn) {
      results.push({
        priority: 7,
        category: "🌿 LEVEL UP",
        headline: "Level up Joraga Treespeaker ({1}{G}) → tap for {G} per elf",
        detail: "Levelling Treespeaker to level 2 transforms her into a Priest of Titania equivalent. With any elf-counting loop (Ashaya + Quirion Ranger, Hyrax Tower Scout + Sabertooth), she immediately enables infinite mana.",
        steps: [
          "Pay {1}{G}: Joraga Treespeaker advances to level 2. She now taps to add {G} per elf you control.",
          `With ${elvesOnBoard} elves on board, she produces ${elvesOnBoard} mana per tap.`,
          "Now enable infinite mana via Ashaya + Quirion/Scryb Ranger loop (needs ≥3 elves total).",
        ],
        color: "#27ae60",
      });
    }
  }

  // ---- WIREWOOD CHANNELER ----
  // Elf that taps for {G} per elf — identical to Priest of Titania, CMC 4
  if ((inHand.has("Wirewood Channeler") || board.has("Wirewood Channeler")) && (isMyTurn || yevaAvailable)) {
    const onBoard = board.has("Wirewood Channeler");
    const canCast = inHand.has("Wirewood Channeler") && (mana >= 4 || infiniteManaActive);
    const output = elvesOnBoard + (onBoard ? 0 : 1); // +1 elf when she enters
    const bigDorkAvail = findBigDork(3);
    if (!onBoard && canCast) {
      results.push({
        priority: 7,
        category: "🌿 RAMP",
        headline: `Cast Wirewood Channeler → taps for ${output} mana (${output} elves)`,
        detail: `Wirewood Channeler taps to add {G} for each Elf you control — effectively Priest of Titania for elves. With ${output} elves, she immediately produces ${output} mana. Enables Ashaya loops (Quirion/Scryb Ranger) and Hyrax Scout/Sabertooth bounce lines.`,
        steps: [
          `Cast Wirewood Channeler ({3}{G}). With ${output} elves on board, she taps for ${output} mana.`,
          `With Ashaya + Quirion Ranger: tap Channeler (≥3 mana) → Ranger bounces her (untapping → she's a Forest via Ashaya) → recast for {1} → loop for infinite mana.`,
        ],
        color: "#27ae60",
      });
    }
  }

  // ---- DEFILER OF VIGOR ----
  // Phyrexian card: cast green spells paying life instead of {G}; creatures entering put +1/+1 counters on all creatures
  if ((inHand.has("Defiler of Vigor") || board.has("Defiler of Vigor")) && (isMyTurn || yevaAvailable)) {
    const onBoard = board.has("Defiler of Vigor");
    const canCast = inHand.has("Defiler of Vigor") && (mana >= 3 || infiniteManaActive); // can pay life for {G}{G}
    if (onBoard && infiniteManaActive) {
      results.push({
        priority: 11,
        category: "⚡ STORM ENGINE",
        headline: "Defiler of Vigor: every spell cast puts +1/+1 counters on ALL creatures → storm win",
        detail: "With infinite mana: every green spell you cast causes Defiler to trigger, putting +1/+1 counters on all your creatures. Infinite storm count → infinite +1/+1 counters. Swing for lethal. Defiler also lets you substitute 2 life for {G} in casting costs.",
        steps: [
          "Infinite mana is active. Cast any green spell — Defiler triggers, all creatures get +1/+1 counters.",
          "With infinite spell casts (Formidable Speaker loop or Duskwatch): trigger Defiler infinitely.",
          "All creatures become arbitrarily large. Swing for lethal combat damage.",
        ],
        color: "#9b59b6",
      });
    } else if (!onBoard && canCast) {
      results.push({
        priority: 6,
        category: "⚡ STORM PIECE",
        headline: "Cast Defiler of Vigor → enables +1/+1 counter storm win with infinite mana",
        detail: "Defiler of Vigor is a powerful storm-win payoff: once you have infinite mana and begin casting spells in a loop (Formidable Speaker + Quirion Ranger, or Duskwatch activations), Defiler triggers on every cast, putting +1/+1 counters on all your creatures. Also lets you pay 2 life instead of {G} in casting costs.",
        steps: [
          "Cast Defiler of Vigor ({3}{G}{G}, or pay 2 life for each {G} in cost).",
          "Assemble infinite mana (Ashaya + Argothian Elder, etc.).",
          "Begin infinite spell loop → Defiler triggers each cast → all creatures get +1/+1 counters → attack for lethal.",
        ],
        color: "#9b59b6",
      });
    }
  }

  // ---- AGATHA'S SOUL CAULDRON ----
  // Exiles creatures from graveyards, puts +1/+1 counter on equipped creature, grants their activated abilities
  if ((inHand.has("Agatha's Soul Cauldron") || board.has("Agatha's Soul Cauldron")) && (isMyTurn || yevaAvailable)) {
    const onBoard = board.has("Agatha's Soul Cauldron");
    const canCast = inHand.has("Agatha's Soul Cauldron") && (mana >= 2 || infiniteManaActive);
    const hasBigDorkInGrave = graveyard.some(c => getCard(c)?.tags?.includes("big-dork") || getCard(c)?.tags?.includes("dork"));
    const graveDorks = graveyard.filter(c => getCard(c)?.tags?.includes("big-dork") || getCard(c)?.tags?.includes("dork"));
    if (onBoard && hasBigDorkInGrave) {
      results.push({
        priority: 9,
        category: "💀 GRAVEYARD ENGINE",
        headline: `Agatha's Soul Cauldron: exile ${graveDorks[0]} → grant its mana ability to a creature`,
        detail: `Agatha's Soul Cauldron exiles creatures from graveyards. Any creature with a +1/+1 counter gains all activated abilities of exiled cards. Exile ${graveDorks[0]} to grant its mana tap ability to another creature — effectively duplicating your best dork's output.`,
        steps: [
          `Activate Agatha's Soul Cauldron ({1}): exile ${graveDorks[0]} from graveyard.`,
          "Any creature you control with a +1/+1 counter now has that dork's tap-for-mana ability.",
          "Use a +1/+1 counter source (Defiler of Vigor, Marwyn ETB, etc.) to give counters to your creatures.",
          "A creature with the exiled dork's mana ability can now be used in infinite mana loops.",
        ],
        color: "#8e44ad",
      });
    } else if (!onBoard && canCast) {
      results.push({
        priority: 5,
        category: "💀 GRAVEYARD ENGINE",
        headline: "Cast Agatha's Soul Cauldron → graveyard synergy engine",
        detail: "Agatha's Soul Cauldron exiles creatures from any graveyard, giving creatures with +1/+1 counters their activated abilities. Key synergy: exile a mana dork to grant its tap ability to any creature with a counter, enabling additional infinite mana loops. Also disrupts opponent graveyard strategies.",
        steps: [
          "Cast Agatha's Soul Cauldron ({1}{G}).",
          "Activate ({1}): exile a mana dork from any graveyard.",
          "Give a +1/+1 counter to a creature (via Marwyn ETB, Defiler, or +1/+1 counter effects).",
          "That creature now has the exiled dork's activated ability — can be used in mana loops.",
        ],
        color: "#8e44ad",
      });
    }
  }

  // ---- BEASTRIDER VANGUARD ----
  // Infinite mana outlet: pays mana to create tokens or similar — key win condition
  if ((inHand.has("Beastrider Vanguard") || board.has("Beastrider Vanguard")) && (isMyTurn || yevaAvailable)) {
    const onBoard = board.has("Beastrider Vanguard");
    if (onBoard && infiniteManaActive) {
      results.push({
        priority: 11,
        category: "⚡ WIN OUTLET",
        headline: "Beastrider Vanguard: infinite mana → activate repeatedly → win",
        detail: "With infinite mana active, Beastrider Vanguard is a mana sink that converts infinite mana into a winning board state. Activate repeatedly to create infinite tokens or grow a creature to an arbitrarily large size.",
        steps: [
          "Infinite mana is active.",
          "Activate Beastrider Vanguard repeatedly — each activation converts mana into tokens/counters.",
          "With infinite activations: create infinite tokens or infinite power → attack for lethal.",
        ],
        color: "#e74c3c",
      });
    } else if (!onBoard && (isMyTurn || yevaAvailable) && (mana >= 3 || infiniteManaActive)) {
      results.push({
        priority: 6,
        category: "🎯 WIN PIECE",
        headline: "Cast Beastrider Vanguard → infinite mana outlet for win",
        detail: "Beastrider Vanguard is a mana sink win condition. Once you have infinite mana, activate it repeatedly to generate infinite tokens or power. Cast it now to have it ready when infinite mana comes online.",
        steps: [
          "Cast Beastrider Vanguard.",
          "Assemble infinite mana.",
          "Activate Beastrider Vanguard repeatedly for infinite tokens/power → attack to win.",
        ],
        color: "#e74c3c",
      });
    }
  }

  // ---- CARPET OF FLOWERS ----
  // Taps for mana equal to the number of Islands opponents control (blue meta card)
  if ((inHand.has("Carpet of Flowers") || board.has("Carpet of Flowers")) && isMyTurn) {
    const onBoard = board.has("Carpet of Flowers");
    if (!onBoard && mana >= 1) {
      results.push({
        priority: 4,
        category: "🌿 META RAMP",
        headline: "Cast Carpet of Flowers ({G}) → free mana vs blue decks each turn",
        detail: "Carpet of Flowers once per turn lets you add {G} for each Island an opponent controls. In blue-heavy metas this is free extra mana every turn at a cost of only {G}. Even one Island = {G} per turn; multiple blue players = ramp engine.",
        steps: [
          "Cast Carpet of Flowers ({G}).",
          "Each of your turns: tap Carpet to add {G} per Island opponents control (no cost).",
          "Against blue opponents this typically produces 1-4 bonus {G} per turn.",
        ],
        color: "#27ae60",
      });
    }
  }

  // ---- UTILITY LANDS (in hand / castable) ----
  // Bonders' Enclave, Mikokoro, Mariposa Military Base — draw utility lands
  {
    const drawLands = [
      { name: "Bonders' Enclave", cost: 4, desc: "{4}: draw a card if you control a creature with power 4+. Repeatable draw engine with big dorks.", powerReq: 4 },
      { name: "Mikokoro, Center of the Sea", cost: 3, desc: "{3}: each player draws a card. Group draw — best used on your turn with Yeva to fill your hand in response to a key spell.", powerReq: 0 },
      { name: "Mariposa Military Base", cost: 2, desc: "Enters tapped. {T}: scry 1, then draw if you control a legendary creature. Filtering draw with Yeva/commanders.", powerReq: 0 },
    ];
    for (const dl of drawLands) {
      if (inHand.has(dl.name) && isMyTurn) {
        results.push({
          priority: 3,
          category: "🏔️ UTILITY LAND",
          headline: `Play ${dl.name} — draw utility land`,
          detail: dl.desc,
          steps: [`Play ${dl.name} as your land drop.`, dl.desc],
          color: "#7f8c8d",
        });
      }
    }
    // Bonders' Enclave activation when on board
    if (board.has("Bonders' Enclave") && isMyTurn && (mana >= 4 || infiniteManaActive)) {
      const hasPowerCreature = battlefield.some(c => {
        const cd = getCard(c);
        return cd?.type === "creature" && (cd?.power ?? 0) >= 4;
      });
      const bigEnoughDork = findBigDork(4);
      if (hasPowerCreature || bigEnoughDork) {
        results.push({
          priority: 6,
          category: "📖 DRAW",
          headline: "Activate Bonders' Enclave ({4}) → draw a card",
          detail: "You control a creature with power 4 or greater. Bonders' Enclave lets you draw a card for {4}.",
          steps: ["Pay {4}: activate Bonders' Enclave → draw a card."],
          color: "#3498db",
        });
      }
    }
  }

  // ---- SYLVAN LIBRARY ----
  if (board.has("Sylvan Library") && isMyTurn) {
    results.push({
      priority: 5,
      category: "📖 DRAW ENGINE",
      headline: "Sylvan Library: draw 3, keep 1 free or pay 4 life per extra",
      detail: "Sylvan Library lets you draw 3 cards at the start of your draw step. You keep 1 for free; each additional card kept costs 4 life. With infinite mana and life to spare, keep all 3. Selectively keep extra cards when they're combo pieces you need immediately.",
      steps: [
        "At draw step: draw 3 cards via Sylvan Library.",
        "Keep 1 for free. For each additional card kept, pay 4 life.",
        "With infinite mana: life is irrelevant — keep all 3 cards.",
        "Without infinite mana: keep an extra card only if it's a critical combo piece.",
      ],
      color: "#27ae60",
    });
  }

  // ---- GUARDIAN PROJECT ----
  if (board.has("Guardian Project") && (isMyTurn || yevaAvailable)) {
    const hasNonLegendCreatureInHand = hand.some(c => {
      const cd = getCard(c);
      return cd?.type === "creature" && !cd?.tags?.includes("legendary");
    });
    if (hasNonLegendCreatureInHand) {
      results.push({
        priority: 6,
        category: "📖 DRAW ENGINE",
        headline: "Guardian Project is live — cast creatures to draw cards",
        detail: "Guardian Project draws you a card whenever a nontoken creature enters under your control, if it doesn't share a name with another creature you control. Every creature cast this turn triggers a draw.",
        steps: [
          "Guardian Project is on the battlefield.",
          "Each nontoken creature you cast (with a unique name) draws a card on ETB.",
          "Prioritise casting creatures that also advance your game plan.",
        ],
        color: "#27ae60",
      });
    }
  }

  // ---- REMOVAL SPELLS (contextual — when opponents have threats) ----
  {
    const hasThreats = opponentThreats && opponentThreats.length > 0;
    const removalSpells = [
      { name: "Nature's Claim", cmc: 1, desc: "Destroy target artifact or enchantment. They gain 4 life. Instant speed.", category: "🗑️ REMOVAL" },
      { name: "Ram Through", cmc: 2, desc: "Target creature you control deals damage equal to its power to target creature. Trample means excess bleeds through.", category: "🗑️ REMOVAL" },
      { name: "Tail Swipe", cmc: 2, desc: "Target creature you control fights another creature — but only works if yours has more power.", category: "🗑️ REMOVAL" },
      { name: "Bouncer's Beatdown", cmc: 2, desc: "Target creature with the greatest power fights another target creature.", category: "🗑️ REMOVAL" },
      { name: "Kenrith's Transformation", cmc: 2, desc: "Enchant target creature — it becomes a 3/3 Elk and loses all abilities. Draw a card.", category: "🗑️ REMOVAL" },
      { name: "Reclamation Sage", cmc: 3, desc: "ETB: destroy target artifact or enchantment. Flash via Yeva.", category: "🗑️ REMOVAL" },
      { name: "Outland Liberator", cmc: 2, desc: "Transforms into Frenzied Trapbreaker — destroys artifact or enchantment when it attacks.", category: "🗑️ REMOVAL" },
      { name: "Manglehorn", cmc: 3, desc: "ETB destroys target artifact. Artifacts opponents control enter tapped. Stax + removal hybrid.", category: "🗑️ REMOVAL" },
      { name: "Warping Wail", cmc: 2, desc: "Counter target sorcery / exile creature with power ≤1 / create Eldrazi Scion. Versatile instant interaction.", category: "🗑️ INTERACTION" },
      { name: "Insidious Fungus", cmc: 3, desc: "ETB destroys target land. Also a land tutor. Excellent against greedy mana bases.", category: "🗑️ REMOVAL" },
    ];
    for (const spell of removalSpells) {
      if (inHand.has(spell.name)) {
        const canCast = mana >= spell.cmc || infiniteManaActive;
        const isInstant = getCard(spell.name)?.type === "instant";
        const castableNow = canCast && (isInstant ? true : isMyTurn || yevaAvailable);
        if (castableNow && (hasThreats || isInstant)) {
          results.push({
            priority: hasThreats ? 7 : 4,
            category: spell.category,
            headline: `${spell.name}${isInstant ? " (instant)" : ""}${!isMyTurn && isInstant ? " — can cast NOW on opponent's turn" : ""}`,
            detail: spell.desc,
            steps: [
              `Cast ${spell.name} (${spell.cmc > 0 ? `{${spell.cmc - 1}}{G}` : "{G}"}).`,
              spell.desc,
            ],
            color: "#e74c3c",
          });
        }
      }
    }
  }

  // ---- PROTECTION SPELLS (Veil of Summer, Autumn's Veil) ----
  {
    const veils = [
      { name: "Veil of Summer", cmc: 1, desc: "Counter target blue or black spell. You and your spells can't be targeted by blue/black this turn. Draw a card if opponent cast a blue/black spell. Incredible value at {G}.", priority: 9 },
      { name: "Autumn's Veil", cmc: 1, desc: "Spells you control can't be countered by blue or black spells this turn. Creatures can't be targeted by blue/black instant/sorceries. Use when going off against blue counterspell decks.", priority: 8 },
    ];
    for (const veil of veils) {
      if (inHand.has(veil.name) && mana >= veil.cmc) {
        results.push({
          priority: veil.priority,
          category: "🛡️ PROTECTION",
          headline: `${veil.name} — protect your spells from blue/black interaction`,
          detail: veil.desc,
          steps: [
            `Hold ${veil.name} up (${veil.cmc} mana) until an opponent tries to counter or target your spells.`,
            "Cast in response to counterspells or targeted removal.",
            veil.desc,
          ],
          color: "#2980b9",
        });
      }
    }
  }

  // ---- NOXIOUS REVIVAL ----
  // Free instant that puts a card from any graveyard on top of its owner's library
  if (inHand.has("Noxious Revival")) {
    const keyCardsInGrave = graveyard.filter(c => {
      const cd = getCard(c);
      return cd?.tags?.some(t => ["combo","key","tutor","big-dork","infinite-dork"].includes(t));
    });
    if (keyCardsInGrave.length > 0) {
      results.push({
        priority: 8,
        category: "♻️ RECURSION",
        headline: `Noxious Revival (free) → return ${keyCardsInGrave[0]} to top of library`,
        detail: `Noxious Revival costs {0} but requires paying 2 life (Phyrexian {G}{G} = pay 2 life). Returns any card from any graveyard to the top of its owner's library. Use it now to recover ${keyCardsInGrave[0]}.`,
        steps: [
          `Cast Noxious Revival for free (pay 2 life).`,
          `Target ${keyCardsInGrave[0]} in graveyard — it goes to the top of your library.`,
          "Draw it next turn, or draw it immediately if you have a draw spell.",
        ],
        color: "#27ae60",
      });
    } else {
      // Offer disruption use case
      results.push({
        priority: 3,
        category: "♻️ RECURSION",
        headline: "Noxious Revival (free instant) — graveyard disruption or key card recovery",
        detail: "Noxious Revival costs {0} (pay 2 life). Puts any card from any graveyard on top of its owner's library. Use offensively to recover combo pieces, or defensively to put an opponent's combo piece back on top of their library instead of letting them use it.",
        steps: [
          "Cast Noxious Revival for free (pay 2 life) at instant speed.",
          "Target a key card in your graveyard to put it on top of your library, OR",
          "Target an opponent's graveyard piece to put it on top of their library (denying graveyard access).",
        ],
        color: "#27ae60",
      });
    }
  }

  // ---- SKULLWINDER ----
  // ETB: return a card from your graveyard to hand, opponent may return a card from their graveyard
  if ((inHand.has("Skullwinder") || board.has("Skullwinder")) && (isMyTurn || yevaAvailable)) {
    const onBoard = board.has("Skullwinder");
    const keyInGrave = graveyard.find(c => {
      const cd = getCard(c);
      return cd?.tags?.some(t => ["combo","key","tutor","big-dork"].includes(t));
    });
    if (!onBoard && inHand.has("Skullwinder") && keyInGrave && (mana >= 3 || infiniteManaActive)) {
      results.push({
        priority: 7,
        category: "♻️ RECURSION",
        headline: `Cast Skullwinder → ETB returns ${keyInGrave} from graveyard`,
        detail: `Skullwinder's ETB returns a card from your graveyard to your hand. An opponent may also return a card from their graveyard — use politics to negotiate. With ${keyInGrave} in grave, this recovers a key piece.`,
        steps: [
          `Cast Skullwinder ({2}{G}).`,
          `ETB: return ${keyInGrave} to your hand.`,
          "An opponent may also return a card from their graveyard to their hand — negotiate if needed.",
        ],
        color: "#27ae60",
      });
    }
  }

  // ---- SCAVENGING OOZE ----
  if ((inHand.has("Scavenging Ooze") || board.has("Scavenging Ooze")) && (isMyTurn || yevaAvailable)) {
    const onBoard = board.has("Scavenging Ooze");
    const oppGraveThreats = graveyard.length > 0; // simplified — in real play check opponent graveyards
    if (onBoard && isMyTurn && (mana >= 2 || infiniteManaActive)) {
      results.push({
        priority: 5,
        category: "🗑️ GRAVEYARD HATE",
        headline: "Activate Scavenging Ooze ({G}) — exile graveyard creature, grow",
        detail: "Scavenging Ooze can activate for {G} to exile a creature card from a graveyard and get a +1/+1 counter. With infinite mana, exile all graveyards, deny reanimation/flashback, and grow Ooze to an arbitrarily large size.",
        steps: [
          "Pay {G}: Scavenging Ooze exiles target creature card from any graveyard → gets +1/+1 counter.",
          "With infinite mana: exile all creature cards from all graveyards → Ooze grows infinitely → attack to win.",
        ],
        color: "#27ae60",
      });
    }
  }

  // ---- EMERALD MEDALLION ----
  if ((inHand.has("Emerald Medallion") || board.has("Emerald Medallion")) && isMyTurn) {
    if (!board.has("Emerald Medallion") && mana >= 2) {
      results.push({
        priority: 5,
        category: "🌿 COST REDUCER",
        headline: "Cast Emerald Medallion ({2}) → all green spells cost {1} less",
        detail: "Emerald Medallion reduces the cost of all green spells by {1}. Key loop impacts: Scryb Ranger recast drops from {1}{G} to {G}, Formidable Speaker from {2}{G} to {1}{G}, Eternal Witness from {1}{G}{G} to {G}{G}. Makes marginal loops go net-positive.",
        steps: [
          "Cast Emerald Medallion ({2}).",
          "All green spells cost {1} less — accelerates loop thresholds.",
          "Example: Scryb Ranger now costs only {G} to recast, so a dork producing ≥2 mana enables the infinite loop.",
        ],
        color: "#f39c12",
      });
    }
  }

  // ---- RUNIC ARMASAUR ----
  if ((inHand.has("Runic Armasaur") || board.has("Runic Armasaur")) && (isMyTurn || yevaAvailable)) {
    if (!board.has("Runic Armasaur") && (mana >= 3 || infiniteManaActive)) {
      results.push({
        priority: 5,
        category: "📖 DRAW ENGINE",
        headline: "Cast Runic Armasaur → draws cards whenever opponents activate abilities",
        detail: "Runic Armasaur draws you a card whenever an opponent activates a non-mana ability of a creature or land. Devastating against creature-based decks (Yisan, Derevi, Kinnan) and activated ability commanders. Flash in via Yeva to catch opponent's end step activations.",
        steps: [
          "Cast Runic Armasaur ({1}{G}{G}).",
          "Whenever an opponent activates a non-mana ability of a creature or land: draw a card.",
          "Against commanders like Yisan or Kinnan, this draws multiple cards per turn.",
        ],
        color: "#3498db",
      });
    }
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

  // Collector Ouphe conflict warning — if Ouphe is on the battlefield, warn about self-disruption
  if (board.has("Collector Ouphe")) {
    // Cards in our deck that Ouphe shuts down
    const ownArtifactsWithActivations = ["Sol Ring","Chrome Mox","Mox Diamond","Lotus Petal"]
      .filter(c => board.has(c) || inHand.has(c));
    // Non-artifact cards that Ouphe does NOT affect (just for clarity — Ouphe only hits artifacts)
    // Key activated abilities that ARE affected: artifact mana rocks
    // Key activated abilities NOT affected (they're creatures/lands/enchantments):
    //   Yisan, Survival of the Fittest, Duskwatch Recruiter, Fauna Shaman, War Room, etc.
    // Ouphe only shuts down ARTIFACT activated abilities.
    const selfConflicts = ownArtifactsWithActivations;

    if (selfConflicts.length > 0) {
      results.push({
        priority: 13,
        category: "⚠️ OUPHE CONFLICT",
        headline: `Collector Ouphe is live — your ${selfConflicts.join(", ")} cannot activate`,
        detail: `Collector Ouphe shuts down ALL artifact activated abilities — including your own. ${selfConflicts.join(", ")} cannot tap for mana while Ouphe is on the battlefield. This affects your mana base.`,
        steps: [
          `Affected artifacts: ${selfConflicts.join(", ")}.`,
          "These cannot tap for mana while Collector Ouphe is in play.",
          "If you need mana from these artifacts, you must remove Ouphe first (or sacrifice it via Kogla/Natural Order targets).",
          "Duskwatch Recruiter, Yisan, Survival of the Fittest, Fauna Shaman, and War Room are creatures/enchantments/lands — Ouphe does NOT affect them.",
        ],
        color: "#e74c3c",
      });
    }
  }

  // ---- BOSEIJU, WHO ENDURES ----
  if (board.has("Boseiju, Who Endures")) {
    // Identify what opponents might have that Boseiju can hit:
    // artifacts, enchantments, nonbasic lands. We can't know opponent boards,
    // but we can flag it's available and give guidance on timing.
    const boseijuTargetTypes = ["artifact", "enchantment", "nonbasic land"];
    // Check if we have a combo that's being blocked by an enchantment/artifact
    const hasOuphe       = board.has("Collector Ouphe"); // friendly stax
    const hasPoisonPath  = inHand.has("Infectious Bite") || inGrave.has("Infectious Bite");

    results.push({
      priority: 5,
      category: "💚 INTERACTION",
      headline: "Boseiju, Who Endures — instant-speed removal available",
      detail: "Boseiju's channel ability is free (just discard it), uncounterable, and hits artifacts, enchantments, or nonbasic lands at instant speed. It's one of the most efficient removal spells in cEDH — use it to answer stax pieces, combo enablers, or problematic lands threatening you.",
      steps: [
        "Channel cost: discard Boseiju, pay {1}{G} — destroy target artifact, enchantment, or nonbasic land.",
        "This ability is UNCOUNTERABLE — safe to use into open blue mana.",
        "Priority targets: Rule of Law / Teferi's Ageless Insight (stax enchantments), Isochron Scepter, Thassa's Oracle, ABUR duals / Cradle (opponent's mana base).",
        "You can also simply play it as a land that taps for {G} — no need to hold it purely for removal if no threats are visible.",
        ...(hasOuphe ? ["⚠️ You have Collector Ouphe — Boseiju hits artifacts but Ouphe shuts down artifact activations. Both can coexist since Boseiju is a channel ability (discarded), not an artifact activation."] : []),
      ],
      color: "#27ae60",
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
  // Tutor option cache: getTutorOptions is pure for a given target within this analyzeGameState
  // call. Cache results to avoid O(combos × board) duplicate calls across the loop.
  const _tutorCache = new Map();
  const cachedTutorOptions = (target) => {
    if (!_tutorCache.has(target)) {
      _tutorCache.set(target, getTutorOptions(target, hand, battlefield, mana, infiniteManaActive, graveyard));
    }
    return _tutorCache.get(target);
  };
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
    //   Exception A: if a haste enabler is available (Ashaya + Destiny Spinner/Badgermole),
    //   these cards can be cast this turn and tap immediately.
    //   Exception B: if the card is in hand and castable this turn, it's not "missing" —
    //   it just needs to be cast first (will appear in needToCast below).
    const missingPreExist   = mustPreExist.filter(r => {
      if (board.has(r)) return false;                              // already there
      if (inHand.has(r) && canCastNow) return false;              // in hand, can cast it
      return true;
    });
    // Tier 2: onBattlefield (non-mustPreExist) — can be in hand and cast/played this turn
    const castableOnBoard   = onBattlefield.filter(r => !mustPreExist.includes(r));
    const missingCastable   = castableOnBoard.filter(r => {
      if (board.has(r)) return false;
      if (!inHand.has(r)) return true;                            // not accessible at all
      if (getCard(r)?.type === "land") return !isMyTurn;           // lands: only on our turn
      return !canCastNow;                                         // spells/creatures: canCastNow
    });
    // Tier 3: requires-only (spells cast during combo) — anywhere in hand or board
    const requiresOnly      = canBeAnywhere.filter(r => !onBattlefield.includes(r));
    const missingAnywhere   = requiresOnly.filter(r => !board.has(r) && !inHand.has(r));

    const missing = [...new Set([...missingPreExist, ...missingCastable, ...missingAnywhere])];

    const extras = comboExtrasSatisfied(combo, infiniteManaActive);

    // Seedborn engine combos: the bespoke block (board) and seedborn_engine are equivalent.
    // seedborn_yeva is redundant whenever seedborn_engine has already fired.
    // seedborn_engine is fully handled by the bespoke Seedborn block when Seedborn is on board
    if (combo.id === "seedborn_engine" &&
        results.some(r => r.combo === "seedborn_bespoke")) continue;

    if (missing.length === 0 && extras.ok) {
      // Type metadata: label, headline prefix, priority boost, color
      const typeMeta = {
        "infinite-mana": { ready: "⚙️ INFINITE MANA ONLINE", cast: "⚡ CAST TO ENABLE MANA LOOP",  readyPrefix: "LOOP READY:",  boost: 2, color: "#58d68d" },
        "win-mill":      { ready: hasLandAnimate ? "🔥 WIN NOW — MILL" : "⚡ ASSEMBLE MILL WIN", cast: "⚡ ASSEMBLE MILL WIN", readyPrefix: hasLandAnimate ? "EXECUTE:" : "SETUP:", boost: hasLandAnimate ? 5 : 2, color: hasLandAnimate ? "#ff6b35" : "#e67e22" },
        "win-poison":    { ready: "🔥 WIN NOW — POISON",      cast: "⚡ ASSEMBLE POISON WIN",        readyPrefix: "EXECUTE:",     boost: 5, color: "#27ae60" },
        "win-draw":      { ready: "📚 DRAW YOUR LIBRARY",     cast: "⚡ ASSEMBLE DRAW LOOP",         readyPrefix: "EXECUTE:",     boost: 4, color: "#5dade2" },
        "win-combat":    { ready: "🔥 WIN NOW — COMBAT",      cast: "⚡ ASSEMBLE COMBAT WIN",        readyPrefix: "EXECUTE:",     boost: 5, color: "#e74c3c" },
        "win-now":       { ready: "🔥 WIN NOW",               cast: "⚡ CAST TO WIN NOW",            readyPrefix: "EXECUTE:",     boost: 5, color: "#ff6b35" },
        "engine":        { ready: "🔄 ENGINE READY",          cast: "⚡ ACTIVATE ENGINE",            readyPrefix: "ACTIVATE:",    boost: 1, color: "#a569bd" },
      }[combo.type] || { ready: "🔄 COMBO ASSEMBLED",  cast: "⚡ ASSEMBLE COMBO", readyPrefix: "EXECUTE:", boost: 3, color: "#58d68d" };

      // needToCast = castable-on-board cards in hand + requires-only spell cards in hand
      const needToCast = [
        ...castableOnBoard.filter(r => inHand.has(r) && !board.has(r)), // permanents to cast
        ...requiresOnly.filter(r => inHand.has(r)),                     // spells cast during combo
        ...mustPreExist.filter(r => inHand.has(r) && !board.has(r) && canCastNow), // mustPreExist cards in hand
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
        const totalCost = needToCast.reduce((acc, c) => acc + (getCard(c)?.cmc || 0), 0);
        if ((mana >= totalCost || infiniteManaActive) || !isMyTurn) {
          results.push({
            priority: combo.priority + typeMeta.boost,
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
      // One named piece missing — emit advice only when at least one required piece is
      // already accessible (on board, or in hand AND currently castable).
      // A card in hand that can't be cast right now (0 mana, opponent's turn, no flash)
      // doesn't count as "owning" a piece — avoids noise on empty/locked boards.
      if (combo.type !== "infinite-mana" || !infiniteManaActive) {
        const missingCard = missing[0];
        const ownedAccessible = combo.requires.filter(r => r !== missingCard && (
          board.has(r) || (inHand.has(r) && canCastNow)
        ));
        // For single-required-card combos (the card IS the combo), only show if there is
        // a tutor available to fetch it or if extras are already satisfied (e.g. infinite mana).
        // Previously these always showed, creating noise on bare boards with nothing actionable.
        // For multi-piece combos, require at least one other piece to be accessible.
        const tutorOptionsEarly = cachedTutorOptions(missingCard);
        const hasTutorForMissing = tutorOptionsEarly.length > 0;
        const hasEnoughContext = combo.requires.length === 1
          ? (hasTutorForMissing || ownedAccessible.length > 0)
          : ownedAccessible.length > 0;
        if (!hasEnoughContext) {
          // No owned pieces accessible right now — suppress to avoid noise on empty boards
        } else if (!inDeck(missingCard) || combo.requires.some(c => c !== missingCard && !inDeck(c))) {
          // Missing card or another required card not in deck — skip
        } else {
        const tutorOptions = tutorOptionsEarly;
        const speakerIsTutor = tutorOptions.length > 0 && tutorOptions[0].startsWith("Formidable Speaker");
        results.push({
          priority: combo.priority + 1,
          category: "🎯 ONE PIECE AWAY",
          headline: speakerIsTutor
            ? `Cast Formidable Speaker → ETB finds ${missingCard} → enables ${combo.name}`
            : tutorOptions.length > 0
              ? `Find ${missingCard} via ${tutorOptions[0].split(" (")[0]} to enable ${combo.name}`
              : `Find ${missingCard} to enable ${combo.name}`,
          detail: tutorOptions.length > 0
            ? `Use ${tutorOptions[0]} to find ${missingCard}. ${combo.description}`
            : `You need ${missingCard} to enable ${combo.name}. ${combo.description}`,
          steps: tutorOptions.length > 0
            ? [`Use ${tutorOptions.join(" or ")} to find ${missingCard}.`, ...combo.lines]
            : [`Find ${missingCard} to complete this combo.`, ...combo.lines],
          combo: combo.id,
          color: speakerIsTutor ? "#e67e22" : "#58d68d",
        });
        } // end inDeck check
      }
    } else if (missing.length === 0 && !extras.ok) {
      // Named pieces present but need an extra condition satisfied.
      // Suppress redundant NEARLY THERE when infinite mana is active and the only missing
      // extra is Endurance — the dedicated win-pile section handles that more clearly.
      if (combo.type !== "infinite-mana" || !infiniteManaActive) {
        const suppressEndurance = infiniteManaActive
          && (combo.type === "win-mill" || combo.type === "win-draw" || combo.type === "win-poison" || combo.type === "win-combat")
          && typeof extras.missing === "string"
          && extras.missing.toLowerCase().includes("endurance");
        if (!suppressEndurance && inDeck(extras.missing)) {
          const tutorOptions = cachedTutorOptions(extras.missing);
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
    } else if (missing.length >= 2 && extras.ok && combo.priority >= 8) {
      // Two or more named pieces missing — emit a lower-priority "building towards" hint
      // so the player knows this combo is on the horizon. Only for high-value combos (≥8)
      // and only when the player owns at least one required piece already.
      if (combo.type !== "infinite-mana" || !infiniteManaActive) {
        const ownedPieces = combo.requires.filter(r => board.has(r) || (inHand.has(r) && canCastNow));
        if (ownedPieces.length >= 1) {
          // When a deckList is active, skip this combo entirely if ANY required card is not in the deck
          if (combo.requires.some(c => !inDeck(c))) {
            // At least one required card isn't in this deck — don't suggest this combo
          } else {
          const missingNames = missing.slice(0, 3).join(", ");
          // Prefer to suggest tutoring whichever missing card is actually findable.
          const tutorableMissing = missing.find(m => cachedTutorOptions(m).length > 0) ?? missing[0];
          const tutorOptions = cachedTutorOptions(tutorableMissing);
          results.push({
            priority: combo.priority - 3,
            category: "🔨 BUILDING TOWARDS",
            headline: `${combo.name} — need: ${missingNames}${missing.length > 3 ? " …" : ""}`,
            detail: `You have ${ownedPieces.join(", ")}. Still need: ${missing.join(", ")}. ${combo.description}`,
            steps: tutorOptions.length > 0
              ? [`Priority: use ${tutorOptions[0]} to find ${tutorableMissing}.`, ...combo.lines]
              : [`Find ${missing.join(", ")} to assemble this combo.`, ...combo.lines],
            combo: combo.id,
            color: "#5d8a5d",
          });
          } // end inDeck check
        }
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
    || (enduranceInHand && yevaAvailable) // Yeva from command zone also enables flash
    || enduranceInGrave; // retrievable via Eternal Witness
  // For WIN NOW the bar is higher: must be on board or in hand right now.
  // BUT if Duskwatch Recruiter is castable, it can fetch Endurance from the library
  // as the first activation — so we treat endurance as effectively ready.
  const enduranceReady = enduranceOnBoard || enduranceInHand;


  // ---- DUSKWATCH RECRUITER (infinite mana → full win pile) ----
  // Can we access Duskwatch Recruiter right now?
  // Direct: on board, in hand on our turn, or in hand with Yeva flash/available (commander zone)
  const duskwatchOnBoard  = board.has("Duskwatch Recruiter");
  const duskwatchInHand   = accessible("Duskwatch Recruiter");
  const duskwatchDirect   = duskwatchOnBoard
    || (duskwatchInHand && isMyTurn)
    || (duskwatchInHand && yevaAvailable);

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
  const hasCreatureToDiscard = hand.some(c => getCard(c)?.type === "creature")
    || battlefield.some(c => getCard(c)?.type === "creature" && c !== "Fauna Shaman");
  const faunaCanActivate = board.has("Fauna Shaman")
    && (hasCreatureToDiscard || infiniteManaActive);
  // Survival of the Fittest also needs a creature to discard
  const survivalCanActivate = board.has("Survival of the Fittest")
    && (hasCreatureToDiscard || infiniteManaActive);
  // Formidable Speaker: ETB — discard a card → search library for any creature (guaranteed full tutor).
  // Repeatable with Temur Sabertooth or Kogla bounce. No discard cost.
  const speakerCanActivate = board.has("Formidable Speaker") && speakerHasBouncer;
  const activatedCreatureTutors = [
    ...(faunaCanActivate    ? ["Fauna Shaman"]              : []),
    ...(survivalCanActivate ? ["Survival of the Fittest"]   : []),
    ...(speakerCanActivate  ? ["Formidable Speaker"]        : []),
  ];

  // Woodland Bellower: ETB puts any non-legendary green creature CMC <= 3 directly onto battlefield.
  // Castable on our turn (sorcery speed) or with Yeva flash. Already-on-board means ETB already fired.
  const bellowerInHand    = accessible("Woodland Bellower");
  const bellowerCastable  = bellowerInHand && (isMyTurn || yevaAvailable);
  // Bellower can find: Duskwatch, Eternal Witness, Endurance, Destiny Spinner, Elvish Reclaimer,
  // Fauna Shaman (discard to tutor), Formidable Speaker (discard → full library search), Hyrax Tower Scout, Quirion Ranger, Scryb Ranger,
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
    if (speed === "activated") return isMyTurn || yevaAvailable;
    if (speed === "bellower")  return isMyTurn || yevaAvailable;
    return false;
  });

  const duskwatchViaTutor = tutorsThatFindDuskwatch.length > 0;
  const duskwatchCastable = duskwatchDirect || duskwatchViaTutor;

  // Duskwatch can find Endurance as its first activation — so if Duskwatch is
  // castable we treat Endurance as effectively in hand for win-now purposes.
  const enduranceEffectivelyReady = enduranceReady || duskwatchCastable;

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
    : (duskwatchInHand && yevaAvailable)                         ? "Cast Yeva → Flash Duskwatch → "
    : duskwatchViaTutor                                          ? `${tutorsThatFindDuskwatch[0].tutor} → Duskwatch → `
    : "";

  // If Yeva needs to be cast from command zone first, prepend that as a step
  const castYevaFirst = !isMyTurn && !yevaFlash && yevaAvailable;

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

    // Build precise Sanitarium execution steps based on what's actually on board
    const postPileBoard = new Set([
      ...battlefield,
      // Add pieces we know Duskwatch will find if they're still needed
    ]);
    const { steps: millSteps } = buildMillSequence(postPileBoard, inHand, pileNeeded);

    results.push({
      priority: enduranceEffectivelyReady ? 15 : 11,
      category: enduranceEffectivelyReady ? "🔥 WIN NOW — PILE" : "⚠️ NEED ENDURANCE FIRST",
      headline: enduranceEffectivelyReady
        ? `${duskwatchAccessNote}Assemble the Win Pile → Sanitarium Mill`
        : `${duskwatchAccessNote}Assemble Win Pile — find Endurance before executing`,
      detail: enduranceEffectivelyReady
        ? `With infinite mana, activate Duskwatch Recruiter repeatedly to pull the win pile from your library, then execute the Sanitarium mill loop${untapMethods.length > 0 ? ` using: ${untapMethods[0]}` : ""}.`
        : "⚠️ Endurance is REQUIRED before activating Sanitarium — without it you will mill yourself out. Find Endurance via Duskwatch before starting the Sanitarium loop.",
      steps: [
        ...(castYevaFirst ? [
          `FIRST: Cast Yeva, Nature's Herald from command zone ({2}{G}{G}) — gives all green creatures flash for the rest of this turn.`,
        ] : []),
        ...(duskwatchViaTutor && !duskwatchOnBoard ? [
          `ACCESS: Cast ${tutorNote(tutorsThatFindDuskwatch[0].tutor)} to find Duskwatch Recruiter.`
          + (tutorsThatFindDuskwatch.length > 1 ? ` (Alternatives: ${tutorsThatFindDuskwatch.slice(1).map(x=>x.tutor).join(", ")})` : ""),
        ] : []),
        ...millSteps,
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
    || (reclaimerInHand && yevaAvailable);

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
          return enduranceEffectivelyReady ? 13 : 7;
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
      || (witnessInHand && yevaAvailable);

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
        if (isActivated) return board.has(t) && (isMyTurn || yevaAvailable);
        if (isBellower)  return inHand.has(t) && (isMyTurn || yevaAvailable);
        if (isSpeaker)   return board.has(t) && speakerHasBouncer && (isMyTurn || yevaAvailable);
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
          priority: enduranceEffectivelyReady ? 14 : 10,
          category: enduranceEffectivelyReady ? "🔥 WIN NOW — PILE" : "⚠️ NEED ENDURANCE FIRST",
          headline: enduranceEffectivelyReady
            ? `${accessNote} → retrieve Duskwatch → Assemble Win Pile`
            : `${accessNote} → retrieve Duskwatch → find Endurance → Sanitarium Mill`,
          detail: enduranceEffectivelyReady
            ? "Duskwatch Recruiter is in your graveyard. Eternal Witness retrieves it, then infinite Duskwatch activations assemble the win pile for a Sanitarium mill finish."
            : "⚠️ Endurance is REQUIRED — without it Sanitarium mills you out too. Retrieve Duskwatch, then use it to find Endurance before starting the Sanitarium loop.",
          steps: [
            witnessOnBoard
              ? "Eternal Witness is already on the battlefield — use Temur Sabertooth or Kogla to bounce and recast it to retrieve Duskwatch from the graveyard."
              : `Cast Eternal Witness ({2}{G})${witnessTutors.length > 0 && !witnessInHand ? ` (find it via ${tutorNote(witnessTutors[0])})` : ""}: ETB retrieves Duskwatch Recruiter from graveyard.`,
            "Cast Duskwatch Recruiter ({1}{G}{G}).",
            ...(!enduranceEffectivelyReady ? ["⚠️ Use Duskwatch to find Endurance FIRST before activating Sanitarium."] : []),
            "With infinite mana, activate Duskwatch ({2}{G}) repeatedly to assemble the win pile:",
            "  • Destiny Spinner + Elvish Reclaimer → tutor Geier Reach Sanitarium",
            "  • Ashaya + Temur Sabertooth + Endurance + one untap method",
            "Activate Sanitarium repeatedly (untapping each loop) until all opponents mill out.",
          ],
          color: enduranceEffectivelyReady ? "#ff6b35" : "#e67e22",
        });
      }

      // Tier 1b: A key tutor is in the graveyard (Worldly Tutor, Chord etc → find Duskwatch)
      const graveTutors = ["Worldly Tutor","Chord of Calling","Summoner's Pact","Archdruid's Charm",
        "Green Sun's Zenith","Natural Order","Eldritch Evolution"]
        .filter(t => inGrave.has(t) && !inHand.has(t));
      if (graveTutors.length > 0 && !duskwatchCastable && !inGrave.has("Duskwatch Recruiter")) {
        const accessNote = witnessOnBoard ? "Eternal Witness" : `${witnessTutors.length > 0 && !witnessInHand ? witnessTutors[0] + " → " : ""}Eternal Witness`;
        results.push({
          priority: enduranceEffectivelyReady ? 13 : 9,
          category: enduranceEffectivelyReady ? "🔥 WIN NOW — PILE" : "⚠️ NEED ENDURANCE FIRST",
          headline: `${accessNote} → retrieve ${graveTutors[0]} → find Duskwatch`,
          detail: enduranceEffectivelyReady
            ? `${graveTutors[0]} is in the graveyard. Eternal Witness retrieves it, then use it to find Duskwatch Recruiter and execute the full win pile.`
            : `⚠️ ${graveTutors[0]} is in the graveyard. Retrieve it, find Duskwatch, then find Endurance BEFORE activating Sanitarium or you will self-mill.`,
          steps: [
            `Cast Eternal Witness${witnessInHand ? "" : witnessTutors.length > 0 ? ` (via ${tutorNote(witnessTutors[0])})` : ""}: ETB retrieves ${graveTutors[0]} from graveyard.`,
            `Cast ${graveTutors[0]} to find Duskwatch Recruiter.`,
            ...(!enduranceEffectivelyReady ? ["⚠️ Use Duskwatch to find Endurance BEFORE activating Sanitarium."] : []),
            "Cast Duskwatch Recruiter. Activate repeatedly to assemble win pile → Sanitarium mill win.",
          ],
          color: enduranceEffectivelyReady ? "#ff6b35" : "#e67e22",
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
          || (primaryTarget === "Eternal Witness" && (accessible("Infectious Bite") || inGrave.has("Infectious Bite")) && hasBouncer)
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
        "Priest of Titania":      `enters play — taps for ${battlefield.filter(c => getCard(c)?.tags?.includes("elf")).length} green mana (elves on board)`,
        "Elvish Archdruid":       `enters play — taps for ${battlefield.filter(c => getCard(c)?.tags?.includes("elf")).length} green mana (elves on board)`,
        "Circle of Dreams Druid": `enters play — taps for ${battlefield.filter(c => getCard(c)?.type === "creature").length} green mana (creatures on board)`,
        "Magus of the Candelabra":"enters play — {X}: untap X lands; key Ashaya/Nykthos combo piece",
      }[primaryTarget] || "enters play directly — no casting cost";

      // Suppress the standalone WIN NOW if the WIN NOW — PILE entry already covers this exact
      // line (Bellower is the tutor feeding duskwatchViaTutor → the PILE block fires at p15).
      const pileAlreadyCoversThis = isWinNow
        && primaryTarget === "Duskwatch Recruiter"
        && results.some(r => r.priority >= 15 && r.category.includes("WIN NOW"));
      if (pileAlreadyCoversThis) {
        // Already represented at higher priority — skip to avoid duplicate
      } else {
      results.push({
        priority: isWinNow ? 14 : (winTarget ? 10 : 8),
        category: isWinNow ? "🔥 WIN NOW" : "🌲 BELLOWER TUTOR",
        headline: castYevaFirst
          ? `Cast Yeva → Flash Woodland Bellower → put ${primaryTarget} onto battlefield`
          : `Cast Woodland Bellower → put ${primaryTarget} onto battlefield`,
        detail: `Woodland Bellower ETB: search for any non-legendary green creature with CMC ≤ 3 and put it directly onto the battlefield. ${targetReason}`,
        steps: [
          ...(castYevaFirst ? [
            `FIRST: Cast Yeva, Nature's Herald from command zone ({2}{G}{G}) — gives all green creatures flash for this turn.`,
          ] : []),
          `Cast Woodland Bellower ({4}{G}{G})${castYevaFirst ? " at instant speed via Yeva's flash" : ""}.`,
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
      } // end pileAlreadyCoversThis check
    }
  }


  // ---- SEEDBORN MUSE ENGINE ----
  if (board.has("Seedborn Muse") && board.has("Yisan, the Wanderer Bard")) {
    const currentVerse = yisanCounters ?? 0;
    const withYeva2 = board.has("Yeva, Nature's Herald");
    results.push({
      priority: 11,
      category: "🌱 SEEDBORN + YISAN ONLINE",
      headline: `Seedborn Muse: free Yisan activation every opponent's turn (currently V${currentVerse})`,
      detail: "Seedborn Muse untaps all permanents at each opponent's upkeep. Yisan gets a free verse activation every opponent's turn. With 3 opponents: 3 activations per round -- chain V1-V5 in a single round to reach Ashaya and go infinite.",
      steps: [
        `Yisan is at verse ${currentVerse}. Every opponent's upkeep: Seedborn untaps all permanents, Yisan can activate again.`,
        "V1: Quirion Ranger (use Ranger to untap Yisan after activation -- activate twice at same verse).",
        "V2: Scryb Ranger or Wirewood Symbiote.",
        "V3: Priest of Titania or Elvish Archdruid.",
        "V4: Temur Sabertooth.",
        "V5: Ashaya, Soul of the Wild -- go infinite immediately with your V1-V3 pieces.",
        withYeva2 ? "Yeva flash is active -- flash creatures in on opponents' turns too." : "Getting Yeva in play expands your instant-speed window.",
      ],
      color: "#a8d8a8",
    });
  }

  // ---- FAUNA SHAMAN WIN CON (in hand) ----
  // Fauna Shaman in hand + infinite mana: casting it enables finding Duskwatch or Eternal Witness.
  if (inHand.has("Fauna Shaman") && !board.has("Fauna Shaman") && (infiniteManaActive || mana >= 20)) {
    const hasteNow    = board.has("Destiny Spinner");
    const hasBouncer  = board.has("Temur Sabertooth") || board.has("Kogla, the Titan Ape") || inHand.has("Temur Sabertooth") || inHand.has("Kogla, the Titan Ape");
    const biteAvail   = accessible("Infectious Bite") || inGrave.has("Infectious Bite");
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

  // ---- FORMIDABLE SPEAKER IN HAND: CAST NOW → IMMEDIATE TUTOR LOOP ----
  // When Speaker is in hand + Quirion Ranger on board + a dork that will produce ≥3 mana
  // after Speaker enters (as an elf, it raises elf counts), casting Speaker IS the win:
  //   1. Cast Speaker → ETB: discard a card → search library for Ashaya
  //   2. Ashaya enters → Speaker (elf) becomes a Forest
  //   3. Quirion bounces Speaker → untaps dork
  //   4. Dork (now counting Speaker+Ashaya as elves) taps for ≥3 → recast Speaker ({2}{G}) → net 0 = infinite
  //   5. Repeat: each cast fetches any creature. Find Duskwatch → win.
  // This is NOT just ONE PIECE AWAY — it is a CAST TO WIN NOW play.
  {
    const speakerInHandNow = accessible("Formidable Speaker") && !board.has("Formidable Speaker");
    const quirionInLoop    = board.has("Quirion Ranger") || board.has("Scryb Ranger");
    const quirionLoopName  = board.has("Quirion Ranger") ? "Quirion Ranger" : "Scryb Ranger";
    const ashayaNotOnBoard = !board.has("Ashaya, Soul of the Wild");
    const canCastSpeakerNow = speakerInHandNow && (isMyTurn || yevaFlash) && mana >= 3; // free flash only; command-zone handled by canCastYevaThenSpeaker
    const winLineAvailable  = speakerInHandNow && mana >= 3;
    // Speaker ETB requires discarding another card — if Speaker is the only card in hand, ETB fizzles.
    const hasDiscardForSpeaker = hand.filter(c => c !== "Formidable Speaker").length > 0;
    // Yeva in hand: casting her first gives flash to all green creatures this turn.
    // Yeva costs {2}{G}{G} = 4. Speaker costs {2}{G} = 3. Total = 7 to do both this opponent's turn.
    const yevaInHand = inHand.has("Yeva, Nature's Herald") && !board.has("Yeva, Nature's Herald");
    const canCastYevaThenSpeaker = !isMyTurn && !yevaFlash && yevaAvailable && mana >= 7;

    if (speakerInHandNow && quirionInLoop && winLineAvailable && hasDiscardForSpeaker && !infiniteManaActive) {
      // Estimate dork output AFTER Speaker enters (+1 elf = +1 mana for elf-counting dorks)
      const speakerElvBonus = 1; // Speaker is an elf, raises elf count by 1
      const postCastElves = elvesOnBoard + speakerElvBonus;
      const dorkForLoop = [...battlefield, ...hand].find(c => {
        if (!getCard(c)?.tags?.includes("big-dork") && !getCard(c)?.tags?.includes("dork")) return false;
        const t = getCard(c)?.tapsFor;
        if (typeof t === "number") return t >= 3;
        if (t === "elves")     return postCastElves >= 3;
        if (t === "creatures") return (creaturesOnBoard + speakerElvBonus) >= 3;
        if (t === "devotion")  return (devotionOnBoard  + speakerElvBonus) >= 3;
        return false;
      });

      if (dorkForLoop && !results.some(r => r.combo === "speaker_hand_cast_to_win")) {
        const dorkName = dorkForLoop;
        const dorkOutput = (() => {
          const t = getCard(dorkName)?.tapsFor;
          if (typeof t === "number") return t;
          if (t === "elves")     return postCastElves;
          if (t === "creatures") return creaturesOnBoard + speakerElvBonus;
          if (t === "devotion")  return devotionOnBoard  + speakerElvBonus;
          return 3;
        })();
        const netMana = dorkOutput - 3; // Speaker costs {2}{G} = 3
        const loopDesc = netMana > 0 ? `net +${netMana}G per loop` : "mana-neutral (infinite)";
        const discardTarget = hand.filter(c => c !== "Formidable Speaker").find(c => getCard(c)?.type !== "creature") || "a land/spell";
        const sharedSteps = [
          `Cast Formidable Speaker ({2}{G}). ETB: discard ${discardTarget !== "a land/spell" ? discardTarget : "a non-creature card"} → search library for Ashaya, Soul of the Wild. Put Ashaya into your hand, then shuffle.`,
          `Cast Ashaya, Soul of the Wild. All your nontoken creatures are now Forest lands.`,
          `Activate ${quirionLoopName}: return Formidable Speaker (now a Forest via Ashaya) to hand — this untaps ${dorkName}.`,
          `Tap ${dorkName} for ${dorkOutput} mana. Recast Formidable Speaker ({2}{G}): ETB — discard any card → search entire library for any creature. ${loopDesc}.`,
          `First priority: find Duskwatch Recruiter. Cast it. Activate ({2}{G}) repeatedly — looks at top 3 cards to assemble the win pile.`,
          `Win pile: Endurance + Geier Reach Sanitarium + untap method → mill all opponents.`,
        ];

        if (canCastSpeakerNow) {
          // Flash available (Yeva on board, or our turn)
          results.push({
            priority: 15,
            category: "⚡ CAST TO WIN",
            headline: `Cast Formidable Speaker NOW → find Ashaya → ${quirionLoopName} loop → infinite tutor → find Duskwatch → WIN`,
            combo: "speaker_hand_cast_to_win",
            detail: `Casting Speaker starts an immediate winning sequence. ETB: discard a card → search library for Ashaya. Once Ashaya is in play, Speaker becomes a Forest. ${quirionLoopName} bounces Speaker to untap ${dorkName} (${dorkOutput} mana post-cast, ${loopDesc}). Each loop fetches any creature — find Duskwatch, then activate for the win pile.`,
            steps: sharedSteps,
            color: "#ff4500",
          });
        } else if (canCastYevaThenSpeaker) {
          // Yeva available (hand or command zone) + enough mana → instant win this opponent's turn
          const yevaSource = yevaInHand ? "in hand" : "from command zone";
          results.push({
            priority: 15,
            category: "⚡ CAST TO WIN",
            headline: `Cast Yeva → flash in Formidable Speaker → find Ashaya → ${quirionLoopName} loop → find Duskwatch → WIN`,
            combo: "speaker_hand_cast_to_win",
            detail: `You have ${mana} mana available. Cast Yeva, Nature's Herald (${yevaSource}, {2}{G}{G}) — she gives all green creatures flash. Immediately flash in Formidable Speaker ({2}{G}) this same opponent's turn. ETB: discard a card → search for Ashaya. With Ashaya in play, Speaker becomes a Forest — ${quirionLoopName} bounces it to untap ${dorkName} (${dorkOutput} mana, ${loopDesc}). Find Duskwatch → win.`,
            steps: [
              `Cast Yeva, Nature's Herald (${yevaSource}, {2}{G}{G}). Green creatures now have flash until end of turn.`,
              ...sharedSteps,
            ],
            color: "#ff4500",
          });
        } else {
          // No flash available, not our turn — flag as next-turn priority with Yeva hint
          const yevaHint = mana < 7
            ? ` (Need ${7 - mana} more mana to cast Yeva from command zone + Speaker this turn.)`
            : "";
          results.push({
            priority: 14,
            category: "⏭️ WIN NEXT TURN",
            headline: `NEXT TURN: Cast Formidable Speaker → find Ashaya → ${quirionLoopName} loop → find Duskwatch → WIN`,
            combo: "speaker_hand_cast_to_win",
            detail: `You cannot cast Speaker this turn (no flash).${yevaHint} On your next turn: ETB: discard a card → search library for Ashaya. With Ashaya in play, Speaker becomes a Forest — ${quirionLoopName} bounces it to untap ${dorkName} (${dorkOutput} mana, ${loopDesc}). Loop fetches any creature. Find Duskwatch → win. Hold your hand — do not discard the Forests.`,
            steps: [`Wait for your turn. You have the win in hand.`, ...sharedSteps],
            color: "#e67e22",
          });
        }
      }
    }
  }
  // ---- FORMIDABLE SPEAKER + ASHAYA + QUIRION RANGER TUTOR ENGINE ----
  {
    const speakerOnBoard  = board.has("Formidable Speaker");
    const speakerInHand   = accessible("Formidable Speaker");
    const ashayaOnBoard   = board.has("Ashaya, Soul of the Wild");
    const quirionOnBoard  = board.has("Quirion Ranger") || board.has("Scryb Ranger");
    const quirionName     = board.has("Quirion Ranger") ? "Quirion Ranger" : "Scryb Ranger";
    const hasDuskwatch    = board.has("Duskwatch Recruiter") || accessible("Duskwatch Recruiter");
    const bigDork         = findBigDork(battlefield, hand, infiniteManaActive, 2);
    const creatureCount   = battlefield.filter(c => getCard(c)?.type === "creature").length;

    // ── All pieces in hand: Yeva → Ashaya + Argothian Elder → infinite → Speaker → Duskwatch → WIN ──
    // State: Ashaya + Argothian Elder + Speaker all in hand (or accessible), Yeva available for flash,
    // enough mana (Yeva 4 + Ashaya 4 + Elder 4 + Speaker 3 = 15, but Elder untaps lands so net much less).
    // Simplified: need ≥11 mana (Yeva 4 + Ashaya 4 + Elder is free after infinite + Speaker 3).
    // Actually: cast Yeva (4), cast Ashaya (4), cast Elder (4) → infinite mana → cast Speaker (free) → win.
    // Min mana: 4+4+4 = 12 to get to infinite, then Speaker is free with infinite mana.
    {
      const ashayaInHand   = accessible("Ashaya, Soul of the Wild") && !board.has("Ashaya, Soul of the Wild");
      const elderInHand    = accessible("Argothian Elder") && !board.has("Argothian Elder");
      const speakerInHand2 = accessible("Formidable Speaker") && !board.has("Formidable Speaker");
      const hasDuskwatch2  = board.has("Duskwatch Recruiter") || accessible("Duskwatch Recruiter");
      const hasDiscard2    = hand.filter(c => c !== "Formidable Speaker").length > 1; // need ≥1 discard after casting others
      // Need Yeva flash (opponent's turn), or it's our turn already
      const canFlashIn     = isMyTurn || yevaAvailable;
      // Mana check: Yeva(4) + Ashaya(4) + Elder(4) = 12. On our turn skip Yeva cost.
      const minMana        = isMyTurn ? 8 : (yevaFlash ? 8 : 12); // Yeva from command zone costs 4
      const alreadyFired   = results.some(r => r.combo === "speaker_inf_duskwatch_direct" || r.combo === "speaker_hand_cast_to_win" || r.combo === "full_hand_inf_speaker_win");

      if (ashayaInHand && elderInHand && speakerInHand2 && !hasDuskwatch2 && canFlashIn && mana >= minMana && hasDiscard2 && !infiniteManaActive && !alreadyFired) {
        const yevaStep = !isMyTurn && !yevaFlash
          ? [`Cast Yeva, Nature's Herald (command zone, {2}{G}{G}) — all green creatures gain flash this turn.`]
          : [];
        const discardCard = hand.filter(c => c !== "Formidable Speaker" && c !== "Ashaya, Soul of the Wild" && c !== "Argothian Elder")[0] ?? "a card";
        results.push({
          priority: 15,
          category: "⚡ CAST TO WIN",
          headline: !isMyTurn && !yevaFlash
            ? "Cast Yeva → flash Ashaya + Argothian Elder → infinite mana → Formidable Speaker → Duskwatch → WIN"
            : "Cast Ashaya + Argothian Elder → infinite mana → Formidable Speaker → Duskwatch → WIN",
          combo: "full_hand_inf_speaker_win",
          detail: "All pieces are in hand. Cast Yeva for flash (if opponent's turn), then Ashaya + Argothian Elder to go infinite (Elder is a Forest via Ashaya and can untap itself). With infinite mana, cast Formidable Speaker: ETB discard → search library for Duskwatch Recruiter. Activate Duskwatch with infinite mana to assemble the win pile.",
          steps: [
            ...yevaStep,
            "Cast Ashaya, Soul of the Wild ({2}{G}{G}): all your nontoken creatures become Forest lands.",
            "Cast Argothian Elder ({3}{G}): it enters as a Forest (via Ashaya). Tap Elder as a Forest for {G}, then activate its tap ability to untap itself + any other land. Infinite mana.",
            `Cast Formidable Speaker ({2}{G}): ETB — discard ${discardCard} → search your entire library for Duskwatch Recruiter. Shuffle.`,
            "Cast Duskwatch Recruiter ({1}{G}). Activate ({2}{G}) repeatedly with infinite mana — look at top 3 cards, put any creature found into hand.",
            "Find Endurance + Geier Reach Sanitarium (or Talon Gates of Madara) + Eternal Witness → mill all opponents to win.",
          ],
          color: "#ff4500",
        });
      }
    }

    // ── Infinite mana active + Speaker in hand → instant win (no Ranger needed) ──
    // With infinite mana already online, cast Speaker → ETB fetch Duskwatch → activate → win.
    // No Ranger loop required — just cast, fetch, activate.
    if (infiniteManaActive && speakerInHand && !speakerOnBoard && !hasDuskwatch) {
      const speakerFirstCastOk = hand.filter(c => c !== "Formidable Speaker").length > 0;
      if (speakerFirstCastOk && (isMyTurn || yevaAvailable)) {
        const alreadyShown = results.some(r => r.combo === "speaker_inf_duskwatch_direct");
        if (!alreadyShown) {
          results.push({
            priority: 15,
            category: "⚡ CAST TO WIN",
            headline: "Cast Formidable Speaker → ETB fetches Duskwatch Recruiter → activate → WIN",
            combo: "speaker_inf_duskwatch_direct",
            detail: "Infinite mana is already active. Cast Formidable Speaker ({2}{G}): ETB — discard any card, search your entire library for Duskwatch Recruiter. Cast Duskwatch. Activate ({2}{G}) repeatedly to find Endurance, Eternal Witness, and Geier Reach Sanitarium. Mill all opponents to win.",
            steps: [
              "Infinite mana is active.",
              `Cast Formidable Speaker ({2}{G}): ETB — discard ${hand.filter(c => c !== "Formidable Speaker")[0] ?? "a card"} → search your entire library for Duskwatch Recruiter. Shuffle.`,
              "Cast Duskwatch Recruiter ({1}{G}). With infinite mana: activate ({2}{G}) repeatedly — look at top 3, put any creature found into hand.",
              "Find Endurance, Eternal Witness, and Geier Reach Sanitarium (or Talon Gates of Madara).",
              "Tap Geier Reach Sanitarium, Eternal Witness recurs it each loop — mill all opponents to win.",
            ],
            color: "#ff4500",
          });
        }
      }
    }

    if (infiniteManaActive && ashayaOnBoard && quirionOnBoard && bigDork && !hasDuskwatch) {
      // When Speaker is in hand (not yet cast), verify there's another card to discard for the ETB.
      // Once on board the loop is self-sustaining: each fetch provides a card to discard next loop.
      const speakerFirstCastOk = speakerOnBoard || hand.filter(c => c !== "Formidable Speaker").length > 0;
      if (speakerFirstCastOk && (speakerOnBoard || (speakerInHand && (isMyTurn || yevaAvailable)))) {
        const alreadyShown = results.some(r => r.combo === "speaker_ashaya_tutor" && r.priority >= 10);
        if (!alreadyShown) {
          results.push({
            priority: 12,
            category: "🎯 TUTOR LOOP — FIND DUSKWATCH → WIN",
            headline: speakerOnBoard
              ? `Formidable Speaker + Ashaya + ${quirionName}: guaranteed tutor every loop → find Duskwatch → WIN`
              : `Cast Formidable Speaker → Ashaya + ${quirionName} tutor loop → find Duskwatch → WIN`,
            detail: `Speaker ETB: discard any card → search entire library for any creature (guaranteed every time). With infinite mana and Ashaya+Quirion: ${quirionName} returns Speaker to hand (untapping ${bigDork}), recast for {2}{G} — loop is free. Discard irrelevant cards, fetch exactly what you need. Find Duskwatch Recruiter → activate for win pile.`,
            combo: "speaker_ashaya_tutor",
            steps: [
              ...(speakerInHand && !speakerOnBoard ? [`Cast Formidable Speaker ({2}{G}): ETB — discard any card to search library for any creature.`] : []),
              `Activate ${quirionName}: return Formidable Speaker (a Forest via Ashaya) to hand, untapping ${bigDork}.`,
              `Tap ${bigDork} for ≥2 mana. Recast Formidable Speaker ({2}{G}): ETB — discard any card, search library for any creature. Guaranteed tutor every loop.`,
              "Discard whatever is least relevant in hand. First priority: fetch Duskwatch Recruiter.",
              "Cast Duskwatch Recruiter. Activate ({2}{G}) repeatedly — looks at top 3 cards, may reveal a creature and put it in hand. With infinite mana, repeat until you assemble the win pile.",
              "Assemble: Endurance + Geier Reach Sanitarium + untap method → mill all opponents to win.",
            ],
            color: "#e67e22",
          });
        }
      }
    }

    // Engine advice (no infinite mana yet, but pieces in place)
    if (!infiniteManaActive && ashayaOnBoard && quirionOnBoard && speakerOnBoard && bigDork) {
      const dorkOutput = getCard(bigDork)?.manaOutput ?? 2;
      if (dorkOutput >= 4) {
        results.push({
          priority: 9,
          category: "⚙️ ENGINE ONLINE",
          headline: `Formidable Speaker + Ashaya + ${quirionName}: guaranteed creature tutor every loop (net +${dorkOutput - 3}G)`,
          detail: `Speaker ETB: discard a card → search your entire library for any creature (guaranteed full tutor, no randomness). ${quirionName} returns Speaker (a Forest via Ashaya), untapping ${bigDork} (${dorkOutput} mana). Recast Speaker ({2}{G}): net +${dorkOutput - 3} mana per loop. Find infinite mana pieces, then Duskwatch.`,
          combo: "speaker_ashaya_ranger",
          steps: [
            `Activate ${quirionName}: return Formidable Speaker (a Forest via Ashaya) to hand, untapping ${bigDork}.`,
            `Tap ${bigDork} for ${dorkOutput} mana. Recast Formidable Speaker ({2}{G}): ETB — discard a card → search your entire library for any creature (guaranteed tutor every time).`,
            `Net mana: +${dorkOutput - 3}G per cycle. Prioritise: Argothian Elder, Scryb Ranger, Magus of the Candelabra (infinite mana pieces).`,
            "Once infinite mana is active, this loop becomes free — fish for Duskwatch Recruiter, then activate Duskwatch for the win pile.",
          ],
          color: "#8e44ad",
        });
      }
    }
  }

  // ---- FORMIDABLE SPEAKER WIN CON (in hand) ----
  // Speaker in hand + bouncer on board + infinite mana = win con via ETB tutoring
  // Requires at least one other card in hand to discard on first cast; bounce loop is self-sustaining after that.
  if (accessible("Formidable Speaker") && !board.has("Formidable Speaker")
      && speakerHasBouncer && (infiniteManaActive || mana >= 20)
      && hand.filter(c => c !== "Formidable Speaker").length > 0) {
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
          ? `Destiny Spinner gives haste — immediately pay {1}{G}: ${speakerBouncer} bounces Speaker. Recast ({2}{G}) — ETB: discard a card, search library for ${primaryTarget}.`
          : `Next turn: pay {1}{G}: ${speakerBouncer} bounces Speaker. Recast ({2}{G}) — ETB: discard a card, search library for ${primaryTarget}.`,
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


  // ---- REGAL FORCE DRAW LOOP ----
  if ((board.has("Regal Force") || (inHand.has("Regal Force") && canCastNow))
      && board.has("Temur Sabertooth")
      && infiniteManaActive) {
    const gCreatures = battlefield.filter(c => getCard(c)?.type === "creature" && (getCard(c)?.devotion ?? 0) >= 1).length;
    if (!results.some(r => r.combo === "regal_force_draw")) {
      results.push({
        priority: 12,
        category: board.has("Regal Force") ? "📚 DRAW YOUR LIBRARY" : "⚡ CAST FOR WIN",
        headline: `Regal Force + Temur Sabertooth: draw entire library (${gCreatures} cards per ETB)`,
        detail: `With infinite mana: cast Regal Force, draw ${gCreatures} cards, bounce with Sabertooth, repeat until library empty.`,
        steps: [
          ...(inHand.has("Regal Force") && !board.has("Regal Force") ? ["Cast Regal Force ({5}{G}{G})."] : []),
          `Regal Force ETB: draw ${gCreatures} cards (one per green creature you control).`,
          "Pay {1}{G}: Temur Sabertooth bounces Regal Force to hand.",
          "Recast Regal Force. ETB draws again. Repeat until library is empty.",
          "Win via Duskwatch Recruiter, Sanitarium mill, or Infectious Bite from hand.",
        ],
        color: "#5dade2",
      });
    }
  }


  // ---- DISCIPLE OF FREYALISE LOOP ----
  if ((board.has("Disciple of Freyalise") || (inHand.has("Disciple of Freyalise") && canCastNow))
      && (board.has("Temur Sabertooth") || board.has("Kogla, the Titan Ape"))
      && infiniteManaActive) {
    const bouncer2 = board.has("Temur Sabertooth") ? "Temur Sabertooth" : "Kogla, the Titan Ape";
    const crCount = battlefield.filter(c => getCard(c)?.type === "creature").length;
    if (!results.some(r => r.combo === "disciple_loop")) {
      results.push({
        priority: 11,
        category: "🔥 WIN NOW -- BOARD WIPE + DRAW",
        headline: "Disciple of Freyalise loop: wipe all opponent creatures, draw entire library",
        detail: `Each Disciple ETB forces each opponent to sacrifice a creature, then you draw ${crCount} cards. Loop with ${bouncer2} to clear boards and draw your library.`,
        steps: [
          ...(inHand.has("Disciple of Freyalise") && !board.has("Disciple of Freyalise") ? ["Cast Disciple of Freyalise ({4}{G})."] : []),
          `Disciple ETB: each opponent sacrifices a creature. You draw ${crCount} cards.`,
          bouncer2 === "Temur Sabertooth"
            ? "Pay {1}{G}: Temur Sabertooth bounces Disciple. Recast. ETB again."
            : "Pay {2}: Kogla returns Disciple (Human) to hand. Recast. ETB again.",
          "Each loop removes one creature from each opponent's board.",
          "After clearing opponents' boards: each loop draws your library.",
          "Win via Duskwatch Recruiter, Sanitarium mill, or Infectious Bite from hand.",
        ],
        color: "#c0392b",
      });
    }
  }

  // ---- BADGERMOLE CUB + ASHAYA WIN CON ----
  // With infinite mana + Ashaya, Badgermole's mana-doubler (tap creature for mana → add {G}) accelerates. No infinite counters from earthbend (one-time ETB only).
  // on your creatures — all of which are Forests (valid land targets).
  // Only fire this if the COMBOS loop hasn't already generated a win-combat card for this.
  const badgermoleAlreadyFired = results.some(r => r.combo === "badgermole_ashaya_counters");
  if (infiniteManaActive && board.has("Badgermole Cub") && hasBouncer && !badgermoleAlreadyFired) {
    results.push({
      priority: 11,
      category: "🔥 WIN NOW — COMBAT",
      headline: `Badgermole Cub + ${board.has("Temur Sabertooth") ? "Temur Sabertooth" : "Kogla"} + ∞ mana: infinite +1/+1 counters on a land-creature`,
      detail: "Badgermole Cub ETB: target a land — it becomes a 0/0 haste creature and gets a +1/+1 counter. KEY: you can retarget an already-animated land; it just resets to 0/0 base but keeps all existing counters and gains one more. Bounce Badgermole with a bouncer each loop, recast for {1}{G}, ETB targets the same land again. After infinite casts with infinite mana, the land is arbitrarily large with haste. Swing for lethal.",
      steps: [
        "Badgermole ETB: target any land you control — it becomes a 0/0 haste creature + gets a +1/+1 counter.",
        `Pay {1}{G}: bounce Badgermole Cub to hand via ${board.has("Temur Sabertooth") ? "Temur Sabertooth" : "Kogla"}.`,
        "Recast Badgermole ({1}{G}). ETB fires — target the SAME already-animated land. It gets another +1/+1 counter (base resets to 0/0 but counters persist).",
        "Repeat infinitely. The land-creature grows to N/N where N = number of casts.",
        "Attack with the arbitrarily large haste land-creature for lethal.",
      ],
      color: "#ff6b35",
      combo: "badgermole_ashaya_counters",
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
    const faunaFindsWitness = faunaCanActivate && !witnessOnBrd && (isMyTurn || yevaAvailable);
    // Fauna Shaman in hand + haste can also find Witness immediately
    const faunaInHandFindsWitness = inHand.has("Fauna Shaman") && !board.has("Fauna Shaman")
      && board.has("Destiny Spinner") && !witnessOnBrd;
    // Formidable Speaker on board + bouncer can find Eternal Witness via repeated ETB
    const speakerFindsWitness = speakerCanActivate && !witnessOnBrd && (isMyTurn || yevaAvailable);
    // Formidable Speaker in hand + haste (Destiny Spinner) + bouncer → find Witness immediately
    const speakerInHandFindsWitness = accessible("Formidable Speaker") && !board.has("Formidable Speaker")
      && board.has("Destiny Spinner") && speakerHasBouncer && !witnessOnBrd
      && hand.filter(c => c !== "Formidable Speaker").length > 0; // needs a card to discard for ETB

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
          "Formidable Speaker ETB: discard any card → search library for Eternal Witness (guaranteed).",
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


  // ---- NATURE'S RHYTHM DRAW ENGINE ----
  if (board.has("Nature's Rhythm") && infiniteManaActive) {
    const reclaimerPresent = board.has("Elvish Reclaimer") || inHand.has("Elvish Reclaimer");
    if (reclaimerPresent) {
      results.push({
        priority: 11,
        category: "📚 DRAW YOUR LIBRARY",
        headline: "Nature's Rhythm + Elvish Reclaimer + inf mana: draw entire library",
        detail: "Nature's Rhythm draws a card whenever you play a land. With infinite mana, activate Elvish Reclaimer repeatedly -- each activation tutors a land to the battlefield, triggering Nature's Rhythm.",
        steps: [
          "Infinite mana active. Nature's Rhythm on battlefield. Elvish Reclaimer available.",
          "Pay {T} + sacrifice a land: Elvish Reclaimer searches for any land and puts it onto the battlefield.",
          "That land entering triggers Nature's Rhythm: draw a card.",
          "Repeat with infinite mana to draw your entire library.",
          "Win via Duskwatch Recruiter, Sanitarium mill, or Infectious Bite from hand.",
        ],
        color: "#5dade2",
      });
    }
  }

  // ---- INFINITE MANA — NO WIN CONDITION REACHABLE ----
  // If infinite mana is active but no win-con advice has fired at high priority,
  // guide the player on what to tutor for to close out.
  if (infiniteManaActive && results.filter(r => r.priority >= 11).length === 0) {
    const winConOptions = [
      {
        name: "Duskwatch Recruiter",
        available: duskwatchCastable,
        why: "activates to pull entire creature library → assemble win pile → Sanitarium mill",
      },
      {
        name: "Badgermole Cub",
        available: board.has("Badgermole Cub") && board.has("Ashaya, Soul of the Wild"),
        why: "with Ashaya, pay {1}{G} repeatedly to put infinite +1/+1 counters on your creatures → swing for lethal",
      },
      {
        name: "Infectious Bite",
        available: inHand.has("Infectious Bite") || inGrave.has("Infectious Bite"),
        why: "with Eternal Witness + bouncer → 10 poison counters on all opponents",
      },
      {
        name: "Geier Reach Sanitarium",
        available: board.has("Geier Reach Sanitarium"),
        why: "mill win with Endurance — opponents draw from empty library",
      },
      {
        name: "Glademuse",
        available: inHand.has("Glademuse") || board.has("Glademuse"),
        why: "draw entire library with Ashaya + Quirion Ranger loop, then win from hand",
      },
    ];

    const available = winConOptions.filter(w => w.available);
    const missing   = winConOptions.filter(w => !w.available);

    // Build tutor chain — what can we fetch with infinite mana?
    const tutorChain = [];
    if (!board.has("Duskwatch Recruiter") && !accessible("Duskwatch Recruiter")) {
      const tutors = ["Worldly Tutor","Chord of Calling","Summoner's Pact","Fauna Shaman",
        "Survival of the Fittest","Green Sun's Zenith","Elvish Harbinger","Formidable Speaker"]
        .filter(t => board.has(t) || inHand.has(t));
      if (tutors.length > 0) tutorChain.push(`${tutors[0]} → Duskwatch Recruiter`);
    }

    results.push({
      priority: 12,
      category: "⚡ INFINITE MANA — FIND WIN CON",
      headline: available.length > 0
        ? `Infinite mana active — use ${available[0].name} to win`
        : "Infinite mana active — tutor for a win condition",
      detail: available.length > 0
        ? `You have infinite mana. ${available[0].name} ${available[0].why}.`
        : `You have infinite mana but no win condition is currently reachable. Use your tutor chain to find one.`,
      steps: [
        ...(castYevaFirst ? [
          `FIRST: Cast Yeva, Nature's Herald from command zone ({2}{G}{G}) — gives all green creatures flash for this turn.`,
        ] : []),
        ...(available.length > 0 ? available.map(w => `✅ ${w.name}: ${w.why}.`) : []),
        ...(missing.length > 0 && available.length === 0 ? [
          `Missing win conditions: ${missing.map(w => w.name).join(", ")}.`,
          ...tutorChain.map(t => `With infinite mana: ${t} → onto battlefield.`),
          tutorChain.length === 0
            ? "No tutors available — check graveyard for Eternal Witness to retrieve a win piece."
            : "Activate Duskwatch Recruiter repeatedly (infinite mana) to pull all creatures from library.",
        ] : []),
        ...(missing.length > 0 && available.length > 0 ? [`Also available: ${available.slice(1).map(w=>w.name).join(", ")}.`] : []),
      ].filter(Boolean),
      color: "#ff6b35",
    });
  }

  // ---- GENERIC HIGH PRIORITY TUTOR WHEN NOTHING ELSE ----
  if (results.filter(r => r.priority >= 7).length === 0) {
    const tutors = hand.filter(c => getCard(c)?.tags?.includes("tutor") && (getCard(c)?.cmc <= mana || infiniteManaActive));
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

  // ── Deduplicate results ──────────────────────────────────────────────────
  // a) Among infinite-mana LOOP READY / CAST TO ENABLE results keep only the best.
  {
    const infiniteCategories = new Set(["⚙️ INFINITE MANA ONLINE", "⚡ CAST TO ENABLE MANA LOOP"]);
    let bestInfinite = null;
    const deduped = [];
    for (const r of results) {
      if (infiniteCategories.has(r.category)) {
        if (!bestInfinite || r.priority > bestInfinite.priority) bestInfinite = r;
      } else {
        deduped.push(r);
      }
    }
    if (bestInfinite) deduped.push(bestInfinite);
    results.length = 0;
    results.push(...deduped);
  }
  // b) Per combo.id: keep only the highest-priority result — avoids the same combo
  //    appearing as both ONE PIECE AWAY and BUILDING TOWARDS simultaneously.
  {
    const seenCombo = new Map();
    const deduped = [];
    for (const r of results) {
      if (!r.combo) { deduped.push(r); continue; }
      const existing = seenCombo.get(r.combo);
      if (!existing || r.priority > existing.priority) {
        if (existing) {
          const idx = deduped.indexOf(existing);
          if (idx !== -1) deduped[idx] = r;
        } else {
          deduped.push(r);
        }
        seenCombo.set(r.combo, r);
      }
    }
    results.length = 0;
    results.push(...deduped);
  }

  // ---- SUPPRESSED WIN CONDITIONS ----
  // Check major win lines that didn't fire and explain why.
  // Only emit if the corresponding win combo isn't already in results.
  const winFired = (combo) => results.some(r => r.combo === combo);

  // Natural Order win
  if (!winFired("natural_order_ashaya_win")) {
    const noInHand = inHand.has("Natural Order");
    const noInGrave = inGrave.has("Natural Order");
    const hasRangerNO = board.has("Quirion Ranger") || board.has("Scryb Ranger");
    const hasSacNO = battlefield.some(c => getCard(c)?.type === "creature");
    const hasAshaya = board.has("Ashaya, Soul of the Wild");

    if (noInHand && hasSacNO && !hasAshaya) {
      const needs = [];
      if (!hasRangerNO) needs.push("Quirion/Scryb Ranger on board");
      if (mana < 4) needs.push(`${4 - mana} more mana (need 4)`);
      if (!isMyTurn) needs.push("your turn (sorcery)");
      if (needs.length > 0)
        suppressedWins.push({ label: "Natural Order win suppressed", reason: needs.join(", ") });
    } else if (noInGrave && !noInHand) {
      const witnessPath = witnessAccessibleForNO ?? (inHand.has("Eternal Witness") || faunaCanFetchWitness());
      if (witnessPath && mana < (faunaCanFetchWitness() && !inHand.has("Eternal Witness") ? 13 : 12)) {
        const baseNeed = faunaCanFetchWitness() && !inHand.has("Eternal Witness") ? 13 : 12;
        suppressedWins.push({ label: "Natural Order win suppressed (via Eternal Witness)", reason: `only ${mana} mana (need ${baseNeed} without dork tap, or less if a big dork is on board)` });
      } else if (!witnessPath && (noInGrave)) {
        suppressedWins.push({ label: "Natural Order in graveyard", reason: "no way to retrieve it (need Eternal Witness in hand or Fauna Shaman on board)" });
      }
    }
  }

  // Formidable Speaker win
  if (!winFired("speaker_hand_cast_to_win") && !winFired("speaker_inf_duskwatch_direct") && !winFired("full_hand_inf_speaker_win")) {
    const spkrAvail = accessible("Formidable Speaker") && !board.has("Formidable Speaker");
    const hasRangerSpkr = board.has("Quirion Ranger") || board.has("Scryb Ranger");
    const hasDiscardSpkr = hand.filter(c => c !== "Formidable Speaker").length > 0 ||
      (battlefield.some(c => c === "Forest") && hasRangerSpkr);
    // Don't suppress if we have Ashaya + Argothian Elder in hand (full-hand win path)
    const hasFullHandPath = accessible("Ashaya, Soul of the Wild") && accessible("Argothian Elder") &&
      (mana >= (isMyTurn ? 8 : yevaFlash ? 8 : 12));
    if (spkrAvail && !infiniteManaActive && !hasFullHandPath) {
      const needs = [];
      if (!hasRangerSpkr) needs.push("Quirion/Scryb Ranger on board (for loop)");
      if (!hasDiscardSpkr) needs.push("another card in hand to discard for Speaker ETB");
      if (mana < 3) needs.push(`${3 - mana} more mana (need 3)`);
      if (needs.length > 0)
        suppressedWins.push({ label: "Formidable Speaker win suppressed", reason: needs.join(", ") });
    }
  }

  // Woodland Bellower win
  if (!winFired("bellower_duskwatch_win") && accessible("Woodland Bellower")) {
    const bellowOk = isMyTurn || yevaAvailable;
    if (!bellowOk) suppressedWins.push({ label: "Woodland Bellower win suppressed", reason: "opponent's turn and Yeva not available for flash" });
    else if (mana < 6) suppressedWins.push({ label: "Woodland Bellower win suppressed", reason: `only ${mana} mana (need 6)` });
  }

  // Infinite mana combos that are close
  if (!infiniteManaActive) {
    for (const combo of COMBOS.filter(c => c.type === "infinite-mana")) {
      const missing = combo.requires.filter(r => !board.has(r) && !accessible(r));
      const onBoard = combo.requires.filter(r => board.has(r));
      if (missing.length === 1 && onBoard.length >= 1) {
        // Already covered by ONE PIECE AWAY — skip
        continue;
      }
      if (missing.length === 0) {
        const extras = comboExtrasSatisfied(combo, infiniteManaActive);
        if (!extras.ok && extras.missing) {
          suppressedWins.push({ label: `Infinite mana suppressed (${combo.name})`, reason: `missing ${extras.missing}` });
        }
      }
    }
  }

  // Emit suppressed wins as low-priority collapsed entries
  for (const s of suppressedWins) {
    if (results.some(r => r.suppressedLabel === s.label)) continue; // no dups
    results.push({
      priority: -1,
      category: "🔕 SUPPRESSED",
      headline: `${s.label}: ${s.reason}`,
      suppressedLabel: s.label,
      combo: null,
      detail: `This win line was evaluated but did not fire. ${s.reason}.`,
      steps: [],
      color: "#555555",
      isSuppressed: true,
    });
  }

  // Derive confidence tier for each result based on category
  results.forEach(r => {
    if (r.confidence) return; // already set explicitly at emit site
    const cat = r.category || "";
    if (cat.includes("WIN NOW") || cat.includes("WIN PILE"))              r.confidence = "certain";
    else if (cat.includes("WIN NEXT") || cat.includes("WIN TURN"))        r.confidence = "certain";
    else if (cat.includes("INFINITE MANA") || cat.includes("LOOP READY") || cat.includes("MANA ONLINE")) r.confidence = "certain";
    else if (cat.includes("DRAW YOUR LIBRARY") || cat.includes("DRAW ENGINE")) r.confidence = "certain";
    else if (cat.includes("ENGINE READY") || cat.includes("ENGINE ACTIVE") || cat.includes("ACTIVATE")) r.confidence = "high";
    else if (cat.includes("CAST TO ENABLE") || cat.includes("ASSEMBLE"))  r.confidence = "high";
    else if (cat.includes("INSTANT SPEED WIN") || cat.includes("ONE PIECE AWAY")) r.confidence = "high";
    else if (cat.includes("TUTOR") || cat.includes("YISAN") || cat.includes("ZENITH")) r.confidence = "high";
    else if (cat.includes("NEARLY THERE") || cat.includes("RAMP"))        r.confidence = "good";
    else if (cat.includes("BUILDING TOWARDS") || cat.includes("CARD ADVANTAGE")) r.confidence = "good";
    else if (cat.includes("STAX") || cat.includes("OUPHE") || cat.includes("LAND")) r.confidence = "good";
    else if (cat.includes("DRAW-GO") || cat.includes("PASS"))             r.confidence = "info";
    else r.confidence = "speculative";
  });

  // Sort by priority descending; tie-break on category string (alphabetical) then insertion
  // order (index) for fully deterministic output across renders.
  results.forEach((r, i) => { r._idx = i; });
  results.sort((a, b) =>
    b.priority - a.priority ||
    (a.category ?? "").localeCompare(b.category ?? "") ||
    a._idx - b._idx
  );
  const normal = results.filter(r => !r.isSuppressed).slice(0, 7);
  const suppressed = results.filter(r => r.isSuppressed);
  return { results: [...normal, ...suppressed], infiniteManaActive, activeComboName };
}

// ── buildMillSequence ─────────────────────────────────────────────────────────
// Given the post-Duskwatch board state, returns precise ordered steps for the
// Sanitarium mill kill. Picks the best available untap variant and generates
// concrete tap/activate instructions using actual card names on the board.
//
// Parameters:
//   board      — Set<string>  cards on the battlefield
//   hand       — Set<string> | string[]  cards in hand (normalised to Set internally)
//   pileNeeded — string[]  cards still to fetch from library
// Returns: { variant: string, steps: string[] }
function buildMillSequence(board, hand, pileNeeded = []) {
  // Normalise: callers may pass an array or a Set
  if (!hand || typeof hand[Symbol.iterator] !== "function") hand = new Set();
  const handSet = hand instanceof Set ? hand : new Set(hand);
  const has = (c) => board.has(c);
  const hasHand = (c) => handSet.has(c);
  const hasAshaya  = has("Ashaya, Soul of the Wild");
  const hasTemur   = has("Temur Sabertooth");
  const hasKogla   = has("Kogla, the Titan Ape");
  const hasBouncer = hasTemur || hasKogla;
  const bouncerName = hasTemur ? "Temur Sabertooth" : "Kogla, the Titan Ape";
  const hasEndurance = has("Endurance");
  const hasSanitarium = has("Geier Reach Sanitarium");
  const hasDestiny = has("Destiny Spinner");
  const hasMagus = has("Magus of the Candelabra");
  const hasWoodcaller = has("Woodcaller Automaton");
  const hasHyrax = has("Hyrax Tower Scout");
  const hasQuirion = has("Quirion Ranger") || has("Scryb Ranger");
  const rangerName = has("Quirion Ranger") ? "Quirion Ranger" : "Scryb Ranger";
  const hasElder = has("Argothian Elder");
  const hasWirewood = has("Wirewood Symbiote");
  const hasWitwoodLodge = has("Wirewood Lodge");
  const hasElvishReclaimer = has("Elvish Reclaimer");
  const hasLQR = has("Legolas's Quick Reflexes") || hasHand("Legolas's Quick Reflexes");
  const hasBeastWithin = hasHand("Beast Within");
  const hasWitness = has("Eternal Witness");

  // Pile assembly prefix — list pieces still needed
  const pileSteps = pileNeeded.length > 0
    ? [
        "═══ DUSKWATCH ASSEMBLY ═══",
        `Still need from library (activate Duskwatch {2}{G} repeatedly):`,
        ...pileNeeded.map(c => {
          if (c === "Destiny Spinner")     return `  • Destiny Spinner — gives all creatures haste + makes green spells uncounterable`;
          if (c === "Elvish Reclaimer")    return `  • Elvish Reclaimer — with haste from Destiny Spinner, tap to tutor Geier Reach Sanitarium`;
          if (c === "Ashaya, Soul of the Wild") return `  • Ashaya, Soul of the Wild — turns all creatures into Forests for untap loops`;
          if (c === "Temur Sabertooth")    return `  • Temur Sabertooth — bounce engine ({1}{G}: return any creature to hand)`;
          if (c === "Endurance")           return `  • Endurance — REQUIRED first: prevents self-mill; ETB shuffles your graveyard back in`;
          if (c === "Geier Reach Sanitarium") return `  • Geier Reach Sanitarium — win-con land ({2},{T}: each player draws then discards)`;
          return `  • ${c}`;
        }),
        `IMPORTANT: Find and cast Endurance BEFORE activating Geier Reach Sanitarium.`,
      ]
    : ["═══ ALL PILE PIECES ON BATTLEFIELD ═══"];

  // Sanitarium fetch step (if not yet on board)
  const sanitariumFetch = hasSanitarium ? [] : hasElvishReclaimer && hasDestiny
    ? [`Elvish Reclaimer has haste (Destiny Spinner). Tap Elvish Reclaimer ({T}): sacrifice a land → tutor Geier Reach Sanitarium from library, put it on battlefield tapped.`]
    : [`Activate Duskwatch to find Elvish Reclaimer. Cast it — Destiny Spinner gives haste. Tap Reclaimer: sacrifice a land → tutor Geier Reach Sanitarium.`];

  // Endurance safety check
  const enduranceCheck = hasEndurance ? [] : [
    "⚠️ FIND ENDURANCE FIRST: Activate Duskwatch until you find Endurance. Cast it immediately. Let its ETB resolve — your graveyard shuffles back into library. Only then proceed to Sanitarium.",
  ];

  // ── PICK THE BEST UNTAP VARIANT ──────────────────────────────────────────

  // VARIANT A: Temur Sabertooth + Woodcaller Automaton
  if (hasSanitarium && hasWoodcaller && hasTemur && hasEndurance) {
    const loop = [
      "═══ EXECUTE MILL — WOODCALLER + TEMUR VARIANT ═══",
      "This loop runs entirely at instant speed with infinite mana:",
      "LOOP ITERATION (repeat until all opponents' libraries are empty):",
      `  1. Pay {2},{T} — activate Geier Reach Sanitarium: each player draws a card, then discards a card. Hold priority (do NOT pass until step 4 completes).`,
      `  2. Pay {1}{G} — activate Temur Sabertooth: return Woodcaller Automaton to hand. Pass priority.`,
      `  3. Recast Woodcaller Automaton ({5}). ETB: untap target land — target Geier Reach Sanitarium. Sanitarium is now untapped.`,
      `  4. Repeat from step 1.`,
      "LIBRARY PROTECTION:",
      `  • When YOUR library runs low (e.g. < 5 cards): let the Endurance ETB resolve (target yourself) — graveyard shuffles back into library.`,
      `  • Then recast Endurance. Hold its new ETB on the stack and continue looping.`,
      "FINISH: Opponents draw from empty library on their next draw step — state-based loss.",
    ];
    return { variant: "Woodcaller Automaton + Temur Sabertooth", steps: [...pileSteps, ...enduranceCheck, ...sanitariumFetch, ...loop] };
  }

  // VARIANT B: Hyrax Tower Scout + Destiny Spinner (haste)
  if (hasSanitarium && hasHyrax && hasDestiny && hasBouncer && hasEndurance) {
    const loop = [
      "═══ EXECUTE MILL — HYRAX TOWER SCOUT + BOUNCER VARIANT ═══",
      `Hyrax Tower Scout has haste via Destiny Spinner. ${bouncerName} bounces it each loop.`,
      "LOOP ITERATION:",
      `  1. Pay {2},{T} — activate Geier Reach Sanitarium: each player draws then discards. Hold priority.`,
      `  2. Pay ${hasTemur ? "{1}{G}" : "{2}"} — activate ${bouncerName}: return Hyrax Tower Scout to hand.`,
      `  3. Recast Hyrax Tower Scout ({2}{G}). ETB: untap target permanent — target Geier Reach Sanitarium. Destiny Spinner gives it haste immediately.`,
      `  4. Repeat from step 1.`,
      "LIBRARY PROTECTION: When your library runs low, let Endurance ETB resolve → graveyard back in → recast Endurance, hold new ETB on stack.",
    ];
    return { variant: "Hyrax Tower Scout + Destiny Spinner", steps: [...pileSteps, ...enduranceCheck, ...sanitariumFetch, ...loop] };
  }

  // VARIANT C: Ashaya + Magus of the Candelabra
  if (hasSanitarium && hasAshaya && hasMagus && hasEndurance) {
    const loop = [
      "═══ EXECUTE MILL — ASHAYA + MAGUS OF THE CANDELABRA VARIANT ═══",
      "With Ashaya, Geier Reach Sanitarium is a Forest. Magus untaps it.",
      "LOOP ITERATION:",
      `  1. Pay {2},{T} — activate Geier Reach Sanitarium: each player draws then discards. Hold priority.`,
      `  2. Pay {X} — activate Magus of the Candelabra (tap, pay X): untap X lands. Set X=1, target Geier Reach Sanitarium (a Forest via Ashaya). Sanitarium untapped.`,
      `  3. Repeat from step 1.`,
      "NET COST PER LOOP: {2} (Sanitarium activation) + {1} (Magus activation) = 3 mana, which infinite mana covers trivially.",
      "LIBRARY PROTECTION: Let Endurance ETB resolve when library is low → graveyard shuffles back in → recast Endurance, hold new ETB.",
    ];
    return { variant: "Ashaya + Magus of the Candelabra", steps: [...pileSteps, ...enduranceCheck, ...sanitariumFetch, ...loop] };
  }

  // VARIANT D: Ashaya + Quirion/Scryb Ranger + Destiny Spinner
  // HOW IT WORKS: Destiny Spinner animates Geier Reach Sanitarium into a creature.
  // Ashaya makes all nontoken creatures Forests. Wirewood Symbiote / Ranger untap CREATURES.
  // Quirion Ranger's ability: return a Forest you control to hand → untap a creature.
  // So: return Ranger ITSELF (it's a Forest via Ashaya) to hand → untap Sanitarium (a creature via Destiny Spinner).
  // Recast Ranger for {G} (it has haste from Destiny Spinner). Net: Sanitarium taps and untaps each loop.
  if (hasSanitarium && hasAshaya && hasQuirion && hasDestiny && hasEndurance) {
    const rangerCost = rangerName === "Scryb Ranger" ? "{1}{G}" : "{G}";
    const loop = [
      `═══ EXECUTE MILL — ASHAYA + ${rangerName.toUpperCase()} + DESTINY SPINNER VARIANT ═══`,
      `Destiny Spinner animates Geier Reach Sanitarium into a creature. Ashaya makes ${rangerName} a Forest. Destiny Spinner gives all creatures haste.`,
      "HOW THE UNTAP WORKS:",
      `  ${rangerName}'s ability: return a Forest you control to hand → untap target creature.`,
      `  Return ${rangerName} ITSELF to hand (it is a Forest via Ashaya) → untap Geier Reach Sanitarium (now a creature via Destiny Spinner).`,
      `  Recast ${rangerName} (${rangerCost}) — Destiny Spinner gives it haste immediately.`,
      "LOOP ITERATION:",
      `  1. Ensure Destiny Spinner's animation is on Geier Reach Sanitarium (it has haste as a creature-land).`,
      `  2. Pay {2},{T} — activate Geier Reach Sanitarium: each player draws then discards. Hold priority.`,
      `  3. Activate ${rangerName}: return ${rangerName} itself to hand (it's a Forest via Ashaya) → untap Geier Reach Sanitarium (creature via Destiny Spinner).`,
      `  4. Recast ${rangerName} (${rangerCost}). Destiny Spinner gives it haste immediately.`,
      `  5. Repeat from step 2.`,
      "LIBRARY PROTECTION: When library is low, resolve Endurance ETB → graveyard shuffles back in → recast Endurance, hold new ETB, continue.",
    ];
    return { variant: `Ashaya + ${rangerName} + Destiny Spinner`, steps: [...pileSteps, ...enduranceCheck, ...sanitariumFetch, ...loop] };
  }

  // VARIANT E: Ashaya + Argothian Elder
  if (hasSanitarium && hasAshaya && hasElder && hasEndurance) {
    const loop = [
      "═══ EXECUTE MILL — ASHAYA + ARGOTHIAN ELDER VARIANT ═══",
      "Argothian Elder can tap to untap two lands. With Ashaya, all creatures are Forests.",
      "LOOP ITERATION:",
      `  1. Pay {2},{T} — activate Geier Reach Sanitarium: each player draws then discards. Hold priority.`,
      `  2. Tap Argothian Elder ({T}): untap two target lands. Target Geier Reach Sanitarium + your biggest mana land. Both untap.`,
      `  3. Repeat from step 1.`,
      "NET COST: {2} per loop, covered by infinite mana. Elder taps for free (its cost is just tapping).",
      "LIBRARY PROTECTION: When library is low, resolve Endurance ETB → graveyard back in → recast Endurance.",
    ];
    return { variant: "Ashaya + Argothian Elder", steps: [...pileSteps, ...enduranceCheck, ...sanitariumFetch, ...loop] };
  }

  // VARIANT F: Ashaya + Wirewood Symbiote + Destiny Spinner
  if (hasSanitarium && hasAshaya && hasWirewood && hasDestiny && hasEndurance) {
    const loop = [
      "═══ EXECUTE MILL — ASHAYA + WIREWOOD SYMBIOTE + DESTINY SPINNER VARIANT ═══",
      "Wirewood Symbiote can return an elf to untap a creature. With Ashaya, Sanitarium is a creature-Forest.",
      "LOOP ITERATION:",
      `  1. Pay {2},{T} — activate Geier Reach Sanitarium: each player draws then discards. Hold priority.`,
      `  2. Activate Wirewood Symbiote ({T}): return an elf creature to hand, untap target creature — target Geier Reach Sanitarium (a creature via Ashaya + Destiny Spinner). Sanitarium untaps.`,
      `  3. Recast the returned elf (free with infinite mana). Destiny Spinner gives it haste.`,
      `  4. Repeat from step 1.`,
      "LIBRARY PROTECTION: When library runs low, let Endurance ETB resolve → recast Endurance.",
    ];
    return { variant: "Ashaya + Wirewood Symbiote + Destiny Spinner", steps: [...pileSteps, ...enduranceCheck, ...sanitariumFetch, ...loop] };
  }

  // VARIANT G: LQR kill with Endurance + Temur (more complex — hold ETB on stack)
  if (hasSanitarium && hasBouncer && hasEndurance && (hasLQR || hasBeastWithin)) {
    const killMethod = hasLQR ? "Legolas's Quick Reflexes" : "Beast Within";
    const loop = [
      `═══ EXECUTE MILL — ENDURANCE ETB SHIELD + ${killMethod.toUpperCase()} VARIANT ═══`,
      "This variant keeps Endurance's ETB perpetually on the stack as a 'library shield':",
      "INITIAL SETUP:",
      `  1. Cast Endurance. Pass priority.`,
      `  2. Endurance resolves and enters. Its ETB trigger goes on the stack. HOLD PRIORITY — do not let it resolve.`,
      hasLQR
        ? `  3. ${has("Legolas's Quick Reflexes") ? "LQR is already cast." : "Cast Legolas's Quick Reflexes targeting your infinite tap/untap creature."} Its tap triggers deal lethal to Endurance. Endurance dies. ETB stays on stack.`
        : `  3. Cast Beast Within targeting Endurance. Endurance is destroyed — opponent gets a 3/3 Beast token. ETB stays on stack.`,
      ...(hasWitness ? [
        `  4. Cast Eternal Witness (already on board — ${hasTemur ? "Sabertooth" : "Kogla"} bounces it first): ETB retrieves ${hasBeastWithin ? "Beast Within" : "Endurance"} from graveyard.`,
      ] : []),
      "MILL LOOP:",
      `  A. Pay {2},{T} — activate Geier Reach Sanitarium: each player draws then discards. Hold priority.`,
      `  B. Untap Sanitarium using your available method.`,
      `  C. Repeat A–B until all opponents have empty libraries.`,
      "LIBRARY PROTECTION:",
      `  • The Endurance ETB sitting on the stack shuffles YOUR graveyard back in whenever you let it resolve.`,
      `  • Let it resolve when your library is low → graveyard back in → recast Endurance, hold new ETB, continue.`,
    ];
    return { variant: `Endurance shield + ${killMethod}`, steps: [...pileSteps, ...enduranceCheck, ...sanitariumFetch, ...loop] };
  }

  // FALLBACK: generic guide
  const untapGuide = [
    "═══ EXECUTE MILL — SANITARIUM LOOP ═══",
    "⚠️ No specific untap method detected on board. Verify you have one of:",
    "  • Woodcaller Automaton + Temur Sabertooth",
    "  • Hyrax Tower Scout + Destiny Spinner + bouncer",
    "  • Ashaya + Magus of the Candelabra",
    `  • Ashaya + ${rangerName || "Quirion/Scryb Ranger"} + Destiny Spinner`,
    "  • Ashaya + Argothian Elder",
    "  • Ashaya + Wirewood Symbiote + Destiny Spinner",
    "GENERIC LOOP:",
    "  1. Pay {2},{T} — activate Geier Reach Sanitarium: each player draws then discards.",
    "  2. Untap Sanitarium using your method.",
    "  3. Repeat ~99× until opponents' libraries empty.",
    "  4. Protect yourself with Endurance ETB when your library runs low.",
  ];
  return { variant: "generic", steps: [...pileSteps, ...enduranceCheck, ...sanitariumFetch, ...untapGuide] };
}

function getTutorOptions(target, hand, battlefield, mana, infiniteMana = false, graveyard = []) {
  const options = [];
  const board = new Set(battlefield);
  const inHand = new Set(hand);
  const inGrave = new Set(graveyard);

  // No tutor needed if the card is already accessible
  if (inHand.has(target) || board.has(target)) return options;
  const witnessRetrievableLocal = (c) => inGrave.has(c) && inHand.has("Eternal Witness") && !board.has("Eternal Witness");
  // Fauna Shaman on board + Eternal Witness in graveyard → discard a creature → fetch Witness → Witness retrieves target
  const faunaFetchesWitnessLocal = board.has("Fauna Shaman")
    && inGrave.has("Eternal Witness")
    && hand.some(c => getCard(c)?.type === "creature")
    && (mana >= 1 || infiniteMana);
  const accessible = (c) => inHand.has(c) || witnessRetrievableLocal(c)
    // Fauna chain: Witness can retrieve c from graveyard if Fauna can first fetch Witness
    || (faunaFetchesWitnessLocal && inGrave.has(c) && c !== "Eternal Witness");

  if (getCard(target)?.type === "creature" || getCard(target)?.type === "land") {
    // Formidable Speaker in hand: ETB — "you MAY discard a card. If you do, search library for any creature."
    // Requires at least one OTHER card in hand to discard, otherwise ETB fizzles with no tutor.
    const speakerDiscardAvail = hand.filter(c => c !== "Formidable Speaker").length > 0;
    if (accessible("Formidable Speaker") && !board.has("Formidable Speaker")
        && getCard(target)?.type === "creature"
        && speakerDiscardAvail
        && (mana >= 3 || infiniteMana)) options.push("Formidable Speaker (cast → ETB finds any creature)");
    // Elvish Harbinger: ETB puts any elf on top of library. Cost {2}{G}, elf itself.
    if ((inHand.has("Elvish Harbinger") || board.has("Elvish Harbinger"))
        && getCard(target)?.tags?.includes("elf")
        && (mana >= 3 || infiniteMana)) options.push("Elvish Harbinger (ETB → top of library next draw)");
    if (accessible("Worldly Tutor") && (mana >= 1 + (inGrave.has("Worldly Tutor") ? 3 : 0) || infiniteMana) && getCard(target)?.type === "creature") options.push("Worldly Tutor");
    if (accessible("Summoner's Pact") && getCard(target)?.type === "creature") options.push("Summoner's Pact");
    if (inHand.has("Archdruid's Charm") && getCard(target)?.type === "creature" && (mana >= 3 || infiniteMana)) options.push("Archdruid's Charm (mode 2: find creature)");
    if (inHand.has("Chord of Calling")) {
      const targetCmc = getCard(target)?.cmc ?? 2;
      const chordCost = Math.max(0, targetCmc + 3 - (battlefield?.length ?? 0));
      if (mana >= chordCost || infiniteMana) options.push(`Chord of Calling (convoke — tap ${Math.min(targetCmc + 3, battlefield?.length ?? 0)} creatures)`);
    }
    if (accessible("Green Sun's Zenith") && !inGrave.has("Green Sun's Zenith")) {
      const targetCmc = getCard(target)?.cmc ?? getCard(target)?.cmc ?? 0;
      const gszCost = targetCmc + 1; // X=CMC plus {G}
      if (mana >= gszCost || infiniteMana) options.push("Green Sun's Zenith");
    }
    if (accessible("Green Sun's Zenith") && inGrave.has("Green Sun's Zenith")) {
      // Needs Eternal Witness to retrieve first — don't suggest as immediate tutor
    }
    if (board.has("Survival of the Fittest") && (mana >= 1 || infiniteMana) && hand.some(c => getCard(c)?.type === "creature")) options.push("Survival of the Fittest");
    if (inHand.has("Crop Rotation") && getCard(target)?.type === "land" && (mana >= 1 || infiniteMana)) options.push("Crop Rotation");
    if ((board.has("Elvish Reclaimer") || inHand.has("Elvish Reclaimer")) && getCard(target)?.type === "land") options.push("Elvish Reclaimer");
    if (inHand.has("Sylvan Scrying") && getCard(target)?.type === "land" && (mana >= 2 || infiniteMana)) options.push("Sylvan Scrying");
    if (inHand.has("Archdruid's Charm") && getCard(target)?.type === "land" && (mana >= 3 || infiniteMana)) options.push("Archdruid's Charm");
    if (accessible("Natural Order") && (mana >= 4 + (inGrave.has("Natural Order") ? 3 : 0) || infiniteMana)) options.push("Natural Order");
    // Finale of Devastation: finds any creature from library or graveyard (X ≥ CMC). At X≥10 gives +X/+X and haste.
    if (accessible("Finale of Devastation") && getCard(target)?.type === "creature") {
      const targetCmc = getCard(target)?.cmc ?? 0;
      const finaleCost = targetCmc + 2; // X=CMC plus {X}{G}{G}
      if (mana >= finaleCost || infiniteMana) options.push(`Finale of Devastation (X=${targetCmc} — finds ${target} from library or graveyard)`);
    }
    // Invasion of Ikoria: finds any non-Human creature from library (CMC ≤ X). Defends = flip.
    if (accessible("Invasion of Ikoria") && getCard(target)?.type === "creature"
        && !getCard(target)?.tags?.includes("human")) {
      const targetCmc = getCard(target)?.cmc ?? 0;
      const ikoriaCost = targetCmc + 4; // {X}{G}{G}{G}{G}, X ≥ CMC
      if (mana >= ikoriaCost || infiniteMana) options.push(`Invasion of Ikoria (X=${targetCmc})`);
    }
    // Skyshroud Poacher: {3}{G} activated ability, search library for an elf, put into play tapped.
    if ((board.has("Skyshroud Poacher") || inHand.has("Skyshroud Poacher"))
        && getCard(target)?.tags?.includes("elf")
        && (mana >= 4 || infiniteMana)) options.push("Skyshroud Poacher (activated ability → elf directly to battlefield)");
    // Treefolk Harbinger: on cast, search top of library for a treefolk or Forest card.
    // Fetches: Heartwood Storyteller, Lignify, Great Oak Guardian, Treefolk Harbinger itself.
    if (accessible("Treefolk Harbinger")
        && (getCard(target)?.tags?.includes("treefolk") || target === "Heartwood Storyteller" || target === "Great Oak Guardian" || target === "Lignify")
        && (mana >= 1 || infiniteMana)) options.push("Treefolk Harbinger (cast → top of library next draw)");
    // Woodland Bellower: ETB puts any non-legendary green creature with CMC ≤ 3 directly onto the battlefield.
    // It is itself CMC 6 — Bellower in hand is castable when we have 6+ mana or infinite mana.
    if ((inHand.has("Woodland Bellower") || board.has("Woodland Bellower"))
        && getCard(target)?.type === "creature"
        && !["Ashaya, Soul of the Wild","Yeva, Nature's Herald","Kogla, the Titan Ape",
             "Temur Sabertooth","Woodland Bellower","Elvish Archdruid","Yisan, the Wanderer Bard",
             "Eladamri, Korvecdal","Seedborn Muse","Marwyn, the Nurturer","Selvala, Heart of the Wilds",
             "Saryth, the Viper's Fang","Skyshroud Poacher","Surrak and Goreclaw","Nylea, Keen-Eyed",
             "Nissa, Resurgent Animist","King of the Coldblood Curse"].includes(target) // legendary exclusion list
        && (getCard(target)?.cmc ?? 99) <= 3
        && (mana >= 6 || infiniteMana || board.has("Woodland Bellower"))) {
      options.push("Woodland Bellower (ETB → directly onto battlefield)");
    }
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
// ============================================================
// TOUR / ONBOARDING
// ============================================================

const TOUR_STEPS = [
  {
    target: "tour-header",
    title: "Welcome to Yeva Advisor",
    body: "This tool analyses your current Magic game state and tells you exactly what to do — combo lines, win paths, tutors, and engines. Let's walk through how to use it.",
    placement: "bottom",
    icon: "🌿",
  },
  {
    target: "tour-turn",
    title: "Set Whose Turn It Is",
    body: "Toggle between My Turn and Opponent's Turn. This matters — some advice (flash-in plays via Yeva, instant-speed combos) only fires on your opponent's turn, while sorcery-speed plays like Green Sun's Zenith only show on yours.",
    placement: "right",
    icon: "⏱",
  },
  {
    target: "tour-mana",
    title: "Available Mana",
    body: "Enter how much mana you currently have available. The advisor auto-estimates this from your battlefield, but you can override it. Mana thresholds determine whether combo lines are executable this turn.",
    placement: "right",
    icon: "💎",
  },
  {
    target: "tour-hand",
    title: "Add Cards in Your Hand",
    body: "Type any card name — autocomplete shows matches instantly. Cards in your hand unlock new combo paths and tutors. The advisor knows which cards are flash-castable and accounts for Yeva's ability.",
    placement: "right",
    icon: "🃏",
  },
  {
    target: "tour-battlefield",
    title: "Add Your Battlefield",
    body: "Everything you control goes here — creatures, lands, enchantments. The advisor counts elves, devotion, and creatures to calculate mana dork output, checks for infinite mana loops, and identifies which engines are already assembled.",
    placement: "right",
    icon: "⚔️",
  },
  {
    target: "tour-advice",
    title: "Read the Advice",
    body: "Advice cards appear ranked by priority. 🔥 WIN NOW means an immediate win is available. 🎯 ONE PIECE AWAY means one tutor away. Click any card to expand step-by-step instructions. The ◆ pips show how certain the line is.",
    placement: "left",
    icon: "📋",
  },
  {
    target: "tour-deck",
    title: "Optional: Load a Deck",
    body: "Click the 📦 DECKS button to load your decklist. When active, autocomplete only shows cards in your deck, and advice is filtered to cards you actually run. Use the preset 'Competitive' deck to get started immediately.",
    placement: "bottom",
    icon: "📦",
  },
];

function useTour() {
  const [active, setActive] = useState(false);
  const [step, setStep]     = useState(0);

  useEffect(() => {
    try {
      const seen = localStorage.getItem("yeva-tour-seen");
      if (!seen) { setActive(true); setStep(0); }
    } catch {}
  }, []);

  const finish = () => {
    setActive(false);
    try { localStorage.setItem("yeva-tour-seen", "1"); } catch {}
  };

  const next = () => {
    if (step >= TOUR_STEPS.length - 1) { finish(); return; }
    setStep(s => s + 1);
  };

  const prev  = () => setStep(s => Math.max(0, s - 1));
  const start = () => { setStep(0); setActive(true); };
  const skip  = () => finish();

  return { active, step, next, prev, start, skip, total: TOUR_STEPS.length };
}

function TourOverlay({ active, step, next, prev, skip, total }) {
  const [targetRect, setTargetRect] = useState(null);
  const [visible, setVisible] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (!active) { setVisible(false); setTargetRect(null); return; }
    // Small delay so DOM is ready
    const t = setTimeout(() => {
      const el = document.querySelector(`[data-tour="${TOUR_STEPS[step].target}"]`);
      if (el) {
        const rect = el.getBoundingClientRect();
        setTargetRect(rect);
      } else {
        setTargetRect(null);
      }
      setVisible(true);
      setTransitioning(false);
    }, 80);
    return () => clearTimeout(t);
  }, [active, step]);

  const handleNext = () => {
    setTransitioning(true);
    setVisible(false);
    setTimeout(next, 180);
  };
  const handlePrev = () => {
    setTransitioning(true);
    setVisible(false);
    setTimeout(prev, 180);
  };

  if (!active) return null;

  const tourStep = TOUR_STEPS[step];
  const PAD = 8; // spotlight padding

  // Compute spotlight rect
  const spot = targetRect ? {
    x: targetRect.left - PAD,
    y: targetRect.top - PAD,
    w: targetRect.width + PAD * 2,
    h: targetRect.height + PAD * 2,
  } : null;

  // Compute tooltip position
  const tooltipW = 320;
  const tooltipH = 200;
  let tipX = 0, tipY = 0;
  if (spot) {
    const placement = tourStep.placement;
    if (placement === "right") {
      tipX = spot.x + spot.w + 16;
      tipY = spot.y + spot.h / 2 - tooltipH / 2;
    } else if (placement === "left") {
      tipX = spot.x - tooltipW - 16;
      tipY = spot.y + spot.h / 2 - tooltipH / 2;
    } else if (placement === "bottom") {
      tipX = spot.x + spot.w / 2 - tooltipW / 2;
      tipY = spot.y + spot.h + 16;
    } else {
      tipX = spot.x + spot.w / 2 - tooltipW / 2;
      tipY = spot.y - tooltipH - 16;
    }
    // Clamp to viewport
    tipX = Math.max(12, Math.min(window.innerWidth - tooltipW - 12, tipX));
    tipY = Math.max(12, Math.min(window.innerHeight - tooltipH - 12, tipY));
  } else {
    // Fallback: center
    tipX = window.innerWidth / 2 - tooltipW / 2;
    tipY = window.innerHeight / 2 - tooltipH / 2;
  }

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9000, pointerEvents: "all" }}>
      {/* Dimming overlay using SVG clip path for spotlight */}
      <svg
        width={vw} height={vh}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <defs>
          <mask id="tour-mask">
            <rect width={vw} height={vh} fill="white" />
            {spot && (
              <rect
                x={spot.x} y={spot.y} width={spot.w} height={spot.h}
                rx={8} fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          width={vw} height={vh}
          fill="rgba(0,0,0,0.72)"
          mask="url(#tour-mask)"
        />
        {/* Spotlight border glow */}
        {spot && (
          <rect
            x={spot.x} y={spot.y} width={spot.w} height={spot.h}
            rx={8} fill="none"
            stroke="#4a9e4a" strokeWidth={2}
            style={{ opacity: visible ? 1 : 0, transition: "opacity 0.2s" }}
          />
        )}
      </svg>

      {/* Click-through area over spotlight so user can interact if needed */}
      {spot && (
        <div style={{
          position: "absolute",
          left: spot.x, top: spot.y, width: spot.w, height: spot.h,
          borderRadius: 8,
          pointerEvents: "none",
        }} />
      )}

      {/* Backdrop click to advance */}
      <div style={{ position: "absolute", inset: 0 }} onClick={handleNext} />

      {/* Tooltip card */}
      <div style={{
        position: "absolute",
        left: tipX, top: tipY,
        width: tooltipW,
        background: "linear-gradient(135deg, #0f1e0f 0%, #0a160a 100%)",
        border: "1px solid #4a9e4a",
        borderRadius: 12,
        boxShadow: "0 0 0 1px #4a9e4a22, 0 24px 60px rgba(0,0,0,0.9), 0 0 40px #4a9e4a18",
        padding: "20px 22px",
        pointerEvents: "all",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(6px) scale(0.97)",
        transition: "opacity 0.2s ease, transform 0.2s ease",
      }}>
        {/* Step indicator */}
        <div style={{ display: "flex", gap: 4, marginBottom: 14, alignItems: "center" }}>
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} style={{
              height: 3, flex: 1,
              borderRadius: 2,
              background: i <= step ? "#4a9e4a" : "#1e3a1e",
              transition: "background 0.3s",
            }} />
          ))}
        </div>

        {/* Icon + title */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span style={{ fontSize: 22, lineHeight: 1 }}>{tourStep.icon}</span>
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 600,
            color: "#c8e6c8", letterSpacing: "0.5px",
          }}>{tourStep.title}</div>
        </div>

        {/* Body */}
        <p style={{
          fontFamily: "'Crimson Text', serif", fontSize: 14, lineHeight: 1.6,
          color: "#a0cda0", margin: "0 0 18px",
        }}>{tourStep.body}</p>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {step > 0 && (
            <button onClick={e => { e.stopPropagation(); handlePrev(); }} style={{
              background: "none", border: "1px solid #1e3a1e",
              borderRadius: 6, padding: "6px 14px",
              color: "#7aad7a", cursor: "pointer",
              fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "1px",
            }}>← BACK</button>
          )}
          <div style={{ flex: 1 }} />
          <button onClick={e => { e.stopPropagation(); skip(); }} style={{
            background: "none", border: "none",
            color: "#4a6a4a", cursor: "pointer",
            fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "1px",
            padding: "6px 8px",
          }}>SKIP</button>
          <button onClick={e => { e.stopPropagation(); handleNext(); }} style={{
            background: "linear-gradient(135deg, #2d5a2d, #1e3a1e)",
            border: "1px solid #4a9e4a",
            borderRadius: 6, padding: "7px 18px",
            color: "#c8e6c8", cursor: "pointer",
            fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "1px",
            fontWeight: 600,
            boxShadow: "0 0 12px #4a9e4a22",
          }}>
            {step === total - 1 ? "DONE ✓" : "NEXT →"}
          </button>
        </div>
      </div>
    </div>
  );
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

// ── Scryfall image cache (module-level, persists across renders) ──────────────
const scryfallCache = new Map(); // cardName → image URL or "error"

// ── Runtime card data for unknown cards fetched from Scryfall ─────────────────
// Merged into CARDS lookups via getCard(name) helper below.
const EXTRA_CARDS = new Map(); // cardName → {type, cmc, tags, tapsFor, devotion, role, note}

// Cache version — bump this when deriveCardEntry logic changes to auto-evict stale entries
const SCRYFALL_CACHE_VERSION = 3;
const SCRYFALL_DATA_CACHE_KEY = "yeva_scryfall_data_v1";

function loadScryfallDataCache() {
  try {
    if (typeof window === "undefined") return {};
    return JSON.parse(localStorage.getItem(SCRYFALL_DATA_CACHE_KEY) || "{}");
  } catch { return {}; }
}
function saveScryfallDataCache(cache) {
  try {
    if (typeof window === "undefined") return;
    localStorage.setItem(SCRYFALL_DATA_CACHE_KEY, JSON.stringify(cache));
  } catch {}
}

// Seed EXTRA_CARDS from localStorage on module load, evicting stale versions
(function seedExtraCards() {
  const cache = loadScryfallDataCache();
  let dirty = false;
  for (const [name, data] of Object.entries(cache)) {
    if (data._v !== SCRYFALL_CACHE_VERSION) { delete cache[name]; dirty = true; continue; }
    if (!CARDS[name]) EXTRA_CARDS.set(name, data);
  }
  if (dirty) saveScryfallDataCache(cache);
})();

// Validate a derived card entry — ensures required fields are present and sane.
// Returns a safe minimal entry on failure rather than letting bad data propagate.
function validateCardEntry(entry, name) {
  try {
    if (!entry || typeof entry !== "object") throw new Error("null entry");
    const validTypes = ["creature","land","instant","sorcery","enchantment","artifact","planeswalker","unknown"];
    if (!validTypes.includes(entry.type)) throw new Error(`bad type: ${entry.type}`);
    if (typeof entry.cmc !== "number" || isNaN(entry.cmc)) throw new Error("bad cmc");
    if (!Array.isArray(entry.tags)) throw new Error("bad tags");
    // If tagged as dork, tapsFor must be defined
    if (entry.tags.includes("dork") && entry.tapsFor === undefined) {
      entry.tapsFor = 1; // safe fallback
    }
    // tapsFor must be a number or a known string
    if (entry.tapsFor !== undefined) {
      const validTapsFor = ["elves","creatures","devotion","arbor"];
      if (typeof entry.tapsFor !== "number" && !validTapsFor.includes(entry.tapsFor)) {
        entry.tapsFor = 1;
      }
    }
    if (typeof entry.devotion !== "number" || isNaN(entry.devotion)) entry.devotion = 0;
    return entry;
  } catch (e) {
    console.warn(`[Yeva] validateCardEntry failed for "${name}":`, e.message);
    return { type: "unknown", cmc: 0, tags: ["unknown"], devotion: 0, _v: SCRYFALL_CACHE_VERSION };
  }
}

// Derive a rich card entry from Scryfall API data.
// Infers type, tags, tapsFor, and devotion from type_line and oracle_text.
function deriveCardEntry(sf) {
  const typeLine = (sf.type_line || "").toLowerCase();
  const oracle   = (sf.oracle_text || sf.card_faces?.[0]?.oracle_text || "").toLowerCase();
  const cmc      = typeof sf.cmc === "number" ? sf.cmc : 0;

  // ── Card type ──────────────────────────────────────────────────────────────
  let type = "unknown";
  if (typeLine.includes("creature"))        type = "creature";
  else if (typeLine.includes("land"))       type = "land";
  else if (typeLine.includes("instant"))    type = "instant";
  else if (typeLine.includes("sorcery"))    type = "sorcery";
  else if (typeLine.includes("enchantment")) type = "enchantment";
  else if (typeLine.includes("artifact"))   type = "artifact";
  else if (typeLine.includes("planeswalker")) type = "planeswalker";

  // ── Tags ───────────────────────────────────────────────────────────────────
  const tags = [];

  // Land subtypes
  if (type === "land") tags.push("land");
  if (typeLine.includes("basic")) tags.push("basic");
  if (typeLine.includes("forest") || oracle.includes("add {g}") || oracle.includes("add one mana of any color")) {
    if (!tags.includes("forest")) tags.push("forest");
  }

  // Creature subtypes
  if (typeLine.includes("elf"))        tags.push("elf");
  if (typeLine.includes("human"))      tags.push("human");
  if (typeLine.includes("legendary") && type === "creature") tags.push("legendary");
  if (typeLine.includes("changeling") || oracle.includes("changeling")) tags.push("changeling");

  // Mana production — dork detection
  const isDork = type === "creature" && (
    oracle.includes("{t}: add") || oracle.includes("tap: add") ||
    oracle.includes("{t}, tap") ||
    oracle.includes("add mana") && oracle.includes("{t}")
  );
  if (isDork) {
    tags.push("dork");
    if (cmc <= 1) tags.push("1drop");
    // Big dork: scales with board state
    const isBigDork = (
      oracle.includes("for each creature") ||
      oracle.includes("for each elf") ||
      oracle.includes("for each land") ||
      oracle.includes("equal to your devotion") ||
      oracle.includes("equal to the number of") ||
      oracle.includes("add mana equal")
    );
    if (isBigDork) {
      tags.push("big-dork");
      tags.push("infinite-dork");
    }
  }

  // Artifact mana rocks
  if (type === "artifact" && (oracle.includes("{t}: add") || oracle.includes("tap: add"))) {
    tags.push("rock");
  }

  // Fetch land
  if (type === "land" && oracle.includes("search your library for a") && oracle.includes("land")) {
    tags.push("fetch");
  }

  // Tutor
  if (oracle.includes("search your library") && !tags.includes("fetch")) tags.push("tutor");

  // Draw
  if (oracle.includes("draw a card") || oracle.includes("draw cards") || oracle.includes("draw two")) tags.push("draw");

  // Untap
  if (oracle.includes("untap target") || oracle.includes("untap up to") || oracle.includes("untap each")) tags.push("untap");

  // Flash
  if (oracle.includes("flash") || typeLine.startsWith("flash") || oracle.includes("may cast") && oracle.includes("as though it had flash")) {
    tags.push("flash");
  }

  // Bounce / protection
  if (oracle.includes("return target creature") || oracle.includes("return target permanent")) tags.push("bounce");
  if (oracle.includes("can\'t be countered") || oracle.includes("cannot be countered")) tags.push("protection");

  // Removal
  if (oracle.includes("destroy target") || oracle.includes("exile target")) tags.push("removal");

  // Aura / enchant land
  if (typeLine.includes("enchantment — aura") && oracle.includes("enchant land")) tags.push("enchant-land");

  // Engine-style draw triggers
  if (oracle.includes("whenever you cast a creature") && oracle.includes("draw")) tags.push("engine");
  if (oracle.includes("whenever a creature") && oracle.includes("enters") && oracle.includes("draw")) tags.push("engine");

  // ── tapsFor ────────────────────────────────────────────────────────────────
  let tapsFor;
  if (tags.includes("dork")) {
    if (oracle.includes("for each elf"))          tapsFor = "elves";
    else if (oracle.includes("for each creature") || oracle.includes("equal to the number of creatures")) tapsFor = "creatures";
    else if (oracle.includes("equal to your devotion")) tapsFor = "devotion";
    else if (oracle.includes("add mana equal") || oracle.includes("for each land")) tapsFor = "creatures"; // best approximation
    else tapsFor = 1;
  } else if (tags.includes("rock")) {
    if (oracle.includes("{t}: add {c}{c}") || oracle.includes("add two")) tapsFor = 2;
    else if (oracle.includes("add one mana of any color") || oracle.includes("add {c}")) tapsFor = 1;
    else tapsFor = 1;
  }

  // ── Devotion ───────────────────────────────────────────────────────────────
  const cost = sf.mana_cost || "";
  const devotion = (cost.match(/\{G\}/g) || []).length +
                   (cost.match(/\{[WUBR]\}/g) || []).length;

  const entry = { type, cmc, tags, tapsFor, devotion, _v: SCRYFALL_CACHE_VERSION };
  return validateCardEntry(entry, sf.name || "unknown");
}

// Enrich a list of unknown card names via Scryfall.
// Uses the /cards/collection batch endpoint (up to 75 per request) to minimise
// round-trips and avoid rate-limit issues. Falls back to individual /cards/named
// requests for any cards that the batch endpoint can't match.
// Updates EXTRA_CARDS in place, validates entries, and persists to localStorage.
// Returns { enriched: Set<string>, failed: Set<string> }
async function enrichUnknownCards(names) {
  const enriched = new Set();
  const failed   = new Set();
  const toFetch  = names.filter(n => !CARDS[n] && !EXTRA_CARDS.has(n));
  if (toFetch.length === 0) return { enriched, failed };

  const cache = loadScryfallDataCache();

  function storeEntry(originalName, sf) {
    const canonical = sf.name || originalName;
    const entry = deriveCardEntry(sf); // already calls validateCardEntry
    EXTRA_CARDS.set(canonical, entry);
    if (canonical !== originalName) EXTRA_CARDS.set(originalName, entry);
    cache[canonical] = entry;
    if (canonical !== originalName) cache[originalName] = entry;
    return canonical;
  }

  // Split into batches of 75 (Scryfall collection limit)
  const BATCH_SIZE = 75;
  for (let batchStart = 0; batchStart < toFetch.length; batchStart += BATCH_SIZE) {
    const batch = toFetch.slice(batchStart, batchStart + BATCH_SIZE);

    // Build the identifiers array Scryfall expects
    const identifiers = batch.map(name => ({ name }));

    let batchMatched = new Set();
    try {
      const resp = await fetch("https://api.scryfall.com/cards/collection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifiers }),
      });

      if (resp.ok) {
        const json = await resp.json();
        // json.data = array of matched cards; json.not_found = array of unmatched identifiers
        for (const sf of (json.data || [])) {
          const originalName = batch.find(n =>
            n.toLowerCase() === (sf.name || "").toLowerCase()
          ) || sf.name;
          storeEntry(originalName, sf);
          enriched.add(originalName);
          batchMatched.add(originalName.toLowerCase());
        }
      }
    } catch {
      // If batch request fails entirely, fall through to per-card fallback below
    }

    // Fall back to individual requests for anything the batch didn't match
    const unmatched = batch.filter(n => !batchMatched.has(n.toLowerCase()));
    for (const name of unmatched) {
      await new Promise(r => setTimeout(r, 80)); // respect rate limit
      try {
        const url = `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(name)}`;
        const resp = await fetch(url);
        if (!resp.ok) { failed.add(name); continue; }
        const sf = await resp.json();
        if (sf.object === "error") { failed.add(name); continue; }
        storeEntry(name, sf);
        enriched.add(name);
      } catch {
        failed.add(name);
      }
    }

    // Brief pause between batches to be polite to Scryfall
    if (batchStart + BATCH_SIZE < toFetch.length) {
      await new Promise(r => setTimeout(r, 100));
    }
  }

  saveScryfallDataCache(cache);
  return { enriched, failed };
}

// Helper: look up a card from CARDS or EXTRA_CARDS
function getCard(name) {
  return CARDS[name] ?? EXTRA_CARDS.get(name) ?? null;
}

function useScryfallImage(name) {
  const [url, setUrl] = useState(() => scryfallCache.get(name) || null);
  useEffect(() => {
    if (!name) return;
    if (scryfallCache.has(name)) { setUrl(scryfallCache.get(name)); return; }
    const encoded = encodeURIComponent(name);
    fetch(`https://api.scryfall.com/cards/named?exact=${encoded}`)
      .then(r => r.json())
      .then(data => {
        const imgUrl = data?.image_uris?.normal
          || data?.card_faces?.[0]?.image_uris?.normal
          || "error";
        scryfallCache.set(name, imgUrl);
        setUrl(imgUrl);
      })
      .catch(() => { scryfallCache.set(name, "error"); setUrl("error"); });
  }, [name]);
  return url;
}

// Floating card image tooltip (portal-style, fixed position)
function CardTooltip({ name, anchorRect }) {
  const url = useScryfallImage(name);
  if (!url || url === "error" || !anchorRect) return null;
  // Position: prefer right of anchor, fall back to left if near edge
  const viewW = window.innerWidth;
  const tipW = 200, tipH = 279;
  let left = anchorRect.right + 8;
  if (left + tipW > viewW - 8) left = anchorRect.left - tipW - 8;
  const top = Math.min(anchorRect.top, window.innerHeight - tipH - 8);
  return (
    <div style={{
      position: "fixed", left, top, zIndex: 9999,
      width: tipW, borderRadius: 8,
      boxShadow: "0 8px 32px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.08)",
      pointerEvents: "none", overflow: "hidden",
      transition: "opacity 0.1s",
    }}>
      <img src={url} alt={name} style={{ width: "100%", display: "block" }} />
    </div>
  );
}

// Renders a string with card names highlighted as hoverable spans showing CardTooltip.
// Scans the text for any known card name (longest match first) and wraps them.
function HighlightWithPopups({ text, style }) {
  // Sort card names longest-first so "Ashaya, Soul of the Wild" matches before "Ashaya"
  const sortedNames = React.useMemo(() =>
    Object.keys(CARDS).sort((a, b) => b.length - a.length), []);

  const parts = React.useMemo(() => {
    if (!text) return [];
    const result = [];
    let remaining = text;
    let key = 0;
    while (remaining.length > 0) {
      let matched = false;
      for (const name of sortedNames) {
        const idx = remaining.indexOf(name);
        if (idx === 0) {
          result.push({ type: "card", name, key: key++ });
          remaining = remaining.slice(name.length);
          matched = true;
          break;
        } else if (idx > 0) {
          // There's plain text before the match
          result.push({ type: "text", text: remaining.slice(0, idx), key: key++ });
          result.push({ type: "card", name, key: key++ });
          remaining = remaining.slice(idx + name.length);
          matched = true;
          break;
        }
      }
      if (!matched) {
        result.push({ type: "text", text: remaining, key: key++ });
        remaining = "";
      }
    }
    return result;
  }, [text, sortedNames]);

  return (
    <span style={style}>
      {parts.map(p =>
        p.type === "text"
          ? <span key={p.key}>{p.text}</span>
          : <InlineCardHover key={p.key} name={p.name} />
      )}
    </span>
  );
}

function InlineCardHover({ name }) {
  const [hovered, setHovered] = useState(false);
  const [rect, setRect] = useState(null);
  const ref = useRef(null);
  return (
    <span
      ref={ref}
      onMouseEnter={() => { setRect(ref.current?.getBoundingClientRect() || null); setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
      style={{ color: COLORS.gold, cursor: "default", borderBottom: `1px dotted ${COLORS.gold}66` }}
    >
      {name}
      {hovered && <CardTooltip name={name} anchorRect={rect} />}
    </span>
  );
}

function CardPill({ name, onRemove, zone, onDragStart, onPlay }) {
  const zoneColors = { hand: COLORS.green1, battlefield: COLORS.green3, graveyard: COLORS.textDim };
  const c = zoneColors[zone] || COLORS.green1;
  const [hovered, setHovered] = useState(false);
  const [rect, setRect]       = useState(null);
  const ref = useRef(null);

  const onEnter = () => {
    setRect(ref.current?.getBoundingClientRect() || null);
    setHovered(true);
  };
  const onLeave = () => setHovered(false);

  const cardType = getCard(name)?.type;
  const playable = !!onPlay;
  const playLabel = (cardType === "instant" || cardType === "sorcery") ? "Cast → graveyard" : "Play → battlefield";

  return (
    <span
      ref={ref}
      draggable
      onDragStart={e => {
        e.dataTransfer.setData("text/plain", JSON.stringify({ name, fromZone: zone }));
        e.dataTransfer.effectAllowed = "move";
        if (onDragStart) onDragStart(name, zone);
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={playable ? () => onPlay(name) : undefined}
      style={{
        display: "inline-flex", alignItems: "center", gap: "5px",
        background: c + "18", border: `1px solid ${c}44`,
        borderRadius: "5px", padding: "3px 8px 3px 10px",
        margin: "2px", color: COLORS.text,
        fontSize: "12px", fontFamily: "'Crimson Text', serif",
        cursor: playable ? "pointer" : "grab", position: "relative",
        userSelect: "none",
      }}
      title={playable ? playLabel : undefined}
    >
      {name}
      {onRemove && (
        <button onClick={e => { e.stopPropagation(); onRemove(name); }} style={{
          background: "none", border: "none", color: "#ff8888",
          cursor: "pointer", fontSize: "14px", lineHeight: 1,
          padding: "0 0 1px 0", fontWeight: "bold",
        }}>×</button>
      )}
      {hovered && <CardTooltip name={name} anchorRect={rect} />}
    </span>
  );
}

function CardInput({ label, zone, cards, onAdd, onRemove, placeholder, deckCards, onRef, onDropCard, onPlay }) {
  const [input, setInput] = useState("");
  const [suggs, setSuggs] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const inputRef = useRef(""); // tracks latest value to detect stale async closures
  const [isDragOver, setIsDragOver] = useState(false);

  const [secret, setSecret] = useState(null);

  // Search pool: active deck cards when a deck is selected, otherwise all known cards
  const searchPool = deckCards ?? ALL_CARD_NAMES;

  const handleChange = (v) => {
    setInput(v);
    inputRef.current = v;
    if (v.length < 2) { setSuggs([]); return; }
    // Synchronously compute suggestions so the list updates immediately on every keystroke,
    // with no stale results lingering while the async secret-card hash is in flight.
    const q = v.toLowerCase();
    const seen = new Set();
    const matches = searchPool.filter(n => {
      if (seen.has(n)) return false; // deduplicate (deck pools have multiple Forest etc.)
      if (!n.toLowerCase().includes(q)) return false;
      const isBasic = getCard(n)?.tags?.includes("basic");
      if (!isBasic && cards.includes(n)) return false;
      if (zone === "battlefield") {
        const type = getCard(n)?.type;
        if (type === "instant" || type === "sorcery") return false;
      }
      seen.add(n);
      return true;
    });
    matches.sort((a, b) => {
      const aPrefix = a.toLowerCase().startsWith(q);
      const bPrefix = b.toLowerCase().startsWith(q);
      if (aPrefix !== bPrefix) return aPrefix ? -1 : 1;
      return a.length - b.length;
    });
    setSuggs(matches.slice(0, 7));
    // Also check for secret card names via SHA-256 hash (async) — overrides suggestions if matched
    crypto.subtle.digest("SHA-256",
      new TextEncoder().encode(v.toLowerCase())
    ).then(buf => {
      if (inputRef.current !== v) return; // input changed — discard stale result
      const hex = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,"0")).join("");
      if (SECRET_CARDS[hex]) {
        setSecret(SECRET_CARDS[hex]);
        setSuggs([]);
      } else {
        setSecret(null);
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

      <div
        style={{
          minHeight: "44px", background: isDragOver ? c + "22" : "#07100788",
          border: `1px solid ${isDragOver ? c : c + "33"}`, borderRadius: "8px",
          padding: "6px", marginBottom: "6px",
          display: "flex", flexWrap: "wrap", alignItems: "flex-start",
          transition: "background 0.15s, border-color 0.15s",
        }}
        onDragOver={e => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; setIsDragOver(true); }}
        onDragEnter={e => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={e => { setIsDragOver(false); }}
        onDrop={e => {
          e.preventDefault();
          setIsDragOver(false);
          try {
            const { name, fromZone } = JSON.parse(e.dataTransfer.getData("text/plain"));
            if (fromZone !== zone && onDropCard) onDropCard(name, fromZone, zone);
          } catch {}
        }}
      >
        {cards.length === 0 && (
          <span style={{ color: COLORS.textDim, fontSize: "12px", padding: "4px 6px", fontStyle: "italic", fontFamily: "'Crimson Text', serif" }}>
            {placeholder}
          </span>
        )}
        {cards.map((n, i) => <CardPill key={`${n}-${i}`} name={n} zone={zone} onRemove={onRemove} onPlay={onPlay} />)}
      </div>

      <div style={{ position: "relative" }}>
        <input
          ref={el => { if (onRef && el) onRef(el); }}
          value={input}
          onChange={e => { handleChange(e.target.value); setSelectedIdx(-1); }}
          onKeyDown={e => {
            if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIdx(i => Math.min(i + 1, suggs.length - 1)); }
            if (e.key === "ArrowUp")   { e.preventDefault(); setSelectedIdx(i => Math.max(i - 1, -1)); }
            if (e.key === "Enter") {
              const pick = selectedIdx >= 0 ? suggs[selectedIdx] : suggs[0];
              if (pick) { add(pick); setSelectedIdx(-1); }
            }
            if (e.key === "Escape") { setSuggs([]); setSelectedIdx(-1); }
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
            {suggs.map((s, si) => (
              <div key={`${s}-${si}`} onMouseDown={() => { add(s); setSelectedIdx(-1); }} style={{
                padding: "9px 14px", cursor: "pointer",
                color: COLORS.textMid, fontSize: "13px",
                fontFamily: "'Crimson Text', serif",
                borderBottom: `1px solid ${COLORS.border}`,
                background: si === selectedIdx ? COLORS.bgHover : "transparent",
                transition: "background 0.1s",
              }}
                onMouseEnter={() => setSelectedIdx(si)}
                onMouseLeave={() => {}}
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

// ── PLAYFIELD VISUALISER ──────────────────────────────────────────────────────
function PlayfieldCard({ name, tapped, onToggleTap, onRemove, draggable = false, onDragStart }) {
  const url = useScryfallImage(name);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const cardW = 80, cardH = 112;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      draggable={draggable}
      onDragStart={e => {
        e.dataTransfer.setData("text/plain", name);
        e.dataTransfer.effectAllowed = "move";
        setDragging(true);
        onDragStart?.();
      }}
      onDragEnd={() => setDragging(false)}
      style={{
        position: "relative",
        width: tapped ? cardH : cardW,
        height: tapped ? cardW : cardH,
        flexShrink: 0,
        transition: "width 0.2s, height 0.2s",
        opacity: dragging ? 0.4 : 1,
        cursor: draggable ? "grab" : "default",
      }}
    >
      {/* Card image or placeholder */}
      <div
        onClick={() => onToggleTap(name)}
        style={{
          width: cardW, height: cardH,
          borderRadius: 5,
          overflow: "hidden",
          transformOrigin: "top left",
          transform: tapped ? `rotate(90deg) translateY(-${cardH}px)` : "none",
          transition: "transform 0.2s",
          cursor: draggable ? "grab" : "pointer",
          boxShadow: hovered
            ? "0 0 0 2px #4ade80, 0 4px 16px rgba(0,0,0,0.7)"
            : "0 2px 8px rgba(0,0,0,0.6)",
          background: "#1a2e1a",
          border: "1px solid #2a4a2a",
        }}
      >
        {url && url !== "error" ? (
          <img src={url} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} draggable={false} />
        ) : (
          <div style={{
            width: "100%", height: "100%", display: "flex", alignItems: "center",
            justifyContent: "center", padding: 4, textAlign: "center",
            color: "#4ade80", fontSize: 9, fontFamily: "'Crimson Text', serif",
            lineHeight: 1.3,
          }}>
            {url === null ? "…" : name}
          </div>
        )}
      </div>
      {/* Remove button — shows on hover */}
      {hovered && onRemove && (
        <button
          onClick={e => { e.stopPropagation(); onRemove(name); }}
          style={{
            position: "absolute", top: tapped ? "auto" : -6, right: tapped ? -6 : -6,
            bottom: tapped ? -6 : "auto",
            width: 16, height: 16, borderRadius: "50%",
            background: "#ef4444", border: "none", color: "#fff",
            fontSize: 10, fontWeight: "bold", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 10, padding: 0, lineHeight: 1,
          }}
        >×</button>
      )}
    </div>
  );
}

function Playfield({ hand, battlefield, onRemoveFromHand, onRemoveFromBattlefield, onMoveToBattlefield, onMoveToHand }) {
  const [tapped,       setTapped]       = useState(new Set()); // indices into battlefield
  const [open,         setOpen]         = useState(false);
  const [dropOver,     setDropOver]     = useState(false);
  const [dropOverHand, setDropOverHand] = useState(false);

  // When battlefield changes, drop any out-of-range indices
  useEffect(() => {
    setTapped(prev => {
      const next = new Set([...prev].filter(i => i < battlefield.length));
      return next.size === prev.size ? prev : next;
    });
  }, [battlefield]);

  const toggleTap = useCallback((i) => {
    setTapped(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }, []);

  const tapAll   = () => setTapped(new Set(battlefield.map((_, i) => i)));
  const untapAll = () => setTapped(new Set());

  // Battlefield drop handlers (hand → battlefield)
  const handleDragOver = e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDropOver(true);
  };
  const handleDragLeave = () => setDropOver(false);
  const handleDrop = e => {
    e.preventDefault();
    setDropOver(false);
    const name = e.dataTransfer.getData("text/plain");
    if (!name || !hand.includes(name)) return;
    const type = CARDS[name]?.type;
    if (type === "instant" || type === "sorcery") return;
    onMoveToBattlefield(name);
  };

  // Hand drop handlers (battlefield → hand)
  const handleHandDragOver = e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDropOverHand(true);
  };
  const handleHandDragLeave = () => setDropOverHand(false);
  const handleHandDrop = e => {
    e.preventDefault();
    setDropOverHand(false);
    const name = e.dataTransfer.getData("text/plain");
    if (!name || !battlefield.includes(name)) return;
    onMoveToHand(name);
  };

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} style={{
        width: "100%", marginTop: 8, padding: "6px 0",
        background: "none", border: `1px solid ${COLORS.border}`,
        borderRadius: 6, color: COLORS.textDim, cursor: "pointer",
        fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "1px",
      }}>▼ SHOW PLAYFIELD</button>
    );
  }

  const zoneLabel = (label, count, color, actions) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, marginTop: 12 }}>
      <span style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "2px", color, textTransform: "uppercase" }}>
        {label}
      </span>
      <span style={{ fontSize: "10px", color: COLORS.textDim }}>({count})</span>
      <div style={{ flex: 1, height: 1, background: color + "33" }} />
      {actions}
    </div>
  );

  const actionBtn = (label, onClick) => (
    <button onClick={onClick} style={{
      background: "none", border: `1px solid ${COLORS.border}`,
      borderRadius: 4, padding: "2px 8px", color: COLORS.textDim,
      cursor: "pointer", fontSize: "10px", fontFamily: "'Cinzel', serif",
      letterSpacing: "0.5px",
    }}>{label}</button>
  );

  return (
    <div style={{
      marginTop: 8,
      background: "#07100788",
      border: `1px solid ${COLORS.border}`,
      borderRadius: 8, padding: "10px 12px",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "2px", color: COLORS.textDim }}>
          PLAYFIELD
        </span>
        <button onClick={() => setOpen(false)} style={{
          background: "none", border: "none", color: COLORS.textDim,
          cursor: "pointer", fontSize: "11px", padding: 0,
        }}>▲ hide</button>
      </div>

      {/* Battlefield — drop target */}
      {zoneLabel("Battlefield", battlefield.length, COLORS.green3,
        <>{actionBtn("tap all", tapAll)}{actionBtn("untap all", untapAll)}</>
      )}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          minHeight: 120, display: "flex", flexWrap: "wrap", gap: 6,
          alignItems: "flex-start", padding: "6px 0 8px",
          borderRadius: 6,
          border: dropOver ? `2px dashed ${COLORS.green3}` : "2px dashed transparent",
          background: dropOver ? COLORS.green3 + "11" : "transparent",
          transition: "border-color 0.15s, background 0.15s",
        }}
      >
        {battlefield.length === 0 && !dropOver && (
          <span style={{ color: COLORS.textDim, fontSize: 11, fontStyle: "italic", padding: "4px 0" }}>
            No permanents — drag cards here from hand
          </span>
        )}
        {dropOver && (
          <span style={{ color: COLORS.green3, fontSize: 11, padding: "4px 0", fontFamily: "'Cinzel', serif", letterSpacing: 1 }}>
            DROP TO CAST
          </span>
        )}
        {battlefield.map((name, i) => (
          <PlayfieldCard
            key={`${name}-${i}`} name={name}
            tapped={tapped.has(i)}
            onToggleTap={() => toggleTap(i)}
            onRemove={onRemoveFromBattlefield}
            draggable={true}
          />
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: COLORS.border, margin: "4px 0 0" }} />

      {/* Hand — draggable cards, also drop target for battlefield → hand */}
      {zoneLabel("Hand", hand.length, COLORS.green1, null)}
      <div
        onDragOver={handleHandDragOver}
        onDragLeave={handleHandDragLeave}
        onDrop={handleHandDrop}
        style={{
          display: "flex", flexWrap: "wrap", gap: 6,
          alignItems: "flex-start", padding: "6px 0 4px",
          minHeight: 30,
          borderRadius: 6,
          border: dropOverHand ? `2px dashed ${COLORS.green1}` : "2px dashed transparent",
          background: dropOverHand ? COLORS.green1 + "11" : "transparent",
          transition: "border-color 0.15s, background 0.15s",
        }}
      >
        {hand.length === 0 && !dropOverHand && (
          <span style={{ color: COLORS.textDim, fontSize: 11, fontStyle: "italic", padding: "4px 0" }}>
            No cards in hand
          </span>
        )}
        {dropOverHand && (
          <span style={{ color: COLORS.green1, fontSize: 11, padding: "4px 0", fontFamily: "'Cinzel', serif", letterSpacing: 1 }}>
            RETURN TO HAND
          </span>
        )}
        {hand.map((name, i) => {
          const type = CARDS[name]?.type;
          const canCast = type !== "instant" && type !== "sorcery";
          return (
            <PlayfieldCard
              key={`${name}-${i}`} name={name}
              tapped={false}
              onToggleTap={() => {}}
              onRemove={onRemoveFromHand}
              draggable={canCast}
            />
          );
        })}
      </div>
      <div style={{ marginTop: 6, fontSize: 10, color: COLORS.textDim, fontStyle: "italic" }}>
        Drag hand → battlefield to cast · drag battlefield → hand to bounce · click to tap/untap
      </div>
    </div>
  );
}

// ── CARD NAME HIGHLIGHTING ────────────────────────────────────────────────────
// Inline card span — highlighted if active in zones, with hover image tooltip.
function CardNameSpan({ name, active, color }) {
  const [hovered, setHovered] = useState(false);
  const [rect, setRect]       = useState(null);
  const ref = useRef(null);

  return (
    <span
      ref={ref}
      onMouseEnter={() => { setRect(ref.current?.getBoundingClientRect()); setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
      style={{
        color:        active ? (color || "#4ade80") : COLORS.textMid,
        fontWeight:   active ? 600 : 400,
        borderBottom: active
          ? `1px dotted ${(color || "#4ade80")}88`
          : `1px dotted ${COLORS.textDim}55`,
        cursor: "default",
        position: "relative",
      }}
    >
      {name}
      {hovered && <CardTooltip name={name} anchorRect={rect} />}
    </span>
  );
}

function HighlightedText({ text, activeCards, color }) {
  if (!text) return <span>{text}</span>;

  // Build regex from all full card names AND all aliases, longest first
  const allPatterns = [
    ...ALL_CARD_NAMES,
    ...[...CARD_ALIASES.keys()].filter(k => !ALL_CARD_NAMES.map(n=>n.toLowerCase()).includes(k)),
  ].sort((a, b) => b.length - a.length);

  const escaped = allPatterns.map(n => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex   = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts   = text.split(regex);
  const activeSet = activeCards || new Set();

  return (
    <span>
      {parts.map((part, i) => {
        // Resolve to canonical name via alias map
        const canonical = CARD_ALIASES.get(part.toLowerCase());
        if (!canonical) return <span key={i}>{part}</span>;
        const active = activeSet.has(canonical) ||
          [...activeSet].some(n => n.toLowerCase() === canonical.toLowerCase());
        return <CardNameSpan key={i} name={canonical} active={active} color={color} />;
      })}
    </span>
  );
}

// Confidence indicator — diamond pips showing certainty tier
const CONFIDENCE_CONFIG = {
  certain:     { filled: 3, label: "Certain",     title: "Deterministic — this line wins or resolves with no decisions remaining" },
  high:        { filled: 2, label: "Strong",      title: "Very likely correct — a concrete plan with known pieces" },
  good:        { filled: 1, label: "Reasonable",  title: "Solid play — good direction but outcome depends on future draws" },
  speculative: { filled: 0, label: "Speculative", title: "Directional — worth considering but many unknowns remain" },
  info:        { filled: 0, label: "Info",        title: "Situational information" },
};

function ConfidencePips({ confidence, color }) {
  const cfg = CONFIDENCE_CONFIG[confidence] || CONFIDENCE_CONFIG.speculative;
  const dimColor = color + "33";
  const fullColor = color;
  return (
    <span title={`${cfg.label}: ${cfg.title}`} style={{ display: "inline-flex", alignItems: "center", gap: "2px", flexShrink: 0 }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          fontSize: "9px",
          color: i < cfg.filled ? fullColor : dimColor,
          lineHeight: 1,
          filter: i < cfg.filled ? `drop-shadow(0 0 3px ${color}88)` : "none",
          transition: "color 0.2s",
        }}>◆</span>
      ))}
    </span>
  );
}

function AdviceCard({ advice, index, activeCards, collapseKey }) {
  const [open, setOpen] = useState(index === 0);

  // When collapseKey changes, collapse all (negative) or expand all (positive)
  useEffect(() => {
    if (collapseKey === 0) return;
    setOpen(collapseKey > 0);
  }, [collapseKey]);

  // Suppressed win — compact, greyed, collapsed by default
  if (advice.isSuppressed) {
    return (
      <div style={{
        background: "#0d0d0d", border: "1px solid #2a2a2a",
        borderLeft: "3px solid #3a3a3a", borderRadius: "8px", marginBottom: "6px",
        overflow: "hidden",
      }}>
        <div onClick={() => setOpen(!open)} style={{
          padding: "8px 14px", cursor: "pointer",
          display: "flex", alignItems: "center", gap: "10px",
        }}>
          <span style={{ fontSize: "11px", color: "#555", fontFamily: "'Cinzel', serif", letterSpacing: "1px", whiteSpace: "nowrap", flexShrink: 0 }}>🔕 SUPPRESSED</span>
          <span style={{ flex: 1, color: "#555", fontFamily: "'Crimson Text', serif", fontSize: "13px" }}>{advice.headline}</span>
          <span style={{ color: "#444", fontSize: "14px", flexShrink: 0 }}>{open ? "▾" : "▸"}</span>
        </div>
        {open && (
          <div style={{ padding: "6px 14px 10px", borderTop: "1px solid #1e1e1e" }}>
            <p style={{ color: "#4a4a4a", fontFamily: "'Crimson Text', serif", fontSize: "13px", lineHeight: 1.5, margin: "6px 0 0" }}>
              {advice.detail}
            </p>
          </div>
        )}
      </div>
    );
  }

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
        {advice.confidence && advice.confidence !== "info" && (
          <ConfidencePips confidence={advice.confidence} color={advice.color} />
        )}
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
            <HighlightedText text={advice.detail} activeCards={activeCards} color={advice.color} />
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
                  }}>
                    <HighlightedText text={step} activeCards={activeCards} color={advice.color} />
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function QuickAdd({ zone, onAdd, deckCards }) {
  const quickCards = {
    battlefield: ["Ashaya, Soul of the Wild","Temur Sabertooth","Priest of Titania","Quirion Ranger","Earthcraft","Gaea's Cradle","Yeva, Nature's Herald","Wirewood Lodge"],
    hand: ["Ashaya, Soul of the Wild","Quirion Ranger","Chord of Calling","Worldly Tutor","Infectious Bite","Eternal Witness","Natural Order","Summoner's Pact"],
    graveyard: ["Infectious Bite", "Beast Within"],
  };
  const pool = deckCards ? new Set(deckCards) : null;
  const cards = (quickCards[zone] || []).filter(c => !pool || pool.has(c));
  if (cards.length === 0) return null;
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
// ============================================================
// DECK MANAGEMENT
// ============================================================

const PRESET_DECKS = [
  {
    id: "yeva-competitive",
    name: "Competitive",
    cards: [
      "Allosaurus Shepherd","Ancient Tomb","Arbor Elf","Archdruid's Charm",
      "Argothian Elder","Ashaya, Soul of the Wild","Badgermole Cub","Beast Whisperer",
      "Beast Within","Birds of Paradise","Boreal Druid","Boseiju, Who Endures",
      "Chomping Changeling","Chord of Calling","Chrome Mox","Circle of Dreams Druid",
      "Collector Ouphe","Crop Rotation","Delighted Halfling","Deserted Temple",
      "Destiny Spinner","Disciple of Freyalise","Dryad Arbor","Duskwatch Recruiter",
      "Earthcraft","Eladamri, Korvecdal","Eldritch Evolution","Elvish Archdruid",
      "Elvish Guidance","Elvish Harbinger","Elvish Mystic","Elvish Reclaimer",
      "Elvish Spirit Guide","Emergence Zone","Endurance","Eternal Witness",
      "Fanatic of Rhonas","Fauna Shaman","Fierce Empath","Force of Vigor",
      "Forest","Forest","Forest","Forest","Forest","Forest","Forest","Forest","Forest","Forest",
      "Formidable Speaker","Fyndhorn Elves","Gaea's Cradle","Geier Reach Sanitarium",
      "Glademuse","Green Sun's Zenith","Growing Rites of Itlimoc","Heartwood Storyteller",
      "Hope Tender","Hyrax Tower Scout","Karametra's Acolyte","Kogla, the Titan Ape",
      "Legolas's Quick Reflexes","Llanowar Elves","Lotus Petal","Magus of the Candelabra",
      "Misty Rainforest","Mox Diamond","Natural Order","Nature's Rhythm",
      "Nykthos, Shrine to Nyx","Priest of Titania","Quirion Ranger","Regal Force",
      "Scryb Ranger","Seedborn Muse","Shared Summons","Shifting Woodland",
      "Sol Ring","Sowing Mycospawn","Summoner's Pact","Survival of the Fittest",
      "Sylvan Scrying","Talon Gates of Madara","Temur Sabertooth",
      "Urza's Cave","Utopia Sprawl","Verdant Catacombs","War Room","Wild Growth",
      "Windswept Heath","Wirewood Lodge","Wirewood Symbiote","Woodcaller Automaton",
      "Wooded Foothills","Woodland Bellower","Worldly Tutor",
      "Yavimaya, Cradle of Growth","Yisan, the Wanderer Bard","Yeva, Nature's Herald",
    ],
  },
  {
    id: "yeva-cedh-jan2026",
    name: "cEDH Jan 2026",
    cards: [
      "Allosaurus Shepherd","Ancient Tomb","Arbor Elf","Archdruid's Charm",
      "Argothian Elder","Ashaya, Soul of the Wild","Badgermole Cub","Beast Whisperer",
      "Beast Within","Birds of Paradise","Boreal Druid","Boseiju, Who Endures",
      "Chomping Changeling","Chord of Calling","Chrome Mox","Circle of Dreams Druid",
      "Collector Ouphe","Crop Rotation","Delighted Halfling","Deserted Temple",
      "Destiny Spinner","Disciple of Freyalise","Dryad Arbor",
      "Duskwatch Recruiter","Earthcraft","Eladamri, Korvecdal","Eldritch Evolution",
      "Elvish Archdruid","Elvish Harbinger","Elvish Mystic","Elvish Reclaimer",
      "Elvish Spirit Guide","Emergence Zone","Endurance","Eternal Witness",
      "Fanatic of Rhonas","Fauna Shaman","Fierce Empath","Force of Vigor",
      "Forest","Forest","Forest","Forest","Forest","Forest","Forest","Forest","Forest","Forest",
      "Formidable Speaker","Fyndhorn Elves","Gaea's Cradle","Geier Reach Sanitarium",
      "Glademuse","Green Sun's Zenith","Growing Rites of Itlimoc","Heartwood Storyteller",
      "Hyrax Tower Scout","Infectious Bite","Karametra's Acolyte","Kogla, the Titan Ape",
      "Legolas's Quick Reflexes","Llanowar Elves","Lotus Petal","Magus of the Candelabra",
      "Misty Rainforest","Mox Diamond","Natural Order","Nature's Rhythm",
      "Nykthos, Shrine to Nyx","Priest of Titania","Quirion Ranger","Regal Force",
      "Scryb Ranger","Seedborn Muse","Shared Summons","Shifting Woodland",
      "Sol Ring","Sowing Mycospawn","Summoner's Pact","Survival of the Fittest",
      "Sylvan Scrying","Talon Gates of Madara","Temur Sabertooth","Tireless Provisioner",
      "Urza's Cave","Utopia Sprawl","Verdant Catacombs","War Room","Wild Growth",
      "Windswept Heath","Wirewood Lodge","Wirewood Symbiote","Woodcaller Automaton",
      "Wooded Foothills","Woodland Bellower","Worldly Tutor",
      "Yavimaya, Cradle of Growth","Yeva, Nature's Herald","Yisan, the Wanderer Bard",
    ],
  },
];

// Hook: load/save deck lists from artifact storage
// Storage abstraction — prefers window.storage (Claude artifact API), falls back to localStorage
const storage = {
  async get(key) {
    if (typeof window !== "undefined" && window.storage?.get) {
      try { return await window.storage.get(key); } catch { /* fall through */ }
    }
    try {
      const v = localStorage.getItem(key);
      return v != null ? { key, value: v } : null;
    } catch { return null; }
  },
  async set(key, value) {
    if (typeof window !== "undefined" && window.storage?.set) {
      try { return await window.storage.set(key, value); } catch { /* fall through */ }
    }
    try { localStorage.setItem(key, value); return { key, value }; } catch { return null; }
  },
};

function useDeckStorage() {
  const [decks, setDecks] = useState(null); // null = loading
  const [activeDeckId, setActiveDeckId] = useState(null);

  // Load on mount
  useEffect(() => {
    (async () => {
      try {
        const saved = await storage.get("yeva-decks");
        const savedActive = await storage.get("yeva-active-deck");
        const loadedDecks = saved ? JSON.parse(saved.value) : PRESET_DECKS.map(d => ({ ...d }));
        if (!saved) await storage.set("yeva-decks", JSON.stringify(loadedDecks));
        setDecks(loadedDecks);
        setActiveDeckId(savedActive?.value || null);
      } catch {
        setDecks(PRESET_DECKS.map(d => ({ ...d })));
        setActiveDeckId(null);
      }
    })();
  }, []);

  const saveDecks = async (newDecks) => {
    setDecks(newDecks);
    await storage.set("yeva-decks", JSON.stringify(newDecks));
  };

  const saveActiveDeck = async (id) => {
    setActiveDeckId(id);
    await storage.set("yeva-active-deck", id ?? "");
  };

  return { decks, activeDeckId, saveDecks, saveActiveDeck };
}

// Parse a pasted decklist (handles common formats: "1 Card Name", "Card Name", quantity lines)
function parseDecklist(text) {
  const cards = [];
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("//") || line.startsWith("#")) continue;
    // Strip quantity prefix: "1x Card", "1 Card", "x1 Card", or bare "Card"
    const match = line.match(/^(\d+)x?\s+(.+)$/) || line.match(/^x(\d+)\s+(.+)$/);
    const name = match ? match[2].trim() : line;
    const qty  = match ? parseInt(match[1]) : 1;
    // Resolve aliases
    const resolved = CARD_ALIASES.get(name.toLowerCase()) || name;
    for (let i = 0; i < Math.min(qty, 99); i++) cards.push(resolved);
  }
  return cards;
}

// ── Custom card editor — shown for unknown cards so users can manually define
// type, CMC, and key tags without needing Scryfall connectivity.
function CustomCardEditor({ name, onSave, onCancel }) {
  const existing = EXTRA_CARDS.get(name) || {};
  const [type, setType]       = useState(existing.type || "creature");
  const [cmc, setCmc]         = useState(existing.cmc ?? 2);
  const [tapsFor, setTapsFor] = useState(existing.tapsFor ?? 1);
  const [tags, setTags]       = useState(existing.tags ? existing.tags.filter(t => t !== "unknown") : []);
  const [role, setRole]       = useState(existing.role || "");

  const TAG_OPTIONS = [
    { id: "dork",        label: "Mana dork" },
    { id: "big-dork",    label: "Big dork (scales)" },
    { id: "elf",         label: "Elf" },
    { id: "human",       label: "Human" },
    { id: "tutor",       label: "Tutor" },
    { id: "combo",       label: "Combo piece" },
    { id: "draw",        label: "Draw" },
    { id: "removal",     label: "Removal" },
    { id: "flash",       label: "Flash" },
    { id: "protection",  label: "Protection" },
    { id: "rock",        label: "Mana rock" },
    { id: "fetch",       label: "Fetch land" },
    { id: "forest",      label: "Forest / taps {G}" },
    { id: "engine",      label: "Engine" },
    { id: "untap",       label: "Untap effect" },
    { id: "bounce",      label: "Bounce" },
    { id: "1drop",       label: "1-drop" },
    { id: "infinite-dork", label: "Infinite dork" },
  ];

  const toggleTag = (id) => setTags(t => t.includes(id) ? t.filter(x => x !== id) : [...t, id]);

  const TAPS_FOR_OPTIONS = [
    { value: 1, label: "1 mana" },
    { value: 2, label: "2 mana" },
    { value: "elves",    label: "# elves" },
    { value: "creatures", label: "# creatures" },
    { value: "devotion", label: "# devotion" },
  ];

  const handleSave = () => {
    const finalTags = [...new Set(tags)];
    if (type === "land") { if (!finalTags.includes("land")) finalTags.unshift("land"); }
    const entry = {
      type, cmc: Number(cmc), tags: finalTags, devotion: 0,
      _v: SCRYFALL_CACHE_VERSION, _custom: true,
    };
    if (finalTags.includes("dork") || finalTags.includes("rock")) entry.tapsFor = tapsFor;
    if (role.trim()) entry.role = role.trim();
    // validate and persist
    const validated = validateCardEntry(entry, name);
    EXTRA_CARDS.set(name, validated);
    // save to cache
    try {
      const cache = loadScryfallDataCache();
      cache[name] = validated;
      saveScryfallDataCache(cache);
    } catch {}
    onSave(validated);
  };

  const fieldStyle = { background: "#0a150a", border: `1px solid ${COLORS.border}`, borderRadius: "4px", color: COLORS.text, padding: "4px 8px", fontSize: "12px", fontFamily: "'Crimson Text', serif", outline: "none" };
  const labelStyle = { fontSize: "10px", color: COLORS.textDim, letterSpacing: "1px", fontFamily: "'Cinzel', serif", marginBottom: "3px" };

  return (
    <div style={{ background: "#0d1a0d", border: `1px solid ${COLORS.green1}44`, borderRadius: "8px", padding: "14px 16px", marginTop: "6px", width: "320px" }}>
      <div style={{ fontSize: "11px", color: COLORS.gold, letterSpacing: "1px", fontFamily: "'Cinzel', serif", marginBottom: "10px" }}>
        ✎ DEFINE CARD: {name}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
        <div>
          <div style={labelStyle}>TYPE</div>
          <select value={type} onChange={e => setType(e.target.value)} style={{ ...fieldStyle, width: "100%" }}>
            {["creature","land","instant","sorcery","enchantment","artifact","planeswalker"].map(t =>
              <option key={t} value={t}>{t}</option>
            )}
          </select>
        </div>
        <div>
          <div style={labelStyle}>CMC</div>
          <input type="number" min={0} max={20} value={cmc} onChange={e => setCmc(e.target.value)} style={{ ...fieldStyle, width: "100%" }} />
        </div>
      </div>

      {(tags.includes("dork") || tags.includes("rock")) && (
        <div style={{ marginBottom: "10px" }}>
          <div style={labelStyle}>TAPS FOR</div>
          <select value={tapsFor} onChange={e => { const v = e.target.value; setTapsFor(isNaN(Number(v)) ? v : Number(v)); }} style={{ ...fieldStyle, width: "100%" }}>
            {TAPS_FOR_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      )}

      <div style={{ marginBottom: "10px" }}>
        <div style={labelStyle}>TAGS (select all that apply)</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {TAG_OPTIONS.map(({ id, label }) => (
            <button key={id} onClick={() => toggleTag(id)} style={{
              background: tags.includes(id) ? "#1a3a1a" : "#111",
              border: `1px solid ${tags.includes(id) ? COLORS.green1 : COLORS.border}`,
              borderRadius: "4px", padding: "2px 8px",
              color: tags.includes(id) ? COLORS.green1 : COLORS.textDim,
              fontSize: "11px", cursor: "pointer", fontFamily: "'Crimson Text', serif",
            }}>{label}</button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <div style={labelStyle}>ROLE NOTE (optional)</div>
        <input value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. 'proxy Priest of Titania'" style={{ ...fieldStyle, width: "100%", boxSizing: "border-box" }} />
      </div>

      <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
        <button onClick={onCancel} style={{ background: "none", border: `1px solid ${COLORS.border}`, borderRadius: "4px", padding: "4px 12px", color: COLORS.textDim, cursor: "pointer", fontSize: "11px" }}>Cancel</button>
        <button onClick={handleSave} style={{ background: "#1a3a1a", border: `1px solid ${COLORS.green1}`, borderRadius: "4px", padding: "4px 14px", color: COLORS.green1, cursor: "pointer", fontSize: "11px", fontFamily: "'Cinzel', serif" }}>✓ Save</button>
      </div>
    </div>
  );
}

function DeckCardChip({ name, count, isUnknown, isExternal, onRemove, onCardDefined, editMode }) {
  const [hovered, setHovered]       = useState(false);
  const [rect, setRect]             = useState(null);
  const [showDefine, setShowDefine] = useState(false);
  const ref = useRef(null);

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: "2px", verticalAlign: "top", margin: "2px" }}>
      <span
        ref={ref}
        onMouseEnter={() => { if (!editMode) { setRect(ref.current?.getBoundingClientRect()); setHovered(true); } }}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "inline-flex", alignItems: "center", gap: "4px",
          background: isUnknown ? "#2a0a0a" : "#0a1a0a",
          border: `1px solid ${isUnknown ? "#5a1a1a" : COLORS.border}`,
          borderRadius: "4px", padding: "3px 6px 3px 8px",
          color: isUnknown ? "#e74c3c" : COLORS.textMid,
          fontSize: "12px", fontFamily: "'Crimson Text', serif",
          cursor: "default", position: "relative",
        }}
      >
        {name}{count > 1 ? <span style={{ color: COLORS.green1, marginLeft: "4px" }}>×{count}</span> : ""}
        {isExternal && editMode && (
          <button
            onClick={() => setShowDefine(v => !v)}
            title={EXTRA_CARDS.has(name) ? "Edit this card's type and tags" : "Manually define this card's type and tags"}
            style={{ background: "none", border: "none", color: showDefine ? COLORS.gold : (isUnknown ? "#e74c3c88" : COLORS.textDim + "88"), cursor: "pointer", fontSize: "11px", padding: "0 0 0 2px", lineHeight: 1 }}
          >✎</button>
        )}
        {editMode && onRemove && (
          <button
            onClick={() => onRemove(name)}
            style={{ background: "none", border: "none", color: "#e74c3c88", cursor: "pointer", fontSize: "13px", padding: "0 0 1px 2px", lineHeight: 1, fontWeight: "bold" }}
          >×</button>
        )}
        {hovered && !editMode && <CardTooltip name={name} anchorRect={rect} />}
      </span>
      {showDefine && isExternal && editMode && (
        <CustomCardEditor
          name={name}
          onSave={(entry) => { setShowDefine(false); if (onCardDefined) onCardDefined(name, entry); }}
          onCancel={() => setShowDefine(false)}
        />
      )}
    </div>
  );
}

function DeckDetailModal({ deck, onClose, onSave }) {
  const [filter, setFilter]     = useState("");
  const [editMode, setEditMode] = useState(false);
  const [cards, setCards]       = useState([...(deck?.cards || [])]);
  const [addInput, setAddInput] = useState("");
  const [addSuggs, setAddSuggs] = useState([]);
  const [dirty, setDirty]       = useState(false);
  const addRef = useRef(null);

  if (!deck) return null;

  const dedupedCards = [...new Set(cards)];
  const counts = {};
  cards.forEach(c => { counts[c] = (counts[c] || 0) + 1; });

  // Group cards by category — use getCard so enriched/custom cards are classified correctly
  const groups = {
    "⚡ Combo Pieces": [], "🌿 Mana Dorks": [], "📚 Tutors": [],
    "🔄 Engines": [], "🌍 Lands": [], "🃏 Other": [],
  };
  dedupedCards.forEach(c => {
    const info = getCard(c); const tags = info?.tags || [];
    if (!info)                        groups["🃏 Other"].push(c);
    else if (info.type === "land")    groups["🌍 Lands"].push(c);
    else if (tags.includes("combo") || tags.includes("finisher") || tags.includes("recursion") || tags.includes("etb")) groups["⚡ Combo Pieces"].push(c);
    else if (tags.includes("dork") || tags.includes("big-dork")) groups["🌿 Mana Dorks"].push(c);
    else if (tags.includes("tutor"))  groups["📚 Tutors"].push(c);
    else if (tags.includes("engine") || tags.includes("draw") || tags.includes("enchantment")) groups["🔄 Engines"].push(c);
    else                              groups["🃏 Other"].push(c);
  });

  const [, forceGroupUpdate] = useState(0);

  const q = filter.toLowerCase();
  const unknown = cards.filter(c => c !== "Forest" && !CARDS[c] && !EXTRA_CARDS.has(c));

  const handleRemove = (name) => {
    const idx = cards.lastIndexOf(name);
    if (idx === -1) return;
    const next = [...cards]; next.splice(idx, 1);
    setCards(next); setDirty(true);
  };

  // Called when user saves a custom card definition — re-render to reflect new data
  const handleCardDefined = (name, entry) => {
    forceGroupUpdate(n => n + 1);
  };

  const handleAddChange = (v) => {
    setAddInput(v);
    if (v.length < 2) { setAddSuggs([]); return; }
    const q = v.toLowerCase();
    const matches = ALL_CARD_NAMES.filter(n => n.toLowerCase().includes(q));
    // Rank: exact prefix first, then word-boundary prefix, then substring
    matches.sort((a, b) => {
      const al = a.toLowerCase(), bl = b.toLowerCase();
      const aPrefix = al.startsWith(q), bPrefix = bl.startsWith(q);
      if (aPrefix !== bPrefix) return aPrefix ? -1 : 1;
      // Within prefix matches, shorter names first
      return a.length - b.length;
    });
    setAddSuggs(matches.slice(0, 6));
  };

  const handleAddCard = (name) => {
    setCards(prev => [...prev, name]);
    setAddInput(""); setAddSuggs([]); setDirty(true);
    addRef.current?.focus();
  };

  const handleSave = () => {
    if (onSave) onSave({ ...deck, cards });
    setDirty(false);
    setEditMode(false);
  };

  const handleDiscard = () => {
    setCards([...(deck.cards || [])]);
    setDirty(false); setEditMode(false);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "#000000dd", zIndex: 1100,
      display: "flex", alignItems: "center", justifyContent: "center",
    }} onClick={onClose}>
      <div style={{
        background: "#0d1f0d", border: `1px solid ${COLORS.green1}`,
        borderRadius: "10px", width: "min(720px, 96vw)", maxHeight: "88vh",
        display: "flex", flexDirection: "column", overflow: "hidden",
      }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ padding: "14px 18px 10px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: "14px", color: COLORS.text }}>{deck.name}</div>
            <div style={{ fontSize: "11px", color: COLORS.textDim, marginTop: "1px" }}>
              {cards.length} cards
              {unknown.length > 0 && <span style={{ color: "#e74c3c", marginLeft: "8px" }}>· {unknown.length} unknown</span>}
              {dirty && <span style={{ color: COLORS.green1, marginLeft: "8px" }}>· unsaved changes</span>}
            </div>
          </div>
          <input
            value={filter} onChange={e => setFilter(e.target.value)}
            placeholder="Filter cards…"
            style={{ background: "#0a150a", border: `1px solid ${COLORS.border}`, borderRadius: "4px", color: COLORS.text, fontFamily: "'Crimson Text', serif", fontSize: "13px", padding: "4px 9px", width: "140px", outline: "none" }}
          />
          {onSave && !editMode && (
            <button onClick={() => setEditMode(true)} style={{ background: "none", border: `1px solid ${COLORS.border}`, borderRadius: "4px", color: COLORS.textDim, cursor: "pointer", fontSize: "11px", padding: "4px 10px", fontFamily: "'Cinzel', serif", letterSpacing: "1px" }}>✏ EDIT</button>
          )}
          {editMode && dirty && (
            <button onClick={handleSave} style={{ background: "#1a3a1a", border: `1px solid ${COLORS.green1}`, borderRadius: "4px", color: COLORS.text, cursor: "pointer", fontSize: "11px", padding: "4px 10px", fontFamily: "'Cinzel', serif", letterSpacing: "1px" }}>✓ SAVE</button>
          )}
          {editMode && (
            <button onClick={handleDiscard} style={{ background: "none", border: `1px solid ${COLORS.border}`, borderRadius: "4px", color: COLORS.textDim, cursor: "pointer", fontSize: "11px", padding: "4px 10px", fontFamily: "'Cinzel', serif", letterSpacing: "1px" }}>DONE</button>
          )}
          <button onClick={onClose} style={{ background: "none", border: `1px solid ${COLORS.border}`, borderRadius: "4px", color: COLORS.textDim, cursor: "pointer", fontSize: "13px", padding: "4px 10px", flexShrink: 0 }}>✕</button>
        </div>

        {/* Add card row (edit mode only) */}
        {editMode && (
          <div style={{ padding: "8px 18px", borderBottom: `1px solid ${COLORS.border}`, position: "relative" }}>
            <input
              ref={addRef}
              value={addInput}
              onChange={e => handleAddChange(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && addSuggs[0]) handleAddCard(addSuggs[0]); if (e.key === "Escape") { setAddInput(""); setAddSuggs([]); } }}
              placeholder="Add a card by name…"
              style={{ width: "100%", background: "#0a150a", border: `1px solid ${COLORS.green1}55`, borderRadius: "5px", color: COLORS.text, fontFamily: "'Crimson Text', serif", fontSize: "13px", padding: "7px 12px", outline: "none", boxSizing: "border-box" }}
            />
            {addSuggs.length > 0 && (
              <div style={{ position: "absolute", left: "18px", right: "18px", top: "100%", background: "#0d1f0d", border: `1px solid ${COLORS.border}`, borderRadius: "5px", zIndex: 200, marginTop: "2px" }}>
                {addSuggs.map(s => (
                  <div key={s} onMouseDown={() => handleAddCard(s)} style={{ padding: "7px 12px", cursor: "pointer", color: COLORS.textMid, fontSize: "13px", fontFamily: "'Crimson Text', serif", borderBottom: `1px solid ${COLORS.border}` }}
                    onMouseEnter={e => e.currentTarget.style.background = "#1a3a1a"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >{s}{getCard(s) && <span style={{ marginLeft: "8px", fontSize: "11px", color: COLORS.textDim }}>{getCard(s).type} · CMC {getCard(s).cmc}</span>}</div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Card groups */}
        <div style={{ overflowY: "auto", padding: "14px 18px", flex: 1 }}>
          {Object.entries(groups).map(([groupName, groupCards]) => {
            const filtered = groupCards.filter(c => !q || c.toLowerCase().includes(q));
            if (filtered.length === 0) return null;
            return (
              <div key={groupName} style={{ marginBottom: "14px" }}>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "2px", color: COLORS.green1, marginBottom: "8px", textTransform: "uppercase" }}>
                  {groupName} <span style={{ color: COLORS.textDim, fontFamily: "'Crimson Text', serif", letterSpacing: 0, textTransform: "none", fontSize: "11px" }}>({filtered.length})</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {filtered.sort().map(c => (
                    <DeckCardChip
                      key={c} name={c} count={counts[c]}
                      isUnknown={c !== "Forest" && !CARDS[c] && !EXTRA_CARDS.has(c)}
                      isExternal={c !== "Forest" && !CARDS[c]}
                      editMode={editMode}
                      onRemove={editMode ? handleRemove : null}
                      onCardDefined={editMode ? handleCardDefined : null}
                    />
                  ))}
                </div>
              </div>
            );
          })}
          {filter && Object.values(groups).every(g => g.filter(c => c.toLowerCase().includes(q)).length === 0) && (
            <div style={{ color: COLORS.textDim, fontFamily: "'Crimson Text', serif", fontSize: "13px", textAlign: "center", marginTop: "20px" }}>No cards match "{filter}"</div>
          )}
        </div>
      </div>
    </div>
  );
}

function DeckCompareModal({ decks, onClose }) {
  const [deckAId, setDeckAId] = useState(decks[0]?.id || null);
  const [deckBId, setDeckBId] = useState(decks[1]?.id || null);
  const [groupBy, setGroupBy] = useState("diff"); // "diff" | "category"

  const deckA = decks.find(d => d.id === deckAId);
  const deckB = decks.find(d => d.id === deckBId);

  const setA = new Set(deckA?.cards || []);
  const setB = new Set(deckB?.cards || []);
  const allCards = [...new Set([...(deckA?.cards || []), ...(deckB?.cards || [])])].sort();

  const onlyA  = allCards.filter(c => setA.has(c) && !setB.has(c));
  const onlyB  = allCards.filter(c => setB.has(c) && !setA.has(c));
  const shared = allCards.filter(c => setA.has(c) && setB.has(c));

  const selStyle = { background: "#0a150a", border: `1px solid ${COLORS.border}`, borderRadius: "5px", color: COLORS.text, fontFamily: "'Cinzel', serif", fontSize: "11px", padding: "5px 10px", outline: "none", cursor: "pointer" };

  const CompareChip = ({ name, color, borderColor, label }) => {
    const [hovered, setHovered] = useState(false);
    const [rect, setRect] = useState(null);
    const ref = useRef(null);
    return (
      <div style={{ display: "inline-flex", flexDirection: "column", gap: "1px", margin: "2px", verticalAlign: "top" }}>
        <span ref={ref}
          onMouseEnter={() => { setRect(ref.current?.getBoundingClientRect()); setHovered(true); }}
          onMouseLeave={() => setHovered(false)}
          style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: color, border: `1px solid ${borderColor}`, borderRadius: "4px", padding: "3px 8px", color: COLORS.textMid, fontSize: "12px", fontFamily: "'Crimson Text', serif", cursor: "default", position: "relative" }}
        >
          {name}
          {label && <span style={{ fontSize: "9px", color: borderColor, marginLeft: "4px", letterSpacing: "0.5px" }}>{label}</span>}
          {hovered && <CardTooltip name={name} anchorRect={rect} />}
        </span>
      </div>
    );
  };

  const Section = ({ title, cards, color, borderColor, label, emptyMsg }) => {
    if (!cards.length) return <div style={{ color: COLORS.textDim, fontSize: "12px", fontStyle: "italic", marginBottom: "12px" }}>{emptyMsg}</div>;
    return (
      <div style={{ marginBottom: "16px" }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "2px", color, marginBottom: "8px" }}>
          {title} <span style={{ color: COLORS.textDim, fontFamily: "'Crimson Text', serif", letterSpacing: 0, textTransform: "none", fontSize: "11px" }}>({cards.length})</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {cards.map(c => <CompareChip key={c} name={c} color={color + "15"} borderColor={borderColor} label={label} />)}
        </div>
      </div>
    );
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000000dd", zIndex: 1200, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
      <div style={{ background: "#0d1f0d", border: `1px solid ${COLORS.green1}`, borderRadius: "10px", width: "min(820px, 96vw)", maxHeight: "88vh", display: "flex", flexDirection: "column", overflow: "hidden" }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ padding: "14px 18px 10px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: "13px", color: COLORS.text, letterSpacing: "1px", marginRight: "4px" }}>⚖ COMPARE</div>
          <select value={deckAId || ""} onChange={e => setDeckAId(e.target.value)} style={{ ...selStyle, borderColor: "#5dade266" }}>
            {decks.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          <span style={{ color: COLORS.textDim, fontSize: "13px" }}>vs</span>
          <select value={deckBId || ""} onChange={e => setDeckBId(e.target.value)} style={{ ...selStyle, borderColor: "#e74c3c66" }}>
            {decks.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", gap: "4px" }}>
            {["diff", "category"].map(m => (
              <button key={m} onClick={() => setGroupBy(m)} style={{ background: groupBy === m ? "#1a3a1a" : "none", border: `1px solid ${groupBy === m ? COLORS.green1 : COLORS.border}`, borderRadius: "4px", color: groupBy === m ? COLORS.text : COLORS.textDim, cursor: "pointer", fontSize: "10px", padding: "3px 9px", fontFamily: "'Cinzel', serif", letterSpacing: "1px" }}>
                {m === "diff" ? "BY DIFF" : "BY TYPE"}
              </button>
            ))}
          </div>
          <button onClick={onClose} style={{ background: "none", border: `1px solid ${COLORS.border}`, borderRadius: "4px", color: COLORS.textDim, cursor: "pointer", fontSize: "13px", padding: "4px 10px", flexShrink: 0 }}>✕</button>
        </div>

        {/* Stats bar */}
        {deckA && deckB && (
          <div style={{ padding: "8px 18px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", gap: "20px", fontSize: "11px", color: COLORS.textDim, fontFamily: "'Crimson Text', serif" }}>
            <span style={{ color: "#5dade2" }}>Only in {deckA.name}: <strong>{onlyA.length}</strong></span>
            <span style={{ color: "#58d68d" }}>Shared: <strong>{shared.length}</strong></span>
            <span style={{ color: "#e74c3c" }}>Only in {deckB.name}: <strong>{onlyB.length}</strong></span>
            <span>Total unique: <strong>{allCards.length}</strong></span>
          </div>
        )}

        <div style={{ overflowY: "auto", padding: "14px 18px", flex: 1 }}>
          {!deckA || !deckB ? (
            <div style={{ color: COLORS.textDim, textAlign: "center", padding: "30px" }}>Select two decks to compare.</div>
          ) : groupBy === "diff" ? (
            <>
              <Section title={`ONLY IN ${(deckA.name).toUpperCase()}`} cards={onlyA} color="#5dade2" borderColor="#5dade288" label="A only" emptyMsg={`${deckA.name} has no unique cards vs ${deckB.name}.`} />
              <Section title="SHARED BY BOTH" cards={shared} color="#58d68d" borderColor="#58d68844" emptyMsg="No cards in common." />
              <Section title={`ONLY IN ${(deckB.name).toUpperCase()}`} cards={onlyB} color="#e74c3c" borderColor="#e74c3c88" label="B only" emptyMsg={`${deckB.name} has no unique cards vs ${deckA.name}.`} />
            </>
          ) : (
            // By category, showing each card with color indicating which deck it belongs to
            (() => {
              const catGroups = { "⚡ Combo Pieces": [], "🌿 Mana Dorks": [], "📚 Tutors": [], "🔄 Engines": [], "🌍 Lands": [], "🃏 Other": [] };
              allCards.forEach(c => {
                const info = CARDS[c]; const tags = info?.tags || [];
                const membership = setA.has(c) && setB.has(c) ? "shared" : setA.has(c) ? "a" : "b";
                const entry = { name: c, membership };
                if (!info)                        catGroups["🃏 Other"].push(entry);
                else if (info.type === "land")    catGroups["🌍 Lands"].push(entry);
                else if (tags.includes("combo") || tags.includes("finisher") || tags.includes("recursion") || tags.includes("etb")) catGroups["⚡ Combo Pieces"].push(entry);
                else if (tags.includes("dork") || tags.includes("big-dork")) catGroups["🌿 Mana Dorks"].push(entry);
                else if (tags.includes("tutor"))  catGroups["📚 Tutors"].push(entry);
                else if (tags.includes("engine") || tags.includes("draw") || tags.includes("enchantment")) catGroups["🔄 Engines"].push(entry);
                else catGroups["🃏 Other"].push(entry);
              });
              return Object.entries(catGroups).map(([gName, entries]) => {
                if (!entries.length) return null;
                return (
                  <div key={gName} style={{ marginBottom: "16px" }}>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "2px", color: COLORS.green1, marginBottom: "8px" }}>{gName} ({entries.length})</div>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      {entries.map(({ name: c, membership }) => {
                        const color = membership === "shared" ? "#58d68d" : membership === "a" ? "#5dade2" : "#e74c3c";
                        const border = color + "77";
                        return <CompareChip key={c} name={c} color={color + "15"} borderColor={border} label={membership === "a" ? "A" : membership === "b" ? "B" : null} />;
                      })}
                    </div>
                  </div>
                );
              });
            })()
          )}
        </div>

        {/* Legend */}
        <div style={{ padding: "8px 18px", borderTop: `1px solid ${COLORS.border}`, display: "flex", gap: "16px", fontSize: "11px" }}>
          <span style={{ color: "#5dade2" }}>■ Only in A ({deckA?.name})</span>
          <span style={{ color: "#58d68d" }}>■ In both decks</span>
          <span style={{ color: "#e74c3c" }}>■ Only in B ({deckB?.name})</span>
        </div>
      </div>
    </div>
  );
}

function DeckManager({ decks, activeDeckId, onSaveDecks, onSetActive, onClose }) {
  const [showImport, setShowImport]     = useState(false);
  const [importText, setImportText]     = useState("");
  const [viewingDeck, setViewingDeck]   = useState(null);
  const [showCompare, setShowCompare]   = useState(false);
  const [importName, setImportName]     = useState("");
  const [importError, setImportError]   = useState("");
  const [saveStatus, setSaveStatus]     = useState(""); // "" | "saving" | "saved" | "error"
  // Scryfall enrichment: deckId → "idle"|"fetching"|"done"|"partial"|"failed"
  const [enrichStatus, setEnrichStatus] = useState({});
  const [, forceEnrichUpdate] = useState(0);

  // Auto-enrich any deck that has unknown cards not yet in EXTRA_CARDS
  useEffect(() => {
    for (const deck of (decks || [])) {
      const unknowns = deck.cards.filter(c => !CARDS[c] && !EXTRA_CARDS.has(c));
      if (unknowns.length === 0) continue;
      if (enrichStatus[deck.id] === "fetching") continue;
      setEnrichStatus(prev => ({ ...prev, [deck.id]: "fetching" }));
      enrichUnknownCards([...new Set(unknowns)]).then(({ enriched, failed }) => {
        const status = failed.size === 0 ? "done"
          : enriched.size === 0 ? "failed" : "partial";
        setEnrichStatus(prev => ({ ...prev, [deck.id]: status }));
        forceEnrichUpdate(n => n + 1); // re-render to pick up new EXTRA_CARDS entries
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decks]);

  const deleteDeck = (id) => {
    onSaveDecks((decks || []).filter(d => d.id !== id));
    if (activeDeckId === id) onSetActive(null);
  };

  const handleDeckSave = async (updatedDeck) => {
    const newDecks = (decks || []).map(d => d.id === updatedDeck.id ? updatedDeck : d);
    await onSaveDecks(newDecks);
    setViewingDeck(updatedDeck); // keep modal open with fresh data
  };

  const handleImport = async () => {
    setImportError("");
    const cards = parseDecklist(importText);
    if (cards.length === 0) { setImportError("No recognisable cards found."); return; }
    const name = importName.trim() || "Imported Deck";
    const id = "deck-" + Date.now();
    const newDecks = [...(decks || []), { id, name, cards }];
    setSaveStatus("saving");
    const result = await storage.set("yeva-decks", JSON.stringify(newDecks));
    onSaveDecks(newDecks);
    if (result) {
      setSaveStatus("saved");
      setImportText(""); setImportName("");
      setTimeout(() => { setSaveStatus(""); setShowImport(false); }, 800);
    } else {
      setSaveStatus("error");
      setImportError("Storage unavailable — deck saved for this session only.");
    }
  };

  const btnStyle = (active) => ({
    padding: "5px 14px", borderRadius: "4px", cursor: "pointer",
    fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "1px",
    background: active ? "#1a3a1a" : "none",
    border: `1px solid ${active ? COLORS.green1 : COLORS.border}`,
    color: active ? COLORS.text : COLORS.textDim,
  });

  return (
    <div style={{
      position: "fixed", inset: 0, background: "#000000cc",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000,
    }} onClick={onClose}>
      <div style={{
        background: COLORS.bgCard, border: `1px solid ${COLORS.border}`,
        borderRadius: "12px", padding: "24px", width: "500px", maxHeight: "80vh",
        overflowY: "auto", boxShadow: "0 8px 40px #000a",
      }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: "15px", color: COLORS.gold, flex: 1, letterSpacing: "2px" }}>
            📚 DECK MANAGER
          </div>
          {!showImport && (decks||[]).length >= 2 && (
            <button onClick={() => setShowCompare(true)} style={{ ...btnStyle(false), marginRight: "6px" }}>⚖ COMPARE</button>
          )}
          {!showImport && (
            <button onClick={() => setShowImport(true)} style={{ ...btnStyle(false), marginRight: "10px" }}>+ IMPORT</button>
          )}
          <button onClick={onClose} style={{ background: "none", border: "none", color: COLORS.textDim, cursor: "pointer", fontSize: "18px", flexShrink: 0 }}>✕</button>
        </div>

        {/* IMPORT FORM */}
        {showImport ? (
          <div>
            <div style={{ fontSize: "12px", color: COLORS.textDim, marginBottom: "12px" }}>
              Paste a decklist from Moxfield, Archidekt, or any standard format (e.g. "1 Llanowar Elves").
            </div>
            <input
              value={importName}
              onChange={e => setImportName(e.target.value)}
              placeholder="Deck name…"
              style={{ width: "100%", background: "#07100788", border: `1px solid ${COLORS.border}`, borderRadius: "6px", padding: "8px 12px", color: COLORS.text, fontFamily: "'Crimson Text', serif", fontSize: "13px", outline: "none", marginBottom: "10px" }}
            />
            <textarea
              value={importText}
              onChange={e => setImportText(e.target.value)}
              placeholder={"1 Llanowar Elves\n1 Quirion Ranger\n1 Ashaya, Soul of the Wild\n..."}
              rows={10}
              style={{ width: "100%", background: "#07100788", border: `1px solid ${COLORS.border}`, borderRadius: "6px", padding: "8px 12px", color: COLORS.text, fontFamily: "'Crimson Text', serif", fontSize: "12px", outline: "none", resize: "vertical", lineHeight: 1.6 }}
            />
            {importError && <div style={{ color: "#e74c3c", fontSize: "12px", marginTop: "6px" }}>{importError}</div>}
            <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
              <button onClick={handleImport} style={{ ...btnStyle(true), padding: "8px 20px" }}>
                {saveStatus === "saving" ? "SAVING…" : saveStatus === "saved" ? "✓ SAVED" : "IMPORT DECK"}
              </button>
              <button onClick={() => { setShowImport(false); setImportError(""); setSaveStatus(""); }} style={{ ...btnStyle(false), padding: "8px 16px" }}>CANCEL</button>
            </div>
          </div>
        ) : (
          /* DECK LIST */
          <div>
            <div style={{ fontSize: "12px", color: COLORS.textDim, marginBottom: "12px" }}>
              Choose a deck to filter advice — only cards in the selected deck will appear in suggestions.
            </div>

            {/* No filter option */}
            <div onClick={() => { onSetActive(null); onClose(); }} style={{
              padding: "10px 14px", borderRadius: "6px", cursor: "pointer",
              marginBottom: "8px",
              background: activeDeckId === null ? "#1a3a1a" : "#0a150a",
              border: `1px solid ${activeDeckId === null ? COLORS.green1 : COLORS.border}`,
              display: "flex", alignItems: "center", gap: "10px",
            }}>
              <span style={{ fontSize: "16px" }}>🌿</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: "12px", color: activeDeckId === null ? COLORS.text : COLORS.textMid }}>No Filter</div>
                <div style={{ fontSize: "11px", color: COLORS.textDim }}>All cards valid — full advice</div>
              </div>
              {activeDeckId === null && <span style={{ color: COLORS.green1 }}>✓</span>}
            </div>

            {/* Built-in decks — always visible */}
            {PRESET_DECKS.map(deck => {
              const isActive = activeDeckId === deck.id;
              return (
              <div key={deck.id} style={{
                padding: "10px 14px", borderRadius: "6px", marginBottom: "8px",
                background: isActive ? "#1a3a1a" : "#0a150a",
                border: `1px solid ${isActive ? COLORS.green1 : COLORS.border}`,
                display: "flex", alignItems: "center", gap: "10px",
              }}>
                <div onClick={() => { onSetActive(deck.id); onClose(); }} style={{ flex: 1, display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                  <span style={{ fontSize: "16px" }}>⭐</span>
                  <div>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: "12px", color: isActive ? COLORS.text : COLORS.textMid }}>{deck.name}</div>
                    <div style={{ fontSize: "11px", color: COLORS.textDim }}>{deck.cards.length} cards · built-in</div>
                  </div>
                  {isActive && <span style={{ color: COLORS.green1 }}>✓</span>}
                </div>
                <button onClick={(e) => { e.stopPropagation(); setViewingDeck(deck); }} style={{ background: "none", border: `1px solid ${COLORS.border}`, borderRadius: "4px", padding: "3px 8px", color: COLORS.textDim, cursor: "pointer", fontSize: "11px" }}>👁</button>
              </div>
            )})}

            {/* User decks */}
            {(decks || []).filter(d => !PRESET_DECKS.some(p => p.id === d.id)).length > 0 && (
              <div style={{ fontSize: "9px", color: COLORS.textDim, fontFamily: "'Cinzel', serif", letterSpacing: "1.5px", marginBottom: "6px", marginTop: "4px" }}>MY DECKS</div>
            )}
            {(decks || []).filter(d => !PRESET_DECKS.some(p => p.id === d.id)).map(deck => {
              const unknownCards = deck.cards.filter(c => !CARDS[c] && !EXTRA_CARDS.has(c));
              const enrichedCards = deck.cards.filter(c => !CARDS[c] && EXTRA_CARDS.has(c));
              const es = enrichStatus[deck.id];
              return (
              <div key={deck.id} style={{
                padding: "10px 14px", borderRadius: "6px",
                marginBottom: "8px",
                background: activeDeckId === deck.id ? "#1a3a1a" : "#0a150a",
                border: `1px solid ${activeDeckId === deck.id ? COLORS.green1 : COLORS.border}`,
                display: "flex", alignItems: "center", gap: "10px",
              }}>
                <div onClick={() => { onSetActive(deck.id); onClose(); }} style={{ flex: 1, display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                  <span style={{ fontSize: "16px" }}>🃏</span>
                  <div>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: "12px", color: activeDeckId === deck.id ? COLORS.text : COLORS.textMid }}>{deck.name}</div>
                    <div style={{ fontSize: "11px", color: COLORS.textDim }}>
                      {deck.cards.length} cards
                      {es === "fetching" && (
                        <span style={{ color: COLORS.blue, marginLeft: "6px" }}>· ⏳ looking up {unknownCards.length} unknown…</span>
                      )}
                      {(es === "done") && enrichedCards.length > 0 && (
                        <span style={{ color: COLORS.green2, marginLeft: "6px" }}>· ✓ {enrichedCards.length} enriched via Scryfall</span>
                      )}
                      {es === "partial" && (
                        <span style={{ color: COLORS.gold, marginLeft: "6px" }}>· ⚠ {enrichedCards.length} enriched, {unknownCards.length} not found</span>
                      )}
                      {es === "failed" && unknownCards.length > 0 && (
                        <span style={{ color: "#e74c3c", marginLeft: "6px" }}>· ✕ {unknownCards.length} unknown (Scryfall unavailable)</span>
                      )}
                      {!es && unknownCards.length > 0 && (
                        <span style={{ color: "#e74c3c", marginLeft: "6px" }}>· {unknownCards.length} unknown</span>
                      )}
                    </div>
                  </div>
                  {activeDeckId === deck.id && <span style={{ color: COLORS.green1 }}>✓</span>}
                </div>
                <button onClick={(e) => { e.stopPropagation(); setViewingDeck(deck); }} style={{ background: "none", border: `1px solid ${COLORS.border}`, borderRadius: "4px", padding: "3px 8px", color: COLORS.textDim, cursor: "pointer", fontSize: "11px" }}>👁</button>
                <button onClick={() => deleteDeck(deck.id)} style={{ background: "none", border: `1px solid #5a1a1a`, borderRadius: "4px", padding: "3px 8px", color: "#e74c3c88", cursor: "pointer", fontSize: "11px" }}>✕</button>
              </div>
            )})}
          </div>
        )}
      </div>
      {viewingDeck && <DeckDetailModal deck={viewingDeck} onSave={handleDeckSave} onClose={() => setViewingDeck(null)} />}
      {showCompare && (decks||[]).length >= 2 && <DeckCompareModal decks={decks} onClose={() => setShowCompare(false)} />}
    </div>
  );
}


// ── Saved Board States ────────────────────────────────────────────────────────
function useSavedStates() {
  const [states, setStates] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const saved = await storage.get("yeva-saved-states");
        setStates(saved ? JSON.parse(saved.value) : []);
      } catch { setStates([]); }
    })();
  }, []);
  const save = async (newStates) => {
    setStates(newStates);
    await storage.set("yeva-saved-states", JSON.stringify(newStates));
  };
  return { states, save };
}

// ── HelpModal ──────────────────────────────────────────────────────────────────
function HelpModal({ onClose, onStartTour }) {
  const [tab, setTab] = useState("overview");
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") { e.stopPropagation(); onClose(); } };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const TABS = [
    { id: "overview",   label: "Overview" },
    { id: "advisor",    label: "Advisor" },
    { id: "goldfish",   label: "Goldfish" },
    { id: "shortcuts",  label: "Shortcuts" },
    { id: "combos",     label: "Combos" },
    { id: "tour",       label: "Tour" },
    { id: "changelog",  label: "What's New" },
  ];

  const H = ({ children }) => (
    <div style={{ fontSize: "10px", letterSpacing: "2px", color: COLORS.green3, fontFamily: "'Cinzel', serif", marginTop: "20px", marginBottom: "8px", borderBottom: `1px solid ${COLORS.border}`, paddingBottom: "4px" }}>{children}</div>
  );
  const P = ({ children }) => (
    <p style={{ fontSize: "13px", color: COLORS.textMid, fontFamily: "'Crimson Text', serif", lineHeight: 1.65, marginBottom: "10px" }}>{children}</p>
  );
  const Key = ({ k }) => (
    <span style={{ display: "inline-block", background: "#1a2e1a", border: `1px solid ${COLORS.border}`, borderRadius: "4px", padding: "1px 6px", fontSize: "11px", fontFamily: "monospace", color: COLORS.green1, margin: "0 2px" }}>{k}</span>
  );
  const Row = ({ keys, desc }) => (
    <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "7px" }}>
      <div style={{ minWidth: "120px", flexShrink: 0 }}>{keys.map((k,i) => <Key key={i} k={k} />)}</div>
      <div style={{ fontSize: "13px", color: COLORS.textMid, fontFamily: "'Crimson Text', serif" }}>{desc}</div>
    </div>
  );
  const Tip = ({ label, children }) => (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ fontSize: "11px", color: COLORS.green2, fontFamily: "'Cinzel', serif", marginBottom: "3px" }}>{label}</div>
      <div style={{ fontSize: "13px", color: COLORS.textMid, fontFamily: "'Crimson Text', serif", lineHeight: 1.6, paddingLeft: "8px", borderLeft: `2px solid ${COLORS.border}` }}>{children}</div>
    </div>
  );

  const content = {
    overview: (
      <>
        <H>WHAT IS YEVA ADVISOR?</H>
        <P>Yeva Advisor is a deck-building and play assistant for a green combo Commander deck built around Yeva, Nature's Herald. It analyses your current game state and recommends lines of play, tracks combos, and lets you golfish to test your draws.</P>
        <H>MAIN PANELS</H>
        <Tip label="Input Panel (left)">Enter the cards in your hand, battlefield, and graveyard. The advisor analyses your position in real time as you type. Use the zone tabs to switch between Hand, Battlefield, and Graveyard.</Tip>
        <Tip label="Advice Panel (right)">Shows the best available lines of play ranked by priority. WIN NOW lines are always shown first. Each line lists the cards required and a step-by-step description.</Tip>
        <Tip label="Mana Available">Set how much mana you currently have floating. The advisor uses this to filter which lines are immediately executable vs. requiring more mana.</Tip>
        <H>GETTING STARTED</H>
        <P>1. Load or build a deck using the DECKS button. 2. Enter your current board state in the input panel. 3. Set your available mana and whose turn it is. 4. Read the recommendations in the advice panel.</P>
      </>
    ),
    advisor: (
      <>
        <H>ENTERING CARDS</H>
        <Tip label="Autocomplete">Start typing a card name — suggestions appear from the deck list. Press Enter or click to add. Tab moves between zones.</Tip>
        <Tip label="Zone inputs">Hand cards are what you're holding. Battlefield is everything you control face-up. Graveyard is your discard pile. Cards moved to the wrong zone will give incorrect advice.</Tip>
        <Tip label="Quick-add buttons">Small shortcut buttons above each zone let you add commonly needed cards without typing the full name.</Tip>
        <H>READING ADVICE</H>
        <Tip label="WIN NOW">You have everything needed to win this turn. Follow the steps exactly.</Tip>
        <Tip label="WIN NEXT TURN">One more turn of setup gives you the win. The listed cards are what you still need.</Tip>
        <Tip label="STRONG / GOOD / SETUP">Prioritised lines to develop your board. Strong lines are worth pursuing even if not immediately winning.</Tip>
        <Tip label="Infinite mana indicator">The ∞ badge appears when the advisor detects you have an active infinite mana loop on board.</Tip>
        <H>OTHER FEATURES</H>
        <Tip label="Synergy Map (⬡ SYNERGY)">Visual graph showing how cards in your deck connect to combos and each other. Filter by card type or zoom to a specific card.</Tip>
        <Tip label="Saved States (📌 STATES)">Save a snapshot of your current board state and reload it later. Useful for testing different lines from the same position.</Tip>
        <Tip label="Export from Goldfish">The ↗ EXPORT button in Goldfish mode sends your current board state directly into the advisor panel.</Tip>
      </>
    ),
    goldfish: (
      <>
        <H>WHAT IS GOLDFISH MODE?</H>
        <P>Goldfish mode simulates playing the deck alone — no opponent — to test how consistently it assembles its combo. You draw opening hands, play through turns, and track milestones.</P>
        <H>PLAYING A GAME</H>
        <Tip label="Opening hand">You start with 7 cards. Click KEEP to keep the hand or MULLIGAN to take a new one (one fewer card each time). Cards sent to the bottom are chosen before you see the new hand.</Tip>
        <Tip label="Playing cards">Click any card in your hand to play it. Lands go to the battlefield, instants/sorceries go to the graveyard. The land-played indicator shows whether you've played your land for the turn.</Tip>
        <Tip label="Tapping permanents">Click a card on the battlefield to tap or untap it. Mana-producing cards automatically update the mana pool. The pool badge shows your current floating mana.</Tip>
        <Tip label="Mana pool">The pool tracks mana as you tap sources and cast spells. Use − and + to adjust manually. It resets to 0 at the start of each turn.</Tip>
        <Tip label="Context menu">Right-click any card to move it between zones, crack fetch lands, or access other actions.</Tip>
        <H>CONTROLS STRIP</H>
        <Tip label="▶ NEXT TURN">Untaps all permanents, draws a card, advances the turn counter, and resets the mana pool.</Tip>
        <Tip label="↺ UNTAP">Untaps all permanents without advancing the turn. Use this mid-turn for Wirewood Lodge effects.</Tip>
        <Tip label="🔍 TUTOR">Search your library by card name, type, or tag (e.g. type 'dork' to find all mana creatures).</Tip>
        <Tip label="⚡ TAP ALL">Taps all untapped mana sources at once and fills the pool to its maximum for the turn.</Tip>
        <Tip label="↩ UNDO">Reverts the last action. Up to 20 levels of undo are stored per game.</Tip>
        <Tip label="👁 SCRY">Look at the top cards of your library and choose which to keep on top or send to the bottom.</Tip>
        <Tip label="🌿 YEVA">Cast Yeva from the command zone. Tax increases by 2 each time she's cast.</Tip>
        <H>STATISTICS</H>
        <Tip label="Game log">The right panel records every action taken this game. Scroll down to see earlier turns.</Tip>
        <Tip label="★ END GAME">Records the game result, turn count, milestones, and opening hand. Adds to your stats history.</Tip>
        <Tip label="★ STATS">Shows win rate, average turn, mana curve, and win condition breakdown across all recorded games for this deck.</Tip>
        <Tip label="📼 Replay">Each completed game stores a full replay. Click the 📼 icon in the stats table to step through it turn by turn.</Tip>
        <Tip label="Auto-simulate">Set a game count and run hundreds of simulated games automatically to see statistical win rates without playing manually.</Tip>
      </>
    ),
    shortcuts: (
      <>
        <H>GOLDFISH MODE — KEYBOARD SHORTCUTS</H>
        <Row keys={["N"]} desc="Next turn — untap, draw, advance turn counter" />
        <Row keys={["U"]} desc="Untap all permanents" />
        <Row keys={["T"]} desc="Open tutor search" />
        <Row keys={["D"]} desc="Draw one card" />
        <Row keys={["M"]} desc="Tap all mana sources" />
        <Row keys={["Ctrl", "Z"]} desc="Undo last action" />
        <Row keys={["Esc"]} desc="Close any open overlay or sub-modal" />
        <H>TUTOR SEARCH</H>
        <Row keys={["↑ ↓"]} desc="Navigate results (Enter to tutor)" />
        <Row keys={["Esc"]} desc="Close tutor without tutoring" />
        <H>REPLAY VIEWER</H>
        <Row keys={["←"]} desc="Previous turn snapshot" />
        <Row keys={["→"]} desc="Next turn snapshot" />
        <Row keys={["Esc"]} desc="Close replay" />
        <H>MAIN ADVISOR</H>
        <Row keys={["Shift", "S"]} desc="Open Saved States panel" />
        <Row keys={["Tab"]} desc="Cycle focus between zone inputs" />
        <Row keys={["Esc"]} desc="Close any open modal" />
      </>
    ),
    combos: (
      <>
        <H>INFINITE MANA LOOPS</H>
        <Tip label="Priest / Archdruid + Wirewood Lodge">Tap a big elf dork (Priest of Titania, Elvish Archdruid) for N mana. Pay {"{G}"} to use Lodge to untap it. Net N−1 mana per loop. Requires N ≥ 2 elves in play.</Tip>
        <Tip label="Argothian Elder + Wirewood Lodge + Big Land">Tap a land producing ≥2 mana (Cradle, Nykthos, enchanted Forest). Elder untaps that land and Lodge. Lodge untaps Elder. Net mana each loop.</Tip>
        <Tip label="Earthcraft + Squirrel Nest">Tap a creature to untap a basic Forest via Earthcraft. Forest creates a Squirrel token via Nest. Tap Squirrel to untap Forest again. Infinite creatures and mana.</Tip>
        <Tip label="Ashaya + Quirion Ranger / Scryb Ranger">With Ashaya, creatures are Forests. Bounce a creature to hand to untap a Forest (which is another creature). Return it to play. Generates mana each loop with a mana dork involved.</Tip>
        <H>WIN CONDITIONS</H>
        <Tip label="Thassa's Oracle">With infinite mana and a tutor chain, draw your entire deck. Cast Oracle with an empty library for an immediate win.</Tip>
        <Tip label="Duskwatch Recruiter">With infinite mana, activate repeatedly to draw every creature from your deck. Win with an arbitrarily large board.</Tip>
        <Tip label="Walking Ballista">With infinite mana, cast for X=∞ and deal infinite damage to each opponent.</Tip>
        <Tip label="Natural Order / Green Sun's Zenith">With enough mana, tutor directly for Craterhoof Behemoth or another finisher. GSZ shuffles back and can be cast again.</Tip>
        <H>KEY SYNERGIES</H>
        <Tip label="Yavimaya, Cradle of Growth">Makes all lands Forests. Enables Arbor Elf to untap any land, dramatically expanding the mana available per turn.</Tip>
        <Tip label="Utopia Sprawl / Wild Growth">Enchant a Forest to tap for an extra mana. With Arbor Elf, each untap of the enchanted land produces bonus mana.</Tip>
        <Tip label="Gaea's Cradle / Itlimoc">Taps for mana equal to the number of creatures you control. Goes infinite with any untap effect and enough creatures.</Tip>
      </>
    ),
    tour: (
      <>
        <H>INTERACTIVE TOUR</H>
        <P>The guided tour walks through the main interface step by step, highlighting each area and explaining what it does. It takes about a minute and covers all the key panels.</P>
        <P>The tour closes this manual and starts on the main advisor screen. You can skip it at any time by pressing the Skip button.</P>
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <button onClick={onStartTour} style={{
            background: "#1a3a1a", border: `2px solid ${COLORS.green1}`, borderRadius: "8px",
            padding: "12px 32px", color: COLORS.green1, cursor: "pointer",
            fontFamily: "'Cinzel', serif", fontSize: "13px", letterSpacing: "2px",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#1f4a1f"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#1a3a1a"; e.currentTarget.style.color = COLORS.green1; }}
          >▶ START GUIDED TOUR</button>
          <div style={{ marginTop: "12px", fontSize: "11px", color: COLORS.textDim, fontFamily: "'Crimson Text', serif" }}>
            Closes this manual and begins the tour on the main screen
          </div>
        </div>
      </>
    ),
    changelog: (() => {
      const versions = [
        {
          version: "1.8.0", date: "2026-03-06", title: "Advisor Intelligence & Card Coverage",
          added: [
            "Advice for 20+ previously unrecognised cards: Joraga Treespeaker (level-up advice + loop thresholds), Wirewood Channeler (elf-count output), Defiler of Vigor (storm-win outlet with infinite mana), Agatha's Soul Cauldron (graveyard dork recycling), Beastrider Vanguard (infinite mana outlet), Carpet of Flowers (meta ramp), Emerald Medallion (loop threshold impact), Runic Armasaur (flash-in vs activated-ability commanders)",
            "Draw engine awareness: Sylvan Library (draw-3 with life trade-offs), Guardian Project (triggers when creatures in hand), Bonders' Enclave (activation advice when power-4 creature on board)",
            "Removal suite advice: Nature's Claim, Ram Through, Tail Swipe, Bouncer's Beatdown, Kenrith's Transformation, Reclamation Sage, Outland Liberator, Manglehorn, Warping Wail, Insidious Fungus — all now surface contextually when threats are present or instant-speed matters",
            "Protection spells: Veil of Summer and Autumn's Veil now appear as hold-up advice with mana thresholds",
            "Graveyard recursion: Noxious Revival (free instant recovery or disruption), Skullwinder (ETB recursion when key piece in graveyard), Scavenging Ooze (activation + infinite mana → lethal path)",
            "62 Commander Spellbook combos now have explicit named entries (previously only covered generically via flags)",
            "Auto-simulate run button fixed — selectBottomsFromScored was defined inside GoldfishModal closure, making it inaccessible to the module-level runNGames function",
          ],
          fixed: [
            "Fierce Empath, Regal Force, Heartwood Storyteller now fire on opponent's turn when Yeva is available (were incorrectly restricted to isMyTurn only)",
            "Endurance castable check now includes Yeva from command zone (it has native flash — command zone Yeva is sufficient)",
            "Full-hand win path (Yeva → Ashaya + Argothian Elder → infinite → Formidable Speaker → Duskwatch) now correctly detects on opponent's turn with 23+ mana",
            "Formidable Speaker win suppression no longer fires when Ashaya + Argothian Elder are in hand with sufficient mana",
            "Infinite mana already active + Formidable Speaker in hand now correctly fires ⚡ CAST TO WIN (no Ranger loop needed — single ETB fetches Duskwatch directly)",
            "Full-hand win path mana threshold: 12 on opponent's turn without flash (was incorrectly using 8 in suppression check)",
          ],
        },
        {
          version: "1.7.0", date: "2026-03-06", title: "Help System & Polish",
          added: [
            "In-app manual (? button) with tabbed sections: Overview, Advisor, Goldfish, Shortcuts, Combos, Tour, What's New",
            "Tooltips on all main header buttons and goldfish control buttons",
          ],
          fixed: [
            "Escape in tutor overlay no longer closes entire Goldfish modal",
            "Escape now consistently closes Synergy Map modal",
            "Close (✕) buttons pinned absolutely to top-right of modal headers — no longer wrap on small screens",
          ],
        },
        {
          version: "1.6.0", date: "2026-03-06", title: "Goldfish Productivity",
          added: [
            "Undo system — up to 20 levels; Ctrl+Z shortcut and ↩ UNDO button",
            "Wirewood Lodge untap targeting modal — pick which elf to untap",
            "Mana pool delta flash — +N / −N animates above pool badge on change",
            "⚡ TAP ALL MANA — one click taps every mana source on the battlefield",
            "Keyboard shortcuts: N next turn, U untap, T tutor, D draw, M tap all, Ctrl+Z undo, Esc close",
            "Tutor search by type/tag — type 'dork', 'tutor', 'land' etc. to filter results",
            "Gamestate breadcrumb — turn · mana · elves · dorks · tutors · combo pieces",
          ],
        },
        {
          version: "1.5.0", date: "2026-03-05", title: "Replay, Mana Pool & Card Images",
          added: [
            "Game replay viewer — step through any completed game turn by turn with card images",
            "Win combo tracking — winning combo line recorded and shown in stats",
            "Mana pool tracker — auto-increments on tap, auto-decrements on cast; resets each turn",
            "Mana curve and win condition breakdown charts in stats panel",
          ],
          fixed: [
            "Per-card mana calculation overhauled — Utopia Sprawl and Arbor Elf now calculated correctly",
          ],
        },
        {
          version: "1.4.0", date: "2026-03-05", title: "Mobile Layout & Drag-Drop",
          added: [
            "Mobile responsive layout for goldfish — tab bar replaces side panels below 700px",
            "Drag-and-drop between any zones in goldfish mode",
          ],
          fixed: [
            "Green Sun's Zenith mana check corrected; GSZ now shuffles back into library",
            "Commander (Yeva) excluded from library in goldfish",
            "SSR/hydration crash on initial render fixed",
          ],
        },
        {
          version: "1.3.0", date: "2026-03-05", title: "Auto-Simulation & Scryfall",
          added: [
            "Run N Games — automated simulator plays N games and reports win rates, bottlenecks, turn distribution",
            "Scryfall auto-enrichment — unknown cards get type and CMC from Scryfall on import",
          ],
          fixed: [
            "Rules of Hooks violation (useState inside IIFE) — hoisted to component top",
            "Stats persistence fixed outside Claude artifact environment",
          ],
        },
        {
          version: "1.2.0", date: "2026-03-05", title: "Statistics & Hand Grader",
          added: [
            "Persistent game statistics — win rate, average win turn, milestones per deck",
            "Hand grader — A–F grade with reasoning during mulligan, advisor-enriched",
            "Stats panel — game history table, win rates by turn, milestone breakdown",
          ],
        },
        {
          version: "1.1.0", date: "2026-03-04", title: "Goldfish Mode",
          added: [
            "Full solo play simulation (Goldfish mode) with London mulligan",
            "Tap/untap, counters, scry, fetch cracking, context menus, cast from hand",
            "Commander tax tracking for Yeva",
            "77-test harness (node yeva-advisor.test.js)",
          ],
        },
        {
          version: "1.0.0", date: "2026-03-04", title: "Initial Release",
          added: [
            "Core advisor engine with 43 combo definitions",
            "Deck management with import, editor, comparison, and preset decks",
            "Synergy map, saved states, guided tutorial tour",
            "Scryfall card image tooltips on all card names",
          ],
        },
      ];

      return (
        <>
          {versions.map(v => (
            <div key={v.version} style={{ marginBottom: "20px", paddingBottom: "16px", borderBottom: `1px solid ${COLORS.border}` }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "8px", marginTop: "16px" }}>
                <span style={{ fontSize: "12px", fontFamily: "'Cinzel', serif", color: COLORS.green2, letterSpacing: "1px" }}>v{v.version}</span>
                <span style={{ fontSize: "11px", color: COLORS.textDim, fontFamily: "'Crimson Text', serif" }}>{v.date}</span>
                <span style={{ fontSize: "11px", color: COLORS.textMid, fontFamily: "'Cinzel', serif", letterSpacing: "1px" }}>— {v.title.toUpperCase()}</span>
              </div>
              {v.added && v.added.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "5px", paddingLeft: "8px" }}>
                  <span style={{ color: COLORS.green1, fontSize: "11px", flexShrink: 0, marginTop: "2px" }}>+</span>
                  <span style={{ fontSize: "13px", color: COLORS.textMid, fontFamily: "'Crimson Text', serif", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
              {v.fixed && v.fixed.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "5px", paddingLeft: "8px" }}>
                  <span style={{ color: COLORS.blue, fontSize: "11px", flexShrink: 0, marginTop: "2px" }}>✦</span>
                  <span style={{ fontSize: "13px", color: COLORS.textMid, fontFamily: "'Crimson Text', serif", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
          <div style={{ fontSize: "11px", color: COLORS.textDim, fontFamily: "'Crimson Text', serif", fontStyle: "italic", textAlign: "center", paddingTop: "8px" }}>
            + added &nbsp;·&nbsp; ✦ fixed/changed
          </div>
        </>
      );
    })(),
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000000dd", zIndex: 3000, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }} onClick={onClose}>
      <div style={{ background: COLORS.bg, border: `1px solid ${COLORS.borderBright}`, borderRadius: "12px", width: "100%", maxWidth: "680px", maxHeight: "88vh", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ padding: "14px 52px 14px 20px", borderBottom: `1px solid ${COLORS.border}`, flexShrink: 0, position: "relative" }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: "13px", color: COLORS.green3, letterSpacing: "2px" }}>📖 YEVA ADVISOR — MANUAL</div>
          <div style={{ fontSize: "11px", color: COLORS.textDim, fontFamily: "'Crimson Text', serif", marginTop: "2px" }}>Green Combo Commander · Esc to close</div>
          <button onClick={onClose} style={{ position: "absolute", top: "10px", right: "12px", background: "none", border: `1px solid ${COLORS.border}`, borderRadius: "6px", padding: "4px 10px", color: COLORS.textDim, cursor: "pointer", fontFamily: "'Cinzel', serif", fontSize: "12px" }}>✕</button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: `1px solid ${COLORS.border}`, flexShrink: 0, overflowX: "auto" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              background: tab === t.id ? "#0d1f0d" : "none",
              border: "none", borderBottom: tab === t.id ? `2px solid ${COLORS.green1}` : "2px solid transparent",
              padding: "8px 16px", color: tab === t.id ? COLORS.green1 : COLORS.textDim,
              cursor: "pointer", fontFamily: "'Cinzel', serif", fontSize: "10px",
              letterSpacing: "1.5px", flexShrink: 0, transition: "all 0.15s",
            }}>{t.label.toUpperCase()}</button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "4px 24px 24px" }}>
          {content[tab]}
        </div>
      </div>
    </div>
  );
}


// ── SynergyMapModal ───────────────────────────────────────────────────────────
// Force-directed graph showing card ↔ combo relationships.
// Cards = circular nodes (sized by centrality). Combos = pill nodes (colored by type).
// Click any node to highlight its connections. Filter by combo type. Matrix toggle.

const TYPE_COLORS = {
  "infinite-mana": "#58d68d",
  "win-mill":      "#ff6b35",
  "win-combat":    "#e74c3c",
  "win-poison":    "#27ae60",
  "win-draw":      "#5dade2",
  "win-now":       "#f1c40f",
  "engine":        "#a569bd",
};
const TYPE_LABELS = {
  "infinite-mana": "∞ Mana",
  "win-mill":      "Mill Win",
  "win-combat":    "Combat Win",
  "win-poison":    "Poison Win",
  "win-draw":      "Draw Win",
  "win-now":       "Win Now",
  "engine":        "Engine",
};

// ── SynergyMapModal — pure React/SVG force graph, no external dependencies ───

function useForceGraph(nodeList, linkList, width, height, enabled) {
  const [positions, setPositions] = useState(() => {
    const pos = {};
    nodeList.forEach((n, i) => {
      const angle = (i / nodeList.length) * 2 * Math.PI;
      const r = Math.min(width, height) * 0.28;
      pos[n.id] = { x: width/2 + r * Math.cos(angle), y: height/2 + r * Math.sin(angle) };
    });
    return pos;
  });
  const velRef   = useRef({});
  const posRef   = useRef({});
  const frameRef = useRef(null);
  const runRef   = useRef(true);

  useEffect(() => {
    if (!enabled || !nodeList.length) return;
    // Initialise velocities and sync posRef
    nodeList.forEach(n => {
      if (!velRef.current[n.id]) velRef.current[n.id] = { vx: 0, vy: 0 };
    });
    setPositions(prev => {
      const p = { ...prev };
      nodeList.forEach((n, i) => {
        if (!p[n.id]) {
          const angle = (i / nodeList.length) * 2 * Math.PI;
          const r = Math.min(width, height) * 0.28;
          p[n.id] = { x: width/2 + r * Math.cos(angle), y: height/2 + r * Math.sin(angle) };
        }
      });
      posRef.current = { ...p };
      return p;
    });

    let alpha = 1;
    runRef.current = true;

    const cardR = n => Math.max(8, Math.min(22, 6 + (n.centrality||1) * 2.2));
    const nodeMap = Object.fromEntries(nodeList.map(n => [n.id, n]));

    const simulate = () => {
      if (!runRef.current || alpha < 0.003) return;
      alpha *= 0.977;
      const pos = posRef.current;
      const vel = velRef.current;

      // Centre gravity
      nodeList.forEach(n => {
        const p = pos[n.id]; if (!p) return;
        vel[n.id].vx += (width/2  - p.x) * 0.025 * alpha;
        vel[n.id].vy += (height/2 - p.y) * 0.025 * alpha;
      });

      // Charge repulsion (O(n²) — fine for ~70 nodes)
      for (let i = 0; i < nodeList.length; i++) {
        const ni = nodeList[i], pi = pos[ni.id]; if (!pi) continue;
        for (let j = i+1; j < nodeList.length; j++) {
          const nj = nodeList[j], pj = pos[nj.id]; if (!pj) continue;
          const dx = pi.x - pj.x, dy = pi.y - pj.y;
          const d2 = dx*dx + dy*dy || 1;
          const d  = Math.sqrt(d2);
          const str = ni.kind === "card" ? 200 : 140;
          const f = str * alpha / d2;
          const fx = dx/d * f, fy = dy/d * f;
          vel[ni.id].vx += fx; vel[ni.id].vy += fy;
          vel[nj.id].vx -= fx; vel[nj.id].vy -= fy;
        }
      }

      // Link attraction
      linkList.forEach(l => {
        const pi = pos[l.source], pj = pos[l.target];
        if (!pi || !pj) return;
        const dx = pj.x - pi.x, dy = pj.y - pi.y;
        const d = Math.sqrt(dx*dx + dy*dy) || 1;
        const ni = nodeMap[l.source], nj = nodeMap[l.target];
        const ideal = (ni?.centrality >= 5 || nj?.centrality >= 5) ? 90 : 130;
        const f = (d - ideal) * 0.25 * alpha;
        const fx = dx/d * f, fy = dy/d * f;
        vel[l.source].vx += fx; vel[l.source].vy += fy;
        vel[l.target].vx -= fx; vel[l.target].vy -= fy;
      });

      // Collision avoidance
      for (let i = 0; i < nodeList.length; i++) {
        const ni = nodeList[i], pi = pos[ni.id]; if (!pi) continue;
        const ri = ni.kind === "card" ? cardR(ni) + 4 : 60;
        for (let j = i+1; j < nodeList.length; j++) {
          const nj = nodeList[j], pj = pos[nj.id]; if (!pj) continue;
          const rj = nj.kind === "card" ? cardR(nj) + 4 : 60;
          const minD = ri + rj;
          const dx = pi.x - pj.x, dy = pi.y - pj.y;
          const d = Math.sqrt(dx*dx + dy*dy) || 1;
          if (d < minD) {
            const f = (minD - d) / d * 0.5;
            vel[ni.id].vx += dx * f; vel[ni.id].vy += dy * f;
            vel[nj.id].vx -= dx * f; vel[nj.id].vy -= dy * f;
          }
        }
      }

      // Integrate
      const newPos = {};
      nodeList.forEach(n => {
        const p = pos[n.id], v = vel[n.id]; if (!p) return;
        v.vx *= 0.55; v.vy *= 0.55;
        newPos[n.id] = {
          x: Math.max(20, Math.min(width-20,  p.x + v.vx)),
          y: Math.max(20, Math.min(height-20, p.y + v.vy)),
        };
      });
      posRef.current = newPos;
      setPositions({ ...newPos });
      frameRef.current = requestAnimationFrame(simulate);
    };

    frameRef.current = requestAnimationFrame(simulate);
    return () => { runRef.current = false; cancelAnimationFrame(frameRef.current); };
  }, [enabled, nodeList.length, linkList.length, width, height]);

  return [positions, posRef];
}

// ============================================================
// GOLDFISH MODE
// Simulates a game from a shuffled deck: draw opening hand,
// step through turns, get advisor guidance each turn.
// ============================================================

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Expand deck cards array: basics appear multiple times, non-basics once
function buildLibrary(deckCards) {
  // deckCards already has repeated basics (e.g. 10x "Forest").
  // Exclude the commander — she lives in the command zone, not the library.
  return shuffleArray(deckCards.filter(c => !getCard(c)?.tags?.includes("commander")));
}

// Card image shown during mulligan — fetches from Scryfall, shows spinner while loading.
function MulliganCard({ card, toBottom, selectable, onClick }) {
  const url = useScryfallImage(card);
  const [hovered, setHovered] = useState(false);

  const cardW = 130;
  const cardH = 181; // standard MTG aspect ratio ~1.39

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={selectable ? (toBottom ? "Click to keep on top" : "Click to bottom") : card}
      style={{
        width: cardW, flexShrink: 0,
        cursor: selectable ? "pointer" : "default",
        transition: "transform 0.15s, opacity 0.15s",
        transform: toBottom
          ? "translateY(28px) rotate(3deg)"
          : hovered && selectable ? "translateY(-8px)" : "translateY(0)",
        opacity: toBottom ? 0.45 : 1,
        position: "relative",
      }}>
      {/* Card frame */}
      <div style={{
        width: cardW, height: cardH, borderRadius: "8px", overflow: "hidden",
        border: toBottom
          ? `2px solid ${COLORS.gold}`
          : hovered && selectable ? `2px solid ${COLORS.green2}` : `1px solid ${COLORS.border}`,
        boxShadow: toBottom
          ? "0 0 12px rgba(244,208,63,0.4)"
          : hovered && selectable ? "0 8px 24px rgba(0,0,0,0.8)" : "0 2px 8px rgba(0,0,0,0.6)",
        background: "#0d1a0d",
        transition: "border 0.15s, box-shadow 0.15s",
      }}>
        {url && url !== "error" ? (
          <img src={url} alt={card} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : url === "error" ? (
          // Fallback card back
          <div style={{
            width: "100%", height: "100%", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", padding: "8px",
            background: "linear-gradient(160deg, #0a1a0a, #162816)",
          }}>
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>🌿</div>
            <div style={{ fontSize: "10px", color: COLORS.textMid, fontFamily: "'Crimson Text', serif", textAlign: "center", lineHeight: 1.3 }}>{card}</div>
          </div>
        ) : (
          // Loading spinner
          <div style={{
            width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center",
            background: "linear-gradient(160deg, #0a1a0a, #162816)",
          }}>
            <div style={{ width: 24, height: 24, border: `2px solid ${COLORS.border}`, borderTopColor: COLORS.green2, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          </div>
        )}
      </div>
      {/* Bottom indicator */}
      {toBottom && (
        <div style={{
          position: "absolute", bottom: -22, left: 0, right: 0, textAlign: "center",
          fontSize: "9px", color: COLORS.gold, fontFamily: "'Cinzel', serif", letterSpacing: "1px",
        }}>BOTTOM</div>
      )}
      {/* Card name below image */}
      <div style={{
        marginTop: "5px", fontSize: "10px", color: toBottom ? COLORS.gold : COLORS.textDim,
        fontFamily: "'Crimson Text', serif", textAlign: "center", lineHeight: 1.2,
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: cardW,
      }}>{card}</div>
    </div>
  );
}

// Stable wrapper that tracks hover state without being remounted.
// Uses render-prop pattern so the inner span can be defined inline.
function HoverCard({ card, children }) {
  const [hovered, setHovered] = useState(false);
  const [rect, setRect] = useState(null);
  const ref = useRef(null);
  return (
    <span ref={ref}
      onMouseEnter={() => { setRect(ref.current?.getBoundingClientRect() || null); setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "inline-flex" }}>
      {children(rect, hovered)}
    </span>
  );
}

// ── Pure goldfish simulation engine ───────────────────────────────────────────
// Runs entirely synchronously with no React state. Returns a result object for
// each game. Called in a loop by runNGames().
//
// Decision logic (per turn):
//   1. Run analyzeGameState on current board
//   2. If top result is a WIN category → record win and stop
//   3. Otherwise execute the top non-win play:
//        - Always play a land first if one is in hand and no land played yet
//        - Cast the card named in the top result's headline (if identifiable & affordable)
//        - Fallback: cast highest-CMC affordable card from hand
//   4. Advance turn (untap, draw)
//   Repeat until win or turn 20 (hard cap)

const WIN_CATS = ["WIN NOW", "CAST TO WIN", "WIN NEXT TURN", "INSTANT SPEED WIN",
                  "WIN — PILE", "WIN — FETCH", "POISON WIN", "CAST FOR WIN",
                  "TUTOR LOOP", "WIN NEXT"];

function isWinCategory(cat) {
  return WIN_CATS.some(w => cat.includes(w));
}

// Extract the first card name from a result headline that appears in hand or battlefield.
// e.g. "Cast Natural Order → ..." → "Natural Order"
function extractPlayableCard(result, hand, battlefield) {
  if (!result) return null;
  const text = (result.steps?.[0] ?? result.headline ?? "");
  // Try to match any card in hand mentioned in the text
  for (const card of hand) {
    if (text.includes(card)) return card;
  }
  // Fallback: scan headline
  for (const card of hand) {
    if ((result.headline ?? "").includes(card)) return card;
  }
  return null;
}

// Extracted to module level so simulateOneGame (runNGames) can call it without being
// inside GoldfishModal's closure.
function selectBottomsFromScored(scored, bottomCount) {
  if (bottomCount <= 0 || scored.length === 0) return [];
  const GREEN_LANDS_SET = new Set([
    "Forest","Dryad Arbor","Misty Rainforest","Verdant Catacombs","Windswept Heath",
    "Wooded Foothills","Yavimaya, Cradle of Growth","Castle Garenbrig",
    "Turntimber Symbiosis","Shifting Woodland","Gaea's Cradle","Itlimoc, Cradle of the Sun",
    "Nykthos, Shrine to Nyx",
  ]);
  const allCards = scored.map(x => x.c);
  const greenLandCount = allCards.filter(c => GREEN_LANDS_SET.has(c)).length;
  const oneDropCount   = allCards.filter(c => getCard(c)?.tags?.includes("dork") && getCard(c)?.cmc === 1).length;

  const isProtected = (c) => {
    if (greenLandCount === 1 && GREEN_LANDS_SET.has(c)) return true;
    if (oneDropCount   === 1 && getCard(c)?.tags?.includes("dork") && getCard(c)?.cmc === 1) return true;
    return false;
  };

  const result = scored.slice(0, bottomCount).map(x => ({ ...x }));
  const kept   = scored.slice(bottomCount);

  for (let pass = 0; pass < result.length; pass++) {
    const protectedIdx = result.findIndex(x => isProtected(x.c));
    if (protectedIdx === -1) break;

    let swapIdx = -1;
    for (let j = result.length - 1; j >= 0; j--) {
      if (j !== protectedIdx && !isProtected(result[j].c)) { swapIdx = j; break; }
    }

    if (swapIdx !== -1) {
      const temp = result[protectedIdx];
      result[protectedIdx] = result[swapIdx];
      result[swapIdx] = temp;
      const savedProtected = result.splice(protectedIdx < swapIdx ? protectedIdx : swapIdx, 1)[0];
      if (kept.length > 0) result.push(kept.shift());
    } else {
      break;
    }
  }

  return result.map(x => x.c);
}

function simulateOneGame(deckCards, deckSet, mullLimit = 2, maxTurns = 20) {
  const MAX_TURNS = maxTurns;
  let hand, library;

  // ── Mulligan heuristic ─────────────────────────────────────
  // A keepable hand needs:
  //   • At least one green-mana source (Forest, fetch, Dryad Arbor, Castle Garenbrig,
  //     Yavimaya, or Turntimber Symbiosis — lands that can actually produce {G})
  //   • At least one 1-CMC mana dork (Llanowar Elves, Arbor Elf, etc.) — the deck's
  //     primary T1 play that enables everything else
  //   • Some additional action (tutor, second dork, or combo piece)
  const GREEN_LANDS = new Set([
    "Forest","Dryad Arbor","Misty Rainforest","Verdant Catacombs","Windswept Heath",
    "Wooded Foothills","Yavimaya, Cradle of Growth","Castle Garenbrig",
    "Turntimber Symbiosis","Shifting Woodland","Gaea's Cradle","Itlimoc, Cradle of the Sun",
    "Nykthos, Shrine to Nyx",
  ]);
  let mulligans = 0;
  for (let m = 0; m <= mullLimit; m++) {
    library = buildLibrary(deckCards);
    hand = library.slice(0, 7);
    library = library.slice(7);
    const greenLands = hand.filter(c => GREEN_LANDS.has(c)).length;
    const oneDrop    = hand.filter(c => getCard(c)?.tags?.includes("dork") && getCard(c)?.cmc === 1).length;
    const dorks      = hand.filter(c => getCard(c)?.tags?.includes("dork")).length;
    const tutors     = hand.filter(c => getCard(c)?.tags?.includes("tutor")).length;
    // Hard requirements: need a green land AND a 1-CMC dork
    const hasBase    = greenLands >= 1 && oneDrop >= 1;
    // Additional action: tutor, second dork, or a key combo piece
    const hasAction  = tutors >= 1 || dorks >= 2;
    const keep = hasBase && hasAction;
    if (keep || m === mullLimit) {
      // Bottom cards for mulligans
      if (m > 0) {
        const toBottom = m;
        const scored = hand.map(c => {
          const tags = getCard(c)?.tags ?? [];
          const type = getCard(c)?.type ?? "";
          const cmc  = getCard(c)?.cmc ?? 0;
          let score = 0;
          if (tags.includes("dork") && cmc === 1)  score += 5; // 1-drop dork — highest priority
          if (tags.includes("tutor"))               score += 4;
          if (tags.includes("dork") && cmc > 1)    score += 3;
          if (tags.includes("combo") || tags.includes("key")) score += 3;
          if (tags.some(t => ["ashaya","quirion","earthcraft","wirewood","sabertooth","duskwatch"].includes(t))) score += 2;
          if (type === "land" && GREEN_LANDS.has(c)) {
            const greenAlready = hand.slice(0, hand.indexOf(c)).filter(cc => GREEN_LANDS.has(cc)).length;
            score += greenAlready === 0 ? 4 : 1; // first green land critical; extras less so
          } else if (type === "land") {
            score += 1; // non-green land still useful
          }
          if (tags.includes("fast-mana")) score += 2;
          if (cmc >= 5 && !tags.includes("combo") && !tags.includes("key") && !tags.includes("dork")) score -= 2;
          if (cmc >= 7) score -= 2;
          return { c, score };
        }).sort((a, b) => a.score - b.score);
        const bottomed = selectBottomsFromScored(scored, toBottom);
        hand = hand.filter(c => !bottomed.includes(c));
      }
      mulligans = m;
      break;
    }
    mulligans = m + 1;
  }

  const openingHand = [...hand];

  // ── Game state ──────────────────────────────────────────────
  let battlefield = [];
  let graveyard   = [];
  let landPlayed  = false;
  let winTurn     = null;
  let winCombo    = null; // short label of the winning combo
  let bottlenecks = []; // missing piece strings from suppressed wins
  let manaCurve   = []; // mana available per turn

  for (let turn = 1; turn <= MAX_TURNS; turn++) {
    // Untap + draw (skip draw on turn 1 for first player — but for goldfish always draw)
    if (turn > 1) {
      if (library.length > 0) { hand.push(library.shift()); }
    }
    landPlayed = false;

    // Play out the turn — loop until no more affordable plays this turn
    let madePlay = true;
    let turnsPlays = 0;
    while (madePlay && turnsPlays < 20) {
      madePlay = false;
      turnsPlays++;

      // Always play a land first
      if (!landPlayed) {
        const landIdx = hand.findIndex(c => getCard(c)?.type === "land");
        if (landIdx >= 0) {
          const land = hand.splice(landIdx, 1)[0];
          battlefield.push(land);
          landPlayed = true;
          madePlay = true;
          continue;
        }
      }

      // Calculate available mana
      const mana = calculateBattlefieldMana(battlefield);
      if (manaCurve.length < turn) manaCurve.push(mana); // record once per turn

      // Run advisor
      let analysis;
      try {
        analysis = analyzeGameState({
          hand, battlefield, graveyard,
          manaAvailable: mana, isMyTurn: true,
          deckList: deckSet,
        });
      } catch { break; }

      const liveResults = (analysis.results ?? []).filter(r => !r.isSuppressed);
      const top = liveResults[0];

      // Check for win
      if (top && isWinCategory(top.category)) {
        winTurn = turn;
        winCombo = extractComboLabel(top);
        break;
      }

      // Collect bottleneck data from suppressed wins
      const suppressed = (analysis.results ?? []).filter(r => r.isSuppressed);
      for (const s of suppressed) {
        const reason = (s.headline ?? "").replace(/^[^:]+:\s*/, "");
        if (reason) bottlenecks.push(reason);
      }

      // Try to execute the top recommendation
      const cardToPlay = top ? extractPlayableCard(top, hand, battlefield) : null;
      let played = false;

      if (cardToPlay) {
        const idx = hand.indexOf(cardToPlay);
        const cardData = getCard(cardToPlay);
        const cmc = cardData?.cmc ?? 0;
        const cardType = cardData?.type ?? "";
        if (idx >= 0 && cmc <= mana && cardType !== "land") {
          hand.splice(idx, 1);
          if (cardType === "instant" || cardType === "sorcery") {
            if (cardToPlay === "Green Sun's Zenith") {
              // GSZ shuffles back into library
              library.push(cardToPlay);
              for (let i = library.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [library[i], library[j]] = [library[j], library[i]]; }
            } else {
              graveyard.push(cardToPlay);
            }
          } else {
            battlefield.push(cardToPlay);
          }
          played = true;
          madePlay = true;
          continue;
        }
      }

      // Fallback: cast the highest-CMC affordable non-land card in hand
      if (!played) {
        const affordable = hand
          .map((c, i) => ({ c, i, cmc: getCard(c)?.cmc ?? 0, type: getCard(c)?.type ?? "" }))
          .filter(x => x.type !== "land" && x.cmc <= mana && x.cmc > 0)
          .sort((a, b) => b.cmc - a.cmc);
        if (affordable.length > 0) {
          const best = affordable[0];
          hand.splice(best.i, 1);
          if (best.type === "instant" || best.type === "sorcery") {
            graveyard.push(best.c);
          } else {
            battlefield.push(best.c);
          }
          madePlay = true;
          continue;
        }
      }

      // Nothing left to do this turn
      break;
    }

    if (winTurn !== null) break;
  }

  return { openingHand, mulligans, winTurn, winCombo, bottlenecks, manaCurve };
}

// Derive a short combo label from an advisor result headline
function extractComboLabel(result) {
  if (!result) return "Unknown";
  const h = (result.headline ?? "") + " " + (result.category ?? "");
  const patterns = [
    [/ashaya.*loop|loop.*ashaya/i,           "Ashaya Loop"],
    [/earthcraft/i,                           "Earthcraft Loop"],
    [/quirion/i,                              "Quirion Loop"],
    [/wirewood symbiote/i,                    "Wirewood Loop"],
    [/duskwatch/i,                            "Duskwatch Sink"],
    [/natural order/i,                        "Natural Order"],
    [/yisan/i,                                "Yisan Chain"],
    [/poison|infectious bite/i,               "Poison Win"],
    [/pile|oracle/i,                          "Oracle Pile"],
    [/sanitarium/i,                           "Sanitarium Mill"],
    [/temur sabertooth/i,                     "Sabertooth Loop"],
    [/kogla/i,                                "Kogla Loop"],
    [/seedborn/i,                             "Seedborn Engine"],
    [/survival of the fittest/i,              "Survival Loop"],
    [/WIN NOW|CAST TO WIN/i,                  null], // fall through to headline
  ];
  for (const [re, label] of patterns) {
    if (re.test(h) && label) return label;
  }
  return h.slice(0, 36).trim() || "Win";
}

// Run N games synchronously, return aggregated stats
function runNGames(deckCards, n = 50, maxTurns = 20) {
  const nonCommanderCards = deckCards.filter(c => !getCard(c)?.tags?.includes("commander"));
  const deckSet = new Set(nonCommanderCards);
  const results = [];
  for (let i = 0; i < n; i++) {
    results.push(simulateOneGame(nonCommanderCards, deckSet, 2, maxTurns));
  }

  const wins        = results.filter(r => r.winTurn !== null);
  const winTurns    = wins.map(r => r.winTurn);
  const avgWinTurn  = winTurns.length ? (winTurns.reduce((a,b) => a+b,0) / winTurns.length) : null;
  const winRate     = (wins.length / n * 100);
  const t3Rate      = (results.filter(r => r.winTurn !== null && r.winTurn <= 3).length / n * 100);
  const t4Rate      = (results.filter(r => r.winTurn !== null && r.winTurn <= 4).length / n * 100);
  const t5Rate      = (results.filter(r => r.winTurn !== null && r.winTurn <= 5).length / n * 100);
  const avgMulligans = (results.reduce((a, r) => a + r.mulligans, 0) / n);

  // Bottleneck frequency: count how often each missing-piece phrase appears
  const bottleneckCounts = {};
  for (const r of results) {
    // Deduplicate within a single game first
    const seen = new Set();
    for (const b of r.bottlenecks) {
      // Normalise: strip trailing detail, keep first ~50 chars
      const key = b.slice(0, 55).replace(/\(.*?\)/g, "").trim();
      if (!seen.has(key)) {
        seen.add(key);
        bottleneckCounts[key] = (bottleneckCounts[key] ?? 0) + 1;
      }
    }
  }
  const topBottlenecks = Object.entries(bottleneckCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([reason, count]) => ({ reason, count, pct: Math.round(count / n * 100) }));

  // Win turn distribution (T1–T10+)
  const distribution = {};
  for (const t of winTurns) {
    const key = t <= 10 ? `T${t}` : "T11+";
    distribution[key] = (distribution[key] ?? 0) + 1;
  }

  // Win combo breakdown
  const winComboCounts = {};
  for (const r of wins) {
    const label = r.winCombo || "Unknown";
    winComboCounts[label] = (winComboCounts[label] ?? 0) + 1;
  }
  const winCombos = Object.entries(winComboCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([label, count]) => ({ label, count, pct: Math.round(count / wins.length * 100) }));

  // Average mana curve across all games (by turn index)
  const manaCurveAvg = [];
  const maxTurnSeen = Math.max(...results.map(r => r.manaCurve?.length ?? 0), 0);
  for (let t = 0; t < Math.min(maxTurnSeen, 8); t++) {
    const vals = results.map(r => r.manaCurve?.[t]).filter(v => v != null);
    manaCurveAvg.push(vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0);
  }

  return {
    n, wins: wins.length, winRate, avgWinTurn, avgMulligans,
    t3Rate, t4Rate, t5Rate,
    topBottlenecks, distribution, winCombos, manaCurveAvg, results, maxTurns,
  };
}

// ── Replay Viewer Modal ────────────────────────────────────────────────────────
// Small card image component for replay view
function ReplayCard({ name, zone }) {
  const url = useScryfallImage(name);
  const [hovered, setHovered] = useState(false);
  const [rect, setRect] = useState(null);
  const ref = useRef(null);
  const cardW = 72, cardH = 100;

  return (
    <div
      ref={ref}
      onMouseEnter={() => { setRect(ref.current?.getBoundingClientRect()); setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", flexShrink: 0, opacity: zone === "graveyard" ? 0.6 : 1 }}
    >
      <div style={{
        width: cardW, height: cardH, borderRadius: 5, overflow: "hidden",
        boxShadow: hovered ? "0 0 0 2px #4ade80, 0 4px 16px rgba(0,0,0,0.7)" : "0 2px 8px rgba(0,0,0,0.5)",
        background: "#1a2e1a", border: "1px solid #2a4a2a",
        transition: "box-shadow 0.15s",
      }}>
        {url && url !== "error" ? (
          <img src={url} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} draggable={false} />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: 4, textAlign: "center", color: "#4ade80", fontSize: 9, fontFamily: "'Crimson Text', serif", lineHeight: 1.3 }}>
            {url === null ? "…" : name}
          </div>
        )}
      </div>
      {hovered && <CardTooltip name={name} anchorRect={rect} />}
    </div>
  );
}

function ReplayModal({ game, onClose }) {
  const [step, setStep] = useState(0);
  const snapshots = game.replay || [];

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") setStep(s => Math.max(0, s - 1));
      if (e.key === "ArrowRight") setStep(s => Math.min(snapshots.length - 1, s + 1));
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [snapshots.length, onClose]);

  if (snapshots.length === 0) return (
    <div style={{ position:"fixed", inset:0, background:"#000c", zIndex:2000, display:"flex", alignItems:"center", justifyContent:"center" }} onClick={onClose}>
      <div style={{ background:COLORS.bg, border:`1px solid ${COLORS.border}`, borderRadius:"10px", padding:"32px", color:COLORS.textDim, fontFamily:"'Crimson Text', serif" }} onClick={e=>e.stopPropagation()}>
        No replay data for this game. Play a new game to generate replays.
        <div style={{ textAlign:"center", marginTop:"16px" }}><button onClick={onClose} style={{ background:"none", border:`1px solid ${COLORS.border}`, borderRadius:"6px", padding:"6px 16px", color:COLORS.textDim, cursor:"pointer", fontFamily:"'Cinzel', serif", fontSize:"11px" }}>CLOSE</button></div>
      </div>
    </div>
  );

  const snap = snapshots[step];
  const navBtn = (onClick, disabled, label) => (
    <button onClick={onClick} disabled={disabled} style={{ background:"none", border:`1px solid ${COLORS.border}`, borderRadius:"4px", padding:"4px 10px", color: disabled ? COLORS.textDim : COLORS.text, cursor: disabled ? "default" : "pointer", fontSize:"13px" }}>{label}</button>
  );
  const ZoneSection = ({ label, cards, zone, color }) => (
    <div style={{ marginBottom:"18px" }}>
      <div style={{ fontSize:"9px", letterSpacing:"2px", color, fontFamily:"'Cinzel', serif", marginBottom:"8px", opacity:0.85 }}>
        {label} — {cards.length} CARD{cards.length !== 1 ? "S" : ""}
      </div>
      {cards.length === 0
        ? <div style={{ color:COLORS.textDim, fontSize:"11px", fontStyle:"italic", fontFamily:"'Crimson Text', serif" }}>empty</div>
        : <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>{cards.map((c,i) => <ReplayCard key={`${c}-${i}`} name={c} zone={zone} />)}</div>
      }
    </div>
  );

  return (
    <div style={{ position:"fixed", inset:0, background:"#000000dd", zIndex:2000, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }} onClick={onClose}>
      <div style={{ background:COLORS.bg, border:`1px solid ${COLORS.borderBright}`, borderRadius:"12px", width:"100%", maxWidth:"800px", display:"flex", flexDirection:"column", overflow:"hidden", maxHeight:"90vh" }} onClick={e=>e.stopPropagation()}>

        {/* Header */}
        <div style={{ padding:"12px 52px 12px 18px", borderBottom:`1px solid ${COLORS.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0, flexWrap:"nowrap", position:"relative" }}>
          <div style={{ fontFamily:"'Cinzel', serif", fontSize:"12px", color:COLORS.green3, letterSpacing:"2px" }}>
            📼 GAME #{game.gameNum} REPLAY
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"10px", minWidth:0 }}>
            {game.winCombo && <span style={{ fontSize:"10px", color:COLORS.red, fontFamily:"'Cinzel', serif", letterSpacing:"1px", whiteSpace:"nowrap" }}>★ {game.winCombo}</span>}
            <span style={{ fontSize:"10px", color:COLORS.textDim, fontFamily:"'Cinzel', serif", whiteSpace:"nowrap" }}>← → keys</span>
          </div>
          <button onClick={onClose} style={{ position:"absolute", top:"8px", right:"12px", background:"none", border:`1px solid ${COLORS.border}`, borderRadius:"6px", padding:"4px 10px", color:COLORS.textDim, cursor:"pointer", fontFamily:"'Cinzel', serif", fontSize:"12px" }}>✕</button>
        </div>

        {/* Turn nav */}
        <div style={{ padding:"8px 18px", borderBottom:`1px solid ${COLORS.border}`, display:"flex", alignItems:"center", gap:"8px", flexShrink:0 }}>
          {navBtn(() => setStep(0), step === 0, "⏮")}
          {navBtn(() => setStep(s => Math.max(0, s-1)), step === 0, "◀")}
          <div style={{ flex:1, textAlign:"center", fontFamily:"'Cinzel', serif", fontSize:"11px", color:COLORS.gold, letterSpacing:"1.5px" }}>
            TURN {snap.turn} · {snap.mana} MANA · {step+1} / {snapshots.length}
          </div>
          {navBtn(() => setStep(s => Math.min(snapshots.length-1, s+1)), step === snapshots.length-1, "▶")}
          {navBtn(() => setStep(snapshots.length-1), step === snapshots.length-1, "⏭")}
        </div>

        {/* Scrubber */}
        <div style={{ padding:"4px 18px 6px", borderBottom:`1px solid ${COLORS.border}`, flexShrink:0, display:"flex", gap:"3px" }}>
          {snapshots.map((s, i) => (
            <div key={i} onClick={() => setStep(i)} title={`Turn ${s.turn}`} style={{
              flex:1, height:"6px", borderRadius:"3px", cursor:"pointer",
              background: i === step ? COLORS.green1 : i < step ? COLORS.green1+"55" : COLORS.border,
              transition:"background 0.15s",
            }} />
          ))}
        </div>

        {/* Card zones */}
        <div style={{ flex:1, overflowY:"auto", padding:"16px 18px" }}>
          <ZoneSection label="HAND" cards={snap.hand} zone="hand" color={COLORS.green1} />
          <ZoneSection label="BATTLEFIELD" cards={snap.battlefield} zone="battlefield" color={COLORS.green3} />
          <ZoneSection label="GRAVEYARD" cards={snap.graveyard} zone="graveyard" color={COLORS.textDim} />
        </div>
      </div>
    </div>
  );
}


function GoldfishModal({ activeDeck, onClose, onLoadState }) {
  // ── state ──────────────────────────────────────────────────
  const [phase, setPhase] = useState("setup"); // setup | mulligan | playing | stats
  // ── responsive layout ──────────────────────────────────────
  const [containerWidth, setContainerWidth] = useState(1024); // safe SSR default, updated after mount
  const [mounted, setMounted] = useState(false);
  const containerRef2 = useRef(null);
  useEffect(() => {
    setMounted(true);
    const el = containerRef2.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([e]) => setContainerWidth(e.contentRect.width));
    ro.observe(el);
    setContainerWidth(el.getBoundingClientRect().width || window.innerWidth);
    return () => ro.disconnect();
  }, []);
  const isMobile = mounted && containerWidth < 700;
  const [mobileTab, setMobileTab] = useState("advisor"); // "zones" | "advisor" | "log"
  const [library, setLibrary] = useState([]);
  const [hand, setHand] = useState([]);
  const [battlefield, setBattlefield] = useState([]);
  const [graveyard, setGraveyard] = useState([]);
  const [exile, setExile] = useState([]);
  const [turnNumber, setTurnNumber] = useState(1);
  const turnRef = useRef(1);
  const [isMyTurn, setIsMyTurn] = useState(true);
  const [landPlayed, setLandPlayed] = useState(false);
  const [log, setLog] = useState([]);
  const [mulliganCount, setMulliganCount] = useState(0);
  const [contextMenu, setContextMenu] = useState(null);
  const [pendingBottoms, setPendingBottoms] = useState([]);
  const [phase2, setPhase2] = useState(null);
  const [yevaTax, setYevaTax] = useState(0);
  const [showTutor, setShowTutor] = useState(false);
  const [tutorQuery, setTutorQuery] = useState("");
  const tutorInputRef = useRef(null);
  const [tapped, setTapped] = useState(new Set());
  const [counters, setCounters] = useState({});
  const [scryN, setScryN] = useState(3);
  const [showScry, setShowScry] = useState(false);
  const [scryOrder, setScryOrder] = useState([]);
  const [scryBottom, setScryBottom] = useState(new Set());
  const [manaPool, setManaPool] = useState(0); // floating mana currently in pool
  const [manaPoolDelta, setManaPoolDelta] = useState(null); // {value, id} for flash animation
  const [showUntapModal, setShowUntapModal] = useState(null); // {card, i} for Wirewood Lodge etc
  const undoStack = useRef([]); // snapshots for undo
  // ── Statistics (persisted via window.storage) ────────────────
  const [gameHistory, setGameHistory] = useState([]);
  const replaySnapshotsRef = useRef([]); // accumulates per-turn snapshots for current game
  const winComboRef = useRef(null);      // headline of winning combo for current game
  const [statsLoaded, setStatsLoaded] = useState(false);
  const [replayGame, setReplayGame] = useState(null);
  const milestoneRef = useRef({ firstDork: null, infiniteMana: null, winCondition: null });
  const openingHandRef = useRef([]);
  const gameNumRef = useRef(0);
  // ── Drag state ──────────────────────────────────────────────
  const [dragCard, setDragCard] = useState(null); // {card, fromZone, fromIndex}
  const [dragOver, setDragOver] = useState(null); // zone name being hovered
  // ── Run N state ─────────────────────────────────────────────
  const [runNCount, setRunNCount] = useState(100);
  const [runNMaxTurns, setRunNMaxTurns] = useState(8);
  const [runNResults, setRunNResults] = useState(null);
  const [runNRunning, setRunNRunning] = useState(false);
  const [simTooltip, setSimTooltip] = useState(null); // {id, text, x, y} | null

  const deckCards = activeDeck?.cards ?? [];
  const hasDeck = deckCards.length > 0;

  // Storage key scoped to deck so each deck gets its own stats
  const statsKey = `goldfish-stats:${(activeDeck?.name ?? "default").replace(/[^a-zA-Z0-9-_]/g, "_")}`;

  // Load persisted stats on mount (or when deck changes)
  useEffect(() => {
    (async () => {
      try {
        const result = await storage.get(statsKey);
        if (result?.value) {
          const saved = JSON.parse(result.value);
          setGameHistory(saved.history ?? []);
          gameNumRef.current = saved.gameNum ?? 0;
        }
      } catch {
        // key not found or parse error — start fresh
      } finally {
        setStatsLoaded(true);
      }
    })();
  }, [statsKey]);

  // Persist whenever gameHistory changes (after initial load)
  useEffect(() => {
    if (!statsLoaded) return;
    storage.set(statsKey, JSON.stringify({
      history: gameHistory,
      gameNum: gameNumRef.current,
    })).catch(() => {});
  }, [gameHistory, statsLoaded]);

  // ── derived analysis ────────────────────────────────────────
  const untappedBattlefield = battlefield.filter((_, i) => !tapped.has(`${battlefield[i]}:${i}`));
  const currentMana = calculateBattlefieldMana(untappedBattlefield);
  const analysis = React.useMemo(() => {
    if (hand.length + battlefield.length === 0) return null;
    try {
      const result = analyzeGameState({
        hand, battlefield, graveyard,
        manaAvailable: calculateBattlefieldMana(untappedBattlefield),
        isMyTurn, deckList: activeDeck ? new Set(deckCards) : null,
      });
      // Auto-detect milestones
      if (phase === "playing") {
        const hasDork = battlefield.some(c => getCard(c)?.tags?.includes("dork"));
        if (hasDork) recordMilestone("firstDork");
        if (result?.infiniteManaActive) recordMilestone("infiniteMana");
        const topCat = result?.results?.[0]?.category || "";
        if (topCat.includes("WIN NOW") || topCat.includes("WIN NEXT")) {
          recordMilestone("winCondition");
          if (!winComboRef.current) winComboRef.current = extractComboLabel(result?.results?.[0]);
        }
      }
      return result;
    } catch (e) { return { results: [], error: e?.message || "Unknown error", infiniteManaActive: false }; }
  }, [hand, battlefield, graveyard, isMyTurn, tapped]);

  // ── helpers ─────────────────────────────────────────────────
  // ── UNDO ────────────────────────────────────────────────────
  function pushUndo() {
    undoStack.current = [
      { hand: [...hand], battlefield: [...battlefield], graveyard: [...graveyard],
        library: [...library], exile: [...exile], tapped: new Set(tapped),
        counters: { ...counters }, manaPool, landPlayed, turnNumber: turnRef.current,
        log: [...log] },
      ...undoStack.current.slice(0, 19), // keep max 20
    ];
  }

  function applyUndo() {
    const snap = undoStack.current[0];
    if (!snap) return;
    undoStack.current = undoStack.current.slice(1);
    setHand(snap.hand);
    setBattlefield(snap.battlefield);
    setGraveyard(snap.graveyard);
    setLibrary(snap.library);
    setExile(snap.exile);
    setTapped(snap.tapped);
    setCounters(snap.counters);
    setManaPool(snap.manaPool);
    setLandPlayed(snap.landPlayed);
    setTurnNumber(snap.turnNumber);
    turnRef.current = snap.turnNumber;
    setLog(snap.log);
  }

  function addLog(msg, color) {
    setLog(prev => [{ msg, color: color || COLORS.textMid, turn: turnNumber }, ...prev].slice(0, 100));
  }

  function flashMana(delta) {
    const id = Date.now();
    setManaPoolDelta({ value: delta, id });
    setTimeout(() => setManaPoolDelta(d => d?.id === id ? null : d), 900);
  }

  function cardKey(card, i) { return `${card}:${i}`; }

  function startGame() {
    const lib = buildLibrary(deckCards);
    setLibrary(lib.slice(7));
    setHand(lib.slice(0, 7));
    setBattlefield([]); setGraveyard([]); setExile([]);
    setTurnNumber(1); turnRef.current = 1; setIsMyTurn(true); setLandPlayed(false);
    setMulliganCount(0); setLog([]); setPendingBottoms([]);
    setPhase2(null); setYevaTax(0);
    setTapped(new Set()); setCounters({}); setManaPool(0);
    setDragCard(null); setDragOver(null);
    milestoneRef.current = { firstDork: null, infiniteMana: null, winCondition: null };
    replaySnapshotsRef.current = [];
    winComboRef.current = null;
    openingHandRef.current = lib.slice(0, 7);
    setPhase("mulligan");
    addLog("Game started — 7-card opening hand drawn.", COLORS.green2);
  }

  function keepHand() {
    openingHandRef.current = [...hand]; // snapshot kept hand
    setPhase("playing");
    addLog(`Kept ${hand.length}-card hand. Turn 1 begins.`, COLORS.green1);
  }

  // Record a game milestone (first dork, infinite mana, win condition)
  function recordMilestone(type) {
    const t = turnRef.current;
    if (milestoneRef.current[type] !== null) return; // already recorded
    milestoneRef.current[type] = t;
    const labels = { firstDork: "First mana dork on battlefield", infiniteMana: "Infinite mana assembled", winCondition: "Win condition available" };
    addLog(`★ ${labels[type]} — Turn ${t}`, type === "winCondition" ? COLORS.red : type === "infiniteMana" ? "#c084fc" : COLORS.green2);
  }

  // Save completed game to history and show stats
  function endGame() {
    gameNumRef.current += 1;
    // Push final turn snapshot
    const finalSnapshots = [...replaySnapshotsRef.current, {
      turn: turnRef.current,
      hand: [...hand],
      battlefield: [...battlefield],
      graveyard: [...graveyard],
      mana: calculateBattlefieldMana(battlefield),
    }];
    const entry = {
      gameNum: gameNumRef.current,
      mulligans: mulliganCount,
      openingHand: openingHandRef.current,
      firstDork: milestoneRef.current.firstDork,
      infiniteMana: milestoneRef.current.infiniteMana,
      winCondition: milestoneRef.current.winCondition,
      winCombo: winComboRef.current,
      turns: turnRef.current,
      replay: finalSnapshots,
    };
    setGameHistory(prev => {
      const next = [...prev, entry];
      // Save immediately so data persists even if modal closes before effect fires
      storage.set(statsKey, JSON.stringify({
        history: next,
        gameNum: gameNumRef.current,
      })).catch(() => {});
      return next;
    });
    setPhase("stats");
  }

  function scoreMulliganHand(cards) {
    const GREEN_LANDS_SET = new Set([
      "Forest","Dryad Arbor","Misty Rainforest","Verdant Catacombs","Windswept Heath",
      "Wooded Foothills","Yavimaya, Cradle of Growth","Castle Garenbrig",
      "Turntimber Symbiosis","Shifting Woodland","Gaea's Cradle","Itlimoc, Cradle of the Sun",
      "Nykthos, Shrine to Nyx",
    ]);
    return cards.map((c, i) => {
      const tags = getCard(c)?.tags ?? [];
      const type = getCard(c)?.type ?? "";
      const cmc  = getCard(c)?.cmc ?? 0;
      let score = 0;
      if (tags.includes("dork") && cmc === 1)  score += 5; // 1-drop dork — highest priority
      if (tags.includes("tutor"))               score += 4;
      if (tags.includes("dork") && cmc > 1)    score += 3;
      if (tags.includes("combo") || tags.includes("key")) score += 3;
      if (tags.some(t => ["ashaya","quirion","earthcraft","wirewood","sabertooth","duskwatch"].includes(t))) score += 2;
      if (type === "land" && GREEN_LANDS_SET.has(c)) {
        const greenAlready = cards.slice(0, i).filter(cc => GREEN_LANDS_SET.has(cc)).length;
        score += greenAlready === 0 ? 4 : 1; // first green land critical; extras less so
      } else if (type === "land") {
        score += 1; // non-green land still has some value
      }
      if (tags.includes("fast-mana")) score += 2;
      if (tags.includes("stax") || tags.includes("hate")) score += 1;
      if (tags.includes("removal")) score += 1;
      if (cmc >= 5 && !tags.includes("combo") && !tags.includes("key") && !tags.includes("dork")) score -= 2;
      if (cmc >= 7) score -= 2;
      return { c, i, score };
    }).sort((a, b) => a.score - b.score);
  }

  // Given a scored+sorted hand, pick exactly bottomCount cards to bottom.
  // Enforces two protection rules after scoring:
  //   1. Never bottom the only green land (if the hand has exactly one).
  //   2. Never bottom the only 1-CMC dork (if the hand has exactly one).
  // If a protected card lands in the bottom slice, swap it with the highest-scoring
  // card from the bottom slice that is NOT itself protected.
  // selectBottomsFromScored is defined at module level (above simulateOneGame)
  // so it is accessible to both runNGames and this interactive mulligan UI.


  function doMulligan() {
    const newCount = mulliganCount + 1;
    const lib = buildLibrary(deckCards);
    const newHand = lib.slice(0, 7);
    setLibrary(lib.slice(7));
    setMulliganCount(newCount);
    setHand(newHand);
    const bottomCount = Math.max(0, newCount - 1);
    const newHandSize = 7 - bottomCount;
    if (bottomCount === 0) {
      setPendingBottoms([]);
      setPhase2(null);
      addLog(`Mulligan #${newCount} — free! Drew 7, no cards to bottom.`, COLORS.gold);
    } else if (newHandSize <= 0) {
      // Mulliganing to 0 — auto-bottom everything, skip selection
      setHand([]);
      setPendingBottoms([]);
      setLibrary(prev => [...prev, ...shuffleArray(lib.slice(0, 7))]);
      setPhase2(null);
      addLog(`Mulligan #${newCount} — mulliganed to 0. All cards returned to library.`, COLORS.gold);
    } else {
      // Pre-select the suggested cards to bottom
      const scored = scoreMulliganHand(newHand);
      const preSelectedCards = selectBottomsFromScored(scored, bottomCount);
      // Map card names back to hand indices for pendingBottoms keys
      const usedIndices = new Set();
      const preSelected = preSelectedCards.map(c => {
        const idx = newHand.findIndex((hc, hi) => hc === c && !usedIndices.has(hi));
        usedIndices.add(idx);
        return `${c}:${idx}`;
      });
      setPendingBottoms(preSelected);
      setPhase2("bottoming");
      addLog(`Mulligan #${newCount} — drew 7, choose ${bottomCount} card${bottomCount > 1 ? "s" : ""} to bottom.`, COLORS.gold);
    }
  }

  function toggleBottom(card, idx) {
    const key = `${card}:${idx}`;
    setPendingBottoms(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  }

  function confirmBottom() {
    const bottomCount = Math.max(0, mulliganCount - 1);
    if (pendingBottoms.length !== bottomCount) return;
    const bottomed = pendingBottoms.map(k => k.split(":")[0]);
    const newHand = [...hand];
    bottomed.forEach(card => { const i = newHand.indexOf(card); if (i >= 0) newHand.splice(i, 1); });
    setHand(newHand);
    setLibrary(prev => [...prev, ...shuffleArray(bottomed)]);
    setPendingBottoms([]); setPhase2(null);
    addLog(`Bottomed ${bottomCount} card${bottomCount > 1 ? "s" : ""}. Keeping ${newHand.length} cards.`, COLORS.textMid);
  }

  function drawCard(n = 1) {
    if (library.length === 0) { addLog("Library empty — cannot draw!", COLORS.red); return; }
    const drawn = library.slice(0, n);
    setHand(prev => [...prev, ...drawn]);
    setLibrary(prev => prev.slice(n));
    addLog(`Drew ${drawn.length > 1 ? drawn.length + " cards" : drawn[0]}.`, COLORS.blue);
  }

  // ── UNTAP ALL ───────────────────────────────────────────────
  function untapAll() {
    pushUndo();
    setTapped(new Set());
    setManaPool(0);
    setLandPlayed(false);
    addLog("Untap step — all permanents untapped.", COLORS.green1);
  }

  // ── NEXT TURN ───────────────────────────────────────────────
  function nextTurn() {
    const next = turnRef.current + 1;
    // Snapshot state at END of current turn (before untap/draw of next)
    replaySnapshotsRef.current.push({
      turn: turnRef.current,
      hand: [...hand],
      battlefield: [...battlefield],
      graveyard: [...graveyard],
      mana: calculateBattlefieldMana(battlefield),
    });
    turnRef.current = next;
    setTurnNumber(next);
    setIsMyTurn(true);
    setTapped(new Set());
    setManaPool(0);
    setLandPlayed(false);
    // Compute draw synchronously from current library snapshot — never nest setHand inside setLibrary
    if (library.length === 0) {
      setLog(l => [{ msg: `── Turn ${next} — untap, upkeep (library empty) ──`, color: COLORS.green3, turn: next }, ...l].slice(0, 100));
    } else {
      const drawn = library[0];
      setLibrary(library.slice(1));
      setHand(h => [...h, drawn]);
      setLog(l => [
        { msg: `Drew ${drawn}.`, color: COLORS.blue, turn: next },
        { msg: `── Turn ${next} — untap, upkeep, draw ──`, color: COLORS.green3, turn: next },
        ...l,
      ].slice(0, 100));
    }
  }

  function toggleTurn() {
    setIsMyTurn(prev => {
      addLog(prev ? "Passing to opponent's turn." : "Returning to your turn.", COLORS.textDim);
      return !prev;
    });
  }

  // ── TAP / UNTAP ─────────────────────────────────────────────
  function toggleTap(card, i) {
    const key = cardKey(card, i);
    const cardMana = calculateCardManaForPool(card, battlefield);
    const cardData = CARDS[card] ?? EXTRA_CARDS.get(card);
    const wasTapped = tapped.has(key);

    // Lodge/untap-elf cards: when tapping, show target picker
    if (!wasTapped && cardData?.tags?.includes("untap-elf")) {
      const elfTargets = battlefield
        .map((c, idx) => ({ c, idx }))
        .filter(({ c, idx }) => getCard(c)?.tags?.includes("elf") && c !== card);
      if (elfTargets.length > 0) {
        setShowUntapModal({ card, i, targets: elfTargets });
        return; // tap happens after target chosen
      }
    }

    pushUndo();
    setTapped(prev => {
      const next = new Set(prev);
      if (wasTapped) {
        next.delete(key);
        if (cardMana > 0) {
          addLog(`Untapped ${card} (−${cardMana} mana).`, COLORS.textDim);
        } else {
          addLog(`Untapped ${card}.`, COLORS.textDim);
        }
      } else {
        next.add(key);
        if (cardMana > 0) {
          addLog(`Tapped ${card} for ${cardMana} mana.`, COLORS.green1);
        } else {
          addLog(`Tapped ${card}.`, COLORS.textDim);
        }
      }
      return next;
    });
    if (cardMana > 0) {
      const delta = wasTapped ? -cardMana : cardMana;
      setManaPool(prev => Math.max(0, prev + delta));
      flashMana(delta);
    }
  }

  // Wirewood Lodge / untap-elf: confirm target
  function confirmUntapTarget(targetCard, targetIdx) {
    const { card, i } = showUntapModal;
    pushUndo();
    // Tap the Lodge/untapper
    const key = cardKey(card, i);
    setTapped(prev => { const next = new Set(prev); next.add(key); return next; });
    // Untap the target elf
    const targetKey = cardKey(targetCard, targetIdx);
    setTapped(prev => { const next = new Set(prev); next.delete(targetKey); return next; });
    addLog(`Tapped ${card} → untapped ${targetCard}.`, COLORS.green1);
    setShowUntapModal(null);
  }

  // ── COUNTERS ────────────────────────────────────────────────
  function adjustCounter(card, i, delta) {
    const key = cardKey(card, i);
    setCounters(prev => {
      const cur = prev[key] ?? 0;
      const next = Math.max(0, cur + delta);
      const updated = { ...prev, [key]: next };
      if (next === 0) delete updated[key];
      return updated;
    });
  }

  // ── CAST FROM HAND (single click) ───────────────────────────
  function castFromHand(card, idx) {
    const cardData = getCard(card);
    const type = cardData?.type;
    const cmc = cardData?.cmc ?? 0;
    pushUndo();
    // Remove from hand
    setHand(prev => [...prev.slice(0, idx), ...prev.slice(idx + 1)]);
    // Deduct mana cost from pool
    if (cmc > 0) { setManaPool(p => Math.max(0, p - cmc)); flashMana(-cmc); }
    if (type === "land") {
      if (landPlayed) { addLog(`Already played a land this turn — ${card} returned to hand.`, COLORS.red); setHand(prev => [...prev, card]); return; }
      setBattlefield(prev => [...prev, card]);
      setLandPlayed(true);
      addLog(`Played ${card}.`, COLORS.green1);
    } else if (type === "instant" || type === "sorcery") {
      // GSZ shuffles back into library; Nature's Rhythm exiles itself
      if (card === "Green Sun's Zenith") {
        setLibrary(prev => {
          const lib = [...prev, card];
          // Shuffle in place
          for (let i = lib.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [lib[i], lib[j]] = [lib[j], lib[i]];
          }
          return lib;
        });
        addLog(`Cast ${card} → shuffled back into library.`, COLORS.textMid);
      } else if (card === "Nature's Rhythm") {
        setExile(prev => [...prev, card]);
        addLog(`Cast ${card} → exile (can be cast again once).`, COLORS.textMid);
      } else {
        setGraveyard(prev => [...prev, card]);
        addLog(`Cast ${card} → graveyard.`, COLORS.textMid);
      }
    } else if (type === "creature" || type === "enchantment" || type === "artifact" || type === "planeswalker" || type === "battle") {
      setBattlefield(prev => [...prev, card]);
      addLog(`Cast ${card} → battlefield.`, COLORS.green2);
    } else {
      // Unknown type (e.g. Scryfall-fetched card not yet classified) — treat as permanent
      // unless name suggests a spell. Conservative: go to battlefield.
      setBattlefield(prev => [...prev, card]);
      addLog(`Cast ${card} → battlefield (type: ${type || "unknown"}).`, COLORS.green2);
    }
  }

  // ── YEVA ────────────────────────────────────────────────────
  function castYeva() {
    const inHand = hand.includes("Yeva, Nature's Herald");
    if (inHand) setHand(prev => { const i = prev.indexOf("Yeva, Nature's Herald"); return [...prev.slice(0,i), ...prev.slice(i+1)]; });
    setBattlefield(prev => { const without = prev.filter(c => c !== "Yeva, Nature's Herald"); return [...without, "Yeva, Nature's Herald"]; });
    const totalCost = 4 + yevaTax;
    setYevaTax(prev => prev + 2);
    addLog(`Cast Yeva from ${inHand ? "hand" : "command zone"} for ${totalCost} mana (tax: +${yevaTax}).`, COLORS.green2);
  }

  // ── TAP ALL MANA SOURCES ────────────────────────────────────
  function tapAllMana() {
    pushUndo();
    let totalAdded = 0;
    const newTapped = new Set(tapped);
    battlefield.forEach((card, i) => {
      const data = CARDS[card] ?? EXTRA_CARDS.get(card);
      const isManaSource = data?.type === "land" || data?.tags?.includes("dork") || data?.tags?.includes("big-dork") || data?.tags?.includes("rock");
      if (!isManaSource) return;
      const key = cardKey(card, i);
      if (newTapped.has(key)) return; // already tapped
      newTapped.add(key);
      const m = calculateCardManaForPool(card, battlefield);
      totalAdded += m;
    });
    setTapped(newTapped);
    if (totalAdded > 0) {
      setManaPool(p => p + totalAdded);
      flashMana(totalAdded);
      addLog(`Tapped all mana sources — +${totalAdded} mana.`, COLORS.green1);
    } else {
      addLog("No untapped mana sources.", COLORS.textDim);
    }
  }

  // ── TUTOR ───────────────────────────────────────────────────
  function openTutor() { setShowTutor(true); setTutorQuery(""); setTimeout(() => tutorInputRef.current?.focus(), 50); }

  function tutorCard(card) {
    const idx = library.indexOf(card);
    if (idx === -1) { addLog(`${card} not found in library.`, COLORS.red); return; }
    setLibrary(prev => [...prev.slice(0, idx), ...prev.slice(idx + 1)]);
    setHand(prev => [...prev, card]);
    setShowTutor(false); setTutorQuery("");
    addLog(`Tutored: ${card} → hand. Library shuffled.`, COLORS.purple);
  }

  // ── SCRY ────────────────────────────────────────────────────
  function openScry(n) {
    const top = library.slice(0, n);
    setScryOrder(top);
    setScryBottom(new Set());
    setShowScry(true);
    setScryN(n);
  }

  function scryToggleBottom(idx) {
    setScryBottom(prev => { const next = new Set(prev); next.has(idx) ? next.delete(idx) : next.add(idx); return next; });
  }

  function scryMoveUp(idx) {
    if (idx === 0) return;
    setScryOrder(prev => { const a = [...prev]; [a[idx-1], a[idx]] = [a[idx], a[idx-1]]; return a; });
  }

  function scryMoveDown(idx) {
    setScryOrder(prev => { if (idx >= prev.length - 1) return prev; const a = [...prev]; [a[idx], a[idx+1]] = [a[idx+1], a[idx]]; return a; });
  }

  function confirmScry() {
    const keep = scryOrder.filter((_, i) => !scryBottom.has(i));
    const bottom = scryOrder.filter((_, i) => scryBottom.has(i));
    setLibrary(prev => [...keep, ...prev.slice(scryN), ...shuffleArray(bottom)]);
    setShowScry(false);
    addLog(`Scried ${scryN}: kept ${keep.length} on top${bottom.length > 0 ? `, bottomed ${bottom.length}` : ""}.`, COLORS.blue);
  }

  // ── FETCH CRACK ─────────────────────────────────────────────
  function crackFetch(card, fromZone) {
    // Move fetch to graveyard
    if (fromZone === "hand") setHand(prev => { const i = prev.indexOf(card); return [...prev.slice(0,i), ...prev.slice(i+1)]; });
    else if (fromZone === "battlefield") {
      setBattlefield(prev => { const i = prev.indexOf(card); return [...prev.slice(0,i), ...prev.slice(i+1)]; });
      setTapped(prev => { const next = new Set(prev); next.delete(card + ":" + battlefield.indexOf(card)); return next; });
    }
    setGraveyard(prev => [...prev, card]);
    // Find a Forest in library
    const forestIdx = library.findIndex(c => c === "Forest" || getCard(c)?.tags?.includes("forest") || getCard(c)?.tags?.includes("basic"));
    if (forestIdx === -1) {
      addLog(`Cracked ${card} → graveyard, but no Forest found in library.`, COLORS.red);
    } else {
      const found = library[forestIdx];
      setLibrary(prev => [...prev.slice(0, forestIdx), ...prev.slice(forestIdx + 1)]);
      setBattlefield(prev => [...prev, found]);
      setLandPlayed(true);
      addLog(`Cracked ${card} → graveyard. Fetched ${found} → battlefield (tapped).`, COLORS.green1);
      // Fetched land enters tapped
      setBattlefield(prev => {
        const newIdx = prev.length; // will be appended
        setTapped(t => { const next = new Set(t); next.add(`${found}:${newIdx}`); return next; });
        return prev;
      });
    }
    closeContextMenu();
  }

  // ── MOVE CARD (context menu) ─────────────────────────────────
  function openContextMenu(card, index, zone, e) {
    e.preventDefault(); e.stopPropagation();
    setContextMenu({ card, index, zone, x: e.clientX, y: e.clientY });
  }
  function closeContextMenu() { setContextMenu(null); }

  function moveCard(card, fromZone, toZone, fromIndex) {
    const removeFn = (setter, arr) => setter(prev => {
      const i = fromIndex !== undefined ? fromIndex : prev.indexOf(card);
      return i === -1 ? prev : [...prev.slice(0, i), ...prev.slice(i + 1)];
    });
    if (fromZone === "hand") removeFn(setHand, hand);
    else if (fromZone === "battlefield") {
      removeFn(setBattlefield, battlefield);
      // Clean up tap/counter state for this card
      const key = cardKey(card, fromIndex ?? battlefield.indexOf(card));
      setTapped(prev => { const next = new Set(prev); next.delete(key); return next; });
      setCounters(prev => { const next = { ...prev }; delete next[key]; return next; });
    }
    else if (fromZone === "graveyard") removeFn(setGraveyard, graveyard);
    else if (fromZone === "exile") removeFn(setExile, exile);
    else if (fromZone === "library") setLibrary(prev => { const i = prev.indexOf(card); return i === -1 ? prev : [...prev.slice(0,i), ...prev.slice(i+1)]; });

    if (toZone === "hand") setHand(prev => [...prev, card]);
    else if (toZone === "battlefield") {
      const type = getCard(card)?.type;
      if (type === "instant" || type === "sorcery") {
        if (card === "Green Sun's Zenith") {
          setLibrary(prev => {
            const lib = [...prev, card];
            for (let i = lib.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [lib[i], lib[j]] = [lib[j], lib[i]]; }
            return lib;
          });
          addLog(`${card} → shuffled into library.`, COLORS.textDim);
        } else {
          setGraveyard(prev => [...prev, card]);
          addLog(`${card} → graveyard (instant/sorcery).`, COLORS.textDim);
        }
        closeContextMenu(); return;
      }
      setBattlefield(prev => [...prev, card]);
    }
    else if (toZone === "graveyard") setGraveyard(prev => [...prev, card]);
    else if (toZone === "exile") { setExile(prev => [...prev, card]); addLog(`${card} exiled.`, COLORS.textDim); closeContextMenu(); return; }

    addLog(`${card}: ${fromZone} → ${toZone}.`, COLORS.textMid);
    closeContextMenu();
  }

  function exportToAdvisor() {
    onLoadState({ hand, battlefield, graveyard, mana: calculateBattlefieldMana(untappedBattlefield), isMyTurn });
    onClose();
  }

  function runGames() {
    if (!hasDeck || runNRunning) return;
    setRunNRunning(true);
    setRunNResults(null);
    // Defer to next tick so the UI can show the spinner before blocking
    setTimeout(() => {
      try {
        const results = runNGames(deckCards, runNCount, runNMaxTurns);
        setRunNResults(results);
      } catch (e) {
        console.error("runNGames error:", e);
      }
      setRunNRunning(false);
    }, 20);
  }

  // ── DRAG AND DROP ───────────────────────────────────────────
  function onDragStart(card, fromZone, fromIndex, e) {
    setDragCard({ card, fromZone, fromIndex });
    e.dataTransfer.effectAllowed = "move";
  }

  function onDragEnd() {
    setDragCard(null);
    setDragOver(null);
  }

  function onDropZone(toZone, e) {
    e.preventDefault();
    setDragOver(null);
    if (!dragCard || dragCard.fromZone === toZone) { setDragCard(null); return; }
    moveCard(dragCard.card, dragCard.fromZone, toZone, dragCard.fromIndex);
    setDragCard(null);
  }

  function dropZoneProps(zoneName) {
    return {
      onDragOver: (e) => { e.preventDefault(); setDragOver(zoneName); },
      onDragLeave: () => setDragOver(z => z === zoneName ? null : z),
      onDrop: (e) => onDropZone(zoneName, e),
    };
  }

  // ── HAND GRADER ─────────────────────────────────────────────
  function gradeHand(cards, advisorAnalysis) {
    const dorks  = cards.filter(c => getCard(c)?.tags?.includes("dork")).length;
    const lands  = cards.filter(c => getCard(c)?.type === "land").length;
    const tutors = cards.filter(c => getCard(c)?.tags?.includes("tutor")).length;
    const combo  = cards.filter(c => getCard(c)?.tags?.some(t =>
      ["ashaya","duskwatch","quirion","earthcraft","wirewood"].includes(t))).length;
    const canMakeT1Mana = lands >= 1 || dorks >= 2;
    let notes = [];

    // Rule 1: dork + tutor = keep (core game plan)
    if (dorks >= 1 && tutors >= 1) {
      if (canMakeT1Mana) {
        notes.push(`${dorks} dork${dorks > 1 ? "s" : ""} + ${tutors} tutor${tutors > 1 ? "s" : ""} ✓✓ — core game plan`);
        if (lands === 0) notes.push("0 lands — dork must stick T1");
        if (combo >= 1) notes.push(`${combo} combo piece${combo > 1 ? "s" : ""} in hand`);
        return enrichWithAnalysis({ grade: { label: "KEEP", color: COLORS.green2 }, notes }, advisorAnalysis);
      } else {
        notes.push("dork + tutor but no mana to cast them ✗");
        return enrichWithAnalysis({ grade: { label: "MULLIGAN", color: COLORS.red }, notes }, advisorAnalysis);
      }
    }

    // Rule 2: no dork = can't execute game plan
    if (dorks === 0) {
      if (tutors >= 1) {
        notes.push(`${tutors} tutor${tutors > 1 ? "s" : ""} but no dork ✗ — can find one but can't cast it T1`);
      } else {
        notes.push("no dorks, no tutors ✗ — can't execute game plan");
        if (combo >= 1) notes.push(`${combo} combo piece${combo > 1 ? "s" : ""} with no way to find the rest`);
      }
      return enrichWithAnalysis({ grade: { label: "MULLIGAN", color: COLORS.red }, notes }, advisorAnalysis);
    }

    // Remaining: dork(s) but no tutor
    let score = 0;
    if (lands >= 2 && lands <= 4)      { score += 2; notes.push(`${lands} lands ✓`); }
    else if (lands === 1 && dorks >= 2) { score += 2; notes.push("1 land + 2+ dorks ✓"); }
    else if (lands === 1)               { score += 0; notes.push("1 land, 1 dork — tight"); }
    else if (lands === 0)               { score -= 2; notes.push("no lands ✗"); }
    else                                { score += 1; notes.push(`${lands} lands (mana-heavy)`); }

    if (dorks >= 2) { score += 3; notes.push(`${dorks} dorks ✓✓`); }
    else            { score += 1; notes.push("1 dork, no tutor — slow"); }

    if (combo >= 1 && (dorks >= 1 || lands >= 2)) {
      score += 1; notes.push(`${combo} combo piece${combo > 1 ? "s" : ""} in hand`);
    }
    notes.push("no tutor — relying on draw steps");

    const grade = score >= 5 ? { label: "KEEP",       color: COLORS.green2 }
                : score >= 2 ? { label: "BORDERLINE", color: COLORS.gold   }
                :              { label: "MULLIGAN",    color: COLORS.red    };
    return enrichWithAnalysis({ grade, notes }, advisorAnalysis);
  }

  // Layer advisor analysis signals on top of the structural hand grade
  function enrichWithAnalysis({ grade, notes }, analysis) {
    if (!analysis) return { grade, notes };
    const results = analysis.results ?? [];
    const live = results.filter(r => !r.isSuppressed);
    const suppressed = results.filter(r => r.isSuppressed);
    const topCat = live[0]?.category ?? "";
    const advisorNotes = [];

    // Infinite mana somehow in hand — override to KEEP
    if (analysis.infiniteManaActive) {
      advisorNotes.push("∞ Infinite mana line available in hand");
      grade = { label: "KEEP", color: COLORS.green2 };
    }
    // WIN NOW
    else if (topCat.includes("WIN NOW") || topCat.includes("INSTANT SPEED WIN")) {
      advisorNotes.push("🔥 WIN NOW line in opening hand");
      grade = { label: "KEEP", color: COLORS.green2 };
    }
    // WIN NEXT TURN
    else if (topCat.includes("WIN NEXT")) {
      advisorNotes.push("⚡ WIN NEXT TURN line available");
      if (grade.label === "MULLIGAN") grade = { label: "BORDERLINE", color: COLORS.gold };
    }
    // Suppressed wins = one piece away — surface the missing piece
    else if (suppressed.length > 0) {
      const s = suppressed[0];
      // Reason is after the colon in the headline
      const reasonRaw = (s.headline ?? "").replace(/^[^:]+:\s*/, "");
      const reason = reasonRaw.length > 60 ? reasonRaw.slice(0, 57) + "…" : reasonRaw;
      if (reason) {
        advisorNotes.push(`1 piece away — need: ${reason}`);
        if (grade.label === "MULLIGAN") grade = { label: "BORDERLINE", color: COLORS.gold };
      }
      if (suppressed.length > 1) {
        advisorNotes.push(`(+${suppressed.length - 1} other suppressed line${suppressed.length > 2 ? "s" : ""})`);
      }
    }

    // High-confidence lines (engine/loop/tutor plays)
    const highConf = live.filter(r => r.confidence === "certain" || r.confidence === "high");
    if (highConf.length >= 2) {
      advisorNotes.push(`${highConf.length} high-value advisor lines`);
    } else if (highConf.length === 1 && advisorNotes.length === 0) {
      advisorNotes.push(`Advisor: ${(live[0].category ?? live[0].headline ?? "").slice(0, 55)}`);
    }

    return { grade, notes: [...notes, ...advisorNotes] };
  }


  // Close context menu on any mousedown outside it
  useEffect(() => {
    if (!contextMenu) return;
    const handler = () => { closeContextMenu(); };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, [contextMenu]);

  // ── renderCard — card pill with hover image ──────────────────
  // Defined as a render function (not a component) so React doesn't
  // remount it on every parent render, which would kill hover state
  // and cause the context menu to disappear.
  const renderCard = (card, i, zone, { isTap = false, curCount = 0, onClick, style: extraStyle } = {}) => {
    const isLand = getCard(card)?.type === "land";
    const fetch = isFetch(card);
    return (
      <HoverCard key={`${zone}:${card}:${i}`} card={card}>
        {(rect, hovered) => (
          <span
            draggable
            onDragStart={e => onDragStart(card, zone, i, e)}
            onDragEnd={onDragEnd}
            onClick={onClick}
            onContextMenu={e => openContextMenu(card, i, zone, e)}
            style={{ ...cardPillStyle(isTap, false), ...extraStyle }}>
            {isTap ? "↷ " : ""}{card}
            {curCount > 0 && (
              <span style={{ background: COLORS.gold, color: "#000", borderRadius: "10px", padding: "0 5px", fontSize: "9px", fontWeight: "bold" }}>
                {curCount}
              </span>
            )}
            {isLand && zone === "hand" && <span style={{ fontSize: "9px", color: COLORS.textDim }}>🌲</span>}
            {fetch && <span style={{ fontSize: "9px", color: COLORS.blue }}>⚓</span>}
            {hovered && <CardTooltip name={card} anchorRect={rect} />}
          </span>
        )}
      </HoverCard>
    );
  };

  // ── render helpers ──────────────────────────────────────────
  const isFetch = (card) => getCard(card)?.tags?.includes("fetch");

  const cardPillStyle = (isTapped, isSelected) => ({
    display: "inline-flex", alignItems: "center", gap: "4px",
    padding: "3px 7px", margin: "2px",
    background: isSelected ? "#1a3a1a" : isTapped ? "#150f05" : "#0f1e0f",
    border: `1px solid ${isSelected ? COLORS.green1 : isTapped ? "#5a4010" : COLORS.border}`,
    borderRadius: "4px", fontSize: "11px",
    color: isSelected ? COLORS.green2 : isTapped ? "#9a7830" : COLORS.textMid,
    cursor: "pointer", userSelect: "none",
    fontFamily: "'Crimson Text', serif",
    opacity: isTapped ? 0.75 : 1,
    fontStyle: isTapped ? "italic" : "normal",
    transition: "all 0.1s",
  });

  const zoneLabel = (label, count, color) => (
    <div style={{ fontSize: "10px", letterSpacing: "2px", color: color || COLORS.textDim,
      fontFamily: "'Cinzel', serif", marginBottom: "6px", display: "flex", justifyContent: "space-between" }}>
      <span>{label}</span><span style={{ color: COLORS.textDim }}>{count}</span>
    </div>
  );

  const btnStyle = (color) => ({
    background: "none", border: `1px solid ${color || COLORS.border}`, borderRadius: "6px",
    padding: "4px 10px", color: color || COLORS.textDim, cursor: "pointer",
    fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "1px", flexShrink: 0,
  });

  // ── Context menu popup ───────────────────────────────────────
  const ContextMenuPopup = () => {
    if (!contextMenu) return null;
    const { card, index, zone } = contextMenu;
    const targets = ["battlefield", "hand", "graveyard", "exile"].filter(z => z !== zone);
    const canFetch = isFetch(card) && (zone === "hand" || zone === "battlefield");
    const isBF = zone === "battlefield";
    const key = cardKey(card, index);
    const isCardTapped = tapped.has(key);
    const curCounters = counters[key] ?? 0;
    return (
      <div onClick={e => e.stopPropagation()} onMouseDown={e => e.stopPropagation()} style={{
        position: "fixed", left: Math.min(contextMenu.x, window.innerWidth - 200), top: Math.min(contextMenu.y, window.innerHeight - 300),
        zIndex: 9999, background: "#0d1f0d", border: `1px solid ${COLORS.borderBright}`,
        borderRadius: "8px", padding: "6px 0", minWidth: "190px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.8)", fontFamily: "'Cinzel', serif", fontSize: "11px",
      }}>
        <div style={{ padding: "6px 14px 4px", color: COLORS.green3, fontSize: "10px", letterSpacing: "1px", borderBottom: `1px solid ${COLORS.border}`, marginBottom: "4px" }}>
          {card}
        </div>
        {/* Tap/untap for battlefield cards */}
        {isBF && (
          <div onClick={() => { toggleTap(card, index); closeContextMenu(); }} style={{ padding: "6px 14px", cursor: "pointer", color: isCardTapped ? COLORS.green2 : COLORS.textMid, letterSpacing: "1px" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#1a3a1a"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
            {isCardTapped ? "↺ Untap" : "↷ Tap"}
          </div>
        )}
        {/* Counters for battlefield cards */}
        {isBF && (
          <div style={{ padding: "4px 14px", display: "flex", alignItems: "center", gap: "8px", borderBottom: `1px solid ${COLORS.border}`, marginBottom: "4px" }}>
            <span style={{ color: COLORS.textDim, fontSize: "10px", letterSpacing: "1px" }}>COUNTERS</span>
            <button onClick={(e) => { e.stopPropagation(); adjustCounter(card, index, -1); }} style={{ ...btnStyle(COLORS.red), padding: "1px 7px", fontSize: "12px" }}>−</button>
            <span style={{ color: curCounters > 0 ? COLORS.gold : COLORS.textDim, minWidth: "20px", textAlign: "center", fontSize: "12px" }}>{curCounters}</span>
            <button onClick={(e) => { e.stopPropagation(); adjustCounter(card, index, +1); }} style={{ ...btnStyle(COLORS.green1), padding: "1px 7px", fontSize: "12px" }}>+</button>
          </div>
        )}
        {/* Fetch crack */}
        {canFetch && (
          <div onClick={() => crackFetch(card, zone)} style={{ padding: "6px 14px", cursor: "pointer", color: COLORS.gold, letterSpacing: "1px" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#1a1a0a"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
            🌊 Crack Fetch → Forest
          </div>
        )}
        {/* Zone moves */}
        {targets.map(t => (
          <div key={t} onClick={() => moveCard(card, zone, t, index)} style={{ padding: "6px 14px", cursor: "pointer", color: COLORS.textMid, letterSpacing: "1px" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#1a3a1a"; e.currentTarget.style.color = COLORS.green2; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = COLORS.textMid; }}>
            → {t.charAt(0).toUpperCase() + t.slice(1)}
          </div>
        ))}
      </div>
    );
  };

  // ── Keyboard shortcuts ───────────────────────────────────────
  useEffect(() => {
    if (phase !== "playing") return;
    const handler = (e) => {
      const tag = document.activeElement?.tagName;
      const inInput = tag === "INPUT" || tag === "TEXTAREA";
      if (inInput) return;
      if ((e.key === "z" || e.key === "Z") && (e.ctrlKey || e.metaKey)) { e.preventDefault(); applyUndo(); return; }
      if (e.key === "n" || e.key === "N") { e.preventDefault(); nextTurn(); }
      if (e.key === "u" || e.key === "U") { e.preventDefault(); untapAll(); }
      if (e.key === "t" || e.key === "T") { e.preventDefault(); openTutor(); }
      if (e.key === "d" || e.key === "D") { e.preventDefault(); drawCard(1); }
      if (e.key === "m" || e.key === "M") { e.preventDefault(); tapAllMana(); }
      if (e.key === "Escape") {
        const anyOpen = showUntapModal || showTutor || showScry || contextMenu;
        if (anyOpen) { e.stopPropagation(); setShowUntapModal(null); setShowTutor(false); setShowScry(false); setContextMenu(null); }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, hand, battlefield, graveyard, library, tapped, manaPool, landPlayed, log, showUntapModal, showTutor, showScry, contextMenu]);

  // ── Untap target modal (Wirewood Lodge etc) ──────────────────
  const UntapModal = () => {
    if (!showUntapModal) return null;
    const { card, targets } = showUntapModal;
    return (
      <div onClick={() => setShowUntapModal(null)} style={{ position: "absolute", inset: 0, zIndex: 700, background: "#000000bb", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div onClick={e => e.stopPropagation()} style={{ background: COLORS.bg, border: `1px solid ${COLORS.green1}`, borderRadius: "10px", padding: "16px", minWidth: "240px", maxWidth: "340px" }}>
          <div style={{ fontSize: "10px", color: COLORS.green1, letterSpacing: "2px", fontFamily: "'Cinzel', serif", marginBottom: "10px" }}>
            TAP {card.toUpperCase()} — UNTAP WHICH ELF?
          </div>
          {targets.map(({ c, idx }) => (
            <div key={`${c}:${idx}`} onClick={() => confirmUntapTarget(c, idx)}
              style={{ padding: "7px 12px", cursor: "pointer", borderRadius: "5px", fontSize: "12px", color: COLORS.textMid, fontFamily: "'Crimson Text', serif", marginBottom: "3px", border: `1px solid ${COLORS.border}` }}
              onMouseEnter={e => { e.currentTarget.style.background = "#1a3a1a"; e.currentTarget.style.color = COLORS.green2; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = COLORS.textMid; }}>
              {c}
              <span style={{ fontSize: "10px", color: COLORS.textDim, marginLeft: "8px" }}>{getCard(c)?.tags?.includes("big-dork") ? "big dork" : "elf"}</span>
            </div>
          ))}
          <button onClick={() => setShowUntapModal(null)} style={{ marginTop: "8px", width: "100%", background: "none", border: `1px solid ${COLORS.border}`, borderRadius: "6px", padding: "4px", color: COLORS.textDim, cursor: "pointer", fontFamily: "'Cinzel', serif", fontSize: "10px" }}>✕ CANCEL (Esc)</button>
        </div>
      </div>
    );
  };

  // ── Scry modal ───────────────────────────────────────────────
  const ScryModal = () => {
    if (!showScry) return null;
    return (
      <div onClick={e => e.stopPropagation()} style={{
        position: "absolute", left: 0, top: 0, right: 0, bottom: 0, zIndex: 600,
        background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          background: "#0d1f0d", border: `1px solid ${COLORS.blue}`,
          borderRadius: "10px", padding: "20px", minWidth: "320px", maxWidth: "400px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.9)",
        }}>
          <div style={{ fontSize: "11px", color: COLORS.blue, letterSpacing: "2px", fontFamily: "'Cinzel', serif", marginBottom: "14px" }}>
            LOOK AT TOP {scryN} — REORDER OR BOTTOM
          </div>
          <div style={{ fontSize: "11px", color: COLORS.textDim, fontFamily: "'Crimson Text', serif", marginBottom: "12px" }}>
            Click ✕ to bottom a card. Use ↑↓ to reorder top cards.
          </div>
          {scryOrder.map((card, i) => {
            const toBottom = scryBottom.has(i);
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px",
                padding: "7px 10px", borderRadius: "6px",
                background: toBottom ? "#1a0a0a" : "#0f1e0f",
                border: `1px solid ${toBottom ? COLORS.red + "88" : COLORS.border}`,
                opacity: toBottom ? 0.5 : 1,
              }}>
                <span style={{ flex: 1, fontSize: "12px", color: toBottom ? COLORS.textDim : COLORS.text, fontFamily: "'Crimson Text', serif", textDecoration: toBottom ? "line-through" : "none" }}>
                  {i + 1}. {card}
                  {getCard(card) && <span style={{ fontSize: "10px", color: COLORS.textDim, marginLeft: "6px" }}>{getCard(card).type}</span>}
                </span>
                {!toBottom && (
                  <>
                    <button onClick={() => scryMoveUp(i)} disabled={i === 0} style={{ ...btnStyle(COLORS.textDim), padding: "1px 6px", opacity: i === 0 ? 0.3 : 1 }}>↑</button>
                    <button onClick={() => scryMoveDown(i)} disabled={i === scryOrder.filter((_,j) => !scryBottom.has(j)).length - 1} style={{ ...btnStyle(COLORS.textDim), padding: "1px 6px" }}>↓</button>
                  </>
                )}
                <button onClick={() => scryToggleBottom(i)} style={{ ...btnStyle(toBottom ? COLORS.green1 : COLORS.red), padding: "1px 6px" }}>
                  {toBottom ? "↑" : "✕"}
                </button>
              </div>
            );
          })}
          <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
            <button onClick={confirmScry} style={{
              flex: 1, background: "#1a3a1a", border: `1px solid ${COLORS.green1}`, borderRadius: "6px",
              padding: "8px", color: COLORS.green2, cursor: "pointer", fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "1px",
            }}>✓ CONFIRM</button>
            <button onClick={() => setShowScry(false)} style={{
              background: "none", border: `1px solid ${COLORS.border}`, borderRadius: "6px",
              padding: "8px 14px", color: COLORS.textDim, cursor: "pointer", fontFamily: "'Cinzel', serif", fontSize: "11px",
            }}>✕</button>
          </div>
        </div>
      </div>
    );
  };

  // ── Tutor overlay ─────────────────────────────────────────────
  const TutorOverlay = () => {
    if (!showTutor) return null;
    const q = tutorQuery.toLowerCase();
    const matches = q.length >= 1 ? [...new Set(library)].filter(c => {
      const data = getCard(c);
      return c.toLowerCase().includes(q)
        || (data?.type ?? "").toLowerCase().includes(q)
        || (data?.tags ?? []).some(t => t.toLowerCase().includes(q))
        || (data?.role ?? "").toLowerCase().includes(q);
    }).slice(0, 15) : [];
    return (
      <div style={{
        position: "absolute", left: 0, top: 0, zIndex: 500,
        background: "#0d1f0d", border: `1px solid ${COLORS.purple}`,
        borderRadius: "8px", padding: "12px", boxShadow: "0 4px 24px rgba(0,0,0,0.9)",
        margin: "8px", width: "calc(100% - 16px)",
      }}>
        <div style={{ fontSize: "10px", color: COLORS.purple, letterSpacing: "2px", fontFamily: "'Cinzel', serif", marginBottom: "8px" }}>
          TUTOR — SEARCH LIBRARY ({library.length} cards)
        </div>
        <input ref={tutorInputRef} value={tutorQuery} onChange={e => setTutorQuery(e.target.value)}
          onKeyDown={e => { if (e.key === "Escape") { e.stopPropagation(); setShowTutor(false); setTutorQuery(""); } if (e.key === "Enter" && matches.length === 1) tutorCard(matches[0]); }}
          placeholder="Type card name..." style={{
            width: "100%", background: "#0a150a", border: `1px solid ${COLORS.border}`,
            borderRadius: "6px", padding: "6px 10px", color: COLORS.text,
            fontFamily: "'Crimson Text', serif", fontSize: "13px", outline: "none", marginBottom: "8px",
          }} />
        {matches.length === 0 && tutorQuery.length >= 1 && <div style={{ fontSize: "11px", color: COLORS.textDim, fontStyle: "italic", fontFamily: "'Crimson Text', serif" }}>No matches in library.</div>}
        {matches.map((card, i) => (
          <div key={i} onClick={() => tutorCard(card)} style={{ padding: "6px 10px", cursor: "pointer", borderRadius: "4px", fontSize: "12px", color: COLORS.textMid, fontFamily: "'Crimson Text', serif", marginBottom: "2px" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#1a3a1a"; e.currentTarget.style.color = COLORS.green2; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = COLORS.textMid; }}>
            {card}
            {getCard(card) && (
              <span style={{ fontSize: "10px", color: COLORS.textDim, marginLeft: "8px" }}>
                {getCard(card).type}
                {getCard(card).tags?.includes("dork") ? " · dork" : ""}
                {getCard(card).tags?.includes("tutor") ? " · tutor" : ""}
                {getCard(card).tags?.includes("combo") ? " · combo" : ""}
              </span>
            )}
          </div>
        ))}
        <button onClick={() => { setShowTutor(false); setTutorQuery(""); }} style={{
          marginTop: "8px", background: "none", border: `1px solid ${COLORS.border}`,
          borderRadius: "6px", padding: "4px 12px", color: COLORS.textDim, cursor: "pointer",
          fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "1px", width: "100%",
        }}>✕ CANCEL (Esc)</button>
      </div>
    );
  };

  // ── render ──────────────────────────────────────────────────
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.85)", display: "flex",
      alignItems: "stretch", justifyContent: "center",
      padding: "12px",
    }} onClick={onClose}>
      <div ref={containerRef2} style={{
        background: COLORS.bg, border: `1px solid ${COLORS.borderBright}`,
        borderRadius: "12px", width: "100%", maxWidth: "1400px",
        display: "flex", flexDirection: "column", overflow: "hidden",
      }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{
          display: "flex", alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          padding: isMobile ? "10px 44px 10px 12px" : "14px 52px 14px 20px",
          borderBottom: `1px solid ${COLORS.border}`,
          flexShrink: 0, flexWrap: isMobile ? "wrap" : "nowrap", gap: "8px",
          position: "relative",
        }}>
          {/* Title — takes full width on mobile so buttons wrap below */}
          <div style={{ flex: isMobile ? "1 1 100%" : "0 0 auto" }}>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: isMobile ? "12px" : "14px", color: COLORS.green3, letterSpacing: "2px" }}>
              🐟 GOLDFISH MODE
            </div>
            {activeDeck && (
              <div style={{ fontSize: "11px", color: COLORS.textDim, marginTop: "2px", fontFamily: "'Crimson Text', serif" }}>
                {activeDeck.name} · {deckCards.length} cards
              </div>
            )}
          </div>
          {/* Button row — wraps naturally, ✕ always visible */}
          <div style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" }}>
            {phase === "playing" && !isMobile && (
              <>
                <div style={{ padding: "4px 12px", background: "#1a2e1a", border: `1px solid ${COLORS.border}`, borderRadius: "6px", fontSize: "11px", color: COLORS.textMid, fontFamily: "'Cinzel', serif", letterSpacing: "1px" }}>
                  Turn {turnNumber} · {isMyTurn ? "Your Turn" : "Opp Turn"}
                </div>
                {/* Mana pool tracker */}
                <div style={{ display: "flex", alignItems: "center", gap: "0px", background: "#071407", border: `1px solid ${manaPool > 0 ? COLORS.green1 : COLORS.border}`, borderRadius: "6px", overflow: "visible", transition: "border-color 0.2s", position: "relative" }}>
                  <button onClick={() => { setManaPool(p => Math.max(0, p - 1)); flashMana(-1); }} style={{ background: "none", border: "none", borderRight: `1px solid ${COLORS.border}`, padding: "4px 8px", color: COLORS.textDim, cursor: "pointer", fontSize: "13px", lineHeight: 1 }}>−</button>
                  <div style={{ padding: "4px 10px", fontFamily: "'Cinzel', serif", fontSize: "11px", color: manaPool > 0 ? COLORS.green1 : COLORS.textDim, letterSpacing: "1px", minWidth: "52px", textAlign: "center", position: "relative" }}>
                    {manaPool} <span style={{ fontSize: "9px", opacity: 0.7 }}>MANA</span>
                    {manaPoolDelta && (
                      <span key={manaPoolDelta.id} style={{
                        position: "absolute", top: "-18px", left: "50%", transform: "translateX(-50%)",
                        fontSize: "12px", fontWeight: "bold", pointerEvents: "none", whiteSpace: "nowrap",
                        color: manaPoolDelta.value > 0 ? COLORS.green1 : COLORS.red,
                        animation: "manaFlash 0.9s ease-out forwards",
                      }}>{manaPoolDelta.value > 0 ? `+${manaPoolDelta.value}` : manaPoolDelta.value}</span>
                    )}
                  </div>
                  <button onClick={() => { setManaPool(p => p + 1); flashMana(1); }} style={{ background: "none", border: "none", borderLeft: `1px solid ${COLORS.border}`, padding: "4px 8px", color: COLORS.textDim, cursor: "pointer", fontSize: "13px", lineHeight: 1 }}>+</button>
                </div>
              </>
            )}
            {phase === "playing" && isMobile && (
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <div style={{ padding: "3px 8px", background: "#1a2e1a", border: `1px solid ${COLORS.border}`, borderRadius: "6px", fontSize: "10px", color: COLORS.textMid, fontFamily: "'Cinzel', serif" }}>
                  T{turnNumber}
                </div>
                <div style={{ display: "flex", alignItems: "center", background: "#071407", border: `1px solid ${manaPool > 0 ? COLORS.green1 : COLORS.border}`, borderRadius: "6px", overflow: "hidden" }}>
                  <button onClick={() => setManaPool(p => Math.max(0, p - 1))} style={{ background: "none", border: "none", borderRight: `1px solid ${COLORS.border}`, padding: "3px 6px", color: COLORS.textDim, cursor: "pointer", fontSize: "12px" }}>−</button>
                  <span style={{ padding: "3px 7px", fontFamily: "'Cinzel', serif", fontSize: "10px", color: manaPool > 0 ? COLORS.green1 : COLORS.textDim }}>{manaPool}◆</span>
                  <button onClick={() => setManaPool(p => p + 1)} style={{ background: "none", border: "none", borderLeft: `1px solid ${COLORS.border}`, padding: "3px 6px", color: COLORS.textDim, cursor: "pointer", fontSize: "12px" }}>+</button>
                </div>
              </div>
            )}
            {phase === "playing" && (
              <>
                <button onClick={tapAllMana} title="Tap every untapped land, dork, and mana rock on the battlefield and fill the mana pool to its maximum (M)"
                  style={{ background: "none", border: `1px solid ${COLORS.green1}`, borderRadius: "6px", padding: isMobile ? "4px 8px" : "5px 12px", color: COLORS.green1, cursor: "pointer", fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "1px" }}
                  onMouseEnter={e => { e.target.style.background = "#0a1f0a"; }}
                  onMouseLeave={e => { e.target.style.background = "transparent"; }}
                >⚡ {isMobile ? "" : "TAP ALL"}{isMobile && "TAP"}</button>
                <button onClick={applyUndo} disabled={undoStack.current.length === 0} title="Undo the last action. Up to 20 levels of undo are stored per game (Ctrl+Z)"
                  style={{ background: "none", border: `1px solid ${undoStack.current.length > 0 ? COLORS.textMid : COLORS.border}`, borderRadius: "6px", padding: isMobile ? "4px 8px" : "5px 12px", color: undoStack.current.length > 0 ? COLORS.textMid : COLORS.border, cursor: undoStack.current.length > 0 ? "pointer" : "default", fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "1px" }}
                  onMouseEnter={e => { if (undoStack.current.length > 0) e.target.style.background = "#1a1a1a"; }}
                  onMouseLeave={e => { e.target.style.background = "transparent"; }}
                >↩ {isMobile ? "" : "UNDO"}{isMobile && "↩"}</button>
                <button onClick={exportToAdvisor} style={{
                  background: "none", border: `1px solid ${COLORS.blue}`, borderRadius: "6px",
                  padding: isMobile ? "4px 8px" : "5px 12px", color: COLORS.blue, cursor: "pointer",
                  fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "1px",
                }}
                  onMouseEnter={e => { e.target.style.background = "#0a1a2e"; }}
                  onMouseLeave={e => { e.target.style.background = "transparent"; }}
                  title="Send this board state to the main advisor"
                >↗ {isMobile ? "" : "EXPORT"}{isMobile && "EXP"}</button>
                <button onClick={endGame} style={{
                  background: "none", border: `1px solid ${COLORS.gold}`, borderRadius: "6px",
                  padding: isMobile ? "4px 8px" : "5px 12px", color: COLORS.gold, cursor: "pointer",
                  fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "1px",
                }}
                  onMouseEnter={e => { e.target.style.background = "#1a1a0a"; }}
                  onMouseLeave={e => { e.target.style.background = "transparent"; }}
                  title="End this game and record stats"
                >★ {isMobile ? "END" : "END GAME"}</button>
              </>
            )}
            {gameHistory.length > 0 && (
              <button onClick={() => setPhase("stats")} title="View win rate, average turn, mana curve, and win condition breakdown across all recorded games for this deck" style={{
                background: phase === "stats" ? "#1a1a0a" : "none",
                border: `1px solid ${COLORS.gold}`, borderRadius: "6px",
                padding: isMobile ? "4px 8px" : "5px 10px", color: COLORS.gold, cursor: "pointer",
                fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "1px",
              }}>★ {isMobile ? `${gameHistory.length}` : `STATS (${gameHistory.length})`}</button>
            )}
            {phase === "playing" && (
              <button onClick={() => setPhase("setup")} title="Abandon this game and return to setup — current game will not be recorded" style={{
                background: "none", border: `1px solid ${COLORS.border}`, borderRadius: "6px",
                padding: isMobile ? "4px 8px" : "5px 10px", color: COLORS.textDim, cursor: "pointer",
                fontFamily: "'Cinzel', serif", fontSize: "11px",
              }}
                onMouseEnter={e => { e.target.style.borderColor = COLORS.red; e.target.style.color = COLORS.red; }}
                onMouseLeave={e => { e.target.style.borderColor = COLORS.border; e.target.style.color = COLORS.textDim; }}
              >↺ {isMobile ? "" : "NEW GAME"}{isMobile && "NEW"}</button>
            )}
            <button onClick={onClose} style={{
              position: "absolute", top: "10px", right: "12px",
              background: "none", border: `1px solid ${COLORS.border}`, borderRadius: "6px",
              padding: "4px 10px", color: COLORS.textDim, cursor: "pointer",
              fontFamily: "'Cinzel', serif", fontSize: "13px", zIndex: 10,
            }}>✕</button>
          </div>
        </div>

        {/* Body */}
        {phase === "setup" && (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
            <div style={{ textAlign: "center", maxWidth: "420px" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🐟</div>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "16px", color: COLORS.green3, letterSpacing: "2px", marginBottom: "12px" }}>
                GOLDFISH MODE
              </div>
              <div style={{ fontSize: "14px", color: COLORS.textMid, fontFamily: "'Crimson Text', serif", lineHeight: 1.6, marginBottom: "28px" }}>
                {hasDeck
                  ? <>Shuffle and deal from <strong style={{ color: COLORS.text }}>{activeDeck.name}</strong> ({deckCards.length} cards). Draw an opening hand, manage mulligans, play through turns, and get real-time advisor guidance each turn.</>
                  : <>No deck loaded. Load a deck from the main screen first, then return here to goldfish.</>
                }
              </div>
              {hasDeck && (
                <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                  <button onClick={() => startGame()} style={{
                    background: "#1a3a1a", border: `1px solid ${COLORS.green1}`,
                    borderRadius: "8px", padding: "10px 28px", color: COLORS.green2,
                    cursor: "pointer", fontFamily: "'Cinzel', serif", fontSize: "13px", letterSpacing: "1px",
                  }}
                    onMouseEnter={e => { e.target.style.background = "#1f4a1f"; }}
                    onMouseLeave={e => { e.target.style.background = "#1a3a1a"; }}
                  >🂠 DEAL OPENING HAND</button>
                </div>
              )}
              {!hasDeck && (
                <button onClick={onClose} style={{
                  background: "none", border: `1px solid ${COLORS.border}`,
                  borderRadius: "8px", padding: "10px 24px", color: COLORS.textDim,
                  cursor: "pointer", fontFamily: "'Cinzel', serif", fontSize: "12px", letterSpacing: "1px",
                }}>← BACK</button>
              )}
            </div>
          </div>
        )}

        {phase === "mulligan" && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px", overflow: "hidden" }}>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: "12px", color: COLORS.gold, letterSpacing: "2px", marginBottom: "12px", flexShrink: 0 }}>
              OPENING HAND {mulliganCount > 0 ? `(Mulligan #${mulliganCount})` : ""} · {hand.length} CARDS
              {phase2 === "bottoming" && (
                <span style={{ marginLeft: "16px", color: COLORS.textDim, fontSize: "11px" }}>
                  — click cards to send to bottom
                </span>
              )}
            </div>

            {/* Card image row — scrolls horizontally on mobile */}
            <div style={{
              display: "flex", gap: "10px", flexWrap: isMobile ? "nowrap" : "wrap",
              overflowX: isMobile ? "auto" : "visible",
              marginBottom: "16px", alignItems: "flex-end",
              minHeight: isMobile ? undefined : "220px",
              padding: "8px 4px",
              flexShrink: isMobile ? 0 : undefined,
            }}>
              {hand.map((card, i) => {
                const key = `${card}:${i}`;
                const toBottom = pendingBottoms.includes(key);
                return (
                  <MulliganCard
                    key={`${card}-${i}`}
                    card={card}
                    toBottom={toBottom}
                    selectable={phase2 === "bottoming"}
                    onClick={() => phase2 === "bottoming" && toggleBottom(card, i)}
                  />
                );
              })}
            </div>

            {phase2 === "bottoming" && (
              <div style={{ marginTop: "8px", marginBottom: "8px", padding: "12px 16px", background: "#1a1a0a", border: `1px solid ${COLORS.gold}`, borderRadius: "8px", fontSize: "12px", color: COLORS.gold, fontFamily: "'Cinzel', serif", letterSpacing: "1px", display: "flex", alignItems: "center", gap: "16px", position: "relative", zIndex: 10 }}>
                <span>{Math.max(0, mulliganCount - 1) - pendingBottoms.length > 0
                  ? `Choose ${Math.max(0, mulliganCount - 1) - pendingBottoms.length} more card${Math.max(0, mulliganCount - 1) - pendingBottoms.length !== 1 ? "s" : ""} to bottom.`
                  : "All cards selected."
                }</span>
                {pendingBottoms.length === Math.max(0, mulliganCount - 1) && (
                  <button onClick={confirmBottom} style={{
                    background: "#1a1a0a", border: `1px solid ${COLORS.gold}`,
                    borderRadius: "6px", padding: "4px 16px", color: COLORS.gold, cursor: "pointer",
                    fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "1px",
                  }}>✓ CONFIRM</button>
                )}
              </div>
            )}

            {phase2 === "bottoming" && (() => {
              const bottomCount = Math.max(0, mulliganCount - 1);
              const suggested = scoreMulliganHand(hand);
              const suggestedBottoms = selectBottomsFromScored(suggested, bottomCount);
              return (
                <div style={{ marginBottom: "16px", padding: "10px 14px", background: "#0d1a0a", border: `1px solid ${COLORS.green1}44`, borderRadius: "8px", fontSize: "11px", color: COLORS.textDim, fontFamily: "'Crimson Text', serif" }}>
                  <span style={{ color: COLORS.green1, fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "1.5px", marginRight: "10px" }}>SUGGESTION</span>
                  {suggestedBottoms.length > 0
                    ? <>Bottom: {suggestedBottoms.map((c, idx) => (
                        <span key={c+idx}>
                          <span
                            onClick={() => {
                              const handIdx = hand.findIndex((hc, hi) => hc === c && !pendingBottoms.includes(`${hc}:${hi}`));
                              if (handIdx >= 0) toggleBottom(c, handIdx);
                            }}
                            style={{ color: COLORS.gold, cursor: "pointer", textDecoration: "underline dotted" }}
                            title="Click to select"
                          >{c}</span>
                          {idx < suggestedBottoms.length - 1 ? ", " : ""}
                        </span>
                      ))}</>
                    : <span>No suggestion — all cards look useful.</span>
                  }
                </div>
              );
            })()}

            {phase2 !== "bottoming" && (() => {
              // Run advisor on opening hand (empty battlefield, 0 mana) to enrich grade
              let mulliganAnalysis = null;
              try {
                mulliganAnalysis = analyzeGameState({
                  hand, battlefield: [], graveyard: [],
                  manaAvailable: 0, isMyTurn: true,
                  deckList: activeDeck ? new Set(deckCards) : null,
                });
              } catch (e) {}
              const { grade, notes } = gradeHand(hand, mulliganAnalysis);
              return (
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "flex-start", marginTop: "16px" }}>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                    <button onClick={keepHand} style={{
                      background: "#1a3a1a", border: `1px solid ${COLORS.green1}`, borderRadius: "8px",
                      padding: "10px 28px", color: COLORS.green2, cursor: "pointer",
                      fontFamily: "'Cinzel', serif", fontSize: "13px", letterSpacing: "1px",
                    }}
                      onMouseEnter={e => { e.target.style.background = "#1f4a1f"; }}
                      onMouseLeave={e => { e.target.style.background = "#1a3a1a"; }}
                    >✓ KEEP</button>
                    {hand.length > 0 && (
                      <button onClick={doMulligan} style={{
                        background: "none", border: `1px solid ${COLORS.gold}`, borderRadius: "8px",
                        padding: "10px 24px", color: COLORS.gold, cursor: "pointer",
                        fontFamily: "'Cinzel', serif", fontSize: "13px", letterSpacing: "1px",
                      }}
                        onMouseEnter={e => { e.target.style.background = "#1a1a0a"; }}
                        onMouseLeave={e => { e.target.style.background = "transparent"; }}
                      >↺ MULLIGAN TO {Math.max(0, 7 - mulliganCount)}</button>
                    )}
                    <button onClick={() => setPhase("setup")} style={{
                      background: "none", border: `1px solid ${COLORS.border}`, borderRadius: "8px",
                      padding: "10px 20px", color: COLORS.textDim, cursor: "pointer",
                      fontFamily: "'Cinzel', serif", fontSize: "13px",
                    }}>✕ ABANDON</button>
                  </div>
                  <div style={{
                    background: "#0d1a0d", border: `1px solid ${grade.color}44`,
                    borderLeft: `3px solid ${grade.color}`, borderRadius: "8px",
                    padding: "10px 16px", minWidth: "200px",
                  }}>
                    <div style={{ fontSize: "11px", color: grade.color, fontFamily: "'Cinzel', serif", letterSpacing: "1.5px", marginBottom: "6px" }}>
                      ★ {grade.label}
                    </div>
                    {notes.map((n, i) => (
                      <div key={i} style={{ fontSize: "11px", color: COLORS.textMid, fontFamily: "'Crimson Text', serif", lineHeight: 1.4 }}>{n}</div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {phase === "playing" && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0 }}>

            {/* Mobile tab bar */}
            {isMobile && (
              <div style={{ display: "flex", borderBottom: `1px solid ${COLORS.border}`, flexShrink: 0 }}>
                {[["zones","⊞ Zones"],["advisor","✦ Advisor"],["log","📜 Log"]].map(([tab, label]) => (
                  <button key={tab} onClick={() => setMobileTab(tab)} style={{
                    flex: 1, padding: "8px 4px", border: "none", borderBottom: `2px solid ${mobileTab === tab ? COLORS.green1 : "transparent"}`,
                    background: "none", color: mobileTab === tab ? COLORS.green2 : COLORS.textDim,
                    fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "1px", cursor: "pointer",
                  }}>{label}</button>
                ))}
              </div>
            )}

            <div style={{ flex: 1, display: "flex", flexDirection: "row", overflow: "hidden", minHeight: 0 }}>

            {/* LEFT: zones */}
            <div style={{
              width: isMobile ? "100%" : "330px", flexShrink: 0, borderRight: isMobile ? "none" : `1px solid ${COLORS.border}`,
              display: isMobile && mobileTab !== "zones" ? "none" : "flex",
              flexDirection: "column", overflow: "hidden",
              position: "relative",
            }}>
              {/* Controls strip */}
              <div style={{ padding: "8px 12px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", gap: "5px", flexWrap: "wrap", alignItems: "center" }}>
                <button onClick={nextTurn} style={{ ...btnStyle(COLORS.green2), background: "#1a3a1a" }}
                  onMouseEnter={e => { e.target.style.background = "#1f4a1f"; }}
                  onMouseLeave={e => { e.target.style.background = "#1a3a1a"; }}
                  title="Untap all, draw a card, advance turn">▶ NEXT TURN</button>
                <button onClick={() => drawCard(1)} style={btnStyle(COLORS.green1)} title="Draw the top card of your library into your hand (D)">+ DRAW 1</button>
                <button onClick={() => drawCard(3)} style={btnStyle(COLORS.border)} title="Draw the top 3 cards of your library">+ DRAW 3</button>
                <button onClick={untapAll} style={btnStyle(COLORS.border)} title="Untap all permanents without advancing the turn or drawing (U)">↺ UNTAP</button>
                <button onClick={openTutor} style={btnStyle(COLORS.purple)} title="Search your library by card name, type, or tag — e.g. type 'dork' to find mana creatures (T)">🔍 TUTOR</button>
                <button onClick={() => openScry(3)} style={btnStyle(COLORS.blue)} title="Look at the top 3 cards of your library. Choose which to keep on top and which to send to the bottom.">👁 SCRY 3</button>
                <button onClick={() => openScry(1)} style={btnStyle(COLORS.border)} title="Look at the top card of your library and keep or bottom it.">👁 1</button>
                <button onClick={castYeva}
                  disabled={battlefield.includes("Yeva, Nature's Herald")}
                  title={`Cast Yeva from command zone (${4 + yevaTax} mana)`}
                  style={{
                    ...btnStyle(battlefield.includes("Yeva, Nature's Herald") ? COLORS.border : COLORS.green1),
                    background: battlefield.includes("Yeva, Nature's Herald") ? "transparent" : "#1a3a1a",
                    opacity: battlefield.includes("Yeva, Nature's Herald") ? 0.4 : 1,
                  }}>🌿 YEVA{yevaTax > 0 ? ` (+${yevaTax})` : ""}</button>
              </div>

              {/* Land drop indicator + mana pool */}
              <div style={{ padding: "5px 12px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", gap: "8px", alignItems: "center" }}>
                <span style={{ fontSize: "10px", color: landPlayed ? COLORS.textDim : COLORS.green1, fontFamily: "'Cinzel', serif", letterSpacing: "1px" }}>
                  {landPlayed ? "🟫 LAND PLAYED" : "🟩 LAND AVAILABLE"}
                </span>
                {landPlayed && (
                  <button onClick={() => setLandPlayed(false)} style={{ ...btnStyle(COLORS.border), padding: "1px 7px", fontSize: "9px" }}>reset</button>
                )}
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "9px", color: COLORS.textDim, fontFamily: "'Cinzel', serif", letterSpacing: "1px" }}>MANA</span>
                  <span style={{
                    fontFamily: "'Cinzel', serif", fontSize: "15px", fontWeight: "bold", minWidth: "24px", textAlign: "center",
                    color: currentMana === 0 ? COLORS.textDim : currentMana >= 7 ? "#c084fc" : currentMana >= 4 ? COLORS.green2 : COLORS.green1,
                    transition: "color 0.2s",
                  }}>{currentMana}</span>
                </div>
              </div>

              {/* Tutor / Scry overlays — called as functions to avoid remount */}
              {TutorOverlay()}
              {ScryModal()}
              {UntapModal()}

              <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px" }}>
                {/* Gamestate breadcrumb */}
                {(() => {
                  const elves = battlefield.filter(c => getCard(c)?.tags?.includes("elf")).length;
                  const dorks = battlefield.filter(c => getCard(c)?.tags?.includes("dork")).length;
                  const tutors = hand.filter(c => getCard(c)?.tags?.includes("tutor")).length;
                  const comboPieces = [...hand, ...battlefield].filter(c =>
                    getCard(c)?.tags?.some(t => ["ashaya","earthcraft","quirion","wirewood","duskwatch"].includes(t))
                  ).length;
                  const crumbs = [
                    { label: `T${turnNumber}`, color: COLORS.gold },
                    { label: `${currentMana}◆`, color: currentMana >= 6 ? "#c084fc" : currentMana >= 3 ? COLORS.green2 : COLORS.green1 },
                    elves > 0 && { label: `${elves} elf${elves !== 1 ? "s" : ""}`, color: COLORS.green3 },
                    dorks > 0 && { label: `${dorks} dork${dorks !== 1 ? "s" : ""}`, color: COLORS.green2 },
                    tutors > 0 && { label: `${tutors} tutor${tutors !== 1 ? "s" : ""}`, color: COLORS.purple },
                    comboPieces > 0 && { label: `${comboPieces} combo`, color: COLORS.red },
                    hand.length === 0 && { label: "empty hand", color: COLORS.textDim },
                  ].filter(Boolean);
                  return (
                    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "8px", paddingBottom: "6px", borderBottom: `1px solid ${COLORS.border}` }}>
                      {crumbs.map((c, i) => (
                        <span key={i} style={{ fontSize: "8px", fontFamily: "'Cinzel', serif", color: c.color, letterSpacing: "0.5px", opacity: 0.8 }}>
                          {c.label}{i < crumbs.length - 1 ? <span style={{ color: COLORS.border, marginLeft: "4px" }}>·</span> : ""}
                        </span>
                      ))}
                    </div>
                  );
                })()}

                {/* HAND — click to cast, drag to move */}
                <div style={{ marginBottom: "16px" }}>
                  {zoneLabel("HAND — click to cast", hand.length, COLORS.green2)}
                  <div {...dropZoneProps("hand")} style={{ minHeight: "32px", borderRadius: "4px", border: dragOver === "hand" ? `1px dashed ${COLORS.green2}` : "1px solid transparent", padding: "2px", transition: "border 0.1s" }}>
                    {hand.length === 0
                      ? <span style={{ fontSize: "11px", color: COLORS.textDim, fontStyle: "italic" }}>Empty</span>
                      : hand.map((card, i) => {
                          const isLand = getCard(card)?.type === "land";
                          const cantPlay = isLand && landPlayed;
                          return renderCard(card, i, "hand", {
                            onClick: () => !cantPlay && castFromHand(card, i),
                            style: {
                              cursor: cantPlay ? "not-allowed" : "pointer",
                              opacity: cantPlay ? 0.4 : 1,
                              borderColor: isLand ? "#3a5a2a" : isFetch(card) ? COLORS.blue + "88" : COLORS.border,
                              color: isLand ? COLORS.green3 : COLORS.textMid,
                            },
                          });
                        })
                    }
                  </div>
                </div>

                {/* BATTLEFIELD — grouped by type */}
                <div style={{ marginBottom: "16px" }}>
                  {zoneLabel("BATTLEFIELD — click to tap", battlefield.length, COLORS.green3)}
                  {battlefield.length === 0
                    ? <div {...dropZoneProps("battlefield")} style={{ minHeight: "32px", borderRadius: "4px", border: dragOver === "battlefield" ? `1px dashed ${COLORS.green3}` : "1px solid transparent", padding: "2px" }}>
                        <span style={{ fontSize: "11px", color: COLORS.textDim, fontStyle: "italic" }}>Empty</span>
                      </div>
                    : (() => {
                        const groups = [
                          { label: "LANDS", cards: battlefield.map((c,i) => ({c,i})).filter(({c}) => getCard(c)?.type === "land"), color: "#3a7a2a" },
                          { label: "CREATURES", cards: battlefield.map((c,i) => ({c,i})).filter(({c}) => getCard(c)?.type === "creature"), color: COLORS.green3 },
                          { label: "OTHER", cards: battlefield.map((c,i) => ({c,i})).filter(({c}) => !["land","creature"].includes(getCard(c)?.type)), color: COLORS.textDim },
                        ].filter(g => g.cards.length > 0);
                        return (
                          <div {...dropZoneProps("battlefield")} style={{ borderRadius: "4px", border: dragOver === "battlefield" ? `1px dashed ${COLORS.green3}` : "1px solid transparent", padding: "2px" }}>
                            {groups.map(g => (
                              <div key={g.label} style={{ marginBottom: "6px" }}>
                                <div style={{ fontSize: "9px", color: g.color, letterSpacing: "1.5px", fontFamily: "'Cinzel', serif", marginBottom: "3px", opacity: 0.7 }}>{g.label}</div>
                                <div>
                                  {g.cards.map(({c, i}) => {
                                    const key = cardKey(c, i);
                                    return renderCard(c, i, "battlefield", {
                                      isTap: tapped.has(key),
                                      curCount: counters[key] ?? 0,
                                      onClick: () => toggleTap(c, i),
                                      style: { cursor: "pointer" },
                                    });
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })()
                  }
                </div>

                {/* GRAVEYARD */}
                <div style={{ marginBottom: "14px" }}>
                  {zoneLabel("GRAVEYARD", graveyard.length, COLORS.textDim)}
                  <div {...dropZoneProps("graveyard")} style={{ minHeight: "24px", borderRadius: "4px", border: dragOver === "graveyard" ? `1px dashed ${COLORS.textDim}` : "1px solid transparent", padding: "2px" }}>
                    {graveyard.length === 0
                      ? <span style={{ fontSize: "11px", color: COLORS.textDim, fontStyle: "italic" }}>Empty</span>
                      : graveyard.map((card, i) => renderCard(card, i, "graveyard", {
                          style: { opacity: 0.55, cursor: "context-menu" },
                        }))
                    }
                  </div>
                </div>

                {/* EXILE */}
                <div style={{ marginBottom: "14px" }}>
                  {zoneLabel("EXILE", exile.length, COLORS.textDim)}
                  <div {...dropZoneProps("exile")} style={{ minHeight: "20px", borderRadius: "4px", border: dragOver === "exile" ? `1px dashed ${COLORS.textDim}` : "1px solid transparent", padding: "2px" }}>
                    {exile.length === 0
                      ? <span style={{ fontSize: "11px", color: COLORS.textDim, fontStyle: "italic", opacity: 0.5 }}>Empty</span>
                      : exile.map((card, i) => renderCard(card, i, "exile", {
                          style: { opacity: 0.4, cursor: "context-menu" },
                        }))
                    }
                  </div>
                </div>

                {/* LIBRARY TOP */}
                <div>
                  {zoneLabel("LIBRARY TOP", library.length, COLORS.textDim)}
                  <div style={{ minHeight: "24px" }}>
                    {library.slice(0, 3).map((card, i) => renderCard(card, i, "library", {
                      style: { opacity: 0.45, fontSize: "10px", cursor: "context-menu" },
                    }))}
                    {library.length > 3 && <span style={{ fontSize: "10px", color: COLORS.textDim, marginLeft: "4px" }}>+{library.length - 3} more</span>}
                  </div>
                </div>
              </div>
            </div>
            {/* MIDDLE: advisor */}
            <div style={{ flex: 1, display: isMobile && mobileTab !== "advisor" ? "none" : "flex", flexDirection: "column", overflow: "hidden", minWidth: 0, width: isMobile ? "100%" : undefined }}>
              <div style={{
                padding: "10px 16px", borderBottom: `1px solid ${COLORS.border}`,
                fontSize: "10px", color: COLORS.textDim, letterSpacing: "2px",
                fontFamily: "'Cinzel', serif", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <span>ADVISOR · TURN {turnNumber}</span>
                {analysis?.infiniteManaActive && (
                  <span style={{ color: "#c084fc", letterSpacing: "1px", fontSize: "10px" }}>⚡ ∞ INFINITE MANA</span>
                )}
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px" }}>
                {(hand.length + battlefield.length === 0) ? (
                  <div style={{ color: COLORS.textDim, fontSize: "13px", fontFamily: "'Crimson Text', serif", padding: "20px", textAlign: "center" }}>
                    Play some cards to see advice.
                  </div>
                ) : analysis?.error ? (
                  <div style={{ color: COLORS.red, fontSize: "12px", fontFamily: "'Crimson Text', serif", padding: "20px", textAlign: "center" }}>
                    ⚠ Advisor error: {analysis.error}
                  </div>
                ) : !analysis || analysis.results.length === 0 ? (
                  <div style={{ color: COLORS.textDim, fontSize: "13px", fontFamily: "'Crimson Text', serif", padding: "20px", textAlign: "center" }}>
                    No recommendations yet — play a land or cast a spell.
                  </div>
                ) : (
                  analysis.results.slice(0, 12).map((a, i) => (
                    <div key={i} style={{
                      background: COLORS.bgCard, border: `1px solid ${a.color ? a.color + "44" : COLORS.border}`,
                      borderLeft: `3px solid ${a.color || COLORS.green1}`,
                      borderRadius: "6px", padding: "10px 12px", marginBottom: "8px",
                    }}>
                      <div style={{ fontSize: "10px", color: a.color || COLORS.green1, letterSpacing: "1.5px", fontFamily: "'Cinzel', serif", marginBottom: "4px" }}>
                        {a.category}
                      </div>
                      <div style={{ fontSize: "12px", color: COLORS.text, fontFamily: "'Crimson Text', serif", lineHeight: 1.5 }}>
                        <HighlightWithPopups text={a.headline} />
                      </div>
                      {a.steps && a.steps.length > 0 && (
                        <div style={{ marginTop: "8px", borderTop: `1px solid ${COLORS.border}`, paddingTop: "8px" }}>
                          {a.steps.slice(0, 4).map((s, j) => (
                            <div key={j} style={{ fontSize: "11px", color: COLORS.textMid, fontFamily: "'Crimson Text', serif", marginBottom: "3px", paddingLeft: "10px", borderLeft: `1px solid ${COLORS.border}` }}>
                              {j + 1}. <HighlightWithPopups text={s} />
                            </div>
                          ))}
                          {a.steps.length > 4 && (
                            <div style={{ fontSize: "10px", color: COLORS.textDim, paddingLeft: "10px", marginTop: "2px" }}>
                              +{a.steps.length - 4} more steps…
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* RIGHT: log */}
            <div style={{
              width: isMobile ? "100%" : "240px", flexShrink: 0, borderLeft: isMobile ? "none" : `1px solid ${COLORS.border}`,
              display: isMobile && mobileTab !== "log" ? "none" : "flex",
              flexDirection: "column", overflow: "hidden",
            }}>
              <div style={{ padding: "10px 14px", borderBottom: `1px solid ${COLORS.border}`, fontSize: "10px", color: COLORS.textDim, letterSpacing: "2px", fontFamily: "'Cinzel', serif", flexShrink: 0 }}>
                GAME LOG
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: "10px 12px" }}>
                {log.map((entry, i) => (
                  <div key={i} style={{ fontSize: "11px", color: entry.color, fontFamily: "'Crimson Text', serif", marginBottom: "5px", lineHeight: 1.4, opacity: i > 20 ? Math.max(0.3, 1 - (i - 20) * 0.03) : 1 }}>
                    {entry.turn && <span style={{ color: COLORS.textDim, fontSize: "9px", marginRight: "4px" }}>T{entry.turn}</span>}
                    {entry.msg}
                  </div>
                ))}
                {log.length === 0 && (
                  <div style={{ fontSize: "11px", color: COLORS.textDim, fontStyle: "italic" }}>No actions yet.</div>
                )}
              </div>
            </div>
            </div> {/* end row wrapper */}
          </div>
        )}

        {/* STATS phase */}
        {phase === "stats" && (() => {
          const games = gameHistory;
          const avg = (fn) => {
            const vals = games.map(fn).filter(v => v !== null);
            return vals.length ? (vals.reduce((a,b) => a+b, 0) / vals.length).toFixed(1) : "—";
          };
          const pct = (fn) => {
            const n = games.filter(fn).length;
            return games.length ? `${Math.round(n / games.length * 100)}%` : "—";
          };
          const statBox = (label, value, color) => (
            <div style={{ background: "#0d1a0d", border: `1px solid ${color}44`, borderRadius: "8px", padding: "12px 16px", textAlign: "center", minWidth: "90px" }}>
              <div style={{ fontSize: "20px", color, fontFamily: "'Cinzel', serif", fontWeight: "bold" }}>{value}</div>
              <div style={{ fontSize: "9px", color: COLORS.textDim, letterSpacing: "1px", marginTop: "4px", fontFamily: "'Cinzel', serif" }}>{label}</div>
            </div>
          );
          const nr = runNResults;
          return (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

              {/* ── Manual game stats header ── */}
              <div style={{ padding: "16px 24px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: "12px", color: COLORS.gold, letterSpacing: "2px", marginRight: "6px", flexShrink: 0 }}>
                  ★ MANUAL — {games.length} GAME{games.length !== 1 ? "S" : ""}
                </div>
                {statBox("AVG WIN TURN", avg(g => g.winCondition), COLORS.red)}
                {statBox("AVG ∞ MANA",   avg(g => g.infiniteMana),  "#c084fc")}
                {statBox("AVG 1ST DORK", avg(g => g.firstDork),     COLORS.green2)}
                {statBox("AVG MULLS",    avg(g => g.mulligans),      COLORS.gold)}
                {statBox("WIN ≤T4",      pct(g => g.winCondition !== null && g.winCondition <= 4), COLORS.red)}
                {statBox("WIN ≤T5",      pct(g => g.winCondition !== null && g.winCondition <= 5), COLORS.red)}
                <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
                  <button onClick={startGame} style={{
                    background: "#1a3a1a", border: `1px solid ${COLORS.green1}`, borderRadius: "8px",
                    padding: "8px 18px", color: COLORS.green2, cursor: "pointer",
                    fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "1px",
                  }}>▶ NEW GAME</button>
                  {games.length > 0 && (
                    <button onClick={() => {
                      if (!window.confirm("Clear all goldfish stats for this deck? This cannot be undone.")) return;
                      setGameHistory([]); gameNumRef.current = 0;
                      storage.set(statsKey, JSON.stringify({ history: [], gameNum: 0 })).catch(() => {});
                    }} style={{
                      background: "none", border: `1px solid ${COLORS.red}`, borderRadius: "8px",
                      padding: "8px 14px", color: COLORS.red, cursor: "pointer",
                      fontFamily: "'Cinzel', serif", fontSize: "11px",
                    }}>✕ CLEAR</button>
                  )}
                </div>
              </div>

              <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

                {/* ── Left: manual game log table ── */}
                <div style={{ flex: 1, overflowY: "auto", padding: "14px 20px", borderRight: `1px solid ${COLORS.border}` }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Crimson Text', serif", fontSize: "12px" }}>
                    <thead>
                      <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                        {["#","Mulls","Opening Hand","Dork","∞","Win T","Combo",""].map(h => (
                          <th key={h} style={{ padding: "5px 6px", color: COLORS.textDim, fontFamily: "'Cinzel', serif", fontSize: "9px", letterSpacing: "1px", textAlign: "left", fontWeight: "normal" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[...games].reverse().map((g, idx) => (
                        <tr key={g.gameNum} style={{ borderBottom: `1px solid ${COLORS.border}22`, background: idx % 2 === 0 ? "transparent" : "#0a150a" }}>
                          <td style={{ padding: "5px 6px", color: COLORS.textDim }}>{g.gameNum}</td>
                          <td style={{ padding: "5px 6px", color: g.mulligans > 0 ? COLORS.gold : COLORS.textMid }}>{g.mulligans === 0 ? "—" : `${g.mulligans}×`}</td>
                          <td style={{ padding: "5px 6px", color: COLORS.textDim, fontSize: "11px", maxWidth: "140px" }}>
                            <span title={g.openingHand?.join(", ")} style={{ cursor: "default" }}>
                              {(g.openingHand||[]).slice(0, 2).join(", ")}{(g.openingHand||[]).length > 2 ? ` +${(g.openingHand||[]).length - 2}` : ""}
                            </span>
                          </td>
                          <td style={{ padding: "5px 6px", color: g.firstDork ? COLORS.green2 : COLORS.textDim }}>{g.firstDork ? `T${g.firstDork}` : "—"}</td>
                          <td style={{ padding: "5px 6px", color: g.infiniteMana ? "#c084fc" : COLORS.textDim }}>{g.infiniteMana ? `T${g.infiniteMana}` : "—"}</td>
                          <td style={{ padding: "5px 6px", color: g.winCondition ? COLORS.red : COLORS.textDim, fontWeight: g.winCondition ? "bold" : "normal" }}>{g.winCondition ? `T${g.winCondition}` : "—"}</td>
                          <td style={{ padding: "5px 6px", color: COLORS.textMid, fontSize: "10px", fontFamily: "'Cinzel', serif", letterSpacing: "0.5px", maxWidth: "100px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={g.winCombo}>
                            {g.winCombo || "—"}
                          </td>
                          <td style={{ padding: "5px 6px" }}>
                            {g.replay?.length > 0 && (
                              <button onClick={() => setReplayGame(g)} title="View replay" style={{ background: "none", border: `1px solid ${COLORS.border}`, borderRadius: "3px", padding: "2px 6px", color: COLORS.textDim, cursor: "pointer", fontSize: "10px" }}>📼</button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {games.length === 0 && (
                    <div style={{ color: COLORS.textDim, fontSize: "12px", fontFamily: "'Crimson Text', serif", padding: "30px", textAlign: "center" }}>
                      No games recorded yet. Play a game and click ★ END GAME to record it.
                    </div>
                  )}

                  {/* ── Win combo breakdown (manual games) ── */}
                  {games.length > 0 && (() => {
                    const comboCounts = {};
                    for (const g of games) {
                      if (g.winCombo) comboCounts[g.winCombo] = (comboCounts[g.winCombo] ?? 0) + 1;
                    }
                    const combos = Object.entries(comboCounts).sort((a,b) => b[1]-a[1]);
                    if (combos.length === 0) return null;
                    const maxC = combos[0][1];
                    return (
                      <div style={{ marginTop: "20px" }}>
                        <div style={{ fontSize: "9px", letterSpacing: "2px", color: COLORS.red, fontFamily: "'Cinzel', serif", marginBottom: "8px" }}>WIN CONDITION BREAKDOWN</div>
                        {combos.map(([label, count]) => (
                          <div key={label} style={{ marginBottom: "6px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                              <span style={{ fontSize: "11px", color: COLORS.textMid, fontFamily: "'Crimson Text', serif" }}>{label}</span>
                              <span style={{ fontSize: "10px", color: COLORS.textDim, fontFamily: "'Cinzel', serif" }}>{count}×  {Math.round(count/games.length*100)}%</span>
                            </div>
                            <div style={{ height: "3px", background: COLORS.border, borderRadius: "2px", overflow: "hidden" }}>
                              <div style={{ height: "100%", width: `${count/maxC*100}%`, background: COLORS.red, borderRadius: "2px", opacity: 0.75 }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>

                {/* ── Right: Run N panel ── */}
                <div style={{ width: "340px", flexShrink: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>

                  {/* Run N controls */}
                  <div style={{ padding: "14px 18px", borderBottom: `1px solid ${COLORS.border}`, flexShrink: 0 }}>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: "11px", color: COLORS.blue, letterSpacing: "2px", marginBottom: "10px" }}>
                      ⚡ AUTO-SIMULATE
                    </div>
                    <div style={{ fontSize: "11px", color: COLORS.textDim, fontFamily: "'Crimson Text', serif", marginBottom: "10px", lineHeight: 1.5 }}>
                      Plays N games fully automatically using the advisor's top recommendation each turn.
                    </div>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "10px" }}>
                      <span style={{ fontSize: "11px", color: COLORS.textMid, fontFamily: "'Cinzel', serif", letterSpacing: "1px" }}>GAMES:</span>
                      {[50, 100, 250, 500].map(n => (
                        <button key={n} onClick={() => setRunNCount(n)} style={{
                          background: runNCount === n ? "#1a3a1a" : "none",
                          border: `1px solid ${runNCount === n ? COLORS.green1 : COLORS.border}`,
                          borderRadius: "6px", padding: "4px 10px",
                          color: runNCount === n ? COLORS.green2 : COLORS.textDim,
                          cursor: "pointer", fontFamily: "'Cinzel', serif", fontSize: "10px",
                        }}>{n}</button>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "10px" }}>
                      <span style={{ fontSize: "11px", color: COLORS.textMid, fontFamily: "'Cinzel', serif", letterSpacing: "1px" }}>MAX TURNS:</span>
                      {[8, 10, 15, 20].map(t => (
                        <button key={t} onClick={() => setRunNMaxTurns(t)} style={{
                          background: runNMaxTurns === t ? "#1a1a3a" : "none",
                          border: `1px solid ${runNMaxTurns === t ? COLORS.blue : COLORS.border}`,
                          borderRadius: "6px", padding: "4px 10px",
                          color: runNMaxTurns === t ? COLORS.blue : COLORS.textDim,
                          cursor: "pointer", fontFamily: "'Cinzel', serif", fontSize: "10px",
                        }}>{t}</button>
                      ))}
                    </div>
                    <button
                      onClick={runGames}
                      disabled={!hasDeck || runNRunning}
                      style={{
                        width: "100%", background: hasDeck ? "#0d1f3a" : "transparent",
                        border: `1px solid ${hasDeck ? COLORS.blue : COLORS.border}`,
                        borderRadius: "8px", padding: "9px",
                        color: hasDeck ? COLORS.blue : COLORS.textDim,
                        cursor: hasDeck ? "pointer" : "not-allowed",
                        fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "1px",
                        opacity: runNRunning ? 0.6 : 1,
                      }}
                    >{runNRunning ? `⏳ Running ${runNCount} games…` : `▶ RUN ${runNCount} GAMES`}</button>
                    {!hasDeck && <div style={{ fontSize: "10px", color: COLORS.red, marginTop: "6px", fontFamily: "'Crimson Text', serif" }}>Load a deck first.</div>}
                  </div>

                  {/* Run N results */}
                  <div style={{ flex: 1, overflowY: "auto", padding: "14px 18px" }}>
                    {runNRunning && (
                      <div style={{ textAlign: "center", padding: "30px 0", color: COLORS.textDim, fontFamily: "'Crimson Text', serif", fontSize: "12px" }}>
                        <div style={{ width: 28, height: 28, border: `2px solid ${COLORS.border}`, borderTopColor: COLORS.blue, borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
                        Simulating {runNCount} games…
                      </div>
                    )}
                    {nr && !runNRunning && (() => {
                      // Tip: stores position in top-level simTooltip state so the
                      // tooltip div is rendered outside the scrollable panel.
                      const Tip = ({ id, text, children, wrapStyle }) => (
                        <div style={{ display: "inline-block", ...wrapStyle }}
                          onMouseEnter={e => {
                            const r = e.currentTarget.getBoundingClientRect();
                            setSimTooltip({ id, text, x: r.left + r.width / 2, y: r.top });
                          }}
                          onMouseLeave={() => setSimTooltip(null)}
                        >
                          {children}
                        </div>
                      );
                      const simStatBox = (label, value, color, sub, tipText) => (
                        <Tip id={label} text={tipText} wrapStyle={{ display: "block" }}>
                          <div style={{ background: "#0a1520", border: `1px solid ${color}33`, borderRadius: "6px", padding: "10px 12px", textAlign: "center", cursor: tipText ? "help" : "default" }}>
                            <div style={{ fontSize: "18px", color, fontFamily: "'Cinzel', serif", fontWeight: "bold" }}>{value}</div>
                            {sub && <div style={{ fontSize: "9px", color: COLORS.textDim, marginTop: "2px", fontFamily: "'Cinzel', serif" }}>{sub}</div>}
                            <div style={{ fontSize: "9px", color: COLORS.textDim, letterSpacing: "1px", marginTop: "3px", fontFamily: "'Cinzel', serif" }}>{label}</div>
                          </div>
                        </Tip>
                      );
                      // Build distribution bar
                      const distKeys = ["T3","T4","T5","T6","T7","T8+"];
                      const distCounts = distKeys.map(k => {
                        if (k === "T8+") {
                          return Object.entries(nr.distribution).filter(([key]) => parseInt(key.slice(1)) >= 8).reduce((s,[,v]) => s+v, 0);
                        }
                        return nr.distribution[k] ?? 0;
                      });
                      const maxCount = Math.max(...distCounts, 1);
                      return (
                        <div>
                          <div style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", color: COLORS.blue, letterSpacing: "1.5px", marginBottom: "10px" }}>
                            RESULTS — {nr.n} GAMES
                          </div>
                          {/* Summary stat grid */}
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginBottom: "12px" }}>
                            {simStatBox("AVG WIN TURN", nr.avgWinTurn ? nr.avgWinTurn.toFixed(1) : "—", COLORS.red, null,
                              "Average turn number when the advisor first detected a WIN NOW or CAST TO WIN line. Only counts games where a win was detected — did-not-win games are excluded from this average.")}
                            {simStatBox("WIN RATE", `${nr.winRate.toFixed(0)}%`, nr.winRate >= 80 ? COLORS.green2 : nr.winRate >= 50 ? COLORS.gold : COLORS.red, `${nr.wins}/${nr.n}`,
                              `Percentage of games where the advisor detected a win line within ${nr.maxTurns} turns. A game counts as a win the turn the advisor's top result first shows a WIN NOW, CAST TO WIN, or similar decisive category.`)}
                            {simStatBox("AVG MULLIGANS", nr.avgMulligans.toFixed(1), COLORS.gold, null,
                              "Average number of mulligans taken per game. The simulator keeps a hand if it has a dork + tutor (with a mana source), or 2+ dorks + a land. All other hands are mulliganed up to the configured limit.")}
                            {simStatBox("WIN ≤T5", `${nr.t5Rate.toFixed(0)}%`, nr.t5Rate >= 60 ? COLORS.green2 : COLORS.gold, null,
                              "Percentage of all games (including non-wins) where a win line was detected by end of turn 5. This is the key cEDH metric — your goal is to threaten a win before opponents can set up interaction.")}
                          </div>
                          {/* T3/T4/T5 breakdown */}
                          <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
                            {[
                              ["≤T3", nr.t3Rate, "Win detected by end of turn 3. Represents the fastest possible goldfish lines — usually requires a perfect opening hand with dork + tutor into immediate combo assembly."],
                              ["≤T4", nr.t4Rate, "Win detected by end of turn 4. The benchmark for a fast cEDH combo deck. Hitting this consistently means your deck can threaten before most interaction comes online."],
                              ["≤T5", nr.t5Rate, "Win detected by end of turn 5. The broader competitive threshold — if you can't threaten a win by T5 you'll often be racing against opponents who can."],
                            ].map(([label, rate, tip]) => (
                              <Tip key={label} id={`breakdown-${label}`} text={tip}>
                                <div style={{ flex: 1, background: "#0a1520", border: `1px solid ${COLORS.blue}33`, borderRadius: "6px", padding: "7px 6px", textAlign: "center", cursor: "help" }}>
                                  <div style={{ fontSize: "14px", color: rate > 0 ? COLORS.blue : COLORS.textDim, fontFamily: "'Cinzel', serif", fontWeight: "bold" }}>{rate.toFixed(0)}%</div>
                                  <div style={{ fontSize: "9px", color: COLORS.textDim, fontFamily: "'Cinzel', serif", marginTop: "2px" }}>{label}</div>
                                </div>
                              </Tip>
                            ))}
                          </div>
                          {/* Win turn distribution bars */}
                          <Tip id="dist-header" text="How often the deck won on each specific turn. T3–T4 bars are green (fast), T5 gold (competitive), T6+ grey (slow). Taller bars = more games won that turn. Games with no win detected are not shown.">
                            <div style={{ fontFamily: "'Cinzel', serif", fontSize: "9px", color: COLORS.textDim, letterSpacing: "1px", marginBottom: "6px", cursor: "help", display: "inline-block" }}>WIN TURN DISTRIBUTION (?)</div>
                          </Tip>
                          <div style={{ display: "flex", gap: "4px", alignItems: "flex-end", height: "52px", marginBottom: "14px" }}>
                            {distKeys.map((k, i) => {
                              const count = distCounts[i];
                              const h = count > 0 ? Math.max(4, Math.round(count / maxCount * 48)) : 2;
                              const isGood = i <= 1; // T3/T4
                              const col = count === 0 ? COLORS.border : isGood ? COLORS.green2 : i <= 2 ? COLORS.gold : COLORS.textDim;
                              return (
                                <div key={k} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                                  <div style={{ fontSize: "8px", color: col, fontFamily: "'Cinzel', serif" }}>{count > 0 ? count : ""}</div>
                                  <div style={{ width: "100%", height: `${h}px`, background: col, borderRadius: "2px 2px 0 0", opacity: count === 0 ? 0.2 : 1 }} />
                                  <div style={{ fontSize: "8px", color: COLORS.textDim, fontFamily: "'Cinzel', serif" }}>{k}</div>
                                </div>
                              );
                            })}
                          </div>
                          {/* Bottlenecks */}
                          {nr.topBottlenecks.length > 0 && (
                            <div>
                              <Tip id="bottleneck-header" text="Cards or conditions the advisor detected as missing when a combo was almost complete. Counted once per game per unique reason. High percentages mean the deck frequently gets close to a win but stalls on that specific piece — these are your best tutor targets or cut candidates.">
                                <div style={{ fontFamily: "'Cinzel', serif", fontSize: "9px", color: COLORS.red, letterSpacing: "1px", marginBottom: "6px", cursor: "help", display: "inline-block" }}>
                                  MOST COMMON BOTTLENECKS (?)
                                </div>
                              </Tip>
                              {nr.topBottlenecks.map((b, i) => (
                                <div key={i} style={{ marginBottom: "5px" }}>
                                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "2px" }}>
                                    <span style={{ fontSize: "10px", color: COLORS.textMid, fontFamily: "'Crimson Text', serif", flex: 1, lineHeight: 1.3 }}>{b.reason}</span>
                                    <span style={{ fontSize: "9px", color: COLORS.textDim, fontFamily: "'Cinzel', serif", marginLeft: "6px", flexShrink: 0 }}>{b.pct}%</span>
                                  </div>
                                  <div style={{ height: "3px", background: COLORS.border, borderRadius: "2px", overflow: "hidden" }}>
                                    <div style={{ height: "100%", width: `${b.pct}%`, background: COLORS.red, borderRadius: "2px", opacity: 0.7 }} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Win combo breakdown */}
                          {nr.winCombos?.length > 0 && (
                            <div style={{ marginTop: "4px" }}>
                              <Tip id="wincombo-header" text="How the deck won across all simulated games. Each win is classified by the combo the advisor detected. Percentages are of winning games only.">
                                <div style={{ fontFamily: "'Cinzel', serif", fontSize: "9px", color: COLORS.red, letterSpacing: "1px", marginBottom: "6px", cursor: "help", display: "inline-block" }}>
                                  WIN CONDITION BREAKDOWN (?)
                                </div>
                              </Tip>
                              {nr.winCombos.map((c, i) => (
                                <div key={i} style={{ marginBottom: "5px" }}>
                                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "2px" }}>
                                    <span style={{ fontSize: "10px", color: COLORS.textMid, fontFamily: "'Crimson Text', serif" }}>{c.label}</span>
                                    <span style={{ fontSize: "9px", color: COLORS.textDim, fontFamily: "'Cinzel', serif", marginLeft: "6px", flexShrink: 0 }}>{c.count}×  {c.pct}%</span>
                                  </div>
                                  <div style={{ height: "3px", background: COLORS.border, borderRadius: "2px", overflow: "hidden" }}>
                                    <div style={{ height: "100%", width: `${c.pct}%`, background: COLORS.red, borderRadius: "2px", opacity: 0.7 }} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Mana curve */}
                          {nr.manaCurveAvg?.length > 0 && (
                            <div style={{ marginTop: "10px" }}>
                              <Tip id="manacurve-header" text="Average mana available per turn across all simulated games. Shows how quickly the deck accelerates. A healthy ramp curve should grow significantly from T1 to T3.">
                                <div style={{ fontFamily: "'Cinzel', serif", fontSize: "9px", color: COLORS.green2, letterSpacing: "1px", marginBottom: "6px", cursor: "help", display: "inline-block" }}>
                                  AVG MANA CURVE (?)
                                </div>
                              </Tip>
                              {(() => {
                                const maxMana = Math.max(...nr.manaCurveAvg, 1);
                                return (
                                  <div style={{ display: "flex", gap: "4px", alignItems: "flex-end", height: "52px", marginBottom: "4px" }}>
                                    {nr.manaCurveAvg.map((m, i) => {
                                      const h = Math.max(4, Math.round(m / maxMana * 48));
                                      const col = m >= 6 ? COLORS.green2 : m >= 3 ? COLORS.green1 : COLORS.textDim;
                                      return (
                                        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                                          <div style={{ fontSize: "8px", color: col, fontFamily: "'Cinzel', serif" }}>{m.toFixed(1)}</div>
                                          <div style={{ width: "100%", height: `${h}px`, background: col, borderRadius: "2px 2px 0 0", opacity: 0.85 }} />
                                          <div style={{ fontSize: "8px", color: COLORS.textDim, fontFamily: "'Cinzel', serif" }}>T{i+1}</div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                );
                              })()}
                            </div>
                          )}
                        </div>
                      );
                    })()}
                    {!nr && !runNRunning && (
                      <div style={{ fontSize: "11px", color: COLORS.textDim, fontFamily: "'Crimson Text', serif", padding: "20px 0", textAlign: "center", lineHeight: 1.6 }}>
                        Run the simulator to see win-rate statistics, turn distribution, and bottleneck analysis.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Fixed tooltip for auto-simulate panels — rendered outside scrollable containers */}
        {replayGame && <ReplayModal game={replayGame} onClose={() => setReplayGame(null)} />}
        {simTooltip && (
          <div style={{
            position: "fixed",
            left: simTooltip.x,
            top: simTooltip.y - 8,
            transform: "translate(-50%, -100%)",
            zIndex: 9999,
            background: "#1a2a1a", border: `1px solid ${COLORS.green1}`,
            borderRadius: "6px", padding: "8px 12px",
            width: "240px", pointerEvents: "none",
            boxShadow: "0 4px 20px #000d",
          }}>
            <div style={{ fontSize: "11px", color: COLORS.textMid, fontFamily: "'Crimson Text', serif", lineHeight: 1.5 }}>
              {simTooltip.text}
            </div>
          </div>
        )}
        {ContextMenuPopup()}

      </div>
    </div>
  );
}

function SynergyMapModal({ onClose, activeDeck, onLoadCombo }) {
  const containerRef = useRef(null);
  const outerRef     = useRef(null);  // stable ref always in DOM for ResizeObserver
  const [view, setView]               = useState("graph");
  const [activeTypes, setActiveTypes] = useState(new Set(Object.keys(TYPE_COLORS)));
  const [selected, setSelected]       = useState(null);
  const [hovered, setHovered]         = useState(null);
  const [tooltipPos, setTooltipPos]   = useState({ x: 0, y: 0 });
  const [dims, setDims]               = useState({ w: 860, h: 560 });
  const [pan, setPan]                 = useState({ x: 0, y: 0 });
  const [zoom, setZoom]               = useState(1);
  const [draggingNode, setDraggingNode] = useState(null);
  const [deckOnly, setDeckOnly]       = useState(!!activeDeck);
  const [comboCtxMenu, setComboCtxMenu] = useState(null); // { combo, x, y }
  const dragOffRef  = useRef({ x: 0, y: 0 });
  const isPanningRef = useRef(false);
  const panStartRef  = useRef({ x: 0, y: 0, px: 0, py: 0 });
  const [, forceUpdate] = useState(0);

  const deckCardSet = React.useMemo(
    () => activeDeck ? new Set(activeDeck.cards) : null,
    [activeDeck]
  );

  // Measure the stable outer wrapper — always mounted regardless of view
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") { e.stopPropagation(); if (comboCtxMenu) { setComboCtxMenu(null); } else { onClose(); } } };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, comboCtxMenu]);

  // Close combo context menu on any outside click
  useEffect(() => {
    if (!comboCtxMenu) return;
    const handler = () => setComboCtxMenu(null);
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [comboCtxMenu]);

  function openComboCtx(e, comboNode) {
    e.preventDefault();
    e.stopPropagation();
    const combo = COMBOS.find(c => c.id === comboNode.comboId);
    if (!combo) return;
    setComboCtxMenu({ combo, x: e.clientX, y: e.clientY });
  }

  useEffect(() => {
    if (!outerRef.current) return;
    const measure = () => {
      const { width, height } = outerRef.current.getBoundingClientRect();
      setDims({ w: Math.max(400, width), h: Math.max(300, height) });
    };
    measure(); // immediate measurement on mount or view change
    const ro = new ResizeObserver(measure);
    ro.observe(outerRef.current);
    return () => ro.disconnect();
  }, [view]); // re-measure when switching views so graph gets correct size

  // Build graph data
  const { nodes, links, cardCentrality } = React.useMemo(() => {
    const centrality = {};
    COMBOS.forEach(c => (c.requires||[]).forEach(r => { centrality[r] = (centrality[r]||0)+1; }));
    const cardNodes = [...new Set(COMBOS.flatMap(c => c.requires||[]))].map(name => ({
      id: "card:"+name, label: name, kind: "card", centrality: centrality[name]||1,
    }));
    const comboNodes = COMBOS.map(c => ({
      id: "combo:"+c.id, label: c.name, kind: "combo",
      comboType: c.type, comboId: c.id, requires: c.requires||[],
      shortLabel: c.name.replace(/\s*\(.*?\)/g,"").slice(0,26),
    }));
    const links = COMBOS.flatMap(c => (c.requires||[]).map(r => ({
      source: "card:"+r, target: "combo:"+c.id, comboType: c.type,
    })));
    return { nodes: [...cardNodes, ...comboNodes], links, cardCentrality: centrality };
  }, []);

  const visibleComboIds = React.useMemo(
    () => new Set(COMBOS.filter(c => {
      if (!activeTypes.has(c.type)) return false;
      if (deckOnly && deckCardSet) {
        // Only show combos where every required card is in the deck
        return (c.requires || []).every(r => deckCardSet.has(r));
      }
      return true;
    }).map(c => "combo:"+c.id)),
    [activeTypes, deckOnly, deckCardSet]
  );
  const visibleLinks = links.filter(l => visibleComboIds.has(l.target));
  const visibleCardIds = new Set(visibleLinks.map(l => l.source));
  const visibleNodes = nodes.filter(n =>
    (n.kind === "combo" && visibleComboIds.has(n.id)) ||
    (n.kind === "card"  && visibleCardIds.has(n.id))
  );
  const flatLinks = visibleLinks.map(l => ({ source: l.source, target: l.target, comboType: l.comboType }));

  const [positions, posRef] = useForceGraph(visibleNodes, flatLinks, dims.w, dims.h, view === "graph");

  // Nodes connected to selected
  const linkedToSelected = React.useMemo(() => {
    if (!selected) return null;
    const ids = new Set([selected]);
    flatLinks.forEach(l => {
      if (l.source === selected) ids.add(l.target);
      if (l.target === selected) ids.add(l.source);
    });
    return ids;
  }, [selected, flatLinks.length]);

  const cardR = n => Math.max(8, Math.min(22, 6 + (n.centrality||1) * 2.2));
  const COMBO_W = 112, COMBO_H = 22;

  // Wheel zoom
  const handleWheel = (e) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.1 : 0.91;
    setZoom(z => Math.max(0.25, Math.min(4, z * factor)));
  };

  // Pan via background drag
  const handleSvgMouseDown = (e) => {
    if (e.target.closest(".graph-node")) return;
    isPanningRef.current = true;
    panStartRef.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
  };
  const handleSvgMouseMove = (e) => {
    if (isPanningRef.current) {
      setPan({
        x: panStartRef.current.px + (e.clientX - panStartRef.current.x),
        y: panStartRef.current.py + (e.clientY - panStartRef.current.y),
      });
    }
    if (draggingNode) {
      const rect = containerRef.current.getBoundingClientRect();
      const wx = (e.clientX - rect.left - pan.x) / zoom;
      const wy = (e.clientY - rect.top  - pan.y) / zoom;
      posRef.current[draggingNode] = { x: wx, y: wy };
      forceUpdate(n => n+1);
    }
  };
  const handleSvgMouseUp = () => {
    isPanningRef.current = false;
    setDraggingNode(null);
  };

  const handleNodeMouseDown = (e, id) => {
    e.stopPropagation();
    setDraggingNode(id);
    const rect = containerRef.current.getBoundingClientRect();
    const wx = (e.clientX - rect.left - pan.x) / zoom;
    const wy = (e.clientY - rect.top  - pan.y) / zoom;
    dragOffRef.current = { x: wx - (posRef.current[id]?.x||0), y: wy - (posRef.current[id]?.y||0) };
  };

  const handleNodeClick = (e, id) => {
    e.stopPropagation();
    setSelected(s => s === id ? null : id);
  };

  // Tooltip node info
  const tooltipNode = hovered ? visibleNodes.find(n => n.id === hovered) : null;
  const tooltipLines = React.useMemo(() => {
    if (!tooltipNode) return [];
    if (tooltipNode.kind === "card") {
      const combosUsing = COMBOS.filter(c => (c.requires||[]).includes(tooltipNode.label) && activeTypes.has(c.type));
      return [`Used in ${combosUsing.length} combo${combosUsing.length!==1?"s":""}`,
        ...combosUsing.map(c => "• "+c.name.replace(/\s*\(.*?\)/g,"").slice(0,40))];
    }
    return [TYPE_LABELS[tooltipNode.comboType]||tooltipNode.comboType,
      ...(tooltipNode.requires||[]).map(r => "• "+r)];
  }, [hovered, activeTypes]);

  // ── Matrix data ──
  const matrixCards  = React.useMemo(() => {
    const cards = [...new Set(COMBOS.filter(c => activeTypes.has(c.type)).flatMap(c => c.requires||[]))];
    return cards.sort((a,b) => (cardCentrality[b]||0)-(cardCentrality[a]||0));
  }, [activeTypes]);
  const matrixCombos = COMBOS.filter(c => activeTypes.has(c.type));

  const toggleType = t => {
    setActiveTypes(prev => {
      const next = new Set(prev);
      if (next.has(t)) { if (next.size > 1) next.delete(t); } else next.add(t);
      return next;
    });
    setSelected(null);
  };

  const shorten = name => name
    .replace(", Soul of the Wild","").replace(", Nature's Herald","")
    .replace(", the Wanderer Bard","").replace(", Cradle of Growth","")
    .replace(", Shrine to Nyx","").replace(", Cradle of the Sun","")
    .replace("Quirion Ranger","Q.Ranger").replace("Argothian Elder","Arg.Elder")
    .replace("Wirewood Lodge","W.Lodge").replace("Wirewood Symbiote","W.Symbiote")
    .replace("Geier Reach Sanitarium","Sanitarium").replace("Temur Sabertooth","T.Sabertooth")
    .replace("Eternal Witness","E.Witness").replace("Infectious Bite","Inf.Bite")
    .replace("Legolas's Quick Reflexes","LQR").replace("Deserted Temple","D.Temple")
    .replace("Magus of the Candelabra","Magus").replace("Eladamri, Korvecdal","Eladamri")
    .replace("Woodcaller Automaton","Woodcaller").replace("Hyrax Tower Scout","Hyrax")
    .replace("Elvish Archdruid","E.Archdruid").replace("Elvish Guidance","E.Guidance")
    .replace("Survival of the Fittest","Survival").replace("Badgermole Cub","Badgermole")
    .replace("Tireless Provisioner","T.Provisioner").replace("Shifting Woodland","Shift.Woodland");

  return (
    <div style={{ position:"fixed", inset:0, background:"#000000ee", zIndex:1050, display:"flex", flexDirection:"column" }}
      onClick={onClose}>
      <div ref={outerRef} style={{ flex:1, display:"flex", flexDirection:"column", margin:"16px",
        background:"#0a160a", border:`1px solid ${COLORS.green1}44`, borderRadius:"12px", overflow:"hidden" }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", gap:"10px", padding:"10px 16px",
          borderBottom:`1px solid ${COLORS.border}`, flexShrink:0, flexWrap:"wrap" }}>
          <div style={{ fontFamily:"'Cinzel', serif", fontSize:"13px", color:COLORS.text, letterSpacing:"2px" }}>⬡ SYNERGY MAP</div>
          <div style={{ fontSize:"11px", color:COLORS.textDim, fontFamily:"'Crimson Text', serif" }}>
            {visibleNodes.filter(n=>n.kind==="card").length} cards · {visibleNodes.filter(n=>n.kind==="combo").length} combos
          </div>
          {activeDeck && (
            <button onClick={() => setDeckOnly(v => !v)} style={{
              background: deckOnly ? "#1a3a1a" : "none",
              border: `1px solid ${deckOnly ? COLORS.green1 : COLORS.border}`,
              borderRadius: "4px", padding: "2px 9px",
              color: deckOnly ? COLORS.green2 : COLORS.textDim,
              cursor: "pointer", fontSize: "10px", fontFamily: "'Cinzel', serif", letterSpacing: "0.5px",
            }}>
              {deckOnly ? `📚 ${activeDeck.name}` : "📚 ALL CARDS"}
            </button>
          )}
          <div style={{ flex:1 }} />
          <div style={{ display:"flex", gap:"4px", flexWrap:"wrap" }}>
            {Object.entries(TYPE_LABELS).map(([t, label]) => (
              <button key={t} onClick={() => toggleType(t)} style={{
                background: activeTypes.has(t) ? TYPE_COLORS[t]+"22" : "transparent",
                border:`1px solid ${activeTypes.has(t) ? TYPE_COLORS[t] : COLORS.border}`,
                borderRadius:"4px", padding:"2px 7px",
                color: activeTypes.has(t) ? TYPE_COLORS[t] : COLORS.textDim,
                cursor:"pointer", fontSize:"10px", fontFamily:"'Cinzel', serif", letterSpacing:"0.5px",
              }}>{label}</button>
            ))}
          </div>
          <div style={{ display:"flex", gap:"3px", borderLeft:`1px solid ${COLORS.border}`, paddingLeft:"10px" }}>
            {[["graph","⬡ Graph"],["matrix","⊞ Matrix"]].map(([v,lbl]) => (
              <button key={v} onClick={() => setView(v)} style={{
                background: view===v ? "#1a3a1a" : "none",
                border:`1px solid ${view===v ? COLORS.green1 : COLORS.border}`,
                borderRadius:"4px", padding:"3px 9px",
                color: view===v ? COLORS.text : COLORS.textDim,
                cursor:"pointer", fontSize:"10px", fontFamily:"'Cinzel', serif", letterSpacing:"1px",
              }}>{lbl}</button>
            ))}
          </div>
          <button onClick={onClose} style={{ background:"none", border:`1px solid ${COLORS.border}`,
            borderRadius:"4px", color:COLORS.textDim, cursor:"pointer", fontSize:"13px", padding:"4px 10px", flexShrink:0 }}>✕</button>
        </div>

        {/* Graph view */}
        {view === "graph" && (
          <div ref={containerRef} style={{ flex:1, position:"relative", overflow:"hidden", cursor: draggingNode ? "grabbing" : "grab" }}
            onWheel={handleWheel}
            onMouseDown={handleSvgMouseDown}
            onMouseMove={handleSvgMouseMove}
            onMouseUp={handleSvgMouseUp}
            onMouseLeave={handleSvgMouseUp}>
            <svg width="100%" height="100%" style={{ display:"block" }}
              onClick={() => setSelected(null)}>
              <g transform={`translate(${pan.x},${pan.y}) scale(${zoom})`}>
                {/* Links */}
                {flatLinks.map((l, i) => {
                  const sp = positions[l.source], tp = positions[l.target];
                  if (!sp || !tp) return null;
                  const isActive = !linkedToSelected || (linkedToSelected.has(l.source) && linkedToSelected.has(l.target));
                  return (
                    <line key={i}
                      x1={sp.x} y1={sp.y} x2={tp.x} y2={tp.y}
                      stroke={(TYPE_COLORS[l.comboType]||"#444")+(isActive?"55":"18")}
                      strokeWidth={linkedToSelected && isActive ? 2 : 1}
                    />
                  );
                })}
                {/* Combo nodes */}
                {visibleNodes.filter(n=>n.kind==="combo").map(n => {
                  const p = positions[n.id]; if (!p) return null;
                  const isSelected = selected === n.id;
                  const dimmed = linkedToSelected && !linkedToSelected.has(n.id);
                  const col = TYPE_COLORS[n.comboType]||"#555";
                  return (
                    <g key={n.id} className="graph-node"
                      transform={`translate(${p.x},${p.y})`}
                      style={{ cursor:"pointer", opacity: dimmed ? 0.2 : 1 }}
                      onMouseDown={e => handleNodeMouseDown(e, n.id)}
                      onClick={e => handleNodeClick(e, n.id)}
                      onContextMenu={e => openComboCtx(e, n)}
                      onMouseEnter={e => { setHovered(n.id); setTooltipPos({x:e.clientX,y:e.clientY}); }}
                      onMouseLeave={() => setHovered(null)}>
                      <rect x={-COMBO_W/2} y={-COMBO_H/2} width={COMBO_W} height={COMBO_H}
                        rx={11} fill={col+"22"}
                        stroke={col} strokeWidth={isSelected ? 2.5 : 1.2} />
                      <text textAnchor="middle" dy="0.35em"
                        fill={col} fontSize="8.5" fontFamily="'Crimson Text', serif"
                        style={{ pointerEvents:"none", userSelect:"none" }}>
                        {n.shortLabel}
                      </text>
                    </g>
                  );
                })}
                {/* Card nodes */}
                {visibleNodes.filter(n=>n.kind==="card").map(n => {
                  const p = positions[n.id]; if (!p) return null;
                  const r = cardR(n);
                  const isSelected = selected === n.id;
                  const dimmed = linkedToSelected && !linkedToSelected.has(n.id);
                  const isHub = n.centrality >= 8;
                  const isMid = n.centrality >= 4;
                  return (
                    <g key={n.id} className="graph-node"
                      transform={`translate(${p.x},${p.y})`}
                      style={{ cursor:"pointer", opacity: dimmed ? 0.15 : 1 }}
                      onMouseDown={e => handleNodeMouseDown(e, n.id)}
                      onClick={e => handleNodeClick(e, n.id)}
                      onMouseEnter={e => { setHovered(n.id); setTooltipPos({x:e.clientX,y:e.clientY}); }}
                      onMouseLeave={() => setHovered(null)}>
                      <circle r={r}
                        fill={isHub ? "#1a3a1a" : isMid ? "#162a16" : "#0f1f0f"}
                        stroke={isHub ? COLORS.green1 : isMid ? "#2d6a2d" : "#1e3e1e"}
                        strokeWidth={isSelected ? 3 : isHub ? 2 : 1.2} />
                      <text textAnchor="middle" dy="0.35em"
                        fill={isHub ? COLORS.green1 : COLORS.textMid}
                        fontSize={isHub ? "8" : "7"}
                        fontFamily="'Cinzel', serif"
                        style={{ pointerEvents:"none", userSelect:"none" }}>
                        {shorten(n.label)}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>

            {/* Tooltip */}
            {hovered && tooltipNode && (
              <div style={{
                position:"fixed", left: Math.min(tooltipPos.x+14, window.innerWidth-220),
                top: tooltipPos.y - 10, background:"#0d1f0d",
                border:`1px solid ${COLORS.border}`, borderRadius:"7px",
                padding:"8px 12px", pointerEvents:"none", zIndex:10, maxWidth:"210px",
              }}>
                <div style={{ fontFamily:"'Cinzel', serif", fontSize:"10px", color:COLORS.text, marginBottom:"4px" }}>
                  {tooltipNode.label}
                </div>
                {tooltipLines.map((l,i) => (
                  <div key={i} style={{ fontSize:"10px", color:COLORS.textDim, fontFamily:"'Crimson Text', serif", lineHeight:1.5 }}>{l}</div>
                ))}
              </div>
            )}

            {/* Legend */}
            <div style={{ position:"absolute", bottom:"10px", left:"12px", pointerEvents:"none" }}>
              <div style={{ fontSize:"9px", color:COLORS.textDim, fontFamily:"'Cinzel', serif", letterSpacing:"1px", marginBottom:"4px" }}>LEGEND</div>
              <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"3px" }}>
                <svg width="14" height="14"><circle cx="7" cy="7" r="6" fill="#162a16" stroke={COLORS.green1} strokeWidth="1.5"/></svg>
                <span style={{ fontSize:"10px", color:COLORS.textDim, fontFamily:"'Crimson Text', serif" }}>Card — size = combo count</span>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"3px" }}>
                <svg width="30" height="14"><rect x="1" y="2" width="28" height="10" rx="5" fill={TYPE_COLORS["infinite-mana"]+"22"} stroke={TYPE_COLORS["infinite-mana"]} strokeWidth="1"/></svg>
                <span style={{ fontSize:"10px", color:COLORS.textDim, fontFamily:"'Crimson Text', serif" }}>Combo — color = type</span>
              </div>
              <div style={{ fontSize:"10px", color:COLORS.textDim, fontFamily:"'Crimson Text', serif" }}>Click to highlight · Drag to move · Scroll to zoom</div>
            </div>
          </div>
        )}

        {/* Matrix view */}
        {view === "matrix" && (
          <div style={{ flex:1, overflowY:"auto", overflowX:"auto", padding:"10px 14px" }}>
            <table style={{ borderCollapse:"collapse", fontSize:"10px", fontFamily:"'Crimson Text', serif" }}>
              <thead>
                <tr>
                  <th style={{ padding:"4px 8px", color:COLORS.textDim, textAlign:"left",
                    fontFamily:"'Cinzel', serif", fontSize:"9px", letterSpacing:"1px",
                    position:"sticky", left:0, background:"#0a160a", zIndex:2, minWidth:"140px" }}>
                    CARD / COMBO →
                  </th>
                  {matrixCombos.map(c => (
                    <th key={c.id}
                      onContextMenu={e => openComboCtx(e, { comboId: c.id })}
                      style={{ padding:"2px 4px", writingMode:"vertical-rl",
                      transform:"rotate(180deg)", color:TYPE_COLORS[c.type]||COLORS.textDim,
                      fontSize:"9px", fontFamily:"'Cinzel', serif", letterSpacing:"0.5px",
                      maxHeight:"110px", whiteSpace:"nowrap", cursor: "context-menu",
                      position:"sticky", top:0, background:"#0a160a", zIndex:1 }}>
                      {c.name.replace(/\s*\(.*?\)/g,"").slice(0,22)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrixCards.map((card, ri) => (
                  <tr key={card} style={{ background: ri%2===0 ? "#0d1a0d" : "#0a160a" }}>
                    <td style={{ padding:"3px 8px", whiteSpace:"nowrap",
                      color:(cardCentrality[card]||0)>=5 ? COLORS.green1 : COLORS.textMid,
                      fontWeight:(cardCentrality[card]||0)>=8 ? "bold" : "normal",
                      position:"sticky", left:0, background:ri%2===0?"#0d1a0d":"#0a160a", zIndex:1 }}>
                      {card.replace(", Soul of the Wild","").replace(", Nature's Herald","")
                        .replace(", the Wanderer Bard","").replace(", Cradle of Growth","")}
                      <span style={{ color:COLORS.textDim, marginLeft:"5px" }}>({cardCentrality[card]||0})</span>
                    </td>
                    {matrixCombos.map(c => (
                      <td key={c.id} style={{ textAlign:"center", padding:"2px 3px" }}>
                        {(c.requires||[]).includes(card) &&
                          <span style={{ color:TYPE_COLORS[c.type], fontSize:"11px" }}>■</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Combo right-click context menu */}
        {comboCtxMenu && (
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: "fixed",
              left: Math.min(comboCtxMenu.x, window.innerWidth - 260),
              top: Math.min(comboCtxMenu.y, window.innerHeight - 180),
              zIndex: 9999,
              background: "#0d1f0d",
              border: `1px solid ${COLORS.green1}88`,
              borderRadius: "8px",
              padding: "6px 0",
              minWidth: "240px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.85)",
              fontFamily: "'Cinzel', serif",
            }}
          >
            {/* Combo name header */}
            <div style={{ padding: "6px 14px 8px", borderBottom: `1px solid ${COLORS.border}`, marginBottom: "4px" }}>
              <div style={{ fontSize: "10px", color: TYPE_COLORS[comboCtxMenu.combo.type] || COLORS.green1, letterSpacing: "1px", marginBottom: "2px" }}>
                {(comboCtxMenu.combo.type || "combo").toUpperCase()}
              </div>
              <div style={{ fontSize: "11px", color: COLORS.text, lineHeight: 1.4 }}>
                {comboCtxMenu.combo.name.replace(/\s*\(.*?\)/g, "")}
              </div>
            </div>
            {/* Required cards list */}
            <div style={{ padding: "2px 14px 6px", borderBottom: `1px solid ${COLORS.border}`, marginBottom: "4px" }}>
              <div style={{ fontSize: "9px", color: COLORS.textDim, letterSpacing: "1px", marginBottom: "4px" }}>REQUIRES</div>
              {(comboCtxMenu.combo.requires || []).map(card => (
                <div key={card} style={{ fontSize: "11px", color: COLORS.textMid, fontFamily: "'Crimson Text', serif", lineHeight: 1.6 }}>
                  · {card}
                </div>
              ))}
            </div>
            {/* Open in Advisor action */}
            {onLoadCombo && (
              <div
                onClick={() => {
                  onLoadCombo({ hand: comboCtxMenu.combo.requires || [], battlefield: [], graveyard: [] });
                  setComboCtxMenu(null);
                  onClose();
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#1a3a1a"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                style={{ padding: "8px 14px", cursor: "pointer", color: COLORS.green2, fontSize: "11px", letterSpacing: "1px", display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span>↗</span> Open in Advisor
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function SavedStatesPanel({ currentState, onLoad, onClose }) {
  const { states, save } = useSavedStates();
  const [name, setName] = useState("");
  const [confirmDel, setConfirmDel] = useState(null);

  const handleSave = async () => {
    const label = name.trim() || `State ${new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}`;
    const entry = { id: Date.now(), name: label, savedAt: Date.now(), state: currentState };
    await save([entry, ...states].slice(0, 20)); // cap at 20
    setName("");
  };

  const handleLoad = (entry) => { onLoad(entry.state); onClose(); };

  const handleDelete = async (id) => {
    await save(states.filter(s => s.id !== id));
    setConfirmDel(null);
  };

  const formatTime = (ts) => {
    const d = new Date(ts);
    const today = new Date();
    const isToday = d.toDateString() === today.toDateString();
    return isToday
      ? d.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})
      : d.toLocaleDateString([], {month:"short",day:"numeric"}) + " " + d.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});
  };

  const statePreview = (s) => {
    const parts = [];
    if (s.hand?.length)        parts.push(`Hand: ${s.hand.slice(0,3).join(", ")}${s.hand.length > 3 ? "…" : ""}`);
    if (s.battlefield?.length) parts.push(`Board: ${s.battlefield.filter(c=>getCard(c)?.type==="creature").slice(0,2).join(", ")}…`);
    return parts.join(" · ") || "Empty board";
  };

  return (
    <div style={{
      position:"fixed", inset:0, background:"#000000cc", zIndex:1200,
      display:"flex", alignItems:"center", justifyContent:"center",
    }} onClick={onClose}>
      <div style={{
        background:"#0d1f0d", border:`1px solid ${COLORS.green1}`,
        borderRadius:"10px", width:"min(540px,95vw)", maxHeight:"80vh",
        display:"flex", flexDirection:"column", overflow:"hidden",
      }} onClick={e=>e.stopPropagation()}>

        {/* Header */}
        <div style={{padding:"16px 20px 12px", borderBottom:`1px solid ${COLORS.border}`, display:"flex", alignItems:"center", gap:"12px"}}>
          <div style={{flex:1, fontFamily:"'Cinzel', serif", fontSize:"14px", color:COLORS.text}}>📌 Saved Board States</div>
          <button onClick={onClose} style={{background:"none", border:`1px solid ${COLORS.border}`, borderRadius:"4px", color:COLORS.textDim, cursor:"pointer", fontSize:"13px", padding:"3px 9px", flexShrink:0}}>✕</button>
        </div>

        {/* Save current */}
        <div style={{padding:"12px 20px", borderBottom:`1px solid ${COLORS.border}`, display:"flex", gap:"8px"}}>
          <input
            value={name}
            onChange={e=>setName(e.target.value)}
            onKeyDown={e=>e.key==="Enter" && handleSave()}
            placeholder="Snapshot name (optional)…"
            style={{flex:1, background:"#0a150a", border:`1px solid ${COLORS.border}`, borderRadius:"4px",
              color:COLORS.text, fontFamily:"'Crimson Text', serif", fontSize:"13px", padding:"6px 10px", outline:"none"}}
          />
          <button onClick={handleSave} style={{
            background:"#1a3a1a", border:`1px solid ${COLORS.green1}`, borderRadius:"4px",
            color:COLORS.text, fontFamily:"'Cinzel', serif", fontSize:"11px", letterSpacing:"1px",
            padding:"6px 14px", cursor:"pointer",
          }}>SAVE NOW</button>
        </div>

        {/* List */}
        <div style={{overflowY:"auto", flex:1, padding:"10px 16px"}}>
          {states.length === 0 && (
            <div style={{color:COLORS.textDim, fontFamily:"'Crimson Text', serif", fontSize:"13px", textAlign:"center", padding:"24px 0"}}>
              No saved states yet. Hit SAVE NOW to bookmark the current board.
            </div>
          )}
          {states.map(entry => (
            <div key={entry.id} style={{
              display:"flex", alignItems:"center", gap:"10px",
              padding:"10px 12px", borderRadius:"6px", marginBottom:"6px",
              background:"#0a150a", border:`1px solid ${COLORS.border}`,
            }}>
              <div style={{flex:1, minWidth:0}} >
                <div style={{fontFamily:"'Cinzel', serif", fontSize:"12px", color:COLORS.textMid, marginBottom:"2px"}}>{entry.name}</div>
                <div style={{fontSize:"11px", color:COLORS.textDim, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{statePreview(entry.state)}</div>
                <div style={{fontSize:"10px", color:COLORS.textDim, marginTop:"2px"}}>{formatTime(entry.savedAt)}</div>
              </div>
              <button onClick={()=>handleLoad(entry)} style={{
                background:"#1a3a1a", border:`1px solid ${COLORS.green1}44`, borderRadius:"4px",
                color:COLORS.textMid, cursor:"pointer", fontSize:"11px", padding:"4px 10px", flexShrink:0,
              }}>Load</button>
              {confirmDel === entry.id ? (
                <div style={{display:"flex", gap:"4px", flexShrink:0}}>
                  <button onClick={()=>handleDelete(entry.id)} style={{background:"#3a0a0a", border:"1px solid #e74c3c44", borderRadius:"4px", color:"#e74c3c", cursor:"pointer", fontSize:"11px", padding:"4px 8px"}}>Delete</button>
                  <button onClick={()=>setConfirmDel(null)} style={{background:"none", border:`1px solid ${COLORS.border}`, borderRadius:"4px", color:COLORS.textDim, cursor:"pointer", fontSize:"11px", padding:"4px 8px"}}>Cancel</button>
                </div>
              ) : (
                <button onClick={()=>setConfirmDel(entry.id)} style={{background:"none", border:"1px solid #5a1a1a", borderRadius:"4px", color:"#e74c3c66", cursor:"pointer", fontSize:"11px", padding:"4px 8px", flexShrink:0}}>✕</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Application-wide Error Boundary ──────────────────────────────────────────
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    this.setState({ info });
  }
  render() {
    if (this.state.error) {
      const err = this.state.error;
      const stack = this.state.info?.componentStack || "";
      return (
        <div style={{
          minHeight: "100vh", background: "#0a0f0a", display: "flex",
          alignItems: "center", justifyContent: "center", padding: "24px",
        }}>
          <div style={{
            background: "#1a0a0a", border: "1px solid #e74c3c66",
            borderLeft: "4px solid #e74c3c", borderRadius: "10px",
            padding: "28px 32px", maxWidth: "720px", width: "100%",
            fontFamily: "'Crimson Text', serif",
          }}>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: "16px", color: "#e74c3c", marginBottom: "8px", letterSpacing: "1px" }}>
              ⚠ APPLICATION ERROR
            </div>
            <div style={{ fontSize: "15px", color: "#f5e6d3", marginBottom: "16px", lineHeight: 1.5 }}>
              {err.message || String(err)}
            </div>
            <details style={{ marginBottom: "16px" }}>
              <summary style={{ color: "#c0392b", cursor: "pointer", fontSize: "12px", letterSpacing: "1px", fontFamily: "'Cinzel', serif" }}>
                STACK TRACE
              </summary>
              <pre style={{
                marginTop: "8px", padding: "12px", background: "#0a0505",
                border: "1px solid #3a1a1a", borderRadius: "6px",
                fontSize: "11px", color: "#e08080", overflowX: "auto",
                lineHeight: 1.5, whiteSpace: "pre-wrap",
              }}>
                {err.stack}{stack}
              </pre>
            </details>
            <button
              onClick={() => this.setState({ error: null, info: null })}
              style={{
                background: "#1a3a1a", border: "1px solid #4ade8066",
                borderRadius: "6px", padding: "8px 20px",
                color: "#f5e6d3", cursor: "pointer",
                fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "1px",
              }}
            >
              ↺ TRY TO RECOVER
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function YevaAdvisor() {
  const { decks, activeDeckId, saveDecks, saveActiveDeck } = useDeckStorage();
  const [showDeckManager, setShowDeckManager] = useState(false);
  const [showSynergyMap, setShowSynergyMap]   = useState(false);
  const [showGoldfish, setShowGoldfish]       = useState(false);
  const [showHelp, setShowHelp]               = useState(false);
  const tour = useTour();

  // Compute the active deck's card set for filtering
  const activeDeck = (activeDeckId && PRESET_DECKS.find(d => d.id === activeDeckId)) || decks?.find(d => d.id === activeDeckId) || null;
  const deckList = activeDeck ? new Set(activeDeck.cards) : null;
  const [hand, setHand] = useState([]);
  const [battlefield, setBattlefield] = useState([]);
  const [graveyard, setGraveyard] = useState([]);
  const [mana, setMana] = useState("3");
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [yisanCounters, setYisanCounters] = useState(0);
  const [advice, setAdvice] = useState([]);
  const [infiniteMana, setInfiniteMana] = useState(false);
  const [activeComboName, setActiveComboName] = useState(null);
  const [collapseKey, setCollapseKey] = useState(0);
  const advicePanelRef = useRef(null);
  const zoneInputRefs = useRef({}); // populated by CardInput via onRef prop

  // Preserve scroll position when advice updates
  const scrollPosRef = useRef(0);
  useEffect(() => {
    const el = advicePanelRef.current;
    if (!el) return;
    el.scrollTop = scrollPosRef.current;
  }, [advice]);
  const handleAdviceScroll = useCallback(() => {
    scrollPosRef.current = advicePanelRef.current?.scrollTop ?? 0;
  }, []);
  const [showDebug, setShowDebug] = useState(false);
  const [showSavedStates, setShowSavedStates] = useState(false);

  // Global keyboard shortcuts
  useEffect(() => {
    const ZONES = ["hand", "battlefield", "graveyard"];
    const handler = (e) => {
      // Don't fire when typing in an input/textarea
      const tag = document.activeElement?.tagName;
      const inInput = tag === "INPUT" || tag === "TEXTAREA";

      // Shift+S = quick-save current state
      if (e.key === "S" && e.shiftKey && !e.ctrlKey && !e.metaKey && !inInput) {
        e.preventDefault();
        setShowSavedStates(true);
      }
      // Escape = close any open modal
      if (e.key === "Escape") {
        setShowSavedStates(false);
        setShowDebug(false);
        setShowDeckManager(false);
        setShowGoldfish(false);
        setShowHelp(false);
      }
      // Tab = cycle focus between zone inputs (only when not in an input, or at end of suggestions)
      if (e.key === "Tab" && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
        const inputs = ZONES.map(z => zoneInputRefs.current[z]).filter(Boolean);
        const focused = document.activeElement;
        const idx = inputs.indexOf(focused);
        if (idx >= 0) {
          e.preventDefault();
          inputs[(idx + 1) % inputs.length]?.focus();
        } else if (!inInput) {
          e.preventDefault();
          inputs[0]?.focus();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
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
      if (state.yisanCounters != null) setYisanCounters(state.yisanCounters);
      // Clean the URL without reloading
      window.history.replaceState({}, "", window.location.pathname);
    }).catch(() => {}); // silently ignore malformed params
  }, []);
  // Each card is unique — adding to one zone removes it from the other two
  const addTo = (zone) => (card) => {
    if (zone === "battlefield") {
      const type = getCard(card)?.type;
      if (type === "instant" || type === "sorcery") return;
    }
    const isBasic = getCard(card)?.tags?.includes("basic");
    // For non-basics: move semantics (remove from other zones, add to destination)
    // For basics: add semantics (can exist in multiple zones simultaneously — don't remove from others)
    if (!isBasic) {
      if (zone !== "hand")        setHand(prev => {
        const idx = prev.indexOf(card);
        return idx === -1 ? prev : [...prev.slice(0, idx), ...prev.slice(idx + 1)];
      });
      if (zone !== "battlefield") setBattlefield(prev => {
        const idx = prev.indexOf(card);
        return idx === -1 ? prev : [...prev.slice(0, idx), ...prev.slice(idx + 1)];
      });
      if (zone !== "graveyard")   setGraveyard(prev => {
        const idx = prev.indexOf(card);
        return idx === -1 ? prev : [...prev.slice(0, idx), ...prev.slice(idx + 1)];
      });
    }
    // Add to destination — basics always allow duplicates, non-basics deduplicate
    const setter = zone === "hand" ? setHand : zone === "battlefield" ? setBattlefield : setGraveyard;
    setter(prev => (!isBasic && prev.includes(card)) ? prev : [...prev, card]);
  };
  const removeFrom = (setter) => (card) => setter(prev => {
    const idx = prev.indexOf(card);
    return idx === -1 ? prev : [...prev.slice(0, idx), ...prev.slice(idx + 1)];
  });

  const reset = () => {
    setHand([]); setBattlefield([]); setGraveyard([]);
    setMana("3"); setIsMyTurn(false); setAdvice([]);
    setYisanCounters(0); setInfiniteMana(false); setActiveComboName(null);
  };

  // Auto-calculate mana from battlefield contents
  useEffect(() => {
    const calculated = calculateBattlefieldMana(battlefield);
    setMana(String(calculated));
  }, [battlefield]);

  // Reset Yisan counter when Yisan leaves the battlefield
  useEffect(() => {
    if (!battlefield.includes("Yisan, the Wanderer Bard")) {
      setYisanCounters(0);
    }
  }, [battlefield]);

  // Live analysis as state changes
  useEffect(() => {
    if (hand.length + battlefield.length > 0) {
      try {
        const { results, infiniteManaActive, activeComboName: comboName } = analyzeGameState({ hand, battlefield, graveyard, manaAvailable: mana, isMyTurn, yisanCounters, deckList });
        setAdvice(results);
        setInfiniteMana(infiniteManaActive);
        setActiveComboName(comboName);
      } catch (err) {
        console.error("analyzeGameState crash:", err);
        setAdvice([{ priority: 0, category: "⚠️ ERROR", headline: err.message, detail: err.stack, steps: [], color: "#e74c3c" }]);
      }
    }
  }, [hand, battlefield, graveyard, mana, isMyTurn, yisanCounters]);

  const elvesOnBoard     = battlefield.filter(c => getCard(c)?.tags?.includes("elf")).length;
  const creaturesOnBoard = battlefield.filter(c => getCard(c)?.type === "creature").length;
  const devotionOnBoard  = battlefield.reduce((sum, c) => sum + (getCard(c)?.devotion ?? 0), 0);

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
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.65; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes manaFlash {
          0%   { opacity: 1; transform: translateX(-50%) translateY(0); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-14px); }
        }
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
        }} data-tour="tour-header">
          <div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: "22px",
              fontWeight: 700, color: COLORS.green3, letterSpacing: "1px",
            }}>
              Yeva Draw-Grow
            </div>
            <div style={{ fontSize: "12px", color: COLORS.textDim, letterSpacing: "2px", fontFamily: "'Cinzel', serif" }}>
              ADVISOR · <span style={{ opacity: 0.5, letterSpacing: "1px" }}>v{__APP_VERSION__}</span><span style={{ opacity: 0.35, letterSpacing: "0.5px", fontSize: "9px" }}> ({__GIT_HASH__})</span>
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
            {infiniteMana && (
              <div
                title={activeComboName ? `Active combo: ${activeComboName}` : "Infinite mana combo active"}
                style={{
                  padding: "4px 12px",
                  background: "#1a0a2e",
                  border: `1px solid #a855f7`,
                  borderRadius: "6px",
                  fontSize: "12px", color: "#c084fc",
                  fontFamily: "'Cinzel', serif",
                  letterSpacing: "1px",
                  boxShadow: "0 0 10px #a855f722",
                  animation: "pulse 2s ease-in-out infinite",
                  cursor: "help",
                  position: "relative",
                }}>
                ⚡ ∞ INFINITE MANA
                {activeComboName && (
                  <span style={{
                    display: "block",
                    fontSize: "9px",
                    letterSpacing: "0.5px",
                    color: "#a78bfa",
                    marginTop: "1px",
                    fontFamily: "'Crimson Text', serif",
                    fontStyle: "italic",
                    maxWidth: "180px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}>
                    {activeComboName}
                  </span>
                )}
              </div>
            )}
            <button onClick={() => setShowSavedStates(true)} title="Save and reload board state snapshots — useful for testing different lines from the same position (Shift+S)" style={{
              background: "none", border: `1px solid ${COLORS.border}`,
              borderRadius: "6px", padding: "5px 14px",
              color: COLORS.textDim, cursor: "pointer",
              fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "1px",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.target.style.borderColor = COLORS.green1; e.target.style.color = COLORS.green1; }}
              onMouseLeave={e => { e.target.style.borderColor = COLORS.border; e.target.style.color = COLORS.textDim; }}
            >📌 STATES</button>
            <button onClick={() => setShowSynergyMap(true)} title="Visual graph showing how cards in your deck connect to combos and each other" style={{
              background: "none", border: `1px solid ${COLORS.border}`,
              borderRadius: "6px", padding: "5px 14px",
              color: COLORS.textDim, cursor: "pointer",
              fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "1px",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.target.style.borderColor = "#a569bd"; e.target.style.color = "#a569bd"; }}
              onMouseLeave={e => { e.target.style.borderColor = COLORS.border; e.target.style.color = COLORS.textDim; }}
            >⬡ SYNERGY</button>
            <button onClick={() => setShowGoldfish(true)} title="Play through your deck solo to test opening hands, combo consistency, and win speed" style={{
              background: "none", border: `1px solid ${COLORS.border}`,
              borderRadius: "6px", padding: "5px 14px",
              color: COLORS.textDim, cursor: "pointer",
              fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "1px",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.target.style.borderColor = COLORS.green2; e.target.style.color = COLORS.green2; }}
              onMouseLeave={e => { e.target.style.borderColor = COLORS.border; e.target.style.color = COLORS.textDim; }}
            >🐟 GOLDFISH</button>
            <button onClick={() => setShowDebug(true)} title="Dump the current application state as JSON for debugging" style={{
              background: "none", border: `1px solid ${COLORS.border}`,
              borderRadius: "6px", padding: "5px 14px",
              color: COLORS.textDim, cursor: "pointer",
              fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "1px",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.target.style.borderColor = "#5dade2"; e.target.style.color = "#5dade2"; }}
              onMouseLeave={e => { e.target.style.borderColor = COLORS.border; e.target.style.color = COLORS.textDim; }}
            >⌗ DEBUG</button>
            {/* Deck selector */}
            <button onClick={() => setShowDeckManager(true)} data-tour="tour-deck" title="Manage your decks — create, import, edit, and switch between saved decklists" style={{
              background: activeDeck ? "#1a3a1a" : "none",
              border: `1px solid ${activeDeck ? COLORS.green1 : COLORS.border}`,
              borderRadius: "6px", padding: "5px 14px",
              color: activeDeck ? COLORS.text : COLORS.textDim, cursor: "pointer",
              fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "1px",
              transition: "all 0.2s", maxWidth: "160px",
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>
              📚 {activeDeck ? activeDeck.name : "ALL CARDS"}
            </button>
            <button onClick={reset} title="Clear the current board state — hand, battlefield, and graveyard" style={{
              background: "none", border: `1px solid ${COLORS.border}`,
              borderRadius: "6px", padding: "5px 14px",
              color: COLORS.textDim, cursor: "pointer",
              fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "1px",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.target.style.borderColor = COLORS.red; e.target.style.color = COLORS.red; }}
              onMouseLeave={e => { e.target.style.borderColor = COLORS.border; e.target.style.color = COLORS.textDim; }}
            >↺ RESET</button>
            <button onClick={() => setShowHelp(true)} title="Open manual" style={{
              background: "none", border: `1px solid ${COLORS.border}`,
              borderRadius: "6px", padding: "5px 10px",
              color: COLORS.textDim, cursor: "pointer",
              fontFamily: "'Cinzel', serif", fontSize: "13px", letterSpacing: "0",
              transition: "all 0.2s", lineHeight: 1,
            }}
              onMouseEnter={e => { e.target.style.borderColor = COLORS.green2; e.target.style.color = COLORS.green2; }}
              onMouseLeave={e => { e.target.style.borderColor = COLORS.border; e.target.style.color = COLORS.textDim; }}
            >?</button>
          </div>

          {/* HELP MODAL */}
          {showHelp && <HelpModal onClose={() => setShowHelp(false)} onStartTour={() => { setShowHelp(false); tour.start(); }} />}
          {/* SYNERGY MAP MODAL */}
          {showSynergyMap && <SynergyMapModal activeDeck={activeDeck} onClose={() => setShowSynergyMap(false)} onLoadCombo={(s) => {
            if (s.hand)        setHand(s.hand);
            if (s.battlefield) setBattlefield(s.battlefield);
            if (s.graveyard)   setGraveyard(s.graveyard);
            setShowSynergyMap(false);
          }} />}
          {/* GOLDFISH MODAL */}
          {showGoldfish && (
            <GoldfishModal
              activeDeck={activeDeck}
              onClose={() => setShowGoldfish(false)}
              onLoadState={(s) => {
                if (s.hand)        setHand(s.hand);
                if (s.battlefield) setBattlefield(s.battlefield);
                if (s.graveyard)   setGraveyard(s.graveyard);
                if (s.mana != null) setMana(String(s.mana));
                if (s.isMyTurn != null) setIsMyTurn(s.isMyTurn);
                setShowGoldfish(false);
              }}
            />
          )}
          {/* TOUR OVERLAY */}
          <TourOverlay active={tour.active} step={tour.step} next={tour.next} prev={tour.prev} skip={tour.skip} total={tour.total} />
          {/* SAVED STATES MODAL */}
          {showSavedStates && (
            <SavedStatesPanel
              currentState={{ hand, battlefield, graveyard, mana: Number(mana), isMyTurn, yisanCounters }}
              onLoad={(s) => {
                if (s.hand)        setHand(s.hand);
                if (s.battlefield) setBattlefield(s.battlefield);
                if (s.graveyard)   setGraveyard(s.graveyard);
                if (s.mana != null) setMana(String(s.mana));
                if (s.isMyTurn != null) setIsMyTurn(s.isMyTurn);
                if (s.yisanCounters != null) setYisanCounters(s.yisanCounters);
              }}
              onClose={() => setShowSavedStates(false)}
            />
          )}
          {/* DEBUG MODAL */}
          {showDeckManager && decks !== null && (
            <DeckManager
              decks={decks}
              activeDeckId={activeDeckId}
              onSaveDecks={saveDecks}
              onSetActive={saveActiveDeck}
              onClose={() => setShowDeckManager(false)}
            />
          )}
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
                      const state = { hand, battlefield, graveyard, mana: Number(mana), isMyTurn, yisanCounters };
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
                            · {c} <span style={{ color: COLORS.textDim }}>({getCard(c)?.type}, cmc {getCard(c)?.cmc})</span>
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
              <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "12px" }} data-tour="tour-turn">
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
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }} data-tour="tour-mana">
                <div>
                  <label style={{ fontFamily: "'Cinzel', serif", fontSize: "11px", color: COLORS.textDim, letterSpacing: "1px", whiteSpace: "nowrap", display: "block" }}>MANA AVAILABLE</label>
                  <span style={{ fontSize: "9px", color: COLORS.textDim, opacity: 0.6, fontFamily: "'Crimson Text', serif", fontStyle: "italic" }}>auto · override manually</span>
                </div>
                <input
                  type="number" min="0" max="999" value={mana}
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

              {/* Yisan counter tracker — only shown when Yisan is on the battlefield */}
              {battlefield.includes("Yisan, the Wanderer Bard") && (
                <div style={{ marginTop: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <div>
                    <label style={{ fontFamily: "'Cinzel', serif", fontSize: "11px", color: "#27ae60", letterSpacing: "1px", display: "block" }}>YISAN VERSE</label>
                    <span style={{ fontSize: "9px", color: COLORS.textDim, opacity: 0.6, fontFamily: "'Crimson Text', serif", fontStyle: "italic" }}>current counters</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <button onClick={() => setYisanCounters(v => Math.max(0, v - 1))} style={{
                      width: 28, height: 28, borderRadius: "50%", border: `1px solid ${COLORS.border}`,
                      background: "#07100788", color: COLORS.textMid, cursor: "pointer",
                      fontSize: "16px", lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center",
                    }}>−</button>
                    <span style={{
                      width: 36, textAlign: "center",
                      fontFamily: "'Cinzel', serif", fontSize: "20px", fontWeight: 700, color: "#27ae60",
                    }}>{yisanCounters}</span>
                    <button onClick={() => setYisanCounters(v => Math.min(10, v + 1))} style={{
                      width: 28, height: 28, borderRadius: "50%", border: `1px solid ${COLORS.border}`,
                      background: "#07100788", color: COLORS.textMid, cursor: "pointer",
                      fontSize: "16px", lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center",
                    }}>+</button>
                  </div>
                </div>
              )}
            </div>

            <div style={{ height: "1px", background: COLORS.border, marginBottom: "16px" }} />

            {/* Hand */}
            <div data-tour="tour-hand">
            <QuickAdd zone="hand" onAdd={addTo("hand")} deckCards={activeDeck?.cards} />
            <CardInput label="Hand" zone="hand" cards={hand}
              onRef={el => { zoneInputRefs.current["hand"] = el; }}
              onAdd={addTo("hand")} onRemove={removeFrom(setHand)}
              placeholder="Cards in your hand…"
              deckCards={activeDeck?.cards}
              onDropCard={(name, _from, to) => addTo(to)(name)}
              onPlay={card => {
                const type = getCard(card)?.type;
                if (type === "instant" || type === "sorcery") addTo("graveyard")(card);
                else addTo("battlefield")(card);
              }} />
            </div>

            {/* Battlefield */}
            <div data-tour="tour-battlefield">
            <QuickAdd zone="battlefield" onAdd={addTo("battlefield")} deckCards={activeDeck?.cards} />
            <CardInput label="Battlefield" zone="battlefield" cards={battlefield}
              onRef={el => { zoneInputRefs.current["battlefield"] = el; }}
              onAdd={addTo("battlefield")} onRemove={removeFrom(setBattlefield)}
              placeholder="Permanents you control…"
              deckCards={activeDeck?.cards}
              onDropCard={(name, _from, to) => addTo(to)(name)} />
            </div>

            {/* Graveyard */}
            <QuickAdd zone="graveyard" onAdd={addTo("graveyard")} deckCards={activeDeck?.cards} />
            <CardInput label="Graveyard" zone="graveyard" cards={graveyard}
              onRef={el => { zoneInputRefs.current["graveyard"] = el; }}
              onAdd={addTo("graveyard")} onRemove={removeFrom(setGraveyard)}
              placeholder="Cards in your graveyard…"
              deckCards={activeDeck?.cards}
              onDropCard={(name, _from, to) => addTo(to)(name)} />

            {/* Playfield visualiser */}
            <Playfield
              hand={hand}
              battlefield={battlefield}
              onRemoveFromHand={removeFrom(setHand)}
              onRemoveFromBattlefield={removeFrom(setBattlefield)}
              onMoveToBattlefield={addTo("battlefield")}
              onMoveToHand={addTo("hand")}
            />

          </div>

          {/* RIGHT PANEL — Advice */}
          <div
            ref={advicePanelRef}
            onScroll={handleAdviceScroll}
            className="panel-advice"
            data-tour="tour-advice"
            style={{ flex: 1, padding: "20px 24px", overflowY: "auto" }}
          >
            {advice.length === 0 ? (
              hand.length === 0 && battlefield.length === 0 && graveyard.length === 0 ? (
              /* ── MULLIGAN ADVICE ── shown when no cards have been entered yet */
              <div style={{ color: COLORS.textMid, lineHeight: 1.7 }}>
                <div style={{
                  fontFamily: "'Cinzel', serif", fontSize: "13px",
                  letterSpacing: "2px", color: "#27ae60", marginBottom: "16px",
                }}>🃏 MULLIGAN GUIDE</div>

                <div style={{
                  background: "#0a150a", border: `1px solid #27ae60`,
                  borderRadius: "8px", padding: "14px 18px", marginBottom: "14px",
                }}>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: "12px", color: "#27ae60", marginBottom: "8px", letterSpacing: "1px" }}>
                    ✅ KEEP — ideal opener
                  </div>
                  <div style={{ fontSize: "13px", color: COLORS.textMid }}>
                    A hand with <strong style={{color:COLORS.textLight}}>at least one mana dork</strong> + <strong style={{color:COLORS.textLight}}>at least one tutor</strong> is almost always a keep. The deck wins through tutoring, so the ability to cast a turn-1 or turn-2 dork and follow up with a tutor is the core game plan.
                  </div>
                </div>

                <div style={{
                  background: "#0a100a", border: `1px solid ${COLORS.border}`,
                  borderRadius: "8px", padding: "14px 18px", marginBottom: "14px",
                }}>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: "12px", color: COLORS.gold, marginBottom: "10px", letterSpacing: "1px" }}>
                    🌿 MANA DORKS (keep any 1+)
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "6px" }}>
                    {["Llanowar Elves","Elvish Mystic","Fyndhorn Elves","Arbor Elf","Elves of Deep Shadow","Priest of Titania","Elvish Archdruid","Circle of Dreams Druid","Selvala, Heart of the Wilds","Devoted Druid","Fanatic of Rhonas"].map(c => (
                      <span key={c} style={{
                        background: "#0d1f0d", border: `1px solid #27ae6044`,
                        borderRadius: "4px", padding: "2px 8px",
                        fontSize: "12px", color: "#7ecb7e",
                        fontFamily: "'Crimson Text', serif",
                      }}>{c}</span>
                    ))}
                  </div>
                  <div style={{ fontSize: "12px", color: COLORS.textDim, marginTop: "4px" }}>
                    A turn-1 dork means turn-3 Yeva (commander) or turn-2 Quirion Ranger + turn-3 win setup.
                  </div>
                </div>

                <div style={{
                  background: "#0a100a", border: `1px solid ${COLORS.border}`,
                  borderRadius: "8px", padding: "14px 18px", marginBottom: "14px",
                }}>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: "12px", color: COLORS.gold, marginBottom: "10px", letterSpacing: "1px" }}>
                    🔍 TUTORS (keep any 1+)
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "6px" }}>
                    {["Worldly Tutor","Chord of Calling","Summoner's Pact","Green Sun's Zenith","Natural Order","Eldritch Evolution","Shared Summons","Fauna Shaman","Survival of the Fittest"].map(c => (
                      <span key={c} style={{
                        background: "#0d1f0d", border: `1px solid #27ae6044`,
                        borderRadius: "4px", padding: "2px 8px",
                        fontSize: "12px", color: "#7ecb7e",
                        fontFamily: "'Crimson Text', serif",
                      }}>{c}</span>
                    ))}
                  </div>
                  <div style={{ fontSize: "12px", color: COLORS.textDim, marginTop: "4px" }}>
                    Priority targets: Quirion Ranger, Ashaya, Formidable Speaker, Duskwatch Recruiter.
                  </div>
                </div>

                <div style={{
                  background: "#0a100a", border: `1px solid ${COLORS.border}`,
                  borderRadius: "8px", padding: "14px 18px", marginBottom: "14px",
                }}>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: "12px", color: "#e74c3c", marginBottom: "8px", letterSpacing: "1px" }}>
                    ❌ MULLIGAN — missing both pieces
                  </div>
                  <div style={{ fontSize: "13px", color: COLORS.textMid }}>
                    Hands with <strong style={{color:COLORS.textLight}}>no dork AND no tutor</strong> can't execute the game plan. Hands with only lands and non-interactive cards (e.g. just Ashaya + Seedborn Muse) should usually be mulliganed — you need acceleration and a way to find combo pieces.
                  </div>
                </div>

                <div style={{
                  background: "#0a100a", border: `1px solid ${COLORS.border}`,
                  borderRadius: "8px", padding: "14px 18px",
                }}>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: "12px", color: COLORS.textDim, marginBottom: "8px", letterSpacing: "1px" }}>
                    💡 BONUS — nice to have
                  </div>
                  <div style={{ fontSize: "13px", color: COLORS.textMid }}>
                    <strong style={{color:COLORS.textLight}}>Quirion Ranger</strong> in opening hand is premium — it's a combo piece, a dork untapper, and a free loop enabler once Ashaya lands. <strong style={{color:COLORS.textLight}}>2 lands</strong> is the sweet spot; 1 is risky, 4+ is slow. Flash enablers (Yeva is commander) make any tutor a threat on opponent's turns.
                  </div>
                </div>

                <div style={{ marginTop: "16px", fontSize: "12px", color: COLORS.textDim, textAlign: "center", fontStyle: "italic" }}>
                  Add cards above to see real-time advice for your current game state.
                </div>
              </div>
              ) : (
              <div style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                height: "100%", gap: "16px",
                color: COLORS.textDim, textAlign: "center",
              }}>
                <div style={{ fontSize: "48px", opacity: 0.3 }}>🌿</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: "16px", color: COLORS.textDim }}>
                  No advice for this board state
                </div>
                <div style={{ fontSize: "14px", maxWidth: "400px", lineHeight: 1.6 }}>
                  The current combination of cards doesn't match any known patterns. Try adding more pieces.
                </div>
              </div>
              )
            ) : (
              <div>
                {activeDeck && (
                  <div style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    marginBottom: "14px", padding: "7px 12px",
                    background: "#0d200d", border: `1px solid ${COLORS.green1}44`,
                    borderRadius: "6px",
                  }}>
                    <span style={{ fontSize: "13px" }}>📚</span>
                    <span style={{ fontFamily: "'Cinzel', serif", fontSize: "11px", color: COLORS.green1, letterSpacing: "1px" }}>
                      {activeDeck.name}
                    </span>
                    <span style={{ fontSize: "11px", color: COLORS.textDim }}>
                      — advice filtered to {activeDeck.cards.length} cards
                    </span>
                    <button onClick={() => setShowDeckManager(true)} style={{
                      marginLeft: "auto", background: "none", border: "none",
                      color: COLORS.textDim, cursor: "pointer", fontSize: "11px",
                      fontFamily: "'Cinzel', serif",
                    }}>change</button>
                  </div>
                )}
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
                    {advice.length} line{advice.length !== 1 ? "s" : ""}
                  </div>
                  <button
                    onClick={() => setCollapseKey(k => k <= 0 ? 1 : k + 1)}
                    title="Expand all"
                    style={{
                      background: "none", border: `1px solid ${COLORS.border}`,
                      borderRadius: "4px", padding: "2px 8px",
                      color: COLORS.textDim, cursor: "pointer",
                      fontSize: "11px", fontFamily: "'Cinzel', serif",
                    }}>▾ all</button>
                  <button
                    onClick={() => setCollapseKey(k => k >= 0 ? -1 : k - 1)}
                    title="Collapse all"
                    style={{
                      background: "none", border: `1px solid ${COLORS.border}`,
                      borderRadius: "4px", padding: "2px 8px",
                      color: COLORS.textDim, cursor: "pointer",
                      fontSize: "11px", fontFamily: "'Cinzel', serif",
                    }}>▸ all</button>
                </div>

                {advice.map((a, i) => (
                  <AdviceCard key={i} advice={a} index={i} activeCards={new Set([...hand, ...battlefield])} collapseKey={collapseKey} />
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

// Wrap with error boundary for the default export
const YevaAdvisorWithBoundary = () => (
  <ErrorBoundary>
    <YevaAdvisor />
  </ErrorBoundary>
);
export { YevaAdvisorWithBoundary as default };
