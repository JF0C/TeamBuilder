import { PagedRequest } from "../base/PagedRequest"

export type PlayersRequestDto = PagedRequest & {
    group?: number
    name?: string
    exclude?: number[]
}