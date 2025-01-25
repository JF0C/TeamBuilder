export type PagedResult<T> = {
    items: T[]
    page: number,
    count?: number,
    totalItems: number
    totalPages: number
}