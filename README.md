# Polymarket Trading Bot — Momentum (by polymarket dev team)

## _built by @sherrbss @suhailkakar_
#### Please give us feedback!

**Polymarket trading bot** for 15-minute Up/Down markets using RSI, MACD, and Momentum. Open-source Polymarket bot with simulation and live trading. Use the Polymarket API (Gamma + CLOB) to automate prediction market trading.


---

## Search keywords

Looking for a **Polymarket trading bot**, **Polymarket bot**, or **Polymarket API bot**? This repo is a TypeScript Polymarket trading bot that works with the Polymarket CLOB and Gamma APIs. It can be used as a base for a Polymarket arbitrage bot or Polymarket copytrading bot. Keywords: *Polymarket trading bot*, *Polymarket bot*, *Polymarket API bot*, *Polymarket CLOB bot*, *Polymarket arbitrage bot*, *Polymarket prediction market bot*.

---

## What is Polymarket?

**Polymarket** is a decentralized prediction market platform where users trade on the outcomes of real-world events (e.g. elections, crypto prices, sports). Prices reflect market sentiment and can be traded 24/7. This bot connects to Polymarket’s public APIs (Gamma for markets, CLOB for order book and orders) to automate trading on selected markets.

---

## Types of Polymarket Bots (trading bot, arbitrage bot, copytrading)

| Type | What it does | This repo |
|------|----------------|-----------|
| **Signal / trend bot** | Uses indicators (RSI, MACD, etc.) to decide when to buy “Up” or “Down” on a market. | ✅ **This bot** — RSI/MACD/Momentum on 15m Up/Down markets. |
| **Copytrading bot** | Replicates another trader’s positions (follow their buys/sells). | ❌ Not included; you could build it on top of this by mirroring external signals. |
| **Arbitrage bot** | Exploits price differences across related markets or venues (e.g. same outcome, different prices). | ❌ Not full arb; this repo is a **solid base** to add cross-market spread logic and multi-leg execution. |

This **Polymarket trading bot** is signal-based: it discovers ETH/BTC 15m Up/Down markets, computes rolling RSI/MACD/Momentum, and outputs **Buy Up**, **Buy Down**, or **No Action**. You can extend it into a Polymarket copytrading bot (feed in external signals) or a Polymarket arbitrage bot (add spread detection and multi-leg orders).

---

## Features

- **Market discovery** — Finds active ETH/BTC 15-minute Up/Down markets via the Gamma API.
- **Live prices** — Fetches token bid/ask from the Polymarket CLOB API.
- **Technical indicators** — Rolling RSI, MACD, and Momentum with configurable parameters.
- **Strategy modes** — `rsi`, `macd`, `macd_signal`, or `momentum`.
- **Simulation mode** — Logs signals and simulated actions without placing real orders (recommended first step).
- **Live mode** — Uses the same logic with the option to place real orders (use with caution).
- **Flexible config** — One `config.json` for API keys, strategy parameters, and trading options.

---

## Requirements

- **Node.js** `>= 18`
- **npm** (or yarn/pnpm)
- **Polymarket wallet** — A private key (or proxy wallet) for CLOB authentication. Get API credentials from Polymarket if you use API key auth.

---

## Install the Polymarket trading bot

### 1. Clone and install dependencies

```bash
git clone <your-repo-url>
cd Polymarket-Trading-Bot-RSI-MACD-Momentum
npm install
```

### 2. Create your config file

Copy the example config and then edit it with your settings:

```bash
# If you have an example file:
cp config.json.example config.json

# Or create config.json in the project root (see Config reference below).
```

### 3. Add your Polymarket credentials

Edit `config.json` and set at least:

- **`polymarket.private_key`** — Your wallet private key (required for CLOB auth).
- Optionally: **`api_key`**, **`api_secret`**, **`api_passphrase`** if you use API key authentication.

**Important:** Never commit `config.json` or share your private key. Add `config.json` to `.gitignore`.

### 4. Run in simulation first

Always start in simulation to confirm everything works and to understand the signals:

```bash
npm run simulation
# or
npm run dev
```

You should see market discovery, price updates, and lines like `[SIM] BUY UP` / `[SIM] BUY DOWN` or `NoAction`.

---

## How to Use

### Simulation (no real orders)

