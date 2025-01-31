import { TeamDto } from "./TeamDto";

export type MatchDto = {
    id: number;
    teams: TeamDto[];
    created: number;
    type: number;
}