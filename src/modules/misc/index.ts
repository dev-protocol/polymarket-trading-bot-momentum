import type { z } from "zod";
import type { HttpClient } from "../../types.js";
import { serializeQuery } from "../../utils/query.js";
import { buildValidationError } from "../../utils/errors.js";
import {
  tradedParamsSchema,
  tradedResponseSchema,
  openInterestParamsSchema,
  openInterestResponseSchema,
  liveVolumeParamsSchema,
  liveVolumeResponseSchema,
  type TradedParams,
  type UserTraded,
  type OpenInterestParams,
  type OpenInterest,
  type LiveVolumeParams,
  type LiveVolume,
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

export type MiscModule = {
  getTraded: (params: TradedParams) => Promise<UserTraded>;
  getOpenInterest: (params?: OpenInterestParams) => Promise<OpenInterest[]>;
  getLiveVolume: (params: LiveVolumeParams) => Promise<LiveVolume[]>;
};

export const createMiscModule = (http: HttpClient): MiscModule => {
  const getTraded = async (params: unknown) => {
    const parsed = parseParams(tradedParamsSchema, params, "Invalid parameters for getTraded");
    const path = buildPath("/traded", parsed);
    const response = await http.get<unknown>(path);
    return parseResponse(tradedResponseSchema, response, "Invalid response for getTraded");
  };

  const getOpenInterest = async (params: unknown = {}) => {
    const parsed = parseParams(
      openInterestParamsSchema,
      params,
      "Invalid parameters for getOpenInterest",
    );
    const path = buildPath("/oi", parsed);
    const response = await http.get<unknown>(path);
    return parseResponse(
      openInterestResponseSchema,
      response,
      "Invalid response for getOpenInterest",
    );
  };

  const getLiveVolume = async (params: unknown) => {
    const parsed = parseParams(
      liveVolumeParamsSchema,
      params,
      "Invalid parameters for getLiveVolume",
    );
    const path = buildPath("/live-volume", parsed);
    const response = await http.get<unknown>(path);
    return parseResponse(liveVolumeResponseSchema, response, "Invalid response for getLiveVolume");
  };

  return Object.freeze({
    getTraded,
    getOpenInterest,
    getLiveVolume,
  });
};

export type {
  TradedParams,
  UserTraded,
  OpenInterestParams,
  OpenInterest,
  LiveVolumeParams,
  LiveVolume,
};
