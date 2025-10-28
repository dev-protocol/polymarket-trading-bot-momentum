import { describe, expect, it } from "vitest";
import { Polymarket } from "../../src/index.js";

const SAMPLE_USER = "0x56687bf447db6ffa42ffe2204a05edaa20f55839";
const SAMPLE_MARKET = "0x49252732f0bfe99f2ab09366230607eb9562fa6a56557a10ddcd7dd2198cf588";

const client = new Polymarket();

describe("Polymarket misc endpoints (integration)", () => {
  it("fetches total markets traded by a user", async () => {
    const result = await client.data.misc.getTraded({ user: SAMPLE_USER });

    expect(result.user).toBe(SAMPLE_USER);
    expect(typeof result.traded).toBe("number");
  });

  it("fetches open interest", async () => {
    const result = await client.data.misc.getOpenInterest();

    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      expect(typeof result[0]?.market).toBe("string");
      expect(typeof result[0]?.value).toBe("number");
    }
  });

  it("fetches open interest for a specific market", async () => {
    const result = await client.data.misc.getOpenInterest({ market: [SAMPLE_MARKET] });

    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      expect(result[0]?.market).toBe(SAMPLE_MARKET);
    }
  });

  it("fetches live volume for an event", async () => {
    const result = await client.data.misc.getLiveVolume({ id: 12345 });

    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      const entry = result[0];
      expect(typeof entry.total).toBe("number");
      expect(Array.isArray(entry.markets)).toBe(true);
    }
  });
});
