import { FunctionComponent } from "react";
import { PlayerDto } from "../../dtos/PlayerDto";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setEditingPlayer } from "../../store/playerReducer";

export const PlayerListItem: FunctionComponent<{player: PlayerDto}> = ({player}) => {
    const dispatch = useAppDispatch();
    const playerState = useAppSelector((state) => state.players);
    const isSelected = player.id === playerState.editingPlayer?.id;

    const selectPlayer = () => {
        dispatch(setEditingPlayer(player))
    }

    return <div className={`${isSelected ? 'highlighted' : ''}`} onClick={selectPlayer}>
        {player.name}
    </div>
}