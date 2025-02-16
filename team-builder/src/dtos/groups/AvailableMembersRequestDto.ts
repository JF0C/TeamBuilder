import { PagedRequest } from "../base/PagedRequest"

export type AvailableMembersRequestDto = PagedRequest & {
    exclude: number[],
    name?: string
}