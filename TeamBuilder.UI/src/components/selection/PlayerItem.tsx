import { FunctionComponent } from "react";
import { PlayerDto } from "../../dtos/players/PlayerDto";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  deselectPlayer,
  reloadPlayers,
  selectPlayer,
} from "../../store/playerReducer";
import { ListItem } from "../shared/ListItem";

export const PlayerItem: FunctionComponent<{ player: PlayerDto }> = ({
  player,
}) => {
  const dispatch = useAppDispatch();
  const playerState = useAppSelector((state) => state.players);
  const isSelected =
    playerState.selected.find((x) => player.id === x.id) !== undefined;

  const toggleSelection = () => {
    if (isSelected) {
      dispatch(deselectPlayer(player.id));
    } else {
      dispatch(selectPlayer(player));
    }
    dispatch(reloadPlayers({}));
  };

  return <ListItem onSelected={toggleSelection}>{player.name}</ListItem>;
};
