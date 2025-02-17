import { FunctionComponent, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { loadPlayersRequest } from "../../thunks/playerThunk";
import { loadAvailableMembersRequest, loadGroupMembersRequest, loadGroupsRequest } from "../../thunks/groupThunk";
import { loadMatchesRequest, loadMatchRequest } from "../../thunks/matchThunk";
import { AuthProperties } from "../../constants/AuthProperties";
import { LoginResponseDto } from "../../dtos/auth/LoginResponseDto";
import { restoreUser } from "../../store/authReducer";
import { loadUsersRequest } from "../../thunks/adminThunk";
import { Roles } from "../../constants/Roles";

export const DataLoader: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const authState = useAppSelector((state) => state.auth);
    const playerState = useAppSelector((state) => state.players);
    const groupState = useAppSelector((state) => state.groups);
    const matchState = useAppSelector((state) => state.match);
    const userState = useAppSelector((state) => state.users);
    const groupMembersState = useAppSelector((state) => state.groupMembers);
    const loading = playerState.requestState === 'loading'
        || groupState.requestState === 'loading'
        || matchState.matchesRequestState === 'loading'
        || matchState.selectedRequestState === 'loading'
        || groupMembersState.memberRequestState === 'loading'
        || groupMembersState.availableRequestState === 'loading'
        || userState.requestState === 'loading';
    
    const loadPlayers = () => {
        dispatch(loadPlayersRequest(playerState.queryFilter));
    }

    const loadGroups = () => {
        dispatch(loadGroupsRequest(groupState.queryFilter));
    }

    const loadMatches = () => {
        dispatch(loadMatchesRequest(matchState.queryFilter));
    }

    const loadMatch = () => {
        if (matchState.detailedMatchId !== null) {
            console.log('loading match')
            dispatch(loadMatchRequest(matchState.detailedMatchId));
        }
    }

    const loadGroupMembers = () => {
        dispatch(loadGroupMembersRequest(groupMembersState.memberFilter));
    }

    const loadAvailableMembers = () => {
        dispatch(loadAvailableMembersRequest(groupMembersState.availableFilter));
    }

    const loadUsers = () => {
        dispatch(loadUsersRequest(userState.queryFilter));
    }

    if (!authState.userRestored) {
        const storedUserData = localStorage.getItem(AuthProperties.LocalStorageUserKey);
        try {
            if (storedUserData) {
                const user: LoginResponseDto = JSON.parse(storedUserData);
                dispatch(restoreUser(user));
            }
            else {
                dispatch(restoreUser(null));
            }
        }
        catch {
            dispatch(restoreUser(null));
        }
    }

    if (playerState.requestState === 'required' && !loading) {
        loadPlayers();
    }

    if (groupState.requestState === 'required' && !loading) {
        loadGroups();
    }

    if (matchState.matchesRequestState === 'required' && !loading) {
        loadMatches();
    }

    if (matchState.selectedRequestState === 'required' && !loading) {
        loadMatch();
    }

    if (groupState.editingGroup) {
        if(groupMembersState.memberRequestState === 'required' && !loading) {
            loadGroupMembers();
        }
        if (groupMembersState.availableRequestState === 'required' && !loading) {
            loadAvailableMembers();
        }
    }

    if (authState.user?.roles.includes(Roles.Admin)
        && userState.requestState === 'required'
        && !loading) {
        loadUsers();
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

    if (matchState.matchesRequestState === 'error') {
        elements.push(<div key="reload-matches" className="size-full flex flex-row justify-center items-center">
            <div onClick={loadMatches} className="button">
                Reload&nbsp;Matches
            </div>
        </div>)
    }

    if (groupMembersState.memberRequestState === 'error') {
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