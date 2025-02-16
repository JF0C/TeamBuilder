import { PagedRequest } from "../base/PagedRequest"

export type GroupPlayersRequestDto = PagedRequest & {
    group: number
}