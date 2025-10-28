import type { z } from "zod";
import type { HttpClient } from "../../types.js";
import { serializeQuery } from "../../utils/query.js";
import { buildValidationError } from "../../utils/errors.js";
import {
  listTeamsParamsSchema,
  listTeamsResponseSchema,
  sportsMetadataResponseSchema,
  searchParamsSchema,
  searchResponseSchema,
  listCommentsParamsSchema,
  getCommentByIdParamsSchema,
  getCommentsByUserAddressParamsSchema,
  commentIdSchema,
  commentUserAddressSchema,
  commentsResponseSchema,
  listSeriesParamsSchema,
  getSeriesByIdParamsSchema,
  listSeriesResponseSchema,
  seriesIdSchema,
  listMarketsParamsSchema,
  marketsResponseSchema,
  marketQueryDateSchema,
  eventIdSchema,
  eventSlugSchema,
  eventParamsSchema,
  eventResponseSchema,
  eventTagsResponseSchema,
  type ListTeamsParams,
  type Team,
  type SportsMetadata,
  type SearchParams,
  type SearchResponse,
  type ListCommentsParams,
  type Comment,
  type GetCommentByIdParams,
  type GetCommentsByUserAddressParams,
  type Series,
  type ListSeriesParams,
  type GetSeriesByIdParams,
  type ListMarketsParams,
  type Market,
  type EventParams,
  type Event,
  type EventTag,
} from "./schemas.js";

const buildPath = (path: string, params: Record<string, unknown>) => {
  const query = serializeQuery(params);
  return query.length > 0 ? `${path}?${query}` : path;
};

const parseParams = <TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  params: unknown,
  message: string,
): z.infer<TSchema> => {
  try {
    return schema.parse(params);
  } catch (error) {
    throw buildValidationError(message, error);
  }
};

const parseResponse = <TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  data: unknown,
  message: string,
): z.infer<TSchema> => {
  try {
    return schema.parse(data);
  } catch (error) {
    throw buildValidationError(message, error);
  }
};

export type GammaSportsModule = {
  listTeams: (params?: ListTeamsParams) => Promise<Team[]>;
  getSportsMetadata: () => Promise<SportsMetadata[]>;
};

export type GammaSearchModule = {
  publicSearch: (params: SearchParams) => Promise<SearchResponse>;
};

export type GammaCommentsModule = {
  listComments: (params?: ListCommentsParams) => Promise<Comment[]>;
  getCommentById: (id: number, params?: GetCommentByIdParams) => Promise<Comment[]>;
  getCommentsByUserAddress: (
    userAddress: string,
    params?: GetCommentsByUserAddressParams,
  ) => Promise<Comment[]>;
};

export type GammaSeriesModule = {
  listSeries: (params?: ListSeriesParams) => Promise<Series[]>;
  getSeriesById: (id: number, params?: GetSeriesByIdParams) => Promise<Series[]>;
};

export type GammaMarketsModule = {
  listMarkets: (params?: ListMarketsParams) => Promise<Market[]>;
};

export type GammaEventsModule = {
  getEventById: (id: number, params?: EventParams) => Promise<Event>;
  getEventTags: (id: number) => Promise<EventTag[]>;
  getEventBySlug: (slug: string, params?: EventParams) => Promise<Event>;
};

export type GammaModule = {
  sports: GammaSportsModule;
  search: GammaSearchModule;
  comments: GammaCommentsModule;
  series: GammaSeriesModule;
  markets: GammaMarketsModule;
  events: GammaEventsModule;
};

