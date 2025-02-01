import { FunctionComponent } from "react";
import { PaginatedListLayout } from "../layout/PaginatedListLayout";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { reloadMatches } from "../../store/matchReducer";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { MatchItem } from "./MatchItem";

export const MatchList: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const matchState = useAppSelector((state) => state.match);

    const pageChange = (page: number) => {
        dispatch(reloadMatches({page}))
    }
    if (!matchState.matches) {
        return <LoadingSpinner />
    }

    return <PaginatedListLayout pageData={matchState.matches} onPageChange={pageChange} >
        {
            matchState.matches.items.map(m => <MatchItem match={m} />)
        }
    </PaginatedListLayout>
}