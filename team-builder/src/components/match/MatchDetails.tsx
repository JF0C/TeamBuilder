import { FunctionComponent } from "react";
import { NavBarLayout } from "../layout/NavbarLayout";
import { NavLink, useParams } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { millisToDateTimeString } from "../../mapping/timestampMapper";
import { MatchTeamTable } from "./MatchTeamTable";
import { useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { matchTypeToString } from "../../mapping/matchTypeMapper";

export const MatchDetails: FunctionComponent = () => {
    const match = useAppSelector((state) => state.match.selected)
    const matchId = useParams()['*']

    if (!match) {
        return <LoadingSpinner />
    }

    console.log("match id: ", matchId);

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
                {match.teams.map(t => t.players.length).reduce((a, b) => a + b)} Players
            </div>
        </div>
        <MatchTeamTable match={match} />
    </NavBarLayout>
}