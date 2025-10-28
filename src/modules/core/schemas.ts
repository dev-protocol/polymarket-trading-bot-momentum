import { z } from "zod";

const addressSchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/, "Expected 0x-prefixed 40-hex character address");

const conditionIdSchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{64}$/, "Expected 0x-prefixed 64-hex character condition id");

const positiveInt = (min: number, max?: number) => {
  const schema = z.number().int().min(min);
  return typeof max === "number" ? schema.max(max) : schema;
};

const nonNegativeNumber = z.number().min(0);

const sortDirectionSchema = z.enum(["ASC", "DESC"]);

const positionsSortBySchema = z.enum([
  "CURRENT",
  "INITIAL",
  "TOKENS",
  "CASHPNL",
  "PERCENTPNL",
  "TITLE",
  "RESOLVING",
  "PRICE",
  "AVGPRICE",
]);

const tradesFilterTypeSchema = z.enum(["CASH", "TOKENS"]);

const tradeSideSchema = z.enum(["BUY", "SELL"]);
const optionalTradeSideSchema = z.preprocess(
  (value) => (value === "" || value === null ? undefined : value),
  tradeSideSchema.optional(),
);

const activityTypeSchema = z.enum(["TRADE", "SPLIT", "MERGE", "REDEEM", "REWARD", "CONVERSION"]);

const activitySortBySchema = z.enum(["TIMESTAMP", "TOKENS", "CASH"]);

export const positionsParamsSchema = z
  .object({
    user: addressSchema,
    market: z.array(conditionIdSchema).nonempty().optional(),
    eventId: z.array(z.number().int()).nonempty().optional(),
    sizeThreshold: nonNegativeNumber.default(1),
    redeemable: z.boolean().default(false),
    mergeable: z.boolean().default(false),
    limit: positiveInt(0, 500).default(100),
    offset: positiveInt(0, 10000).default(0),
    sortBy: positionsSortBySchema.default("TOKENS"),
    sortDirection: sortDirectionSchema.default("DESC"),
    title: z.string().max(100).optional(),
  })
  .superRefine((value, ctx) => {
    if (value.market && value.eventId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Parameters 'market' and 'eventId' cannot be used together",
        path: ["market"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Parameters 'market' and 'eventId' cannot be used together",
        path: ["eventId"],
      });
    }
  });

export const positionSchema = z.object({
  proxyWallet: addressSchema,
  asset: z.string(),
  conditionId: conditionIdSchema,
  size: z.number(),
  avgPrice: z.number(),
  initialValue: z.number(),
  currentValue: z.number(),
  cashPnl: z.number(),
  percentPnl: z.number(),
  totalBought: z.number(),
  realizedPnl: z.number(),
  percentRealizedPnl: z.number(),
  curPrice: z.number(),
  redeemable: z.boolean(),
  mergeable: z.boolean(),
  title: z.string(),
  slug: z.string(),
  icon: z.string(),
  eventSlug: z.string(),
  outcome: z.string(),
  outcomeIndex: z.number().int(),
  oppositeOutcome: z.string(),
  oppositeAsset: z.string(),
  endDate: z.string(),
  negativeRisk: z.boolean(),
});

export const positionsResponseSchema = z.array(positionSchema);

export const tradesParamsSchema = z
  .object({
    limit: positiveInt(0, 10000).default(100),
    offset: positiveInt(0, 10000).default(0),
    takerOnly: z.boolean().default(true),
    filterType: tradesFilterTypeSchema.optional(),
    filterAmount: nonNegativeNumber.optional(),
    market: z.array(conditionIdSchema).nonempty().optional(),
    eventId: z.array(z.number().int()).nonempty().optional(),
    user: addressSchema.optional(),
    side: tradeSideSchema.optional(),
  })
  .superRefine((value, ctx) => {
    if (value.market && value.eventId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Parameters 'market' and 'eventId' cannot be used together",
        path: ["market"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Parameters 'market' and 'eventId' cannot be used together",
        path: ["eventId"],
      });
    }

    if (
      (value.filterType && value.filterAmount === undefined) ||
      (!value.filterType && value.filterAmount !== undefined)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Parameters 'filterType' and 'filterAmount' must be provided together",
        path: ["filterType"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Parameters 'filterType' and 'filterAmount' must be provided together",
        path: ["filterAmount"],
      });
    }
  });

