import { FunctionComponent } from "react";
import { TeamEntity } from "../../data/TeamEntity";
import { useAppDispatch } from "../../store/store";
import { setTeamScore } from "../../store/matchReducer";

export const TeamResult: FunctionComponent<{index: number, team: TeamEntity}> = ({index, team}) => {
    const dispatch = useAppDispatch();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const changeTeamScore = (e: any) => {
        dispatch(setTeamScore({index: index, score: e.target.value}))
    }

    return <div className="flex flex-row justify-between">
        <div>
            {team.name}
        </div>
        <div>
            <input style={{width: '100px'}} type='number' value={team.score} onInput={changeTeamScore} />
        </div>
    </div>
}