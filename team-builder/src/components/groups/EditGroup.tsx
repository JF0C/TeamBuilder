import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setEditingGroup } from "../../store/groupReducer";
import { deleteGroupRequest, loadGroupPlayersRequest, loadGroupsRequest } from "../../thunks/groupThunk";
import { useNavigate } from "react-router";
import { Paths } from "../../constants/Paths";
import { loadPlayersRequest } from "../../thunks/playerThunk";

export const EditGroup: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const groupState = useAppSelector((state) => state.groups)
    const playerState = useAppSelector((state) => state.players)
    const editingGroup = groupState.editingGroup
    const navigate = useNavigate()

    if (editingGroup === null) {
        return <></>
    }

    const deselectGroup = () => {
        dispatch(setEditingGroup(null))
    }

    const deleteGroup = () => {
        dispatch(deleteGroupRequest({id: editingGroup.id}))
            .unwrap()
            .then(() => {
                dispatch(loadGroupsRequest({
                    page: groupState.groups?.page ?? 1,
                    count: groupState.groups?.count ?? 100,
                }))
                dispatch(setEditingGroup(null))
            })
    }

    const editGroupMembers = () => {
        dispatch(loadGroupPlayersRequest({
            page: playerState.players?.page ?? 1,
            count: playerState.players?.count ?? 100,
            group: editingGroup.id
        }))
        dispatch(loadPlayersRequest({
            page: playerState.players?.page ?? 1,
            count: playerState.players?.count ?? 100,
            group: null
        }))
        navigate(Paths.GroupMembersPath)
    }

    return <div style={{minWidth: '200px'}} className="pb-4">
        <div className="flex flex-row justify-between">
            <div>{editingGroup.id}</div>
            <div>{editingGroup.name}</div>
            <div onClick={deselectGroup} className="button">X</div>
        </div>
        <div>
            <div className="button" onClick={editGroupMembers}>Members</div>
            <div className="button" onClick={deleteGroup}>Delete</div>
        </div>
    </div>
}