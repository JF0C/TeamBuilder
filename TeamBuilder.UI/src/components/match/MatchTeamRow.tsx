import { ChangeEvent, FunctionComponent } from "react";
import { TeamDto } from "../../dtos/teams/TeamDto";
import { useAppDispatch } from "../../store/store";
import { changeTeamScore } from "../../store/matchReducer";

export const MatchTeamRow: FunctionComponent<{team: TeamDto, isWinner: boolean, expandPlayers: boolean, changeScore: boolean}> = ({team, isWinner, expandPlayers, changeScore}) => {
    const dispatch = useAppDispatch();

    const dispatchScoreChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTeamScore({
            teamId: team.id,
            score: Number(e.target.value)
        }))
    }

    return <tr>
        <td className={`${isWinner ? 'highlighted' : ''}`}>
            {team.name}
        </td>
        {
            !changeScore ? 
            <td className={`${isWinner ? 'highlighted' : ''}`}>
                {expandPlayers ? team.players.map(p => p.name).join(', ') : team.players.length}
            </td>
            :<></>
        }
        <td className={`${isWinner ? 'highlighted' : ''}`}>
            {
                changeScore ?
                <input type="number" defaultValue={team.score}
                    className="w-18 text-center border-2 rounded-md button" onChange={dispatchScoreChange} />
                :
                team.score
            }
        </td>
    </tr>
}