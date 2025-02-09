import { FunctionComponent } from "react";
import { PlayerDto } from "../../dtos/players/PlayerDto";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addPlayerToGroupRequest, removePlayerFromGroupRequest } from "../../thunks/groupThunk";
import { GroupDto } from "../../dtos/groups/GroupDto";
import { reloadGroupMembers } from "../../store/groupMembersReducer";
import { ListItem } from "../shared/ListItem";
import { reloadPlayers } from "../../store/playerReducer";

export type MemberItemProps = {
    player: PlayerDto
    group: GroupDto
}

export const MemberItem: FunctionComponent<MemberItemProps> = ({player, group}) => {
    const dispatch = useAppDispatch();
    const members = useAppSelector((state) => state.groupMembers.members);
    const isInGroup = Boolean(members?.items.find(p => p.id === player.id));

    const reloadGroupPlayers = () => {
        dispatch(reloadGroupMembers({}));
        dispatch(reloadPlayers({}));
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
        <ListItem onSelected={toggleMembership}>
            {player.name}
        </ListItem>
    )
}