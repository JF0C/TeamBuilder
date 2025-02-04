import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { GroupListItem } from "./GroupListItem";
import { reloadPlayers } from "../../store/playerReducer";
import { GroupDto } from "../../dtos/groups/GroupDto";
import { Modal } from "../shared/Modal";
import { FilterAction } from "../layout/FilterAction";

export const GroupFilter: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const playerState = useAppSelector((state) => state.players)
    const groupState = useAppSelector((state) => state.groups)

    if (groupState.groups === null || groupState.loading) {
        return <LoadingSpinner />
    }

    const groupSelected = (group: GroupDto) => {
        dispatch(reloadPlayers({group}))
    }

    const selectNoGroup = () => {
        dispatch(reloadPlayers({group: null}))
    }

    return <Modal buttonContent={<FilterAction>{`Groupfilter${playerState.group?.name ? ': ' + playerState.group?.name: ''}`}</FilterAction>}>
        {
            groupState.groups.items.map(g => <GroupListItem key={g.id}
                group={g}
                onSelected={() => groupSelected(g)}
                isSelected={(state) => state.players.group?.id === g.id}    
            />)
        }
        <GroupListItem group={{id: 0, name: '[all]'}} onSelected={selectNoGroup} isSelected={(state) => state.players.group === null} />
    </Modal>
}