import { FunctionComponent, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { loadPlayersRequest } from "../../thunks/playerThunk";
import { LoadingSpinner } from "./LoadingSpinner";
import { loadGroupsRequest } from "../../thunks/groupThunk";

export const DataLoader: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const playerState = useAppSelector((state) => state.players);
    const groupState = useAppSelector((state) => state.groups);
    
    const loadPlayers = () => {
        dispatch(loadPlayersRequest({ page: 1, count: 100, group: playerState.group?.id ?? null }));
    }

    const loadGroups = () => {
        dispatch(loadGroupsRequest({ page: 1, count: 100 }));
    }

    if (playerState.players === null) {
        if (!playerState.loading) {
            loadPlayers();
        }
        return <LoadingSpinner />
    }

    if (groupState.groups === null) {
        if (!groupState.loading) {
            loadGroups();
        }
        return <LoadingSpinner />
    }

    const elements: ReactNode[] = [];
    
    if (playerState.players.items.length === 0) {
        elements.push(<div className="size-full flex flex-row justify-center items-center">
            <div onClick={loadPlayers} className="button">
                Reload Players
            </div>
        </div>)
    }

    if (groupState.groups.items.length === 0) {
        elements.push(<div className="size-full flex flex-row justify-center items-center">
            <div onClick={loadGroups} className="button">
                Reload Groups
            </div>
        </div>)
    }

    return <>{elements}</>
}