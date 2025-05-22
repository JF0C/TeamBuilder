import { TeamEntity } from "./TeamEntity"

export type MatchEntity = {
    id: number
    type: number
    teams: TeamEntity[]
}