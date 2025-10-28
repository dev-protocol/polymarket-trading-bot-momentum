import { z } from "zod";

const nonNegativeInt = z.number().int().min(0);
const optionalNullableString = z.string().optional().nullable();
const optionalNullableBoolean = z.boolean().optional().nullable();
const optionalNullableNumber = z.number().optional().nullable();
const optionalNullableInt = z.number().int().optional().nullable();
const addressSchema = z.string().regex(/^0x[a-fA-F0-9]{40}$/);
const conditionIdSchema = z.string().regex(/^0x[a-fA-F0-9]{64}$/);

export const listTeamsParamsSchema = z.object({
  limit: nonNegativeInt.optional(),
  offset: nonNegativeInt.optional(),
  order: z.string().optional(),
  ascending: z.boolean().optional(),
  league: z.array(z.string()).min(1).optional(),
  name: z.array(z.string()).min(1).optional(),
  abbreviation: z.array(z.string()).min(1).optional(),
});

export const teamSchema = z
  .object({
    id: z.number().int(),
    name: optionalNullableString,
    league: optionalNullableString,
    record: optionalNullableString,
    logo: optionalNullableString,
    abbreviation: optionalNullableString,
    alias: optionalNullableString,
    createdAt: optionalNullableString,
    updatedAt: optionalNullableString,
    providerId: optionalNullableInt,
  })
  .passthrough();

export const listTeamsResponseSchema = z.array(teamSchema);

export const sportsMetadataSchema = z.object({
  sport: z.string(),
  image: z.string(),
  resolution: z.string(),
  ordering: z.string(),
  tags: z.string(),
  series: z.string(),
});

export const sportsMetadataResponseSchema = z.array(sportsMetadataSchema);

export const searchParamsSchema = z.object({
  q: z.string().min(1),
  cache: z.boolean().optional(),
  events_status: z.string().optional(),
  limit_per_type: nonNegativeInt.optional(),
  page: nonNegativeInt.optional(),
  events_tag: z.array(z.string()).min(1).optional(),
  keep_closed_markets: nonNegativeInt.optional(),
  sort: z.string().optional(),
  ascending: z.boolean().optional(),
  search_tags: z.boolean().optional(),
  search_profiles: z.boolean().optional(),
  recurrence: z.string().optional(),
  exclude_tag_id: z.array(z.number().int()).min(1).optional(),
  optimized: z.boolean().optional(),
});

const optimizedImageSchema = z.record(z.string(), z.unknown());

