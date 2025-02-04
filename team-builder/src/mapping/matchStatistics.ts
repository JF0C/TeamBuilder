import { MatchDto } from "../dtos/matches/MatchDto"

export const totalPlayers = (match: MatchDto): number => {
    const teamPlayers = match.teams.map(t => t.players.length);
    if (!teamPlayers.length) {
        return 0
    }
    return teamPlayers.reduce((a, b) => a + b);
} 