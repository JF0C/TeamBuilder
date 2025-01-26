import { FunctionComponent } from "react";
import { AppDispatch, useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { GroupListItem } from "./GroupListItem";
import { resetPlayers, setGroup } from "../../store/playerReducer";
import { GroupDto } from "../../dtos/GroupDto";
import { Modal } from "../shared/Modal";

export const GroupFilter: FunctionComponent = () => {
    const playerState = useAppSelector((state) => state.players)
    const groupState = useAppSelector((state) => state.groups)

    if (groupState.groups === null || groupState.loading) {
        return <LoadingSpinner />
    }

    const groupSelected = (group: GroupDto, dispatch: AppDispatch) => {
        dispatch(setGroup(group));
        dispatch(resetPlayers());
    }

    const selectNoGroup = (_group: GroupDto, dispatch: AppDispatch) => {
        dispatch(setGroup(null));
        dispatch(resetPlayers());
    }

    return <Modal buttonContent={`Group: ${playerState.group?.name ?? '[none]'}`}>
        {
            groupState.groups.items.map(g => <GroupListItem className="closes-modal" key={g.id} group={g} onSelected={groupSelected}/>)
        }
        <GroupListItem className="closes-modal" group={{id: 0, name: '[none]'}} onSelected={selectNoGroup} />
    </Modal>
}