const eventSchema = z
  .object({
    id: z.string(),
    ticker: optionalNullableString,
    slug: optionalNullableString,
    title: optionalNullableString,
    subtitle: optionalNullableString,
    description: optionalNullableString,
    resolutionSource: optionalNullableString,
    startDate: optionalNullableString,
    creationDate: optionalNullableString,
    endDate: optionalNullableString,
    image: optionalNullableString,
    icon: optionalNullableString,
    active: optionalNullableBoolean,
    closed: optionalNullableBoolean,
    archived: optionalNullableBoolean,
    new: optionalNullableBoolean,
    featured: optionalNullableBoolean,
    restricted: optionalNullableBoolean,
    liquidity: optionalNullableNumber,
    volume: optionalNullableNumber,
    openInterest: optionalNullableNumber,
    sortBy: optionalNullableString,
    category: optionalNullableString,
    subcategory: optionalNullableString,
    isTemplate: optionalNullableBoolean,
    templateVariables: optionalNullableString,
    published_at: optionalNullableString,
    createdBy: optionalNullableString,
    updatedBy: optionalNullableString,
    createdAt: optionalNullableString,
    updatedAt: optionalNullableString,
    commentsEnabled: optionalNullableBoolean,
    competitive: optionalNullableNumber,
    volume24hr: optionalNullableNumber,
    volume1wk: optionalNullableNumber,
    volume1mo: optionalNullableNumber,
    volume1yr: optionalNullableNumber,
    featuredImage: optionalNullableString,
    disqusThread: optionalNullableString,
    parentEvent: optionalNullableString,
    enableOrderBook: optionalNullableBoolean,
    liquidityAmm: optionalNullableNumber,
    liquidityClob: optionalNullableNumber,
    negRisk: optionalNullableBoolean,
    negRiskMarketID: optionalNullableString,
    negRiskFeeBips: optionalNullableInt,
    commentCount: optionalNullableInt,
    imageOptimized: optimizedImageSchema.optional(),
    iconOptimized: optimizedImageSchema.optional(),
    featuredImageOptimized: optimizedImageSchema.optional(),
    subEvents: z.array(z.string()).nullable().optional(),
    markets: z.array(z.record(z.string(), z.unknown())).nullable().optional(),
    series: z.array(z.record(z.string(), z.unknown())).nullable().optional(),
    categories: z.array(z.record(z.string(), z.unknown())).nullable().optional(),
    collections: z.array(z.record(z.string(), z.unknown())).nullable().optional(),
    tags: z.array(z.record(z.string(), z.unknown())).nullable().optional(),
    cyom: optionalNullableBoolean,
    closedTime: optionalNullableString,
    showAllOutcomes: optionalNullableBoolean,
    showMarketImages: optionalNullableBoolean,
    automaticallyResolved: optionalNullableBoolean,
    enableNegRisk: optionalNullableBoolean,
    automaticallyActive: optionalNullableBoolean,
    eventDate: optionalNullableString,
    startTime: optionalNullableString,
    eventWeek: optionalNullableInt,
    seriesSlug: optionalNullableString,
    score: optionalNullableString,
    elapsed: optionalNullableString,
    period: optionalNullableString,
    live: optionalNullableBoolean,
    ended: optionalNullableBoolean,
    finishedTimestamp: optionalNullableString,
    gmpChartMode: optionalNullableString,
    eventCreators: z.array(z.record(z.string(), z.unknown())).nullable().optional(),
    tweetCount: optionalNullableInt,
    chats: z.array(z.record(z.string(), z.unknown())).nullable().optional(),
    featuredOrder: optionalNullableInt,
    estimateValue: optionalNullableBoolean,
    cantEstimate: optionalNullableBoolean,
    estimatedValue: optionalNullableString,
    templates: z.array(z.record(z.string(), z.unknown())).nullable().optional(),
    spreadsMainLine: optionalNullableNumber,
    totalsMainLine: optionalNullableNumber,
    carouselMap: optionalNullableString,
    pendingDeployment: optionalNullableBoolean,
    deploying: optionalNullableBoolean,
    deployingTimestamp: optionalNullableString,
    scheduledDeploymentTimestamp: optionalNullableString,
    gameStatus: optionalNullableString,
  })
  .passthrough();

const tagSchema = z
  .object({
    id: z.string(),
    label: z.string(),
    slug: z.string(),
    event_count: z.number().int(),
  })
  .passthrough();

const profileSchema = z
  .object({
    id: z.string(),
    name: optionalNullableString,
    user: optionalNullableInt,
    referral: optionalNullableString,
    createdBy: optionalNullableInt,
    updatedBy: optionalNullableInt,
    createdAt: optionalNullableString,
    updatedAt: optionalNullableString,
    utmSource: optionalNullableString,
    utmMedium: optionalNullableString,
    utmCampaign: optionalNullableString,
    utmContent: optionalNullableString,
    utmTerm: optionalNullableString,
    walletActivated: optionalNullableBoolean,
    pseudonym: optionalNullableString,
    displayUsernamePublic: optionalNullableBoolean,
    profileImage: optionalNullableString,
    bio: optionalNullableString,
    proxyWallet: optionalNullableString,
    profileImageOptimized: optimizedImageSchema.optional(),
    isCloseOnly: optionalNullableBoolean,
    isCertReq: optionalNullableBoolean,
    certReqDate: optionalNullableString,
  })
  .passthrough();

const paginationSchema = z.object({
  hasMore: z.boolean(),
  totalResults: z.number().int(),
});

