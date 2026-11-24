import { describe, expect, it } from 'vitest';
import { DOMAIN_PACKAGE } from '../src/index';

describe('domain package', () => {
  it('is wired into the workspace', () => {
    expect(DOMAIN_PACKAGE).toBe('@gam3iya/domain');
  });
});
