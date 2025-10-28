import {
  positionsParamsSchema,
  positionsResponseSchema,
  tradesParamsSchema,
  tradesResponseSchema,
  activityParamsSchema,
  activityResponseSchema,
  holdersParamsSchema,
  holdersResponseSchema,
  valueParamsSchema,
  valueResponseSchema,
  type PositionsParams,
  type Position,
  type TradesParams,
  type Trade,
  type ActivityParams,
  type Activity,
  type HoldersParams,
  type HolderData,
  type ValueParams,
  type UserValue,
} from "./schemas.js";
import type { HttpClient } from "../../types.js";
import { serializeQuery } from "../../utils/query.js";
import { buildValidationError } from "../../utils/errors.js";
import type { z } from "zod";

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

export type CoreModule = {
  getPositions: (params: PositionsParams) => Promise<Position[]>;
  getTrades: (params?: TradesParams) => Promise<Trade[]>;
  getActivity: (params: ActivityParams) => Promise<Activity[]>;
  getHolders: (params: HoldersParams) => Promise<HolderData[]>;
  getValue: (params: ValueParams) => Promise<UserValue[]>;
};

export const createCoreModule = (http: HttpClient): CoreModule => {
  const getPositions = async (params: unknown) => {
    const parsed = parseParams(
      positionsParamsSchema,
      params,
      "Invalid parameters for getPositions",
    );
    const path = buildPath("/positions", parsed);
    const response = await http.get<unknown>(path);
    return parseResponse(positionsResponseSchema, response, "Invalid response for getPositions");
  };

  const getTrades = async (params: unknown = {}) => {
    const parsed = parseParams(tradesParamsSchema, params, "Invalid parameters for getTrades");
    const path = buildPath("/trades", parsed);
    const response = await http.get<unknown>(path);
    return parseResponse(tradesResponseSchema, response, "Invalid response for getTrades");
  };

  const getActivity = async (params: unknown) => {
    const parsed = parseParams(activityParamsSchema, params, "Invalid parameters for getActivity");
    const path = buildPath("/activity", parsed);
    const response = await http.get<unknown>(path);
    return parseResponse(activityResponseSchema, response, "Invalid response for getActivity");
  };

  const getHolders = async (params: unknown) => {
    const parsed = parseParams(holdersParamsSchema, params, "Invalid parameters for getHolders");
    const path = buildPath("/holders", parsed);
    const response = await http.get<unknown>(path);
    return parseResponse(holdersResponseSchema, response, "Invalid response for getHolders");
  };

  const getValue = async (params: unknown) => {
    const parsed = parseParams(valueParamsSchema, params, "Invalid parameters for getValue");
    const path = buildPath("/value", parsed);
    const response = await http.get<unknown>(path);
    return parseResponse(valueResponseSchema, response, "Invalid response for getValue");
  };

  return Object.freeze({
    getPositions,
    getTrades,
    getActivity,
    getHolders,
    getValue,
  });
};

export type {
  PositionsParams,
  Position,
  TradesParams,
  Trade,
  ActivityParams,
  Activity,
  HoldersParams,
  HolderData,
  ValueParams,
  UserValue,
};