const imageOptimizationDetailsSchema = z
  .object({
    id: optionalNullableString,
    imageUrlSource: optionalNullableString,
    imageUrlOptimized: optionalNullableString,
    imageSizeKbSource: optionalNullableNumber,
    imageSizeKbOptimized: optionalNullableNumber,
    imageOptimizedComplete: optionalNullableBoolean,
    imageOptimizedLastUpdated: optionalNullableString,
    relID: optionalNullableInt,
    field: optionalNullableString,
    relname: optionalNullableString,
  })
  .passthrough();

const commentPositionSchema = z
  .object({
    tokenId: optionalNullableString,
    positionSize: optionalNullableString,
  })
  .passthrough();

const commentProfileSchema = z
  .object({
    name: optionalNullableString,
    pseudonym: optionalNullableString,
    displayUsernamePublic: optionalNullableBoolean,
    bio: optionalNullableString,
    isMod: optionalNullableBoolean,
    isCreator: optionalNullableBoolean,
    proxyWallet: optionalNullableString,
    baseAddress: optionalNullableString,
    profileImage: optionalNullableString,
    profileImageOptimized: imageOptimizationDetailsSchema.optional().nullable(),
    positions: z.array(commentPositionSchema).optional().nullable(),
  })
  .passthrough();

const commentReactionSchema = z
  .object({
    id: optionalNullableString,
    commentID: optionalNullableInt,
    reactionType: optionalNullableString,
    icon: optionalNullableString,
    userAddress: optionalNullableString,
    createdAt: optionalNullableString,
    profile: commentProfileSchema.optional(),
  })
  .passthrough();

export const commentSchema = z
  .object({
    id: z.string(),
    body: optionalNullableString,
    parentEntityType: optionalNullableString,
    parentEntityID: optionalNullableInt,
    parentCommentID: optionalNullableString,
    userAddress: optionalNullableString,
    replyAddress: optionalNullableString,
    createdAt: optionalNullableString,
    updatedAt: optionalNullableString,
    profile: commentProfileSchema.optional(),
    reactions: z.array(commentReactionSchema).optional().nullable(),
    reportCount: optionalNullableInt,
    reactionCount: optionalNullableInt,
  })
  .passthrough();

export const searchResponseSchema = z.object({
  events: z.array(eventSchema).nullable().optional(),
  tags: z.array(tagSchema).nullable().optional(),
  profiles: z.array(profileSchema).nullable().optional(),
  pagination: paginationSchema,
});

const parentEntityTypeSchema = z.enum(["Event", "Series", "market"]);

export const listCommentsParamsSchema = z.object({
  limit: nonNegativeInt.optional(),
  offset: nonNegativeInt.optional(),
  order: z.string().optional(),
  ascending: z.boolean().optional(),
  parent_entity_type: parentEntityTypeSchema.optional(),
  parent_entity_id: z.number().int().optional(),
  get_positions: z.boolean().optional(),
  holders_only: z.boolean().optional(),
});

export const getCommentByIdParamsSchema = z.object({
  get_positions: z.boolean().optional(),
});

export const getCommentsByUserAddressParamsSchema = z.object({
  limit: nonNegativeInt.optional(),
  offset: nonNegativeInt.optional(),
  order: z.string().optional(),
  ascending: z.boolean().optional(),
});

export const commentIdSchema = z.number().int().nonnegative();
export const commentUserAddressSchema = addressSchema;
export const commentsResponseSchema = z.array(commentSchema);

const seriesTagSchema = z
  .object({
    id: z.string(),
    label: optionalNullableString,
    slug: optionalNullableString,
    forceShow: optionalNullableBoolean,
    publishedAt: optionalNullableString,
    createdBy: optionalNullableInt,
    updatedBy: optionalNullableInt,
    createdAt: optionalNullableString,
    updatedAt: optionalNullableString,
    forceHide: optionalNullableBoolean,
    isCarousel: optionalNullableBoolean,
  })
  .passthrough();

const seriesChatSchema = z
  .object({
    id: z.string(),
    channelId: optionalNullableString,
    channelName: optionalNullableString,
    channelImage: optionalNullableString,
    live: optionalNullableBoolean,
    startTime: optionalNullableString,
    endTime: optionalNullableString,
  })
  .passthrough();

