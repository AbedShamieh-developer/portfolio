/**
 * Shared timing + layout constants for the intro loader.
 *
 * Everything is expressed in seconds relative to loader mount so the boot
 * sequence, the network graph and the name reveal stay in lockstep without
 * threading timers through React state.
 */

export const INTRO_KEY = "portfolio-intro-seen";

/** Loader is visible for at least this long so the sequence never gets clipped. */
export const MINIMUM_LOADING_TIME = 2000;
/** Hard ceiling — a stalled font or asset can never trap the visitor. */
export const MAXIMUM_LOADING_TIME = 4000;
/** Reduced-motion visitors get a short, static acknowledgement instead. */
export const REDUCED_LOADING_TIME = 520;
/** Returning visitors (same session) get a fast fade, no boot sequence. */
export const SKIP_TRANSITION_TIME = 420;

/** Mobile runs the same choreography slightly compressed. */
export const MOBILE_TIME_SCALE = 0.84;

export const EASE_NARRATIVE = [0.16, 1, 0.3, 1] as const;
export const EASE_PANEL = [0.76, 0, 0.24, 1] as const;
export const EASE_PRECISE = [0.4, 0, 0.2, 1] as const;

/**
 * Boot beats, in seconds from mount. Scaled by `MOBILE_TIME_SCALE` on small
 * screens and collapsed to 0 under reduced motion.
 */
export const BEATS = {
  seed: 0.0,
  initializing: 0.18,
  network: 0.34,
  status: 0.74,
  statusStagger: 0.19,
  sweep: 1.16,
  firstName: 1.3,
  lastName: 1.62,
} as const;

/** How long a word stays scrambled before it resolves. */
export const SCRAMBLE_DURATION = 260;

export const STATUS_LINES = [
  "BACKEND SYSTEMS",
  "CLOUD ARCHITECTURE",
  "APIs",
  "AUTOMATION",
] as const;

export const NAME_WORDS = ["ABDULRAHMAN", "SHAMIEH"] as const;

/** Restrained scrambles — a couple of glyphs, not a glitch storm. */
export const SCRAMBLE_MASKS: Record<string, string[]> = {
  ABDULRAHMAN: ["ABDULR4HM_N", "4BDULRAHM/N", "ABDU1R4HMAN", "ABDULRAHM4N"],
  SHAMIEH: ["SH4MIEH", "5HAMI3H", "SHAM1EH", "SH4MI3H"],
};

/** Handoff choreography (seconds from the moment the reveal starts). */
export const HANDOFF = {
  /** Network + status + progress dissolve. */
  dissolve: 0.26,
  /** Masked panels part vertically. */
  panelDelay: 0.2,
  panelDuration: 0.82,
  /** Loader name flies to its hero position. */
  flightDelay: 0.24,
  flightDuration: 0.92,
} as const;

export function scaleBeat(seconds: number, mobile: boolean, reduced: boolean) {
  if (reduced) return 0;
  return seconds * (mobile ? MOBILE_TIME_SCALE : 1);
}
