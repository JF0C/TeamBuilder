import { FunctionComponent } from "react";
import { NavLink } from "react-router";
import { Paths } from "../../constants/Paths";
import { resetTeamPlayers } from "../../store/matchReducer";
import { useAppDispatch } from "../../store/store";
import { SplitLayout } from "../layout/SplitLayout";
import { LinkBack } from "../shared/LinkBack";
import { MatchConfiguration } from "./MatchConfiguration";
import { PlayerSelector } from "./PlayerSelector";
import { SelectedPlayers } from "./SelectedPlayers";

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
