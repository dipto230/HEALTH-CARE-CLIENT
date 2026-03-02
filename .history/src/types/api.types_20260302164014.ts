import { Api } from '../../.history/src/types/api.types_20260302163307';
export interface ApiResponse<TData = unknown>{
    success: boolean;
    message: string;
    data: TData;
    meta?: PaginationMeta;
}

export interface PaginationMeta{
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface ApiError