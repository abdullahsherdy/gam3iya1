import { CONTRACTS_PACKAGE } from '@gam3iya/contracts';
import { DOMAIN_PACKAGE } from '@gam3iya/domain';

// Walking-skeleton screen: proves the web app imports both workspace packages.
// Replace with the real app shell in WP 1.7.
export function App() {
  return (
    <main>
      <h1>Gam3iya</h1>
      <p>
        Workspace wiring: {DOMAIN_PACKAGE}, {CONTRACTS_PACKAGE}
      </p>
    </main>
  );
}
