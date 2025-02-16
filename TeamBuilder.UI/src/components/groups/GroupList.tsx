import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { GroupListItem } from "./GroupListItem";
import { CreateGroupItem } from "./CreateGroupItem";
import { reloadGroups, setEditingGroup } from "../../store/groupReducer";
import { PaginatedListLayout } from "../layout/PaginatedListLayout";
import { reloadGroupMembers } from "../../store/groupMembersReducer";
import { GroupDto } from "../../dtos/groups/GroupDto";

export const GroupList: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const groupState = useAppSelector((state) => state.groups);

    if (groupState.requestState === 'loading' || groupState.groups === null) {
        return <LoadingSpinner />
    }

    const pageChange = (page: number) => {
        dispatch(reloadGroups({ page }))
    }

    const selectGroup = (group: GroupDto) => {
        dispatch(setEditingGroup(group));
        dispatch(reloadGroupMembers({
            group: group.id
        }))
    }

    return <div className="size-full" >
        <PaginatedListLayout pageData={groupState.groups} onPageChange={pageChange} title="Groups">
            {
                groupState.groups.items.map(g => <GroupListItem key={g.id}
                    onSelected={() => selectGroup(g)}
                    group={g}
                    isSelected={(state) => state.groups.editingGroup?.id === g.id}
                />)
            }
            <CreateGroupItem />
        </PaginatedListLayout>
    </div>
}