import { FunctionComponent } from "react";
import { PlayerDto } from "../../dtos/players/PlayerDto";
import { useAppDispatch } from "../../store/store";
import { setTeamName } from "../../store/matchReducer";
import { EditableLabel } from "../shared/EditableLabel";
import { TeamSelectionPlayer } from "./TeamSelectionPlayer";

export type TeamViewProps = {
  index: number;
  name: string;
  players: PlayerDto[];
  movePlayer: (player: PlayerDto) => void;
};

export const TeamView: FunctionComponent<TeamViewProps> = ({
  index,
  name,
  players,
  movePlayer,
}) => {
  const dispatch = useAppDispatch();

  const changeTeamName = (name: string) => {
    dispatch(
      setTeamName({
        index,
        name,
      })
    );
  };

  return (
    <div className="team-card pt-4">
      <div className="flex flex-row w-full justify-center">
        <EditableLabel value={name} onChange={changeTeamName} />
      </div>
      <div className="flex flex-row flex-wrap gap-2 justify-center">
        {players.map((p) => (
          <TeamSelectionPlayer
            key={`team-player-${p.id}`}
            player={p}
            onClick={movePlayer}
          />
        ))}
      </div>
    </div>
  );
};
