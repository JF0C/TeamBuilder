import { PagedRequest } from "../base/PagedRequest";

export type UsersRequestDto = PagedRequest & {
    group?: number
    name?: string
}