import { FunctionComponent } from "react";
import { GroupDto } from "../../dtos/GroupDto";
import { PlayerDto } from "../../dtos/PlayerDto";
import { reloadPlayers } from "../../store/playerReducer";
import { useAppDispatch } from "../../store/store";
import { addPlayerToGroupRequest, removePlayerFromGroupRequest } from "../../thunks/groupThunk";
import { ListItem } from "../layout/ListItem";
import { Modal } from "../shared/Modal";
import { PlayerGroupList } from "./PlayerGroupList";

export const PlayerGroups: FunctionComponent<{player: PlayerDto}> = ({player}) => {
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
                    <Modal key={`player-group-${g.id}`}
                        buttonContent={<ListItem>{g.name}</ListItem>}>
                            <div>
                                Unassign {player.name} from {g.name}?
                            </div>
                            <div className="flex flex-row justify-between w-full">
                                <div className="button closes-modal">Cancel</div>
                                <div onClick={() => removeGroup(g)} className="button color-red">Confirm</div>
                            </div>
                    </Modal>)
            }
            <Modal buttonContent={<ListItem>Assign Group</ListItem>}>
                <PlayerGroupList player={player} onSelected={addGroup}/>
            </Modal>
        </div>
    </div>
}