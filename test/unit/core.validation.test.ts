import { describe, expect, it } from "vitest";
import { Polymarket } from "../../src/index.js";
import {
  positionsResponseSchema,
  tradesResponseSchema,
  activityResponseSchema,
  holdersResponseSchema,
  valueResponseSchema,
} from "../../src/modules/core/schemas.js";

const SAMPLE_USER = "0x56687bf447db6ffa42ffe2204a05edaa20f55839";
const SAMPLE_CONDITION = "0x49252732f0bfe99f2ab09366230607eb9562fa6a56557a10ddcd7dd2198cf588";

describe("Core module validation", () => {
  const client = new Polymarket();

  it("requires user parameter for getPositions", async () => {
    // @ts-expect-error intentionally missing user
    await expect(client.data.core.getPositions({ limit: 10 })).rejects.toThrow(
      /Invalid parameters for getPositions/,
    );
  });

  it("enforces mutually exclusive market and eventId for getPositions", async () => {
    await expect(
      client.data.core.getPositions({
        user: SAMPLE_USER,
        market: [SAMPLE_CONDITION],
        eventId: [123],
      }),
    ).rejects.toThrow(/cannot be used together/);
  });

  it("requires filterAmount when filterType is provided for getTrades", async () => {
    await expect(
      client.data.core.getTrades({
        filterType: "CASH",
      } as never),
    ).rejects.toThrow(/must be provided together/);
  });

  it("requires user parameter for getActivity", async () => {
    // @ts-expect-error intentionally missing user
    await expect(client.data.core.getActivity({ limit: 5 })).rejects.toThrow(
      /Invalid parameters for getActivity/,
    );
  });

  it("requires market parameter for getHolders", async () => {
    // @ts-expect-error intentionally missing market
    await expect(client.data.core.getHolders({ limit: 5 })).rejects.toThrow(
      /Invalid parameters for getHolders/,
    );
  });

  it("requires user parameter for getValue", async () => {
    // @ts-expect-error intentionally missing user
    await expect(client.data.core.getValue({})).rejects.toThrow(/Invalid parameters for getValue/);
  });
});

describe("Core response schemas", () => {
  it("rejects invalid positions payloads", () => {
    expect(() => positionsResponseSchema.parse([{ invalid: true }])).toThrow();
  });

  it("rejects invalid trades payloads", () => {
    expect(() => tradesResponseSchema.parse([{ invalid: true }])).toThrow();
  });

  it("rejects invalid activity payloads", () => {
    expect(() => activityResponseSchema.parse([{ invalid: true }])).toThrow();
  });

  it("rejects invalid holders payloads", () => {
    expect(() => holdersResponseSchema.parse([{ invalid: true }])).toThrow();
  });

  it("rejects invalid value payloads", () => {
    expect(() => valueResponseSchema.parse([{ invalid: true }])).toThrow();
  });
});
