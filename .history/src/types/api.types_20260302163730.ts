export interface ApiResponse<TData = unknown>{
    success: boolean;
    message: string;
    data: TData;
    meta?: Pa
}

export interface PaginationMeta{
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}