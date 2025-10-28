export type FetchLike = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export type PolymarketClientOptions = {
  dataEndpoint?: string;
  gammaEndpoint?: string;
  fetch?: FetchLike;
};

export type HttpClient = {
  get<T>(path: string, init?: RequestInit): Promise<T>;
};

export type HttpError = Error & {
  status: number;
  statusText: string;
  body?: unknown;
};

export type HealthCheckResponse = {
  data: string;
};
