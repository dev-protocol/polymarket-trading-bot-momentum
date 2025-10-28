import { describe, expect, it } from "vitest";
import { Polymarket } from "../../src/index.js";

describe("Polymarket data health check (integration)", () => {
  it("returns OK from the live Polymarket API", async () => {
    const client = new Polymarket();
    const result = await client.health();

    expect(result).toEqual({ data: "OK" });
  });

  it("surfaces network errors for unreachable endpoints", async () => {
    const client = new Polymarket({ dataEndpoint: "https://127.0.0.1:9" });

    await expect(client.health()).rejects.toThrow(/Network error/i);
  });
});
