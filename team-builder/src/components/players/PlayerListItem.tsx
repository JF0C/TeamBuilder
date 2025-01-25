import { FunctionComponent } from "react";
import { PlayerDto } from "../../dtos/PlayerDto";
import { AppDispatch, useAppDispatch, useAppSelector } from "../../store/store";

export type PlayerListItemProps = {
    player: PlayerDto
    onSelected: (player: PlayerDto, dispatch: AppDispatch) => void
}

export const PlayerListItem: FunctionComponent<PlayerListItemProps> = ({player, onSelected}) => {
    const dispatch = useAppDispatch();
    const playerState = useAppSelector((state) => state.players);
    const isSelected = player.id === playerState.editingPlayer?.id;

    return <div className={`${isSelected ? 'highlighted' : ''} rounded-md border border-2 px-2`} 
        onClick={() => onSelected(player, dispatch)}>
        {player.name}
    </div>
}