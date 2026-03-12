import type {CreateShortenedUrlDTO} from "../types/DTOs/CreateShortenedUrlDTO.ts";
import type {ShortenedUrlDTO} from "../types/DTOs/ShortenedUrlDTO.ts";
import {ENDPOINTS} from "../constants/Endpoints.ts";
import api from "./api.ts";
import type {ErrorDTO} from "../types/DTOs/ErrorDTO.ts";
import type {AxiosError} from "axios";
import type {StatisticsFilterValidated} from "../constants/StatisticsFilter.ts";
import type {StatisticsPeriodDTO} from "../types/DTOs/StatisticsPeriodDTO.ts";
import type {StatisticsClickDTO} from "../types/DTOs/StatisticsClickDTO.ts";
import type {StatisticsDTO} from "../types/DTOs/StatisticsDTO.ts";

export async function createShortenedUrl(body: CreateShortenedUrlDTO): Promise<ShortenedUrlDTO | ErrorDTO> {
    try {
        const response = await api.post(ENDPOINTS.createShortenedUrl, body);
        const data = response.data;

        if (!data.success) {
           return {
                error: data.error,
                message: data.message
           } as ErrorDTO;
        }

        return {
            id: data.data.id,
            url: data.data.url,
            identifier: data.data.identifier,
            short_url: data.data.short_url,
            short_url_statistics: data.data.short_url_statistics,
            clicks: data.data.clicks,
            is_active: data.data.is_active,
            created_at: data.data.created_at,
            updated_at: data.data.updated_at
        } as ShortenedUrlDTO;
    } catch (error: AxiosError | any) {
        if (error.response.status === 500) {
            throw new Error("Internal Server Error");
        }

        return {
            error: error.response.data.errors,
            message: error.response.data.message
        } as ErrorDTO;
    }
}

export async function clickAndRedirect(identifier: string | undefined): Promise<string | ErrorDTO> {
    try {
        const response = await api.post(ENDPOINTS.redirect, {
            identifier: identifier
        });

        const data = response.data;

        if (!data.success) {
            return {
                error: data.error,
                message: data.message
            } as ErrorDTO;
        }

        return data.data.url;
    } catch (error: AxiosError | any) {
        if (error.response.status === 500) {
            throw new Error("Internal Server Error");
        }

        return {
            error: error.response.data.errors,
            message: error.response.data.message
        } as ErrorDTO;
    }
}

export async function getStatistics(identifier: string, filter: StatisticsFilterValidated): Promise<StatisticsDTO | ErrorDTO> {
    try {
        const url = ENDPOINTS.statistics.replace("{identifier}", identifier);
        const response = await api.get(`${url}?period=${filter}`);
        const data = response.data;

        if (!data.success) {
            return {
                error: data.error,
                message: data.message
            } as ErrorDTO;
        }

        return {
            identifier: data.data.identifier,
            is_active: data.data.is_active,
            original_url: data.data.original_url,
            short_url: data.data.short_url,
            total_clicks: data.data.total_clicks,
            created_at: data.data.created_at,
            period: data.data.period as StatisticsPeriodDTO,
            clicks: data.data.clicks.map((click: any) => ({
                ip: click.ip,
                clicked_at: click.clicked_at
            } as unknown as StatisticsClickDTO))
        } as StatisticsDTO;

    } catch (error: AxiosError | any) {
        return {
            error: error.response.data.errors,
            message: error.response.data.message
        } as ErrorDTO;
    }
}