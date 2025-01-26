import { FunctionComponent } from "react";
import { PlayerDto } from "../../dtos/PlayerDto";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addPlayerToGroupRequest, loadGroupPlayersRequest, removePlayerFromGroupRequest } from "../../thunks/groupThunk";
import { GroupDto } from "../../dtos/GroupDto";

export type MemberItemProps = {
    player: PlayerDto
    group: GroupDto
}

export const MemberItem: FunctionComponent<MemberItemProps> = ({player, group}) => {
    const dispatch = useAppDispatch();
    const editingGroupPlayers = useAppSelector((state) => state.groups.editingGroupPlayers);
    const isInGroup = Boolean(editingGroupPlayers?.items.find(p => p.id === player.id));

    const reloadGroupPlayers = () => {
        dispatch(loadGroupPlayersRequest({
            page: editingGroupPlayers?.page ?? 1,
            count: editingGroupPlayers?.count ?? 100,
            group: group.id
        }))
    }

    const toggleMembership = () => {
        if (!isInGroup) {
            dispatch(addPlayerToGroupRequest({
                groupId: group.id,
                playerId: player.id
            })).unwrap()
            .then(reloadGroupPlayers)
        }
        else {
            dispatch(removePlayerFromGroupRequest({
                groupId: group.id,
                playerId: player.id
            })).unwrap()
            .then(reloadGroupPlayers)
        }
    }

    return (
        <div className="player-item border rounded-md px-2 cursor-pointer"
            onClick={toggleMembership}>
            {player.name}
        </div>
    )
}