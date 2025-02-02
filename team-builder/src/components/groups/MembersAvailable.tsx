import { FunctionComponent } from "react";
import { PlayerDto } from "../../dtos/PlayerDto";
import { MemberItem } from "./MemberItem";
import { GroupDto } from "../../dtos/GroupDto";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { reloadPlayers } from "../../store/playerReducer";
import { PaginatedListLayout } from "../layout/PaginatedListLayout";
import { PlayerNameFilter } from "../players/PlayerNameFilter";
import { LoadingSpinner } from "../shared/LoadingSpinner";

export const MembersAvailable: FunctionComponent<{ availableMembers: PlayerDto[], group: GroupDto | null }> = ({ availableMembers, group }) => {
    const dispatch = useAppDispatch();
    const playerState = useAppSelector((state) => state.players)

    const onFilterChange = (name: string) => {
        dispatch(reloadPlayers({ name }))
    }

    const pageChange = (page: number) => {
        dispatch(reloadPlayers({ page: page }))
    }

    return (
        <div className="size-full">
            <PaginatedListLayout pageData={playerState.players} onPageChange={pageChange}>
                <div className="w-full">
                    Available
                </div>
                <div className="w-full">
                    <PlayerNameFilter onFilterChange={onFilterChange} />
                </div>
                {
                    group && !playerState.loading ?
                    availableMembers.map(p => <MemberItem key={p.id} player={p} group={group} />)
                    : <LoadingSpinner />
                }
            </PaginatedListLayout>
        </div>
    )
}