import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { TeamView } from "./TeamView";
import { PlayerDto } from "../../dtos/players/PlayerDto";
import { setTeamPlayers } from "../../store/matchReducer";

export const TeamsList: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const matchState = useAppSelector((state) => state.match);
  const movePlayer = (player: PlayerDto, teamIndex: number) => {
    dispatch(
      setTeamPlayers({
        index: teamIndex,
        players: matchState.current.teams[teamIndex].players.filter(
          (p) => p.id !== player.id
        ),
      })
    );
    const nextTeamIndex = (teamIndex + 1) % matchState.current.teams.length;
    dispatch(
      setTeamPlayers({
        index: nextTeamIndex,
        players: matchState.current.teams[nextTeamIndex].players.concat(player),
      })
    );
  };
  return (
    <>
      {matchState.current.teams.map((team, index) => (
        <TeamView
          key={`team-${team.name}`}
          index={index}
          name={team.name}
          players={team.players}
          movePlayer={(player) => movePlayer(player, index)}
        />
      ))}
    </>
  );
};
