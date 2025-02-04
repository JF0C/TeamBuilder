import { ChangeEvent, FunctionComponent } from "react";
import { TeamEntity } from "../../data/TeamEntity";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setTeamScore } from "../../store/matchReducer";
import { matchTypeWinningScore } from "../../mapping/matchTypeMapper";

export const TeamResult: FunctionComponent<{index: number, team: TeamEntity}> = ({index, team}) => {
    const dispatch = useAppDispatch();
    const currentMatch = useAppSelector((state) => state.match.current);

    const changeTeamScore = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setTeamScore({index: index, score: Number(e.target.value)}))
    }

    const setWinner = () => {
        const winningScore = matchTypeWinningScore(currentMatch.type);
        dispatch(setTeamScore({index: index, score: winningScore}))
        console.log(currentMatch.teams)
        for (const losingTeam of currentMatch.teams.filter((t, i) => i !== index && t.score >= winningScore)) {
            dispatch(setTeamScore({
                index: currentMatch.teams.indexOf(losingTeam),
                score: winningScore - 1
            }));
        }
    }

    return <div className="flex flex-row justify-between">
        <div>
            {team.name}
        </div>
        <div className="flex flex-row gap-2">
            <input style={{width: '100px'}} type='number' value={team.score} onChange={changeTeamScore} />
            <div className="button" onClick={setWinner}>Has Won</div>
        </div>
    </div>
}