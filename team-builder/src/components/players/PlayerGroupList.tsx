import { FunctionComponent } from "react";
import { GroupDto } from "../../dtos/groups/GroupDto";
import { PlayerDto } from "../../dtos/players/PlayerDto";
import { reloadGroups } from "../../store/groupReducer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { GroupListItem } from "../groups/GroupListItem";
import { PaginatedListLayout } from "../layout/PaginatedListLayout";
import { LoadingSpinner } from "../shared/LoadingSpinner";

export const PlayerGroupList: FunctionComponent<{player: PlayerDto, onSelected: (group: GroupDto) => void}> = ({player, onSelected}) => {
    const dispatch = useAppDispatch();
    const groupState = useAppSelector((state) => state.groups);

    if (groupState.loading || groupState.groups === null) {
        return <LoadingSpinner />
    }

    const pageChange = (page: number) => {
        dispatch(reloadGroups({ page }))
    }

    return <div style={{ maxWidth: '400px' }} className="h-full" >
        <PaginatedListLayout pageData={groupState.groups} onPageChange={pageChange} title="Groups">
            {
                groupState.groups.items.filter(g => !player.groups.find(pg => pg.id === g.id))
                    .map(g => <GroupListItem key={g.id}
                    onSelected={() => onSelected(g)}
                    group={g}
                    isSelected={(state) => state.groups.editingGroup?.id === g.id}
                />)
            }
        </PaginatedListLayout>
    </div>
}