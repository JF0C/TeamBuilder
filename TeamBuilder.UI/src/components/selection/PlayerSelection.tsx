import { FunctionComponent, useState } from "react";
import { Paths } from "../../constants/Paths";
import { resetTeamPlayers } from "../../store/matchReducer";
import { useAppDispatch } from "../../store/store";
import { SplitLayout } from "../layout/SplitLayout";
import { LinkBack } from "../shared/LinkBack";
import { MatchConfiguration } from "./MatchConfiguration";
import { PlayerSelector } from "./PlayerSelector";
import { SelectedPlayers } from "./SelectedPlayers";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { Dice } from "../shared/Dice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";

export const PlayerSelection: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showDice, setShowDice] = useState(false);

  const startGame = () => {
    setShowDice(true);
    setTimeout(() => {
      dispatch(resetTeamPlayers());
      gameStarted();
    }, 3000);
  };

  const gameStarted = () => {
    setShowDice(false);
    navigate(Paths.TeamPath);
  };

  return (
    <>
      <SplitLayout
        source={<PlayerSelector />}
        selected={<SelectedPlayers />}
        navigation={[
          <LinkBack key="back" to={Paths.HomePath} />,
          <MatchConfiguration key="match-config" />,
          <button
            key="select-teams"
            className="flex flex-row gap-2 items-center"
            onClick={startGame}
          >
            <span>Generate</span>
            <FontAwesomeIcon icon={faCaretRight} />
          </button>,
        ]}
      />
      {showDice ? <Dice onClick={gameStarted} /> : <></>}
    </>
  );
};
