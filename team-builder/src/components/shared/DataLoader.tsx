import { FunctionComponent, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { loadPlayersRequest } from "../../thunks/playerThunk";
import { LoadingSpinner } from "./LoadingSpinner";
import { loadGroupsRequest } from "../../thunks/groupThunk";
import { PaginationDefaults } from "../../constants/DefaultPagination";
import { loadMatchesRequest } from "../../thunks/matchThunk";

export const DataLoader: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const playerState = useAppSelector((state) => state.players);
    const groupState = useAppSelector((state) => state.groups);
    const matchState = useAppSelector((state) => state.match);
    const loading = playerState.loading || groupState.loading || matchState.loading
    
    const loadPlayers = () => {
        dispatch(loadPlayersRequest({ 
            page: playerState.players?.page ?? PaginationDefaults.Page,
            count: playerState.players?.count ?? PaginationDefaults.Count,
            group: playerState.group?.id ?? null
        }));
    }

    const loadGroups = () => {
        dispatch(loadGroupsRequest({
            page: groupState.groups?.page ?? PaginationDefaults.Page,
            count: groupState.groups?.count ?? PaginationDefaults.Count
        }));
    }

    const loadMatches = () => {
        dispatch(loadMatchesRequest(matchState.queryFilter));
    }

    if (playerState.players === null) {
        if (!loading) {
            loadPlayers();
        }
        return <LoadingSpinner />
    }

    if (groupState.groups === null) {
        if (!loading) {
            loadGroups();
        }
        return <LoadingSpinner />
    }

    if (matchState.matches === null) {
        if (!loading) {
            loadMatches();
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

    if (matchState.matches.items.length === 0) {
        elements.push(<div className="size-full flex flex-row justify-center items-center">
            <div onClick={loadMatches} className="button">
                Reload Matches
            </div>
        </div>)
    }

    return <>{elements}</>
}