import { describe, expect, it } from 'vitest';
import { CONTRACTS_PACKAGE } from '../src/index';

describe('contracts package', () => {
  it('is wired into the workspace', () => {
    expect(CONTRACTS_PACKAGE).toBe('@gam3iya/contracts');
  });
});
