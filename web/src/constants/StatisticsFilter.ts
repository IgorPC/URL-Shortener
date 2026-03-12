export const StatisticsFilter = {
    ALL: 'all',
    SEVEN_DAYS: 7,
    HALF_MONTH: 15,
    MONTH: 30,
    THREE_MONTHS: 90
} as const;

export type StatisticsFilterValidated = typeof StatisticsFilter[keyof typeof StatisticsFilter];