export type PagedResult<T> = {
    items: T[]
    totalItems: number
    totalPages: number
}