export const seriesSchema = z
  .object({
    id: z.string(),
    ticker: optionalNullableString,
    slug: optionalNullableString,
    title: optionalNullableString,
    subtitle: optionalNullableString,
    seriesType: optionalNullableString,
    recurrence: optionalNullableString,
    description: optionalNullableString,
    image: optionalNullableString,
    icon: optionalNullableString,
    layout: optionalNullableString,
    active: optionalNullableBoolean,
    closed: optionalNullableBoolean,
    archived: optionalNullableBoolean,
    new: optionalNullableBoolean,
    featured: optionalNullableBoolean,
    restricted: optionalNullableBoolean,
    isTemplate: optionalNullableBoolean,
    templateVariables: z.any().optional().nullable(),
    publishedAt: optionalNullableString,
    createdBy: optionalNullableString,
    updatedBy: optionalNullableString,
    createdAt: optionalNullableString,
    updatedAt: optionalNullableString,
    commentsEnabled: optionalNullableBoolean,
    competitive: optionalNullableString,
    volume24hr: optionalNullableNumber,
    volume: optionalNullableNumber,
    liquidity: optionalNullableNumber,
    startDate: optionalNullableString,
    pythTokenID: optionalNullableString,
    cgAssetName: optionalNullableString,
    score: optionalNullableInt,
    events: z.array(eventSchema).optional().nullable(),
    collections: z.array(z.record(z.string(), z.unknown())).optional().nullable(),
    categories: z.array(z.record(z.string(), z.unknown())).optional().nullable(),
    tags: z.array(seriesTagSchema).optional().nullable(),
    commentCount: optionalNullableInt,
    chats: z.array(seriesChatSchema).optional().nullable(),
  })
  .passthrough();

export const listSeriesParamsSchema = z.object({
  limit: nonNegativeInt.optional(),
  offset: nonNegativeInt.optional(),
  order: z.string().optional(),
  ascending: z.boolean().optional(),
  slug: z.array(z.string()).min(1).optional(),
  categories_ids: z.array(z.number().int()).min(1).optional(),
  categories_labels: z.array(z.string()).min(1).optional(),
  closed: z.boolean().optional(),
  include_chat: z.boolean().optional(),
  recurrence: z.string().optional(),
});

export const getSeriesByIdParamsSchema = z.object({
  include_chat: z.boolean().optional(),
});

export const seriesIdSchema = z.number().int().nonnegative();
export const listSeriesResponseSchema = z.array(seriesSchema);

export const listMarketsParamsSchema = z.object({
  limit: nonNegativeInt.optional(),
  offset: nonNegativeInt.optional(),
  order: z.string().optional(),
  ascending: z.boolean().optional(),
  id: z.array(z.number().int()).min(1).optional(),
  slug: z.array(z.string()).min(1).optional(),
  clob_token_ids: z.array(z.string()).min(1).optional(),
  condition_ids: z.array(conditionIdSchema).min(1).optional(),
  market_maker_address: z.array(addressSchema).min(1).optional(),
  liquidity_num_min: z.number().optional(),
  liquidity_num_max: z.number().optional(),
  volume_num_min: z.number().optional(),
  volume_num_max: z.number().optional(),
  start_date_min: z.string().optional(),
  start_date_max: z.string().optional(),
  end_date_min: z.string().optional(),
  end_date_max: z.string().optional(),
  tag_id: z.number().int().optional(),
  related_tags: z.boolean().optional(),
  cyom: z.boolean().optional(),
  uma_resolution_status: z.string().optional(),
  game_id: z.string().optional(),
  sports_market_types: z.array(z.string()).min(1).optional(),
  rewards_min_size: z.number().optional(),
  question_ids: z.array(z.string()).min(1).optional(),
  include_tag: z.boolean().optional(),
  closed: z.boolean().optional(),
});

export const marketQueryDateSchema = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), {
    message: "Invalid date-time format",
  });

const marketTagSchema = z
  .object({
    id: z.string(),
    label: optionalNullableString,
    slug: optionalNullableString,
    forceShow: optionalNullableBoolean,
    publishedAt: optionalNullableString,
    createdBy: optionalNullableInt,
    updatedBy: optionalNullableInt,
    createdAt: optionalNullableString,
    updatedAt: optionalNullableString,
    forceHide: optionalNullableBoolean,
    isCarousel: optionalNullableBoolean,
  })
  .passthrough();

