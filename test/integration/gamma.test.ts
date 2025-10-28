import { describe, expect, it } from "vitest";
import { Polymarket } from "../../src/index.js";

const client = new Polymarket();
const SAMPLE_EVENT_ID = 35723;
const SAMPLE_COMMENT_ID = 1975918;
const SAMPLE_USER_ADDRESS = "0x0b5793a556ceb3a38dcaaa3b262e45decba480cc";
const SAMPLE_SERIES_ID = 10388;
const SAMPLE_EVENT_SLUG = "chile-presidential-election-1st-round-winner";

describe("Polymarket gamma endpoints (integration)", () => {
  it("lists teams with limit", async () => {
    const result = await client.gamma.sports.listTeams({ limit: 1 });

    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      const team = result[0];
      expect(typeof team.id).toBe("number");
      expect("league" in team).toBe(true);
    }
  });

  it("fetches sports metadata", async () => {
    const result = await client.gamma.sports.getSportsMetadata();

    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      const entry = result[0];
      expect(typeof entry.sport).toBe("string");
      expect(typeof entry.image).toBe("string");
    }
  });

  it("performs a public search", async () => {
    const result = await client.gamma.search.publicSearch({ q: "election", limit_per_type: 1 });

    expect(result).toHaveProperty("pagination");
    expect(typeof result.pagination.hasMore).toBe("boolean");
  });

  it("lists comments for an event", async () => {
    const result = await client.gamma.comments.listComments({
      parent_entity_type: "Event",
      parent_entity_id: SAMPLE_EVENT_ID,
      limit: 3,
    });

    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      const comment = result[0];
      expect(typeof comment.id).toBe("string");
      expect(comment.parentEntityType === null || comment.parentEntityType === "Event").toBe(true);
    }
  });

  it("fetches a comment by id", async () => {
    const result = await client.gamma.comments.getCommentById(SAMPLE_COMMENT_ID, {
      get_positions: true,
    });

    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      const comment = result[0];
      expect(comment.id).toBe(String(SAMPLE_COMMENT_ID));
    }
  });

  it("fetches comments for a user address", async () => {
    const result = await client.gamma.comments.getCommentsByUserAddress(SAMPLE_USER_ADDRESS, {
      limit: 2,
    });

    expect(Array.isArray(result)).toBe(true);
  });

  it("lists series with filters", async () => {
    const result = await client.gamma.series.listSeries({ limit: 1 });

    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      const entry = result[0];
      expect(typeof entry.id).toBe("string");
      expect(
        Array.isArray(entry.events) || entry.events === null || entry.events === undefined,
      ).toBe(true);
    }
  });

  it("fetches a series by id", async () => {
    const result = await client.gamma.series.getSeriesById(SAMPLE_SERIES_ID, {
      include_chat: true,
    });

    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      const entry = result[0];
      expect(entry.id).toBe(String(SAMPLE_SERIES_ID));
    }
  });

  it("lists markets with filters", async () => {
    const result = await client.gamma.markets.listMarkets({ limit: 1, closed: false });

    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      const market = result[0];
      expect(typeof market.id).toBe("string");
      expect("conditionId" in market).toBe(true);
    }
  });

  it("fetches event by id", async () => {
    const result = await client.gamma.events.getEventById(SAMPLE_EVENT_ID, {
      include_chat: true,
      include_template: true,
    });

    expect(Array.isArray(result)).toBe(false);
    expect(result.id).toBe(String(SAMPLE_EVENT_ID));
    expect("markets" in result).toBe(true);
  });

  it("fetches event tags", async () => {
    const result = await client.gamma.events.getEventTags(SAMPLE_EVENT_ID);

    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      expect(typeof result[0]?.id).toBe("string");
    }
  });

  it("fetches event by slug", async () => {
    const result = await client.gamma.events.getEventBySlug(SAMPLE_EVENT_SLUG, {
      include_chat: true,
    });

    expect(Array.isArray(result)).toBe(false);
    expect(result.slug).toBe(SAMPLE_EVENT_SLUG);
  });
});
