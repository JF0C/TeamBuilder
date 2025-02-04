import { GroupDto } from "../groups/GroupDto"

export type PlayerDto = {
    id: number,
    name: string,
    groups: GroupDto[]
}