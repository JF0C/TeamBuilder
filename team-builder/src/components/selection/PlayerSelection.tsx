import { FunctionComponent } from "react";
import { PlayerSelector } from "./PlayerSelector";
import { SelectedPlayers } from "./SelectedPlayers";
import { NavLink } from "react-router";
import { Paths } from "../../constants/Paths";

export const PlayerSelection: FunctionComponent = () => {
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
            <NavLink to={Paths.TeamResultPath}>
                Generate Teams
            </NavLink>
        </div>
    </div>
}