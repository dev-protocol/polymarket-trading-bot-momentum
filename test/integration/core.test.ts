import { describe, expect, it } from "vitest";
import { Polymarket } from "../../src/index.js";

const SAMPLE_USER = "0x56687bf447db6ffa42ffe2204a05edaa20f55839";
const SAMPLE_CONDITION = "0x49252732f0bfe99f2ab09366230607eb9562fa6a56557a10ddcd7dd2198cf588";

const client = new Polymarket();

describe("Polymarket data core (integration)", () => {
  it("fetches current positions for a user", async () => {
    const result = await client.data.core.getPositions({
      user: SAMPLE_USER,
      limit: 5,
    });

    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      const entry = result[0];
      expect(entry.proxyWallet).toMatch(/^0x[a-fA-F0-9]{40}$/);
      expect(typeof entry.size).toBe("number");
    }
  });

  it("fetches recent trades", async () => {
    const result = await client.data.core.getTrades({
      limit: 5,
    });

    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      const entry = result[0];
      expect(["BUY", "SELL"]).toContain(entry.side);
      expect(entry.conditionId).toMatch(/^0x[a-fA-F0-9]{64}$/);
    }
  });

  it("fetches user activity", async () => {
    const result = await client.data.core.getActivity({
      user: SAMPLE_USER,
      limit: 5,
    });

    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      const entry = result[0];
      expect(entry.proxyWallet).toMatch(/^0x[a-fA-F0-9]{40}$/);
      expect(["BUY", "SELL", undefined]).toContain(entry.side);
    }
  });

  it("fetches top holders for a market", async () => {
    const result = await client.data.core.getHolders({
      market: [SAMPLE_CONDITION],
      limit: 2,
    });

    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      const entry = result[0];
      expect(typeof entry.token).toBe("string");
      expect(Array.isArray(entry.holders)).toBe(true);
    }
  });

  it("fetches user position value", async () => {
    const result = await client.data.core.getValue({
      user: SAMPLE_USER,
    });

    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      const entry = result[0];
      expect(entry.user).toMatch(/^0x[a-fA-F0-9]{40}$/);
      expect(typeof entry.value).toBe("number");
    }
  });
});
