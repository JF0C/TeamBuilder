import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Paths } from "../../constants/Paths";
import { useNavigate } from "react-router-dom";
import { TeamResult } from "./TeamResult";
import { MatchTypeRadio } from "../shared/MatchTypeRadio";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { updateMatchRequest } from "../../thunks/matchThunk";
import { NavBarLayout } from "../layout/NavbarLayout";
import { LinkBack } from "../shared/LinkBack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { reloadMatches } from "../../store/matchReducer";
import { reloadResumableMatches } from "../../store/matchResumeReducer";

export const MatchCompletion: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const matchState = useAppSelector((state) => state.match);

  const finishMatch = () => {
    dispatch(updateMatchRequest(matchState.current))
      .unwrap()
      .then(() => {
        navigate(Paths.HomePath);
        dispatch(reloadMatches({}));
        dispatch(reloadResumableMatches({}));
      });
  };

  if (matchState.matchesRequestState === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <NavBarLayout
      navigation={[
        <LinkBack key="prev" to={Paths.TeamPath} />,
        <button
          key="next"
          className="flex flex-row items-center gap-2"
          onClick={() => finishMatch()}
        >
          <span>Finish</span>
          <FontAwesomeIcon icon={faCheck} />
        </button>,
      ]}
    >
      <div className="w-full flex flex-col gap-2">
        <div className="flex flex-row items-center w-full">
          <div>Match&nbsp;Type</div>
          <div className="flex-1">
            <MatchTypeRadio justifyRight />
          </div>
        </div>
        {matchState.current.teams.map((team, index) => (
          <TeamResult key={`team-result-${index}`} index={index} team={team} />
        ))}
      </div>
    </NavBarLayout>
  );
};
