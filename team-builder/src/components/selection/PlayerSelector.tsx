import { FunctionComponent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { PlayerItem } from "./PlayerItem";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { GroupFilter } from "../groups/GroupFilter";
import { selectPlayer } from "../../store/playerReducer";

export const PlayerSelector: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const playerState = useAppSelector((state) => state.players);
    const [filter, setFilter] = useState<string>('');

    if (playerState.players === null || playerState.loading) {
        return <LoadingSpinner />
    }

    const availablePlayers = playerState.players.items
        .filter(p => playerState.selected.find(s => p.id === s) === undefined)
        .filter(p => filter === '' ? true : p.name.toLowerCase().includes(filter.toLowerCase()))

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFilterChange = (e: any) => {
        setFilter(e.target.value)
    }

    const addAll = () => {
        for (const p of availablePlayers) {
            dispatch(selectPlayer(p));
        }
    }

    return (
        <div className="border-r p-2 h-full">
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
    )
}