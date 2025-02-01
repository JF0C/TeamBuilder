import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { GroupListItem } from "./GroupListItem";
import { CreateGroupItem } from "./CreateGroupItem";
import { reloadGroups, setEditingGroup } from "../../store/groupReducer";
import { Pagination } from "../shared/Pagination";

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
        <div className="size-full flex flex-col">
            <div className="flex-1">
                <div className="flex flex-row flex-wrap gap-2">
                    {
                        groupState.groups.items.map(g => <GroupListItem key={g.id} onSelected={(g, d) => d(setEditingGroup(g))} group={g} />)
                    }
                    <CreateGroupItem />

                </div>
            </div>
            <div className="w-full">
                <Pagination pageData={groupState.groups} onPageChange={pageChange} />
            </div>
        </div>
    </div>
}