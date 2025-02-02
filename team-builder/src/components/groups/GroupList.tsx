import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { GroupListItem } from "./GroupListItem";
import { CreateGroupItem } from "./CreateGroupItem";
import { reloadGroups, setEditingGroup } from "../../store/groupReducer";
import { PaginatedListLayout } from "../layout/PaginatedListLayout";

export const GroupList: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const groupState = useAppSelector((state) => state.groups);

    if (groupState.loading || groupState.groups === null) {
        return <LoadingSpinner />
    }

    const pageChange = (page: number) => {
        dispatch(reloadGroups({ page }))
    }

    return <div style={{ maxWidth: '400px' }} className="h-full" >
        <PaginatedListLayout pageData={groupState.groups} onPageChange={pageChange}>
            {
                groupState.groups.items.map(g => <GroupListItem key={g.id}
                    onSelected={() => dispatch(setEditingGroup(g))}
                    group={g} 
                    isSelected={(state) => state.groups.editingGroup?.id === g.id}    
                />)
            }
            <CreateGroupItem />
        </PaginatedListLayout>
    </div>
}