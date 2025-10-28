import type { HttpClient, FetchLike, HttpError } from "./types.js";

type CreateHttpClientArgs = {
  baseUrl: string;
  fetch: FetchLike;
};

const resolveUrl = (baseUrl: string, path: string) => {
  const url = new URL(path, baseUrl);
  return url.toString();
};

const parseBody = async (response: Response): Promise<unknown> => {
  if (response.status === 204) {
    return undefined;
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return text.length > 0 ? text : undefined;
};

const toHttpError = (response: Response, body: unknown): HttpError => {
  const error = new Error(`Request failed with status ${response.status}`) as HttpError;
  error.status = response.status;
  error.statusText = response.statusText;
  error.body = body;
  return error;
};

const ensureFetch = (fetcher: FetchLike | undefined): FetchLike => {
  if (typeof fetcher !== "function") {
    throw new Error(
      "A Fetch implementation is required. Provide one via the client options if running outside of an environment with global fetch.",
    );
  }

  return fetcher;
};

export const createHttpClient = ({ baseUrl, fetch }: CreateHttpClientArgs): HttpClient => {
  const fetcher = ensureFetch(fetch);

  const request = async <T>(method: string, path: string, init?: RequestInit): Promise<T> => {
    const url = resolveUrl(baseUrl, path);
    try {
      const response = await fetcher(url, { ...init, method });
      const body = await parseBody(response);

      if (!response.ok) {
        throw toHttpError(response, body);
      }

      return body as T;
    } catch (error) {
      if (error instanceof Error && "status" in error) {
        throw error;
      }

      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Network error: ${message}`, { cause: error });
    }
  };

  const get = <T>(path: string, init?: RequestInit) => request<T>("GET", path, init);

  return Object.freeze({
    get,
  });
};
