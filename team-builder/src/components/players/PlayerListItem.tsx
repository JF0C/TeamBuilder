import { FunctionComponent } from "react";
import { PlayerDto } from "../../dtos/PlayerDto";
import { useAppSelector } from "../../store/store";
import { ListItem } from "../layout/ListItem";

export type PlayerListItemProps = {
    player: PlayerDto
    onSelected: () => void
}

export const PlayerListItem: FunctionComponent<PlayerListItemProps> = ({player, onSelected}) => {
    const playerState = useAppSelector((state) => state.players);
    const isSelected = player.id === playerState.editingPlayer?.id;

    return <ListItem isSelected={isSelected} onSelected={onSelected}>
        {player.name}
    </ListItem>
}