Logs strategy signals and simulated trades only. Safe for testing.

```bash
npm run simulation
```

Or with a custom config path:

```bash
npx tsx src/main.ts --simulation --config path/to/config.json
```

### Live trading (real orders)

Runs the same strategy but can place real orders. **Use only after testing in simulation and with funds you can afford to lose.**

```bash
npm run live
```

With a custom config:

```bash
npx tsx src/main.ts --live --config path/to/config.json
```

### Build and run compiled JS

```bash
npm run build
npm start
# Or: node dist/main.js --simulation
```

---

## Strategy Modes

Set **`trending_index.mode`** in `config.json`:

| Mode | Description |
|------|-------------|
| `rsi` | Relative Strength Index — overbought/oversold style signals. |
| `macd` | MACD line — trend and momentum. |
| `macd_signal` | MACD with signal line for crossover signals. |
| `momentum` | Price momentum over the lookback period. |

Key parameters (in **`trending_index`** and **`trading`**):

- **`threshold`** — Level above which the indicator triggers a trade (e.g. RSI > 70).
- **`lookback`** — Number of periods for RSI/Momentum.
- **`macd_fast_period`**, **`macd_slow_period`**, **`macd_signal_period`** — MACD tuning.
- **`position_size`** — Size per trade (e.g. number of shares).
- **`check_interval_ms`** — How often the bot fetches prices and re-evaluates (e.g. 500 ms).

---

## Config Reference

### `polymarket`

| Field | Description |
|-------|-------------|
| `gamma_api_url` | Gamma API base URL (default: Polymarket Gamma). |
| `clob_api_url` | CLOB API base URL (default: Polymarket CLOB). |
| `private_key` | Wallet private key for signing (required). |
| `api_key`, `api_secret`, `api_passphrase` | Optional CLOB API credentials. |
| `proxy_wallet_address` | For proxy/smart contract wallets. |
| `signature_type` | Signature type (e.g. EOA vs Gnosis Safe). |

### `trending_index`

| Field | Description |
|-------|-------------|
| `mode` | `rsi` \| `macd` \| `macd_signal` \| `momentum` |
| `threshold` | Indicator threshold for entry. |
| `lookback` | Periods for RSI/Momentum. |
| `macd_fast_period`, `macd_slow_period`, `macd_signal_period` | MACD parameters. |
| `use_macd_sl_filter` | Optional MACD stop-loss filter. |

### `trading`

| Field | Description |
|-------|-------------|
| `check_interval_ms` | Polling interval (ms). |
| `position_size` | Trade size per signal. |
| `profit_threshold`, `stop_loss_threshold` | For future PnL/exit logic. |
| `enable_eth_trading`, `enable_solana_trading`, `enable_xrp_trading` | Which assets to trade. |
| `trading_start_when_remaining_minutes` | Optional: only trade when this many minutes left in the period. |

---

## Project Structure

```
src/
  main.ts         # Entry point, auth, market discovery, mode (sim/live)
  config.ts       # Load config and parse CLI args
  api.ts          # Polymarket Gamma + CLOB API wrapper
  clob.ts         # Wallet, CLOB client, order placement helper
  monitor.ts      # Market discovery and price snapshots
  indicators.ts   # Rolling RSI, MACD, Momentum
  strategies.ts   # Buy Up / Buy Down / No Action logic
  simulation.ts   # Simulation loop and logging
  types.ts        # Shared types
```

---

## Extending This Bot

- **Toward copytrading:** Add a layer that reads external signals (e.g. from an API or another bot) and maps them to Buy Up/Down on the same markets this bot already discovers and trades.
- **Toward arbitrage:** Add cross-market spread detection (e.g. same outcome on different markets or tokens), multi-leg order execution, slippage and inventory checks, and PnL tracking. This codebase gives you market discovery, CLOB client, and order helpers to build on.

---

## Quick Command Summary

| Command | Description |
|--------|-------------|
| `npm install` | Install dependencies |
| `npm run simulation` | Run in simulation (no real orders) |
| `npm run live` | Run in live mode (real orders) |
| `npm run dev` | Run with tsx (defaults to simulation) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled `dist/main.js` |

Thank you for using this Polymarket trading bot. If you run into issues, check your `config.json`, credentials, and that you’re on Node.js 18+.
