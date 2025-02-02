import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { reloadEditingGroupPlayers, reloadGroups, setEditingGroup } from "../../store/groupReducer";
import { deleteGroupRequest } from "../../thunks/groupThunk";
import { useNavigate } from "react-router";
import { Paths } from "../../constants/Paths";
import { reloadPlayers } from "../../store/playerReducer";
import { DetailsLayout } from "../layout/DetailsLayout";
import { ConfirmModal } from "../shared/ConfirmModal";

export const EditGroup: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const groupState = useAppSelector((state) => state.groups)
    const editingGroup = groupState.editingGroup
    const navigate = useNavigate()

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

    return <DetailsLayout onClose={deselectGroup} title={editingGroup.name} id={editingGroup.id.toString()}>
        <div className="button" onClick={editGroupMembers}>Members</div>
        <ConfirmModal onConfirm={deleteGroup} buttonContent="Delete">
            Delete Group {editingGroup.name}?
        </ConfirmModal>
    </DetailsLayout>
}