import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Paths } from "../../constants/Paths";
import { NavLink, useNavigate } from "react-router-dom";
import { TeamResult } from "./TeamResult";
import { MatchTypeRadio } from "../shared/MatchTypeRadio";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { createMatchRequest } from "../../thunks/matchThunk";
import { BottomBarLayout } from "../layout/BottomBarLayout";

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

    return (
        <BottomBarLayout navigation={
            <div className="flex flex-row justify-between">
                <div>
                    <NavLink to={Paths.TeamPath}>
                        Back
                    </NavLink>
                </div>
                <div className="button" onClick={() => finishMatch()}>
                    Finish
                </div>
            </div>
        }>
            <div className="flex flex-row items-center">
                <div>
                    Match&nbsp;Type
                </div>
                <div className="flex-1">
                    <MatchTypeRadio justifyRight/>
                </div>
            </div>
            {
                matchState.current.teams.map((team, index) =>
                    <TeamResult key={`team-result-${index}`} index={index} team={team} />
                )
            }
        </BottomBarLayout>
    )
}