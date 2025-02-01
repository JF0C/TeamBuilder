import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { PlayerListItem } from "./PlayerListItem";
import { CreatePlayerItem } from "./CreatePlayerItem";
import { reloadPlayers, setEditingPlayer } from "../../store/playerReducer";
import { GroupFilter } from "../groups/GroupFilter";
import { Pagination } from "../shared/Pagination";

export const PlayerList: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const playerState = useAppSelector((state) => state.players);

    if (playerState.loading || playerState.players === null) {
        return <LoadingSpinner />
    }

    const pageChange = (page: number) => {
        dispatch(reloadPlayers({ page }))
    }

    return <div style={{ maxWidth: '400px' }} className="flex flex-col flex-wrap gap-2 h-full">
        <div className="flex-1 ">
            <div className="flex flex-row flex-wrap gap-2 items-start">
                <div className="w-full">
                    <GroupFilter />
                </div>
                {
                    playerState.players.items.map(p =>
                        <PlayerListItem key={p.id} player={p} onSelected={(p, d) => d(setEditingPlayer(p))} />)
                }
                <CreatePlayerItem />
            </div>
        </div>
        <div>
            <Pagination pageData={playerState.players} onPageChange={pageChange} />
        </div>
    </div>
}