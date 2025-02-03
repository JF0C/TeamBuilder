import { FunctionComponent } from "react";
import { TeamDto } from "../../dtos/TeamDto";

export const MatchTeamRow: FunctionComponent<{team: TeamDto, isWinner: boolean}> = ({team, isWinner}) => {

    return <tr>
        <td className={`${isWinner ? 'highlighted' : ''}`}>
            {team.name}
        </td>
        <td className={`${isWinner ? 'highlighted' : ''}`}>
            {team.players.length}
        </td>
        <td className={`${isWinner ? 'highlighted' : ''}`}>
            {team.score}
        </td>
    </tr>
}