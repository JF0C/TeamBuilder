import { PagedRequest } from "./PagedRequest"

export type GroupPlayersRequestDto = PagedRequest & {
    group: number
}