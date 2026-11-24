/**
 * Pure business rules: money, schedule, payment status, payout.
 *
 * Constraints (enforced by lint, see eslint.config.js):
 * - no imports from React, Zod or other workspace packages
 * - no clock access: functions take `today` as a parameter
 * - no parseFloat: money is integer piasters
 *
 * Esraa writes everything in this package (WP 2.1 to 2.4), tests first from PRD Appendix A.
 */
export const DOMAIN_PACKAGE = '@gam3iya/domain' as const;
