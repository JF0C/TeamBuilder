import { PlayerDto } from "../dtos/players/PlayerDto"

export type TeamEntity = {
    name: string
    players: PlayerDto[]
    score: number
}