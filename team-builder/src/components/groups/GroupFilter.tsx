import { FunctionComponent } from "react";
import { AppDispatch, useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { GroupListItem } from "./GroupListItem";
import { reloadPlayers } from "../../store/playerReducer";
import { GroupDto } from "../../dtos/GroupDto";
import { Modal } from "../shared/Modal";

export const GroupFilter: FunctionComponent = () => {
    const playerState = useAppSelector((state) => state.players)
    const groupState = useAppSelector((state) => state.groups)

    if (groupState.groups === null || groupState.loading) {
        return <LoadingSpinner />
    }

    const groupSelected = (group: GroupDto, dispatch: AppDispatch) => {
        dispatch(reloadPlayers({group}))
    }

    const selectNoGroup = (_group: GroupDto, dispatch: AppDispatch) => {
        dispatch(reloadPlayers({group: null}))
    }

    return <Modal buttonContent={`Groupfilter: ${playerState.group?.name ?? '[all]'}`}>
        {
            groupState.groups.items.map(g => <GroupListItem className="closes-modal" key={g.id} group={g} onSelected={groupSelected}/>)
        }
        <GroupListItem className="closes-modal" group={{id: 0, name: '[all]'}} onSelected={selectNoGroup} />
    </Modal>
}