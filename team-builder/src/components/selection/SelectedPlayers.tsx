import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { PlayerItem } from "./PlayerItem";
import { clearSelectedPlayers } from "../../store/playerReducer";
import { LoadingSpinner } from "../shared/LoadingSpinner";

export const SelectedPlayers: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const playerState = useAppSelector((state) => state.players);

    if (playerState.loading || playerState.players === null) {
        return <LoadingSpinner/>
    }

    const selectedPlayers = playerState.players.items
        .filter(p => playerState.selected.find(s => p.id === s) !== undefined);

    const clearSelected = () => {
        dispatch(clearSelectedPlayers());
    }

    return (
        <div className="flex flex-row flex-wrap gap-2 p-2">
            <div className="w-full">
                Selected ({selectedPlayers.length.toString()})
            </div>
            <div className="w-full">
                <div className="button" onClick={clearSelected}>
                    Clear
                </div>
            </div>
            {
                selectedPlayers.map(p => <PlayerItem key={p.id} player={p} />)
            }
        </div>
    )
}