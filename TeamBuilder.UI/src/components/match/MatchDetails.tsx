import { FunctionComponent, useState } from "react";
import { NavBarLayout } from "../layout/NavbarLayout";
import { useNavigate, useParams } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { millisToDateTimeString } from "../../mapping/timestampMapper";
import { MatchTeamTable } from "./MatchTeamTable";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { matchTypeToString } from "../../mapping/matchTypeMapper";
import {
  deleteMatchRequest,
  setMatchScoresRequest,
  updateMatchTypeRequest,
} from "../../thunks/matchThunk";
import { totalPlayers } from "../../mapping/matchStatistics";
import { setDetailedMatch, setMatchType } from "../../store/matchReducer";
import { ConfirmModal } from "../shared/ConfirmModal";
import { AuthenticatedElement } from "../auth/AuthenticatedElement";
import { Roles } from "../../constants/Roles";
import { LinkBack } from "../shared/LinkBack";
import { MatchTypeRadio } from "../shared/MatchTypeRadio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPenSquare, faX } from "@fortawesome/free-solid-svg-icons";

export const MatchDetails: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const matchState = useAppSelector((state) => state.match);
  const match = matchState.selected;
  const matchParam = useParams()["*"];
  const matchId = Number(matchParam);
  const [changingScores, setChangingScores] = useState(false);
  const [changingMatchType, setChangingMatchType] = useState(false);

  if (isNaN(matchId)) {
    return <div>Error: invalid match id {matchParam}</div>;
  }

  if (matchId !== matchState.detailedMatchId) {
    dispatch(setDetailedMatch(matchId));
  }

  if (!match || matchState.selectedRequestState === "loading") {
    return <LoadingSpinner />;
  }

  const changeScores = () => {
    if (!changingScores) {
      setChangingScores(true);
    } else {
      setChangingScores(false);
      dispatch(
        setMatchScoresRequest({
          matchId: match.id,
          scores: matchState.changedScores,
        })
      );
    }
  };

  const changeMatchType = () => {
    if (!changingMatchType) {
      setChangingMatchType(true);
      setMatchType(match.type);
    } else {
      dispatch(
        updateMatchTypeRequest({
          matchId: match.id,
          type: matchState.current.type,
        })
      );
      setChangingMatchType(false);
    }
  };

  const deleteMatch = () => {
    dispatch(deleteMatchRequest(match.id))
      .unwrap()
      .then(() => {
        navigate(Paths.MatchManagementPath);
      });
  };

  return (
    <NavBarLayout navigation={<LinkBack to={Paths.MatchManagementPath} />}>
      <div className="size-full flex flex-col">
        <div className="w-full text-center font-bold">
          {changingMatchType ? (
            <div className="flex flex-row justify-center items-center gap-2">
              <MatchTypeRadio />
              <button>
                <FontAwesomeIcon icon={faCheck} onClick={changeMatchType} />
              </button>
              <button>
                <FontAwesomeIcon
                  icon={faX}
                  onClick={() => setChangingMatchType(false)}
                />
              </button>
            </div>
          ) : (
            <div className="flex flex-row justify-center items-center gap-2">
              <span>{matchTypeToString(match.type)}</span>
              <AuthenticatedElement>
                <button onClick={changeMatchType}>
                  <FontAwesomeIcon icon={faPenSquare} />
                </button>
              </AuthenticatedElement>
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="w-full flex flex-row text-msm gap-2">
            <div>{millisToDateTimeString(match.created)}</div>
            <div>{totalPlayers(match)} Players</div>
          </div>
          <MatchTeamTable
            match={match}
            expanded
            changeScores={changingScores}
          />
        </div>
        <AuthenticatedElement>
          <div
            className={`flex flex-row ${
              changingScores ? "justify-between" : "justify-center"
            } w-full`}
          >
            {changingScores ? (
              <button onClick={() => setChangingScores(false)}>Cancel</button>
            ) : (
              <></>
            )}
            <button onClick={changeScores}>
              {changingScores ? "Save Scores" : "Change Scores"}
            </button>
          </div>
        </AuthenticatedElement>
        <AuthenticatedElement roles={[Roles.Admin]}>
          <div className="flex flex-row justify-center">
            <ConfirmModal
              onConfirm={deleteMatch}
              buttonContent={<div className="color-red">Delete</div>}
            >
              Delete Match?
            </ConfirmModal>
          </div>
        </AuthenticatedElement>
      </div>
    </NavBarLayout>
  );
};
