import { FunctionComponent } from "react";
import { MemberItem } from "./MemberItem";
import { GroupDto } from "../../dtos/groups/GroupDto";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { PaginatedListLayout } from "../layout/PaginatedListLayout";
import { PlayerNameFilter } from "../players/PlayerNameFilter";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { reloadAvailableMembers } from "../../store/groupMembersReducer";

export const MembersAvailable: FunctionComponent<{ group: GroupDto | null }> = ({ group }) => {
    const dispatch = useAppDispatch();
    const memberState = useAppSelector((state) => state.groupMembers)

    const onFilterChange = (name: string) => {
        dispatch(reloadAvailableMembers({ name }))
    }

    const pageChange = (page: number) => {
        dispatch(reloadAvailableMembers({ page: page }))
    }

    return (
        <div className="size-full">
            <PaginatedListLayout title={
                <>
                    <div className="w-full flex flex-row gap-2 justify-center items-center">
                        <div>Available</div>
                    </div>
                    <div className="w-full flex flex-row flex-wrap gap-2">
                        <PlayerNameFilter onFilterChange={onFilterChange} />
                    </div>
                </>
            } pageData={memberState.available} onPageChange={pageChange}>
                {
                    group && memberState.availableRequestState === 'ok' && memberState.available ?
                    memberState.available.items.map(p => <MemberItem key={p.id} player={p} group={group} />)
                    : <LoadingSpinner />
                }
            </PaginatedListLayout>
        </div>
    )
}