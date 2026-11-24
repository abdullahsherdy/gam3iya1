import { CONTRACTS_PACKAGE } from '@gam3iya/contracts';
import { DOMAIN_PACKAGE } from '@gam3iya/domain';
import { describe, expect, it } from 'vitest';

describe('web app workspace wiring', () => {
  it('imports the domain and contracts packages', () => {
    expect(DOMAIN_PACKAGE).toBe('@gam3iya/domain');
    expect(CONTRACTS_PACKAGE).toBe('@gam3iya/contracts');
  });
});
