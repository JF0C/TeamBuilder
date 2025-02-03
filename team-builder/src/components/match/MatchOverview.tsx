import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { DetailsLayout } from "../layout/DetailsLayout";
import { matchTypeToString } from "../../mapping/matchTypeMapper";
import { selectMatch } from "../../store/matchReducer";
import { millisToDateTimeString } from "../../mapping/timestampMapper";
import { MatchTeamTable } from "./MatchTeamTable";
import { NavLink } from "react-router-dom";
import { Paths } from "../../constants/Paths";

export const MatchOverview: FunctionComponent = () => {
    const dispatch = useAppDispatch()
    const match = useAppSelector((state) => state.match.selected)

    if (!match) {
        return <></>
    }
    const deselectMatch = () => {
        dispatch(selectMatch(null))
    }

    const title = `${matchTypeToString(match.type)}`

    return <DetailsLayout title={title} id={match.id.toString()} onClose={deselectMatch}>
        <div className="w-full flex flex-row text-msm gap-2">
            <div>
                {millisToDateTimeString(match.created)}
            </div>
            <div>
                {match.teams.map(t => t.players.length).reduce((a, b) => a + b)} Players
            </div>
        </div>
        <MatchTeamTable match={match} />
        <NavLink to={`${Paths.MatchDetailPath}/${match.id}`}>
            Details
        </NavLink>
    </DetailsLayout>
}