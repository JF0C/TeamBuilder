import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { PlayerItem } from "./PlayerItem";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { GroupFilter } from "../groups/GroupFilter";
import { reloadPlayers, selectPlayer } from "../../store/playerReducer";
import { Pagination } from "../shared/Pagination";

export const PlayerSelector: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const playerState = useAppSelector((state) => state.players);

    if (playerState.players === null || playerState.loading) {
        return <LoadingSpinner />
    }

    const availablePlayers = playerState.players.items
        .filter(p => playerState.selected.find(s => p.id === s) === undefined)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFilterChange = (e: any) => {
        dispatch(reloadPlayers({name: e.target.value}))
    }

    const pageChange  = (page: number) => {
        dispatch(reloadPlayers({page}))
    }

    const addAll = () => {
        for (const p of availablePlayers) {
            dispatch(selectPlayer(p));
        }
    }

    return (
        <div className="border-r p-2 h-full">
            <div className="size-full flex flex-col">
                <div className="flex-1">
                    <div className="flex flex-row flex-wrap gap-2">
                        <div className="w-full">
                            Available
                        </div>
                        <div className="w-full flex flex-row flex-wrap gap-2">
                            <GroupFilter />
                            <div className="button" onClick={addAll}>Add All</div>
                            <input className="w-full" placeholder="filter" onInput={onFilterChange} />
                        </div>
                        {
                            availablePlayers.map(p => <PlayerItem key={p.id} player={p} />)
                        }
                    </div>
                </div>
                <div>
                    <Pagination pageData={playerState.players} onPageChange={pageChange}/>
                </div>
            </div>
        </div>
    )
}