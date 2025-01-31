import { PlayerDto } from "./PlayerDto";

export type TeamDto = {
    id: number;
    name: string;
    players: PlayerDto[];
    score: number;
}