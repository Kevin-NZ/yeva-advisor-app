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
  ['ashaya','scryb_ranger','priest_of_titania'],
  ['ashaya','scryb_ranger','circle_of_dreams_druid'],
  ['ashaya','scryb_ranger','elvish_archdruid'],
  ['ashaya','scryb_ranger','wirewood_channeler'],
  ['ashaya','scryb_ranger','karametra_acolyte'],
  ['ashaya','scryb_ranger','selvala'],
  ['ashaya','scryb_ranger','fanatic_of_rhonas'],
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

  // Temur Sabertooth + Selvala (combos 22, 29, 37)
  ['selvala','temur_sabertooth','surrak_goreclaw'],         // 22
  ['selvala','temur_sabertooth','thousand_year_elixir'],    // 29
  ['karametra_acolyte','temur_sabertooth','thousand_year_elixir'], // 37

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

  // Argothian Elder / Ley Weaver loops (combos 31, 40, 42, 46)
  ['argothian_elder','wirewood_lodge'],                    // 40, 42, 46
  ['argothian_elder','wirewood_lodge','nykthos'],          // 31
  ['ley_weaver','wirewood_lodge'],

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
};

// ── Functional equivalents ────────────────────────────────────────────────
// Within each group, having any one member satisfies all combos that use any
// other member (they play the same role in the combo engine).
var FUNCTIONAL_EQUIVALENTS = [
  new Set(['temur_sabertooth', 'kogla']),
  new Set(['quirion_ranger', 'scryb_ranger']),
  new Set(['argothian_elder', 'ley_weaver']),
  // All of these tap for large amounts of green mana and slot into the same
  // Temur Sabertooth / Hyrax bounce loops.
  new Set(['circle_of_dreams_druid', 'karametra_acolyte', 'priest_of_titania',
           'elvish_archdruid', 'wirewood_channeler', 'marwyn']),
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

// ═══════════════════════════════════════════════════════════════════════════
//  Constants
// ═══════════════════════════════════════════════════════════════════════════

var DEFAULT_LIBRARY_SIZE    = 99;   // Commander deck minus commander (used as fallback)
var POISON_LOSS_THRESHOLD   = 10;

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
  'elvish_guidance','elvish_harbinger','elvish_mystic','elvish_reclaimer',
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
      p.library = [...p.library, ...p.graveyard.map(() => 'unknown')];
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
    // Custom fields set by card ETB hooks
    if (this.imprintedColor  !== undefined) p.imprintedColor  = this.imprintedColor;
    if (this.enchantedLandId !== undefined) p.enchantedLandId = this.enchantedLandId;
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
    this.landDrops     = data.landDrops   ?? 1;
    this.hand          = data.hand        ? [...data.hand].sort() : []; // [E6] kept sorted
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
  hasPermanent(name) {
    if (!this._permNames) {
      this._permNames = new Set(this.battlefield.map(p => p.name));
    }
    return this._permNames.has(name);
  }

  getPermanent(name)  { return this.battlefield.find(p => p.name === name); }
  getPermanentById(id){ return this.battlefield.find(p => p.id === id); }

  forestsInHand() {
    return this.hand.filter(c => {
      var def = CARDS;
      return def && def.subtypes && def.subtypes.includes('Forest');
    });
  }

  // ── Clone ─────────────────────────────────────────────────────────────────

  clone() {
    // COW (copy-on-write) clone: battlefield and opponent players are shared.
    // Player 0 (active player) is cloned eagerly since nearly every action
    // mutates it. Opponents are shared and cloned lazily via _ensurePlayers().
    const s = Object.create(GameState.prototype);
    s.turn          = this.turn;
    s.phase         = this.phase;
    s.landDrops     = this.landDrops;
    s.hand          = [...this.hand];
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
    s.topDecked     = this.topDecked;
    s.drawForTurn   = this.drawForTurn;
    s._hasSTAX      = this._hasSTAX;
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
    s.landDrops     = this.landDrops;
    s.hand          = this.hand;            // shared (no mutation after log)
    s.battlefield   = this.battlefield;     // shared
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
    s.topDecked     = this.topDecked;
    s.drawForTurn   = this.drawForTurn;
    s._hasSTAX      = this._hasSTAX;
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
   */
  discardFromHand(cardKey) {
    var cards = CARDS;
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
    // to untap Hope Tender), once-per-tap ability flags should reset so the creature
    // can activate again. The exert flag (exert_two_lands) is preserved — exert
    // persists until the creature's NEXT untap step, not cleared by mid-turn untaps.
    if (p.abilitiesUsed && Object.keys(p.abilitiesUsed).length > 0) {
      const preserved = {};
      if (p.abilitiesUsed.exert_two_lands) preserved.exert_two_lands = true;
      p.abilitiesUsed = preserved;
    }
    return s;
  }

  enterBattlefield(cardKey, extra = {}, { skipETB = false } = {}) {
    var cards = CARDS;
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
    const STAX_NAMES = new Set(['Thorn of Amethyst','Trinisphere','Null Rod','Collector Ouphe','Root Maze','Orb of Dreams','Vexing Bauble','Chalice of the Void','Disruptor Flute']);
    if (STAX_NAMES.has(def.name)) s._hasSTAX = true;

    // ── Static layer: apply existing statics to the new permanent ────────────

    // Orb of Dreams / Root Maze: all permanents enter tapped.
    // Orb of Dreams: "Permanents enter the battlefield tapped."
    // Root Maze: "Lands and artifacts enter the battlefield tapped."
    // Applied after the perm is pushed so we can check its types.
    if (s.hasPermanent('Orb of Dreams')) {
      perm.tapped = true;
      perm.summoningSick = true;  // creatures also can't untap until next turn
    } else if (s.hasPermanent('Root Maze')) {
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

    // Regal Force ETB: draw a card for each green creature you control
    if (!skipETB && cardKey === 'regal_force') {
      const greenCreatures = s.creatures().length; // simplified: all creatures
      s = s.playerDraws(0, greenCreatures);
    }

    // Fierce Empath ETB: search library for creature with MV ≥ 6, put in hand.
    // Targets: Woodland Bellower (MV 6), Kogla (MV 6), Regal Force (MV 7), etc.
    if (!skipETB && cardKey === 'fierce_empath') {
      var cardsModule = CARDS;
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

    // Disciple of Freyalise ETB: sacrifice another creature, draw X, gain X life
    // where X = sacrificed creature's power.
    // Strategy: sacrifice the lowest-power non-key creature to draw cards.
    if (!skipETB && cardKey === 'disciple_freyalise') {
      const KEEP = new Set(['Ashaya, Soul of the Wild', 'Temur Sabertooth', 'Kogla, the Titan Ape',
                            'Selvala, Heart of the Wilds', 'Quirion Ranger', 'Scryb Ranger',
                            'Hope Tender', 'Argothian Elder', 'Ley Weaver']);
      const expendable = s.creatures().filter(c => c.id !== perm.id && !KEEP.has(c.name));
      if (expendable.length > 0) {
        // Sacrifice lowest-power creature to minimise loss while still drawing
        const sac = expendable.sort((a, b) => (a.power ?? 1) - (b.power ?? 1))[0];
        const sacPower = sac.power ?? 1;
        s = s.removeFromBattlefield(sac.id, 'graveyard');
        if (s) {
          s = s.playerDraws(0, sacPower);
          s.life += sacPower; // gain X life
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
      var cardsModule = CARDS;
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
    if (zone === 'graveyard') s.players[pi] = s.players[pi].putInGraveyard(removed.name);
    if (zone === 'exile')     s.players[pi] = s.players[pi].putInExile(removed.name);
    const STAX_NAMES_R = new Set(['Thorn of Amethyst','Trinisphere','Null Rod','Collector Ouphe','Root Maze','Orb of Dreams','Vexing Bauble','Chalice of the Void','Disruptor Flute']);
    s._hasSTAX = s.battlefield.some(p => STAX_NAMES_R.has(p.name));
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
    s.mana = new ManaPool();
    s.storm = 0;
    s.isOpponentTurn = false;
    s.flashThisTurn  = false;
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
      let potentialG = 0;
      let potentialAny = 0;
      for (const p of s.battlefield) {
        const def = CARDS[p.cardKey];
        if (!def?.tapForMana) continue;
        if (def.types.includes('creature') && p.summoningSick) continue;
        // Call tapForMana to see what it produces (using current state)
        const results = def.tapForMana(s, p);
        if (!results || !results.length) continue;
        const afterTap = results[0];
        // How much did mana increase?
        const gained = afterTap.mana.total() - s.mana.total();
        const gainedG = afterTap.mana.G - s.mana.G;
        potentialG   += Math.max(0, gainedG);
        potentialAny += Math.max(0, gained);
      }
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
      // Can pay — deduct {2}{G}{G} from potential mana (tap sources as needed)
      // For simplicity, just log the payment; the solver will naturally tap
      // lands during the turn. The key enforcement is the loss branch above.
      s.history = [...s.history, {
        turn: s.turn,
        msg: `-- Begin Turn ${s.turn} (lib: ${s.players[0].librarySize}) --`,
      }, {
        turn: s.turn,
        msg: `Summoner's Pact upkeep: pay {2}{G}{G} ✓`,
      }];
      s._ensurePlayers();
      s.players[0] = s.players[0].draw(0); // no-op clone to own player
      return s._afterDraw(s);
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
      _ensurePlayers()
      s.players[0] = s.players[0].draw(1);
      // [E6] Insert sorted
      const h = s.hand; let lo = 0, hi = h.length;
      while (lo < hi) { const mid = (lo + hi) >>> 1; if (h[mid] <= topCard) lo = mid + 1; else hi = mid; }
      s.hand = [...h.slice(0, lo), topCard, ...h.slice(lo)];
    } else if (s.drawForTurn && s.players[0].library.length > 0) {
      const drawnKey = s.players[0].library[0];
      _ensurePlayers()
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

    // Battlefield — sort by encoded string.
    // enchantedLandId is encoded as the target land name (not ID) so states where
    // an aura enchants different lands are never aliased, but equivalent states
    // reached via different action orderings still deduplicate correctly.
    const _encMap = new Map(this.battlefield.map(p => [p.id, p.name]));
    const bf = this.battlefield
      .map(p => p.name + (p.tapped ? ':T' : ':U') + (p.isForest ? ':F' : '') + (p.enchantedLandId !== undefined ? ':E[' + (_encMap.get(p.enchantedLandId) ?? p.enchantedLandId) + ']' : ''))
      .sort().join('|');

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
               (this.flashThisTurn ? '|FL' : '') +
               (this.pactOwed      ? '|PC' : '') +
               (this.topDecked     ? '|TD:' + this.topDecked : '');  // [E1] topDecked aliasing fix
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
    for (const [color, amt] of colorPairs) for (let i = 0; i < amt; i++) s = s.addMana(color);
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

          // Option 1: Dryad Arbor (forest creature — best for combos)
          // Only offer if Dryad Arbor is actually in the library (not in hand or on battlefield)
          {
            const dryadInHand = state.hand.includes('dryad_arbor');
            const dryadOnBF   = state.battlefield.some(p => p.name === 'Dryad Arbor');
            const dryadExiled = state.exile.includes('Dryad Arbor');
            if (!dryadInHand && !dryadOnBF && !dryadExiled) {
              let s = state.clone();
              s.life -= 1;
              s = s.removeFromBattlefield(perm.id, 'graveyard');
              if (s) {
                s = s.enterBattlefield('dryad_arbor');
                results.push(s.log(`${name}: fetch Dryad Arbor`));
              }
            }
          }

          // Option 2: Basic Forest (immediately tappable for {G})
          {
            let s = state.clone();
            s.life -= 1;
            s = s.removeFromBattlefield(perm.id, 'graveyard');
            if (s) {
              s = s.enterBattlefield('forest');
              results.push(s.log(`${name}: fetch Forest`));
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
      const bounceable = state.battlefield.filter(p => filterFn(p));
      for (const target of bounceable) {
        const creaturesCanUntap = state.creatures().filter(c => c.id !== target.id && c.tapped);
        const untapTargets = target.id === perm.id
          ? creaturesCanUntap
          : [...creaturesCanUntap, { ...perm, _isSelf: true }];
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
      return results;
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

  misty_rainforest:  makeFetchLand('Misty Rainforest'),
  verdant_catacombs: makeFetchLand('Verdant Catacombs'),
  windswept_heath:   makeFetchLand('Windswept Heath'),
  wooded_foothills:  makeFetchLand('Wooded Foothills'),

  shifting_woodland:   { name: 'Shifting Woodland',          types: ['land'], subtypes: [], cost: null, tapForMana: simpleTap('{G}', [['G',1]]) },
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
  talon_gates:         { name: 'Talon Gates of Madara',      types: ['land'], subtypes: ['Gate'], cost: null, tapForMana: simpleTap('{C}', [['C',1]]) },
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
  bonders_enclave:     { name: "Bonders' Enclave",           types: ['land'], subtypes: [], cost: null, tapForMana: simpleTap('{C}', [['C',1]]) },
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
  urza_cave:           { name: "Urza's Cave",                types: ['land'], subtypes: [], cost: null, tapForMana: simpleTap('{C}', [['C',1]]) },
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
            let s = state.discardFromHand(card); if (!s) continue;
            // Mark perm as having a luck counter
            s = s.clone();
            s._ensureBF();
            const idx = s.battlefield.findIndex(p => p.id === perm.id);
            if (idx < 0) continue;
            s.battlefield = [...s.battlefield];
            s.battlefield[idx] = { ...s.battlefield[idx], luckCounter: true };
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
          s = s.discardFromHand(lk);
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
  agatha_cauldron:  { name: "Agatha's Soul Cauldron", types: ['artifact'], subtypes: ['Legendary'], cost: '2' },
  emerald_medallion:{ name: 'Emerald Medallion', types: ['artifact'], subtypes: [], cost: '2', costReduction: { color: 'G', amount: 1 } },
  null_rod:         { name: 'Null Rod',          types: ['artifact'], subtypes: [], cost: '2' },
  thorn_of_amethyst:{ name: 'Thorn of Amethyst', types: ['artifact'], subtypes: [], cost: '2' },
  trinisphere:      { name: 'Trinisphere',        types: ['artifact'], subtypes: [], cost: '3' },
  orb_of_dreams:    { name: 'Orb of Dreams',      types: ['artifact'], subtypes: [], cost: '3' },

  // Chalice of the Void: Cast with X charge counters. Counters all spells with
  // CMC equal to X. Modeled as a stax piece — the solver won't self-cast it,
  // but recognises it as a hate piece when placed on the battlefield by tests/setup.
  // Most impactful at X=1 (hits almost all 1-drop mana dorks, cantrips, tutors).
  chalice_of_the_void: {
    name: 'Chalice of the Void', types: ['artifact'], subtypes: [], cost: 'XX',
    // chargeCounters stored on the permanent at placement time (default 1)
    // Static effect modelled in effectiveCost / action generation (see actions.js)
  },

  // Disruptor Flute: {2}, enters naming a card. Activated abilities of permanents
  // with that name cost {3} more. Modeled as a generic stax artifact — the solver
  // will not cast or fetch it, but it suppresses opponent engines when placed.
  disruptor_flute: {
    name: 'Disruptor Flute', types: ['artifact'], subtypes: [], cost: '2',
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
      for (let i = 0; i < manaAmt; i++) ns = ns.addMana(color);
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
          if (perm.summoningSick) return [];
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
    name: 'Treefolk Harbinger', types:['creature'], subtypes:['Treefolk','Druid'], cost:'G', power:1,toughness:1,
    // ETB: search library for a Treefolk or Forest card, reveal it, put on top of library.
    // In this deck the relevant targets are: Forest (basic land), Yavimaya, Dryad Arbor
    // (Forest subtype land), Ashaya (Elemental, not Treefolk — not a valid target),
    // Woodland Bellower (Beast, not Treefolk — not valid).
    // Valid Treefolk: Treefolk Harbinger itself, Lignify aura has Treefolk subtype.
    // Modeled as: on ETB, generate one branch per unique matching card in the library;
    // put the found card on top (topDecked) so it's drawn next turn.
    onEnter(state) {
      var cards = CARDS;
      const library = state.players[0].library;
      // Collect unique matching keys (Forest-subtype land OR Treefolk creature)
      const matchKeys = [...new Set(library)].filter(k => {
        const def = cards[k];
        if (!def) return false;
        if (def.subtypes?.includes('Forest')) return true;   // Forest land
        if (def.subtypes?.includes('Treefolk')) return true; // Treefolk creature
        return false;
      });
      if (matchKeys.length === 0) return state; // nothing to find — return unchanged state
      const results = [];
      for (const targetKey of matchKeys) {
        const { state: ns, cardKey: found } = state.searchLibraryFor(k => k === targetKey);
        if (!found) continue;
        const s = ns.clone();
        s.topDecked = found;
        const cardName = cards[found]?.name ?? found;
        results.push(s.log(`Treefolk Harbinger ETB: put ${cardName} on top of library`));
      }
      // Return array of branches, or single state if only one option
      return results.length === 1 ? results[0] : results.length > 1 ? results : state;
    },
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
      for (let i = 0; i < p; i++) s = s.addMana('G');
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
          return pairs.map(pair => {
            let s = at;
            for (const land of pair) s = s.untapPermanent(land.id);
            return s.log(`Hope Tender (exert): {1}, tap → untap ${pair.map(p => p.name).join(' + ')}`);
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
          var cards = CARDS;
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
          var cards = CARDS;
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
          if (perm.summoningSick) return [];
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
    name: 'Seedborn Muse', types: ['creature'], subtypes: ['Spirit'],
    cost: '3GG', power: 2, toughness: 4,
    // Static: untap all your permanents during each other player's untap step.
    // Implemented in actions.js: the 'opponent_turn' action untaps all permanents
    // when Seedborn Muse is on the battlefield. Exerted creatures are correctly
    // excluded from this untap (they wait for your own next untap step).
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
  collector_ouphe:     { name:'Collector Ouphe',            types:['creature'],subtypes:['Ouphe'],             cost:'1G',   power:2,toughness:2 },
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
          const results = [];

          // Search the actual library first
          const elfLibKeys = [...new Set(s0.players[0].library)].filter(k =>
            cards[k] && cards[k].subtypes && cards[k].subtypes.includes('Elf')
          );
          for (const k of elfLibKeys) {
            const { state: ns, cardKey: found } = s0.searchLibraryFor(lk => lk === k);
            if (!found) continue;
            const after = ns.enterBattlefield(found);
            results.push(after.log(`Skyshroud Poacher: put ${cards[k].name} onto battlefield`));
          }

          // Also check hand (approximation for unknown library contents)
          const elfHandKeys = [...new Set(s0.hand)].filter(k =>
            cards[k] && cards[k].subtypes && cards[k].subtypes.includes('Elf') &&
            !elfLibKeys.includes(k)
          );
          for (const k of elfHandKeys) {
            let ns = s0.removeFromHand(k); if (!ns) continue;
            ns = ns.enterBattlefield(k);
            results.push(ns.log(`Skyshroud Poacher: put ${cards[k].name} onto battlefield`));
          }

          return results;
        },
      },
    },
  },
  fierce_empath: {
    name: 'Fierce Empath', types:['creature'], subtypes:['Elf'], cost:'2G', power:1,toughness:1,
    // ETB: you may search your library for a creature card with mana value 6 or greater,
    // reveal it, and put it into your hand. Shuffle.
    // Key targets in this deck: Woodland Bellower (6), Regal Force (7), Kogla (7),
    // Temur Sabertooth (4 — NOT a valid target, MV too low),
    // Selvala (4 — NOT valid), Seedborn Muse (5 — NOT valid).
    // Valid: Woodland Bellower (6), Regal Force (7), Kogla the Titan Ape (7).
    onEnter(state) {
      var cards = CARDS;
      // Parse MV from cost string: count all mana symbols
      function mv(cost) {
        if (!cost) return 0;
        let total = 0;
        for (const ch of cost) {
          if (ch >= '1' && ch <= '9') total += parseInt(ch);
          else if (ch === 'G' || ch === 'W' || ch === 'U' || ch === 'R' || ch === 'B' ||
                   ch === 'C') total += 1;
          else if (ch === 'X') continue; // X spells: treat X=0 for MV calculation
        }
        return total;
      }

      const results = [];
      const seen = new Set();
      for (const k of state.players[0].library) {
        if (seen.has(k)) continue; seen.add(k);
        const def = cards[k];
        if (!def || !def.types.includes('creature')) continue;
        if (mv(def.cost) < 6) continue;
        const { state: ns, cardKey: found } = state.searchLibraryFor(lk => lk === k);
        if (!found) continue;
        results.push(ns.addToHand(found).log(`Fierce Empath ETB: search → ${def.name} to hand`));
      }
      // Also check: if no target exists, Fierce Empath still ETBs (just doesn't search)
      return results.length === 1 ? results[0] : results.length > 1 ? results : state;
    },
  },
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
          if (perm.summoningSick) return [];
          const ap = state.payMana('3G'); if (!ap) return [];
          // Count enchantments you control for the X/X size
          const x = state.battlefield.filter(p => p.types.includes('enchantment')).length;
          if (x === 0) return []; // 0/0 lands die immediately — no value
          const results = [];
          // Target any land (or any creature that is also a land under Ashaya)
          const targets = ap.battlefield.filter(p => p.is('land') && !p.summoningSick);
          for (const target of targets) {
            let s = ap;
            // Animate: add creature type, set haste (no summoning sickness)
            const tgt = s.battlefield.find(p => p.id === target.id);
            if (!tgt) continue;
            tgt._ensureOwnTypes?.();
            if (!tgt.types.includes('creature')) tgt.types = [...(tgt.types || []), 'creature'];
            tgt.summoningSick = false;
            tgt.power     = x;
            tgt.toughness = x;
            results.push(s.log(`Destiny Spinner: animate ${target.name} → ${x}/${x} Elemental with haste`));
          }
          return results;
        },
      },
    },
  },
  chomping_changeling: { name:'Chomping Changeling',        types:['creature'],subtypes:['Shapeshifter'],      cost:'2G',   power:3,toughness:3 },
  lotus_cobra: {
    name: 'Lotus Cobra', types: ['creature'], subtypes: ['Snake'], cost: '1G',
    power: 2, toughness: 1,
    // Landfall: whenever a land enters, add one mana of any color.
    // This is applied in actions.js: after play_land, check for Cobra and add {G}.
    // Modeled as a pseudo-ability that the action generator fires automatically.
  },
  nissa_animist: {
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
            s = s.discardFromHand(discard); if (!s) continue;
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
  },
  disciple_freyalise: {
    name: 'Disciple of Freyalise', types: ['creature'], subtypes: ['Elf','Druid'],
    cost: '3GGG', power: 4, toughness: 4,
    // ETB: you may sacrifice another creature. If you do, gain X life and draw X cards
    // where X = that creature's power.
    onEnter(state) {
      const sacrificeable = state.battlefield.filter(p =>
        p.is('creature') && p.name !== 'Disciple of Freyalise'
      );
      if (sacrificeable.length === 0) return state; // no sac target — ETB still fine

      const results = [];
      // Option: don't sacrifice (just ETB with no draw)
      results.push(state.log('Disciple of Freyalise ETB: no sacrifice'));

      for (const sac of sacrificeable) {
        const x = sac.power ?? 1;
        if (x === 0) continue;
        let s = state.removeFromBattlefield(sac.id, 'graveyard');
        if (!s) continue;
        s = s.clone();
        s.life = (s.life ?? 40) + x;
        s = s.playerDraws(0, x);
        results.push(s.log(`Disciple of Freyalise ETB: sacrifice ${sac.name} (power ${x}) → gain ${x} life, draw ${x} cards`));
      }
      return results.length === 1 ? results[0] : results;
    },
  },
  hyrax_tower_scout: {
    name: 'Hyrax Tower Scout', types: ['creature'], subtypes: ['Human','Scout'],
    cost: '2G', power: 2, toughness: 2,
    // ETB: untap target creature — handled in GameState.enterBattlefield (untaps first tapped creature).
  },
  woodcaller_automaton: {
    name: 'Woodcaller Automaton', types: ['creature','artifact'], subtypes: ['Construct'],
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
            let s = afterPay.discardFromHand(discard); if (!s) continue;
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

  // ─── BATTLES ─────────────────────────────────────────────────────────────

  invasion_of_ikoria: {
    name: 'Invasion of Ikoria', types: ['battle'], subtypes: ['Siege'], cost: 'XGG',
    // Oracle: When this Siege enters, search your library and/or graveyard for a
    // non-Human creature card with mana value X or less and put it onto the battlefield.
    // If you search your library this way, shuffle.
    //
    // Modelled identically to Chord of Calling / Green Sun's Zenith:
    // castFn receives state after dispatch pays the base {G}{G} cost.
    // Remaining mana pool total = X.
    // Battles enter the battlefield but the solver treats them as one-shot tutors
    // (the siege/transform back-face is not modelled — too many turns away to matter).
    castFn(state) {
      var cards = CARDS;
      var { parseCost: pc } = _GSM;
      const results = [];
      const x = state.mana.total();
      const seen = new Set();
      for (const ck of state.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (!def?.types.includes('creature') || !def.cost) continue;
        if (def.subtypes?.includes('Human')) continue; // non-Human only per oracle
        const parsed = pc(def.cost);
        const mv = parsed.generic + Object.values(parsed.colored).reduce((a, b) => a + b, 0);
        if (mv > x) continue;
        const { state: ns, cardKey } = state.searchLibraryFor(k => k === ck);
        if (!cardKey) continue;
        results.push(drainMana(ns).enterBattlefield(cardKey)
          .log(`Invasion of Ikoria X=${x} → ${def.name} (MV ${mv})`));
      }
      return results.length
        ? results
        : [drainMana(state).log(`Invasion of Ikoria X=${x}: no eligible non-Human creature`)];
    },
  },

  // ─── INSTANTS & SORCERIES ────────────────────────────────────────────────

  chord_of_calling: {
    name: 'Chord of Calling', types: ['instant'], subtypes: [], cost: 'XGGG',
    // Oracle: Convoke. Search library for creature with MV ≤ X, put onto battlefield.
    // Convoke: each tapped creature pays {1} or one mana of its color.
    // Solver: X = number of untapped creatures (convoke) + available generic mana.
    // Treats Chord like GSZ (creature to battlefield) but with convoke economy.
    castFn(state) {
      var cards = CARDS;
      var { parseCost: pc } = _GSM;
      const results = [];
      // castFn is called AFTER the dispatch pays the {G}{G}{G} base cost.
      // X = mana remaining in the pool (identical pattern to Green Sun's Zenith).
      // Convoke is implicitly handled: tapping creatures reduces the effective cost
      // paid by the dispatch, leaving more mana in the pool as X.
      const x = state.mana.total();
      const seen = new Set();
      for (const ck of state.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (!def || !def.types.includes('creature') || !def.cost) continue;
        const parsed = pc(def.cost);
        const mv = parsed.generic + Object.values(parsed.colored).reduce((a,b)=>a+b,0);
        if (mv > x) continue;
        const { state: ns, cardKey } = state.searchLibraryFor(k => k === ck);
        if (!cardKey) continue;
        results.push(drainMana(ns).enterBattlefield(cardKey)
          .log(`Chord of Calling X=${x} → ${def.name} (MV ${mv})`));
      }
      return results.length ? results : [drainMana(state).log(`Chord of Calling X=${x}: no eligible creature`)];
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
    castFn(state) {
      var cards = CARDS;
      const results = [];
      const seen = new Set();
      for (const ck of state.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (!def || !def.types.includes('creature')) continue;
        if (!def.cost || !def.cost.includes('G')) continue; // green creatures only
        const { state: ns, cardKey } = state.searchLibraryFor(k => k === ck);
        if (!cardKey) continue;
        const result = ns.addToHand(cardKey).log(`Summoner's Pact → find ${def.name}`);
        result.pactOwed = true; // upkeep trigger: pay {2}{G}{G} next turn or lose
        results.push(result);
      }
      return results.length ? results : [state.log("Summoner's Pact: no green creature")];
    },
  },
  archdruid_charm: {
    name: "Archdruid's Charm", types: ['instant'], subtypes: [], cost: 'GGG',
    // Oracle mode 1: Search library for creature or land → battlefield (if land, tapped) or hand.
    // Modes 2 (fight) and 3 (exile artifact/enchantment) not useful to model for combos.
    // Solver: only implements mode 1 (the tutor mode).
    castFn(state) {
      var cards = CARDS;
      const results = [];
      const seen = new Set();
      for (const ck of state.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (!def) continue;
        const isCreature = def.types.includes('creature');
        const isLand = def.types.includes('land');
        if (!isCreature && !isLand) continue;
        const { state: ns, cardKey } = state.searchLibraryFor(k => k === ck);
        if (!cardKey) continue;
        if (isLand) {
          // Land enters battlefield tapped
          const ns2 = ns.enterBattlefield(cardKey);
          const landPerm = ns2.battlefield.find(p => p.name === def.name && !p.tapped);
          if (landPerm) landPerm.tapped = true;
          results.push(ns2.log(`Archdruid's Charm → fetch land ${def.name} (tapped)`));
        } else {
          // Creature goes to hand
          results.push(ns.addToHand(cardKey).log(`Archdruid's Charm → find ${def.name}`));
        }
      }
      return results.length ? results : [state.log("Archdruid's Charm: nothing found")];
    },
  },
  force_of_vigor:         { name:'Force of Vigor',           types:['instant'],  subtypes:[], cost:'2GG'  },
  beast_within:           { name:'Beast Within',             types:['instant'],  subtypes:[], cost:'2G'   },
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
  touch_of_vitae: {
    name: 'Touch of Vitae', types: ['instant'], subtypes: [], cost: '2G',
    // Oracle: Target creature gains haste + "{0}: Untap this creature (once)."
    // Draw a card at the beginning of next turn's upkeep.
    // Solver: give haste to the highest-value tapped creature (removes summoning sickness).
    // The one-shot untap is modelled as immediate untap.
    castFn(state) {
      const results = [];
      const targets = state.creatures().filter(c => c.summoningSick || c.tapped);
      if (targets.length === 0) {
        // Still playable on any creature but minimal benefit
        return [state.log('Touch of Vitae: no useful target')];
      }
      for (const target of targets) {
        let s = state.clone();
        s._ensureBF();
        const perm = s.getPermanentById(target.id);
        if (!perm) continue;
        perm.summoningSick = false;
        perm.tapped = false; // immediate untap from the {0} ability
        results.push(s.log(`Touch of Vitae → ${target.name} gains haste + untap`));
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
  natures_claim:          { name:"Nature's Claim",           types:['instant'],  subtypes:[], cost:'G'    },
  ram_through:            { name:'Ram Through',              types:['instant'],  subtypes:[], cost:'1G'   },
  tail_swipe:             { name:'Tail Swipe',               types:['instant'],  subtypes:[], cost:'G'    },
  bouncers_beatdown:      { name:"Bouncer's Beatdown",       types:['instant'],  subtypes:[], cost:'2G'   },
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
  warping_wail:           { name:'Warping Wail',             types:['instant'],  subtypes:[], cost:'1C'   },
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
    // Oracle: Search library for a creature, REVEAL it, then SHUFFLE and put on TOP of library.
    // Sets state.topDecked so startNewTurn knows to draw exactly that card into hand.
    castFn(state) {
      var cards = CARDS;
      const results = [];
      const seen = new Set();
      for (const ck of state.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (!def || !def.types.includes('creature')) continue;
        const { state: ns, cardKey } = state.searchLibraryFor(k => k === ck);
        if (!cardKey) continue;
        // Put creature on top of library and set topDecked flag
        const ns2 = ns.clone();
        ns2._ensurePlayers();
        ns2.players[0] = ns2.players[0].clone();
        ns2.players[0].library = [cardKey, ...ns2.players[0].library];
        ns2.topDecked = cardKey;   // startNewTurn will draw this card into hand
        results.push(ns2.log(`Worldly Tutor → put ${def.name} on top of library`));
      }
      return results.length ? results : [state.log('Worldly Tutor: no creature in library')];
    },
  },
  crop_rotation: {
    name: 'Crop Rotation', types: ['instant'], subtypes: [], cost: 'G',
    // Oracle: As an additional cost, sacrifice a land. Search → put land onto battlefield → shuffle.
    castFn(state) {
      var cards = CARDS;
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
      var cards = CARDS;
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
        results.push(drainMana(ns).enterBattlefield(cardKey).log(`Green Sun's Zenith → fetch ${def.name} (MV ${mv})`));
      }
      return results.length ? results : [drainMana(state).log("Green Sun's Zenith: no eligible creature")];
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
      const results = [];
      // With infinite mana, X is effectively unlimited. Use all available mana as X proxy.
      // In practice the solver uses this to find Duskwatch or another finisher.
      // castFn receives state AFTER dispatch pays the base cost — remaining mana = X.
      const x = state.mana.total();
      // Search library
      const seen = new Set();
      for (const ck of state.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (!def || !def.types.includes('creature')) continue;
        if (!def.cost) continue;
        const parsed = pc(def.cost);
        const mv = parsed.generic + Object.values(parsed.colored).reduce((a,b)=>a+b,0);
        if (mv > x) continue;
        const { state: ns, cardKey } = state.searchLibraryFor(k => k === ck);
        if (!cardKey) continue;
        results.push(drainMana(ns).enterBattlefield(cardKey)
          .log(`Finale of Devastation X=${x} → ${def.name} (MV ${mv}) from library`));
      }
      // Search graveyard
      for (const name of state.players[0].graveyard) {
        const ck = Object.keys(cards).find(k => cards[k].name === name);
        if (!ck || seen.has(ck) || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (!def || !def.types.includes('creature') || !def.cost) continue;
        const parsed = pc(def.cost);
        const mv = parsed.generic + Object.values(parsed.colored).reduce((a,b)=>a+b,0);
        if (mv > x) continue;
        // Return from graveyard
        let s = state.clone();
        s._ensurePlayers();
        s.players[0] = s.players[0].clone();
        const gyIdx = s.players[0].graveyard.indexOf(name);
        if (gyIdx < 0) continue;
        s.players[0].graveyard = [...s.players[0].graveyard.slice(0,gyIdx), ...s.players[0].graveyard.slice(gyIdx+1)];
        s = drainMana(s).enterBattlefield(ck);
        results.push(s.log(`Finale of Devastation X=${x} → ${def.name} (MV ${mv}) from graveyard`));
      }
      return results.length ? results : [drainMana(state).log(`Finale of Devastation X=${x}: no target`)];
    },
  },
  natural_order: {
    name: 'Natural Order', types: ['sorcery'], subtypes: [], cost: '2GG',
    // Oracle: Sacrifice a green creature as additional cost. Search → any green creature onto BF → shuffle.
    castFn(state) {
      var cards = CARDS;
      const results = [];
      const KEEP = new Set(['Ashaya, Soul of the Wild','Temur Sabertooth','Kogla, the Titan Ape',
                            'Selvala, Heart of the Wilds','Quirion Ranger','Scryb Ranger','Hope Tender']);
      const greenCreatures = state.creatures().filter(c => {
        const ck = Object.keys(cards).find(k => cards[k].name === c.name);
        const def = ck ? cards[ck] : null;
        return def?.cost?.includes('G');
      });
      if (greenCreatures.length === 0) return [];
      const expendable = greenCreatures.filter(c => !KEEP.has(c.name));
      const sacCreature = expendable.length > 0 ? expendable[0] : greenCreatures[0];
      const afterSac = state.removeFromBattlefield(sacCreature.id, 'graveyard');
      if (!afterSac) return [];
      // Resolve sacCreature's card key once for duplicate-fetch filtering
      const sacCreatureKey = Object.keys(cards).find(k => cards[k].name === sacCreature.name) ?? null;
      const seen = new Set();
      for (const ck of afterSac.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        // Never fetch the same card that was just sacrificed — it's always a net-zero play.
        if (sacCreatureKey && ck === sacCreatureKey) continue;
        const def = cards[ck];
        if (!def || !def.types.includes('creature')) continue;
        if (!def.cost?.includes('G')) continue;
        const { state: ns, cardKey } = afterSac.searchLibraryFor(k => k === ck);
        if (!cardKey) continue;
        results.push(ns.enterBattlefield(cardKey).log(`Natural Order: sac ${sacCreature.name} → fetch ${def.name}`));
      }
      return results.length ? results : [afterSac.log('Natural Order: no green creature in library')];
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
    castFn(state) {
      var cards = CARDS;
      var { parseCost: pc } = _GSM;
      const results = [];

      const creatures = state.creatures();
      if (creatures.length === 0) return [];

      // Pre-build a NAME → key map so the inner loop doesn't re-scan CARDS
      // for every sacrifice candidate. This was previously O(creatures × |CARDS|)
      // via `Object.keys(cards).find(...)`; now O(|CARDS|) once.
      const nameToKey = new Map();
      for (const k of Object.keys(cards)) {
        const d = cards[k];
        if (d?.name) nameToKey.set(d.name, k);
      }

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

        const seen_target = new Set();
        for (const ck of afterSac.players[0].library) {
          if (seen_target.has(ck) || ck === 'unknown' || isStax(ck)) continue;
          seen_target.add(ck);
          if (sacKey && ck === sacKey) continue;
          const def = cards[ck];
          if (!def || !def.types.includes('creature') || !def.cost) continue;
          const parsed = pc(def.cost);
          const mv = parsed.generic + Object.values(parsed.colored).reduce((a, b) => a + b, 0);
          if (mv > maxMV) continue;

          // ETB the fetched creature on the post-sac state, then patch the
          // library and add Eldritch Evolution to graveyard. enterBattlefield
          // clones once; we mutate library and graveyard on that clone.
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
          ns.players[0].graveyard = [...ns.players[0].graveyard, 'Eldritch Evolution'];
          results.push(ns.log(
            `Eldritch Evolution: sac ${sacPerm.name} (MV ${sacMV}) → fetch ${def.name} (MV ${mv})`
          ));
        }
      }
      return results;
    },
  },
  sylvan_scrying: {
    name: 'Sylvan Scrying', types: ['sorcery'], subtypes: [], cost: '1G',
    castFn(state) {
      var cards = CARDS;
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
  natures_rhythm: {
    name: "Nature's Rhythm", types: ['sorcery'], subtypes: [], cost: 'XGG',
    // Oracle: Search library for creature with MV ≤ X → battlefield. Shuffle.
    // Harmonize: recastable from graveyard (ignored for solver simplicity).
    // Essentially a second Green Sun's Zenith — same implementation.
    //
    // PERF NOTE (2026-04-30): the original implementation called
    // `state.searchLibraryFor(k => k === ck)` per eligible creature, which
    // performs a full `state.clone()` per result. With ~30 eligible creatures
    // in the library, that's 30 redundant clones — `enterBattlefield` already
    // clones internally, so the searchLibraryFor clone is wasted work. The
    // version below does direct library mutation on the post-ETB state via
    // copy-on-write, eliminating the 30 redundant clones. Empirically this
    // cuts castFn cost by ~40% (6.0ms → 3.5ms per call on the 7-creature
    // user-reported state), which directly bounds the BFS hang reported on
    // the sowing_mycospawn,natures_rhythm,boseiju,eldritch_evolution hand.
    castFn(state) {
      var cards = CARDS;
      var { parseCost: pc } = _GSM;
      const results = [];
      const x = state.mana.total();
      const seen = new Set();
      for (const ck of state.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (!def || !def.types.includes('creature') || !def.cost) continue;
        const parsed = pc(def.cost);
        const mv = parsed.generic + Object.values(parsed.colored).reduce((a,b)=>a+b,0);
        if (mv > x) continue;
        // Drain mana then ETB the fetched creature. enterBattlefield does a
        // full state.clone; we then patch the library on that clone in place.
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
        results.push(ns.log(`Nature's Rhythm X=${x} → ${def.name} (MV ${mv})`));
      }
      return results.length ? results : [drainMana(state).log(`Nature's Rhythm X=${x}: no eligible creature`)];
    },
  },
  turntimber_symbiosis: {
    name: 'Turntimber Symbiosis', types: ['sorcery'], subtypes: [], cost: '4GGG',
    // Oracle: Look at top 7 cards, put a creature onto battlefield, rest on bottom.
    // Simplified: treat as a tutor for any creature in library (non-deterministic top-7
    // ignored; in a 99-card deck the best creature is effectively always in top 7).
    // Fetches the highest-priority missing combo piece.
    castFn(state) {
      var cards = CARDS;
      const results = [];
      const seen = new Set();
      for (const ck of state.players[0].library) {
        if (seen.has(ck) || ck === 'unknown' || isStax(ck)) continue;
        seen.add(ck);
        const def = cards[ck];
        if (!def || !def.types.includes('creature')) continue;
        const { state: ns, cardKey } = state.searchLibraryFor(k => k === ck);
        if (!cardKey) continue;
        results.push(ns.enterBattlefield(cardKey)
          .log(`Turntimber Symbiosis → ${def.name}`));
      }
      return results.length ? results : [state.log('Turntimber Symbiosis: no creature found')];
    },
  },
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

// True if Temur Sabertooth is on battlefield AND there is a loopable creature —
// something to bounce and recast each cycle. With infinite mana, any creature in
// hand works (recast it each cycle). Any other creature already on board also
// works (bounce it, recast it). Without a loop target, Temur alone does nothing.
// Note: draw engines (Beast Whisperer, Glademuse) are excluded as loop targets —
// bouncing your draw engine breaks the loop itself.
var DRAW_ENGINES = new Set(['Beast Whisperer', 'Glademuse']);
function temurLoopReady(state) {
  if (!hasPerm(state, 'Temur Sabertooth')) return false;
  // Any creature in hand = can recast it each cycle
  const hasCreatureInHand = state.hand && state.hand.some(ck => {
    const def = CARDS[ck];
    return def && def.types.includes('creature');
  });
  if (hasCreatureInHand) return true;
  // Any non-Temur, non-draw-engine creature on board = can be bounced and recast
  const hasOtherCreature = state.battlefield.some(p =>
    p.name !== 'Temur Sabertooth' &&
    !DRAW_ENGINES.has(p.name) &&
    p.types && p.types.includes('creature')
  );
  return hasOtherCreature;
}

// Kogla needs a Human to bounce ({1G}: return target Human you control).
// With infinite mana: any Human in hand or on board besides Kogla.
function koglaLoopReady(state) {
  if (!hasPerm(state, 'Kogla, the Titan Ape')) return false;
  const hasHumanInHand = state.hand && state.hand.some(ck => {
    const def = CARDS[ck];
    return def && def.types.includes('creature') && def.subtypes?.includes('Human');
  });
  if (hasHumanInHand) return true;
  const hasHumanOnBoard = state.battlefield.some(p =>
    p.name !== 'Kogla, the Titan Ape' &&
    p.subtypes && p.subtypes.includes('Human')
  );
  return hasHumanOnBoard;
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
  return state.creatures().some(c => {
    if (c.tapped || c.summoningSick) return false;
    if (c.name === 'Quirion Ranger' || c.name === 'Scryb Ranger') return false;
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
          case 'Topiary Lecturer':            return (p.power || 0) >= 3;
          default: return false;
        }
      });
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
      // Need any non-sick creature (other than Badgermole itself) with a tapForMana
      return state.battlefield.some(p => {
        if (p.name === 'Badgermole Cub') return false;
        if (p.tapped || p.summoningSick) return false;
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
      // The loop costs {G}{G} to prime (Magus X=2 activation).
      // The mana source must be untapped to start the cycle, OR ≥2G must be
      // floating (so we can pay Magus first, then untap source via Magus).
      // Simplest correct check: require the source to be untapped.
      // (If all mana was spent, there is nothing to start the loop with.)
      return state.battlefield.some(p => {
        if (p.tapped || p.summoningSick) return false;  // source must be ready
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
      if (!permReady(state, 'Argothian Elder') && !permReady(state, 'Ley Weaver')) return false;
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
      if (!rangerAvailable(state)) return false; // ability must not be exhausted this turn
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
  //
  //  ⚠ HASTE REQUIREMENT: After Kogla bounces Acolyte and she is recast, she enters
  //  with summoning sickness and CANNOT tap for mana again without a haste enabler.
  //  Haste enablers: Concordant Crossroads (all creatures haste),
  //                  Thousand-Year Elixir (tap abilities as though they had haste),
  //                  Surrak and Goreclaw (each creature you cast gains haste).
  //  Without one of these, the loop cannot repeat — NOT infinite mana.
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: "Infinite Mana (Kogla + Karametra's Acolyte, devotion ≥6)  [COMBO 2]",
    description:
      "Tap Acolyte for G×devotion. Pay {1G}, Kogla bounces Acolyte (Human). " +
      "Recast Acolyte {3G}. Total cost {5G}+{1}. Net positive at devotion ≥6. " +
      "Requires a haste enabler (Concordant Crossroads / Thousand-Year Elixir / Surrak and Goreclaw) " +
      "so Acolyte can tap again immediately after recast.",
    check(state) {
      if (!hasPerm(state, 'Kogla, the Titan Ape')) return false;
      const acolyte = state.battlefield.find(
        p => p.name === "Karametra's Acolyte" && !p.tapped && !p.summoningSick
      );
      if (!acolyte) return false;
      // After Kogla bounces Acolyte and she is recast, she enters with summoning sickness
      // and cannot tap her mana ability again without a haste enabler.
      // Thousand-Year Elixir: "You may activate abilities of creatures you control as though
      // those creatures had haste." — explicitly covers activated abilities like Acolyte's tap.
      const hasHaste =
        hasPerm(state, 'Concordant Crossroads') ||
        hasPerm(state, 'Thousand-Year Elixir') ||
        hasPerm(state, 'Surrak and Goreclaw');
      if (!hasHaste) return false;
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
      if (!symbioteAvailable(state)) return false; // ability must not be exhausted this turn
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
    name: 'Infinite Mana (Temur Sabertooth + Haste Enabler + Dork)  [COMBO 9, 10, 20, 22, 29, 37]',
    description:
      "With a haste enabler, bounced creatures re-enter with haste and can tap immediately. " +
      "Enablers: Concordant Crossroads, Thousand-Year Elixir, Surrak and Goreclaw. " +
      "Circle (≥6 creatures), Selvala (power ≥7), Karametra's Acolyte (devotion ≥7).",
    check(state) {
      if (!hasPerm(state, 'Temur Sabertooth')) return false;
      const hasElixir = hasPerm(state, 'Thousand-Year Elixir');
      const hasHaste =
        hasPerm(state, 'Concordant Crossroads') ||
        hasElixir ||
        hasPerm(state, 'Surrak and Goreclaw');
      if (!hasHaste) return false;
      // Check each haste-loop variant
      if (permReady(state, 'Circle of Dreams Druid') && creatureCount(state) >= 6) return true;
      if (greatestPower(state) >= 7 &&
          state.battlefield.some(p => p.name === 'Selvala, Heart of the Wilds' && !p.summoningSick)) return true;
      // Thousand-Year Elixir lets Acolyte tap even with summoning sickness —
      // skip the SS check when Elixir is the haste enabler (Combo 37).
      // Concordant Crossroads and Surrak and Goreclaw grant haste, which also removes
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
          case 'Topiary Lecturer':            return (p.power || 0) >= 6;
          default: return false;
        }
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
          case 'Selvala, Heart of the Wilds': return greatestPower(state) >= 6;
          case 'Marwyn, the Nurturer':        return (p.power || 0) >= 5; // Combo 38: break-even at 5
          case 'Topiary Lecturer':            return (p.power || 0) >= 5; // same break-even logic
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
      // Earthcraft requires a BASIC land target — Ashaya creatures are Forests but not basic
      const hasBasicForest = state.lands().some(l =>
        (l.name === 'Forest' || (l.subtypes && l.subtypes.includes('Forest') && l.basic))
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
      if (!permReady(state, 'Arbor Elf')) return false;
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
      if (!permReady(state, 'Arbor Elf')) return false;
      if (!hasPerm(state, 'Yavimaya, Cradle of Growth')) return false;
      // Gaea's Cradle untapped + ≥2 creatures → produces ≥2G, net +1G after Ranger {G}
      if (cradleUntapped(state) && creatureCount(state) >= 2) return true;
      // Nykthos untapped + devotion ≥4 → produces ≥4G - {2} activation = ≥2G, net +1G
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
        p => p.name === 'Selvala, Heart of the Wilds' && !p.summoningSick
      );
      if (!selvala) return false;
      if (greatestPower(state) < 6) return false;
      // Need a 1-drop elf to bounce (Symbiote can bounce Llanowar Elves, Elvish Mystic, Fyndhorn Elves, etc.)
      const hasOneDrop = state.battlefield.some(p =>
        p.subtypes && p.subtypes.includes('Elf') && !p.summoningSick &&
        ['Llanowar Elves', 'Elvish Mystic', 'Fyndhorn Elves',
         'Allosaurus Shepherd'].includes(p.name)
      );
      return hasOneDrop;
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
        p => p.name === 'Selvala, Heart of the Wilds' && !p.summoningSick
      );
      if (!selvala) return false;
      if (greatestPower(state) < 4) return false;
      // Need a 1-drop elf not sick (Llanowar Elves, Elvish Mystic, or Fyndhorn Elves)
      const hasOneDrop = state.battlefield.some(p =>
        p.subtypes && p.subtypes.includes('Elf') && !p.summoningSick &&
        ['Llanowar Elves', 'Elvish Mystic', 'Fyndhorn Elves'].includes(p.name)
      );
      return hasOneDrop;
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  VITALIZE / EMERALD CHARM + ETERNAL WITNESS LOOPS  (COMBO 33, 39, 44, 51, 58)
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
        p => p.name === 'Marwyn, the Nurturer' && !p.summoningSick
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
        p => p.name === 'Marwyn, the Nurturer' && !p.summoningSick
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
        p => p.name === 'Selvala, Heart of the Wilds' && !p.summoningSick
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
        p => p.name === 'Selvala, Heart of the Wilds' && !p.summoningSick
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
      // Need a Ranger on the battlefield (Quirion or Scryb) — not sick for cast abilities,
      // but Ranger's bounce has no tap cost so summoning sickness is irrelevant here.
      const hasQR   = hasPerm(state, 'Quirion Ranger');
      const hasScryb = hasPerm(state, 'Scryb Ranger');
      if (!hasQR && !hasScryb) return false;

      // Need Survival of the Fittest OR Fauna Shaman on the battlefield and usable.
      // Survival: no tap cost, can activate multiple times.
      // Fauna Shaman: has tap cost — must not be tapped or sick.
      const hasSurvival = hasPerm(state, 'Survival of the Fittest');
      const faunaReady  = state.battlefield.some(
        p => p.name === 'Fauna Shaman' && !p.tapped && !p.summoningSick
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

      // ── PATTERN A: Ashaya already on battlefield ──────────────────────────
      // One activation: discard 1 creature → fetch big dork → cast it.
      if (ashayaOnBF) {
        if (!libBigDork) return false;
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
        // Need an existing creature dork on BF (not sick, not Badgermole itself)
        const hasExistingDork = state.battlefield.some(p => {
          if (p.name === 'Badgermole Cub' || p.tapped || p.summoningSick) return false;
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
          if (p.name === 'Badgermole Cub' || p.tapped || p.summoningSick) return false;
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
      if (!permReady(state, 'Argothian Elder') && !permReady(state, 'Ley Weaver')) return false;
      if (!permUntapped(state, 'Maze of Ith')) return false;
      // Gaea's Cradle (or Itlimoc): needs ≥1 creature other than Elder/Weaver
      // (Elder/Weaver itself is a creature and counts toward Cradle's tap value,
      //  but we need ≥2 total creatures so the Cradle produces ≥2G covering
      //  Elder's tap + Maze's tap; Elder itself is creature #1, need ≥1 more.)
      const elderOrWeaverCount = state.battlefield.filter(p =>
        (p.name === 'Argothian Elder' || p.name === 'Ley Weaver') && !p.tapped && !p.summoningSick
      ).length;
      if (cradleUntapped(state) && creatureCount(state) >= elderOrWeaverCount + 1) return true;
      // Nykthos: {2},{T} → adds devotion×G. Needs devotion ≥3 to net after {2} cost.
      if (permUntapped(state, 'Nykthos, Shrine to Nyx') && devotionG(state) >= 3) return true;
      return false;
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  TIRELESS PROVISIONER + ASHAYA + QUIRION/SCRYB RANGER  (Combo Summary #9)
  //
  //  Tireless Provisioner oracle: "Landfall — Whenever a land you control
  //  enters, create a Food token or a Treasure token."
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
        return state.battlefield.some(p => {
          if (p.tapped || p.summoningSick) return false;
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
  //  Destiny Spinner animates Cradle/Nykthos → the land is now a creature with
  //  haste. With Ashaya, Quirion/Scryb Ranger can bounce themselves (both are
  //  Forests under Ashaya) to untap the animated land-creature.
  //  This is effectively the Ashaya + Ranger + dork combo, with the animated
  //  land acting as the high-output mana dork.
  //
  //  Loop (Quirion variant, Gaea's Cradle with ≥2 creatures):
  //   1. Destiny Spinner pays {3G}: animate Cradle → X/X haste creature.
  //   2. Tap animated Cradle for G×creatures.
  //   3. Quirion Ranger bounces itself (Forest under Ashaya) → untaps animated Cradle.
  //   4. Recast Quirion {G}. Repeat from step 2.
  //  Net: Cradle produces ≥2G, Quirion costs {G}, net ≥1G per cycle.
  //
  //  Prerequisites:
  //   - Destiny Spinner on battlefield (the animation costs {3G} — paid once to start).
  //   - Ashaya on battlefield (makes Ranger a Forest so it can target itself).
  //   - Quirion or Scryb Ranger available.
  //   - A big land (Cradle ≥2 creatures, or Nykthos devotion ≥4 covering
  //     the Ranger recast cost).
  //
  //  This is a setup combo — the {3G} animation cost is paid once from floating mana.
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: 'Infinite Mana (Destiny Spinner + Ashaya + Ranger + Big Land)',
    description:
      "Destiny Spinner ({3G}): animate Gaea's Cradle or Nykthos into a haste creature (still a land). " +
      "With Ashaya, Ranger bounces itself (Forest) → untaps the animated land. " +
      "Quirion ({G}): Cradle ≥2 creatures nets ≥1G. Nykthos devotion ≥4 nets ≥1G. " +
      "The {3G} animation cost is paid once from initial mana to start the loop.",
    check(state) {
      if (!ashayaOut(state)) return false;
      if (!hasPerm(state, 'Destiny Spinner')) return false;
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
      "Temur variant: bounce Endurance with Sabertooth, activate Geier Reach, untap, repeat. " +
      "Kogla variant: kill Endurance with Beast Within/LQR while ETB on stack, Witness returns it, Kogla bounces Witness. " +
      "Ashaya variant: LQR gives tap-damage to looping creature, bounce Endurance with Ranger, " +
      "kill Endurance+Ranger with tap triggers, Second ETB resets graveyard, Duskwatch finds pieces, repeat. " +
      "Final stack: [Endurance ETB (bottom)] → [Geier Reach draw+discard] × N (top). " +
      "Resolves top-down until opponents are decked.",
    check(state) {
      if (!inHandOrField(state, 'Geier Reach Sanitarium', 'geier_reach')) return false;
      if (!inHandOrField(state, 'Endurance', 'endurance')) return false;
      // Need a way to bounce/remove Endurance after its ETB is on the stack
      const hasBouncer =
        // Temur variant: Sabertooth bounces Endurance
        inHandOrField(state, 'Temur Sabertooth', 'temur_sabertooth') ||
        // Kogla variant: Kogla bounces Eternal Witness, Witness returns Endurance
        (inHandOrField(state, 'Kogla, the Titan Ape', 'kogla') &&
         inHandOrField(state, 'Eternal Witness', 'eternal_witness')) ||
        // Ashaya variant: Ranger bounces Endurance (Endurance is a Forest via Ashaya),
        // LQR provides tap-damage to kill Endurance while ETB on stack
        (inHandOrField(state, 'Ashaya, Soul of the Wild', 'ashaya') &&
         (inHandOrField(state, 'Quirion Ranger', 'quirion_ranger') ||
          inHandOrField(state, 'Scryb Ranger', 'scryb_ranger')));
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
    // deployed: all Hitzel pieces are on the battlefield and ready to execute.
    // When this returns false, the solver keeps searching to show setup steps.
    deployed(state) {
      // Geier Reach must be on battlefield (not just in hand — it's a land, needs to be played)
      if (!hasPerm(state, 'Geier Reach Sanitarium')) return false;
      // Endurance must be in hand or on field (it gets cast as part of the sequence)
      if (!inHandOrField(state, 'Endurance', 'endurance')) return false;
      // Bouncer must be on battlefield
      const bouncerReady =
        hasPerm(state, 'Temur Sabertooth') ||
        (hasPerm(state, 'Kogla, the Titan Ape') &&
         inHandOrField(state, 'Eternal Witness', 'eternal_witness')) ||
        (hasPerm(state, 'Ashaya, Soul of the Wild') &&
         (hasPerm(state, 'Quirion Ranger') || hasPerm(state, 'Scryb Ranger')));
      return bouncerReady;
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
      // With infinite mana, Duskwatch in hand or on field finds every creature
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
      // Beast Whisperer + creature loop: draws on every creature cast.
      // With infinite mana, Temur/Kogla in hand or field can always find a loop target.
      if (inHandOrField(state, 'Beast Whisperer', 'beast_whisperer')) {
        const hasRangerLoop =
          hasPerm(state, 'Quirion Ranger') || hasPerm(state, 'Scryb Ranger');
        const hasBounceEngine =
          inHandOrField(state, 'Temur Sabertooth', 'temur_sabertooth') ||
          inHandOrField(state, 'Kogla, the Titan Ape', 'kogla');
        if (hasRangerLoop || hasBounceEngine) return true;
      }
      // Glademuse: draws per opponent spell — a pass-turn win with infinite mana.
      // Does NOT draw through creature-bounce loops on your turn.
      if (inHandOrField(state, 'Glademuse', 'glademuse')) return true;
      return false;
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  TUTOR FOR FINISHER
  //
  //  With infinite mana and any creature tutor in hand or on the battlefield,
  //  we can always find Duskwatch Recruiter (or another finisher) and win.
  //
  //  With infinite mana: activate Duskwatch repeatedly ({2G},{T}) to pull every
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
      'Draw engines: Beast Whisperer (cast + creature loop draws deck), Glademuse (pass turn).\n' +
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
        'sylvan_scrying',     // {1G}: any land → hand (War Room → draw to finisher)
      ];
      if (state.hand && libHasCreature) {
        for (const k of handSpellTutors) {
          if (state.hand.includes(k)) return true;
        }
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
          if (state.hand.includes(k)) return true;
        }
      }

      // ── Beast Whisperer / draw engines castable from hand ─────────────────
      // With infinite mana + creature loop already on BF, casting Beast
      // Whisperer draws the entire deck. Same for Beast Whisperer in hand
      // when the mana combo involves creature recasts (Ranger loops, etc.).
      if (state.hand && state.hand.includes('beast_whisperer')) {
        // Need a creature loop on BF to draw cards with Whisperer
        const hasCreatureLoop =
          hasPerm(state, 'Quirion Ranger') || hasPerm(state, 'Scryb Ranger') ||
          hasPerm(state, 'Temur Sabertooth') || hasPerm(state, 'Kogla, the Titan Ape') ||
          hasPerm(state, 'Wirewood Symbiote') || hasPerm(state, 'Hyrax Tower Scout');
        if (hasCreatureLoop) return true;
      }

      // ── topDecked: Worldly Tutor already placed a creature on library top ─
      // The creature will be drawn at the start of next turn. With infinite
      // mana it's as good as in hand.
      if (state.topDecked) {
        var CARDS_local = CARDS;
        const def = CARDS_local[state.topDecked];
        if (def && def.types.includes('creature')) return true;
      }

      // ── Battlefield activated / ETB tutors ────────────────────────────────
      const bfTutorNames = [
        'Fauna Shaman',              // {G},{T},discard → any creature → hand
        'Survival of the Fittest',   // {G},{T},discard → any creature → hand
        'Yisan, the Wanderer Bard',  // {2G},{T},verse → creature of that MV → BF
        'Formidable Speaker',        // ETB: discard → any creature → hand
        'Duskwatch Recruiter',       // {2G},{T} → creature → hand (wins directly!)
      ];
      for (const name of bfTutorNames) {
        // BF activated tutors that search the library also need a creature there
        const needsLib = name !== 'Duskwatch Recruiter'; // Duskwatch searches library too
        if (hasPerm(state, name) && (!needsLib || libHasCreature)) return true;
      }

      // ── ETB tutors reachable from hand ───────────────────────────────────
      // Woodland Bellower ETB finds nonlegendary green MV≤3 (Duskwatch is MV 2)
      if (inHandOrField(state, 'Woodland Bellower', 'woodland_bellower')) return true;
      // Fierce Empath ETB finds MV≥6 (Woodland Bellower MV 6) → then Bellower → Duskwatch
      if (inHandOrField(state, 'Fierce Empath', 'fierce_empath')) return true;

      // ── Glademuse: pass turn → draw from opponent spells → find finisher ─
      if (inHandOrField(state, 'Glademuse', 'glademuse')) return true;

      // ── Crop Rotation → War Room: fetch → pay life to draw → find finisher ─
      if (state.hand && state.hand.includes('crop_rotation') && state.lands().length > 0) return true;

      // ── Sowing Mycospawn (in hand): on-cast trigger fetches a land → battlefield.
      //    With War Room or Geier Reach in the library, the fetched land draws to a finisher.
      //    Unlike Crop Rotation, Mycospawn needs no land already in play to sacrifice.
      if (state.hand && state.hand.includes('sowing_mycospawn')) {
        const DRAW_LANDS = new Set(['war_room', 'geier_reach']);
        if (lib.some(ck => DRAW_LANDS.has(ck))) return true;
      }

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
      // Hitzel's Sequence already fully deployed on BF
      const hitzelDeployed = hasPerm(state, 'Geier Reach Sanitarium') &&
        inHandOrField(state, 'Endurance', 'endurance') &&
        (hasPerm(state, 'Temur Sabertooth') ||
         (hasPerm(state, 'Kogla, the Titan Ape') &&
          inHandOrField(state, 'Eternal Witness', 'eternal_witness')) ||
         (hasPerm(state, 'Ashaya, Soul of the Wild') &&
          (hasPerm(state, 'Quirion Ranger') || hasPerm(state, 'Scryb Ranger'))));
      if (hitzelDeployed) return true;

      // Infectious Bite in hand
      if (state.hand && state.hand.includes('infectious_bite')) return true;

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
      // Need an infinite-cast loop — any ranger/bouncer that bounces a green permanent
      const hasRanger =
        hasPerm(state, 'Quirion Ranger') ||
        hasPerm(state, 'Scryb Ranger');
      const hasBouncer =
        hasPerm(state, 'Temur Sabertooth') ||
        hasPerm(state, 'Kogla, the Titan Ape');
      const hasSymbiote = hasPerm(state, 'Wirewood Symbiote');
      return hasRanger || hasBouncer || hasSymbiote;
    },
    deployed(state) {
      return hasPerm(state, 'Defiler of Vigor');
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
function checkCombos(state) {
  for (const detector of DETECTORS) {
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
 */
function checkVictory(state, _infiniteMana) {
  // [E3] Accept pre-computed checkCombos result to avoid redundant call in hot path.
  const infiniteMana = _infiniteMana !== undefined ? _infiniteMana : checkCombos(state);
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
  "Infinite Mana (Kogla + Karametra's Acolyte, devotion ≥6)  [COMBO 2]":        ['kogla','karametra_acolyte'],
  'Infinite Mana (Temur Sabertooth + Wirewood Symbiote + Circle of Dreams Druid)  [COMBO 4, 5, 17]': ['temur_sabertooth','wirewood_symbiote','circle_of_dreams_druid'],
  'Infinite Mana (Temur Sabertooth + Haste Enabler + Dork)  [COMBO 9, 10, 20, 22]': ['temur_sabertooth','concordant_crossroads'],
  'Infinite Mana (Hyrax Tower Scout + Temur Sabertooth + Mana Dork ≥5G)  [COMBO 8, 18, 28, 57]': ['hyrax_tower_scout','temur_sabertooth'],
  'Infinite Mana (Hyrax Tower Scout + Kogla + Mana Dork ≥5G)  [COMBO 15, 19, 23, 25, 35, 38, 59]': ['hyrax_tower_scout','kogla'],
  'Infinite Mana (Earthcraft + Ashaya + Quirion Ranger + Basic Forest)  [Combo Summary #4]': ['earthcraft','ashaya','quirion_ranger'],
  'Infinite Green Mana (Ashaya + Quirion Ranger + Arbor Elf + Enchanted Land)': ['ashaya','quirion_ranger','arbor_elf'],
  'Infinite Green Mana (Ashaya + Quirion Ranger + Arbor Elf + Yavimaya + Big Land)': ['ashaya','quirion_ranger','arbor_elf','yavimaya'],
  'Infinite Mana (Temur Sabertooth + Wirewood Symbiote + Selvala)  [COMBO 12, 13, 16]': ['temur_sabertooth','wirewood_symbiote','selvala'],
  'Infinite Mana (Selvala + Cloudstone Curio + Wirewood Symbiote + 1-drop Elf)  [COMBO 53, 54, 55]': ['selvala','cloudstone_curio','wirewood_symbiote'],
  'Infinite Mana (Marwyn + Eternal Witness + Temur + Vitalize/Emerald Charm)  [COMBO 33, 58]': ['marwyn','eternal_witness','temur_sabertooth'],
  'Infinite Mana (Marwyn + Eternal Witness + Kogla + Vitalize/Emerald Charm)  [COMBO 51]':  ['marwyn','eternal_witness','kogla'],
  'Infinite Mana (Selvala + Eternal Witness + Temur + Vitalize/Emerald Charm)  [COMBO 39]': ['selvala','eternal_witness','temur_sabertooth'],
  'Infinite Mana (Selvala + Eternal Witness + Kogla + Vitalize/Emerald Charm)  [COMBO 44]': ['selvala','eternal_witness','kogla'],
  'Infinite Mana (Argothian Elder + Maze of Ith + Big Land)':                    ['argothian_elder','maze_of_ith'],
  'Infinite ETB / Landfall (Tireless Provisioner + Ashaya + Ranger)  [Combo Summary #9]': ['tireless_provisioner','ashaya','quirion_ranger'],
  'Infinite Mana (Woodcaller Automaton + Temur Sabertooth + Big Land)':          ['woodcaller_automaton','temur_sabertooth'],
  'Infinite Mana (Destiny Spinner + Ashaya + Ranger + Big Land)':                ['destiny_spinner','ashaya','quirion_ranger'],
  'Infinite Draw (Beast Whisperer / Glademuse + Creature Loop)':                 ['beast_whisperer'],
  'Win: Geier Reach Sanitarium Mill (Hitzel\'s Sequence)':                       ['geier_reach','endurance','temur_sabertooth'],
  'Win: Duskwatch Recruiter (find all creatures)':                              ['duskwatch_recruiter'],
  'Win: Finale of Devastation X≥10':                                             ['finale_of_devastation'],
  'Win: Infectious Bite (poison counters)':                                      ['infectious_bite'],
  'Win: Mikokoro Mill Line':                                                     ['mikokoro'],
  'Win: Draw Library (Beast Whisperer / Glademuse + Creature Loop)':             ['beast_whisperer'],
  'Win: Tutor for Finisher (infinite mana + creature tutor)':                    ['finale_of_devastation'],
  'Win: Defiler of Vigor (infinite +1/+1 counters)':                             ['defiler_of_vigor'],
};

// Stamp requiredKeys onto each detector at load time (Fix #8).
for (const d of [...DETECTORS, ...WIN_CONDITIONS]) {
  d.requiredKeys = DETECTOR_REQUIRED_KEYS[d.name] ?? [];
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
   [LOOP_TYPE.MANA_POSITIVE, LOOP_TYPE.MANA_NEUTRAL_DRAW]],
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

// ── STAX cards — never cast, never tutored ────────────────────────────────
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
  if (!state.hasPermanent('Chalice of the Void')) return false;
  if (shepherdProtects(state, def)) return false; // green spells can't be countered
  var { parseCost: _pc } = _GSM;
  const parsed = def._parsedCost ?? _pc(def.cost);
  const cmc = parsed.generic + Object.values(parsed.colored).reduce((a,b) => a+b, 0);
  return state.battlefield.some(p =>
    p.name === 'Chalice of the Void' &&
    (p.chargeCounters ?? 1) === cmc
  );
}

/**
 * Returns true if a Vexing Bauble on the battlefield would counter the spell.
 * Vexing Bauble counters any spell cast for 0 mana (no mana spent),
 * regardless of CMC. This hits Summoner's Pact ({0}), Lotus Petal ({0}),
 * Chrome Mox ({0}), and Mox Diamond ({0}).
 * Bypassed when Allosaurus Shepherd is on the battlefield and the spell is green.
 * Note: Summoner's Pact, Lotus Petal, Chrome Mox and Mox Diamond have no {G}
 * in their cost, so Shepherd does NOT protect them from Vexing Bauble.
 */
function vexingBaubleBlocks(state, def, effectiveCostStr) {
  if (!state.hasPermanent('Vexing Bauble')) return false;
  if (shepherdProtects(state, def)) return false; // green spells can't be countered
  // A spell is cast for 0 mana when the effective cost resolves to nothing.
  var { parseCost: _pc } = _GSM;
  const parsed = _pc(effectiveCostStr);
  const totalMana = parsed.generic + Object.values(parsed.colored).reduce((a,b) => a+b, 0);
  return totalMana === 0;
}
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
  const isGreenPermanent = def.cost?.includes('G') &&
    (def.types.includes('creature') || def.types.includes('enchantment') ||
     def.types.includes('artifact') || def.types.includes('planeswalker'));

  for (const perm of state.battlefield) {
    const permDef = CARDS[perm.cardKey];
    // Emerald Medallion: green spells cost {1} less
    if (permDef?.costReduction?.color === 'G') {
      const cost = def.cost || '';
      if (cost.includes('G') || def.types.includes('creature')) {
        genericReduction += permDef.costReduction.amount;
      }
    }
    // Defiler of Vigor: green permanent spells cost {1} less (pay 2 life as additional cost)
    // Simplified: always apply the reduction (life payment not tracked turn-by-turn)
    if (perm.name === 'Defiler of Vigor' && isGreenPermanent) {
      genericReduction += 1;
    }
    // Nylea, Keen-Eyed: creature spells cost {1} less
    if (perm.name === 'Nylea, Keen-Eyed' && def.types.includes('creature')) {
      genericReduction += 1;
    }
  }
  return genericReduction;
}

/**
 * Apply reductions and Trinisphere minimum to a cost string.
 * Returns the effective cost string or null if the card is uncounterable-free.
 */
// Option A: import parseCost once at module level
function effectiveCost(state, def) {
  // Use pre-cached parsed cost (set on def at cards.js load time) — Option A
  const raw = def._parsedCost ?? _parseCost(def.cost);

  // Option B: skip STAX checks when no STAX is on the battlefield
  if (!state._hasSTAX) {
    // Fast path: only check Emerald Medallion cost reduction
    const reduction = costReductions(state, def);
    let generic = Math.max(0, raw.generic - reduction);
    const colored = { ...raw.colored };
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
  const coloredTotal = Object.values(colored).reduce((a, b) => a + b, 0);
  const triMin = trinisphereMin(state);
  if (generic + coloredTotal < triMin) generic = triMin - coloredTotal;
  let costStr = '';
  if (generic > 0) costStr += String(generic);
  for (const [color, amt] of Object.entries(colored)) costStr += color.repeat(amt);
  return costStr || '0';
}

// ── Main action generator ─────────────────────────────────────────────────

function generateActions(state, _presentHint = null) {
  const actions = [];

  // ── 0. Loss pruning ──────────────────────────────────────────────────────
  // Never expand a state where you've already lost
  if (state.youLost()) return [];

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
          const isSecondLand = s.landDrops === 0; // already used first drop
          let ns = s.removeFromHand(cardKey);
          if (!ns) return null;
          ns = ns.clone();
          ns.landDrops--;

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
          for (const perm of ns.battlefield) {
            if (perm.summoningSick) continue;
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
      const costStr2 = effectiveCost(state, def);
      if (state.mana.pay(costStr2) !== null) {
        const afterPay0 = state.payMana(costStr2);
        const fromHand0 = afterPay0?.removeFromHand(cardKey);
        if (fromHand0) {
          const allResults = def.castFn(fromHand0);
          if (allResults && allResults.length > 0) {
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
              const spellGoesToGraveyard = def.types.includes('instant') || def.types.includes('sorcery');

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
                  return result;
                },
              });
            }
          } else {
            // castFn returned no results — spell cannot be cast (missing sacrifice target)
          }
        }
      }
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
        ns = ns.log(`Cast ${def.name}`);

        // ── On-cast / on-enter triggers ────────────────────────────────────

        // Beast Whisperer: draw a card when you cast a creature spell
        if (isCreature && ns.hasPermanent('Beast Whisperer')) {
          const bw = ns.getPermanent('Beast Whisperer');
          if (!bw.summoningSick) ns = ns.playerDraws(0, 1);
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
            for (const lec of lecturers) {
              // Increment fires if mana spent > power OR > toughness.
              // Equivalent to: mana spent > min(power, toughness).
              // e.g. a 2/3 Lecturer triggers on CMC 3 because 3 > 2 (power).
              const threshold = Math.min(lec.power || 1, lec.toughness || 1);
              if (manaSpent > threshold) {
                lec.power     = (lec.power     || 1) + 1;
                lec.toughness = (lec.toughness || 1) + 1;
                ns = ns.log(`Topiary Lecturer Increment → ${lec.power}/${lec.toughness}`);
              }
            }
          }
        }

        // Guardian Project: draw when unique creature enters
        if (isCreature && ns.hasPermanent('Guardian Project')) {
          ns = ns.playerDraws(0, 1);
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

    // Pre-check: skip permanents whose tapForMana produces nothing when untapped.
    // This suppresses no-op actions (e.g. Maze of Ith, which has tapForMana: () => []).
    if (!def.tapForMana(state, perm).length) continue;

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
        // Badgermole Cub: whenever you tap a creature for mana, add {G}
        if (def.types.includes('creature') && ns.hasPermanent('Badgermole Cub') &&
            perm.name !== 'Badgermole Cub') {
          ns = ns.addMana('G');
        }
        // Utopia Sprawl: only the one enchanted Forest gets +{G} when it taps.
        // Match by permanent ID stored on the Sprawl at ETB — not "any Forest".
        if (live.types.includes('land')) {
          const sprawl = ns.battlefield.find(p => p.cardKey === 'utopia_sprawl' && p.enchantedLandId === live.id);
          if (sprawl) ns = ns.addMana('G');
          // Wild Growth: same single-land model
          const wildG = ns.battlefield.find(p => p.cardKey === 'wild_growth' && p.enchantedLandId === live.id);
          if (wildG) ns = ns.addMana('G');
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
            ns._ensureBF();
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

var _ACM = { generateActions, NAME_TO_KEY, COMBO_REQUIRED_KEYS, TUTOR_PRIORITY_SCORE, FUNCTIONAL_EQUIVALENTS, STAX_CARDS, effectiveCost };
// Solver.js
/**
 * MTG Combo Solver — Solver (v4)
 *
 * Two search strategies:
 *   'dfs'  — Depth-first with score pruning (fast, finds optimal quickly)
 *   'bfs'  — Breadth-first by turn then depth (guaranteed fewest-actions per turn)
 *
 * Options:
 *   maxTurns    {number}   Hard turn cutoff (default 4)
 *   maxDepth    {number}   Max actions per DFS branch (default 40)
 *   maxStates   {number}   Visited-state budget (default 500 000)
 *   strategy    {string}   'dfs' | 'bfs' (default 'dfs')
 *   allLines    {boolean}  Collect ALL winning lines, not just the best (default false)
 *   verbose     {boolean}  Log each winning line as found (default false)
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
 */

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
function _tutorCounts(state) {
  const counts = { creature: 0, land: 0, any: 0 };
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
  return counts;
}

// Pre-built map: card key → its FUNCTIONAL_EQUIVALENTS group (Set).
// Populated once at module load; used by analyzeState to expand the
// "present" set so that having temur_sabertooth satisfies kogla combos, etc.
var _equivGroupOf = new Map();
for (const group of FUNCTIONAL_EQUIVALENTS) {
  for (const k of group) _equivGroupOf.set(k, group);
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
function analyzeState(state, _infiniteMana) {
  // [E3] _infiniteMana: pre-computed checkCombos(state) result from the caller,
  // passed in to avoid calling checkCombos a second time inside this function.
  const present = new Set(state.hand);
  for (const p of state.battlefield) {
    const ck = NAME_TO_KEY[p.name];
    if (ck) present.add(ck);
  }
  // topDecked counts as 'will be in hand next turn'
  if (state.topDecked) present.add(state.topDecked);

  // Expand present set via FUNCTIONAL_EQUIVALENTS: if any member of an
  // equivalence group is present, treat ALL members as present for combo-
  // distance purposes.  E.g. having temur_sabertooth satisfies any combo
  // requiring kogla, preventing an off-by-one in minMissing that kept dead
  // branches alive when the hand held a functional equivalent.
  // [E8] Two-pass: collect additions first, then apply — avoids [...present]
  // array allocation while iterating a Set that we're adding to.
  let _equivAdditions = null;
  for (const k of present) {
    const grp = _equivGroupOf.get(k);
    if (grp) {
      if (!_equivAdditions) _equivAdditions = [];
      for (const m of grp) { if (!present.has(m)) _equivAdditions.push(m); }
    }
  }
  if (_equivAdditions) for (const m of _equivAdditions) present.add(m);

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
      minMissing = 1;
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
  // exhaustive: disable score pruning, canReachCombo pruning, and the
  // search-spell heuristic penalty. The solver explores every reachable
  // state within the turn/depth budget. Much slower but never misses a win.
  exhaustive: false,
};

// ── Scoring ───────────────────────────────────────────────────────────────

/**
 * Score a state/path. Lower = better.
 *   Primary   : turn number (fewer turns → lower score)
 *   Secondary : depth (fewer actions → lower score)
 *   Tertiary  : floating mana (more mana → slightly lower score, tie-breaks
 *               paths that reach the same board through different action orders)
 * Life removed: in a combo deck, life total before the win is irrelevant (Fix #9).
 */
function score(state, depth) {
  return (state.turn - 1) * 100_000 +
         depth            *      10  -
         state.mana.total() *      1;
}

// ── #2 / #11: Heuristic child ordering ───────────────────────────────────
// Lower = closer to win. Returns a score for sorting children.
//
//  A) Search-spell penalty (+2000 per castable tutor in hand):
//     Forces "cast tutor now" strictly before "do other things first".
//     Penalty is 2× the per-missing-piece unit (1000) so it dominates the
//     combo-distance signal. Without this, the DFS explores all N! orderings
//     of "when to cast the tutor", causing ~10× state explosion.
//
//  B) topDecked bonus (−500 if a combo piece is on top of library):
//     After a tutor resolves, the target is topDecked. Strongly prefers passing
//     to draw the tutored piece over continuing to do other things first.
function heuristic(minMissing, state, exhaustive = false, _infiniteMana = undefined, _searchSpellWins = undefined) {
  // [E3] Use pre-computed checkCombos result when available.
  const fired = (_infiniteMana !== undefined) ? _infiniteMana : (minMissing === 0 ? checkCombos(state) : null);
  if (minMissing === 0 && fired) return -1_000_000 - state.mana.total();

  let h = minMissing * 1000 - state.mana.total();

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
        if (!state.mana.canPay(effectiveCost(state, def))) continue;
        if (def.castFn) {
          const afterPay = state.payMana(effectiveCost(state, def));
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
    }
    if (searchPenalty) h += 2000;
  }

  // B) topDecked bonus — strongly prefer drawing the tutored piece
  if (state.topDecked && TUTOR_PRIORITY_SCORE[state.topDecked] !== undefined) {
    h -= 500;
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

  // ── DFS ───────────────────────────────────────────────────────────────────
  // #1: parentNode is { state, parent } linked list node (null at root)

  _dfs(state, parentNode, depth) {
    this.statesExplored++;
    if (this.statesExplored > this.opts.maxStates) return;
    if (depth > this.opts.maxDepth)  return;
    if (state.turn > this.opts.maxTurns) return;

    // Prune losing states immediately (always active — losing can never win)
    if (state.youLost()) { this.pruned++; return; }

    // Score pruning (DFS-only, disabled in exhaustive mode)
    const s = score(state, depth);
    if (!this.opts.exhaustive && s >= this.bestScore) { this.pruned++; return; }

    // Dedup: full fingerprint including mana (mana affects what actions are available)
    const fp = state.fingerprint();
    const prev = this.visited.get(fp);
    if (prev !== undefined && prev <= depth) { this.pruned++; return; }
    this.visited.set(fp, depth);

    // [E3] Compute checkCombos ONCE per node and reuse in analyzeState,
    // checkVictory, canReachCombo, and heuristic — eliminates 3+ redundant calls.
    const infiniteMana = checkCombos(state);

    // #2: Build present-set + minMissing once for this node (pass pre-computed result)
    const analysis = analyzeState(state, infiniteMana);

    // Combo/victory check (pass pre-computed infiniteMana)
    const combo = checkVictory(state, infiniteMana);
    if (combo) {
      // #1: Reconstruct path only on win
      const node = { state, parent: parentNode };
      if (combo.deployed) {
        // Fully deployed — this is a terminal win, stop exploring this branch
        this._recordWin(reconstructPath(node), combo, s);
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

    // #2 / #4 / #8: Generate children with lazy canReachCombo pruning per child.
    // analyzeState is called per child for the heuristic, and we immediately gate
    // on canReachCombo so unpromising children are pruned before sort (Fix #4).
    // [E2] Pass analysis.present so generateActions skips its own Set construction.
    const actions = generateActions(state, analysis.present);
    const children = [];
    for (const action of actions) {
      let next;
      try { next = action.apply(state); }
      catch (e) { if (this.opts.verbose) console.warn(`[${action.label}]`, e.message); continue; }
      if (!next) continue;

      // [E3] Compute child's infiniteMana once, reuse in analyzeState + canReachCombo + heuristic
      const childInfiniteMana = checkCombos(next);
      const childAnalysis = analyzeState(next, childInfiniteMana);
      // Fix #4: prune unreachable children before they enter the sort list
      if (!this.opts.exhaustive) {
        const childTurns = this.opts.maxTurns - next.turn;
        if (childTurns >= 0 && !canReachCombo(next, childTurns + 1, childAnalysis, childInfiniteMana)) {
          this.pruned++;
          continue;
        }
      }
      children.push({ next, h: heuristic(childAnalysis.minMissing, next, this.opts.exhaustive, childInfiniteMana) });
    }

    // #8: Skip sort when trivially ordered
    if (children.length > 1) children.sort((a, b) => a.h - b.h);

    // #1: Build current node for parent-pointer chain
    const node = { state, parent: parentNode };
    for (const { next } of children) {
      this._dfs(next, node, depth + 1);
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
        const { state, depth } = node;
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

        // [E3] Compute checkCombos once per BFS node, reuse in checkVictory + children
        const infiniteMana = checkCombos(state);
        const combo = checkVictory(state, infiniteMana);
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
        const nodeAnalysis = analyzeState(state, infiniteMana);
        const actions = generateActions(state, nodeAnalysis.present);
        const children = [];
        for (const action of actions) {
          let next;
          try { next = action.apply(state); }
          catch (e) { continue; }
          if (!next || next.turn > this.opts.maxTurns) continue;
          // [E3] Compute child's infiniteMana once, reuse in analyzeState + canReachCombo + heuristic
          const childInfiniteMana = checkCombos(next);
          const ca = analyzeState(next, childInfiniteMana);
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
          this.visited.set(childFp, depth + 1);
          children.push({ next, h: heuristic(ca.minMissing, next, this.opts.exhaustive, childInfiniteMana) });
        }
        if (children.length > 1) children.sort((a, b) => a.h - b.h);

        for (const { next } of children) {
          enqueue({ state: next, parent: node, depth: depth + 1 });
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
    for (const { name, step } of BF_CREATURE_TUTORS) {
      if (onField(name) && inLibrary('duskwatch_recruiter')) {
        const { state: ns, cardKey: found } = searchFor('duskwatch_recruiter');
        if (found) {
          s = ns.addToHand(found);
          steps.push(step);
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
          s.battlefield.find(p => p.name === 'Duskwatch Recruiter').summoningSick = false;
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
              s.battlefield.find(p => p.name === 'Duskwatch Recruiter').summoningSick = false;
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
              s.battlefield.find(p => p.name === 'Duskwatch Recruiter').summoningSick = false;
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
            s.battlefield.find(p => p.name === 'Duskwatch Recruiter').summoningSick = false;
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
    s.battlefield.find(p => p.name === 'Duskwatch Recruiter').summoningSick = false;
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
              // Cast the expendable creature (becomes Forest under Ashaya)
              s = s.removeFromHand(sacFound);
              s = s.enterBattlefield(sacFound);
              const sacPerm = s.battlefield[s.battlefield.length - 1];
              if (sacPerm) sacPerm.summoningSick = false;
              steps.push(`Cast ${sacName} (sacrifice fodder — becomes Forest under Ashaya)`);
            }
          }

          // Cast Elvish Reclaimer (infinite mana available)
          s = s.removeFromHand(found);
          s = s.enterBattlefield(found);
          steps.push('Cast Elvish Reclaimer (infinite mana available)');

          // ── O-10: Grant Elvish Reclaimer haste via a real enabler ────────
          // Under Ashaya, Reclaimer is a Forest land-creature. We need to give
          // it haste so it can activate the same turn it's cast.
          // Priority: cheapest/simplest enabler first.
          const reclPerm = s.battlefield.find(p => p.name === 'Elvish Reclaimer');
          let hasteGranted = false;

          // 1. Global haste already on field (Concordant Crossroads, Thousand-Year Elixir,
          //    Surrak and Goreclaw) — Reclaimer enters without summoning sickness.
          const GLOBAL_HASTE = ['Concordant Crossroads','Thousand-Year Elixir','Surrak and Goreclaw'];
          if (!hasteGranted && GLOBAL_HASTE.some(n => onField(n))) {
            if (reclPerm) reclPerm.summoningSick = false;
            const enablerName = GLOBAL_HASTE.find(n => onField(n));
            steps.push(`${enablerName}: Elvish Reclaimer enters with haste`);
            hasteGranted = true;
          }

          // 2. Destiny Spinner on field — {3}{G}: animate Reclaimer (land under Ashaya) → haste
          if (!hasteGranted && onField('Destiny Spinner') && onField('Ashaya, Soul of the Wild')) {
            if (reclPerm) reclPerm.summoningSick = false;
            const enchCount = s.battlefield.filter(p => p.types.includes('enchantment')).length;
            steps.push(`Destiny Spinner: {3}{G} → animate Elvish Reclaimer (land under Ashaya) → ${enchCount}/${enchCount} Elemental with haste`);
            hasteGranted = true;
          }

          // 3. Badgermole Cub — ETB earthbend targets a creature-land → haste
          if (!hasteGranted && (onField('Badgermole Cub') || inHand('badgermole_cub') || inLibrary('badgermole_cub'))) {
            if (reclPerm) reclPerm.summoningSick = false;
            if (!onField('Badgermole Cub')) {
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
            }
            steps.push('Badgermole Cub ETB (earthbend): target Elvish Reclaimer → gets haste');
            hasteGranted = true;
          }

          // 4. Fallback — note that a haste enabler is needed but not yet available.
          //    (The win line is still valid — this documents the gap for the pilot.)
          if (!hasteGranted) {
            if (reclPerm) reclPerm.summoningSick = false; // allow activation to proceed
            steps.push('(Need haste enabler for Elvish Reclaimer: Destiny Spinner {3}{G}, Badgermole Cub ETB, or Concordant Crossroads)');
          }

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

                // ── O-10: Identify the Sanitarium untap configuration ──────
                // Geier Reach must be untapped repeatedly to mill the table.
                // Detect which untap method is available and document the loop.
                const ashayaOnField = onField('Ashaya, Soul of the Wild');
                let untapMethod = null;

                if (onField('Magus of the Candelabra') && ashayaOnField) {
                  untapMethod = 'Magus of the Candelabra: {X},{T} → untap Geier Reach Sanitarium (land under Ashaya)';
                } else if (onField('Temur Sabertooth') && (onField('Woodcaller Automaton') || inHand('woodcaller_automaton') || inLibrary('woodcaller_automaton'))) {
                  untapMethod = 'Woodcaller Automaton ETB + Temur Sabertooth: bounce → recast → untap Geier Reach each loop';
                } else if ((onField('Scryb Ranger') || inHand('scryb_ranger')) && ashayaOnField) {
                  untapMethod = 'Scryb Ranger: return Forest to hand → untap Geier Reach Sanitarium (Forest under Ashaya)';
                } else if ((onField('Quirion Ranger') || inHand('quirion_ranger')) && ashayaOnField && onField('Destiny Spinner')) {
                  untapMethod = 'Quirion Ranger + Destiny Spinner: Ranger untaps Geier Reach (animated land-creature under Ashaya)';
                } else if ((onField('Hyrax Tower Scout') || inHand('hyrax_tower_scout')) && onField('Destiny Spinner') && ashayaOnField) {
                  untapMethod = 'Hyrax Tower Scout + Destiny Spinner: Scout ETB untaps Geier Reach (animated creature-land)';
                } else if ((onField('Argothian Elder') || inHand('argothian_elder')) && ashayaOnField && onField('Destiny Spinner')) {
                  untapMethod = 'Argothian Elder + Destiny Spinner: Elder untaps Geier Reach (animated creature-land)';
                } else if ((onField('Wirewood Symbiote') || inHand('wirewood_symbiote')) && ashayaOnField && onField('Destiny Spinner')) {
                  untapMethod = 'Wirewood Symbiote + Destiny Spinner: return Elf → untap Geier Reach (animated creature-land)';
                }

                if (untapMethod) {
                  steps.push(`Untap method: ${untapMethod}`);
                  steps.push('{2}: Activate Geier Reach Sanitarium (hold priority) → Untap Geier Reach → Repeat to mill entire library');
                } else {
                  steps.push('(Need untap for Geier Reach Sanitarium: Magus of the Candelabra, Woodcaller+Temur, Scryb Ranger+Ashaya, etc.)');
                }
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

  const CAST_ORDER = [
    ...(bounceEngineChosen ? [{ key: bounceEngineChosen,
        name: bounceEngineChosen === 'temur_sabertooth' ? 'Temur Sabertooth' : 'Kogla, the Titan Ape' }] : []),
    { key: 'endurance', name: 'Endurance' },
  ];

  for (const { key, name } of CAST_ORDER) {
    if (onField(name)) continue;
    if (!inHand(key)) continue;
    s = s.removeFromHand(key);
    s = s.enterBattlefield(key);
    s.battlefield.find(p => p.name === name).summoningSick = false;
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
function findNearMisses(hand) {
  const handKeySet = new Set(hand);

  // Helper: card key → display name
  const keyToName = (k) => CARDS[k]?.name ?? k;

  const nearMisses = [];

  // Check mana combo near-misses via requiredKeys (Fix #8)
  for (const detector of DETECTORS) {
    const keys = detector.requiredKeys;
    if (!keys || keys.length === 0) continue;
    const have = keys.filter(k => handKeySet.has(k));
    const need = keys.filter(k => !handKeySet.has(k));
    // "Near miss" = have at least one piece, missing at least one piece
    if (have.length >= 1 && need.length >= 1) {
      nearMisses.push({
        type:  'mana_combo',
        combo: detector.name,
        have:  have.map(keyToName),
        need:  need.map(keyToName),
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
    // Read solver config from payload (with safe defaults)
    const solverOpts = {
      maxTurns:   Math.min(Math.max(d.maxTurns  ?? 4,  1), 10),
      maxDepth:   Math.min(Math.max(d.maxDepth  ?? 50, 10), 200),
      maxStates:  Math.min(Math.max(d.maxStates ?? 200000, 10000), 2000000),
      strategy:   d.strategy   === 'bfs' ? 'bfs' : 'dfs',
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
