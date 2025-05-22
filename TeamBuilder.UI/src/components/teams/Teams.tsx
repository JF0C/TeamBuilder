import { faCaretRight, faDice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";
import { Paths } from "../../constants/Paths";
import { TeamEntity } from "../../data/TeamEntity";
import { PlayerDto } from "../../dtos/players/PlayerDto";
import {
  reloadMatches,
  setTeamName,
  setTeamPlayers,
} from "../../store/matchReducer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  createMatchRequest,
  updateMatchRequest,
} from "../../thunks/matchThunk";
import { NavBarLayout } from "../layout/NavbarLayout";
import { LinkBack } from "../shared/LinkBack";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { MenuLink } from "../shared/MenuLink";
import { TeamView } from "./TeamView";

export const Teams: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const playerState = useAppSelector((state) => state.players);
  const matchState = useAppSelector((state) => state.match);

  if (playerState.players === null || playerState.requestState === "loading") {
    return <LoadingSpinner />;
  }

  const selectedPlayers = [...playerState.selected];

  const shuffle = (array: PlayerDto[]) => {
    let currentIndex = array.length;

    while (currentIndex != 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  };

  const generateTeams = (selectedPlayers: PlayerDto[]) => {
    shuffle(selectedPlayers);

    const teams: TeamEntity[] = [];
    const selectedCount = selectedPlayers.length;
    const teamSize = Math.ceil(selectedCount / matchState.current.teams.length);
    for (let k = 0; k < matchState.current.teams.length; k++) {
      const players = selectedPlayers.slice(
        k * teamSize,
        Math.min((k + 1) * teamSize, selectedCount)
      );
      dispatch(setTeamPlayers({ index: k, players: players }));
      if (matchState.current.teams[k].name === "") {
        dispatch(setTeamName({ index: k, name: `Team ${k + 1}` }));
      }
    }
    return teams;
  };

  const createMatch = () => {
    if (matchState.current.id === 0) {
      dispatch(createMatchRequest(matchState.current)).then(() =>
        dispatch(reloadMatches({}))
      );
    } else {
      dispatch(updateMatchRequest(matchState.current)).then(() =>
        dispatch(reloadMatches({}))
      );
    }
  };

  if (matchState.current.teams.every((t) => t.players.length === 0)) {
    generateTeams(selectedPlayers);
  }

  return (
    <NavBarLayout
      navigation={[
        <div key="prev">
          <LinkBack to={Paths.SelectionPath} />
        </div>,
        <button
          key="shuffle"
          className="flex flex-row items-center gap-2"
          onClick={() => generateTeams(selectedPlayers)}
        >
          <FontAwesomeIcon icon={faDice} />
          <span>Shuffle</span>
        </button>,
        <div key="next">
          <MenuLink
            to={Paths.MatchCompletionPath}
            onClick={createMatch}
            label="Play"
            icon={faCaretRight}
            iconRight
          />
        </div>,
      ]}
    >
      {matchState.current.teams.map((team, index) => (
        <TeamView
          key={`team-${index}`}
          index={index}
          name={team.name}
          players={team.players}
        />
      ))}
    </NavBarLayout>
  );
};
