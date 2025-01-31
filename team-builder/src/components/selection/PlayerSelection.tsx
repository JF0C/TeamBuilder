import { FunctionComponent } from "react";
import { PlayerSelector } from "./PlayerSelector";
import { SelectedPlayers } from "./SelectedPlayers";
import { NavLink } from "react-router";
import { Paths } from "../../constants/Paths";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { MatchConfiguration } from "./MatchConfiguration";
import { resetTeamPlayers } from "../../store/matchReducer";

export const PlayerSelection: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const playerState = useAppSelector((state) => state.players);

    if (playerState.players === null || playerState.loading) {
        return <LoadingSpinner />
    }

    return <div className="flex flex-col h-full p-4">
        <div className="flex-1 flex flex-row">
            <div className="w-1/2">
                <PlayerSelector />
            </div>
            <div className="w-1/2">
                <SelectedPlayers />
            </div>
        </div>
        <div className="w-full flex flex-row justify-between">
            <NavLink to={'/'}>
                Back
            </NavLink>
            <MatchConfiguration/>
            <NavLink to={Paths.TeamPath} onClick={() => dispatch(resetTeamPlayers())}>
                Generate
            </NavLink>
        </div>
    </div>
}