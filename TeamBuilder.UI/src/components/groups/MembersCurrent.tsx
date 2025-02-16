import { FunctionComponent } from "react";
import { GroupDto } from "../../dtos/groups/GroupDto";
import { MemberItem } from "./MemberItem";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { reloadGroupMembers } from "../../store/groupMembersReducer";
import { PaginatedListLayout } from "../layout/PaginatedListLayout";
import { LoadingSpinner } from "../shared/LoadingSpinner";

export const MembersCurrent: FunctionComponent<{ group: GroupDto | null }> = ({ group }) => {
    const dispatch = useAppDispatch();
    const memberState = useAppSelector((state) => state.groupMembers);

    if (memberState.members === null) {
        return <></>
    }

    const pageChange = (page: number) => {
        dispatch(reloadGroupMembers({ page }));
    }

    return (
        <div className="size-full">
            <PaginatedListLayout pageData={memberState.members} onPageChange={pageChange}>
                <div className="w-full">
                    Members of {group?.name}
                </div>
                {
                    group && memberState.memberRequestState === 'ok' ?
                    memberState.members.items.map(p => <MemberItem key={p.id} player={p} group={group} />)
                    : <LoadingSpinner/>
                }
            </PaginatedListLayout>
        </div>
    )
}