import { FunctionComponent } from "react";
import { PlayerDto } from "../../dtos/players/PlayerDto";
import { ListItem } from "../shared/ListItem";

export const TeamSelectionPlayer: FunctionComponent<{
  player: PlayerDto;
  onClick: (player: PlayerDto) => void;
}> = ({ player, onClick }) => {
  return <ListItem onSelected={() => onClick(player)}>{player.name}</ListItem>;
};
