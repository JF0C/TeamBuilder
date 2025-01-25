import { FunctionComponent } from "react";
import { PlayerSelector } from "./PlayerSelector";
import { SelectedPlayers } from "./SelectedPlayers";
import { NavLink } from "react-router";
import { Paths } from "../../constants/Paths";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { loadPlayersRequest } from "../../thunks/playerThunk";
import { LoadingSpinner } from "../shared/LoadingSpinner";

export const PlayerSelection: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const playerState = useAppSelector((state) => state.players);

    const loadPlayers = () => {
        dispatch(loadPlayersRequest({ page: 1, count: 100, group: null }));
    }

    if (playerState.players === null) {
        if (!playerState.loading) {
            loadPlayers();
        }
        return <LoadingSpinner />
    }

    if (playerState.players.items.length === 0) {
        return <div className="size-full flex flex-row justify-center items-center">
            <div onClick={loadPlayers} className="button">
                Reload Players
            </div>
        </div>
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
            <NavLink to={Paths.TeamResultPath}>
                Generate Teams
            </NavLink>
        </div>
    </div>
}