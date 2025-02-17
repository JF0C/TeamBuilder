import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { PlayerItem } from "./PlayerItem";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { PlayerGroupFilter } from "../groups/PlayerGroupFilter";
import { reloadPlayers, selectPlayer } from "../../store/playerReducer";
import { PaginatedListLayout } from "../layout/PaginatedListLayout";
import { PlayerNameFilter } from "../players/PlayerNameFilter";
import { FilterAction } from "../layout/FilterAction";

export const PlayerSelector: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const playerState = useAppSelector((state) => state.players);
    const loading = playerState.players === null || playerState.requestState === 'loading';

    const availablePlayers = () => playerState.players?.items
        .filter(p => playerState.selected.find(s => p.id === s.id) === undefined) ?? []

    const onFilterChange = (name: string) => {
        dispatch(reloadPlayers({ name }))
    }

    const pageChange = (page: number) => {
        dispatch(reloadPlayers({ page }))
    }

    const addAll = () => {
        for (const p of availablePlayers()) {
            dispatch(selectPlayer(p));
        }
        dispatch(reloadPlayers({}))
    }

    return (
        <div className="h-full">
            <PaginatedListLayout pageData={playerState.players} onPageChange={pageChange} title={
                <>
                    <div className="w-full flex flex-row gap-2 justify-center items-center">
                        <div>Available</div>
                        <div><FilterAction onClick={addAll}>Add All</FilterAction></div>
                        
                    </div>
                    <div className="w-full flex flex-row flex-wrap gap-2">
                        <PlayerGroupFilter />
                        <PlayerNameFilter onFilterChange={onFilterChange} />
                    </div>
                </>
            }>
                {
                    loading ? <LoadingSpinner/> :
                    availablePlayers().map(p => <PlayerItem key={p.id} player={p} />)
                }
            </PaginatedListLayout>
        </div>
    )
}