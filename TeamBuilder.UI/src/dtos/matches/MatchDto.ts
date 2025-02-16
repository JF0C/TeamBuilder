import { TeamDto } from "../teams/TeamDto";

export type MatchDto = {
    id: number;
    teams: TeamDto[];
    created: number;
    type: number;
}