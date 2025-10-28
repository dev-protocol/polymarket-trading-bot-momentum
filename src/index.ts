import { DEFAULT_DATA_ENDPOINT, DEFAULT_GAMMA_ENDPOINT } from "./constants.js";
import { createHttpClient } from "./http.js";
import { createDataModule } from "./modules/data.js";
import type { DataModule } from "./modules/data.js";
import { createGammaModule } from "./modules/gamma/index.js";
import type { GammaModule } from "./modules/gamma/index.js";
import type { HealthCheckResponse, PolymarketClientOptions } from "./types.js";

type ResolvedConfig = {
  dataEndpoint: string;
  gammaEndpoint: string;
};

export class Polymarket {
  readonly config: Readonly<ResolvedConfig>;
  readonly data: DataModule;
  readonly gamma: GammaModule;
  readonly health: () => Promise<HealthCheckResponse>;

  constructor(options: PolymarketClientOptions = {}) {
    const dataEndpoint = options.dataEndpoint ?? DEFAULT_DATA_ENDPOINT;
    const gammaEndpoint = options.gammaEndpoint ?? DEFAULT_GAMMA_ENDPOINT;
    const fetchImpl = options.fetch ?? globalThis.fetch;

    const dataHttp = createHttpClient({ baseUrl: dataEndpoint, fetch: fetchImpl });
    const gammaHttp = createHttpClient({ baseUrl: gammaEndpoint, fetch: fetchImpl });

    this.config = Object.freeze({ dataEndpoint, gammaEndpoint });
    this.data = createDataModule(dataHttp);
    this.gamma = createGammaModule(gammaHttp);
    this.health = () => dataHttp.get<HealthCheckResponse>("/");
  }
}

export { DEFAULT_DATA_ENDPOINT, DEFAULT_GAMMA_ENDPOINT } from "./constants.js";
export type { HealthCheckResponse, HttpError, PolymarketClientOptions } from "./types.js";
export type {
  CoreModule,
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
} from "./modules/core/index.js";
export type {
  MiscModule,
  TradedParams,
  UserTraded,
  OpenInterestParams,
  OpenInterest,
  LiveVolumeParams,
  LiveVolume,
} from "./modules/misc/index.js";
export type {
  GammaModule,
  GammaSportsModule,
  GammaSearchModule,
  GammaCommentsModule,
  GammaSeriesModule,
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
} from "./modules/gamma/index.js";
