import { describe, expect, it, vi } from "vitest";
import { Polymarket, DEFAULT_GAMMA_ENDPOINT } from "../../src/index.js";
import {
  listTeamsResponseSchema,
  searchResponseSchema,
  commentsResponseSchema,
  listSeriesResponseSchema,
  marketsResponseSchema,
  eventResponseSchema,
  eventTagsResponseSchema,
} from "../../src/modules/gamma/schemas.js";

describe("Gamma module validation", () => {
  const client = new Polymarket();

  it("enforces non-negative limit for listTeams", async () => {
    await expect(client.gamma.sports.listTeams({ limit: -1 } as never)).rejects.toThrow(
      /Invalid parameters for gamma\.sports\.listTeams/,
    );
  });

  it("requires search query for publicSearch", async () => {
    // @ts-expect-error intentionally missing q
    await expect(client.gamma.search.publicSearch({})).rejects.toThrow(
      /Invalid parameters for gamma\.search\.publicSearch/,
    );
  });

  it("validates parent_entity_type for listComments", async () => {
    await expect(
      client.gamma.comments.listComments({ parent_entity_type: "Invalid" as never }),
    ).rejects.toThrow(/Invalid parameters for gamma\.comments\.listComments/);
  });

  it("validates numeric comment id", async () => {
    await expect(client.gamma.comments.getCommentById("abc" as never)).rejects.toThrow(
      /Invalid comment id/,
    );
  });

  it("validates user address when fetching comments by user", async () => {
    await expect(
      client.gamma.comments.getCommentsByUserAddress("not-an-address" as never),
    ).rejects.toThrow(/Invalid user address/);
  });

  it("validates numeric categories_ids for listSeries", async () => {
    await expect(
      client.gamma.series.listSeries({ categories_ids: ["abc" as never] }),
    ).rejects.toThrow(/Invalid parameters for gamma\.series\.listSeries/);
  });

  it("validates date parameters for listMarkets", async () => {
    await expect(
      client.gamma.markets.listMarkets({ start_date_min: "not-a-date" } as never),
    ).rejects.toThrow(/Invalid date-time format/);
  });

  it("validates event id for getEventById", async () => {
    await expect(client.gamma.events.getEventById("abc" as never)).rejects.toThrow(
      /Invalid event id/,
    );
  });

  it("validates event slug for getEventBySlug", async () => {
    await expect(client.gamma.events.getEventBySlug(123 as never)).rejects.toThrow(/Invalid slug/);
  });
});

describe("Gamma response schemas", () => {
  it("rejects malformed teams payload", () => {
    expect(() => listTeamsResponseSchema.parse([{}])).toThrow();
  });

  it("rejects malformed search payload", () => {
    expect(() => searchResponseSchema.parse({ invalid: true })).toThrow();
  });

  it("rejects malformed comments payload", () => {
    expect(() => commentsResponseSchema.parse([{}])).toThrow();
  });

  it("rejects malformed series payload", () => {
    expect(() => listSeriesResponseSchema.parse([{}])).toThrow();
  });

  it("rejects malformed markets payload", () => {
    expect(() => marketsResponseSchema.parse([{}])).toThrow();
  });

  it("rejects malformed event payload", () => {
    expect(() => eventResponseSchema.parse({ invalid: true })).toThrow();
  });

  it("rejects malformed event tags payload", () => {
    expect(() => eventTagsResponseSchema.parse([{}])).toThrow();
  });
});

describe("Gamma endpoint routing", () => {
  it("uses the default gamma endpoint", async () => {
    const requests: string[] = [];
    const fetch = vi.fn<[RequestInfo | URL, RequestInit | undefined], Promise<Response>>(
      (input) => {
        requests.push(String(input));
        return Promise.resolve(
          new Response(JSON.stringify([]), {
            status: 200,
            headers: { "content-type": "application/json" },
          }),
        );
      },
    );

    const client = new Polymarket({ fetch });
    await client.gamma.sports.listTeams();

    expect(requests[0]).toBe(`${DEFAULT_GAMMA_ENDPOINT}/teams`);
  });

  it("respects a custom gamma endpoint", async () => {
    const customGamma = "https://gamma.example.com";
    const requests: string[] = [];
    const fetch = vi.fn<[RequestInfo | URL, RequestInit | undefined], Promise<Response>>(
      (input) => {
        requests.push(String(input));
        return Promise.resolve(
          new Response(JSON.stringify([]), {
            status: 200,
            headers: { "content-type": "application/json" },
          }),
        );
      },
    );

    const client = new Polymarket({ fetch, gammaEndpoint: customGamma });
    await client.gamma.sports.listTeams();

    expect(requests[0]).toBe(`${customGamma}/teams`);
  });
});