export const tradeSchema = z.object({
  proxyWallet: addressSchema,
  side: tradeSideSchema,
  asset: z.string(),
  conditionId: conditionIdSchema,
  size: z.number(),
  price: z.number(),
  timestamp: z.number().int(),
  title: z.string(),
  slug: z.string(),
  icon: z.string(),
  eventSlug: z.string(),
  outcome: z.string(),
  outcomeIndex: z.number().int(),
  name: z.string(),
  pseudonym: z.string(),
  bio: z.string(),
  profileImage: z.string(),
  profileImageOptimized: z.string(),
  transactionHash: z.string(),
});

export const tradesResponseSchema = z.array(tradeSchema);

export const activityParamsSchema = z
  .object({
    user: addressSchema,
    limit: positiveInt(0, 500).default(100),
    offset: positiveInt(0, 10000).default(0),
    market: z.array(conditionIdSchema).nonempty().optional(),
    eventId: z.array(z.number().int()).nonempty().optional(),
    type: z.array(activityTypeSchema).nonempty().optional(),
    start: z.number().int().min(0).optional(),
    end: z.number().int().min(0).optional(),
    sortBy: activitySortBySchema.default("TIMESTAMP"),
    sortDirection: sortDirectionSchema.default("DESC"),
    side: tradeSideSchema.optional(),
  })
  .superRefine((value, ctx) => {
    if (value.market && value.eventId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Parameters 'market' and 'eventId' cannot be used together",
        path: ["market"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Parameters 'market' and 'eventId' cannot be used together",
        path: ["eventId"],
      });
    }
  });

export const activitySchema = z.object({
  proxyWallet: addressSchema,
  timestamp: z.number().int(),
  conditionId: conditionIdSchema,
  type: activityTypeSchema,
  size: z.number(),
  usdcSize: z.number(),
  transactionHash: z.string(),
  price: z.number(),
  asset: z.string(),
  side: optionalTradeSideSchema,
  outcomeIndex: z.number().int(),
  title: z.string(),
  slug: z.string(),
  icon: z.string(),
  eventSlug: z.string(),
  outcome: z.string(),
  name: z.string(),
  pseudonym: z.string(),
  bio: z.string(),
  profileImage: z.string(),
  profileImageOptimized: z.string(),
});

export const activityResponseSchema = z.array(activitySchema);

export const holdersParamsSchema = z.object({
  market: z.array(conditionIdSchema).nonempty(),
  limit: positiveInt(0, 500).default(100),
  minBalance: positiveInt(0, 999999).default(1),
});

export const holderSchema = z.object({
  proxyWallet: addressSchema,
  bio: z.string(),
  asset: z.string(),
  pseudonym: z.string(),
  amount: z.number(),
  displayUsernamePublic: z.boolean(),
  outcomeIndex: z.number().int(),
  name: z.string(),
  profileImage: z.string(),
  profileImageOptimized: z.string(),
});

export const holderDataSchema = z.object({
  token: z.string(),
  holders: z.array(holderSchema),
});

export const holdersResponseSchema = z.array(holderDataSchema);

export const valueParamsSchema = z.object({
  user: addressSchema,
  market: z.array(conditionIdSchema).nonempty().optional(),
});

export const userValueSchema = z.object({
  user: addressSchema,
  value: z.number(),
});

export const valueResponseSchema = z.array(userValueSchema);

export type PositionsParams = z.infer<typeof positionsParamsSchema>;
export type Position = z.infer<typeof positionSchema>;
export type TradesParams = z.infer<typeof tradesParamsSchema>;
export type Trade = z.infer<typeof tradeSchema>;
export type ActivityParams = z.infer<typeof activityParamsSchema>;
export type Activity = z.infer<typeof activitySchema>;
export type HoldersParams = z.infer<typeof holdersParamsSchema>;
export type Holder = z.infer<typeof holderSchema>;
export type HolderData = z.infer<typeof holderDataSchema>;
export type ValueParams = z.infer<typeof valueParamsSchema>;
export type UserValue = z.infer<typeof userValueSchema>;
