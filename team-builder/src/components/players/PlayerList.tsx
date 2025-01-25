import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { PlayerListItem } from "./PlayerListItem";
import { loadPlayersRequest } from "../../thunks/playerThunk";
import { CreatePlayerItem } from "./CreatePlayerItem";

export const PlayerList: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const playerState = useAppSelector((state) => state.players);

    if (playerState.players === null) {
        if (!playerState.loading) {
            dispatch(loadPlayersRequest({page: 1, count: 100, group: null}))
        }
        return <LoadingSpinner />
    }

    if (playerState.loading) {
        return <LoadingSpinner />
    }

    return <div className="flex flex-col">
        {
            playerState.players.items.map(p => <PlayerListItem key={p.id} player={p} />)
        }
        <CreatePlayerItem />
    </div>
}