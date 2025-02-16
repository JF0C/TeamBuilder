import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { PlayerListItem } from "./PlayerListItem";
import { CreatePlayerItem } from "./CreatePlayerItem";
import { reloadPlayers, setEditingPlayer } from "../../store/playerReducer";
import { GroupFilter } from "../groups/GroupFilter";
import { PaginatedListLayout } from "../layout/PaginatedListLayout";

export const PlayerList: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const playerState = useAppSelector((state) => state.players);

    if (playerState.requestState === 'loading' || playerState.players === null) {
        return <LoadingSpinner />
    }

    const pageChange = (page: number) => {
        dispatch(reloadPlayers({ page }))
    }

    return <div className="size-full">
        <PaginatedListLayout pageData={playerState.players} onPageChange={pageChange} title={
            <>
                <div>
                    Players
                </div>
                <div className="w-full">
                    <GroupFilter />
                </div>
            </>
        }>
            <CreatePlayerItem />
            {
                playerState.players.items.map(p =>
                    <PlayerListItem key={p.id} player={p} onSelected={() => dispatch(setEditingPlayer(p))} />)
            }
        </PaginatedListLayout>
    </div>
}