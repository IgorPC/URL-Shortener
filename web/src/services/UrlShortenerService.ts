import type {CreateShortenedUrlDTO} from "../types/DTOs/CreateShortenedUrlDTO.ts";
import type {ShortenedUrlDTO} from "../types/DTOs/ShortenedUrlDTO.ts";
import {ENDPOINTS} from "../constants/Endpoints.ts";
import api from "./api.ts";

export async function createShortenedUrl(body: CreateShortenedUrlDTO): Promise<ShortenedUrlDTO> {
    try {
        const response = await api.post(ENDPOINTS.createShortenedUrl, body);
        const data = response.data;

        if (!data.success) {
            throw new Error(data.message);
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
    } catch (error) {
        throw error;
    }
}

export async function clickAndRedirect(identifier: string | undefined): Promise<string> {
    try {
        const response = await api.post(ENDPOINTS.redirect, {
            identifier: identifier
        });

        const data = response.data;

        if (!data.success) {
            throw new Error(data.message);
        }

        return data.data.url;
    } catch (error) {
        throw error;
    }
}