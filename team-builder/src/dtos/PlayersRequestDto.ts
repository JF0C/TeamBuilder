import { PagedRequest } from "./PagedRequest"

export type PlayersRequestDto = PagedRequest & {
    group?: number
    name?: string
}