import { FunctionComponent } from "react";
import { PlayerDto } from "../../dtos/PlayerDto";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { deselectPlayer, selectPlayer } from "../../store/playerReducer";
import { ListItem } from "../layout/ListItem";

export const PlayerItem: FunctionComponent<{player: PlayerDto}> = ({player}) => {
    const dispatch = useAppDispatch();
    const playerState = useAppSelector((state) => state.players);
    const isSelected = playerState.selected.find(x => player.id === x) !== undefined;

    const toggleSelection = () => {
        if (isSelected) {
            dispatch(deselectPlayer(player.id));
        }
        else {
            dispatch(selectPlayer(player));
        }
    }

    return (
        <ListItem onSelected={toggleSelection}>
            {player.name}
        </ListItem>
    )
}