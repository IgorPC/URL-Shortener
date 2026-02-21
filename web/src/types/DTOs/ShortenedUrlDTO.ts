export interface ShortenedUrlDTO {
    id: number;
    url: string;
    identifier: string;
    short_url: string;
    short_url_statistics: string;
    clicks: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}