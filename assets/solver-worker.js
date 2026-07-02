// Yeva Solver Web Worker — auto-generated from Solver/*.js, do not edit directly
// combo_data.js
/**
 * combo_data.js — Pure data: no require() dependencies.
 *
 * Extracted from actions.js so that GameState.js can import these
 * constants without triggering the actions → cards → actions circular
 * dependency chain.
 */

// ── Per-combo required card keys ──────────────────────────────────────────
// Source of truth: ref/decklist_combos.txt (combos 1–62)
var COMBO_REQUIRED_KEYS = [
  // Ashaya-based infinite mana loops (combos 1, 6, 7, 11, 14, 21, 24, 26, 27,
  //   32, 34, 36, 43, 45, 47, 48, 49, 50, 52, 56, 60, 61, 62)
  //
  // 3-card entries: when Ashaya+Ranger are both present (either on BF or in hand),
  // the tutor recognises that fetching a big dork completes the loop.
  // Without these, the 2-card ['ashaya','quirion_ranger'] entry fires immediately
  // (both already present) and the big dork never appears in missingCombo.
  ['ashaya','quirion_ranger','priest_of_titania'],
  ['ashaya','quirion_ranger','circle_of_dreams_druid'],
  ['ashaya','quirion_ranger','elvish_archdruid'],
  ['ashaya','quirion_ranger','wirewood_channeler'],
  ['ashaya','quirion_ranger','karametra_acolyte'],
  ['ashaya','quirion_ranger','selvala'],
  ['ashaya','quirion_ranger','fanatic_of_rhonas'],
  ['ashaya','quirion_ranger','shang_chi'],                 // self-funded: Quirion taps itself (Forest) for {G}, Shang-Chi haste enables the recast loop
  ['ashaya','scryb_ranger','priest_of_titania'],
  ['ashaya','scryb_ranger','circle_of_dreams_druid'],
  ['ashaya','scryb_ranger','elvish_archdruid'],
  ['ashaya','scryb_ranger','wirewood_channeler'],
  ['ashaya','scryb_ranger','karametra_acolyte'],
  ['ashaya','scryb_ranger','selvala'],
  ['ashaya','scryb_ranger','fanatic_of_rhonas'],
  ['ashaya','scryb_ranger','shang_chi'],                   // self-funded variant (Scryb Ranger)
  ['ashaya','quirion_ranger'],                              // 1
  ['ashaya','scryb_ranger'],                               // (shared key for 3,7,11,14,21,26,27,41,49)
  ['ashaya','argothian_elder'],                            // 6
  ['ashaya','ley_weaver'],                                 // 24
  ['ashaya','hyrax_tower_scout'],                          // (Ashaya+Hyrax)
  ['ashaya','magus_of_the_candelabra'],                    // 32,34,36,43,47,52,60,62
  ['ashaya','hope_tender','gaeas_cradle'],                 // 48
  ['ashaya','hope_tender','circle_of_dreams_druid'],       // 50
  ['ashaya','hope_tender','selvala'],                      // 56
  ['ashaya','hope_tender','nykthos'],                      // 45
  ['ashaya','hope_tender','shang_chi'],                    // 63 (detector disabled — restricted mana only)
  ['ashaya','hope_tender','shang_chi','formidable_speaker'], // 64
  ['ashaya','marwyn'],                                     // 26 (Scryb+Marwyn), 61
  ['ashaya','wirewood_channeler'],                         // 49 (Scryb+Channeler), 62

  // Kogla loops (combos 2, 15, 19, 23, 25, 35, 38, 59)
  ['kogla','karametra_acolyte'],                           // 2
  ['kogla','hyrax_tower_scout','priest_of_titania'],       // 15
  ['kogla','hyrax_tower_scout','selvala'],                 // 19
  ['kogla','hyrax_tower_scout','karametra_acolyte'],       // 23
  ['kogla','hyrax_tower_scout','circle_of_dreams_druid'],  // 25
  ['kogla','hyrax_tower_scout','elvish_archdruid'],        // 35
  ['kogla','hyrax_tower_scout','marwyn'],                  // 38
  ['kogla','hyrax_tower_scout','wirewood_channeler'],      // 59

  // Hyrax + Temur (combos 8, 18, 28, 30, 57)
  ['hyrax_tower_scout','temur_sabertooth','priest_of_titania'],   // 8
  ['hyrax_tower_scout','temur_sabertooth','selvala'],             // 18
  ['hyrax_tower_scout','temur_sabertooth','elvish_archdruid'],    // 28
  ['hyrax_tower_scout','temur_sabertooth','marwyn'],              // 30
  ['hyrax_tower_scout','temur_sabertooth','wirewood_channeler'],  // 57

  // Temur Sabertooth + Wirewood Symbiote combos (combos 4,5,12,13,16,17)
  ['wirewood_symbiote','temur_sabertooth','circle_of_dreams_druid'],  // 4,5,17
  ['wirewood_symbiote','temur_sabertooth','selvala'],                 // 12,13,16

  // Temur Sabertooth + Concordant Crossroads (combos 9, 10, 20)
  ['concordant_crossroads','temur_sabertooth','circle_of_dreams_druid'], // 9
  ['concordant_crossroads','temur_sabertooth','selvala'],                // 10
  ['concordant_crossroads','temur_sabertooth','karametra_acolyte'],      // 20

  // Temur Sabertooth + Selvala (combos 29, 37)
  ['selvala','temur_sabertooth','thousand_year_elixir'],    // 29
  ['karametra_acolyte','temur_sabertooth','thousand_year_elixir'], // 37

  // Temur Sabertooth + Shang-Chi as haste enabler (SC replaces Crossroads/Elixir/Surrak)
  ['shang_chi','temur_sabertooth','circle_of_dreams_druid'], // 9 variant
  ['shang_chi','temur_sabertooth','selvala'],                 // 10/22/29 variant
  ['shang_chi','temur_sabertooth','karametra_acolyte'],       // 20/37 variant

  // Kogla + Acolyte + Shang-Chi as haste enabler (combo 2 variant)
  ['shang_chi','kogla','karametra_acolyte'],                  // 2 variant

  // Wirewood Symbiote + Selvala (combo 53–55 use Cloudstone; keep base)
  ['wirewood_symbiote','selvala'],                         // broad coverage
  // Cloudstone Curio combos (53, 54, 55)
  ['cloudstone_curio','selvala','wirewood_symbiote','llanowar_elves'],   // 53
  ['cloudstone_curio','selvala','wirewood_symbiote','elvish_mystic'],    // 54
  ['cloudstone_curio','selvala','wirewood_symbiote','fyndhorn_elves'],   // 55
  ['cloudstone_curio','selvala','wirewood_symbiote'],                    // broad (with Selvala)
  ['cloudstone_curio','wirewood_symbiote'],                              // broad (no Selvala — route DFS toward Curio+Symbiote core)

  // Haste enabler + big dork loops (Concordant Crossroads / Surrak)
  ['concordant_crossroads','selvala'],
  ['concordant_crossroads','circle_of_dreams_druid'],

  // Argothian Elder + Wirewood Lodge loops (combos 31, 40, 42, 46)
  // [O-30] NOT ley_weaver — Wirewood Lodge's "{G},{T}: Untap target Elf"
  // cannot target Ley Weaver (a Human Druid), so it does not complete this
  // loop. (Ley Weaver IS valid in the Ashaya and Maze-of-Ith loops below.)
  ['argothian_elder','wirewood_lodge'],                    // 40, 42, 46
  ['argothian_elder','wirewood_lodge','nykthos'],          // 31

  // Maze of Ith + Elder/Weaver infinite mana loops
  // Elder taps → untaps Maze + Cradle/Nykthos; Maze taps → untaps Elder; repeat.
  ['argothian_elder','maze_of_ith'],
  ['argothian_elder','maze_of_ith','gaeas_cradle'],
  ['argothian_elder','maze_of_ith','nykthos'],
  ['ley_weaver','maze_of_ith'],
  ['ley_weaver','maze_of_ith','gaeas_cradle'],
  ['ley_weaver','maze_of_ith','nykthos'],

  // Tireless Provisioner + Ashaya + Ranger loops (Combo Summary #9)
  // Ranger ETB triggers Landfall → Treasure; Treasure pays Ranger recast cost.
  ['tireless_provisioner','ashaya','quirion_ranger'],
  ['tireless_provisioner','ashaya','scryb_ranger'],

  // Woodcaller Automaton + Temur Sabertooth + big land
  // Woodcaller ETB untaps Cradle/Nykthos; Sabertooth bounces it for loop.
  ['woodcaller_automaton','temur_sabertooth','gaeas_cradle'],
  ['woodcaller_automaton','temur_sabertooth','nykthos'],
  ['woodcaller_automaton','temur_sabertooth'],

  // Badgermole Cub + Ashaya + Quirion Ranger + any creature mana dork
  // Badgermole's static adds {G} whenever you tap a creature for mana.
  // A 1G dork + Badgermole bonus = 2G total. QR costs {G} to recast → net +1G per cycle.
  // Any non-sick creature with a tapForMana qualifies.
  ['badgermole_cub','ashaya','quirion_ranger'],

  // Destiny Spinner + Ashaya + Ranger + big land
  // Destiny Spinner animates Cradle/Nykthos; Ranger bounces itself to untap it.
  ['destiny_spinner','ashaya','quirion_ranger'],
  ['destiny_spinner','ashaya','scryb_ranger'],
  ['destiny_spinner','ashaya','quirion_ranger','gaeas_cradle'],
  ['destiny_spinner','ashaya','quirion_ranger','nykthos'],

  // Cradle / Nykthos non-Ashaya loops
  ['gaeas_cradle','deserted_temple'],
  ['gaeas_cradle','wirewood_lodge'],
  ['nykthos','deserted_temple'],

  // Earthcraft loops
  ['earthcraft','gaeas_cradle'],
  ['earthcraft','quirion_ranger'],

  // Selvala standalone combos
  ['selvala','temur_sabertooth'],
  ['selvala','kogla'],
  ['selvala','quirion_ranger'],
  ['selvala','scryb_ranger'],

  // Win condition pairs (need infinite mana already + win piece)
  ['duskwatch_recruiter','gaeas_cradle'],
  ['beast_whisperer','gaeas_cradle'],

  // ── C-13 routing-gap closures (2026-04-30) ─────────────────────────────
  // The C-13 manifest-routability test surfaced 10 combos whose cardKeys
  // were not a superset of any existing routing tuple. Adding the smallest
  // tuple per combo so the tutor heuristic recognises each.
  //
  // Eternal Witness chains (combos 33, 51, 58): Witness recurs the bounce
  // engine card from graveyard each cycle.
  ['marwyn','eternal_witness','temur_sabertooth'],            // 33, 58
  ['marwyn','eternal_witness','kogla'],                       // 51
  // Temur Sabertooth + 2-drop dork (combos 9, 10, 18, 20, 22, 57): bounce
  // and recast the dork. Source-of-truth lists various haste enablers; the
  // base routing tuple is just (Temur, dork) since the haste enabler can
  // be any of Concordant Crossroads / Thousand-Year Elixir / Surrak.
  ['temur_sabertooth','priest_of_titania'],                   // 9
  ['temur_sabertooth','circle_of_dreams_druid'],              // 10
  ['hyrax_tower_scout','temur_sabertooth','circle_of_dreams_druid'], // 18
  ['temur_sabertooth','karametra_acolyte'],                   // 20
  ['temur_sabertooth','marwyn'],                              // 22
  ['hyrax_tower_scout','temur_sabertooth','karametra_acolyte'], // 57
  // Magus + Cradle (combo 32): Magus untaps a land for {3}, paying its own
  // recast cost when Cradle has ≥3 creatures.
  ['magus_of_the_candelabra','gaeas_cradle'],                 // 32
  // Yeva flash-window combos: Yeva is always in the command zone (cost-0),
  // so these tuples list only the OTHER pieces needed. analyzeState will see
  // Yeva as present automatically (buildPresentSet now includes commandZone)
  // and just count the remaining missing pieces.
  ['glademuse', 'ashaya'],           // Glademuse + Yeva flash + ETB loop (QR implied by Ashaya combo)
  ['glademuse', 'gaeas_cradle'],     // Glademuse + Yeva flash + Cradle mana engine
  ['seedborn_muse', 'gaeas_cradle'], // Seedborn untap + Cradle on each opponent turn
  // Board-clear win conditions (need infinite mana + the clearing tool)
  ['ulvenwald_tracker', 'temur_sabertooth'], // Tracker fight loop: Temur bounces Tracker + haste
  ['legolas_quick_reflexes', 'gaeas_cradle'], // LQR tap loop: any mana-positive loop + LQR
  ['legolas_quick_reflexes', 'ashaya'],       // LQR tap loop: Ashaya-based loops have creatures to tap
  // Yavimaya + Arbor Elf combo
  ['yavimaya', 'arbor_elf', 'ashaya', 'quirion_ranger'], // Yavimaya makes Cradle a Forest → Arbor can untap it
];

// ── Tutor target priority ─────────────────────────────────────────────────
var TUTOR_PRIORITY_SCORE = {
  // Core combo pieces — highest priority
  'gaeas_cradle': 100, 'nykthos': 95, 'yavimaya': 90,
  'ashaya': 88, 'temur_sabertooth': 85, 'kogla': 82,
  'hope_tender': 80, 'quirion_ranger': 78, 'scryb_ranger': 76,
  'argothian_elder': 75, 'ley_weaver': 74, 'magus_of_the_candelabra': 73,
  'selvala': 70, 'karametra_acolyte': 68, 'circle_of_dreams_druid': 65,
  'priest_of_titania': 63, 'fanatic_of_rhonas': 62, 'elvish_archdruid': 61, 'wirewood_channeler': 59,
  'wirewood_symbiote': 57, 'hyrax_tower_scout': 55, 'earthcraft': 53,
  'deserted_temple': 51, 'concordant_crossroads': 49, 'wirewood_lodge': 48,
  'cloudstone_curio': 47,
  // Cards present in combos but previously missing from priority table
  'marwyn': 46, 'surrak_goreclaw': 44, 'thousand_year_elixir': 42,
  // Combo enablers: Woodcaller Automaton and Destiny Spinner
  'woodcaller_automaton': 50, 'destiny_spinner': 48,
  // Badgermole Cub: static boosts all creature dorks by +1G — enables QR loop with any 1G dork
  'badgermole_cub': 60,
  // Win conditions
  'duskwatch_recruiter': 47, 'beast_whisperer': 45,
  'endurance': 43, 'woodland_bellower': 40, 'fierce_empath': 35,
  // Lands for Sylvan Scrying / Crop Rotation
  'war_room': 38, 'geier_reach': 41,
  // Maze of Ith — key untap land for Argothian Elder / Ley Weaver infinite loops
  'maze_of_ith': 72,
  // Gemstone Caverns — fast mana land, lower priority than key combo lands
  'gemstone_caverns': 30,
  // Emergence Zone — utility land: sacrifice for flash (enables instant-speed combos)
  'emergence_zone': 32,
  // New cards — Invasion of Ikoria: non-Human creature tutor (similar role to Chord)
  'invasion_of_ikoria': 72,
  // Ulvenwald Oddity: haste creature, useful in loops that need immediate tap
  'ulvenwald_oddity': 38,
  // ── New cards 2026 batch 2 ───────────────────────────────────────────────
  'magus_of_the_order':         72,  // Natural Order on a stick — top-tier tutor
  'return_of_the_wildspeaker':  48,  // draw greatestPower cards — huge refill
  'incubation_druid':           38,  // 3-mana dork when adapted; high combo value
  'quest_for_renewal':          36,  // Seedborn Muse for creatures — very strong in loops
  'kamahls_will':               34,  // mass removal of opponent stax
  'generous_patron':            30,  // ETB support + draw on counter placement
  'ulvenwald_tracker':          22,  // fight stax threats
  'reclaim':                    28,  // instant-speed tutor-to-top from GY
  'vines_of_vastwood':          15,  // protection + pump; low combo relevance

  // ── New cards 2026 ──────────────────────────────────────────────────────
  // Draw-engine creatures (high value — draw cards in combo turns)
  'soul_of_the_harvest': 44,   // 6/6 draw-on-enter; similar to Beast Whisperer role
  'primordial_sage': 43,        // draw on creature-cast; non-Elf 4/5 body
  'voice_of_many': 36,          // 3/3 draw on ETB (1 card in 1v1)
  'elvish_visionary': 34,       // 1/1 ETB draw — cheap cantrip Elf body
  'llanowar_visionary': 33,     // 2/2 ETB draw + tap {G} — mana + card advantage
  'timeless_witness': 32,       // ETB graveyard return (Eternal Witness twin)
  'heart_warden': 28,           // 1/1 dork with {2}, sac: draw
  // Draw artifact
  "lifecrafters_bestiary": 30,  // draw on creature-cast for {G}; synergistic in loops
  // Mana dorks (medium priority — useful ramp but not combo-critical)
  'llanowar_tribe': 37,         // {G}{G}{G} dork — premium ramp
  'somberwald_sage': 35,        // {G}{G}{G} restricted dork
  'ilysian_caryatid': 27,       // 0/3 any-color dork (ferocious: 2x)
  'paradise_druid': 26,         // 2/1 any-color dork (hexproof while untapped)
  'leafkin_druid': 25,          // 0/3 ferocious: {G}{G}
  'whisperer_of_the_wilds': 24, // ferocious: {G}{G}
  'druid_of_the_cowl': 22,      // 1/2 plain {G} dork
  'armored_scrapgorger': 20,    // GY-hate dork (situational)
  'wose_pathfinder': 21,        // scales with Forests
  // Lands
  'havenwood_battleground': 29, // sac for {G}{G}{G} — strong burst mana
  'tranquil_thicket': 23,       // Forest cycling land — cycle or tap
  'tangled_florahedron': 24,    // MDFC: creature dork or Forest land
  // Sorcery
  'uncage_the_menagerie': 31,   // searches up to X creatures of MV X — strong tutor

  // ── Key engines missing from priority table ──────────────────────────────
  // These had score 0, causing Natural Order to sacrifice them before basic mana dorks.
  // Scores calibrated relative to similar-role cards already in the table.
  'eternal_witness':     55,  // recurs GSZ/Vitalize/combo pieces — critical engine
  'yisan':               55,  // tutors by CMC, runs standalone combo lines
  'survival_fittest':    50,  // strong creature tutor, enables assembling combos
  'fauna_shaman':        48,  // key creature tutor (repeatable Worldly Tutor)
  'formidable_speaker':  45,  // COMBO 64 key piece (Ashaya+SC+Tender loop)
  'elvish_harbinger':    42,  // fetches specific elves, enables elf-chain lines
  'regal_force':         38,  // major draw engine in creature-heavy boards
  'seedborn_muse':       55,  // untaps all permanents on opponents' turns + Yeva = extra turns
  'elvish_reclaimer':    35,  // fetches Cradle, Yavimaya, Nykthos
  'glademuse':           45,  // draw on YOUR spells during opponents' turns (needs Yeva flash) — same win as Beast Whisperer
  'heartwood_storyteller': 30, // draw on non-creature spells — group symmetry
};

// ── Functional equivalents ────────────────────────────────────────────────
// Within each group, having any one member satisfies all combos that use any
// other member (they play the same role in the combo engine).
//
// ⚠ Magus of the Candelabra is intentionally NOT grouped with argothian_elder /
// ley_weaver, even though all three untap lands.  The distinction matters:
//
//   Argothian Elder / Ley Weaver: {T}: Untap two target lands.  FREE — no mana cost.
//   Magus of the Candelabra:      {X},{T}: Untap X target lands.  Costs {X} mana.
//
// The Wirewood Lodge loops (combos 40, 31, 42, 46) and Maze of Ith loops rely on
// Elder/Weaver's FREE activation:
//   Tap big land → Elder untaps Lodge + big land (free) → Lodge untaps Elder ({G}).
// Magus cannot substitute here — paying {G}{G} for X=2 would cost more mana than
// Lodge + big land returns net, breaking the loop.
//
// Under Ashaya, Magus *does* enable its own loops (combos 32, 34, 36, 43, 47, 52,
// 60, 62), but those are correctly modelled as separate routing tuples:
//   ['ashaya','magus_of_the_candelabra']  (combo_data.js line 40)
//   ['magus_of_the_candelabra','gaeas_cradle']  (combo_data.js line 170)
//
// Adding Magus to the argothian_elder group would cause buildPresentSet to expand
// Magus → argothian_elder, making the Lodge/Maze routing tuples appear satisfied
// when they are not — a false-positive in analyzeState and canReachCombo.
var FUNCTIONAL_EQUIVALENTS = [
  new Set(['temur_sabertooth', 'kogla']),
  new Set(['quirion_ranger', 'scryb_ranger']),
  new Set(['argothian_elder', 'ley_weaver']),
  // All of these tap for large amounts of green mana and slot into the same
  // Temur Sabertooth / Hyrax bounce loops.
  new Set(['circle_of_dreams_druid', 'karametra_acolyte', 'priest_of_titania',
           'elvish_archdruid', 'wirewood_channeler', 'marwyn']),
];

// ── Fingerprint equivalents (state-dedup, NOT combo detection) ────────────
// ⚠ DO NOT reuse FUNCTIONAL_EQUIVALENTS above for this purpose, and do not
// add to this table by automated signature-matching (cost/power/toughness/
// subtypes comparison alone is NOT sufficient — see false positives caught
// below). This is a different relation: "two permanents that, if swapped,
// produce a fingerprint-identical resulting GameState forever after, in
// every respect the engine models" — not "play the same combo role."
//
// A member of FUNCTIONAL_EQUIVALENTS can satisfy the same combo as another
// member while still being fingerprint-DISTINCT (e.g. Temur Sabertooth and
// Kogla are both bounce-loop enablers, but they're different P/T, different
// cost, and never simultaneously redundant copies of the same role on one
// battlefield) — so the two tables are expected to look completely different
// and neither should be derived from the other.
//
// Qualification bar for a group below: every member must share IDENTICAL
// cost, power, toughness, types, AND subtypes (subtypes matter because other
// cards count board state by subtype — e.g. countElves() — not by name), and
// tapForMana must produce IDENTICAL mana output under every board state, not
// just the fresh-off-battlefield default (board-state-scaling abilities like
// "add G per Elf you control" are disqualifying even when two cards happen to
// match in a single test snapshot). Verified by direct tapForMana() calls,
// not by comparing source text — closures over different captured constants
// (e.g. simpleTap('{G}',...) vs simpleTap('{C}',...)) can have identical
// Function.prototype.toString() output despite producing different mana.
//
// Caught and excluded during verification (recorded so the next pass doesn't
// re-discover the same false positives from scratch):
//   • joraga_treespeaker — matches the group below ONLY at level 0; levels up
//     to {G}{G} output and a different power, so it's never a true twin.
//   • priest_of_titania / elvish_archdruid / heart_warden / llanowar_visionary —
//     scale with countElves(state) (or carry an ETB draw), so two of them
//     side by side are NOT swap-equivalent even though a single-Elf test
//     snapshot makes their output match Llanowar Elves by coincidence.
//   • topiary_lecturer / elvish_harbinger — power-scaling output and
//     any-color/tutor-ETB respectively; not twins despite matching cost/P/T.
//   • boreal_druid / delighted_halfling — true twins of EACH OTHER ({T}: Add
//     {C}, 1/1, no other ability) but NOT of the group below: different mana
//     color, and delighted_halfling's subtypes (Halfling, Citizen) lack the
//     Elf subtype that other cards (Elvish Guidance, countElves callers)
//     check for, so swapping it in for an Elf changes those cards' behavior.
//     Kept as its own separate group rather than merged into anything else.
var FINGERPRINT_EQUIVALENTS = [
  // {T}: Add {G}. 1/1 Elf Druid, cost G, no other text. Verified identical
  // tapForMana() output across all three with no board-state dependence.
  new Set(['llanowar_elves', 'elvish_mystic', 'fyndhorn_elves']),
  // {T}: Add {C}. 1/1, cost G, no other text. NOT merged with the group above:
  // different mana color, and the two cards have different subtypes from
  // each other too (boreal_druid is Elf Druid; delighted_halfling is
  // Halfling Citizen) — kept distinct so subtype-counting effects elsewhere
  // are never silently misattributed by a fingerprint canonicalization.
  new Set(['boreal_druid', 'delighted_halfling']),
];

// ── STAX card keys ────────────────────────────────────────────────────────
// Cards that suppress mana abilities or tax spells. Never fetched by tutors.
var STAX_KEYS = new Set([
  'collector_ouphe', 'null_rod', 'root_maze',
  'thorn_of_amethyst', 'trinisphere', 'orb_of_dreams', 'vexing_bauble',
  'chalice_of_the_void', 'disruptor_flute',
]);

// ── HOLD_FOR_WIN card keys ───────────────────────────────────────────────
// Cards that are win-condition enablers (tutors that find the finisher).
// The solver deprioritises casting these during the mana-combo search phase
// so they remain in hand for the win assembly. They are NOT blocked — they
// can still be cast if the solver has no other path, but their priority is
// set below pass-turn so the DFS explores every other option first.
var HOLD_FOR_WIN = new Set([
  'formidable_speaker',    // Tutor: finds Duskwatch or any creature
  'fauna_shaman',          // Tutor: finds any creature
  'survival_fittest',      // Tutor: finds any creature
  'duskwatch_recruiter',   // Win condition engine: finds all creatures
  'beast_whisperer',       // Draw engine: draws entire deck with creature loop
  'fierce_empath',         // ETB chain: finds Woodland Bellower → Duskwatch
  'woodland_bellower',     // ETB chain: finds Duskwatch directly
  'glademuse',             // Draw engine: draws on opponent spells
  'invasion_of_ikoria',    // Creature tutor (non-Human): same role as Chord of Calling
]);

function isStax(cardKey) {
  return STAX_KEYS.has(cardKey);
}

var _CDM = { COMBO_REQUIRED_KEYS, TUTOR_PRIORITY_SCORE, FUNCTIONAL_EQUIVALENTS, STAX_KEYS, isStax };
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

// [perf] cards.js and GameState.js are circularly dependent (cards.js requires
// GameState for ManaPool/Permanent inside its functions), so cards cannot be
// required at top-level here — it would capture a half-initialised export.
// The established pattern is a lazy `CARDS` inside each method, but
// that runs on the hottest paths (fingerprint, clone, enterBattlefield,
// startNewTurn) — and while require() is cached, the module-registry lookup
// still costs ~0.4µs/call, which adds up over ~hundreds of thousands of state
// encodings per solve. Memoise it once on first use: by the time any state
// method executes, both modules are fully loaded, so the cached reference is
// always the complete export.
var _cardsModule = null;
function _cards() {
  return _cardsModule ?? (_cardsModule = CARDS);
}

// ═══════════════════════════════════════════════════════════════════════════
//  Constants
// ═══════════════════════════════════════════════════════════════════════════

var DEFAULT_LIBRARY_SIZE    = 99;   // Commander deck minus commander (used as fallback)
var POISON_LOSS_THRESHOLD   = 10;

// [perf] Hoisted from 11 duplicate local `new Set([...])` declarations spread
// across removeFromBattlefield, enterBattlefield, several ETB removal effects
// (Manglehorn/Reclamation Sage/Chomping Changeling/Scrapshooter), and the
// _hasSTAX recomputation helpers — each was rebuilding an identical Set on
// every call, several of which sit on the hottest paths in the solver.
// Card NAMES (not keys) because these are matched against both
// `permanent.name` and `opponentStax` entries (string-encoded as
// "Card Name@param"), neither of which carries a cardKey.
//
// ALL_STAX_NAMES: every card that suppresses mana/activated abilities or
// taxes spells — mirrors combo_data.js's STAX_KEYS (same 9 cards, by name
// instead of key; kept separate rather than derived from STAX_KEYS to avoid
// a name↔key lookup on this hot path).
var ALL_STAX_NAMES = new Set([
  'Null Rod', 'Collector Ouphe', 'Root Maze', 'Orb of Dreams',
  'Thorn of Amethyst', 'Trinisphere', 'Chalice of the Void',
  'Vexing Bauble', 'Disruptor Flute',
]);
// COST_AFFECTING_STAX_NAMES: the subset of ALL_STAX_NAMES that specifically
// taxes spell/ability COSTS (Thorn/Trinisphere/Chalice/Vexing Bauble tax
// casting; Disruptor Flute taxes a named source's activated abilities) —
// used to gate effectiveCost's slow path. The other 4 (Null Rod, Collector
// Ouphe, Root Maze, Orb of Dreams) suppress abilities outright rather than
// changing a cost, so they don't belong in this narrower subset.
var COST_AFFECTING_STAX_NAMES = new Set([
  'Thorn of Amethyst', 'Trinisphere', 'Chalice of the Void',
  'Vexing Bauble', 'Disruptor Flute',
]);

// ── Authoritative 100-card Yeva decklist (card keys) ─────────────────────
// Yeva is included here; she is removed when building the library since she
// starts in the command zone.  Cards in hand/battlefield/graveyard/exile are
// also removed before the library is assembled.
var DEFAULT_DECKLIST = [
  'allosaurus_shepherd','ancient_tomb','arbor_elf','archdruid_charm',
  'argothian_elder','ashaya','badgermole_cub','beast_whisperer',
  'beast_within','birds_of_paradise','boreal_druid','boseiju',
  'chomping_changeling','chord_of_calling','chrome_mox','circle_of_dreams_druid',
  'collector_ouphe','crop_rotation','delighted_halfling','deserted_temple',
  'destiny_spinner','disciple_freyalise','dryad_arbor','duskwatch_recruiter',
  'earthcraft','eladamri','eldritch_evolution','elvish_archdruid',
  'shang_chi','elvish_harbinger','elvish_mystic','elvish_reclaimer',
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
 * @param {string[]} opts.exile        Card keys in the exile zone (removed from library)
 * @param {string[]} opts.graveyard    Card names in graveyard (not removed by key — names ≠ keys)
 * @returns {string[]} Shuffled library
 */
// Pre-built multiset of the decklist for O(1) exclusion (Fix #11).
// Maps key → count of copies in DEFAULT_DECKLIST.
var _DECKLIST_COUNTS = new Map();
for (const k of DEFAULT_DECKLIST) _DECKLIST_COUNTS.set(k, (_DECKLIST_COUNTS.get(k) ?? 0) + 1);

function buildDefaultLibrary(opts = {}) {
  // Build exclusion multiset: how many copies of each key to remove
  const excludeCounts = new Map();
  for (const k of (opts.commandZone ?? ['yeva'])) excludeCounts.set(k, (excludeCounts.get(k) ?? 0) + 1);
  for (const k of (opts.hand        ?? []))        excludeCounts.set(k, (excludeCounts.get(k) ?? 0) + 1);
  for (const k of (opts.battlefield ?? []))        excludeCounts.set(k, (excludeCounts.get(k) ?? 0) + 1);
  for (const k of (opts.exile       ?? []))        excludeCounts.set(k, (excludeCounts.get(k) ?? 0) + 1);
  for (const k of (opts.graveyard   ?? []))        excludeCounts.set(k, (excludeCounts.get(k) ?? 0) + 1);

  // Build deck by emitting each key (count − excluded) times (Fix #11)
  const deck = [];
  for (const [k, total] of _DECKLIST_COUNTS) {
    const keep = Math.max(0, total - (excludeCounts.get(k) ?? 0));
    for (let i = 0; i < keep; i++) deck.push(k);
  }

  // Fisher-Yates shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// [E12] Quick "is this bag of {key→truthy} effectively empty?" — used by
// fingerprint() to short-circuit when a permanent's counters or
// abilitiesUsed object exists but contains only falsy values.
// Fast: returns false on the first truthy hit; returns true only if every
// own key has a falsy value (the common case when the object was initialized
// from {} or shared via clone but never written to).
function _isEmptyBag(obj) {
  for (const k in obj) {
    if (obj[k]) return false;
  }
  return true;
}

// Card key → canonical label for fingerprint() purposes, built once from
// FINGERPRINT_EQUIVALENTS (combo_data.js). Within a group, every member maps
// to the SAME label (the group's alphabetically-first cardKey) so that e.g.
// Llanowar Elves and Fyndhorn Elves — verified fully interchangeable, see
// that table's comment for the verification done — produce identical
// fingerprint segments. The label is just the raw cardKey (not a display
// name); fingerprint() is an opaque dedup key, never parsed, so readability
// doesn't matter here. This only affects the fast path in fingerprint() (no
// aura/sickness/counters/etc.), which is exactly the case where two group
// members really are 100% swap-equivalent; anything with a distinguishing
// feature already takes the slow path and keeps its own cardKey-derived
// identity there regardless of this map.
var _fingerprintCanonicalName = new Map();
for (const group of FINGERPRINT_EQUIVALENTS) {
  const sorted = [...group].sort();
  const canonicalKey = sorted[0];
  for (const k of group) _fingerprintCanonicalName.set(k, canonicalKey);
}

// ═══════════════════════════════════════════════════════════════════════════
//  Player
// ═══════════════════════════════════════════════════════════════════════════

class Player {
  /**
   * @param {object}   data
   * @param {string}   data.name
   * @param {number}   data.life
   * @param {string[]} data.library      card keys, index 0 = top (active player only)
   * @param {number}   data.librarySize  size-only fallback (opponent players)
   * @param {boolean}  data._sizeOnly    true → track library as integer, not array
   * @param {number}   data.poison
   * @param {string[]} data.graveyard    card names, index 0 = top of pile
   * @param {string[]} data.exile        card names
   */
  constructor(data = {}) {
    this.name      = data.name        ?? 'Player';
    this.life      = data.life        ?? 40;
    this.poison    = data.poison      ?? 0;
    this.graveyard = data.graveyard   ? [...data.graveyard] : [];
    this.exile     = data.exile       ? [...data.exile]     : [];

    // _sizeOnly: opponent players (index 1-3) track library as a plain integer.
    // The active player (index 0) keeps a real array for searching/drawing by key.
    this._sizeOnly = data._sizeOnly ?? false;
    if (this._sizeOnly) {
      this._libSize = data._libSize ?? data.librarySize
        ?? (data.library ? data.library.length : DEFAULT_LIBRARY_SIZE);
    } else if (data.library && Array.isArray(data.library)) {
      this.library = [...data.library];
    } else {
      const sz = data.librarySize ?? DEFAULT_LIBRARY_SIZE;
      this.library = Array(sz).fill('unknown');
    }
  }

  get librarySize() { return this._sizeOnly ? this._libSize : this.library.length; }
  /** Backward-compat setter */
  set librarySize(n) {
    if (this._sizeOnly) { this._libSize = n; return; }
    if (n === this.library.length) return;
    if (n < this.library.length) {
      this.library = this.library.slice(0, n);
    } else {
      const extra = Array(n - this.library.length).fill('unknown');
      this.library = [...this.library, ...extra];
    }
  }

  clone() {
    // Bypass constructor — directly assign fields.
    // Library uses copy-on-write: share the reference here; draw()/searchLibrary()
    // copy before mutating, so siblings in the same DFS turn share one array.
    const p = Object.create(Player.prototype);
    p.name      = this.name;
    p.life      = this.life;
    p.poison    = this.poison;
    p.graveyard = this.graveyard.length ? [...this.graveyard] : [];
    p.exile     = this.exile.length     ? [...this.exile]     : [];
    p._sizeOnly = this._sizeOnly;
    if (this._sizeOnly) {
      p._libSize = this._libSize;  // copy an integer — zero array allocation
    } else {
      p.library = this.library;    // shared reference — copied only on mutation
    }
    return p;
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
   * Attempt to draw N cards. Removes from top of library array (or decrements size).
   * librarySize is clamped to 0 — loss fires when getLosses() checks after draw.
   */
  draw(n = 1) {
    const p = this.clone();
    if (p._sizeOnly) {
      p._libSize = Math.max(0, p._libSize - n);
    } else {
      p.library = p.library.slice(n);  // copy-on-write: create new array, drop first n
    }
    return p;
  }

  /**
   * Draw and return the top card key (or null if empty).
   * Removes it from the library.
   */
  drawCard() {
    if (this.librarySize === 0) return { player: this, cardKey: null };
    const p = this.clone();
    let cardKey;
    if (p._sizeOnly) {
      p._libSize = Math.max(0, p._libSize - 1);
      cardKey = 'unknown';
    } else {
      cardKey = p.library[0];       // peek
      p.library = p.library.slice(1); // copy-on-write
    }
    return { player: p, cardKey };
  }

  /**
   * Search library for a card matching predicate fn(cardKey) => bool.
   * Returns { player, cardKey } — player has the card removed from library.
   * Returns { player: this, cardKey: null } if not found.
   */
  searchLibrary(fn) {
    if (this._sizeOnly) return { player: this, cardKey: null }; // opponents never searched
    const idx = this.library.findIndex(fn);
    if (idx === -1) return { player: this, cardKey: null };
    const p = this.clone();
    const cardKey = p.library[idx];
    p.library = [...p.library.slice(0, idx), ...p.library.slice(idx + 1)]; // copy-on-write
    return { player: p, cardKey };
  }

  /** Move the top N cards of the graveyard back into the library (shuffle). */
  shuffleGraveyardIntoLibrary() {
    const p = this.clone();
    const gyLen = p.graveyard.length;
    if (p._sizeOnly) {
      p._libSize += gyLen;
    } else {
      // Graveyard stores display names; library stores card keys.
      // Resolve each name back to its key via NAME_TO_KEY so Elixir-recovered
      // cards are playable/tutorable by the solver.  Names that can't be
      // resolved (unknown cards, any token names not filtered by Fix 5) fall
      // back to 'unknown' so they still count toward library size.
      // Lazy-require to avoid a circular dependency at module load time.
      const gyKeys = p.graveyard.map(name => NAME_TO_KEY[name] ?? 'unknown');
      p.library = [...p.library, ...gyKeys];
    }
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
  clone() {
    const p = Object.create(ManaPool.prototype);
    p.W = this.W; p.U = this.U; p.B = this.B;
    p.R = this.R; p.G = this.G; p.C = this.C;
    return p;
  }

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

  /** Read-only affordability check — no clone, no mutation. */
  canPay(costStr) {
    const parsed = parseCost(costStr);
    // Check colored requirements first
    for (const [color, amt] of Object.entries(parsed.colored)) {
      if (this[color] < amt) return false;
    }
    // Check generic: sum all remaining mana after colored is reserved
    let generic = parsed.generic;
    if (generic > 0) {
      const remaining =
        (this.G - (parsed.colored.G ?? 0)) +
        (this.W - (parsed.colored.W ?? 0)) +
        (this.U - (parsed.colored.U ?? 0)) +
        (this.B - (parsed.colored.B ?? 0)) +
        (this.R - (parsed.colored.R ?? 0)) +
        (this.C - (parsed.colored.C ?? 0));
      if (remaining < generic) return false;
    }
    return true;
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

var _parseCostCache = new Map();
function parseCost(costStr) {
  if (!costStr || costStr === '0') return { generic: 0, colored: {} };
  const cached = _parseCostCache.get(costStr);
  if (cached) return cached;
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
  const result = { generic, colored };
  _parseCostCache.set(costStr, result);
  return result;
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
    this.isToken       = data.isToken     ?? false;
  }

  is(type) { return this.types.includes(type.toLowerCase()); }

  clone() {
    // Bypass constructor for speed — directly assign fields without re-parsing.
    // types/subtypes: shared via copy-on-write. Ashaya ETB and similar effects
    // that push onto types/subtypes must call _ensureOwnTypes() first.
    const p = Object.create(Permanent.prototype);
    p.id            = this.id;
    p.name          = this.name;
    p.types         = this.types;        // shared (COW)
    p.subtypes      = this.subtypes;     // shared (COW)
    p._cow          = true;              // flag: arrays are shared, copy before mutate
    p.tapped        = this.tapped;
    p.summoningSick = this.summoningSick;
    p.cardKey       = this.cardKey;
    p.isForest      = this.isForest;
    p.abilitiesUsed = this.abilitiesUsed;
    p.counters      = this.counters;
    p.power         = this.power;
    p.toughness     = this.toughness;
    if (this.isToken) p.isToken = this.isToken;
    if (this.imprintedColor  !== undefined) p.imprintedColor  = this.imprintedColor;
    if (this.enchantedLandId !== undefined) p.enchantedLandId = this.enchantedLandId;
    if (this.elvishGuidance)                p.elvishGuidance  = this.elvishGuidance;
    if (this.cauldronAbilityKey !== undefined) p.cauldronAbilityKey = this.cauldronAbilityKey;
    if (this.copyKey  !== undefined)        p.copyKey   = this.copyKey;
    if (this.copyName !== undefined)        p.copyName  = this.copyName;
    if (this.levelCounters)                 p.levelCounters = this.levelCounters;
    if (this.namedCard !== undefined)       p.namedCard = this.namedCard;
    if (this.luckCounter)                   p.luckCounter = this.luckCounter;
    return p;
  }

  /** Copy types/subtypes arrays if they're shared (COW). Call before push/mutation. */
  _ensureOwnTypes() {
    if (this._cow) {
      this.types    = [...this.types];
      this.subtypes = [...this.subtypes];
      this._cow     = false;
    }
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
    // endingTurn: set true when the player has committed to ending YOUR turn and
    // is in the cleanup step. While true, only the discard-to-hand-size actions
    // are offered, so the cleanup discard is sequenced AFTER all plays (it shows
    // at the end of the turn in the log), then the turn advances. Cleared by
    // startNewTurn(). Never set on opponent turns.
    this.endingTurn    = data.endingTurn  ?? false;
    this.landDrops     = data.landDrops   ?? 1;
    // landsPlayedThisTurn: incremented each time a land is played from hand.
    // Reset to 0 at the start of each turn. Used by Nissa, Resurgent Animist
    // to detect the second land entering each turn (and other future triggers).
    this.landsPlayedThisTurn = data.landsPlayedThisTurn ?? 0;
    this.hand          = data.hand        ? [...data.hand].sort() : []; // [E6] kept sorted
    this.battlefield   = data.battlefield
      ? data.battlefield.map(p => p instanceof Permanent ? p : new Permanent(p))
      : [];

    // Apply earthbent land overrides (Badgermole Cub permanent animation).
    // When Cradle/Nykthos was earthbent in a prior Goldfish turn, skipETB:true
    // means Badgermole's onEnter never fired. Mutate types here so combo
    // detectors (p.types.includes('creature')) see the correct state.
    const earthbentNames = new Set(data.earthbentLandNames ?? []);
    if (earthbentNames.size > 0) {
      for (const perm of this.battlefield) {
        if (earthbentNames.has(perm.name)) {
          if (!Array.isArray(perm.types) || perm.types === perm.constructor?.prototype?.types) {
            perm.types = [...(perm.types ?? [])];
          }
          if (!perm.types.includes('creature')) perm.types = [...perm.types, 'creature'];
          perm.summoningSick = false; // earthbend grants haste
        }
      }
    }
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
    // opponentTurnsThisRound: how many opponent turns have been taken this round
    // (0–3 in Commander with 3 opponents). Seedborn Muse / Yeva flash windows
    // are available once per opponent turn, so at most 3 windows per round.
    this.opponentTurnsThisRound = data.opponentTurnsThisRound ?? 0;
    // topDecked: card key placed on top of library by a tutor.
    // When set, startNewTurn draws exactly that card into hand, then clears this flag.
    // When null, no draw step occurs — keeping the solver deterministic.
    this.topDecked      = data.topDecked ?? null;
    // drawForTurn: when true, startNewTurn draws the actual top card of the library
    // into hand (used by mulligan_analyze Monte Carlo trials).
    // Propagates through clones so every turn in a trial draws naturally.
    this.drawForTurn    = data.drawForTurn ?? false;
    // _hasSTAX: true when a STAX permanent is on the battlefield.
    // Enables fast-path in effectiveCost that skips Thorn/Trinisphere checks.
    this._hasSTAX       = data._hasSTAX ?? false;
    // opponentStax: Set of stax card NAMES that opponents control.
    // These are injected at solve-time and enforce restrictions on YOUR actions
    // just as if they were on your battlefield — but you cannot remove them
    // (no interaction targeting opponent permanents in single-player model).
    // Supported: 'Null Rod', 'Thorn of Amethyst', 'Trinisphere', 'Root Maze',
    //            'Orb of Dreams', 'Vexing Bauble', 'Titania\'s Song'
    this.opponentStax   = data.opponentStax instanceof Set
      ? data.opponentStax
      : new Set(Array.isArray(data.opponentStax) ? data.opponentStax : []);
    // Bug fix: when constructed directly with cost-affecting opponentStax (the
    // path runSolver uses — `new SolverGameState({ opponentStax: ... })`), we
    // must seed _hasSTAX so effectiveCost takes the slow path. Otherwise Thorn,
    // Trinisphere, Chalice, Vexing Bauble and Disruptor Flute would silently
    // be ignored on the very first state of every solve. Mirrors the logic in
    // withOpponentStax() and the recompute in remove(). Skipped when the caller
    // supplied an explicit _hasSTAX (preserves clone() semantics).
    if (data._hasSTAX === undefined && this.opponentStax.size > 0) {
      for (const entry of this.opponentStax) {
        if (COST_AFFECTING_STAX_NAMES.has(entry.split('@')[0].trim())) { this._hasSTAX = true; break; }
      }
    }
    // threats: opponent interaction-capacity profile (O-8). Read-only
    // configuration set once on the initial state and shared by every clone —
    // it describes the table's ability to interact with our line, not a piece
    // of mutable game state, so it intentionally does NOT participate in
    // fingerprint() (mirrors opponentStax, which is the same kind of static
    // pre-game configuration). See AdversarialSolver.js for how it's used:
    // the core Solver never reads it, so a default solve is byte-identical
    // whether or not a threat profile is attached.
    //   counterMana    {number}  total mana opponents can dedicate to countering
    //                             our combo pieces across the whole game (budget,
    //                             not per-turn — spent down as AdversarialSolver
    //                             evaluates exposure windows)
    //   removalMana    {number}  total mana opponents can dedicate to removing
    //                             an assembled combo piece once it resolves
    //   counterDensity {number}  0..1, rough fraction of relevant draws/turns
    //                             where interaction is actually live (accounts
    //                             for opponents being tapped out, holding the
    //                             wrong card, etc.) — default 1 (worst case)
    //   watchedKeys    {string[]|null} restrict analysis to these card keys
    //                             (defaults to null = every manifest cardKey)
    this.threats = data.threats ?? null;
    // flashThisTurn: true when Emergence Zone has been sacrificed this turn
    // (all spells can be cast as though they had flash).
    this.flashThisTurn  = data.flashThisTurn ?? false;
    // pactOwed: true when Summoner's Pact was cast this turn (or last turn if
    // we haven't reached the next upkeep yet). At the beginning of the next
    // upkeep, {2}{G}{G} must be paid or the game is lost.
    this.pactOwed       = data.pactOwed ?? false;

    // ── Players (own their zones) ────────────────────────────────────────────
    if (data.players && Array.isArray(data.players)) {
      this.players = data.players.map((p, i) => {
        if (p instanceof Player) return p;
        const isOpponent = i > 0;
        return new Player({
          name:        p.name        ?? (i === 0 ? 'You' : `Opponent ${i}`),
          life:        p.life        ?? 40,
          library:     isOpponent ? null : (p.library ?? null),
          librarySize: p.librarySize ?? DEFAULT_LIBRARY_SIZE,
          _sizeOnly:   isOpponent,
          poison:      p.poison      ?? 0,
          graveyard:   p.graveyard   ?? [],
          exile:       p.exile       ?? [],
        });
      });
    } else {
      // Legacy: build player 0 with the default decklist library
      this.players = [
        new Player({
          name:      'You',
          life:      data.life        ?? 40,
          library:   data.library     ?? buildDefaultLibrary({
            commandZone: this.commandZone,
            hand:        this.hand,
            graveyard:   (() => {
              return (data.graveyard ?? []).map(name => NAME_TO_KEY[name]).filter(Boolean);
            })(),
          }),
          poison:    data.poison      ?? 0,
          graveyard: data.graveyard   ?? [],
          exile:     data.exile       ?? [],
        }),
        new Player({ name: 'Opponent 1', _sizeOnly: true }),
        new Player({ name: 'Opponent 2', _sizeOnly: true }),
        new Player({ name: 'Opponent 3', _sizeOnly: true }),
      ];
    }
    while (this.players.length < 4) {
      this.players.push(new Player({ name: `Opponent ${this.players.length}`, _sizeOnly: true }));
    }

    // ── Fingerprint cache ─────────────────────────────────────────────────
    // Lazily computed; set to null whenever state changes (see invalidateFp).
    // Hand is stored sorted so fingerprint can skip sort().
    this._fp = null;
  }

  /** Invalidate fingerprint cache.  Call after any in-place mutation. */
  invalidateFp() { this._fp = null; }

  // ── Convenience zone accessors for active player (players[0]) ────────────

  get life()        { return this.players[0].life; }
  set life(v)       { this._ensurePlayers(); this.players[0] = this.players[0].clone(); this.players[0].life = v; }

  get librarySize() { return this.players[0].librarySize; }
  set librarySize(v){ this._ensurePlayers(); this.players[0] = this.players[0].clone(); this.players[0].librarySize = v; }

  get poison()      { return this.players[0].poison; }
  set poison(v)     { this._ensurePlayers(); this.players[0] = this.players[0].clone(); this.players[0].poison = v; }

  /** Your graveyard (top = index 0). */
  get graveyard()   { return this.players[0].graveyard; }
  set graveyard(v)  { this._ensurePlayers(); this.players[0] = this.players[0].clone(); this.players[0].graveyard = v; }

  /** Your exile pile. */
  get exile()       { return this.players[0].exile; }
  set exile(v)      { this._ensurePlayers(); this.players[0] = this.players[0].clone(); this.players[0].exile = v; }

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

  /** O(1) permanent-name check via lazy-built Set cache. */
  /**
   * Return a new state with the given opponent stax card names applied.
   * Usage: state.withOpponentStax(['Null Rod', 'Trinisphere'])
   * Parameterized: 'Chalice of the Void@1' (at MV=1), 'Disruptor Flute@Quirion Ranger'
   * These names are used by hasStax() to enforce restrictions without
   * the cards appearing on your battlefield.
   */
  withOpponentStax(names) {
    const s = this.clone();
    s.opponentStax = new Set(names);
    // If any of the stax cards affect cost, flag _hasSTAX
    if (names.some(n => COST_AFFECTING_STAX_NAMES.has(n.split('@')[0].trim()))) s._hasSTAX = true;
    return s;
  }

  /**
   * Remove a named entry from opponentStax and recompute _hasSTAX.
   * cardName should match the prefix before any '@' separator.
   * Returns a new state with the entry removed.
   */
  removeFromOpponentStax(cardName) {
    const s = this.clone();
    s.opponentStax = new Set([...this.opponentStax].filter(e => e.split('@')[0].trim() !== cardName));
    // Recompute _hasSTAX: true if any battlefield stax OR remaining opponentStax cost-stax
    s._hasSTAX = s.battlefield.some(p => ALL_STAX_NAMES.has(p.name)) ||
                 [...s.opponentStax].some(e => COST_AFFECTING_STAX_NAMES.has(e.split('@')[0].trim()));
    return s;
  }

  /**
   * Return a new state with an opponent threat/interaction profile attached
   * (O-8). Purely descriptive — the core Solver never reads `state.threats`,
   * so attaching one does not change search behaviour, pruning, or
   * fingerprint() at all. AdversarialSolver.js is the sole consumer: it walks
   * a completed line and uses this profile to estimate how exposed each
   * combo-critical piece was to counterspells/removal.
   *
   * Usage: state.withThreats({ counterMana: 2, removalMana: 3, counterDensity: 0.5 })
   *
   * Unspecified fields default to the worst case for the player (maximum
   * opponent capacity), matching the project's general bias toward not
   * silently under-claiming risk.
   */
  withThreats(profile) {
    const s = this.clone();
    s.threats = {
      counterMana:    profile.counterMana    ?? 0,
      removalMana:    profile.removalMana    ?? 0,
      counterDensity: profile.counterDensity ?? 1,
      watchedKeys:    profile.watchedKeys    ?? null,
    };
    return s;
  }

  /**
   * Remove the threat profile (return to the default "no interaction" model).
   */
  withoutThreats() {
    const s = this.clone();
    s.threats = null;
    return s;
  }

  /**
   * Get a parameter from an opponent stax entry, e.g.
   * opponentStaxParam('Chalice of the Void') → '1' (from 'Chalice of the Void@1')
   * Returns null if not present or not parameterized.
   */
  opponentStaxParam(cardName) {
    for (const entry of this.opponentStax) {
      const [name, param] = entry.split('@');
      if (name.trim() === cardName && param !== undefined) return param.trim();
    }
    return null;
  }

  hasPermanent(name) {
    if (!this._permNames) {
      this._permNames = new Set(this.battlefield.map(p => p.name));
    }
    return this._permNames.has(name);
  }

  /**
   * Returns true if a stax permanent is active — either because YOU control it
   * (on your battlefield) OR because an opponent controls it (opponentStax set).
   * Use this in all stax-enforcement checks so both sources are covered.
   * Handles parameterized entries like 'Chalice of the Void@1'.
   */
  hasStax(name) {
    if (this.hasPermanent(name)) return true;
    for (const entry of this.opponentStax) {
      if (entry === name || entry.startsWith(name + '@')) return true;
    }
    return false;
  }

  getPermanent(name)  { return this.battlefield.find(p => p.name === name); }
  getPermanentById(id){ return this.battlefield.find(p => p.id === id); }

  forestsInHand() {
    return this.hand.filter(c => {
      const def = _cards()[c];
      return def && def.subtypes && def.subtypes.includes('Forest');
    });
  }

  // ── Clone ─────────────────────────────────────────────────────────────────

  clone() {
    // COW (copy-on-write) clone: battlefield and opponent players are shared.
    // Player 0 (active player) is cloned eagerly since nearly every action
    // mutates it. Opponents are shared and cloned lazily via _ensurePlayers().
    //
    // [perf] `hand` is also shared by reference. This is safe ONLY because every
    // hand mutation in the codebase REPLACES the array (s.hand = [...slice...] /
    // .filter(...)) — there is not a single in-place .push/.splice/[i]= on a
    // hand anywhere (verified). So a child never mutates the array the parent
    // points at; it swaps in a fresh one. The old eager `[...this.hand]` copy on
    // every clone was therefore pure waste — the array got copied again at the
    // next mutation regardless. IMPORTANT: if you ever mutate a hand in place,
    // you must restore the eager copy here or COW-guard the hand like
    // _ensureBF() does for the battlefield.
    const s = Object.create(GameState.prototype);
    s.turn          = this.turn;
    s.phase         = this.phase;
    s.endingTurn    = this.endingTurn;
    s.landDrops     = this.landDrops;
    s.landsPlayedThisTurn = this.landsPlayedThisTurn;
    s.hand          = this.hand;            // shared (COW) — see note above
    s.battlefield   = this.battlefield;     // shared (COW)
    s.mana          = this.mana.clone();
    s.storm         = this.storm;
    s.comboAchieved = this.comboAchieved;
    s.comboName     = this.comboName;
    s._nextId       = this._nextId;
    s.history       = this.history;         // shared (COW — log() copies on write)
    // Player 0 cloned eagerly; opponents shared (COW)
    s.players       = [this.players[0].clone(), this.players[1], this.players[2], this.players[3]];
    s.commandZone   = this.commandZone;     // shared (rarely mutated)
    s.commanderTax  = this.commanderTax;
    s.isOpponentTurn = this.isOpponentTurn;
    s.opponentTurnsThisRound = this.opponentTurnsThisRound;
    s.topDecked     = this.topDecked;
    s.drawForTurn   = this.drawForTurn;
    s._hasSTAX      = this._hasSTAX;
    s.opponentStax  = this.opponentStax; // Set is immutable — safe to share
    s.threats       = this.threats;      // static config — safe to share (O-8)
    s.flashThisTurn = this.flashThisTurn;
    s.pactOwed      = this.pactOwed;
    s._fp           = null;
    s._plOwned      = true;   // players array is owned (new array), but opponents inside are shared
    return s;
  }

  /** Deep-copy battlefield (all permanents cloned). Call before any BF mutation. */
  _ensureBF() {
    if (!this._bfOwned) {
      this.battlefield = this.battlefield.map(p => p.clone());
      this._bfOwned = true;
      this._permNames = null;  // invalidate hasPermanent cache
    }
  }

  /** Deep-copy opponent players (1-3). Call before mutating opponents. */
  _ensurePlayers() {
    // Player 0 is always owned (cloned eagerly in clone()).
    // Only clone opponents when they're about to be mutated.
    // Check: if players[1] is the same reference as the parent's, clone them.
    // We use a simple flag: if _plOwned is 'full', all are owned.
    if (this._plOwned !== 'full') {
      this.players = [this.players[0], this.players[1].clone(), this.players[2].clone(), this.players[3].clone()];
      this._plOwned = 'full';
    }
  }

  // ── Logging ───────────────────────────────────────────────────────────────

  log(msg) {
    // Lightweight clone: only copy the history array (the only thing modified).
    // Battlefield, players, mana, hand are shared — safe because log() is
    // always the LAST mutation on a state (no further writes to shared data).
    const s = Object.create(GameState.prototype);
    s.turn          = this.turn;
    s.phase         = this.phase;
    s.endingTurn    = this.endingTurn;
    s.landDrops     = this.landDrops;
    s.landsPlayedThisTurn = this.landsPlayedThisTurn;
    s.hand          = this.hand;            // shared (no mutation after log)
    s.battlefield   = this.battlefield;     // shared
    // [perf] Propagate COW ownership flags so the next _ensureBF()/_ensurePlayers()
    // call on this state does NOT re-clone unnecessarily.  Without these, both
    // flags are undefined (falsy) in the log result, making every subsequent
    // _ensureBF() trigger a full deep-clone even though the battlefield was
    // already owned immediately before log() was called.  Measured impact:
    // ~11x slower _ensureBF() on a 10-perm battlefield when flags are missing.
    s._bfOwned      = this._bfOwned;
    s._plOwned      = this._plOwned;
    // [perf] Propagate the hasPermanent() name-cache.  log() shares the same
    // battlefield array, so the cache is still valid — no rebuild needed.
    // Without this, every hasPermanent() call after any action (which ends in
    // log()) rebuilds the Set from scratch (~4x slower per call).
    s._permNames    = this._permNames;
    s.mana          = this.mana;            // shared
    s.storm         = this.storm;
    s.comboAchieved = this.comboAchieved;
    s.comboName     = this.comboName;
    s._nextId       = this._nextId;
    s.history       = [...this.history, { turn: this.turn, msg }];
    s.players       = this.players;         // shared
    s.commandZone   = this.commandZone;     // shared
    s.commanderTax  = this.commanderTax;
    s.isOpponentTurn = this.isOpponentTurn;
    s.opponentTurnsThisRound = this.opponentTurnsThisRound;
    s.topDecked     = this.topDecked;
    s.drawForTurn   = this.drawForTurn;
    s._hasSTAX      = this._hasSTAX;
    s.opponentStax  = this.opponentStax; // Set is immutable — safe to share
    s.threats       = this.threats;      // static config — safe to share (O-8)
    s.flashThisTurn = this.flashThisTurn;
    s.pactOwed      = this.pactOwed;
    s._fp           = null;
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
    s._ensurePlayers();
    const p = s.players[pi].clone();
    if (changes.life        !== undefined) p.life        += changes.life;
    if (changes.librarySize !== undefined) p.librarySize += changes.librarySize;
    if (changes.poison      !== undefined) p.poison      += changes.poison;
    s.players[pi] = p;
    return s;
  }

  dealDamage(pi, { damage = 0, poison = 0, infect = false } = {}) {
    const s = this.clone();
    s._ensurePlayers();
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
  /**
   * A player draws N cards. For player 0, moves card keys from library to hand.
   * For opponents (pi > 0), just removes from their library (hand not tracked).
   */
  playerDraws(pi, n = 1) {
    if (pi === 0) {
      return this.playerDrawCards(n);
    }
    // Opponent: remove from library only (hand not tracked)
    const s = this.clone();
    s._ensurePlayers();
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
    s._ensurePlayers();
    for (let i = 0; i < n; i++) {
      const { player, cardKey } = s.players[0].drawCard();
      s.players[0] = player;
      if (cardKey && cardKey !== 'unknown') {
        // [E6] Insert in sorted position to maintain hand invariant (same as addToHand)
        const h = s.hand;
        let lo = 0, hi = h.length;
        while (lo < hi) { const mid = (lo + hi) >>> 1; if (h[mid] <= cardKey) lo = mid + 1; else hi = mid; }
        s.hand = [...h.slice(0, lo), cardKey, ...h.slice(lo)];
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
    const { player, cardKey } = this.players[0].searchLibrary(fn);
    if (!cardKey) return { state: this, cardKey: null };
    const s = this.clone();
    s._ensurePlayers();
    s.players[0] = player;
    return { state: s, cardKey };
  }

  /**
   * Put a card name into a player's graveyard (top of pile).
   */
  addToGraveyard(pi, cardName) {
    const s = this.clone();
    s._ensurePlayers();
    s.players[pi] = s.players[pi].putInGraveyard(cardName);
    return s;
  }

  /**
   * Put a card name into a player's exile.
   */
  addToExile(pi, cardName) {
    const s = this.clone();
    s._ensurePlayers();
    s.players[pi] = s.players[pi].putInExile(cardName);
    return s;
  }

  /**
   * Exile a specific card from a player's graveyard by name.
   */
  exileFromGraveyard(pi, cardName) {
    const s = this.clone();
    s._ensurePlayers();
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
    s._ensurePlayers();
    s.players[pi] = s.players[pi].shuffleGraveyardIntoLibrary();
    return s;
  }

  /**
   * Discard a card from your hand into your graveyard.
   * Removes the card from hand and adds it to players[0].graveyard.
   * Returns new GameState or null if card not in hand.
   * @param {string} cardKey
   * @param {string} [reason] - log message suffix; defaults to 'cleanup, end of turn N'
   */
  discardFromHand(cardKey, reason) {
    const cards = _cards();
    const def = cards[cardKey];
    const cardName = def ? def.name : cardKey;
    let s = this.removeFromHand(cardKey);
    if (!s) return null;
    s = s.addToGraveyard(0, cardName);
    // Only log for end-of-turn cleanup — when called as a spell/ability cost the
    // caller's own log line already names the discarded card.
    if (!reason) {
      s = s.log(`Discard ${cardName} (cleanup, end of turn ${this.turn})`);
    }
    return s;
  }

  // ── Permanent mutations ───────────────────────────────────────────────────

  tapPermanent(id) {
    const s = this.clone();
    s._ensureBF();
    const p = s.getPermanentById(id);
    if (!p || p.tapped) return null;
    p.tapped = true;
    return s;
  }

  untapPermanent(id) {
    const s = this.clone();
    s._ensureBF();
    const p = s.getPermanentById(id);
    if (!p) return null;
    p.tapped = false;
    // When a permanent is untapped mid-turn (e.g. by Quirion Ranger bouncing itself
    // to untap Hope Tender), once-per-TAP ability flags should reset so the creature
    // can activate its {T} ability again (untap_one_land, draw_pay_life — these tap
    // the creature as a cost). But once-per-TURN abilities that do NOT tap the
    // creature (Quirion/Scryb Ranger bounce_forest, Wirewood Symbiote bounce_elf)
    // are limited "once during each of your turns" regardless of tap state, so
    // untapping must NOT let them fire again — clearing them was a false-loop bug.
    // exert_two_lands likewise persists until the creature's NEXT untap step.
    if (p.abilitiesUsed && Object.keys(p.abilitiesUsed).length > 0) {
      const preserved = {};
      for (const k of ['exert_two_lands', 'bounce_forest', 'bounce_elf']) {
        if (p.abilitiesUsed[k]) preserved[k] = true;
      }
      p.abilitiesUsed = preserved;
    }
    return s;
  }

  enterBattlefield(cardKey, extra = {}, { skipETB = false } = {}) {
    const cards = _cards();
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
    s._ensureBF();  // deep-copy existing perms before ETB triggers mutate them
    s.battlefield = [...s.battlefield, perm];
    s._permNames = null;  // invalidate hasPermanent cache

    // Option B: update _hasSTAX flag when a STAX card enters
    if (ALL_STAX_NAMES.has(def.name)) s._hasSTAX = true;

    // ── Static layer: apply existing statics to the new permanent ────────────

    // Orb of Dreams / Root Maze: all permanents enter tapped.
    // Applies whether YOU or an OPPONENT controls the piece.
    if (s.hasStax('Orb of Dreams')) {
      perm.tapped = true;
      perm.summoningSick = true;
    } else if (s.hasStax('Root Maze')) {
      if (perm.is('land') || perm.is('artifact')) perm.tapped = true;
    }

    // Castle Garenbrig: enters tapped unless you control a Forest.
    if (cardKey === 'castle_garenbrig') {
      const hasForest = s.battlefield.some(p => p.isForest && p.cardKey !== 'castle_garenbrig');
      if (!hasForest) perm.tapped = true;
    }

    // Ashaya: new creatures become Forest lands
    if (s.hasPermanent('Ashaya, Soul of the Wild') && perm.is('creature')) {
      if (perm._cow) perm._ensureOwnTypes();
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
      if (perm._cow) perm._ensureOwnTypes();
      if (!perm.subtypes.includes('Forest')) perm.subtypes.push('Forest');
      perm.isForest = true;
    }

    // Leyline of Abundance: tracked as a flag; effects applied in tapForMana wrappers

    // ── ETB triggers: card-specific effects on entry ──────────────────────────

    // Ashaya ETB: all existing non-token creatures become Forest lands.
    // Also set Ashaya's own power/toughness = current land count (she's a land herself).
    if (cardKey === 'ashaya') {
      for (const bf of s.battlefield) {
        if (bf.is('creature')) {
          bf._ensureOwnTypes();
          bf.isForest = true;
          if (!bf.types.includes('land')) bf.types.push('land');
          if (!bf.subtypes.includes('Forest')) bf.subtypes.push('Forest');
        }
      }
      // Ashaya's P/T = number of lands she controls (herself included, since the loop above
      // just added her to the land pool)
      const ashayaPerm = s.battlefield.find(p => p.cardKey === 'ashaya');
      if (ashayaPerm) {
        const landCount = s.lands().length;
        ashayaPerm.power     = landCount;
        ashayaPerm.toughness = landCount;
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
          bf._ensureOwnTypes();
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

    // Woodcaller Automaton ETB (cast trigger): untap target land you control.
    // Deterministic choice: prefer Gaea's Cradle or Nykthos (highest combo value),
    // then any other tapped land.
    if (!skipETB && cardKey === 'woodcaller_automaton') {
      const PRIORITY_LANDS = ['Gaea\'s Cradle', 'Itlimoc, Cradle of the Sun',
                              'Nykthos, Shrine to Nyx', 'Wirewood Lodge'];
      const tappedLands = s.lands().filter(l => l.tapped);
      const target =
        tappedLands.find(l => PRIORITY_LANDS.includes(l.name)) ??
        tappedLands[0];
      if (target) s = s.untapPermanent(target.id);
    }

    // Surrak and Goreclaw ETB: existing creatures lose summoning sickness (haste)
    if (cardKey === 'surrak_goreclaw') {
      for (const bf of s.battlefield) {
        if (bf.is('creature') && bf.id !== perm.id) bf.summoningSick = false;
      }
    }

    // Ulvenwald Oddity ETB: has haste — remove its own summoning sickness
    if (cardKey === 'ulvenwald_oddity') {
      perm.summoningSick = false;
    }

    // Chrome Mox ETB: Imprint — exile a nonartifact, nonland card from hand.
    // Pick the card with the LOWEST TUTOR_PRIORITY_SCORE (least useful to the combo).
    // The exiled card's first colored pip determines the mana Chrome Mox produces.
    // If no eligible card exists, Chrome Mox enters with no imprint (can't tap for mana).
    if (!skipETB && cardKey === 'chrome_mox' && s.hand.length > 0) {
      const parseCostLocal = parseCost; // already in scope
      // Collect candidates: nonartifact, nonland cards currently in hand
      // (chrome_mox itself was already removed from hand before enterBattlefield)
      const candidates = s.hand.filter(ck => {
        const d = cards[ck];
        if (!d) return false;
        if (d.types.includes('artifact')) return false;
        if (d.types.includes('land'))     return false;
        return true;
      });
      if (candidates.length > 0) {
        // Sort ascending by priority score — exile the least-useful card
        const sorted = [...candidates].sort(
          (a, b) => (TUTOR_PRIORITY_SCORE[a] ?? 0) - (TUTOR_PRIORITY_SCORE[b] ?? 0)
        );
        const sacrificeKey = sorted[0];
        const sacrificeDef = cards[sacrificeKey];
        // Determine imprint color: first colored pip in the card's cost
        const parsed = parseCostLocal(sacrificeDef.cost ?? '');
        const COLOR_ORDER = ['W', 'U', 'B', 'R', 'G', 'C'];
        const imprintedColor = COLOR_ORDER.find(c => (parsed.colored[c] ?? 0) > 0) ?? null;
        // Remove the card from hand and put it in exile
        s = s.removeFromHand(sacrificeKey);
        s._ensurePlayers();
        s.players[0] = s.players[0].clone();
        s.players[0].exile = [...s.players[0].exile, sacrificeDef.name];
        // Mark the imprinted color on the permanent so tapForMana can use it
        perm.imprintedColor = imprintedColor;
        s = s.log(`Chrome Mox imprints ${sacrificeDef.name} → taps for {${imprintedColor ?? 'none'}}`);
      }
      // If no candidates: perm.imprintedColor stays undefined (falsy) → can't tap for mana
    }
    // When a pre-existing Chrome Mox is placed via --battlefield (skipETB=true),
    // assume it is already imprinted with a green card — correct for a Yeva green
    // deck where the Mox was in play from a prior turn with a green imprint.
    if (skipETB && cardKey === 'chrome_mox') {
      perm.imprintedColor = 'G';
    }

    // Great Oak Guardian ETB: target player's creatures get +2/+2 until EOT and untap
    // (simplified: untap all your creatures; +2/+2 is not tracked in this engine)
    if (cardKey === 'great_oak_guardian') {
      for (const bf of s.battlefield) {
        if (bf.is('creature')) bf.tapped = false;
      }
    }

    // Eternal Witness ETB: return target card from graveyard to hand.
    // Prefers returning a card that completes a combo (missing combo piece).
    // Falls back to the top graveyard card if no combo piece is in graveyard.
    if (!skipETB && cardKey === 'eternal_witness' && s.players[0].graveyard.length > 0) {
      const gy = s.players[0].graveyard; // array of card names, index 0 = top

      // Build present set (hand + battlefield) to find missing combo pieces
      const present = new Set(s.hand);
      for (const p of s.battlefield) {
        const ck = NAME_TO_KEY[p.name];
        if (ck) present.add(ck);
      }

      // Find the highest-priority missing combo piece in the graveyard
      let bestIdx = -1;
      let bestMissing = Infinity;
      for (let i = 0; i < gy.length; i++) {
        const ck = NAME_TO_KEY[gy[i]];
        if (!ck) continue;
        // Score: how many pieces does this card help complete?
        for (const required of COMBO_REQUIRED_KEYS) {
          if (!required.includes(ck)) continue;
          const missing = required.filter(k => !present.has(k)).length;
          if (missing < bestMissing) { bestMissing = missing; bestIdx = i; }
        }
      }

      // Use the best combo piece if found, otherwise fall back to top of graveyard
      const targetIdx = bestIdx >= 0 ? bestIdx : 0;
      const cardName = gy[targetIdx];
      s._ensurePlayers();
      s.players[0] = s.players[0].clone();
      s.players[0].graveyard = [
        ...s.players[0].graveyard.slice(0, targetIdx),
        ...s.players[0].graveyard.slice(targetIdx + 1),
      ];
      const ck = NAME_TO_KEY[cardName] ?? Object.keys(cards).find(k => cards[k].name === cardName);
      if (ck) s = s.addToHand(ck);
    }

    // Generous Patron ETB: support 2 — put a +1/+1 counter on each of up to 2 other creatures.
    // Priority: Incubation Druid first (enables 3-mana mode), then any creature.
    // No opponent draw trigger modelled (no opponent creatures in solo solver).
    if (!skipETB && cardKey === 'generous_patron') {
      s._ensureBF();
      const targets = s.battlefield.filter(p =>
        p.is('creature') && p.id !== perm.id && !p.summoningSick
      );
      // Prefer Incubation Druid (adapt trigger), else biggest/first creatures
      targets.sort((a, b) => {
        if (a.cardKey === 'incubation_druid') return -1;
        if (b.cardKey === 'incubation_druid') return 1;
        return (b.power ?? 0) - (a.power ?? 0);
      });
      const toSupport = targets.slice(0, 2);
      for (const t of toSupport) {
        const live = s.getPermanentById(t.id);
        if (live) {
          live.counters = { ...live.counters, '+1/+1': (live.counters?.['+1/+1'] ?? 0) + 1 };
          // +1/+1 counter also raises power/toughness
          live.power = (live.power ?? 0) + 1;
          live.toughness = (live.toughness ?? 0) + 1;
        }
      }
    }

    // Elvish Visionary ETB: draw a card when it enters.
    if (!skipETB && cardKey === 'elvish_visionary') {
      s = s.playerDraws(0, 1);
    }

    // Llanowar Visionary ETB: draw a card when it enters.
    if (!skipETB && cardKey === 'llanowar_visionary') {
      s = s.playerDraws(0, 1);
    }

    // Voice of Many ETB: draw a card for each opponent who controls fewer creatures than you.
    // In 1v1 commander: draw 1 if you control more creatures than the opponent (always true
    // in a typical combo position with a board). Simplified: draw 1.
    if (!skipETB && cardKey === 'voice_of_many') {
      s = s.playerDraws(0, 1);
    }

    // Soul of the Harvest ETB: whenever another nontoken creature enters, draw a card.
    // The ETB itself doesn't draw (it's the new Soul entering, and Soul doesn't trigger its own).
    // The trigger fires when OTHER nontoken creatures enter while Soul is on battlefield.
    // This is handled in the cast_spell action (below) and here for when Soul itself enters —
    // no draw for Soul itself (as per oracle). Subsequent creatures are handled in actions.js.

    // Timeless Witness ETB: return target card from graveyard to hand.
    // Identical logic to Eternal Witness.
    if (!skipETB && cardKey === 'timeless_witness' && s.players[0].graveyard.length > 0) {
      // Skip ETB return for Eternalize tokens (isToken is set)
      const newPerm = s.battlefield[s.battlefield.length - 1];
      if (!newPerm?.isToken) {
        const gy = s.players[0].graveyard;
        const present = new Set(s.hand);
        for (const p of s.battlefield) {
          const ck = NAME_TO_KEY[p.name];
          if (ck) present.add(ck);
        }
        let bestIdx = -1, bestMissing = Infinity;
        for (let i = 0; i < gy.length; i++) {
          const ck = NAME_TO_KEY[gy[i]];
          if (!ck) continue;
          for (const required of COMBO_REQUIRED_KEYS) {
            if (!required.includes(ck)) continue;
            const missing = required.filter(k => !present.has(k)).length;
            if (missing < bestMissing) { bestMissing = missing; bestIdx = i; }
          }
        }
        const targetIdx = bestIdx >= 0 ? bestIdx : 0;
        const cardName = gy[targetIdx];
        s._ensurePlayers();
        s.players[0] = s.players[0].clone();
        s.players[0].graveyard = [
          ...s.players[0].graveyard.slice(0, targetIdx),
          ...s.players[0].graveyard.slice(targetIdx + 1),
        ];
        const ck = NAME_TO_KEY[cardName] ?? Object.keys(cards).find(k => cards[k].name === cardName);
        if (ck) s = s.addToHand(ck);
      }
    }

    // Havenwood Battleground enters tapped.
    if (cardKey === 'havenwood_battleground') {
      perm.tapped = true;
    }

    // Tranquil Thicket enters tapped.
    if (cardKey === 'tranquil_thicket') {
      perm.tapped = true;
    }

    // Selvala, Heart of the Wilds triggered ability: "Whenever another creature enters
    // the battlefield, that creature's controller may draw a card if its power is
    // greater than each other creature's power."
    // Simplified for single-player: if the entering creature has strictly greater
    // power than all OTHER creatures already on the battlefield, you draw 1 card.
    // (Selvala herself has power 2 and counts in the comparison.)
    // This fires for every creature ETB while Selvala is on the battlefield —
    // in infinite ETB loops this draws the entire library.
    if (!skipETB && cardKey !== 'selvala' && s.hasPermanent('Selvala, Heart of the Wilds')) {
      const enteredPower = perm.power ?? 0;
      const otherPowers = s.battlefield
        .filter(p => p.id !== perm.id)
        .map(p => p.power ?? 0);
      const maxOther = otherPowers.length > 0 ? Math.max(...otherPowers) : -1;
      if (enteredPower > maxOther) {
        s = s.playerDraws(0, 1);
        s = s.log(`Selvala trigger: ${perm.name} (power ${enteredPower}) is greatest → draw 1`);
      }
    }

    // Regal Force ETB: draw a card for each green creature you control
    if (!skipETB && cardKey === 'regal_force') {
      const greenCreatures = s.creatures().length; // simplified: all creatures
      s = s.playerDraws(0, greenCreatures);
    }

    // Fierce Empath ETB: search library for creature with MV ≥ 6, put in hand.
    // Targets: Woodland Bellower (MV 6), Kogla (MV 6), Regal Force (MV 7), etc.
    if (!skipETB && cardKey === 'fierce_empath') {
      const cardsModule = _cards();
      var { parseCost: pc } = _GSM;
      // Pick the highest-priority MV≥6 creature in library
      var { NAME_TO_KEY: N2K } = _ACM;
      let bestKey = null, bestScore = -1;
      const present = new Set(s.hand);
      for (const p of s.battlefield) { const k = N2K[p.name]; if (k) present.add(k); }
      for (const ck of s.players[0].library) {
        if (ck === 'unknown' || isStax(ck)) continue;
        const def = cardsModule[ck];
        if (!def?.types.includes('creature') || !def.cost) continue;
        const parsed = pc(def.cost);
        const mv = parsed.generic + Object.values(parsed.colored).reduce((a, b) => a + b, 0);
        if (mv < 6) continue;
        const score = TUTOR_PRIORITY_SCORE[ck] ?? 0;
        if (score > bestScore) { bestKey = ck; bestScore = score; }
      }
      if (bestKey) {
        const { state: ns, cardKey: ck } = s.searchLibraryFor(k => k === bestKey);
        if (ck) s = ns.addToHand(ck);
      }
    }

    // Treefolk Harbinger ETB: search library for a Treefolk or Forest-subtype card,
    // reveal it, put it on top of library.
    // Deterministic selection: prefer highest-TUTOR_PRIORITY_SCORE match to avoid
    // branching inside GameState.enterBattlefield (which must return a single state).
    // The cast path in actions.js calls cards.js onEnter which CAN branch; the
    // direct-enter path uses this deterministic fallback.
    if (!skipETB && cardKey === 'treefolk_harbinger') {
      const cardsModule = _cards();
      let bestKey = null, bestScore = -1;
      const seenLib = new Set();
      for (const ck of s.players[0].library) {
        if (seenLib.has(ck) || ck === 'unknown') continue;
        seenLib.add(ck);
        const def = cardsModule[ck];
        if (!def) continue;
        const isForestLand = def.subtypes?.includes('Forest');
        const isTreefolk = def.subtypes?.includes('Treefolk');
        if (!isForestLand && !isTreefolk) continue;
        const sc = TUTOR_PRIORITY_SCORE[ck] ?? 1;
        if (sc > bestScore) { bestKey = ck; bestScore = sc; }
      }
      if (bestKey) {
        const { state: ns, cardKey: found } = s.searchLibraryFor(k => k === bestKey);
        if (found) {
          s = ns.clone();
          s.topDecked = found;
          s = s.log(`Treefolk Harbinger ETB: put ${cardsModule[found]?.name ?? found} on top of library`);
        }
      }
    }

    // Elvish Harbinger ETB: search library for an Elf card, put on top.
    // Deterministic: pick the highest TUTOR_PRIORITY_SCORE Elf.
    // Unlike Fierce Empath (MV ≥ 6), Harbinger can find ANY Elf — including
    // Priest of Titania, Selvala, Quirion Ranger, etc.
    if (!skipETB && cardKey === 'elvish_harbinger') {
      const cardsModule = _cards();
      let bestKey = null, bestScore = -1;
      const seenLib = new Set();
      for (const ck of s.players[0].library) {
        if (seenLib.has(ck) || ck === 'unknown') continue;
        seenLib.add(ck);
        const def = cardsModule[ck];
        if (!def?.subtypes?.includes('Elf')) continue;
        const sc = TUTOR_PRIORITY_SCORE[ck] ?? 1;
        if (sc > bestScore) { bestKey = ck; bestScore = sc; }
      }
      if (bestKey) {
        const { state: ns, cardKey: found } = s.searchLibraryFor(k => k === bestKey);
        if (found) {
          s = ns.clone();
          s.topDecked = found;
          s = s.log(`Elvish Harbinger ETB: put ${cardsModule[found]?.name ?? found} on top of library`);
        }
      }
    }
    // Manglehorn ETB: destroy target artifact. Checks battlefield first, then opponentStax.
    if (!skipETB && cardKey === 'manglehorn') {
      const staxTargets = s.battlefield.filter(p =>
        p.is('artifact') && p.name !== 'Manglehorn' && ALL_STAX_NAMES.has(p.name)
      );
      if (staxTargets.length > 0) {
        const target = staxTargets[0];
        s = s.removeFromBattlefield(target.id, 'graveyard');
        if (s) s = s.log(`Manglehorn ETB: destroy ${target.name}`);
      } else {
        // Check opponentStax — remove the first matching entry
        const oppTarget = [...s.opponentStax].find(e => ALL_STAX_NAMES.has(e.split('@')[0].trim()));
        if (oppTarget) {
          const oppName = oppTarget.split('@')[0].trim();
          s = s.removeFromOpponentStax(oppName);
          s = s.log(`Manglehorn ETB: destroy opponent's ${oppName}`);
        }
      }
    }

    // Reclamation Sage ETB: destroy target artifact or enchantment.
    // Checks battlefield first, then opponentStax.
    if (!skipETB && cardKey === 'reclamation_sage') {
      const staxTarget = s.battlefield.find(p =>
        (p.is('artifact') || p.is('enchantment')) &&
        p.name !== 'Reclamation Sage' && ALL_STAX_NAMES.has(p.name)
      );
      if (staxTarget) {
        s = s.removeFromBattlefield(staxTarget.id, 'graveyard');
        if (s) s = s.log(`Reclamation Sage ETB: destroy ${staxTarget.name}`);
      } else {
        const oppTarget = [...s.opponentStax].find(e => ALL_STAX_NAMES.has(e.split('@')[0].trim()));
        if (oppTarget) {
          const oppName = oppTarget.split('@')[0].trim();
          s = s.removeFromOpponentStax(oppName);
          s = s.log(`Reclamation Sage ETB: destroy opponent's ${oppName}`);
        }
      }
    }

    // Chomping Changeling ETB: destroy up to one target artifact or enchantment.
    // Identical stax-removal logic as Reclamation Sage.
    if (!skipETB && cardKey === 'chomping_changeling') {
      const staxTarget = s.battlefield.find(p =>
        (p.is('artifact') || p.is('enchantment')) &&
        p.name !== 'Chomping Changeling' && ALL_STAX_NAMES.has(p.name)
      );
      if (staxTarget) {
        s = s.removeFromBattlefield(staxTarget.id, 'graveyard');
        if (s) s = s.log(`Chomping Changeling ETB: destroy ${staxTarget.name}`);
      } else {
        const oppTarget = [...s.opponentStax].find(e => ALL_STAX_NAMES.has(e.split('@')[0].trim()));
        if (oppTarget) {
          const oppName = oppTarget.split('@')[0].trim();
          s = s.removeFromOpponentStax(oppName);
          s = s.log(`Chomping Changeling ETB: destroy opponent's ${oppName}`);
        }
      }
    }
    // King of the Coldblood Curse ETB: target creature loses all abilities, becomes 4/4 Lizard.
    // Fires if a stax creature (Collector Ouphe) is on the battlefield OR in opponentStax.
    if (!skipETB && cardKey === 'king_coldblood') {
      const STAX_CREATURE_NAMES = new Set(['Collector Ouphe']);
      const staxTarget = s.battlefield.find(p =>
        p.is('creature') && p.name !== 'King of the Coldblood Curse' &&
        STAX_CREATURE_NAMES.has(p.name)
      );
      if (staxTarget) {
        s = s.removeFromBattlefield(staxTarget.id, null);
        if (s) {
          // Re-enter as blank 4/4 Lizard without stax properties
          s._ensureBF();
          const blankId = s._nextId++;
          const blank = new Permanent({
            id: blankId, name: staxTarget.name + ' (Lizard 4/4)', cardKey: 'blank_lizard',
            types: ['creature'], subtypes: ['Lizard'], tapped: staxTarget.tapped,
            summoningSick: staxTarget.summoningSick, power: 4, toughness: 4,
            counters: {}, abilitiesUsed: {},
          });
          s.battlefield = [...s.battlefield, blank];
          s = s.log(`King of the Coldblood Curse ETB: ${staxTarget.name} loses all abilities → 4/4 Lizard`);
        }
      } else {
        // Check opponentStax for Collector Ouphe (strips artifact-ability suppression)
        const oppOuphe = [...s.opponentStax].find(e => e.split('@')[0].trim() === 'Collector Ouphe');
        if (oppOuphe) {
          s = s.removeFromOpponentStax('Collector Ouphe');
          s = s.log(`King of the Coldblood Curse ETB: opponent's Collector Ouphe loses all abilities`);
        }
      }
    }

    // Scrapshooter ETB: Gift a card — if gift was promised, destroy target artifact or enchantment.
    // Modeled deterministically: promise the gift (and destroy stax) whenever a valid target exists.
    // Opponent drawing a card (the gift) is not modeled (no opponent hand state).
    if (!skipETB && cardKey === 'scrapshooter') {
      const staxTarget = s.battlefield.find(p =>
        (p.is('artifact') || p.is('enchantment')) &&
        p.name !== 'Scrapshooter' && ALL_STAX_NAMES.has(p.name)
      );
      if (staxTarget) {
        s = s.removeFromBattlefield(staxTarget.id, 'graveyard');
        if (s) s = s.log(`Scrapshooter ETB (gift promised): destroy ${staxTarget.name}`);
      } else {
        const oppTarget = [...s.opponentStax].find(e => ALL_STAX_NAMES.has(e.split('@')[0].trim()));
        if (oppTarget) {
          const oppName = oppTarget.split('@')[0].trim();
          s = s.removeFromOpponentStax(oppName);
          s = s.log(`Scrapshooter ETB (gift promised): destroy opponent's ${oppName}`);
        }
      }
    }

    // Skullwinder ETB: return a card from your graveyard to hand.
    // Prefers missing combo pieces (same logic as Eternal Witness).
    // Note: the opponent also returns a card — not modelled (no opponent graveyard).
    if (!skipETB && cardKey === 'skullwinder' && s.players[0].graveyard.length > 0) {
      var { NAME_TO_KEY: N2K } = _ACM;
      const gy = s.players[0].graveyard;
      const present = new Set(s.hand);
      for (const p of s.battlefield) { const k = N2K[p.name]; if (k) present.add(k); }
      let bestIdx = -1, bestMissing = Infinity;
      for (let i = 0; i < gy.length; i++) {
        const k = N2K[gy[i]];
        if (!k) continue;
        for (const req of COMBO_REQUIRED_KEYS) {
          if (!req.includes(k)) continue;
          const missing = req.filter(m => !present.has(m)).length;
          if (missing < bestMissing) { bestMissing = missing; bestIdx = i; }
        }
      }
      const idx = bestIdx >= 0 ? bestIdx : 0;
      const name = gy[idx];
      s._ensurePlayers();
      s.players[0] = s.players[0].clone();
      s.players[0].graveyard = [...gy.slice(0, idx), ...gy.slice(idx + 1)];
      const ck = N2K[name] ?? Object.keys(cards).find(k => cards[k].name === name);
      if (ck) s = s.addToHand(ck);
    }

    // Formidable Speaker ETB: you may discard a card → search library for a
    // creature card, reveal it, put it into your hand, then shuffle.
    // Only fires when there's a card to discard AND the library has a creature
    // worth tutoring. Discard strategy: prefer the lowest-value non-combo card
    // in hand (to avoid losing pieces we need), then fetch the best combo
    // creature from the library (same TUTOR_PRIORITY_SCORE ranking as Survival).
    if (!skipETB && cardKey === 'formidable_speaker' && s.hand.length > 0) {
      const libCards = s.players[0].library;
      const creaturesInLib = libCards.filter(k => cards[k]?.types.includes('creature'));
      if (creaturesInLib.length > 0) {
        // Find the best creature to tutor (highest TUTOR_PRIORITY_SCORE)
        let bestTutor = null, bestScore = -1;
        for (const k of creaturesInLib) {
          const score = TUTOR_PRIORITY_SCORE[k] ?? 0;
          if (score > bestScore) { bestScore = score; bestTutor = k; }
        }
        if (bestTutor) {
          // Find the least-valuable card to discard (avoid discarding the target itself
          // or high-value pieces not yet on battlefield)
          const handCopy = [...new Set(s.hand)].filter(k => k !== bestTutor);
          const present = new Set(s.battlefield.map(p => {
            var { NAME_TO_KEY: N2K } = _ACM;
            return N2K[p.name];
          }).filter(Boolean));
          const PROTECT_THRESHOLD = 70;
          const discardable = handCopy.filter(k =>
            (TUTOR_PRIORITY_SCORE[k] ?? 0) < PROTECT_THRESHOLD || present.has(k)
          );
          // Use first available discard candidate (or any card if all are protected)
          const discardKey = discardable[0] ?? handCopy[0];
          if (discardKey) {
            s._ensurePlayers();
            s.players[0] = s.players[0].clone();
            // Remove tutored card from library
            const libIdx = s.players[0].library.indexOf(bestTutor);
            if (libIdx >= 0) {
              s.players[0].library = [
                ...s.players[0].library.slice(0, libIdx),
                ...s.players[0].library.slice(libIdx + 1),
              ];
            }
            // Discard the chosen card
            s = s.removeFromHand(discardKey) ?? s;
            s = s.addToGraveyard(0, cards[discardKey]?.name ?? discardKey);
            // Add tutored creature to hand
            s = s.addToHand(bestTutor);
            s = s.log(`Formidable Speaker ETB: discard ${cards[discardKey]?.name ?? discardKey} → tutor ${cards[bestTutor]?.name ?? bestTutor}`);
          }
        }
      }
    }

    // Disciple of Freyalise ETB: sacrifice another creature, draw X, gain X life
    // where X = sacrificed creature's power.
    //
    // Strategy (multi-candidate, bounded):
    //   1. Never sacrifice key combo pieces (KEEP set).
    //   2. Among expendable creatures, offer up to 3 power-ranked candidates so
    //      the solver can choose the one that draws the most cards.
    //   3. If only one candidate exists, no branching needed — use it directly.
    //
    // "Expendable" intentionally includes non-key creatures with power > 1 so
    // the solver is not locked into the lowest-power sacrifice when a bigger
    // draw is better (e.g. sac a 3/3 token for 3 cards vs a 1/1 dork for 1).
    if (!skipETB && cardKey === 'disciple_freyalise') {
      const KEEP = new Set([
        'Ashaya, Soul of the Wild', 'Temur Sabertooth', 'Kogla, the Titan Ape',
        'Selvala, Heart of the Wilds', 'Quirion Ranger', 'Scryb Ranger',
        'Hope Tender', 'Argothian Elder', 'Ley Weaver', 'Wirewood Symbiote',
        'Hyrax Tower Scout', 'Magus of the Candelabra',
      ]);
      const expendable = s.creatures().filter(c => c.id !== perm.id && !KEEP.has(c.name));
      if (expendable.length > 0) {
        // Sort descending by power so higher-draw candidates come first.
        // Cap to 3 candidates to avoid combinatorial blowup — the first is the
        // "sacrifice for max draw" choice; the last is lowest-power (min loss).
        const sorted = expendable.sort((a, b) => (b.power ?? 1) - (a.power ?? 1));
        // Use only the highest-power candidate; the solver's branching will
        // naturally explore lower-power alternatives via other children.
        // (In practice this card is usually cast with one clear best target.)
        const sac = sorted[0];
        const sacPower = Math.max(1, sac.power ?? 1);
        s = s.removeFromBattlefield(sac.id, 'graveyard');
        if (s) {
          s = s.playerDraws(0, sacPower);
          s.life += sacPower; // gain X life
          s = s.log(`Disciple of Freyalise: sacrifice ${sac.name} (power ${sacPower}) → draw ${sacPower}, gain ${sacPower} life`);
        }
      }
    }

    // Sowing Mycospawn on-cast trigger: search library for a land → battlefield.
    // (This is an on-cast trigger, not ETB — but enterBattlefield is the closest hook.)
    // In practice, treating it as ETB is close enough for the solver.
    //
    // Per oracle: the fetched land enters TAPPED. The previous version of
    // this block didn't pass `tapped: true`, which produced an over-strong
    // engine in the solver — Mycospawn could fetch a Cradle and tap it the
    // same turn for {G}. Corrected in C-15.
    if (!skipETB && cardKey === 'sowing_mycospawn') {
      const cardsModule = _cards();
      var { TUTOR_PRIORITY_SCORE: TPS } = _CDM;
      var { NAME_TO_KEY: N2K } = _ACM;
      // Find the highest-priority land in library
      let bestLandKey = null, bestLandScore = -1;
      const present = new Set(s.hand);
      for (const p of s.battlefield) { const k = N2K[p.name]; if (k) present.add(k); }
      for (const ck of s.players[0].library) {
        if (ck === 'unknown') continue;
        const def = cardsModule[ck];
        if (!def?.types.includes('land')) continue;
        if (present.has(ck)) continue; // don't fetch duplicates of key lands
        const score = TPS[ck] ?? 1;
        if (score > bestLandScore) { bestLandKey = ck; bestLandScore = score; }
      }
      if (bestLandKey) {
        const { state: ns, cardKey: lk } = s.searchLibraryFor(k => k === bestLandKey);
        if (lk) {
          s = ns.enterBattlefield(lk, { tapped: true });
          const landName = cardsModule[lk]?.name ?? lk;
          s = s.log(`Sowing Mycospawn trigger → search library, put ${landName} onto battlefield tapped`);
        }
      }
    }

    // Beast Whisperer: draw a card when you cast a creature — triggered in actions.js

    // Skyshroud Poacher ETB: nothing (ability handled separately)

    // Hyrax Tower Scout already handled above.

    // Wild Growth / Utopia Sprawl: Auras that enchant a land.
    // When entered via --battlefield (or any path bypassing actions.js castFn),
    // onEnter is not called automatically, so enchantedLandId is never set.
    // Mirror the attachment logic from cards.js here so the combo detector can
    // verify which land is enchanted (e.g. to exclude Ancient Tomb loops).
    if (cardKey === 'wild_growth' || cardKey === 'utopia_sprawl') {
      const lands = s.battlefield.filter(p => p.is('land') && p.id !== perm.id);
      const target = lands.find(l => l.isForest) ?? lands[0];
      if (target) perm.enchantedLandId = target.id;
    }

    // Elvish Guidance: Aura that enchants a land.
    // Same pattern as Wild Growth / Utopia Sprawl — must set elvishGuidance=true on the
    // target land so actions.js tapForMana adds +elfCount{G} when it taps.
    // Prefer Gaea's Cradle (or any Forest) over non-Forest lands.
    if (cardKey === 'elvish_guidance') {
      const lands = s.battlefield.filter(p => p.is('land') && p.id !== perm.id);
      const target = lands.find(l => l.name === "Gaea's Cradle") ??
                     lands.find(l => l.isForest) ?? lands[0];
      if (target) {
        s._ensureBF();
        const tgt = s.battlefield.find(p => p.id === target.id);
        if (tgt) tgt.elvishGuidance = true;
      }
    }

    // Dynamic Ashaya P/T: whenever any permanent enters while Ashaya is on the
    // battlefield, recompute her power/toughness = number of lands controlled.
    // This covers: new creature entering (becomes a Forest land under Ashaya),
    // new land entering directly, and Ashaya herself entering (handled above).
    if (cardKey !== 'ashaya') {
      const ashayaP = s.battlefield.find(p => p.cardKey === 'ashaya');
      if (ashayaP) {
        const landCount = s.lands().length;
        ashayaP.power     = landCount;
        ashayaP.toughness = landCount;
      }
    }

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
    s._ensureBF();
    const idx = s.battlefield.findIndex(p => p.id === id);
    if (idx === -1) return null;
    const [removed] = s.battlefield.splice(idx, 1);
    s._permNames = null;  // invalidate cache
    if (zone === 'graveyard' || zone === 'exile') s._ensurePlayers();
    // Tokens cease to exist when they leave the battlefield — they never go to
    // the graveyard or exile.  Sending a token name to putInGraveyard would
    // pollute the graveyard with un-recurable token entries (e.g. "Elf Warrior
    // Token"), wasting fingerprint bytes and cluttering EWit target lists.
    if (!removed.isToken) {
      if (zone === 'graveyard') s.players[pi] = s.players[pi].putInGraveyard(removed.name);
      if (zone === 'exile')     s.players[pi] = s.players[pi].putInExile(removed.name);
    }
    // Recompute _hasSTAX from BOTH our battlefield AND opponent stax.
    // Bug fix (2026-05-05): previously this only checked our battlefield, so
    // sacrificing/destroying any of our permanents would silently turn off
    // opponent stax effects (Thorn of Amethyst, Trinisphere, etc.) for the
    // rest of the search.  Only cost-affecting stax names matter for the
    // _hasSTAX flag's purpose (gating effectiveCost's slow path).
    const ownHas = s.battlefield.some(p => ALL_STAX_NAMES.has(p.name));
    const oppHas = [...(s.opponentStax || [])].some(e => COST_AFFECTING_STAX_NAMES.has(e.split('@')[0].trim()));
    s._hasSTAX = ownHas || oppHas;
    return s;
  }

  removeFromHand(cardKey) {
    const s = this.clone();
    const idx = s.hand.indexOf(cardKey);
    if (idx === -1) return null;
    s.hand = [...s.hand.slice(0, idx), ...s.hand.slice(idx + 1)];
    // Clear topDecked when the card it refers to is cast — it's no longer
    // waiting to be drawn (Harbinger ETB sets it but QR may be cast this turn).
    if (s.topDecked === cardKey) s.topDecked = null;
    return s;
  }

  /** Shuffle a card key back into the library (e.g. Green Sun's Zenith). */
  addToLibrary(cardKey) {
    const s = this.clone();
    s._ensurePlayers();
    s.players[0] = s.players[0].clone();
    // Insert at a random position — modelled as the end (solver treats library as unordered).
    s.players[0].library = [...s.players[0].library, cardKey];
    return s;
  }

  addToHand(cardKey) {
    const s = this.clone();
    // [E6] Insert in sorted position so fingerprint() can skip sort().
    // Binary-search insertion keeps hand sorted at O(log n) cost here
    // instead of O(n log n) sort inside every fingerprint() call.
    const h = s.hand;
    let lo = 0, hi = h.length;
    while (lo < hi) { const mid = (lo + hi) >>> 1; if (h[mid] <= cardKey) lo = mid + 1; else hi = mid; }
    s.hand = [...h.slice(0, lo), cardKey, ...h.slice(lo)];
    return s;
  }

  markAbilityUsed(id, abilityKey) {
    const s = this.clone();
    s._ensureBF();
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
    s.landsPlayedThisTurn = 0;
    s.storm = 0;
    s.isOpponentTurn = false;
    s.opponentTurnsThisRound = 0; // fresh round: all 3 opponent windows available again
    s.flashThisTurn  = false;
    s.endingTurn     = false;  // cleanup complete; fresh turn
    // CR 500.4 / 514: mana pools empty at the end of each step and phase.
    // Any floating mana left at the end of your turn is lost.
    s.mana = new ManaPool();
    s._ensureBF();  // untap loop mutates permanents
    for (const p of s.battlefield) {
      // Exerted creatures don't untap on your next untap step.
      // The exert_two_lands flag is set by Hope Tender's exert ability.
      // We clear the flag here (it's consumed) but keep the creature tapped.
      if (p.abilitiesUsed?.exert_two_lands) {
        p.abilitiesUsed = {};  // clear all ability flags (exert consumed)
        // p.tapped stays true — exerted creatures don't untap
      } else {
        p.tapped = false;
      }
      p.summoningSick = false;
      p.abilitiesUsed = {};
    }

    // ── Summoner's Pact upkeep trigger ──────────────────────────────────────
    // If a Pact was cast last turn, you must pay {2}{G}{G} at the beginning
    // of this upkeep or lose the game.
    // We check whether the freshly-untapped board can generate {2}{G}{G}
    // by summing potential mana from each untapped permanent's tapForMana.
    // If it can't, the player loses immediately (life set to 0).
    if (s.pactOwed) {
      s.pactOwed = false; // clear regardless — either paid or lost
      const CARDS = _cards();
      // Candidates: untapped permanents that can produce mana right now.
      const candidates = [];
      for (const p of s.battlefield) {
        const def = CARDS[p.cardKey];
        if (!def?.tapForMana) continue;
        if (p.tapped) continue;
        if (def.types.includes('creature') && p.summoningSick) continue;
        const results = def.tapForMana(s, p);
        if (!results || !results.length) continue;
        const afterTap = results[0];
        const gainedTotal = afterTap.mana.total() - s.mana.total();
        const gainedG     = afterTap.mana.G - s.mana.G;
        if (gainedTotal <= 0) continue;
        candidates.push({ id: p.id, gainedTotal, gainedG: Math.max(0, gainedG) });
      }
      const potentialG   = candidates.reduce((sum, c) => sum + c.gainedG, 0);
      const potentialAny = candidates.reduce((sum, c) => sum + c.gainedTotal, 0);
      // {2}{G}{G} requires at least 2G pips and 4 total mana
      const canPay = potentialG >= 2 && potentialAny >= 4;
      if (!canPay) {
        // Cannot pay the Pact — lose the game
        s._ensurePlayers();
        s.players[0] = s.players[0].clone();
        s.players[0].life = -1; // triggers youLost()
        s.history = [...s.history, {
          turn: s.turn,
          msg: `-- Begin Turn ${s.turn} (lib: ${s.players[0].librarySize}) --`,
        }, {
          turn: s.turn,
          msg: `Summoner's Pact upkeep: cannot pay {2}{G}{G} — YOU LOSE`,
        }];
        return s;
      }
      // [O-28] Actually CONSUME the mana sources used to pay {2}{G}{G} —
      // tap a covering subset so they're unavailable for the rest of the
      // turn, rather than just verifying feasibility and leaving every
      // permanent untapped (which previously let the solver "pay" the Pact
      // for free and still use the same lands normally afterward).
      // Greedily tap smallest producers first to minimize over-tapping,
      // continuing until both the {2} generic and {G}{G} colored
      // requirements are met.
      candidates.sort((a, b) => a.gainedTotal - b.gainedTotal);
      let accG = 0, accTotal = 0;
      const toTap = [];
      for (const c of candidates) {
        if (accTotal >= 4 && accG >= 2) break;
        toTap.push(c.id);
        accG += c.gainedG;
        accTotal += c.gainedTotal;
      }
      s._ensureBF();
      for (const id of toTap) {
        const live = s.getPermanentById(id);
        if (live) live.tapped = true;
      }
      s.history = [...s.history, {
        turn: s.turn,
        msg: `-- Begin Turn ${s.turn} (lib: ${s.players[0].librarySize}) --`,
      }, {
        turn: s.turn,
        msg: `Summoner's Pact upkeep: pay {2}{G}{G} ✓ (tapped ${toTap.length} permanent(s))`,
      }];
      s._ensurePlayers();
      s.players[0] = s.players[0].draw(0); // no-op clone to own player
      return s._afterDraw(s);
    }
    // ── Lifecrafter's Bestiary upkeep scry ──────────────────────────────────
    // "At the beginning of your upkeep, scry 1."
    // If Bestiary is on the battlefield, look at the top card of library.
    // If it's below the combo relevance threshold (TUTOR_PRIORITY_SCORE < 50),
    // put it on the bottom — we'd rather draw a higher-value card.
    // This models the practical benefit: avoid drawing dead cards mid-combo.
    if (s.hasPermanent("Lifecrafter's Bestiary") &&
        s.players[0].library.length >= 2) {
      const CARDS = _cards();
      const topKey = s.players[0].library[0];
      const topScore = TUTOR_PRIORITY_SCORE[topKey] ?? 0;
      // If the top card is low-priority, move it to the bottom (scry to bottom)
      if (topScore < 50 && topKey !== 'unknown') {
        s._ensurePlayers();
        const lib = [...s.players[0].library];
        lib.push(lib.shift()); // move top to bottom
        s.players[0] = s.players[0].clone();
        s.players[0].library = lib;
        s.history = [...s.history, {
          turn: s.turn,
          msg: `Lifecrafter's Bestiary: scry 1 → ${CARDS[topKey]?.name ?? topKey} to bottom`,
        }];
      } else {
        s.history = [...s.history, {
          turn: s.turn,
          msg: `Lifecrafter's Bestiary: scry 1 → keep ${CARDS[topKey]?.name ?? topKey} on top`,
        }];
      }
    }

    // ── Normal turn (no pact) ────────────────────────────────────────────────
    s.history = [...s.history, {
      turn: s.turn,
      msg: `-- Begin Turn ${s.turn} (lib: ${s.players[0].librarySize}) --`,
    }];
    s._ensurePlayers();  // draw step mutates players
    if (s.topDecked !== null) {
      const topCard = s.topDecked;
      s.topDecked = null;
      s.players[0] = s.players[0].draw(1);
      // [E6] Insert sorted to maintain hand invariant
      const h = s.hand; let lo = 0, hi = h.length;
      while (lo < hi) { const mid = (lo + hi) >>> 1; if (h[mid] <= topCard) lo = mid + 1; else hi = mid; }
      s.hand = [...h.slice(0, lo), topCard, ...h.slice(lo)];
    } else if (s.drawForTurn && s.players[0].library.length > 0) {
      const drawnKey = s.players[0].library[0];
      s.players[0] = s.players[0].draw(1);
      if (drawnKey && drawnKey !== 'unknown') {
        // [E6] Insert sorted to maintain hand invariant
        const h = s.hand; let lo = 0, hi = h.length;
        while (lo < hi) { const mid = (lo + hi) >>> 1; if (h[mid] <= drawnKey) lo = mid + 1; else hi = mid; }
        s.hand = [...h.slice(0, lo), drawnKey, ...h.slice(lo)];
      }
      const CARDS = _cards();
      s.history = [...s.history, {
        turn: s.turn,
        msg: `Draw ${CARDS[drawnKey].name}`,
      }];
    }
    for (let i = 1; i < s.players.length; i++) {
      s.players[i] = s.players[i].draw(1);
    }
    return s;
  }

  // Helper: complete the draw step after pact payment (avoids code duplication)
  _afterDraw(s) {
    if (s.topDecked !== null) {
      const topCard = s.topDecked;
      s.topDecked = null;
      s._ensurePlayers();
      s.players[0] = s.players[0].draw(1);
      // [E6] Insert sorted
      const h = s.hand; let lo = 0, hi = h.length;
      while (lo < hi) { const mid = (lo + hi) >>> 1; if (h[mid] <= topCard) lo = mid + 1; else hi = mid; }
      s.hand = [...h.slice(0, lo), topCard, ...h.slice(lo)];
    } else if (s.drawForTurn && s.players[0].library.length > 0) {
      const drawnKey = s.players[0].library[0];
      s._ensurePlayers();
      s.players[0] = s.players[0].draw(1);
      if (drawnKey && drawnKey !== 'unknown') {
        // [E6] Insert sorted
        const h = s.hand; let lo = 0, hi = h.length;
        while (lo < hi) { const mid = (lo + hi) >>> 1; if (h[mid] <= drawnKey) lo = mid + 1; else hi = mid; }
        s.hand = [...h.slice(0, lo), drawnKey, ...h.slice(lo)];
      }
    }
    for (let i = 1; i < s.players.length; i++) {
      s.players[i] = s.players[i].draw(1);
    }
    return s;
  }

  // ── Fingerprint ───────────────────────────────────────────────────────────

  fingerprint() {
    if (this._fp !== null) return this._fp;

    // [E6] Hand is kept sorted at all mutation sites (addToHand, startNewTurn,
    // _afterDraw, constructor) so we skip the sort here — O(n) join only.
    const hand = this.hand.join(',');

    // [E12] Battlefield encoding — fast path for the common case + lazy
    // construction of optional structures.
    //
    // Profile (default + Arbor Elf hands, ~60K perm encodings):
    //   • ~75% of permanents only need name + tap state (no auras, no counters,
    //     no power-mod, no abilitiesUsed).  Inline that as the hot path.
    //   • enchantedLandId fires on ~0–15% of encodings — the per-fingerprint
    //     `new Map(this.battlefield.map(...))` was being built unconditionally,
    //     which is the single biggest waste.  Build _encMap lazily only when
    //     a perm actually has enchantedLandId set.
    //   • counters fire on ~0% of encodings during a normal solve — keep the
    //     branch but skip the Object.entries/filter when the bag is empty.
    //
    // Correctness is preserved: every field that can affect dedup correctness
    // is still encoded, in the same order, with the same delimiter syntax.
    const _fpCards = _cards();
    const bfArr = this.battlefield;
    const segs = new Array(bfArr.length);
    let _encMap = null;  // built lazily on first enchantedLandId hit

    for (let i = 0; i < bfArr.length; i++) {
      const p = bfArr[i];
      // Fast path: detect "no extras" by short-circuit-checking each rare
      // field.  When all are absent, build only the 4-char-or-so base string.
      const tap = p.tapped ? ':T' : ':U';
      const isF = p.isForest;
      const enc = p.enchantedLandId;
      const sick = p.summoningSick;
      const power = p.power;
      const counters = p.counters;
      const used = p.abilitiesUsed;
      const guided = p.elvishGuidance;
      const imprint = p.imprintedColor;
      const cauldron = p.cauldronAbilityKey;
      const copyK = p.copyKey;          // Destiny Spinner animate_land — land taps as creature
      const lvl = p.levelCounters;      // Joraga Treespeaker level 0/1/2
      const named = p.namedCard;        // Disruptor Flute — named card can't activate abilities
      const luck = p.luckCounter;       // Gemstone Caverns — luck counter enables colored mana

      // Detect the dominant "name + tap only" case in a single conjunction.
      // Microbench shows this single combined check is faster than 6 sequential
      // ifs that all ultimately fall through to a string concat.
      if (
        !isF &&
        enc === undefined &&
        !sick &&
        (power === undefined || _fpCards[p.cardKey]?.power === power) &&
        (!counters || _isEmptyBag(counters)) &&
        (!used || _isEmptyBag(used)) &&
        !guided &&
        imprint === undefined &&
        cauldron === undefined &&
        copyK === undefined &&
        (lvl === undefined || lvl === 0) &&
        named === undefined &&
        !luck
      ) {
        // [perf] Canonicalize fingerprint-equivalent permanents (e.g. Llanowar
        // Elves / Fyndhorn Elves — see FINGERPRINT_EQUIVALENTS) to the same
        // label. Only reachable here in the fast path, which already requires
        // no aura/sickness/counters/etc — exactly the "fully interchangeable"
        // case the table is scoped to. Two such permanents on the same
        // battlefield (e.g. one of each) now sort/serialize identically
        // regardless of which one a search branch happened to tap, so DFS/BFS
        // dedup catches the convergence instead of treating "tapped Llanowar
        // first" and "tapped Fyndhorn first" as distinct states forever.
        const canon = _fingerprintCanonicalName.get(p.cardKey);
        segs[i] = (canon !== undefined ? canon : p.name) + tap;
        continue;
      }

      // Slow path: at least one rare field is set.
      let s = p.name + tap;
      if (isF) s += ':F';
      if (guided) s += ':EG'; // elvishGuidance — land has +elfCount{G} per tap
      if (imprint !== undefined) s += ':I' + (imprint ?? 'none'); // Chrome Mox imprinted color
      if (cauldron !== undefined) s += ':CA[' + cauldron + ']'; // Agatha's Cauldron grafted ability
      if (copyK !== undefined) s += ':CK[' + copyK + ']'; // Destiny Spinner animate_land copy
      if (lvl) s += ':LV' + lvl; // Joraga Treespeaker level
      if (named !== undefined) s += ':N[' + named + ']'; // Disruptor Flute named card
      if (luck) s += ':LK'; // Gemstone Caverns luck counter
      if (enc !== undefined) {
        if (_encMap === null) {
          // Lazy build — single pass over BF, only when needed.
          _encMap = new Map();
          for (let j = 0; j < bfArr.length; j++) _encMap.set(bfArr[j].id, bfArr[j].name);
        }
        s += ':E[' + (_encMap.get(enc) ?? enc) + ']';
      }
      if (sick) s += ':S';
      if (power !== undefined && _fpCards[p.cardKey]?.power !== power) s += ':P' + power;
      if (counters && typeof counters === 'object') {
        const ents = Object.entries(counters).filter(([, v]) => v);
        if (ents.length) s += ':C{' + ents.map(([k, v]) => v + k).sort().join(',') + '}';
      }
      if (used && typeof used === 'object') {
        const usedKeys = Object.keys(used).filter(k => used[k]).sort();
        if (usedKeys.length) s += ':A{' + usedKeys.join(',') + '}';
      }
      segs[i] = s;
    }
    const bf = segs.sort().join('|');

    // Mana — fast colon-separated digits (avoids conditional string building)
    const mn = this.mana;
    const m = mn.W + ':' + mn.U + ':' + mn.B + ':' + mn.R + ':' + mn.G + ':' + mn.C;

    // Players — unrolled 4-player concat (avoids .map() lambda overhead)
    const p0 = this.players[0], p1 = this.players[1],
          p2 = this.players[2], p3 = this.players[3];
    // p0 graveyard: include sorted card names so states with different
    // graveyards (different Eternal Witness targets) are never aliased (Fix #3).
    const gy0 = p0.graveyard.length ? [...p0.graveyard].sort().join(';') : '';
    const players =
      p0.life + '/' + p0.librarySize + '/' + p0.poison + '/' + gy0 + '/' + p0.exile.length + ',' +
      p1.life + '/' + p1.librarySize + '/' + p1.poison + '/' + p1.graveyard.length + '/' + p1.exile.length + ',' +
      p2.life + '/' + p2.librarySize + '/' + p2.poison + '/' + p2.graveyard.length + '/' + p2.exile.length + ',' +
      p3.life + '/' + p3.librarySize + '/' + p3.poison + '/' + p3.graveyard.length + '/' + p3.exile.length;

    const cmd = [...this.commandZone].sort().join(',') + ':' + this.commanderTax;

    this._fp = 'T' + this.turn + '|H:' + hand + '|BF:' + bf + '|M:' + m +
               '|L:' + this.landDrops + '|P:' + players + '|CZ:' + cmd +
               (this.flashThisTurn  ? '|FL' : '') +
               (this.pactOwed       ? '|PC' : '') +
               (this.landsPlayedThisTurn > 0 ? '|LP:' + this.landsPlayedThisTurn : '') +
               (this.isOpponentTurn ? '|OT' : '') +
               (this.opponentTurnsThisRound > 0 ? '|OTR:' + this.opponentTurnsThisRound : '') +
               (this.endingTurn     ? '|ET' : '') +
               ((this.opponentStax?.size ?? this.opponentStax?.length ?? 0) > 0 ? '|OS:' + [...this.opponentStax].sort().join(',') : '') +
               (this.topDecked      ? '|TD:' + this.topDecked : '');  // [E1] topDecked aliasing fix
    return this._fp;
  }

  // ── Display ───────────────────────────────────────────────────────────────

  printSummary() {
    const losses = this.getLosses();
    if (losses.length) {
    }
    if (this.comboAchieved) console.log(`\n  *** COMBO: ${this.comboName} ***`);
  }
}

var _GSM = { GameState, ManaPool, parseCost, Player, Permanent, buildDefaultLibrary };
// cards.js
/**
 * MTG Combo Solver — Card Definitions (expanded)
 * All cards from card_data.md plus original combo pieces.
 */

// isStax imported from combo_data.js (no circular dependency)
/**
 * Drain all remaining mana from the pool (pays X for X-cost spells).
 * Returns a new state with an empty mana pool.
 */
function drainMana(state) {
  const s = state.clone();
  s.mana = new ManaPool();
  return s;
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
    // [perf] addMana(color, amount) clones once; the old per-unit loop
    // (addMana(color) × amount) cloned the whole GameState `amount` times for a
    // single tap. tapForMana runs for every mana source in every
    // generateActions, so this removed a large share of clone churn.
    for (const [color, amt] of colorPairs) s = s.addMana(color, amt);
    s = s.log(`Tap ${perm.name} → ${label}`);
    return [s];
  };
}

/**
 * Build a fetch-land ability function.
 * Offers TWO results (solver picks the better one via heuristic):
 *   1. Dryad Arbor (default) — Forest creature, boosts Cradle/Ashaya count,
 *      enters with summoning sickness so can't tap immediately.
 *   2. Basic Forest (alternative) — tappable immediately for {G}, no creature benefit.
 *
 * The solver's heuristic ordering will prefer Dryad Arbor in most cases
 * because it advances more combos (Ashaya + creature count, Cradle mana,
 * sacrifice targets). Basic Forest is preferred when a land drop for mana
 * is urgently needed this turn.
 */
function makeFetchLand(name) {
  return {
    name,
    types: ['land'], subtypes: [], cost: null,
    tapForMana(s, p) { return []; }, // fetch lands don't tap for mana
    abilities: {
      fetch: {
        label: 'Fetch Forest or Dryad Arbor',
        fn(state, perm) {
          if (perm.tapped) return [];
          const results = [];
          const lib = state.players[0].library;

          // Option 1: Dryad Arbor (forest creature — best for combos)
          // Only offered if dryad_arbor is actually in the library.
          if (lib.includes('dryad_arbor')) {
            let s = state.clone();
            s.life -= 1;
            s = s.removeFromBattlefield(perm.id, 'graveyard');
            if (s) {
              const { state: ns, cardKey: found } = s.searchLibraryFor(k => k === 'dryad_arbor');
              if (found) {
                const after = ns.enterBattlefield(found);
                results.push(after.log(`${name}: fetch Dryad Arbor`));
              }
            }
          }

          // Option 2: Basic Forest — only offered if 'forest' is in the library.
          if (lib.includes('forest')) {
            let s = state.clone();
            s.life -= 1;
            s = s.removeFromBattlefield(perm.id, 'graveyard');
            if (s) {
              const { state: ns, cardKey: found } = s.searchLibraryFor(k => k === 'forest');
              if (found) {
                const after = ns.enterBattlefield(found);
                results.push(after.log(`${name}: fetch Forest`));
              }
            }
          }

          return results;
        },
      },
    },
  };
}


function bounceToUntap(label, filterFn, selfKey, abilityKey) {
  // abilityKey: the abilitiesUsed flag written after each use — must match the key
  // the combo detectors in combos.js check (quirionAvailable → 'bounce_forest',
  // symbioteAvailable → 'bounce_elf').  Callers pass the correct key explicitly.
  return {
    label,
    fn(state, perm) {
      // ── Once-per-turn guard ──────────────────────────────────────────────
      // Quirion Ranger / Scryb Ranger / Wirewood Symbiote may each use this
      // ability only ONCE per turn. Check the permanent's abilitiesUsed map.
      if (perm.abilitiesUsed && perm.abilitiesUsed[abilityKey]) return [];

      var cards = CARDS;
      const results = [];
      // Protect Yavimaya, Cradle of Growth from being bounced when Ashaya is
      // already on the battlefield AND Arbor Elf + a big land are present.
      // Once Ashaya is out, QR becomes a Forest (creature under Ashaya = Forest)
      // and can bounce ITSELF instead of Yavimaya to untap Arbor Elf. So from
      // that point on, bouncing Yavimaya is strictly inferior and breaks the combo.
      //
      // BEFORE Ashaya arrives: QR is not a Forest, so bouncing Yavimaya may be
      // the only way to use QR's ability mid-turn (e.g. to generate mana).
      // In that case the protection must NOT apply.
      //
      // [perf] Single pass instead of three separate .some() scans — this fn
      // is one of the hottest in the profile on Ranger-loop-heavy hands (it's
      // called once per candidate action across the whole search), so
      // combining battlefield scans here has an outsized cumulative effect.
      let ashayaOnField = false, arborOnField = false, cradleOnField = false;
      for (const p of state.battlefield) {
        if (p.cardKey === 'ashaya') ashayaOnField = true;
        else if (p.cardKey === 'arbor_elf') arborOnField = true;
        else if (p.cardKey === 'gaeas_cradle' || p.cardKey === 'nykthos') cradleOnField = true;
      }
      const protectYavimaya = ashayaOnField && arborOnField && cradleOnField;
      const bounceable = state.battlefield.filter(p => {
        if (protectYavimaya && p.cardKey === 'yavimaya') return false;
        return filterFn(p);
      });
      // [perf] Compute the tapped-creatures list ONCE — state doesn't change
      // while we're just planning candidate actions across `bounceable`
      // targets, so recomputing state.creatures() (an uncached O(n) filter)
      // once PER target, as before, was pure redundant work whenever more
      // than one target is bounceable (e.g. multiple Forests in play).
      const allTappedCreatures = state.creatures().filter(c => c.tapped);
      for (const target of bounceable) {
        const creaturesCanUntap = allTappedCreatures.filter(c => c.id !== target.id);
        // Only offer "untap self" when bouncing another Elf if the symbiote/ranger
        // is itself tapped — untapping an already-untapped permanent is a no-op and
        // produces a misleading/wasteful action.
        const selfUntapOption = (target.id !== perm.id && perm.tapped)
          ? [{ ...perm, _isSelf: true }]
          : [];
        const untapTargets = target.id === perm.id
          ? creaturesCanUntap
          : [...creaturesCanUntap, ...selfUntapOption];
        if (untapTargets.length === 0) continue;
        for (const ut of untapTargets) {
          let s = state;
          // Mark the ability used on the permanent BEFORE any removal, so the
          // flag persists even if perm is bounced to hand (it's gone from BF).
          s = s.markAbilityUsed(perm.id, abilityKey);
          if (!s) continue;
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
      // Deduplicate: when multiple identical permanents exist (e.g. 3 Forests),
      // bouncing any of them produces the same resulting state. Use label-based
      // deduplication — identical labels mean identical (bounce, untap) pairs which
      // produce identical result states. This avoids computing fingerprints on all
      // result states (fingerprint() is fast but the result states themselves are
      // expensive to build — each is a full COW clone chain).
      const seenLabels = new Set();
      return results.filter(r => {
        const msg = r.history.at(-1)?.msg ?? '';
        if (seenLabels.has(msg)) return false;
        seenLabels.add(msg);
        return true;
      });
    },
  };
}

/**
 * Identify card keys currently in hand that were put there by a previous
 * Survival of the Fittest or Fauna Shaman activation in this game's history,
 * and have not yet been cast. These cards are "freshly tutored" — discarding
 * them to ANOTHER Survival/Fauna activation would create a self-cancelling
 * chain (each chain step burns {G} with no net change in hand composition).
 *
 * This is a stronger guard than the score-based protection (TUTOR_PRIORITY_SCORE
 * ≥ 70). The score-based one protects high-value combo pieces; this one
 * protects ANY card that just came in via a tutor activation, regardless of
 * its priority score. It catches the user-reported failure mode where DFS
 * spent its 500K state budget chaining mid-tier creatures (Duskwatch → Beast
 * Whisperer → Ashaya, only the last step doing useful work) instead of
 * exploring elegant alternative lines.
 *
 * Implementation: scan history backward for tutor-to-hand and cast messages.
 * Build a set of "tutored, not yet cast" card NAMES, then intersect with the
 * current hand to get card KEYS.
 *
 * Pattern coverage (explicit, narrow):
 *   - `Survival of the Fittest: ... → NAME to hand`  (tutored)
 *   - `Fauna Shaman: ... → NAME to hand`             (tutored)
 *   - `Cast NAME ...`                                (consumed)
 *
 * NOTE: this intentionally doesn't match every tutor wording in the codebase
 * (Worldly Tutor on top of library, Eternal Witness graveyard returns, etc.).
 * It only catches the Survival/Fauna chain pattern, which is the user-reported
 * failure mode.
 *
 * @param {GameState} state
 * @returns {Set<string>} card keys currently in hand that came from a tutor
 */
function _freshlyTutoredKeys(state) {
  var cards = CARDS;
  const tutorRe = /^(?:Survival of the Fittest|Fauna Shaman): .*?→\s+(.+?)\s+to hand/;
  const castRe  = /^Cast\s+(.+?)(?:\s+\(|\s*$)/;

  // Walk history forward, maintaining a multiset of "tutored, not yet cast" names.
  // Multiset because the same card name can be tutored, cast, then tutored again.
  const tutoredCount = new Map();
  for (const entry of state.history) {
    const msg = entry.msg ?? '';
    let m;
    if ((m = msg.match(tutorRe))) {
      const name = m[1].trim();
      tutoredCount.set(name, (tutoredCount.get(name) ?? 0) + 1);
    } else if ((m = msg.match(castRe))) {
      const name = m[1].trim();
      const cur = tutoredCount.get(name) ?? 0;
      if (cur > 0) {
        if (cur === 1) tutoredCount.delete(name);
        else tutoredCount.set(name, cur - 1);
      }
    }
  }

  // Convert names → card keys, restricted to cards currently in hand.
  const handSet = new Set(state.hand);
  const result = new Set();
  for (const name of tutoredCount.keys()) {
    for (const k of handSet) {
      if (cards[k]?.name === name) { result.add(k); break; }
    }
  }
  return result;
}


/**
 * Shared helper for activated creature-tutor abilities (Survival of the Fittest,
 * Fauna Shaman). Determines the best creature to fetch from the library.
 *
 * Priority tiers (highest wins):
 *   0. Combo-completing creatures that IMMEDIATELY enable a combo when put on the
 *      battlefield (simulated by enterBattlefield + checkCombos). Before the sim,
 *      any creatures already in hand are pre-entered onto the battlefield so that
 *      "Ashaya in hand + fetch Priest" correctly resolves as combo-complete.
 *   1. Creatures that are one card away from completing any known combo
 *      (missingComboCards set), ranked by TUTOR_PRIORITY_SCORE.
 *   2. Fallback: highest TUTOR_PRIORITY_SCORE creature not already present.
 *
 * @param {GameState} state  State after discarding (library search happens here).
 * @returns {string|null}    Card key of the best fetch target, or null if none found.
 */
function _bestCreatureTutorTarget(state) {
  var cards = CARDS;

  // Build present set: hand + battlefield
  const present = new Set(state.hand);
  for (const p of state.battlefield) {
    const ck = NAME_TO_KEY[p.name];
    if (ck) present.add(ck);
  }

  // Step 1: creatures that complete a combo (one piece away)
  const missingCombo = new Set();
  for (const required of COMBO_REQUIRED_KEYS) {
    const absent = required.filter(k => !present.has(k));
    if (absent.length === 1) missingCombo.add(absent[0]);
  }
  // Remove functional-equivalent duplicates
  for (const group of FUNCTIONAL_EQUIVALENTS) {
    const hasOne = [...group].some(k => present.has(k));
    if (hasOne) for (const k of group) missingCombo.delete(k);
  }

  // Collect all library creatures not already present
  const seenLib = new Set();
  const libCreatures = [];
  for (const ck of state.players[0].library) {
    if (ck === 'unknown' || isStax(ck) || seenLib.has(ck)) continue;
    seenLib.add(ck);
    if (present.has(ck)) continue;
    const def = cards[ck];
    if (!def?.types.includes('creature')) continue;
    libCreatures.push(ck);
  }

  // Build a "projected" state where hand creatures whose combo partners are already
  // on the battlefield are pre-entered. This lets tier-0 evaluate e.g.
  // "Ashaya in hand + QR on BF → fetch Priest" as an immediate combo hit.
  //
  // Performance: we only project ck if it appears in some COMBO_REQUIRED_KEYS entry
  // where every OTHER member is already on the battlefield. This is a tight filter —
  // in the common case (all pieces on BF already, or hand has only simple dorks) zero
  // clones are made, keeping the hot DFS path fast.
  const bfKeySet = new Set(
    state.battlefield.map(p => NAME_TO_KEY[p.name]).filter(Boolean)
  );
  let projectedState = state;
  let didProject = false;
  for (const ck of new Set(state.hand)) {                 // deduplicate
    const def = cards[ck];
    if (!def?.types.includes('creature')) continue;
    if (bfKeySet.has(ck)) continue;                       // already on BF
    // Only project if all OTHER members of some required combo are on BF
    const isKeystone = COMBO_REQUIRED_KEYS.some(req => {
      if (!req.includes(ck)) return false;
      return req.every(k => k === ck || bfKeySet.has(k));
    });
    if (!isKeystone) continue;
    projectedState = projectedState.enterBattlefield(ck);
    const added = projectedState.battlefield[projectedState.battlefield.length - 1];
    if (added) added.summoningSick = false;
    didProject = true;
  }

  // Tier 0: combo-completing creatures that immediately fire a combo when put on BF
  // Use projectedState so hand combo-pieces (e.g. Ashaya) count toward combo detection.
  // When no projection was needed, projectedState === state and this is a normal sim.
  let tier0Key = null, tier0Score = -1;
  for (const ck of libCreatures) {
    if (!missingCombo.has(ck)) continue;
    // Simulate: enter BF without summoning sickness and check for combo
    let testState = (didProject ? projectedState : state).enterBattlefield(ck);
    const newPerm = testState.battlefield[testState.battlefield.length - 1];
    if (newPerm) newPerm.summoningSick = false;
    if (checkCombos(testState)) {
      const sc = TUTOR_PRIORITY_SCORE[ck] ?? 0;
      if (sc > tier0Score) { tier0Key = ck; tier0Score = sc; }
    }
  }
  if (tier0Key) return tier0Key;

  // Tier 1: any combo-completing creature, ranked by priority
  let tier1Key = null, tier1Score = -1;
  for (const ck of libCreatures) {
    if (!missingCombo.has(ck)) continue;
    const sc = TUTOR_PRIORITY_SCORE[ck] ?? 0;
    if (sc > tier1Score) { tier1Key = ck; tier1Score = sc; }
  }
  if (tier1Key) return tier1Key;

  // Tier 2: fallback — highest priority creature in library
  let tier2Key = null, tier2Score = -1;
  for (const ck of libCreatures) {
    const sc = TUTOR_PRIORITY_SCORE[ck] ?? 0;
    if (sc > tier2Score) { tier2Key = ck; tier2Score = sc; }
  }
  return tier2Key ?? null;
}

// Legendary creature keys — used by Abstergo Entertainment to identify "historic" targets.
// (Legendary lands track their own subtypes; legendary creatures don't carry a 'Legendary' subtype
// in their subtypes array, so we enumerate them explicitly here.)
var LEGENDARY_CREATURE_KEYS = new Set([
  'yeva','ashaya','kogla','eladamri','selvala','yisan','marwyn',
  'woodland_bellower','regal_force','seedborn_muse','argothian_elder',
  'joraga_treespeaker','defiler_of_vigor','agatha_cauldron',
  'disciple_of_freyalise','badgermole_cub','woodcaller_automaton',
]);

var CARDS = {

  // ─── LANDS ───────────────────────────────────────────────────────────────

  ancient_tomb: {
    name: 'Ancient Tomb', types: ['land'], subtypes: [], cost: null,
    tapForMana(state, perm) {
      let s = state.tapPermanent(perm.id); if (!s) return [];
      s.life -= 2; s = s.addMana('C', 2);
      return [s.log(`Tap ${perm.name} → {C}{C} (pay 2 life, life now ${s.life})`)];
    },
  },

  gaeas_cradle: {
    name: "Gaea's Cradle", types: ['land'], subtypes: ['Legendary'], cost: null,
    tapForMana(state, perm) {
      const n = state.creatures().length; if (n === 0) return [];
      let s = state.tapPermanent(perm.id); if (!s) return [];
      s = s.addMana('G', n);
      return [s.log(`Tap ${perm.name} → {G}x${n} (${n} creature${n !== 1 ? 's' : ''})`)];
    },
  },

  itlimoc: {
    name: 'Itlimoc, Cradle of the Sun', types: ['land'], subtypes: ['Legendary'], cost: null,
    tapForMana(state, perm) {
      const n = state.creatures().length;
      let s = state.tapPermanent(perm.id); if (!s) return [];
      s = s.addMana('G', n + 1);
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
        if (s2) { s2 = s2.addMana('G', dev); results.push(s2.log(`Tap ${perm.name} (devotion) → {G}x${dev}`)); }
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
          s = s.addMana('G', 6);
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

  misty_rainforest:  makeFetchLand('Misty Rainforest'),
  verdant_catacombs: makeFetchLand('Verdant Catacombs'),
  windswept_heath:   makeFetchLand('Windswept Heath'),
  wooded_foothills:  makeFetchLand('Wooded Foothills'),

  shifting_woodland: {
    name: 'Shifting Woodland', types: ['land'], subtypes: [], cost: null,
    // Enters tapped unless you control a Forest.
    // Delirium — {2}{G}{G}: Until end of turn, this land becomes a copy of target
    // permanent card in your graveyard (if you have 4+ card types in GY). It's still a land.
    // Modeled: the copy ability makes Shifting Woodland functionally equivalent to
    // whatever is in the graveyard — most valuably Gaea's Cradle (tap for G per creature).
    // We model it as: if 4+ card types in GY AND a high-value permanent is there,
    // Shifting Woodland gains that card's tapForMana until end of turn.
    // (NB: tapForMana is defined as a method below; do NOT also assign simpleTap('{G}')
    // here — esbuild rejects the duplicate object key in strict mode.)
    abilities: {
      delirium_copy: {
        label: '{2}{G}{G}: Copy target permanent card in graveyard (delirium)',
        fn(state, perm) {
          if (perm.tapped) return [];
          // Check delirium: 4+ card types in graveyard
          const gy = state.players[0].graveyard ?? [];
          if (gy.length === 0) return [];
          var cards = CARDS;
          const gyTypes = new Set();
          for (const name of gy) {
            const key = Object.keys(cards).find(k => cards[k]?.name === name);
            const def = key ? cards[key] : null;
            if (!def) continue;
            for (const t of (def.types ?? [])) gyTypes.add(t);
          }
          if (gyTypes.size < 4) return [];
          const ap = state.payMana('2GG'); if (!ap) return [];
          const results = [];
          // Find unique permanent cards in GY to copy
          const seen = new Set();
          for (const name of gy) {
            if (seen.has(name)) continue; seen.add(name);
            const key = Object.keys(cards).find(k => cards[k]?.name === name);
            const def = key ? cards[key] : null;
            if (!def) continue;
            // Only useful targets: permanents (not instants/sorceries)
            if (def.types?.includes('instant') || def.types?.includes('sorcery')) continue;
            // Animate this land as a copy — mark perm with copyKey for this turn
            let s = ap.clone(); s._ensureBF();
            const live = s.battlefield.find(p => p.id === perm.id);
            if (!live) continue;
            live.copyKey = key;   // tapForMana will delegate to this card's ability
            live.copyName = name;
            results.push(s.log(`Shifting Woodland: delirium copy of ${name} until EOT`));
          }
          return results;
        },
      },
    },
    // tapForMana delegates to the copied card's tapForMana when copyKey is set
    tapForMana(state, perm) {
      if (perm.tapped) return [];
      if (perm.copyKey) {
        var cards = CARDS;
        const copyDef = cards[perm.copyKey];
        if (copyDef?.tapForMana) return copyDef.tapForMana(state, perm);
      }
      // Default: tap for {G}
      const s = state.tapPermanent(perm.id); if (!s) return [];
      return [s.addMana('G').log('Tap Shifting Woodland → {G}')];
    },
  },
  emergence_zone: {
    name: 'Emergence Zone', types: ['land'], subtypes: [], cost: null,
    tapForMana: simpleTap('{C}', [['C',1]]),
    // Oracle: {1}, {T}, Sacrifice: You may cast spells this turn as though they had flash.
    abilities: {
      grant_flash: {
        label: '{1}, {T}, Sacrifice: Spells have flash this turn',
        fn(state, perm) {
          if (perm.tapped) return [];
          const ap = state.payMana('1'); if (!ap) return [];
          let s = ap.tapPermanent(perm.id); if (!s) return [];
          s = s.removeFromBattlefield(perm.id, 'graveyard'); if (!s) return [];
          // Set flashThisTurn flag — all spells can be cast as though they had flash
          s = s.clone();
          s.flashThisTurn = true;
          return [s.log('Emergence Zone: sacrifice, all spells have flash this turn')];
        },
      },
    },
  },
  boseiju: {
    name: 'Boseiju, Who Endures', types: ['land'], subtypes: ['Legendary'], cost: null,
    tapForMana: simpleTap('{G}', [['G',1]]),
    // Channel — {1}{G}, Discard this card: Destroy target artifact, enchantment, or
    // nonbasic land. This spell can't be countered. Cost reduced by {1} for each
    // legendary creature you control.
    // Modelled as a handAbility (discard from hand).
    handAbilities: {
      channel: {
        label: 'Channel {1}{G}: Discard Boseiju → destroy artifact/enchantment/nonbasic land',
        fn(state, cardKey) {
          // Count legendary creatures for cost reduction ({1} per legend)
          const legendCount = state.battlefield.filter(p =>
            p.is('creature') && (p.types.includes('legendary') || p.name.includes(','))
          ).length;
          const reducedCost = Math.max(0, 1 - legendCount); // {1}{G} base, {1} off per legend
          const costStr = reducedCost === 0 ? 'G' : '1G';
          const ap = state.payMana(costStr); if (!ap) return [];
          // Remove Boseiju from hand as the discard cost
          const s0 = ap.removeFromHand(cardKey); if (!s0) return [];
          // Find valid targets: artifacts, enchantments, nonbasic lands on the battlefield
          const targets = s0.battlefield.filter(p =>
            p.is('artifact') || p.is('enchantment') ||
            (p.is('land') && !p.subtypes?.includes('Basic'))
          );
          if (targets.length === 0) return [];
          return targets.map(target => {
            const s = s0.removeFromBattlefield(target.id, 'graveyard');
            return s ? s.log(`Boseiju channel: → destroy ${target.name}`) : null;
          }).filter(Boolean);
        },
      },
    },
  },

  war_room: {
    name: 'War Room', types: ['land'], subtypes: [], cost: null,
    tapForMana: simpleTap('{C}', [['C',1]]),
    // {3}, {T}, Pay 1 life per color in commander's color identity: Draw a card.
    // Yeva is mono-green, so cost = {3}, {T}, pay 1 life. Only activatable if
    // you control a creature with power 4 or greater.
    abilities: {
      draw: {
        label: '{3}, {T}, Pay 1 life: Draw a card (requires creature with power ≥ 4)',
        fn(state, perm) {
          if (perm.tapped) return [];
          // Requires a creature with power 4 or greater
          const hasPower4 = state.battlefield.some(p =>
            p.is('creature') && (p.power ?? 0) >= 4
          );
          if (!hasPower4) return [];
          const ap = state.payMana('3'); if (!ap) return [];
          let s = ap.tapPermanent(perm.id); if (!s) return [];
          if (s.life <= 1) return []; // would die from the life payment
          s = s.clone(); s.life -= 1;
          s = s.playerDraws(0, 1);
          return [s.log('War Room: {3}, tap, pay 1 life → draw a card')];
        },
      },
    },
  },
  talon_gates: {
    name: 'Talon Gates of Madara', types: ['land'], subtypes: ['Gate'], cost: null,
    tapForMana: simpleTap('{C}', [['C',1]]),
    // {1}, {T}: Add one mana of any color.
    // {4}: You may put this card from your hand onto the battlefield.
    // The hand-play ability is unusual; model it as a handAbility.
    abilities: {
      tap_any_color: {
        label: '{1}, {T}: Add one mana of any color',
        fn(state, perm) {
          if (perm.tapped) return [];
          const ap = state.payMana('1'); if (!ap) return [];
          const at = ap.tapPermanent(perm.id); if (!at) return [];
          // Offer G, C, W, U, B, R options — in this deck G and C are relevant
          return ['G','C','W','U','B','R'].map(color => {
            const s = at.addMana(color);
            return s.log(`Talon Gates: {1},{T} → {${color}}`);
          });
        },
      },
    },
    handAbilities: {
      play_for_four: {
        label: '{4}: Put Talon Gates from hand onto battlefield',
        fn(state, cardKey) {
          const ap = state.payMana('4'); if (!ap) return null;
          const s0 = ap.removeFromHand(cardKey); if (!s0) return null;
          const s = s0.enterBattlefield(cardKey);
          return s.log('Talon Gates: {4} from hand → battlefield');
        },
      },
    },
  },
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
            var cards = CARDS;
            const cardName = cards[cardKey]?.name ?? cardKey;
            ns = ns.log(`Geier Reach Sanitarium: each player draws then discards (you discard ${cardName})`);
            results.push(ns);
          }
          return results;
        },
      },
    },
  },
  bonders_enclave: {
    name: "Bonders' Enclave", types: ['land'], subtypes: [], cost: null,
    tapForMana: simpleTap('{C}', [['C',1]]),
    // {3}, {T}: Draw a card. Activate only if you control a creature with power 4 or greater.
    abilities: {
      draw: {
        label: '{3}, {T}: Draw a card (requires creature with power ≥ 4)',
        fn(state, perm) {
          if (perm.tapped) return [];
          const hasPower4 = state.battlefield.some(p =>
            p.is('creature') && (p.power ?? 0) >= 4
          );
          if (!hasPower4) return [];
          const ap = state.payMana('3'); if (!ap) return [];
          let s = ap.tapPermanent(perm.id); if (!s) return [];
          s = s.playerDraws(0, 1);
          return [s.log("Bonders' Enclave: {3}, tap → draw a card")];
        },
      },
    },
  },
  mikokoro: {
    name: 'Mikokoro, Center of the Sea', types:['land'], subtypes:['Legendary'], cost: null,
    tapForMana: simpleTap('{C}', [['C',1]]),
    // {2}, {T}: Each player draws a card.
    // In the Hitzel mill loop this is activated repeatedly (opponents mill via Endurance shuffle).
    // In the solver we model it as: pay {2}, tap → you draw a card (opponents drawing is not tracked).
    abilities: {
      group_draw: {
        label: '{2}, {T}: Each player draws a card',
        fn(state, perm) {
          if (perm.tapped) return [];
          const ap = state.payMana('2'); if (!ap) return [];
          const at = ap.tapPermanent(perm.id); if (!at) return [];
          const s = at.playerDraws(0, 1);
          return [s.log('Mikokoro: {2}, tap → draw a card (each player draws)')];
        },
      },
    },
  },

  abstergo_entertainment: {
    name: 'Abstergo Entertainment', types: ['land'], subtypes: ['Legendary'], cost: null,
    // {T}: Add {C}.
    // {1}, {T}: Add one mana of any color.
    // {3}, {T}, Exile Abstergo Entertainment: Return up to one target historic card from your
    //   graveyard to your hand, then exile all graveyards.
    //   (Artifacts, legendaries, and Sagas are historic.)
    tapForMana: simpleTap('{C}', [['C', 1]]),
    abilities: {
      tap_any_color: {
        label: '{1}, {T}: Add one mana of any color',
        fn(state, perm) {
          if (perm.tapped || perm.summoningSick) return [];
          const afterPay = state.payMana('1');
          if (!afterPay) return [];
          let s = afterPay.tapPermanent(perm.id);
          if (!s) return [];
          s = s.addMana('G'); // model as {G} for solver purposes
          return [s.log('Abstergo Entertainment: {1},{T} → {G}')];
        },
      },
      animus_recall: {
        label: '{3}, {T}, Exile self: Return historic card from graveyard to hand, exile all graveyards',
        fn(state, perm) {
          if (perm.tapped || perm.summoningSick) return [];
          const afterPay = state.payMana('3');
          if (!afterPay) return [];
          let s = afterPay.tapPermanent(perm.id);
          if (!s) return [];

          // Exile Abstergo Entertainment itself from the battlefield
          s = s.removeFromBattlefield(perm.id, 'exile');
          if (!s) return [];

          var cards = CARDS;

          // Identify "historic" cards in your graveyard:
          // legendary supertype, artifact card type, or Saga subtype
          const gy = s.players[0].graveyard;
          const historicInGY = gy.filter(cardName => {
            const ck = NAME_TO_KEY[cardName];
            if (!ck) return false;
            const def = cards[ck];
            if (!def) return false;
            const isLegendary = def.subtypes?.includes('Legendary') ||
              // Legendary creatures have 'Legendary' in their effective type — check cost context
              // Also check the key against known legendary creatures in this deck
              LEGENDARY_CREATURE_KEYS.has(ck);
            const isArtifact = def.types?.includes('artifact');
            const isSaga = def.subtypes?.includes('Saga');
            return isLegendary || isArtifact || isSaga;
          });

          // Helper: exile all graveyards
          function exileAllGraveyards(gs) {
            let ns = gs.clone();
            for (let pi = 0; pi < ns.players.length; pi++) {
              const p = ns.players[pi].clone();
              for (const cardName of p.graveyard) p.exile = [...p.exile, cardName];
              p.graveyard = [];
              ns.players[pi] = p;
            }
            return ns;
          }

          const results = [];

          if (historicInGY.length === 0) {
            // No historic target — still legal; just exile all graveyards
            let ns = exileAllGraveyards(s);
            ns = ns.log('Abstergo Entertainment: no historic target, exile all graveyards');
            results.push(ns);
          } else {
            // Generate one result per historic card we could return
            const present = new Set(s.hand);
            for (const p of s.battlefield) {
              const ck = NAME_TO_KEY[p.name];
              if (ck) present.add(ck);
            }

            // Score each candidate by how many combos it completes
            const scored = historicInGY.map(cardName => {
              const ck = NAME_TO_KEY[cardName];
              let score = 0;
              for (const required of COMBO_REQUIRED_KEYS) {
                if (!required.includes(ck)) continue;
                const missing = required.filter(k => !present.has(k)).length;
                if (missing <= 2) score += (3 - missing) * 10;
              }
              return { cardName, ck, score };
            });

            // Sort descending by score; only generate result for top candidate
            // (avoids branching explosion while still finding best target)
            scored.sort((a, b) => b.score - a.score);
            const best = scored[0];
            const ck = best.ck;

            // Build state: add the card to hand first, THEN exile all graveyards
            let ns = s.clone();
            // Remove from graveyard
            ns._ensurePlayers();
            ns.players[0] = ns.players[0].clone();
            const gyIdx = ns.players[0].graveyard.indexOf(best.cardName);
            if (gyIdx !== -1) {
              ns.players[0].graveyard = [
                ...ns.players[0].graveyard.slice(0, gyIdx),
                ...ns.players[0].graveyard.slice(gyIdx + 1),
              ];
            }
            ns = ns.addToHand(ck);
            ns = exileAllGraveyards(ns);
            ns = ns.log(`Abstergo Entertainment: return ${best.cardName} to hand, exile all graveyards`);
            results.push(ns);
          }

          return results;
        },
      },
    },
  },
  urza_cave: {
    name: "Urza's Cave", types: ['land'], subtypes: [], cost: null,
    tapForMana: simpleTap('{C}', [['C',1]]),
    // {3}, {T}, Sacrifice Urza's Cave: Search your library for a land card,
    // put it onto the battlefield tapped, then shuffle.
    abilities: {
      sac_tutor: {
        label: "{3}, {T}, Sacrifice Urza's Cave: Search library for a land → battlefield tapped",
        fn(state, perm) {
          if (perm.tapped) return [];
          const ap = state.payMana('3'); if (!ap) return [];
          // Remove Urza's Cave from battlefield (sacrifice)
          const at = ap.removeFromBattlefield(perm.id, 'graveyard'); if (!at) return [];
          // Search library for any land
          var cards = CARDS;
          const library = at.players[0].library;
          const landKeys = [...new Set(library)].filter(k => {
            const def = cards[k];
            return def?.types?.includes('land');
          });
          if (landKeys.length === 0) return [at.log("Urza's Cave: sac → no land in library")];
          const results = [];
          for (const k of landKeys) {
            const { state: ns, cardKey: found } = at.searchLibraryFor(lk => lk === k);
            if (!found) continue;
            const s = ns.enterBattlefield(found, { tapped: true });
            results.push(s.log(`Urza's Cave: sac → ${cards[k].name} enters tapped`));
          }
          return results;
        },
      },
    },
  },
  ominous_cemetery:    { name: 'Ominous Cemetery',           types: ['land'], subtypes: [], cost: null, tapForMana: simpleTap('{C}', [['C',1]]) },
  mariposa_military:   { name: 'Mariposa Military Base',     types: ['land'], subtypes: [], cost: null, tapForMana: simpleTap('{C}', [['C',1]]) },

  // Gemstone Caverns: If Gemstone Caverns is in your opening hand and you're
  // not the starting player, you may begin the game with it on the battlefield
  // with a luck counter on it. {T}: Add {C}. If Gemstone Caverns has a luck
  // counter on it, instead add one mana of any color.
  // In the solver, we model it as: taps for any color (the luck counter path),
  // representing the optimal opening-hand scenario where it accelerates mana.
  // If it enters normally (no luck counter), it taps for {C} only.
  gemstone_caverns: {
    name: 'Gemstone Caverns', types: ['land'], subtypes: [], cost: null,
    tapForMana(state, perm) {
      if (perm.tapped) return [];
      const results = [];
      // With luck counter (opening hand accelerant): tap for any color
      if (perm.luckCounter) {
        for (const color of ['G', 'C']) {
          let s = state.tapPermanent(perm.id); if (!s) continue;
          s = s.addMana(color);
          results.push(s.log(`Tap Gemstone Caverns (luck counter) → {${color}}`));
        }
      } else {
        // No luck counter: taps for {C}
        let s = state.tapPermanent(perm.id); if (!s) return [];
        s = s.addMana('C');
        results.push(s.log('Tap Gemstone Caverns → {C}'));
      }
      return results;
    },
    abilities: {
      // Setup ability: exile a card from hand to place a luck counter.
      // Represents the pre-game option when not going first.
      place_luck_counter: {
        label: 'Exile a card: put a luck counter on Gemstone Caverns',
        fn(state, perm) {
          if (perm.luckCounter) return []; // already has counter
          var { isStax: _isStax } = _CDM;
          // Only exile non-key cards (stax or surplus hand cards)
          const exileCandidates = [...new Set(state.hand)].filter(k => _isStax(k));
          const results = [];
          for (const card of exileCandidates) {
            let s = state.discardFromHand(card, 'Gemstone Caverns exile cost'); if (!s) continue;
            // Mark perm as having a luck counter using proper Permanent mutation
            s = s.clone();
            s._ensureBF();
            const idx = s.battlefield.findIndex(p => p.id === perm.id);
            if (idx < 0) continue;
            // Use clone+mutate to preserve Permanent class methods (NOT object spread)
            const updated = s.battlefield[idx].clone();
            updated.luckCounter = true;
            s.battlefield = [...s.battlefield];
            s.battlefield[idx] = updated;
            results.push(s.log(`Gemstone Caverns: exile ${card} → luck counter`));
          }
          return results;
        },
      },
    },
  },

  // Maze of Ith: {T}: Untap target attacking creature. Prevent all combat
  // damage that would be dealt to and dealt by that creature this turn.
  // In the solver context, the key use is its untap ability which enables
  // the classic Maze of Ith + Argothian Elder / Ley Weaver infinite mana loop:
  //   1. Tap Elder/Weaver to untap Maze of Ith + another land (e.g. Cradle)
  //   2. Tap Maze to untap Elder/Weaver
  //   3. Repeat → net mana from the other land each iteration
  // Maze does NOT tap for mana. Its tap ability targets an attacking creature,
  // but we model the combo use: tapping Maze to untap a creature.
  maze_of_ith: {
    name: 'Maze of Ith', types: ['land'], subtypes: [], cost: null,
    // Maze does not tap for mana
    tapForMana(state, perm) { return []; },
    abilities: {
      untap_creature: {
        label: '{T}: Untap target creature (Maze of Ith)',
        fn(state, perm) {
          if (perm.tapped) return [];
          const results = [];
          // Untap any tapped creature — models the Argothian Elder / Ley Weaver loop
          for (const c of state.creatures().filter(c => c.tapped)) {
            let s = state.tapPermanent(perm.id); if (!s) continue;
            s = s.untapPermanent(c.id);
            results.push(s.log(`Maze of Ith → untap ${c.name}`));
          }
          return results;
        },
      },
    },
  },

  havenwood_battleground: {
    name: 'Havenwood Battleground', types: ['land'], subtypes: [], cost: null,
    // Enters tapped. {T}: Add {G}. {T}, Sacrifice: Add {G}{G}{G}.
    tapForMana: simpleTap('{G}', [['G', 1]]),
    abilities: {
      sac_for_mana: {
        label: '{T}, Sacrifice Havenwood Battleground: Add {G}{G}{G}',
        fn(state, perm) {
          if (perm.tapped) return [];
          let s = state.tapPermanent(perm.id); if (!s) return [];
          s = s.removeFromBattlefield(perm.id, 'graveyard');
          if (!s) return [];
          s = s.addMana('G', 3);
          return [s.log('Havenwood Battleground: {T}, sacrifice → {G}{G}{G}')];
        },
      },
    },
  },

  tranquil_thicket: {
    name: 'Tranquil Thicket', types: ['land'], subtypes: ['Forest'], cost: null,
    // Enters tapped. {T}: Add {G}. Cycling {G}: discard, draw a card.
    isForest: true,
    tapForMana: simpleTap('{G}', [['G', 1]]),
    handAbilities: {
      cycling: {
        label: 'Cycling {G}: Discard Tranquil Thicket → draw a card',
        fn(state, cardKey) {
          const ap = state.payMana('G'); if (!ap) return [];
          let s = ap.discardFromHand(cardKey, 'cycling cost'); if (!s) return [];
          s = s.playerDraws(0, 1);
          return [s.log('Cycling Tranquil Thicket → draw a card')];
        },
      },
    },
  },

  // ─── ARTIFACTS ───────────────────────────────────────────────────────────

  sol_ring: { name: 'Sol Ring', types: ['artifact'], subtypes: [], cost: '1', tapForMana: simpleTap('{C}{C}', [['C',2]]) },

  lightning_greaves: {
    name: 'Lightning Greaves', types: ['artifact'], subtypes: ['Equipment'], cost: '2',
    // Oracle: Equipped creature has haste and shroud.
    // Equip {0}.
    //
    // Key combo role: lets a just-cast creature immediately tap for mana by
    // removing its summoning sickness. Equip cost is {0} so it's always affordable.
    // Shroud is not modelled (no targeting in the solver).
    // Only useful to equip onto a summoning-sick creature — skip others.
    abilities: {
      equip: {
        label: 'Equip {0}: Give a creature haste (remove summoning sickness)',
        fn(state, perm) {
          const results = [];
          for (const c of state.creatures().filter(c => c.summoningSick)) {
            let s = state.clone();
            s._ensureBF();
            const target = s.battlefield.find(p => p.id === c.id);
            if (target) { target.summoningSick = false; }
            results.push(s.log(`Lightning Greaves → equip ${c.name} (gains haste)`));
          }
          return results;
        },
      },
    },
  },

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

  mox_diamond: {
    name: 'Mox Diamond', types: ['artifact'], subtypes: [], cost: '0',
    tapForMana: simpleTap('{any}', [['G',1]]),
    // Oracle: If this would enter, you may discard a land card instead.
    // If you do, put it onto the battlefield. If you don't, put it into its owner's graveyard.
    // Modeled as castFn: must discard a land from hand or it goes to graveyard.
    castFn(state) {
      var cards = CARDS;
      const results = [];
      // Find lands in hand (after removing Mox Diamond itself)
      const handWithout = state.hand.filter((k, i) => i !== state.hand.indexOf('mox_diamond'));
      const landKeys = [...new Set(handWithout)].filter(k => {
        const d = cards[k];
        return d && d.types.includes('land');
      });
      if (landKeys.length > 0) {
        for (const lk of landKeys) {
          let s = state.clone();
          // Discard the land
          s = s.discardFromHand(lk, 'Mox Diamond discard cost');
          if (!s) continue;
          // Mox Diamond enters the battlefield (it was already removed from hand by the cast action wrapper)
          s = s.enterBattlefield('mox_diamond');
          const landName = cards[lk]?.name ?? lk;
          results.push(s.log(`Mox Diamond: discard ${landName}, enters battlefield`));
        }
      }
      // Option: don't discard — Mox Diamond goes to graveyard instead
      {
        let s = state.addToGraveyard(0, 'Mox Diamond');
        results.push(s.log('Mox Diamond: no land discarded, goes to graveyard'));
      }
      return results;
    },
  },
  chrome_mox: {
    name: 'Chrome Mox', types: ['artifact'], subtypes: [], cost: '0',
    // Imprint — ETB: may exile a nonartifact, nonland card from hand.
    // {T}: Add one mana of any of the exiled card's colors.
    // Implemented via ETB hook in GameState.enterBattlefield (sets perm.imprintedColor).
    tapForMana(state, perm) {
      if (perm.tapped || perm.summoningSick) return [];
      const color = perm.imprintedColor;
      if (!color) return []; // no imprint → can't tap for mana
      const s = state.tapPermanent(perm.id);
      if (!s) return [];
      return [s.addMana(color).log(`Tap Chrome Mox → {${color}}`)];
    },
  },

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
          var cards = CARDS;
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
  agatha_cauldron: {
    name: "Agatha's Soul Cauldron", types: ['artifact'], subtypes: ['Legendary'], cost: '2',
    // (1) You may spend mana as though it were any color to activate creature abilities.
    //     → modeled implicitly (solver treats all mana as fungible for activated abilities).
    // (2) Creatures you control with +1/+1 counters have activated abilities of
    //     exiled creature cards. → modeled: when Cauldron exiles a creature, the
    //     best activated ability is grafted onto creatures with counters.
    // (3) {T}: Exile target creature card from any graveyard; put a +1/+1 counter
    //     on a creature you control.
    abilities: {
      exile_and_counter: {
        label: '{T}: Exile creature from graveyard; put +1/+1 counter on a creature you control',
        fn(state, perm) {
          if (perm.tapped) return [];
          // Find creature cards in any graveyard (we model only player 0's graveyard)
          const gy = state.players[0].graveyard ?? [];
          var cards = CARDS;
          const gyCreatures = [...new Set(gy)].filter(name => {
            const key = Object.keys(cards).find(k => cards[k]?.name === name);
            return key && cards[key]?.types?.includes('creature');
          });
          if (gyCreatures.length === 0) return [];
          const creatures = state.battlefield.filter(p => p.is('creature'));
          if (creatures.length === 0) return [];
          const results = [];
          const at = state.tapPermanent(perm.id); if (!at) return [];
          for (const gyName of gyCreatures) {
            const gyKey = Object.keys(cards).find(k => cards[k]?.name === gyName);
            // Remove from graveyard
            let s = at.clone(); s._ensurePlayers();
            s.players[0] = s.players[0].clone();
            const idx = s.players[0].graveyard.indexOf(gyName);
            if (idx < 0) continue;
            s.players[0].graveyard = [...s.players[0].graveyard];
            s.players[0].graveyard.splice(idx, 1);
            // Add to exile
            s = s.clone(); s.exile = [...(s.exile ?? []), gyName];
            // Put +1/+1 counter on the best creature (most powerful)
            s._ensureBF();
            const best = s.battlefield.filter(p => p.is('creature'))
              .sort((a,b) => (b.power??0) - (a.power??0))[0];
            if (best) {
              best.power = (best.power ?? 0) + 1;
              best.toughness = (best.toughness ?? 0) + 1;
              best.counters = (typeof best.counters === 'number' ? best.counters : 0) + 1;
              // Graft the exiled creature's activated abilities onto countered creatures
              if (gyKey) best.cauldronAbilityKey = gyKey;
            }
            results.push(s.log(`Agatha's Cauldron: exile ${gyName} from GY → +1/+1 counter on ${best?.name ?? 'creature'}`));
          }
          return results;
        },
      },
    },
  },
  emerald_medallion: { externallyImplemented: true, name: 'Emerald Medallion', types: ['artifact'], subtypes: [], cost: '2', costReduction: { color: 'G', amount: 1 } },
  null_rod:         { externallyImplemented: true, name: 'Null Rod',          types: ['artifact'], subtypes: [], cost: '2' },
  thorn_of_amethyst:{ externallyImplemented: true, name: 'Thorn of Amethyst', types: ['artifact'], subtypes: [], cost: '2' },
  trinisphere:      { externallyImplemented: true, name: 'Trinisphere',        types: ['artifact'], subtypes: [], cost: '3' },
  orb_of_dreams:    { externallyImplemented: true, name: 'Orb of Dreams',      types: ['artifact'], subtypes: [], cost: '3' },

  // Chalice of the Void: Cast with X charge counters. Counters all spells with
  // CMC equal to X. Modeled as a stax piece — the solver won't self-cast it,
  // but recognises it as a hate piece when placed on the battlefield by tests/setup.
  // Most impactful at X=1 (hits almost all 1-drop mana dorks, cantrips, tutors).
  chalice_of_the_void: {
    name: 'Chalice of the Void', types: ['artifact'], subtypes: [], cost: 'XX',
    externallyImplemented: true,  // [drift-detector] impl in GameState/actions/combos
    // chargeCounters stored on the permanent at placement time (default 1)
    // Static effect modelled in effectiveCost / action generation (see actions.js)
  },

  // Disruptor Flute: {2}, enters naming a card. Activated abilities of permanents
  // with that name cost {3} more. Modeled as a generic stax artifact — the solver
  // will not cast or fetch it, but it suppresses opponent engines when placed.
  disruptor_flute: {
    name: 'Disruptor Flute', types: ['artifact'], subtypes: [], cost: '2',
    externallyImplemented: true,  // [drift-detector] impl in GameState/actions/combos
    // Named card tracked in perm.namedCard at placement; no active ability in solver.
  },
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

  lifecrafters_bestiary: {
    name: "Lifecrafter's Bestiary", types: ['artifact'], subtypes: [], cost: '3',
    // At the beginning of your upkeep, scry 1.
    // Whenever you cast a creature spell, you may pay {G}. If you do, draw a card.
    // Scry is not tracked in the solver (no library order manipulation).
    // The draw trigger is modeled in actions.js cast_spell (pay {G} draw a card).
    externallyImplemented: true,  // [drift-detector] draw trigger in actions.js cast_spell
  },

  // ─── CREATURES — Mana Dorks ───────────────────────────────────────────────

  llanowar_elves:  { name: 'Llanowar Elves',  types:['creature'], subtypes:['Elf','Druid'],   cost:'G',   power:1,toughness:1, tapForMana: simpleTap('{G}',[['G',1]]) },
  elvish_mystic:   { name: 'Elvish Mystic',   types:['creature'], subtypes:['Elf','Druid'],   cost:'G',   power:1,toughness:1, tapForMana: simpleTap('{G}',[['G',1]]) },
  fyndhorn_elves:  { name: 'Fyndhorn Elves',  types:['creature'], subtypes:['Elf','Druid'],   cost:'G',   power:1,toughness:1, tapForMana: simpleTap('{G}',[['G',1]]) },
  boreal_druid:    { name: 'Boreal Druid',    types:['creature'], subtypes:['Elf','Druid'],   cost:'G',   power:1,toughness:1, tapForMana: simpleTap('{C}',[['C',1]]) },
  birds_of_paradise:{ name:'Birds of Paradise',types:['creature'],subtypes:['Bird'],           cost:'G',   power:0,toughness:1, tapForMana: simpleTap('{any}',[['G',1]]) },
  delighted_halfling:{ name:'Delighted Halfling',types:['creature'],subtypes:['Halfling','Citizen'],cost:'G',power:1,toughness:1, tapForMana: simpleTap('{C}',[['C',1]]) },
  joraga_treespeaker: {
    name: 'Joraga Treespeaker', types:['creature'], subtypes:['Elf','Druid'],
    cost:'G', power:1, toughness:1,
    // Level 0 (base): {T}: Add {G}
    // Level 1-4:      {T}: Add {G}{G}  — power becomes 1/2
    // Level 5+:       {T}: Add {G}{G}; all Elves you control gain "{T}: Add {G}{G}"
    // Level-up cost: {1}{G} (sorcery speed). We model the first level-up action
    // so the solver can invest mana when it anticipates needing a big dork.
    tapForMana(state, perm) {
      if (perm.tapped || perm.summoningSick) return [];
      const lvl = perm.levelCounters ?? 0;
      const manaAmt = lvl >= 1 ? 2 : 1;
      const color   = 'G';
      const s = state.tapPermanent(perm.id);
      let ns = s;
      ns = ns.addMana(color, manaAmt);
      return [ns.log(`Tap Joraga Treespeaker (lv${lvl}) → {${color.repeat(manaAmt)}}`)];
    },
    abilities: {
      level_up: {
        label: '{1}{G}: Level up Joraga Treespeaker (sorcery speed)',
        fn(state, perm) {
          // Only at sorcery speed (active player's main phase, stack empty — solver
          // enforces timing via castFn sorcery flag; abilities marked levelUp are
          // treated as sorcery-speed in generateActions).
          if (perm.tapped || perm.summoningSick) return [];
          const lvl = perm.levelCounters ?? 0;
          if (lvl >= 5) return []; // already at max
          const ns = state.payMana('1G');
          if (!ns) return [];
          const updated = ns.clone();
          updated._ensureBF();
          const p = updated.battlefield.find(b => b.id === perm.id);
          if (p) {
            p.levelCounters = lvl + 1;
            // Adjust power/toughness per level bracket
            if (lvl + 1 >= 5)       { p.power = 1; p.toughness = 4; }
            else if (lvl + 1 >= 1)  { p.power = 1; p.toughness = 2; }
          }
          return [updated.log(`Joraga Treespeaker: level up (lv${lvl} → lv${lvl+1})`)];
        },
      },
    },
  },
  allosaurus_shepherd: {
    name: 'Allosaurus Shepherd', types: ['creature'], subtypes: ['Elf','Shaman'],
    cost: 'G', power: 1, toughness: 1,
    // Uncounterable, green spells uncounterable. {4GG}: Elves become 5/5 Dinosaurs.
    abilities: {
      dino_pump: {
        label: '{4}{G}{G}: Elves become 5/5 Dinosaurs until EOT',
        fn(state, perm) {
          // Activated ability with no tap cost — legal on a sick Shepherd.
          // See ToDo C-33 audit.
          const ap = state.payMana('4GG'); if (!ap) return [];
          const s = ap.clone();
          s._ensureBF();
          for (const bf of s.battlefield) {
            if (bf.subtypes && bf.subtypes.includes('Elf')) {
              bf.power = 5; bf.toughness = 5;
              if (!bf.subtypes.includes('Dinosaur')) bf.subtypes = [...bf.subtypes, 'Dinosaur'];
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
    // Oracle: {2}, Sacrifice this creature: Choose one —
    // • Destroy target artifact.
    // • Destroy target enchantment.
    // • Draw a card. Then you may put a land card from your hand onto the battlefield tapped.
    abilities: {
      sac_destroy_artifact: {
        label: '{2}, Sacrifice: Destroy target artifact',
        fn(state, perm) {
          const ap = state.payMana('2'); if (!ap) return [];
          let s = ap.removeFromBattlefield(perm.id, 'graveyard'); if (!s) return [];
          // Enumerate artifact targets on the battlefield (yours or opponents')
          const artifacts = s.battlefield.filter(p => p.types.includes('artifact'));
          if (artifacts.length === 0) return [];
          const results = [];
          for (const art of artifacts) {
            let ns = s.removeFromBattlefield(art.id, 'graveyard');
            if (ns) results.push(ns.log(`Insidious Fungus: sacrifice, destroy ${art.name}`));
          }
          return results;
        },
      },
      sac_destroy_enchantment: {
        label: '{2}, Sacrifice: Destroy target enchantment',
        fn(state, perm) {
          const ap = state.payMana('2'); if (!ap) return [];
          let s = ap.removeFromBattlefield(perm.id, 'graveyard'); if (!s) return [];
          const enchantments = s.battlefield.filter(p => p.types.includes('enchantment'));
          if (enchantments.length === 0) return [];
          const results = [];
          for (const enc of enchantments) {
            let ns = s.removeFromBattlefield(enc.id, 'graveyard');
            if (ns) results.push(ns.log(`Insidious Fungus: sacrifice, destroy ${enc.name}`));
          }
          return results;
        },
      },
      sac_draw_land: {
        label: '{2}, Sacrifice: Draw a card, then put a land from hand onto battlefield tapped',
        fn(state, perm) {
          var cards = CARDS;
          const ap = state.payMana('2'); if (!ap) return [];
          let s = ap.removeFromBattlefield(perm.id, 'graveyard'); if (!s) return [];
          s = s.playerDraws(0, 1);
          // Option A: just draw (don't put a land)
          const results = [s.log('Insidious Fungus: sacrifice, draw a card')];
          // Option B: put a land from hand onto the battlefield tapped
          const landKeys = [...new Set(s.hand)].filter(k => {
            const d = cards[k];
            return d && d.types.includes('land');
          });
          for (const lk of landKeys) {
            let ns = s.removeFromHand(lk);
            if (!ns) continue;
            ns = ns.enterBattlefield(lk, { tapped: true });
            const landName = cards[lk]?.name ?? lk;
            results.push(ns.log(`Insidious Fungus: sacrifice, draw a card, put ${landName} onto battlefield tapped`));
          }
          return results;
        },
      },
    },
  },
  treefolk_harbinger: {
    externallyImplemented: true,  // [drift-detector] ETB in GameState.enterBattlefield
    name: 'Treefolk Harbinger', types:['creature'], subtypes:['Treefolk','Druid'], cost:'G', power:1,toughness:1,
    // ETB: search library for a Treefolk or Forest-subtype card, reveal it, put on top.
    // Implemented in GameState.enterBattlefield (deterministic: best TUTOR_PRIORITY_SCORE match).
    // cards.js onEnter removed (2026-05-12) to prevent double-fire when cast via actions.js.
  },
    elvish_reclaimer: {
    name: 'Elvish Reclaimer', types: ['creature'], subtypes: ['Elf','Warrior'], cost: 'G',
    power: 1, toughness: 1,
    // Oracle: {2},{T}, Sacrifice a land: Search library for a land, put it onto the battlefield tapped.
    // Key use: fetch Gaea's Cradle, Nykthos, Deserted Temple, War Room, etc.
    abilities: {
      fetch_land: {
        label: '{2},{T}: Sac a land → fetch land from library',
        fn(state, perm) {
          if (perm.tapped || perm.summoningSick) return [];
          const ap = state.payMana('2'); if (!ap) return [];
          const tapped = ap.tapPermanent(perm.id); if (!tapped) return [];
          const lands = tapped.lands().filter(l => l.id !== perm.id);
          if (lands.length === 0) return [];
          var cards = CARDS;
          // Sacrifice cheapest/least-valuable land
          const KEEP_LANDS = new Set(['gaeas_cradle','nykthos','deserted_temple','ancient_tomb']);
          const sacLand = lands.find(l => !KEEP_LANDS.has(NAME_TO_KEY[l.name])) ?? lands[0];
          let s = tapped.removeFromBattlefield(sacLand.id, 'graveyard');
          if (!s) return [];
          // Fetch highest-priority land from library
          const present = new Set(s.hand);
          for (const p of s.battlefield) { const k = NAME_TO_KEY[p.name]; if (k) present.add(k); }
          let bestKey = null, bestScore = -1;
          for (const ck of s.players[0].library) {
            if (ck === 'unknown') continue;
            const def = cards[ck];
            if (!def?.types.includes('land')) continue;
            const score = TUTOR_PRIORITY_SCORE[ck] ?? 1;
            if (score > bestScore && !present.has(ck)) { bestKey = ck; bestScore = score; }
          }
          if (!bestKey) return [s.log('Elvish Reclaimer: no land in library')];
          const { state: ns, cardKey } = s.searchLibraryFor(k => k === bestKey);
          if (!cardKey) return [];
          const ns2 = ns.enterBattlefield(cardKey);
          // Fetched land enters tapped
          const landPerm = ns2.battlefield.find(p => p.name === cards[cardKey].name && !p.tapped);
          if (landPerm) landPerm.tapped = true;
          return [ns2.log(`Elvish Reclaimer: sac ${sacLand.name} → fetch ${cards[cardKey].name}`)];
        },
      },
    },
  },

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
      s = s.addMana('G', n);
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
        if (s2) { s2 = s2.addMana('G', 4); results.push(s2.log(`Tap ${perm.name} (Ferocious) → {G}x4`)); }
      }
      return results;
    },
    // Eternalize {2}{G}{G} — exile from graveyard, create 4/4 black Zombie Snake Druid token copy.
    // Modelled as a graveyard activated ability: pay cost, exile self, enter as 4/4 token.
    graveyardAbilities: {
      eternalize: {
        label: '{2}{G}{G}: Eternalize — exile from graveyard → 4/4 Zombie Snake token',
        fn(state, cardName) {
          // Pay {2}{G}{G}
          const ap = state.payMana('2GG'); if (!ap) return [];
          // Exile from graveyard
          let s = ap.clone(); s._ensurePlayers();
          s.players[0] = s.players[0].clone();
          const idx = s.players[0].graveyard.indexOf(cardName);
          if (idx < 0) return [];
          s.players[0].graveyard = [...s.players[0].graveyard];
          s.players[0].graveyard.splice(idx, 1);
          s = s.clone(); s.exile = [...(s.exile ?? []), cardName];
          // Enter as 4/4 black Zombie Snake Druid token (still taps for mana via copy)
          s = s.enterBattlefield('fanatic_of_rhonas', { power: 4, toughness: 4, isToken: true });
          const token = s.battlefield[s.battlefield.length - 1];
          if (token) {
            token.power = 4; token.toughness = 4; token.isToken = true;
            // [audit] Do NOT force summoningSick=false here. The token enters with
            // summoning sickness like any creature (enterBattlefield sets it), and
            // the static layer there already clears it when a haste enabler is
            // present (Concordant Crossroads / Thousand-Year Elixir / Surrak /
            // Shang-Chi). Forcing it false let the token tap for mana the same
            // turn it was created — illegal absent haste, and a false-mana source.
          }
          return [s.log('Fanatic of Rhonas: Eternalize → 4/4 Zombie Snake token')];
        },
      },
    },
  },

  elvish_archdruid: {
    name: 'Elvish Archdruid', types:['creature'], subtypes:['Elf','Druid'], cost:'1GG', power:2,toughness:2,
    tapForMana(state, perm) {
      if (perm.tapped || perm.summoningSick) return [];
      const n = countElves(state); if (n===0) return [];
      let s = state.tapPermanent(perm.id); if (!s) return [];
      s = s.addMana('G', n);
      return [s.log(`Tap ${perm.name} → {G}x${n} (${n} Elves)`)];
    },
  },

  circle_of_dreams_druid: {
    name: 'Circle of Dreams Druid', types:['creature'], subtypes:['Elf','Druid'], cost:'GGG', power:2,toughness:1,
    tapForMana(state, perm) {
      if (perm.tapped || perm.summoningSick) return [];
      const n = state.creatures().length; if (n===0) return [];
      let s = state.tapPermanent(perm.id); if (!s) return [];
      s = s.addMana('G', n);
      return [s.log(`Tap ${perm.name} → {G}x${n} (${n} creatures)`)];
    },
  },

  karametra_acolyte: {
    name: "Karametra's Acolyte", types:['creature'], subtypes:['Human','Druid'], cost:'3G', power:1,toughness:4,
    tapForMana(state, perm) {
      if (perm.tapped || perm.summoningSick) return [];
      const dev = devotionToGreen(state); if (dev===0) return [];
      let s = state.tapPermanent(perm.id); if (!s) return [];
      s = s.addMana('G', dev);
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
      s = s.addMana('G', maxP);
      return [s.log(`Tap ${perm.name} → {G}x${maxP} (paid {G}, net ${maxP-1}G)`)];
    },
  },

  marwyn: {
    name: 'Marwyn, the Nurturer', types:['creature'], subtypes:['Elf','Druid'], cost:'2G', power:1,toughness:1,
    tapForMana(state, perm) {
      if (perm.tapped || perm.summoningSick) return [];
      const p = perm.power||1; if (p===0) return [];
      let s = state.tapPermanent(perm.id); if (!s) return [];
      s = s.addMana('G', p);
      return [s.log(`Tap ${perm.name} → {G}x${p}`)];
    },
  },

  topiary_lecturer: {
    name: 'Topiary Lecturer', types: ['creature'], subtypes: ['Elf', 'Druid'], cost: '2G', power: 1, toughness: 2,
    // Increment: whenever you cast a spell, if mana spent > this creature's power or toughness,
    // put a +1/+1 counter on it. (Modelled as an on-cast hook in actions.js.)
    // {T}: Add {G} equal to this creature's power.
    tapForMana(state, perm) {
      if (perm.tapped || perm.summoningSick) return [];
      const p = perm.power || 1;
      if (p === 0) return [];
      let s = state.tapPermanent(perm.id);
      if (!s) return [];
      s = s.addMana('G', p);
      return [s.log(`Tap ${perm.name} → {G}x${p}`)];
    },
  },

  wirewood_channeler: {
    name: 'Wirewood Channeler', types:['creature'], subtypes:['Elf','Druid'], cost:'3G', power:2,toughness:2,
    tapForMana(state, perm) {
      if (perm.tapped || perm.summoningSick) return [];
      const n = countElves(state); if (n===0) return [];
      let s = state.tapPermanent(perm.id); if (!s) return [];
      s = s.addMana('G', n);
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
          // Deduplicate: identical tapped lands (e.g. 3 Forests) produce the same
          // state regardless of which specific permanent slot was chosen.
          const seen = new Set();
          return results.filter(r => { const fp = r.fingerprint(); if (seen.has(fp)) return false; seen.add(fp); return true; });
        },
      },
    },
  },

  elvish_harbinger: {
    name:'Elvish Harbinger', types:['creature'], subtypes:['Elf','Druid'], cost:'2G', power:1,toughness:2,
    // ETB: you may search your library for an Elf card, reveal it, then shuffle and put on top.
    // Implemented in GameState.enterBattlefield (deterministic: highest TUTOR_PRIORITY_SCORE Elf).
    // The tap ability is below.
    externallyImplemented: true,  // [drift-detector] ETB in GameState.enterBattlefield
    tapForMana: simpleTap('{any}',[['G',1]]),
  },

  // ─── NEW MANA DORKS (added 2026) ─────────────────────────────────────────

  druid_of_the_cowl: {
    name: 'Druid of the Cowl', types: ['creature'], subtypes: ['Elf', 'Druid'],
    cost: '1G', power: 1, toughness: 2,
    tapForMana: simpleTap('{G}', [['G', 1]]),
  },

  llanowar_tribe: {
    name: 'Llanowar Tribe', types: ['creature'], subtypes: ['Elf', 'Druid'],
    cost: 'GGG', power: 3, toughness: 3,
    tapForMana: simpleTap('{G}{G}{G}', [['G', 3]]),
  },

  paradise_druid: {
    name: 'Paradise Druid', types: ['creature'], subtypes: ['Elf', 'Druid'],
    cost: '1G', power: 2, toughness: 1,
    // Hexproof while untapped (not tracked in solver), {T}: Add one mana of any color.
    tapForMana: simpleTap('{any}', [['G', 1]]),
  },

  leafkin_druid: {
    name: 'Leafkin Druid', types: ['creature'], subtypes: ['Elemental', 'Druid'],
    cost: '1G', power: 0, toughness: 3,
    // {T}: Add {G}. If you control 4+ creatures, add {G}{G} instead.
    // Leafkin Druid itself counts.
    tapForMana(state, perm) {
      if (perm.tapped || perm.summoningSick) return [];
      const s = state.tapPermanent(perm.id); if (!s) return [];
      const creatureCount = s.creatures().length;
      const amt = creatureCount >= 4 ? 2 : 1;
      let ns = s;
      ns = ns.addMana('G', amt);
      return [ns.log(`Tap Leafkin Druid → {G}x${amt} (${creatureCount} creatures)`)];
    },
  },

  ilysian_caryatid: {
    name: 'Ilysian Caryatid', types: ['creature'], subtypes: ['Plant'],
    cost: '1G', power: 0, toughness: 3,
    // {T}: Add one mana of any color. If you control a creature with power 4+, add two mana instead.
    tapForMana(state, perm) {
      if (perm.tapped || perm.summoningSick) return [];
      const s = state.tapPermanent(perm.id); if (!s) return [];
      const hasPower4 = s.creatures().some(c => (c.power ?? 0) >= 4);
      const amt = hasPower4 ? 2 : 1;
      let ns = s;
      ns = ns.addMana('G', amt);
      return [ns.log(`Tap Ilysian Caryatid → {G}x${amt}${hasPower4 ? ' (ferocious)' : ''}`)];
    },
  },

  whisperer_of_the_wilds: {
    name: 'Whisperer of the Wilds', types: ['creature'], subtypes: ['Human', 'Druid'],
    cost: '1G', power: 1, toughness: 2,
    // {T}: Add {G}. Ferocious — {T}: Add {G}{G} if you control a creature with power 4+.
    // Both are mana abilities. Model: always produces the better amount.
    tapForMana(state, perm) {
      if (perm.tapped || perm.summoningSick) return [];
      const s = state.tapPermanent(perm.id); if (!s) return [];
      const hasPower4 = s.creatures().some(c => (c.power ?? 0) >= 4);
      const amt = hasPower4 ? 2 : 1;
      let ns = s;
      ns = ns.addMana('G', amt);
      return [ns.log(`Tap Whisperer of the Wilds → {G}x${amt}${hasPower4 ? ' (ferocious)' : ''}`)];
    },
  },

  wose_pathfinder: {
    name: 'Wose Pathfinder', types: ['creature'], subtypes: ['Treefolk', 'Scout'],
    cost: '1G', power: 1, toughness: 2,
    // {T}: Add {G} for each Forest you control.
    tapForMana(state, perm) {
      if (perm.tapped || perm.summoningSick) return [];
      const s = state.tapPermanent(perm.id); if (!s) return [];
      const forests = s.lands().filter(l => l.isForest || l.subtypes?.includes('Forest')).length;
      if (forests === 0) return [];  // no Forests → no mana, suppress action
      let ns = s;
      ns = ns.addMana('G', forests);
      return [ns.log(`Tap Wose Pathfinder → {G}x${forests} (${forests} Forests)`)];
    },
  },

  armored_scrapgorger: {
    name: 'Armored Scrapgorger', types: ['creature'], subtypes: ['Squirrel'],
    cost: '1G', power: 2, toughness: 2,
    // {T}: Exile up to two target cards from a single graveyard. Add {G} for each artifact exiled.
    // Modeled as a mana ability — taps to exile opponents' artifacts from graveyard for {G} each.
    // Simplified: if any artifact names are in graveyard, exile up to 2 for {G}{G};
    // otherwise tap for {0} (still useful to exile combo pieces from opponent's GY).
    tapForMana(state, perm) {
      if (perm.tapped || perm.summoningSick) return [];
      const s = state.tapPermanent(perm.id); if (!s) return [];
      // Check our own graveyard for artifact cards to exile
      var cards = CARDS;
      const gy = s.players[0].graveyard ?? [];
      const artifactIndices = [];
      for (let i = 0; i < gy.length && artifactIndices.length < 2; i++) {
        const ck = NAME_TO_KEY[gy[i]];
        const def = ck ? cards[ck] : null;
        if (def?.types.includes('artifact')) artifactIndices.push(i);
      }
      const manaAmt = artifactIndices.length;
      if (manaAmt === 0) {
        // No artifacts to exile — still legal (exile 0 nonartifact cards, produce 0 mana)
        // Skip as unhelpful: return [] so the solver doesn't waste actions
        return [];
      }
      // Exile up to 2 artifact cards from graveyard
      let ns = s.clone(); ns._ensurePlayers();
      ns.players[0] = ns.players[0].clone();
      const newGY = [...ns.players[0].graveyard];
      for (let j = artifactIndices.length - 1; j >= 0; j--) {
        newGY.splice(artifactIndices[j], 1);
      }
      ns.players[0].graveyard = newGY;
      ns = ns.addMana('G', manaAmt);
      return [ns.log(`Tap Armored Scrapgorger: exile ${manaAmt} artifact(s) → {G}x${manaAmt}`)];
    },
  },

  somberwald_sage: {
    name: 'Somberwald Sage', types: ['creature'], subtypes: ['Human', 'Druid'],
    cost: '2G', power: 1, toughness: 1,
    // {T}: Add three mana in any combination of colors. Spend only on creature spells.
    // The restriction (creature-only mana) is not modeled in the mana pool,
    // but the solver primarily casts creatures so this is functionally correct.
    tapForMana: simpleTap('{G}{G}{G}', [['G', 3]]),
  },

  // ─── NEW DRAW-ENGINE CREATURES (added 2026) ───────────────────────────────

  elvish_visionary: {
    name: 'Elvish Visionary', types: ['creature'], subtypes: ['Elf', 'Shaman'],
    cost: '1G', power: 1, toughness: 1,
    // ETB: draw a card.
    // Handled in GameState.enterBattlefield.
    externallyImplemented: true,  // ETB draw in GameState.enterBattlefield
  },

  llanowar_visionary: {
    name: 'Llanowar Visionary', types: ['creature'], subtypes: ['Elf', 'Druid'],
    cost: '1GG', power: 2, toughness: 2,
    // ETB: draw a card. {T}: Add {G}.
    externallyImplemented: true,  // ETB draw in GameState.enterBattlefield
    tapForMana: simpleTap('{G}', [['G', 1]]),
  },

  heart_warden: {
    name: 'Heart Warden', types: ['creature'], subtypes: ['Elf', 'Druid'],
    cost: '1G', power: 1, toughness: 1,
    // {T}: Add {G}. / {2}, Sacrifice: Draw a card.
    tapForMana: simpleTap('{G}', [['G', 1]]),
    abilities: {
      sac_draw: {
        label: '{2}, Sacrifice Heart Warden: Draw a card',
        fn(state, perm) {
          const ap = state.payMana('2'); if (!ap) return [];
          let s = ap.removeFromBattlefield(perm.id, 'graveyard');
          if (!s) return [];
          s = s.playerDraws(0, 1);
          return [s.log('Heart Warden: {2}, sacrifice → draw a card')];
        },
      },
    },
  },

  tangled_florahedron: {
    name: 'Tangled Florahedron', types: ['creature'], subtypes: ['Elemental'],
    cost: '1G', power: 1, toughness: 1,
    // Front face: {T}: Add {G}.
    // Back face (land): Tangled Vale — enters tapped, {T}: Add {G}.
    // Modeled: creature face only (land face handled via handAbilities).
    tapForMana: simpleTap('{G}', [['G', 1]]),
    handAbilities: {
      play_as_land: {
        label: 'Play Tangled Florahedron as land (Tangled Vale, enters tapped)',
        fn(state, cardKey) {
          if (state.landDrops <= 0) return [];
          let s = state.removeFromHand(cardKey); if (!s) return [];
          s = s.clone(); s.landDrops--;
          // Enters tapped as "Tangled Vale" — represented as the florahedron perm with tapped:true
          s = s.enterBattlefield(cardKey, { tapped: true, asLand: true });
          // Mark the perm as land face so it doesn't have summoning sickness
          const landPerm = s.battlefield[s.battlefield.length - 1];
          if (landPerm) {
            landPerm.summoningSick = false;
            landPerm.asLand = true;
            // Add Forest subtype so Wose Pathfinder etc. count it
            if (!landPerm.subtypes.includes('Forest')) landPerm.subtypes.push('Forest');
            landPerm.isForest = true;
          }
          return [s.log('Play Tangled Vale (land face, enters tapped)')];
        },
      },
    },
  },

  voice_of_many: {
    name: 'Voice of Many', types: ['creature'], subtypes: ['Elf', 'Warrior'],
    cost: '2GG', power: 3, toughness: 3,
    // ETB: draw a card for each opponent who controls fewer creatures than you.
    // In 1v1 (commander), draw 1 if you have more creatures than opponent.
    // Simplified: always draw 1 (opponent is assumed to have fewer creatures in typical combo lines).
    externallyImplemented: true,  // ETB draw in GameState.enterBattlefield
  },

  timeless_witness: {
    name: 'Timeless Witness', types: ['creature'], subtypes: ['Human', 'Shaman'],
    cost: '2GG', power: 2, toughness: 2,
    // ETB: return target card from graveyard to hand.
    // Eternalize {4}{G}{G}: exile from GY, create 4/4 Zombie token copy.
    externallyImplemented: true,  // ETB return in GameState.enterBattlefield
    graveyardAbilities: {
      eternalize: {
        label: '{4}{G}{G}: Eternalize — exile from graveyard → 4/4 Zombie Human Shaman token',
        fn(state, cardName) {
          const ap = state.payMana('4GG'); if (!ap) return [];
          let s = ap.clone(); s._ensurePlayers();
          s.players[0] = s.players[0].clone();
          const idx = s.players[0].graveyard.indexOf(cardName);
          if (idx < 0) return [];
          s.players[0].graveyard = [...s.players[0].graveyard];
          s.players[0].graveyard.splice(idx, 1);
          s = s.clone(); s.exile = [...(s.exile ?? []), cardName];
          // Enter as 4/4 token (use timeless_witness key; ETB will still fire for graveyard return)
          s = s.enterBattlefield('timeless_witness', { power: 4, toughness: 4, isToken: true });
          const token = s.battlefield[s.battlefield.length - 1];
          if (token) {
            token.power = 4; token.toughness = 4; token.isToken = true;
            // [audit] Token keeps the summoning sickness enterBattlefield assigns
            // (cleared there only under a haste enabler). See Fanatic of Rhonas.
          }
          return [s.log('Timeless Witness: Eternalize → 4/4 Zombie Human Shaman token')];
        },
      },
    },
  },

  // ─── CREATURES — Untappers ────────────────────────────────────────────────

  hope_tender: {
    name: 'Hope Tender', types:['creature'], subtypes:['Human','Druid'], cost:'1G', power:1,toughness:1,
    abilities: {
      untap_one_land: {
        label: '{1}, {T}: Untap target land',
        fn(state, perm) {
          if (perm.tapped || perm.summoningSick) return [];
          if (perm.abilitiesUsed?.untap_one_land) return [];
          // Note: exert_two_lands does NOT block single-untap — an exerted
          // Hope Tender can still use {1},{T} after being untapped mid-turn.
          const ap = state.payMana('1'); if (!ap) return [];
          const at = ap.tapPermanent(perm.id); if (!at) return [];
          const results = [];
          for (const land of at.lands().filter(l => l.tapped)) {
            let s = at.untapPermanent(land.id);
            s = s.markAbilityUsed(perm.id, 'untap_one_land');
            results.push(s.log(`Hope Tender: {1}, tap → untap ${land.name}`));
          }
          return results;
        },
      },
      untap_two_lands: {
        label: '{1}, {T}, Exert: Untap two target lands',
        fn(state, perm) {
          if (perm.tapped || perm.summoningSick) return [];
          // Exert cost: this creature won't untap during your NEXT untap step.
          // This is modelled by preserving exert_two_lands through untapPermanent()
          // and skipping the untap in startNewTurn. It does NOT prevent re-exerting
          // mid-turn if something else (Quirion Ranger, Scryb Ranger, etc.) untaps
          // Hope Tender — perm.tapped is the only gate needed.
          const ap = state.payMana('1'); if (!ap) return [];
          let at = ap.tapPermanent(perm.id); if (!at) return [];
          // Mark exerted — startNewTurn will skip the untap for this permanent.
          at = at.markAbilityUsed(perm.id, 'exert_two_lands');
          const tl = at.lands().filter(l => l.tapped);
          if (tl.length === 0) return [];
          // Build all pairs (or single if only 1 tapped land)
          const pairs = tl.length === 1
            ? [[tl[0]]]
            : tl.flatMap((a, i) => tl.slice(i + 1).map(b => [a, b]));
          const seen = new Set();
          return pairs.flatMap(pair => {
            let s = at;
            for (const land of pair) s = s.untapPermanent(land.id);
            s = s.log(`Hope Tender (exert): {1}, tap → untap ${pair.map(p => p.name).join(' + ')}`);
            const fp = s.fingerprint();
            if (seen.has(fp)) return [];
            seen.add(fp);
            return [s];
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
        'quirion_ranger', 'bounce_forest'
      ),
    },
  },

  scryb_ranger: {
    name: 'Scryb Ranger', types:['creature'], subtypes:['Faerie','Ranger'], cost:'1G', power:1,toughness:1,
    abilities: {
      bounce_forest: bounceToUntap(
        'Return a Forest to hand: Untap a creature (once per turn)',
        p => p.isForest || (p.subtypes && p.subtypes.includes('Forest')),
        'scryb_ranger', 'bounce_forest'
      ),
    },
  },

  wirewood_symbiote: {
    name: 'Wirewood Symbiote', types:['creature'], subtypes:['Insect'], cost:'G', power:1,toughness:1,
    abilities: {
      bounce_elf: bounceToUntap(
        'Return an Elf to hand: Untap a creature (once per turn)',
        p => p.subtypes && p.subtypes.includes('Elf') && p.types && p.types.includes('creature'),
        'wirewood_symbiote', 'bounce_elf'
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
          const seen = new Set();
          return tl.flatMap((a, i) => tl.slice(i + 1).map(b => {
            let s = at.untapPermanent(a.id);
            s = s.untapPermanent(b.id).log(`Argothian Elder → untap ${a.name} + ${b.name}`);
            const fp = s.fingerprint();
            if (seen.has(fp)) return null;
            seen.add(fp);
            return s;
          })).filter(Boolean);
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
          const seen = new Set();
          return tl.flatMap((a, i) => tl.slice(i + 1).map(b => {
            let s = at.untapPermanent(a.id);
            s = s.untapPermanent(b.id).log(`Ley Weaver → untap ${a.name} + ${b.name}`);
            const fp = s.fingerprint();
            if (seen.has(fp)) return null;
            seen.add(fp);
            return s;
          })).filter(Boolean);
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
          const seen = new Set();
          return targets.flatMap(t => {
            let s = ap.tapPermanent(perm.id); if (!s) return [];
            s = s.untapPermanent(t.id).log(`Saryth → untap ${t.name}`);
            const fp = s.fingerprint();
            if (seen.has(fp)) return [];
            seen.add(fp);
            return [s];
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
          // summoningSick guard: Shang-Chi's static bypasses this via the section 5
          // permForAbility clone (sets summoningSick=false before calling fn).
          // Without SC on board the clone is not built and this guard correctly blocks.
          if (perm.tapped || perm.summoningSick) return [];
          const ap = state.payMana('1'); if (!ap) return [];
          const seen = new Set();
          return ap.battlefield.filter(p=>p.tapped&&p.id!==perm.id).flatMap(t => {
            let s = ap.tapPermanent(perm.id); if (!s) return [];
            s = s.untapPermanent(t.id).log(`Formidable Speaker → untap ${t.name}`);
            const fp = s.fingerprint();
            if (seen.has(fp)) return [];
            seen.add(fp);
            return [s];
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
          var cards = CARDS;
          const results = [];
          const untapped = state.creatures().filter(c=>!c.tapped&&!c.summoningSick);
          // Oracle: "Untap target BASIC land." — must check the card definition's isBasic flag,
          // NOT just the Forest subtype. Under Ashaya, creatures gain the Forest subtype but
          // are NOT basic lands. Dryad Arbor is a Forest but also not basic.
          const tbasic  = state.lands().filter(l => l.tapped && cards[l.cardKey]?.isBasic);
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
          // Per Magic rules, summoning sickness only restricts attacks and
          // {T}/{Q} abilities.  Temur's bounce is {1G} with no tap cost —
          // legal on a sick Temur.  See ToDo C-33 audit.
          const ap = state.payMana('1G'); if (!ap) return [];
          var cards = CARDS;
          const seen = new Set();
          return state.creatures().filter(c=>c.id!==perm.id).flatMap(c => {
            let s = ap.removeFromBattlefield(c.id, null); if (!s) return [];
            const ck = Object.keys(cards).find(k=>cards[k].name===c.name);
            if (ck) s = s.addToHand(ck);
            s = s.log(`Temur Sabertooth → return ${c.name} to hand`);
            // Deduplicate: bouncing two identical creatures yields the same state
            const fp = s.fingerprint();
            if (seen.has(fp)) return [];
            seen.add(fp);
            return [s];
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
          var cards = CARDS;
          const seen = new Set();
          return state.creatures().filter(c=>c.subtypes&&c.subtypes.includes('Human')).flatMap(c => {
            let s = ap.removeFromBattlefield(c.id, null); if (!s) return [];
            const ck = Object.keys(cards).find(k=>cards[k].name===c.name);
            if (ck) s = s.addToHand(ck);
            s = s.log(`Kogla → return ${c.name} to hand`);
            const fp = s.fingerprint();
            if (seen.has(fp)) return [];
            seen.add(fp);
            return [s];
          });
        },
      },
    },
  },

  // ─── CREATURES — Other ───────────────────────────────────────────────────

  ulvenwald_oddity: {
    name: 'Ulvenwald Oddity', types: ['creature'], subtypes: ['Beast'],
    cost: '2GG', power: 4, toughness: 4,
    // Oracle front face: Trample, haste.
    // {5}{G}{G}: Transform. Back face (Ulvenwald Behemoth): Trample, haste; other
    // creatures you control get +1/+1 and have trample and haste.
    //
    // Haste: enters without summoning sickness — can tap for mana immediately.
    // Transform: too expensive for typical combos; modelled as a static haste grant
    // to all other creatures when activated (removes their summoning sickness).
    onEnter(state, perm) {
      // Haste — remove summoning sickness on entry
      perm.summoningSick = false;
      return state;
    },
    abilities: {
      transform: {
        label: '{5}{G}{G}: Transform into Ulvenwald Behemoth (all creatures gain haste)',
        fn(state, perm) {
          // Activated ability with no tap cost.  Oddity has haste so this
          // check was already unreachable, but removed for consistency
          // (per Magic rules, no-tap activated abilities are legal on sick
          // creatures).  See ToDo C-33 audit.
          const ap = state.payMana('5GG'); if (!ap) return [];
          let s = ap.clone();
          s._ensureBF();
          // Become the Behemoth (7/7, grants +1/+1, trample, haste to others)
          const self = s.battlefield.find(p => p.id === perm.id);
          if (!self) return [];
          self.name = 'Ulvenwald Behemoth';
          self.power = 7; self.toughness = 7;
          // Grant haste to all other creatures (remove summoning sickness)
          for (const c of s.creatures()) {
            if (c.id !== self.id) c.summoningSick = false;
          }
          return [s.log('Ulvenwald Oddity transforms → Ulvenwald Behemoth (all creatures gain haste)')];
        },
      },
    },
  },

  ashaya: {
    name: 'Ashaya, Soul of the Wild', types:['creature'], subtypes:['Elemental'], cost:'3GG', power:0,toughness:0,
    // Power/toughness = number of lands you control (including herself, since she is a Forest land).
    // GameState.enterBattlefield already sets isForest=true, adds 'land'/'Forest' types on the
    // Ashaya ETB block (the loop at cardKey==='ashaya' iterates all creatures including herself).
    // tapForMana: because she's a Forest land, she taps for {G} (driven by isForest check in actions.js).
    tapForMana(state, perm) {
      // Only tap if isForest was applied (by GameState ETB logic)
      if (!perm.isForest) return [];
      if (perm.tapped || perm.summoningSick) return [];
      const s = state.tapPermanent(perm.id); if (!s) return [];
      return [s.addMana('G').log(`Tap Ashaya, Soul of the Wild → {G}`)];
    },
    onEnter(state, perm) {
      // Power/toughness and isForest/land-type marking are all handled by the
      // ETB block in GameState.enterBattlefield. Nothing extra needed here.
      return state;
    },
  },

  eternal_witness: {
    name: 'Eternal Witness', types: ['creature'], subtypes: ['Human','Shaman'],
    externallyImplemented: true,  // [drift-detector] impl in GameState/actions/combos
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
          var cards = CARDS;
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
    externallyImplemented: true,  // [drift-detector] impl in actions.js opponent_turn action
    name: 'Seedborn Muse', types: ['creature'], subtypes: ['Spirit'],
    cost: '3GG', power: 2, toughness: 4,
    // Static: untap all your permanents during each other player's untap step.
    // Implemented in actions.js: the 'opponent_turn' action untaps all permanents
    // when Seedborn Muse is on the battlefield. Exerted creatures are correctly
    // excluded from this untap (they wait for your own next untap step).
  },
  beast_whisperer: {
    name: 'Beast Whisperer', types: ['creature'], subtypes: ['Elf','Druid'],
    externallyImplemented: true,  // [drift-detector] impl in GameState/actions/combos
    cost: '2GG', power: 2, toughness: 3,
    // Static trigger: whenever you cast a creature spell, draw a card.
    // Modeled in actions.js: cast_spell with a creature draws if Whisperer is in play.
  },
  regal_force: {
    name: 'Regal Force', types: ['creature'], subtypes: ['Elemental'],
    externallyImplemented: true,  // [drift-detector] impl in GameState/actions/combos
    cost: '4GGG', power: 5, toughness: 5,
    // ETB: draw a card for each green creature you control — handled in GameState.enterBattlefield.
  },
  woodland_bellower: {
    name: 'Woodland Bellower', types: ['creature'], subtypes: ['Beast'],
    externallyImplemented: true,  // [drift-detector] impl in GameState/actions/combos
    cost: '4GG', power: 6, toughness: 5,
    // ETB: search library for a nonlegendary green creature with MV ≤ 3, put it on BF.
    // Modeled as: on entry, generate states for each eligible card in hand.
    // (Library search is approximated by hand for the solver.)
    onEnterAbilities: {
      tutor_small_green: {
        label: 'ETB: Put a nonlegendary green creature (MV≤3) from library onto battlefield',
        fn(state, perm) {
          var cards = CARDS;
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
    externallyImplemented: true,  // [drift-detector] impl in GameState/actions/combos
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
          var cards = CARDS;
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
  collector_ouphe:     { externallyImplemented: true, name:'Collector Ouphe', types:['creature'],subtypes:['Ouphe'], cost:'1G', power:2,toughness:2 },
  // [drift-detector] Collector Ouphe suppresses artifact activated abilities — modeled via _hasSTAX in GameState.js
  skyshroud_poacher: {
    name: 'Skyshroud Poacher', types: ['creature'], subtypes: ['Human','Rebel'],
    cost: '2GG', power: 2, toughness: 4,
    // {3}, {T}: Search your library for an Elf permanent card, put it onto the battlefield.
    abilities: {
      tutor_elf: {
        label: '{3}, {T}: Search library for an Elf, put onto battlefield',
        fn(state, perm) {
          if (perm.tapped || perm.summoningSick) return [];
          const ap = state.payMana('3'); if (!ap) return [];
          const s0 = ap.tapPermanent(perm.id); if (!s0) return [];
          var cards = CARDS;

          // C-26 pattern: return only the single best-priority Elf target rather than
          // fanning out over every Elf in the library.  Branching over all Elves compounds
          // multiplicatively in BFS (same bug class as Eldritch Evolution pre-C-23).
          // _bestCreatureTutorTarget already filters to the highest-priority library creature
          // missing from the present set — we further restrict to Elves only by checking
          // the resolved key's subtypes before accepting the result.

          // Build a restricted eligible set: Elf creatures in library, not already present.
          const presentKeys = new Set([
            ...s0.hand,
            ...s0.battlefield.map(p => {
              // resolve name → key for present-set check
              const k = Object.keys(cards).find(ck => cards[ck].name === p.name);
              return k;
            }).filter(Boolean),
          ]);

          const seenLib = new Set();
          let bestKey = null, bestScore = -1;
          for (const ck of s0.players[0].library) {
            if (ck === 'unknown' || seenLib.has(ck)) continue;
            seenLib.add(ck);
            if (presentKeys.has(ck)) continue;
            const def = cards[ck];
            if (!def?.subtypes?.includes('Elf')) continue;
            const sc = TUTOR_PRIORITY_SCORE[ck] ?? 0;
            if (sc > bestScore) { bestKey = ck; bestScore = sc; }
          }

          if (!bestKey) return [];
          const { state: ns, cardKey: found } = s0.searchLibraryFor(lk => lk === bestKey);
          if (!found) return [];
          const after = ns.enterBattlefield(found);
          return [after.log(`Skyshroud Poacher: put ${cards[bestKey].name} onto battlefield`)];
        },
      },
    },
  },
  fierce_empath: {
    externallyImplemented: true,  // [drift-detector] ETB in GameState.enterBattlefield
    name: 'Fierce Empath', types:['creature'], subtypes:['Elf'], cost:'2G', power:1,toughness:1,
    // ETB: search library for MV≥6 creature, put into hand.
    // Implemented in GameState.enterBattlefield (deterministic: picks highest TUTOR_PRIORITY_SCORE).
    // cards.js onEnter removed (2026-05-12) to prevent double-fire: GameState.enterBattlefield
    // already handles the ETB for both cast and direct-enter paths.
  },
  reclamation_sage: {
    externallyImplemented: true,  // [drift-detector] ETB in GameState.enterBattlefield
    name: 'Reclamation Sage', types: ['creature'], subtypes: ['Elf','Shaman'],
    cost: '2G', power: 2, toughness: 1,
    // ETB: you may destroy target artifact or enchantment.
    // Implemented deterministically in GameState.enterBattlefield:
    // destroys the highest-priority stax artifact/enchantment (Null Rod,
    // Collector Ouphe, Orb of Dreams, etc.), same pattern as Manglehorn.
    // Does not destroy our own mana artifacts (Sol Ring, Chrome Mox, etc.).
  },
  scavenging_ooze: {
    name: 'Scavenging Ooze', types: ['creature'], subtypes: ['Ooze'],
    cost: '1G', power: 2, toughness: 2,
    // {G}: Exile a card from a graveyard. If a creature card, +1/+1 and gain 1 life.
    abilities: {
      exile_from_gy: {
        label: '{G}: Exile a card from a graveyard, gain 1 life if creature',
        fn(state, perm) {
          // Activated ability with no tap cost — legal on a sick Ooze.
          // See ToDo C-33 audit.
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
    externallyImplemented: true,  // [drift-detector] impl in GameState/actions/combos
    cost: '4GG', power: 6, toughness: 5,
    // Other creatures have trample. Nontoken creatures get +1/+1 and haste when entering.
    // ETB haste modeled in GameState (like Concordant Crossroads for newly entering creatures).
  },
  defiler_of_vigor: {
    externallyImplemented: true,  // [drift-detector] cost reduction + counter trigger in actions.js
    name: 'Defiler of Vigor', types: ['creature'], subtypes: ['Phyrexian','Wurm'],
    cost: '3GG', power: 6, toughness: 6,
    // (1) Cost reduction: green permanent spells cost {G} less if you pay 2 life.
    //     Implemented in actions.js costReductions() — always applies the {1} generic
    //     reduction and the 2-life payment is deducted here via onCast.
    // (2) Trigger: whenever you cast a green permanent, put +1/+1 on EACH creature.
    //     Implemented in actions.js cast_spell section (checks for Defiler on battlefield).
    //
    // The 2-life additional cost is tracked here so it actually deducts life.
    // actions.js costReductions() reduces the generic cost by 1; this onCast deducts 2 life.
    // Net result: you save {G} and spend 2 life — exactly as Oracle text describes.
    onCast(state) {
      // Called when THIS card (Defiler) is cast — not when other permanents are cast.
      // The 2-life cost for casting Defiler itself is just paying 2 life for {G} reduction.
      // But this hook only fires on Defiler's own cast; for other green permanents
      // the life deduction is applied in actions.js's cast_spell block.
      return state;
    },
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
    externallyImplemented: true,  // [drift-detector] impl in GameState/actions/combos
    cost: '1G', power: 2, toughness: 2,
    // Oracle: {2G},{T}: Look at top 3 cards, may reveal a creature and put in hand.
    //
    // NOT modelled as an activated ability in the solver because:
    // - Without infinite mana: result depends on which 3 cards are on top (non-deterministic).
    // - With infinite mana: the WIN_CONDITIONS "Duskwatch + Finale" fires directly,
    //   representing the full loop of activating Duskwatch to empty the library.
    //
    // The solver treats Duskwatch as a win condition piece, not an action source.
  },
  runic_armasaur: {
    name: 'Runic Armasaur', types: ['creature'], subtypes: ['Dinosaur'],
    cost: '1GG', power: 2, toughness: 3,
    // Whenever an opponent activates a non-mana ability of a creature or land, draw a card.
    // Not modeled in the solver (triggers on opponent actions).
  },
  heartwood_storyteller:{ name:'Heartwood Storyteller',     types:['creature'],subtypes:['Treefolk'],          cost:'1GG',  power:2,toughness:3 },
  destiny_spinner: {
    name: 'Destiny Spinner', types:['creature','enchantment'], subtypes:['Human'], cost:'1G', power:2,toughness:2,
    // Static 1: creature and enchantment spells can't be countered (not enforced — single-player).
    // Static 2: {3}{G}: Target land you control becomes an X/X Elemental with trample and haste
    //           until end of turn, where X = number of enchantments you control. It's still a land.
    //
    // This is the key ability for giving Elvish Reclaimer haste after Ashaya makes
    // the land a creature (Reclaimer is already a creature; the land becomes one here
    // to act as a sacrifice target and to gain haste via Destiny Spinner).
    // More importantly: after Ashaya, nontoken creatures ARE lands, so targeting
    // Elvish Reclaimer (which is a land under Ashaya) grants it haste.
    abilities: {
      animate_land: {
        label: '{3}{G}: Give target land creature haste until EOT (X/X where X = enchantments)',
        fn(state, perm) {
          // Activated ability with no tap cost — legal on a sick Spinner.
          // This particularly matters for the Hitzel Reclaimer-haste path:
          // Spinner cast same turn as Reclaimer can still animate Reclaimer
          // immediately after ETB.  See ToDo C-33 audit.
          const ap = state.payMana('3G'); if (!ap) return [];
          // Count enchantments you control for the X/X size
          const x = ap.battlefield.filter(p => p.types.includes('enchantment')).length;
          if (x === 0) return []; // 0/0 lands die immediately — no value
          const results = [];
          // Target any land (or any creature that is also a land under Ashaya).
          // We snapshot target IDs before cloning so each result gets its own isolated clone.
          const targetIds = ap.battlefield
            .filter(p => p.is('land') && !p.summoningSick)
            .map(p => p.id);
          for (const tid of targetIds) {
            // Clone per-target so mutations are isolated across sibling DFS branches.
            const s = ap.clone();
            s._ensureBF();
            const tgt = s.getPermanentById(tid);
            if (!tgt) continue;
            // Animate: add creature type, grant haste (clear summoning sickness), set P/T.
            tgt._ensureOwnTypes?.();
            if (!tgt.types.includes('creature')) tgt.types = [...(tgt.types || []), 'creature'];
            tgt.summoningSick = false;
            tgt.power     = x;
            tgt.toughness = x;
            results.push(s.log(`Destiny Spinner: animate ${tgt.name} → ${x}/${x} Elemental with haste`));
          }
          return results;
        },
      },
    },
  },
  chomping_changeling: {
    externallyImplemented: true,  // [drift-detector] ETB in GameState.enterBattlefield
    // Changeling: this card is EVERY creature type. The deck's combos care about
    // the Elf type (elfCount for Priest/Archdruid, Symbiote/Ranger fodder) and the
    // Human type (Kogla bounces Humans), so we list both alongside 'Shapeshifter'.
    // (Other creature types are not used by any current detector.)
    name:'Chomping Changeling', types:['creature'], subtypes:['Shapeshifter','Elf','Human'],
    cost:'2G', power:3, toughness:3,
    // ETB: destroy up to one target artifact or enchantment.
    // Identical to Reclamation Sage ETB — implemented in GameState.enterBattlefield.
    // Targets stax artifacts/enchantments on battlefield first, then opponentStax.
  },
  lotus_cobra: {
    name: 'Lotus Cobra', types: ['creature'], subtypes: ['Snake'], cost: '1G',
    externallyImplemented: true,  // [drift-detector] impl in GameState/actions/combos
    power: 2, toughness: 1,
    // Landfall: whenever a land enters, add one mana of any color.
    // This is applied in actions.js: after play_land, check for Cobra and add {G}.
    // Modeled as a pseudo-ability that the action generator fires automatically.
  },
  nissa_animist: {
    externallyImplemented: true,  // [drift-detector] landfall triggers in actions.js play_land section
    name: 'Nissa, Resurgent Animist', types:['creature'], subtypes:['Elf','Scout'], cost:'2G', power:2,toughness:3,
    // Landfall — Whenever a land enters the battlefield under your control:
    //   • Add one mana of any color.
    //   • If this is the second time a land entered this turn, you may look at the
    //     top five cards, put an Elf or Elemental creature card into your hand, shuffle.
    //
    // The landfall mana trigger is modeled in actions.js (same location as Lotus Cobra).
    // The tutor trigger is modeled there too: state.landfallCount tracks how many lands
    // have entered this turn; when it hits 2 (and Nissa is on BF), the tutor fires.
    //
    // This card has no activated ability — all effects are landfall triggers.
    // The tapForMana is not set (she doesn't tap for mana herself).
    //
    // Implementation note: the landfall triggers live in actions.js's play_land section.
  },
  skullwinder: {
    name: 'Skullwinder', types: ['creature'], subtypes: ['Snake'],
    externallyImplemented: true,  // [drift-detector] impl in GameState/actions/combos
    cost: '2G', power: 1, toughness: 3,
    // Deathtouch. ETB: return target card from YOUR graveyard to hand,
    // then choose an opponent to return a card from THEIR graveyard.
    // Simplified: return top card of your graveyard to hand on ETB.
    // (Handled like Eternal Witness — same ETB pattern)
  },
  manglehorn: {
    name: 'Manglehorn', types: ['creature'], subtypes: ['Beast'], cost: '2G', power: 2, toughness: 2,
    // ETB: destroy target artifact.
    // Static: artifacts opponents control enter tapped (not modelled — no opponent).
    onEnter(state) {
      const artifacts = state.battlefield.filter(p =>
        p.is('artifact') && p.name !== 'Manglehorn'
      );
      if (artifacts.length === 0) return state;
      const seen = new Set();
      const results = [state.log('Manglehorn ETB: no artifact target')];
      for (const t of artifacts) {
        const s = state.removeFromBattlefield(t.id, 'graveyard');
        if (!s) continue;
        const fp = s.fingerprint();
        if (seen.has(fp)) continue;
        seen.add(fp);
        results.push(s.log(`Manglehorn ETB: destroy ${t.name}`));
      }
      return results.length === 1 ? results[0] : results;
    },
  },

  warping_wail: {
    name: 'Warping Wail', types: ['instant'], subtypes: [], cost: '1C',
    isRemoval: true,
    // Choose one:
    //   • Exile target creature with power/toughness ≤ 1.
    //   • Counter target sorcery.
    //   • Create a 1/1 colorless Eldrazi Scion token with "Sacrifice: Add {C}".
    // In single-player: mode 1 (exile small creature) and mode 3 (Scion token) are useful.
    castFn(state) {
      const results = [];
      // Mode 1: exile creature with power ≤ 1 AND toughness ≤ 1
      const targets = state.battlefield.filter(p =>
        p.is('creature') && (p.power ?? 0) <= 1 && (p.toughness ?? 0) <= 1
      );
      for (const t of targets) {
        const s = state.removeFromBattlefield(t.id, 'exile');
        if (s) results.push(s.log(`Warping Wail: exile ${t.name}`));
      }
      // Deduplicate: multiple identical small creatures (e.g. two Llanowar Elves)
      // produce the same resulting state when exiled.
      const seen = new Set();
      const deduped = results.filter(r => {
        const fp = r.fingerprint(); if (seen.has(fp)) return false; seen.add(fp); return true;
      });
      // Mode 3: create 1/1 Eldrazi Scion token (sac for {C})
      // Modelled as immediately adding {C} (the token's only practical effect in combo lines)
      {
        const s = state.addMana('C').log('Warping Wail: create Eldrazi Scion (sac → {C})');
        deduped.push(s);
      }
      return deduped;
    },
  },
  tireless_provisioner: {
    externallyImplemented: true,  // [drift-detector] landfall trigger in actions.js play_land section
    name: 'Tireless Provisioner', types: ['creature'], subtypes: ['Elf','Scout'],
    cost: '2G', power: 3, toughness: 2,
    // Landfall: create a Food or Treasure token.
    // Modeled as: when a land enters while Provisioner is on BF, a Treasure enters.
    // The Treasure token produces one mana of any color (modeled as {G} for solver).
  },
  sowing_mycospawn: {
    name: 'Sowing Mycospawn', types: ['creature'], subtypes: ['Eldrazi','Fungus'],
    externallyImplemented: true,  // [drift-detector] impl in GameState/actions/combos
    cost: '3G', power: 4, toughness: 4,
    // Oracle: When Sowing Mycospawn enters, search your library for a basic
    // land card or Eldrazi land card, put it onto the battlefield TAPPED,
    // then shuffle. Kicker {2}: ETB exiles target land (not modelled —
    // no opponent permanents to target).
    //
    // The trigger is implemented in src/GameState.js inside enterBattlefield
    // (search for "Sowing Mycospawn on-cast trigger") rather than as a
    // def.onEnter here. This places it alongside the existing Hyrax /
    // Woodcaller / Witness / Empath ETB triggers, ensuring it fires from
    // every code path that ETBs Mycospawn — the cast dispatcher, the
    // --battlefield bootstrap, and any test setup. A def.onEnter here would
    // ONLY fire from the cast dispatcher in actions.js, leaving --battlefield
    // and direct setup paths inconsistent.
  },
  badgermole_cub: {
    name: 'Badgermole Cub', types: ['creature'], subtypes: ['Badger','Mole'],
    cost: '1G', power: 2, toughness: 2,
    // ETB: earthbend 1 — target land you control becomes a 0/0 creature with haste
    //   that's still a land, then put a +1/+1 counter on it (making it 1/1).
    //   Key use: animate Gaea's Cradle or Nykthos so they can tap for mana without
    //   summoning sickness, and so Quirion/Scryb Ranger can bounce them via Ashaya.
    // Static: whenever you tap a creature for mana, add {G}.
    //   Already modeled in actions.js tap_for_mana (same as Leyline of Abundance).
    onEnter(state) {
      // Pick the highest-value land target. Priority:
      //   Gaea's Cradle > Nykthos > Big non-basic (Ancient Tomb) > basic Forest
      //   > everything else (including creature-lands under Ashaya)
      // Real oracle text is just "target land you control" — there is NO
      // rules restriction against the land also being a creature. Under
      // Ashaya, Hope Tender / Magus of the Candelabra / Ley Weaver /
      // Argothian Elder / Elvish Reclaimer (etc.) are all already lands
      // and are fully legal earthbend targets too — confirmed against the
      // real card text in ref/card_data.md. Pure (non-creature) lands are
      // still preferred by default (they're typically the highest
      // strategic value, e.g. animating Gaea's Cradle for mana), but
      // creature-lands are included as candidates rather than excluded
      // outright, so earthbend can still find a target when no pure land
      // is available, or when the assembly narration specifically asks
      // for a creature-land's haste (see Solver.js's haste-enabler block).
      const pureLandCandidates = state.battlefield.filter(p =>
        p.is('land') && !p.is('creature') && p.name !== 'Badgermole Cub'
      );
      const creatureLandCandidates = state.battlefield.filter(p =>
        p.is('land') && p.is('creature') && p.name !== 'Badgermole Cub' &&
        // Ashaya itself is excluded as a fallback target: it doesn't need
        // haste for anything, and its power/toughness are dynamically
        // computed (= number of lands controlled) rather than static, so
        // adding a static +1/+1 counter to it would produce a confusing,
        // not-actually-useful result. The whole point of targeting a
        // creature-land here is to grant haste to something that
        // benefits from it (Hope Tender, Magus, Reclaimer, etc.).
        p.name !== 'Ashaya, Soul of the Wild'
      );
      const candidates = pureLandCandidates.length > 0 ? pureLandCandidates : creatureLandCandidates;
      if (candidates.length === 0) return state.log('Badgermole Cub ETB: no land target');

      const priority = ["Gaea's Cradle", 'Nykthos, Shrine to Nyx', 'Ancient Tomb',
        'Deserted Temple', 'Wirewood Lodge', 'Forest', 'Boseiju, Who Endures'];
      const target = candidates.sort((a, b) => {
        const ai = priority.indexOf(a.name); const bi = priority.indexOf(b.name);
        return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
      })[0];

      // Clone and mutate the target land: add creature type (if not
      // already one), grant haste, and add a +1/+1 counter.
      //
      // Power/toughness handling per the real reminder text ("becomes a
      // 0/0 creature... Put a +1/+1 counter on it"): the 0/0 base only
      // applies when the target was a PURE land before earthbend (no
      // prior P/T at all, since lands don't intrinsically have any) — in
      // that case it ends up 1/1 after the counter. If the target is
      // ALREADY a creature (a creature-land under Ashaya, e.g. Hope
      // Tender 1/1 or Argothian Elder 2/2), it keeps its own real printed
      // power/toughness — the +1/+1 counter is added on top of THAT, not
      // a 0/0 reset. Getting this wrong would incorrectly shrink Elder/Ley
      // Weaver (2/2 base) down to 1/1.
      let s = state.clone();
      s._ensureBF();
      const tgt = s.getPermanentById(target.id);
      if (!tgt) return state.log('Badgermole Cub ETB: target not found');
      const wasAlreadyCreature = tgt.is('creature');
      tgt._ensureOwnTypes?.();
      if (!tgt.types.includes('creature')) tgt.types = [...tgt.types, 'creature'];
      tgt.summoningSick = false; // haste
      if (wasAlreadyCreature) {
        tgt.power     = (tgt.power     ?? 0) + 1;
        tgt.toughness = (tgt.toughness ?? 0) + 1;
      } else {
        tgt.power     = 1;
        tgt.toughness = 1;
      }
      const resultDesc = wasAlreadyCreature
        ? `+1/+1 counter (now ${tgt.power}/${tgt.toughness}) with haste`
        : '1/1 creature with haste';
      return s.log(`Badgermole Cub ETB: earthbend ${target.name} → ${resultDesc}`);
    },
  },
  outland_liberator: {
    name: 'Outland Liberator', types: ['creature'], subtypes: ['Human','Werewolf'],
    cost: '1G', power: 2, toughness: 2,
    // {1}, Sacrifice: Destroy target artifact or enchantment.
    abilities: {
      sac_destroy: {
        label: '{1}, Sacrifice: Destroy target artifact or enchantment',
        fn(state, perm) {
          if (perm.summoningSick) return []; // summoning sickness prevents sacrificing? No —
          // Actually sacrifice is a cost and legal on sick creatures. But this ability
          // requires paying {1} and sacrificing, so check mana.
          const ap = state.payMana('1'); if (!ap) return [];
          // Find targets: preferably opponent stax artifacts/enchantments on our BF
          // (in single-player, we only have access to our own permanents to destroy).
          // Priority: stax pieces first, then any artifact/enchantment.
          const STAX_NAMES = new Set([
            'Null Rod', 'Collector Ouphe', 'Root Maze', 'Orb of Dreams',
            'Thorn of Amethyst', 'Trinisphere', 'Chalice of the Void',
            'Vexing Bauble', 'Disruptor Flute',
          ]);
          const targets = ap.battlefield.filter(p =>
            p.id !== perm.id && (p.is('artifact') || p.is('enchantment'))
          );
          // Also check opponentStax
          const oppStaxEntries = [...ap.opponentStax].filter(e => STAX_NAMES.has(e.split('@')[0].trim()));
          if (targets.length === 0 && oppStaxEntries.length === 0) return [];
          // Sacrifice self
          let s = ap.removeFromBattlefield(perm.id, 'graveyard'); if (!s) return [];
          // Prefer stax targets on our BF, then opponentStax, then any artifact
          const staxBFTarget = targets.find(t => STAX_NAMES.has(t.name));
          if (staxBFTarget) {
            s = s.removeFromBattlefield(staxBFTarget.id, 'graveyard'); if (!s) return [];
            return [s.log(`Outland Liberator: sacrifice → destroy ${staxBFTarget.name}`)];
          } else if (oppStaxEntries.length > 0) {
            const oppName = oppStaxEntries[0].split('@')[0].trim();
            s = s.removeFromOpponentStax(oppName);
            return [s.log(`Outland Liberator: sacrifice → destroy opponent's ${oppName}`)];
          } else {
            const target = targets[0];
            s = s.removeFromBattlefield(target.id, 'graveyard'); if (!s) return [];
            return [s.log(`Outland Liberator: sacrifice → destroy ${target.name}`)];
          }
        },
      },
    },
  },
  scrapshooter: {
    externallyImplemented: true,  // [drift-detector] ETB in GameState.enterBattlefield
    name: 'Scrapshooter', types: ['creature'], subtypes: ['Raccoon','Archer'],
    cost: '1GG', power: 3, toughness: 3,
    // Gift a card (promise opponent a gift → they draw a card when this enters).
    // Reach.
    // ETB (if gift was promised): destroy target artifact or enchantment an opponent controls.
    // Modeled deterministically: if a stax artifact/enchantment is present, promise the gift
    // and destroy it (opponent draw not modeled). If no stax target, cast without gift promise.
    // Implemented in GameState.enterBattlefield — same stax-removal pattern as Reclamation Sage.
  },
  fauna_shaman: {
    name: 'Fauna Shaman', types: ['creature'], subtypes: ['Elf','Shaman'],
    cost: '1G', power: 2, toughness: 2,
    // Oracle: {G}, {T}, Discard a creature card → search library for a creature card,
    // reveal it, put it into your hand, then shuffle.
    abilities: {
      tutor: {
        label: '{G}, {T}: Discard a creature, search for a creature',
        fn(state, perm) {
          if (perm.tapped || perm.summoningSick) return [];
          const ap = state.payMana('G'); if (!ap) return [];
          var cards = CARDS;

          const creaturesInHand = [...new Set(ap.hand)].filter(k =>
            cards[k]?.types.includes('creature')
          );
          if (creaturesInHand.length === 0) return [];

          // Find the best combo-completing creature in the library
          const bestKey = _bestCreatureTutorTarget(ap);
          if (!bestKey) return [];

          // Protect high-value un-cast combo pieces in hand from being discarded.
          // Same fix as Survival of the Fittest (C-9, 2026-04-30): keep protection
          // unconditional. The previous "strip protection when no alternative exists"
          // hack caused self-cancelling chains where Fauna Shaman discarded a card
          // it had just tutored, burning {G} per step with no progress on the win line.
          // If every creature in hand is a protected combo piece, return [] —
          // the action falls through and the solver picks something more productive
          // (e.g. casting the held creature, developing the board).
          const PROTECT_THRESHOLD = 70;
          const protectedKeys = new Set(
            creaturesInHand.filter(k =>
              (TUTOR_PRIORITY_SCORE[k] ?? 0) >= PROTECT_THRESHOLD &&
              !ap.battlefield.some(p => NAME_TO_KEY[p.name] === k)
            )
          );
          const effectiveProtected = protectedKeys;

          // ALSO skip cards that were tutored to hand by a prior Survival/Fauna activation
          // and never cast (sibling fix to the Survival guard, 2026-04-30 user report).
          const freshlyTutored = _freshlyTutoredKeys(ap);

          const results = [];
          const seenDiscard = new Set();
          for (const discard of creaturesInHand) {
            if (seenDiscard.has(discard)) continue;
            if (discard === bestKey) continue;              // don't discard what we're fetching
            if (effectiveProtected.has(discard)) continue; // protect key un-cast pieces
            if (freshlyTutored.has(discard)) continue;     // protect freshly-tutored cards from chain abuse
            seenDiscard.add(discard);
            let s = ap.tapPermanent(perm.id); if (!s) continue;
            s = s.discardFromHand(discard, 'Fauna Shaman discard cost'); if (!s) continue;
            const { state: ns, cardKey } = s.searchLibraryFor(k => k === bestKey);
            if (!cardKey) continue;
            // Put the fetched creature directly into hand (oracle: "put it into your hand")
            const ns2 = ns.addToHand(cardKey);
            results.push(ns2.log(
              `Fauna Shaman: discard ${cards[discard].name} → ${cards[bestKey].name} to hand`
            ));
          }
          return results;
        },
      },
    },
  },
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
  genesis_hydra: {
    name: 'Genesis Hydra', types: ['creature'], subtypes: ['Plant','Hydra'], cost: 'XGG',
    power: 0, toughness: 0,
    // Oracle on-cast: reveal top X, put a nonland permanent with MV ≤ X onto battlefield.
    // The Hydra itself enters with X +1/+1 counters.
    // Modelled as: find the best nonland permanent in library with MV ≤ X, put it to BF.
    // (Non-deterministic top-X reveal simplified to full library access.)
    castFn(state) {
      var cards = CARDS;
      var { parseCost: pc } = _GSM;
      const x = state.mana.total(); // post-payment remaining = X
      const results = [];
      // Find best nonland permanent with MV ≤ X
      let bestKey = null, bestScore = -1;
      for (const ck of state.players[0].library) {
        if (ck === 'unknown' || isStax(ck)) continue;
        const def = cards[ck];
        if (!def || def.types.includes('land') || !def.cost) continue;
        const parsed = pc(def.cost);
        const mv = parsed.generic + Object.values(parsed.colored).reduce((a,b)=>a+b,0);
        if (mv > x) continue;
        const score = TUTOR_PRIORITY_SCORE[ck] ?? 0;
        if (score > bestScore) { bestKey = ck; bestScore = score; }
      }
      if (bestKey) {
        const { state: ns, cardKey } = state.searchLibraryFor(k => k === bestKey);
        if (cardKey) {
          const def = cards[cardKey];
          let ns2 = drainMana(ns).enterBattlefield(cardKey);
          results.push(ns2.log(`Genesis Hydra X=${x} → reveal, put ${def.name} (MV ${x}) to BF`));
          return results;
        }
      }
      // No hit — Hydra still enters (just no bonus permanent)
      return [drainMana(state).log(`Genesis Hydra X=${x}: no nonland permanent found in top X`)];
    },
  },
  king_coldblood: {
    name: 'King of the Coldblood Curse', types: ['creature'], subtypes: ['Lizard','Villain'],
    cost: '2GG', power: 4, toughness: 4,
    // ETB: up to one other target creature loses all abilities and becomes a 4/4 green Lizard.
    // Combo-relevant: can disable stax creatures (Collector Ouphe, etc.) by stripping abilities.
    // Modeled: on ETB, if a stax creature is on the battlefield, strip its abilities
    // by removing it from the battlefield (it becomes a vanilla 4/4 — since we don't
    // model "creature with no abilities", the simplest correct approximation is removal
    // from our battlefield's effective stax pool, keeping it as a vanilla creature).
    // In practice: remove the stax creature from BF and re-enter it as a blank 4/4.
    onEnter(state) {
      const STAX_CREATURE_NAMES = new Set([
        'Collector Ouphe', 'Null Rod', // artifact-ability suppression creatures
      ]);
      const target = state.battlefield.find(p =>
        p.is('creature') && p.name !== 'King of the Coldblood Curse' &&
        STAX_CREATURE_NAMES.has(p.name)
      );
      if (!target) return state; // no useful target — ETB is optional ("up to one")
      // Strip abilities: remove from BF and enter as a blank 4/4 green Lizard.
      // We keep it on the battlefield (it's still a creature) but without stax effects.
      let s = state.removeFromBattlefield(target.id, null); // doesn't go to GY (stays as new perm)
      if (!s) return state;
      // Re-enter as a blank 4/4 Lizard (cardKey: king_coldblood_blank to avoid re-triggering)
      s = s.clone(); s._ensureBF();
      const blankId = s._nextId++;
      const blank = new Permanent({
        id: blankId, name: target.name + ' (Lizard 4/4)', cardKey: 'blank_lizard',
        types: ['creature'], subtypes: ['Lizard'], tapped: target.tapped,
        summoningSick: target.summoningSick, power: 4, toughness: 4,
        counters: {}, abilitiesUsed: {},
      });
      s.battlefield = [...s.battlefield, blank];
      return s.log(`King of the Coldblood Curse ETB: ${target.name} loses all abilities → 4/4 Lizard`);
    },
  },
  disciple_freyalise: {
    externallyImplemented: true,  // [drift-detector] ETB in GameState.enterBattlefield
    name: 'Disciple of Freyalise', types: ['creature'], subtypes: ['Elf','Druid'],
    cost: '3GGG', power: 4, toughness: 4,
    // ETB: you may sacrifice another creature. If you do, gain X life and draw X cards
    // where X = that creature's power.
    // Implementation in GameState.enterBattlefield: sacrifices lowest-power non-key
    // creature (deterministic). cards.js onEnter removed (2026-05-12) to prevent
    // double-fire when cast via actions.js.
    //
    // DFC land back: Garden of Freyalise — {T}: Add {G}; enters tapped unless you
    // pay 3 life. Two branches offered: tapped (free) and untapped (pay 3 life).
    handAbilities: {
      play_as_land_tapped: {
        label: 'Play Garden of Freyalise (land side, enters tapped)',
        fn(state, cardKey) {
          if (state.isOpponentTurn) return null;
          if (state.landDrops <= 0) return null;
          const s0 = state.removeFromHand(cardKey); if (!s0) return null;
          const s1 = s0.clone(); s1.landDrops--;
          s1.landsPlayedThisTurn = (s1.landsPlayedThisTurn ?? 0) + 1;
          const ns = s1.enterBattlefield('garden_of_freyalise', { tapped: true });
          return ns.log('Play Garden of Freyalise → enters tapped');
        },
      },
      play_as_land_untapped: {
        label: 'Play Garden of Freyalise (land side, pay 3 life → enters untapped)',
        fn(state, cardKey) {
          if (state.isOpponentTurn) return null;
          if (state.landDrops <= 0) return null;
          if (state.life <= 3) return null; // don't pay life we don't have
          const s0 = state.removeFromHand(cardKey); if (!s0) return null;
          const s1 = s0.clone(); s1.landDrops--;
          s1.landsPlayedThisTurn = (s1.landsPlayedThisTurn ?? 0) + 1;
          s1.life -= 3;
          const ns = s1.enterBattlefield('garden_of_freyalise', { tapped: false });
          return ns.log('Play Garden of Freyalise (pay 3 life) → enters untapped');
        },
      },
    },
  },

  // Garden of Freyalise — land back face of Disciple of Freyalise MDFC
  // Entered via the handAbilities above; not played directly from hand.
  garden_of_freyalise: {
    name: 'Garden of Freyalise', types: ['land'], subtypes: ['Forest'], cost: null,
    tapForMana: simpleTap('{G}', [['G', 1]]),
  },
  hyrax_tower_scout: {
    name: 'Hyrax Tower Scout', types: ['creature'], subtypes: ['Human','Scout'],
    externallyImplemented: true,  // [drift-detector] impl in GameState/actions/combos
    cost: '2G', power: 2, toughness: 2,
    // ETB: untap target creature — handled in GameState.enterBattlefield (untaps first tapped creature).
  },
  woodcaller_automaton: {
    name: 'Woodcaller Automaton', types: ['creature','artifact'], subtypes: ['Construct'],
    externallyImplemented: true,  // [drift-detector] impl in GameState/actions/combos
    // Modelled at its Prototype cost {2GG} — 3/3. This is virtually always how it
    // is cast in this deck; the {10} base cost is irrelevant in practice.
    // Oracle: "When this creature enters, if you cast it, untap target land you control.
    //          It becomes a Treefolk creature with haste and base power and toughness
    //          equal to this creature's power and toughness. It's still a land."
    // ETB land-untap handled in GameState.enterBattlefield (untaps the best tapped land).
    // The land-animation (haste Treefolk) is not modelled — only the untap matters.
    cost: '2GG', power: 3, toughness: 3,
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
          // Activated ability with no tap cost — legal on a sick Vanguard.
          // See ToDo C-33 audit.
          const ap = state.payMana('4G'); if (!ap) return [];
          let s = ap.playerDraws(0, 1);
          return [s.log('Beastrider Vanguard: look at top 3, take a permanent')];
        },
      },
    },
  },

  // ─── CREATURES — Draw-Engine (added 2026) ────────────────────────────────

  // ─────────────────────────────────────────────────────────────────────────
  // New creatures (2026 batch 2)
  // ─────────────────────────────────────────────────────────────────────────

  incubation_druid: {
    name: 'Incubation Druid', types: ['creature'], subtypes: ['Elf', 'Druid'],
    cost: '1G', power: 0, toughness: 2,
    // {T}: Add one mana of any type a land you control could produce.
    // If Incubation Druid has a +1/+1 counter → add THREE mana instead.
    // Adapt {3}{G}{G}: if no counters, put three +1/+1 counters on it.
    // Modelled: mana amount depends on whether perm.counters['+1/+1'] >= 1.
    tapForMana(state, perm) {
      if (perm.tapped || perm.summoningSick) return [];
      const s = state.tapPermanent(perm.id); if (!s) return [];
      const hasCounter = (perm.counters?.['+1/+1'] ?? 0) >= 1;
      const amt = hasCounter ? 3 : 1;
      let ns = s;
      ns = ns.addMana('G', amt);
      return [ns.log(`Tap Incubation Druid → {G}x${amt}${hasCounter ? ' (adapted)' : ''}`)];
    },
    abilities: {
      adapt: {
        label: '{3}{G}{G}: Adapt 3 — put three +1/+1 counters on Incubation Druid',
        fn(state, perm) {
          // Adapt only fires if the creature has no +1/+1 counters yet
          if ((perm.counters?.['+1/+1'] ?? 0) > 0) return [];
          const ap = state.payMana('3GG'); if (!ap) return [];
          const s = ap.clone(); s._ensureBF();
          const live = s.getPermanentById(perm.id); if (!live) return [];
          live.counters = { ...live.counters, '+1/+1': 3 };
          return [s.log('Incubation Druid: Adapt 3 → three +1/+1 counters')];
        },
      },
    },
  },

  generous_patron: {
    name: 'Generous Patron', types: ['creature'], subtypes: ['Elf', 'Advisor'],
    cost: '2G', power: 1, toughness: 4,
    // ETB: support 2 (put a +1/+1 counter on each of up to 2 other creatures).
    // Whenever you put one or more counters on a creature you don't control, draw.
    // In single-player solver we model ETB: put +1/+1 counters on up to 2 own creatures
    // to grow dorks (especially Incubation Druid). No opponent trigger in solo mode.
    // ETB draw wired in GameState.enterBattlefield.
    externallyImplemented: true,  // [drift-detector] ETB support + counter trigger in GameState
  },

  magus_of_the_order: {
    name: 'Magus of the Order', types: ['creature'], subtypes: ['Human', 'Wizard'],
    cost: '2GG', power: 2, toughness: 2,
    // {G}, {T}, Sacrifice a green creature: Search library → any green creature onto BF.
    // Functionally identical to Natural Order.
    abilities: {
      natural_order_effect: {
        label: '{G}, {T}, Sacrifice a green creature: tutor any green creature onto battlefield',
        fn(state, perm) {
          if (perm.tapped || perm.summoningSick) return [];
          const ap = state.payMana('G'); if (!ap) return [];
          const s = ap.tapPermanent(perm.id); if (!s) return [];
          var cards = CARDS;
          // Find a green creature to sacrifice (prefer the least-valuable one)
          const KEEP = new Set(['Ashaya, Soul of the Wild','Temur Sabertooth','Kogla, the Titan Ape',
                                'Selvala, Heart of the Wilds','Quirion Ranger','Scryb Ranger','Hope Tender']);
          const greenCreatures = s.creatures().filter(c => {
            const ck = NAME_TO_KEY[c.name];
            return cards[ck]?.cost?.includes('G');
          });
          if (greenCreatures.length === 0) return [];
          const expendable = greenCreatures.filter(c => !KEEP.has(c.name));
          const sacCreature = expendable.length > 0 ? expendable[0] : greenCreatures[0];
          const afterSac = s.removeFromBattlefield(sacCreature.id, 'graveyard');
          if (!afterSac) return [];
          const sacKey = NAME_TO_KEY[sacCreature.name];
          // Find best green creature in library
          let best = null, bestScore = -Infinity;
          const seen = new Set();
          for (const ck of afterSac.players[0].library) {
            if (seen.has(ck) || ck === 'unknown') continue;
            seen.add(ck);
            if (ck === sacKey) continue;
            const def = cards[ck];
            if (!def?.types.includes('creature') || !def.cost?.includes('G')) continue;
            const score = TUTOR_PRIORITY_SCORE[ck] ?? 0;
            if (score > bestScore) { bestScore = score; best = { ck, def }; }
          }
          if (!best) return [];
          const { state: ns, cardKey } = afterSac.searchLibraryFor(k => k === best.ck);
          if (!cardKey) return [];
          return [ns.enterBattlefield(cardKey).log(
            `Magus of the Order: sac ${sacCreature.name} → ${best.def.name}`)];
        },
      },
    },
  },

  ulvenwald_tracker: {
    name: 'Ulvenwald Tracker', types: ['creature'], subtypes: ['Human', 'Shaman'],
    cost: 'G', power: 1, toughness: 1,
    // {1}{G}, {T}: Target creature you control fights another target creature.
    // In the solver this is useful to remove opponent threats via stax — but since
    // we model a 1v1 board with no opponent creatures by default, the main use is
    // killing collector_ouphe / stax pieces. We model it as: fight an opponent stax creature
    // using our biggest creature, removing it from the board.
    abilities: {
      fight: {
        label: '{1}{G}, {T}: A creature you control fights target creature',
        fn(state, perm) {
          if (perm.tapped || perm.summoningSick) return [];
          const ap = state.payMana('1G'); if (!ap) return [];
          const s = ap.tapPermanent(perm.id); if (!s) return [];
          // Find opponent stax creatures — tracked as opponentStax permanents
          var cards = CARDS;
          const staxPerms = s.battlefield.filter(p =>
            p.controller === 'opponent' || STAX_CARDS.has(p.cardKey)
          );
          if (staxPerms.length === 0) return [];
          // Pick our biggest creature to fight with
          const ourCreatures = s.creatures().filter(c => c.id !== perm.id);
          if (ourCreatures.length === 0) return [];
          const fighter = ourCreatures.reduce((a, b) => (a.power ?? 0) >= (b.power ?? 0) ? a : b);
          const target = staxPerms[0];
          let ns = s.clone();
          // Remove stax target if fighter power >= target toughness
          const tgt = ns.getPermanentById(target.id);
          const ftgt = ns.getPermanentById(fighter.id);
          if (tgt && ftgt && (ftgt.power ?? 0) >= (tgt.toughness ?? tgt.power ?? 1)) {
            ns = ns.removeFromBattlefield(target.id, 'graveyard') ?? ns;
          }
          return [ns.log(`Ulvenwald Tracker: ${fighter.name} fights ${target.name}`)];
        },
      },
    },
  },

  primordial_sage: {
    name: 'Primordial Sage', types: ['creature'], subtypes: ['Spirit'],
    cost: '4GG', power: 4, toughness: 5,
    // Whenever you cast a creature spell, you may draw a card.
    externallyImplemented: true,  // [drift-detector] draw trigger in actions.js cast_spell
  },

  soul_of_the_harvest: {
    name: 'Soul of the Harvest', types: ['creature'], subtypes: ['Elemental'],
    cost: '4GG', power: 6, toughness: 6,
    // Trample. Whenever another nontoken creature you control enters, you may draw a card.
    externallyImplemented: true,  // [drift-detector] draw trigger in GameState.enterBattlefield
  },

  // ─── ENCHANTMENTS ────────────────────────────────────────────────────────

  quest_for_renewal: {
    name: 'Quest for Renewal', types: ['enchantment'], subtypes: [], cost: 'G',
    // Whenever a non-attacking creature you control becomes tapped, add a quest counter.
    // With 4+ counters: untap all creatures during each opponent's untap step.
    // Counter accumulation: modelled as an ability that fires in actions.js when any
    // creature taps for mana (tracked via perm.abilitiesUsed).
    // The untap effect is identical to Seedborn Muse (creatures only, not lands).
    externallyImplemented: true,  // [drift-detector] counter tracking + untap in actions.js
  },

  concordant_crossroads: {
    name: 'Concordant Crossroads', types: ['enchantment'], subtypes: [], cost: 'G',
    externallyImplemented: true,  // [drift-detector] impl in GameState/actions/combos
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
          s._ensurePlayers();
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
    externallyImplemented: true,  // [drift-detector] impl in GameState/actions/combos
    // Draw a card when a nontoken creature enters if it doesn't share a name
    // with another creature you control or in your graveyard.
    // Modeled as: draw when any creature enters (simplified — name check skipped for solver).
    // Applied in actions.js cast_spell trigger.
  },
  compost:                { name:'Compost',                 types:['enchantment'],subtypes:[],              cost:'1G' },
  viridian_revel:         { name:'Viridian Revel',          types:['enchantment'],subtypes:[],              cost:'1GG' },
  utopia_sprawl: {
    name: 'Utopia Sprawl', types: ['enchantment'], subtypes: ['Aura'], cost: 'G',
    // Enchant Forest. As this enters, choose a color (solver always chooses green).
    // Whenever THE enchanted Forest is tapped for mana, its controller adds {G}.
    // Only one land is enchanted — the bonus fires only when that specific land taps.
    // Requires a Forest to be in play to cast (Aura needs a legal target).
    canCast(state) {
      return state.battlefield.some(p => p.isForest);
    },
    onEnter(state, perm) {
      // Attach to the best Forest on the battlefield: prefer the one that produces the
      // most mana (Gaea's Cradle > Nykthos > any other Forest).
      // Store the enchanted land's permanent ID on the Sprawl perm for exact matching.
      const FOREST_PRIORITY = ['gaeas_cradle', 'nykthos', 'yavimaya'];
      const forests = state.battlefield.filter(p => p.isForest);
      const best = FOREST_PRIORITY.reduce((found, ck) => found ?? forests.find(p => p.cardKey === ck), null)
        ?? forests[0];
      if (perm && best) perm.enchantedLandId = best.id;
      return state;
    },
  },
  wild_growth: {
    name: 'Wild Growth', types: ['enchantment'], subtypes: ['Aura'], cost: 'G',
    // Enchant land. Whenever THE enchanted land is tapped for mana, add {G}.
    // Only one land is enchanted — same single-land model as Utopia Sprawl.
    canCast(state) {
      return state.battlefield.some(p => p.types.includes('land'));
    },
    onEnter(state, perm) {
      // Attach to best available land (prefer Forest for maximum synergy)
      const lands = state.battlefield.filter(p => p.types.includes('land'));
      const best = lands.find(p => p.isForest) ?? lands[0];
      if (perm && best) perm.enchantedLandId = best.id;
      return state;
    },
  },
  elvish_guidance: {
    name: 'Elvish Guidance', types: ['enchantment'], subtypes: ['Aura'], cost: '2G',
    // Enchant land. When that land is tapped for mana, it produces an additional {G}
    // per Elf on the battlefield in addition to its normal output.
    // Modeled: on ETB, mark the best available land with elvishGuidance=true.
    // actions.js tapForMana then adds +elfCount {G} whenever that land taps.
    onEnter(state) {
      const lands = state.battlefield.filter(p =>
        p.is('land') && !p.is('enchantment') && !p.tapped
      );
      if (lands.length === 0) return state;
      const target = lands.find(l => l.name === "Gaea's Cradle") ??
                     lands.find(l => l.isForest) ?? lands[0];
      const s = state.clone();
      s._ensureBF();
      const land = s.battlefield.find(p => p.id === target.id);
      if (land) {
        land.elvishGuidance = true;
        const elfCount = state.battlefield.filter(p => p.subtypes?.includes('Elf')).length;
        return s.log(`Elvish Guidance attached to ${target.name} (+${elfCount}{G} per tap)`);
      }
      return state;
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
    externallyImplemented: true,  // [drift-detector] impl in GameState/actions/combos
    // Artifacts and lands enter tapped (stax). Hostile to combo — noted.
    // Solver will not voluntarily cast this unless directed.
  },
  survival_fittest: {
    name: 'Survival of the Fittest', types: ['enchantment'], subtypes: [], cost: '1G',
    // Oracle: {G}, Discard a creature card: Search your library for a creature card,
    // reveal that card, put it into your hand, then shuffle.
    // Note: NO tap cost — this is an enchantment. Can be activated multiple times per turn
    // as long as you have {G} and a creature to discard.
    abilities: {
      tutor: {
        label: '{G}, Discard a creature: Search for a creature → hand',
        fn(state, perm) {
          // Pay {G} (no tap required — enchantment)
          const afterPay = state.payMana('G');
          if (!afterPay) return [];

          var cards = CARDS;

          const creaturesInHand = [...new Set(afterPay.hand)].filter(k =>
            cards[k]?.types.includes('creature')
          );
          if (creaturesInHand.length === 0) return [];

          // Find the best combo-completing creature in the library
          const bestKey = _bestCreatureTutorTarget(afterPay);
          if (!bestKey) return [];

          // Identify creatures in hand that are key combo pieces not yet on the battlefield.
          // Discarding e.g. Ashaya to fetch a dork loses the very piece we need to cast — and
          // worse, doing so in the middle of a Survival CHAIN (discard X→fetch Y, then discard
          // Y→fetch Z) just burns mana with no net change to hand composition. The protection
          // below blocks high-value combo pieces from being discarded.
          const PROTECT_THRESHOLD = 70; // score ≥ this = high-value combo piece
          const protectedKeys = new Set(
            creaturesInHand.filter(k =>
              (TUTOR_PRIORITY_SCORE[k] ?? 0) >= PROTECT_THRESHOLD &&
              !afterPay.battlefield.some(p => {
                return NAME_TO_KEY[p.name] === k;
              })
            )
          );
          // PRIOR BEHAVIOUR: when no unprotected discard option existed, the protection was
          // STRIPPED so the activation could fire anyway. This caused chain bugs: the solver
          // would discard a creature it had just tutored (because that was now the only thing
          // in hand), spending {G} per chain step with no progress on the win line. See user
          // report 2026-04-30.
          //
          // CURRENT BEHAVIOUR: keep protection unconditionally. If every hand creature is a
          // protected combo piece, return [] — the activation is genuinely not worth firing.
          // The detector tests in section 46 don't go through this fn (they have their own
          // discard-fodder check), so this is safe.
          const effectiveProtected = protectedKeys;

          // ALSO skip cards that were tutored to hand by a prior Survival/Fauna activation
          // and never cast. Discarding them to another activation produces a self-cancelling
          // chain (the user-reported chain bug, 2026-04-30). The score-based protection above
          // only covers high-value pieces (≥70); this catches mid-tier chains too.
          const freshlyTutored = _freshlyTutoredKeys(afterPay);

          const results = [];
          // Offer one action per creature we could discard (deduplicated by key)
          const seenDiscard = new Set();
          for (const discard of creaturesInHand) {
            if (seenDiscard.has(discard)) continue;
            if (discard === bestKey) continue;              // don't discard what we're fetching
            if (effectiveProtected.has(discard)) continue; // protect key un-cast pieces
            if (freshlyTutored.has(discard)) continue;     // protect freshly-tutored cards from chain abuse
            seenDiscard.add(discard);
            let s = afterPay.discardFromHand(discard, 'Survival of the Fittest discard cost'); if (!s) continue;
            const { state: ns, cardKey } = s.searchLibraryFor(k => k === bestKey);
            if (!cardKey) continue;
            // Put the fetched creature directly into hand (oracle: "put it into your hand")
            const ns2 = ns.addToHand(cardKey);
            results.push(ns2.log(
              `Survival of the Fittest: pay {G}, discard ${cards[discard].name} → ${cards[bestKey].name} to hand`
            ));
          }
          return results;
        },
      },
    },
  },
  lignify: {
    name: 'Lignify', types: ['enchantment'], subtypes: ['Aura','Treefolk'], cost: '1G',
    isRemoval: true,
    // Enchanted creature is a Treefolk 0/4 with no abilities.
    // In the solver context, this is only useful for targeting stax creatures
    // (Collector Ouphe) on our own battlefield OR in opponentStax.
    castFn(state) {
      const STAX_CREATURE_NAMES = new Set(['Collector Ouphe']);
      const results = [];
      // Target stax creatures on our battlefield
      const bfTarget = state.battlefield.find(p =>
        p.is('creature') && STAX_CREATURE_NAMES.has(p.name)
      );
      if (bfTarget) {
        let s = state.clone(); s._ensureBF();
        // Strip the creature's stax identity — replace with blank 0/4 Treefolk
        s = s.removeFromBattlefield(bfTarget.id, null);
        if (s) {
          const treefolk = new Permanent({
            id: s._nextId++, name: bfTarget.name + ' (Treefolk 0/4)', cardKey: 'blank_treefolk',
            types: ['creature'], subtypes: ['Treefolk'], tapped: bfTarget.tapped,
            summoningSick: bfTarget.summoningSick, power: 0, toughness: 4,
            counters: {}, abilitiesUsed: {},
          });
          s._ensureBF(); s.battlefield = [...s.battlefield, treefolk];
          s = s.log(`Lignify: ${bfTarget.name} → 0/4 Treefolk (no abilities)`);
          results.push(s);
        }
      }
      // Target stax creatures in opponentStax (specifically Collector Ouphe)
      const oppOuphe = [...state.opponentStax].find(e => STAX_CREATURE_NAMES.has(e.split('@')[0].trim()));
      if (oppOuphe) {
        const oppName = oppOuphe.split('@')[0].trim();
        let s = state.removeFromOpponentStax(oppName);
        s = s.log(`Lignify: opponent's ${oppName} → 0/4 Treefolk (no abilities)`);
        results.push(s);
      }
      return results;
    },
  },
  kenriths_transformation: {
    name: "Kenrith's Transformation", types: ['enchantment'], subtypes: ['Aura'], cost: '1G',
    // ETB: draw a card. Enchanted creature loses abilities, becomes 3/3 Elk.
    onEnter(state) {
      return state.playerDraws(0, 1); // draw on ETB
    },
  },
  growing_rites: {
    name: 'Growing Rites of Itlimoc', types: ['enchantment'], subtypes: ['Legendary'], cost: '2G',
    // ETB: look at the top four cards of your library. You may reveal a creature card
    //   from among them and put it into your hand. Put the rest on the bottom in any order.
    // End step: if you control four or more creatures, transform into Itlimoc.
    //
    // Implementation via castFn so branching works with the solver's action system:
    //   Branch A: enter Growing Rites; look at top 4; put best creature in hand (if any)
    //   Branch B: enter Growing Rites; no creature taken (or none available)
    //   Transform: if 4+ creatures present after resolution, flip to Itlimoc immediately
    //              (end-step approximation — player won't cast more creatures before EOT
    //               in a winning line, so the count is stable).
    castFn(state) {
      var cards = CARDS;

      // Enter Growing Rites onto the battlefield
      let base = state.enterBattlefield('growing_rites');
      base = base.log('Cast Growing Rites of Itlimoc');

      const results = [];

      // ── ETB look: top 4 cards of library ─────────────────────────────────
      const lib = base.players[0].library;
      const top4 = lib.slice(0, 4);
      const creatureKeys = [...new Set(top4)].filter(k => cards[k]?.types?.includes('creature'));

      // Build present set to skip cards already in hand/battlefield
      const present = new Set(base.hand);
      for (const p of base.battlefield) {
        const k = NAME_TO_KEY[p.name] ?? Object.keys(cards).find(ck => cards[ck].name === p.name);
        if (k) present.add(k);
      }

      // Pick the best creature from top 4 (highest TUTOR_PRIORITY_SCORE, not already present)
      let bestKey = null, bestScore = -1;
      for (const ck of creatureKeys) {
        if (present.has(ck)) continue;
        const sc = TUTOR_PRIORITY_SCORE[ck] ?? 0;
        if (sc > bestScore) { bestKey = ck; bestScore = sc; }
      }
      // Fallback: if all creatures are already present, take any one from top 4
      if (!bestKey && creatureKeys.length > 0) bestKey = creatureKeys[0];

      // Branch A: put creature into hand (if one was found)
      if (bestKey) {
        const { state: ns, cardKey: found } = base.searchLibraryFor(k => k === bestKey);
        if (found) {
          let s = ns.addToHand(found);
          s = s.log(`Growing Rites ETB: put ${cards[bestKey].name} into hand`);
          results.push(_applyTransform(s));
        }
      }

      // Branch B: no creature taken (always offered as an option)
      {
        const s = base.log('Growing Rites ETB: no creature taken');
        results.push(_applyTransform(s));
      }

      // Deduplicate (identical top-4 composition → same result for both branches)
      const seen = new Set();
      return results.filter(s => {
        const fp = s.fingerprint();
        if (seen.has(fp)) return false;
        seen.add(fp);
        return true;
      });

      // Helper: if 4+ creatures on board, transform to Itlimoc immediately
      function _applyTransform(s) {
        const creatureCount = s.creatures().length;
        if (creatureCount < 4) return s;
        const self = s.getPermanent('Growing Rites of Itlimoc');
        if (!self) return s;
        let ts = s.removeFromBattlefield(self.id, null); // DFC transform (leaves the game zone)
        if (!ts) return s;
        // [rules] "At the beginning of your end step, if you control four or
        // more creatures, transform Growing Rites of Itlimoc." The transform
        // happens in the END STEP — after that, no more sorcery-speed
        // (non-flash) spells can be cast this turn. So Itlimoc's mana can't
        // be chained into casting another creature THIS turn unless Yeva,
        // Nature's Herald (or another "creature spells have flash" effect)
        // is already on the battlefield, in which case the timing doesn't
        // matter. Enter tapped in the no-flash case to block that illegal
        // chain; Itlimoc untaps normally on the next untap step regardless.
        const hasFlashForCreatures = ts.hasPermanent("Yeva, Nature's Herald");
        ts = ts.enterBattlefield('itlimoc', { tapped: !hasFlashForCreatures });
        ts = ts.log(`Growing Rites transforms → Itlimoc, Cradle of the Sun (${creatureCount} creatures)` +
          (hasFlashForCreatures ? '' : ' — enters tapped (transforms in end step; no flash to cast more this turn)'));
        return ts;
      }
    },
  },
  titania_song: {
    name: "Titania's Song", types: ['enchantment'], subtypes: [], cost: '3G',
    // Each noncreature artifact loses all abilities and becomes an artifact creature
    // with power and toughness each equal to its mana value.
    // Key combo effect: Null Rod and Collector Ouphe lose their abilities.
    // Modeled as an ETB that strips stax artifacts on our battlefield and opponentStax.
    // Persistent static effects are not tracked turn-by-turn (no static engine),
    // so we apply the effect greedily on entry — same approach as Manglehorn/Rec Sage.
    onEnter(state) {
      const STAX_ARTIFACT_NAMES = new Set([
        'Null Rod', 'Collector Ouphe', 'Root Maze', 'Orb of Dreams',
        'Thorn of Amethyst', 'Trinisphere', 'Chalice of the Void',
        'Vexing Bauble', 'Disruptor Flute',
      ]);
      let s = state;
      // Strip all stax artifacts on our battlefield
      for (const p of [...s.battlefield]) {
        if (p.is('artifact') && !p.is('creature') && STAX_ARTIFACT_NAMES.has(p.name)) {
          s = s.removeFromBattlefield(p.id, null); // becomes a creature, stays on BF as blank
          if (s) s = s.log(`Titania's Song: ${p.name} loses all abilities`);
        }
      }
      // Strip all stax artifacts in opponentStax
      for (const entry of [...(s.opponentStax ?? [])]) {
        const name = entry.split('@')[0].trim();
        if (STAX_ARTIFACT_NAMES.has(name)) {
          s = s.removeFromOpponentStax(name);
          if (s) s = s.log(`Titania's Song: opponent's ${name} loses all abilities`);
        }
      }
      return s;
    },
  },

  // ─── BATTLES ─────────────────────────────────────────────────────────────

  invasion_of_ikoria: {
    name: 'Invasion of Ikoria', types: ['battle'], subtypes: ['Siege'], cost: 'XGG',
    canCast(state) {
      var cards = CARDS;
      var { parseCost: pc } = _GSM;
      const x = state.mana.total();
      const seen = new Set();
      for (const ck of state.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (!def?.types.includes('creature') || !def.cost) continue;
        if (def.subtypes?.includes('Human')) continue;
        const parsed = pc(def.cost);
        const mv = parsed.generic + Object.values(parsed.colored).reduce((a, b) => a + b, 0);
        if (mv <= x) return true;
      }
      return false;
    },
    // Oracle: When this Siege enters, search your library and/or graveyard for a
    // non-Human creature card with mana value X or less and put it onto the battlefield.
    // C-23 fix: previously branched over all eligible library creatures. Now picks best.
    castFn(state) {
      var cards = CARDS;
      var { parseCost: pc } = _GSM;
      const x = state.mana.total();
      let best = null, bestScore = -Infinity;
      const seen = new Set();
      for (const ck of state.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (!def?.types.includes('creature') || !def.cost) continue;
        if (def.subtypes?.includes('Human')) continue;
        const parsed = pc(def.cost);
        const mv = parsed.generic + Object.values(parsed.colored).reduce((a, b) => a + b, 0);
        if (mv > x) continue;
        const score = TUTOR_PRIORITY_SCORE[ck] ?? 0;
        if (score > bestScore) { bestScore = score; best = { ck, def, mv }; }
      }
      if (!best) return [drainMana(state).log(`Invasion of Ikoria X=${x}: no eligible non-Human creature`)];
      const { state: ns, cardKey } = state.searchLibraryFor(k => k === best.ck);
      if (!cardKey) return [drainMana(state).log(`Invasion of Ikoria X=${x}: no eligible non-Human creature`)];
      return [drainMana(ns).enterBattlefield(cardKey)
        .log(`Invasion of Ikoria X=${x} → ${best.def.name} (MV ${best.mv})`)];
    },
  },

  // ─── INSTANTS & SORCERIES ────────────────────────────────────────────────

  reclaim: {
    name: 'Reclaim', types: ['instant'], subtypes: [], cost: 'G',
    // Put target card from your graveyard on top of your library.
    // Modelled: find the highest-priority card in graveyard, set state.topDecked.
    // On the next draw (startNewTurn) that card comes to hand.
    castFn(state) {
      const gy = state.players[0]?.graveyard ?? [];
      if (gy.length === 0) return [drainMana(state).log('Reclaim: graveyard empty')];
      // Pick the highest-priority card from the graveyard
      let bestName = null, bestScore = -Infinity;
      for (const name of gy) {
        const ck = NAME_TO_KEY[name];
        const score = (ck ? (TUTOR_PRIORITY_SCORE[ck] ?? 0) : 0);
        if (score > bestScore) { bestScore = score; bestName = name; }
      }
      if (!bestName) bestName = gy[0];
      const ck = NAME_TO_KEY[bestName];
      // Remove from graveyard
      let s = drainMana(state); s = s.clone(); s._ensurePlayers();
      s.players[0] = s.players[0].clone();
      const idx = s.players[0].graveyard.indexOf(bestName);
      if (idx < 0) return [];
      s.players[0].graveyard = [
        ...s.players[0].graveyard.slice(0, idx),
        ...s.players[0].graveyard.slice(idx + 1),
      ];
      // Place on top of library (topDecked draws it next turn)
      if (ck) {
        s.topDecked = ck;
      } else {
        // Unknown key: prepend to library
        s.players[0] = s.players[0].clone();
        s.players[0].library = [bestName, ...s.players[0].library];
      }
      return [s.log(`Reclaim: put ${bestName} on top of library`)];
    },
  },

  return_of_the_wildspeaker: {
    name: 'Return of the Wildspeaker', types: ['instant'], subtypes: [], cost: '4G',
    // Choose one:
    //   Draw cards equal to greatest power among non-Human creatures you control.
    //   Non-Human creatures you control get +3/+3 until end of turn.
    // Solver always picks the draw mode (better for finding combo pieces).
    // Yeva is an Elf Shaman (non-Human), so she DOES count (power 4).
    castFn(state) {
      const nonHumans = state.creatures().filter(c => !c.subtypes?.includes('Human'));
      const greatestPower = nonHumans.reduce((max, c) => Math.max(max, c.power ?? 0), 0);
      let s = drainMana(state);
      if (greatestPower <= 0) {
        return [s.log('Return of the Wildspeaker: no non-Human creatures, draw 0')];
      }
      s = s.playerDraws(0, greatestPower);
      return [s.log(`Return of the Wildspeaker: draw ${greatestPower} (greatest power)`)];
    },
  },

  kamahls_will: {
    name: "Kamahl's Will", types: ['sorcery'], subtypes: [], cost: '3G',
    // Choose one or both:
    //   Animate target lands as 1/1 Elemental creatures with haste until EOT.
    //   Destroy all nonland permanents not controlled by a player who controls a Forest.
    // Solver: use for mass removal of opponent stax/threats (second mode).
    // Land animation is largely irrelevant in the solver (no attacking).
    castFn(state) {
      // Destroy all nonland permanents on opponent side (those tagged controller:'opponent'
      // or STAX_CARDS). We control a Forest (Yavimaya or actual Forest), so our perms survive.
      const toDestroy = state.battlefield.filter(p =>
        p.controller === 'opponent' || STAX_CARDS.has(p.cardKey)
      );
      let s = drainMana(state);
      for (const p of toDestroy) {
        s = s.removeFromBattlefield(p.id, 'graveyard') ?? s;
      }
      const msg = toDestroy.length > 0
        ? `Kamahl's Will: destroy ${toDestroy.map(p => p.name).join(', ')}`
        : "Kamahl's Will: no opponent nonland permanents to destroy";
      return [s.log(msg)];
    },
  },

  vines_of_vastwood: {
    name: 'Vines of Vastwood', types: ['instant'], subtypes: [], cost: 'G',
    // Kicker {G}: also give target creature +4/+4 until EOT.
    // Base: target creature can't be targeted by opponents this turn (hexproof-like).
    // In the solver, base protection is not mechanically tracked. Kicked version
    // pumps a creature — useful for pushing Wose Pathfinder mana or Ilysian/Leafkin.
    // We always kick (spend 2G total) when we have the extra mana, for the +4/+4.
    castFn(state) {
      const results = [];
      var cards = CARDS;
      // Base mode: 1G — no mechanical effect in solver (protection not tracked)
      {
        const s = drainMana(state);
        results.push(s.log('Vines of Vastwood: grant protection (base, no pump)'));
      }
      // Kicked mode: GG — +4/+4 on our biggest creature (Yeva is a valid target — Elf Shaman, not Human)
      {
        const kicked = state.payMana('G'); // extra G on top of base G already paid via castFn
        if (kicked) {
          const creatures = kicked.creatures();
          if (creatures.length > 0) {
            const target = creatures.reduce((a, b) => (a.power ?? 0) >= (b.power ?? 0) ? a : b);
            const s = kicked.clone(); s._ensureBF();
            const live = s.getPermanentById(target.id);
            if (live) {
              live.power = (live.power ?? 0) + 4;
              live.toughness = (live.toughness ?? 0) + 4;
            }
            results.push(drainMana(s).log(`Vines of Vastwood (kicked): +4/+4 on ${target.name}`));
          }
        }
      }
      return results;
    },
  },

  uncage_the_menagerie: {
    name: 'Uncage the Menagerie', types: ['sorcery'], subtypes: [], cost: 'XGG',
    // Search your library for up to X creatures with different names that each have mana value X.
    // Reveal them, put them into your hand, then shuffle.
    // Strategy: at X=2 find 2 different MV-2 creatures (mana dorks, utility);
    //           at X=3 find combo pieces; at X=4+ find high-impact creatures.
    // We pick the top TUTOR_PRIORITY_SCORE creatures of exactly that MV.
    castFn(state) {
      var cards = CARDS;
      var { parseCost: pc } = _GSM;
      const x = state.mana.total();
      if (x < 1) return [drainMana(state).log('Uncage the Menagerie: X=0, no creatures found')];

      // Find all unique creatures in library with mana value exactly X
      const candidates = [];
      const seen = new Set();
      for (const ck of state.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (!def?.types.includes('creature') || !def.cost) continue;
        const parsed = pc(def.cost);
        const mv = parsed.generic + Object.values(parsed.colored).reduce((a, b) => a + b, 0);
        if (mv !== x) continue;
        candidates.push({ ck, def, score: TUTOR_PRIORITY_SCORE[ck] ?? 0 });
      }
      // Sort by score descending, take up to X
      candidates.sort((a, b) => b.score - a.score);
      const picks = candidates.slice(0, x);

      if (picks.length === 0) {
        return [drainMana(state).log(`Uncage the Menagerie X=${x}: no MV-${x} creatures in library`)];
      }

      // Add all picked cards to hand
      let s = drainMana(state);
      for (const { ck } of picks) {
        const { state: ns, cardKey: found } = s.searchLibraryFor(k => k === ck);
        if (found) { s = ns.addToHand(found); }
      }
      const names = picks.map(p => p.def.name).join(', ');
      return [s.log(`Uncage the Menagerie X=${x} → ${names}`)];
    },
  },

  chord_of_calling: {
    name: 'Chord of Calling', types: ['instant'], subtypes: [], cost: 'XGGG',
    canCast(state) {
      var cards = CARDS;
      var { parseCost: pc } = _GSM;
      const x = state.mana.total();
      const seen = new Set();
      for (const ck of state.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (!def || !def.types.includes('creature') || !def.cost) continue;
        const parsed = pc(def.cost);
        const mv = parsed.generic + Object.values(parsed.colored).reduce((a, b) => a + b, 0);
        if (mv <= x) return true;
      }
      return false;
    },
    // C-23 fix: previously branched over all library creatures within MV budget.
    // Now picks the single highest-TUTOR_PRIORITY_SCORE creature.
    castFn(state) {
      var cards = CARDS;
      var { parseCost: pc } = _GSM;
      const x = state.mana.total();
      let best = null, bestScore = -Infinity;
      const seen = new Set();
      for (const ck of state.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (!def || !def.types.includes('creature') || !def.cost) continue;
        const parsed = pc(def.cost);
        const mv = parsed.generic + Object.values(parsed.colored).reduce((a,b)=>a+b,0);
        if (mv > x) continue;
        const score = TUTOR_PRIORITY_SCORE[ck] ?? 0;
        if (score > bestScore) { bestScore = score; best = { ck, def, mv }; }
      }
      if (!best) return [drainMana(state).log(`Chord of Calling X=${x}: no eligible creature`)];
      const { state: ns, cardKey } = state.searchLibraryFor(k => k === best.ck);
      if (!cardKey) return [drainMana(state).log(`Chord of Calling X=${x}: no eligible creature`)];
      return [drainMana(ns).enterBattlefield(cardKey)
        .log(`Chord of Calling X=${x} → ${best.def.name} (MV ${best.mv})`)];
    },
  },
  shared_summons: {
    name: 'Shared Summons', types: ['instant'], subtypes: [], cost: '3GG',
    // Oracle: Search library for up to two creature cards with different names,
    // reveal them, put them into your hand, then shuffle.
    // Strategy: find the two highest-priority missing combo pieces.
    castFn(state) {
      var cards = CARDS;

      // Priority scores for combo-relevant creatures (higher = more important)
      const PRIORITY = {
        ashaya: 88, temur_sabertooth: 85, kogla: 82,
        hope_tender: 80, quirion_ranger: 78, scryb_ranger: 76,
        argothian_elder: 75, ley_weaver: 74, magus_of_the_candelabra: 73,
        selvala: 70, karametra_acolyte: 68, circle_of_dreams_druid: 65,
        priest_of_titania: 63, elvish_archdruid: 61, wirewood_channeler: 59,
        wirewood_symbiote: 57, hyrax_tower_scout: 55,
        duskwatch_recruiter: 47, beast_whisperer: 45,
        endurance: 43, woodland_bellower: 40, fierce_empath: 35,
      };

      // Combo pieces needed (mirrors COMBO_REQUIRED_KEYS in actions.js)
      var { COMBO_REQUIRED_KEYS: COMBOS } = _CDM;

      // Collect all unique creature keys in the library
      const seen = new Set();
      const candidates = [];
      for (const ck of state.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (!def || !def.types.includes('creature')) continue;
        candidates.push(ck);
      }
      if (candidates.length === 0) return [];

      // Build present set (hand + battlefield)
      const present = new Set(state.hand);
      for (const p of state.battlefield) {
        const k = Object.keys(cards).find(key => cards[key].name === p.name);
        if (k) present.add(k);
      }

      // Functional equivalents: if one is already present, don't fetch the other
      const EQUIV = [
        new Set(['temur_sabertooth', 'kogla']),
        new Set(['quirion_ranger', 'scryb_ranger']),
        new Set(['argothian_elder', 'ley_weaver']),
      ];
      function isRedundant(ck) {
        return EQUIV.some(g => g.has(ck) && [...g].some(m => present.has(m)));
      }

      // Mark needed combo pieces (missing from combos that are 1-2 pieces away)
      const needed = new Set();
      for (const required of COMBOS) {
        const absent = required.filter(k => !present.has(k));
        if (absent.length <= 2) absent.forEach(k => needed.add(k));
      }
      // Remove redundant equivalents from needed
      for (const k of [...needed]) { if (isRedundant(k)) needed.delete(k); }

      // Sort: needed combo pieces first, then by priority score; skip redundant equivalents
      const ranked = candidates
        .filter(ck => !isRedundant(ck))  // never fetch a redundant equivalent
        .slice().sort((a, b) => {
          const aNeed = needed.has(a) ? 1000 : 0;
          const bNeed = needed.has(b) ? 1000 : 0;
          return (bNeed + (PRIORITY[b] ?? 0)) - (aNeed + (PRIORITY[a] ?? 0));
        });

      const results = [];
      const pick1 = ranked[0];
      const pick2 = ranked.length >= 2 ? ranked[1] : null;

      if (pick1) {
        const { state: ns1, cardKey: ck1 } = state.searchLibraryFor(k => k === pick1);
        if (ck1) {
          let ns1h = ns1.addToHand(ck1);
          if (pick2) {
            const { state: ns2, cardKey: ck2 } = ns1h.searchLibraryFor(k => k === pick2);
            if (ck2) {
              results.push(ns2.addToHand(ck2).log(
                `Shared Summons → find ${cards[ck1].name} + ${cards[ck2].name}`
              ));
              return results; // single best result is enough for solver
            }
          }
          results.push(ns1h.log(`Shared Summons → find ${cards[ck1].name}`));
        }
      }
      return results;
    },
  },
  summoners_pact: {
    name: "Summoner's Pact", types: ['instant'], subtypes: [], cost: '0',
    color: 'G', // Green colour indicator — cost {0} has no pips but card is green
    // Oracle: {0} — Search library for a green creature, put in hand.
    // At your next upkeep, pay {2}{G}{G} or lose the game.
    // pactOwed is set on the state so startNewTurn() enforces the payment.
    //
    // C-23 fix: previously branched over every green creature in library (~30+
    // results). Now picks the single highest-TUTOR_PRIORITY_SCORE green creature,
    // matching the approach of Green Sun's Zenith and Chord of Calling.
    castFn(state) {
      var cards = CARDS;
      let best = null, bestScore = -Infinity;
      const seen = new Set();
      for (const ck of state.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (!def || !def.types.includes('creature')) continue;
        if (!def.cost || !def.cost.includes('G')) continue; // green creatures only
        const score = TUTOR_PRIORITY_SCORE[ck] ?? 0;
        if (score > bestScore) { bestScore = score; best = { ck, def }; }
      }
      if (!best) return [state.log("Summoner's Pact: no green creature")];
      const { state: ns, cardKey } = state.searchLibraryFor(k => k === best.ck);
      if (!cardKey) return [state.log("Summoner's Pact: no green creature")];
      const result = ns.addToHand(cardKey).log(`Summoner's Pact → find ${best.def.name}`);
      result.pactOwed = true; // upkeep trigger: pay {2}{G}{G} next turn or lose
      return [result];
    },
  },
  archdruid_charm: {
    name: "Archdruid's Charm", types: ['instant'], subtypes: [], cost: 'GGG',
    // Oracle mode 1: Search library for creature or land → battlefield (if land, tapped) or hand.
    // Modes 2 (fight) and 3 (exile artifact/enchantment) not useful to model for combos.
    // C-23 fix: previously branched over all library creatures + lands. Now picks best
    // creature (to hand) and best land (to battlefield, tapped) — 2 results max.
    castFn(state) {
      var cards = CARDS;
      const LAND_PRIORITY = ['gaeas_cradle','nykthos','deserted_temple','yavimaya','ancient_tomb',
                             'wirewood_lodge','geier_reach_sanitarium','boseiju','forest'];
      const onBF = new Set(state.battlefield.map(p =>
        Object.keys(cards).find(k => cards[k].name === p.name)).filter(Boolean));
      let bestCreature = null, bestCreatureScore = -Infinity;
      let bestLand = null;
      const seen = new Set();
      for (const ck of state.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (!def) continue;
        if (def.types.includes('creature')) {
          const score = TUTOR_PRIORITY_SCORE[ck] ?? 0;
          if (score > bestCreatureScore) { bestCreatureScore = score; bestCreature = { ck, def }; }
        } else if (def.types.includes('land')) {
          const pri = LAND_PRIORITY.indexOf(ck);
          const score = pri === -1 ? 99 : pri;
          const alreadyPresent = onBF.has(ck);
          if (!bestLand || score < bestLand.score || (score === bestLand.score && !alreadyPresent && bestLand.alreadyPresent)) {
            bestLand = { ck, def, score, alreadyPresent };
          }
        }
      }
      const results = [];
      if (bestCreature) {
        const { state: ns, cardKey } = state.searchLibraryFor(k => k === bestCreature.ck);
        if (cardKey) results.push(ns.addToHand(cardKey).log(`Archdruid's Charm → find ${bestCreature.def.name}`));
      }
      if (bestLand) {
        const { state: ns, cardKey } = state.searchLibraryFor(k => k === bestLand.ck);
        if (cardKey) {
          const ns2 = ns.enterBattlefield(cardKey);
          const landPerm = ns2.battlefield.find(p => p.name === bestLand.def.name && !p.tapped);
          if (landPerm) landPerm.tapped = true;
          results.push(ns2.log(`Archdruid's Charm → fetch land ${bestLand.def.name} (tapped)`));
        }
      }
      return results.length ? results : [state.log("Archdruid's Charm: nothing found")];
    },
  },
  force_of_vigor: {
    name: 'Force of Vigor', types: ['instant'], subtypes: [], cost: '2GG',
    isRemoval: true,
    // Destroy up to two target artifacts and/or enchantments.
    // Alternative cost: if not your turn, exile a green card from hand instead.
    // Modeled: two modes —
    //   (a) Normal cast: pay {2GG}, destroy up to 2 stax targets.
    //   (b) Free cast (opponent turn): exile a green card, destroy up to 2 stax targets.
    //       The free mode is offered as a handAbility on the opponent's turn.
    castFn(state) {
      const STAX_NAMES = new Set([
        'Null Rod', 'Collector Ouphe', 'Root Maze', 'Orb of Dreams',
        'Thorn of Amethyst', 'Trinisphere', 'Chalice of the Void',
        'Vexing Bauble', 'Disruptor Flute',
      ]);
      const bfTargets = state.battlefield.filter(p =>
        (p.is('artifact') || p.is('enchantment')) && STAX_NAMES.has(p.name)
      );
      const oppTargets = [...state.opponentStax].filter(e => STAX_NAMES.has(e.split('@')[0].trim()));
      if (bfTargets.length === 0 && oppTargets.length === 0) return [];
      let s = state;
      let destroyed = 0;
      // Destroy up to 2: BF targets first, then opponentStax
      for (const t of bfTargets.slice(0, 2)) {
        s = s.removeFromBattlefield(t.id, 'graveyard');
        if (!s) return [];
        s = s.log(`Force of Vigor: destroy ${t.name}`);
        destroyed++;
        if (destroyed >= 2) break;
      }
      if (destroyed < 2) {
        for (const opp of oppTargets.slice(0, 2 - destroyed)) {
          const oppName = opp.split('@')[0].trim();
          s = s.removeFromOpponentStax(oppName);
          s = s.log(`Force of Vigor: destroy opponent's ${oppName}`);
          destroyed++;
        }
      }
      return [s];
    },
    // Free cast on opponent's turn: exile a green card from hand
    handAbilities: {
      free_cast: {
        label: 'Force of Vigor (free): exile a green card → destroy up to 2 stax',
        fn(state, cardKey) {
          if (!state.isOpponentTurn) return null;
          const STAX_NAMES = new Set([
            'Null Rod', 'Collector Ouphe', 'Root Maze', 'Orb of Dreams',
            'Thorn of Amethyst', 'Trinisphere', 'Chalice of the Void',
            'Vexing Bauble', 'Disruptor Flute',
          ]);
          const targets = state.battlefield.filter(p =>
            (p.is('artifact') || p.is('enchantment')) && STAX_NAMES.has(p.name)
          );
          const oppTargets2 = [...state.opponentStax].filter(e => STAX_NAMES.has(e.split('@')[0].trim()));
          if (targets.length === 0 && oppTargets2.length === 0) return null;
          // Find a green card in hand to exile (not Force of Vigor itself)
          const exileCandidate = state.hand.find(k =>
            k !== cardKey && CARDS[k]?.cost?.includes('G')
          );
          if (!exileCandidate) return null;
          let s = state.discardFromHand(cardKey, 'Force of Vigor cast (free)');   // remove Force of Vigor
          if (!s) return null;
          s = s.discardFromHand(exileCandidate, 'Force of Vigor exile cost');     // exile the green card
          if (!s) return null;
          s = s.clone(); s.exile = [...(s.exile ?? []), CARDS[exileCandidate]?.name ?? exileCandidate];
          let destroyed2 = 0;
          for (const t of targets.slice(0, 2)) {
            s = s.removeFromBattlefield(t.id, 'graveyard');
            if (!s) return null;
            s = s.log(`Force of Vigor (free, exile ${CARDS[exileCandidate]?.name}): destroy ${t.name}`);
            destroyed2++;
            if (destroyed2 >= 2) break;
          }
          if (destroyed2 < 2) {
            for (const opp of oppTargets2.slice(0, 2 - destroyed2)) {
              const oppName2 = opp.split('@')[0].trim();
              s = s.removeFromOpponentStax(oppName2);
              s = s.log(`Force of Vigor (free, exile ${CARDS[exileCandidate]?.name}): destroy opponent's ${oppName2}`);
            }
          }
          return s;
        },
      },
    },
  },
  beast_within: {
    name: 'Beast Within', types: ['instant'], subtypes: [], cost: '2G',
    // Oracle: Destroy target permanent. Its controller creates a 3/3 green Beast creature token.
    // Solver use-cases:
    //   1. Kill own creature while its ETB is on the stack (Hitzel Kogla variant —
    //      destroy Endurance so Witness can recur it from GY each cycle).
    //   2. Remove opponent stax artifacts/enchantments (removal role).
    //   3. Beast token generation engine (with Badgermole/Witness loops).
    castFn(state) {
      const results = [];
      const seen = new Set();

      const makeToken = (s) => {
        const ns = s.clone(); ns._ensureBF();
        ns.battlefield.push(new Permanent({
          cardKey: '__beast_token__', name: 'Beast Token',
          types: ['creature'], subtypes: ['Beast'],
          power: 3, toughness: 3, summoningSick: true, isToken: true,
        }));
        return ns;
      };

      const tryTarget = (perm, label) => {
        if (seen.has(perm.name)) return;
        seen.add(perm.name);
        const s = state.removeFromBattlefield(perm.id, 'graveyard');
        if (!s) return;
        results.push(makeToken(s).log(`Beast Within → destroy ${perm.name}, create 3/3 Beast token${label ? ' ' + label : ''}`));
      };

      // Priority 1: key Hitzel targets (Endurance — destroy while ETB on stack)
      for (const p of state.battlefield.filter(p => p.name === 'Endurance'))
        tryTarget(p, '');

      // Priority 2: stax targets (removal role)
      const STAX = new Set(['Null Rod','Collector Ouphe','Thorn of Amethyst',
        'Trinisphere','Root Maze','Orb of Dreams','Chalice of the Void',
        'Disruptor Flute','Titania\'s Song']);
      for (const p of state.battlefield.filter(p => STAX.has(p.name)))
        tryTarget(p, '(stax)');

      // Priority 3: expendable own creature (beast token loop / general removal)
      const KEEP = new Set(['Ashaya, Soul of the Wild',"Yeva, Nature's Herald",
        'Temur Sabertooth','Kogla, the Titan Ape','Eternal Witness',
        'Quirion Ranger','Scryb Ranger','Arbor Elf','Beast Token']);
      const expendable = state.battlefield.find(p =>
        p.types?.includes('creature') && !KEEP.has(p.name) && !seen.has(p.name)
      );
      if (expendable) tryTarget(expendable, '');

      return results.length > 0 ? results : [state.log('Beast Within: no legal target')];
    },
  },
  vitalize: {
    name: 'Vitalize', types: ['instant'], subtypes: [], cost: 'G',
    // Oracle: Untap all creatures you control.
    // Very powerful with mana dorks — effectively doubles available mana.
    castFn(state) {
      let s = state.clone();
      s._ensureBF();
      let untapped = 0;
      for (const p of s.battlefield) {
        if (p.types?.includes('creature') && p.tapped) {
          p.tapped = false;
          untapped++;
        }
      }
      return [s.log(`Vitalize: untap ${untapped} creature${untapped !== 1 ? 's' : ''}`)];
    },
  },
  // ─── Custom-library cards (not in DEFAULT_DECKLIST) ───────────────────────
  vengeant_earth: {
    name: 'Vengeant Earth', types: ['instant'], subtypes: [], cost: '1G',
    // Oracle: Target creature or land you control becomes a 4/4 Elemental
    // creature with haste in addition to its other types until end of turn.
    // It must be blocked this turn if able.
    //
    // Key use (O-12 follow-up): animates a LAND (e.g. Geier Reach
    // Sanitarium) into a creature with haste for the rest of the turn, so a
    // Quirion/Scryb Ranger ("untap target creature") can legally target it —
    // an alternative to Destiny Spinner. Because the effect lasts "until
    // end of turn" regardless of how many times the animated permanent is
    // tapped/untapped, ONE cast is enough to enable a whole turn's worth of
    // repeated Ranger-untaps (each Ranger activation still needs its own
    // bounce+recast to reset its "once each turn" restriction — unchanged
    // from the existing model).
    //
    // "It must be blocked this turn if able" is a combat drawback not
    // modeled here (no opponent-combat tracking for utility lands/dorks).
    castFn(state) {
      const ap = state.payMana('1G');
      if (!ap) return [];
      // Targets: any land you control not already a creature (primary use —
      // animate a utility land for a creature-untapper), or any creature you
      // control (secondary use — pump to 4/4 + haste).
      const targetIds = ap.battlefield
        .filter(p => (p.is('land') && !p.types.includes('creature')) || p.types.includes('creature'))
        .map(p => p.id);
      if (targetIds.length === 0) return [ap.log('Vengeant Earth: no legal target')];
      const results = [];
      const seen = new Set();
      for (const tid of targetIds) {
        let s = ap.clone();
        s._ensureBF();
        const tgt = s.getPermanentById(tid);
        if (!tgt) continue;
        const wasLand = tgt.types.includes('land') && !tgt.types.includes('creature');
        tgt._ensureOwnTypes();
        if (!tgt.types.includes('creature')) tgt.types.push('creature');
        if (!tgt.subtypes.includes('Elemental')) tgt.subtypes.push('Elemental');
        tgt.power = 4;
        tgt.toughness = 4;
        tgt.summoningSick = false; // haste
        s = s.log(`Vengeant Earth: ${tgt.name} becomes a 4/4 Elemental with haste` +
          (wasLand ? ' (now a creature — untappable by Quirion/Scryb Ranger)' : ''));
        const fp = s.fingerprint();
        if (seen.has(fp)) continue;
        seen.add(fp);
        results.push(s);
      }
      return results.length ? results : [ap.log('Vengeant Earth: no legal target')];
    },
  },

  touch_of_vitae: {
    name: 'Touch of Vitae', types: ['instant'], subtypes: [], cost: '2G',
    // Oracle: Target creature gains haste + "{0}: Untap this creature (once)."
    // Draw a card at the beginning of next turn's upkeep.
    // Solver: give haste to the highest-value tapped creature (removes summoning sickness).
    // The one-shot untap is modelled as immediate untap.
    castFn(state) {
      const targets = state.creatures().filter(c => c.summoningSick || c.tapped);
      if (targets.length === 0) {
        return [state.log('Touch of Vitae: no useful target')];
      }
      const seen = new Set();
      const results = [];
      for (const target of targets) {
        let s = state.clone();
        s._ensureBF();
        const perm = s.getPermanentById(target.id);
        if (!perm) continue;
        perm.summoningSick = false;
        perm.tapped = false; // immediate untap from the {0} ability
        s = s.log(`Touch of Vitae → ${target.name} gains haste + untap`);
        const fp = s.fingerprint();
        if (seen.has(fp)) continue;
        seen.add(fp);
        results.push(s);
      }
      return results;
    },
  },
  legolas_quick_reflexes: {
    name: "Legolas's Quick Reflexes", types: ['instant'], subtypes: [], cost: 'G',
    // Oracle: Split second. Untap target creature + hexproof until EOT.
    // Key use: untap a key mana dork mid-combo (like Hope Tender, Selvala).
    castFn(state) {
      const results = [];
      const targets = state.creatures().filter(c => c.tapped);
      if (targets.length === 0) return [state.log("Legolas's Quick Reflexes: no tapped creature")];
      const seen = new Set();
      for (const target of targets) {
        if (seen.has(target.name)) continue;
        seen.add(target.name);
        let s = state.clone();
        s._ensureBF();
        const perm = s.getPermanentById(target.id);
        if (!perm) continue;
        perm.tapped = false;
        results.push(s.log(`Legolas's Quick Reflexes → untap ${target.name}`));
      }
      return results;
    },
  },
  infectious_bite: {
    name: 'Infectious Bite', types: ['instant'], subtypes: [], cost: '1G',
    // Oracle: Target creature you control deals damage to a creature you don't control.
    // Each opponent gets a poison counter. Win with 10 poison counters.
    // Solver: this card IS in the WIN_CONDITIONS (checkVictory detects it in hand).
    // The castFn here just models "cast it once" — no opponent creature modelled,
    // so we treat each cast as dealing 1 poison counter to all opponents.
    castFn(state) {
      // With infinite mana, casting this 10 times = 10 poison counters = win.
      // Win condition detection handles the actual win; here we just move it to GY.
      // Return the state unchanged (GY placement handled by dispatch).
      return [state.log('Infectious Bite: cast (each opponent gets a poison counter)')];
    },
  },
  natures_claim: {
    name: "Nature's Claim", types:['instant'], subtypes:[], cost:'G',
    isRemoval: true,
    // {G}: Destroy target artifact or enchantment. Its controller gains 4 life.
    castFn(state) {
      const targets = state.battlefield.filter(p => p.is('artifact') || p.is('enchantment'));
      if (targets.length === 0) return [];
      return targets.map(t => {
        let s = state.removeFromBattlefield(t.id, 'graveyard');
        if (!s) return null;
        s = s.clone(); s.life = (s.life ?? 40) + 4;
        return s.log(`Nature's Claim: destroy ${t.name}, gain 4 life`);
      }).filter(Boolean);
    },
  },

  ram_through: {
    name: 'Ram Through', types:['instant'], subtypes:[], cost:'1G',
    // {1}{G}: Target creature you control deals damage equal to its power to
    // target creature you don't control. Trample excess to player/planeswalker.
    // In single-player: modeled as fight-style — destroys target creature whose
    // toughness ≤ attacker's power. Most useful to remove blockers (minimal combo use).
    intentionalStub: true,  // [drift-detector] marks effective-stub castFn for ref/implementation_gaps.md
    castFn(state) {
      const attackers = state.battlefield.filter(p => p.is('creature') && (p.power ?? 0) > 0);
      if (attackers.length === 0) return [];
      // No opponent creatures in single-player model — return empty (no targets)
      // but still offer the action if there are own stax creatures to consider.
      return [];
    },
  },

  tail_swipe: {
    name: 'Tail Swipe', types:['instant'], subtypes:[], cost:'G',
    // {G}: Choose target creature you control and target creature you don't control.
    // If this spell was cast during your main phase, the creature you control gets +1/+1.
    // Then those creatures fight.
    // In single-player: minimal combo relevance — stub castFn.
    intentionalStub: true,  // [drift-detector] effective-stub castFn
    castFn(state) { return []; },
  },

  bouncers_beatdown: {
    name: "Bouncer's Beatdown", types:['instant'], subtypes:[], cost:'2G',
    // {2}{G}: Target creature or planeswalker takes X damage where X = greatest power
    // among creatures you control. Costs {2} less if that permanent is black.
    // In single-player: minimal combo relevance — stub castFn.
    intentionalStub: true,  // [drift-detector] effective-stub castFn
    castFn(state) { return []; },
  },
  autumn_veil:            { name:"Autumn's Veil",            types:['instant'],  subtypes:[], cost:'G'    },
  veil_of_summer: {
    name: 'Veil of Summer', types: ['instant'], subtypes: [], cost: 'G',
    // Oracle: Draw a card if an opponent cast a blue or black spell this turn.
    // Spells can't be countered + hexproof from blue/black until EOT.
    // Solver: always draw 1 card (simplification — the draw is the main value).
    castFn(state) {
      return [state.playerDraws(0, 1).log('Veil of Summer: draw a card')];
    },
  },
  // warping_wail stub removed — implementation is above at warping_wail
  emerald_charm: {
    name: 'Emerald Charm', types: ['instant'], subtypes: [], cost: 'G',
    // Oracle mode 1: Untap target permanent.
    // Modes 2 (destroy enchantment) and 3 (remove flying) not useful for combos.
    // Solver: only implements mode 1 — untap any tapped permanent.
    castFn(state) {
      const results = [];
      const tapped = state.battlefield.filter(p => p.tapped);
      if (tapped.length === 0) return [state.log('Emerald Charm: no tapped permanent')];
      const seen = new Set();
      for (const perm of tapped) {
        if (seen.has(perm.name)) continue;
        seen.add(perm.name);
        let s = state.clone();
        s._ensureBF();
        const p = s.getPermanentById(perm.id);
        if (!p) continue;
        p.tapped = false;
        results.push(s.log(`Emerald Charm → untap ${perm.name}`));
      }
      return results;
    },
  },
  noxious_revival: {
    name: 'Noxious Revival', types: ['instant'], subtypes: [], cost: 'G',
    // Oracle: {G/P} — Put target card from any graveyard on top of its owner's library.
    // Cost: {G} or 2 life. Solver uses {G} (always available with mana dorks).
    // Strategy: put the highest-priority missing combo piece from OUR graveyard on top.
    // Sets topDecked so startNewTurn draws it deterministically next turn.
    castFn(state) {
      var cards = CARDS;
      const gy = state.players[0].graveyard; // array of card names
      if (gy.length === 0) return [state.log('Noxious Revival: empty graveyard')];

      // Build present set
      const present = new Set(state.hand);
      for (const p of state.battlefield) {
        const ck = NAME_TO_KEY[p.name]; if (ck) present.add(ck);
      }

      // Find best combo piece in graveyard
      let bestIdx = -1, bestMissing = Infinity;
      for (let i = 0; i < gy.length; i++) {
        const ck = NAME_TO_KEY[gy[i]];
        if (!ck) continue;
        for (const req of COMBO_REQUIRED_KEYS) {
          if (!req.includes(ck)) continue;
          const missing = req.filter(k => !present.has(k)).length;
          if (missing < bestMissing) { bestMissing = missing; bestIdx = i; }
        }
      }
      const targetIdx = bestIdx >= 0 ? bestIdx : 0;
      const targetName = gy[targetIdx];
      const targetKey = NAME_TO_KEY[targetName] ?? Object.keys(cards).find(k => cards[k].name === targetName);

      let s = state.clone();
      s._ensurePlayers();
      s.players[0] = s.players[0].clone();
      s.players[0].graveyard = [
        ...s.players[0].graveyard.slice(0, targetIdx),
        ...s.players[0].graveyard.slice(targetIdx + 1),
      ];
      // Put on top of library — set topDecked for deterministic draw
      if (targetKey) s.topDecked = targetKey;
      return [s.log(`Noxious Revival → ${targetName} on top of library`)];
    },
  },
  worldly_tutor: {
    name: 'Worldly Tutor', types: ['instant'], subtypes: [], cost: 'G',
    canCast(state) {
      var cards = CARDS;
      const seen = new Set();
      for (const ck of state.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (def?.types.includes('creature')) return true;
      }
      return false;
    },
    // Sets state.topDecked so startNewTurn knows to draw exactly that card into hand.
    // C-23 fix: previously branched over all library creatures. Now picks best target.
    castFn(state) {
      var cards = CARDS;
      let best = null, bestScore = -Infinity;
      const seen = new Set();
      for (const ck of state.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (!def || !def.types.includes('creature')) continue;
        const score = TUTOR_PRIORITY_SCORE[ck] ?? 0;
        if (score > bestScore) { bestScore = score; best = { ck, def }; }
      }
      if (!best) return [state.log('Worldly Tutor: no creature in library')];
      const { state: ns, cardKey } = state.searchLibraryFor(k => k === best.ck);
      if (!cardKey) return [state.log('Worldly Tutor: no creature in library')];
      const ns2 = ns.clone();
      ns2._ensurePlayers();
      ns2.players[0] = ns2.players[0].clone();
      ns2.players[0].library = [cardKey, ...ns2.players[0].library];
      ns2.topDecked = cardKey;
      return [ns2.log(`Worldly Tutor → put ${best.def.name} on top of library`)];
    },
  },
  crop_rotation: {
    name: 'Crop Rotation', types: ['instant'], subtypes: [], cost: 'G',
    // Oracle: As an additional cost, sacrifice a land. Search → put land onto battlefield → shuffle.
    castFn(state) {
      var cards = CARDS;
      const lands = state.lands();
      if (lands.length === 0) return [];
      const KEEP = new Set(['gaeas_cradle','nykthos','yavimaya','wirewood_lodge','geier_reach','deserted_temple']);
      const sacrificeable = lands.filter(l => {
        const ck = Object.keys(cards).find(k => cards[k].name === l.name);
        return !KEEP.has(ck);
      });
      const sacLand = (sacrificeable.length > 0 ? sacrificeable : lands)[0];
      const afterSac = state.removeFromBattlefield(sacLand.id, 'graveyard');
      if (!afterSac) return [];
      // C-23 fix: pick the single highest-priority land from library.
      // Non-basic engine lands already on the battlefield are skipped first —
      // fetching a second Cradle is always worse than fetching a new utility land.
      const LAND_PRIORITY = ['gaeas_cradle','nykthos','deserted_temple','yavimaya','ancient_tomb',
                             'wirewood_lodge','geier_reach_sanitarium','boseiju',
                             'emergence_zone','forest'];
      const onBF = new Set(afterSac.battlefield.map(p => {
        return Object.keys(cards).find(k => cards[k].name === p.name);
      }).filter(Boolean));
      // Determine which engine lands are already present (skip duplicates)
      const UNIQUE_LANDS = new Set(['gaeas_cradle','nykthos','deserted_temple','yavimaya','ancient_tomb',
                                    'wirewood_lodge','geier_reach_sanitarium','boseiju','emergence_zone']);
      let best = null;
      const seen = new Set();
      for (const ck of afterSac.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (!def || !def.types.includes('land')) continue;
        // Skip unique engine lands already on the battlefield
        if (UNIQUE_LANDS.has(ck) && onBF.has(ck)) continue;
        const pri = LAND_PRIORITY.indexOf(ck);
        const score = pri === -1 ? 99 : pri;
        if (!best || score < best.score) best = { ck, def, score };
      }
      if (!best) return [afterSac.log('Crop Rotation: no land in library')];
      const { state: ns, cardKey } = afterSac.searchLibraryFor(k => k === best.ck);
      if (!cardKey) return [afterSac.log('Crop Rotation: no land in library')];
      return [ns.enterBattlefield(cardKey).log('Crop Rotation: sac ' + sacLand.name + ' → fetch ' + best.def.name)];
    },
  },
  green_suns_zenith: {
    name: "Green Sun's Zenith", types: ['sorcery'], subtypes: [], cost: 'XG',
    reshufflesIntoLibrary: true, // oracle: "Shuffle Green Sun's Zenith into its owner's library"
    canCast(state) {
      // Don't offer GSZ if there's no green creature in the library within the mana budget.
      var cards = CARDS;
      const xMax = state.mana.total();
      const seen = new Set();
      for (const ck of state.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (!def || !def.types.includes('creature')) continue;
        if (!def.cost || !def.cost.includes('G')) continue;
        const parsed = parseCost(def.cost);
        const mv = parsed.generic + Object.values(parsed.colored).reduce((a,b)=>a+b,0);
        if (mv <= xMax) return true;
      }
      return false;
    },
    castFn(state) {
      var cards = CARDS;
      const xMax = state.mana.total();
      let best = null, bestScore = -Infinity;
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
        const score = TUTOR_PRIORITY_SCORE[ck] ?? 0;
        if (score > bestScore) { bestScore = score; best = { ck, def, mv }; }
      }
      if (!best) return [drainMana(state).log("Green Sun's Zenith: no eligible creature")];
      const { state: ns, cardKey } = state.searchLibraryFor(k => k === best.ck);
      if (!cardKey) return [drainMana(state).log("Green Sun's Zenith: no eligible creature")];
      return [drainMana(ns).enterBattlefield(cardKey).log(`Green Sun's Zenith → fetch ${best.def.name} (MV ${best.mv})`)];
    },
  },
  finale_of_devastation: {
    name: 'Finale of Devastation', types: ['sorcery'], subtypes: [], cost: 'XGG',
    // Oracle: Search library AND/OR graveyard for creature with MV ≤ X → battlefield.
    // If X ≥ 10: all creatures get +X/+X and haste.
    // Solver: with infinite mana X is unbounded → fetch the best creature available.
    // The win condition (X≥10 giving haste) is handled in checkVictory.
    castFn(state) {
      var cards = CARDS;
      var { parseCost: pc } = _GSM;
      const x = state.mana.total();
      // C-23 fix: pick single best target from library (highest score within MV)
      let best = null, bestScore = -Infinity;
      const seen = new Set();
      for (const ck of state.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (!def || !def.types.includes('creature') || !def.cost) continue;
        const parsed = pc(def.cost);
        const mv = parsed.generic + Object.values(parsed.colored).reduce((a,b)=>a+b,0);
        if (mv > x) continue;
        const score = TUTOR_PRIORITY_SCORE[ck] ?? 0;
        if (score > bestScore) { bestScore = score; best = { ck, def, mv, src: 'library' }; }
      }
      // Also check graveyard for higher-priority targets
      for (const name of state.players[0].graveyard) {
        const ck = Object.keys(cards).find(k => cards[k].name === name);
        if (!ck || seen.has(ck) || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (!def || !def.types.includes('creature') || !def.cost) continue;
        const parsed = pc(def.cost);
        const mv = parsed.generic + Object.values(parsed.colored).reduce((a,b)=>a+b,0);
        if (mv > x) continue;
        const score = TUTOR_PRIORITY_SCORE[ck] ?? 0;
        if (score > bestScore) { bestScore = score; best = { ck, def, mv, src: 'graveyard', name }; }
      }
      if (!best) return [drainMana(state).log(`Finale of Devastation X=${x}: no target`)];
      if (best.src === 'library') {
        const { state: ns, cardKey } = state.searchLibraryFor(k => k === best.ck);
        if (!cardKey) return [drainMana(state).log(`Finale of Devastation X=${x}: no target`)];
        return [drainMana(ns).enterBattlefield(cardKey)
          .log(`Finale of Devastation X=${x} → ${best.def.name} (MV ${best.mv}) from library`)];
      } else {
        let s = state.clone();
        s._ensurePlayers();
        s.players[0] = s.players[0].clone();
        const gyIdx = s.players[0].graveyard.indexOf(best.name);
        if (gyIdx >= 0) s.players[0].graveyard = [...s.players[0].graveyard.slice(0,gyIdx), ...s.players[0].graveyard.slice(gyIdx+1)];
        s = drainMana(s).enterBattlefield(best.ck);
        return [s.log(`Finale of Devastation X=${x} → ${best.def.name} (MV ${best.mv}) from graveyard`)];
      }
    },
  },
  natural_order: {
    name: 'Natural Order', types: ['sorcery'], subtypes: [], cost: '2GG',
    // Oracle: Sacrifice a green creature as additional cost. Search → any green creature onto BF → shuffle.
    // C-23 fix: previously branched over all green library creatures. Now picks best target.
    castFn(state) {
      var cards = CARDS;
      const KEEP = new Set(['Ashaya, Soul of the Wild','Temur Sabertooth','Kogla, the Titan Ape',
                            'Selvala, Heart of the Wilds','Quirion Ranger','Scryb Ranger','Hope Tender']);
      const greenCreatures = state.creatures().filter(c => {
        const ck = Object.keys(cards).find(k => cards[k].name === c.name);
        return cards[ck]?.cost?.includes('G');
      });
      if (greenCreatures.length === 0) return [];
      const expendable = greenCreatures.filter(c => !KEEP.has(c.name));
      const pool = expendable.length > 0 ? expendable : greenCreatures;
      // Sacrifice the LEAST combo-relevant creature (lowest tutor priority score)
      // so high-value pieces like Priest of Titania are preserved on the battlefield.
      const cardKeyOf = c => Object.keys(cards).find(k => cards[k].name === c.name);
      const sacCreature = pool.reduce((best, c) => {
        const score = TUTOR_PRIORITY_SCORE[cardKeyOf(c)] ?? 0;
        const bestScore = TUTOR_PRIORITY_SCORE[cardKeyOf(best)] ?? 0;
        return score < bestScore ? c : best;
      });
      const afterSac = state.removeFromBattlefield(sacCreature.id, 'graveyard');
      if (!afterSac) return [];
      const sacCreatureKey = Object.keys(cards).find(k => cards[k].name === sacCreature.name) ?? null;
      let best = null, bestScore = -Infinity;
      const seen = new Set();
      for (const ck of afterSac.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        if (sacCreatureKey && ck === sacCreatureKey) continue;
        const def = cards[ck];
        if (!def || !def.types.includes('creature') || !def.cost?.includes('G')) continue;
        const score = TUTOR_PRIORITY_SCORE[ck] ?? 0;
        if (score > bestScore) { bestScore = score; best = { ck, def }; }
      }
      if (!best) return [afterSac.log('Natural Order: no green creature in library')];
      const { state: ns, cardKey } = afterSac.searchLibraryFor(k => k === best.ck);
      if (!cardKey) return [afterSac.log('Natural Order: no green creature in library')];
      return [ns.enterBattlefield(cardKey).log(`Natural Order: sac ${sacCreature.name} → fetch ${best.def.name}`)];
    },
  },
  eldritch_evolution: {
    name: 'Eldritch Evolution', types: ['sorcery'], subtypes: [], cost: '1GG',
    // Oracle: As an additional cost, sacrifice a creature.
    // Search library for a creature with MV ≤ 2 + sacrificed creature's MV.
    // Put it onto the battlefield, then shuffle. Exile Eldritch Evolution.
    //
    // Strategy: sacrifice the lowest-value creature available (mana dork)
    // to maximise the target MV ceiling. A 1-drop dork (MV 1) lets us fetch
    // MV ≤ 3. A 2-drop lets us fetch MV ≤ 4. A 3-drop lets us fetch MV ≤ 5
    // (Ashaya, Temur Sabertooth, etc.).
    //
    // PERF NOTE (2026-04-30): the inner loop previously called
    // `afterSac.searchLibraryFor(k => k === ck)` per eligible target, doing a
    // redundant state.clone every iteration. With 7 creatures on bf and ~30
    // eligible targets that's 7 × 30 = 210 redundant clones per call. The
    // optimisation: do `enterBattlefield(ck)` (which clones internally) then
    // patch the library on that clone via copy-on-write. Same story as
    // Nature's Rhythm above. Empirically halves the per-call cost.
    //
    // PERF NOTE (2026-05-07 C-23): the previous version branched over every
    // valid library creature for each sacrifice candidate — producing up to
    // 192 child states in hands with 5 sac candidates × 40 eligible targets.
    // In BFS this causes exponential blowup. Fix: for each sac candidate,
    // pick only the single best fetch target (highest TUTOR_PRIORITY_SCORE
    // within MV ≤ sacMV+2) — mirrors how Green Sun's Zenith and Chord of
    // Calling are modelled. The solver is still correct because it explores
    // every sac candidate; the branching is now O(unique sac names) ≤ 6.
    castFn(state) {
      var cards = CARDS;
      var { parseCost: pc } = _GSM;
      const results = [];

      const creatures = state.creatures();
      if (creatures.length === 0) return [];

      // Pre-build a NAME → key map
      const nameToKey = new Map();
      for (const k of Object.keys(cards)) {
        const d = cards[k];
        if (d?.name) nameToKey.set(d.name, k);
      }

      // Pre-scan library once for all eligible creatures, scored by priority.
      // Key: cardKey → { def, mv, score } for eligible fetch targets.
      const libraryCreatures = [];
      const seenLib = new Set();
      for (const ck of state.players[0].library) {
        if (seenLib.has(ck) || ck === 'unknown') continue;
        seenLib.add(ck);
        const def = cards[ck];
        if (!def?.types.includes('creature') || !def.cost) continue;
        const parsed = pc(def.cost);
        const mv = parsed.generic + Object.values(parsed.colored).reduce((a, b) => a + b, 0);
        const score = TUTOR_PRIORITY_SCORE[ck] ?? 0;
        libraryCreatures.push({ ck, def, mv, score });
      }
      // Sort descending by score so the first valid candidate is always the best.
      libraryCreatures.sort((a, b) => b.score - a.score);

      const seen_sac = new Set();
      for (const sacPerm of creatures) {
        if (seen_sac.has(sacPerm.name)) continue;
        seen_sac.add(sacPerm.name);

        const sacKey = nameToKey.get(sacPerm.name);
        const sacDef = sacKey ? cards[sacKey] : null;
        if (!sacDef?.cost) continue;
        const sacParsed = pc(sacDef.cost);
        const sacMV = sacParsed.generic + Object.values(sacParsed.colored).reduce((a, b) => a + b, 0);
        const maxMV = sacMV + 2;

        const afterSac = state.removeFromBattlefield(sacPerm.id, 'graveyard');
        if (!afterSac) continue;

        // Pick the highest-priority valid target in library (first after sort).
        // Skip the sacrificed creature itself and STAX cards.
        const best = libraryCreatures.find(({ ck, mv }) =>
          mv <= maxMV && ck !== sacKey && !isStax(ck)
        );
        if (!best) continue;
        const { ck, def, mv: fetchMV } = best;

        let ns = afterSac.enterBattlefield(ck);
        ns._ensurePlayers();
        ns.players[0] = ns.players[0].clone();
        const idx = ns.players[0].library.indexOf(ck);
        if (idx !== -1) {
          ns.players[0].library = [
            ...ns.players[0].library.slice(0, idx),
            ...ns.players[0].library.slice(idx + 1),
          ];
        }
        ns.players[0].exile = [...(ns.players[0].exile ?? []), 'eldritch_evolution'];
        results.push(ns.log(
          `Eldritch Evolution: sac ${sacPerm.name} (MV ${sacMV}) → fetch ${def.name} (MV ${fetchMV})`
        ));
      }
      return results;
    },
  },
  sylvan_scrying: {
    name: 'Sylvan Scrying', types: ['sorcery'], subtypes: [], cost: '1G',
    // C-23 fix: previously branched over all lands in library (~20 results).
    // Now picks the single highest-priority land not already on the battlefield.
    castFn(state) {
      var cards = CARDS;
      const LAND_PRIORITY = ['gaeas_cradle','nykthos','deserted_temple','yavimaya','ancient_tomb',
                             'wirewood_lodge','geier_reach_sanitarium','boseiju',
                             'emergence_zone','forest'];
      const UNIQUE_LANDS = new Set(['gaeas_cradle','nykthos','deserted_temple','yavimaya','ancient_tomb',
                                    'wirewood_lodge','geier_reach_sanitarium','boseiju','emergence_zone']);
      const onBF = new Set(state.battlefield.map(p =>
        Object.keys(cards).find(k => cards[k].name === p.name)).filter(Boolean));
      let best = null;
      const seen = new Set();
      for (const ck of state.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (!def || !def.types.includes('land')) continue;
        if (UNIQUE_LANDS.has(ck) && onBF.has(ck)) continue;
        const pri = LAND_PRIORITY.indexOf(ck);
        const score = pri === -1 ? 99 : pri;
        if (!best || score < best.score) best = { ck, def, score };
      }
      if (!best) return [state.log('Sylvan Scrying: no land in library')];
      const { state: ns, cardKey } = state.searchLibraryFor(k => k === best.ck);
      if (!cardKey) return [state.log('Sylvan Scrying: no land in library')];
      return [ns.addToHand(cardKey).log(`Sylvan Scrying → find ${best.def.name}`)];
    },
  },
  natures_rhythm: {
    name: "Nature's Rhythm", types: ['sorcery'], subtypes: [], cost: 'XGG',
    canCast(state) {
      var cards = CARDS;
      var { parseCost: pc } = _GSM;
      const x = state.mana.total();
      const seen = new Set();
      for (const ck of state.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (!def || !def.types.includes('creature') || !def.cost) continue;
        const parsed = pc(def.cost);
        const mv = parsed.generic + Object.values(parsed.colored).reduce((a, b) => a + b, 0);
        if (mv <= x) return true;
      }
      return false;
    },
    // Harmonize: recastable from graveyard (ignored for solver simplicity).
    // Essentially a second Green Sun's Zenith — same implementation.
    //
    // PERF NOTE (2026-04-30): eliminated redundant state.clone per target.
    // PERF NOTE (2026-05-07 C-23b): like Eldritch Evolution, this previously
    // branched over every library creature with MV ≤ X. With X=3 and 15+
    // eligible candidates that creates a 15-way fan-out per cast. Fixed to
    // select only the single highest-TUTOR_PRIORITY_SCORE target, matching
    // Green Sun's Zenith / Chord of Calling / Eldritch Evolution behaviour.
    castFn(state) {
      var cards = CARDS;
      var { parseCost: pc } = _GSM;
      const x = state.mana.total();

      // Build sorted eligible list once (descending score) and pick the best.
      let best = null;
      let bestScore = -Infinity;
      const seen = new Set();
      for (const ck of state.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (!def || !def.types.includes('creature') || !def.cost) continue;
        const parsed = pc(def.cost);
        const mv = parsed.generic + Object.values(parsed.colored).reduce((a, b) => a + b, 0);
        if (mv > x) continue;
        const score = TUTOR_PRIORITY_SCORE[ck] ?? 0;
        if (score > bestScore) { bestScore = score; best = { ck, def, mv }; }
      }

      if (!best) return [drainMana(state).log(`Nature's Rhythm X=${x}: no eligible creature`)];

      const { ck, def, mv } = best;
      let ns = drainMana(state).enterBattlefield(ck);
      ns._ensurePlayers();
      ns.players[0] = ns.players[0].clone();
      const idx = ns.players[0].library.indexOf(ck);
      if (idx !== -1) {
        ns.players[0].library = [
          ...ns.players[0].library.slice(0, idx),
          ...ns.players[0].library.slice(idx + 1),
        ];
      }
      return [ns.log(`Nature's Rhythm X=${x} → ${def.name} (MV ${mv})`)];
    },
  },
  turntimber_symbiosis: {
    name: 'Turntimber Symbiosis', types: ['sorcery'], subtypes: [], cost: '4GGG',
    canCast(state) {
      var cards = CARDS;
      const seen = new Set();
      for (const ck of state.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (def?.types.includes('creature')) return true;
      }
      return false;
    },
    // Simplified: treat as a tutor for any creature in library (non-deterministic top-7
    // ignored; in a 99-card deck the best creature is effectively always in top 7).
    // C-23b: select only the highest-priority target — prevents O(library) fan-out.
    //
    // DFC land back: Turntimber, Serpentine Wood — {T}: Add {G}; enters tapped unless
    // you pay 3 life. Playable as a land drop from hand via handAbilities.
    castFn(state) {
      var cards = CARDS;
      let best = null, bestScore = -Infinity;
      const seen = new Set();
      for (const ck of state.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (!def || !def.types.includes('creature')) continue;
        const score = TUTOR_PRIORITY_SCORE[ck] ?? 0;
        if (score > bestScore) { bestScore = score; best = { ck, def }; }
      }
      if (!best) return [state.log('Turntimber Symbiosis: no creature found')];
      const { ck, def } = best;
      let ns = state.enterBattlefield(ck);
      ns._ensurePlayers();
      ns.players[0] = ns.players[0].clone();
      const idx = ns.players[0].library.indexOf(ck);
      if (idx !== -1) {
        ns.players[0].library = [
          ...ns.players[0].library.slice(0, idx),
          ...ns.players[0].library.slice(idx + 1),
        ];
      }
      return [ns.log(`Turntimber Symbiosis → ${def.name}`)];
    },
    handAbilities: {
      play_as_land: {
        label: 'Play Turntimber, Serpentine Wood (land side, tapped or pay 3 life)',
        fn(state, cardKey) {
          if (state.landDrops <= 0) return null;
          const s0 = state.removeFromHand(cardKey); if (!s0) return null;
          const s1 = s0.clone(); s1.landDrops--;
          // Prefer tapped (no cost) as default — the untapped branch costs 3 life
          // and the solver's heuristic will handle the tradeoff.
          // Return the tapped branch (safe default).
          const sB = s1.enterBattlefield('turntimber_land', { tapped: true });
          return sB.log('Play Turntimber, Serpentine Wood → enters tapped');
        },
      },
    },
  },

  // Turntimber, Serpentine Wood — back face of Turntimber Symbiosis DFC
  // Entered directly via the handAbility above or via enterBattlefield('turntimber_land').
  turntimber_land: {
    name: 'Turntimber, Serpentine Wood', types: ['land'], subtypes: ['Forest'], cost: null,
    tapForMana: simpleTap('{G}', [['G', 1]]),
  },

  bridgeworks_battle: {
    name: 'Bridgeworks Battle', types: ['sorcery'], subtypes: [], cost: '2G',
    intentionalStub: true,  // fight effect targets opponent creatures — not modeled
    // DFC land back: Tanglespan Bridgeworks — same pattern as Turntimber Symbiosis.
    // {T}: Add {G}. Enters tapped unless 3 life paid.
    handAbilities: {
      play_as_land: {
        label: 'Play Tanglespan Bridgeworks (land side, enters tapped)',
        fn(state, cardKey) {
          if (state.landDrops <= 0) return null;
          const s0 = state.removeFromHand(cardKey); if (!s0) return null;
          const s1 = s0.clone(); s1.landDrops--;
          const sB = s1.enterBattlefield('tanglespan_bridgeworks', { tapped: true });
          return sB.log('Play Tanglespan Bridgeworks → enters tapped');
        },
      },
    },
  },

  // Tanglespan Bridgeworks — back face of Bridgeworks Battle DFC
  tanglespan_bridgeworks: {
    name: 'Tanglespan Bridgeworks', types: ['land'], subtypes: ['Forest'], cost: null,
    tapForMana: simpleTap('{G}', [['G', 1]]),
  },

  // ─── Yeva commander ───────────────────────────────────────────────────────
  yeva: {
    externallyImplemented: true,  // [drift-detector] flash + flash-grant in actions.js canCastNow()
    name: 'Yeva, Nature\'s Herald',
    types: ['creature'], subtypes: ['Elf', 'Shaman'],
    cost: '2GG', power: 4, toughness: 4,
    hasFlash: true,
    // Static: you may cast green creature spells as though they had flash.
    // Implemented in actions.js: when Yeva is on battlefield or in command zone,
    // green creature spells gain the flash flag.
  },

  // ─── Other legendaries ────────────────────────────────────────────────────

  shang_chi: {
    name: 'Shang-Chi, Master of Kung Fu',
    types: ['creature'], subtypes: ['Human', 'Warrior', 'Hero'],
    cost: '1G', power: 2, toughness: 2,
    // Static 1: You may activate abilities of creatures you control as though
    //           those creatures had haste.
    //   → Implemented in actions.js: when Shang-Chi is on the battlefield, the
    //     summoningSick guard is bypassed for creature tap-for-mana AND for
    //     creature activated abilities.
    //
    // [O-27] Static 2: "{T}: Add two mana of any one color, spend this mana
    // only to activate abilities of creature sources." This mana is
    // RESTRICTED — it can pay for activated abilities of creature
    // permanents, but NOT for casting spells (creature spells included —
    // casting a spell is not "activating an ability of a creature source").
    // The engine's mana pool has no concept of restricted mana, so a general
    // `tapForMana` here would let the solver illegally spend Shang-Chi's
    // {G}{G} on spell casts (e.g. "Tap Shang-Chi → {G}{G}" immediately
    // followed by "Cast Boreal Druid" using that mana).
    //
    // Per COMBO 63 (DISABLED, see below) and COMBO 64, this restricted mana
    // cannot reach a winning state on its own — COMBO 64's loop nets exactly
    // 0 restricted mana per cycle (it's only a means to pay for OTHER
    // restricted-mana activated abilities like Hope Tender's exert).
    // Intentionally NOT implementing tapForMana: Shang-Chi's value in this
    // deck is its haste-bypass static, not its mana ability.
  },

  nylea_keen_eyed: {
    name: 'Nylea, Keen-Eyed',
    types: ['enchantment', 'creature'], subtypes: ['God'],
    cost: '3G', power: 5, toughness: 6,
    // Indestructible. Creature spells cost {1} less (in costReductions in actions.js).
    // {2G},{T}: Reveal top card of library. If creature, put in hand. Otherwise may put in GY.
    // Simplified: treat as library scan for the best creature (non-deterministic top reveal).
    abilities: {
      reveal_top: {
        label: '{2}{G},{T}: Reveal top card → creature to hand',
        fn(state, perm) {
          if (perm.tapped || perm.summoningSick) return [];
          const ap = state.payMana('2G'); if (!ap) return [];
          const s = ap.tapPermanent(perm.id); if (!s) return [];
          var cards = CARDS;
          // Find best creature in library (simulates top reveal with library knowledge)
          let bestKey = null, bestScore = -1;
          for (const ck of s.players[0].library) {
            if (ck === 'unknown' || isStax(ck)) continue;
            const def = cards[ck];
            if (!def?.types.includes('creature')) continue;
            const score = TUTOR_PRIORITY_SCORE[ck] ?? 0;
            if (score > bestScore) { bestKey = ck; bestScore = score; }
          }
          if (!bestKey) return [s.log('Nylea: no creature in library')];
          const { state: ns, cardKey } = s.searchLibraryFor(k => k === bestKey);
          if (!cardKey) return [];
          return [ns.addToHand(cardKey).log(`Nylea → ${cards[cardKey].name} to hand`)];
        },
      },
    },
  },
};

// ── Option A: Pre-cache parseCost on every card definition ───────────────
// parseCost is called on every action-generation pass per hand card.
// Since card costs never change, compute once at load and store on the def.
{
  for (const def of Object.values(CARDS)) {
    if (def.cost != null) {
      def._parsedCost = parseCost(def.cost);
    }
  }
}

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

// ── Loop type taxonomy (O-1) ──────────────────────────────────────────────
//
// Each detector exposes a `loopType` describing what the loop actually
// produces in net.  Mana-positive combos generate infinite mana directly;
// mana-neutral combos generate net zero mana per cycle but still win the game
// through some other infinite resource (ETB triggers, draws, LTBs, storm
// count). Used by win-condition detectors to decide when a "Draw the Library"
// or "Storm Kill" line is achievable even without an infinite-mana detector
// firing.
//
// Source of truth for which loops are mana-neutral: card_roles.md and the
// "Combo Summary" entries at the end of decklist_combos.txt. Examples:
//   - Earthcraft + Scryb Ranger:  net 0 mana, +1 untap per cycle  → MANA_NEUTRAL_ETB
//   - Beast Whisperer + creature loop: net 0 mana, +1 card per cycle → MANA_NEUTRAL_DRAW
//   - Tireless Provisioner + Ashaya + Ranger: net 0 mana, +1 ETB+landfall → MANA_NEUTRAL_ETB
//
// Most existing detectors are MANA_POSITIVE; that's the default if a detector
// omits the field, so this is a non-breaking addition.
var LOOP_TYPE = Object.freeze({
  MANA_POSITIVE:     'mana_positive',     // generates infinite mana
  MANA_NEUTRAL_ETB:  'mana_neutral_etb',  // infinite ETBs / landfall, no net mana
  MANA_NEUTRAL_LTB:  'mana_neutral_ltb',  // infinite LTBs (death triggers, sac), no net mana
  MANA_NEUTRAL_DRAW: 'mana_neutral_draw', // infinite card draw, no net mana
  MANA_NEUTRAL_STORM:'mana_neutral_storm',// infinite storm count, no net mana
  WIN_CONDITION:     'win_condition',     // not a loop — a discrete win-state check
});

// ── Helpers ───────────────────────────────────────────────────────────────

function hasPerm(state, name) {
  return state.battlefield.some(p => p.name === name);
}

// True if a named permanent is on the battlefield AND can activate its own
// tap ability right now -- i.e. it isn't summoning sick, UNLESS Shang-Chi's
// static is active (which bypasses summoning sickness for any creature's
// activated ability -- see actions.js's generic ability handler). hasPerm
// alone only checks presence, which silently treats a permanent that was
// JUST cast this turn (e.g. via a tutor, mid-assembly) as already able to
// tap -- wrong for the self-tapping Geier Reach untappers (Magus of the
// Candelabra, Hope Tender, Ley Weaver, Argothian Elder), whose {T}-cost
// abilities genuinely require summoning sickness to have worn off (or a
// haste source) before they can activate at all, independent of whether
// the broader bounce-and-recast loop would otherwise sustain them.
// NOTE: named permCanActivate (not permReady) to avoid colliding with the
// existing permReady() defined later in this file, which has a different,
// incompatible signature (also checks !tapped, no Shang-Chi awareness) --
// a same-named later function declaration would silently shadow this one.
function permCanActivate(state, name) {
  const p = state.battlefield.find(p => p.name === name);
  if (!p) return false;
  return !p.summoningSick || shangChiActive(state);
}

// True if Quirion Ranger is on battlefield AND its once-per-turn bounce ability
// has NOT yet been used this turn.
function quirionAvailable(state) {
  return state.battlefield.some(p =>
    p.name === 'Quirion Ranger' &&
    !p.abilitiesUsed?.bounce_forest
  );
}

// True if Scryb Ranger is on battlefield AND its once-per-turn bounce ability
// has NOT yet been used this turn.
function scrybAvailable(state) {
  return state.battlefield.some(p =>
    p.name === 'Scryb Ranger' &&
    !p.abilitiesUsed?.bounce_forest
  );
}

// True if EITHER ranger is available (used by combo detectors that work with both).
function rangerAvailable(state) {
  return quirionAvailable(state) || scrybAvailable(state);
}

// Same check for Wirewood Symbiote's once-per-turn bounce_elf ability.
function symbioteAvailable(state) {
  return state.battlefield.some(p =>
    p.name === 'Wirewood Symbiote' &&
    !p.abilitiesUsed?.bounce_elf
  );
}

// True if card is on battlefield OR in hand (with infinite mana, hand = castable)
function inHandOrField(state, name, cardKey) {
  return hasPerm(state, name) ||
    (state.hand && state.hand.includes(cardKey));
}

function permReady(state, name) {
  return state.battlefield.some(p => p.name === name && !p.tapped && !p.summoningSick);
}

// True if the named creature's tap-activated ability can fire right now.
// Shang-Chi bypasses summoning sickness for tap abilities — a sick creature
// can still tap for mana or use a tap-activated ability when SC is on board.
function permReadyOrSCActive(state, name) {
  const scActive = state.battlefield.some(p => p.cardKey === 'shang_chi');
  return state.battlefield.some(p =>
    p.name === name && !p.tapped && (!p.summoningSick || scActive)
  );
}

function permUntapped(state, name) {
  return state.battlefield.some(p => p.name === name && !p.tapped);
}

// True if Shang-Chi is on the battlefield (granting haste to tap abilities of all creatures).
function shangChiActive(state) {
  return state.battlefield.some(p => p.cardKey === 'shang_chi');
}

// Sum of net green mana the team could produce if every non-summoning-sick
// creature were untapped and tapped for mana — used by the Great Oak
// Guardian + Temur Sabertooth loop, where GOG's ETB ("creatures target
// player controls ... untap them") refreshes the WHOLE team at once rather
// than a single dork.
//
// GOG's ETB does NOT remove summoning sickness (only Concordant Crossroads /
// Thousand-Year Elixir / Surrak do that), so summoning-sick creatures are
// excluded even though they'd be untapped.
//
// Net = gross production minus each dork's own activation cost, matching
// the per-dork formulas used elsewhere in this file (Selvala: power − 1 for
// her {G} activation; Priest/Archdruid/Channeler: elfCount, no extra cost;
// Circle of Dreams Druid: creatureCount; Marwyn/Topiary Lecturer: power;
// 1-mana dorks: 1 each). GOG and Temur Sabertooth themselves are excluded —
// neither has a mana ability.
//
// CAVEAT: this does NOT account for GOG's own +2/+2 (not modeled by the
// engine — see GameState.js). Power-based producers (Selvala, Marwyn,
// Topiary Lecturer, Karametra's Acolyte via devotion-from-power effects)
// would actually be larger after the first ETB resolves, making this a
// conservative lower bound.
function teamUntapManaProduction(state) {
  let total = 0;
  for (const p of state.creatures()) {
    if (p.summoningSick) continue;
    if (p.name === 'Great Oak Guardian' || p.name === 'Temur Sabertooth') continue;
    switch (p.name) {
      case 'Selvala, Heart of the Wilds':
        total += Math.max(0, greatestPower(state) - 1);
        break;
      case 'Priest of Titania':
      case 'Elvish Archdruid':
      case 'Wirewood Channeler':
        total += elfCount(state);
        break;
      case 'Circle of Dreams Druid':
        total += creatureCount(state);
        break;
      case 'Marwyn, the Nurturer':
      case 'Topiary Lecturer':
        total += (p.power || 0);
        break;
      case "Karametra's Acolyte":
        total += devotionG(state);
        break;
      case 'Llanowar Elves':
      case 'Elvish Mystic':
      case 'Fyndhorn Elves':
      case 'Birds of Paradise':
      case 'Boreal Druid':
      case 'Delighted Halfling':
      case 'Arbor Elf':
      case 'Wirewood Symbiote':
        total += 1;
        break;
      default:
        break;
    }
  }
  return total;
}

function creatureCount(state) {
  return state.creatures().length;
}

function elfCount(state) {
  let n = 0;
  for (const p of state.battlefield) if (p.subtypes?.includes('Elf')) n++;
  return n;
}

function devotionG(state) {
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

// Mana value of a card from its cost string (counts generic digits + colour pips).
// "G" → 1, "1G" → 2, "2GG" → 4, null/"" → 0.
function cardMV(cardKey) {
  const cost = CARDS[cardKey]?.cost;
  if (!cost) return 0;
  let mv = 0;
  for (const ch of cost) {
    if (ch >= '0' && ch <= '9') mv += Number(ch);
    else mv += 1;  // each colour/colourless pip letter is 1
  }
  return mv;
}

// Is there a cheap (MV ≤ 1) creature on the battlefield OTHER than `exceptName`?
// Used by Cloudstone Curio ping-pong loops, which recast a cheap partner each
// cycle — the partner must be affordable ({G} for a 1-drop) for the loop to net.
function hasCheapCreaturePartner(state, exceptName) {
  return state.creatures().some(c =>
    c.name !== exceptName && cardMV(c.cardKey) <= 1
  );
}

// [O-29] Gross mana a single mana-dork permanent taps for RIGHT NOW (before
// subtracting any per-activation cost). Returns 0 for non-dorks. Used by the
// generalized Temur+Symbiote loop detector, where the dork must gross ≥5 to
// net positive after the loop's fixed {G}{G}{G}{G} recast cost.
//
// Leyline of Abundance ("Whenever you tap a creature for mana, add an additional
// {G}") adds +1 to a CREATURE dork's per-tap output. In the bounce loops one
// dork is tapped once per cycle, so the bonus is exactly +1 per cycle. This can
// push a gross-4 dork (e.g. Priest at 4 elves, or Fanatic's Ferocious mode) to 5.
function dorkGrossOutput(state, p) {
  let base;
  switch (p.name) {
    case 'Priest of Titania':
    case 'Elvish Archdruid':
    case 'Wirewood Channeler':
      base = elfCount(state); break;
    case 'Circle of Dreams Druid':
      base = creatureCount(state); break;
    case "Karametra's Acolyte":
      base = devotionG(state); break;
    case 'Marwyn, the Nurturer':
    case 'Topiary Lecturer':
      base = p.power || 0; break;
    case 'Fanatic of Rhonas':
      // Ferocious: {T}: Add {G}{G}{G}{G} if you control a creature with power ≥4.
      // Otherwise its plain {T}: Add {G} = 1.
      base = greatestPower(state) >= 4 ? 4 : 1; break;
    case 'Selvala, Heart of the Wilds':
      // Selvala's {G},{T} produces greatestPower; the {G} is a separate
      // activation cost handled by her own dedicated detectors, so the
      // Symbiote-loop math (which assumes a no-cost {T} tap) doesn't apply
      // to her — excluded here.
      return 0;
    case 'Llanowar Tribe':
      base = 3; break;
    default:
      return 0;
  }
  // Leyline of Abundance adds +1 {G} when this creature dork is tapped for mana.
  if (hasPerm(state, 'Leyline of Abundance')) base += 1;
  return base;
}

function cradleUntapped(state) {
  return state.battlefield.some(p =>
    (p.name === "Gaea's Cradle" || p.name === 'Itlimoc, Cradle of the Sun') && !p.tapped
  );
}

function ashayaOut(state) {
  return hasPerm(state, 'Ashaya, Soul of the Wild');
}

// [O-33] True if the battlefield has a mechanism to recast a green creature
// spell an UNBOUNDED number of times this turn — the requirement for any
// "infinite green-permanent-cast" win (Defiler counters, Beast Whisperer /
// Glademuse draw).
//
// Repeatable green-creature recast mechanisms:
//   • Temur Sabertooth / Kogla, the Titan Ape — "{1}{G}: return another
//     creature you control to hand"; mana-cost bounce, unlimited per turn.
//     Bounce a green creature, recast it → repeat.
//   • Quirion Ranger / Scryb Ranger + Ashaya — the Ranger returns ITSELF
//     (a Forest under Ashaya) to hand, then is recast (a green creature
//     spell) for a fresh once-per-turn. Without Ashaya the Ranger returns a
//     DIFFERENT Forest (a land) and is NOT itself recast, so no green spell
//     is cast — and its "activate only once each turn" clause prevents
//     repetition anyway. So the Ranger branch REQUIRES Ashaya.
//
// NOT sufficient on its own: Wirewood Symbiote (once per turn), a lone Ranger
// without Ashaya (once per turn, and it bounces a land not itself).
function hasRepeatableCreatureRecast(state) {
  // Temur/Kogla may be in hand OR on the battlefield — with infinite mana
  // (the context in which the win conditions using this helper run) a hand
  // copy is castable, after which it loops.
  if (inHandOrField(state, 'Temur Sabertooth', 'temur_sabertooth') ||
      inHandOrField(state, 'Kogla, the Titan Ape', 'kogla')) {
    return true;
  }
  // Cloudstone Curio ping-pong: casting creature A bounces creature B, casting B
  // bounces A, repeat. This is an unbounded creature-recast loop given infinite
  // mana. Cloudstone bounces "ANOTHER permanent sharing a type", so it needs at
  // least two creatures to ping-pong between (one alone has no partner). A second
  // creature in hand also works as the partner to start the loop.
  if (hasPerm(state, 'Cloudstone Curio')) {
    const creatureCountTotal =
      state.creatures().length +
      (state.hand ? state.hand.filter(k => {
        var def = CARDS;
        return def && def.types && def.types.includes('creature');
      }).length : 0);
    if (creatureCountTotal >= 2) return true;
  }
  // The Ashaya+Ranger loop: Ranger bounces itself (a Forest under Ashaya),
  // is recast, and repeats. The first iteration requires the Ranger's
  // once-per-turn bounce to still be available this turn.
  if (ashayaOut(state) && rangerAvailable(state)) {
    return true;
  }
  // Beast Within infinite creature loops (generates 3/3 beast tokens each cycle).
  // Three paths: BW+Endurance+Duskwatch, BW+Badgermole+Temur/Kogla, BW+Witness+Kogla/Temur.
  if (hasBeastWithinCreatureLoop(state)) return true;

  return false;
}

// creature (so a creature's own ETB re-fires each cycle). This is stricter
// than hasRepeatableCreatureRecast: the Ashaya+Ranger loop recasts only the
// Ranger, so it does NOT re-trigger a different creature's ETB (e.g. Regal
// Force's "draw per green creature"). Temur/Kogla bounce-recast any creature;
// Cloudstone Curio ping-pongs a creature with a partner — both re-enter the
// targeted creature each cycle. Used by the Regal Force Draw Library branch.
function hasSelfRecastBounce(state, selfName) {
  if (inHandOrField(state, 'Temur Sabertooth', 'temur_sabertooth') ||
      inHandOrField(state, 'Kogla, the Titan Ape', 'kogla')) {
    return true;
  }
  // Cloudstone Curio needs a partner creature (≠ the looped creature) to
  // ping-pong with, so it bounces the looped creature back each cycle.
  if (hasPerm(state, 'Cloudstone Curio')) {
    let partners = 0;
    for (const c of state.creatures()) if (c.name !== selfName) partners++;
    if (state.hand) for (const k of state.hand) {
      const def = CARDS[k];
      if (def?.types?.includes('creature')) partners++;
    }
    if (partners >= 1) return true;
  }
  return false;
}

// ── Beast Within infinite-creature loops ──────────────────────────────────
//
// All paths generate infinite creature (beast) tokens given infinite mana.
// Beast Within (BW) destroys a target permanent and gives its controller a 3/3
// beast token.  Cost: {2}{G} per cycle.
//
//  Path B — Beast Within + Badgermole Cub + Temur Sabertooth / Kogla
//  ──────────────────────────────────────────────────────────────────
//  Badgermole Cub's ETB: "Earthbend 1 — target land you control becomes a
//  0/0 creature with haste that's still a land. Put a +1/+1 counter on it.
//  When it dies or is exiled, return it to the battlefield tapped."
//  1. Cast Badgermole Cub → ETB animates a land (it now has the death-return clause).
//  2. Cast Beast Within targeting that animated land-creature.
//     Land is destroyed → death trigger returns it to BF tapped; WE get a 3/3 beast.
//  3. Bounce Badgermole with Temur ({1}{G}) or Kogla ({1}{G}); recast to re-animate
//     the same (now-untapped) land next turn.  Repeat.
//  Net: +1 beast per 2 casts (Badgermole + BW).  Land returns via earthbend death trigger.
//  Requires: BW in hand or GY accessible via Witness, Badgermole in hand or loop, Temur/Kogla for bounce.
//
//  NOTE: Path A (BW + Endurance + Duskwatch) does NOT work. Endurance ETB shuffles
//  the GY (including BW) back into the library, but Duskwatch Recruiter only finds
//  CREATURES — Beast Within is an instant and cannot be retrieved. The loop breaks
//  on the second iteration. Path A has been removed.
//
//  Path C — Beast Within + Eternal Witness + Kogla / Temur
//  ────────────────────────────────────────────────────────
//  1. Target any creature YOU control with Beast Within → it is destroyed; you get a beast.
//     (The targeted creature's controller = you, so you get the token.)
//  2. Cast Eternal Witness → ETB returns Beast Within to hand.
//  3. Bounce Witness with Kogla ({1}{G}) or Temur ({1}{G}).
//  4. Cast Eternal Witness again → ETB returns the previously destroyed creature to hand.
//  5. Bounce Witness.  Cast the creature → now BF again.  Repeat from step 1.
//  Net: +1 beast per 2-cast cycle (Witness × 2 + BW each loop).
//  Requires: BW in hand or GY, Eternal Witness in hand/field, Kogla or Temur on BF.
//
function hasBeastWithinCreatureLoop(state) {
  const inHand = (key) => state.hand && state.hand.includes(key);
  const gy = state.players?.[0]?.graveyard ?? state.graveyard ?? [];
  const bwAvail = inHand('beast_within') || gy.includes('Beast Within');

  if (!bwAvail) return false;

  const hasBouncer =
    inHandOrField(state, 'Temur Sabertooth', 'temur_sabertooth') ||
    inHandOrField(state, 'Kogla, the Titan Ape', 'kogla');

  // Path B: Badgermole Cub + Temur/Kogla (land returns via earthbend death trigger).
  // Any land can be targeted — it need not be a non-creature land.
  // The land returns tapped from the death trigger; Badgermole re-animates it
  // each cycle (the land's tap state doesn't matter — it's only the BW target).
  const hasBadgermole = inHandOrField(state, 'Badgermole Cub', 'badgermole_cub');
  const hasAnimatableLand = state.battlefield.some(p =>
    p.types && p.types.includes('land')
  );
  if (hasBadgermole && hasBouncer && hasAnimatableLand) return true;

  // Path C: Eternal Witness + Kogla/Temur (Witness recurs BW; second Witness cast recurs target creature)
  const hasWitness = inHandOrField(state, 'Eternal Witness', 'eternal_witness');
  if (hasWitness && hasBouncer) {
    const bfCreatures = state.battlefield.filter(p => p.is?.('creature') || p.types?.includes('creature'));
    if (bfCreatures.length >= 2) return true;
    if (inHand('eternal_witness') && bfCreatures.length >= 1) return true;
  }

  return false;
}
// each Hitzel cycle.
//
// Geier Reach Sanitarium is a LAND, not a creature (Ashaya makes creatures
// into Forests — it does not make lands into creatures). So:
//   - Argothian Elder / Ley Weaver ("untap two target lands"),
//     Magus of the Candelabra ("{X},{T}: untap X target lands"),
//     Deserted Temple / Hope Tender ("{1},{T}: untap target land")
//     can ALL untap Geier Reach directly — no Ashaya or animation needed,
//     since it's already a land.
//   - Quirion Ranger / Scryb Ranger ("untap target CREATURE") CANNOT target
//     Geier Reach unless something turns it into a creature first —
//     Destiny Spinner ("{3}{G}: target land you control becomes an X/X
//     creature ... It's still a land") is the only such effect available.
//     Ashaya is irrelevant here (it doesn't animate lands).
// True if something can turn a land into a creature with haste until end
// of turn — Destiny Spinner ({3}{G}, repeatable activated ability, X/X
// where X = enchantments) or Vengeant Earth ({1}{G} instant, 4/4,
// custom-library — not in DEFAULT_DECKLIST). Either lets a creature-only
// effect (Quirion/Scryb Ranger's "untap target creature", etc.) target a
// land for the rest of the turn.
//
// Badgermole Cub's earthbend ("target land you control becomes a 0/0
// creature with haste — it's still a land") is a DIFFERENT kind of
// animator than Destiny Spinner/Vengeant Earth: it's a one-shot ETB
// trigger with deterministic, priority-ordered targeting (Gaea's Cradle /
// Nykthos / Ancient Tomb / Deserted Temple / Wirewood Lodge / Forest /
// Boseiju are all preferred over Geier Reach Sanitarium — see
// GameState/cards.js's earthbend onEnter) — so "Badgermole is on the
// battlefield" does NOT reliably mean Geier Reach got animated by it (if
// a higher-priority land like Gaea's Cradle is also present, Badgermole
// targets that instead). What DOES reliably mean it's usable: Geier Reach
// is ALREADY a creature on the current battlefield — its real oracle text
// has no "until end of turn" clause (unlike Destiny Spinner's), so once
// animated it stays a creature-land permanently, and that's a directly
// checkable fact rather than a guess about Badgermole's future targeting.
function hasLandAnimator(state) {
  if (hasPerm(state, 'Destiny Spinner') || (state.hand?.includes('vengeant_earth') ?? false)) return true;
  const geier = state.battlefield?.find(p => p.cardKey === 'geier_reach');
  return !!(geier && geier.types?.includes('creature'));
}

function hasGeierReachUntapper(state) {
  // Deserted Temple is a true land — never summoning sick, and its
  // "{1},{T}: untap target land" never needs to target itself to keep
  // going (it's not tapped by its own ability the way the creature
  // untappers below are). Unconditionally fine on its own.
  if (hasPerm(state, 'Deserted Temple')) return true;

  const hasBouncer =
    inHandOrField(state, 'Temur Sabertooth', 'temur_sabertooth') ||
    inHandOrField(state, 'Kogla, the Titan Ape', 'kogla');

  // Magus of the Candelabra ({X},{T}: untap X target lands), Ley Weaver and
  // Argothian Elder ({T}: untap two target lands), and Hope Tender ({1},{T}
  // [,Exert]: untap target land(s)) all tap THEMSELVES as part of activating
  // — see each card's ability fn in cards.js ("Tap [X] FIRST... under Ashaya,
  // [X] is a Forest land and can target itself"). Without Ashaya, none of
  // them are lands, so none of them can ever re-target themselves — the
  // loop dies after exactly one cycle (verified directly: the permanent
  // stays tapped after the first activation with no Ashaya present).
  // There are two independent ways to make any of these four sustain
  // without Ashaya:
  //   (a) Ashaya itself — makes the creature a Forest, so its own untap
  //       can include itself each cycle (verified: the X=2 Magus result
  //       "untap Magus + Geier Reach" leaves Magus untapped too).
  //   (b) A bouncer (Temur/Kogla) to return-and-recast it each cycle, PLUS
  //       Shang-Chi's static — which bypasses summoning sickness for ANY
  //       creature's activated ability (see actions.js's generic ability
  //       handler) — so the freshly-recast (summoning-sick) permanent can
  //       still activate immediately. Without Shang-Chi, a bounced-and-
  //       recast creature is summoning sick and the ability requires
  //       perm.summoningSick === false, so the loop still dies even with a
  //       bouncer. (Destiny Spinner/Badgermole Cub do NOT substitute for
  //       Shang-Chi here — both only grant haste to a LAND becoming a
  //       creature, per their real oracle text; they can't grant haste to
  //       an already-existing creature like a recast Magus unless Ashaya
  //       has already made it a land, which collapses back to path (a).)
  const selfSustainable = ashayaOut(state) || (hasBouncer && shangChiActive(state));

  if (selfSustainable) {
    if (permCanActivate(state, 'Magus of the Candelabra') || permCanActivate(state, 'Hope Tender')) return true;
    // Ley Weaver / Argothian Elder need TWO legal land targets when not
    // self-targeting (their ability has no X=1 mode, unlike Magus) — so
    // without Ashaya (where the permanent itself supplies one target),
    // require at least one other land you control besides Geier Reach
    // itself to be available as the second target.
    if ((permCanActivate(state, 'Ley Weaver') || permCanActivate(state, 'Argothian Elder')) &&
        (ashayaOut(state) || state.lands().length >= 2)) {
      return true;
    }
  }

  // Woodcaller Automaton's ETB (cast trigger) untaps target land you control —
  // see GameState.enterBattlefield, which already prefers Cradle/Nykthos but
  // falls back to any tapped land, so it untaps Geier Reach Sanitarium when
  // that's the highest-priority tapped land. The trigger is one-shot, so it
  // only counts as a repeatable untapper when paired with a way to bounce
  // and recast it each cycle. Temur Sabertooth specifically — Woodcaller is
  // a Construct, not a Human, so Kogla can't bounce it (same rule as the
  // Woodcaller+Temur infinite-mana combo above).
  const hasWoodcallerLoop =
    inHandOrField(state, 'Woodcaller Automaton', 'woodcaller_automaton') &&
    inHandOrField(state, 'Temur Sabertooth', 'temur_sabertooth');
  if (hasWoodcallerLoop) return true;

  // Hyrax Tower Scout's ETB (cast trigger) untaps target CREATURE (not a
  // land directly — see GameState.enterBattlefield), so Geier Reach must
  // first be animated into a creature-land (Destiny Spinner / Vengeant
  // Earth does this on its own — no Ashaya needed; Ashaya is only required
  // by the RANGER case below, where the bounce COST itself needs Ashaya to
  // make the Ranger count as "a Forest you control"). The ETB is one-shot
  // like Woodcaller's, so it also needs a bouncer to recast it each cycle —
  // but unlike Woodcaller, Hyrax is a Human, so EITHER Temur Sabertooth OR
  // Kogla works (Kogla's bounce targets Humans specifically).
  const hasHyraxLoop =
    inHandOrField(state, 'Hyrax Tower Scout', 'hyrax_tower_scout') &&
    hasLandAnimator(state) && hasBouncer;
  if (hasHyraxLoop) return true;

  // Wirewood Symbiote's ability ("Return an Elf to hand: untap a creature,
  // once per turn") can target Geier Reach once it's animated into a
  // creature-land (Destiny Spinner / Vengeant Earth — no Ashaya needed,
  // same reasoning as Hyrax above). The once-per-turn flag is on Symbiote's
  // OWN permanent id and is set regardless of which Elf gets returned —
  // Symbiote itself can't self-bounce to reset it (it's an Insect, not an
  // Elf, so it's never a legal target of its own ability) — so it needs an
  // EXTERNAL bouncer to get a fresh object each cycle. Temur Sabertooth
  // specifically: its bounce targets "another creature" with no subtype
  // restriction, so it works regardless of Symbiote's (non-Human) type —
  // Kogla's bounce is restricted to Humans and Symbiote is an Insect, so
  // Kogla can't do it.
  const hasSymbioteLoop =
    inHandOrField(state, 'Wirewood Symbiote', 'wirewood_symbiote') &&
    hasLandAnimator(state) &&
    inHandOrField(state, 'Temur Sabertooth', 'temur_sabertooth');
  if (hasSymbioteLoop) return true;

  const hasRanger = hasPerm(state, 'Quirion Ranger') || hasPerm(state, 'Scryb Ranger');
  if (!hasRanger) return false;
  // Quirion/Scryb Ranger's untap is "Activate only once each turn" — a
  // single Ranger object can only do this ONCE per turn no matter how many
  // Forests it could return. Repeating it within the Hitzel loop requires
  // bounce+recasting the Ranger itself each cycle (a fresh object = a fresh
  // once-per-turn activation), which means the Ranger must be able to
  // return ITSELF as the "Forest you control" cost — i.e. Ashaya, Soul of
  // the Wild must be out (it makes the Ranger a Forest too).
  if (!ashayaOut(state)) return false;
  // Destiny Spinner or Vengeant Earth: animate Geier Reach Sanitarium into a
  // creature for the rest of the turn so the Ranger can legally target it.
  return hasLandAnimator(state);
}

// True if a creature card is available to discard to Fauna Shaman /
// Survival of the Fittest ("{G}, [{T},] Discard a creature card: search...").
// Either:
//   - a creature card is already in hand, or
//   - a repeatable bounce engine can put one there: Temur Sabertooth / Kogla
//     bounce ANY creature you control to hand (need ≥1 other creature on
//     board); Cloudstone Curio alternates two creatures to hand; or, under
//     Ashaya, a Quirion/Scryb Ranger returning ITSELF (also a Forest, but
//     still a creature card) to hand.
function hasCreatureToDiscard(state, excludeKey = null) {
  var CARDS_local = CARDS;
  if (state.hand?.some(k => k !== excludeKey && CARDS_local[k]?.types?.includes('creature'))) return true;
  if (hasPerm(state, 'Temur Sabertooth') || hasPerm(state, 'Kogla, the Titan Ape')) {
    return state.creatures().some(c =>
      c.name !== 'Temur Sabertooth' && c.name !== 'Kogla, the Titan Ape');
  }
  if (hasPerm(state, 'Cloudstone Curio')) {
    return state.creatures().length >= 2;
  }
  if (ashayaOut(state) && rangerAvailable(state)) {
    // Ranger is a Forest under Ashaya — can bounce itself to hand as discard fodder,
    // but only if its once-per-turn bounce hasn't already been used this turn.
    return true;
  }
  return false;
}

// "You may activate abilities of creatures you control as though those
// creatures had haste" (or equivalent) — Concordant Crossroads, Thousand-
// Year Elixir, Surrak and Goreclaw, Shang-Chi. Bypasses summoning sickness
// for tap-activated abilities, but NOT a creature's current tapped status.
function hasGlobalHaste(state) {
  return (
    hasPerm(state, 'Concordant Crossroads') ||
    hasPerm(state, 'Thousand-Year Elixir') ||
    hasPerm(state, 'Surrak and Goreclaw') ||
    shangChiActive(state)
  );
}

// True if some non-Ranger nontoken creature on the battlefield can tap to add
// at least 1 green mana right now (untapped, no summoning sickness, and
// `tapForMana` produces a state with at least 1 more green pip in the pool).
//
// Used by the mana-neutral Ashaya+Ranger detector (combos 1 & 41): the
// Ranger-bounce loop is mana-neutral on its own, but it requires *some*
// other creature able to tap for {G} per cycle to fund the Ranger recast.
// If no such creature exists, the loop cannot iterate even once.
//
// Implementation note: cards.js's `tapForMana(state, perm)` returns an array
// of successor states (each representing one option for the tap); we
// compare the green count in each successor's mana pool to the original
// state's pool. If any option produces ≥1 net green, the creature qualifies.
function hasGreenTapper(state) {
  const beforeG = state.mana?.G ?? 0;
  const scActive = shangChiActive(state);
  return state.creatures().some(c => {
    if (c.tapped) return false;
    const isRanger = c.name === 'Quirion Ranger' || c.name === 'Scryb Ranger';
    // A Ranger funding the loop with its OWN Forest mana ability is recast every
    // cycle — each fresh copy is summoning sick. "Not sick right now" (e.g. a
    // copy that's simply been sitting on the battlefield) doesn't carry over to
    // the recast copies, so a Ranger needs a real haste source (scActive) every
    // time, unconditionally — unlike other dorks, which aren't being recast and
    // so a currently-non-sick snapshot does imply they'll stay non-sick.
    if (isRanger) {
      if (!scActive) return false;
    } else if (c.summoningSick) {
      return false;
    }
    if (c.name === 'Ashaya, Soul of the Wild') return false; // Ashaya is the combo piece
    const def = CARDS[c.cardKey];
    if (!def?.tapForMana) return false;
    let successors;
    try { successors = def.tapForMana(state, c) || []; } catch { return false; }
    for (const s2 of successors) {
      if (((s2.mana?.G ?? 0) - beforeG) >= 1) return true;
    }
    return false;
  });
}

// Max green mana any OTHER creature (excluding names in `excludeNames`) can
// currently produce, covering both named mana dorks (same output logic as
// the switch statements above) and the generic Forest-tap fallback — which,
// since actions.js grants any Forest-creature with no native mana ability
// a {T}: Add {G} option, now includes Ashaya herself (she makes herself a
// Forest too) and Badgermole Cub. Used by the self-funded Ranger detector.
function bestOtherGreenOutput(state, excludeNames) {
  const scActive = shangChiActive(state);
  let best = 0;
  for (const p of state.battlefield) {
    if (excludeNames.has(p.name)) continue;
    if (p.name === 'Shang-Chi, Master of Kung Fu') continue; // his own mana is deliberately unmodeled (O-27)
    if (!p.types || !p.types.includes('creature')) continue;
    if (p.tapped) continue;
    if (p.summoningSick && !scActive) continue;
    let output = 0;
    switch (p.name) {
      case 'Priest of Titania':           output = elfCount(state); break;
      case 'Circle of Dreams Druid':      output = creatureCount(state); break;
      case 'Elvish Archdruid':            output = elfCount(state); break;
      case 'Wirewood Channeler':          output = elfCount(state); break;
      case "Karametra's Acolyte":         output = devotionG(state); break;
      case 'Selvala, Heart of the Wilds': output = greatestPower(state); break;
      case 'Fanatic of Rhonas':           output = greatestPower(state) >= 4 ? greatestPower(state) : 0; break;
      case 'Marwyn, the Nurturer':        output = p.power || 0; break;
      case 'Topiary Lecturer':            output = p.power || 0; break;
      default:
        if (p.isForest) output = 1; // generic Forest fallback (Ashaya, Badgermole Cub, etc.)
        break;
    }
    if (output > best) best = output;
  }
  return best;
}

// ── Detector list ─────────────────────────────────────────────────────────

var DETECTORS = [

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
      if (!quirionAvailable(state)) return false; // Quirion-specific: Scryb alone does not qualify
      // Hope Tender pairs with Cradle: Ranger untaps Tender, Tender untaps Cradle.
      // Cradle needs ≥2 creatures to net positive after the {1} Tender activation cost.
      if (permReady(state, 'Hope Tender') && cradleUntapped(state) && creatureCount(state) >= 2) return true;

      const scActive = shangChiActive(state);
      return state.battlefield.some(p => {
        if (p.summoningSick && !scActive) return false;
        switch (p.name) {
          case 'Priest of Titania':           return elfCount(state) >= 2;
          case 'Circle of Dreams Druid':      return creatureCount(state) >= 2;
          case 'Elvish Archdruid':            return elfCount(state) >= 2;
          case 'Wirewood Channeler':          return elfCount(state) >= 2;
          case "Karametra's Acolyte":         return devotionG(state) >= 2;
          case 'Selvala, Heart of the Wilds': return greatestPower(state) >= 2;
          case 'Fanatic of Rhonas':           return greatestPower(state) >= 4;
          case 'Marwyn, the Nurturer':        return (p.power || 0) >= 2;
          case 'Topiary Lecturer':            return (p.power || 0) >= 2;
          default: return false;
        }
      });
    },
  },

  {
    name: 'Infinite Green Mana (Ashaya + Scryb Ranger + Mana Dork ≥3G)  [COMBO 3, 7, 14, 21, 26, 27, 49]',
    description:
      'With Ashaya, Scryb Ranger is a Forest and bounces itself to untap the mana dork. ' +
      'Recast Scryb Ranger for {1G}. Net +{G}/cycle with dork producing ≥3G. ' +
      'Dorks: Priest of Titania (≥3 elves), Circle of Dreams Druid (≥3 creatures), ' +
      'Elvish Archdruid (≥3 elves), Wirewood Channeler (≥3 elves), ' +
      "Karametra's Acolyte (devotion ≥3), Selvala (power ≥3), " +
      'Fanatic of Rhonas (ferocious), Marwyn (power ≥3).',
    check(state) {
      if (!ashayaOut(state)) return false;
      if (!scrybAvailable(state)) return false; // Scryb-specific: Quirion alone does not qualify
      const scActive = shangChiActive(state);
      return state.battlefield.some(p => {
        if (p.summoningSick && !scActive) return false;
        switch (p.name) {
          case 'Priest of Titania':           return elfCount(state) >= 3;
          case 'Circle of Dreams Druid':      return creatureCount(state) >= 3;
          case 'Elvish Archdruid':            return elfCount(state) >= 3;
          case 'Wirewood Channeler':          return elfCount(state) >= 3;
          case "Karametra's Acolyte":         return devotionG(state) >= 3;
          case 'Selvala, Heart of the Wilds': return greatestPower(state) >= 3;
          case 'Fanatic of Rhonas':           return greatestPower(state) >= 4;
          case 'Marwyn, the Nurturer':        return (p.power || 0) >= 3;
          case 'Topiary Lecturer':            return (p.power || 0) >= 3;
          default: return false;
        }
      });
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  ASHAYA + QUIRION/SCRYB RANGER + HASTE ENABLER — SELF-FUNDED INFINITE
  //  GREEN MANA (no separate mana dork required)
  //
  //  With a haste enabler (Shang-Chi et al), the Ranger taps ITSELF (a
  //  Forest under Ashaya) for {G} — funding exactly its own {G} recast cost
  //  (Quirion) or half of its {1G} recast cost (Scryb). Its bounce ability
  //  is free (no mana cost, no tap symbol) and untaps any OTHER creature —
  //  and since Ashaya makes EVERY nontoken creature she controls a Forest,
  //  *including herself*, there is always at least one other Forest-creature
  //  to target: Ashaya always qualifies even with nothing else on board.
  //  That creature's tap (≥{G}, more with a real dork or Badgermole Cub) is
  //  pure profit layered on top of the mana-neutral Ranger loop.
  //
  //  Quirion (cost {G}): self-tap alone already covers the full recast, so
  //  ANY other green tapper — even bare Ashaya's {G} — is net positive.
  //  Scryb (cost {1G}): self-tap only covers half; the other tapper needs
  //  ≥2 green to also clear the remaining {1} and still net positive (bare
  //  Ashaya's {G} alone only breaks even — that case is already covered by
  //  the mana-neutral ETB detector below).
  // ══════════════════════════════════════════════════════════════════════════
  {
    name: 'Infinite Green Mana (Ashaya + Ranger + Shang-Chi, self-funded)',
    description:
      'With haste, Quirion/Scryb Ranger taps itself (a Forest under Ashaya) for ' +
      '{G} to fund its own recast, then bounces itself (free) to untap any OTHER ' +
      'Forest-creature — Ashaya herself always qualifies — for pure-profit {G} or ' +
      'more. Net ≥{G}/cycle; no separate mana dork needed.',
    check(state) {
      if (!ashayaOut(state)) return false;
      if (!hasGlobalHaste(state)) return false;
      const isQuirion = quirionAvailable(state);
      const isScryb   = !isQuirion && scrybAvailable(state);
      if (!isQuirion && !isScryb) return false;
      const recastCost = isQuirion ? 1 : 2; // {G} vs {1G}
      const selfTap = 1; // the Ranger's own Forest tap
      const other = bestOtherGreenOutput(state,
        new Set(['Quirion Ranger', 'Scryb Ranger']));
      return (selfTap + other) > recastCost;
    },
  },


  // ══════════════════════════════════════════════════════════════════════════
  //  ASHAYA + RANGER (Quirion or Scryb) — MANA-NEUTRAL ETB LOOP  (COMBO 1, 41)
  //
  //  When the available mana dork only produces 1G (e.g. Llanowar Elves), the
  //  Ranger-bounce loop produces zero net mana but generates infinite ETB,
  //  landfall (each Forest-Ranger entry), LTB, and storm count. This is
  //  exactly what decklist_combos.txt #1 and #41 describe under "Results:".
  //
  //  Why two detectors? The mana-POSITIVE variants above fire when the dork
  //  is large enough to fund the Ranger's recast cost ({G} for Quirion,
  //  {1G} for Scryb). When the dork is small, the loop is still meaningful
  //  for win conditions that consume ETBs (Beast Whisperer cascade, Lotus
  //  Cobra landfall mana, Tireless Provisioner tokens, etc.) — it just
  //  doesn't make infinite raw mana on its own.
  //
  //  Strict superset relationship: every state where a positive Ashaya+
  //  Ranger detector fires ALSO satisfies this neutral one. The detector
  //  priority order in DETECTORS.sort() ensures the positive variants run
  //  first, so this neutral detector only "wins" the priority race when
  //  no positive variant qualifies — which is precisely when we want it.
  // ══════════════════════════════════════════════════════════════════════════
  {
    name: 'Infinite ETB / Landfall (Ashaya + Ranger + Any Green Tapper)  [COMBO 1, 41]',
    loopType: LOOP_TYPE.MANA_NEUTRAL_ETB,
    description:
      'With Ashaya, Quirion or Scryb Ranger is a Forest and bounces itself to ' +
      'untap any creature. Recast costs {G}/{1G}; if the available green tapper ' +
      'produces only {G}, the loop is mana-neutral but generates infinite ETB / ' +
      'landfall / LTB / storm. Combo 1 (Quirion) and combo 41 (Scryb + Joraga) ' +
      'both reduce to this base form.',
    check(state) {
      if (!ashayaOut(state)) return false;
      if (!quirionAvailable(state) && !scrybAvailable(state)) return false;
      return hasGreenTapper(state);
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  ASHAYA + QUIRION RANGER + BADGERMOLE CUB + ANY CREATURE MANA DORK
  //
  //  Badgermole Cub static: "Whenever you tap a creature for mana, add {G}."
  //  This turns any creature that taps for ≥1 mana into a ≥2G source.
  //
  //  Loop (with Quirion Ranger cost {G}):
  //    1. Tap dork → base mana + {G} (Badgermole bonus) = ≥2G total.
  //    2. QR bounces itself (Forest under Ashaya) → untaps dork.
  //    3. Recast QR for {G}. Net ≥+1G per cycle.
  //
  //  The loop works with ANY creature that has a tapForMana ability, including
  //  simple 1G dorks (Llanowar Elves, Elvish Mystic, Fyndhorn Elves, Boreal Druid,
  //  Birds of Paradise, Delighted Halfling, Dryad Arbor) as well as larger dorks.
  //  Arbor Elf does NOT qualify — it has an untap ability, not a tapForMana ability,
  //  and its tap does not trigger Badgermole.
  //
  //  Scryb Ranger (cost {1G}) does NOT benefit from Badgermole with 1G dorks:
  //    1G dork + Badgermole = 2G, minus {1G} recast = net 0. Not infinite.
  //  Scryb needs a ≥2G base dork (so total ≥3G), covered by the Scryb detector above.
  // ══════════════════════════════════════════════════════════════════════════
  {
    name: 'Infinite Green Mana (Ashaya + Quirion Ranger + Badgermole Cub + Creature Dork)',
    description:
      'Badgermole Cub adds {G} whenever you tap a creature for mana. ' +
      'Any creature with a tap-for-mana ability becomes a ≥2G source. ' +
      'QR bounces itself (Forest under Ashaya) → untaps dork. Recast QR {G}. Net +≥1G/cycle. ' +
      'Works with: Llanowar Elves, Elvish Mystic, Birds of Paradise, Delighted Halfling, ' +
      'Dryad Arbor, Boreal Druid, Fyndhorn Elves, and all larger creature dorks.',
    check(state) {
      if (!ashayaOut(state)) return false;
      if (!quirionAvailable(state)) return false;
      if (!hasPerm(state, 'Badgermole Cub')) return false;
      const scActive = shangChiActive(state);
      // Need any non-sick creature (other than Badgermole itself) with a tapForMana.
      // Shang-Chi bypasses summoning sickness for tap abilities.
      return state.battlefield.some(p => {
        if (p.name === 'Badgermole Cub') return false;
        if (p.tapped) return false;
        if (p.summoningSick && !scActive) return false;
        if (!p.types || !p.types.includes('creature')) return false;
        const def = CARDS[p.cardKey];
        return typeof def?.tapForMana === 'function';
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
        p => p.name === 'Marwyn, the Nurturer' && !p.tapped && (!p.summoningSick || shangChiActive(state))
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
        p => p.name === 'Selvala, Heart of the Wilds' && !p.tapped && (!p.summoningSick || shangChiActive(state))
      );
      if (!selvala) return false;
      return greatestPower(state) >= 3;
    },
  },

  {
    // COMBO 63: Ashaya + Hope Tender + Shang-Chi, Master of Kung Fu
    // DISABLED: Although the loop generates net +{G} per cycle, Shang-Chi's mana
    // is restricted — "spend this mana only to activate abilities of creature sources."
    // It cannot cast creatures or spells, so the accumulated mana cannot reach a
    // game-winning state on its own. The detector was causing false-positive win
    // condition triggers that required unrestricted mana.
    // Left here for documentation; check() always returns false.
    name: 'Infinite Mana (Ashaya + Hope Tender + Shang-Chi) — DISABLED',
    loopType: LOOP_TYPE.MANA_POSITIVE,
    description:
      'DISABLED — Shang-Chi\'s {T}:{G}{G} is restricted to activating creature abilities ' +
      'only, so the loop cannot generate unrestricted mana needed to win. ' +
      'With Ashaya, Hope Tender and Shang-Chi are Forest lands. ' +
      'Loop: Tap Shang-Chi for {G}{G}. Pay {1}, exert Tender → untap Tender + Shang-Chi. ' +
      'Net +{G}/cycle, but restricted mana only.',
    check(_state) {
      return false; // disabled — restricted mana cannot reach a win condition
    },
  },

  {
    // COMBO 64: Ashaya + Shang-Chi + Hope Tender + Formidable Speaker + mana source
    //
    // Under Ashaya, all creatures are Forest lands. SC's static grants haste for
    // activated abilities to all creatures (including itself and Formidable Speaker).
    //
    // Loop (mana source must start or end each cycle tapped):
    //   1. Tap SC → +{G}{G} (restricted to creature abilities).
    //   2. Pay {1} (restricted), exert Tender → untap Tender + SC.
    //   3. Tap SC → +{G}{G} (restricted).
    //   4. Pay {1} (restricted), exert Tender → untap Tender + SC.
    //   5. Pay {1} (restricted), tap Formidable → untap the mana source.
    //   6. Pay {1} (restricted), exert Tender → untap Tender + Formidable.
    //   7. Tap mana source → +{G} (UNRESTRICTED land mana ability under Ashaya).
    //   Repeat.
    //
    // Mana accounting per cycle:
    //   Restricted in:  +2G (step1) + 2G (step3) = +4G
    //   Restricted out: -1G (step2) - 1G (step4) - 1G (step5) - 1G (step6) = -4G
    //   Net restricted: 0G
    //   Unrestricted:   +1G (step7, any creature/land that taps for mana under Ashaya)
    //   Net unrestricted: +1G per cycle → INFINITE UNRESTRICTED MANA.
    //
    // Requirements:
    //   - Ashaya on board (makes all creatures Forest lands)
    //   - SC present (grants haste for abilities to all, including Formidable while sick)
    //   - Hope Tender untapped (can exert multiple times per turn)
    //   - Formidable Speaker untapped ({1},{T}: untap another target permanent)
    //   - At least one other tappable mana source (creature or land) — under Ashaya
    //     even a Llanowar Elves becomes a land and its tap is a mana ability.
    name: 'Infinite Mana (Ashaya + Shang-Chi + Hope Tender + Formidable Speaker)  [COMBO 64]',
    loopType: LOOP_TYPE.MANA_POSITIVE,
    description:
      'With Ashaya, all creatures are Forest lands. SC grants haste for activated abilities. ' +
      'Loop: Tap SC twice (exerting Tender each time to untap SC). ' +
      'Tap Formidable to untap the mana source; exert Tender to untap Tender + Formidable. ' +
      'Tap mana source for unrestricted mana. Net: +1G unrestricted per cycle. ' +
      'Mana source can be any creature or land (Ashaya makes creatures into mana-producing lands).',
    check(state) {
      if (!ashayaOut(state)) return false;
      if (!state.battlefield.some(p => p.cardKey === 'shang_chi' && !p.tapped)) return false;
      if (!state.battlefield.some(p => p.cardKey === 'hope_tender' && !p.tapped)) return false;
      if (!state.battlefield.some(p => p.cardKey === 'formidable_speaker' && !p.tapped)) return false;
      // Need at least one other tappable mana source (untapped or will be cycled in by Formidable).
      // Under Ashaya, any untapped creature with a tap-for-mana ability qualifies.
      // We check for any untapped creature or land other than the core four pieces.
      const coreKeys = new Set(['ashaya','shang_chi','hope_tender','formidable_speaker']);
      const hasManaSource = state.battlefield.some(p =>
        !coreKeys.has(p.cardKey) && p.is('creature') || (p.is('land') && !p.is('creature'))
      );
      return hasManaSource;
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
      if (!permReadyOrSCActive(state, 'Magus of the Candelabra')) return false;
      // The loop costs {G}{G} to prime (Magus X=2 activation).
      // The mana source must be untapped to start the cycle, OR ≥2G must be
      // floating (so we can pay Magus first, then untap source via Magus).
      // Simplest correct check: require the source to be untapped.
      // (If all mana was spent, there is nothing to start the loop with.)
      return state.battlefield.some(p => {
        if (p.tapped) return false;
        if (p.summoningSick && !shangChiActive(state)) return false;  // source must be ready
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
          case 'Topiary Lecturer':            return (p.power || 0) >= 3;
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
      "Nykthos needs devotion ≥4 (produces ≥4G, pay {2}+{G}={3G}, net ≥1G). " +
      "Wild Growth / Elvish Guidance on any land: enchanted land taps for ≥2G, net ≥1G after Lodge.",
    check(state) {
      // [O-30] Wirewood Lodge's untap ability is "{G},{T}: Untap target Elf."
      // The land-untapper creature in this loop MUST be an Elf so Lodge can
      // untap it each cycle. Argothian Elder is an Elf Druid ✓. Ley Weaver is
      // a HUMAN Druid ✗ — Lodge cannot target it, so it does NOT work here
      // (unlike the Ashaya and Maze-of-Ith loops, where Ley Weaver is valid
      // because it untaps itself as a land / is untapped as any creature).
      if (!permReady(state, 'Argothian Elder')) return false;
      if (!permUntapped(state, 'Wirewood Lodge')) return false;
      const cradleOk      = cradleUntapped(state) && creatureCount(state) >= 2;
      const nykthosOk     = permUntapped(state, 'Nykthos, Shrine to Nyx') && devotionG(state) >= 4;
      // Wild Growth (COMBO 42): enchanted land taps for {1} + Wild Growth trigger {G} = 2 mana.
      // Lodge costs {G}, so net = 2 - 1 = 1G per cycle.
      // IMPORTANT: Ancient Tomb costs 2 life per tap — looping it would be lethal,
      // so it must not be the land that Wild Growth or Elvish Guidance enchants.
      //
      // Detection logic for the enchanted land:
      //   - In real game states: enchantedLandId is always set by onEnter. Look up
      //     the actual land and confirm it is not a life-cost land.
      //   - In synthetic/audit states: enchantedLandId may be absent (IDs undefined).
      //     Fall back to: aura is on battlefield AND at least one non-life-cost land exists.
      //     (Ancient Tomb would be the ONLY land in a failing case, so if there is any
      //      other land the enchantment must be — or could legally be — on that land.)
      const LIFE_COST_LANDS = new Set(['Ancient Tomb']);
      // Wirewood Lodge cannot be the "big mana land" — it is the untap mechanism itself.
      // The enchanted land must be a SEPARATE land that produces mana when tapped.
      const INVALID_BIG_LANDS = new Set([...LIFE_COST_LANDS, 'Wirewood Lodge']);
      const nonLifeLands = state.lands().filter(l => !INVALID_BIG_LANDS.has(l.name));

      const wildGrowthPerm = state.battlefield.find(p => p.name === 'Wild Growth');
      let wildGrowthOk = false;
      if (wildGrowthPerm) {
        if (wildGrowthPerm.enchantedLandId) {
          // Real game state: verify the attached land is not a life-cost land and not Lodge.
          const target = state.battlefield.find(p => p.id === wildGrowthPerm.enchantedLandId);
          wildGrowthOk = !!(target && !INVALID_BIG_LANDS.has(target.name));
        } else {
          // Synthetic/audit state: fall back to checking a safe non-Lodge land exists.
          wildGrowthOk = nonLifeLands.length >= 1;
        }
      }

      // Elvish Guidance (COMBO 46): enchanted land taps for {1} + {G}×elf-count.
      // Argothian Elder itself is an Elf (elfCount ≥ 1 always). Need ≥1 additional elf
      // (elfCount ≥ 2) so the land taps for ≥2G, covering Lodge's {G} cost and netting ≥1G.
      // With only Elder (elfCount=1): break-even loop (infinite storm/ETB but no net mana).
      // Same life-cost exclusion and fallback logic applies for Elvish Guidance.
      // Wirewood Lodge also excluded — it cannot serve as both the untapper and the mana source.
      const elvishGuidancePerm = state.battlefield.find(p => p.name === 'Elvish Guidance');
      let elvishGuidanceOk = false;
      if (elvishGuidancePerm && elfCount(state) >= 2) {
        if (elvishGuidancePerm.enchantedLandId) {
          const target = state.battlefield.find(p => p.id === elvishGuidancePerm.enchantedLandId);
          elvishGuidanceOk = !!(target && !INVALID_BIG_LANDS.has(target.name));
        } else {
          elvishGuidanceOk = nonLifeLands.length >= 1;
        }
      }
      return cradleOk || nykthosOk || wildGrowthOk || elvishGuidanceOk;
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

  // NOTE: Deserted Temple, Hope Tender, and Magus of the Candelabra are one-shot
  // untappers — they tap THEMSELVES to untap another land, so they cannot loop with
  // Nykthos alone. The legitimate Nykthos loop (Argothian Elder + Wirewood Lodge)
  // is captured by the COMBO 40 detector above. No separate detector needed here.

  // ══════════════════════════════════════════════════════════════════════════
  //  SELVALA + FREE CREATURE UNTAPPER  (COMBO 11, 12, 13, 16)
  //
  //  Selvala: {G},{T}: Add X mana, X = greatest power. Costs {G} per activation.
  //  Quirion/Scryb Ranger: bounce a Forest → untap a creature (FREE).
  //  With or without Ashaya: Ranger can bounce a basic Forest land to untap Selvala.
  //  With Ashaya: Ranger can also bounce itself.
  //  Net: Selvala produces ≥2G, pay {G} activation, net ≥1G.
  //
  //  [O-23] Quirion/Scryb Ranger's untap is "Activate only once each turn" —
  //  a single Ranger object can do it exactly once, no matter how many
  //  Forests exist to return as the cost. Repeating it within the loop
  //  requires bouncing+recasting the Ranger ITSELF each cycle (a fresh
  //  object = a fresh once-per-turn), which requires Ashaya so the Ranger
  //  can return ITSELF as the "Forest you control" cost. Without Ashaya,
  //  this gives at most 2 total Selvala activations — not infinite.
  //
  //  NOTE: Wirewood Symbiote is once-per-turn — NOT infinite with Selvala alone.
  //  Symbiote + Selvala only goes infinite inside a Temur Sabertooth loop.
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Infinite Mana (Selvala + Quirion/Scryb Ranger + Power ≥2)  [COMBO 11]',
    description:
      "Selvala: pay {G}, tap for G×(greatest power). " +
      "With Ashaya, Ranger returns itself (a Forest) to hand → untaps Selvala; " +
      "recast Ranger for {G}/{1G} (fresh object = fresh once-per-turn). " +
      "Net positive with greatest power ≥2.",
    check(state) {
      const selvala = state.battlefield.find(
        p => p.name === 'Selvala, Heart of the Wilds' && !p.tapped &&
             (!p.summoningSick || shangChiActive(state))
      );
      if (!selvala) return false;
      if (greatestPower(state) < 2) return false;
      if (!rangerAvailable(state)) return false; // ability must not be exhausted this turn
      // [O-23] Repeating the Ranger's untap within this turn requires it to
      // bounce ITSELF (a Forest under Ashaya) for a fresh once-per-turn.
      return ashayaOut(state);
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  KOGLA + KARAMETRA'S ACOLYTE  (COMBO 2)
  //
  //  Acolyte is a Human Druid. Kogla: {1G}: Return target Human → Kogla gains indestr.
  //  Loop: Tap Acolyte for G×devotion. Pay {1G} Kogla bounce. Recast Acolyte {3G}.
  //  Total cost per loop: {1G} + {3G} = 6 mana. Net at devotion ≥7 (+1G per cycle).
  //  Devotion=6 is break-even (0 net mana) — not infinite mana.
  //  PRE (canonical): devotion ≥7.
  //
  //  ⚠ HASTE REQUIREMENT: After Kogla bounces Acolyte and she is recast, she enters
  //  with summoning sickness and CANNOT tap for mana again without a haste enabler.
  //  Haste enablers: Concordant Crossroads (all creatures haste),
  //                  Thousand-Year Elixir (tap abilities as though they had haste),
  //                  Surrak and Goreclaw (each creature you cast gains haste).
  //  Without one of these, the loop cannot repeat — NOT infinite mana.
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: "Infinite Mana (Kogla + Karametra's Acolyte, devotion ≥7)  [COMBO 2]",
    description:
      "Tap Acolyte for G×devotion. Pay {1G}, Kogla bounces Acolyte (Human). " +
      "Recast Acolyte {3G}. Total cost 6G (bounce {1G} + recast {3G}). Net positive at devotion ≥7. " +
      "Requires a haste enabler (Concordant Crossroads / Thousand-Year Elixir / " +
      "Surrak and Goreclaw / Shang-Chi, Master of Kung Fu) " +
      "so Acolyte can tap again immediately after recast.",
    check(state) {
      if (!hasPerm(state, 'Kogla, the Titan Ape')) return false;
      const acolyte = state.battlefield.find(
        p => p.name === "Karametra's Acolyte" && !p.tapped && !p.summoningSick
      );
      if (!acolyte) return false;
      // After Kogla bounces Acolyte and she is recast, she enters with summoning sickness
      // and cannot tap her mana ability again without a haste enabler.
      // Thousand-Year Elixir and Shang-Chi: "You may activate abilities of creatures you
      // control as though those creatures had haste." — explicitly covers activated
      // abilities like Acolyte's tap.
      const hasHaste =
        hasPerm(state, 'Concordant Crossroads') ||
        hasPerm(state, 'Thousand-Year Elixir') ||
        hasPerm(state, 'Surrak and Goreclaw') ||
        state.battlefield.some(p => p.cardKey === 'shang_chi');
      if (!hasHaste) return false;
      return devotionG(state) >= 7;
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
    name: 'Infinite Mana (Temur Sabertooth + Wirewood Symbiote + Mana Dork ≥5)  [COMBO 4, 5, 17]',
    description:
      "Symbiote bounces a 1-drop Elf → untaps the mana dork (free, once-per-turn). " +
      "Sabertooth bounces Symbiote ({1G}). Recast Symbiote ({G}) + 1-drop ({G}). " +
      "Loop costs {G}{G}{G}{G}; nets positive when the dork grosses ≥5 mana per tap " +
      "(Circle of Dreams Druid ≥5 creatures, Priest of Titania / Wirewood Channeler / " +
      "Elvish Archdruid ≥5 Elves, Karametra's Acolyte devotion ≥5, Marwyn / Topiary " +
      "Lecturer power ≥5, Llanowar Tribe).",
    check(state) {
      if (!hasPerm(state, 'Temur Sabertooth')) return false;
      if (!symbioteAvailable(state)) return false;

      // Feed-elf on BF (Symbiote bounces it to untap the dork each cycle).
      const ONE_DROP_ELVES = new Set([
        'Llanowar Elves','Elvish Mystic','Fyndhorn Elves',
        'Allosaurus Shepherd','Wirewood Symbiote',
        'Quirion Ranger','Scryb Ranger',
      ]);
      if (!state.battlefield.some(p =>
        p.subtypes?.includes('Elf') && ONE_DROP_ELVES.has(p.name)
      )) return false;

      // Dork that grosses ≥5 mana per tap — tapped or untapped doesn't matter.
      // Loop order: Symbiote bounces feed-elf (free) → untaps dork → tap dork
      // for ≥5G → pay Temur {1G} + recast Symbiote {G} → repeat.
      // No bootstrap mana needed regardless of dork's tapped state.
      return state.creatures().some(p =>
        (!p.summoningSick || shangChiActive(state)) &&
        dorkGrossOutput(state, p) >= 5
      );
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
    name: 'Infinite Mana (Temur Sabertooth + Haste Enabler + Dork)  [COMBO 9, 10, 20, 29, 37]',
    description:
      "With a haste enabler, bounced creatures re-enter with haste and can tap immediately. " +
      "Enablers: Concordant Crossroads, Thousand-Year Elixir, Surrak and Goreclaw, " +
      "Shang-Chi, Master of Kung Fu. " +
      "Circle (≥6 creatures), Selvala (greatest power ≥7), Karametra's Acolyte (devotion ≥7). " +
      "NOTE: Surrak and Goreclaw (6/5) acts as haste enabler only — Selvala taps for 6 with " +
      "Surrak as the only big creature, which is break-even (cost 6). Need another creature " +
      "with power ≥7 for Selvala to produce a net-positive loop.",
    check(state) {
      if (!hasPerm(state, 'Temur Sabertooth')) return false;
      const hasElixir = hasPerm(state, 'Thousand-Year Elixir');
      const hasShangChi = state.battlefield.some(p => p.cardKey === 'shang_chi');
      const hasHaste =
        hasPerm(state, 'Concordant Crossroads') ||
        hasElixir ||
        hasPerm(state, 'Surrak and Goreclaw') ||
        hasShangChi;
      if (!hasHaste) return false;
      // Check each haste-loop variant
      if (permReady(state, 'Circle of Dreams Druid') && creatureCount(state) >= 6) return true;
      if (greatestPower(state) >= 7 &&
          state.battlefield.some(p => p.name === 'Selvala, Heart of the Wilds' && !p.summoningSick)) return true;
      // Thousand-Year Elixir and Shang-Chi let Acolyte tap even with summoning sickness —
      // skip the SS check when either is the haste enabler (Combo 29, 37).
      // Concordant Crossroads and Surrak and Goreclaw grant full haste, also removing
      // the summoning sickness restriction on tapping for abilities.
      const acolyteReady = state.battlefield.some(p =>
        p.name === "Karametra's Acolyte" && !p.tapped &&
        (!p.summoningSick || hasHaste)
      );
      if (devotionG(state) >= 7 && acolyteReady) return true;
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
    name: 'Infinite Mana (Hyrax Tower Scout + Temur Sabertooth + Mana Dork ≥5G)  [COMBO 8, 18, 28, 30, 57]',
    description:
      "Hyrax ETB untaps the mana dork. Sabertooth bounces Hyrax ({1G}), recast ({2G}). " +
      "Total loop cost {4G}+{1}. Need dork grossing ≥5G. " +
      "Priest/Archdruid/Channeler: ≥5 elves. Circle: ≥5 creatures. " +
      "Karametra's Acolyte: devotion ≥5. Selvala: power ≥6. Marwyn/Topiary: power ≥5. Llanowar Tribe. " +
      "Leyline of Abundance adds +1 to the dork's tap, so a gross-4 dork (e.g. Priest at 4 elves, " +
      "Fanatic's Ferocious mode) reaches the ≥5 threshold.",
    check(state) {
      if (!hasPerm(state, 'Temur Sabertooth')) return false;
      if (!hasPerm(state, 'Hyrax Tower Scout')) return false;
      // [O-29] Any untapped, non-summoning-sick dork that grosses ≥5 mana per
      // tap completes the loop. Use the shared dorkGrossOutput helper so the dork
      // list (Priest, Archdruid, Channeler, Circle, Karametra's Acolyte, Marwyn,
      // Topiary, Llanowar Tribe) stays consistent with the Symbiote-loop detector.
      // Selvala is intentionally excluded by dorkGrossOutput (her {G} activation
      // cost is handled by her own dedicated detectors); keep her special-cased.
      return state.creatures().some(p => {
        if (p.summoningSick && !shangChiActive(state)) return false;
        if (p.tapped) return false;
        if (p.name === 'Selvala, Heart of the Wilds') return greatestPower(state) >= 6;
        return dorkGrossOutput(state, p) >= 5;
      });
    },
  },

  {
    name: 'Infinite Mana (Hyrax Tower Scout + Kogla + Mana Dork ≥5G)  [COMBO 15, 19, 23, 25, 35, 38, 59]',
    description:
      "Kogla bounces Hyrax (Human Scout, {1G}), recast from hand ({2G}), ETB untaps dork. " +
      "Loop cost: {1G}(Kogla) + {2G}(Hyrax) = 5 mana total. Dork must produce ≥5G. " +
      "Priest/Archdruid/Channeler: ≥5 elves. Circle: ≥5 creatures. " +
      "Selvala: power ≥6. Marwyn: power ≥5 (Combo 38: Kogla loop cost = 5G = break-even).",
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
          case "Karametra's Acolyte":         return devotionG(state) >= 5;
          case 'Selvala, Heart of the Wilds': return greatestPower(state) >= 6;
          case 'Marwyn, the Nurturer':        return (p.power || 0) >= 5; // Combo 38: break-even at 5
          case 'Topiary Lecturer':            return (p.power || 0) >= 5; // same break-even logic
          default: return false;
        }
      });
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  TEMUR SABERTOOTH + SHANG-CHI + TAP-DORK (BOUNCE-RECAST LOOP)
  //
  //  Shang-Chi's static: "You may activate abilities of creatures you control
  //  as though those creatures had haste."
  //  This means a creature with a tap-activated mana ability can tap for mana
  //  the same turn it enters — even after being bounced and recast by Temur.
  //
  //  Loop:
  //   1. Tap dork for mana.
  //   2. Pay {1G}, Temur bounces dork to hand.
  //   3. Recast dork (enters with summoning sickness, but Shang-Chi bypasses it).
  //   4. Tap dork again immediately. Repeat.
  //
  //  Loop cost = {1G}(Temur) + recast cost of dork.
  //  Net positive when dork produces more mana than loop cost.
  //
  //  Selvala {1GG} (recast 3G total; loop cost = 1G+3G = 4G):  power ≥ 5
  //  Priest/Archdruid/Channeler {2G} (loop cost = 1G+3G = 4G): elves ≥ 5
  //  Circle of Dreams Druid {GGG} (loop cost = 1G+4G = 5G):    creatures ≥ 6
  //  Acolyte {3G} (loop cost = 1G+4G = 5G):                    devotion ≥ 6
  //  Marwyn {2G} (loop cost = 1G+3G = 4G):                     power ≥ 5
  //
  //  NOTE: Shang-Chi himself is a 2/2 contributing to creature/elf counts but
  //  NOT an Elf, so he does not help elf-count thresholds directly.
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Infinite Mana (Temur Sabertooth + Shang-Chi + Tap-Dork bounce-recast)',
    description:
      "Shang-Chi lets a freshly-recast tap-dork activate immediately (bypasses summoning sickness). " +
      "Temur Sabertooth bounces dork ({1G}), dork is recast and taps for mana right away. " +
      "Loop cost = {1G}(Temur) + recast cost. " +
      "Selvala (power ≥5): loop cost 4G, produces ≥5G. " +
      "Priest/Archdruid/Channeler (≥5 elves): loop cost 4G, produces ≥5G. " +
      "Circle (≥6 creatures): loop cost 5G, produces ≥6G. " +
      "Acolyte (devotion ≥6): loop cost 5G, produces ≥6G. " +
      "Marwyn (power ≥5): loop cost 4G, produces ≥5G.",
    check(state) {
      if (!hasPerm(state, 'Temur Sabertooth')) return false;
      if (!state.battlefield.some(p => p.cardKey === 'shang_chi')) return false;
      // The dork must be on the battlefield (untapped; it may or may not be sick —
      // Shang-Chi bypasses sickness for the tap ability).
      return state.battlefield.some(p => {
        if (p.tapped) return false;
        switch (p.name) {
          case 'Selvala, Heart of the Wilds':  return greatestPower(state) >= 5;
          case 'Priest of Titania':            return elfCount(state) >= 5;
          case 'Elvish Archdruid':             return elfCount(state) >= 5;
          case 'Wirewood Channeler':           return elfCount(state) >= 5;
          case 'Circle of Dreams Druid':       return creatureCount(state) >= 6;
          case "Karametra's Acolyte":          return devotionG(state) >= 6;
          case 'Marwyn, the Nurturer':         return (p.power || 0) >= 5;
          case 'Topiary Lecturer':             return (p.power || 0) >= 5;
          default: return false;
        }
      });
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  KOGLA + SHANG-CHI + TAP-DORK (BOUNCE-RECAST LOOP)
  //
  //  Kogla bounces Humans for {1G}. With Shang-Chi, the recast Human can tap
  //  for mana immediately, bypassing summoning sickness.
  //
  //  Kogla bounces Humans only. Human tap-dorks in this deck:
  //    Karametra's Acolyte (Human Druid) — tap for devotion×G
  //    Hope Tender (Human Druid) — covered by Ashaya loops, not modelled here
  //    Ley Weaver (Human Druid) — covered by Elder/Weaver loops, not here
  //
  //  Practical loop: Kogla + Shang-Chi + Karametra's Acolyte
  //  Loop cost = {1G}(Kogla) + {3G}(Acolyte recast) = 5G total.
  //  Net positive when Acolyte produces ≥6G → devotion ≥ 6.
  //
  //  NOTE: Selvala, Marwyn, and Priest of Titania are all Elves — NOT Humans.
  //  Kogla cannot bounce them. They are excluded from this detector.
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Infinite Mana (Kogla + Shang-Chi + Human Tap-Dork bounce-recast)',
    description:
      "Shang-Chi lets a freshly-recast Human tap-dork activate immediately. " +
      "Kogla bounces Human dork ({1G}), dork is recast and taps right away. " +
      "Kogla bounces Humans only — Selvala, Marwyn, and Priest of Titania are Elves, not Humans. " +
      "Karametra's Acolyte ({3G} recast): loop cost 5G, devotion ≥6 produces ≥6G (net +1G).",
    check(state) {
      if (!hasPerm(state, 'Kogla, the Titan Ape')) return false;
      if (!state.battlefield.some(p => p.cardKey === 'shang_chi')) return false;
      // Karametra's Acolyte is the only Human tap-dork with sufficient mana output.
      // Loop cost: {1G}(Kogla) + {3G}(Acolyte recast) = 5G. Need devotion ≥6 to net +1G.
      const acolyte = state.battlefield.find(
        p => p.name === "Karametra's Acolyte" && !p.tapped
      );
      if (!acolyte) return false;
      return devotionG(state) >= 6;
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  TEMUR SABERTOOTH / KOGLA + SHANG-CHI + ANY HIGH-OUTPUT DORK (GENERIC)
  //
  //  Generalizes the two named-dork detectors above to ANY creature with a
  //  tap-for-mana ability whose output exceeds the loop cost — computed
  //  dynamically from its actual tapForMana result and printed mana cost —
  //  rather than a fixed switch-statement of specific cards. This catches
  //  dorks whose output scales with something not enumerated above, e.g.
  //  Wose Pathfinder (scales with Forest count — very large under Ashaya,
  //  since every creature becomes a Forest).
  //
  //  Loop cost = bounce ({1}{G} = 2 total mana, same ability shape on both
  //  Temur and Kogla) + the dork's own recast cost (from its printed mana
  //  cost). Fires when the dork's CURRENT tap output is strictly greater
  //  than that total, i.e. it "generates at least 1 net mana after paying
  //  for both the bounce and recast costs" (the loop's own win condition).
  //
  //  Kogla can only bounce Humans ("Return target Human you control"); the
  //  Kogla path here is gated accordingly. Temur has no type restriction.
  //  Shang-Chi's own mana is deliberately excluded (unmodeled, see O-27).
  // ══════════════════════════════════════════════════════════════════════════
  {
    name: 'Infinite Mana (Temur Sabertooth / Kogla + Shang-Chi + High-Output Dork, generic)',
    description:
      'Generalizes the named bounce-recast loops above to any tap-dork whose ' +
      'CURRENT output exceeds bounce ({1}{G}=2) + its own recast cost, computed ' +
      'dynamically rather than from a fixed card list. Kogla is restricted to ' +
      'Human dorks (his bounce ability targets Humans only); Temur has no type ' +
      'restriction.',
    check(state) {
      const hasTemur = hasPerm(state, 'Temur Sabertooth');
      const hasKogla = hasPerm(state, 'Kogla, the Titan Ape');
      if (!hasTemur && !hasKogla) return false;
      const scActive = state.battlefield.some(p => p.cardKey === 'shang_chi');
      if (!scActive) return false;
      const beforeG = state.mana?.G ?? 0;
      return state.battlefield.some(p => {
        if (p.cardKey === 'shang_chi') return false;        // unmodeled (O-27) — see actions.js
        if (p.cardKey === 'temur_sabertooth' || p.cardKey === 'kogla') return false;
        if (!p.types || !p.types.includes('creature')) return false;
        if (p.tapped) return false;
        const def = CARDS[p.cardKey];
        if (!def?.tapForMana) return false;
        const isHuman = p.subtypes && p.subtypes.includes('Human');
        const bounceable = hasTemur || (hasKogla && isHuman);
        if (!bounceable) return false;
        // Shang-Chi bypasses summoning sickness for the tap ability (same
        // rule as any creature tap ability — see actions.js note on CR 302.6).
        const permForCheck = p.summoningSick
          ? Object.assign(Object.create(Object.getPrototypeOf(p)), p, { summoningSick: false })
          : p;
        let successors;
        try { successors = def.tapForMana(state, permForCheck) || []; } catch { return false; }
        const output = successors.reduce((max, s2) => Math.max(max, (s2.mana?.G ?? 0) - beforeG), 0);
        if (output <= 0) return false;
        const recastCost = (def._parsedCost?.generic ?? 0) +
          Object.values(def._parsedCost?.colored ?? {}).reduce((a, b) => a + b, 0);
        const loopCost = 2 + recastCost; // {1}{G} bounce + recast
        return output > loopCost;
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
    name: 'Infinite Mana (Earthcraft + Ashaya + Quirion Ranger + Basic Forest)  [Combo Summary #4]',
    description:
      "Earthcraft taps Quirion to untap a basic Forest. " +
      "Forest taps {G}. " +
      "Earthcraft taps another creature (Ashaya) to untap a basic Forest. " +
      "Forest taps {G}. " +
      "Quirion bounces itself (a Forest under Ashaya) → untaps creature (Ashaya). " +
      "Recast Quirion {G}. Net +{G} from Ashaya per cycle. Requires a basic Forest.",
    check(state) {
      if (!hasPerm(state, 'Earthcraft')) return false;
      if (!ashayaOut(state)) return false;
      if (!rangerAvailable(state)) return false; // ability must not be exhausted this turn
      // Earthcraft requires a BASIC land target — Ashaya creatures are Forests but not basic.
      // l.basic is not a Permanent field; use the card definition's isBasic flag instead.
      // l.name === 'Forest' is a reliable fallback since 'Forest' is the only named basic
      // land in this decklist, but cards[l.cardKey]?.isBasic is the canonical check.
      var cards = CARDS;
      const hasBasicForest = state.lands().some(l =>
        l.name === 'Forest' || cards[l.cardKey]?.isBasic
      );
      if (!hasBasicForest) return false;
      // Need a mana dork (other than Ranger) to net positive
      return state.battlefield.some(p =>
        p.types && p.types.includes('creature') &&
        p.name !== 'Quirion Ranger' &&
        !p.tapped
      );
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  ASHAYA + QUIRION/SCRYB RANGER + ARBOR ELF + ENCHANTED LAND
  //
  //  With Ashaya: Ranger is a Forest. Loop:
  //    Tap enchanted land (Wild Growth or Utopia Sprawl) for 2G.
  //    Ranger bounces itself → untaps Arbor Elf.
  //    Arbor Elf untaps the enchanted land (it IS a Forest under Ashaya or naturally).
  //    Recast Ranger for {G}. Net +1G per cycle.
  //
  //  Quirion Ranger (cost {G}): enchanted land must produce ≥2G → net +1G ✓
  //  Scryb Ranger (cost {1G}): enchanted land must produce ≥3G → needs both
  //    Wild Growth AND Utopia Sprawl on same land, or Leyline of Abundance.
  //    (Too rare to model separately — Quirion covers the common case.)
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Infinite Green Mana (Ashaya + Quirion Ranger + Arbor Elf + Enchanted Land)',
    description:
      'Ranger bounces itself (Forest under Ashaya) → untaps Arbor Elf. ' +
      'Arbor Elf untaps Wild Growth / Utopia Sprawl enchanted Forest (taps for 2G). ' +
      'Recast Ranger {G}. Net +1G per cycle.',
    check(state) {
      if (!ashayaOut(state)) return false;
      if (!rangerAvailable(state)) return false;
      // Arbor Elf need not be untapped: QR bounce untaps it as the first loop action.
      if (!hasPerm(state, 'Arbor Elf')) return false;
      // Need an enchanted Forest producing ≥2G (Wild Growth or Utopia Sprawl attached)
      const hasSprawl = state.battlefield.some(p =>
        (p.cardKey === 'wild_growth' || p.cardKey === 'utopia_sprawl') &&
        p.enchantedLandId !== undefined
      );
      if (!hasSprawl) return false;
      // The enchanted land must be a Forest (Arbor Elf can only untap Forests)
      const enchantedLandId = state.battlefield.find(p =>
        (p.cardKey === 'wild_growth' || p.cardKey === 'utopia_sprawl') &&
        p.enchantedLandId !== undefined
      )?.enchantedLandId;
      return state.battlefield.some(p => p.id === enchantedLandId && p.isForest);
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  ASHAYA + QUIRION RANGER + ARBOR ELF + YAVIMAYA + BIG LAND
  //
  //  Yavimaya makes ALL lands Forests, so Arbor Elf can untap Gaea's Cradle
  //  or Nykthos. Loop:
  //    Tap big land for N mana.
  //    Ranger bounces itself → untaps Arbor Elf.
  //    Arbor Elf untaps big land (now a Forest via Yavimaya).
  //    Recast Ranger {G}. Net positive if big land produces ≥2G.
  //
  //  Gaea's Cradle: needs ≥2 creatures (cradle produces ≥2G). Ranger costs {G}. Net +1G ✓
  //  Nykthos: costs {2} to activate. Net = devotion - 2 - 1(ranger). Need devotion ≥4 ✓
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Infinite Green Mana (Ashaya + Quirion Ranger + Arbor Elf + Yavimaya + Big Land)',
    description:
      'Yavimaya makes all lands Forests. Ranger bounces itself → untaps Arbor Elf. ' +
      'Arbor Elf untaps Gaea\'s Cradle (≥2 creatures) or Nykthos (devotion ≥4). ' +
      'Recast Ranger {G}. Net +1G per cycle.',
    check(state) {
      if (!ashayaOut(state)) return false;
      if (!rangerAvailable(state)) return false;
      // Arbor Elf need not be untapped: QR's bounce ability (the first action
      // of the loop) untaps Arbor Elf as its effect, even if Arbor is tapped.
      // Loop sequence: QR bounces itself (a Forest under Ashaya) → untaps Arbor
      // → Arbor untaps Cradle → Cradle taps for mana → recast QR.
      if (!hasPerm(state, 'Arbor Elf')) return false;
      if (!hasPerm(state, 'Yavimaya, Cradle of Growth')) return false;
      // Gaea's Cradle / Itlimoc on battlefield + ≥2 creatures → ≥2G per cycle.
      // Both Cradle and Arbor may be tapped at detection time — the first loop
      // action (QR bounce) untaps Arbor, then Arbor untaps Cradle.
      const hasCradle = state.battlefield.some(
        p => p.name === "Gaea's Cradle" || p.name === 'Itlimoc, Cradle of the Sun'
      );
      if (hasCradle && creatureCount(state) >= 2) return true;
      // Nykthos untapped + devotion ≥4 → net +1G after {2} activation cost.
      // Nykthos must be untapped since Arbor needs to untap it, not QR.
      if (permUntapped(state, 'Nykthos, Shrine to Nyx') && devotionG(state) >= 4) return true;
      return false;
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  TEMUR SABERTOOTH + WIREWOOD SYMBIOTE + SELVALA  (COMBO 12, 13, 16)
  //
  //  Symbiote (once-per-turn) bounces a 1-drop Elf → untaps Selvala.
  //  Sabertooth bounces Symbiote ({1G}). Recast Symbiote ({G}) + 1-drop ({G}).
  //  Loop cost: {1G}+{G}+{G}+{G}(Selvala activation) = {4G}+{1}.
  //  Selvala must produce ≥5G → greatest power ≥6 (since Selvala costs {G} to activate).
  //  PRE (canonical): all on BF, Selvala and 1-drop not sick, power ≥6.
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Infinite Mana (Temur Sabertooth + Wirewood Symbiote + Selvala)  [COMBO 12, 13, 16]',
    description:
      "Symbiote bounces a 1-drop Elf → untaps Selvala. " +
      "Sabertooth bounces Symbiote ({1G}). Recast Symbiote ({G}) + 1-drop ({G}). " +
      "Selvala activation costs {G}. Total loop cost {4G}+{1}. " +
      "Net positive with greatest power ≥6 (Selvala produces ≥6G, pays all costs, nets ≥1G).",
    check(state) {
      if (!hasPerm(state, 'Temur Sabertooth')) return false;
      if (!symbioteAvailable(state)) return false; // ability must not be exhausted this turn
      const selvala = state.battlefield.find(
        p => p.name === 'Selvala, Heart of the Wilds' && !p.tapped &&
             (!p.summoningSick || shangChiActive(state))
      );
      if (!selvala) return false;
      if (greatestPower(state) < 6) return false;
      // Feed-elf must be on BF — Symbiote needs it on the first activation.
      const FEED_ELVES = new Set(['Llanowar Elves','Elvish Mystic','Fyndhorn Elves','Allosaurus Shepherd']);
      return state.battlefield.some(p =>
        p.subtypes?.includes('Elf') && !p.summoningSick && FEED_ELVES.has(p.name)
      );
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  SELVALA + CLOUDSTONE CURIO + WIREWOOD SYMBIOTE + 1-DROP ELF  (COMBO 53, 54, 55)
  //
  //  No Temur Sabertooth required — Cloudstone Curio takes its role.
  //  Loop:
  //   1. Tap 1-drop elf → {G}. Tap Selvala (pay {G}) → at least {4G} (power ≥4+).
  //   2. Symbiote bounces 1-drop → untaps Selvala.
  //   3. Cast 1-drop ({G}) → Cloudstone triggers: returns Symbiote to hand.
  //   4. Cast Symbiote ({G}) → Cloudstone triggers (no useful target or Symbiote itself).
  //   5. Repeat from step 1.
  //  Loop cost: {G}(1-drop)+{G}(Selvala activation)+{G}(recast 1-drop)+{G}(recast Symbiote) = {4G}.
  //  Selvala must produce ≥5G net → greatest power ≥5. PRE: power ≥4 (decklist says ≥4).
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Infinite Mana (Selvala + Cloudstone Curio + Wirewood Symbiote + 1-drop Elf)  [COMBO 53, 54, 55]',
    description:
      "Cloudstone Curio replaces Temur Sabertooth. " +
      "1-drop Elf enters → Cloudstone bounces Symbiote. Symbiote enters → Cloudstone bounces 1-drop or nothing. " +
      "Symbiote bounces 1-drop → untaps Selvala. " +
      "Net positive with greatest power ≥4 (Selvala produces ≥4G+, loop costs {4G}).",
    check(state) {
      if (!hasPerm(state, 'Cloudstone Curio')) return false;
      if (!symbioteAvailable(state)) return false; // ability must not be exhausted this turn
      const selvala = state.battlefield.find(
        p => p.name === 'Selvala, Heart of the Wilds' && !p.tapped &&
             (!p.summoningSick || shangChiActive(state))
      );
      if (!selvala) return false;
      if (greatestPower(state) < 4) return false;
      // Feed-elf must be on BF — Symbiote needs it on the first activation.
      const FEED_ELVES2 = new Set(['Llanowar Elves','Elvish Mystic','Fyndhorn Elves']);
      return state.battlefield.some(p =>
        p.subtypes?.includes('Elf') && !p.summoningSick && FEED_ELVES2.has(p.name)
      );
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  [O-31] CLOUDSTONE CURIO + DEFILER OF VIGOR + HASTE + TWO 1-DROP ELVES
  //
  //  Defiler of Vigor: "As an additional cost to cast green permanent spells,
  //  you may pay 2 life. Those spells cost {G} less..." → a 1-drop green elf
  //  ({G}) is recast for {0} + 2 life.
  //  Cloudstone Curio: when a nonartifact permanent enters, return another
  //  permanent sharing a type (a creature) to hand.
  //
  //  Loop (needs two 1-drop green mana elves, A and B; A on battlefield, B
  //  in hand, or vice-versa):
  //   1. Tap elf A for {G}.
  //   2. Cast elf B for {0} (pay 2 life via Defiler). It has haste (global
  //      haste enabler), so it can tap.  Cloudstone bounces tapped elf A.
  //   3. Repeat with roles swapped.  Net +1 green mana per cycle, −2 life.
  //
  //  A global-haste enabler is REQUIRED — without it the recast elf is
  //  summoning-sick and cannot tap, so the loop nets 0 (verified in-engine).
  //  This is LIFE-BOUNDED (2 life/cycle), not literally infinite, but ~19
  //  iterations from 40 life is ample to assemble any finisher; each cast
  //  also pumps the whole team via Defiler's +1/+1 trigger.
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Infinite Mana (Cloudstone Curio + Defiler of Vigor + Haste + Two 1-drop Elves)',
    description:
      "Defiler makes a 1-drop green elf cost {0} + 2 life. Tap elf A for {G}; " +
      "cast elf B for {0} (it has haste, can tap) → Cloudstone bounces elf A. " +
      "Repeat with roles swapped: +1 green mana per cycle (−2 life). " +
      "Requires a global-haste enabler (Concordant Crossroads / Thousand-Year " +
      "Elixir / Surrak and Goreclaw / Shang-Chi) so recast elves can tap. " +
      "Life-bounded but ample to assemble any finisher.",
    check(state) {
      if (!hasPerm(state, 'Cloudstone Curio')) return false;
      if (!hasPerm(state, 'Defiler of Vigor')) return false;
      if (!hasGlobalHaste(state)) return false;
      // Need at least TWO 1-drop green mana elves (cost exactly {G}, tap for
      // mana) to alternate as Cloudstone bounce targets. They may be on the
      // battlefield or in hand (the loop keeps one in each zone). Count
      // distinct copies across battlefield + hand.
      const ONE_DROP_MANA_ELVES = new Set(['llanowar_elves', 'elvish_mystic', 'fyndhorn_elves']);
      let count = 0;
      for (const p of state.battlefield) {
        if (ONE_DROP_MANA_ELVES.has(p.cardKey)) count++;
      }
      for (const k of state.hand) {
        if (ONE_DROP_MANA_ELVES.has(k)) count++;
      }
      // Need a life buffer to run enough cycles to matter (≥3 cycles = 6 life).
      const life = state.players?.[0]?.life ?? state.life ?? 0;
      return count >= 2 && life > 6;
    },
  },


  //
  //  Vitalize {G}: Untap all creatures you control.
  //  Emerald Charm {G}: Untap target permanent (choose this mode).
  //  Eternal Witness {1GG}: ETB returns a card from graveyard to hand.
  //
  //  General loop (Temur + Marwyn, COMBO 33 / 58):
  //   1. Tap Marwyn for G×power.
  //   2. Cast Vitalize/Emerald Charm {G} — untap Marwyn (and all others).
  //   3. Pay {1G}, Temur bounces Eternal Witness to hand.
  //   4. Cast Eternal Witness {1GG} — ETB returns Vitalize/Charm from GY to hand.
  //   5. Repeat.
  //  Loop cost: {G}(spell) + {1G}(Temur) + {1GG}(EWit) = 4G + 2 generic = 6 total mana.
  //  Marwyn must produce ≥7G (power ≥7) to net ≥1G per cycle.
  //
  //  Kogla variant replaces Temur: Kogla bounces EWit (Human) for {1G}.
  //  Same loop cost. Same mana requirement (power ≥7 for Marwyn, ≥9 for Selvala variant).
  //
  //  Selvala + Temur (COMBO 39): Selvala activation costs {G}, so net must account for that.
  //  Power ≥8 ensures Selvala produces ≥8G to cover: {G}(activation)+{G}(spell)+{1G}(Temur)+{1GG}(EWit)=7G.
  //
  //  Selvala + Kogla (COMBO 44): Same math, power ≥9 per canonical combo (Kogla is 7 power —
  //  greatest power = Kogla's 7 unless another creature exceeds it).
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Infinite Mana (Marwyn + Eternal Witness + Temur + Vitalize/Emerald Charm)  [COMBO 33, 58]',
    description:
      'With Marwyn (power ≥7), Eternal Witness, and Temur Sabertooth on battlefield, ' +
      'and Vitalize or Emerald Charm in hand: ' +
      'Tap Marwyn for ≥7G. Cast untap spell {G}. ' +
      'Temur bounces EWit {1G}. Cast EWit {1GG} — returns untap spell from GY. ' +
      'Loop cost 6G total. Net +≥1G at power ≥7.',
    check(state) {
      if (!hasPerm(state, 'Temur Sabertooth')) return false;
      if (!hasPerm(state, 'Eternal Witness')) return false;
      const marwyn = state.battlefield.find(
        p => p.name === 'Marwyn, the Nurturer' && !p.tapped &&
             (!p.summoningSick || shangChiActive(state))
      );
      if (!marwyn || (marwyn.power || 0) < 7) return false;
      return (state.hand && (
        state.hand.includes('vitalize') ||
        state.hand.includes('emerald_charm')
      ));
    },
  },

  {
    name: 'Infinite Mana (Marwyn + Eternal Witness + Kogla + Vitalize/Emerald Charm)  [COMBO 51]',
    description:
      'With Marwyn (power ≥8), Eternal Witness, and Kogla on battlefield, ' +
      'and Vitalize or Emerald Charm in hand: ' +
      'Tap Marwyn for ≥8G. Cast untap spell {G}. ' +
      'Kogla bounces EWit (Human) {1G}. Cast EWit {1GG} — returns untap spell from GY. ' +
      'Loop cost 6G total. Marwyn power ≥8 nets ≥2G per cycle (extra safety margin). ' +
      'Actually power ≥7 works; canonical combo says ≥8.',
    check(state) {
      if (!hasPerm(state, 'Kogla, the Titan Ape')) return false;
      if (!hasPerm(state, 'Eternal Witness')) return false;
      const marwyn = state.battlefield.find(
        p => p.name === 'Marwyn, the Nurturer' && !p.tapped &&
             (!p.summoningSick || shangChiActive(state))
      );
      if (!marwyn || (marwyn.power || 0) < 8) return false;
      return (state.hand && (
        state.hand.includes('vitalize') ||
        state.hand.includes('emerald_charm')
      ));
    },
  },

  {
    name: 'Infinite Mana (Selvala + Eternal Witness + Temur + Vitalize/Emerald Charm)  [COMBO 39]',
    description:
      'With Selvala (power ≥8), Eternal Witness, and Temur Sabertooth on battlefield, ' +
      'and Vitalize or Emerald Charm in hand: ' +
      'Pay {G} activate Selvala for ≥8G. Cast untap spell {G}. ' +
      'Temur bounces EWit {1G}. Cast EWit {1GG} — returns untap spell from GY. ' +
      'Total cost: {G}(Selvala) + {G}(spell) + {1G}(Temur) + {1GG}(EWit) = 7G. ' +
      'Net ≥1G at greatest power ≥8.',
    check(state) {
      if (!hasPerm(state, 'Temur Sabertooth')) return false;
      if (!hasPerm(state, 'Eternal Witness')) return false;
      const selvala = state.battlefield.find(
        p => p.name === 'Selvala, Heart of the Wilds' && !p.tapped &&
             (!p.summoningSick || shangChiActive(state))
      );
      if (!selvala) return false;
      if (greatestPower(state) < 8) return false;
      return (state.hand && (
        state.hand.includes('vitalize') ||
        state.hand.includes('emerald_charm')
      ));
    },
  },

  {
    name: 'Infinite Mana (Selvala + Eternal Witness + Kogla + Vitalize/Emerald Charm)  [COMBO 44]',
    description:
      'With Selvala (power ≥9), Eternal Witness, and Kogla on battlefield, ' +
      'and Vitalize in hand: ' +
      'Pay {G} activate Selvala for ≥9G. Cast Vitalize {G} (untap all). ' +
      'Kogla bounces EWit (Human) {1G}. Cast EWit {1GG} — returns Vitalize from GY. ' +
      'Total cost: {G}(Selvala) + {G}(Vitalize) + {1G}(Kogla) + {1GG}(EWit) = 7G. ' +
      'Canonical prerequisite: greatest power ≥9.',
    check(state) {
      if (!hasPerm(state, 'Kogla, the Titan Ape')) return false;
      if (!hasPerm(state, 'Eternal Witness')) return false;
      const selvala = state.battlefield.find(
        p => p.name === 'Selvala, Heart of the Wilds' && !p.tapped &&
             (!p.summoningSick || shangChiActive(state))
      );
      if (!selvala) return false;
      if (greatestPower(state) < 9) return false;
      return (state.hand && (
        state.hand.includes('vitalize') ||
        state.hand.includes('emerald_charm')
      ));
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  SURVIVAL OF THE FITTEST / FAUNA SHAMAN → ASSEMBLE ASHAYA LOOP THIS TURN
  //
  //  When Survival of the Fittest or Fauna Shaman is on the battlefield and the
  //  library contains the pieces to assemble an Ashaya + Ranger + big-dork loop,
  //  the combo is achievable this turn (given enough mana and discard fodder).
  //
  //  PATTERN A: Ashaya already on battlefield
  //    One Survival activation → fetch big dork → cast it → COMBO fires.
  //    Requires: 1 creature in hand to discard + {G} for Survival + mana to cast dork.
  //
  //  PATTERN B: Ashaya in hand but not on battlefield
  //    One Survival activation → fetch big dork → cast Ashaya → cast dork → COMBO.
  //    Requires: 1 OTHER creature in hand to discard + {G} + mana for Ashaya + dork.
  //
  //  PATTERN C: Ashaya in library
  //    Two Survival activations → fetch Ashaya → fetch big dork → cast both → COMBO.
  //    Requires: 2 creatures in hand to discard + {GG} + mana for Ashaya + dork.
  //
  //  'Big dork' = a creature that, once on the battlefield alongside Ashaya and the
  //  Ranger, produces ≥2G per tap (net +1G after recasting Ranger for {G}):
  //    • Priest of Titania / Elvish Archdruid / Wirewood Channeler: elfCount ≥ 2
  //    • Circle of Dreams Druid: creatureCount ≥ 2 (trivially true with any BF)
  //    • Karametra's Acolyte: devotionG ≥ 2
  //    • Selvala, Heart of the Wilds: greatestPower ≥ 2
  //    • Fanatic of Rhonas: greatestPower ≥ 4 (ferocious)
  //
  //  Mana requirement: checked against state.mana.total() to ensure there is enough
  //  floating mana to cover Survival activations + casting Ashaya + casting the dork.
  //  (The combo itself is then self-sustaining and generates infinite mana.)
  // ══════════════════════════════════════════════════════════════════════════
  {
    name: 'Infinite Green Mana (Survival/Fauna Shaman → Ashaya + Ranger + Big Dork)',
    description:
      'Survival of the Fittest or Fauna Shaman tutors the missing pieces to assemble ' +
      'an Ashaya + Quirion/Scryb Ranger + big-dork infinite-mana loop this turn. ' +
      'Patterns: (A) Ashaya on BF → fetch dork; ' +
      '(B) Ashaya in hand → fetch dork, cast both; ' +
      '(C) Ashaya in library → two fetches, cast both. ' +
      '(D) Ashaya on BF + creature dork on BF → fetch Badgermole Cub to boost existing dork. ' +
      '(E) Ashaya in library, creature dork on BF → fetch Ashaya + Badgermole. ' +
      'Big dorks: Priest of Titania, Circle of Dreams Druid, Elvish Archdruid, ' +
      'Wirewood Channeler, Selvala, Karametra\'s Acolyte, Badgermole Cub (boosts any 1G dork).',
    check(state) {
      // Need a Ranger on the battlefield with its once-per-turn bounce still available.
      // (CR 302.6: summoning sickness doesn't restrict abilities without {T}/{Q} cost,
      // so a sick Ranger can still bounce — but it can only do so ONCE per turn unless
      // bounced to hand and recast. quirionAvailable checks !abilitiesUsed.bounce_forest.)
      const hasQR    = quirionAvailable(state);
      const hasScryb = scrybAvailable(state);
      if (!hasQR && !hasScryb) return false;

      // Need Survival of the Fittest OR Fauna Shaman on the battlefield and usable.
      // Survival: no tap cost, can activate multiple times.
      // Fauna Shaman: has tap cost — must not be tapped or sick.
      const hasSurvival = hasPerm(state, 'Survival of the Fittest');
      const faunaReady  = state.battlefield.some(
        p => p.name === 'Fauna Shaman' && !p.tapped &&
             (!p.summoningSick || shangChiActive(state))
      );
      if (!hasSurvival && !faunaReady) return false;


      // ── Mana helper ───────────────────────────────────────────────────────
      // Returns the total mana value (generic + colored pips) of a card key.
      function mv(ck) {
        const def = CARDS[ck];
        if (!def?.cost) return 0;
        const p = parseCost(def.cost);
        return p.generic + Object.values(p.colored).reduce((a, b) => a + b, 0);
      }

      // Total floating mana available (generic + green).
      const totalMana = state.mana ? state.mana.total() : 0;

      // ── Big dork check ────────────────────────────────────────────────────
      // Evaluate whether `ck` produces ≥2G when on the battlefield alongside the
      // current BF (already includes Ashaya and the Ranger in the projection).
      // We add 1 to creature/elf counts to account for the dork itself being cast.
      const currentElfCount     = elfCount(state);
      const currentCreatureCount = creatureCount(state);
      const currentDevotionG    = devotionG(state);
      const currentGreatestPow  = greatestPower(state);

      function isBigDork(ck) {
        switch (ck) {
          case 'priest_of_titania':
          case 'elvish_archdruid':
          case 'wirewood_channeler':
            // These produce G × elf-count; the dork itself is an Elf so count+1.
            return (currentElfCount + 1) >= 2;
          case 'circle_of_dreams_druid':
            // Produces G × creature-count; dork adds 1.
            return (currentCreatureCount + 1) >= 2;
          case 'karametra_acolyte':
            // Produces G × devotionG; Acolyte has GGGG in cost → adds 4 devotion.
            return (currentDevotionG + 4) >= 2;
          case 'selvala':
            // Produces G × greatest-power; Selvala herself is 3/4 → power 3.
            return Math.max(currentGreatestPow, 3) >= 2;
          case 'fanatic_of_rhonas':
            // Ferocious: produces GGG only if a creature with power ≥4 exists.
            return currentGreatestPow >= 4;
          default:
            return false;
        }
      }

      // Whether Scryb Ranger (cost {1G}) makes the loop net-positive:
      // needs dork producing ≥3G (Scryb recast costs {1G}).
      function isBigDorkForScryb(ck) {
        switch (ck) {
          case 'priest_of_titania':
          case 'elvish_archdruid':
          case 'wirewood_channeler':
            return (currentElfCount + 1) >= 3;
          case 'circle_of_dreams_druid':
            return (currentCreatureCount + 1) >= 3;
          case 'karametra_acolyte':
            return (currentDevotionG + 4) >= 3;
          case 'selvala':
            return Math.max(currentGreatestPow, 3) >= 3;
          case 'fanatic_of_rhonas':
            return currentGreatestPow >= 4;
          default:
            return false;
        }
      }

      const BIG_DORK_KEYS = new Set([
        'priest_of_titania','circle_of_dreams_druid','elvish_archdruid',
        'wirewood_channeler','karametra_acolyte','selvala','fanatic_of_rhonas',
      ]);

      // ── Library scan ──────────────────────────────────────────────────────
      const lib = state.players?.[0]?.library ?? [];
      const libSet = new Set(lib.filter(k => k !== 'unknown'));

      const ashayaInLib  = libSet.has('ashaya');
      const ashayaOnBF   = ashayaOut(state);
      const ashayaInHand = state.hand && state.hand.includes('ashaya');

      // Find best big dork available in library
      const libBigDork = [...BIG_DORK_KEYS].find(k => libSet.has(k) && (hasQR ? isBigDork(k) : isBigDorkForScryb(k)));

      // ── Untap-engine check ────────────────────────────────────────────────
      // The infinite loop requires a creature that can untap a Forest (the big
      // dork / Cradle). Under Ashaya, all creatures are Forests, so Arbor Elf /
      // Fyndhorn Elves-type untappers work. The untapper must be UNTAPPED and
      // not summoning sick (it has a tap cost: {T}: untap target Forest).
      // Without a ready untapper, the loop stalls after one Cradle tap.
      const UNTAP_FOREST_KEYS = new Set([
        'arbor_elf', 'argothian_elder', 'kiora_bests_the_sea_god',
      ]);
      const hasReadyUntapper = state.battlefield.some(p =>
        UNTAP_FOREST_KEYS.has(p.cardKey) && !p.tapped &&
        (!p.summoningSick || shangChiActive(state))
      );

      // ── PATTERN A: Ashaya already on battlefield ──────────────────────────
      // One activation: discard 1 creature → fetch big dork → cast it.
      if (ashayaOnBF) {
        if (!libBigDork) return false;
        if (!hasReadyUntapper) return false;
        const creaturesInHand = state.hand
          ? state.hand.filter(k => CARDS[k]?.types.includes('creature') && k !== libBigDork)
          : [];
        if (creaturesInHand.length === 0) return false;
        // Mana: 1G (Survival) + mv(dork)
        const needed = 1 + mv(libBigDork);
        return totalMana >= needed;
      }

      // ── PATTERN B: Ashaya in hand, not on battlefield ─────────────────────
      // One activation: discard OTHER creature → fetch big dork → cast Ashaya → cast dork.
      if (ashayaInHand) {
        if (!libBigDork) return false;
        if (!hasReadyUntapper) return false;
        const creaturesInHand = state.hand
          ? state.hand.filter(k => k !== 'ashaya' && CARDS[k]?.types.includes('creature') && k !== libBigDork)
          : [];
        if (creaturesInHand.length === 0) return false;
        // Mana: 1G (Survival) + mv(ashaya) + mv(dork)
        const needed = 1 + mv('ashaya') + mv(libBigDork);
        return totalMana >= needed;
      }

      // ── PATTERN C: Ashaya in library ─────────────────────────────────────
      // Two activations: fetch Ashaya → fetch big dork → cast both.
      if (ashayaInLib && libBigDork) {
        if (!hasReadyUntapper) return false;
        // Need 2 distinct creatures in hand to discard (one per activation).
        const creaturesInHand = state.hand
          ? state.hand.filter(k => CARDS[k]?.types.includes('creature'))
          : [];
        if (creaturesInHand.length < 2) return false;
        // Mana: 2G (two Survival activations) + mv(ashaya) + mv(dork)
        const needed = 2 + mv('ashaya') + mv(libBigDork);
        return totalMana >= needed;
      }

      // ── PATTERN D: Ashaya on BF + existing creature dork + fetch Badgermole ──
      // Badgermole Cub in library: fetch it → existing dork gets +1G → crosses ≥2G threshold.
      // Works with any creature that has tapForMana (e.g. Llanowar Elves, Birds, Dryad Arbor).
      // Only applies with QR (Scryb needs ≥3G total; Badgermole only adds 1G to a 1G dork → 2G).
      if (ashayaOnBF && hasQR && libSet.has('badgermole_cub')) {
        // Need an existing creature dork on BF (not sick unless SC active, not Badgermole itself)
        const hasExistingDork = state.battlefield.some(p => {
          if (p.name === 'Badgermole Cub' || p.tapped) return false;
          if (p.summoningSick && !shangChiActive(state)) return false;
          if (!p.types?.includes('creature')) return false;
          return typeof CARDS[p.cardKey]?.tapForMana === 'function';
        });
        if (hasExistingDork) {
          const creaturesInHand = state.hand
            ? state.hand.filter(k => CARDS[k]?.types.includes('creature') && k !== 'badgermole_cub')
            : [];
          if (creaturesInHand.length > 0) {
            // Mana: 1G (Survival) + mv(badgermole_cub = 1G)
            const needed = 1 + mv('badgermole_cub');
            if (totalMana >= needed) return true;
          }
        }
      }

      // ── PATTERN E: Ashaya in library + existing creature dork + fetch Ashaya + Badgermole ─
      // Two activations: fetch Ashaya → fetch Badgermole → cast both → existing dork now ≥2G.
      if (ashayaInLib && hasQR && libSet.has('badgermole_cub')) {
        const hasExistingDork = state.battlefield.some(p => {
          if (p.name === 'Badgermole Cub' || p.tapped) return false;
          if (p.summoningSick && !shangChiActive(state)) return false;
          if (!p.types?.includes('creature')) return false;
          return typeof CARDS[p.cardKey]?.tapForMana === 'function';
        });
        if (hasExistingDork) {
          const creaturesInHand = state.hand
            ? state.hand.filter(k => CARDS[k]?.types.includes('creature'))
            : [];
          if (creaturesInHand.length >= 2) {
            // Mana: 2G (two Survival activations) + mv(ashaya) + mv(badgermole_cub)
            const needed = 2 + mv('ashaya') + mv('badgermole_cub');
            if (totalMana >= needed) return true;
          }
        }
      }

      return false;
    },
  },

  {
    name: 'Infinite Draw (Beast Whisperer / Glademuse + Creature Loop)',
    description:
      "Beast Whisperer draws a card per creature cast. " +
      "Glademuse draws for spells cast on opponents' turns. " +
      "With an established infinite creature loop, draws the entire library.",
    check(state) {
      // Beast Whisperer: draws a card whenever YOU cast a creature.
      // The Ashaya + Ranger loop is mana-neutral so it's self-sustaining — valid here.
      // Temur/Kogla bounce loops cost {1}{G} per bounce and REQUIRE infinite mana
      // to sustain; they are therefore checked in WIN_CONDITIONS (where infiniteMana
      // is pre-confirmed) rather than here in DETECTORS.
      if (hasPerm(state, 'Beast Whisperer')) {
        if (ashayaOut(state) && rangerAvailable(state)) return true;
      }
      // Glademuse: draws when OPPONENTS cast spells — does NOT benefit from a
      // creature-bounce loop on your turn. Glademuse is a win condition via
      // passing turns with infinite mana (opponents cast spells, you draw).
      // It does NOT create infinite draw through Temur/Kogla/Ranger loops alone.
      // Glademuse is handled separately as a pass-turn win condition.
      return false;
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  MAZE OF ITH + ARGOTHIAN ELDER / LEY WEAVER + BIG MANA LAND
  //  (Combo Summary: "Maze of Ith + Argothian Elder + Gaea's Cradle or Nykthos")
  //
  //  Maze of Ith oracle: {T}: Untap target attacking creature. (No mana cost.)
  //  In the solver we model this as a free tap-to-untap-creature ability.
  //
  //  Loop:
  //   1. Tap Elder/Weaver → untap Maze of Ith + big mana land (e.g. Gaea's Cradle).
  //   2. Tap big land for mana.
  //   3. Tap Maze of Ith → untap Elder/Weaver. (FREE — no mana cost.)
  //   4. Repeat → net mana from big land each iteration.
  //
  //  This is strictly better than the Wirewood Lodge variant:
  //  Lodge costs {G} per loop; Maze costs nothing. Any big land producing ≥1G nets
  //  positive mana — Gaea's Cradle needs only ≥1 other creature, Nykthos devotion ≥3.
  //
  //  NOTE: No Ashaya required. Elder/Weaver must not have summoning sickness.
  //  Maze must be untapped (it taps in step 3, untaps in step 1 next cycle).
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Infinite Mana (Argothian Elder + Maze of Ith + Big Land)',
    description:
      "Elder/Weaver taps: untap Maze + big land. Tap big land for mana. " +
      "Maze (free) untaps Elder/Weaver. Repeat. " +
      "Gaea's Cradle: ≥1 other creature (produces ≥1G net). " +
      "Nykthos: devotion ≥3 (produces ≥3G minus 2 activation = ≥1G net). " +
      "No Ashaya required.",
    check(state) {
      if (!permReadyOrSCActive(state, 'Argothian Elder') && !permReadyOrSCActive(state, 'Ley Weaver')) return false;
      if (!permUntapped(state, 'Maze of Ith')) return false;
      // Gaea's Cradle (or Itlimoc): needs ≥1 creature other than Elder/Weaver
      // (Elder/Weaver itself is a creature and counts toward Cradle's tap value,
      //  but we need ≥2 total creatures so the Cradle produces ≥2G covering
      //  Elder's tap + Maze's tap; Elder itself is creature #1, need ≥1 more.)
      const scActive = shangChiActive(state);
      const elderOrWeaverCount = state.battlefield.filter(p =>
        (p.name === 'Argothian Elder' || p.name === 'Ley Weaver') &&
        !p.tapped && (!p.summoningSick || scActive)
      ).length;
      if (cradleUntapped(state) && creatureCount(state) >= elderOrWeaverCount + 1) return true;
      // Nykthos: {2},{T} → adds devotion×G. Needs devotion ≥3 to net after {2} cost.
      if (permUntapped(state, 'Nykthos, Shrine to Nyx') && devotionG(state) >= 3) return true;
      return false;
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  ARGOTHIAN ELDER + HYRAX TOWER SCOUT BOUNCE ENGINE + BIG LAND
  //
  //  Source: ref/card_roles.md (Argothian Elder): "Goes infinite with
  //  Wirewood Symbiote / Hyrax Tower Scout loops when Gaea's Cradle or
  //  Nykthos, Shrine to Nyx are in play."
  //
  //  Unlike the Maze of Ith / Wirewood Lodge variants (which untap Elder via a
  //  dedicated land), here the Hyrax bounce-recast loop supplies the repeatable
  //  untap: Hyrax's ETB ("untap target creature") refreshes Argothian Elder
  //  each cycle. Elder ({T}: untap two lands, FREE) untaps the big mana land,
  //  which is tapped for mana each cycle.
  //
  //  Loop (Temur variant):
  //   1. Hyrax ETB → untap Argothian Elder.
  //   2. Tap Elder → untap the big land (+ a 2nd land; Elder must target two).
  //   3. Tap the big land for mana.
  //   4. Temur Sabertooth ({1}{G}) → bounce Hyrax to hand.
  //   5. Recast Hyrax ({2}{G}) → ETB untaps Elder again. Repeat.
  //
  //  Kogla variant: Kogla bounces Hyrax (a Human Scout) for {1}{G} instead of
  //  Temur — identical loop cost.
  //
  //  Mana accounting (conservative — one Hyrax cycle yields exactly one Elder
  //  untap = one big-land tap):
  //    Loop cost = bounce {1}{G} (2) + Hyrax recast {2}{G} (3) = 5 mana.
  //    Gaea's Cradle: taps for creatureCount (N). Net = N − 5 → infinite at N ≥ 6.
  //    Nykthos:       taps for devotionG (D), minus {2} activation.
  //                   Net = D − 2 − 5 = D − 7 → infinite at devotion ≥ 8.
  //
  //  Requirements:
  //   • Argothian Elder ready (untapped, not summoning sick — or Shang-Chi active).
  //   • Hyrax Tower Scout available (on battlefield or in hand to recast).
  //   • A bounce engine: Temur Sabertooth OR Kogla, the Titan Ape.
  //   • At least TWO lands (Argothian Elder must target two different lands).
  //   • A big land: Cradle (creatureCount ≥ 6) or Nykthos (devotion ≥ 8).
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Infinite Mana (Argothian Elder / Ley Weaver + Hyrax Tower Scout + Bounce Engine + Cradle/Nykthos)',
    description:
      "Hyrax ETB untaps Argothian Elder / Ley Weaver; it (free) untaps the big land, tapped each cycle. " +
      "Temur/Kogla bounce-recast Hyrax ({1G}+{2G}=5 mana/cycle). " +
      "Gaea's Cradle: creatureCount ≥ 6 (net ≥1G). " +
      "Nykthos: devotion ≥ 8 (net ≥1G after {2} activation). " +
      "The land-untapper requires a 2nd land to target. No Ashaya required.",
    check(state) {
      // The land-untapper must be able to activate its tap ability this cycle.
      // Argothian Elder (Elf Druid) and Ley Weaver (Human Druid) both have the
      // identical "{T}: Untap two target lands" ability and are interchangeable
      // here — Hyrax's ETB untaps ANY creature, so creature type is irrelevant.
      if (!permReadyOrSCActive(state, 'Argothian Elder') &&
          !permReadyOrSCActive(state, 'Ley Weaver')) return false;
      // A repeatable Hyrax bounce engine: Temur Sabertooth or Kogla.
      const bounceEngine = hasPerm(state, 'Temur Sabertooth') || hasPerm(state, 'Kogla, the Titan Ape');
      if (!bounceEngine) return false;
      // Hyrax must be available — on the battlefield (about to be bounced) or in
      // hand (canonical PRE state, recast to start the loop).
      const hyraxAvailable =
        hasPerm(state, 'Hyrax Tower Scout') ||
        (state.hand && state.hand.includes('hyrax_tower_scout'));
      if (!hyraxAvailable) return false;
      // The untapper's ability targets TWO different lands — require ≥2 lands.
      if (state.lands().length < 2) return false;
      // Big land branch: Cradle (creatureCount ≥ 6) or Nykthos (devotion ≥ 8).
      if (cradleUntapped(state) && creatureCount(state) >= 6) return true;
      if (permUntapped(state, 'Nykthos, Shrine to Nyx') && devotionG(state) >= 8) return true;
      return false;
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  ARGOTHIAN ELDER / LEY WEAVER + HYRAX + CLOUDSTONE CURIO + BIG LAND
  //
  //  A cheaper bounce engine for the Hyrax variant. Cloudstone Curio:
  //  "Whenever a nonartifact permanent you control enters, you may return
  //  another permanent you control that shares a permanent type with it to its
  //  owner's hand." Casting Hyrax bounces a partner creature; casting the
  //  partner bounces Hyrax; each Hyrax recast re-fires its ETB (untap the
  //  land-untapper). The bounce itself is FREE — no {1}{G} Temur activation.
  //
  //  Loop:
  //   1. Cast Hyrax ({2}{G}) → Cloudstone bounces partner X → Hyrax ETB untaps
  //      Argothian Elder / Ley Weaver.
  //   2. Tap Elder/Weaver → untap big land (+ 2nd land). Tap big land → +N.
  //   3. Cast partner X ({G}) → Cloudstone bounces Hyrax. Repeat from 1.
  //
  //  Mana accounting (conservative, X is a 1-drop):
  //    Per cycle: cast Hyrax {2}{G} (3) + cast X {G} (1) = 4 mana. Bounce free.
  //    Gaea's Cradle: net = N − 4 → infinite at creatureCount ≥ 5 (break-even 4).
  //    Nykthos: net = D − 2 − 4 = D − 6 → infinite at devotion ≥ 7.
  //
  //  Requirements:
  //   • Argothian Elder or Ley Weaver ready; ≥2 lands (untapper targets two).
  //   • Hyrax available (battlefield or hand).
  //   • Cloudstone Curio on the battlefield.
  //   • A cheap (MV ≤ 1) creature partner OTHER than Hyrax to ping-pong with.
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Infinite Mana (Argothian Elder / Ley Weaver + Hyrax Tower Scout + Cloudstone Curio + Cradle/Nykthos)',
    description:
      "Cloudstone Curio ping-pongs Hyrax with a cheap partner creature (free bounce); each Hyrax " +
      "recast re-fires its ETB, untapping Argothian Elder / Ley Weaver, which untaps the big land. " +
      "Per cycle: Hyrax {2G} + 1-drop partner {G} = 4 mana. " +
      "Gaea's Cradle: creatureCount ≥ 5. Nykthos: devotion ≥ 7. " +
      "Needs a 2nd land and a cheap (MV≤1) partner other than Hyrax.",
    check(state) {
      if (!permReadyOrSCActive(state, 'Argothian Elder') &&
          !permReadyOrSCActive(state, 'Ley Weaver')) return false;
      if (!hasPerm(state, 'Cloudstone Curio')) return false;
      const hyraxAvailable =
        hasPerm(state, 'Hyrax Tower Scout') ||
        (state.hand && state.hand.includes('hyrax_tower_scout'));
      if (!hyraxAvailable) return false;
      // Cloudstone needs a cheap partner creature (≠ Hyrax) to ping-pong with.
      if (!hasCheapCreaturePartner(state, 'Hyrax Tower Scout')) return false;
      // The untapper targets TWO different lands — require ≥2 lands.
      if (state.lands().length < 2) return false;
      // Big land branch — thresholds one lower than Temur (bounce is free).
      if (cradleUntapped(state) && creatureCount(state) >= 5) return true;
      if (permUntapped(state, 'Nykthos, Shrine to Nyx') && devotionG(state) >= 7) return true;
      return false;
    },
  },

  //  Companion to the Hyrax variant above. Same source (ref/card_roles.md):
  //  Argothian Elder "goes infinite with Wirewood Symbiote / Hyrax Tower Scout
  //  loops when Gaea's Cradle or Nykthos are in play."
  //
  //  Here Wirewood Symbiote supplies the repeatable Elder untap:
  //    "Return an Elf you control: Untap target creature. Activate only once
  //     each turn."
  //  Symbiote's once-per-turn clause is reset each cycle by Temur Sabertooth
  //  bouncing and recasting Symbiote (a fresh object = a fresh once-per-turn).
  //
  //  Loop:
  //   1. Symbiote: return an Elf (a dork, NOT Argothian Elder) → untap Elder.
  //   2. Tap Elder → untap the big land (+ a 2nd land target).
  //   3. Tap the big land for mana.
  //   4. Recast the returned Elf ({G}).
  //   5. Temur bounce Symbiote ({1}{G}), recast Symbiote ({G}). Repeat.
  //
  //  CRITICAL DIFFERENCES from the Hyrax variant:
  //   • Reset engine is Temur ONLY — Kogla returns Humans, but Symbiote is an
  //     Insect, so Kogla cannot bounce it.
  //   • Symbiote's cost returns an Elf each cycle, so a SECOND Elf (besides
  //     Argothian Elder itself) must exist to feed the cost — returning Elder
  //     would remove the untap source.
  //   • That returned Elf is briefly off the battlefield, dipping the Cradle
  //     count by 1 mid-loop. Net per cycle = (N-1) − 4 = N − 5.
  //
  //  Mana accounting (conservative):
  //    Loop cost = recast Elf {G} (1) + Temur bounce {1}{G} (2) + recast
  //                Symbiote {G} (1) = 4 mana.
  //    Gaea's Cradle: taps for (N-1) during the loop. Net = (N-1) − 4 = N − 5
  //                   → infinite at creatureCount ≥ 6.
  //    Nykthos:       taps for devotion D, minus {2} activation, with one Elf
  //                   briefly returned. Conservatively require devotion ≥ 8
  //                   (matching the Hyrax variant's headroom).
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Infinite Mana (Argothian Elder / Ley Weaver + Wirewood Symbiote + Temur Sabertooth + Cradle/Nykthos)',
    description:
      "Symbiote (return an Elf) untaps Argothian Elder / Ley Weaver; it (free) untaps the big land. " +
      "Temur bounce-recasts Symbiote to reset its once-per-turn ({1G}+{G}), plus recast the " +
      "returned Elf ({G}) = 4 mana/cycle. " +
      "Gaea's Cradle: creatureCount ≥ 6. Nykthos: devotion ≥ 8. " +
      "Needs an Elf to feed Symbiote that ISN'T the untapper, a 2nd land, and Temur " +
      "(Kogla can't bounce the Insect Symbiote). No Ashaya required.",
    check(state) {
      // The land-untapper: Argothian Elder (Elf Druid) or Ley Weaver (Human
      // Druid). Both have "{T}: Untap two target lands". Symbiote untaps ANY
      // creature, so either works as the untap target.
      const untapper =
        (permReadyOrSCActive(state, 'Argothian Elder') && 'Argothian Elder') ||
        (permReadyOrSCActive(state, 'Ley Weaver') && 'Ley Weaver') ||
        null;
      if (!untapper) return false;
      // Wirewood Symbiote on the battlefield with its once-per-turn bounce available.
      // Temur bounces Symbiote each cycle to reset it, but the FIRST activation needs it fresh.
      if (!symbioteAvailable(state)) return false;
      // Reset engine: Temur ONLY (Kogla returns Humans; Symbiote is an Insect).
      if (!hasPerm(state, 'Temur Sabertooth')) return false;
      // Symbiote's cost returns an Elf each cycle. That Elf must NOT be the
      // untapper we're relying on (returning the untapper would remove the
      // untap source). Ley Weaver isn't an Elf, so it's never a candidate to be
      // returned; Argothian Elder is an Elf, so it must be excluded explicitly.
      // Feed-elf must be on BF — Symbiote needs it on the first activation.
      // Exclude the untapper itself (returning Argothian Elder would break the loop).
      const feedElves = state.battlefield.filter(p =>
        p.subtypes?.includes('Elf') && p.name !== untapper
      ).length;
      if (feedElves < 1) return false;
      // The untapper targets TWO different lands — require ≥2 lands.
      if (state.lands().length < 2) return false;
      // Big land branch: Cradle (creatureCount ≥ 6) or Nykthos (devotion ≥ 8).
      if (cradleUntapped(state) && creatureCount(state) >= 6) return true;
      if (permUntapped(state, 'Nykthos, Shrine to Nyx') && devotionG(state) >= 8) return true;
      return false;
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  MAGUS OF THE CANDELABRA + HYRAX / WIREWOOD SYMBIOTE BOUNCE ENGINE + BIG LAND
  //
  //  Third member of the bounce-engine family (after the Argothian Elder /
  //  Ley Weaver Hyrax and Symbiote loops). Magus of the Candelabra
  //  ("{X},{T}: Untap X target lands") is the land-untapper; the Hyrax ETB
  //  (or Wirewood Symbiote's ability) re-untaps Magus each cycle, reset by the
  //  bounce engine.
  //
  //  Loop (Hyrax + Temur, Gaea's Cradle):
  //   1. Hyrax ETB → untap Magus.
  //   2. Magus: pay {1}, untap Gaea's Cradle (X=1).
  //   3. Tap Cradle → +N (N = creature count).
  //   4. Temur ({1}{G}) bounce Hyrax; recast Hyrax ({2}{G}) → ETB untaps Magus.
  //   5. Repeat.
  //
  //  KEY DIFFERENCES from the Elder/Weaver loops:
  //   • Magus's untap costs {X} ({1} for one big land), adding {1} per cycle.
  //   • Magus untaps only its targets — it does NOT require a second land
  //     (Argothian Elder must target two lands; Magus can untap a lone Cradle).
  //
  //  Mana accounting (conservative, X=1 to untap the single big land):
  //    Hyrax loop cost = bounce {1}{G} (2) + recast {2}{G} (3) = 5 mana.
  //    Magus cost      = {1} per cycle.
  //    Gaea's Cradle:  net = N − 5 − 1 = N − 6 → infinite at creatureCount ≥ 7.
  //    Nykthos:        net = D − 2 − 5 − 1 = D − 8 → infinite at devotion ≥ 9.
  //
  //  Symbiote sub-variant: Wirewood Symbiote untaps Magus instead of Hyrax.
  //   • Reset engine is Temur ONLY (Kogla can't bounce the Insect Symbiote).
  //   • Symbiote's return cost needs an Elf (Magus is a Human Wizard, never the
  //     returned Elf), and that Elf is briefly off the battlefield. Using the
  //     same conservative thresholds (Cradle ≥7, Nykthos ≥9) keeps headroom.
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Infinite Mana (Magus of the Candelabra / Formidable Speaker / Hope Tender + Hyrax Tower Scout / Wirewood Symbiote + Bounce Engine + Cradle/Nykthos)',
    description:
      "Hyrax ETB (or Wirewood Symbiote) untaps the {1}-cost land-untapper (Magus of the " +
      "Candelabra, Formidable Speaker, or Hope Tender); it pays {1} to untap the big land, tapped each cycle. " +
      "Hyrax loop {1G}+{2G}=5 plus the untapper's {1} = 6 mana/cycle. " +
      "Gaea's Cradle: creatureCount ≥ 7. Nykthos: devotion ≥ 9. " +
      "No 2nd land needed (untaps only its target). Symbiote sub-variant needs " +
      "Temur (not Kogla) and an Elf to feed Symbiote that isn't the untapper.",
    check(state) {
      // The {1}-cost land-untapper this cycle: Magus of the Candelabra
      // ("{X},{T}: Untap X target lands"), Formidable Speaker
      // ("{1},{T}: Untap another target permanent"), or Hope Tender
      // ("{1},{T}: Untap target land"). All untap one big land for {1} and are
      // re-untapped by Hyrax's ETB / Symbiote's ability.
      const untapper =
        (permReadyOrSCActive(state, 'Magus of the Candelabra') && 'Magus of the Candelabra') ||
        (permReadyOrSCActive(state, 'Formidable Speaker') && 'Formidable Speaker') ||
        (permReadyOrSCActive(state, 'Hope Tender') && 'Hope Tender') ||
        null;
      if (!untapper) return false;

      // Untap-source + reset-engine pairing:
      //  (a) Hyrax ETB untaps the untapper, reset by Temur OR Kogla; or
      //  (b) Wirewood Symbiote untaps the untapper, reset by Temur ONLY, and
      //      needs an Elf to feed Symbiote's return cost that isn't the untapper.
      const hyraxAvailable =
        hasPerm(state, 'Hyrax Tower Scout') ||
        (state.hand && state.hand.includes('hyrax_tower_scout'));
      const hyraxEngine =
        hyraxAvailable &&
        (hasPerm(state, 'Temur Sabertooth') || hasPerm(state, 'Kogla, the Titan Ape'));

      // Feed-elf must be on BF — Symbiote needs it on the first activation.
      // Magus is a Human Wizard (never an Elf candidate); Formidable Speaker IS
      // an Elf, so it must be excluded from the feed-Elf count.
      const feedElves = state.battlefield.filter(p =>
        p.subtypes?.includes('Elf') && p.name !== untapper
      ).length;
      const symbioteEngine =
        symbioteAvailable(state) &&    // bounce must be fresh for the first iteration
        hasPerm(state, 'Temur Sabertooth') &&  // Kogla can't bounce an Insect
        feedElves >= 1;

      if (!hyraxEngine && !symbioteEngine) return false;

      // Big land branch. The untapper untaps only its target, so NO 2nd-land
      // requirement. Thresholds are one higher than the free Elder/Weaver loops
      // (the untapper pays {1} per cycle).
      if (cradleUntapped(state) && creatureCount(state) >= 7) return true;
      if (permUntapped(state, 'Nykthos, Shrine to Nyx') && devotionG(state) >= 9) return true;
      return false;
    },
  },

  //  Treasure token: {T}, Sacrifice: Add one mana of any color.
  //
  //  With Ashaya: Quirion Ranger is a Forest land. When it enters the battlefield
  //  (recast), it triggers Provisioner's Landfall → create a Treasure.
  //  The Treasure taps for {G}, funding the next Quirion recast.
  //
  //  Loop (Quirion variant):
  //   1. Tap any tapped creature for mana (optional, for net mana gain).
  //   2. Quirion Ranger bounces itself (it IS a Forest under Ashaya) → untaps
  //      any creature (e.g. a mana dork).
  //   3. Cast Quirion Ranger for {G} → enters BF → Landfall triggers → Treasure.
  //   4. Tap Treasure for {G} (covers Quirion's {G} recast cost).
  //   5. Repeat — net mana neutral on Rangers; mana from the untapped dork is profit.
  //
  //  With Scryb Ranger ({1G} recast): needs the dork to produce ≥2G net after
  //  accounting for the extra {1} generic above the Treasure's {G}.
  //
  //  This is effectively a mana-neutral loop: Provisioner + Ashaya + either Ranger
  //  can bounce-recast the Ranger for free (Treasure covers cost), enabling infinite
  //  ETB / landfall triggers. Net mana comes from the untapped creature.
  //
  //  Minimum requirement: Provisioner + Ashaya + any Ranger. The loop is always
  //  at least mana-neutral; a dork on BF makes it net-positive.
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Infinite ETB / Landfall (Tireless Provisioner + Ashaya + Ranger)  [Combo Summary #9]',
    description:
      "With Ashaya, Ranger is a Forest land — ETB triggers Provisioner's Landfall → Treasure. " +
      "Treasure pays Ranger's recast cost. Ranger bounces itself → untaps a mana dork. " +
      "Quirion Ranger ({G}): Treasure covers cost exactly — mana-neutral, infinite ETB. " +
      "Scryb Ranger ({1G}): need a dork producing ≥2G to cover the extra {1} generic. " +
      "Any dork on BF turns this into a net-positive infinite mana loop.",
    check(state) {
      if (!ashayaOut(state)) return false;
      if (!hasPerm(state, 'Tireless Provisioner')) return false;
      // Quirion Ranger: free recast (Treasure = {G} = recast cost). Always loops.
      if (quirionAvailable(state)) return true;
      // Scryb Ranger ({1G} recast): need a creature producing ≥2G to cover {1} extra.
      if (scrybAvailable(state)) {
        const scActive = shangChiActive(state);
        return state.battlefield.some(p => {
          if (p.tapped) return false;
          if (p.summoningSick && !scActive) return false;
          switch (p.name) {
            case 'Priest of Titania':           return elfCount(state) >= 2;
            case 'Circle of Dreams Druid':      return creatureCount(state) >= 2;
            case 'Elvish Archdruid':            return elfCount(state) >= 2;
            case 'Wirewood Channeler':          return elfCount(state) >= 2;
            case "Karametra's Acolyte":         return devotionG(state) >= 2;
            case 'Selvala, Heart of the Wilds': return greatestPower(state) >= 3; // {G} activation + {1} = net ≥2
            case 'Fanatic of Rhonas':           return greatestPower(state) >= 4;
            case 'Marwyn, the Nurturer':        return (p.power || 0) >= 3;
            default: return false;
          }
        });
      }
      return false;
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  GREAT OAK GUARDIAN + TEMUR SABERTOOTH (custom-library — not in default decklist)
  //
  //  Great Oak Guardian oracle (Flash, {5}{G}, 4/5):
  //    "When this creature enters, creatures target player controls get
  //     +2/+2 until end of turn. Untap them."
  //  Modeled in GameState.js: untaps every creature you control (the +2/+2
  //  is not numerically tracked — see teamUntapManaProduction()).
  //
  //  Loop:
  //    1. Cast Great Oak Guardian (Flash) — ETB untaps your whole team.
  //    2. Tap every untapped, non-summoning-sick creature for mana.
  //    3. {1}{G}: Temur Sabertooth bounces Great Oak Guardian to hand.
  //    4. Recast Great Oak Guardian for {5}{G}.
  //  Total loop cost = {1}{G} (Sabertooth) + {5}{G} (recast) = 8 mana.
  //  Net positive when the team's combined production ≥ 9 (same acceptance
  //  level as Cloudstone Curio: GOG is castable with infinite mana from hand
  //  even if not yet on the battlefield, like Endurance in the Hitzel lines).
  //
  //  Same acceptance level as Cloudstone Curio / Hitzel variant 6 — Great Oak
  //  Guardian is implemented (cards.js + GameState.js ETB) but not in
  //  DEFAULT_DECKLIST; this detector only fires for custom libraries that
  //  include it.
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Infinite Mana (Great Oak Guardian + Temur Sabertooth + Team Production ≥9)',
    description:
      "Cast Great Oak Guardian (Flash) — its ETB untaps your whole team. Tap every " +
      "untapped, non-summoning-sick creature for mana. {1}{G}: Temur Sabertooth bounces " +
      "Great Oak Guardian to hand. Recast it for {5}{G}. Total loop cost 8 mana — net " +
      "positive when the team's combined production is ≥9.",
    check(state) {
      if (!hasPerm(state, 'Temur Sabertooth')) return false;
      if (!inHandOrField(state, 'Great Oak Guardian', 'great_oak_guardian')) return false;
      return teamUntapManaProduction(state) >= 9;
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  WOODCALLER AUTOMATON + TEMUR SABERTOOTH + GAEA'S CRADLE / NYKTHOS
  //
  //  Woodcaller Automaton oracle (Prototype {2GG} — 3/3):
  //  "When this creature enters, if you cast it, untap target land you control.
  //   It becomes a Treefolk creature with haste and base power and toughness
  //   equal to this creature's power and toughness. It's still a land."
  //
  //  Loop (similar to Hyrax Tower Scout bounce):
  //   1. Tap big land (Cradle or Nykthos) for mana.
  //   2. Temur Sabertooth bounces Woodcaller back to hand ({1G}).
  //      (OR Kogla bounces it — Woodcaller is an artifact creature, not a Human,
  //       so Kogla cannot bounce it. Sabertooth only.)
  //   3. Recast Woodcaller (Prototype {2GG} = 4 mana).
  //   4. ETB: untap target land → untap the big land.
  //   5. Repeat.
  //
  //  Modelled at Prototype cost {2GG} = 4 mana, power/toughness 3/3.
  //  ETB handled in GameState.enterBattlefield (untaps highest-priority tapped land).
  //
  //  Loop cost: {1G}(Sabertooth) + {2GG}(Woodcaller) = 6 mana total.
  //  Woodcaller is bounced BEFORE the big land is tapped, so creature count
  //  at Cradle-tap time = total creatures minus Woodcaller.
  //  Cradle: need ≥7 total creatures (≥6 others) for break-even loop (infinite ETB).
  //  Nykthos: devotion ≥9 (6 loop + 2 activation = 8; need ≥9 for net ≥+1G).
  //  Woodcaller contributes 2 green pips to devotion (cost {2GG}).
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Infinite Mana (Woodcaller Automaton + Temur Sabertooth + Big Land)',
    description:
      "Woodcaller ETB (Prototype {2GG}, 3/3) untaps big land. Sabertooth bounces Woodcaller ({1G}). " +
      "Recast Woodcaller ({2GG}). Total loop cost 6 mana. " +
      "Cradle: Woodcaller is bounced before Cradle taps, so need ≥6 other creatures (≥7 total) for net +1G. " +
      "Nykthos: devotion ≥9 (loop costs 6 + {2} activation = 8; need devotion ≥9 for net +1G). " +
      "Woodcaller is NOT a Human — only Temur Sabertooth can bounce it (not Kogla).",
    check(state) {
      if (!hasPerm(state, 'Temur Sabertooth')) return false;
      // Woodcaller can be on BF or in hand (about to be recast into the loop)
      const woodcallerAvailable =
        hasPerm(state, 'Woodcaller Automaton') ||
        (state.hand && state.hand.includes('woodcaller_automaton'));
      if (!woodcallerAvailable) return false;
      // Cradle: Woodcaller is bounced BEFORE Cradle taps, so the creature count
      // when Cradle taps = all BF creatures minus Woodcaller.
      // Need ≥7 total creatures (including Woodcaller) so ≥6 others remain when Cradle taps,
      // producing ≥6G → covers the 6-mana loop cost and nets ≥0G (break-even = infinite ETB).
      // For net-positive mana: need ≥7 others = ≥8 total.
      // We detect at ≥7 total (break-even threshold) as the combo still loops infinitely.
      if (cradleUntapped(state) && creatureCount(state) >= 7) return true;
      // Nykthos: total cost = {2}(activation) + {1G}(Sabertooth) + {2GG}(Woodcaller) = 8 mana.
      // Devotion ≥9 nets ≥+1G per cycle.
      if (permUntapped(state, 'Nykthos, Shrine to Nyx') && devotionG(state) >= 9) return true;
      return false;
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  ASHAYA + QUIRION/SCRYB RANGER + ALREADY-ANIMATED GAEA'S CRADLE
  //
  //  When Gaea's Cradle has already been animated into a creature (e.g. by
  //  Badgermole Cub's earthbend ETB, or by Destiny Spinner in a prior step),
  //  the Destiny Spinner animator is no longer needed to start the loop.
  //
  //  Cradle is now a creature/land. With Ashaya, QR is a Forest and can bounce
  //  itself to untap a CREATURE. Cradle qualifies as both land AND creature.
  //
  //  Loop (Quirion variant, Cradle already animated, ≥2 creatures on BF):
  //   1. QR bounces itself (Forest under Ashaya) → untaps Cradle (creature).
  //   2. Tap Cradle for G×creatures (≥2G).
  //   3. Recast QR {G}. Net: ≥1G per cycle → infinite mana.
  //
  //  Note: Cradle may be currently TAPPED (e.g. was just tapped this turn).
  //  That's fine — the loop's first action is QR untapping it, so tapped
  //  state doesn't block detection. The Ranger only needs to not have used
  //  its bounce ability this turn yet (quirionAvailable check).
  //
  //  This combo was previously missed in a scenario where Badgermole animated
  //  Cradle at step 16, Ashaya entered at step 20, and the board at step 21
  //  had Cradle tapped (was just tapped at step 19) — so hasGreenTapper
  //  returned false and no MANA_POSITIVE detector fired. The correct answer
  //  was that QR untaps Cradle as its first loop action; no need for Cradle
  //  to already be untapped at detection time.
  // ══════════════════════════════════════════════════════════════════════════
  {
    name: 'Infinite Mana (Ashaya + Ranger + Animated Gaea\'s Cradle)',
    loopType: LOOP_TYPE.MANA_POSITIVE,
    description:
      "Gaea's Cradle is already animated as a creature (e.g. by Badgermole Cub's " +
      'earthbend). With Ashaya, Quirion/Scryb Ranger bounces itself (a Forest) ' +
      'to untap the animated Cradle-creature. Tap Cradle for G×creatures ≥ 2G. ' +
      'Recast Ranger for {G}. Net ≥1G per cycle → infinite mana.',
    check(state) {
      if (!ashayaOut(state)) return false;
      if (!rangerAvailable(state)) return false;
      // Cradle must already be animated (have creature type) — regardless of tapped state,
      // since the Ranger untaps it as the first step of the loop.
      const cradle = state.battlefield.find(p =>
        (p.name === "Gaea's Cradle" || p.name === 'Itlimoc, Cradle of the Sun') &&
        p.types?.includes('creature')
      );
      if (!cradle) return false;
      // Need ≥2 creatures so Cradle produces ≥2G (covering Ranger's {G} recast cost
      // and netting ≥1G). creatureCount includes Cradle itself since it's now a creature.
      if (creatureCount(state) < 2) return false;
      return true;
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  DESTINY SPINNER + ASHAYA + QUIRION/SCRYB RANGER + BIG MANA LAND
  //
  //  Destiny Spinner oracle: {3G}: Target land you control becomes an X/X
  //  Elemental creature with trample and haste until end of turn, where X is
  //  the number of enchantments you control. It's still a land.
  //
  //  Combo role: animates Gaea's Cradle or Nykthos into a haste creature.
  //  With Ashaya, the animated land is now ALSO a Forest creature.
  //  Quirion/Scryb Ranger can then untap it (bounce themselves to untap the
  //  animated land) OR it taps for mana as a creature with Earthcraft.
  //
  //  The key combo path (from card_roles.md):
  //  Destiny Spinner ({3}{G}, repeatable) or Vengeant Earth ({1}{G} instant,
  //  custom-library — not in DEFAULT_DECKLIST; "until end of turn" covers the
  //  whole loop with one cast) animates Cradle/Nykthos → the land is now a
  //  creature with haste. With Ashaya, Quirion/Scryb Ranger can bounce
  //  themselves (both are Forests under Ashaya) to untap the animated
  //  land-creature.
  //  This is effectively the Ashaya + Ranger + dork combo, with the animated
  //  land acting as the high-output mana dork.
  //
  //  Loop (Quirion variant, Gaea's Cradle with ≥2 creatures):
  //   1. Destiny Spinner pays {3G} (or Vengeant Earth pays {1G}, one cast for
  //      the whole turn): animate Cradle → 4/4 (or X/X) haste creature.
  //   2. Tap animated Cradle for G×creatures.
  //   3. Quirion Ranger bounces itself (Forest under Ashaya) → untaps animated Cradle.
  //   4. Recast Quirion {G}. Repeat from step 2.
  //  Net: Cradle produces ≥2G, Quirion costs {G}, net ≥1G per cycle.
  //
  //  Prerequisites:
  //   - Destiny Spinner on battlefield, or Vengeant Earth in hand (the
  //     animation cost is paid once to start the loop).
  //   - Ashaya on battlefield (makes Ranger a Forest so it can target itself).
  //   - Quirion or Scryb Ranger available.
  //   - A big land (Cradle ≥2 creatures, or Nykthos devotion ≥4 covering
  //     the Ranger recast cost).
  //
  //  This is a setup combo — the one-time animation cost is paid once from floating mana.
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Infinite Mana (Destiny Spinner/Vengeant Earth + Ashaya + Ranger + Big Land)',
    description:
      "Destiny Spinner ({3G}, repeatable) or Vengeant Earth ({1G} instant, lasts until end of " +
      "turn): animate Gaea's Cradle or Nykthos into a haste creature (still a land). " +
      "With Ashaya, Ranger bounces itself (Forest) → untaps the animated land. " +
      "Quirion ({G}): Cradle ≥2 creatures nets ≥1G. Nykthos devotion ≥4 nets ≥1G. " +
      "The animation cost is paid once from initial mana to start the loop.",
    check(state) {
      if (!ashayaOut(state)) return false;
      if (!hasLandAnimator(state)) return false;
      if (!rangerAvailable(state)) return false;
      // Need a big land untapped to animate and loop with
      // Gaea's Cradle: produces ≥2G with ≥2 creatures (covers Quirion {G} recast, nets ≥1G)
      if (cradleUntapped(state) && creatureCount(state) >= 2) return true;
      // Nykthos: produces devotion×G minus {2} activation.
      // Quirion ({G}) recast: need devotion×G - 2 ≥ 1, i.e. devotion ≥ 4 (nets ≥2G, minus {G}=≥1G).
      // Scryb ({1G}) recast: need devotion×G - 2 ≥ 2, i.e. devotion ≥ 5.
      if (permUntapped(state, 'Nykthos, Shrine to Nyx')) {
        if (quirionAvailable(state) && devotionG(state) >= 4) return true;
        if (scrybAvailable(state)   && devotionG(state) >= 5) return true;
      }
      return false;
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

var WIN_CONDITIONS = [

  // ══════════════════════════════════════════════════════════════════════════
  //  HITZEL'S SEQUENCE — Geier Reach Sanitarium mill
  //
  //  CORRECTED MODEL (2026-06-11): Geier Reach Sanitarium is the essential
  //  piece — {2},{T}: each player draws a card, then discards a card.  With
  //  infinite mana + a repeatable Sanitarium untap, every activation shrinks
  //  every player's library by 1.  Opponents' graveyards are NEVER recycled,
  //  so each opponent eventually attempts to draw from an empty library and
  //  loses.
  //
  //  Endurance's role: its ETB targets US, putting OUR graveyard (the
  //  accumulated Geier Reach discards) on the bottom of OUR library, so we
  //  don't deck ourselves first.  Each fresh Endurance cast extends our
  //  activation budget by roughly our current library size.  Budget math:
  //  initial library ≈ 80–90; activations needed ≈ largest opponent library
  //  (~90–95).  ONE fresh Endurance cast (≈ 2× initial budget) is normally
  //  ample; re-buy engines (bouncers / sac+Witness loops) buy additional
  //  recycles as insurance and let an Endurance already stranded on the
  //  battlefield be recast.
  //
  //  Endurance does NOT need its ETB held on the stack — it just needs to be
  //  castable when our library runs low (it has Flash).  The hold-priority
  //  sequences documented in ref/decklist_combos.txt are valid EXECUTIONS
  //  (they deny opponents response windows), not requirements.
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: "Win: Geier Reach Sanitarium Mill (Hitzel's Sequence)",
    description:
      "With infinite mana, loop Geier Reach Sanitarium ({2},{T}: each player draws + discards). " +
      "Opponents' graveyards are never recycled — each opponent eventually draws from an empty library and loses. " +
      "Endurance's ETB targets US: it puts OUR graveyard back on the bottom of OUR library so we don't deck first; " +
      "cast it (Flash) whenever our library runs low — one fresh cast roughly doubles our activation budget. " +
      "Re-buy engines for extra recycles / recasting a battlefield-stranded Endurance: " +
      "Temur: bounce Endurance with Sabertooth. " +
      "Ashaya+Ranger: a Ranger bounces Endurance-as-Forest (once per turn per Ranger — recasts are rare). " +
      "Kogla+Witness: get Endurance to the graveyard (Beast Within/LQR, hand or graveyard; or under Ashaya: Crop Rotation, or Elvish Reclaimer+Ranger), Witness returns it, Kogla bounces Witness. " +
      "Cloudstone Curio: alternate casting Endurance and any other creature. " +
      "Hold-priority stack executions (see ref/decklist_combos.txt) are valid ways to run the loop, not requirements.",
    check(state) {
      if (!inHandOrField(state, 'Geier Reach Sanitarium', 'geier_reach')) return false;
      const inHand = (key) => state.hand && state.hand.includes(key);
      const gy = state.players?.[0]?.graveyard ?? state.graveyard ?? [];
      const hasAshaya = inHandOrField(state, 'Ashaya, Soul of the Wild', 'ashaya');
      const hasRanger =
        inHandOrField(state, 'Quirion Ranger', 'quirion_ranger') ||
        inHandOrField(state, 'Scryb Ranger', 'scryb_ranger');
      const hasKoglaWitness =
        inHandOrField(state, 'Kogla, the Titan Ape', 'kogla') &&
        inHandOrField(state, 'Eternal Witness', 'eternal_witness');

      const witnessAvail = inHandOrField(state, 'Eternal Witness', 'eternal_witness');

      // ── Endurance availability ──────────────────────────────────────────
      // Endurance refills OUR library (ETB: our graveyard → bottom of our
      // library).  We need at least one fresh cast available when our library
      // runs low.  Sources of a fresh cast:
      //   • Endurance in hand (castable directly — it has Flash), or
      //   • Endurance in graveyard + Eternal Witness available (one-shot
      //     Witness ETB recovers it to hand).
      const enduranceFreshCast =
        inHand('endurance') ||
        (gy.includes('Endurance') && witnessAvail);

      // ── Re-buy engines ───────────────────────────────────────────────────
      // Return a battlefield-stranded Endurance to hand (its ETB already
      // spent) for another cast, and provide extra recycles as insurance.
      // Only REQUIRED when Endurance is exclusively on the battlefield.
      const hasRebuy =
        // Temur: bounce Endurance directly with {1}{G} (no tap, unlimited).
        inHandOrField(state, 'Temur Sabertooth', 'temur_sabertooth') ||
        // Cloudstone Curio: alternate casting Endurance and any other
        // creature; each ETB returns the other to hand.  (Same acceptance
        // level as the Scrapshooter Mill detector — custom-library card.)
        hasPerm(state, 'Cloudstone Curio') ||
        // Ashaya + Ranger: a Ranger returns Endurance-as-Forest to hand.
        // "Once each turn" per Ranger object is plenty — recasts are rare
        // (one per ~library-size Geier Reach activations).  No LQR needed:
        // the kill-spell dance in ref/decklist_combos.txt variant 3 is one
        // valid execution, not a requirement.
        (hasAshaya && hasRanger) ||
        // Kogla + Witness family: get Endurance into the graveyard, Witness
        // returns it, Kogla bounces Witness (a Human) for {1}{G}.
        (hasKoglaWitness && (
          // Kill spells, hand or graveyard (two-Witness pattern recurs them).
          inHand('beast_within') || gy.includes('Beast Within') ||
          inHand('legolas_quick_reflexes') || gy.includes("Legolas's Quick Reflexes") ||
          // Crop Rotation (instant) sacrifices Endurance-as-Forest under Ashaya.
          (hasAshaya && (inHand('crop_rotation') || gy.includes('Crop Rotation'))) ||
          // Elvish Reclaimer ({2},{T}) sacs Endurance-as-Forest under Ashaya;
          // a Ranger returns ITSELF to untap Reclaimer, then is recast.
          (hasAshaya && hasRanger &&
           inHandOrField(state, 'Elvish Reclaimer', 'elvish_reclaimer'))
        ));

      const enduranceOnField = hasPerm(state, 'Endurance');
      if (!(enduranceFreshCast || (enduranceOnField && hasRebuy))) return false;
      // [O-12] Need a way to untap Geier Reach Sanitarium each cycle. Rangers
      // untap CREATURES, not lands — they only count with Destiny Spinner.
      return hasGeierReachUntapper(state);
    },
    // deployed: Hitzel pieces are on the battlefield and ready to execute.
    // When this returns false, the solver keeps searching to show setup steps.
    deployed(state) {
      // Geier Reach must be on battlefield (not just in hand — it's a land, needs to be played)
      if (!hasPerm(state, 'Geier Reach Sanitarium')) return false;
      // [O-12] Without an untap method, Geier Reach can be activated only
      // once — not "deployed" as a repeatable mill loop.
      if (!hasGeierReachUntapper(state)) return false;
      const inHand = (key) => state.hand && state.hand.includes(key);
      const gy = state.players?.[0]?.graveyard ?? state.graveyard ?? [];
      const witnessAvail = inHandOrField(state, 'Eternal Witness', 'eternal_witness');
      // Fresh Endurance cast available (hand, or graveyard via one-shot
      // Witness ETB) → deployed with no re-buy engine required.
      if (inHand('endurance')) return true;
      if (gy.includes('Endurance') && witnessAvail) return true;
      const enduranceOnField = hasPerm(state, 'Endurance');
      // Endurance stranded on the battlefield (ETB spent) → need an on-field
      // re-buy engine to return it to hand for another cast.
      if (!enduranceOnField) return false;
      const hasAshaya = hasPerm(state, 'Ashaya, Soul of the Wild');
      const hasRanger =
        rangerAvailable(state); // bounce must be fresh to start the re-buy loop
      const koglaWitnessReady =
        hasPerm(state, 'Kogla, the Titan Ape') && witnessAvail;
      const rebuyReady =
        hasPerm(state, 'Temur Sabertooth') ||
        hasPerm(state, 'Cloudstone Curio') ||
        (hasAshaya && hasRanger) ||
        (koglaWitnessReady && (
          inHand('beast_within') || gy.includes('Beast Within') ||
          inHand('legolas_quick_reflexes') || gy.includes("Legolas's Quick Reflexes") ||
          (hasAshaya && (inHand('crop_rotation') || gy.includes('Crop Rotation'))) ||
          (hasAshaya && hasRanger && hasPerm(state, 'Elvish Reclaimer'))
        ));
      return rebuyReady;
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  DUSKWATCH RECRUITER — tutor entire creature library, then attack
  //
  //  With infinite mana, activate Duskwatch ({2}{G}, no {T}) repeatedly to find every
  //  creature in the library, put them in hand. Cast them all. With Finale of
  //  Devastation X≥10, all creatures get +X/+X and haste → attack for lethal.
  //  Or simply attack with an arbitrarily large board.
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Win: Duskwatch Recruiter (find all creatures)',
    description:
      "With infinite mana, activate Duskwatch Recruiter ({2G}: look at top 3, put a creature into hand) " +
      "repeatedly to find every creature in the library. Cast them all onto the battlefield.\n" +
      "\n" +
      "Duskwatch sequence to Hitzel's Sequence:\n" +
      "  1. Activate Duskwatch repeatedly → find Endurance, Eternal Witness,\n" +
      "     Temur Sabertooth / Kogla, and any missing combo creatures.\n" +
      "  2. Cast all found creatures onto the battlefield.\n" +
      "  3. Play Geier Reach Sanitarium (land drop, or Crop Rotation → Geier Reach\n" +
      "     if no land drop available).\n" +
      "  4. Execute Hitzel's Sequence: cast Endurance, hold ETB on stack,\n" +
      "     bounce with Sabertooth/Kogla, activate Geier Reach, untap, repeat.\n" +
      "\n" +
      "Alternative finishers found by Duskwatch:\n" +
      "  • Beast Whisperer → draw entire deck via creature loop → find any finisher\n" +
      "  • Any creature-based combo piece missing from the current board",
    check(state) {
      // With infinite mana, Duskwatch in hand or on field finds every
      // creature. A tapped/summoning-sick Duskwatch isn't blocked
      // permanently — it untaps and loses sickness on its controller's next
      // untap step, so this remains a deterministic win even if not
      // immediate. (See O-19 for the genuinely blocking case: Fauna
      // Shaman / Survival of the Fittest with no creature card ever
      // available to discard.)
      return inHandOrField(state, 'Duskwatch Recruiter', 'duskwatch_recruiter');
    },
    // Duskwatch on the battlefield or in hand with infinite mana = deterministic win.
    // With infinite mana, casting from hand is trivial — treat as deployed.
    deployed(state) {
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
      "you don't control. Each opponent gets ONE poison counter. " +
      "Infectious Bite is an instant — casting it sends it to the graveyard, so infinite " +
      "mana alone only casts it once. To reach 10 poison you must recur it from the " +
      "graveyard each cast: Eternal/Timeless Witness returns it and a bouncer (Temur " +
      "Sabertooth / Kogla) loops the Witness. Repeat 10× → each opponent reaches 10 " +
      "poison and loses.",
    check(state) {
      // Bite must be available to cast (hand, or recurrable from graveyard).
      const biteInHand = state.hand && state.hand.includes('infectious_bite');
      const biteInGrave = state.players?.[0]?.graveyard?.includes('Infectious Bite');
      if (!biteInHand && !biteInGrave) return false;
      // [O-32] An instant can only be cast ONCE per copy. Reaching 10 poison
      // requires returning Infectious Bite from the graveyard each cycle.
      // The deck's spell-recursion engine is Eternal/Timeless Witness (ETB:
      // return a card from GY to hand) looped by a bouncer (Temur Sabertooth
      // / Kogla): each cycle cast Bite (→ GY), cast Witness (ETB returns Bite),
      // bounce Witness with Temur/Kogla, recast Witness. Every step is a spell
      // cast, a triggered ETB, or a mana-cost bounce — none is a {T} ability
      // on a summoning-sick creature, so NO global-haste effect is required
      // (mirrors the Vitalize/Emerald-Charm + Witness loops, COMBO 33/39/etc.).
      const hasWitness =
        inHandOrField(state, 'Eternal Witness', 'eternal_witness') ||
        inHandOrField(state, 'Timeless Witness', 'timeless_witness');
      const hasBouncer =
        hasPerm(state, 'Temur Sabertooth') || hasPerm(state, 'Kogla, the Titan Ape');
      return hasWitness && hasBouncer;
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
    // Mikokoro must be on battlefield to activate; bouncer on field
    deployed(state) {
      if (!hasPerm(state, 'Mikokoro, Center of the Sea')) return false;
      const bouncerReady =
        hasPerm(state, 'Temur Sabertooth') ||
        hasPerm(state, 'Kogla, the Titan Ape');
      return bouncerReady && inHandOrField(state, 'Eternal Witness', 'eternal_witness');
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  SCRAPSHOOTER MILL — loop Scrapshooter's Gift ETB to mill opponents
  //
  //  With infinite mana, cast Scrapshooter with gift promised each loop so the
  //  opponent draws a card. After infinite iterations their library is empty.
  //
  //  Temur Sabertooth variant:
  //    Cast Scrapshooter (gift → opponent draws). Pay {1G}: Temur bounces it.
  //    Repeat with infinite mana.
  //
  //  Cloudstone Curio variant:
  //    Alternate casting Scrapshooter and any other creature. Each ETB triggers
  //    Cloudstone to return the other creature to hand. Repeat.
  //
  //  ── Kogla + Witness + Beast Within ──────────────────────────────────────
  //  1. Cast Scrapshooter with gift → opponent draws. Scrapshooter on BF.
  //  2. Beast Within targets Scrapshooter → Scrapshooter to GY, opponent gets Beast token.
  //  3. Cast Eternal Witness → ETB returns Beast Within to hand.
  //  4. Kogla {1G}: bounces Witness to hand.
  //  5. Cast Eternal Witness → ETB returns Scrapshooter to hand.
  //  6. Kogla {1G}: bounces Witness to hand. Loop.
  //  (Two Witness casts per cycle. BW can be in hand OR graveyard — Witness recurs from GY.)
  //
  //  ── Kogla + Witness + Legolas's Quick Reflexes ──────────────────────────
  //  LQR gives Scrapshooter "whenever this creature becomes tapped, deal damage
  //  equal to its power to a target creature." Scrapshooter taps targeting itself
  //  → deals 3 to itself → dies to GY. Same two-Witness pattern:
  //  1. Cast Scrapshooter with gift → opponent draws. Scrapshooter on BF.
  //  2. Cast LQR on Scrapshooter → Scrapshooter taps, deals 3 to itself → dies to GY.
  //  3. Cast Eternal Witness → ETB returns LQR to hand.
  //  4. Kogla {1G}: bounces Witness to hand.
  //  5. Cast Eternal Witness → ETB returns Scrapshooter to hand.
  //  6. Kogla {1G}: bounces Witness to hand. Loop.
  //  (LQR can be in hand OR graveyard — Witness recurs from GY.)
  //
  //  ── Kogla + Witness + Ashaya + Crop Rotation ────────────────────────────
  //  Ashaya makes Scrapshooter a Forest land on BF. Crop Rotation sacrifices it.
  //  1. Cast Scrapshooter with gift → opponent draws.
  //  2. Crop Rotation: sacrifice Scrapshooter (Forest via Ashaya) → fetch any land.
  //  3. Cast Eternal Witness → ETB returns Crop Rotation to hand.
  //  4. Kogla {1G}: bounces Witness to hand.
  //  5. Cast Eternal Witness → ETB returns Scrapshooter to hand.
  //  6. Kogla {1G}: bounces Witness to hand. Loop.
  //  (Two Witness casts per cycle. Crop Rotation can be in hand OR graveyard.)
  //
  //  ── Kogla + Witness + Ashaya + Reclaimer + Ranger ───────────────────────
  //  Ashaya makes Scrapshooter a Forest land. Reclaimer sacrifices it ({2},{T}).
  //  Reclaimer taps each activation so needs a Ranger to untap it each cycle.
  //  Ranger returns itself to hand (as the Forest cost) → untaps Reclaimer → recast.
  //  1. Cast Scrapshooter with gift → opponent draws.
  //  2. Reclaimer: {2},{T}, sacrifice Scrapshooter (Forest via Ashaya) → Scrapshooter to GY.
  //  3. Cast Eternal Witness → ETB returns Scrapshooter to hand.
  //  4. Kogla {1G}: bounces Witness to hand.
  //  5. Quirion/Scryb Ranger: return itself to hand (as Forest cost) → untaps Reclaimer.
  //  6. Recast Ranger. Loop.
  //  (One Witness cast per cycle; Reclaimer stays on BF; Ranger handles its own untap.)
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Win: Scrapshooter Mill (infinite gift draw)',
    description:
      "With infinite mana, loop Scrapshooter's Gift ETB to force opponents to draw infinitely. " +
      "Temur: bounce Scrapshooter ({1G}), repeat. " +
      "Cloudstone Curio: alternate casting Scrapshooter and another creature. " +
      "Kogla+Witness+BW: BW kills Scrapshooter; two Witness casts (Kogla bounces between) recur BW then Scrapshooter (BW can be in hand or GY). " +
      "Kogla+Witness+LQR: LQR tap-kills Scrapshooter (3 damage to itself); same two-Witness pattern (LQR can be in hand or GY). " +
      "Kogla+Witness+Ashaya+CropRot: Crop Rotation sacs Scrapshooter (Forest via Ashaya); two-Witness pattern (CropRot can be in hand or GY). " +
      "Kogla+Witness+Ashaya+Reclaimer+Ranger: Reclaimer sacs Scrapshooter; one Witness recurs it; Ranger returns itself to untap Reclaimer.",
    check(state) {
      if (!inHandOrField(state, 'Scrapshooter', 'scrapshooter')) return false;
      const inHand = (key) => state.hand && state.hand.includes(key);

      // Temur: unlimited direct bounce of any creature
      if (inHandOrField(state, 'Temur Sabertooth', 'temur_sabertooth')) return true;

      // Cloudstone Curio: triggers on every creature ETB, no per-turn limit
      if (hasPerm(state, 'Cloudstone Curio')) return true;

      // Kogla+Witness engine: Kogla bounces Witness (Human) for {1G}
      const hasKoglaWitness =
        inHandOrField(state, 'Kogla, the Titan Ape', 'kogla') &&
        inHandOrField(state, 'Eternal Witness', 'eternal_witness');
      if (hasKoglaWitness) {
        const gy = state.players?.[0]?.graveyard ?? state.graveyard ?? [];
        const hasAshaya = hasPerm(state, 'Ashaya, Soul of the Wild');
        const hasRanger  = rangerAvailable(state); // first activation must be fresh
        // BW/LQR: in hand OR graveyard — Witness recurs them from GY each loop
        if (inHand('beast_within') || gy.includes('Beast Within') ||
            inHand('legolas_quick_reflexes') || gy.includes("Legolas's Quick Reflexes")) return true;
        // Crop Rotation: in hand OR graveyard (Ashaya required)
        if (hasAshaya && (inHand('crop_rotation') || gy.includes('Crop Rotation'))) return true;
        // Reclaimer sacs Scrapshooter as a land (Ashaya required); Ranger untaps Reclaimer each cycle
        if (hasAshaya && hasRanger &&
            inHandOrField(state, 'Elvish Reclaimer', 'elvish_reclaimer')) return true;
      }

      return false;
    },
    deployed(state) {
      if (!inHandOrField(state, 'Scrapshooter', 'scrapshooter')) return false;
      const inHand = (key) => state.hand && state.hand.includes(key);
      const gy = state.players?.[0]?.graveyard ?? state.graveyard ?? [];

      if (hasPerm(state, 'Temur Sabertooth')) return true;
      if (hasPerm(state, 'Cloudstone Curio')) return true;
      if (hasPerm(state, 'Kogla, the Titan Ape') &&
          inHandOrField(state, 'Eternal Witness', 'eternal_witness')) {
        const hasAshaya = hasPerm(state, 'Ashaya, Soul of the Wild');
        const hasRanger  = rangerAvailable(state); // first activation must be fresh
        if (inHand('beast_within') || gy.includes('Beast Within') ||
            inHand('legolas_quick_reflexes') || gy.includes("Legolas's Quick Reflexes")) return true;
        if (hasAshaya && (inHand('crop_rotation') || gy.includes('Crop Rotation'))) return true;
        if (hasAshaya && hasRanger && hasPerm(state, 'Elvish Reclaimer')) return true;
      }
      return false;
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
      "Beast Whisperer draws a card per creature cast. Glademuse: YOU draw whenever YOU cast a " +
      "spell on someone else's turn. With an infinite creature loop, draw the entire library. " +
      "Then win via Finale of Devastation X≥10, Infectious Bite loop, or other finisher. " +
      "Creature loops: Ashaya + any Ranger (Ranger recast each cycle), " +
      "Temur Sabertooth or Kogla bounce loops, Hyrax Tower Scout loops. " +
      "Beast Within loops: " +
      "(B) BW+Badgermole+Temur/Kogla — animate land, BW kills it, earthbend returns land, bounce Badgermole; " +
      "(C) BW+Witness+Kogla/Temur — BW kills a creature, Witness recurs BW, Witness bounced, Witness recurs creature.",
    check(state) {
      // Beast Whisperer + creature loop: draws on every creature cast.
      // [O-33] Need a genuinely repeatable green-creature recast loop —
      // Temur/Kogla bounce-recast or Ashaya+Ranger (Ranger returns itself).
      // A lone Ranger without Ashaya is once-per-turn and bounces a land, not
      // itself, so it does NOT loop.
      const hasLoop = hasRepeatableCreatureRecast(state);
      if (inHandOrField(state, 'Beast Whisperer', 'beast_whisperer')) {
        if (hasLoop) return true;
      }
      // Regal Force's ETB draws a card per green creature you control. Unlike
      // Beast Whisperer (which draws on ANY creature cast), Regal Force only
      // draws when IT re-enters, so it needs a loop that recasts REGAL FORCE
      // ITSELF — Temur/Kogla bounce-recast or Cloudstone ping-pong, NOT the
      // Ashaya+Ranger loop (which only recasts the Ranger). Regal Force is a
      // green creature (4GGG), so it counts itself → draws ≥1 per recast.
      if (inHandOrField(state, 'Regal Force', 'regal_force')) {
        if (hasSelfRecastBounce(state, 'Regal Force')) return true;
      }
      // [O-26] Glademuse's actual oracle: "Whenever a player casts a spell,
      // if it's not their turn, that player draws a card." The GLADEMUSE
      // CONTROLLER draws when THEY cast a spell during someone else's turn
      // — NOT "whenever an opponent casts a spell". To go infinite, pass the
      // turn, then on an opponent's turn repeatedly recast creatures at
      // instant speed (needs Yeva's flash for green creature spells) via the
      // same creature-recursion loop — each of YOUR casts triggers Glademuse
      // for YOU.
      if (inHandOrField(state, 'Glademuse', 'glademuse')) {
        // Yeva is our commander -- she's available from the command zone
        // as well as from the battlefield. With infinite mana the {2GG}
        // commander cost is trivially payable, so treat commandZone as
        // equivalent to 'on field' for the purposes of this check.
        const hasFlash = hasPerm(state, "Yeva, Nature's Herald") ||
          (state.commandZone ?? []).includes('yeva');
        if (hasFlash && hasLoop) return true;
      }
      return false;
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  TUTOR FOR FINISHER
  //
  //  With infinite mana and any creature tutor in hand or on the battlefield,
  //  we can always find Duskwatch Recruiter (or another finisher) and win.
  //
  //  With infinite mana: activate Duskwatch repeatedly ({2}{G}, no {T}) to pull every
  //  creature from the library into hand. Cast them all. Then win via:
  //  - Finale of Devastation X≥10 (haste + attack for lethal)
  //  - Infectious Bite (10 poison counters)
  //
  //  Hand tutors that find a creature:
  //    GSZ, Shared Summons, Chord of Calling, Summoner's Pact,
  //    Archdruid's Charm, Nature's Rhythm, Eldritch Evolution, Natural Order,
  //    Worldly Tutor (topdeck → draw next turn, then immediately available)
  //
  //  Hand tutors that find War Room or Geier Reach (land → draw to finisher):
  //    Sylvan Scrying → fetch War Room → pay life to draw until finisher found
  //
  //  Battlefield activated/ETB tutors:
  //    Fauna Shaman, Survival of the Fittest, Yisan, Formidable Speaker
  //    [O-18] Fauna Shaman / Survival of the Fittest cost "Discard a creature
  //    card" — gated on hasCreatureToDiscard() (a creature already in hand,
  //    or a bounce engine — Temur/Kogla/Curio/Ashaya+Ranger — that can put
  //    one there). Formidable Speaker discards ANY card, so it's exempt.
  //
  //  ETB tutors reachable in hand:
  //    Woodland Bellower (ETB → nonlegendary green MV≤3 → Duskwatch MV2)
  //    Fierce Empath (ETB → MV≥6 → Woodland Bellower → then Duskwatch)
  //
  //  Draw engines that find a finisher:
  //    Glademuse: pass turn → draw per opponent spell → find Duskwatch/Finale
  //    Crop Rotation: fetch War Room → pay life to draw to finisher
  //      (Under Ashaya, all creatures are Forest lands → always a land to sacrifice)
  //
  //  topDecked: if a Worldly Tutor has already put a creature on top of the
  //    library (state.topDecked set), that creature will be drawn next turn —
  //    treat it as available if it's a useful creature.
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Win: Tutor for Finisher (infinite mana + creature tutor)',
    description:
      'With infinite mana, any creature tutor finds Duskwatch Recruiter. ' +
      'Activate Duskwatch ({2G}) to pull every creature from the library into hand. ' +
      'Cast them all, then execute Hitzel\'s Sequence or another terminal win.\n' +
      'Spell tutors (in hand): GSZ, Shared Summons, Chord of Calling, Summoner\'s Pact, ' +
      'Archdruid\'s Charm, Nature\'s Rhythm, Eldritch Evolution, Natural Order, Worldly Tutor.\n' +
      'Creature tutors (cast from hand → activate): Fauna Shaman, Formidable Speaker, ' +
      'Duskwatch Recruiter, Yisan, Elvish Harbinger.\n' +
      'Enchantment tutor (cast from hand): Survival of the Fittest.\n' +
      'ETB chain: Woodland Bellower → Duskwatch; Fierce Empath → Bellower → Duskwatch.\n' +
      'Draw engines: Beast Whisperer (cast + repeatable creature loop draws deck), ' +
      'Glademuse (with Yeva + creature loop: recast on opponents\' turns to draw deck).\n' +
      'Land paths: Sylvan Scrying → War Room; Crop Rotation → War Room (Ashaya = always a Forest to sac).\n' +
      'Sowing Mycospawn → on-cast fetches War Room/Geier Reach → draw to finisher.',
    check(state) {
      // ── Library feasibility guard ─────────────────────────────────────────
      // Tutors that search the library are only a win condition when the library
      // actually contains a creature to fetch. If the library is entirely unknown
      // cards we allow the win (conservative: assume the deck is intact); if we
      // have full library information and it contains NO non-stax creature, the
      // tutor cannot find anything and the win condition does not apply.
      const lib = state.players?.[0]?.library ?? [];
      const libHasCreature = (() => {
        var CARDS_local = CARDS;
        const hasKnown = lib.some(ck => {
          if (ck === 'unknown') return false;
          const def = CARDS_local[ck];
          return def?.types.includes('creature');
        });
        if (hasKnown) return true;
        // All-unknown library: we can't tell — optimistically allow the win.
        return lib.every(ck => ck === 'unknown') && lib.length > 0;
      })();

      // ── Draw-outlet feasibility guard (for LAND tutors) ───────────────────
      // Land tutors (Sylvan Scrying, Crop Rotation, Sowing Mycospawn) only win
      // via the line: fetch a repeatable draw-outlet land → draw the deck to a
      // finisher. That line requires a draw-outlet LAND to be available — NOT a
      // creature in the library. The relevant lands are War Room, Geier Reach
      // Sanitarium, and Mikokoro. A land already on the battlefield (untapped)
      // also counts — though if it's already in play the tutor isn't needed.
      // Same unknown-library optimism as libHasCreature: if the library is all
      // unknown we assume the deck is intact and allow the win.
      const DRAW_OUTLET_LAND_KEYS = ['war_room', 'geier_reach', 'mikokoro'];
      const DRAW_OUTLET_LAND_NAMES = ['War Room', 'Geier Reach Sanitarium', 'Mikokoro, Center of the Sea'];
      const libHasDrawOutlet = (() => {
        // Already on battlefield (untapped) → outlet is available without fetching.
        const onBF = state.battlefield.some(p =>
          p.is('land') && !p.tapped && DRAW_OUTLET_LAND_NAMES.includes(p.name)
        );
        if (onBF) return true;
        if (lib.some(ck => DRAW_OUTLET_LAND_KEYS.includes(ck))) return true;
        // All-unknown library: assume intact, allow.
        return lib.length > 0 && lib.every(ck => ck === 'unknown');
      })();

      // ── Hand tutors that find a creature ─────────────────────────────────
      // Instant/sorcery tutors in hand (cast directly)
      const handSpellTutors = [
        'green_suns_zenith',  // {X}{G}: green creature MV≤X → battlefield
        'shared_summons',     // {3GG}: two creatures → hand
        'chord_of_calling',   // {X}{G}{G}{G}: creature MV≤X → battlefield (convoke)
        'summoners_pact',     // {0}: any green creature → hand
        'archdruid_charm',    // {GGG}: creature or land → hand or battlefield
        'natures_rhythm',     // {X}{G}{G}: creature MV≤X → battlefield (like GSZ)
        'eldritch_evolution', // {1GG}: sacrifice → creature 2 MV higher → battlefield
        'natural_order',      // {2GG}: sacrifice green → any green creature → battlefield
        'worldly_tutor',      // {G}: creature → top of library (drawn next turn)
        // NOTE: sylvan_scrying is a LAND tutor — handled in the land-tutor
        // branch below (gated on libHasDrawOutlet, not libHasCreature).
      ];
      if (state.hand && libHasCreature) {
        for (const k of handSpellTutors) {
          if (state.hand.includes(k)) return true;
        }
      }

      // ── Land tutors (in hand) → fetch a draw-outlet land → draw to finisher ─
      // These find a LAND, not a creature, so they are gated on libHasDrawOutlet
      // (War Room / Geier Reach / Mikokoro available), NOT libHasCreature.
      // Sowing Mycospawn is an on-cast land tutor; Sylvan Scrying / Crop Rotation
      // fetch directly. Crop Rotation additionally needs a land to sacrifice.
      const handLandTutors = [
        'sylvan_scrying',    // {1G}: any land → hand
        'sowing_mycospawn',  // on-cast: fetch a land
      ];
      if (state.hand && libHasDrawOutlet) {
        for (const k of handLandTutors) {
          if (state.hand.includes(k)) return true;
        }
        // Crop Rotation: {G}, sacrifice a land → search any land → battlefield.
        // Needs a land to sacrifice (Ashaya makes creatures into Forests, so the
        // board almost always has one, but require it explicitly).
        if (state.hand.includes('crop_rotation') && state.lands().length > 0) return true;
      }

      // ── Graveyard tutors castable via Harmonize ───────────────────────────
      // Nature's Rhythm has Harmonize {X}{G}{G}{G}{G}: cast from graveyard → exile.
      // With infinite mana this is equivalent to having it in hand.
      // Note: graveyard stores card *display names* (e.g. "Nature's Rhythm"),
      // matching the convention used throughout GameState and actions.js.
      const HARMONIZE_TUTOR_NAMES = ["Nature's Rhythm"];
      if (libHasCreature) {
        const gy = state.players?.[0]?.graveyard ?? [];
        for (const name of HARMONIZE_TUTOR_NAMES) {
          if (gy.includes(name)) return true;
        }
      }

      // ── Creature/enchantment tutors castable from hand ────────────────────
      // With infinite mana, cast these from hand → they enter BF and can
      // immediately activate (no summoning sickness for non-tap abilities,
      // or ETB triggers fire on entry).
      const handCastableTutors = [
        'fauna_shaman',          // Cast → {G},{T},discard → any creature → hand
        'survival_fittest',      // Cast → {G},discard → any creature → hand (enchantment, no SS)
        'yisan',                 // Cast → {2G},{T},verse → creature of that MV → BF
        'formidable_speaker',    // Cast → ETB: search creature → hand (+ untap ability)
        'duskwatch_recruiter',   // Cast → {2G}: look at top 3 → creature to hand
        'elvish_harbinger',      // Cast → ETB: search for Elf → top of library
      ];
      if (state.hand && libHasCreature) {
        for (const k of handCastableTutors) {
          if (!state.hand.includes(k)) continue;
          // Fauna Shaman / Survival of the Fittest cost "Discard a creature
          // card" once activated — check there's a creature to discard
          // *after* this card itself leaves the hand by being cast.
          if ((k === 'fauna_shaman' || k === 'survival_fittest') &&
              !hasCreatureToDiscard(state, k)) continue;
          return true;
        }
      }

      // ── Beast Whisperer / draw engines castable from hand ─────────────────
      // With infinite mana + a genuinely repeatable creature-recast loop on
      // BF, casting Beast Whisperer draws the entire deck.
      // [O-34] Must be a REPEATABLE recast loop (Temur/Kogla, or Ashaya+Ranger
      // — the Ranger returns itself). A lone Ranger or Wirewood Symbiote is
      // "activate only once each turn" and does NOT loop (same fix as O-33).
      if (state.hand && state.hand.includes('beast_whisperer')) {
        if (hasRepeatableCreatureRecast(state)) return true;
      }

      // ── topDecked: creature placed on library top by Worldly Tutor / Harbinger ETB ─
      // The creature is drawn at the START OF THE NEXT TURN — not this turn.
      // Only count this as a win if the topDecked card isn't already in play
      // (Harbinger sets topDecked but the card may have been cast this same turn).
      if (state.topDecked) {
        var CARDS_local = CARDS;
        const def = CARDS_local[state.topDecked];
        if (def && def.types.includes('creature')) {
          const alreadyOnBF   = state.battlefield.some(p => p.cardKey === state.topDecked);
          const alreadyInHand = state.hand?.includes(state.topDecked);
          if (!alreadyOnBF && !alreadyInHand) return true; // drawn next turn → win next turn
        }
      }

      // ── Battlefield activated / ETB tutors ────────────────────────────────
      const bfTutorNames = [
        'Fauna Shaman',              // {G},{T},discard a creature card → any creature → hand
        'Survival of the Fittest',   // {G}, discard a creature card → any creature → hand (no {T})
        'Yisan, the Wanderer Bard',  // {2G},{T},verse → creature of that MV → BF
        'Formidable Speaker',        // ETB: discard → any creature → hand
        'Duskwatch Recruiter',       // {2}{G}: look at top 3 → creature → hand (NO {T} — wins directly!)
      ];
      for (const name of bfTutorNames) {
        // BF activated tutors that search the library also need a creature there
        const needsLib = name !== 'Duskwatch Recruiter'; // Duskwatch searches library too
        if (!hasPerm(state, name) || (needsLib && !libHasCreature)) continue;
        // Fauna Shaman / Survival of the Fittest cost "Discard a creature
        // card" — without one in hand (or a way to bounce one there), the
        // ability simply cannot be activated.
        if ((name === 'Fauna Shaman' || name === 'Survival of the Fittest') &&
            !hasCreatureToDiscard(state)) continue;
        return true;
      }

      // ── ETB tutors reachable from hand ───────────────────────────────────
      // These win via an ETB chain that ends at a creature finisher
      // (… → Duskwatch Recruiter, or any fetched creature). Every link must
      // still be findable in the library — verify the chain targets exist
      // rather than firing on the hand/board piece alone. (libHasCreature
      // already handles the all-unknown-library optimism.)
      const libHas = (key) => lib.includes(key) ||
        (lib.length > 0 && lib.every(ck => ck === 'unknown'));
      // Woodland Bellower ETB finds nonlegendary green MV≤3 (Duskwatch is MV 2).
      // Win requires a fetchable creature target in the library.
      if (inHandOrField(state, 'Woodland Bellower', 'woodland_bellower') && libHasCreature) return true;
      // Fierce Empath ETB finds MV≥6 (Woodland Bellower MV 6) → then Bellower → Duskwatch.
      // Win requires Woodland Bellower (the MV≥6 target) still in the library.
      if (inHandOrField(state, 'Fierce Empath', 'fierce_empath') &&
          libHas('woodland_bellower')) return true;

      // ── Glademuse: YOU draw when YOU cast a spell on an opponent's turn ───
      // [O-34] Glademuse's actual oracle (see O-26): "Whenever a player casts
      // a spell, if it's not their turn, that player draws a card." The
      // CONTROLLER draws when THEY cast on someone else's turn — not the old
      // "pass turn, opponents cast, you draw". To draw the library, pass the
      // turn and repeatedly recast a creature at instant speed on an
      // opponent's turn — needs Yeva (flash for green creatures) AND a
      // repeatable recast loop.
      if (inHandOrField(state, 'Glademuse', 'glademuse') &&
          (hasPerm(state, "Yeva, Nature's Herald") || (state.commandZone ?? []).includes('yeva')) &&
          hasRepeatableCreatureRecast(state)) {
        return true;
      }

      // ── Crop Rotation / Sowing Mycospawn land tutors ─────────────────────
      // Handled above in the land-tutor branch (gated on libHasDrawOutlet).

      // NOTE: Library contents are NOT checked here. A win only fires if the
      // finisher or tutor is in hand or on the battlefield. If Duskwatch (or
      // any other finisher) is only in the library, the solver must first play
      // a tutor action to bring it to hand/battlefield before the win fires.
      return false;
    },
    // Tutor for Finisher: deployed when we have a clear path to the terminal
    // win from the current state. With infinite mana, any tutor in hand is
    // immediately castable — so it counts as deployed.
    deployed(state) {
      // Hitzel's Sequence already fully deployed on BF.
      // Corrected model: Endurance in hand (fresh cast available) needs no
      // re-buy engine; a battlefield-stranded Endurance needs one (Temur,
      // Kogla+Witness, or Ashaya+Ranger).
      const hitzelDeployed = hasPerm(state, 'Geier Reach Sanitarium') &&
        ((state.hand && state.hand.includes('endurance')) ||
         (hasPerm(state, 'Endurance') &&
          (hasPerm(state, 'Temur Sabertooth') ||
           (hasPerm(state, 'Kogla, the Titan Ape') &&
            inHandOrField(state, 'Eternal Witness', 'eternal_witness')) ||
           (hasPerm(state, 'Ashaya, Soul of the Wild') &&
            rangerAvailable(state)))));  // bounce must be fresh to re-buy stranded Endurance

      // [O-32] Infectious Bite is an instant — it is only a terminal win with
      // a spell-recursion loop (Eternal/Timeless Witness + Temur/Kogla) to
      // recur it from the graveyard for 10 poison counters. Bite in hand with
      // infinite mana alone casts it once (1 poison) — not a deployed win.
      const biteRecursion =
        (inHandOrField(state, 'Eternal Witness', 'eternal_witness') ||
         inHandOrField(state, 'Timeless Witness', 'timeless_witness')) &&
        (hasPerm(state, 'Temur Sabertooth') || hasPerm(state, 'Kogla, the Titan Ape'));
      if (state.hand && state.hand.includes('infectious_bite') && biteRecursion) return true;

      // Beast Whisperer + creature loop
      if (hasPerm(state, 'Beast Whisperer') &&
          (hasPerm(state, 'Quirion Ranger') || hasPerm(state, 'Scryb Ranger') ||
           hasPerm(state, 'Temur Sabertooth') || hasPerm(state, 'Kogla, the Titan Ape'))) {
        return true;
      }

      // Duskwatch on field (Duskwatch itself is the finisher engine)
      if (hasPerm(state, 'Duskwatch Recruiter')) return true;

      // With infinite mana, any tutor in hand or on BF is as good as deployed —
      // the assembleWin phase will show the steps to find Duskwatch and win.
      // This ensures the solver stops here instead of continuing to burn
      // these cards as mana accelerants.
      return true;  // check() already verified a tutor exists
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  DEFILER OF VIGOR — INFINITE COUNTER STORM WIN
  //
  //  Defiler of Vigor triggers whenever you cast a green permanent spell,
  //  putting a +1/+1 counter on EACH creature you control. With an infinite
  //  creature-cast loop (e.g. Formidable Speaker + Quirion Ranger, or any
  //  Ashaya + Ranger bounce loop), you cast infinite green permanents →
  //  each creature gets infinite +1/+1 counters → attack for lethal.
  //
  //  Requires: Defiler of Vigor on battlefield + infinite mana (already
  //  confirmed by the outer checkVictory wrapper) + an infinite-cast loop
  //  (any ranger/bouncer combo that re-casts a green permanent infinite times).
  // ══════════════════════════════════════════════════════════════════════════
  {
    name: 'Win: Defiler of Vigor (infinite +1/+1 counters)',
    description:
      'Defiler of Vigor: whenever you cast a green permanent spell, put a +1/+1 counter on each creature you control. ' +
      'With infinite mana and an infinite-cast loop (Quirion/Scryb Ranger + Ashaya, or any bounce loop), ' +
      'cast a green permanent infinite times. Each creature gets infinite +1/+1 counters. Attack for lethal. ' +
      'Defiler also lets you pay 2 life instead of any {G} in a permanent spell\'s cost, accelerating the setup.',
    check(state) {
      // Defiler must be on the battlefield (not just in hand)
      if (!hasPerm(state, 'Defiler of Vigor')) return false;
      // [O-33] Need a genuinely repeatable green-permanent-cast loop. A lone
      // Ranger (once per turn, without Ashaya) or Wirewood Symbiote (once per
      // turn) does NOT loop — only Temur/Kogla bounce-recast or Ashaya+Ranger
      // (Ranger returns itself, recast each cycle) repeatedly casts a green
      // permanent to re-trigger Defiler's counter.
      return hasRepeatableCreatureRecast(state);
    },
    deployed(state) {
      return hasPerm(state, 'Defiler of Vigor');
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  WIN: COMMANDER DAMAGE (Great Oak Guardian + infinite mana → Yeva lethal)
  //  (custom-library — Great Oak Guardian is not in DEFAULT_DECKLIST)
  //
  //  Great Oak Guardian's ETB ("creatures target player controls get +2/+2
  //  until end of turn") targets a PLAYER, pumping every creature that
  //  player controls — including Yeva, Nature's Herald, the commander.
  //  With infinite mana + a way to bounce-and-recast GOG (Temur Sabertooth,
  //  or Cloudstone Curio alternating it with another creature), the ETB
  //  fires arbitrarily many times, each adding +2/+2 until end of turn.
  //  Yeva's power becomes arbitrarily large; 21 commander damage from a
  //  single attacker is lethal (CR 903.10a).
  //
  //  Requirements: Yeva on the battlefield, able to attack (not summoning
  //  sick, or a haste enabler is present), and Great Oak Guardian + a
  //  re-cast engine for it. Any MANA_POSITIVE engine supplies the mana —
  //  it need not be the GOG+Sabertooth engine itself (e.g. Ashaya+Ranger
  //  infinite mana + GOG + Sabertooth + Yeva also wins this way).
  //
  //  CAVEAT (documented, same as decklist_combo_analysis.md Win Line 19):
  //  Maze of Ith *does* stop this — prevented combat damage isn't dealt, so
  //  commander-damage tracking never increments.
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Win: Commander Damage (Great Oak Guardian + infinite mana → Yeva lethal)',
    description:
      "Great Oak Guardian's ETB targets a player and gives that player's creatures " +
      "+2/+2 until end of turn (it also untaps them). With infinite mana and a way to " +
      "bounce-and-recast GOG (Temur Sabertooth, or Cloudstone Curio alternating it with " +
      "another creature), repeat the ETB arbitrarily many times targeting yourself. " +
      "Yeva, Nature's Herald becomes arbitrarily large — attack for 21+ commander damage " +
      "and win (CR 903.10a). Maze of Ith stops this (prevented damage isn't dealt).",
    check(state) {
      if (!hasPerm(state, "Yeva, Nature's Herald")) return false;
      if (!inHandOrField(state, 'Great Oak Guardian', 'great_oak_guardian')) return false;
      // Need a way to bounce-and-recast GOG so its ETB fires repeatedly.
      const hasRecastEngine =
        hasPerm(state, 'Temur Sabertooth') ||
        hasPerm(state, 'Cloudstone Curio');
      if (!hasRecastEngine) return false;
      // Yeva must be able to attack: not summoning sick, or a haste enabler present.
      const yeva = state.battlefield.find(p => p.name === "Yeva, Nature's Herald");
      if (yeva.summoningSick) {
        const hasHaste =
          hasPerm(state, 'Concordant Crossroads') ||
          hasPerm(state, 'Thousand-Year Elixir') ||
          hasPerm(state, 'Surrak and Goreclaw') ||
          shangChiActive(state);
        if (!hasHaste) return false;
      }
      return true;
    },
    deployed(state) {
      if (!hasPerm(state, "Yeva, Nature's Herald")) return false;
      if (!hasPerm(state, 'Great Oak Guardian')) return false;
      const hasRecastEngine =
        hasPerm(state, 'Temur Sabertooth') ||
        hasPerm(state, 'Cloudstone Curio');
      if (!hasRecastEngine) return false;
      const yeva = state.battlefield.find(p => p.name === "Yeva, Nature's Herald");
      if (yeva.summoningSick) {
        const hasHaste =
          hasPerm(state, 'Concordant Crossroads') ||
          hasPerm(state, 'Thousand-Year Elixir') ||
          hasPerm(state, 'Surrak and Goreclaw') ||
          shangChiActive(state);
        if (!hasHaste) return false;
      }
      return true;
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  ULVENWALD TRACKER FIGHT LOOP / LEGOLAS'S QUICK REFLEXES TAP LOOP
  //  — clear all opponent creatures, then attack for lethal
  //
  //  ── Ulvenwald Tracker variant ────────────────────────────────────────────
  //  With infinite mana + Ulvenwald Tracker + a haste/untap enabler + any
  //  creature with power ≥ 1:
  //
  //  Thousand-Year Elixir variant:
  //    1. Pay {1}{G}, tap Tracker → your biggest creature fights an opponent's
  //       creature. Opponent's creature dies (your creature has arbitrarily high
  //       power via any infinite-mana pump, or just has enough power already).
  //    2. Pay {1}, tap Elixir → untap Tracker.
  //    3. Repeat → kill every opponent creature.
  //    Net cost per loop: {2}{G} (covered by infinite mana).
  //
  //  Shang-Chi variant (replaces Elixir):
  //    Shang-Chi's static grants haste and acts as an untap engine via his
  //    own tap ability + Hope Tender exert loop. No Elixir needed.
  //
  //  ── Legolas's Quick Reflexes variant ─────────────────────────────────────
  //  LQR is an instant that gives a creature "whenever this creature becomes
  //  tapped, it deals damage equal to its power to up to one target creature"
  //  until end of turn. Cast it on ANY creature that's already in an infinite
  //  tap loop (mana dork, Hope Tender, Argothian Elder, Ashaya, etc.) and
  //  point the tap-trigger at a different opponent creature each cycle.
  //
  //  Requirements:
  //    • An established infinite mana loop that involves tapping a creature
  //      (any MANA_POSITIVE combo qualifies — the tapping creature IS the
  //      mana source that drives the loop).
  //    • Legolas's Quick Reflexes accessible: in hand, OR in graveyard with
  //      a recursion engine available (Eternal Witness, Noxious Revival, etc.)
  //      since it goes to the graveyard after resolving as an instant.
  //    • The creature being tapped has power ≥ 1 (kills at least 1-toughness
  //      creatures per tap; with sufficient power kills anything in N taps
  //      of the same creature — but with infinite iterations, N is irrelevant).
  //
  //  Unlike Ulvenwald Tracker, LQR does NOT need:
  //    • A bounce/recast engine (the tap trigger persists until EOT, not per cast)
  //    • Global haste (the trigger fires on tapping, not on an activated ability)
  //  The infinite tap loop itself provides all the untap repetition needed.
  //
  //  Power note: with any 1/1 dork, this kills 1-toughness creatures. Ashaya's
  //  power scales with lands controlled (typically 4+ in a loop), killing
  //  anything. For guaranteed lethal vs any toughness: Ashaya or Great Oak
  //  Guardian pump (not required for the win condition to fire — the solver
  //  models this as "kill all opponents' creatures eventually").
  //
  //  Result: both paths → board wipe of all opponent creatures →
  //  attack with your board for lethal.
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Win: Ulvenwald Tracker Fight Loop / Legolas Tap Loop (clear opponent board)',
    description:
      "Two paths to board-wiping all opponent creatures with infinite mana:\n" +
      "ULVENWALD TRACKER: Tap Tracker ({1}{G},{T}) → your creature fights an opponent's " +
      "creature. Temur Sabertooth or Kogla bounces Tracker ({1}{G}); recast " +
      "it ({G}) — a global-haste effect (Concordant Crossroads / Thousand-Year Elixir / " +
      "Surrak and Goreclaw / Shang-Chi) lets the freshly-recast Tracker activate " +
      "despite summoning sickness. Repeat to kill every opponent creature.\n" +
      "LEGOLAS'S QUICK REFLEXES: Cast LQR ({G}) on any creature in the infinite tap loop " +
      "(Hope Tender, Argothian Elder, Ashaya, any mana dork) — it gains " +
      "'whenever this becomes tapped, deal damage = power to target creature' until EOT. " +
      "The infinite tap loop fires the trigger repeatedly; point it at a different " +
      "opponent creature each cycle. No bounce engine or global haste needed — " +
      "the tap loop itself provides the repetition. LQR can be in graveyard " +
      "(Eternal Witness / Noxious Revival recurs it). " +
      "Both paths: attack with your board for lethal once the opponent's board is clear.",
    check(state) {
      // ── Path 1: Ulvenwald Tracker ─────────────────────────────────────────
      if (hasPerm(state, 'Ulvenwald Tracker')) {
        // [O-23] Ulvenwald Tracker's fight ability is "{1}{G},{T}: ..." — once
        // activated, Tracker is TAPPED with no further {T} ability available.
        // Neither Shang-Chi (only bypasses summoning sickness, never untaps)
        // nor Thousand-Year Elixir (untaps Tracker ONCE, but Elixir itself then
        // stays tapped forever with nothing to untap IT) makes this repeat
        // indefinitely — that gives at most 2 total fights. A genuinely
        // infinite loop needs Tracker bounced+recast each cycle (Temur
        // Sabertooth / Kogla — "another creature you control", i.e. Tracker)
        // with a global-haste effect to bypass the recast's summoning
        // sickness for its {T} ability.
        const hasBounceRecast =
          hasPerm(state, 'Temur Sabertooth') || hasPerm(state, 'Kogla, the Titan Ape');
        if (hasBounceRecast && hasGlobalHaste(state)) {
          // Need at least one other creature to fight with (power ≥ 1)
          const fighter = state.creatures().find(
            c => c.name !== 'Ulvenwald Tracker' && (c.power ?? 0) >= 1
          );
          if (fighter) return true;
        }
      }

      // ── Path 2: Legolas's Quick Reflexes on a tap-loop creature ──────────
      // LQR must be in hand, OR in graveyard with a recursion engine available
      // (Eternal Witness, Noxious Revival recur it; it goes to GY after use).
      const gy = state.players?.[0]?.graveyard ?? [];
      const lqrInHand = state.hand && state.hand.includes('legolas_quick_reflexes');
      const lqrInGY   = gy.includes("Legolas's Quick Reflexes");
      const hasLQR = lqrInHand ||
        (lqrInGY && (
          inHandOrField(state, 'Eternal Witness', 'eternal_witness') ||
          inHandOrField(state, 'Noxious Revival', 'noxious_revival')
        ));
      if (!hasLQR) return false;

      // The infinite tap loop (already confirmed by the calling mana_positive
      // detector) involves a creature tapping for mana. That creature is the
      // LQR target. It needs power ≥ 1 to deal meaningful damage.
      // In practice: any mana dork (1/1+), Argothian Elder/Ley Weaver (2/2),
      // or Ashaya (power = lands controlled, typically 4+).
      const tapLoopCreature = state.creatures().find(c => {
        var CARDS_local = CARDS;
        const def = CARDS_local[c.cardKey];
        return def?.tapForMana && (c.power ?? 0) >= 1;
      });
      return !!tapLoopCreature;
    },
    deployed(state) {
      // ── Path 1 deployed: Tracker + bounce engine + haste all on battlefield ─
      if (hasPerm(state, 'Ulvenwald Tracker')) {
        const hasBounceRecast =
          hasPerm(state, 'Temur Sabertooth') || hasPerm(state, 'Kogla, the Titan Ape');
        if (hasBounceRecast && hasGlobalHaste(state)) return true;
      }
      // ── Path 2 deployed: LQR in hand + tap-loop creature present ──────────
      // "Deployed" means ready to execute now: LQR must be in hand (castable),
      // and a tap-loop creature with power ≥ 1 must already be on the field.
      if (state.hand && state.hand.includes('legolas_quick_reflexes')) {
        const tapLoopCreature = state.creatures().find(c => {
          var CARDS_local = CARDS;
          const def = CARDS_local[c.cardKey];
          return def?.tapForMana && (c.power ?? 0) >= 1;
        });
        if (tapLoopCreature) return true;
      }
      return false;
    },
  },

];

// ── Main exports ──────────────────────────────────────────────────────────

/**
 * Check whether an infinite-mana combo is assembled.
 * Returns { achieved, name, description, loopType } or null.
 *
 * `loopType` is one of LOOP_TYPE.* values describing what the loop produces
 * (mana-positive, mana-neutral ETB/draw/LTB/storm). Used by checkVictory to
 * select win conditions whose prerequisites match the loop output.
 */
/**
 * Check whether an infinite-mana combo is assembled.
 * Returns { achieved, name, description, loopType } or null.
 *
 * `loopType` is one of LOOP_TYPE.* values describing what the loop produces
 * (mana-positive, mana-neutral ETB/draw/LTB/storm). Used by checkVictory to
 * select win conditions whose prerequisites match the loop output.
 *
 * [E11] Optional `present` (Set<string>) — when provided, detectors whose
 * prefilter rejects against this Set are skipped without calling check(),
 * cutting the per-node detector loop on hands that lack each combo's
 * required pieces. Caller must pass the post-equiv-expanded hand∪BF Set
 * (Solver.analyzeState() builds this; pass `analysis.present`).
 * When `present` is omitted, all detectors run (legacy behaviour).
 */
function checkCombos(state, present) {
  for (const detector of DETECTORS) {
    if (!_passesPrefilter(detector, present)) continue;
    if (detector.check(state)) {
      return {
        achieved:    true,
        name:        detector.name,
        description: detector.description,
        loopType:    detector.loopType,  // O-1 wiring: forwarded to checkVictory
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
 *
 * O-1 wiring: each WIN_CONDITION may declare `requiresLoopType` — an array of
 * LOOP_TYPE values it accepts. Default is [MANA_POSITIVE] (matches today's
 * behaviour: virtually every finisher needs infinite mana to pay activation
 * costs). The Draw Library win additionally accepts MANA_NEUTRAL_DRAW because
 * the loop itself draws the deck without needing extra mana.
 *
 * If a detector fires with loopType that no win condition accepts, checkVictory
 * returns the "infinite mana assembled but no win" sentinel — same as before,
 * preserving existing behaviour for unused loop types.
 *
 * [E11] Optional `present` (Set<string>) — same contract as checkCombos: if
 * provided, win conditions whose prefilter rejects against `present` are
 * skipped. Also forwarded to the inner checkCombos call when no pre-computed
 * `_infiniteMana` is supplied.
 */
function checkVictory(state, _infiniteMana, present) {
  // [E3] Accept pre-computed checkCombos result to avoid redundant call in hot path.
  // [E11] Forward `present` to the lazy checkCombos call so the inner detector
  // loop also benefits from the prefilter when checkVictory is called standalone.
  const infiniteMana = _infiniteMana !== undefined ? _infiniteMana : checkCombos(state, present);
  if (!infiniteMana) return null;

  // Loop type from the firing detector. If undefined (e.g. caller passed in a
  // pre-computed result from older code), default to MANA_POSITIVE so the
  // existing behaviour is preserved.
  const detectorLoopType = infiniteMana.loopType ?? LOOP_TYPE.MANA_POSITIVE;

  // Two-pass: prefer fully-deployed wins (stop the search) over
  // undeployed wins (pieces in hand, need setup steps).
  let bestUndeployed = null;

  for (const wc of WIN_CONDITIONS) {
    // O-1 wiring: skip win conditions whose prerequisites don't match the
    // loop type that fired. Default = [MANA_POSITIVE] (today's behaviour).
    // We use the cached `_acceptedLoopTypes` Set stamped at module load.
    if (!wc._acceptedLoopTypes.has(detectorLoopType)) continue;

    // [E11] Prefilter on the present set — skips wcs whose required keys
    // are not in the hand∪BF (post-equiv-expansion). Falls through to
    // wc.check(state) when no prefilter is registered for this wc.
    if (!_passesPrefilter(wc, present)) continue;

    if (!wc.check(state)) continue;

    const deployed = typeof wc.deployed === 'function' ? wc.deployed(state) : true;

    if (deployed) {
      // Fully deployed win — return immediately (highest priority)
      return {
        achieved:      true,
        name:          wc.name,
        description:   wc.description,
        winCondition:  wc.name,
        manaCombo:     infiniteMana.name,
        deployed:      true,
      };
    }

    // Undeployed win — remember the first one as fallback
    if (!bestUndeployed) {
      bestUndeployed = {
        achieved:      true,
        name:          wc.name,
        description:   wc.description,
        winCondition:  wc.name,
        manaCombo:     infiniteMana.name,
        deployed:      false,
      };
    }
  }

  // If we found an undeployed win but no deployed one, return it
  if (bestUndeployed) return bestUndeployed;

  // Infinite mana assembled but no explicit win condition yet — still a
  // meaningful solver result (player can win on the next action).
  // Return the mana combo so the solver can report progress.
  // deployed: true because there's nothing further to deploy — the solver
  // found infinite mana and that's the best it can do without win pieces.
  return {
    achieved:     true,
    name:         `${infiniteMana.name} [win condition needed]`,
    description:  infiniteMana.description + ' — Win condition not yet on battlefield.',
    winCondition: null,
    manaCombo:    infiniteMana.name,
    deployed:     true,
  };
}

// ── Fix #8: Structured requiredKeys on each detector ─────────────────────
// Maps detector name → minimum required card keys for near-miss detection.
// Replaces the fragile text-mining approach in findNearMisses().
var DETECTOR_REQUIRED_KEYS = {
  'Infinite Green Mana (Ashaya + Quirion Ranger + Badgermole Cub + Creature Dork)':['ashaya','quirion_ranger','badgermole_cub'],
  'Infinite Green Mana (Survival/Fauna Shaman → Ashaya + Ranger + Big Dork)':     ['survival_fittest','ashaya','quirion_ranger'],
  'Infinite Green Mana (Ashaya + Quirion Ranger + Mana Dork ≥2G)':               ['ashaya','quirion_ranger'],
  'Infinite Green Mana (Ashaya + Scryb Ranger + Mana Dork ≥3G)  [COMBO 3, 7, 14, 21, 26, 27, 49]':                 ['ashaya','scryb_ranger'],
  'Infinite Green Mana (Ashaya + Ranger + Shang-Chi, self-funded)':          ['ashaya','quirion_ranger','shang_chi'],
  "Infinite Mana (Ashaya + Hope Tender + Gaea's Cradle)  [COMBO 48]":            ['ashaya','hope_tender','gaeas_cradle'],
  'Infinite Mana (Ashaya + Hope Tender + Circle of Dreams Druid)  [COMBO 50]':   ['ashaya','hope_tender','circle_of_dreams_druid'],
  'Infinite Mana (Ashaya + Hope Tender + Marwyn)  [COMBO 61]':                   ['ashaya','hope_tender','marwyn'],
  'Infinite Mana (Ashaya + Hope Tender + Selvala)  [COMBO 56]':                  ['ashaya','hope_tender','selvala'],
  'Infinite Mana (Ashaya + Hope Tender + Nykthos, devotion ≥4)  [COMBO 45]':    ['ashaya','hope_tender','nykthos'],
  'Infinite Mana (Ashaya + Argothian Elder / Ley Weaver)  [COMBO 6, 24]':        ['ashaya','argothian_elder'],
  'Infinite Mana (Ashaya + Magus of the Candelabra + Source ≥3G)  [COMBO 32, 34, 36, 43, 47, 52, 60, 62]': ['ashaya','magus_of_the_candelabra'],
  'Infinite Mana (Argothian Elder + Wirewood Lodge + Big Land)  [COMBO 40, 31, 42, 46]': ['argothian_elder','wirewood_lodge'],
  // 'Infinite Green Mana (Nykthos + Land Untapper + High Devotion)' removed —
  // one-shot untappers (Deserted Temple, Hope Tender, Magus) do not loop with Nykthos alone.
  'Infinite Mana (Selvala + Quirion/Scryb Ranger + Power ≥2)  [COMBO 11]':      ['selvala','quirion_ranger'],
  "Infinite Mana (Kogla + Karametra's Acolyte, devotion ≥7)  [COMBO 2]":        ['kogla','karametra_acolyte'],
  'Infinite Mana (Temur Sabertooth + Wirewood Symbiote + Mana Dork ≥5)  [COMBO 4, 5, 17]': ['temur_sabertooth','wirewood_symbiote'],
  'Infinite Mana (Temur Sabertooth + Haste Enabler + Dork)  [COMBO 9, 10, 20, 29, 37]': ['temur_sabertooth','concordant_crossroads'],
  'Infinite Mana (Hyrax Tower Scout + Temur Sabertooth + Mana Dork ≥5G)  [COMBO 8, 18, 28, 30, 57]': ['hyrax_tower_scout','temur_sabertooth'],
  'Infinite Mana (Hyrax Tower Scout + Kogla + Mana Dork ≥5G)  [COMBO 15, 19, 23, 25, 35, 38, 59]': ['hyrax_tower_scout','kogla'],
  'Infinite Mana (Earthcraft + Ashaya + Quirion Ranger + Basic Forest)  [Combo Summary #4]': ['earthcraft','ashaya','quirion_ranger'],
  'Infinite Green Mana (Ashaya + Quirion Ranger + Arbor Elf + Enchanted Land)': ['ashaya','quirion_ranger','arbor_elf'],
  'Infinite Green Mana (Ashaya + Quirion Ranger + Arbor Elf + Yavimaya + Big Land)': ['ashaya','quirion_ranger','arbor_elf','yavimaya'],
  'Infinite Mana (Temur Sabertooth + Wirewood Symbiote + Selvala)  [COMBO 12, 13, 16]': ['temur_sabertooth','wirewood_symbiote','selvala'],
  'Infinite Mana (Selvala + Cloudstone Curio + Wirewood Symbiote + 1-drop Elf)  [COMBO 53, 54, 55]': ['selvala','cloudstone_curio','wirewood_symbiote'],
  'Infinite Mana (Cloudstone Curio + Defiler of Vigor + Haste + Two 1-drop Elves)': ['cloudstone_curio','defiler_of_vigor'],
  'Infinite Mana (Marwyn + Eternal Witness + Temur + Vitalize/Emerald Charm)  [COMBO 33, 58]': ['marwyn','eternal_witness','temur_sabertooth'],
  'Infinite Mana (Marwyn + Eternal Witness + Kogla + Vitalize/Emerald Charm)  [COMBO 51]':  ['marwyn','eternal_witness','kogla'],
  'Infinite Mana (Selvala + Eternal Witness + Temur + Vitalize/Emerald Charm)  [COMBO 39]': ['selvala','eternal_witness','temur_sabertooth'],
  'Infinite Mana (Selvala + Eternal Witness + Kogla + Vitalize/Emerald Charm)  [COMBO 44]': ['selvala','eternal_witness','kogla'],
  'Infinite Mana (Argothian Elder + Maze of Ith + Big Land)':                    ['argothian_elder','maze_of_ith'],
  'Infinite ETB / Landfall (Tireless Provisioner + Ashaya + Ranger)  [Combo Summary #9]': ['tireless_provisioner','ashaya','quirion_ranger'],
  'Infinite Mana (Woodcaller Automaton + Temur Sabertooth + Big Land)':          ['woodcaller_automaton','temur_sabertooth'],
  'Infinite Mana (Great Oak Guardian + Temur Sabertooth + Team Production ≥9)':  ['great_oak_guardian','temur_sabertooth'],
  'Infinite Mana (Destiny Spinner/Vengeant Earth + Ashaya + Ranger + Big Land)': ['ashaya','quirion_ranger'],
  'Infinite ETB / Landfall (Ashaya + Ranger + Any Green Tapper)  [COMBO 1, 41]': ['ashaya','quirion_ranger'],
  "Infinite Mana (Ashaya + Ranger + Animated Gaea's Cradle)":                    ['ashaya','quirion_ranger','gaeas_cradle'],
  // Shang-Chi bounce-recast loops
  'Infinite Mana (Temur Sabertooth + Shang-Chi + Tap-Dork bounce-recast)':       ['temur_sabertooth','shang_chi'],
  'Infinite Mana (Kogla + Shang-Chi + Human Tap-Dork bounce-recast)':            ['kogla','shang_chi'],
  'Infinite Mana (Temur Sabertooth / Kogla + Shang-Chi + High-Output Dork, generic)': ['temur_sabertooth','shang_chi'],
  'Infinite Mana (Ashaya + Shang-Chi + Hope Tender + Formidable Speaker)  [COMBO 64]': ['ashaya','shang_chi','hope_tender','formidable_speaker'],
  // Argothian Elder / Ley Weaver + Hyrax / Symbiote loops with Cradle/Nykthos (66, 67, 68)
  'Infinite Mana (Argothian Elder / Ley Weaver + Hyrax Tower Scout + Bounce Engine + Cradle/Nykthos)': ['argothian_elder','hyrax_tower_scout'],
  'Infinite Mana (Argothian Elder / Ley Weaver + Hyrax Tower Scout + Cloudstone Curio + Cradle/Nykthos)': ['argothian_elder','hyrax_tower_scout','cloudstone_curio'],
  'Infinite Mana (Argothian Elder / Ley Weaver + Wirewood Symbiote + Temur Sabertooth + Cradle/Nykthos)': ['argothian_elder','wirewood_symbiote','temur_sabertooth'],
  // Combo 68 has alternatives on every axis (untapper: Magus/Speaker/Hope Tender;
  // untap-source: Hyrax/Symbiote; reset: Temur/Kogla). No single card is required
  // across all variants, so requiredKeys lists the canonical Hyrax+Temur variant
  // for near-miss hinting (same convention as the Hyrax+Temur detector).
  'Infinite Mana (Magus of the Candelabra / Formidable Speaker / Hope Tender + Hyrax Tower Scout / Wirewood Symbiote + Bounce Engine + Cradle/Nykthos)': ['hyrax_tower_scout','temur_sabertooth'],
  'Infinite Draw (Beast Whisperer / Glademuse + Creature Loop)':                 ['beast_whisperer'],
  'Win: Geier Reach Sanitarium Mill (Hitzel\'s Sequence)':                       ['geier_reach','endurance'],
  'Win: Duskwatch Recruiter (find all creatures)':                              ['duskwatch_recruiter'],
  'Win: Finale of Devastation X≥10':                                             ['finale_of_devastation'],
  'Win: Infectious Bite (poison counters)':                                      ['infectious_bite','eternal_witness','temur_sabertooth'],
  'Win: Mikokoro Mill Line':                                                     ['mikokoro'],
  'Win: Scrapshooter Mill (infinite gift draw)':                                 ['scrapshooter'],
  'Win: Draw Library (Beast Whisperer / Glademuse + Creature Loop)':             ['beast_whisperer'],
  'Win: Tutor for Finisher (infinite mana + creature tutor)':                    ['finale_of_devastation'],
  'Win: Defiler of Vigor (infinite +1/+1 counters)':                             ['defiler_of_vigor'],
  'Win: Commander Damage (Great Oak Guardian + infinite mana → Yeva lethal)':    ['great_oak_guardian','yeva'],
};

// Stamp requiredKeys onto each detector at load time (Fix #8).
for (const d of [...DETECTORS, ...WIN_CONDITIONS]) {
  d.requiredKeys = DETECTOR_REQUIRED_KEYS[d.name] ?? [];
}

// ── [E11] Hot-path prefilter for checkCombos / checkVictory ───────────────
//
// Per-detector "provably required" key gate, evaluated against the caller's
// pre-built `present` Set (hand ∪ battlefield, post-equiv-expansion). The
// prefilter MUST be a necessary condition for the detector's check() to
// return true — i.e. if prefilter rejects, check() is guaranteed to also
// reject. We hand-audit each entry against the corresponding `.check()`
// source above; detectors NOT in the table run unconditionally (safe
// default — same as old behaviour).
//
// Schema per entry: { all: string[], any: string[][] }
//   all  = every key listed must be in `present` (post equiv-expansion)
//   any  = each inner array is a disjunction; at least one of its keys
//          must be in `present`
//
// Equivalence groups (FUNCTIONAL_EQUIVALENTS) are already expanded into
// `present` by Solver.analyzeState() before checkCombos is called, so
// e.g. listing 'temur_sabertooth' here also matches a board with Kogla,
// and 'quirion_ranger' matches a board with Scryb Ranger. This is the
// one place the prefilter intentionally relaxes — it's correct because
// every check() that names one of these names also accepts the other
// via the same equiv groups (verified by audit).
//
// CORRECTNESS NOTES (per-detector, with the line in check() that justifies):
//
// • Ashaya+QR/Scryb mana-dork detectors:  ashayaOut() AND quirionAvailable()
//     ⇒ ashaya + quirion_ranger (≡ scryb_ranger via equiv group).
// • Ashaya+Hope Tender variants:           ashayaOut() AND permReady('Hope Tender')
//     ⇒ ashaya + hope_tender. The third piece (Cradle/Circle/Marwyn/Selvala/
//     Nykthos) is not a hard prefilter requirement here — listing every
//     variant separately keeps the prefilter strict.
// • Earthcraft+Ashaya+QR:                  earthcraft + ashaya + quirion_ranger.
// • Hyrax+Temur:                           temur_sabertooth + hyrax_tower_scout.
// • Hyrax+Kogla:                           kogla + hyrax_tower_scout (Hyrax can
//     be in hand or on field; both go into `present`).
// • Tireless Provisioner+Ashaya+Ranger:    ashayaOut() AND tireless_provisioner +
//     either ranger.
// • Argothian Elder+Wirewood Lodge:        argothian_elder AND wirewood_lodge.
//     [O-30] NOT ley_weaver — Wirewood Lodge untaps only Elves, and Ley Weaver
//     is a Human Druid, so it cannot be the untapped creature in this loop.
// • Argothian Elder + Maze of Ith:         argothian_elder + maze_of_ith.
// • Defiler win:                           defiler_of_vigor + (any ranger / bouncer / symbiote).
// • Hitzel:                                geier_reach + endurance + (Temur OR (Kogla+EW)
//     OR (Ashaya + (QR OR Scryb))). The post-equiv `present` accepts Kogla
//     for `temur_sabertooth`, but the Ashaya+Ranger third variant breaks the
//     temur_sabertooth requirement. Use an `any` group instead.
// • Mikokoro:                              mikokoro + eternal_witness +
//     (temur OR kogla) [equiv-grouped] + (noxious_revival OR elvish_reclaimer
//     OR crop_rotation). Note: Reclaimer must be on BF in check(), but it is
//     in `present` if on BF, so listing the key is sufficient.
// • Win: Defiler:                          defiler_of_vigor.
// • Win: Duskwatch / Finale / Bite:        single key, simple inclusion test.
// • Win: Tutor for Finisher:               NO prefilter — too many disjunctive
//     paths through tutors, draw engines, ETB chains, and a topDecked check.
// • Win: Draw Library:                     NO prefilter — accepts Beast Whisperer
//     OR Glademuse, each gated by additional bouncer/ranger requirements that
//     are easier to encode as the existing check.
// • Selvala + Quirion/Scryb + Power≥2:     selvala + quirion_ranger.
// • Selvala+Cloudstone+Symbiote:           selvala + cloudstone_curio + wirewood_symbiote.
// • Marwyn/Selvala + EW + Temur/Kogla + Vitalize/Charm: 4 keys all required, the
//     spell is required in hand specifically — but `present` Set already covers
//     hand. Use an `any` group for vitalize/emerald_charm.
// • Survival/Fauna→Ashaya+Ranger:          survival_fittest (or fauna_shaman, but
//     this detector specifically gates on Survival per its check) + ashaya +
//     quirion_ranger. Conservative: only require ashaya + quirion_ranger.
// • Beast Whisperer / Glademuse Draw:      beast_whisperer (or glademuse, but
//     the detector at line 1386 specifically requires Beast Whisperer for the
//     mana-neutral draw; Glademuse is documented but not gated). Conservative:
//     require beast_whisperer for prefilter.
// • Ashaya+Ranger neutral (combos 1, 41):  ashaya + (quirion_ranger OR scryb_ranger,
//     equiv-grouped, so `quirion_ranger` alone in `all` is sufficient AFTER
//     equiv-expansion) + a green tapper. Conservative: require ashaya + ranger;
//     do NOT enumerate green tappers.
// • Destiny Spinner+Ashaya+Ranger+Big:     destiny_spinner + ashaya + quirion_ranger.
// • Ashaya+Magus+Source:                   ashaya + magus_of_the_candelabra.
// • Ashaya+Argothian/Ley:                  ashaya + argothian_elder (equiv).
// • Selvala+Quirion+Power:                 selvala + quirion_ranger.
// • Kogla+Acolyte:                         kogla + karametra_acolyte.
// • Temur+Symbiote+Circle:                 temur_sabertooth + wirewood_symbiote +
//     circle_of_dreams_druid.
// • Temur+Symbiote+Selvala:                temur_sabertooth + wirewood_symbiote +
//     selvala.
// • Temur+Haste+Dork:                      temur_sabertooth + (concordant_crossroads
//     OR thousand_year_elixir OR surrak_goreclaw).
// • Woodcaller+Temur:                      temur_sabertooth + woodcaller_automaton.
// • Ashaya+QR+Arbor Elf:                   ashaya + quirion_ranger + arbor_elf.
// • Ashaya+QR+Arbor Elf+Yavimaya:          ashaya + quirion_ranger + arbor_elf +
//     yavimaya.
// • Ashaya+QR+Badgermole:                  ashaya + quirion_ranger + badgermole_cub.
//
// If a detector is missing from this table, it falls through and runs
// unconditionally — same as the pre-prefilter baseline. Adding entries is
// purely additive and reversible.
var _DETECTOR_PREFILTER = {
  // Ashaya + Ranger family
  'Infinite Green Mana (Ashaya + Quirion Ranger + Mana Dork ≥2G)':
    { all: ['ashaya', 'quirion_ranger'] },
  'Infinite Green Mana (Ashaya + Scryb Ranger + Mana Dork ≥3G)  [COMBO 3, 7, 14, 21, 26, 27, 49]':
    { all: ['ashaya', 'scryb_ranger'] },
  'Infinite ETB / Landfall (Ashaya + Ranger + Any Green Tapper)  [COMBO 1, 41]':
    { all: ['ashaya', 'quirion_ranger'] },  // equiv-expanded: covers Scryb Ranger too
  'Infinite Green Mana (Ashaya + Quirion Ranger + Badgermole Cub + Creature Dork)':
    { all: ['ashaya', 'quirion_ranger', 'badgermole_cub'] },
  'Infinite Green Mana (Ashaya + Quirion Ranger + Arbor Elf + Enchanted Land)':
    { all: ['ashaya', 'quirion_ranger', 'arbor_elf'] },
  'Infinite Green Mana (Ashaya + Quirion Ranger + Arbor Elf + Yavimaya + Big Land)':
    { all: ['ashaya', 'quirion_ranger', 'arbor_elf', 'yavimaya'] },
  'Infinite Mana (Earthcraft + Ashaya + Quirion Ranger + Basic Forest)  [Combo Summary #4]':
    { all: ['earthcraft', 'ashaya', 'quirion_ranger'] },
  'Infinite Green Mana (Survival/Fauna Shaman → Ashaya + Ranger + Big Dork)':
    { all: ['ashaya', 'quirion_ranger', 'survival_fittest'] },
  'Infinite Mana (Destiny Spinner/Vengeant Earth + Ashaya + Ranger + Big Land)':
    { all: ['ashaya'], any: [['destiny_spinner', 'vengeant_earth'], ['quirion_ranger', 'scryb_ranger']] },
  'Infinite ETB / Landfall (Tireless Provisioner + Ashaya + Ranger)  [Combo Summary #9]':
    { all: ['ashaya', 'tireless_provisioner', 'quirion_ranger'] },

  // Ashaya + Hope Tender family
  "Infinite Mana (Ashaya + Hope Tender + Gaea's Cradle)  [COMBO 48]":
    { all: ['ashaya', 'hope_tender', 'gaeas_cradle'] },
  'Infinite Mana (Ashaya + Hope Tender + Circle of Dreams Druid)  [COMBO 50]':
    { all: ['ashaya', 'hope_tender', 'circle_of_dreams_druid'] },
  'Infinite Mana (Ashaya + Hope Tender + Marwyn)  [COMBO 61]':
    { all: ['ashaya', 'hope_tender', 'marwyn'] },
  'Infinite Mana (Ashaya + Hope Tender + Selvala)  [COMBO 56]':
    { all: ['ashaya', 'hope_tender', 'selvala'] },
  'Infinite Mana (Ashaya + Hope Tender + Nykthos, devotion ≥4)  [COMBO 45]':
    { all: ['ashaya', 'hope_tender', 'nykthos'] },

  // Ashaya + Argothian Elder / Magus
  'Infinite Mana (Ashaya + Argothian Elder / Ley Weaver)  [COMBO 6, 24]':
    { all: ['ashaya', 'argothian_elder'] },  // equiv-grouped with ley_weaver
  'Infinite Mana (Ashaya + Magus of the Candelabra + Source ≥3G)  [COMBO 32, 34, 36, 43, 47, 52, 60, 62]':
    { all: ['ashaya', 'magus_of_the_candelabra'] },

  // Argothian Elder + Wirewood Lodge / Maze of Ith (no Ashaya)
  'Infinite Mana (Argothian Elder + Wirewood Lodge + Big Land)  [COMBO 40, 31, 42, 46]':
    { all: ['argothian_elder', 'wirewood_lodge'] },  // equiv-grouped with ley_weaver
  'Infinite Mana (Argothian Elder + Maze of Ith + Big Land)':
    { all: ['argothian_elder', 'maze_of_ith'] },

  // Selvala + Ranger / Cloudstone variants
  'Infinite Mana (Selvala + Quirion/Scryb Ranger + Power ≥2)  [COMBO 11]':
    { all: ['selvala', 'quirion_ranger'] },
  'Infinite Mana (Selvala + Cloudstone Curio + Wirewood Symbiote + 1-drop Elf)  [COMBO 53, 54, 55]':
    { all: ['selvala', 'cloudstone_curio', 'wirewood_symbiote'] },

  'Infinite Mana (Cloudstone Curio + Defiler of Vigor + Haste + Two 1-drop Elves)':
    { all: ['cloudstone_curio', 'defiler_of_vigor'] },

  // Kogla + Acolyte (combo 2)
  "Infinite Mana (Kogla + Karametra's Acolyte, devotion ≥7)  [COMBO 2]":
    { all: ['kogla', 'karametra_acolyte'],
      any: [['concordant_crossroads', 'thousand_year_elixir', 'surrak_goreclaw']] },

  // Temur Sabertooth + various engines
  'Infinite Mana (Temur Sabertooth + Wirewood Symbiote + Mana Dork ≥5)  [COMBO 4, 5, 17]':
    { all: ['temur_sabertooth', 'wirewood_symbiote'] },
  'Infinite Mana (Temur Sabertooth + Wirewood Symbiote + Selvala)  [COMBO 12, 13, 16]':
    { all: ['temur_sabertooth', 'wirewood_symbiote', 'selvala'] },
  'Infinite Mana (Temur Sabertooth + Haste Enabler + Dork)  [COMBO 9, 10, 20, 29, 37]':
    { all: ['temur_sabertooth'],
      any: [['concordant_crossroads', 'thousand_year_elixir', 'surrak_goreclaw']] },
  'Infinite Mana (Hyrax Tower Scout + Temur Sabertooth + Mana Dork ≥5G)  [COMBO 8, 18, 28, 30, 57]':
    { all: ['temur_sabertooth', 'hyrax_tower_scout'] },
  'Infinite Mana (Hyrax Tower Scout + Kogla + Mana Dork ≥5G)  [COMBO 15, 19, 23, 25, 35, 38, 59]':
    { all: ['kogla', 'hyrax_tower_scout'] },
  'Infinite Mana (Woodcaller Automaton + Temur Sabertooth + Big Land)':
    { all: ['temur_sabertooth', 'woodcaller_automaton'] },
  'Infinite Mana (Great Oak Guardian + Temur Sabertooth + Team Production ≥9)':
    { all: ['temur_sabertooth', 'great_oak_guardian'] },

  // Shang-Chi bounce-recast loops (new)
  'Infinite Mana (Temur Sabertooth + Shang-Chi + Tap-Dork bounce-recast)':
    { all: ['temur_sabertooth', 'shang_chi'] },
  'Infinite Mana (Kogla + Shang-Chi + Human Tap-Dork bounce-recast)':
    { all: ['kogla', 'shang_chi'] },

  // Marwyn / Selvala + Eternal Witness + Temur/Kogla + Vitalize/Charm
  'Infinite Mana (Marwyn + Eternal Witness + Temur + Vitalize/Emerald Charm)  [COMBO 33, 58]':
    { all: ['marwyn', 'eternal_witness', 'temur_sabertooth'],
      any: [['vitalize', 'emerald_charm']] },
  'Infinite Mana (Marwyn + Eternal Witness + Kogla + Vitalize/Emerald Charm)  [COMBO 51]':
    { all: ['marwyn', 'eternal_witness', 'kogla'],
      any: [['vitalize', 'emerald_charm']] },
  'Infinite Mana (Selvala + Eternal Witness + Temur + Vitalize/Emerald Charm)  [COMBO 39]':
    { all: ['selvala', 'eternal_witness', 'temur_sabertooth'],
      any: [['vitalize', 'emerald_charm']] },
  'Infinite Mana (Selvala + Eternal Witness + Kogla + Vitalize/Emerald Charm)  [COMBO 44]':
    { all: ['selvala', 'eternal_witness', 'kogla'],
      any: [['vitalize', 'emerald_charm']] },

  // Beast Whisperer draw engine (mana-neutral)
  'Infinite Draw (Beast Whisperer / Glademuse + Creature Loop)':
    { all: ['beast_whisperer'] },

  // ── Win Conditions ──────────────────────────────────────────────────────
  "Win: Geier Reach Sanitarium Mill (Hitzel's Sequence)":
    // Geier Reach only: Endurance may be in the GRAVEYARD (Witness recovery),
    // which `present` (hand∪battlefield) cannot see, and no re-buy engine is
    // required when Endurance is in hand — so neither can be prefiltered.
    { all: ['geier_reach'] },
  'Win: Duskwatch Recruiter (find all creatures)':
    { all: ['duskwatch_recruiter'] },
  'Win: Finale of Devastation X≥10':
    { all: ['finale_of_devastation'] },
  'Win: Infectious Bite (poison counters)':
    { all: ['temur_sabertooth'] },  // equiv-grouped with kogla; Witness+Bite checked in check()
  'Win: Mikokoro Mill Line':
    { all: ['mikokoro', 'eternal_witness'],
      any: [['temur_sabertooth', 'kogla'],
            ['noxious_revival', 'elvish_reclaimer', 'crop_rotation']] },
  'Win: Scrapshooter Mill (infinite gift draw)':
    { all: ['scrapshooter'],
      any: [['temur_sabertooth', 'cloudstone_curio', 'kogla']] },
  'Win: Defiler of Vigor (infinite +1/+1 counters)':
    { all: ['defiler_of_vigor'],
      any: [['quirion_ranger', 'scryb_ranger', 'temur_sabertooth', 'kogla', 'wirewood_symbiote']] },
  'Win: Commander Damage (Great Oak Guardian + infinite mana → Yeva lethal)':
    { all: ['great_oak_guardian', 'yeva'],
      any: [['temur_sabertooth', 'cloudstone_curio']] },
  // 'Win: Tutor for Finisher' and 'Win: Draw Library' have too many disjunctive
  // paths to safely prefilter — they fall through and run unconditionally.
  'Win: Ulvenwald Tracker Fight Loop / Legolas Tap Loop (clear opponent board)':
    // Either Tracker or LQR in hand/on-field satisfies the prefilter.
    // The any group covers both paths; graveyard-only LQR falls through without
    // a present-set hit, but that's acceptable — the prefilter is a fast-reject,
    // not an exhaustive gate.
    { any: [['ulvenwald_tracker'], ['legolas_quick_reflexes']] },
};

// Stamp _prefilterAll / _prefilterAny on each detector at load.
// Detectors not in _DETECTOR_PREFILTER get null prefilters (match-all behaviour).
for (const d of [...DETECTORS, ...WIN_CONDITIONS]) {
  const pf = _DETECTOR_PREFILTER[d.name];
  d._prefilterAll = pf?.all ?? null;
  d._prefilterAny = pf?.any ?? null;
}

// ── Load-time drift guard (F3) ────────────────────────────────────────────
// Both DETECTOR_REQUIRED_KEYS and _DETECTOR_PREFILTER are keyed on the full
// detector display name, which embeds the `[COMBO …]` annotation. When an
// annotation changes in one place but not the other, an entry silently stops
// matching its detector — requiredKeys falls to [] (near-miss reporting goes
// dark) or the prefilter stops applying. Both maps SHOULD list exactly the
// runtime detector/win names. Fail loudly here so the next rename can't drift
// past review unnoticed (the test suite alone never exercised these names).
(() => {
  const liveNames = new Set([...DETECTORS, ...WIN_CONDITIONS].map(d => d.name));
  const orphans = [];
  for (const name of Object.keys(DETECTOR_REQUIRED_KEYS)) {
    if (!liveNames.has(name)) orphans.push(`DETECTOR_REQUIRED_KEYS["${name}"]`);
  }
  for (const name of Object.keys(_DETECTOR_PREFILTER)) {
    if (!liveNames.has(name)) orphans.push(`_DETECTOR_PREFILTER["${name}"]`);
  }
  if (orphans.length) {
    throw new Error(
      'combos.js: detector-metadata drift — these table keys match no live ' +
      'detector/win name (a name was renamed in one place but not the other):\n  ' +
      orphans.join('\n  ') +
      '\nUpdate the table key to the current detector name (see DETECTORS / ' +
      'WIN_CONDITIONS .name).'
    );
  }
})();

/**
 * [E11] Test whether the caller's `present` Set satisfies a detector's
 * prefilter requirements. Returns true when:
 *   - the detector has no prefilter (always run), OR
 *   - every key in `_prefilterAll` is in `present`, AND
 *   - for every group in `_prefilterAny`, at least one key is in `present`.
 * `present` is the post-equiv-expanded hand∪battlefield Set built by
 * Solver.analyzeState() — keep that contract or this filter can wrongly
 * skip detectors. When `present` is null/undefined, returns true (no skip).
 */
function _passesPrefilter(detector, present) {
  if (!present) return true;
  const all = detector._prefilterAll;
  if (all) {
    for (let i = 0; i < all.length; i++) {
      if (!present.has(all[i])) return false;
    }
  }
  const any = detector._prefilterAny;
  if (any) {
    for (let i = 0; i < any.length; i++) {
      const group = any[i];
      let hit = false;
      for (let j = 0; j < group.length; j++) {
        if (present.has(group[j])) { hit = true; break; }
      }
      if (!hit) return false;
    }
  }
  return true;
}

// [E4] Sort DETECTORS by empirical hit frequency so checkCombos short-circuits
// on the most common combos first.  Measured across the full test suite:
//   #1  Ashaya + Quirion Ranger           ~64 K hits
//   #2  Ashaya + Hope Tender + Cradle     ~62 K hits
//   #3  Ashaya + QR + Arbor Elf            ~3.6K hits
//   #4  Ashaya + Magus of the Candelabra    ~300 hits
//   #5  Beast Whisperer                     ~270 hits
// All other detectors fire ≤103 times combined.
// We use a stable sort: detectors not in the priority list stay in their
// original editorial order after the top-5.
var _DETECTOR_PRIORITY = new Map([
  ['Infinite Green Mana (Ashaya + Quirion Ranger + Mana Dork ≥2G)',                                               0],
  ["Infinite Mana (Ashaya + Hope Tender + Gaea's Cradle)  [COMBO 48]",                                            1],
  ['Infinite Green Mana (Ashaya + Quirion Ranger + Arbor Elf + Enchanted Land)',                                   2],
  ['Infinite Mana (Ashaya + Magus of the Candelabra + Source ≥3G)  [COMBO 32, 34, 36, 43, 47, 52, 60, 62]',     3],
  ['Infinite Draw (Beast Whisperer / Glademuse + Creature Loop)',                                                  4],
  // The mana-neutral Ashaya+Ranger detector is a STRICT SUPERSET of every
  // more-specific Ashaya+Ranger detector (mana-positive variants, Earthcraft,
  // Lotus Cobra, Tireless Provisioner). It must run last so the more
  // informative classification wins the priority race. We use a priority
  // higher than the unlisted-detector default (999) so this runs after every
  // detector that doesn't have an explicit priority entry.
  ['Infinite ETB / Landfall (Ashaya + Ranger + Any Green Tapper)  [COMBO 1, 41]',                               9999],
]);
DETECTORS.sort((a, b) => {
  const pa = _DETECTOR_PRIORITY.get(a.name) ?? 999;
  const pb = _DETECTOR_PRIORITY.get(b.name) ?? 999;
  return pa - pb;
});

// ── Loop type stamping (O-1) ──────────────────────────────────────────────
// Every detector gets a `loopType` so downstream code (win-condition wiring,
// loop simulator selection, advisors) can branch on what the loop actually
// produces. Detectors that already declared a loopType keep it; the rest
// default to MANA_POSITIVE which is correct for the vast majority.
//
// Special cases below that are NOT mana-positive:
//   - "Infinite Draw (Beast Whisperer / Glademuse + Creature Loop)"
//       → MANA_NEUTRAL_DRAW. The loop spends and recovers the same mana per
//         cycle (Quirion Ranger as a {G} ritual) but yields +1 card per cast,
//         winning via deck-out or by finding a real win condition.
//   - "Infinite ETB / Landfall (Tireless Provisioner + Ashaya + Ranger)"
//       → MANA_NEUTRAL_ETB. The Ranger-bounce loop is mana-neutral; the win
//         comes from infinite Tireless Provisioner landfall triggers (Food
//         tokens, Treasure, etc., per its current oracle).
var _NEUTRAL_DETECTOR_TYPES = new Map([
  ['Infinite Draw (Beast Whisperer / Glademuse + Creature Loop)',                          LOOP_TYPE.MANA_NEUTRAL_DRAW],
  ['Infinite ETB / Landfall (Tireless Provisioner + Ashaya + Ranger)  [Combo Summary #9]', LOOP_TYPE.MANA_NEUTRAL_ETB],
]);
for (const det of DETECTORS) {
  if (det.loopType) continue; // detector already declared
  det.loopType = _NEUTRAL_DETECTOR_TYPES.get(det.name) ?? LOOP_TYPE.MANA_POSITIVE;
}

// ── Win-condition acceptance stamping (O-1 wiring) ────────────────────────
// Each win condition declares which detector loopType(s) satisfy its
// prerequisites. Default = MANA_POSITIVE only — virtually every finisher
// (Hitzel's, Duskwatch, Finale, Mikokoro, etc.) needs infinite mana to pay
// per-iteration costs. The Draw Library win additionally accepts
// MANA_NEUTRAL_DRAW because the loop itself draws the deck (Beast Whisperer
// triggers on creature casts paid for with the same {G} the loop recovers).
//
// To opt a future win condition in to a non-default loop type, declare
// `requiresLoopType: ['mana_positive', 'mana_neutral_etb']` on the win
// condition object — the array is normalized to a Set here.
var _DEFAULT_WC_REQUIRES = [LOOP_TYPE.MANA_POSITIVE];
var _WIN_CONDITION_LOOP_TYPES = new Map([
  ['Win: Draw Library (Beast Whisperer / Glademuse + Creature Loop)',
   // Beast Whisperer draws on every creature cast (mana_positive, mana_neutral_draw,
   // mana_neutral_etb all qualify since any creature loop drives the draw engine).
   // Glademuse+Yeva specifically needs mana_neutral_etb: the Ashaya+QR bounce loop
   // (COMBO 1, loopType mana_neutral_etb) recasts creatures at instant speed on the
   // opponent's turn, and Glademuse draws for each such cast. Without mana_neutral_etb
   // in this accepted set, checkVictory skips the Glademuse win whenever COMBO 1
   // fires first -- even though glamWin.check() already correctly guards for Yeva.
   [LOOP_TYPE.MANA_POSITIVE, LOOP_TYPE.MANA_NEUTRAL_DRAW, LOOP_TYPE.MANA_NEUTRAL_ETB]],
  ['Win: Ulvenwald Tracker Fight Loop / Legolas Tap Loop (clear opponent board)',
   // Tracker path: requires actual mana each cycle ({1}{G},{T} + bounce/recast) → mana_positive.
   // LQR path: any loop that taps a creature fires the "whenever tapped, deal damage" trigger.
   // The Ashaya+QR ETB loop (mana_neutral_etb, COMBO 1) includes a dork tap each cycle
   // to fund the QR recast -- that tap fires the LQR trigger. So mana_neutral_etb qualifies.
   // check() itself guards for the required pieces, so accepting extra loop types is safe.
   [LOOP_TYPE.MANA_POSITIVE, LOOP_TYPE.MANA_NEUTRAL_ETB]],
]);
for (const wc of WIN_CONDITIONS) {
  if (!wc.loopType) wc.loopType = LOOP_TYPE.WIN_CONDITION;
  // Author can override via `requiresLoopType` on the object literal; otherwise
  // fall back to the override map, otherwise MANA_POSITIVE.
  const requires =
    wc.requiresLoopType ??
    _WIN_CONDITION_LOOP_TYPES.get(wc.name) ??
    _DEFAULT_WC_REQUIRES;
  wc.requiresLoopType = Array.isArray(requires) ? requires : [requires];
  wc._acceptedLoopTypes = new Set(wc.requiresLoopType); // cached for the hot path
}

var _COM = { checkCombos, checkVictory };
// actions.js — shims for renamed destructuring imports
var STAX_CARDS = _CDM.STAX_KEYS;
var _parseCost = _GSM.parseCost;
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

// ── Reverse name→key map (built once at load time) ────────────────────────
// Avoids scanning all 159 card keys on every tutor result match.
var NAME_TO_KEY = Object.fromEntries(
  Object.entries(CARDS).map(([k, v]) => [v.name, k])
);

// [E7] Reverse index: cardKey -> [{idx, total}] mapping each card to the combos
// that require it. Built once at load time so missingComboCards() can find
// "one-card-away" combos without scanning all COMBO_REQUIRED_KEYS every call.
var _CARD_TO_COMBOS = new Map();
for (let i = 0; i < COMBO_REQUIRED_KEYS.length; i++) {
  const req = COMBO_REQUIRED_KEYS[i];
  for (const k of req) {
    if (!_CARD_TO_COMBOS.has(k)) _CARD_TO_COMBOS.set(k, []);
    _CARD_TO_COMBOS.get(k).push({ idx: i, total: req.length });
  }
}

// [E7] Functional-equivalents lookup: cardKey -> its equivalence group Set.
var _EQUIV_OF = new Map();
for (const group of FUNCTIONAL_EQUIVALENTS) {
  for (const k of group) _EQUIV_OF.set(k, group);
}

/**
 * Returns the set of card keys that would complete (or advance) any combo
 * given what is currently in hand or on the battlefield.
 *
 * [E7] Uses reverse index instead of O(combos x hand) full scan.
 * Fix #2: accepts an optional pre-built `present` Set.
 */
function missingComboCards(state, present = null) {
  if (!present) {
    present = new Set(state.hand);
    for (const p of state.battlefield) {
      const ck = NAME_TO_KEY[p.name];
      if (ck) present.add(ck);
    }
  }

  // Track missing-piece count per combo using reverse index.
  // missingCount[i] = pieces still needed for combo i (-1 = untouched).
  const missingCount = new Array(COMBO_REQUIRED_KEYS.length).fill(-1);
  for (const k of present) {
    const entries = _CARD_TO_COMBOS.get(k);
    if (!entries) continue;
    for (const { idx, total } of entries) {
      if (missingCount[idx] === -1) missingCount[idx] = total;
      missingCount[idx]--;
    }
  }

  const missing = new Set();
  for (let i = 0; i < missingCount.length; i++) {
    if (missingCount[i] !== 1) continue; // only "exactly one piece missing"
    for (const k of COMBO_REQUIRED_KEYS[i]) {
      if (!present.has(k)) { missing.add(k); break; }
    }
  }

  // Prune redundant equiv-group members
  for (const k of missing) {
    const grp = _EQUIV_OF.get(k);
    if (grp && [...grp].some(m => present.has(m))) missing.delete(k);
  }

  // Strict fallback: nothing one card away — return highest-priority target
  if (missing.size === 0) {
    let best = null, bestScore = -1;
    for (const [k, sc] of Object.entries(TUTOR_PRIORITY_SCORE)) {
      if (present.has(k)) continue;
      const grp = _EQUIV_OF.get(k);
      if (grp && [...grp].some(m => present.has(m))) continue;
      if (sc > bestScore) { best = k; bestScore = sc; }
    }
    if (best) missing.add(best);
  }
  return missing;
}

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
    state.hasStax('Null Rod') ||
    state.hasStax('Collector Ouphe') ||
    state.hasStax("Titania's Song")  // converts artifacts to vanilla creatures — no abilities
  );
}

/**
 * Extra generic mana cost imposed on non-creature spells by Thorn of Amethyst.
 * Returns 0 or 1.
 */
function thornTax(state, def) {
  if (!state.hasStax('Thorn of Amethyst')) return 0;
  if (def.types.includes('creature')) return 0;
  return 1;
}

/**
 * Returns true if a Chalice of the Void on the battlefield would counter
 * the spell being cast (CMC matches the charge counters on Chalice).
 */
/**
 * Returns true if Allosaurus Shepherd is on the battlefield (untapped or not —
 * its static ability is always on) and the spell being cast is green.
 * "Green spells you control can't be countered." — oracle text.
 * A spell is green if its mana cost contains {G} OR if it has a green colour
 * indicator (e.g. Summoner's Pact costs {0} but is green via colour indicator).
 * This bypasses both Chalice of the Void and Vexing Bauble.
 */
function shepherdProtects(state, def) {
  if (!state.hasPermanent('Allosaurus Shepherd')) return false;
  // Green via mana cost pips, OR via explicit colour indicator (def.color)
  const greenByCost = !!(def.cost && def.cost.includes('G'));
  const greenByIndicator = !!(def.color && def.color.includes('G'));
  return greenByCost || greenByIndicator;
}

 /**
 * Returns true if a Chalice of the Void on the battlefield would counter
 * the spell being cast (CMC matches the charge counters on Chalice).
 * Bypassed when Allosaurus Shepherd is on the battlefield and the spell is green.
 */
function chaliceBlocks(state, def) {
  if (!state.hasStax('Chalice of the Void')) return false;
  if (shepherdProtects(state, def)) return false;
  var { parseCost: _pc } = _GSM;
  const parsed = def._parsedCost ?? _pc(def.cost);
  const cmc = parsed.generic + Object.values(parsed.colored).reduce((a,b) => a+b, 0);

  // Check own Chalice (with charge counters matching CMC)
  const ownChalice = state.battlefield.some(p =>
    p.name === 'Chalice of the Void' && (p.chargeCounters ?? 1) === cmc
  );
  if (ownChalice) return true;

  // Check opponent Chalice — use parameter if set ('Chalice of the Void@2' = X=2)
  // Default to X=1 if no parameter (most common in cedh: chalice at 1)
  if (state.opponentStax?.has('Chalice of the Void') || state.opponentStaxParam?.('Chalice of the Void') !== null) {
    const param = state.opponentStaxParam?.('Chalice of the Void');
    // param is the X value as a string (e.g. '1', '2') or null for plain entry
    if (param !== null) {
      const x = parseInt(param, 10);
      return !isNaN(x) && cmc === x;
    }
    // No parameter → default opponent Chalice at X=1 (most impactful)
    return cmc === 1;
  }
  return false;
}

function vexingBaubleBlocks(state, def, effectiveCostStr) {
  if (!state.hasStax('Vexing Bauble')) return false;
  if (shepherdProtects(state, def)) return false;
  var { parseCost: _pc } = _GSM;
  const parsed = _pc(effectiveCostStr);
  const totalMana = parsed.generic + Object.values(parsed.colored).reduce((a,b) => a+b, 0);
  return totalMana === 0;
}
function trinisphereMin(state) {
  const t = state.battlefield.find(p => p.name === 'Trinisphere' && !p.tapped);
  // Also check opponent stax — opponent's Trinisphere is always active (not tapped by you)
  if (t) return 3;
  if (state.opponentStax?.has('Trinisphere')) return 3;
  return 0;
}

/**
 * Cost reductions from permanents like Emerald Medallion.
 * Returns { generic: n, colored: {} } reduction to apply before paying.
 */
function costReductions(state, def) {
  let genericReduction = 0;

  for (const perm of state.battlefield) {
    const permDef = CARDS[perm.cardKey];
    // Emerald Medallion: green spells cost {1} less.
    // A "green spell" is any spell with {G} in its mana cost — colour identity,
    // not card type.  The previous check also included `|| def.types.includes('creature')`
    // which incorrectly discounted colourless creatures.  There are no non-green
    // creatures in this deck today, but the rule must be correct for future cards.
    if (permDef?.costReduction?.color === 'G') {
      const cost = def.cost || '';
      if (cost.includes('G')) {
        genericReduction += permDef.costReduction.amount;
      }
    }
    // [O-31] Defiler of Vigor's reduction is "{G} less ... reduces only the
    // amount of GREEN mana you pay" — NOT generic. Handled separately in
    // effectiveCost via defilerGreenReduction(); do NOT add it here (a generic
    // reduction does nothing for pure-colored costs like {G}, which was the
    // bug — Llanowar Elves stayed {G} instead of dropping to {0}).
    // Nylea, Keen-Eyed: creature spells cost {1} less
    if (perm.name === 'Nylea, Keen-Eyed' && def.types.includes('creature')) {
      genericReduction += 1;
    }
  }
  return genericReduction;
}

/**
 * [O-31] Defiler of Vigor: "As an additional cost to cast green permanent
 * spells, you may pay 2 life. Those spells cost {G} less to cast if you paid
 * life this way. This effect reduces only the amount of green mana you pay."
 * Returns the number of GREEN pips (0 or 1) to remove from the spell's cost.
 * Only once per spell (the ⚖ ruling). Requires Defiler on the battlefield and
 * a green permanent spell that actually has a green pip to reduce.
 */
function defilerGreenReduction(state, def) {
  const isGreenPermanent = def.cost?.includes('G') &&
    (def.types.includes('creature') || def.types.includes('enchantment') ||
     def.types.includes('artifact') || def.types.includes('planeswalker'));
  if (!isGreenPermanent) return 0;
  for (const perm of state.battlefield) {
    if (perm.name === 'Defiler of Vigor') return 1;
  }
  return 0;
}

/**
 * Apply reductions and Trinisphere minimum to a cost string.
 * Returns the effective cost string or null if the card is uncounterable-free.
 */
// Option A: import parseCost once at module level
function effectiveCost(state, def) {
  // ── Ultra-fast path ─────────────────────────────────────────────────────
  // In the vast majority of states (no STAX, no Defiler, no cost reducers)
  // effectiveCost == def.cost.  Detect this in O(1) and return immediately.
  // _hasSTAX is a boolean set on GameState when stax enters the battlefield.
  // defilerActive / costReducerActive are checked via the battlefield array,
  // but only when the cheaper _hasSTAX gate has passed.
  if (!state._hasSTAX) {
    // Check cost reducers (Emerald Medallion, Nylea) and Defiler.
    // These are all rare cards -- in practice this loop almost always exits
    // without finding a match, paying only the iteration cost (~0.05μs).
    let hasReducer = false;
    for (const perm of state.battlefield) {
      if (perm.name === 'Defiler of Vigor' ||
          perm.name === 'Nylea, Keen-Eyed') { hasReducer = true; break; }
      const permDef = CARDS[perm.cardKey];
      if (permDef?.costReduction) { hasReducer = true; break; }
    }
    if (!hasReducer) return def.cost || '0';  // common case: skip all computation
  }

  // Use pre-cached parsed cost (set on def at cards.js load time) — Option A
  const raw = def._parsedCost ?? _parseCost(def.cost);

  // [O-31] Defiler of Vigor removes one GREEN pip (pay 2 life), not generic.
  const greenCut = defilerGreenReduction(state, def);

  // Option B: skip STAX checks when no STAX is on the battlefield
  if (!state._hasSTAX) {
    // Fast path: only check Emerald Medallion cost reduction
    const reduction = costReductions(state, def);
    let generic = Math.max(0, raw.generic - reduction);
    const colored = { ...raw.colored };
    if (greenCut > 0 && colored.G > 0) colored.G = Math.max(0, colored.G - greenCut);
    let costStr = '';
    if (generic > 0) costStr += String(generic);
    for (const [color, amt] of Object.entries(colored)) costStr += color.repeat(amt);
    return costStr || '0';
  }

  // Slow path: STAX present — apply Thorn and Trinisphere checks
  const reduction = costReductions(state, def);
  const thorn = thornTax(state, def);
  let generic = Math.max(0, raw.generic - reduction) + thorn;
  const colored = { ...raw.colored };
  if (greenCut > 0 && colored.G > 0) colored.G = Math.max(0, colored.G - greenCut);
  const coloredTotal = Object.values(colored).reduce((a, b) => a + b, 0);
  const triMin = trinisphereMin(state);
  if (generic + coloredTotal < triMin) generic = triMin - coloredTotal;
  let costStr = '';
  if (generic > 0) costStr += String(generic);
  for (const [color, amt] of Object.entries(colored)) costStr += color.repeat(amt);
  return costStr || '0';
}

// ── Hand-size limit (Magic rule 402.2) ───────────────────────────────────
var MAX_HAND_SIZE = 7;

// ── Forest-tap-dominated creatures (O-38 follow-up) ──────────────────────
// Creatures whose own ability costs {T} and untaps some OTHER permanent for
// free or cheap — that ability almost always dominates a flat generic
// {T}: Add {G} once Ashaya (or similar) makes the creature a Forest too,
// since recovering an existing land's tap (often boosted by Wild Growth /
// Utopia Sprawl) or untapping any permanent is worth at least as much as,
// usually more than, 1 flat green. Skipped by default in the generic
// Forest-tap loop (see below) to cut a rarely-useful branch; `exhaustive`
// mode restores each one for the real edge case where its own ability has
// no legal target (nothing tapped to untap) and would otherwise offer
// nothing that turn. Verified against each card's actual fn() before
// listing it here — every entry requires ≥1 currently-tapped target and
// returns [] otherwise, matching Arbor Elf's original case exactly:
//   arbor_elf               — {T}: untap target Forest
//   magus_of_the_candelabra — {X},{T}: untap X target lands
//   hope_tender             — {1},{T}: untap target land (or exert for two)
//   argothian_elder         — {T}: untap two target lands (fully free)
//   ley_weaver              — {T}: untap two target lands (Argothian
//                             Elder's twin, identical ability)
//   formidable_speaker      — {1},{T}: untap another target permanent
//   saryth                  — {1},{T}: untap another creature or land
//                             (Formidable Speaker's near-twin, narrower
//                             target set)
// None of these 7 are in DEFAULT_DECKLIST except arbor_elf/magus/hope_
// tender/argothian_elder/formidable_speaker; ley_weaver and saryth are
// valid custom-library cards.
//
// This list is the result of an exhaustive pass over EVERY creature in
// cards.js with no native tapForMana but SOME other ability (28 candidates
// total, checked against real oracle text in ref/card_data.md, not just
// code inspection — a prior partial pass missed ley_weaver by scoping to
// DEFAULT_DECKLIST only). The other 21 were checked and correctly excluded:
//   • No {T} in the real cost at all (so the ability and the Forest-tap
//     are independent/additive, not competing for the same tap):
//     Allosaurus Shepherd, Quirion Ranger, Scryb Ranger, Wirewood Symbiote
//     (all share/resemble the no-tap bounce pattern), Temur Sabertooth,
//     Kogla, Ulvenwald Oddity, Endurance, Scavenging Ooze, Outland
//     Liberator, Beastrider Vanguard, Destiny Spinner, Nylea Keen-Eyed,
//     Insidious Fungus.
//   • Has {T} but trades a REAL resource beyond the tap + minor mana, so
//     the tradeoff is situational rather than unconditionally dominant —
//     left as genuine (if usually secondary) options:
//     Elvish Reclaimer (sacrifices a land + pays {2}), Eladamri (taps two
//     OTHER creatures), Fauna Shaman (discards a card), Yisan (pays {2}{G}
//     on top), Skyshroud Poacher (pays {3} for a tutor+deploy, no mana
//     returned), Magus of the Order (sacrifices a creature — an even
//     bigger cost than a discard), Ulvenwald Tracker ({1}{G} for a fight —
//     a combat/removal effect, not value recovery, and can backfire).
var FOREST_TAP_DOMINATED_KEYS = new Set([
  'arbor_elf', 'magus_of_the_candelabra', 'hope_tender',
  'argothian_elder', 'ley_weaver', 'formidable_speaker', 'saryth',
]);

// ── Main action generator ─────────────────────────────────────────────────

function generateActions(state, _presentHint = null, exhaustive = false) {
  const actions = [];

  // ── 0. Loss pruning ──────────────────────────────────────────────────────
  // Never expand a state where you've already lost
  if (state.youLost()) return [];

  // ── 0a. Cleanup-step discard to hand size (CR 514.1) ────────────────────
  // The cleanup discard happens at the END of your turn. It is NOT a free action
  // the solver can take at any time (which would let it discard before playing,
  // showing the discard at the START of the turn in the log). Instead it is
  // sequenced: the player makes all their plays, then takes the `end_turn`
  // action below to enter the cleanup step (state.endingTurn = true). ONLY while
  // in that cleanup step do we offer discards — so a discard is always logged
  // AFTER the turn's plays, immediately before the turn advances.
  //
  // While endingTurn is set, discards are the ONLY actions: emit one per unique
  // card (the solver still CHOOSES which to pitch). The discard that brings the
  // hand to MAX_HAND_SIZE also advances the turn (folds startNewTurn in), so the
  // cleanup → next-turn transition is atomic. Never set on opponent turns.
  if (state.endingTurn) {
    if (state.hand.length > MAX_HAND_SIZE) {
      for (const cardKey of uniqueCards(state.hand)) {
        const def = CARDS[cardKey];
        const cardName = def ? def.name : cardKey;
        // Discard least-valuable first: lower TUTOR_PRIORITY_SCORE → higher priority.
        const cardScore = TUTOR_PRIORITY_SCORE[cardKey] ?? 0;
        const willReachLimit = state.hand.length - 1 <= MAX_HAND_SIZE;
        actions.push({
          type: 'discard_eot',
          label: `Discard ${cardName} to hand size (${state.hand.length} → ${state.hand.length - 1})`,
          priority: 100 - cardScore,
          apply(s) {
            const afterDiscard = s.discardFromHand(cardKey);
            if (!afterDiscard) return null;
            // The discard that reaches the limit advances the turn atomically.
            return willReachLimit ? afterDiscard.startNewTurn() : afterDiscard;
          },
        });
      }
    } else {
      // Already at/under the limit when cleanup began (e.g. exactly 7): just
      // advance the turn — nothing to discard.
      actions.push({
        type: 'pass_turn',
        label: 'End turn (no discard needed)',
        priority: 2,
        apply(s) { return s.startNewTurn(); },
      });
    }
    // In the cleanup step, NO other actions are available.
    actions.sort((a, b) => b.priority - a.priority);
    return actions;
  }

  // [E2] Reuse pre-built present Set from analyzeState when available.
  // Building this Set is O(hand + battlefield) — doing it once per node
  // instead of twice (analyzeState + generateActions) saves ~10-20% per node.
  const _present = _presentHint ?? (() => {
    const p = new Set(state.hand);
    for (const bf of state.battlefield) {
      const ck = NAME_TO_KEY[bf.name];
      if (ck) p.add(ck);
    }
    return p;
  })();

  // ── Yeva flash check ─────────────────────────────────────────────────────
  // When Yeva is on the battlefield, you may cast green creature spells as
  // though they had flash (i.e. at instant speed, including opponent turns).
  // When Emergence Zone has been sacrificed this turn, ALL spells have flash.
  // When it's an opponent's turn (state.isOpponentTurn), only instant-speed
  // actions are available unless Yeva or Emergence Zone grants flash.
  const yevaOnBattlefield = state.hasPermanent('Yeva, Nature\'s Herald');
  const flashThisTurn     = state.flashThisTurn ?? false;
  const isOpponentTurn    = state.isOpponentTurn ?? false;

  // Shang-Chi static: "You may activate abilities of creatures you control as
  // though those creatures had haste."  Active as soon as Shang-Chi is on the
  // battlefield — the static applies even while he himself is summoning-sick.
  const shangChiActive = state.battlefield.some(p => p.cardKey === 'shang_chi');

  /**
   * Returns true if this card can be cast right now given the turn phase.
   * Lands are handled separately. Instants are always ok. Creatures with
   * Yeva's flash grant are ok on opponent turns. Sorceries/enchantments/
   * artifacts require your main phase (not opponent turn), unless
   * Emergence Zone has granted flash this turn.
   */
  function canCastNow(def) {
    if (def.types.includes('instant')) return true;
    if (def.hasFlash) return true;           // innate flash (e.g. Yeva herself)
    if (flashThisTurn) return true;          // Emergence Zone: all spells have flash
    if (isOpponentTurn) {
      // On opponent turn: only instants and Yeva-granted flash for green creatures.
      // Yeva must be ON THE BATTLEFIELD — being in the command zone does not grant
      // flash until she has been cast and resolved. yevaInCommandZone only justifies
      // opening the window (so you can cast Yeva herself, then creatures afterwards).
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
      // Pre-check: skip abilities that would return null in current state
      // (e.g. Force of Vigor free cast only on opponent turn, fetch lands only
      // when targets are in library). This avoids adding dead actions to the list.
      const preCheck = ability.fn(state, cardKey);
      if (preCheck === null || preCheck === undefined) continue;
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
          // isSecondLand: true when this is the second (or later) land entered
          // this turn. Tracked via landsPlayedThisTurn which is incremented here
          // and reset to 0 in startNewTurn(). Previous check `s.landDrops === 0`
          // was always false (outer guard requires landDrops > 0 to reach apply()).
          const isSecondLand = s.landsPlayedThisTurn >= 1;
          let ns = s.removeFromHand(cardKey);
          if (!ns) return null;
          ns = ns.clone();
          ns.landDrops--;
          ns.landsPlayedThisTurn = (ns.landsPlayedThisTurn ?? 0) + 1;

          // Shifting Woodland enters tapped unless there is already a Forest
          // (any permanent with Forest subtype) or Ashaya on the battlefield.
          // Ashaya makes all creatures Forests; Yavimaya gives everything Forest subtype.
          if (cardKey === 'shifting_woodland') {
            const hasForest = s.battlefield.some(p =>
              p.subtypes?.includes('Forest') ||
              p.name === 'Ashaya, Soul of the Wild' ||
              p.name === 'Yavimaya, Cradle of Growth'
            );
            ns = ns.enterBattlefield(cardKey, { tapped: !hasForest });
          } else {
            ns = ns.enterBattlefield(cardKey);
          }
          ns = ns.log(`Play ${def.name}`);

          // ── Landfall triggers ─────────────────────────────────────────────
          // Triggered abilities fire regardless of summoning sickness —
          // the summoningSick guard that was here was incorrect.
          // Note: Shang-Chi's static only grants haste for *activated*
          // abilities, not triggered ones — so it is irrelevant here.
          for (const perm of ns.battlefield) {
            if (perm.name === 'Lotus Cobra') ns = ns.addMana('G');
            if (perm.name === 'Tireless Provisioner') ns = ns.addMana('G');
            if (perm.name === 'Nissa, Resurgent Animist') {
              ns = ns.addMana('G');
              // Second landfall this turn: find an Elf or Elemental from library
              if (isSecondLand) {
                var cards = CARDS;
                let bestKey = null, bestScore = -1;
                for (const ck of ns.players[0].library) {
                  if (ck === 'unknown' || isStax(ck)) continue;
                  const d = cards[ck];
                  if (!d?.types.includes('creature')) continue;
                  if (!d.subtypes?.includes('Elf') && !d.subtypes?.includes('Elemental')) continue;
                  const sc = TUTOR_PRIORITY_SCORE[ck] ?? 0;
                  if (sc > bestScore) { bestKey = ck; bestScore = sc; }
                }
                if (bestKey) {
                  const { state: ns2, cardKey: ck } = ns.searchLibraryFor(k => k === bestKey);
                  if (ck) ns = ns2.addToHand(ck);
                }
              }
            }
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
    if (chaliceBlocks(state, def)) continue;   // Chalice of the Void counters this spell
    if (!canCastNow(def)) continue;   // respect flash/sorcery-speed restrictions
    if (def.canCast && !def.canCast(state)) continue; // card-specific preconditions (e.g. Aura targeting)

    const costStr = effectiveCost(state, def);
    const testPay = state.mana.pay(costStr);
    if (testPay === null) continue;
    if (vexingBaubleBlocks(state, def, costStr)) continue; // Vexing Bauble counters 0-mana spells

    const isCreature   = def.types.includes('creature');
    const isEnchantment = def.types.includes('enchantment');
    const isArtifact   = def.types.includes('artifact');
    const isInstant    = def.types.includes('instant');
    const isSorcery    = def.types.includes('sorcery');

    // Spells that stay on the battlefield (permanents)
    const entersBattlefield = isCreature || isEnchantment || isArtifact;

    // Tutors (castFn): only offer targets that would complete a combo.
    // missingComboCards() returns the keys one card away from any known combo.
    // NAME_TO_KEY O(1) lookups replace per-result O(n) card scans.
    if (def.castFn) {
      const afterPay0 = state.payMana(costStr);
      const fromHand0 = afterPay0?.removeFromHand(cardKey);
      if (fromHand0) {
        const allResults = def.castFn(fromHand0);
        if (allResults && allResults.length > 0) {
            // Removal spells (isRemoval: true) bypass the combo-target filter —
            // they offer all valid targets regardless of combo relevance.
            if (def.isRemoval) {
              for (const r of allResults) {
                actions.push({
                  type: 'cast_spell', label: `Cast ${def.name}: ${r.history[r.history.length-1]?.msg ?? ''}`,
                  apply: (_s) => r,
                });
              }
              continue;
            }

            const needed = missingComboCards(state, _present);

            // [E2] Reuse _present (passed in or built once above) for redundancy
            // checks — eliminates a per-tutor-action Set rebuild.
            // Returns true if fetching this card key is redundant because a
            // functional equivalent is already in hand or on the battlefield.
            function isEquivRedundant(ck) {
              return FUNCTIONAL_EQUIVALENTS.some(
                g => g.has(ck) && [...g].some(m => _present.has(m))
              );
            }

            // Extract fetched card key from a result's last history message.
            // Fast path: check needed keys first. Slow path: full NAME_TO_KEY scan.
            function msgKey(r) {
              const msg = r.history[r.history.length - 1]?.msg ?? '';
              for (const k of needed) {
                if (CARDS[k] && msg.includes(CARDS[k].name)) return k;
              }
              for (const [name, k] of Object.entries(NAME_TO_KEY)) {
                if (msg.includes(name)) return k;
              }
              return null;
            }

            // Filter to combo-completing targets only, excluding redundant equivalents
            const relevant = allResults.filter(r => {
              const k = msgKey(r);
              return k && needed.has(k) && !isEquivRedundant(k);
            });

            // Fallback pool: all results minus redundant equivalents
            const fallback = allResults.filter(r => {
              const k = msgKey(r);
              return k !== null && !isEquivRedundant(k);
            });

            const pool = relevant.length > 0 ? relevant : fallback;
            const sorted = pool.slice().sort((a, b) =>
              (TUTOR_PRIORITY_SCORE[msgKey(b)] ?? 0) -
              (TUTOR_PRIORITY_SCORE[msgKey(a)] ?? 0)
            );

            // Battlefield tutors: 1 action. Hand/topdeck tutors: up to 2.
            const firstMsg = sorted[0]?.history[sorted[0].history.length - 1]?.msg ?? '';
            const isBF = firstMsg.includes('fetch ') || firstMsg.includes('Zenith →');
            const maxBranches = isBF ? 1 : 2;

            for (const resultState of sorted.slice(0, maxBranches)) {
              const msg = resultState.history[resultState.history.length - 1]?.msg ?? `Cast ${def.name}`;
              const spellGoesToGraveyard = (def.types.includes('instant') || def.types.includes('sorcery'))
                && !def.reshufflesIntoLibrary;

              // ── Capture planned decisions for deterministic replay ─────────
              // Extract the fetched card key from the planned result message.
              const plannedTargetKey = msgKey(resultState);

              // For sacrifice-based tutors (EE, Natural Order): detect which creature
              // was sacrificed by comparing planning BF names to result BF names.
              // IDs are not stable across independent GameState constructions, so use name.
              const planBfNames = fromHand0.battlefield.map(p => p.name);
              const resBfNames  = new Set(resultState.battlefield.map(p => p.name));
              const sacName     = planBfNames.find(n => !resBfNames.has(n)) ?? null;
              // Use deterministic fast path when: sac happened AND target enters battlefield.
              const targetOnBf  = plannedTargetKey &&
                resultState.battlefield.some(p => p.cardKey === plannedTargetKey);
              const useFastPath = sacName !== null && targetOnBf;

              actions.push({
                type: 'cast_spell',
                label: msg,
                priority: HOLD_FOR_WIN.has(cardKey) ? 1 : (isCreature ? 9 : 8),
                apply(s) {
                  const ec = effectiveCost(s, def);
                  const afterPay = s.payMana(ec);
                  if (!afterPay) return null;
                  let ns = afterPay.removeFromHand(cardKey);
                  if (!ns) return null;

                  // ── Deterministic fast path for sacrifice-BF tutors ────────
                  // Replay the exact sacrifice + fetch without re-running castFn,
                  // so library shuffle order cannot affect the outcome.
                  if (useFastPath && plannedTargetKey) {
                    const sacPerm = ns.battlefield.find(p => p.name === sacName);
                    if (sacPerm) {
                      ns = ns.removeFromBattlefield(sacPerm.id, 'graveyard') ?? ns;
                    }
                    const { state: afterSearch, cardKey: found } =
                      ns.searchLibraryFor(k => k === plannedTargetKey);
                    if (found) {
                      let result = afterSearch.enterBattlefield(found);
                      if (spellGoesToGraveyard) result = result.addToGraveyard(0, def.name);
                      if (def.reshufflesIntoLibrary) result = result.addToLibrary(cardKey);
                      return result.log(msg);
                    }
                    // Target not in library — fall through to standard path
                    ns = afterPay.removeFromHand(cardKey) ?? ns; // reset ns (before sac)
                  }

                  // ── Standard path: re-run castFn and match by message ──────
                  const res = def.castFn(ns);
                  if (!res || res.length === 0) return null;
                  const matched = res.find(r =>
                    (r.history[r.history.length-1]?.msg ?? '') === msg
                  );
                  let result = matched ?? smartTutorTarget(s, res);
                  if (result && spellGoesToGraveyard) {
                    result = result.addToGraveyard(0, def.name);
                  }
                  if (result && def.reshufflesIntoLibrary) {
                    result = result.addToLibrary(cardKey);
                  }
                  return result;
                },
              });
          } // for resultState
        } // if allResults
      } // if fromHand0
      continue;
    }

    actions.push({
      type: 'cast_spell',
      label: `Cast ${def.name} {${costStr}}`,
      // HOLD_FOR_WIN cards get priority 1 (below pass-turn at 2) — the solver
      // will explore every other action first, preserving these for win assembly.
      priority: HOLD_FOR_WIN.has(cardKey) ? 1 : (isCreature ? 9 : 8),
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
        // NOTE: "Cast X" is logged AFTER all triggers (Beast Whisperer draw,
        // Topiary Lecturer, onEnter ETB effects, etc.) so it ends up as the
        // LAST history entry for this state transition. printResult displays
        // the last entry as the primary [N] step and all preceding entries as
        // ↳ sub-lines -- so "Cast Badgermole Cub" shows as the main step with
        // "Badgermole Cub ETB: earthbend..." as the ↳, not the reverse.

        // ── On-cast / on-enter triggers ────────────────────────────────────

        // Glademuse: "Whenever a player casts a spell, if it's not that player's
        // turn, that player draws a card."
        // WE draw when WE cast on an opponent's turn (requires flash via Yeva /
        // Emergence Zone). Checked on the pre-cast state (s) so casting Glademuse
        // itself does not trigger — it wasn't on the battlefield when cast.
        if (isOpponentTurn && s.hasPermanent('Glademuse')) {
          ns = ns.playerDraws(0, 1);
          ns = ns.log('Glademuse: you cast on opponent\'s turn → draw 1');
        }

        // Beast Whisperer: draw a card when you cast a creature spell.
        // Triggered ability — fires regardless of summoning sickness.
        // IMPORTANT: check s (pre-cast state), not ns. Beast Whisperer's own
        // cast must NOT trigger itself — it wasn't on the battlefield when you
        // cast it (it only enters during resolution). Using ns.hasPermanent
        // would incorrectly draw a card when BW itself is cast. This mirrors
        // the pre-cast snapshot pattern used by Topiary Lecturer above.
        if (isCreature && s.hasPermanent('Beast Whisperer')) {
          ns = ns.playerDraws(0, 1);
          ns = ns.log('Beast Whisperer: draw a card');
        }

        // Topiary Lecturer — Increment trigger:
        // Whenever you cast a spell, if mana spent > this creature's power or toughness,
        // put a +1/+1 counter on it (increases both power and toughness).
        // "Mana spent" = the effective CMC of the spell just cast.
        // NOTE: We snapshot Lecturer IDs from the PRE-CAST state (s) so that casting
        // Topiary Lecturer itself does NOT trigger Increment on itself — it isn't on the
        // battlefield yet when the spell is cast (it enters during resolution).
        {
          const precastLecturerIds = new Set(
            s.battlefield
              .filter(p => p.name === 'Topiary Lecturer')
              .map(p => p.id)
          );
          const lecturers = ns.battlefield.filter(p => precastLecturerIds.has(p.id));
          if (lecturers.length > 0) {
            const parsed   = parseCost(effectiveCost(s, def));
            const manaSpent = parsed.generic +
              Object.values(parsed.colored).reduce((a, b) => a + b, 0);
            // Own the battlefield BEFORE mutating — calling ns.log() inside the loop
            // would create a COW-shared battlefield, and subsequent iterations would
            // mutate the shared array, corrupting both the pre-log and post-log states.
            // Instead: own once, mutate all lecturers, then emit a single log line.
            ns._ensureBF();
            const incremented = [];
            for (const lec of ns.battlefield.filter(p => precastLecturerIds.has(p.id))) {
              const threshold = Math.min(lec.power || 1, lec.toughness || 1);
              if (manaSpent > threshold) {
                lec.power     = (lec.power     || 1) + 1;
                lec.toughness = (lec.toughness || 1) + 1;
                incremented.push(`${lec.name} → ${lec.power}/${lec.toughness}`);
              }
            }
            if (incremented.length > 0) {
              ns = ns.log(`Topiary Lecturer Increment: ${incremented.join(', ')}`);
            }
          }
        }

        // Guardian Project: draw when unique creature enters.
        // This is an ETB trigger (fires after the creature enters), so checking
        // ns (post-enter state) is correct. Guardian Project is an enchantment
        // so it can never be the creature entering -- no self-cast issue.
        // TODO: uniqueness clause ("doesn't share a name with another creature
        // you control or in graveyard") is not currently enforced.
        if (isCreature && ns.hasPermanent('Guardian Project')) {
          ns = ns.playerDraws(0, 1);
          ns = ns.log('Guardian Project: draw a card');
        }

        // Primordial Sage: whenever you cast a creature spell, you may draw a card.
        // Cast trigger -- check s (pre-cast state) so Primordial Sage's own cast
        // does NOT draw a card (it wasn't on the battlefield when you cast it).
        if (isCreature && s.hasPermanent('Primordial Sage')) {
          ns = ns.playerDraws(0, 1);
          ns = ns.log('Primordial Sage: draw a card');
        }

        // Soul of the Harvest: whenever another nontoken creature you control enters, draw a card.
        // Triggered ability — fires regardless of summoning sickness.
        // The entering creature must be nontoken. Soul itself doesn't trigger on its own ETB.
        if (isCreature && ns.hasPermanent('Soul of the Harvest')) {
          const entered = ns.battlefield[ns.battlefield.length - 1];
          if (entered && entered.name !== 'Soul of the Harvest' && !entered.isToken) {
            ns = ns.playerDraws(0, 1);
            ns = ns.log('Soul of the Harvest: draw a card');
          }
        }

        // Lifecrafter's Bestiary: whenever you cast a creature spell, you may pay {G} → draw.
        // Cast trigger -- check s (pre-cast state) for consistency and correctness.
        // Bestiary is an artifact so it can't self-cast as a creature, but s is
        // the semantically correct pre-cast state for a 'when you cast' trigger.
        if (isCreature && s.hasPermanent("Lifecrafter's Bestiary")) {
          const paid = ns.payMana('G');
          if (paid) {
            ns = paid.playerDraws(0, 1);
            ns = ns.log("Lifecrafter's Bestiary: pay {G} → draw a card");
          }
        }

        // Defiler of Vigor: whenever you cast a green permanent spell,
        // put a +1/+1 counter on EACH creature you control.
        // The {G} cost reduction (pay 2 life instead) is handled in costReductions();
        // here we deduct the 2-life additional cost from life total.
        const _isGreenPerm = def.cost?.includes('G') &&
          (def.types.includes('creature') || def.types.includes('enchantment') ||
           def.types.includes('artifact') || def.types.includes('planeswalker'));
        if (ns.hasPermanent('Defiler of Vigor') && _isGreenPerm) {
          ns.life -= 2;
          ns = ns.log(`Defiler of Vigor: pay 2 life for {G} reduction (life: ${ns.life})`);
          ns._ensureBF();
          for (const p of ns.battlefield) {
            if (p.types.includes('creature')) {
              p.power     = (p.power     || 0) + 1;
              p.toughness = (p.toughness || 0) + 1;
            }
          }
          ns = ns.log('Defiler of Vigor: +1/+1 counter on each creature');
        }

        // onEnter hook: Auras and cards with immediate resolution effects.
        // Called here so its ETB log entries appear BEFORE the final "Cast X"
        // entry -- making them ↳ sub-lines in printResult's step display.
        if (entersBattlefield && def.onEnter && typeof def.onEnter === 'function') {
          const entered = ns.getPermanent(def.name);
          const after = def.onEnter(ns, entered);
          // onEnter may return a single state, an array of branching states, or null.
          // The cast_spell action must return a single state — take the first branch.
          // Cards that need full branching (Growing Rites, Disciple) use castFn instead.
          if (after) ns = Array.isArray(after) ? after[0] : after;
        }

        // Surrak and Goreclaw: nontoken creatures entering get haste (summoningSick = false).
        // ns may be the result of onEnter returning a log() state — COW-shared battlefield.
        // Must call _ensureBF() before mutating to avoid writing through the shared array.
        if (isCreature && ns.hasPermanent('Surrak and Goreclaw')) {
          ns._ensureBF();
          const entered = ns.battlefield[ns.battlefield.length - 1];
          if (entered && entered.name !== 'Surrak and Goreclaw') {
            entered.summoningSick = false;
          }
        }

        // "Cast X" logged last -- becomes the primary [N] step in printResult.
        // All earlier entries (ETB effects, draw triggers, etc.) appear as ↳.
        ns = ns.log(`Cast ${def.name}`);

        return ns;
      },
    });
  }

  // ── 3b. Cast from graveyard via Harmonize ────────────────────────────────
  // Harmonize oracle: {X}{G}{G}{G}{G} — cast this card from your graveyard.
  // You may tap a creature to reduce generic cost by its power. Exile on resolution.
  //
  // Cards with Harmonize: Nature's Rhythm.
  // In the solver we model Harmonize as a straight {X}{G}{G}{G}{G} cast
  // (same castFn as from hand) that removes the card from the graveyard and
  // exiles it (rather than going to graveyard again). The power-reduction
  // tapping is not modelled — with infinite mana it's never needed, and
  // without infinite mana the generic budget is too small to matter.
  {
    const HARMONIZE_CARDS = { "Nature's Rhythm": 'natures_rhythm' };
    const gy = state.players?.[0]?.graveyard ?? [];
    for (const cardName of gy) {
      const cardKey = HARMONIZE_CARDS[cardName];
      if (!cardKey) continue;
      const def = CARDS[cardKey];
      if (!def?.castFn) continue;
      // Harmonize cost is {X}{G}{G}{G}{G}; base = 4G, X from remaining mana.
      const baseCost = 'GGGG';
      const afterPay = state.payMana(baseCost);
      if (!afterPay) continue;
      // Remove from graveyard before resolving (player index 0 = you)
      const afterGY = afterPay.exileFromGraveyard(0, cardName);
      if (!afterGY) continue;
      const allResults = def.castFn(afterGY);
      for (const ns of allResults) {
        if (!ns) continue;
        actions.push({
          type:     'harmonize',
          label:    `Harmonize ${cardName} from graveyard`,
          priority: 75,
          apply(_s) {
            const ap = _s.payMana(baseCost); if (!ap) return null;
            const ag = ap.exileFromGraveyard(0, cardName); if (!ag) return null;
            const results2 = def.castFn(ag);
            return results2[0] ?? null;
          },
        });
        break; // one action per card (castFn picks the best target)
      }
    }
  }

  // ── 3c. Graveyard activated abilities (e.g. Eternalize) ──────────────────
  {
    const gy = state.players?.[0]?.graveyard ?? [];
    const seenGY = new Set();
    for (const cardName of gy) {
      if (seenGY.has(cardName)) continue; seenGY.add(cardName);
      const key = NAME_TO_KEY[cardName];
      const def = key ? CARDS[key] : null;
      if (!def?.graveyardAbilities) continue;
      for (const [, ability] of Object.entries(def.graveyardAbilities)) {
        actions.push({
          type:     'graveyard_ability',
          label:    `${cardName} (GY): ${ability.label}`,
          priority: 40,
          apply(_s) {
            const results = ability.fn(_s, cardName);
            if (!results || results.length === 0) return null;
            return results[0];
          },
        });
      }
    }
  }

  // ── Disruptor Flute: named card's activated abilities cost {3} more ─────────
  // Built here (before section 4) because mana abilities in section 4 are also
  // activated abilities and should be taxed when the named card is targeted.
  const fluteNamedCards = new Set();
  for (const p of state.battlefield) {
    if (p.name === 'Disruptor Flute' && p.namedCard) fluteNamedCards.add(p.namedCard);
  }
  for (const entry of (state.opponentStax ?? [])) {
    if (entry.startsWith('Disruptor Flute@')) {
      fluteNamedCards.add(entry.slice('Disruptor Flute@'.length).trim());
    }
  }

  // ── 4. Tap permanents for mana ────────────────────────────────────────────
  // [perf] Symmetry-breaking dedup: when N permanents are completely
  // state-identical (same card, same tap/sick/counters/aura status — most
  // commonly multiple untapped basic Forests), tapping any one of them
  // produces a fingerprint-identical resulting state (fingerprint() sorts
  // battlefield segments, so "Forest#1 tapped" == "Forest#2 tapped"). Without
  // this, generateActions emits N separate actions and DFS explores all N as
  // distinct branches before dedup catches the convergence one level down —
  // for N identical untapped lands that's O(N!) redundant paths through the
  // same eventual states. Only applied to the single-result fast path; the
  // multi-option branch (Fanatic ferocious, Nykthos devotion) is left alone
  // since per-instance differences there are exactly the point.
  const _seenTapSignatures = new Set();
  function _tapSignature(p) {
    // Mirrors the "fast path" fields in GameState.fingerprint() — the set of
    // fields that can make two same-cardKey permanents behave differently.
    if (p.enchantedLandId !== undefined || p.elvishGuidance || p.imprintedColor !== undefined ||
        p.cauldronAbilityKey !== undefined || p.copyKey !== undefined ||
        (p.levelCounters && p.levelCounters !== 0) || p.namedCard !== undefined || p.luckCounter) {
      return null; // has a distinguishing field — never dedup, always emit its own action
    }
    // [audit] fingerprint() also distinguishes permanents by power / toughness /
    // isForest. Omitting them here let two same-cardKey mana creatures with
    // DIFFERENT power (e.g. a Vines-of-Vastwood-pumped Marwyn vs an unpumped
    // copy) collapse to one tap action, skipping a state the fingerprint treats
    // as distinct. Latent on the default decklist (no tapForMana creature has
    // >1 copy) but reachable with custom libraries, and power-gated mana output
    // (Marwyn/Topiary) plus power-gated combos depend on it. Fold these into the
    // signature (rather than bailing) so equal-P/T/animation perms still dedup
    // while differing ones each get their own action.
    const powKey = (p.power !== undefined ? p.power : '') + '/' +
                   (p.toughness !== undefined ? p.toughness : '');
    const forestKey = p.isForest ? 'F' : '';
    const countersKey = (p.counters && Object.keys(p.counters).some(k => p.counters[k]))
      ? JSON.stringify(p.counters) : '';
    const usedKey = (p.abilitiesUsed && Object.keys(p.abilitiesUsed).some(k => p.abilitiesUsed[k]))
      ? JSON.stringify(p.abilitiesUsed) : '';
    return `${p.cardKey}:${p.tapped}:${p.summoningSick}:${powKey}:${forestKey}:${countersKey}:${usedKey}`;
  }

  // Quest for Renewal: when a non-attacking creature taps for mana, add a quest counter.
  // We add the counter whenever a creature tapForMana fires on YOUR turn.
  // Declared here (function scope, not inside either tap-for-mana loop below)
  // so it's always defined — a block-scoped `function` declared inside a
  // `for` loop only becomes callable elsewhere in this function if some
  // iteration of that specific loop actually runs far enough to execute the
  // declaration (Annex B hoisting is conditional on that), which isn't
  // guaranteed (e.g. a board with only Forest-fallback creatures and no
  // card with a native tapForMana never reaches such a declaration in the
  // first loop, leaving the second loop's calls to throw ReferenceError).
  function addQuestCounter(ns) {
    if (ns.isOpponentTurn) return ns;
    if (!ns.hasPermanent('Quest for Renewal')) return ns;
    const questPerm = ns.getPermanent('Quest for Renewal');
    if (!questPerm) return ns;
    ns = ns.clone(); ns._ensureBF();
    const live = ns.getPermanentById(questPerm.id);
    if (!live) return ns;
    live.counters = { ...live.counters, quest: (live.counters?.quest ?? 0) + 1 };
    return ns;
  }

  // Shared bonus-application helper (Leyline, Badgermole, Auras) — see note above.
  function applyTapBonuses(ns, live) {
    // Use live.is('creature') rather than def.types.includes('creature') so
    // that dynamically-animated creature-lands (e.g. Gaea's Cradle after
    // Badgermole's ETB earthbend) correctly receive Leyline/Badgermole bonuses.
    // def.types is the static card definition captured at action-generation
    // time — it won't reflect runtime type changes like earthbend animation.
    if (live.is('creature')) {
      if (ns.hasPermanent('Leyline of Abundance')) ns = ns.addMana('G');
      if (ns.hasPermanent('Badgermole Cub') && live.name !== 'Badgermole Cub') ns = ns.addMana('G');
    }
    if (live.types.includes('land')) {
      const sprawl = ns.battlefield.find(p => p.cardKey === 'utopia_sprawl' && p.enchantedLandId === live.id);
      if (sprawl) ns = ns.addMana('G');
      const wildG = ns.battlefield.find(p => p.cardKey === 'wild_growth' && p.enchantedLandId === live.id);
      if (wildG) ns = ns.addMana('G');
      if (live.elvishGuidance) {
        const elfCount = ns.battlefield.filter(p => p.subtypes?.includes('Elf')).length;
        for (let i = 0; i < elfCount; i++) ns = ns.addMana('G');
      }
    }
    return ns;
  }

  for (const perm of state.battlefield) {
    if (perm.tapped) continue;
    const def = CARDS[perm.cardKey];
    if (!def?.tapForMana) continue;

    // Null Rod / Collector Ouphe suppresses artifact mana abilities
    if (def.types.includes('artifact') && artifactAbilitiesSuppressed(state)) continue;

    // Disruptor Flute: if this creature's name is targeted, its tap-for-mana
    // ability (an activated ability) costs {3} more. Skip if we can't afford it.
    if (fluteNamedCards.has(perm.name) && !state.payMana('3')) continue;

    // Creatures with tap-for-mana need to not be summoning sick —
    // UNLESS Shang-Chi is active (grants haste for creature activated abilities).
    // CR 302.6 restricts a CREATURE's tap/untap activated abilities regardless of
    // which characteristic (creature side or land side) actually grants the
    // ability — the restriction keys off the permanent being a creature, not off
    // the ability's source. Real-table rulings confirm this for Dryad Arbor:
    // haste-granting effects (Concordant Crossroads, etc.) let it tap for mana
    // the turn it enters. Shang-Chi's "activate abilities of creatures... as
    // though they had haste" applies the same way for ability activation (it's
    // narrower than full haste only in that it doesn't grant haste to ATTACK).
    // So this single check covers Dryad Arbor, Quirion/Scryb Ranger-as-Forest
    // (under Ashaya), and any other creature-land uniformly — no card-specific
    // carve-out needed.
    if (def.types.includes('creature') && perm.summoningSick && !shangChiActive) continue;

    // Pre-check: get all mana options now. Most cards return exactly 1 result.
    // Some (Fanatic ferocious, Nykthos devotion) return multiple — generate one
    // action per option so the solver can independently explore each branch.
    // When Shang-Chi is active and the creature is sick, clear sickness for the
    // pre-check so simpleTap and other tapForMana fns don't bail out early.
    const permForPreCheck = (shangChiActive && perm.summoningSick && def.types.includes('creature'))
      ? Object.assign(Object.create(Object.getPrototypeOf(perm)), perm, { summoningSick: false })
      : perm;
    const preResults = def.tapForMana(state, permForPreCheck);
    if (!preResults.length) continue;

    // [perf] Symmetry-breaking check (single-result case only — see comment above).
    if (preResults.length === 1) {
      const sig = _tapSignature(perm);
      if (sig !== null) {
        if (_seenTapSignatures.has(sig)) continue; // identical to an already-emitted permanent — skip
        _seenTapSignatures.add(sig);
      }
    }

    if (preResults.length === 1) {
      // Common case: single option — one action, no label disambiguation needed.
      actions.push({
        type: 'tap_for_mana',
        label: `Tap ${perm.name} for mana`,
        priority: 7,
        apply(s) {
          const live = s.getPermanentById(perm.id);
          if (!live || live.tapped) return null;
          // Disruptor Flute: pay {3} extra for named creature's activated ability
          const flutedNames = new Set();
          for (const p of s.battlefield) if (p.name === 'Disruptor Flute' && p.namedCard) flutedNames.add(p.namedCard);
          for (const entry of (s.opponentStax ?? [])) if (entry.startsWith('Disruptor Flute@')) flutedNames.add(entry.slice(16).trim());
          if (flutedNames.has(live.name)) { const paid = s.payMana('3'); if (!paid) return null; s = paid; }
          // Shang-Chi active = simply present on battlefield (sickness irrelevant)
          const scActive = s.battlefield.some(p => p.cardKey === 'shang_chi');
          if (live.is('creature') && live.summoningSick && !scActive) return null;
          const liveForAbil = (scActive && live.summoningSick && live.is('creature'))
            ? Object.assign(Object.create(Object.getPrototypeOf(live)), live, { summoningSick: false })
            : live;
          const results = def.tapForMana(s, liveForAbil);
          if (!results.length) return null;
          return addQuestCounter(applyTapBonuses(results[0], live));
        },
      });
    } else {
      // Multi-option case (ferocious, devotion variants, etc.): one action per result.
      for (let ri = 0; ri < preResults.length; ri++) {
        const resultIndex = ri;
        const optionMsg = preResults[ri].history[preResults[ri].history.length - 1]?.msg ?? `option ${ri}`;
        actions.push({
          type: 'tap_for_mana',
          label: `Tap ${perm.name} for mana: ${optionMsg}`,
          priority: 7,
          apply(s) {
            const live = s.getPermanentById(perm.id);
            if (!live || live.tapped) return null;
            const flutedNames = new Set();
            for (const p of s.battlefield) if (p.name === 'Disruptor Flute' && p.namedCard) flutedNames.add(p.namedCard);
            for (const entry of (s.opponentStax ?? [])) if (entry.startsWith('Disruptor Flute@')) flutedNames.add(entry.slice(16).trim());
            if (flutedNames.has(live.name)) { const paid = s.payMana('3'); if (!paid) return null; s = paid; }
            const scActive = s.battlefield.some(p => p.cardKey === 'shang_chi');
            if (live.is('creature') && live.summoningSick && !scActive) return null;
            const liveForAbil = (scActive && live.summoningSick && live.is('creature'))
              ? Object.assign(Object.create(Object.getPrototypeOf(live)), live, { summoningSick: false })
              : live;
            const results = def.tapForMana(s, liveForAbil);
            if (resultIndex >= results.length) return null;
            return addQuestCounter(applyTapBonuses(results[resultIndex], live));
          },
        });
      }
    }
  }

  // ── 4a-bis. Generic Forest mana ability for creatures made into Forests ────
  // A land that's a Forest has the intrinsic "{T}: Add {G}" ability (see
  // Ashaya's own reminder text). When an effect (Ashaya, Yavimaya) makes a
  // creature into a Forest in addition to its other types, that creature
  // gains this ability too — independent of whatever its own card text says.
  // This loop only fires for creatures with NO native tapForMana of their
  // own (Priest of Titania etc. already have a strictly-at-least-as-good
  // mana ability, so the redundant Forest option isn't worth the extra
  // branching — a rare 0-output edge case is left uncovered as a deliberate
  // tradeoff). This covers Ashaya herself (she makes herself a Forest too),
  // Badgermole Cub, Quirion/Scryb Ranger, and any other vanilla-ish body.
  // Summoning sickness is gated the same way as any creature ability —
  // bypassed by Shang-Chi et al, per CR 302.6 (see note above).
  for (const perm of state.battlefield) {
    if (perm.tapped) continue;
    if (!perm.isForest) continue;
    if (perm.cardKey === 'shang_chi') continue; // his own mana is deliberately unmodeled (O-27) — don't reopen it via a Forest backdoor
    const def = CARDS[perm.cardKey];
    if (!def) continue;
    if (def.tapForMana) continue;             // has its own (at-least-as-good) mana ability
    if (def.types.includes('land')) continue; // already an intrinsic land — handled above
    if (!def.types.includes('creature')) continue;

    // Skip creatures whose own {T}-costed ability dominates this flat
    // fallback (see FOREST_TAP_DOMINATED_KEYS above for the full rationale
    // and the list of verified cases). Heuristic, not a hard rule —
    // `exhaustive` mode restores each one for its no-legal-target edge case.
    if (FOREST_TAP_DOMINATED_KEYS.has(perm.cardKey) && !exhaustive) continue;

    // Disruptor Flute: if this creature's name is targeted, its tap-for-mana
    // ability (an activated ability, same as any other) costs {3} more.
    // Skip if we can't afford it. Same prefilter as the native-tapForMana
    // loop above — this ability is granted by being a Forest, but it's
    // still an activated ability "of" this named source (CR/Flute wording
    // doesn't distinguish land-granted vs creature-granted abilities).
    if (fluteNamedCards.has(perm.name) && !state.payMana('3')) continue;

    if (perm.summoningSick && !shangChiActive) continue;

    actions.push({
      type: 'tap_for_mana',
      label: `Tap ${perm.name} for mana (Forest)`,
      priority: 7,
      apply(s) {
        const live = s.getPermanentById(perm.id);
        if (!live || live.tapped) return null;
        // Disruptor Flute: pay {3} extra for named creature's activated ability
        // (rebuilt from the live state — see note on the native-mana loop above).
        const flutedNames = new Set();
        for (const p of s.battlefield) if (p.name === 'Disruptor Flute' && p.namedCard) flutedNames.add(p.namedCard);
        for (const entry of (s.opponentStax ?? [])) if (entry.startsWith('Disruptor Flute@')) flutedNames.add(entry.slice(16).trim());
        if (flutedNames.has(live.name)) { const paid = s.payMana('3'); if (!paid) return null; s = paid; }
        const scActive = s.battlefield.some(p => p.cardKey === 'shang_chi');
        if (live.summoningSick && !scActive) return null;
        let ns = s.tapPermanent(live.id);
        if (!ns) return null;
        ns = ns.addMana('G').log(`Tap ${live.name} → {G} (Forest)`);
        return addQuestCounter(applyTapBonuses(ns, live));
      },
    });
  }

  // ── 4b. Agatha's Soul Cauldron — grafted activated abilities ────────────────
  // When Agatha's Cauldron exiles a creature, it sets cauldronAbilityKey on the
  // creature that received the +1/+1 counter. All creatures with +1/+1 counters

  // (counters > 0) that have a cauldronAbilityKey get to use that card's
  // tapForMana as an additional tap action.
  //
  // Most combo-relevant case: exile Priest of Titania → countered creatures
  // tap for G×elves instead of their base mana ability.
  //
  // Only fires if Agatha's Cauldron is on the battlefield (the static requires it).
  if (state.hasPermanent("Agatha's Soul Cauldron")) {
    for (const perm of state.battlefield) {
      // Shang-Chi grants haste for creature activated abilities — bypass sickness
      if (perm.tapped || (perm.summoningSick && !shangChiActive)) continue;
      if (!perm.cauldronAbilityKey) continue;
      // Cauldron grants abilities to creatures with +1/+1 counters
      const hasCounter = perm.counters && (
        typeof perm.counters === 'number' ? perm.counters > 0
          : Object.values(perm.counters).some(v => v > 0)
      );
      if (!hasCounter) continue;
      const graftedDef = CARDS[perm.cauldronAbilityKey];
      if (!graftedDef?.tapForMana) continue;
      // Pre-check: grafted ability actually produces mana in current state
      // Use a sickness-cleared perm for the pre-check when Shang-Chi is active
      const permForCheck = (shangChiActive && perm.summoningSick)
        ? Object.assign(Object.create(Object.getPrototypeOf(perm)), perm, { summoningSick: false })
        : perm;
      if (!graftedDef.tapForMana(state, permForCheck).length) continue;

      const capturedPerm = perm;
      const capturedGraftedDef = graftedDef;
      actions.push({
        type: 'tap_for_mana',
        label: `Tap ${perm.name} for mana (${graftedDef.name} ability via Cauldron)`,
        priority: 7,
        apply(s) {
          const live = s.getPermanentById(capturedPerm.id);
          if (!live || live.tapped) return null;
          // Shang-Chi active = simply present (sickness does not matter)
          const scNowActive = s.battlefield.some(p => p.cardKey === 'shang_chi');
          if (live.summoningSick && !scNowActive) return null;
          const liveForAbil = (scNowActive && live.summoningSick)
            ? Object.assign(Object.create(Object.getPrototypeOf(live)), live, { summoningSick: false })
            : live;
          const results = capturedGraftedDef.tapForMana(s, liveForAbil);
          if (!results.length) return null;
          let ns = results[0];
          // Leyline / Badgermole bonuses apply to creature tap-for-mana
          if (ns.hasPermanent('Leyline of Abundance')) ns = ns.addMana('G');
          if (ns.hasPermanent('Badgermole Cub') && capturedPerm.name !== 'Badgermole Cub') {
            ns = ns.addMana('G');
          }
          return ns;
        },
      });
    }
  }

  // ── 5. Activated abilities ────────────────────────────────────────────────
  // (fluteNamedCards already built above before section 4)

  for (const perm of state.battlefield) {
    const def = CARDS[perm.cardKey];
    if (!def?.abilities) continue;

    // Null Rod / Collector Ouphe / Titania's Song: suppress ALL artifact activated abilities
    if (def.types.includes('artifact') && artifactAbilitiesSuppressed(state)) continue;

    // Disruptor Flute: abilities of the named permanent cost {3} more.
    // We model this as: if this permanent's name is named by Flute, skip the ability
    // unless the state has at least {3} extra mana above the ability's own cost.
    // Simpler model: mark abilities of named permanents as "costs {3} extra" by
    // pre-checking whether payMana('3') would succeed alongside the ability's own cost.
    const fluteBlocked = fluteNamedCards.has(perm.name);

    for (const [abilKey, ability] of Object.entries(def.abilities)) {
      // Once-per-turn abilities: skip if already used this turn
      if (perm.abilitiesUsed?.[abilKey]) continue;

      if (typeof ability.fn !== 'function') continue;

      // Shang-Chi static: creatures may activate abilities as though they had haste.
      // Pass a cloned perm with summoningSick=false so ability fns see no sickness.
      // Only applies to creature permanents (not artifacts, enchantments, etc.).
      let permForAbility = perm;
      if (shangChiActive && def.types.includes('creature') && perm.summoningSick) {
        permForAbility = Object.create(Object.getPrototypeOf(perm));
        Object.assign(permForAbility, perm);
        permForAbility.summoningSick = false;
      }

      // Disruptor Flute: pre-pay the extra {3} before running the ability fn
      let preState = state;
      if (fluteBlocked) {
        const afterFlute = state.payMana('3');
        if (!afterFlute) continue; // can't afford the Flute tax
        preState = afterFlute;
      }

      const raw = ability.fn(preState, permForAbility);
      const results = raw === null || raw === undefined
        ? []
        : Array.isArray(raw) ? raw : [raw];

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (!result) continue;

        // Mark once-per-turn abilities as used in the result state
        const oncePerTurn = ability.label?.includes('once per turn') ||
                            ability.label?.includes('Activate only once');

        // Capture everything needed for deterministic replay at apply-time.
        // We capture abilKey, perm.id, fluteBlocked, and the result index (i)
        // so apply(_s) can re-run from the live state rather than returning
        // the stale planning result.  The planning result is kept only for
        // label extraction (history message).
        //
        // Bug C fix: previously `apply(_s)` returned `result` directly (a
        // state built from the planning-time `preState = state.payMana('3')`).
        // If apply() is ever called with a different mana pool than generation
        // (BFS, REPL, or any future multi-pass use), the Flute tax payment
        // would reflect the wrong pool.  Re-running from _s is correct and
        // costs negligible overhead since ability.fn() is cheap.
        const capturedAbilKey  = abilKey;
        const capturedPermId   = perm.id;
        const capturedFluteBlk = fluteBlocked;
        const capturedIdx      = i;
        const capturedOPT      = oncePerTurn;

        actions.push({
          type: 'ability',
          label: `${perm.name}: ${ability.label ?? abilKey}` +
                 (results.length > 1 ? ` [opt ${i + 1}/${results.length} : ${result.history.at(-1).msg}]` : ''),
          priority: 6,
          apply(_s) {
            // Re-pay Flute tax from live state if required.
            let liveState = _s;
            if (capturedFluteBlk) {
              liveState = _s.payMana('3');
              if (!liveState) return null;
            }
            // Re-run the ability fn from the live state.
            // Each ability.fn enforces its own guards (tapped, summoningSick, abilitiesUsed).
            // We must NOT add an outer summoningSick check here — some non-tap abilities
            // (e.g. Quirion Ranger bounce) work while the creature is sick, and a blanket
            // guard would silently block them (regression: lost the T2 Thorn solution).
            // The only exception: Shang-Chi bypasses sickness for ALL creature abilities.
            // Mirror the same bypass that action-generation applies at planning time.
            const livePerm = liveState.getPermanentById(capturedPermId);
            if (!livePerm) return null;
            const scLive = liveState.battlefield.some(p => p.cardKey === 'shang_chi');
            const livePermForAbil = (scLive && livePerm.summoningSick && def.types.includes('creature'))
              ? Object.assign(Object.create(Object.getPrototypeOf(livePerm)), livePerm, { summoningSick: false })
              : livePerm;
            const liveRaw = ability.fn(liveState, livePermForAbil);
            const liveResults = liveRaw === null || liveRaw === undefined
              ? [] : Array.isArray(liveRaw) ? liveRaw : [liveRaw];
            const liveResult = liveResults[capturedIdx] ?? null;
            if (!liveResult) return null;
            if (!capturedOPT) return liveResult;
            // once-per-turn: mark the ability used on the perm in the result state.
            // (Many ability fns already call markAbilityUsed internally; this is
            // belt-and-suspenders for any that rely on the outer marking only.)
            const ns = liveResult.clone();
            ns._ensureBF();
            const lp = ns.getPermanentById(capturedPermId);
            if (lp) lp.abilitiesUsed = { ...lp.abilitiesUsed, [capturedAbilKey]: true };
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

    // Parse base cost and add the commander tax as additional generic mana.
    // Use the module-level _parseCost (already imported at top of file) instead
    // of re-calling require() on every generateActions() invocation.
    const parsed = _parseCost(baseCost);
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
        const p2 = _parseCost(def.cost ?? '0');
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
        // Log cast last so it is the primary [N] step (any ETB effects are ↳ sub-lines)
        ns = ns.log(`Cast ${def.name} from command zone`);
        return ns;
      },
    });
  }

  // ── 6. Pass turn / opponent turn ─────────────────────────────────────────
  // On your turn: you can pass to start the next turn, OR (if Yeva is
  // available) pass to an opponent's end step to cast flash spells.
  //
  // The cleanup discard (CR 514.1) is sequenced AT THE END of your turn. When
  // you choose to end your turn (pass_turn):
  //   • hand ≤ MAX_HAND_SIZE → advance to the next turn directly.
  //   • hand > MAX_HAND_SIZE  → enter the cleanup step (endingTurn = true); only
  //     discards are then offered (step 0a), and the final discard advances the
  //     turn. This guarantees the discard is logged AFTER the turn's plays.
  const overHandSize = !isOpponentTurn && state.hand.length > MAX_HAND_SIZE;
  if (!isOpponentTurn) {
    actions.push({
      type: 'pass_turn',
      label: overHandSize ? 'End turn → cleanup discard to hand size' : 'Pass to next turn',
      priority: 2,
      apply(s) {
        if (s.hand.length > MAX_HAND_SIZE) {
          const ns = s.clone();
          ns.endingTurn = true;
          return ns;
        }
        return s.startNewTurn();
      },
    });
  }

  // Opponent-turn window: pass to an opponent's end step when there's meaningful
  // value to be had there. Originally gated solely on yevaOnBattlefield (casting
  // green creatures at flash speed), but the opponent turn is also valuable when:
  //   • Seedborn Muse on BF — untaps ALL permanents, generating mana to cast Yeva
  //     from command zone and then cast green creatures at flash speed.
  //   • Quest for Renewal with 4+ counters — untaps all creatures (mana dorks),
  //     similar mana-recovery pattern to Seedborn.
  //   • Glademuse on BF — you draw whenever YOU cast a spell on an opponent's turn,
  //     so passing to their end step and casting via Yeva flash draws the library.
  //   • Yeva in command zone + Seedborn/Quest — the canonical path: untap everything,
  //     tap for mana, cast Yeva from CZ, then cast creatures with her flash grant.
  const yevaInCommandZone = (state.commandZone ?? []).includes('yeva');
  const seedbornActive    = state.hasPermanent('Seedborn Muse');
  const glademuseActive   = state.hasPermanent('Glademuse');
  const runicArmasaurActive = state.hasPermanent('Runic Armasaur');
  const questCounters     = state.getPermanent?.('Quest for Renewal')?.counters?.quest ?? 0;
  const questActive       = questCounters >= 4;
  // Flash enabler: something that lets us cast spells at instant speed on opponent turns.
  // Without this, opponent windows have no value (Seedborn just untaps permanents we
  // can't use; Glademuse draws when YOU cast, so needs flash to actually trigger).
  // yevaInCommandZone is NOT a flash enabler by itself — Yeva must be on the battlefield
  // before she can grant flash to other green creature spells. The CZ only means we could
  // cast Yeva (she has innate flash), which then unlocks the window for further casts.
  const hasFlashEnabler   = yevaOnBattlefield || state.hasPermanent('Emergence Zone');
  // Yeva-CZ flash path: she has innate flash, so she can be cast at instant speed.
  // With Seedborn Muse, the untap step generates fresh mana, so we don't need
  // pre-existing mana in pool — Seedborn will untap lands/dorks to fund her cast.
  const yevaInCZCastable  = yevaInCommandZone && (
    state.mana.canPay('2GG') || seedbornActive
  );
  // Glademuse draws when YOU cast a spell on an opponent's turn (requires flash).
  // It only has window value when flash is genuinely available -- meaning Yeva is
  // on the battlefield, OR Yeva is in the CZ with enough mana to cast her (so she
  // can grant flash to other spells). Without this, opening a window wastes budget.
  const glademuseHasValue = glademuseActive && (
    yevaOnBattlefield ||
    yevaInCZCastable ||
    state.hasPermanent('Emergence Zone')
  );
  const hasOpponentTurnValue =
    runicArmasaurActive ||              // draws on opponent non-mana activations (no flash needed)
    yevaOnBattlefield ||                // Yeva on BF: can cast green creatures at instant speed
    state.hasPermanent('Emergence Zone') ||  // all spells have flash this turn
    (seedbornActive && (yevaOnBattlefield || yevaInCZCastable || state.hasPermanent('Emergence Zone'))) ||
    questActive ||                      // untaps creatures; only useful if we have a flash enabler too
    glademuseHasValue;                  // draws on YOUR casts — only if flash is accessible

  // In Commander there are 3 opponents. With Seedborn Muse / Yeva flash /
  // Glademuse, each opponent's end step is a separate opportunity. Offer up
  // to 3 windows per round, tracked by opponentTurnsThisRound (0-2 used so far).
  const oppTurnsDone = state.opponentTurnsThisRound ?? 0;
  if (!isOpponentTurn && hasOpponentTurnValue && !overHandSize && oppTurnsDone < 3) {
    const oppNum = oppTurnsDone + 1;
    actions.push({
      type: 'opponent_turn',
      label: `Pass to opponent ${oppNum} of 3 end step (Yeva flash / Seedborn / Glademuse / Runic Armasaur window)`,
      priority: 3,  // slightly above pass_turn
      apply(s) {
        let ns = s.clone();
        ns.isOpponentTurn = true;
        ns.opponentTurnsThisRound = (s.opponentTurnsThisRound ?? 0) + 1;
        // Mana drains between phases — always construct a fresh ManaPool.
        // Previously used `new ns.mana.constructor()` which is fragile if
        // ManaPool ever gains required constructor arguments.
        var { ManaPool: _MP } = _GSM;
        ns.mana = new _MP();
        // Quest for Renewal: untap all creatures (not lands) on opponent turns.
        // Triggered when Quest has 4+ quest counters.
        if (ns.hasPermanent('Quest for Renewal')) {
          const questPerm = ns.getPermanent('Quest for Renewal');
          const questCounters = questPerm?.counters?.quest ?? 0;
          if (questCounters >= 4) {
            ns._ensureBF();
            for (const p of ns.battlefield) {
              if (!p.is('creature')) continue;
              if (p.abilitiesUsed?.exert_two_lands) continue;
              p.tapped = false;
              p.abilitiesUsed = {};
            }
          }
        }

        // Seedborn Muse: untap all permanents during each other player's untap step.
        // Exerted creatures (abilitiesUsed.exert_two_lands) skip this untap — they
        // are promised not to untap until your NEXT untap step.
        if (ns.hasPermanent('Seedborn Muse')) {
          ns._ensureBF();
          for (const p of ns.battlefield) {
            if (p.abilitiesUsed?.exert_two_lands) continue; // skip exerted
            p.tapped = false;
            p.abilitiesUsed = {};
          }
        }

        // Glademuse draws when WE cast a spell during an opponent's turn — not
        // unconditionally on every opponent window. The oracle: "Whenever a player
        // casts a spell, if it's not that player's turn, that player draws a card."
        // WE draw when WE cast (requires flash via Yeva / Emergence Zone).
        // The draw trigger is handled in the cast path (cast_spell / cast_commander)
        // where isOpponentTurn=true and Glademuse is on the battlefield.
        // Nothing to do here at window-entry time.

        // Heartwood Storyteller: "Whenever a player casts a noncreature spell, if it
        // wasn't that player's turn, each other player may draw a card."
        // In practice each opponent casts at least one noncreature spell per round
        // (counterspell, tutor, etc.). Model: draw 1 card per opponent turn.
        if (ns.hasPermanent('Heartwood Storyteller')) {
          ns = ns.playerDraws(0, 1);
          ns = ns.log('Heartwood Storyteller: opponent casts noncreature spell → draw 1');
        }

        // Runic Armasaur: "Whenever an opponent activates an ability of a creature or
        // land that isn't a mana ability, you may draw a card."
        // In Commander opponents routinely activate fetch lands, creature utility
        // abilities, cycling lands, etc. Model: draw 1 card per opponent turn
        // (conservative — one non-mana activation per opponent per turn is the floor).
        if (ns.hasPermanent('Runic Armasaur')) {
          ns = ns.playerDraws(0, 1);
          ns = ns.log('Runic Armasaur: opponent activates non-mana ability → draw 1');
        }

        return ns.log(`Opponent ${oppNum} of 3 end step`);
      },
    });
  }

  // End of opponent turn: either chain directly to the next opponent's window
  // (if more remain and Seedborn/etc still has value) or truly return to your
  // main phase. The brief !isOpponentTurn state between windows must NOT offer
  // sorcery-speed actions — you have no main phase between opponents' turns.
  if (isOpponentTurn) {
    const oppTurnsDoneNow = state.opponentTurnsThisRound ?? 0;
    const moreWindowsAvailable = oppTurnsDoneNow < 3 && hasOpponentTurnValue;

    if (moreWindowsAvailable) {
      // Chain directly to the next opponent window — no free main phase in between.
      const nextOppNum = oppTurnsDoneNow + 1;
      actions.push({
        type: 'pass_turn',
        label: `Pass to opponent ${nextOppNum} of 3 end step`,
        priority: 2,
        apply(s) {
          let ns = s.clone();
          ns.opponentTurnsThisRound = (s.opponentTurnsThisRound ?? 0) + 1;
          var { ManaPool: _MP } = _GSM;
          ns.mana = new _MP();
          // Seedborn Muse untaps on each opponent's untap step
          if (ns.hasPermanent('Seedborn Muse')) {
            ns._ensureBF();
            for (const p of ns.battlefield) {
              if (p.abilitiesUsed?.exert_two_lands) continue;
              p.tapped = false;
              p.abilitiesUsed = {};
            }
          }
          // Quest for Renewal untaps creatures
          if (ns.hasPermanent('Quest for Renewal')) {
            const questPerm = ns.getPermanent('Quest for Renewal');
            if ((questPerm?.counters?.quest ?? 0) >= 4) {
              ns._ensureBF();
              for (const p of ns.battlefield) {
                if (!p.is('creature')) continue;
                if (p.abilitiesUsed?.exert_two_lands) continue;
                p.tapped = false;
                p.abilitiesUsed = {};
              }
            }
          }
          if (ns.hasPermanent('Heartwood Storyteller')) {
            ns = ns.playerDraws(0, 1);
            ns = ns.log('Heartwood Storyteller: opponent casts noncreature spell → draw 1');
          }
          if (ns.hasPermanent('Runic Armasaur')) {
            ns = ns.playerDraws(0, 1);
            ns = ns.log('Runic Armasaur: opponent activates non-mana ability → draw 1');
          }
          return ns.log(`Opponent ${nextOppNum} of 3 end step`);
        },
      });
    } else {
      // All opponent windows used (or no more value) — truly return to your turn.
      actions.push({
        type: 'pass_turn',
        label: 'Pass back to your turn',
        priority: 2,
        apply(s) {
          const ns = s.clone();
          ns.isOpponentTurn = false;
          var { ManaPool: _MP } = _GSM;
          ns.mana = new _MP();
          return ns.log('-- back to your turn --');
        },
      });
    }
  }

  actions.sort((a, b) => b.priority - a.priority);
  return actions;
}

function uniqueCards(hand) {
  return [...new Set(hand)];
}

var _ACM = { generateActions, NAME_TO_KEY, COMBO_REQUIRED_KEYS, TUTOR_PRIORITY_SCORE, FUNCTIONAL_EQUIVALENTS, STAX_CARDS, effectiveCost };
// Solver.js
/**
 * MTG Combo Solver — Solver (v4)
 *
 * Three search strategies:
 *   'dfs'   — Depth-first with score pruning (fast, finds optimal quickly)
 *   'bfs'   — Breadth-first by turn then depth (guaranteed fewest-actions per turn)
 *   'iddfs' — Iterative-deepening DFS by turn: runs DFS with maxTurns=1,2,...N
 *             (firstWin=true each pass). Finds earliest-turn win like BFS but
 *             uses DFS ordering/pruning. Solves T4-blowout cases where DFS
 *             exhausts its budget on T4 branches before finding a T3 win.
 *
 * Options:
 *   maxTurns    {number}   Hard turn cutoff (default 4)
 *   maxDepth    {number}   Max actions per DFS branch (default 40)
 *   maxStates   {number}   Visited-state budget (default 500 000)
 *   strategy    {string}   'dfs' | 'bfs' | 'iddfs' (default 'dfs')
 *   allLines    {boolean}  Collect ALL winning lines, not just the best (default false)
 *   verbose     {boolean}  Log each winning line as found (default false)
 *   firstWin    {boolean}  Return after the first winning line is found
 *
 * v3 improvements (retained):
 *   #1  Parent-pointer linked list replaces per-call path array copies in DFS
 *   #2  analyzeState() builds the present-set once per node, shared by
 *       canReachCombo and heuristic (eliminates O(children) redundant set builds)
 *   #3  canReachCombo runs before checkVictory (cheap filter first)
 *   #4  canReachCombo incorporates TUTOR_PRIORITY_SCORE castability check
 *   #5  BFS also applies canReachCombo pruning
 *   #7  BFS uses parent-pointer nodes instead of copying path arrays
 *   #8  children.sort() skipped when only one child
 *   #9  canReachCombo lives here (re-exported for back-compat) — no circular dep
 *  #10  COMBO_REQUIRED_KEYS expanded to cover all 62 combo lines
 *  #11  Heuristic penalises affordable-but-uncast search spells (Worldly Tutor,
 *       GSZ, Crop Rotation, …) — forces tutor-first ordering so the DFS doesn't
 *       explore every permutation of "when to cast the tutor", eliminating the
 *       ~10x state explosion seen with tutor-heavy opening hands.
 *
 * v4 improvements:
 *  [v4-1]  BFS passes pre-computed `analysis` to canReachCombo — eliminates
 *          the redundant analyzeState() call that was discarded after heuristic compute.
 *  [v4-2]  missingComboCards() accepts a pre-built `present` Set (built once in
 *          generateActions) — eliminates O(combo_count × hand_size) rebuild per tutor.
 *  [v4-3]  Fingerprint encodes active player's graveyard contents (not just length) —
 *          fixes state aliasing for branches with different Eternal Witness targets.
 *  [v4-4]  Lazy canReachCombo pruning per child in DFS — unpromising children
 *          are pruned before entering the sort list, not after.
 *  [v4-5]  TUTOR_REACH extended to battlefield tutors: Fauna Shaman, Survival of the
 *          Fittest, Yisan, Elvish Harbinger, Fierce Empath, Woodland Bellower.
 *          canReachCombo now correctly counts these when estimating reachability.
 *  [v4-6]  ManaPool.canPay() — read-only affordability check (no clone).
 *          Used in heuristic search-spell penalty; eliminates a pool clone per
 *          castable tutor per node during child sort.
 *  [v4-7]  whatIfAnalysis() parallelised via worker_threads (see Analyzer.js).
 *          analyzeAsync() exposes the parallel variant; analyze() retains sync behaviour.
 *  [v4-8]  DETECTOR_REQUIRED_KEYS lookup table stamps requiredKeys onto each
 *          DETECTOR and WIN_CONDITION at load time. findNearMisses() now uses
 *          structured key lookup instead of fragile text-mining through descriptions.
 *  [v4-9]  Life component removed from score() — irrelevant in a combo deck
 *          (life total before the win does not affect combo assembly speed).
 * [v4-10]  reconstructPath() caches the materialised path on the node — in
 *          allLines mode repeated wins on the same node avoid re-traversal.
 * [v4-11]  buildDefaultLibrary() uses a pre-built multiset counter (O(1) exclusion)
 *          instead of indexOf/splice on an array (O(n) per excluded key).
 * [v4-12]  X-cost search spells (Chord of Calling, GSZ, Finale, Nature's Rhythm)
 *          excluded from the search-spell penalty.  canPay(baseGGG) always fires
 *          even when X is too small to reach the best target, causing the DFS to
 *          skip mana-building steps and exhaust its budget on wrong-X casts.
 * [v4-13]  Turn penalty added to heuristic() — each additional turn adds 10 000
 *          to the child's sort score, ensuring every turn-1 child is explored
 *          before any turn-2 child.  Prevents the DFS from exhausting its state
 *          budget in deep multi-turn sub-trees before finding cheap turn-1 wins.
 * [v4-14]  Parent→child reuse of present/infiniteMana/analysis. When the parent
 *          generates and sorts its children it already computes buildPresentSet,
 *          checkCombos, and analyzeState for each child (for the heuristic and the
 *          canReachCombo prune). Those results are now carried on the child object
 *          (DFS) / enqueued node (BFS) and reused when the child is visited,
 *          instead of recomputing the identical values. buildPresentSet was the
 *          single hottest JS function (~24% of solve time on the priest hand);
 *          this removes its duplicate call (plus the duplicate checkCombos +
 *          analyzeState) per non-root node. Zero behaviour change — the values are
 *          a pure function of the (immutable) child state, so state counts and
 *          winning lines are byte-identical. In BFS every enqueued node is dequeued
 *          exactly once, so reuse is 100%; in DFS surviving (non-deduped) children
 *          reuse, deduped children fall through harmlessly.
 * [v4-15]  DFS child-loop reordering (E18). Instrumentation showed that on the
 *          priest benchmark ~46% of generated children are score-pruned and ~29%
 *          are deduped on entry — yet the OLD code computed each child's
 *          buildPresentSet + checkCombos + analyzeState (the hot path) BEFORE
 *          those cheap rejections ran in the child's _dfs, wasting that work on
 *          ~75% of children. Now the cheap filters (score-prune, then fingerprint
 *          dedup) run in the parent's generation loop FIRST; only survivors get
 *          the expensive analysis, which is then threaded to the child via `pre`
 *          (along with the fingerprint + score) for full reuse. Interleaved A/B
 *          (load-canceling) measures ~15% faster on the priest hand. State counts
 *          are byte-identical: each rejected child is still counted once
 *          (statesExplored++), and a budget pre-check before recursion preserves
 *          the maxStates+1 invariant (the early-reject increments are guarded so
 *          they can't push the counter past the ceiling a bare _dfs entry reaches).
 */

// ── [O-37] Fast-mana regime classifier ────────────────────────────────────
// The heuristic's base term `-state.mana.total()` (prefer more floating mana)
// is useful SIGNAL on dork-ramp hands — floating mana tracks combo-assembly
// progress there. But on hands flush with NON-creature fast mana (Sol Ring,
// Ancient Tomb, Gaea's Cradle, Lotus Petal, etc.), that term becomes NOISE:
// it front-loads "tap every rock now" branches that don't advance the combo,
// ballooning the search.
//
// `__fastManaRegime` is classified ONCE at the start of solve() from the
// initial hand+battlefield: true iff there are >= 2 non-creature fast-mana
// sources. When true, the heuristic drops the mana term (uses 0 base) so
// child ordering isn't dominated by rock-tapping permutations. Crucially the
// flag is NEVER set on dork-only hands (dorks are creatures, excluded from
// the count), so those hands keep the mana term they benefit from.
//
// A/B (state counts, wins identical in every case): Default hand -52.2%,
// rock-heavy hand -24%, and 0.0% (byte-identical) on every dork/aura/tutor
// hand and the full bench. Strictly better-or-equal: it only alters ordering
// on the rock regime, where it strictly helps. See ToDo.md O-37.
var __fastManaRegime = false;

// Non-creature permanents that provide fast/burst mana (rocks, rituals, and
// high-output utility lands). Creature dorks are deliberately excluded.
var FAST_MANA_KEYS = new Set([
  'sol_ring', 'mana_crypt', 'mana_vault', 'grim_monolith', 'lotus_petal',
  'ancient_tomb', 'gaeas_cradle', 'itlimoc',
]);

// Count non-creature fast-mana sources in the initial hand + battlefield.
function countFastManaSources(state) {
  let n = 0;
  const scan = (key) => {
    const d = CARDS[key];
    if (!d || d.types.includes('creature')) return;
    if (FAST_MANA_KEYS.has(key) ||
        (d.types.includes('artifact') &&
         (d.tapForMana || (d.abilities && d.abilities.tapForMana)))) {
      n++;
    }
  };
  if (state && state.hand) for (const k of state.hand) scan(k);
  if (state && state.battlefield) for (const p of state.battlefield) scan(p.cardKey);
  return n;
}

// ── Search spell keys ─────────────────────────────────────────────────────
// Instant/sorcery cards with castFn that fetch combo pieces.  When one of
// these is affordable but still in hand, the heuristic penalises the state
// so the DFS always prefers "cast tutor now" over "cast tutor later".
// Without this, the solver explores every permutation of tutor timing,
// blowing up the state space by ~10x for hands containing a tutor.
var SEARCH_SPELL_KEYS = new Set(
  Object.entries(CARDS)
    .filter(([, def]) =>
      def.castFn &&
      (def.types?.includes('instant') || def.types?.includes('sorcery'))
    )
    .map(([k]) => k)
);

// X-cost search spells (Chord of Calling, GSZ, Finale, Nature's Rhythm) are
// excluded from the search-spell penalty.  Their power scales with available
// mana, so canPay(baseGGG) fires even when X is too small to reach the best
// target.  Penalising them causes the DFS to deprioritise mana-building steps
// (e.g. QR → untap Priest → tap Priest) in favour of casting early with a
// sub-optimal X, exhausting the budget before finding the real line.
// The DFS already explores casting them at the correct time via checkVictory.
var X_COST_SEARCH_SPELLS = new Set(
  Object.entries(CARDS)
    .filter(([, def]) => def.castFn && def.cost?.includes('X'))
    .map(([k]) => k)
);


// ── Tutor reach classification ────────────────────────────────────────────
// Maps card keys → what card TYPE they can fetch.
// Used by analyzeState to avoid counting creature-missing combos as reachable
// when only a land-tutor (Crop Rotation, Sylvan Scrying) is in hand.
var TUTOR_REACH = {
  // Creature tutors (hand spells)
  worldly_tutor:          'creature',
  green_suns_zenith:      'creature',
  chord_of_calling:       'creature',
  summoners_pact:         'creature',
  shared_summons:         'creature',
  natures_rhythm:         'creature',
  finale_of_devastation:  'creature',
  natural_order:          'creature',
  eldritch_evolution:     'creature',
  // Creature tutors — battlefield activated abilities (Fix #5)
  fauna_shaman:           'creature',
  survival_fittest:       'creature',
  yisan:                  'creature',
  elvish_harbinger:       'creature',
  fierce_empath:          'creature',
  woodland_bellower:      'creature',
  // Land tutors
  crop_rotation:          'land',
  sylvan_scrying:         'land',
  // Fetch any permanent type
  archdruid_charm:        'any',
};

// Classify a card key as 'creature', 'land', or 'other'.
// Pre-computed at load time into a Map for O(1) lookup in hot path.
var _CARD_TYPE_CACHE = new Map();
for (const [k, def] of Object.entries(CARDS)) {
  if (def.types?.includes('creature'))          _CARD_TYPE_CACHE.set(k, 'creature');
  else if (def.types?.includes('land') || !def.cost) _CARD_TYPE_CACHE.set(k, 'land');
  else                                          _CARD_TYPE_CACHE.set(k, 'other');
}
function _cardType(k) {
  return _CARD_TYPE_CACHE.get(k) ?? 'unknown';
}

// Build per-type tutor use counts from hand + non-tapped BF permanents.
// Returns { creature: N, land: N, any: N } — each entry is the number of
// discrete fetch actions available of that type this turn.
// Battlefield tutors (e.g. Survival of the Fittest) are counted only if untapped.
//
// Two-level tutor chain modelling:
//   Woodland Bellower in hand → ETB fetches a ≤3-MV creature (second fetch).
//   Fierce Empath in hand + Bellower in library → chain gives two creature fetches.
// This prevents canReachCombo from over-pruning states where a tutor chain
// can bridge two missing pieces in a single turn.
function _tutorCounts(state) {
  const counts = { creature: 0, land: 0, any: 0 };
  const handSet = new Set(state.hand);

  for (const k of state.hand) {
    const t = TUTOR_REACH[k];
    if (t) counts[t]++;
  }
  for (const p of state.battlefield) {
    if (p.tapped) continue;
    const k = NAME_TO_KEY[p.name];
    if (k) {
      const t = TUTOR_REACH[k];
      if (t) counts[t]++;
    }
  }

  // ── Two-level chain bonus ─────────────────────────────────────────────
  // Woodland Bellower in hand: ETB fetches a second ≤3-MV creature.
  // Already counted once via TUTOR_REACH; the ETB gives a free second fetch.
  if (handSet.has('woodland_bellower')) {
    counts.creature += 1;
  }

  // Fierce Empath in hand + Woodland Bellower in library:
  // Empath ETB fetches Bellower → Bellower ETB fetches a third creature.
  // Base TUTOR_REACH counts 1; Bellower chain adds 1 more (+1 total bonus).
  const bellowerInLib = state.players?.[0]?.library?.includes('woodland_bellower');
  if (handSet.has('fierce_empath') && bellowerInLib) {
    counts.creature += 1;
  }

  return counts;
}

// Pre-built map: card key → its FUNCTIONAL_EQUIVALENTS group (Set).
// Populated once at module load; used by analyzeState to expand the
// "present" set so that having temur_sabertooth satisfies kogla combos, etc.
var _equivGroupOf = new Map();
for (const group of FUNCTIONAL_EQUIVALENTS) {
  for (const k of group) _equivGroupOf.set(k, group);
}

// ── [E11] buildPresentSet ────────────────────────────────────────────────
// Returns a Set<string> of card keys representing what the active player
// has access to right now: hand ∪ battlefield ∪ (topDecked, optionally),
// expanded via FUNCTIONAL_EQUIVALENTS (so e.g. Kogla on board adds
// 'temur_sabertooth' to the set, since they slot into the same combos).
//
// Factored out of analyzeState so the Solver hot path can build it ONCE per
// node, then reuse it for: checkCombos (as the [E11] prefilter input),
// checkVictory ([E11] prefilter), generateActions ([E2] missingComboCards
// reuse), and analyzeState (this same Set fed back in).
function buildPresentSet(state) {
  const present = new Set(state.hand);
  for (const p of state.battlefield) {
    const ck = NAME_TO_KEY[p.name];
    if (ck) present.add(ck);
  }
  // topDecked counts as 'will be in hand next turn'
  if (state.topDecked) present.add(state.topDecked);
  // commandZone cards are always castable (commander tax applies but they're
  // never "missing") -- include them so analyzeState never treats the commander
  // as a piece to tutor for, which was causing over-pruning of all lines that
  // require Yeva (Glademuse flash window, Seedborn flash window, Commander
  // Damage win, etc.).
  for (const ck of (state.commandZone ?? [])) present.add(ck);

  // Expand present set via FUNCTIONAL_EQUIVALENTS (same logic that was inline
  // in analyzeState).  [E8] Two-pass: collect additions first, then apply —
  // avoids [...present] array allocation while iterating a Set we're adding to.
  let _equivAdditions = null;
  for (const k of present) {
    const grp = _equivGroupOf.get(k);
    if (grp) {
      if (!_equivAdditions) _equivAdditions = [];
      for (const m of grp) { if (!present.has(m)) _equivAdditions.push(m); }
    }
  }
  if (_equivAdditions) for (const m of _equivAdditions) present.add(m);
  return present;
}

// ── #2 analyzeState ───────────────────────────────────────────────────────
// Returns { present: Set<string>, minMissing: number }
//
//   present    = card keys in hand + on battlefield (+ topDecked if set)
//   minMissing = minimum effective turns needed to assemble any combo,
//                computed by greedily assigning available tutor uses:
//
//                  - present piece                           → cost 0
//                  - missing, matching tutor use available   → cost 1 (consumes a use)
//                  - missing, wrong-type tutor or no tutor   → cost 2
//
// Tutor uses are COUNTED, not just typed: if you have 1 creature tutor and need
// 2 missing creatures, only the first costs 1 — the second costs 2.
// This correctly handles the Crop Rotation case: 1 land use, missing ashaya
// (creature) + something else → the creature piece costs 2 even with a land tutor.
//
// [E11] Optional `_present`: when supplied, skips rebuilding the present Set.
// Caller (Solver hot path) builds it once via buildPresentSet() then passes it
// here AND to checkCombos for the prefilter — no double work.
function analyzeState(state, _infiniteMana, _present) {
  // [E3] _infiniteMana: pre-computed checkCombos(state) result from the caller,
  // passed in to avoid calling checkCombos a second time inside this function.
  // [E11] _present: pre-built (and equiv-expanded) Set from buildPresentSet().
  const present = _present ?? buildPresentSet(state);

  const base = _tutorCounts(state);

  let minMissing = Infinity;
  for (const required of COMBO_REQUIRED_KEYS) {
    // Clone tutor counts for this combo's cost calculation
    let cCr = base.creature, cLd = base.land, cAny = base.any;
    let cost = 0;

    for (const k of required) {
      if (present.has(k)) continue;
      // Early-exit: this combo can't beat current best
      if (++cost >= minMissing) break;
      cost--; // undo the increment, compute real cost below
      const ct = _cardType(k);
      // Greedily consume the best matching tutor use.
      if      (ct === 'creature' && cCr  > 0) { cost += 1; cCr--;  }
      else if (ct === 'creature' && cAny > 0) { cost += 1; cAny--; }
      else if (ct === 'land'     && cLd  > 0) { cost += 1; cLd--;  }
      else if (ct === 'land'     && cAny > 0) { cost += 1; cAny--; }
      else if (ct === 'other'    && cAny > 0) { cost += 1; cAny--; }
      else                                    { cost += 3;          }
      if (cost >= minMissing) break; // can't improve
    }

    if (cost < minMissing) minMissing = cost;
    // Early-exit only on cost=0: all pieces are nominally present.
    // But "present" checks card identity only — it cannot verify the combo is
    // actually executable (e.g. Ashaya+QR requires a ≥2G mana dork untapped,
    // which analyzeState does not model).  If checkCombos says the combo is not
    // firing right now, keep minMissing=1 so the heuristic does not falsely
    // treat this state as a near-win and waste the entire search budget on it.
    if (minMissing === 0) {
      // Use pre-computed result if available, otherwise call checkCombos once.
      const fired = (_infiniteMana !== undefined) ? _infiniteMana : checkCombos(state);
      if (fired) break;
      // [E14] Fast path: when the caller already knows no combo fires globally
      // (_infiniteMana === null, which the Solver always passes from its hot
      // path via the [E3] pre-computed value), we can skip the rest of the
      // outer loop entirely. Reasoning:
      //   • The cost=0 fallback fires on >98% of states in profiled solves.
      //     Continuing the loop iterates 50–94 more entries, almost all of
      //     which short-circuit at `cost++ >= minMissing` after 1–2 inner
      //     iterations — but that's still ~3% of total search time wasted.
      //   • If _infiniteMana === null, NO combo fires globally. So no
      //     subsequent COMBO_REQUIRED_KEYS entry can hit the `if (fired)
      //     break` — they all fall back to minMissing=1.
      //   • minMissing only goes DOWN inside the loop, and 1 is the minimum
      //     reachable value here (cost=0 + no firing → set 1; cost>0 entries
      //     can't lower minMissing below 1 since each non-present piece adds
      //     at least 1 cost).
      //   • Therefore minMissing=1 is the final answer and the remaining
      //     outer iterations are pure waste.
      // When _infiniteMana === undefined (caller didn't pre-compute), we
      // CONSERVATIVELY keep iterating — a later combo might fire even if
      // this one didn't, since `fired = checkCombos(state)` only checked
      // once at this point. This branch shouldn't happen in the Solver hot
      // path (which always pre-computes), but keeps the function correct
      // when called standalone.
      minMissing = 1;
      if (_infiniteMana === null) break;
    }
  }

  return { present, minMissing };
}

// ── #4 / #9: canReachCombo ────────────────────────────────────────────────
// Returns true if the state has a realistic path to assembling any combo
// within turnsLeft turns. Uses tutor-count-aware minMissing from analyzeState.
// [E3] canReachCombo accepts optional pre-computed infiniteMana and analysis.
function canReachCombo(state, turnsLeft, analysis, _infiniteMana) {
  // If combo is already firing (pre-computed or computed now), we can reach it.
  const fired = (_infiniteMana !== undefined) ? _infiniteMana : checkCombos(state);
  if (fired) return true;
  const { minMissing } = analysis ?? analyzeState(state, null);
  return minMissing <= turnsLeft;
}



var DEFAULT_OPTIONS = {
  maxTurns:  4,
  maxDepth:  40,
  maxStates: 500_000,
  strategy:  'dfs',
  allLines:  false,
  verbose:   false,
  firstWin:  false,
  // exhaustive: disable score pruning, canReachCombo pruning, and the
  // search-spell heuristic penalty. The solver explores every reachable
  // state within the turn/depth budget. Much slower but never misses a win.
  exhaustive: false,
  // [O-8] heuristicBias(state) => number: optional additive term folded into
  // child-ordering heuristic(). Defaults to a no-op (always 0), which makes
  // every existing call site, state count, and bench.js result byte-identical
  // to before this option existed. AdversarialSolver.js is the only current
  // caller — it uses this hook to bias the DFS/BFS child order toward lines
  // that minimise combo-piece exposure to opponent interaction, without
  // forking or duplicating the search loops themselves.
  heuristicBias: null,
};

// ── Scoring ───────────────────────────────────────────────────────────────

/**
 * Score a state/path. Lower = better.
 *   Primary   : turn number (fewer turns → lower score)
 *   Secondary : depth (fewer actions → lower score)
 *   Tertiary  : resources left committed at the win-detection state — floating
 *               mana and tapped permanents both count AGAINST the score (less
 *               of each → lower/better score). The win-detection state is
 *               effectively "where you'd stop acting", so what's still
 *               available there is what's available for the rest of that
 *               turn and for instant-speed plays on the opponent's turn —
 *               untapped permanents and unspent mana are both real
 *               flexibility, not neutral leftovers, so a line that leaves
 *               fewer of either is preferred among ties on turn/depth.
 *               (Previously floating mana alone counted IN FAVOR of the
 *               score, on the reasoning that more resources
 *               mid-search meant more capability — that reasoning doesn't
 *               apply to the state actually being scored here, which is a
 *               STOPPING point, not a mid-search snapshot; flipped as part
 *               of this change.)
 * Life removed: in a combo deck, life total before the win is irrelevant (Fix #9).
 *
 * Weights: both terms use the same small per-unit weight as the original
 * mana term did, so this tiebreaker layer stays a genuine tiebreaker and
 * doesn't distort the turn/depth ordering that dominates it. This can, in
 * rare cases (a single very large mana ability, or a great many permanents
 * tapped by one action), make score locally non-monotone along a path —
 * an already-accepted, already-documented property of this function (see
 * test.js §76, "a big mana tap can lower path score"), not a new risk
 * introduced here.
 */
function score(state, depth) {
  let tappedCount = 0;
  for (const p of state.battlefield) if (p.tapped) tappedCount++;
  return (state.turn - 1) * 100_000 +
         depth            *      10  +
         state.mana.total() *      1  +
         tappedCount         *      1;
}

// ── #2 / #11: Heuristic child ordering ───────────────────────────────────
// Lower = closer to win. Returns a score for sorting children.
//
//  A) Search-spell penalty (+2000 per castable tutor in hand):
//     Forces "cast tutor now" strictly before "do other things first".
//     Without this, the DFS explores all N! orderings of "when to cast
//     the tutor", causing ~10× state explosion.
//
//  B) topDecked bonus (−500 if a combo piece is on top of library):
//     After a tutor resolves, the target is topDecked. Strongly prefers passing
//     to draw the tutored piece over continuing to do other things first.
//
//  C) Turn penalty (+10000 per turn beyond the first):
//     Hard partition: every turn-1 child sorts before every turn-2 child.
//
// [C-32] minMissing was previously included as `minMissing * 1000` here —
// but instrumentation during the C-31 work showed minMissing is essentially
// flat (=1) on >99% of states explored during search on Ashaya hands.
// On tutor-heavy hands the value DOES vary (regime 2 — no combo's pieces
// fully present), but in those cases canReachCombo's pruning is the
// active mechanism, not heuristic ordering.  Either way, the
// `minMissing * 1000` term in heuristic provides no discrimination
// between siblings on the dominant hot path: it's a near-constant offset
// that just shifts every child's score by the same amount.
//
// Confirmed by experiment: removing the term leaves state counts
// unchanged on every benched hand (default 8400, arbor_elf 19561,
// priest 27728, tutor-heavy 51024, eladamri 3810) and on every
// locked-in test in the suite — proving it provided no useful ordering
// signal.  Documented as zero-impact code cleanup; minMissing is still
// computed and used by canReachCombo for hard pruning.
//
// Future work: a richer "combo readiness" signal (counting unready pieces
// — tapped/sick/in-hand — of partly-assembled combos) showed early signs
// of meaningfully reducing state counts (default 8400 → ~6077 in a quick
// experiment) but needs careful per-bench validation and weight tuning
// before shipping.  See the [readiness-signal] item under Open ideas in
// ToDo.md for follow-up.
function heuristic(minMissing, state, exhaustive = false, _infiniteMana = undefined, _searchSpellWins = undefined) {
  // [E3] Use pre-computed checkCombos result when available.
  // The minMissing===0 short-circuit still fires when the caller has detected
  // a firing combo on this state — push it to the front of the queue.
  const fired = (_infiniteMana !== undefined) ? _infiniteMana : (minMissing === 0 ? checkCombos(state) : null);
  if (minMissing === 0 && fired) return -1_000_000 - state.mana.total();

  // [C-32] Base score: just floating mana.  minMissing*1000 was dropped —
  // see function-level note.
  // [O-37] On the fast-mana regime, drop the mana term — it front-loads
  // rock-tapping noise that doesn't advance the combo. Dork hands never set
  // the flag, so they keep the mana-progress signal.
  let h = __fastManaRegime ? 0 : -state.mana.total();

  // A) Search-spell penalty — disabled in exhaustive mode so every ordering is explored.
  //
  // When a castable search spell is in hand, penalise the state heavily so the DFS
  // prefers casting it immediately over doing other things first.  Without this the
  // solver explores every permutation of "when to cast the tutor", blowing up the
  // state space by ~10×.
  //
  // Restrictions that prevent misfires:
  //   1. X-cost spells (Chord, GSZ, Finale, Nature's Rhythm) are excluded — their
  //      effective power scales with mana available, so canPay(baseGGG) fires even
  //      when X is too small to reach the best target.
  //   2. The penalty only fires when casting the spell right now would actually
  //      produce a checkVictory win.  This prevents penalising intermediate
  //      mana-building states (e.g. QR untap → PotT tap → then cast Chord) where
  //      the tutor is affordable but not yet powerful enough to close the game.
  if (!exhaustive) {
    // [E5] Use pre-computed flag when caller already ran the castFn check,
    // otherwise evaluate lazily. Avoids redundant state clone + castFn per child.
    let searchPenalty = _searchSpellWins;
    if (searchPenalty === undefined) {
      searchPenalty = false;
      for (const k of state.hand) {
        if (!SEARCH_SPELL_KEYS.has(k)) continue;
        if (X_COST_SEARCH_SPELLS.has(k)) continue;
        const def = CARDS[k];
        if (!def) continue;
        const ec = effectiveCost(state, def);
        if (!state.mana.canPay(ec)) continue;
        if (def.castFn) {
          const afterPay = state.payMana(ec);
          const fromHand = afterPay?.removeFromHand(k);
          if (fromHand) {
            const results = def.castFn(fromHand);
            if (results && results.some(r => checkVictory(r)?.achieved)) {
              searchPenalty = true;
              break; // one winning search spell is enough
            }
          }
        }
      }

      // Survival of the Fittest / Fauna Shaman are enchantments (not in
      // SEARCH_SPELL_KEYS), but function as creature tutors.  When one is in
      // hand and castable, and the Survival/Fauna infinite-mana detector would
      // fire after casting + one activation (fetching Ashaya/QR), boost priority
      // the same way we do for instant/sorcery search spells.
      if (!searchPenalty) {
        const ENCHANT_TUTORS = ['survival_fittest', 'fauna_shaman'];
        for (const k of ENCHANT_TUTORS) {
          if (!state.hand?.includes(k)) continue;
          const def = CARDS[k];
          if (!def) continue;
          const ec = effectiveCost(state, def);
          if (!state.mana.canPay(ec)) continue;
          // Check if any activation result from the castFn would produce
          // a checkCombos/checkVictory hit (Survival/Fauna puts itself on BF;
          // the detector fires on that BF state when pieces are assembled).
          const afterPay = state.payMana(ec);
          const fromHand = afterPay?.removeFromHand(k);
          if (!fromHand) continue;
          if (def.castFn) {
            const results = def.castFn(fromHand);
            if (results && results.some(r => checkVictory(r)?.achieved)) {
              searchPenalty = true;
              break;
            }
          }
        }
      }
    }
    if (searchPenalty) h += 2000;
  }

  // B) topDecked bonus — strongly prefer drawing the tutored piece
  if (state.topDecked && TUTOR_PRIORITY_SCORE[state.topDecked] !== undefined) {
    h -= 500;
  }

  // D) Graveyard recursion bonus — if a recursion spell is in hand AND a
  //    high-priority combo piece is in the graveyard, treat it as partially
  //    assembled (the piece is effectively one cast away).
  //    Weight: −300 per recoverable key piece. Smaller than the topDecked
  //    bonus (−500) since GY recovery requires two actions (cast EWit + cast
  //    the piece) vs one (draw topDecked + cast).
  //    Only fires when the player has Eternal Witness / Timeless Witness /
  //    Skullwinder / Reclaim in hand — battlefield versions are already
  //    captured by buildPresentSet via their activated abilities.
  const RECURSION_HAND_KEYS = new Set([
    'eternal_witness', 'timeless_witness', 'skullwinder', 'reclaim',
  ]);
  const hasRecursionInHand = state.hand.some(k => RECURSION_HAND_KEYS.has(k));
  if (hasRecursionInHand && state.players?.[0]?.graveyard?.length) {
    for (const cardName of state.players[0].graveyard) {
      const ck = NAME_TO_KEY[cardName];
      if (!ck) continue;
      const score = TUTOR_PRIORITY_SCORE[ck] ?? 0;
      if (score >= 60) h -= 300; // high-value combo piece recoverable
      else if (score >= 30) h -= 100; // medium-value piece
    }
  }

  // C) Turn penalty — children on a later turn always sort below children on the
  //    current turn.  Without this the DFS descends into multi-turn sub-trees and
  //    exhausts the state budget before backtracking to find cheap turn-1 wins.
  //    The weight (10 000) is larger than any per-turn heuristic variation so the
  //    turn boundary is a hard partition: every turn-1 child beats every turn-2
  //    child regardless of mana/search-spell scores.
  h += (state.turn - 1) * 10_000;

  return h;
}

// ── #1 / #7 / #10: Parent-pointer path reconstruction ───────────────────
// Instead of copying the full path array on every recursive call, we store a
// singly-linked list of nodes. Path arrays are only materialised when a win
// is found (O(depth) work, once per win). In allLines mode the path is cached
// on the node so repeated _recordWin calls don't re-traverse (Fix #10).
function reconstructPath(node) {
  if (node._path) return node._path;
  const path = [];
  let cur = node;
  while (cur) { path.push(cur.state); cur = cur.parent; }
  path.reverse();
  node._path = path;
  return path;
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
    // Mana-dominance frontier: structural-fingerprint (mana stripped) →
    // antichain of mana vectors seen at that structural state, GLOBAL
    // across the whole search (not per-parent — see _isManaDominated()
    // for why this specific combination, mana-only + global + the
    // never-prune-a-win guard, is the current experiment).
    this.manaFrontier = new Map();
  }

  // ── Public API ────────────────────────────────────────────────────────────

  /**
   * @param {import('./GameState').GameState} initialState
   * @returns {{ line, combo, score, allLines? } | null}
   */
  solve(initialState) {
    this._reset();

    // [O-37] Classify the fast-mana regime once from the initial state.
    __fastManaRegime = countFastManaSources(initialState) >= 2;

    const t0 = Date.now();

    if (this.opts.strategy === 'bfs') {
      this._bfs(initialState);
    } else if (this.opts.strategy === 'iddfs') {
      this._iddfs(initialState);
    } else {
      this._dfs(initialState, null, 0);  // #1: pass parent node (null = root)
    }

    const elapsed = ((Date.now() - t0) / 1000).toFixed(2);
    if (!this.bestLine) {
      // No fully-deployed win found. Use fallback (undeployed) win if available.
      if (this.fallbackWin) {
        const fb = this.fallbackWin;
        const fbFinalState = fb.line[fb.line.length - 1];
        const fbAssembly   = fb.combo?.winCondition ? assembleWin(fbFinalState) : null;
        return {
          line:     fb.line,
          combo:    fb.combo,
          score:    fb.score,
          assembly: fbAssembly ? { steps: fbAssembly.steps } : null,
          ...(this.opts.allLines ? { allLines: this.allWinLines } : {}),
        };
      }
      return null;
    }

    const finalState = this.bestLine[this.bestLine.length - 1];
    const assembly   = this.bestCombo?.winCondition ? assembleWin(finalState) : null;
    const result = {
      line:     this.bestLine,
      combo:    this.bestCombo,
      score:    this.bestScore,
      assembly: assembly ? { steps: assembly.steps } : null,
    };
    if (this.opts.allLines) result.allLines = this.allWinLines;
    return result;
  }

  // ── Mana-dominance pruning ───────────────────────────────────────────────
  // A candidate child is DOMINATED if another already-seen state anywhere
  // in this search — not just a sibling — was reached via a path NO
  // LONGER than this one, has the same structural shape (same fingerprint
  // with the mana segment stripped, so implicitly the same turn too), and
  // has component-wise ≥ mana in every color (W/U/B/R/G/C).
  //
  // History, since this has been tuned multiple times (see O-40/O-44 in
  // ToDo.md for the full account — this is the third round):
  //   1. First version compared purely on mana, globally, with no depth
  //      check. Bug: it could prune a state reached via a SHORTER path in
  //      favor of a mana-richer "dominator" reached via a LONGER one,
  //      silently lengthening the found line (18→19 steps on the default
  //      benchmark hand — caught by a user).
  //   2. Added depth-awareness (only dominate if the existing entry's
  //      depth ≤ the candidate's). Fixed the step-count regression, but a
  //      SEPARATE bug remained: pruning could still discard a
  //      non-winning-but-nearly-winning state in favor of a "dominator"
  //      elsewhere in the tree with no guarantee of being explored
  //      promptly — measured on the Arbor Elf bench hand as the first win
  //      not being found until state 161,094 of 163,411 explored. Also
  //      found and fixed a second, independent bug here: the
  //      never-prune-a-win guard (added to investigate the above) was
  //      wrongly gated behind checkCombos finding an infinite-mana combo,
  //      but checkVictory can also succeed via WIN_CONDITIONS that don't
  //      need one — silently skipping the win-check for exactly the
  //      states most likely to need it.
  //   3. Tried restricting comparisons to true siblings (same parent, so
  //      same depth by construction, hence dropping the depth field
  //      entirely). Fixed the Arbor Elf explosion completely, but turned
  //      out to prune essentially nothing in practice — the redundancy
  //      this feature targets (different ACTION SEQUENCES, several steps
  //      apart, converging on the same board with different leftover
  //      mana) doesn't show up between immediate siblings.
  //   4. Dropped the depth field entirely (kept global scope, mana-only
  //      comparison), on the reasoning that the structural key already
  //      guarantees the same turn, and score() weighs turn far more
  //      heavily than depth, so exact step count seemed like a secondary
  //      concern. This reintroduced a DIFFERENT instance of bug #1's
  //      exact failure mode, caught directly by tracing a specific
  //      fingerprint through every pruning gate: two branches converging
  //      on an IDENTICAL structural shape with EQUAL (not just
  //      comparable) mana — e.g. two different turn-1 sequences that both
  //      end turn-1 with 0 floating mana, one via a wasted tap and one
  //      without — are only distinguishable by which is SHALLOWER. Without
  //      depth, whichever was recorded in the frontier FIRST wins,
  //      regardless of whether it's actually the better (shallower) one;
  //      "turn matters more than steps" doesn't help when two candidates
  //      are on the exact same turn AND have the exact same mana, which
  //      is precisely when it matters most. Root-caused by adding
  //      temporary instrumentation to the child loop that logged every
  //      candidate matching a specific target fingerprint through each
  //      pruning gate in order, rather than continuing to guess.
  //   5. Depth restored (fixing #4 exactly as #2 already proved sound),
  //      kept global (not sibling-restricted, since #3 showed that prunes
  //      almost nothing), kept the unconditional checkVictory guard from
  //      #2. Confirmed depth-awareness itself is bug-free this time
  //      (instrumented every prune: zero cases of a deeper entry
  //      dominating a shallower one, as the code should guarantee by
  //      construction) — but the Arbor Elf explosion from #2 came right
  //      back regardless (163,411 states again), so #2's explosion was
  //      never actually about incorrect dominance.
  //   6. Root-caused #2/#5's explosion by comparing win-discovery timing
  //      with and without dominance pruning. Exhaustive mode (no pruning)
  //      finds a first, MEDIOCRE win very early (state ~18k of ~395k) and
  //      gradually improves it over the rest of the search. Default mode
  //      (with dominance pruning) finds NO win at all until state ~161k —
  //      then immediately lands on a good score. Dominance pruning is
  //      correctly eliminating "worse" (dominated) branches — but those
  //      branches were exactly the ones providing the early, mediocre
  //      wins that tighten bestScore fast, which is what makes the far
  //      more powerful score-pruning mechanism effective for the rest of
  //      the tree. Removing them doesn't cost correctness (the surviving
  //      branch is still provably at least as good), but it costs the
  //      EARLY-CONVERGENCE benefit that the rest of the search depends on
  //      for its own efficiency — a different failure mode than #2's
  //      original hypothesis (near-win states blocked by untimed
  //      dominators), though consistent with the same general lesson:
  //      local soundness doesn't imply the interaction with the rest of
  //      the search is beneficial.
  //
  //      Fix: phased activation. Both call sites additionally gate on
  //      `this.bestScore !== Infinity` — dominance pruning stays off
  //      entirely until a first win has been found by any means (so the
  //      search behaves like exhaustive mode for exactly the phase where
  //      early, even-mediocre wins matter most), then turns on once
  //      score-pruning has something to work with. Verified this closes
  //      both bugs simultaneously: the depth-restoration alone (#5) had
  //      already fixed the step-count regression from #1/#4, and phased
  //      activation on top of it resolves the Arbor Elf explosion too —
  //      not by disabling the mechanism, but by not letting it interfere
  //      before the search has any bestScore to lose.
  //
  // Mana in this engine only resets at startNewTurn() (CR 500.4/514 — an
  // entire turn is modeled as one continuous mana-pool scope, not drained
  // phase-by-phase), so "more mana now" cleanly implies "more mana at
  // every later point this turn too" — the mana half of the argument
  // holds within a turn without qualification. Cross-turn comparisons
  // never happen here because turn is part of the structural key.
  //
  // Gated off in exhaustive mode, same as every other approximate pruning
  // in this file — exhaustive guarantees a complete search.
  _isManaDominated(next, fp, depth, frontier) {
    const mIdx = fp.indexOf('|M:');
    const lIdx = fp.indexOf('|L:', mIdx);
    const structKey = fp.slice(0, mIdx) + fp.slice(lIdx);

    const m = next.mana;
    const vec = [m.W, m.U, m.B, m.R, m.G, m.C];
    const existingList = frontier.get(structKey);
    if (!existingList) {
      frontier.set(structKey, [{ depth, vec }]);
      return false;
    }
    for (const existing of existingList) {
      if (existing.depth <= depth &&
          existing.vec[0] >= vec[0] && existing.vec[1] >= vec[1] && existing.vec[2] >= vec[2] &&
          existing.vec[3] >= vec[3] && existing.vec[4] >= vec[4] && existing.vec[5] >= vec[5]) {
        return true; // dominated: an already-seen state, no later, no poorer
      }
    }
    // Not dominated — a genuinely new point. Drop any existing entries
    // THIS one now dominates (same rule, reversed).
    const filtered = existingList.filter(existing => !(
      depth <= existing.depth &&
      vec[0] >= existing.vec[0] && vec[1] >= existing.vec[1] && vec[2] >= existing.vec[2] &&
      vec[3] >= existing.vec[3] && vec[4] >= existing.vec[4] && vec[5] >= existing.vec[5]
    ));
    filtered.push({ depth, vec });
    frontier.set(structKey, filtered);
    return false;
  }

  // ── DFS ───────────────────────────────────────────────────────────────────
  // #1: parentNode is { state, parent } linked list node (null at root)

  _dfs(state, parentNode, depth, pre) {
    this.statesExplored++;
    if (this.statesExplored > this.opts.maxStates) return;
    if (depth > this.opts.maxDepth)  return;
    if (state.turn > this.opts.maxTurns) return;

    // Prune losing states immediately (always active — losing can never win)
    if (state.youLost()) { this.pruned++; return; }

    // Score pruning (DFS-only, disabled in exhaustive mode)
    //
    // [E13 / C-29] In allLines mode, use strict `>` so sibling branches with
    // score == bestScore are still explored.  Pre-fix, the `>=` cutoff dropped
    // tied-score winning leaves once the first one was found, silently
    // under-reporting the line count.  In single-best mode we keep `>=` —
    // ties are equivalent for "an optimal line", and the stricter prune keeps
    // search space bounded on tutor-heavy hands.
    //
    // Note: score is monotone-non-decreasing along any DFS path
    // (depth*10 dominates -mana.total() deltas), so a state at score s
    // cannot produce wins at score < s.  Therefore `>` is sufficient (we
    // only miss ties at this exact score, which `>` admits).
    // [E18] Reuse the score computed by the parent (a pure function of state +
    // depth) but RE-COMPARE against the current bestScore — bestScore may have
    // tightened since the parent checked, so the comparison itself can't be cached.
    const s = pre && pre.score !== undefined ? pre.score : score(state, depth);
    if (!this.opts.exhaustive) {
      const cut = this.opts.allLines ? (s > this.bestScore) : (s >= this.bestScore);
      if (cut) { this.pruned++; return; }
    }

    // Dedup: full fingerprint including mana (mana affects what actions are available)
    // [E18] Reuse the parent-computed fingerprint, but RE-CHECK visited — a sibling
    // explored between the parent's early check and now may have claimed this fp.
    const fp = pre && pre.fp !== undefined ? pre.fp : state.fingerprint();
    const prev = this.visited.get(fp);
    if (prev !== undefined && prev <= depth) { this.pruned++; return; }
    this.visited.set(fp, depth);

    // [E11] Build the present Set ONCE for this node, then thread it through
    // every checkCombos / checkVictory / analyzeState / generateActions call so
    // the per-detector prefilter can short-circuit without rebuilding the Set.
    // The Set is hand∪BF post-equiv-expansion; see Solver.buildPresentSet.
    //
    // [E14] The PARENT already computed present/infiniteMana/analysis for this
    // state when it generated and sorted its children (for the heuristic + the
    // canReachCombo prune). Reuse those here instead of recomputing — this state's
    // board/hand/mana are identical to what the parent saw. Saves one
    // buildPresentSet (the single hottest function) + one checkCombos + one
    // analyzeState per non-root node. Falls back to computing for the root, which
    // has no parent. Note: these are computed AFTER the dedup check above, so a
    // deduped node still pays nothing extra — but a node that survives dedup now
    // skips the duplicate work the parent already did.
    const present      = pre ? pre.present      : buildPresentSet(state);
    const infiniteMana = pre ? pre.infiniteMana : checkCombos(state, present);
    const analysis     = pre ? pre.analysis     : analyzeState(state, infiniteMana, present);

    // Combo/victory check (pass pre-computed infiniteMana + present for prefilter)
    const combo = checkVictory(state, infiniteMana, present);
    if (combo) {
      // #1: Reconstruct path only on win
      const node = { state, parent: parentNode };
      if (combo.deployed) {
        // Fully deployed — this is a terminal win, stop exploring this branch
        this._recordWin(reconstructPath(node), combo, s);
        if (this.opts.firstWin) {
	  // Stop exploring as we've found the first winning line
          this.opts.maxStates = this.statesExplored -1;
        }
        return;
      }
      // Win reachable but pieces not yet deployed on battlefield.
      // Store as fallback (does NOT affect bestScore / pruning).
      // Keep searching this branch to find the fully deployed state.
      if (!this.fallbackWin) {
        this.fallbackWin = { line: reconstructPath(node), combo, score: s };
      } else if (s < this.fallbackWin.score) {
        this.fallbackWin = { line: reconstructPath(node), combo, score: s };
      }
      // Don't return — continue exploring to deploy the remaining pieces
    }

    // #2 / #4 / #8: Generate children with lazy pruning per child.
    // [E18] Reordered for performance: apply the CHEAP rejection tests
    // (score-prune + dedup) BEFORE the expensive present/checkCombos/analyzeState
    // computation. ~75% of generated children are score-pruned or deduped on
    // entry; computing their present-set/combos/analysis (the hot path) was pure
    // waste. We now compute those only for children that survive both filters.
    // The surviving child's fp/present/combos/analysis are threaded via `pre` so
    // the child's own _dfs reuses them (E14) — including the fingerprint (E18),
    // which the child no longer recomputes.
    //
    // statesExplored accounting is preserved exactly: a child rejected here would
    // have entered _dfs, incremented the counter, and returned at the same filter.
    // We replicate that +1 so state counts stay identical to the un-reordered code.
    const actions = generateActions(state, analysis.present, this.opts.exhaustive);
    const children = [];
    const childDepth = depth + 1;
    const childExceedsTurn = false; // turn check handled in child _dfs (cheap)
    for (const action of actions) {
      let next;
      try { next = action.apply(state); }
      catch (e) { if (this.opts.verbose) console.warn(`[${action.label}]`, e.message); continue; }
      if (!next) continue;

      // Mirror the child _dfs entry guards in order, counting each as one state.
      // Budget guard FIRST (before the count) so early-rejects can never push
      // statesExplored beyond the maxStates+1 ceiling that a bare _dfs entry
      // would reach — preserving the solver budget invariant exactly.
      // 1) Score prune — score is monotone along the path, so a child at score
      //    ≥ bestScore (or > in allLines) can be skipped exactly as _dfs would.
      const childScore = score(next, childDepth);
      if (!this.opts.exhaustive) {
        const cut = this.opts.allLines ? (childScore > this.bestScore) : (childScore >= this.bestScore);
        if (cut) {
          if (this.statesExplored > this.opts.maxStates) break;
          this.statesExplored++; this.pruned++;
          continue;
        }
      }
      // 2) Dedup — compute the child fingerprint ONCE here; if already visited at
      //    depth ≤ childDepth it would be deduped on entry. Skip without paying
      //    for present/combos/analysis. The fp is reused by the surviving child.
      const childFp = next.fingerprint();
      const prevSeen = this.visited.get(childFp);
      if (prevSeen !== undefined && prevSeen <= childDepth) {
        if (this.statesExplored > this.opts.maxStates) break;
        this.statesExplored++; this.pruned++;
        continue;
      }

      // Survives cheap filters — now compute the expensive analysis (needed for
      // the heuristic, canReachCombo, and child reuse).
      const childPresent = buildPresentSet(next);
      const childInfiniteMana = checkCombos(next, childPresent);

      // 2b) Mana-dominance prune — a state identical to an already-seen one
      //     (reached via a path no longer) except for strictly-less-or-equal
      //     mana in every color adds nothing exact dedup wouldn't already
      //     catch if the mana matched too. See _isManaDominated() for the
      //     full soundness argument.
      //
      //     MUST run after checkCombos, and MUST NOT prune a state that is
      //     itself an immediate win (checked via checkVictory, reusing
      //     childInfiniteMana/childPresent so this costs nothing beyond
      //     what canReachCombo below needs anyway). Pruning a winning state
      //     before it's ever recognized as one is the bug that caused the
      //     mana-dominance feature to be reverted, then reinstated with
      //     this fix — see O-40/O-42 in ToDo.md for the full history. The
      //     soundness proof for dominance ("the dominator can eventually
      //     reach anything the dominated state could") is a claim about
      //     abstract reachability; it says nothing about whether the
      //     dominator is actually explored in time by THIS heuristic- and
      //     budget-driven search. A state that's a win right now is a
      //     certainty this instant — discarding it in favor of a
      //     theoretical, possibly-never-actually-explored substitute
      //     elsewhere in the tree is not safe, even when the abstract
      //     dominance relationship holds.
      //
      //     Must call checkVictory unconditionally here (not gated behind
      //     childInfiniteMana being truthy) — checkVictory can also
      //     succeed via WIN_CONDITIONS that don't require an infinite-mana
      //     combo at all (e.g. "Win: Tutor for Finisher", "Win: Draw
      //     Library"). Gating this call behind childInfiniteMana was a
      //     second bug on top of the depth-blindness one: it silently
      //     skipped the win-check for exactly the states most likely to
      //     need it.
      const childCombo = !this.opts.exhaustive
        ? checkVictory(next, childInfiniteMana, childPresent)
        : null;
      // Phased activation: only apply once a first win has set bestScore.
      // See the long comment on _isManaDominated for why — briefly, before
      // any win is found, pruning a "worse" (dominated) candidate can
      // discard exactly the quick, mediocre win that would have tightened
      // bestScore early, which is what makes score-pruning (a much more
      // powerful mechanism) effective for the rest of the search. Once a
      // first win exists, dominance pruning only ever removes states that
      // provably can't beat it, so this risk no longer applies.
      if (!this.opts.exhaustive && !childCombo && this.bestScore !== Infinity &&
          this._isManaDominated(next, childFp, childDepth, this.manaFrontier)) {
        if (this.statesExplored > this.opts.maxStates) break;
        this.statesExplored++; this.pruned++;
        continue;
      }

      const childAnalysis = analyzeState(next, childInfiniteMana, childPresent);
      // Fix #4: prune unreachable children before they enter the sort list
      if (!this.opts.exhaustive) {
        const childTurns = this.opts.maxTurns - next.turn;
        if (childTurns >= 0 && !canReachCombo(next, childTurns + 1, childAnalysis, childInfiniteMana)) {
          this.pruned++;
          continue;
        }
      }
      children.push({
        next,
        // [O-8] heuristicBias is null by default — `+ 0` is a guaranteed
        // no-op so existing state counts/bench.js results are unaffected
        // unless a caller (AdversarialSolver) explicitly supplies one.
        h: heuristic(childAnalysis.minMissing, next, this.opts.exhaustive, childInfiniteMana) +
           (this.opts.heuristicBias ? this.opts.heuristicBias(next) : 0),
        // [E14] Carry the values computed here so the recursive _dfs call on this
        // child reuses them instead of recomputing buildPresentSet/checkCombos/
        // analyzeState. These describe `next` exactly and stay valid until used.
        // [E18] Also carry the fingerprint and score already computed above so the
        // child's _dfs skips recomputing them (fingerprint is the 2nd-hottest fn).
        pre: { present: childPresent, infiniteMana: childInfiniteMana, analysis: childAnalysis, fp: childFp, score: childScore },
      });
    }

    // #8: Skip sort when trivially ordered
    if (children.length > 1) children.sort((a, b) => a.h - b.h);

    // #1: Build current node for parent-pointer chain
    const node = { state, parent: parentNode };
    for (const { next, pre: childPre } of children) {
      // Budget pre-check: child generation above may have consumed budget via
      // early-rejects, so stop before entering _dfs if we're already at the
      // ceiling — otherwise the _dfs entry increment could push past maxStates+1.
      if (this.statesExplored > this.opts.maxStates) return;
      this._dfs(next, node, depth + 1, childPre);
      if (this.statesExplored > this.opts.maxStates) return;
    }
  }

  // ── BFS ───────────────────────────────────────────────────────────────────
  // #5:  BFS applies canReachCombo pruning
  // #7:  Parent-pointer nodes (no path array copies)
  // #12: Turn-stratified queue + heuristic child ordering.
  //
  //   Root cause of BFS finding longer paths than DFS:
  //   A plain FIFO queue orders states by total depth. A short-step turn-3 path
  //   (depth 14) is dequeued before a long-step turn-2 path (depth 18), so BFS
  //   reports the turn-3 solution.
  //
  //   Fix: maintain one queue per turn. Process the entire turn-N queue before
  //   starting turn-(N+1). Within each turn queue, children are inserted in
  //   heuristic order so the best action sequence is explored first and the
  //   shortest step-count path within that turn is found early.
  //
  //   Result: BFS now matches DFS on turn number while still guaranteeing the
  //   fewest steps within the winning turn.

  // ── Iterative-deepening DFS (turn-level) ─────────────────────────────────
  // Runs _dfs with maxTurns=1, then 2, then 3, ... up to this.opts.maxTurns,
  // stopping the moment any pass finds a win. Each pass uses firstWin=true so
  // it exits immediately on the first deployed win — the best win within that
  // turn budget. The shared statesExplored budget accumulates across passes.
  //
  // Why this solves the T4 blowout:
  // Standard DFS(maxTurns=4) explores T4 branches depth-first before completing
  // all T3 paths. Hands with GSZ (or other X-cost tutors) have enormous T4
  // branching because X-cost exclusion prevents the search-spell penalty from
  // guiding DFS toward the winning T3 cast. IDDFS avoids this by exhausting T3
  // before ever generating T4 states.
  //
  // Visited map reset between passes: a T2 fingerprint stored at depth D could
  // block re-entry to the same state at depth D+k in a T3 pass (the depth-gate
  // at _dfs line 735 prunes revisits at the same or shallower depth). Resetting
  // ensures each pass is a clean search.
  _iddfs(initialState) {
    const savedMaxTurns  = this.opts.maxTurns;
    const savedFirstWin  = this.opts.firstWin;
    this.opts.firstWin   = true;  // each pass stops at first win

    for (let t = 1; t <= savedMaxTurns; t++) {
      this.opts.maxTurns = t;
      this.visited       = new Map();          // fresh dedup map each pass
      this.manaFrontier  = new Map();          // fresh mana-dominance frontier each pass
      this._dfs(initialState, null, 0);
      if (this.bestLine) break;                // win found — done
      if (this.statesExplored >= this.opts.maxStates) break; // budget exhausted
    }

    this.opts.maxTurns = savedMaxTurns;
    this.opts.firstWin = savedFirstWin;
  }

  _bfs(initialState) {
    // queues[t] = ordered array of nodes whose state.turn === t
    const queues = Object.create(null);
    const enqueue = (node) => {
      const t = node.state.turn;
      (queues[t] ??= []).push(node);
    };

    enqueue({ state: initialState, parent: null, depth: 0 });
    // [E10] Mark the root as visited so children cannot dedupe back to it.
    this.visited.set(initialState.fingerprint(), 0);

    for (let turn = 1; turn <= this.opts.maxTurns; turn++) {
      const q = queues[turn];
      if (!q) continue;

      for (let qi = 0; qi < q.length; qi++) {
        if (this.statesExplored > this.opts.maxStates) return;

        const node = q[qi];
        q[qi] = null; // [E9] Release reference for GC — queues can grow large
        const { state, depth, pre } = node;
        this.statesExplored++;

        if (state.youLost())            continue;
        if (depth > this.opts.maxDepth) continue;

        // [E10] Note: the visited check used to live HERE (before child
        // generation). It is now done at enqueue time below — that's the
        // only correct place to dedupe in BFS, because dequeue-time dedup
        // wastes budget on each duplicate before discarding it. Fingerprints
        // are stable between enqueue and dequeue (the state object is not
        // mutated while sitting in the queue), so a single check at enqueue
        // is sufficient.

        // [E11] Build present once for this BFS node, share with checkCombos
        // (prefilter), checkVictory (prefilter), analyzeState (skip rebuild),
        // and generateActions ([E2] missingComboCards reuse).
        // [E14] The parent already computed present/infiniteMana/analysis for
        // this node when it enqueued it — reuse them (the root has no parent).
        const present      = pre ? pre.present      : buildPresentSet(state);
        const infiniteMana = pre ? pre.infiniteMana : checkCombos(state, present);
        const combo = checkVictory(state, infiniteMana, present);
        if (combo) {
          if (combo.deployed) {
            this._recordWin(reconstructPath(node), combo, score(state, depth));
            if (!this.opts.allLines) return;  // found best on this turn — done
            continue;
          }
          // Win reachable but not deployed — store as fallback, keep exploring
          const s = score(state, depth);
          if (!this.fallbackWin || s < this.fallbackWin.score) {
            this.fallbackWin = { line: reconstructPath(node), combo, score: s };
          }
          // Fall through to generate children and keep searching
        }

        // Generate and heuristic-sort children, routing each to the correct
        // turn queue (same turn = stays here; pass turn = next turn's queue)
        // [E2] Build present Set once for this node; share with generateActions + children.
        // [E11] present already built above; pass into analyzeState to skip rebuild.
        // [E14] Reuse the parent-computed analysis when available.
        const nodeAnalysis = pre ? pre.analysis : analyzeState(state, infiniteMana, present);
        const actions = generateActions(state, nodeAnalysis.present, this.opts.exhaustive);
        const children = [];
        for (const action of actions) {
          let next;
          try { next = action.apply(state); }
          catch (e) { if (this.opts.verbose) console.warn(`[${action.label}]`, e.message); continue; }
          if (!next || next.turn > this.opts.maxTurns) continue;
          // [E11] Per-child present set + prefilter — same pattern as DFS.
          const childPresent = buildPresentSet(next);
          // [E3] Compute child's infiniteMana once, reuse in analyzeState + canReachCombo + heuristic
          const childInfiniteMana = checkCombos(next, childPresent);
          const ca = analyzeState(next, childInfiniteMana, childPresent);
          const childTurnsLeft = this.opts.maxTurns - next.turn;
          if (!this.opts.exhaustive && childTurnsLeft >= 0 && !canReachCombo(next, childTurnsLeft + 1, ca, childInfiniteMana)) {
            this.pruned++;
            continue;
          }
          // [E10] Duplicate-state pruning at enqueue time, not dequeue time.
          // Without this, two siblings whose action-orderings reach the same
          // state both get enqueued, then both get dequeued (each costing a
          // budget tick), then the second one gets discarded. Empirically on
          // the user-reported BFS hang (sowing_mycospawn,natures_rhythm,
          // boseiju,eldritch_evolution + 7-creature board) this halved the
          // budget waste — 50% of dequeued states were duplicates.
          //
          // The previous version of this check lived at dequeue time. Moving
          // it to enqueue time is correct because state fingerprints are
          // stable between enqueue and dequeue: the state object is not
          // mutated while sitting in the queue (state.clone is the only way
          // to derive a new state, and clone always produces a fresh
          // identity). The root is added to `visited` once at the top of
          // _bfs so its children cannot dedupe back to it.
          const childFp = next.fingerprint();
          if (this.visited.has(childFp)) {
            this.pruned++;
            continue;
          }
          // Mana-dominance prune — same mechanism as DFS. See
          // _isManaDominated() for the full soundness argument, and the
          // critical caveat right below it about never pruning a state
          // that's itself an immediate win. checkVictory is called
          // unconditionally (not gated behind childInfiniteMana) since it
          // can also succeed via WIN_CONDITIONS independent of the
          // mana-combo detectors. Phased activation (only after a first
          // win sets bestScore) matches _dfs — see the long comment on
          // _isManaDominated for why.
          const childCombo = !this.opts.exhaustive
            ? checkVictory(next, childInfiniteMana, childPresent)
            : null;
          if (!this.opts.exhaustive && !childCombo && this.bestScore !== Infinity &&
              this._isManaDominated(next, childFp, depth + 1, this.manaFrontier)) {
            this.pruned++;
            continue;
          }
          this.visited.set(childFp, depth + 1);
          // [E14] Carry the precomputed values so the dequeue of this node reuses
          // them instead of recomputing buildPresentSet/checkCombos/analyzeState.
          // In BFS every enqueued node is dequeued exactly once (dedup happens at
          // enqueue), so this is a 100%-reuse, zero-waste optimization.
          children.push({
            next,
            // [O-8] see DFS site above — null by default, guaranteed no-op.
            h: heuristic(ca.minMissing, next, this.opts.exhaustive, childInfiniteMana) +
               (this.opts.heuristicBias ? this.opts.heuristicBias(next) : 0),
            pre: { present: childPresent, infiniteMana: childInfiniteMana, analysis: ca },
          });
        }
        if (children.length > 1) children.sort((a, b) => a.h - b.h);

        for (const { next, pre } of children) {
          enqueue({ state: next, parent: node, depth: depth + 1, pre });
        }
      }

      // Stop as soon as we have a winning line (found on the earliest turn)
      if (this.bestLine && !this.opts.allLines) return;
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
    this.manaFrontier  = new Map();
    // fallbackWin: stores the best undeployed win (infinite mana + win pieces
    // in hand but not yet on battlefield). Used only if no fully-deployed win
    // is found within the search budget.
    this.fallbackWin   = null;
  }

  _recordWin(path, combo, s) {
    this.linesFound++;
    if (this.opts.allLines) {
      this.allWinLines.push({ line: path, combo, score: s });
    }
    if (s < this.bestScore) {
      this.bestScore = s;
      this.bestLine  = path;
      this.bestCombo = combo;
      if (this.opts.verbose) {
        const finalState = path[path.length - 1];
      }
    }
  }
}

// ── Result printer ────────────────────────────────────────────────────────

/**
 * Print a summary of all winning lines (when allLines: true).
 */
// Re-exported for back-compat and testing (#9: moved out of actions)
// ── Win Assembly Phase ───────────────────────────────────────────────────
// Given a state with infinite mana and a bridge win condition (Duskwatch,
// Tutor for Finisher), simulate the deterministic steps to assemble a
// terminal win (Hitzel's Sequence, etc.).
//
// With infinite mana every cost is payable, so the assembly phase doesn't
// track mana — it only tracks zone changes: library → hand → battlefield,
// graveyard → hand (via Eternal Witness), hand → battlefield (land plays).
//
// Returns { steps: string[], finalState: GameState } or null if no
// terminal win can be assembled from the current state.

function assembleWin(state) {
  const steps = [];
  let s = state;

  // ── searchFor: library search that works with unknown-card libraries ────
  // GameState.searchLibraryFor uses findIndex(fn) which never matches 'unknown'
  // slots.  When the library is all-unknown (built from librarySize only, no
  // explicit decklist), substitute one unknown slot with the requested card so
  // the rest of assembleWin can generate correct step-by-step instructions.
  function searchFor(cardKey) {
    // First try the real search (exact key in library)
    const real = s.searchLibraryFor(k => k === cardKey);
    if (real.cardKey) return real;
    // Unknown library fallback: synthesise the card from an unknown slot
    if (isUnknownLibrary()) {
      const lib = s.players[0].library;
      const unknownIdx = lib.indexOf('unknown');
      if (unknownIdx === -1) return { state: s, cardKey: null };
      const patched = s.clone();
      patched._ensurePlayers();
      patched.players[0] = patched.players[0].clone();
      patched.players[0].library = [
        ...lib.slice(0, unknownIdx),
        cardKey,
        ...lib.slice(unknownIdx + 1),
      ];
      return patched.searchLibraryFor(k => k === cardKey);
    }
    return { state: s, cardKey: null };
  }
  // Variant: search from an arbitrary state (not necessarily s)
  function searchFromState(fromState, cardKey) {
    const real = fromState.searchLibraryFor(k => k === cardKey);
    if (real.cardKey) return real;
    if (isUnknownLibrary()) {
      const lib = fromState.players[0].library;
      const unknownIdx = lib.indexOf('unknown');
      if (unknownIdx === -1) return { state: fromState, cardKey: null };
      const patched = fromState.clone();
      patched._ensurePlayers();
      patched.players[0] = patched.players[0].clone();
      patched.players[0].library = [
        ...lib.slice(0, unknownIdx),
        cardKey,
        ...lib.slice(unknownIdx + 1),
      ];
      return patched.searchLibraryFor(k => k === cardKey);
    }
    return { state: fromState, cardKey: null };
  }
  // When the library was built with librarySize only (no explicit decklist),
  // every slot is 'unknown'.  In that case we optimistically assume the full
  // Yeva deck is present — the same assumption WIN_CONDITIONS.check() makes.
  // This ensures assembleWin generates step-by-step instructions even when
  // the Goldfish advisor tab is called without a full decklist.
  function isUnknownLibrary() {
    const lib = s.players[0].library;
    return lib.length > 0 && lib.every(k => k === 'unknown');
  }
  function inLibrary(cardKey) {
    const lib = s.players[0].library;
    if (lib.some(k => k === cardKey)) return true;
    // Unknown library: optimistically assume the full deck is present.
    if (isUnknownLibrary()) {
      // Only claim the card is present if it's actually in the Yeva deck.
      return Object.prototype.hasOwnProperty.call(CARDS, cardKey);
    }
    return false;
  }
  // graveyard stores display names (e.g. "Nature's Rhythm"), matching what
  // enterBattlefield/putInGraveyard uses internally.  Simple includes() check.
  function inGraveyard(cardName) {
    return s.players[0].graveyard.includes(cardName);
  }
  // Return the exact string stored in the graveyard for a given display name.
  // With display-name storage this is always just the name itself.
  function gyKey(cardName) {
    return cardName;
  }
  function inHand(cardKey) {
    return s.hand.includes(cardKey);
  }
  function onField(cardName) {
    return s.hasPermanent(cardName);
  }

  // ── attemptGeierReachUntap: shared by every Geier Reach Sanitarium fetch
  // path (hand, Crop Rotation, Eternal Witness->Crop Rotation, Elvish
  // Reclaimer) ───────────────────────────────────────────────────────────
  // Once Geier Reach is on the battlefield, regardless of which path put
  // it there, the same untap-method detection applies. This was originally
  // written inline only inside the Elvish Reclaimer (C2) fetch path, which
  // meant the Crop Rotation paths (A: from hand, B: Crop Rotation from
  // hand, C1: Eternal Witness recovers Crop Rotation from graveyard) fell
  // straight through to the end of the function with no untap attempt at
  // all — reported gap: a hand using Crop Rotation/Eternal Witness to fetch
  // Geier Reach never even tried to find an untap method, despite having
  // one available (Ashaya + Quirion Ranger + a fetchable Destiny Spinner).
  // Mirrors hasGeierReachUntapper (combos.js) — see that function's
  // comments for the per-config verification (which pieces actually need
  // Ashaya vs which don't, and which bouncer each one-shot ETB requires).
  function attemptGeierReachUntap() {
    // ── O-10: Identify the Sanitarium untap configuration ──────
    // Geier Reach must be untapped repeatedly to mill the table.
    // Detect which untap method is available and document the loop.
    // Mirrors hasGeierReachUntapper (combos.js) — see that function's
    // comments for the per-config verification (which pieces actually
    // need Ashaya vs which don't, and which bouncer each one-shot ETB
    // requires). Deserted Temple (a true land) is checked first since
    // it has no other requirement at all.
    const ashayaOnField = onField('Ashaya, Soul of the Wild');
    const hasBouncerOnField = onField('Temur Sabertooth') || onField('Kogla, the Titan Ape') ||
      inHand('temur_sabertooth') || inHand('kogla');
    const shangChiOnField = onField('Shang-Chi, Master of Kung Fu');
    // Magus / Ley Weaver / Argothian Elder / Hope Tender all tap
    // THEMSELVES as part of their own untap ability (see each
    // card's fn in cards.js) — without Ashaya none of them are
    // lands, so none can re-target themselves, and the loop dies
    // after one cycle. Sustaining without Ashaya needs a bouncer
    // (Temur/Kogla) PLUS Shang-Chi (bypasses summoning sickness on
    // the freshly-recast permanent — Destiny Spinner/Badgermole
    // do NOT substitute here, since both only grant haste to a
    // LAND becoming a creature, not to an existing creature).
    const selfTapSustainable = ashayaOnField || (hasBouncerOnField && shangChiOnField);
    // Ley Weaver / Argothian Elder additionally need a second
    // legal land target when not self-targeting (no X=1 mode,
    // unlike Magus) — Ashaya supplies that target itself; without
    // Ashaya, require another real land on the battlefield.
    const hasSecondLandTarget = ashayaOnField || state.lands().length >= 2;
    let untapMethod = null;

    if (onField('Deserted Temple')) {
      untapMethod = 'Deserted Temple: {1},{T} → untap Geier Reach Sanitarium directly (it\'s a land)';
    } else if (onField('Magus of the Candelabra') && selfTapSustainable) {
      untapMethod = ashayaOnField
        ? 'Magus of the Candelabra: {2},{T} → untap itself + Geier Reach Sanitarium (Forest under Ashaya)'
        : 'Magus of the Candelabra + Temur/Kogla + Shang-Chi: untap Geier Reach, bounce → recast Magus (Shang-Chi bypasses sickness) → repeat';
    } else if (onField('Hope Tender') && selfTapSustainable) {
      untapMethod = ashayaOnField
        ? 'Hope Tender (exert): {1},{T} → untap itself + Geier Reach Sanitarium (Forest under Ashaya)'
        : 'Hope Tender + Temur/Kogla + Shang-Chi: untap Geier Reach, bounce → recast Hope Tender (Shang-Chi bypasses sickness) → repeat';
    } else if (onField('Argothian Elder') && selfTapSustainable && hasSecondLandTarget) {
      untapMethod = ashayaOnField
        ? 'Argothian Elder: {T} → untap itself + Geier Reach Sanitarium (Forest under Ashaya)'
        : 'Argothian Elder + Temur/Kogla + Shang-Chi: untap Geier Reach + another land, bounce → recast Elder (Shang-Chi bypasses sickness) → repeat';
    } else if (onField('Ley Weaver') && selfTapSustainable && hasSecondLandTarget) {
      untapMethod = ashayaOnField
        ? 'Ley Weaver: {T} → untap itself + Geier Reach Sanitarium (Forest under Ashaya)'
        : 'Ley Weaver + Temur/Kogla + Shang-Chi: untap Geier Reach + another land, bounce → recast Ley Weaver (Shang-Chi bypasses sickness) → repeat';
    } else if (ashayaOnField && !onField('Magus of the Candelabra') &&
               (inHand('magus_of_the_candelabra') || (inLibrary('magus_of_the_candelabra') && onField('Duskwatch Recruiter'))) &&
               (shangChiOnField || inHand('shang_chi') || inLibrary('shang_chi') ||
                onField('Badgermole Cub') || inHand('badgermole_cub') || inLibrary('badgermole_cub'))) {
      // Magus isn't deployed yet but is fetchable, and Ashaya is already
      // out — fetch and cast it rather than falling through to the more
      // convoluted Ranger+Destiny Spinner path below (which needs an
      // animator AND Destiny Spinner specifically to be reachable). Magus
      // is strictly simpler once Ashaya is present: {2},{T} untaps itself
      // + Geier Reach directly, no animator step needed at all (Geier
      // Reach is already a land — Magus doesn't need it to be a
      // creature, unlike the Ranger's "untap target creature" ability).
      // CRITICAL: a freshly-cast Magus is summoning sick and its {2},{T}
      // ability genuinely can't activate this turn without a haste
      // source — Ashaya alone does NOT grant haste, it just makes Magus a
      // Forest (a separate property). grantHasteEnabler tries Shang-Chi's
      // static first, then Badgermole Cub's earthbend (legal target under
      // Ashaya — see cards.js's onEnter) as a fallback — both bypass
      // summoning sickness for Magus's own activation. Without either
      // reachable, this branch must not claim the method is ready — fall
      // through to the Ranger+Destiny Spinner path below instead, which
      // doesn't have this same-turn problem (the Ranger itself isn't
      // freshly cast in that path).
      if (!inHand('magus_of_the_candelabra')) {
        const { state: nsMg, cardKey: mgFound } = searchFor('magus_of_the_candelabra');
        if (mgFound) { s = nsMg.addToHand(mgFound); steps.push('Activate Duskwatch Recruiter → find Magus of the Candelabra'); }
      }
      if (inHand('magus_of_the_candelabra')) {
        s = s.removeFromHand('magus_of_the_candelabra');
        s = s.enterBattlefield('magus_of_the_candelabra');
        steps.push('Cast Magus of the Candelabra (infinite mana available)');
        grantHasteEnabler('Magus of the Candelabra');
        untapMethod = 'Magus of the Candelabra: {2},{T} → untap itself + Geier Reach Sanitarium (Forest under Ashaya)';
      }
    } else if (ashayaOnField && !onField('Hope Tender') &&
               (inHand('hope_tender') || (inLibrary('hope_tender') && onField('Duskwatch Recruiter'))) &&
               (shangChiOnField || inHand('shang_chi') || inLibrary('shang_chi') ||
                onField('Badgermole Cub') || inHand('badgermole_cub') || inLibrary('badgermole_cub'))) {
      // Same idea as the Magus branch above, tried when Magus itself isn't
      // reachable at all (e.g. exiled) — Hope Tender is functionally
      // equivalent here: a 1/1 with a self-targeting "{1},{T} [,Exert]:
      // untap target land" ability, just as simple to fetch+cast+haste.
      if (!inHand('hope_tender')) {
        const { state: nsHt, cardKey: htFound } = searchFor('hope_tender');
        if (htFound) { s = nsHt.addToHand(htFound); steps.push('Activate Duskwatch Recruiter → find Hope Tender'); }
      }
      if (inHand('hope_tender')) {
        s = s.removeFromHand('hope_tender');
        s = s.enterBattlefield('hope_tender');
        steps.push('Cast Hope Tender (infinite mana available)');
        grantHasteEnabler('Hope Tender');
        untapMethod = 'Hope Tender (exert): {1},{T} → untap itself + Geier Reach Sanitarium (Forest under Ashaya)';
      }
    } else if (onField('Temur Sabertooth') && onField('Woodcaller Automaton')) {
      // Both pieces are genuinely deployed already — the method is
      // truly ready. (If Woodcaller is only in hand/library, it
      // hasn't been cast yet — that's handled by the fetch-and-cast
      // branch below instead of being described here without
      // actually being executed.)
      untapMethod = 'Woodcaller Automaton ETB + Temur Sabertooth: bounce → recast → untap Geier Reach each loop';
    } else if ((onField('Hyrax Tower Scout') || inHand('hyrax_tower_scout')) &&
               (onField('Destiny Spinner') || inHand('vengeant_earth')) && hasBouncerOnField) {
      // Hyrax's ETB untaps a creature (not a land directly), so
      // Geier Reach must be animated first — Destiny Spinner does
      // this on its own, no Ashaya needed. The ETB is one-shot,
      // so it also needs a bouncer (Temur or Kogla — Hyrax is a
      // Human, so either works) to recast it each cycle.
      const animator = onField('Destiny Spinner') ? 'Destiny Spinner' : 'Vengeant Earth';
      const bouncerName = onField('Temur Sabertooth') ? 'Temur Sabertooth' : 'Kogla, the Titan Ape';
      untapMethod = `Hyrax Tower Scout + ${animator} + ${bouncerName}: Scout ETB untaps Geier Reach (animated creature-land), ${bouncerName} bounces Scout to recast each cycle`;
    } else if ((onField('Wirewood Symbiote') || inHand('wirewood_symbiote')) &&
               (onField('Destiny Spinner') || inHand('vengeant_earth')) && onField('Temur Sabertooth')) {
      // Symbiote's "return an Elf: untap a creature" can target
      // animated Geier Reach — no Ashaya needed (Destiny Spinner
      // alone animates it). The once-per-turn flag is on
      // Symbiote's own id and can't be reset by self-bounce
      // (Symbiote is an Insect, not an Elf — never a legal target
      // of its own ability), so it needs Temur Sabertooth
      // specifically to bounce-and-recast IT each cycle (Kogla's
      // bounce is Human-restricted; Symbiote isn't a Human).
      const animator = onField('Destiny Spinner') ? 'Destiny Spinner' : 'Vengeant Earth';
      untapMethod = `Wirewood Symbiote + ${animator} + Temur Sabertooth: return an Elf → untap Geier Reach (animated creature-land), Temur bounces Symbiote to recast each cycle`;
    } else if ((onField('Quirion Ranger') || onField('Scryb Ranger') || inHand('quirion_ranger') || inHand('scryb_ranger'))
               && ashayaOnField &&
               (onField('Destiny Spinner') || inHand('vengeant_earth') || inHand('destiny_spinner') ||
                (inLibrary('destiny_spinner') && onField('Duskwatch Recruiter')))) {
      // [O-12] Quirion/Scryb Ranger untap a CREATURE, not a land —
      // Geier Reach Sanitarium needs to be animated into a
      // land-creature before either Ranger can target it: either
      // Destiny Spinner ({3}{G}, repeatable) or Vengeant Earth
      // ({1}{G} instant, "until end of turn" — one cast covers
      // the whole turn's loop). Ashaya IS needed here (unlike
      // Hyrax/Symbiote above): the Ranger's bounce COST returns
      // "a Forest you control", and Ashaya is what lets the
      // Ranger return ITSELF to reset its own once-per-turn flag.
      // Fetch Destiny Spinner if it's still in the library rather
      // than relying on Badgermole Cub — Badgermole's earthbend
      // is a one-shot ETB that may have already resolved targeting
      // a DIFFERENT land (e.g. Gaea's Cradle, picked by its
      // deterministic priority order during the actual search,
      // well before Geier Reach was even fetched) — it can't be
      // redirected after the fact, whereas Destiny Spinner is a
      // repeatable activated ability with no such conflict.
      // (Duskwatch Recruiter is guaranteed on field here whenever
      // this fetch branch is reached — it's required by the
      // outer condition's inLibrary clause above — so no
      // additional onField check is needed before searching.)
      if (!onField('Destiny Spinner') && !inHand('destiny_spinner') && inLibrary('destiny_spinner')) {
        const { state: nsDs, cardKey: dsFound } = searchFor('destiny_spinner');
        if (dsFound) { s = nsDs.addToHand(dsFound); steps.push('Activate Duskwatch Recruiter → find Destiny Spinner'); }
      }
      if (!onField('Destiny Spinner') && inHand('destiny_spinner')) {
        s = s.removeFromHand('destiny_spinner');
        s = s.enterBattlefield('destiny_spinner');
        steps.push('Cast Destiny Spinner (infinite mana available)');
      }
      const rangerName = (onField('Quirion Ranger') || inHand('quirion_ranger')) ? 'Quirion Ranger' : 'Scryb Ranger';
      const animator = onField('Destiny Spinner') ? 'Destiny Spinner' : 'Vengeant Earth';
      untapMethod = `${rangerName} + ${animator}: Ranger untaps Geier Reach (animated land-creature under Ashaya)`;
    }

    if (untapMethod) {
      steps.push(`Untap method: ${untapMethod}`);
      steps.push('{2}: Activate Geier Reach Sanitarium (hold priority) → Untap Geier Reach → Repeat to mill entire library');
    } else if (!onField('Woodcaller Automaton') &&
               (onField('Temur Sabertooth') || inHand('temur_sabertooth') || inLibrary('temur_sabertooth')) &&
               (inHand('woodcaller_automaton') || (onField('Duskwatch Recruiter') && inLibrary('woodcaller_automaton')))) {
      // Temur Sabertooth + Woodcaller Automaton is a valid Geier Reach
      // untap engine (see hasGeierReachUntapper in combos.js), but
      // Woodcaller hasn't been cast yet at this point in the
      // narration. If it's already in hand, cast it directly;
      // otherwise fetch it via Duskwatch first (same searchFor/
      // enterBattlefield pattern as the other Duskwatch finds
      // above) — either way, actually execute the step rather
      // than just describing the path in prose.
      if (inHand('woodcaller_automaton')) {
        s = s.removeFromHand('woodcaller_automaton');
        s = s.enterBattlefield('woodcaller_automaton');
        steps.push("Cast Woodcaller Automaton ({2}{G}{G}) — ETB untaps Geier Reach Sanitarium");
        steps.push('Untap method: Woodcaller Automaton ETB + Temur Sabertooth: bounce → recast → untap Geier Reach each loop');
        steps.push('{2}: Activate Geier Reach Sanitarium (hold priority) → Untap Geier Reach → Repeat to mill entire library');
      } else {
        const { state: nsWC, cardKey: wcFound } = searchFor('woodcaller_automaton');
        if (wcFound) {
          s = nsWC.addToHand(wcFound);
          steps.push('Activate Duskwatch Recruiter → find Woodcaller Automaton');
          s = s.removeFromHand(wcFound);
          s = s.enterBattlefield(wcFound);
          steps.push("Cast Woodcaller Automaton ({2}{G}{G}) — ETB untaps Geier Reach Sanitarium");
          steps.push('Untap method: Woodcaller Automaton ETB + Temur Sabertooth: bounce → recast → untap Geier Reach each loop');
          steps.push('{2}: Activate Geier Reach Sanitarium (hold priority) → Untap Geier Reach → Repeat to mill entire library');
        } else {
          steps.push('(Need untap for Geier Reach Sanitarium: Magus of the Candelabra, Woodcaller+Temur, Scryb Ranger+Ashaya, etc.)');
        }
      }
    } else {
      steps.push('(Need untap for Geier Reach Sanitarium: Magus of the Candelabra, Woodcaller+Temur, Scryb Ranger+Ashaya, etc.)');
    }
  }

  // ── grantHasteEnabler: shared by every creature that needs haste to
  // activate its own tap ability the same turn it's cast (Elvish
  // Reclaimer, Magus of the Candelabra, Hope Tender, Ley Weaver,
  // Argothian Elder) ────────────────────────────────────────────────────
  // Originally written inline, hardcoded to Elvish Reclaimer only.
  // Parameterized so the same priority-ordered enabler search (global
  // haste statics → Shang-Chi → Destiny Spinner+Ashaya → Badgermole
  // Cub+Ashaya → fallback) applies to any of the self-tapping untappers.
  // Returns true if haste was granted (or already present), false if no
  // enabler was reachable at all (caller still proceeds — the gap is
  // documented in steps for the pilot, matching the original behavior).
  function grantHasteEnabler(creatureName) {
    const perm = s.battlefield.find(p => p.name === creatureName);
    let hasteGranted = false;

    // 1. Global haste already on field (Concordant Crossroads, Thousand-Year Elixir,
    //    Surrak and Goreclaw) — the creature enters without summoning sickness.
    const GLOBAL_HASTE = ['Concordant Crossroads','Thousand-Year Elixir','Surrak and Goreclaw'];
    if (!hasteGranted && GLOBAL_HASTE.some(n => onField(n))) {
      if (perm) perm.summoningSick = false;
      const enablerName = GLOBAL_HASTE.find(n => onField(n));
      steps.push(`${enablerName}: ${creatureName} enters with haste`);
      hasteGranted = true;
    }

    // 1b. Shang-Chi, Master of Kung Fu — static: "You may activate
    //     abilities of creatures you control as though those creatures
    //     had haste." A summoning-sick creature's own tap ability is
    //     exactly such an activation, so it can use it while Shang-Chi is
    //     on the field. Shang-Chi IS in the default decklist, making this
    //     the most common real-game enabler. If he's in hand, cast him
    //     ({1}{G} — infinite mana available).
    if (!hasteGranted && (onField('Shang-Chi, Master of Kung Fu') || inHand('shang_chi') || inLibrary('shang_chi'))) {
      if (!onField('Shang-Chi, Master of Kung Fu') && !inHand('shang_chi') && inLibrary('shang_chi') && onField('Duskwatch Recruiter')) {
        const { state: nsSc, cardKey: scFound } = searchFor('shang_chi');
        if (scFound) { s = nsSc.addToHand(scFound); steps.push('Activate Duskwatch Recruiter → find Shang-Chi, Master of Kung Fu'); }
      }
      if (!onField('Shang-Chi, Master of Kung Fu') && inHand('shang_chi')) {
        s = s.removeFromHand('shang_chi');
        s = s.enterBattlefield('shang_chi');
        steps.push('Cast Shang-Chi, Master of Kung Fu (infinite mana available)');
      }
      if (onField('Shang-Chi, Master of Kung Fu')) {
        const permNow = s.battlefield.find(p => p.name === creatureName);
        if (permNow) permNow.summoningSick = false;
        steps.push(`Shang-Chi, Master of Kung Fu: activate ${creatureName}'s ability as though it had haste`);
        hasteGranted = true;
      }
    }

    // 2. Destiny Spinner — {3}{G}: animate the creature (a land under Ashaya) → haste
    if (!hasteGranted && onField('Ashaya, Soul of the Wild') &&
        (onField('Destiny Spinner') || inHand('destiny_spinner') || inLibrary('destiny_spinner'))) {
      if (!onField('Destiny Spinner') && !inHand('destiny_spinner') && inLibrary('destiny_spinner') && onField('Duskwatch Recruiter')) {
        const { state: nsDs, cardKey: dsFound } = searchFor('destiny_spinner');
        if (dsFound) { s = nsDs.addToHand(dsFound); steps.push('Activate Duskwatch Recruiter → find Destiny Spinner'); }
      }
      if (!onField('Destiny Spinner') && inHand('destiny_spinner')) {
        s = s.removeFromHand('destiny_spinner');
        s = s.enterBattlefield('destiny_spinner');
        steps.push('Cast Destiny Spinner (infinite mana available)');
      }
      if (onField('Destiny Spinner')) {
        if (perm) perm.summoningSick = false;
        const enchCount = s.battlefield.filter(p => p.types.includes('enchantment')).length;
        steps.push(`Destiny Spinner: {3}{G} → animate ${creatureName} (land under Ashaya) → ${enchCount}/${enchCount} Elemental with haste`);
        hasteGranted = true;
      }
    }

    // 3. Badgermole Cub — ETB earthbend targets a creature-land (legal
    //    under Ashaya — see cards.js's onEnter, fixed to allow this) → haste.
    //    The ETB is one-shot: if Badgermole is ALREADY on the battlefield,
    //    its trigger may already have resolved against a different target
    //    (e.g. Gaea's Cradle, animated earlier in the real search, before
    //    this haste need was even known) — that can't be redirected after
    //    the fact. In that case, Temur Sabertooth is required to bounce
    //    and recast Badgermole for a guaranteed-fresh ETB. If Badgermole
    //    isn't deployed yet, casting it fresh already gives a fresh ETB
    //    with no bounce needed.
    const badgermoleAlreadyDeployed = onField('Badgermole Cub');
    const hasTemurForBadgermole = onField('Temur Sabertooth') || inHand('temur_sabertooth') || inLibrary('temur_sabertooth');
    if (!hasteGranted && onField('Ashaya, Soul of the Wild') &&
        (onField('Badgermole Cub') || inHand('badgermole_cub') || inLibrary('badgermole_cub')) &&
        (!badgermoleAlreadyDeployed || hasTemurForBadgermole)) {
      if (perm) perm.summoningSick = false;
      if (!badgermoleAlreadyDeployed) {
        if (!inHand('badgermole_cub') && inLibrary('badgermole_cub')) {
          if (onField('Duskwatch Recruiter')) {
            const { state: nsBc, cardKey: bcFound } = searchFor('badgermole_cub');
            if (bcFound) { s = nsBc.addToHand(bcFound); steps.push('Activate Duskwatch Recruiter → find Badgermole Cub'); }
          }
        }
        if (inHand('badgermole_cub')) {
          s = s.removeFromHand('badgermole_cub');
          s = s.enterBattlefield('badgermole_cub');
        }
        steps.push(`Badgermole Cub ETB (earthbend): target ${creatureName} (land under Ashaya) → +1/+1 counter and haste`);
      } else {
        // Already deployed with its ETB possibly already spent — bounce
        // and recast via Temur Sabertooth for a guaranteed-fresh trigger.
        if (!onField('Temur Sabertooth')) {
          if (!inHand('temur_sabertooth') && inLibrary('temur_sabertooth') && onField('Duskwatch Recruiter')) {
            const { state: nsTs, cardKey: tsFound } = searchFor('temur_sabertooth');
            if (tsFound) { s = nsTs.addToHand(tsFound); steps.push('Activate Duskwatch Recruiter → find Temur Sabertooth'); }
          }
          if (inHand('temur_sabertooth')) {
            s = s.removeFromHand('temur_sabertooth');
            s = s.enterBattlefield('temur_sabertooth');
            steps.push('Cast Temur Sabertooth (infinite mana available)');
          }
        }
        steps.push("Temur Sabertooth: bounce Badgermole Cub to hand (its ETB may already be spent on a different target)");
        steps.push(`Recast Badgermole Cub — fresh ETB (earthbend): target ${creatureName} (land under Ashaya) → +1/+1 counter and haste`);
      }
      hasteGranted = true;
    }

    // 4. Fallback — note that a haste enabler is needed but not yet available.
    //    (The win line is still valid — this documents the gap for the pilot.)
    if (!hasteGranted) {
      if (perm) perm.summoningSick = false; // allow activation to proceed
      steps.push(`(Need haste enabler for ${creatureName}: Shang-Chi static, Destiny Spinner {3}{G}, Badgermole Cub ETB, or Concordant Crossroads)`);
    }
    return hasteGranted;
  }

  // ── topDecked: note the card that will be drawn at the start of next turn ─
  // Harbinger ETB / Worldly Tutor places a specific card on top of the library.
  // It won't be available until the next draw step — document this clearly and
  // add it to the simulated hand so subsequent assembly steps can reference it.
  if (state.topDecked && !state.hand?.includes(state.topDecked) &&
      !state.battlefield.some(p => p.cardKey === state.topDecked)) {
    const topDef = CARDS[state.topDecked];
    const topName = topDef?.name ?? state.topDecked;
    const sourceMsg = (state.history ?? []).slice().reverse().find(h =>
      h.msg?.includes('top of library') || h.msg?.includes('Worldly Tutor')
    )?.msg ?? null;
    const sourceNote = sourceMsg ? ` — ${sourceMsg}` : ' — Worldly Tutor / Elvish Harbinger ETB';
    steps.push(`(Next turn) Draw ${topName}${sourceNote}`);
    // Simulate it being in hand so subsequent assembly steps can reference it
    s = s.clone();
    s.hand = [...(s.hand ?? []), state.topDecked];
  }

  // ── Step 0: Find Duskwatch Recruiter via tutor if not available ─────────
  // If Duskwatch isn't on field or in hand, check for tutor creatures that
  // can find it (on BF or in hand → cast → activate/ETB to find Duskwatch).
  if (!inHand('duskwatch_recruiter') && !onField('Duskwatch Recruiter')) {

    // Creature tutors on the battlefield that can find Duskwatch
    const BF_CREATURE_TUTORS = [
      { name: 'Formidable Speaker',     step: 'Formidable Speaker: tutor → find Duskwatch Recruiter' },
      { name: 'Fauna Shaman',           step: 'Fauna Shaman: discard, tutor → find Duskwatch Recruiter' },
      { name: 'Survival of the Fittest',step: 'Survival of the Fittest: discard, tutor → find Duskwatch Recruiter' },
      { name: 'Yisan, the Wanderer Bard', step: 'Yisan: activate → find a creature (chain to Duskwatch)' },
    ];
    // Activated abilities with {T} in their cost — a TAPPED permanent can't
    // pay {T} no matter what, but it untaps next turn -- not a permanent
    // blocker. When a bounce-recast engine + global haste are available,
    // show the same-turn acceleration; otherwise the win still stands (just
    // takes effect after the next untap step). See O-19.
    const TAP_COST_TUTORS = new Set(['Fauna Shaman', "Yisan, the Wanderer Bard"]);
    for (const { name, step } of BF_CREATURE_TUTORS) {
      if (onField(name) && inLibrary('duskwatch_recruiter')) {
        // Fauna Shaman / Survival of the Fittest cost "Discard a creature
        // card" — without one in hand (or a way to bounce one there from
        // the battlefield), the ability cannot actually be activated.
        if ((name === 'Fauna Shaman' || name === 'Survival of the Fittest') &&
            !hasCreatureToDiscard(s)) continue;

        const prereqSteps = [];
        const perm = s.battlefield.find(p => p.name === name);

        // [O-19] If `name` is currently tapped, optionally show the
        // bounce + recast acceleration (untaps it this turn instead of
        // waiting for the next untap step) when a bounce engine and a
        // haste enabler (to bypass the recast's summoning sickness for its
        // {T} ability) are both available.
        if (TAP_COST_TUTORS.has(name) && perm?.tapped &&
            (onField('Temur Sabertooth') || onField('Kogla, the Titan Ape') || onField('Cloudstone Curio')) &&
            hasGlobalHaste(s)) {
          const bouncerName = onField('Temur Sabertooth') ? 'Temur Sabertooth'
                            : onField('Kogla, the Titan Ape') ? 'Kogla, the Titan Ape'
                            : 'Cloudstone Curio';
          const ck = NAME_TO_KEY[name];
          let ns = s.removeFromBattlefield(perm.id, null);
          if (ns && ck) {
            ns = ns.enterBattlefield(ck);
            const fresh = ns.battlefield.find(p => p.name === name);
            if (fresh) fresh.summoningSick = false; // hasGlobalHaste(s) confirmed above
            s = ns;
            prereqSteps.push(`{1}{G}: ${bouncerName} bounces ${name} to hand.`);
            prereqSteps.push(`Recast ${name} (untapped — haste enabler bypasses summoning sickness for its {T} ability).`);
          }
        }

        // [O-19] Fauna Shaman needs a creature card in hand to discard. If
        // none is in hand yet, bounce one from the battlefield first.
        if (name === 'Fauna Shaman' &&
            !s.hand?.some(k => CARDS[k]?.types?.includes('creature'))) {
          const bouncerName = onField('Temur Sabertooth') ? 'Temur Sabertooth'
                            : onField('Kogla, the Titan Ape') ? 'Kogla, the Titan Ape'
                            : null;
          const fodder = s.creatures().find(c =>
            c.name !== name &&
            c.name !== 'Temur Sabertooth' && c.name !== 'Kogla, the Titan Ape' &&
            c.cardKey !== 'shang_chi'); // don't discard the haste enabler this loop relies on
          if (bouncerName && fodder) {
            const ns = s.removeFromBattlefield(fodder.id, 'graveyard');
            if (ns) {
              s = ns;
              prereqSteps.push(`{1}{G}: ${bouncerName} bounces ${fodder.name} to hand (discard fodder for Fauna Shaman).`);
            }
          }
        }

        const { state: ns, cardKey: found } = searchFor('duskwatch_recruiter');
        if (found) {
          s = ns.addToHand(found);
          steps.push(...prereqSteps, step);
          break;
        }
      }
    }

    // Creature tutors in hand that can be cast → ETB/activate to find Duskwatch
    const HAND_CREATURE_TUTORS = [
      { key: 'formidable_speaker',  name: 'Formidable Speaker',
        step: 'Cast Formidable Speaker → tutor for Duskwatch Recruiter' },
      { key: 'fauna_shaman',        name: 'Fauna Shaman',
        step: 'Cast Fauna Shaman → discard, tutor for Duskwatch Recruiter' },
      { key: 'survival_fittest',    name: 'Survival of the Fittest',
        step: 'Cast Survival of the Fittest → discard, tutor for Duskwatch Recruiter' },
      { key: 'yisan',               name: 'Yisan, the Wanderer Bard',
        step: 'Cast Yisan → activate to chain toward Duskwatch Recruiter' },
      { key: 'elvish_harbinger',    name: 'Elvish Harbinger',
        step: 'Cast Elvish Harbinger → ETB: find Duskwatch Recruiter (or Formidable Speaker → Duskwatch)' },
    ];
    if (!inHand('duskwatch_recruiter') && !onField('Duskwatch Recruiter')) {
      for (const { key, name, step } of HAND_CREATURE_TUTORS) {
        if (inHand(key) && inLibrary('duskwatch_recruiter')) {
          // Same "discard a creature card" cost check as above, evaluated
          // as if `key` itself has already left the hand by being cast.
          if ((key === 'fauna_shaman' || key === 'survival_fittest') &&
              !hasCreatureToDiscard(s, key)) continue;
          s = s.removeFromHand(key);
          s = s.enterBattlefield(key);
          const perm = s.battlefield.find(p => p.name === name);
          if (perm) perm.summoningSick = false;
          const { state: ns, cardKey: found } = searchFor('duskwatch_recruiter');
          if (found) {
            s = ns.addToHand(found);
            steps.push(step);
            break;
          }
        }
      }
    }

    // ETB chain tutors from hand: Woodland Bellower → Duskwatch directly
    if (!inHand('duskwatch_recruiter') && !onField('Duskwatch Recruiter')) {
      if (inHand('woodland_bellower') && inLibrary('duskwatch_recruiter')) {
        s = s.removeFromHand('woodland_bellower');
        s = s.enterBattlefield('woodland_bellower');
        const { state: ns, cardKey: found } = searchFor('duskwatch_recruiter');
        if (found) {
          s = ns.enterBattlefield(found);
          // summoningSick not cleared: assembleWin never invokes Duskwatch's tap ability;
          // it's handled entirely by WIN_CONDITIONS. Sickness state is irrelevant here.
          steps.push('Cast Woodland Bellower → ETB: fetch Duskwatch Recruiter onto battlefield');
        }
      } else if (inHand('fierce_empath') && inLibrary('woodland_bellower')) {
        s = s.removeFromHand('fierce_empath');
        s = s.enterBattlefield('fierce_empath');
        const { state: ns1, cardKey: bellow } = searchFor('woodland_bellower');
        if (bellow) {
          s = ns1.addToHand(bellow);
          steps.push('Cast Fierce Empath → ETB: find Woodland Bellower');
          s = s.removeFromHand('woodland_bellower');
          s = s.enterBattlefield('woodland_bellower');
          if (inLibrary('duskwatch_recruiter')) {
            const { state: ns2, cardKey: dw } = searchFor('duskwatch_recruiter');
            if (dw) {
              s = ns2.enterBattlefield(dw);
              // summoningSick not cleared — see note at Woodland Bellower path above.
              steps.push('Cast Woodland Bellower → ETB: fetch Duskwatch Recruiter onto battlefield');
            }
          }
        }
      }
    }

    // Spell tutors from hand that fetch Duskwatch
    const HAND_SPELL_TUTORS = [
      { key: 'green_suns_zenith',  step: "Cast Green Sun's Zenith (X=2) → Duskwatch Recruiter onto battlefield" },
      { key: 'chord_of_calling',   step: 'Cast Chord of Calling (X=2) → Duskwatch Recruiter onto battlefield' },
      { key: 'natures_rhythm',     step: "Cast Nature's Rhythm (X=2) → Duskwatch Recruiter onto battlefield" },
      { key: 'summoners_pact',     step: "Summoner's Pact → Duskwatch Recruiter to hand" },
      { key: 'shared_summons',     step: 'Cast Shared Summons → Duskwatch Recruiter + Endurance to hand' },
      { key: 'archdruid_charm',    step: "Cast Archdruid's Charm → Duskwatch Recruiter to hand" },
      { key: 'eldritch_evolution',  step: 'Cast Eldritch Evolution (sacrifice a 1-drop) → Duskwatch Recruiter onto battlefield' },
      { key: 'natural_order',      step: 'Cast Natural Order (sacrifice green creature) → Duskwatch Recruiter onto battlefield' },
      { key: 'worldly_tutor',      step: 'Cast Worldly Tutor → Duskwatch Recruiter on top of library (draw next)' },
    ];
    if (!inHand('duskwatch_recruiter') && !onField('Duskwatch Recruiter')) {
      for (const { key, step } of HAND_SPELL_TUTORS) {
        if (inHand(key) && inLibrary('duskwatch_recruiter')) {
          // For BF-fetch tutors, put Duskwatch directly on field
          const BF_FETCH = new Set(['green_suns_zenith','chord_of_calling','natures_rhythm','eldritch_evolution','natural_order']);
          s = s.removeFromHand(key);
          if (BF_FETCH.has(key)) {
            const { state: ns, cardKey: found } = searchFor('duskwatch_recruiter');
            if (found) {
              s = ns.enterBattlefield(found);
              // summoningSick not cleared — see note at Woodland Bellower path above.
              steps.push(step);
            }
          } else {
            const { state: ns, cardKey: found } = searchFor('duskwatch_recruiter');
            if (found) {
              s = ns.addToHand(found);
              steps.push(step);
            }
          }
          break;
        }
      }
    }

    // Graveyard spell tutors via Harmonize
    // Nature's Rhythm Harmonize {X}{G}{G}{G}{G}: cast from GY → creature MV≤X → battlefield, exile spell.
    if (!inHand('duskwatch_recruiter') && !onField('Duskwatch Recruiter')) {
      const HARMONIZE_TUTORS = [
        { name: "Nature's Rhythm",
          step: "Harmonize Nature's Rhythm from graveyard (pay {2}{G}{G}{G}{G}, exile) → Duskwatch Recruiter (MV 2) onto battlefield" },
      ];
      for (const { name, step } of HARMONIZE_TUTORS) {
        if (inGraveyard(name) && inLibrary('duskwatch_recruiter')) {
          s = s.exileFromGraveyard(0, gyKey(name));
          const { state: ns, cardKey: found } = searchFor('duskwatch_recruiter');
          if (found) {
            s = ns.enterBattlefield(found);
            // summoningSick not cleared — see note at Woodland Bellower path above.
            steps.push(step);
            break;
          }
        }
      }
    }

    // Crop Rotation → War Room (land path to draw into finisher)
    if (!inHand('duskwatch_recruiter') && !onField('Duskwatch Recruiter') &&
        inHand('crop_rotation') && s.lands().length > 0 && inLibrary('war_room')) {
      steps.push('Crop Rotation → sacrifice a land (Forest under Ashaya) → fetch War Room');
      steps.push('Activate War Room repeatedly (pay life) → draw until Duskwatch Recruiter or finisher found');
    }
  }

  // ── Step 1: If Duskwatch is in hand, cast it ───────────────────────────
  if (inHand('duskwatch_recruiter') && !onField('Duskwatch Recruiter')) {
    s = s.removeFromHand('duskwatch_recruiter');
    s = s.enterBattlefield('duskwatch_recruiter');
    // summoningSick not cleared: assembleWin represents Duskwatch activations as
    // narrative steps rather than state-machine taps, so sickness state is irrelevant.
    // Duskwatch's {2G} (no {T}) ability is handled by WIN_CONDITIONS, not by this state.
    steps.push('Cast Duskwatch Recruiter (infinite mana available)');
  }

  // ── Step 2: Activate Duskwatch to find key creatures from library ──────
  // Target priority: pieces needed for Hitzel's Sequence.
  // Temur Sabertooth and Kogla are functional equivalents — only ONE bounce
  // engine is required. Prefer Temur (simpler variant, no EW needed in loop).
  // If Kogla is chosen instead, Eternal Witness is also needed for its loop.

  if (onField('Duskwatch Recruiter')) {
    // Determine which bounce engine to use (prefer whatever is already available)
    const hasBounceEngine = onField('Temur Sabertooth') || inHand('temur_sabertooth') ||
                            onField('Kogla, the Titan Ape') || inHand('kogla');
    const useKogla = !hasBounceEngine
      ? !inLibrary('temur_sabertooth') && inLibrary('kogla') // Temur not in lib, Kogla is
      : (onField('Kogla, the Titan Ape') || inHand('kogla')) &&
        !onField('Temur Sabertooth') && !inHand('temur_sabertooth');

    const HITZEL_CREATURES = [
      { key: 'endurance',        name: 'Endurance' },
      // Only fetch EW if using Kogla variant (EW is part of Kogla's loop)
      ...(useKogla ? [{ key: 'eternal_witness', name: 'Eternal Witness' }] : []),
      // Fetch the chosen bounce engine if not already available
      ...(hasBounceEngine ? [] : useKogla
        ? [{ key: 'kogla', name: 'Kogla, the Titan Ape' }]
        : [{ key: 'temur_sabertooth', name: 'Temur Sabertooth' }]),
    ];

    for (const { key, name } of HITZEL_CREATURES) {
      if (onField(name) || inHand(key)) continue; // already available
      if (inLibrary(key)) {
        const { state: ns, cardKey: found } = searchFor(key);
        if (found) {
          s = ns.addToHand(found);
          steps.push(`Activate Duskwatch Recruiter → find ${name}`);
        }
      }
    }
  }

  // ── Step 3: Recover cards from graveyard via Eternal Witness ───────────
  // If Endurance or other key pieces are in graveyard, get Eternal Witness
  // onto the field and use ETB to recover them.
  const GY_RECOVERY_TARGETS = [
    { key: 'endurance',        name: 'Endurance' },
    { key: 'geier_reach',      name: 'Geier Reach Sanitarium' },
    { key: 'crop_rotation',    name: 'Crop Rotation' },
  ];

  for (const { key, name } of GY_RECOVERY_TARGETS) {
    if (onField(name) || inHand(key)) continue;
    if (!inGraveyard(name)) continue;

    // Need Eternal Witness to recover from graveyard
    if (!inHand('eternal_witness') && !onField('Eternal Witness')) {
      // Try to find EW via Duskwatch
      if (onField('Duskwatch Recruiter') && inLibrary('eternal_witness')) {
        const { state: ns, cardKey: found } = searchFor('eternal_witness');
        if (found) {
          s = ns.addToHand(found);
          steps.push('Activate Duskwatch Recruiter → find Eternal Witness');
        }
      }
    }

    if (inHand('eternal_witness')) {
      s = s.removeFromHand('eternal_witness');
      // Manually handle ETB: recover target from graveyard
      const gyIdx = s.players[0].graveyard.indexOf(gyKey(name));
      if (gyIdx >= 0) {
        s = s.clone();
        s.players[0] = s.players[0].clone();
        s.players[0].graveyard = [
          ...s.players[0].graveyard.slice(0, gyIdx),
          ...s.players[0].graveyard.slice(gyIdx + 1),
        ];
        s = s.addToHand(key);
        s = s.enterBattlefield('eternal_witness');
        steps.push(`Cast Eternal Witness → recover ${name} from graveyard`);
      }
    }
  }

  // ── Step 4: Get Geier Reach Sanitarium onto the battlefield ─────────────
  if (!onField('Geier Reach Sanitarium')) {
    if (inHand('geier_reach')) {
      // Path A: play from hand (land drop)
      s = s.removeFromHand('geier_reach');
      s = s.enterBattlefield('geier_reach');
      steps.push('Play Geier Reach Sanitarium (land drop)');
      attemptGeierReachUntap();
    } else if (inHand('crop_rotation') && inLibrary('geier_reach')) {
      // Path B: Crop Rotation from hand → fetch Geier Reach
      const sacLand = s.lands()[0];
      if (sacLand) {
        s = s.removeFromHand('crop_rotation');
        let ns = s.removeFromBattlefield(sacLand.id, 'graveyard');
        if (ns) {
          const { state: ns2, cardKey: found } = searchFor('geier_reach');
          if (found) {
            s = ns2.enterBattlefield(found);
            steps.push(`Crop Rotation: sacrifice ${sacLand.name} → fetch Geier Reach Sanitarium`);
            attemptGeierReachUntap();
          }
        }
      }
    } else if (inLibrary('geier_reach')) {
      // Path C: need to find a land tutor
      // C1: Crop Rotation in graveyard → Eternal Witness recovers it
      if (inGraveyard('Crop Rotation') && (inHand('eternal_witness') || onField('Eternal Witness'))) {
        if (inHand('eternal_witness')) {
          s = s.removeFromHand('eternal_witness');
          const gyIdx = s.players[0].graveyard.indexOf(gyKey('Crop Rotation'));
          if (gyIdx >= 0) {
            s = s.clone();
            s.players[0] = s.players[0].clone();
            s.players[0].graveyard = [
              ...s.players[0].graveyard.slice(0, gyIdx),
              ...s.players[0].graveyard.slice(gyIdx + 1),
            ];
            s = s.addToHand('crop_rotation');
            s = s.enterBattlefield('eternal_witness');
            steps.push('Cast Eternal Witness → recover Crop Rotation from graveyard');
          }
        }
        if (inHand('crop_rotation')) {
          const sacLand = s.lands()[0];
          if (sacLand) {
            s = s.removeFromHand('crop_rotation');
            let ns = s.removeFromBattlefield(sacLand.id, 'graveyard');
            if (ns) {
              const { state: ns2, cardKey: found } = searchFor('geier_reach');
              if (found) {
                s = ns2.enterBattlefield(found);
                steps.push(`Crop Rotation: sacrifice ${sacLand.name} → fetch Geier Reach Sanitarium`);
                attemptGeierReachUntap();
              }
            }
          }
        }
      }
      // C2: Duskwatch → find Elvish Reclaimer (creature land tutor)
      // Under Ashaya, we also need an expendable creature-Forest to sacrifice.
      // Duskwatch can find both Reclaimer and a sacrifice target in one sequence.
      else if (onField('Duskwatch Recruiter') && (inLibrary('elvish_reclaimer'))) {

        // First find an expendable creature to sacrifice (mana dork, etc.)
        const EXPENDABLE_CREATURES = [
          'llanowar_elves', 'elvish_mystic', 'fyndhorn_elves', 'boreal_druid',
          'birds_of_paradise', 'arbor_elf', 'insidious_fungus', 'treefolk_harbinger',
        ];
        let sacCreatureKey = null;
        for (const ck of EXPENDABLE_CREATURES) {
          if (inLibrary(ck)) { sacCreatureKey = ck; break; }
        }

        const { state: ns, cardKey: found } = searchFor('elvish_reclaimer');
        if (found) {
          s = ns.addToHand(found);
          steps.push('Activate Duskwatch Recruiter → find Elvish Reclaimer');

          // Find expendable creature for sacrifice
          if (sacCreatureKey) {
            const { state: ns2, cardKey: sacFound } = searchFromState(s, sacCreatureKey);
            if (sacFound) {
              s = ns2.addToHand(sacFound);
              const sacName = CARDS[sacFound]?.name ?? sacFound;
              steps.push(`Activate Duskwatch Recruiter → find ${sacName} (sacrifice fodder)`);
              // Cast the expendable creature (becomes Forest under Ashaya).
              // [C-33 cleanup] No need to clear summoningSick — sacrificing a
              // creature is a cost (not an activated ability), and is legal
              // on a sick creature.  The sac target's only purpose is to be
              // sacrificed for Reclaimer's {2}{T}.
              s = s.removeFromHand(sacFound);
              s = s.enterBattlefield(sacFound);
              steps.push(`Cast ${sacName} (sacrifice fodder — becomes Forest under Ashaya)`);
            }
          }

          // Cast Elvish Reclaimer (infinite mana available)
          s = s.removeFromHand(found);
          s = s.enterBattlefield(found);
          steps.push('Cast Elvish Reclaimer (infinite mana available)');

          grantHasteEnabler('Elvish Reclaimer');

          // Activate: sacrifice the expendable creature-Forest to fetch Geier Reach
          const sacTarget = sacCreatureKey
            ? s.battlefield.find(p => p.cardKey === sacCreatureKey)
            : s.lands().find(l =>
                l.name !== "Gaea's Cradle" && l.name !== 'Ashaya, Soul of the Wild' &&
                l.name !== 'Elvish Reclaimer'
              );
          if (sacTarget) {
            let ns3 = s.removeFromBattlefield(sacTarget.id, 'graveyard');
            if (ns3) {
              const { state: ns4, cardKey: gr } = searchFromState(ns3, 'geier_reach');
              if (gr) {
                s = ns4.enterBattlefield(gr);
                steps.push(`Elvish Reclaimer: sacrifice ${sacTarget.name} → fetch Geier Reach Sanitarium`);

                attemptGeierReachUntap();
              }
            }
          }
        }
      }
      // C3: Just note that Geier Reach needs to be fetched
      else if (!onField('Geier Reach Sanitarium')) {
        steps.push('(Geier Reach Sanitarium in library — fetch via Crop Rotation, Elvish Reclaimer, or Sylvan Scrying)');
      }
    }
  }

  // ── Step 5: Cast remaining Hitzel pieces ───────────────────────────────
  // Only one bounce engine (Temur OR Kogla) is needed — cast whichever is
  // in hand. If both somehow ended up in hand (e.g. pre-existing game state),
  // prefer Temur (simpler variant). Never cast both.
  const bounceEngineOnField = onField('Temur Sabertooth') || onField('Kogla, the Titan Ape');
  const bounceEngineChosen = bounceEngineOnField ? null
    : inHand('temur_sabertooth') ? 'temur_sabertooth'
    : inHand('kogla')            ? 'kogla'
    : null;

  // Corrected Hitzel model: Endurance is the recyclable resource that
  // refills OUR library — it is cast DURING the loop when our library runs
  // low, not as setup.  Pre-casting it to the battlefield only makes sense
  // when a re-buy engine exists to return it to hand; otherwise it would be
  // stranded (ETB spent, no way back) and the simple-execution loop expects
  // it in hand.  So only pre-cast Endurance when a re-buy engine is present.
  const enduranceRebuyAvailable =
    onField('Temur Sabertooth') || inHand('temur_sabertooth') ||
    onField('Cloudstone Curio') ||
    (onField('Ashaya, Soul of the Wild') &&
     (onField('Quirion Ranger') || onField('Scryb Ranger'))) ||
    ((onField('Kogla, the Titan Ape') || inHand('kogla')) &&
     (onField('Eternal Witness') || inHand('eternal_witness')));

  const CAST_ORDER = [
    ...(bounceEngineChosen ? [{ key: bounceEngineChosen,
        name: bounceEngineChosen === 'temur_sabertooth' ? 'Temur Sabertooth' : 'Kogla, the Titan Ape' }] : []),
    ...(enduranceRebuyAvailable ? [{ key: 'endurance', name: 'Endurance' }] : []),
  ];

  for (const { key, name } of CAST_ORDER) {
    if (onField(name)) continue;
    if (!inHand(key)) continue;
    s = s.removeFromHand(key);
    s = s.enterBattlefield(key);
    // [C-33 cleanup] No need to clear summoningSick.  Endurance's ETB
    // triggers on enter regardless of sickness; Temur and Kogla both have
    // bounce abilities at {1G} (no tap cost) which after C-33 are correctly
    // legal on a sick creature.  Earlier code cleared sick here as a cheat
    // around the over-restrictive sickness check in Temur's bounce_creature.
    steps.push(`Cast ${name} (infinite mana available)`);
  }

  // ── Step 6: Alternative win conditions ─────────────────────────────────
  // With infinite mana + Duskwatch/EW, check for Infectious Bite, Finale,
  // and Beast Within paths. These may be in hand, graveyard, or library.

  // Helper: recover a non-creature card from graveyard via Eternal Witness
  function recoverFromGY(cardKey, cardName) {
    if (inHand(cardKey) || !inGraveyard(cardName)) return false;
    // Need Eternal Witness
    if (!inHand('eternal_witness') && !onField('Eternal Witness')) {
      if (onField('Duskwatch Recruiter') && inLibrary('eternal_witness')) {
        const { state: ns, cardKey: found } = searchFor('eternal_witness');
        if (found) {
          s = ns.addToHand(found);
          steps.push('Activate Duskwatch Recruiter → find Eternal Witness');
        }
      }
    }
    // If we have a bouncer, we can bounce an existing EW and recast for a new ETB
    if (onField('Eternal Witness') && !inHand('eternal_witness')) {
      if (onField('Temur Sabertooth')) {
        const ew = s.getPermanent('Eternal Witness');
        if (ew) {
          s = s.removeFromBattlefield(ew.id);
          s = s.addToHand('eternal_witness');
          steps.push('Temur Sabertooth: bounce Eternal Witness to hand ({2})');
        }
      } else if (onField('Kogla, the Titan Ape')) {
        const ew = s.getPermanent('Eternal Witness');
        if (ew) {
          s = s.removeFromBattlefield(ew.id);
          s = s.addToHand('eternal_witness');
          steps.push('Kogla, the Titan Ape: return Eternal Witness to hand ({2})');
        }
      }
    }
    if (inHand('eternal_witness')) {
      s = s.removeFromHand('eternal_witness');
      const gyIdx = s.players[0].graveyard.indexOf(gyKey(cardName));
      if (gyIdx >= 0) {
        s = s.clone();
        s.players[0] = s.players[0].clone();
        s.players[0].graveyard = [
          ...s.players[0].graveyard.slice(0, gyIdx),
          ...s.players[0].graveyard.slice(gyIdx + 1),
        ];
        s = s.addToHand(cardKey);
        s = s.enterBattlefield('eternal_witness');
        steps.push(`Cast Eternal Witness → recover ${cardName} from graveyard`);
        return true;
      }
    }
    return false;
  }

  // ── 6a. Infectious Bite (poison win) ──────────────────────────────────
  if (inHand('infectious_bite') || inGraveyard('Infectious Bite')) {
    if (!inHand('infectious_bite')) recoverFromGY('infectious_bite', 'Infectious Bite');
    if (inHand('infectious_bite')) {
      steps.push('');
      steps.push('── Poison Win ──');
      steps.push('Cast Infectious Bite ({1G}) — each opponent gets a poison counter');
      steps.push('With infinite mana + Eternal Witness + bouncer: loop Infectious Bite 10 times');
      steps.push('  1. Cast Infectious Bite → each opponent gets 1 poison counter');
      steps.push('  2. Bounce Eternal Witness with Temur Sabertooth / Kogla ({2})');
      steps.push('  3. Recast Eternal Witness → recover Infectious Bite from graveyard');
      steps.push('  4. Repeat 10 times → all opponents at 10 poison → game over');
    }
  }

  // ── 6b. Finale of Devastation (combat win) ───────────────────────────
  if (inHand('finale_of_devastation') || inGraveyard('Finale of Devastation')) {
    if (!inHand('finale_of_devastation')) recoverFromGY('finale_of_devastation', 'Finale of Devastation');
    if (inHand('finale_of_devastation')) {
      steps.push('');
      steps.push('── Combat Win ──');
      steps.push('Cast Finale of Devastation for X≥10 ({X}{G}{G}, infinite mana available)');
      steps.push('  → Search library/graveyard for a creature, put onto battlefield');
      steps.push('  → All creatures you control get +X/+X and gain haste');
      steps.push('  → Attack with entire board for lethal damage');
    }
  }

  // ── 6c. Beast Within loop (destroy all opponents' permanents) ─────────
  if (inHand('beast_within') || inGraveyard('Beast Within')) {
    if (!inHand('beast_within')) recoverFromGY('beast_within', 'Beast Within');
    if (inHand('beast_within') &&
        (onField('Temur Sabertooth') || onField('Kogla, the Titan Ape')) &&
        (inHand('eternal_witness') || onField('Eternal Witness'))) {
      steps.push('');
      steps.push('── Beast Within Loop (destroy all permanents) ──');
      steps.push('Cast Beast Within ({2G}) targeting an opponent\'s permanent → it becomes a 3/3 Beast');
      steps.push('With infinite mana + Eternal Witness + bouncer:');
      steps.push('  1. Cast Beast Within targeting opponent\'s permanent');
      steps.push('  2. Bounce Eternal Witness ({2})');
      steps.push('  3. Recast Eternal Witness → recover Beast Within from graveyard');
      steps.push('  4. Repeat until all opponents\' non-Beast permanents are destroyed');
      steps.push('  5. Attack with your infinite-power board to kill all 3/3 Beasts and opponents');
    }
  }

  // ── Check if terminal win is now assembled ─────────────────────────────
  const victory = checkVictory(s);
  const terminalWin = victory && victory.deployed && victory.winCondition;

  if (terminalWin) {
    steps.push('');
    steps.push(`✓ Terminal win assembled: ${victory.winCondition}`);

    // ── Emit Hitzel's Sequence execution steps ─────────────────────────────
    // Corrected model: Geier Reach is the mill engine; Endurance refills OUR
    // library (ETB: our graveyard → bottom of our library) so we don't deck
    // first.  Opponents' graveyards are never recycled.  Hold-priority stack
    // executions are valid ways to run the loop (they deny opponents
    // response windows), not requirements — Endurance just needs a fresh
    // cast when our library runs low.
    if (victory.winCondition === "Win: Geier Reach Sanitarium Mill (Hitzel's Sequence)") {
      const hasTemur   = onField('Temur Sabertooth');
      const hasKogla   = onField('Kogla, the Titan Ape');
      const hasAshaya  = onField('Ashaya, Soul of the Wild');
      const hasQR      = onField('Quirion Ranger') || onField('Scryb Ranger');
      const hasLQR     = onField("Legolas's Quick Reflexes") || inHand('legolas_quick_reflexes');
      const hasMagus   = onField('Magus of the Candelabra');
      const hasDestinySpinner = onField('Destiny Spinner');
      const hasVengeantEarth = inHand('vengeant_earth');
      const hasEndurance = onField('Endurance') || inHand('endurance');
      const hasGeier   = onField('Geier Reach Sanitarium');

      steps.push('');
      steps.push('── Hitzel\'s Sequence (execution) ──');

      if (hasTemur) {
        steps.push('Variant: Temur Sabertooth');
        steps.push('  1. Cast Endurance, pass priority.');
        steps.push('  2. Endurance ETB trigger goes on the stack — hold priority.');
        steps.push('  3. {1}{G}: Temur Sabertooth bounces Endurance to hand.');
        steps.push('  4. {2}: Activate Geier Reach Sanitarium — hold priority.');
        if (hasMagus && hasAshaya) {
          steps.push('  5. {X},{T}: Magus of the Candelabra untaps Geier Reach Sanitarium.');
        } else if (hasQR && hasAshaya && (hasDestinySpinner || hasVengeantEarth)) {
          // [O-12] Quirion/Scryb Ranger untap a CREATURE, not a land.
          // Animate Geier Reach Sanitarium into a land-creature first, so
          // the Ranger's "untap target creature" can target it: Destiny
          // Spinner ({3}{G}, repeatable) or Vengeant Earth ({1}{G} instant,
          // "until end of turn" — one cast covers the whole turn's loop).
          const rangerName = onField('Quirion Ranger') ? 'Quirion Ranger' : 'Scryb Ranger';
          if (hasDestinySpinner) {
            steps.push(`  5. {3}{G}: Destiny Spinner animates Geier Reach Sanitarium into a creature.`);
          } else {
            steps.push(`  5. Cast Vengeant Earth ({1}{G}) targeting Geier Reach Sanitarium → it becomes a`);
            steps.push(`     4/4 Elemental with haste until end of turn (lasts the rest of this turn —`);
            steps.push(`     no need to recast for further loops).`);
          }
          steps.push(`     ${rangerName}: return self (Forest land under Ashaya) → untap Geier Reach Sanitarium (now a creature).`);
        } else {
          steps.push('  5. Untap Geier Reach Sanitarium via available untap method.');
        }
        steps.push('  6. {2}: Activate Geier Reach Sanitarium again — hold priority. Repeat from step 5.');
        steps.push('  7. Pass priority — let Endurance ETB resolve (resets our graveyard back to library).');
        steps.push('  8. Recast Endurance, repeat from step 2.');
        steps.push('  → Each opponent draws and discards repeatedly until their library is empty = mill win.');
      } else if (hasKogla) {
        // Pick the removal method that takes Endurance off the battlefield
        // while its ETB is on the stack.  Priority: kill spells (the
        // classically documented variant), then Crop Rotation, then
        // Elvish Reclaimer + Ranger (both Ashaya-dependent).
        const hasBW       = inHand('beast_within') || inGraveyard('Beast Within');
        const hasLQRAny   = hasLQR || inGraveyard("Legolas's Quick Reflexes");
        const hasCropRot  = hasAshaya && (inHand('crop_rotation') || inGraveyard('Crop Rotation'));
        const hasReclaimer = hasAshaya && hasQR && onField('Elvish Reclaimer');

        if (hasBW || hasLQRAny) {
          const killSpell = hasBW ? 'Beast Within' : "Legolas's Quick Reflexes";
          steps.push('Variant: Kogla, the Titan Ape + Eternal Witness');
          steps.push('  1. Cast Endurance, pass priority.');
          steps.push('  2. Endurance ETB on stack — hold priority.');
          if (hasBW) {
            steps.push('  3. Cast Beast Within targeting Endurance (Endurance dies, ETB still on stack).');
          } else {
            steps.push("  3. Legolas's Quick Reflexes on the tap/untap creature: tap-trigger deals lethal to Endurance (ETB still on stack).");
          }
          steps.push('  4. Cast Eternal Witness → return Endurance to hand.');
          steps.push('  5. {1}{G}: Kogla bounces Eternal Witness to hand.');
          steps.push(`  6. Recast Eternal Witness → return ${killSpell} to hand (if it must recur).`);
          steps.push('  7. {2}: Activate Geier Reach Sanitarium — hold priority. Untap. Repeat.');
          steps.push('  8. Let Endurance ETB resolve. Recast Endurance. Repeat.');
        } else if (hasCropRot) {
          steps.push('Variant: Kogla + Eternal Witness + Ashaya + Crop Rotation');
          steps.push('  1. Cast Endurance, pass priority.');
          steps.push('  2. Endurance ETB on stack — hold priority. Under Ashaya, Endurance is a Forest land.');
          steps.push('  3. Cast Crop Rotation (instant): sacrifice Endurance as the additional cost → fetch any land.');
          steps.push('  4. Cast Eternal Witness → return Endurance to hand.');
          steps.push('  5. {1}{G}: Kogla bounces Eternal Witness to hand.');
          steps.push('  6. Recast Eternal Witness → return Crop Rotation to hand.');
          steps.push('  7. {1}{G}: Kogla bounces Eternal Witness to hand.');
          steps.push('  8. {2}: Activate Geier Reach Sanitarium — hold priority. Untap. Repeat.');
          steps.push('  9. Let Endurance ETB resolve. Recast Endurance. Repeat from step 2.');
        } else if (hasReclaimer) {
          const rangerName = onField('Quirion Ranger') ? 'Quirion Ranger' : 'Scryb Ranger';
          steps.push('Variant: Kogla + Eternal Witness + Ashaya + Elvish Reclaimer + ' + rangerName);
          steps.push('  1. Cast Endurance, pass priority.');
          steps.push('  2. Endurance ETB on stack — hold priority. Under Ashaya, Endurance is a Forest land.');
          steps.push('  3. {2},{T}: Elvish Reclaimer sacrifices Endurance (a land) → search for a land.');
          if (onField('Shang-Chi, Master of Kung Fu')) {
            steps.push("     (Shang-Chi's static: Reclaimer may activate even if cast this turn.)");
          }
          steps.push('  4. Cast Eternal Witness → return Endurance to hand.');
          steps.push('  5. {1}{G}: Kogla bounces Eternal Witness to hand.');
          steps.push(`  6. ${rangerName}: return ITSELF (a Forest under Ashaya) to hand → untap Elvish Reclaimer.`);
          steps.push(`  7. Recast ${rangerName} (new object — fresh once-per-turn activation).`);
          steps.push('  8. {2}: Activate Geier Reach Sanitarium — hold priority. Untap. Repeat.');
          steps.push('  9. Let Endurance ETB resolve. Recast Endurance. Repeat from step 2.');
        } else {
          steps.push('Variant: Kogla, the Titan Ape + Eternal Witness');
          steps.push('  (Needs a removal method for Endurance: Beast Within / LQR,');
          steps.push('   or under Ashaya: Crop Rotation, or Elvish Reclaimer + Ranger.)');
        }
      } else if (onField('Cloudstone Curio')) {
        steps.push('Variant: Cloudstone Curio');
        steps.push('  1. Cast Endurance, pass priority.');
        steps.push('  2. Endurance ETB + Cloudstone trigger on stack — Curio returns another creature you control to hand.');
        steps.push('  3. Hold Endurance ETB. Cast the returned creature — its ETB triggers Curio: return Endurance to hand.');
        steps.push('  4. {2}: Activate Geier Reach Sanitarium — hold priority. Untap. Repeat.');
        steps.push('  5. Recast Endurance, alternating with the second creature. Repeat from step 2.');
      } else if (hasAshaya && hasQR && hasLQR) {
        const rangerName = onField('Quirion Ranger') ? 'Quirion Ranger' : 'Scryb Ranger';
        steps.push("Variant: Ashaya + Ranger (Legolas's Quick Reflexes)");
        steps.push("  1. Cast Legolas's Quick Reflexes targeting the tap/untap creature (infinite trigger).");
        steps.push('  2. Cast Endurance, pass priority.');
        steps.push('  3. First ETB goes on stack — hold priority.');
        steps.push(`  4. ${rangerName}: bounce Endurance → it goes to hand. Recast Endurance.`);
        steps.push('  5. Second ETB goes on stack — hold priority.');
        steps.push('  6. Use LQR creature tap to deal lethal damage to Endurance and Ranger.');
        steps.push('  7. Resolve Second ETB (resets graveyard → library, returns Endurance + Ranger).');
        steps.push('  8. {2}: Activate Geier Reach Sanitarium — hold priority. Untap. Repeat.');
        steps.push('  9. Resolve First ETB. Recast Ranger. Recast Endurance. Repeat from step 3.');
      } else if (hasAshaya && hasQR) {
        // Corrected model: no LQR needed.  A Ranger bounces Endurance-as-
        // Forest once per turn per Ranger object — recasts of Endurance are
        // rare (one per ~library-size Geier Reach activations), so the
        // once-per-turn limit is never the bottleneck.
        const rangerName = onField('Quirion Ranger') ? 'Quirion Ranger' : 'Scryb Ranger';
        steps.push('Variant: Ashaya + Ranger (simple bounce — no kill spell)');
        steps.push('  1. {2}: Activate Geier Reach Sanitarium — each player draws, then discards.');
        steps.push('  2. Untap Geier Reach Sanitarium; repeat. Opponents\' libraries shrink by 1 per activation.');
        steps.push('  3. When OUR library runs low: cast Endurance (Flash) — ETB puts our graveyard');
        steps.push('     on the bottom of our library (~doubles our remaining activations).');
        steps.push(`  4. ${rangerName}: return Endurance (a Forest under Ashaya) to hand for a later recast if needed.`);
        steps.push('  5. Continue activating until every opponent draws from an empty library and loses.');
      } else if (hasEndurance) {
        // Simple execution — no re-buy engine on field, Endurance castable
        // from hand.  One fresh cast is normally ample (initial library +
        // recycled graveyard ≈ 2× budget vs ~95 activations needed).
        steps.push('Simple execution (no bounce engine needed — Endurance in hand)');
        steps.push('  1. {2}: Activate Geier Reach Sanitarium — each player draws, then discards.');
        steps.push('  2. Untap Geier Reach Sanitarium; repeat. Opponents\' libraries shrink by 1 per activation;');
        steps.push('     their graveyards are never recycled.');
        steps.push('  3. When OUR library runs low: cast Endurance (Flash) — its ETB puts our graveyard');
        steps.push('     on the bottom of our library, refilling it.');
        steps.push('  4. Continue activating until every opponent draws from an empty library and loses.');
      } else {
        steps.push('  Execute Hitzel\'s Sequence: activate Geier Reach Sanitarium repeatedly (untap each');
        steps.push('  cycle); cast Endurance when our library runs low to recycle our graveyard; opponents');
        steps.push('  deck first since their graveyards are never recycled.');
      }

      if (!hasEndurance) {
        steps.push('  ⚠ Endurance is not yet in hand or on field — fetch via Duskwatch Recruiter first.');
      }
      if (!hasGeier) {
        steps.push('  ⚠ Geier Reach Sanitarium is not on field — Elvish Reclaimer fetch required first.');
      }

    // ── Emit Scrapshooter Mill execution steps ────────────────────────────
    // Mirrors the Hitzel re-buy variants: Scrapshooter's "gift" ETB forces an
    // opponent to draw a card each time it enters. Loop = whatever
    // bounces/recurs Scrapshooter for another ETB.
    } else if (victory.winCondition === 'Win: Scrapshooter Mill (infinite gift draw)') {
      const hasTemur   = onField('Temur Sabertooth');
      const hasCurio   = onField('Cloudstone Curio');
      const hasKogla   = onField('Kogla, the Titan Ape');
      const hasAshaya  = onField('Ashaya, Soul of the Wild');
      const hasQR      = onField('Quirion Ranger') || onField('Scryb Ranger');
      const hasScrapshooter = onField('Scrapshooter') || inHand('scrapshooter');

      steps.push('');
      steps.push('── Scrapshooter Mill (execution) ──');
      steps.push("Each cast: promise the gift to an opponent — when Scrapshooter enters, that opponent draws a card.");

      if (hasTemur) {
        steps.push('Variant: Temur Sabertooth');
        steps.push('  1. Cast Scrapshooter, promising the gift to an opponent — they draw a card.');
        steps.push('  2. {1}{G}: Temur Sabertooth bounces Scrapshooter to hand.');
        steps.push('  3. Recast Scrapshooter (gift again). Repeat.');
        steps.push('  → Rotate the gift target each cycle so every opponent eventually mills out.');
      } else if (hasCurio) {
        steps.push('Variant: Cloudstone Curio');
        steps.push('  1. Cast Scrapshooter, promising the gift — opponent draws a card. ETB triggers Cloudstone Curio:');
        steps.push('     return another creature you control to hand.');
        steps.push('  2. Cast that creature — its ETB triggers Curio: return Scrapshooter to hand.');
        steps.push('  3. Recast Scrapshooter (gift again). Repeat from step 1.');
      } else if (hasKogla) {
        const hasBW       = inHand('beast_within') || inGraveyard('Beast Within');
        const hasLQRAny   = onField("Legolas's Quick Reflexes") || inHand('legolas_quick_reflexes') || inGraveyard("Legolas's Quick Reflexes");
        const hasCropRot  = hasAshaya && (inHand('crop_rotation') || inGraveyard('Crop Rotation'));
        const hasReclaimer = hasAshaya && hasQR && onField('Elvish Reclaimer');

        if (hasBW || hasLQRAny) {
          const killSpell = hasBW ? 'Beast Within' : "Legolas's Quick Reflexes";
          steps.push(`Variant: Kogla, the Titan Ape + Eternal Witness + ${killSpell}`);
          steps.push('  1. Cast Scrapshooter, promising the gift — opponent draws a card.');
          if (hasBW) {
            steps.push("  2. Cast Beast Within targeting Scrapshooter — it dies (opponent gets a 3/3 Beast token).");
          } else {
            steps.push("  2. Legolas's Quick Reflexes: Scrapshooter's tap-trigger deals damage equal to its power to itself — it dies.");
          }
          steps.push(`  3. Cast Eternal Witness → return ${killSpell} to hand.`);
          steps.push('  4. {1}{G}: Kogla bounces Eternal Witness to hand.');
          steps.push('  5. Recast Eternal Witness → return Scrapshooter to hand.');
          steps.push('  6. {1}{G}: Kogla bounces Eternal Witness to hand.');
          steps.push('  7. Recast Scrapshooter (gift again). Repeat from step 2.');
        } else if (hasCropRot) {
          steps.push('Variant: Kogla + Eternal Witness + Ashaya + Crop Rotation');
          steps.push('  1. Cast Scrapshooter, promising the gift — opponent draws a card.');
          steps.push('  2. Under Ashaya, Scrapshooter is a Forest land. Cast Crop Rotation: sacrifice');
          steps.push('     Scrapshooter as the additional cost → fetch any land.');
          steps.push('  3. Cast Eternal Witness → return Crop Rotation to hand.');
          steps.push('  4. {1}{G}: Kogla bounces Eternal Witness to hand.');
          steps.push('  5. Recast Eternal Witness → return Scrapshooter to hand.');
          steps.push('  6. {1}{G}: Kogla bounces Eternal Witness to hand.');
          steps.push('  7. Recast Scrapshooter (gift again). Repeat from step 2.');
        } else if (hasReclaimer) {
          const rangerName = onField('Quirion Ranger') ? 'Quirion Ranger' : 'Scryb Ranger';
          steps.push(`Variant: Kogla + Eternal Witness + Ashaya + Elvish Reclaimer + ${rangerName}`);
          steps.push('  1. Cast Scrapshooter, promising the gift — opponent draws a card.');
          steps.push('  2. {2},{T}: Elvish Reclaimer sacrifices Scrapshooter (a Forest land under Ashaya) →');
          steps.push('     search for a land.');
          steps.push('  3. Cast Eternal Witness → return Scrapshooter to hand.');
          steps.push('  4. {1}{G}: Kogla bounces Eternal Witness to hand.');
          steps.push(`  5. ${rangerName}: return ITSELF (a Forest under Ashaya) to hand → untap Elvish Reclaimer.`);
          steps.push(`  6. Recast ${rangerName} (new object — fresh once-per-turn activation).`);
          steps.push('  7. Recast Scrapshooter (gift again). Repeat from step 2.');
        } else {
          steps.push('Variant: Kogla, the Titan Ape + Eternal Witness');
          steps.push('  (Needs a removal method for Scrapshooter: Beast Within / LQR,');
          steps.push('   or under Ashaya: Crop Rotation, or Elvish Reclaimer + Ranger.)');
        }
      } else {
        steps.push('  Loop Scrapshooter\'s gift ETB with any available bounce/recur engine: cast');
        steps.push('  Scrapshooter (gift → opponent draws), bounce/recur it, recast, repeat.');
      }

      if (!hasScrapshooter) {
        steps.push('  ⚠ Scrapshooter is not yet in hand or on field — fetch via Duskwatch Recruiter first.');
      }

    // ── Emit Mikokoro Mill Line execution steps ───────────────────────────
    } else if (victory.winCondition === 'Win: Mikokoro Mill Line') {
      const hasTemur = onField('Temur Sabertooth');
      const bouncerName = hasTemur ? 'Temur Sabertooth' : 'Kogla, the Titan Ape';
      const hasCropRot  = inHand('crop_rotation') || inGraveyard('Crop Rotation');
      const hasRevival  = inHand('noxious_revival') || inGraveyard('Noxious Revival');
      const hasReclaimer = onField('Elvish Reclaimer');

      steps.push('');
      steps.push('\u2500\u2500 Mikokoro Mill Line (execution) \u2500\u2500');
      steps.push('  1. {2},{T}: Activate Mikokoro, Center of the Sea \u2014 each player draws a card. Hold priority.');
      if (hasCropRot) {
        steps.push('  2. Cast Crop Rotation: sacrifice Mikokoro as the additional cost \u2192 fetch any land.');
        steps.push('     Mikokoro goes to the graveyard.');
      } else if (hasReclaimer) {
        steps.push('  2. {2},{T}: Elvish Reclaimer sacrifices Mikokoro (a land) \u2192 search for a land.');
        steps.push('     Mikokoro goes to the graveyard.');
      } else {
        steps.push('  2. Sacrifice Mikokoro (Crop Rotation, or Elvish Reclaimer if Crop Rotation is unavailable)');
        steps.push('     to fetch any land. Mikokoro goes to the graveyard.');
      }
      if (hasRevival) {
        steps.push('  3. Cast Noxious Revival ({G/P}, can pay 2 life instead of {G}): put Mikokoro from the');
        steps.push('     graveyard on top of your library.');
        steps.push('  4. Cast Eternal Witness \u2192 return Crop Rotation (or whichever sac effect was used) to hand.');
        steps.push(`  5. {1}{G}: ${bouncerName} bounces Eternal Witness to hand.`);
        steps.push('  6. Recast Eternal Witness \u2192 return Noxious Revival to hand.');
        steps.push(`  7. {1}{G}: ${bouncerName} bounces Eternal Witness to hand.`);
        // [O-26] Crop Rotation / Elvish Reclaimer put the fetched land
        // DIRECTLY onto the battlefield (no draw, no land drop) \u2014 since
        // step 3 just put Mikokoro on TOP of the library, recasting/
        // reactivating the SAME sac effect (recurred above) fetches Mikokoro
        // straight back to the battlefield. The land fetched back in step 2
        // becomes this cycle's sacrifice fodder.
        if (hasCropRot) {
          steps.push('  8. Recast Crop Rotation: sacrifice the land fetched in step 2 as the additional cost');
          steps.push('     \u2192 search your library for Mikokoro (now on top, from step 3) \u2192 put it directly');
          steps.push('     onto the battlefield. No draw or land drop needed.');
        } else if (hasReclaimer) {
          steps.push('  8. {2},{T}: Elvish Reclaimer sacrifices the land fetched in step 2 \u2192 search your');
          steps.push('     library for Mikokoro (now on top, from step 3) \u2192 put it onto the battlefield');
          steps.push('     tapped. No draw or land drop needed (untap it via your mana engine before step 1).');
        } else {
          steps.push('  8. Recast the sac-effect from step 2 \u2192 search your library for Mikokoro (now on top,');
          steps.push('     from step 3) \u2192 put it directly onto the battlefield. No draw or land drop needed.');
        }
        steps.push("  9. Mikokoro is back on the battlefield. Let step 1's draw resolve (a normal card,");
        steps.push('     since Mikokoro is no longer in the library) and repeat from step 1.');
        steps.push('  \u2192 Each activation makes every player draw \u2014 opponents mill out before you do.');
      } else {
        steps.push('  \u26a0 Noxious Revival not found \u2014 Mikokoro is stuck in the graveyard after step 2.');
        steps.push('     Cast or recover Noxious Revival ({G/P}, or pay 2 life) to put Mikokoro on top of');
        steps.push('     your library, then loop Eternal Witness (bounced by ' + bouncerName + ') to recur');
        steps.push('     the sacrifice spell + Noxious Revival, drawing Mikokoro back via its own');
        steps.push('     activation each cycle (step 1 makes you draw too).');
        steps.push('     Note: Elvish Reclaimer alone cannot return Mikokoro from the graveyard \u2014 it only');
        steps.push('     sacrifices it as a land. Noxious Revival (or an equivalent effect) is required.');
      }
      if (!onField('Mikokoro, Center of the Sea')) {
        steps.push('  \u26a0 Mikokoro is not yet on the battlefield \u2014 fetch and play it as a land first.');
      }

    // ── Emit Duskwatch Recruiter execution steps ──────────────────────────
    } else if (victory.winCondition === 'Win: Duskwatch Recruiter (find all creatures)') {
      steps.push('');
      steps.push('── Duskwatch Recruiter Sequence (execution) ──');
      steps.push('  1. {2}{G}: Look at the top 3 cards of your library — put a creature card into your hand.');
      steps.push('  2. Repeat (no {T} in the cost — summoning sickness and tapped status never block it) until');
      steps.push('     every creature in your library is in hand.');
      steps.push('  3. Cast every found creature (Yeva grants flash to green creatures).');
      const hasGeierForDW = onField('Geier Reach Sanitarium') || inHand('geier_reach') || inGraveyard('Geier Reach Sanitarium');
      const hasEnduranceForDW = onField('Endurance') || inHand('endurance') || inGraveyard('Endurance');
      if (hasGeierForDW || hasEnduranceForDW) {
        steps.push('  4. Once Geier Reach Sanitarium, Endurance, and a re-buy engine (Temur Sabertooth /');
        steps.push("     Kogla, the Titan Ape) are all in hand or on field, execute Hitzel's Sequence");
        steps.push('     (see steps above for the variant matching your board).');
      } else {
        steps.push('  4. Among the creatures found: Endurance, Temur Sabertooth or Kogla, the Titan Ape, and');
        steps.push("     Eternal Witness set up Hitzel's Sequence (with Geier Reach Sanitarium played as a land).");
      }
      steps.push('  5. Alternatively: find Beast Whisperer to draw your entire deck, or any other finisher');
      steps.push('     (Finale of Devastation, Infectious Bite).');

    // ── Emit Draw Library execution steps ─────────────────────────────────
    } else if (victory.winCondition === 'Win: Draw Library (Beast Whisperer / Glademuse + Creature Loop)') {
      steps.push('');
      steps.push('── Draw Library (execution) ──');
      if (onField('Beast Whisperer') || inHand('beast_whisperer')) {
        steps.push('  Beast Whisperer: whenever you cast a creature spell, draw a card.');
        if (onField('Ashaya, Soul of the Wild') &&
            (onField('Quirion Ranger') || onField('Scryb Ranger'))) {
          const rangerName = onField('Quirion Ranger') ? 'Quirion Ranger' : 'Scryb Ranger';
          steps.push(`  1. ${rangerName}: return ITSELF (a Forest under Ashaya) to hand, untapping any creature.`);
          steps.push(`  2. Recast ${rangerName} — Beast Whisperer triggers: draw a card.`);
        } else if (onField('Temur Sabertooth') || onField('Kogla, the Titan Ape')) {
          const bouncerName = onField('Temur Sabertooth') ? 'Temur Sabertooth' : 'Kogla, the Titan Ape';
          steps.push(`  1. {1}{G}: ${bouncerName} bounces a creature you control to hand.`);
          steps.push('  2. Recast that creature — Beast Whisperer triggers: draw a card.');
        } else {
          steps.push('  1. With infinite mana, repeatedly bounce and recast any creature you control.');
          steps.push('  2. Each recast triggers Beast Whisperer: draw a card.');
        }
        steps.push('  3. Repeat with infinite mana until your entire library is in hand.');
        steps.push("  4. Cast Finale of Devastation, Infectious Bite, or assemble Hitzel's Sequence with");
        steps.push('     everything now in hand.');
      } else {
        // [O-26] Glademuse's actual oracle: "Whenever a player casts a
        // spell, if it's not their turn, that player draws a card." The
        // GLADEMUSE CONTROLLER draws when THEY cast a spell during someone
        // else's turn — not "whenever an opponent casts a spell".
        steps.push("  Glademuse: whenever YOU cast a spell on someone else's turn, YOU draw a card.");
        steps.push('  1. Pass the turn without casting your creature-recursion pieces.');
        if (onField('Ashaya, Soul of the Wild') &&
            (onField('Quirion Ranger') || onField('Scryb Ranger'))) {
          const rangerName = onField('Quirion Ranger') ? 'Quirion Ranger' : 'Scryb Ranger';
          steps.push(`  2. On an opponent's turn: ${rangerName} returns ITSELF (a Forest under Ashaya) to`);
          steps.push('     hand, untapping any creature.');
          steps.push(`  3. Recast ${rangerName} (Yeva grants flash to green creature spells) — Glademuse`);
          steps.push('     triggers: you draw a card.');
        } else if (onField('Temur Sabertooth') || onField('Kogla, the Titan Ape')) {
          const bouncerName = onField('Temur Sabertooth') ? 'Temur Sabertooth' : 'Kogla, the Titan Ape';
          steps.push(`  2. On an opponent's turn: {1}{G}: ${bouncerName} bounces a creature you control to hand.`);
          steps.push('  3. Recast that creature (Yeva grants flash to green creature spells) — Glademuse');
          steps.push('     triggers: you draw a card.');
        } else {
          steps.push("  2. On an opponent's turn, with infinite mana, repeatedly bounce and recast any");
          steps.push('     creature you control (Yeva grants flash to green creature spells).');
          steps.push('  3. Each recast triggers Glademuse: you draw a card.');
        }
        steps.push('  4. Repeat with infinite mana until your entire library is in hand.');
        steps.push('  5. Cast the finisher found (Finale of Devastation, Infectious Bite, or');
        steps.push("     Hitzel's Sequence) at instant speed (Yeva grants flash).");
      }

    // ── Emit Tutor for Finisher execution steps ───────────────────────────
    } else if (victory.winCondition === 'Win: Tutor for Finisher (infinite mana + creature tutor)') {
      steps.push('');
      steps.push('── Tutor for Finisher (execution) ──');
      steps.push('  1. Activate or cast the available tutor (see steps above) to find a creature.');
      steps.push('  2. Find Duskwatch Recruiter specifically if possible — its repeatable activated ability');
      steps.push('     ({2}{G}: look at top 3, take a creature — no {T}, so tapped/summoning-sick status');
      steps.push('     never blocks it) finds every remaining creature in your library with infinite mana.');
      steps.push("  3. Cast all found creatures, then assemble Hitzel's Sequence (Geier Reach Sanitarium +");
      steps.push('     Endurance + Temur Sabertooth/Kogla), Finale of Devastation X≥10, or Infectious Bite');
      steps.push('     as the pieces allow.');

    // ── Emit Defiler of Vigor execution steps ─────────────────────────────
    } else if (victory.winCondition === 'Win: Defiler of Vigor (infinite +1/+1 counters)') {
      steps.push('');
      steps.push('── Defiler of Vigor (execution) ──');
      steps.push('  Defiler of Vigor: whenever you cast a green permanent spell, put a +1/+1 counter on');
      steps.push("  each creature you control. Defiler also lets you pay 2 life instead of any {G} in a");
      steps.push('  permanent spell\'s cost, accelerating any of the loops below.');
      if (onField('Ashaya, Soul of the Wild') &&
          (onField('Quirion Ranger') || onField('Scryb Ranger'))) {
        const rangerName = onField('Quirion Ranger') ? 'Quirion Ranger' : 'Scryb Ranger';
        steps.push(`  1. ${rangerName}: return ITSELF (a Forest under Ashaya) to hand, untapping a mana dork.`);
        steps.push(`  2. Recast ${rangerName} — a green permanent spell, so Defiler triggers: every creature`);
        steps.push('     you control gets a +1/+1 counter.');
      } else if (onField('Temur Sabertooth') || onField('Kogla, the Titan Ape')) {
        const bouncerName = onField('Temur Sabertooth') ? 'Temur Sabertooth' : 'Kogla, the Titan Ape';
        steps.push(`  1. {1}{G}: ${bouncerName} bounces a green creature you control to hand.`);
        steps.push('  2. Recast it — Defiler triggers: every creature you control gets a +1/+1 counter.');
      } else {
        // [O-35] The detector only fires for Ashaya+Ranger or Temur/Kogla (a
        // genuinely repeatable green-permanent-cast loop). Wirewood Symbiote /
        // a lone Ranger are once-per-turn and never reach here. This fallback
        // describes the same valid mechanism generically.
        steps.push('  1. Bounce a green creature you control to hand via your repeatable recast loop');
        steps.push('     (Temur Sabertooth / Kogla, or Ashaya + a Ranger returning itself).');
        steps.push('  2. Recast it — a green permanent spell, so Defiler triggers: every creature you');
        steps.push('     control gets a +1/+1 counter.');
      }
      steps.push('  3. Repeat with infinite mana — every creature you control gets arbitrarily large.');
      steps.push('  4. Attack with your team for lethal damage.');

    // ── Emit Commander Damage (Great Oak Guardian) execution steps ────────
    } else if (victory.winCondition === 'Win: Commander Damage (Great Oak Guardian + infinite mana → Yeva lethal)') {
      const hasTemurGOG = onField('Temur Sabertooth');
      const hasCurioGOG = onField('Cloudstone Curio');

      steps.push('');
      steps.push('── Commander Damage via Great Oak Guardian (execution) ──');
      steps.push('  1. Cast Great Oak Guardian (Flash) targeting yourself — your creatures (including');
      steps.push('     Yeva, Nature\'s Herald) get +2/+2 until end of turn and untap.');
      if (hasTemurGOG) {
        steps.push('  2. {1}{G}: Temur Sabertooth bounces Great Oak Guardian to hand.');
        steps.push('  3. Recast Great Oak Guardian ({5}{G}) targeting yourself again. Repeat from step 1.');
      } else if (hasCurioGOG) {
        steps.push('  2. ETB triggers Cloudstone Curio: return another creature you control to hand.');
        steps.push('  3. Cast that creature — its ETB triggers Curio: return Great Oak Guardian to hand.');
        steps.push('     Recast it (Flash) targeting yourself again. Repeat from step 1.');
      } else {
        steps.push('  2. Bounce and recast Great Oak Guardian (Temur Sabertooth or Cloudstone Curio) and');
        steps.push('     repeat, targeting yourself each time.');
      }
      steps.push("  4. Yeva's power becomes arbitrarily large — every +2/+2 lasts until end of turn and");
      steps.push('     stacks with the others.');
      steps.push('  5. Attack with Yeva for 21+ commander damage — opponent loses (CR 903.10a).');
      steps.push('  ⚠ Maze of Ith stops this — prevented combat damage isn\'t dealt, so commander-damage');
      steps.push('     tracking does not increment.');

    // ── Emit Ulvenwald Tracker Fight Loop execution steps ─────────────────
    } else if (victory.winCondition === 'Win: Ulvenwald Tracker Fight Loop / Legolas Tap Loop (clear opponent board)') {
      // Determine which path applies: LQR in hand → prefer that narration;
      // otherwise fall back to the Ulvenwald Tracker path.
      const hasLQRInHand = inHand('legolas_quick_reflexes');
      const hasTracker   = onField('Ulvenwald Tracker');

      if (hasLQRInHand && !hasTracker) {
        // ── Legolas's Quick Reflexes path ──
        // Identify the tap-loop creature (creature with tapForMana and power ≥ 1)
        var CARDS_local = CARDS;
        const tapCreature = s.battlefield.find(p => {
          const def = CARDS_local[p.cardKey];
          return def?.tapForMana && (p.power ?? 0) >= 1;
        });
        const tapName = tapCreature?.name ?? 'the tap-loop creature';
        steps.push('');
        steps.push('── Legolas\'s Quick Reflexes Tap Loop (execution) ──');
        steps.push(`  1. Cast Legolas's Quick Reflexes ({G}) targeting ${tapName}.`);
        steps.push(`     ${tapName} gains "whenever this creature becomes tapped, deal`);
        steps.push('     damage equal to its power to up to one target creature" until EOT.');
        steps.push(`  2. The infinite mana loop taps ${tapName} each cycle.`);
        steps.push('     Point the tap-trigger at a different opponent creature each iteration.');
        steps.push(`     Damage dealt per tap = ${tapName}'s power (${tapCreature?.power ?? '?'}).`);
        steps.push('  3. Repeat until every creature your opponents control is destroyed.');
        steps.push('  4. Attack with your unblocked board for lethal damage.');
      } else {
        // ── Ulvenwald Tracker path ──
        const hasTemur = onField('Temur Sabertooth');
        const hasKogla = onField('Kogla, the Titan Ape');
        const bouncerName = hasTemur ? 'Temur Sabertooth' : 'Kogla, the Titan Ape';
        // [O-23] Identify which global-haste effect lets the freshly-recast
        // Tracker use its {T} ability despite summoning sickness.
        const hasteSource =
          onField('Concordant Crossroads')        ? 'Concordant Crossroads'        :
          onField('Thousand-Year Elixir')         ? "Thousand-Year Elixir's static" :
          onField('Surrak and Goreclaw')          ? 'Surrak and Goreclaw'          :
          onField('Shang-Chi, Master of Kung Fu') ? "Shang-Chi's static"           :
          'a global-haste effect';

        steps.push('');
        steps.push('── Ulvenwald Tracker Fight Loop (execution) ──');
        steps.push('  1. {1}{G},{T}: Ulvenwald Tracker — a creature you control fights target creature an');
        steps.push('     opponent controls. The opposing creature dies.');
        steps.push(`  2. {1}{G}: ${bouncerName} bounces Ulvenwald Tracker to hand` +
          (hasKogla && !hasTemur ? ' (Tracker is a Human Shaman).' : '.'));
        steps.push(`  3. Recast Ulvenwald Tracker ({G}) — ${hasteSource} lets the freshly-recast Tracker`);
        steps.push('     activate its {T} ability despite summoning sickness. Repeat from step 1.');
        steps.push('  4. Repeat until every creature your opponents control is destroyed.');
        steps.push('  5. Attack with your unblocked board for lethal damage.');
      }
    }
  }


  if (steps.length === 0) return null;

  return { steps, finalState: s, terminalWin: terminalWin ? victory : null };
}

var _SLV = { Solver };
// Analyzer.js — buildDefaultLibrary already in scope from GameState.js above
// Analyzer.js
/**
 * MTG Combo Solver — Hand Analyzer
 *
 * analyze(hand, options) → HandAnalysis
 *
 * For a given 7-card hand:
 *  1. Solves the full hand to find the fastest combo line
 *  2. Tests removing each card (what-if) to find which are critical
 *  3. Counts mana sources and assesses opening viability
 *  4. Reports alternative lines discovered
 */

// ── Mana source counting ──────────────────────────────────────────────────

/**
 * Returns a breakdown of mana sources in a hand.
 */
function analyzeMana(hand) {
  let lands = 0, rocks = 0, dorks = 0, free = 0;
  for (const key of hand) {
    const def = CARDS[key];
    if (!def) continue;
    if (def.types.includes('land'))     lands++;
    else if (def.tapForMana && def.types.includes('artifact')) rocks++;
    else if (def.tapForMana && def.types.includes('creature')) dorks++;
    else if (def.handAbilities) free++;   // e.g. Elvish Spirit Guide
  }
  return { lands, rocks, dorks, free, total: lands + rocks + dorks + free };
}

/**
 * Estimate the earliest turn you can cast a spell of a given CMC.
 * Returns turn number (1-indexed) or Infinity.
 */
function estimateEarliestCast(hand, targetCMC) {
  const mana = analyzeMana(hand);
  // Turn 1: lands + free sources + 0-cost rocks that tap for 2 (Sol Ring → 2)
  // Rough model: 1 land = 1 mana/turn + rocks + dorks (sick T1)
  if (mana.lands + (mana.free * 1) >= targetCMC) return 1;
  if ((mana.lands * 2) + mana.rocks * 2 >= targetCMC) return 2;
  return Math.ceil(targetCMC / Math.max(1, mana.lands));
}

// ── What-if analysis ──────────────────────────────────────────────────────

/**
 * For each card in the hand, test removing it and re-solving.
 * Returns map of cardKey → { stillWins, turnsWithout, criticality }
 *
 * Fix #7: runs each what-if in a worker thread (parallel), cutting
 * wall-time roughly proportional to the number of unique cards in hand.
 */
/**
 * Synchronous fallback for whatIfAnalysis — used when Promise-based
 * callers are not available or when called from a worker context.
 */
function whatIfAnalysisSync(hand, baseResult, options = {}) {
  const { maxTurns = 4, maxDepth = 40, maxStates = 100_000, mana = null } = options;
  const baseTurn = baseResult
    ? baseResult.line[baseResult.line.length - 1].turn
    : Infinity;

  const results = {};

  for (const removeKey of [...new Set(hand)]) {
    const reducedHand = removeCard(hand, removeKey);
    const state = buildState(reducedHand, [], mana);
    const solver = new Solver({ maxTurns, maxDepth, maxStates, verbose: false });
    const result = quietSolve(solver, state);

    const turnsWithout = result
      ? result.line[result.line.length - 1].turn
      : Infinity;

    let criticality;
    if (!result)                      criticality = 'essential';
    else if (turnsWithout > baseTurn) criticality = 'accelerant';
    else                              criticality = 'redundant';

    if (baseTurn <= 1 && criticality === 'redundant') {
      results[removeKey] = {
        cardName:     CARDS[removeKey]?.name ?? removeKey,
        stillWins:    true,
        comboName:    result?.combo.manaCombo ?? result?.combo.name ?? null,
        winCondition: result?.combo.winCondition ?? null,
        turnsWithout,
        baseTurn,
        criticality,
      };
      continue;
    }

    results[removeKey] = {
      cardName:    CARDS[removeKey]?.name ?? removeKey,
      stillWins:   !!result,
      comboName:   result?.combo.manaCombo ?? result?.combo.name ?? null,
      winCondition: result?.combo.winCondition ?? null,
      turnsWithout,
      baseTurn,
      criticality,
    };
  }

  return results;
}

// ── Combo piece identification ─────────────────────────────────────────────

/**
 * Check which combo patterns are "one card away" from being assembled
 * given the current hand.
 *
 * Fix #8: uses detector.requiredKeys (stamped at load time) instead of
 * fragile text-mining through description strings.
 */
function findNearMisses(hand, graveyard = []) {
  const handKeySet = new Set(hand);

  // Helper: card key → display name
  const keyToName = (k) => CARDS[k]?.name ?? k;

  // Build the graveyard key set for recovery checks.
  // Eternal Witness / Skullwinder / Timeless Witness / Reclaim can retrieve
  // a card from the graveyard, making it effectively "one cast away".
  // If a recursion spell is in hand or battlefield and the graveyard contains
  // a combo piece, reduce that combo's near-miss count by 1.
  const RECURSION_KEYS = new Set([
    'eternal_witness', 'timeless_witness', 'skullwinder', 'reclaim',
  ]);
  const hasRecursion = hand.some(k => RECURSION_KEYS.has(k));

  // Map card NAME → key for graveyard lookup (graveyard stores names, not keys)
  const NAME_TO_KEY_LOCAL = Object.fromEntries(
    Object.entries(CARDS).map(([k, def]) => [def.name, k])
  );
  const graveyardKeySet = new Set(
    graveyard.map(name => NAME_TO_KEY_LOCAL[name]).filter(Boolean)
  );

  const nearMisses = [];

  // Check mana combo near-misses via requiredKeys (Fix #8)
  for (const detector of DETECTORS) {
    const keys = detector.requiredKeys;
    if (!keys || keys.length === 0) continue;
    const have = keys.filter(k => handKeySet.has(k));
    const need = keys.filter(k => !handKeySet.has(k));
    // "Near miss" = have at least one piece, missing at least one piece
    if (have.length >= 1 && need.length >= 1) {
      // Adjust need list: pieces recoverable from graveyard (with recursion)
      // are annotated so the UI can display them as "in graveyard".
      const needAnnotated = need.map(k => {
        if (hasRecursion && graveyardKeySet.has(k)) {
          return `${keyToName(k)} (in graveyard — recoverable)`;
        }
        return keyToName(k);
      });
      // A combo is "one away" if all missing pieces are in the graveyard
      // AND a recursion spell is available — treat it as a one-step gap.
      const effectiveMissing = hasRecursion
        ? need.filter(k => !graveyardKeySet.has(k))
        : need;
      nearMisses.push({
        type:  'mana_combo',
        combo: detector.name,
        have:  have.map(keyToName),
        need:  needAnnotated,
        effectiveMissing: effectiveMissing.map(keyToName),
        graveyardRecoverable: need.length - effectiveMissing.length,
      });
    }
  }

  // Check win condition near-misses (only if a mana combo IS assembled)
  // Simulate state to run checkCombos
  let state = new GameState({ hand: [], life: 40 });
  for (const key of hand) {
    try {
      state = state.enterBattlefield(key);
      for (const p of state.battlefield) { p.summoningSick = false; p.tapped = false; }
    } catch (_) {}
  }
  const hasInfiniteMana = checkCombos(state);
  if (hasInfiniteMana) {
    for (const wc of WIN_CONDITIONS) {
      if (wc.check(state)) continue;
      const keys = wc.requiredKeys;
      if (!keys || keys.length === 0) continue;
      const have = keys.filter(k => handKeySet.has(k));
      const need = keys.filter(k => !handKeySet.has(k));
      if (have.length >= 1 && need.length >= 1) {
        nearMisses.push({
          type:  'win_condition',
          combo: wc.name,
          have:  have.map(keyToName),
          need:  need.map(keyToName),
        });
      }
    }
  }

  return nearMisses;
}

/** @deprecated - kept for any external callers; no longer used internally (Fix #8) */
function extractCardNames(text) {
  const BASIC_LANDS = new Set(['Forest', 'Island', 'Swamp', 'Mountain', 'Plains', 'Dryad Arbor']);
  const knownNames = Object.values(CARDS).map(d => d.name);
  return knownNames.filter(name =>
    text.includes(name) && !BASIC_LANDS.has(name)
  );
}

// ── Main analysis entry point ─────────────────────────────────────────────

/**
 * @param {string[]} hand       Array of card keys
 * @param {object}  options
 * @returns {HandAnalysis}
 */
function analyze(hand, options = {}) {
  const {
    maxTurns   = 4,
    maxDepth   = 40,
    maxStates  = 300_000,
    whatIf     = true,
    battlefield = [],
    mana        = null,
    graveyard   = [],
  } = options;

  const manaStats = analyzeMana(hand);
  const state     = buildState(hand, battlefield, mana);
  const solver    = new Solver({ maxTurns, maxDepth, maxStates, allLines: true, verbose: false });
  const result    = quietSolve(solver, state);

  // Use sync version in analyze() for backward compatibility.
  // For parallel execution use analyzeAsync() or call whatIfAnalysis() directly.
  const whatIfMap = whatIf && result
    ? whatIfAnalysisSync(hand, result, { maxTurns, maxDepth, maxStates: 100_000 })
    : {};

  const nearMisses  = findNearMisses(hand);
  const comboTurn   = result ? result.line[result.line.length - 1].turn : null;
  const allLines    = result?.allLines ?? [];
  const linesPerTurn = {};
  for (const line of allLines) {
    const t = line.line[line.line.length - 1].turn;
    linesPerTurn[t] = (linesPerTurn[t] || 0) + 1;
  }

  return {
    hand,
    mana:          manaStats,
    canCombo:      !!result,
    comboTurn,
    comboName:     result?.combo.manaCombo ?? result?.combo.name ?? null,
    winCondition:  result?.combo.winCondition ?? null,
    totalLines:    allLines.length,
    linesPerTurn,
    optimalLine:   result?.line ?? null,
    statesExplored: solver.statesExplored,
    whatIf:        whatIfMap,
    nearMisses,
  };
}

// ── Printer ───────────────────────────────────────────────────────────────

// ── Helpers ───────────────────────────────────────────────────────────────

function buildState(hand, battlefield = [], mana = null) {
  let s = new GameState({ hand: [...hand], landDrops: 1, life: 40, mana: mana ?? undefined });
  s.history.push({ turn: 1, msg: '-- Begin Turn 1 --' });
  for (const key of battlefield) {
    s = s.enterBattlefield(key);
    // Mark the most recently entered permanent as not summoning sick
    // (it was already on the battlefield before the analysis starts)
    const added = s.battlefield[s.battlefield.length - 1];
    if (added) added.summoningSick = false;
  }
  return s;
}

function removeCard(hand, key) {
  const idx = hand.indexOf(key);
  if (idx === -1) return hand;
  return [...hand.slice(0, idx), ...hand.slice(idx + 1)];
}

/** Run solver silently (suppress console output) */
function quietSolve(solver, state) {
  const log = console.log;
  const write = typeof process !== 'undefined' && process.stdout
    ? process.stdout.write.bind(process.stdout) : null;
  console.log = () => {};
  if (write) process.stdout.write = () => {};
  let result;
  try { result = solver.solve(state); }
  finally {
    console.log = log;
    if (write) process.stdout.write = write;
  }
  return result;
}

function cardRole(key) {
  const def = CARDS[key];
  if (!def) return 'unknown';
  if (def.types.includes('land')) return 'land';
  if (def.tapForMana && def.types.includes('creature')) return 'dork';
  if (def.tapForMana && def.types.includes('artifact')) return 'rock';
  if (def.handAbilities) return 'free mana';
  if (def.types.includes('instant') || def.types.includes('sorcery')) return 'spell';
  if (def.types.includes('creature')) return 'creature';
  if (def.types.includes('enchantment')) return 'enchantment';
  if (def.types.includes('artifact')) return 'artifact';
  return 'other';
}

// ── Mulligan Analysis (Monte Carlo) ──────────────────────────────────────

/**
 * Evaluate whether an opening hand should be kept or mulliganed.
 *
 * For each trial the solver receives a freshly shuffled library (the real
 * remaining deck, excluding the hand). The GameState `drawForTurn` flag is
 * set so that `startNewTurn()` draws the actual top card of that library at
 * the start of every turn, exactly as you would in a real game.
 *
 * After `trials` Monte Carlo runs the function reports:
 *   - infiniteManaPercent — % of trials where infinite mana was assembled ≤ maxTurns
 *   - winPercent          — % of trials where a full win condition was achieved ≤ maxTurns
 *   - trialResults        — raw array of per-trial outcome objects (for debugging)
 *
 * @param {string[]} hand        Opening hand (up to 7 card keys)
 * @param {object}   options
 * @param {number}   [options.trials=200]      Number of Monte Carlo trials
 * @param {number}   [options.maxTurns=4]      Turn budget per trial
 * @param {number}   [options.maxDepth=40]     DFS depth limit per trial
 * @param {number}   [options.maxStates=150000] State budget per trial
 * @param {string[]} [options.battlefield=[]]  Cards already on the battlefield
 * @param {string[]} [options.library=null]    Custom library to use for each trial.
 *                                             Each trial shuffles a fresh copy so draws
 *                                             remain random.  When omitted the library is
 *                                             built from the default decklist via
 *                                             buildDefaultLibrary (excluding hand/battlefield).
 * @returns {MulliganAnalysis}
 */
function mulliganAnalyze(hand, options = {}) {
  const {
    trials      = 200,
    maxTurns    = 4,
    maxDepth    = 40,
    maxStates   = 150_000,
    battlefield = [],
    library     = null,   // optional: caller-supplied library; null → buildDefaultLibrary
    mana        = null,   // optional: initial floating mana (ManaPool or plain object)
  } = options;

  let infiniteManaWins = 0;
  let fullWins         = 0;
  const trialResults   = [];

  for (let t = 0; t < trials; t++) {
    // Build a freshly shuffled library for this trial.
    // If the caller supplied a custom library, shuffle a fresh copy of it each
    // trial so draws remain random.  Otherwise fall back to buildDefaultLibrary.
    const trialLibrary = library
      ? [...library].sort(() => Math.random() - 0.5)
      : buildDefaultLibrary({ hand, battlefield });

    // Construct the initial state with drawForTurn enabled
    let state = new GameState({
      players: [
        { name: 'You',        life: 40, library: trialLibrary,    poison: 0 },
        { name: 'Opponent 1', life: 40, librarySize: 99, poison: 0 },
        { name: 'Opponent 2', life: 40, librarySize: 99, poison: 0 },
        { name: 'Opponent 3', life: 40, librarySize: 99, poison: 0 },
      ],
      hand:        [...hand],
      landDrops:   1,
      drawForTurn: true,   // ← enables real draws at each turn boundary (BUT not the first!)
      mana:        mana ?? undefined,
    });

    // Place battlefield cards (pre-existing permanents, e.g. commander)
    for (const key of battlefield) {
      state = state.enterBattlefield(key);
      const added = state.battlefield[state.battlefield.length - 1];
      if (added) added.summoningSick = false;
    }

    state.history.push({ turn: 1, msg: '-- Begin Turn 1 (mulligan trial) --' });

    // Start game by drawing a card
    if (state.players[0].library.length > 0) {
      const drawnKey = state.players[0].library[0];
      state.players[0] = state.players[0].draw(1);
      if (drawnKey && drawnKey !== 'unknown') {
        state.hand = [...state.hand, drawnKey];
      }
    }

    // Run a quiet solve — suppresss console output for speed
    const solver = new Solver({
      maxTurns,
      maxDepth,
      maxStates,
      allLines: false,
      verbose:  false,
    });

    const result = quietSolve(solver, state);

    // Classify the result
    const achievedInfiniteMana = !!result;                        // solver finds any combo line
    const achievedFullWin      = !!(result && result.combo && result.combo.winCondition);

    if (achievedInfiniteMana) infiniteManaWins++;
    if (achievedFullWin)      fullWins++;

    trialResults.push({
      trial:              t + 1,
      infiniteMana:       achievedInfiniteMana,
      fullWin:            achievedFullWin,
      comboTurn:          result ? result.line[result.line.length - 1].turn : null,
      comboName:          result?.combo?.manaCombo ?? result?.combo?.name ?? null,
      winCondition:       result?.combo?.winCondition ?? null,
    });
  }

  const infiniteManaPercent = Math.round((infiniteManaWins / trials) * 1000) / 10;
  const winPercent          = Math.round((fullWins         / trials) * 1000) / 10;

  // Turn breakdown: how many trials combo'd on each specific turn
  const infiniteManaByTurn = {};
  const winByTurn          = {};
  for (const r of trialResults) {
    if (r.infiniteMana && r.comboTurn != null) {
      infiniteManaByTurn[r.comboTurn] = (infiniteManaByTurn[r.comboTurn] || 0) + 1;
    }
    if (r.fullWin && r.comboTurn != null) {
      winByTurn[r.comboTurn] = (winByTurn[r.comboTurn] || 0) + 1;
    }
  }

  // Convert raw counts → percentages
  for (const k of Object.keys(infiniteManaByTurn)) {
    infiniteManaByTurn[k] = Math.round((infiniteManaByTurn[k] / trials) * 1000) / 10;
  }
  for (const k of Object.keys(winByTurn)) {
    winByTurn[k] = Math.round((winByTurn[k] / trials) * 1000) / 10;
  }

  // Verdict
  let verdict, reason;
  if (infiniteManaPercent >= 60) {
    verdict = 'KEEP';
    reason  = `${infiniteManaPercent}% of trials assemble infinite mana within ${maxTurns} turns`;
  } else if (infiniteManaPercent >= 35) {
    verdict = 'KEEP (borderline)';
    reason  = `${infiniteManaPercent}% of trials assemble infinite mana — marginal hand`;
  } else {
    verdict = 'MULLIGAN';
    reason  = `Only ${infiniteManaPercent}% of trials assemble infinite mana within ${maxTurns} turns`;
  }

  return {
    hand,
    trials,
    maxTurns,
    infiniteManaPercent,
    winPercent,
    infiniteManaByTurn,
    winByTurn,
    verdict,
    reason,
    trialResults,
  };
}

/**
 * Print a formatted mulligan analysis report to console.
 * @param {object} analysis  Result of mulliganAnalyze()
 */
function printMulliganAnalysis(analysis) {
  const W    = 68;
  const line = '═'.repeat(W);
  const dash = '─'.repeat(W);
  for (const key of analysis.hand) {
    const def = CARDS[key];
    if (!def) continue;
    const cost = def.cost ? `{${def.cost}}` : '(land)';
    const role = cardRole(key);
  }
  const manaByTurn = Object.entries(analysis.infiniteManaByTurn).sort(([a],[b]) => +a - +b);
  for (const [turn, pct] of manaByTurn) {
    const bar = '█'.repeat(Math.round(pct / 2.5));
  }
  const winByTurn = Object.entries(analysis.winByTurn).sort(([a],[b]) => +a - +b);
  for (const [turn, pct] of winByTurn) {
    const bar = '█'.repeat(Math.round(pct / 2.5));
  }
  const icon = analysis.verdict.startsWith('KEEP') ? '✅' : '❌';
}

/**
 * Async version of analyze() — runs what-if searches in parallel worker threads.
 * Returns a Promise<HandAnalysis>. (Fix #7)
 */

// ── STAX-card metadata ────────────────────────────────────────────────────

var STAX_DETAIL = {
  thorn_of_amethyst: {
    name: 'Thorn of Amethyst',
    effect: 'Non-creature spells cost {1} more.',
    impactedLines: [
      'Quirion Ranger loops (bounce + recast costs {G}+{1} — Thorn adds {1} extra)',
      'Scryb Ranger loops (bounce + recast costs {1G}+{1} — Thorn adds {1} extra)',
      'Any line casting instants/sorceries (Vitalize, Emerald Charm)',
    ],
    staxProofLines: [
      'Ashaya + Argothian Elder (no spells cast in the loop — pure activated abilities)',
      'Ashaya + Ley Weaver (same — no spells)',
      'Argothian Elder + Wirewood Lodge + Cradle/Nykthos (no spells in loop)',
      'Hope Tender loops (activated abilities only)',
    ],
    tip: 'Prefer loops using only activated abilities. Elder/Weaver and Hope Tender loops are fully Thorn-proof.',
  },
  trinisphere: {
    name: 'Trinisphere',
    effect: 'All spells cost at least {3} to cast.',
    impactedLines: [
      'All loops recasting 1- or 2-mana spells (Quirion {G}, Scryb {1G}, Vitalize {G})',
      'Hyrax Tower Scout recast {2G} = 3 total — Trinisphere does not add here',
      'Eternal Witness {1GG} = 3 mana — also unaffected',
    ],
    staxProofLines: [
      'Hyrax loops (recast {2G} = 3 mana, meets Trinisphere minimum)',
      'Eternal Witness + Vitalize/Emerald Charm loops (EWit {1GG} = 3 mana)',
      'Hope Tender loops (activated ability, not a spell)',
    ],
    tip: 'Quirion/Scryb Ranger loops are broken under Trinisphere — recast jumps from {G} to {3}. Switch to Hyrax Tower Scout or Hope Tender lines which naturally meet the {3} floor.',
  },
  null_rod: {
    name: 'Null Rod',
    effect: 'Activated abilities of artifacts cannot be used.',
    impactedLines: [
      'Sol Ring, Chrome Mox, Mox Diamond (cannot tap for mana)',
      'Thousand-Year Elixir (cannot grant haste)',
      'Cloudstone Curio triggered ability is unaffected (triggered, not activated)',
    ],
    staxProofLines: [
      'All creature-based loops (Ranger, Elder, Tender, Hyrax — creatures, not artifacts)',
      'Land-based loops (Cradle, Nykthos, Wirewood Lodge — lands, not artifacts)',
    ],
    tip: 'Null Rod only suppresses artifact activated abilities. Every creature and land combo loop is fully immune.',
  },
  collector_ouphe: {
    name: 'Collector Ouphe',
    effect: 'Activated abilities of artifacts cannot be used.',
    impactedLines: [
      'Same as Null Rod — artifact activated abilities suppressed',
    ],
    staxProofLines: [
      'All creature and land loops are unaffected',
    ],
    tip: 'Identical effect to Null Rod for this deck. All core creature/land loops remain functional.',
  },
  root_maze: {
    name: 'Root Maze',
    effect: 'Lands and artifacts enter the battlefield tapped.',
    impactedLines: [
      'Fetch lands enter tapped (delays Dryad Arbor ramp)',
      'Chrome Mox, Mox Diamond, Sol Ring enter tapped (lose T1 acceleration)',
    ],
    staxProofLines: [
      'All creature-based loops unaffected (creatures enter normally)',
      'Ashaya + Ranger, Hyrax, Hope Tender — no land/artifact ETB speed required',
    ],
    tip: 'Root Maze is primarily a tempo hit on fast mana. Combo lines themselves are unaffected once the engine is assembled.',
  },
  orb_of_dreams: {
    name: 'Orb of Dreams',
    effect: 'All permanents enter the battlefield tapped.',
    impactedLines: [
      'Creatures enter with summoning sickness AND tapped — immediate-tap loops broken',
      'Quirion/Scryb Ranger enters tapped — cannot use bounce ability the turn it enters',
      'Hyrax Tower Scout enters tapped — ETB still triggers but cannot act immediately',
    ],
    staxProofLines: [
      'Argothian Elder + Wirewood Lodge (needs one recovery turn, then loops freely)',
      'Hope Tender loops (Tender enters tapped, but {1},Exert usable next turn)',
    ],
    tip: 'Orb of Dreams is one of the hardest locks for this deck. Prioritise removing it, or accept a one-turn delay before Elder/Lodge comes online.',
  },
  vexing_bauble: {
    name: 'Vexing Bauble',
    effect: 'Whenever a player casts a spell, if no mana was spent to cast it, counter that spell.',
    impactedLines: [
      "Summoner's Pact is countered (cast for {0} — no mana spent)",
      'Lotus Petal is countered when cast (cost {0})',
      'Chrome Mox is countered when cast (cost {0})',
      'Mox Diamond is countered when cast (cost {0})',
    ],
    staxProofLines: [
      'Quirion/Scryb Ranger loops (Ranger costs {G} — mana is spent)',
      'Hyrax Tower Scout loops (recast costs {2G})',
      'Argothian Elder + Wirewood Lodge (activated abilities, not spells)',
      'Hope Tender loops (activated ability, not a spell)',
      'All creature loops recasting dorks for coloured mana — unaffected',
    ],
    tip: "Vexing Bauble counters spells cast for free — it checks whether mana was spent, not what the CMC is. Summoner's Pact is the biggest casualty: it is cast for {0} and will be countered. Lotus Petal, Chrome Mox, and Mox Diamond are similarly shut down. Core combo loops are unaffected since every spell in those lines costs coloured mana. Consider saccing the Bauble (draw a card) before casting Pact if an opponent controls it. COUNTER: If Allosaurus Shepherd is on the battlefield, all green spells become uncounterable — Vexing Bauble cannot counter any green spell while Shepherd is in play. Summoner's Pact is a green card (green colour indicator) so Shepherd protects it too, despite its {0} mana cost. Lotus Petal, Chrome Mox and Mox Diamond are colourless and remain vulnerable.",
  },
  chalice_of_the_void: {
    name: 'Chalice of the Void',
    effect: 'Counters spells whose CMC matches the charge counters on Chalice.',
    impactedLines: [
      'Chalice on 0: counters Summoner\'s Pact, Lotus Petal, Chrome Mox, Mox Diamond (all CMC 0)',
      'Chalice on 1: counters Quirion Ranger, Vitalize, Emerald Charm, Worldly Tutor, Crop Rotation, Concordant Crossroads, Allosaurus Shepherd, Elvish Reclaimer, Sol Ring, all 1-drop dorks (Llanowar Elves, Elvish Mystic, Fyndhorn Elves, Arbor Elf)',
      'Chalice on 2: counters Scryb Ranger, Hope Tender, Earthcraft — Wirewood Symbiote is CMC 1 (NOT hit by Chalice on 2)',
      'Chalice on 3: counters Hyrax Tower Scout, Yisan, Eternal Witness, Eldritch Evolution, Circle of Dreams Druid, Marwyn, Selvala, Archdruid\'s Charm',
    ],
    staxProofLines: [
      'Chalice on 1: Scryb Ranger loops survive (CMC 2 — not countered)',
      'Chalice on 1: Hope Tender loops survive (CMC 2)',
      'Chalice on 2: Quirion Ranger loops survive (CMC 1 — not countered)',
      'Chalice on 2: Wirewood Symbiote loops survive (CMC 1)',
      'Argothian Elder + Wirewood Lodge (Elder CMC 4, Lodge is a land — unaffected by any Chalice)',
      'Activated ability loops (Hope Tender, Elder, Lodge) — activated abilities are not spells',
      'ANY green spell becomes uncounterable once Allosaurus Shepherd is on the battlefield',
    ],
    tip: 'The charge count determines exactly which loops survive. Chalice on 1 is the most devastating — it stops all 1-drop dorks, Quirion Ranger, and key instants. Note: Wirewood Symbiote is CMC 1 (costs {G}), not 2 — it is hit by Chalice on 1, not 2. Scryb Ranger is CMC 2 (costs {1}{G}) — it survives Chalice on 1. COUNTER: Landing Allosaurus Shepherd makes all your green spells uncounterable — Chalice cannot counter any green spell while Shepherd is in play. Note that Summoner\'s Pact is a green card (green colour indicator) so Shepherd protects it despite its {0} mana cost. Shepherd itself is CMC 1 and green, so it can be countered by Chalice on 1 before it resolves, but not by Chalice on 0 or 2+.',
  },
  disruptor_flute: {
    name: 'Disruptor Flute',
    effect: 'The named ability type cannot be activated.',
    impactedLines: [
      'Depends entirely on which ability type was named',
    ],
    staxProofLines: [
      'All loops not using the named ability type are unaffected',
    ],
    tip: 'Impact is situational. Identify which ability was named before choosing a line.',
  },
};

// ── 1. Tutor Advisor ──────────────────────────────────────────────────────

/**
 * tutorAdvisor(result) — Given a solver result with allLines, group winning
 * lines by the first tutored card and rank each tutor target by speed + line count.
 *
 * Returns an array of TutorRecommendation objects sorted by priority:
 *   { targetKey, targetName, lines, fastestTurn, lineCount, comboNames }
 *
 * Usage: run solver with { allLines: true }, then pass result here.
 */
function tutorAdvisor(result) {
  if (!result?.allLines?.length) return [];

  const CARDS_LOCAL = CARDS;

  // Tutor-related message patterns
  const TUTOR_MSGS = [
    // Chord of Calling, Green Sun's Zenith, Nature's Rhythm etc.
    /Chord of Calling.*?→.*?([A-Z][^,\.]+)/,
    /Green Sun.*?→.*?([A-Z][^,\.]+)/,
    /Nature.s Rhythm.*?→.*?([A-Z][^,\.]+)/,
    /Summoner.s Pact.*?→.*?([A-Z][^,\.]+)/,
    /Eldritch Evolution.*?→.*?([A-Z][^,\.]+)/,
    /Shared Summons.*?→.*?([A-Z][^,\.]+)/,
    /Woodland Bellower.*?→.*?([A-Z][^,\.]+)/,
    /Fierce Empath.*?→.*?([A-Z][^,\.]+)/,
    /Invasion of Ikoria.*?→.*?([A-Z][^,\.]+)/,
    /Archdruid.s Charm.*?→.*?([A-Z][^,\.]+)/,
    /Crop Rotation.*?→.*?([A-Z][^,\.]+)/,
    /Elvish Reclaimer.*?→.*?([A-Z][^,\.]+)/,
    /Sowing Mycospawn.*?→.*?([A-Z][^,\.]+)/,
    /Finale of Devastation.*?→.*?([A-Z][^,\.]+)/,
  ];

  // Reverse-lookup: card name → key
  const NAME_TO_KEY_LOCAL = {};
  for (const [k, def] of Object.entries(CARDS_LOCAL)) {
    NAME_TO_KEY_LOCAL[def.name] = k;
  }

  // For each winning line, find the first tutor action and what it fetched
  const byTarget = {}; // targetKey → { lines: [], fastestTurn }

  for (const winLine of result.allLines) {
    const { line, combo } = winLine;
    let firstTutorTarget = null;

    for (let i = 1; i < line.length; i++) {
      const state = line[i];
      const msg = state.history[state.history.length - 1]?.msg ?? '';

      for (const pattern of TUTOR_MSGS) {
        const m = msg.match(pattern);
        if (m) {
          const cardName = m[1].trim();
          const cardKey  = NAME_TO_KEY_LOCAL[cardName];
          if (cardKey) {
            firstTutorTarget = cardKey;
            break;
          }
        }
      }
      if (firstTutorTarget) break;
    }

    // Lines with no tutor (pure draw into combo) go under a special key
    const targetKey = firstTutorTarget ?? '__no_tutor__';
    if (!byTarget[targetKey]) {
      byTarget[targetKey] = { lines: [], fastestTurn: Infinity };
    }
    const finalTurn = line[line.length - 1].turn;
    byTarget[targetKey].lines.push({ line, combo, finalTurn });
    if (finalTurn < byTarget[targetKey].fastestTurn) {
      byTarget[targetKey].fastestTurn = finalTurn;
    }
  }

  // Build sorted recommendations
  const recs = [];
  for (const [targetKey, data] of Object.entries(byTarget)) {
    const def = CARDS_LOCAL[targetKey];
    const targetName = def?.name ?? (targetKey === '__no_tutor__' ? '(no tutor — draw into combo)' : targetKey);
    const comboNames = [...new Set(data.lines.map(l => {
      const c = l.combo;
      return c.manaCombo ?? c.name ?? 'Unknown';
    }))];

    recs.push({
      targetKey,
      targetName,
      lines:       data.lines,
      fastestTurn: data.fastestTurn,
      lineCount:   data.lines.length,
      comboNames,
    });
  }

  // Sort: fastest turn first, then most lines
  recs.sort((a, b) => {
    if (a.fastestTurn !== b.fastestTurn) return a.fastestTurn - b.fastestTurn;
    return b.lineCount - a.lineCount;
  });

  return recs;
}

/**
 * printTutorAdvice(result) — Print a formatted tutor advisory report.
 */
function printTutorAdvice(result) {
  const W    = 68;
  const line = '═'.repeat(W);
  const dash = '─'.repeat(W);

  const recs = tutorAdvisor(result);
  if (!recs.length) {
    return;
  }
  for (let i = 0; i < Math.min(recs.length, 8); i++) {
    const r   = recs[i];
    const rank = String(i + 1).padStart(2);
    const icon = i === 0 ? '⭐' : '  ';
    if (r.comboNames.length <= 2) {
    } else {
    }
  }

  if (recs[0]?.targetKey !== '__no_tutor__') {
  } else {
  }
}

// ── 3. STAX-Aware Advisor ─────────────────────────────────────────────────

/**
 * staxAdvisor(hand, battlefield, playerBattlefield) — Given a game state,
 * detect which opponent STAX pieces are active and explain their impact,
 * taking into account whether Allosaurus Shepherd is in play or in hand.
 *
 * @param {string[]} hand              — player's hand card keys
 * @param {string[]} battlefield       — opponent's STAX pieces (the lock)
 * @param {string[]} playerBattlefield — player's own battlefield (for Shepherd detection)
 *
 * Returns { activeStax, staxProofLines, impactedLines, tips, canWin,
 *           fastestTurn, workingLines, result, shepherdOnBattlefield,
 *           shepherdInHand, shepherdActive, shepherdUnlockedLines,
 *           shepherdNeutralisedStax }
 */
function staxAdvisor(hand, battlefield = [], playerBattlefield = []) {
  const CARDS_LOCAL   = CARDS;

  // ── Allosaurus Shepherd detection ────────────────────────────────────────
  // Shepherd on the PLAYER's battlefield: oracle text says "Green spells you
  // control can't be countered." — this is a static ability, always on.
  // Counter-based stax (Chalice of the Void, Vexing Bauble) is fully nullified
  // for all green spells while Shepherd is in play.
  //
  // Shepherd in hand: its own spell can't be countered (first line of oracle
  // text), so casting it for {G} always resolves safely. Treat as equivalent
  // protection — the player can establish the shield immediately for {G}.
  //
  // Important: Shepherd does NOT remove mana taxes (Thorn of Amethyst,
  // Trinisphere still make spells cost more) or artifact ability locks
  // (Null Rod, Collector Ouphe). It only prevents COUNTER effects.
  //
  // Note on solver accuracy: the solver is run against the STAX state without
  // Shepherd on the battlefield. When Shepherd is only in hand (not yet cast),
  // canWin may show false even though casting Shepherd first would unlock lines.
  // The advisor UI should surface this discrepancy to the user when
  // shepherdInHand=true and canWin=false under counter-stax.
  const shepherdOnBattlefield = playerBattlefield.includes('allosaurus_shepherd');
  const shepherdInHand        = hand.includes('allosaurus_shepherd');
  const shepherdActive        = shepherdOnBattlefield || shepherdInHand;

  // Stax pieces whose sole disruptive mechanism is countering spells.
  // Shepherd directly neutralises these for all green spells.
  const COUNTER_STAX = new Set(['chalice_of_the_void', 'vexing_bauble']);

  // Detect active STAX pieces from the OPPONENT's battlefield
  const activeStax = battlefield
    .filter(k => STAX_KEYS.has(k))
    .map(k => STAX_DETAIL[k] ?? { name: CARDS_LOCAL[k]?.name ?? k, effect: 'Unknown STAX effect.', staxProofLines: [], tip: '' });

  // Also check player's hand — they might hold stax they should NOT cast
  const staxInHand = hand
    .filter(k => STAX_KEYS.has(k))
    .map(k => CARDS_LOCAL[k]?.name ?? k);

  // Collect all STAX-proof lines (intersection across all active STAX)
  let staxProofCombos = null;
  for (const stax of activeStax) {
    const proofSet = new Set(stax.staxProofLines);
    if (staxProofCombos === null) {
      staxProofCombos = proofSet;
    } else {
      // Keep only lines that survive ALL active STAX
      for (const c of staxProofCombos) {
        if (!proofSet.has(c)) staxProofCombos.delete(c);
      }
    }
  }

  // Build raw impact summary and tips
  const impacts = activeStax.flatMap(s => s.impactedLines ?? []);
  const tips    = activeStax.map(s => s.tip).filter(Boolean);

  // ── Shepherd override ────────────────────────────────────────────────────
  // When Shepherd is active, counter-stax disruptions are removed from the
  // impacted list (those spells can now be freely cast), and the formerly-
  // blocked lines become "unlocked" for the UI to highlight.
  //
  // Tax-stax lines (Thorn, Trinisphere, Orb of Dreams, etc.) remain disrupted
  // even with Shepherd — spells still cost more, they just can't be countered.
  const counterStaxKeys = battlefield.filter(k => COUNTER_STAX.has(k));

  let shepherdUnlockedLines = [];
  if (shepherdActive && counterStaxKeys.length > 0) {
    const counterImpacted = counterStaxKeys.flatMap(k => (STAX_DETAIL[k]?.impactedLines ?? []));
    shepherdUnlockedLines = [...new Set(counterImpacted)];
  }

  // Filter the impacted list: remove entries that come exclusively from
  // counter-stax pieces when Shepherd is protecting us.
  let filteredImpacts = [...new Set(impacts)];
  if (shepherdActive && counterStaxKeys.length > 0) {
    const counterImpacted = new Set(
      counterStaxKeys.flatMap(k => STAX_DETAIL[k]?.impactedLines ?? [])
    );
    filteredImpacts = filteredImpacts.filter(l => !counterImpacted.has(l));
  }

  // Run solver under STAX to find what actually still works
  let staxState = buildState(hand, battlefield);
  const solver  = new Solver({ maxTurns: 5, maxDepth: 60, maxStates: 200_000, allLines: true, verbose: false });
  const result  = quietSolve(solver, staxState);

  const workingLines = result?.allLines ?? [];
  const canWin       = !!result;
  const fastestTurn  = result ? result.line[result.line.length - 1].turn : null;

  return {
    activeStax:    activeStax.map(s => s.name),
    staxInHand,
    impactedLines: filteredImpacts,
    staxProofLines: [...(staxProofCombos ?? [])],
    tips,
    canWin,
    fastestTurn,
    workingLines,
    result,
    // ── Allosaurus Shepherd fields ──────────────────────────────────────
    shepherdOnBattlefield,
    shepherdInHand,
    shepherdActive,
    // Lines formerly blocked only by counter-stax; Shepherd re-enables them
    shepherdUnlockedLines,
    // Which active stax pieces Shepherd directly neutralises (counter-based)
    shepherdNeutralisedStax: counterStaxKeys
      .map(k => STAX_DETAIL[k]?.name ?? k),
  };
}

/**
 * printStaxAdvice(hand, battlefield) — Print a formatted STAX advisory.
 */
function printStaxAdvice(hand, battlefield = [], playerBattlefield = []) {
  const W    = 68;
  const line = '═'.repeat(W);
  const dash = '─'.repeat(W);

  const analysis = staxAdvisor(hand, battlefield, playerBattlefield);
  if (!analysis.activeStax.length) {
    return;
  }
  for (const staxKey of battlefield.filter(k => {
    return STAX_KEYS.has(k);
  })) {
    const detail = STAX_DETAIL[staxKey];
    if (detail) {
    }
  }

  if (analysis.staxInHand.length) {
  }

  // ── Allosaurus Shepherd status ──────────────────────────────────────────
  if (analysis.shepherdActive) {
    const where = analysis.shepherdOnBattlefield ? 'on battlefield' : 'in hand (can resolve safely for {G})';
    if (analysis.shepherdNeutralisedStax.length) {
    }
    if (analysis.shepherdUnlockedLines.length) {
      for (const ul of analysis.shepherdUnlockedLines.slice(0, 5)) {
      }
    }
  }
  if (analysis.impactedLines.length) {
    for (const imp of analysis.impactedLines.slice(0, 5)) {
    }
  }
  if (analysis.staxProofLines.length) {
    for (const sl of analysis.staxProofLines.slice(0, 5)) {
    }
  }
  if (analysis.tips.length) {
    for (const tip of analysis.tips) {
      const wrapped = tip.match(/.{1,62}(\s|$)/g) || [tip];
      for (let i = 0; i < wrapped.length; i++) {
      }
    }
  }
  if (analysis.canWin) {
    const uniqueCombos = [...new Set(analysis.workingLines.map(l => {
      const c = l.combo;
      return (c.manaCombo ?? c.name ?? 'Unknown').slice(0, 55);
    }))].slice(0, 3);
  } else {
  }
}

// ── 4. Mulligan: "Keep for what?" and "What to cut on 6?" ─────────────────

/**
 * mulliganCutAdvisor(hand, options) — For each card in the hand, evaluate
 * keeping a 6-card hand without it. Returns ranked list of best cuts.
 *
 * Compares: what combo does each 6-card hand aim at, how fast, vs full 7.
 */
function mulliganCutAdvisor(hand, options = {}) {
  const {
    maxTurns  = 4,
    maxDepth  = 40,
    maxStates = 150_000,
  } = options;

  const baseState  = buildState(hand, []);
  const baseSolver = new Solver({ maxTurns, maxDepth, maxStates, allLines: false, verbose: false });
  const baseResult = quietSolve(baseSolver, baseState);
  const baseTurn   = baseResult ? baseResult.line[baseResult.line.length - 1].turn : Infinity;
  const baseCombo  = baseResult ? (baseResult.combo.manaCombo ?? baseResult.combo.name ?? null) : null;

  const cuts = [];
  const uniqueKeys = [...new Set(hand)];

  for (const cutKey of uniqueKeys) {
    const reducedHand = removeCard(hand, cutKey);
    const state  = buildState(reducedHand, []);
    const solver = new Solver({ maxTurns, maxDepth, maxStates, allLines: false, verbose: false });
    const result = quietSolve(solver, state);
    const turn   = result ? result.line[result.line.length - 1].turn : Infinity;
    const combo  = result ? (result.combo.manaCombo ?? result.combo.name ?? null) : null;

    let impact;
    if (!result)            impact = 'breaks_combo';
    else if (turn > baseTurn) impact = 'delays';
    else                    impact = 'safe_cut';

    cuts.push({
      cutKey,
      cutName:   CARDS[cutKey]?.name ?? cutKey,
      turn6:     turn,
      combo6:    combo,
      impact,
      turnDelta: turn === Infinity ? Infinity : turn - baseTurn,
    });
  }

  // Sort: safe cuts first, then delays sorted by smallest delta, then breakers
  cuts.sort((a, b) => {
    const order = { safe_cut: 0, delays: 1, breaks_combo: 2 };
    if (order[a.impact] !== order[b.impact]) return order[a.impact] - order[b.impact];
    return a.turnDelta - b.turnDelta;
  });

  return {
    hand,
    baseTurn,
    baseCombo,
    cuts,
  };
}

/**
 * printMulliganCutAdvice(hand, options) — Print "what to cut on 6" report.
 */
function printMulliganCutAdvice(hand, options = {}) {
  const W    = 68;
  const line = '═'.repeat(W);
  const dash = '─'.repeat(W);

  const analysis = mulliganCutAdvisor(hand, options);
  for (const key of hand) {
    const def = CARDS[key];
    if (!def) continue;
  }
  if (analysis.baseTurn === Infinity) {
  } else {
  }
  for (const cut of analysis.cuts) {
    const icon = cut.impact === 'safe_cut'     ? '🟢' :
                 cut.impact === 'delays'        ? '🟡' : '🔴';
    const label = cut.impact === 'safe_cut'
      ? `safe cut — 6-card hand still combos Turn ${cut.turn6}`
      : cut.impact === 'delays'
      ? `delays to Turn ${cut.turn6} (+${cut.turnDelta} turn${cut.turnDelta > 1 ? 's' : ''})`
      : 'breaks combo — do NOT cut this';
    if (cut.combo6 && cut.combo6 !== analysis.baseCombo) {
    }
  }

  const bestCut = analysis.cuts.find(c => c.impact === 'safe_cut');
  if (bestCut) {
  } else {
    const delayBest = analysis.cuts.find(c => c.impact === 'delays');
    if (delayBest) {
    } else {
    }
  }
}

// ── 7. Verbose Play-by-Play Line Printer ──────────────────────────────────

/**
 * enrichStep(msg, state) — Add context and colour to a raw history message.
 * Returns a richer string suitable for a "teach me this line" display.
 */
function enrichStep(msg, state, prevState) {
  if (!msg || msg.startsWith('--')) return null; // skip turn headers

  // Identify what type of action this is
  if (msg.startsWith('Play ')) {
    const landName = msg.slice(5);
    return `▶ Play land: ${landName}`;
  }
  if (msg.startsWith('Tap ') && msg.includes('→')) {
    return `◆ ${msg}`;
  }
  if (msg.startsWith('Cast ')) {
    return `▶ ${msg}`;
  }
  if (msg.includes('→ untap')) {
    return `↺ ${msg}`;
  }
  if (msg.includes('Maze of Ith')) {
    return `↺ ${msg}`;
  }
  if (msg.startsWith('Pass')) {
    return `⏭  ${msg}`;
  }
  return `   ${msg}`;
}

/**
 * printVerboseLine(result, options) — Print a richly formatted, human-readable
 * play-by-play of the optimal winning line. Designed to teach a player how to
 * execute the combo step by step.
 *
 * Options:
 *   showMana      {boolean}  Show floating mana after each step (default true)
 *   showBattlefield {boolean} Show battlefield at turn start (default true)
 *   showHand      {boolean}  Show hand at turn start (default false)
 */
function printVerboseLine(result, options = {}) {
  const {
    showMana        = true,
    showBattlefield = true,
    showHand        = false,
  } = options;

  if (!result) {
    return;
  }

  const { line, combo } = result;
  const W    = 68;
  const SEP  = '═'.repeat(W);
  const dash = '─'.repeat(W);
  if (combo.manaCombo) {
  } else {
  }

  const finalState = line[line.length - 1];
  let currentTurn = 0;
  let stepInTurn  = 0;

  for (let i = 1; i < line.length; i++) {
    const state     = line[i];
    const prevState = line[i - 1];
    // lastEntry drives the turn-boundary check ("-- Begin Turn N --").
    const lastEntry = state.history[state.history.length - 1];
    if (!lastEntry) continue;
    const msg = lastEntry.msg ?? '';

    // Turn boundary
    if (state.turn !== currentTurn) {
      if (currentTurn > 0) console.log('');
      currentTurn = state.turn;
      stepInTurn  = 0;
      const lifeStr   = state.life < 40 ? `  ♥ ${state.life}` : '';
      const libStr    = `  📚 lib:${state.players[0].librarySize}`;
      const handCount = `  🃏 hand:${state.hand.length}`;
      if (showHand && state.hand.length > 0) {
        const handNames = state.hand.map(k => CARDS[k]?.name ?? k).join(', ');
      }

      if (showBattlefield && state.battlefield.length > 0) {
        // Show new permanents that entered this turn vs last
        const prevBf  = new Set((prevState?.battlefield ?? []).map(p => p.id));
        const newPerms = state.battlefield.filter(p => !prevBf.has(p.id));
        if (currentTurn > 1 && state.battlefield.length > 0) {
          const bfNames = state.battlefield.map(p => {
            const isNew = newPerms.some(np => np.id === p.id);
            return isNew ? `[${p.name}]*` : p.name;
          }).join(', ');
          if (newPerms.length) console.log(`        (* = newly entered)`);
        }
      }

      // Skip the "-- Begin Turn N --" message itself
      if (msg.startsWith('--')) continue;
    }

    // Collect ALL new history entries added by this action (may be >1 for
    // on-cast triggers like Sowing Mycospawn that log both the tutor and
    // the cast in a single action.apply() call).
    const prevHistLen = prevState.history.length;
    const newEntries  = state.history.slice(prevHistLen);
    if (newEntries.length === 0) continue;

    // The primary action is always the LAST entry logged (e.g. "Cast Sowing Mycospawn").
    // Trigger/side-effect entries are logged earlier (inside enterBattlefield).
    // Display: primary step first, then side-effects as indented sub-lines.
    const primaryEntry = newEntries[newEntries.length - 1];
    const primaryMsg   = primaryEntry?.msg ?? '';
    if (primaryMsg.startsWith('--')) continue;

    const primaryEnriched = enrichStep(primaryMsg, state, prevState);
    if (primaryEnriched === null) continue;

    stepInTurn++;
    const stepLabel = `  [${String(stepInTurn).padStart(2)}]`;
    // Sub-lines: all entries before the primary (triggers, tutors, etc.)
    for (let e = 0; e < newEntries.length - 1; e++) {
      const subMsg = newEntries[e].msg ?? '';
      if (subMsg && !subMsg.startsWith('--')) {
      }
    }

    if (showMana) {
      const manaStr = state.mana.toString();
      if (manaStr !== '{0}') {
      }
    }
  }

  // Final state summary
  if (combo.manaCombo) {
    // Explain the loop
    const desc = combo.description ?? '';
    if (desc) {
      const lines = desc.split('. ').filter(Boolean);
      for (const descLine of lines.slice(0, 4)) {
      }
    }
    if (combo.winCondition) {
    } else {
    }
  } else {
    if (combo.description) console.log(`  ${combo.description.slice(0, 200)}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────


var _nameMap = {};
for (const [k, v] of Object.entries(CARDS)) {
  if (v && v.name) _nameMap[v.name] = k;
}
self.onmessage = function(e) {
  const d = e.data;

  // ── mulliganAnalyze: Monte Carlo hand evaluation ──────────────────────────
  if (d.type === 'mulliganAnalyze') {
    try {
      const handKeys    = (d.hand    || []).map(n => _nameMap[n]).filter(Boolean);
      const libraryKeys = (d.library || []).map(n => _nameMap[n]).filter(Boolean);
      const result = mulliganAnalyze(handKeys, {
        trials:    d.trials    || 5,
        maxTurns:  d.maxTurns  || 4,
        maxDepth:  d.maxDepth  || 50,
        maxStates: d.maxStates || 150000,
        library:   libraryKeys.length > 0 ? libraryKeys : null,
      });
      self.postMessage({ type: 'mulliganResult', infiniteManaPercent: result.infiniteManaPercent, winPercent: result.winPercent });
    } catch(err) {
      self.postMessage({ type: 'mulliganResult', infiniteManaPercent: 0, winPercent: 0, error: err.message });
    }
    return;
  }

  // ── handAnalyze: run analyze() on an opening hand for gradeHand enrichment ──
  // Payload: { type:'handAnalyze', hand:[names], maxTurns, maxDepth, maxStates }
  // Response: { type:'handAnalyzeResult', canCombo, comboTurn, comboName, winCondition, nearMisses }
  if (d.type === 'handAnalyze') {
    try {
      const handKeys = (d.hand || []).map(n => _nameMap[n]).filter(Boolean);
      const result = analyze(handKeys, {
        maxTurns:  d.maxTurns  || 4,
        maxDepth:  d.maxDepth  || 50,
        maxStates: d.maxStates || 200000,
        whatIf:    false,
      });
      self.postMessage({
        type:        'handAnalyzeResult',
        canCombo:    result.canCombo,
        comboTurn:   result.comboTurn,
        comboName:   result.comboName,
        winCondition:result.winCondition,
        nearMisses:  (result.nearMisses || []).slice(0, 3).map(nm => ({
          need: (nm.need || []).slice(0, 2),
        })),
      });
    } catch(err) {
      self.postMessage({ type: 'handAnalyzeResult', canCombo: false, comboTurn: null, comboName: null, winCondition: null, nearMisses: [], error: err.message });
    }
    return;
  }

  // ── criticalityAnalyze: what-if solve with one card removed from hand ────
  // Payload: { type:'criticalityAnalyze', hand:[names], removeKey, baseTurn, maxTurns, maxDepth, maxStates }
  // Response: { type:'criticalityResult', removeKey, cardName, criticality, turnsWithout, baseTurn }
  if (d.type === 'criticalityAnalyze') {
    try {
      const allKeys = (d.hand || []).map(n => _nameMap[n]).filter(Boolean);
      const removeKey = d.removeKey;
      const reduced = [...allKeys];
      const ri = reduced.indexOf(removeKey);
      if (ri !== -1) reduced.splice(ri, 1);
      const result = analyze(reduced, {
        maxTurns:  d.maxTurns  || 4,
        maxDepth:  d.maxDepth  || 40,
        maxStates: d.maxStates || 60000,
        whatIf:    false,
      });
      const turnsWithout = (result?.canCombo && result.comboTurn != null) ? result.comboTurn : Infinity;
      const baseTurn = d.baseTurn;
      let criticality;
      if (turnsWithout === Infinity)       criticality = 'essential';
      else if (turnsWithout > baseTurn)    criticality = 'accelerant';
      else                                 criticality = 'redundant';
      const cardName = Object.keys(_nameMap).find(n => _nameMap[n] === removeKey) ?? removeKey;
      self.postMessage({ type: 'criticalityResult', removeKey, cardName, criticality, turnsWithout, baseTurn });
    } catch(err) {
      self.postMessage({ type: 'criticalityResult', removeKey: d.removeKey, cardName: d.removeKey, criticality: 'essential', turnsWithout: Infinity, baseTurn: d.baseTurn, error: err.message });
    }
    return;
  }

  // ── mulliganCutAnalyze: "Going to 6?" cut advisor — runs off main thread ──
  // Payload: { type:'mulliganCutAnalyze', hand:[names], maxTurns, maxDepth, maxStates }
  // Response: { type:'mulliganCutResult', baseTurn, baseCombo, cuts:[{cutKey,cutName,turn6,combo6,impact,turnDelta}] }
  if (d.type === 'mulliganCutAnalyze') {
    try {
      const handKeys = (d.hand || []).map(n => _nameMap[n]).filter(Boolean);
      const result = mulliganCutAdvisor(handKeys, {
        maxTurns:  d.maxTurns  || 4,
        maxDepth:  d.maxDepth  || 40,
        maxStates: d.maxStates || 150000,
      });
      self.postMessage({ type: 'mulliganCutResult', baseTurn: result.baseTurn, baseCombo: result.baseCombo, cuts: result.cuts });
    } catch(err) {
      self.postMessage({ type: 'mulliganCutResult', baseTurn: Infinity, baseCombo: null, cuts: [], error: err.message });
    }
    return;
  }

  // ── simGradeAnalyze: run simGradeHand off the main thread ──────────────────
  // Payload: { type:'simGradeAnalyze', hand:[names], deckCards:[names], n, maxTurns }
  // Response: { type:'simGradeResult', result:{winPct, avgTurn, label, breakdown} }
  if (d.type === 'simGradeAnalyze') {
    try {
      const result = simGradeHand(d.hand || [], d.deckCards || [], d.n || 10, d.maxTurns || 20);
      self.postMessage({ type: 'simGradeResult', result });
    } catch(err) {
      self.postMessage({ type: 'simGradeResult', result: null, error: err.message });
    }
    return;
  }

  try {
    const sickSet   = new Set(d.sickCards   || []);
    const tappedSet = new Set(d.tappedCards || []);
    const handKeys       = (d.hand      || []).map(n => _nameMap[n]).filter(Boolean);
    const graveyardNames = (d.graveyard || []).filter(Boolean);
    const libraryKeys    = d.library ? d.library.map(n => _nameMap[n]).filter(Boolean) : null;
    let state = new GameState({
      hand: handKeys,
      mana: { G: Math.min(d.greenMana||0,30), C: Math.min(d.colorlessMana||0,30) },
      turn: 1, landDrops: d.landDrops??1, life: d.life||40,
      ...(libraryKeys ? { library: libraryKeys } : { librarySize: Math.max(0,d.librarySize||99) }),
      graveyard: graveyardNames,
      // Bug fix: forward opponent stax names from the payload.  Without this,
      // the Solver tab silently ignored Thorn / Trinisphere / Chalice / Vexing
      // Bauble / Disruptor Flute toggled in the Goldfish Stax tab — the worker
      // path is the production solver path, so the inline runSolver fix alone
      // never took effect for users.  Constructor will derive _hasSTAX from
      // any cost-affecting entries (see GameState.js).
      opponentStax: Array.isArray(d.opponentStax) ? d.opponentStax : [],
    });
    const bfNames = d.battlefield || [];
    const permIdByBfIdx = new Map();
    let moxesPlaced = 0;
    const imprintedMoxCount = d.imprintedMoxCount || 0;
    for (let i = 0; i < bfNames.length; i++) {
      const name = bfNames[i];
      const key = _nameMap[name]; if (!key) continue;
      const isTapped = tappedSet.has(name)||[...tappedSet].some(k=>k.startsWith(name+':'));
      const extra = {summoningSick:sickSet.has(name),tapped:isTapped,skipETB:true};
      if (name === 'Chrome Mox') {
        if (moxesPlaced < imprintedMoxCount) extra.imprintedColor = 'G';
        moxesPlaced++;
      }
      const idBefore = state._nextId;
      try {
        state = state.enterBattlefield(key, extra, {skipETB: true});
        permIdByBfIdx.set(i, idBefore);
      } catch(_) {}
    }
    // Apply React attachment map using id-based lookup on the final live state.
    // (enterBattlefield clones state each call — mid-loop perm references go stale.)
    for (const [auraIdx, landIdx] of (d.attachmentPairs || [])) {
      const auraId = permIdByBfIdx.get(auraIdx);
      const landId = permIdByBfIdx.get(landIdx);
      if (auraId == null || landId == null) continue;
      const auraPerm = state.battlefield.find(p => p.id === auraId);
      const landPerm = state.battlefield.find(p => p.id === landId);
      if (auraPerm && landPerm) auraPerm.enchantedLandId = landPerm.id;
    }
    // EarthBent: mutate lands that were animated by Badgermole Cub in a prior turn.
    // Must run after the enterBattlefield loop — each enterBattlefield call returns a
    // new cloned state so any mid-loop mutation goes stale. The GameState constructor
    // block handles the data.battlefield deserialization path; this handles the
    // Goldfish worker path where cards are placed one-by-one via enterBattlefield.
    const earthbentNames = d.earthbentLandNames || [];
    if (earthbentNames.length > 0) {
      const nameSet = new Set(earthbentNames);
      state._ensureBF();
      for (const perm of state.battlefield) {
        if (nameSet.has(perm.name)) {
          if (!perm.types.includes('creature')) perm.types = [...perm.types, 'creature'];
          perm.summoningSick = false; // earthbend grants haste
        }
      }
    }
    // Read solver config from payload (with safe defaults)
    const solverOpts = {
      maxTurns:   Math.min(Math.max(d.maxTurns  ?? 4,  1), 10),
      maxDepth:   Math.min(Math.max(d.maxDepth  ?? 50, 10), 200),
      maxStates:  Math.min(Math.max(d.maxStates ?? 200000, 10000), 2000000),
      strategy:   ['bfs','dfs','iddfs'].includes(d.strategy) ? d.strategy : 'dfs',
      allLines:   !!d.allLines,
      exhaustive: !!d.exhaustive,
    };
    const result = new Solver(solverOpts).solve(state);
    if (!result) { self.postMessage({found:false}); return; }
    const lastState = result.line[result.line.length-1];
    // ── terse turns (mirrors printResults in Solver.js) ──
    // Each step captures the primary action (last new history entry) plus
    // any sub-lines (trigger/side-effect entries that preceded it).
    const turns=[]; let currentTurn=0;
    for (let i=1;i<result.line.length;i++) {
      const st=result.line[i],prev=result.line[i-1];
      if (st.turn!==currentTurn) { currentTurn=st.turn; turns.push({turn:currentTurn,steps:[]}); }
      const newEntries=st.history.slice(prev.history.length);
      if (!newEntries.length) continue;
      const primaryEntry=newEntries[newEntries.length-1];
      const primaryMsg=typeof primaryEntry==='string'?primaryEntry:(primaryEntry?.msg||'');
      if (!primaryMsg||primaryMsg.startsWith('--')) continue;
      const subLines=[];
      for (let e=0;e<newEntries.length-1;e++) {
        const sub=newEntries[e]; const sm=typeof sub==='string'?sub:(sub?.msg||'');
        if (sm&&!sm.startsWith('--')) subLines.push(sm);
      }
      const ms=st.mana&&st.mana.toString?st.mana.toString():'';
      turns[turns.length-1].steps.push({msg:primaryMsg,subLines:subLines.length?subLines:null,mana:(ms&&ms!=='{0}')?ms:null});
    }
    // ── verbose turns ──
    function _wEnrichStep(msg) {
      if (!msg || msg.startsWith('--')) return null;
      if (msg.startsWith('Play '))                          return '▶ Play land: ' + msg.slice(5);
      if (msg.startsWith('Tap ') && msg.includes('→'))     return '◆ ' + msg;
      if (msg.startsWith('Cast '))                          return '▶ ' + msg;
      if (msg.includes('→ untap') || msg.includes('Maze of Ith')) return '↺ ' + msg;
      if (msg.startsWith('Pass'))                           return '⏭  ' + msg;
      return '   ' + msg;
    }
    const verboseTurns=[]; let vTurn=0;
    for (let i=1;i<result.line.length;i++) {
      const st=result.line[i],prev=result.line[i-1];
      if (st.turn!==vTurn) {
        vTurn=st.turn;
        const prevBf=new Set((prev?.battlefield||[]).map(p=>p.id));
        const bfNames=(st.battlefield||[]).map(p=>prevBf.has(p.id)?p.name:('['+p.name+']*'));
        verboseTurns.push({turn:vTurn,handCount:st.hand?.length||0,libSize:st.players?.[0]?.librarySize??'?',battlefield:bfNames,steps:[]});
        const firstEntry=st.history[prev.history.length];
        const firstMsg=typeof firstEntry==='string'?firstEntry:(firstEntry?.msg||'');
        if (firstMsg.startsWith('--')) continue;
      }
      const newEntries=st.history.slice(prev.history.length);
      if (!newEntries.length) continue;
      const primaryEntry=newEntries[newEntries.length-1];
      const rawMsg=typeof primaryEntry==='string'?primaryEntry:(primaryEntry?.msg||'');
      if (!rawMsg||rawMsg.startsWith('--')) continue;
      const subLines=[];
      for (let e=0;e<newEntries.length-1;e++) {
        const sub=newEntries[e]; const sm=typeof sub==='string'?sub:(sub?.msg||'');
        if (sm&&!sm.startsWith('--')) subLines.push(_wEnrichStep(sm)||sm);
      }
      const enriched=_wEnrichStep(rawMsg); if(!enriched) continue;
      const ms=st.mana&&st.mana.toString?st.mana.toString():'';
      verboseTurns[verboseTurns.length-1].steps.push({msg:enriched,subLines:subLines.length?subLines:null,mana:(ms&&ms!=='{0}')?ms:null});
    }
    // ── loop explanation lines ──
    const loopLines=[];
    if (result.combo?.description) result.combo.description.split('. ').filter(Boolean).slice(0,4).forEach(s=>loopLines.push(s.trim()+'.'));
    // Summarise allLines for the UI (combo name + win turn only — avoid huge payloads)
    const allWinLines = (result.allLines ?? []).map(l => ({
      comboName:    l.combo?.name ?? l.combo?.manaCombo ?? 'Unknown',
      winTurn:      l.line?.[l.line.length-1]?.turn ?? 1,
      winCondition: l.combo?.winCondition ?? null,
    }));
    // ── Tutor recs — run tutorAdvisor on full allLines before stripping history ──
    const tutorRecs = solverOpts.allLines ? (() => {
      try {
        const recs = tutorAdvisor(result);
        return (recs ?? []).map(r => ({
          targetName:  r.targetName,
          fastestTurn: r.fastestTurn,
          lineCount:   r.lineCount,
          comboNames:  r.comboNames,
        }));
      } catch(_) { return []; }
    })() : [];
    self.postMessage({found:true,
      comboName:result.combo?.name??'Infinite Mana',comboDesc:result.combo?.description??'',
      winCondition:result.combo?.winCondition??null,
      manaCombo:result.combo?.manaCombo??result.combo?.name??'Infinite Mana',
      winAssemblySteps:result.assembly?.steps??[],
      steps:(()=>{const hist=(lastState.history||[]).map(h=>typeof h==='string'?h:(h.msg||String(h)));return hist.length>0?hist:(result.assembly?.steps??[]);})(),
      winTurn:lastState.turn||1,turns,verboseTurns,loopLines,
      finalHand:(lastState.hand||[]).map(p=>p.name||String(p)),
      finalBf:(lastState.battlefield||[]).map(p=>p.name||String(p)),
      finalGy:(lastState.players[0].graveyard||[]).map(p=>p.name||String(p)),
      finalEx:(lastState.players[0].exile||[]).map(p=>p.name||String(p)),
      finalMana:lastState.mana?.toString?.()??'',
      allWinLines,tutorRecs,
    });
  } catch(err) { self.postMessage({found:false,error:err.message}); }
};
