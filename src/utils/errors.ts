import { ZodError } from "zod";

export const buildValidationError = (message: string, error?: unknown) => {
  if (error instanceof ZodError) {
    const detail = error.issues
      .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
      .join("; ");
    return new Error(`${message}: ${detail}`, { cause: error });
  }

  return new Error(message, { cause: error });
};
