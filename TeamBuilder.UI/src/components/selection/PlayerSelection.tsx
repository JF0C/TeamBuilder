import { FunctionComponent } from "react";
import { PlayerSelector } from "./PlayerSelector";
import { SelectedPlayers } from "./SelectedPlayers";
import { NavLink } from "react-router";
import { Paths } from "../../constants/Paths";
import { useAppDispatch } from "../../store/store";
import { MatchConfiguration } from "./MatchConfiguration";
import { resetTeamPlayers } from "../../store/matchReducer";
import { SplitLayout } from "../layout/SplitLayout";
import { LinkBack } from "../shared/LinkBack";

export const PlayerSelection: FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const startGame = () => {
    dispatch(resetTeamPlayers());
  };

  return (
    <SplitLayout
      source={<PlayerSelector />}
      selected={<SelectedPlayers />}
      navigation={[
        <LinkBack key="back" to={Paths.HomePath} />,
        <MatchConfiguration key="match-config" />,
        <NavLink key="next" to={Paths.TeamPath} onClick={startGame}>
          Generate
        </NavLink>,
      ]}
    />
  );
};
