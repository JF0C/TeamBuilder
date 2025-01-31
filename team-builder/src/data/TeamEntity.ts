import { PlayerDto } from "../dtos/PlayerDto"

export type TeamEntity = {
    name: string
    players: PlayerDto[]
    score: number
}