import { FunctionComponent } from "react";
import { GroupDto } from "../../dtos/groups/GroupDto";
import { PlayerDto } from "../../dtos/players/PlayerDto";
import { reloadPlayers } from "../../store/playerReducer";
import { useAppDispatch } from "../../store/store";
import { addPlayerToGroupRequest, removePlayerFromGroupRequest } from "../../thunks/groupThunk";
import { ListItem } from "../shared/ListItem";
import { Modal } from "../shared/Modal";
import { PlayerGroupList } from "./PlayerGroupList";
import { ConfirmModal } from "../shared/ConfirmModal";

export const PlayerGroups: FunctionComponent<{ player: PlayerDto }> = ({ player }) => {
    const dispatch = useAppDispatch();

    const removeGroup = (group: GroupDto) => {
        dispatch(removePlayerFromGroupRequest({
            playerId: player.id,
            groupId: group.id
        })).unwrap().then(() => {
            dispatch(reloadPlayers({}))
        })
    }

    const addGroup = (group: GroupDto) => {
        dispatch(addPlayerToGroupRequest({
            playerId: player.id,
            groupId: group.id
        })).unwrap().then(() => {
            dispatch(reloadPlayers({}))
        })
    }

    return <div>
        <div>
            Groups
        </div>
        <div className="flex flex-row flex-wrap gap-2">
            {
                player.groups.map(g =>
                    <ConfirmModal key={`player-group-${g.id}`}
                        buttonContent={<ListItem>{g.name}</ListItem>}
                        onConfirm={() => removeGroup(g)}
                    >
                        Unassign {player.name} from {g.name}?
                    </ConfirmModal>)
            }
            <Modal buttonContent={<ListItem>Assign Group</ListItem>}>
                <PlayerGroupList player={player} onSelected={addGroup} />
            </Modal>
        </div>
    </div>
}