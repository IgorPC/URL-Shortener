import type {StatisticsPeriodDTO} from "./StatisticsPeriodDTO.ts";
import type {StatisticsClickDTO} from "./StatisticsClickDTO.ts";

export interface StatisticsDTO {
    identifier: string;
    is_active: boolean;
    original_url: string;
    short_url: string;
    total_clicks: number;
    created_at: string;
    period: StatisticsPeriodDTO;
    clicks: StatisticsClickDTO[];
}