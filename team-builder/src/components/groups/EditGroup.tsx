import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setEditingGroup } from "../../store/groupReducer";
import { deleteGroupRequest, loadGroupsRequest } from "../../thunks/groupThunk";

export const EditGroup: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const groupState = useAppSelector((state) => state.groups)
    const editingGroup = groupState.editingGroup

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

    return <div style={{minWidth: '200px'}} className="pb-4">
        <div className="flex flex-row justify-between">
            <div>{editingGroup.id}</div>
            <div>{editingGroup.name}</div>
            <div onClick={deselectGroup} className="button">X</div>
        </div>
        <div>
        <div className="button" onClick={deleteGroup}>Delete</div>
        </div>
    </div>
}