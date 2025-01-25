import { FunctionComponent } from "react";
import { useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { GroupListItem } from "./GroupListItem";
import { CreateGroupItem } from "./CreateGroupItem";
import { setEditingGroup } from "../../store/groupReducer";

export const GroupList: FunctionComponent = () => {
    const groupState = useAppSelector((state) => state.groups);

    if (groupState.loading || groupState.groups === null) {
        return <LoadingSpinner />
    }

    return <div style={{maxWidth: '400px'}} className="flex flex-row flex-wrap gap-2">
        {
            groupState.groups.items.map(g => <GroupListItem key={g.id} onSelected={(g, d) => d(setEditingGroup(g))} group={g} />)
        }
        <CreateGroupItem />
    </div>
}