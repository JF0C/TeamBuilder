import { FunctionComponent } from "react";
import { GroupDto } from "../../dtos/GroupDto";
import { MemberItem } from "./MemberItem";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { reloadEditingGroupPlayers } from "../../store/groupReducer";
import { PaginatedListLayout } from "../layout/PaginatedListLayout";

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
        <div className="size-full">
            <PaginatedListLayout pageData={groupState.editingGroupPlayers} onPageChange={pageChange}>
                <div className="w-full">
                    Members of {group.name}
                </div>
                {
                    editingGroupPlayers.items.map(p => <MemberItem key={p.id} player={p} group={group} />)
                }
            </PaginatedListLayout>

        </div>
    )
}