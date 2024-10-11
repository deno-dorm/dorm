/* istanbul ignore file */

const bool = (v?: string) => v && ['true', 't', '1'].includes(v.toLowerCase());
const boolIfDefined = (v?: string) => v != null ? bool(v) : true;
const enabled = () => !bool(Deno.env.get('NO_COLOR'))
  && !bool(Deno.env.get('MIKRO_ORM_NO_COLOR'))
  && boolIfDefined(Deno.env.get('FORCE_COLOR'))
  && boolIfDefined(Deno.env.get('MIKRO_ORM_COLORS'));
const wrap = (fn: (text: string) => string) => (text: string) => enabled() ? fn(text) : text;

/** @internal */
export const colors = {
  red: wrap((text: string) => `\x1B[31m${text}\x1B[39m`),
  green: wrap((text: string) => `\x1B[32m${text}\x1B[39m`),
  yellow: wrap((text: string) => `\x1B[33m${text}\x1B[39m`),
  grey: wrap((text: string) => `\x1B[90m${text}\x1B[39m`),
  cyan: wrap((text: string) => `\x1B[36m${text}\x1B[39m`),
  enabled,
};
