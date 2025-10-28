import { z } from "zod";

const addressSchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/, "Expected 0x-prefixed 40-hex character address");

const conditionIdSchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{64}$/, "Expected 0x-prefixed 64-hex character condition id");

const marketIdentifierSchema = z.union([
  conditionIdSchema,
  z.string().regex(/^[A-Z_]+$/, "Expected 0x-prefixed condition id or uppercase identifier"),
]);

export const tradedParamsSchema = z.object({
  user: addressSchema,
});

export const tradedResponseSchema = z.object({
  user: addressSchema,
  traded: z.number().int().min(0),
});

export const openInterestParamsSchema = z.object({
  market: z.array(conditionIdSchema).nonempty().optional(),
});

export const openInterestSchema = z.object({
  market: marketIdentifierSchema,
  value: z.number(),
});

export const openInterestResponseSchema = z.array(openInterestSchema);

export const liveVolumeParamsSchema = z.object({
  id: z.number().int().min(1),
});

export const liveVolumeSchema = z.object({
  total: z.number(),
  markets: z.array(
    z.object({
      market: conditionIdSchema,
      value: z.number(),
    }),
  ),
});

export const liveVolumeResponseSchema = z.array(liveVolumeSchema);

export type TradedParams = z.infer<typeof tradedParamsSchema>;
export type UserTraded = z.infer<typeof tradedResponseSchema>;
export type OpenInterestParams = z.infer<typeof openInterestParamsSchema>;
export type OpenInterest = z.infer<typeof openInterestSchema>;
export type LiveVolumeParams = z.infer<typeof liveVolumeParamsSchema>;
export type LiveVolume = z.infer<typeof liveVolumeSchema>;
