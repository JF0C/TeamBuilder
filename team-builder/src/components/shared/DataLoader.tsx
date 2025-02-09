import { FunctionComponent, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { loadPlayersRequest } from "../../thunks/playerThunk";
import { loadGroupMembersRequest, loadGroupsRequest } from "../../thunks/groupThunk";
import { loadMatchesRequest } from "../../thunks/matchThunk";

export const DataLoader: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const playerState = useAppSelector((state) => state.players);
    const groupState = useAppSelector((state) => state.groups);
    const matchState = useAppSelector((state) => state.match);
    const groupMembersState = useAppSelector((state) => state.groupMembers);
    const loading = playerState.requestState === 'loading'
        || groupState.requestState === 'loading'
        || matchState.requestState === 'loading'
        || groupMembersState.requestState === 'loading';
    
    const loadPlayers = () => {
        dispatch(loadPlayersRequest(playerState.queryFilter));
    }

    const loadGroups = () => {
        dispatch(loadGroupsRequest(groupState.queryFilter));
    }

    const loadMatches = () => {
        dispatch(loadMatchesRequest(matchState.queryFilter));
    }

    const loadGroupMembers = () => {
        dispatch(loadGroupMembersRequest(groupMembersState.queryFilter))
    }

    if (playerState.requestState === 'initial') {
        if (!loading) {
            loadPlayers();
        }
        return <></>
    }

    if (groupState.requestState === 'initial') {
        if (!loading) {
            loadGroups();
        }
        return <></>
    }

    if (matchState.requestState === 'initial') {
        if (!loading) {
            loadMatches();
        }
        return <></>
    }

    if (groupState.editingGroup !== null && groupMembersState.requestState === 'initial') {
        if (!loading) {
            loadGroupMembers();
        }
        return <></>
    }

    const elements: ReactNode[] = [];
    
    if (playerState.requestState === 'error') {
        elements.push(<div key="reload-players" className="size-full flex flex-row justify-center items-center">
            <div onClick={loadPlayers} className="button">
                Reload&nbsp;Players
            </div>
        </div>)
    }

    if (groupState.requestState === 'error') {
        elements.push(<div key="reload-groups" className="size-full flex flex-row justify-center items-center">
            <div onClick={loadGroups} className="button">
                Reload&nbsp;Groups
            </div>
        </div>)
    }

    if (matchState.requestState === 'error') {
        elements.push(<div key="reload-matches" className="size-full flex flex-row justify-center items-center">
            <div onClick={loadMatches} className="button">
                Reload&nbsp;Matches
            </div>
        </div>)
    }

    if (groupMembersState.requestState === 'error') {
        elements.push(<div key="reload-group-members" className="size-full flex flex-row justify-center items-center">
            <div onClick={loadGroupMembers} className="button">
                Reload&nbsp;Group&nbsp;Members
            </div>
        </div>)
    }

    return <div className="text-sm absolute w-0 bottom-0 flex flex-col pb-4 left-1/2">
        <div>{elements}</div>
    </div>
}