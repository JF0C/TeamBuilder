import { FunctionComponent } from "react";
import { NavBarLayout } from "../layout/NavbarLayout";
import { NavLink, useParams } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { millisToDateTimeString } from "../../mapping/timestampMapper";
import { MatchTeamTable } from "./MatchTeamTable";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { matchTypeToString } from "../../mapping/matchTypeMapper";
import { loadMatchRequest } from "../../thunks/matchThunk";
import { totalPlayers } from "../../mapping/matchStatistics";

export const MatchDetails: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const matchState = useAppSelector((state) => state.match)
    const match = matchState.selected
    const matchParam = useParams()['*']
    const matchId = Number(matchParam)

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
    return <NavBarLayout navigation={<>
        <div>
            <NavLink to={Paths.MatchManagementPath}>Back</NavLink>
        </div>
    </>}>
        <div className="w-full text-center font-bold">
            {matchTypeToString(match.type)}
        </div>
        <div className="w-full flex flex-row text-msm gap-2">
            <div>
                {millisToDateTimeString(match.created)}
            </div>
            <div>
                {totalPlayers(match)} Players
            </div>
        </div>
        <MatchTeamTable match={match} />
    </NavBarLayout>
}