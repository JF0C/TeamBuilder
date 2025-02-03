import { FunctionComponent, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { loadPlayersRequest } from "../../thunks/playerThunk";
import { loadGroupPlayersRequest, loadGroupsRequest } from "../../thunks/groupThunk";
import { loadMatchesRequest } from "../../thunks/matchThunk";

export const DataLoader: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const playerState = useAppSelector((state) => state.players);
    const groupState = useAppSelector((state) => state.groups);
    const matchState = useAppSelector((state) => state.match);
    const loading = playerState.loading || groupState.loading || matchState.loading;
    
    const loadPlayers = () => {
        dispatch(loadPlayersRequest(playerState.queryFilter));
    }

    const loadGroups = () => {
        dispatch(loadGroupsRequest(groupState.queryFilter));
    }

    const loadMatches = () => {
        dispatch(loadMatchesRequest(matchState.queryFilter));
    }

    const loadGroupPlayers = () => {
        dispatch(loadGroupPlayersRequest(groupState.groupPlayersFilter))
    }

    if (playerState.players === null) {
        if (!loading) {
            loadPlayers();
        }
        return <></>
    }

    if (groupState.groups === null) {
        if (!loading) {
            loadGroups();
        }
        return <></>
    }

    if (matchState.matches === null) {
        if (!loading) {
            loadMatches();
        }
        return <></>
    }

    if (groupState.editingGroup !== null && groupState.editingGroupPlayers === null) {
        if (!loading) {
            loadGroupPlayers();
        }
        return <></>
    }

    const elements: ReactNode[] = [];
    
    if (playerState.players.items.length === 0) {
        elements.push(<div key="reload-players" className="size-full flex flex-row justify-center items-center">
            <div onClick={loadPlayers} className="button">
                Reload Players
            </div>
        </div>)
    }

    if (groupState.groups.items.length === 0) {
        elements.push(<div key="reload-groups" className="size-full flex flex-row justify-center items-center">
            <div onClick={loadGroups} className="button">
                Reload Groups
            </div>
        </div>)
    }

    if (matchState.matches.items.length === 0) {
        elements.push(<div key="reload-matches" className="size-full flex flex-row justify-center items-center">
            <div onClick={loadMatches} className="button">
                Reload Matches
            </div>
        </div>)
    }

    return <>{elements}</>
}