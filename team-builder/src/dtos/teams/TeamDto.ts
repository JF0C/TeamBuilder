import { PlayerDto } from "../players/PlayerDto";

export type TeamDto = {
    id: number;
    name: string;
    players: PlayerDto[];
    score: number;
}