# Polymarket Data SDK

Community-maintained TypeScript client for the public Polymarket Data and Gamma APIs.

> ⚠️ **Community Edition** — This project is built by independent contributors and is **not** an
> official Polymarket product. Always confirm behaviour against Polymarket’s public documentation
> before deploying to production.

---

## Features

- **Modern TypeScript**: ESM output, bundled declarations, native `fetch` integration.
- **Zod Validation**: Requests and responses are validated to catch upstream API changes early.
- **Modular Namespaces**: `client.data` for portfolio/trading analytics, `client.gamma` for discovery
  data (search, comments, series, markets, events, sports).
- **Live-Tested Examples**: Integration tests hit the real Polymarket endpoints for accuracy.

---

## Installation

```bash
npm install polymarket-data
# or
pnpm add polymarket-data
yarn add polymarket-data
```

The package targets Node.js 18+ by default. Supply a custom `fetch` implementation if your runtime
lacks one.

---

## Quickstart

```ts
import { Polymarket } from "polymarket-data";

const client = new Polymarket();

// Health check
const health = await client.health();
console.log(health); // { data: "OK" }

// Portfolio positions
const positions = await client.data.core.getPositions({
  user: "0x56687bf447db6ffa42ffe2204a05edaa20f55839",
  limit: 10,
});

// Market discovery
const markets = await client.gamma.markets.listMarkets({
  closed: false,
  liquidity_num_min: 1000,
  limit: 5,
});
```

Use type imports for additional safety:

```ts
import type { Position, Market } from "polymarket-data";
```

---

## Error Handling

| Scenario           | Error Type  | Notes                                                        |
| ------------------ | ----------- | ------------------------------------------------------------ |
| Validation failure | `Error`     | Message includes `Invalid parameters for …` with Zod paths.  |
| HTTP error         | `HttpError` | Contains `status`, `statusText`, and parsed `body`.          |
| Network failure    | `Error`     | Message prefixed with `Network error:` and original `cause`. |

All methods return promises—wrap calls in `try/catch` or surface errors through your telemetry.

---

## Project Structure

```
src/
  index.ts                # Polymarket client and exports
  modules/
    core/                 # data.core implementations
    misc/                 # data.misc implementations
    gamma/                # gamma modules (sports, search, comments, series, markets, events)
  utils/                  # shared query + error utilities
  http.ts                 # fetch wrapper with error normalization
  types.ts                # shared option and error interfaces

test/
  unit/                   # Validation-focused unit tests
  integration/            # Live API integration tests

docs/                     # Public documentation (mintlify)
```

---

## Scripts

```bash
npm run build        # Emit dist/ with declarations and sourcemaps
npm run lint         # ESLint (flat config) + Prettier conformance
npm run format       # Prettier check
npm run test         # Full Vitest suite (unit + integration)
npm run test:unit    # Unit tests only
npm run test:integration # Live API tests
```

Integration tests require network access and hit the real Polymarket endpoints. Skip them when
running offline or inject a mocked `fetch`.

---

## Documentation & Support

Full documentation is available at **[polymarket-data.com](https://polymarket-data.com)**. It
includes quickstarts, architecture notes, Data/Gamma endpoint guides, testing workflows, and FAQ.

For questions or contributions:

- Open an issue or feature request in this repository.
- Share reproducible payloads and stack traces when reporting bugs.
- Review the docs’ contribution guidelines before submitting PRs.

Happy building!