const marketSchema = z
  .object({
    id: z.string(),
    question: optionalNullableString,
    conditionId: optionalNullableString,
    slug: optionalNullableString,
    twitterCardImage: optionalNullableString,
    resolutionSource: optionalNullableString,
    endDate: optionalNullableString,
    category: optionalNullableString,
    ammType: optionalNullableString,
    liquidity: optionalNullableString,
    sponsorName: optionalNullableString,
    sponsorImage: optionalNullableString,
    startDate: optionalNullableString,
    xAxisValue: optionalNullableString,
    yAxisValue: optionalNullableString,
    denominationToken: optionalNullableString,
    fee: optionalNullableString,
    image: optionalNullableString,
    icon: optionalNullableString,
    lowerBound: optionalNullableString,
    upperBound: optionalNullableString,
    description: optionalNullableString,
    outcomes: optionalNullableString,
    outcomePrices: optionalNullableString,
    volume: optionalNullableString,
    active: optionalNullableBoolean,
    marketType: optionalNullableString,
    formatType: optionalNullableString,
    lowerBoundDate: optionalNullableString,
    upperBoundDate: optionalNullableString,
    closed: optionalNullableBoolean,
    marketMakerAddress: optionalNullableString,
    createdBy: optionalNullableInt,
    updatedBy: optionalNullableInt,
    createdAt: optionalNullableString,
    updatedAt: optionalNullableString,
    closedTime: optionalNullableString,
    wideFormat: optionalNullableBoolean,
    new: optionalNullableBoolean,
    mailchimpTag: optionalNullableString,
    featured: optionalNullableBoolean,
    archived: optionalNullableBoolean,
    resolvedBy: optionalNullableString,
    restricted: optionalNullableBoolean,
    marketGroup: optionalNullableInt,
    groupItemTitle: optionalNullableString,
    groupItemThreshold: optionalNullableString,
    questionID: optionalNullableString,
    umaEndDate: optionalNullableString,
    enableOrderBook: optionalNullableBoolean,
    orderPriceMinTickSize: optionalNullableNumber,
    orderMinSize: optionalNullableNumber,
    umaResolutionStatus: optionalNullableString,
    curationOrder: optionalNullableInt,
    volumeNum: optionalNullableNumber,
    liquidityNum: optionalNullableNumber,
    endDateIso: optionalNullableString,
    startDateIso: optionalNullableString,
    umaEndDateIso: optionalNullableString,
    hasReviewedDates: optionalNullableBoolean,
    readyForCron: optionalNullableBoolean,
    commentsEnabled: optionalNullableBoolean,
    volume24hr: optionalNullableNumber,
    volume1wk: optionalNullableNumber,
    volume1mo: optionalNullableNumber,
    volume1yr: optionalNullableNumber,
    gameStartTime: optionalNullableString,
    secondsDelay: optionalNullableInt,
    clobTokenIds: optionalNullableString,
    disqusThread: optionalNullableString,
    shortOutcomes: optionalNullableString,
    teamAID: optionalNullableString,
    teamBID: optionalNullableString,
    umaBond: optionalNullableString,
    umaReward: optionalNullableString,
    fpmmLive: optionalNullableBoolean,
    volume24hrAmm: optionalNullableNumber,
    volume1wkAmm: optionalNullableNumber,
    volume1moAmm: optionalNullableNumber,
    volume1yrAmm: optionalNullableNumber,
    volume24hrClob: optionalNullableNumber,
    volume1wkClob: optionalNullableNumber,
    volume1moClob: optionalNullableNumber,
    volume1yrClob: optionalNullableNumber,
    volumeAmm: optionalNullableNumber,
    volumeClob: optionalNullableNumber,
    liquidityAmm: optionalNullableNumber,
    liquidityClob: optionalNullableNumber,
    makerBaseFee: optionalNullableInt,
    takerBaseFee: optionalNullableInt,
    customLiveness: optionalNullableInt,
    acceptingOrders: optionalNullableBoolean,
    notificationsEnabled: optionalNullableBoolean,
    score: optionalNullableInt,
    imageOptimized: optimizedImageSchema.optional().nullable(),
    iconOptimized: optimizedImageSchema.optional().nullable(),
    events: z.array(eventSchema).optional().nullable(),
    categories: z.array(z.record(z.string(), z.unknown())).optional().nullable(),
    tags: z.array(marketTagSchema).optional().nullable(),
    creator: optionalNullableString,
    ready: optionalNullableBoolean,
    funded: optionalNullableBoolean,
    pastSlugs: optionalNullableString,
    readyTimestamp: optionalNullableString,
    fundedTimestamp: optionalNullableString,
    acceptingOrdersTimestamp: optionalNullableString,
    competitive: optionalNullableNumber,
    rewardsMinSize: optionalNullableNumber,
    rewardsMaxSpread: optionalNullableNumber,
    spread: optionalNullableNumber,
    automaticallyResolved: optionalNullableBoolean,
    oneDayPriceChange: optionalNullableNumber,
    oneHourPriceChange: optionalNullableNumber,
    oneWeekPriceChange: optionalNullableNumber,
    oneMonthPriceChange: optionalNullableNumber,
    oneYearPriceChange: optionalNullableNumber,
    lastTradePrice: optionalNullableNumber,
    bestBid: optionalNullableNumber,
    bestAsk: optionalNullableNumber,
    automaticallyActive: optionalNullableBoolean,
    clearBookOnStart: optionalNullableBoolean,
    chartColor: optionalNullableString,
    seriesColor: optionalNullableString,
    showGmpSeries: optionalNullableBoolean,
    showGmpOutcome: optionalNullableBoolean,
    manualActivation: optionalNullableBoolean,
    negRiskOther: optionalNullableBoolean,
    gameId: optionalNullableString,
    groupItemRange: optionalNullableString,
    sportsMarketType: optionalNullableString,
    line: optionalNullableNumber,
    umaResolutionStatuses: optionalNullableString,
    pendingDeployment: optionalNullableBoolean,
    deploying: optionalNullableBoolean,
    deployingTimestamp: optionalNullableString,
    scheduledDeploymentTimestamp: optionalNullableString,
  })
  .passthrough();

