import { PagedRequest } from "../base/PagedRequest";

export type MatchesRequestDto = PagedRequest & {
    player?: number
    type?: number
    from?: number
    to?: number
}