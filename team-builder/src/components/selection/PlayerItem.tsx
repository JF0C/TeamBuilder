import { FunctionComponent } from "react";
import { Player } from "../../data/player";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { deselectPlayer, selectPlayer } from "../../store/playerReducer";

export type PlayerItemProps = {
    player: Player
}

export const PlayerItem: FunctionComponent<PlayerItemProps> = (props) => {
    const dispatch = useAppDispatch();
    const playerState = useAppSelector((state) => state.players);
    const isSelected = playerState.selected.find(x => props.player.id === x) !== undefined;

    const toggleSelection = () => {
        if (isSelected) {
            dispatch(deselectPlayer(props.player.id));
        }
        else {
            dispatch(selectPlayer(props.player));
        }
    }

    return <div className="player-item border rounded-md px-2 cursor-pointer"
        onClick={toggleSelection}>
        {props.player.name}
    </div>
}