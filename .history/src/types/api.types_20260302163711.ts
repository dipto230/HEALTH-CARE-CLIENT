export interface ApiResponse<TData = unknown>{
    success: boolean;
    message: string;
    data: TData;
    meta?: 
}

export interface PaginationMeta{
    page: number;
    limit: number;
    total: number;
    totalPages:
}