export const createGammaModule = (http: HttpClient): GammaModule => {
  const listTeams = async (params: unknown = {}) => {
    const parsed = parseParams(
      listTeamsParamsSchema,
      params,
      "Invalid parameters for gamma.sports.listTeams",
    );
    const path = buildPath("/teams", parsed);
    const response = await http.get<unknown>(path);
    return parseResponse(
      listTeamsResponseSchema,
      response,
      "Invalid response for gamma.sports.listTeams",
    );
  };

  const getSportsMetadata = async () => {
    const response = await http.get<unknown>("/sports");
    return parseResponse(
      sportsMetadataResponseSchema,
      response,
      "Invalid response for gamma.sports.getSportsMetadata",
    );
  };

  const publicSearch = async (params: unknown) => {
    const parsed = parseParams(
      searchParamsSchema,
      params,
      "Invalid parameters for gamma.search.publicSearch",
    );
    const path = buildPath("/public-search", parsed);
    const response = await http.get<unknown>(path);
    return parseResponse(
      searchResponseSchema,
      response,
      "Invalid response for gamma.search.publicSearch",
    );
  };

  const listComments = async (params: unknown = {}) => {
    const parsed = parseParams(
      listCommentsParamsSchema,
      params,
      "Invalid parameters for gamma.comments.listComments",
    );
    const path = buildPath("/comments", parsed);
    const response = await http.get<unknown>(path);
    return parseResponse(
      commentsResponseSchema,
      response,
      "Invalid response for gamma.comments.listComments",
    );
  };

  const getCommentById = async (id: unknown, params: unknown = {}) => {
    const parsedId = parseParams(
      commentIdSchema,
      id,
      "Invalid comment id for gamma.comments.getCommentById",
    );
    const parsedParams = parseParams(
      getCommentByIdParamsSchema,
      params,
      "Invalid parameters for gamma.comments.getCommentById",
    );
    const path = buildPath(`/comments/${parsedId}`, parsedParams);
    const response = await http.get<unknown>(path);
    return parseResponse(
      commentsResponseSchema,
      response,
      "Invalid response for gamma.comments.getCommentById",
    );
  };

  const getCommentsByUserAddress = async (userAddress: unknown, params: unknown = {}) => {
    const parsedAddress = parseParams(
      commentUserAddressSchema,
      userAddress,
      "Invalid user address for gamma.comments.getCommentsByUserAddress",
    );
    const parsedParams = parseParams(
      getCommentsByUserAddressParamsSchema,
      params,
      "Invalid parameters for gamma.comments.getCommentsByUserAddress",
    );
    const path = buildPath(
      `/comments/user_address/${encodeURIComponent(parsedAddress)}`,
      parsedParams,
    );
    const response = await http.get<unknown>(path);
    return parseResponse(
      commentsResponseSchema,
      response,
      "Invalid response for gamma.comments.getCommentsByUserAddress",
    );
  };

  const listSeries = async (params: unknown = {}) => {
    const parsed = parseParams(
      listSeriesParamsSchema,
      params,
      "Invalid parameters for gamma.series.listSeries",
    );
    const path = buildPath("/series", parsed);
    const response = await http.get<unknown>(path);
    return parseResponse(
      listSeriesResponseSchema,
      response,
      "Invalid response for gamma.series.listSeries",
    );
  };

  const getSeriesById = async (id: unknown, params: unknown = {}) => {
    const parsedId = parseParams(
      seriesIdSchema,
      id,
      "Invalid series id for gamma.series.getSeriesById",
    );
    const parsedParams = parseParams(
      getSeriesByIdParamsSchema,
      params,
      "Invalid parameters for gamma.series.getSeriesById",
    );
    const path = buildPath(`/series/${parsedId}`, parsedParams);
    const response = await http.get<unknown>(path);
    const normalized = Array.isArray(response) ? response : [response];
    return parseResponse(
      listSeriesResponseSchema,
      normalized,
      "Invalid response for gamma.series.getSeriesById",
    );
  };

  const listMarkets = async (params: unknown = {}) => {
    const parsed = parseParams(
      listMarketsParamsSchema,
      params,
      "Invalid parameters for gamma.markets.listMarkets",
    );
    const normalizedDates = Object.fromEntries(
      Object.entries(parsed).map(([key, value]) => {
        if (key.endsWith("_date_min") || key.endsWith("_date_max")) {
          marketQueryDateSchema.parse(value);
        }
        return [key, value];
      }),
    );
    const path = buildPath("/markets", normalizedDates);
    const response = await http.get<unknown>(path);
    return parseResponse(
      marketsResponseSchema,
      response,
      "Invalid response for gamma.markets.listMarkets",
    );
  };

  const getEventById = async (id: unknown, params: unknown = {}) => {
    const parsedId = parseParams(
      eventIdSchema,
      id,
      "Invalid event id for gamma.events.getEventById",
    );
    const parsedParams = parseParams(
      eventParamsSchema,
      params,
      "Invalid parameters for gamma.events.getEventById",
    );
    const path = buildPath(`/events/${parsedId}`, parsedParams);
    const response = await http.get<unknown>(path);
    return parseResponse(
      eventResponseSchema,
      response,
      "Invalid response for gamma.events.getEventById",
    );
  };

  const getEventTags = async (id: unknown) => {
    const parsedId = parseParams(
      eventIdSchema,
      id,
      "Invalid event id for gamma.events.getEventTags",
    );
    const path = `/events/${parsedId}/tags`;
    const response = await http.get<unknown>(path);
    return parseResponse(
      eventTagsResponseSchema,
      response,
      "Invalid response for gamma.events.getEventTags",
    );
  };

  const getEventBySlug = async (slug: unknown, params: unknown = {}) => {
    const parsedSlug = parseParams(
      eventSlugSchema,
      slug,
      "Invalid slug for gamma.events.getEventBySlug",
    );
    const parsedParams = parseParams(
      eventParamsSchema,
      params,
      "Invalid parameters for gamma.events.getEventBySlug",
    );
    const path = buildPath(`/events/slug/${encodeURIComponent(parsedSlug)}`, parsedParams);
    const response = await http.get<unknown>(path);
    return parseResponse(
      eventResponseSchema,
      response,
      "Invalid response for gamma.events.getEventBySlug",
    );
  };

  return Object.freeze({
    sports: Object.freeze({
      listTeams,
      getSportsMetadata,
    }),
    search: Object.freeze({
      publicSearch,
    }),
    comments: Object.freeze({
      listComments,
      getCommentById,
      getCommentsByUserAddress,
    }),
    series: Object.freeze({
      listSeries,
      getSeriesById,
    }),
    markets: Object.freeze({
      listMarkets,
    }),
    events: Object.freeze({
      getEventById,
      getEventTags,
      getEventBySlug,
    }),
  });
};

export type {
  ListTeamsParams,
  Team,
  SportsMetadata,
  SearchParams,
  SearchResponse,
  ListCommentsParams,
  Comment,
  GetCommentByIdParams,
  GetCommentsByUserAddressParams,
  Series,
  ListSeriesParams,
  GetSeriesByIdParams,
  ListMarketsParams,
  Market,
  EventParams,
  Event,
  EventTag,
};
