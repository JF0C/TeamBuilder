import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Paths } from "../../constants/Paths";
import { NavLink, useNavigate } from "react-router-dom";
import { TeamResult } from "./TeamResult";
import { MatchTypeRadio } from "../shared/MatchTypeRadio";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { createMatchRequest } from "../../thunks/matchThunk";

export const MatchCompletion: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const matchState = useAppSelector((state) => state.match);

    const finishMatch = () => {
        dispatch(createMatchRequest(matchState.current))
            .unwrap()
            .then(() => navigate('/'))
    }

    if (matchState.loading) {
        return <LoadingSpinner />
    }

    return <div className="size-full flex flex-row justify-center">
    <div className="flex flex-col h-full p-4 w-screen md:max-w-2/3">
        <div className="flex-1">
            <MatchTypeRadio />
            {
                matchState.current.teams.map((team, index) =>
                    <TeamResult key={`team-result-${index}`} index={index} team={team} />
                )
            }
        </div>
        <div className="w-full flex flex-row justify-between">
            <div>
                <NavLink to={Paths.TeamPath}>
                    Back
                </NavLink>
            </div>
            <div className="button" onClick={() => finishMatch()}>
                Finish
            </div>
        </div>
    </div>
</div>
}