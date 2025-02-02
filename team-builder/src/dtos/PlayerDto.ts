import { GroupDto } from "./GroupDto"

export type PlayerDto = {
    id: number,
    name: string,
    groups: GroupDto[]
}