import { FunctionComponent } from "react";
import { useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { PlayerListItem } from "./PlayerListItem";
import { CreatePlayerItem } from "./CreatePlayerItem";
import { setEditingPlayer } from "../../store/playerReducer";
import { GroupFilter } from "../groups/GroupFilter";

export const PlayerList: FunctionComponent = () => {
    const playerState = useAppSelector((state) => state.players);

    if (playerState.loading || playerState.players === null) {
        return <LoadingSpinner />
    }

    return <div style={{maxWidth: '400px'}} className="flex flex-row flex-wrap gap-2">
        <div className="w-full">
            <GroupFilter />
        </div>
        {
            playerState.players.items.map(p => 
                <PlayerListItem key={p.id} player={p} onSelected={(p, d) => d(setEditingPlayer(p))} />)
        }
        <CreatePlayerItem />
    </div>
}