export const marketsResponseSchema = z.array(marketSchema);

export const eventIdSchema = z.number().int().nonnegative();
export const eventSlugSchema = z.string().min(1);
export const eventParamsSchema = z.object({
  include_chat: z.boolean().optional(),
  include_template: z.boolean().optional(),
});

const eventTagSchema = marketTagSchema;

export const eventTagsResponseSchema = z.array(eventTagSchema);

export const eventResponseSchema = eventSchema;

export type ListTeamsParams = z.infer<typeof listTeamsParamsSchema>;
export type Team = z.infer<typeof teamSchema>;
export type SportsMetadata = z.infer<typeof sportsMetadataSchema>;
export type SearchParams = z.infer<typeof searchParamsSchema>;
export type SearchResponse = z.infer<typeof searchResponseSchema>;
export type Comment = z.infer<typeof commentSchema>;
export type CommentProfile = z.infer<typeof commentProfileSchema>;
export type CommentReaction = z.infer<typeof commentReactionSchema>;
export type ListCommentsParams = z.infer<typeof listCommentsParamsSchema>;
export type GetCommentByIdParams = z.infer<typeof getCommentByIdParamsSchema>;
export type GetCommentsByUserAddressParams = z.infer<typeof getCommentsByUserAddressParamsSchema>;
export type Series = z.infer<typeof seriesSchema>;
export type ListSeriesParams = z.infer<typeof listSeriesParamsSchema>;
export type GetSeriesByIdParams = z.infer<typeof getSeriesByIdParamsSchema>;
export type Market = z.infer<typeof marketSchema>;
export type ListMarketsParams = z.infer<typeof listMarketsParamsSchema>;
export type EventParams = z.infer<typeof eventParamsSchema>;
export type Event = z.infer<typeof eventResponseSchema>;
export type EventTag = z.infer<typeof eventTagSchema>;
