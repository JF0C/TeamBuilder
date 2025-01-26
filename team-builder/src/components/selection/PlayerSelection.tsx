import { FunctionComponent } from "react";
import { PlayerSelector } from "./PlayerSelector";
import { SelectedPlayers } from "./SelectedPlayers";
import { NavLink } from "react-router";
import { Paths } from "../../constants/Paths";
import { useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { TeamConfiguration } from "./TeamConfiguration";

export const PlayerSelection: FunctionComponent = () => {
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
            <TeamConfiguration/>
            <NavLink to={Paths.TeamResultPath}>
                Generate
            </NavLink>
        </div>
    </div>
}