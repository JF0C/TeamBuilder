import { PlayerDto } from "../players/PlayerDto"

export type UserDto = PlayerDto & {
    roles: string[],
    email: string
}