import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setEditingGroup } from "../../store/groupReducer";
import { reloadGroupMembers } from "../../store/groupMembersReducer";
import {
  deleteGroupRequest,
  renameGroupRequest,
} from "../../thunks/groupThunk";
import { useNavigate } from "react-router";
import { Paths } from "../../constants/Paths";
import { reloadPlayers } from "../../store/playerReducer";
import { DetailsLayout } from "../layout/DetailsLayout";
import { ConfirmModal } from "../shared/ConfirmModal";
import { AuthenticatedElement } from "../auth/AuthenticatedElement";
import { Roles } from "../../constants/Roles";
import { EditableLabel } from "../shared/EditableLabel";
import { ListItem } from "../shared/ListItem";
import { LoadingSpinner } from "../shared/LoadingSpinner";

export const EditGroup: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const groupState = useAppSelector((state) => state.groups);
  const memberState = useAppSelector((state) => state.groupMembers);
  const editingGroup = groupState.editingGroup;
  const navigate = useNavigate();

  if (editingGroup === null) {
    return <></>;
  }

  const deselectGroup = () => {
    dispatch(setEditingGroup(null));
  };

  const deleteGroup = () => {
    dispatch(deleteGroupRequest({ id: editingGroup.id }));
  };

  const editGroupMembers = () => {
    dispatch(reloadGroupMembers({}));
    dispatch(reloadPlayers({ group: null }));
    navigate(Paths.GroupMembersPath);
  };

  const renameGroup = (name: string) => {
    dispatch(
      renameGroupRequest({
        id: editingGroup.id,
        name: name,
      })
    );
  };

  return (
    <DetailsLayout
      onClose={deselectGroup}
      title={editingGroup.name}
      id={editingGroup.id.toString()}
    >
      <AuthenticatedElement roles={[Roles.Admin]}>
        <div className="w-full flex flex-row justify-between">
          <EditableLabel value={editingGroup.name} onChange={renameGroup} />
        </div>
      </AuthenticatedElement>
      <div className="flex flex-row flex-wrap gap-2">
        {memberState.memberRequestState === "loading" ? (
          <LoadingSpinner />
        ) : (
          memberState.members?.items.map((p) => (
            <ListItem key={p.id}>{p.name}</ListItem>
          ))
        )}
      </div>
      <button onClick={editGroupMembers}>Edit Members</button>
      <AuthenticatedElement roles={[Roles.Admin]}>
        <ConfirmModal onConfirm={deleteGroup} buttonContent="Delete">
          Delete Group {editingGroup.name}?
        </ConfirmModal>
      </AuthenticatedElement>
    </DetailsLayout>
  );
};
