import { FunctionComponent } from "react";
import { GroupDto } from "../../dtos/GroupDto";
import { MemberItem } from "./MemberItem";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Pagination } from "../shared/Pagination";
import { reloadEditingGroupPlayers } from "../../store/groupReducer";

export const MembersCurrent: FunctionComponent<{ group: GroupDto }> = ({ group }) => {
    const dispatch = useAppDispatch();
    const groupState = useAppSelector((state) => state.groups);
    const editingGroupPlayers = groupState.editingGroupPlayers;

    if (editingGroupPlayers === null) {
        return <></>
    }

    const pageChange = (page: number) => {
        dispatch(reloadEditingGroupPlayers({ page }));
    }

    return (
        <div className="p-2 size-full">
            <div className="size-full flex flex-col">
                <div className="flex-1 size-full">
                    <div className="flex flex-row flex-wrap gap-2">
                        <div className="w-full">
                            Members of {group.name}
                        </div>
                        {
                            editingGroupPlayers.items.map(p => <MemberItem key={p.id} player={p} group={group} />)
                        }
                    </div>
                </div>
                <div className="w-full">
                    <Pagination pageData={groupState.editingGroupPlayers} onPageChange={pageChange} />
                </div>
            </div>
        </div>
    )
}