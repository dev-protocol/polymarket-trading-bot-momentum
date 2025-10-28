import { describe, expect, it } from "vitest";
import { Polymarket } from "../../src/index.js";
import {
  tradedResponseSchema,
  openInterestResponseSchema,
  liveVolumeResponseSchema,
  openInterestParamsSchema,
} from "../../src/modules/misc/schemas.js";

describe("Misc module validation", () => {
  const client = new Polymarket();

  it("requires user parameter for getTraded", async () => {
    // @ts-expect-error deliberate omission
    await expect(client.data.misc.getTraded({})).rejects.toThrow(
      /Invalid parameters for getTraded/,
    );
  });

  it("accepts optional market parameter for getOpenInterest", () => {
    expect(() =>
      openInterestParamsSchema.parse({
        market: ["0x49252732f0bfe99f2ab09366230607eb9562fa6a56557a10ddcd7dd2198cf588"],
      }),
    ).not.toThrow();
  });

  it("requires id parameter for getLiveVolume", async () => {
    // @ts-expect-error deliberate omission
    await expect(client.data.misc.getLiveVolume({})).rejects.toThrow(
      /Invalid parameters for getLiveVolume/,
    );
  });

  it("requires id to be >= 1 for getLiveVolume", async () => {
    await expect(client.data.misc.getLiveVolume({ id: 0 })).rejects.toThrow(
      /Invalid parameters for getLiveVolume/,
    );
  });
});

describe("Misc response schemas", () => {
  it("rejects invalid traded payload", () => {
    expect(() => tradedResponseSchema.parse({ invalid: true })).toThrow();
  });

  it("rejects invalid open interest payload", () => {
    expect(() => openInterestResponseSchema.parse([{ invalid: true }])).toThrow();
  });

  it("rejects invalid live volume payload", () => {
    expect(() => liveVolumeResponseSchema.parse([{ invalid: true }])).toThrow();
  });
});
