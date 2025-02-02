import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { DetailsLayout } from "../layout/DetailsLayout";
import { matchTypeToString } from "../../mapping/matchTypeMapper";
import { selectMatch } from "../../store/matchReducer";
import { millisToDateTimeString } from "../../mapping/timestampMapper";
import { MatchTeamDetails } from "./MatchTeamDetails";

export const MatchDetails: FunctionComponent = () => {
    const dispatch = useAppDispatch()
    const match = useAppSelector((state) => state.match.selected)

    if (!match) {
        return <></>
    }
    const deselectMatch = () => {
        dispatch(selectMatch(null))
    }

    const teams = [...match.teams].sort((a, b) => b.score - a.score);
    const winner = teams.find(() => true);

    const title = `${matchTypeToString(match.type)}`

    return <DetailsLayout title={title} id={match.id.toString()} onClose={deselectMatch}>
        <div>
            {millisToDateTimeString(match.created)}
        </div>
        <div>
            {
                winner ? `Winner: ${winner.name}` : ''
            }
        </div>
        <div>
            {
                teams.map(t => <MatchTeamDetails key={t.id} team={t}/>)
            }
        </div>
    </DetailsLayout>
}