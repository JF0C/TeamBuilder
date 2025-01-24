import { FunctionComponent } from "react";
import { useAppSelector } from "../../store/store";
import { PlayerItem } from "./PlayerItem";

export const SelectedPlayers: FunctionComponent = () => {
    const playerState = useAppSelector((state) => state.players);

    const selectedPlayers = playerState.players
        .filter(p => playerState.selected.find(s => p.id === s) !== undefined);

    return (
        <div className="flex flex-row flex-wrap gap-2 p-2">
            <div className="w-full">
                Selected ({selectedPlayers.length.toString()})
            </div>
            {
                selectedPlayers.map(p => <PlayerItem key={p.id} player={p} />)
            }
        </div>
    )
}