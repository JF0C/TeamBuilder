import { ChangeEvent, FunctionComponent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { reloadEditingGroupPlayers, reloadGroups, setEditingGroup } from "../../store/groupReducer";
import { deleteGroupRequest, renameGroupRequest } from "../../thunks/groupThunk";
import { useNavigate } from "react-router";
import { Paths } from "../../constants/Paths";
import { reloadPlayers } from "../../store/playerReducer";
import { DetailsLayout } from "../layout/DetailsLayout";
import { ConfirmModal } from "../shared/ConfirmModal";
import { AuthenticatedElement } from "../auth/AuthenticatedElement";
import { Roles } from "../../constants/Roles";

export const EditGroup: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const groupState = useAppSelector((state) => state.groups)
    const editingGroup = groupState.editingGroup
    const navigate = useNavigate()
    const [newName, setNewName] = useState(editingGroup?.name ?? '')

    if (editingGroup === null) {
        return <></>
    }

    const deselectGroup = () => {
        dispatch(setEditingGroup(null))
    }

    const deleteGroup = () => {
        dispatch(deleteGroupRequest({ id: editingGroup.id }))
            .unwrap()
            .then(() => {
                dispatch(reloadGroups({}))
                dispatch(setEditingGroup(null))
            })
    }

    const editGroupMembers = () => {
        dispatch(reloadEditingGroupPlayers({}))
        dispatch(reloadPlayers({ group: null }))
        navigate(Paths.GroupMembersPath)
    }

    const renameGroup = () => {
        dispatch(renameGroupRequest({
            id: editingGroup.id,
            name: newName
        })).unwrap().then(() => dispatch(reloadGroups({})))
    }

    return <DetailsLayout onClose={deselectGroup} title={editingGroup.name} id={editingGroup.id.toString()}>
        <div className="button" onClick={editGroupMembers}>Edit Members</div>
        <AuthenticatedElement roles={[Roles.Admin]}>
            <div className="w-full flex flex-row justify-between">
                <input value={newName} className="w-32 ml-1" 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewName(e.target.value)}/>
                <div className="button" onClick={renameGroup}>
                    Rename
                </div>
            </div>
            <ConfirmModal onConfirm={deleteGroup} buttonContent="Delete">
                Delete Group {editingGroup.name}?
            </ConfirmModal>
        </AuthenticatedElement>
    </DetailsLayout>
}