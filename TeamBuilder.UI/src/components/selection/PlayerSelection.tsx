import { FunctionComponent } from "react";
import { Paths } from "../../constants/Paths";
import { resetTeamPlayers } from "../../store/matchReducer";
import { useAppDispatch } from "../../store/store";
import { SplitLayout } from "../layout/SplitLayout";
import { LinkBack } from "../shared/LinkBack";
import { MatchConfiguration } from "./MatchConfiguration";
import { PlayerSelector } from "./PlayerSelector";
import { SelectedPlayers } from "./SelectedPlayers";
import { MenuLink } from "../shared/MenuLink";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

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
        <MenuLink
          key="next"
          to={Paths.TeamPath}
          onClick={startGame}
          label="Generate"
          icon={faCaretRight}
          iconRight
        />,
      ]}
    />
  );
};
