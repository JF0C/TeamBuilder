import { FunctionComponent } from "react";
import { MatchDto } from "../../dtos/matches/MatchDto";
import { MatchTeamRow } from "./MatchTeamRow";

export const MatchTeamTable: FunctionComponent<{ match: MatchDto, expanded?: boolean, changeScores?: boolean }> = ({ match, expanded, changeScores }) => {
    const teams = [...match.teams].sort((a, b) => b.score - a.score);
    const winner = teams.find(() => true);

    return (
        <table className="w-full">
            <thead>
                <tr>
                    <th>
                        Team
                    </th>
                    {
                        !changeScores ?
                            <th>
                                Players
                            </th>
                            : <></>
                    }
                    <th>
                        Score
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    teams.map(t => <MatchTeamRow key={`team-row-${t.id}`}
                        team={t}
                        expandPlayers={expanded ?? false}
                        isWinner={winner?.id === t.id}
                        changeScore={changeScores ?? false}
                    />)
                }
            </tbody>
        </table>
    )
}