import { FunctionComponent } from "react";
import { MatchDto } from "../../dtos/MatchDto";
import { MatchTeamRow } from "./MatchTeamRow";

export const MatchTeamTable: FunctionComponent<{match: MatchDto}> = ({match}) => {

    const teams = [...match.teams].sort((a, b) => b.score - a.score);
    const winner = teams.find(() => true);

    return <table className="w-full">
        <tr>
            <th>
                Team
            </th>
            <th>
                Players
            </th>
            <th>
                Score
            </th>
        </tr>
        {
            teams.map(t => <MatchTeamRow team={t} isWinner={winner?.id === t.id}/>)
        }
    </table>
}