/**
 * Zod schemas and inferred types shared by the web app and the mock API.
 * Zod is added in WP 3.2; until then this package only proves the wiring.
 * Rule: types are inferred from schemas, never hand-written twice.
 */
export const CONTRACTS_PACKAGE = '@gam3iya/contracts' as const;
