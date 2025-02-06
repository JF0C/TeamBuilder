import { FunctionComponent, useState } from "react";
import { NavBarLayout } from "../layout/NavbarLayout";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { millisToDateTimeString } from "../../mapping/timestampMapper";
import { MatchTeamTable } from "./MatchTeamTable";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { matchTypeToString } from "../../mapping/matchTypeMapper";
import { deleteMatchRequest, loadMatchRequest, setMatchScoresRequest } from "../../thunks/matchThunk";
import { totalPlayers } from "../../mapping/matchStatistics";
import { reloadMatches, selectMatch } from "../../store/matchReducer";
import { ConfirmModal } from "../shared/ConfirmModal";
import { AuthenticatedElement } from "../auth/AuthenticatedElement";
import { Roles } from "../../constants/Roles";

export const MatchDetails: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const matchState = useAppSelector((state) => state.match)
    const match = matchState.selected
    const matchParam = useParams()['*']
    const matchId = Number(matchParam)
    const [changingScores, setChangingScores] = useState(false)

    if (isNaN(matchId)) {
        return <div>
            Error: invalid match id {matchParam}
        </div>
    }

    if (matchId !== match?.id) {
        dispatch(loadMatchRequest(matchId))
    }

    if (!match || matchState.loading) {
        return <LoadingSpinner />
    }

    const changeScores = () => {
        if (!changingScores) {
            setChangingScores(true)
        }
        else {
            dispatch(setMatchScoresRequest({
                matchId: match.id,
                scores: matchState.changedScores
            })).unwrap().then(() => {
                dispatch(loadMatchRequest(match.id))
                setChangingScores(false)
            })
        }
    }

    const deleteMatch = () => {
        dispatch(deleteMatchRequest(match.id))
            .unwrap().then(() => {
                navigate(Paths.MatchManagementPath);
                dispatch(reloadMatches({}));
                dispatch(selectMatch(null))
            })
    }

    return <NavBarLayout navigation={<>
        <div>
            <NavLink to={Paths.MatchManagementPath}>Back</NavLink>
        </div>
    </>}>
        <div className="size-full flex flex-col">
            <div className="w-full text-center font-bold">
                {matchTypeToString(match.type)}
            </div>
            <div className="flex-1">
                <div className="w-full flex flex-row text-msm gap-2">
                    <div>
                        {millisToDateTimeString(match.created)}
                    </div>
                    <div>
                        {totalPlayers(match)} Players
                    </div>
                </div>
                <MatchTeamTable match={match} expanded changeScores={changingScores} />
            </div>
            <AuthenticatedElement>
                <div className={`flex flex-row ${changingScores ? 'justify-between' : 'justify-center'} w-full`}>
                    {
                        changingScores ? <div className="button" onClick={() => setChangingScores(false)}>Cancel</div> : <></>
                    }
                    <div className="button" onClick={changeScores}>
                        {changingScores ? 'Save Scores' : 'Change Scores'}
                    </div>
                </div>
            </AuthenticatedElement>
            <AuthenticatedElement roles={[Roles.Admin]}>
                <div className="flex flex-row justify-center">
                    <ConfirmModal onConfirm={deleteMatch} buttonContent={<div className="color-red">Delete</div>}>
                        Delete Match?
                    </ConfirmModal>
                </div>
            </AuthenticatedElement>
        </div>
    </NavBarLayout>
}