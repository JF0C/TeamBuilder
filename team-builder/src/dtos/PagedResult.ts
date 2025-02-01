import { PageDto } from "./PageDto"

export type PagedResult<T> = PageDto & {
    items: T[]
    totalItems: number
}