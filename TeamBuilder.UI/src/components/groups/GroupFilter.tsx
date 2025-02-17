import { FunctionComponent } from "react";
import { useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { GroupListItem } from "./GroupListItem";
import { GroupDto } from "../../dtos/groups/GroupDto";
import { Modal } from "../shared/Modal";
import { FilterAction } from "../layout/FilterAction";

export const GroupFilter: FunctionComponent<{selectedGroup?: string, onGroupSelected: (group: GroupDto | null) => void}> = ({selectedGroup, onGroupSelected}) => {
    const groupState = useAppSelector((state) => state.groups)

    if (groupState.groups === null || groupState.requestState === 'loading') {
        return <LoadingSpinner />
    }

    return <Modal buttonContent={<FilterAction>{`Groupfilter${selectedGroup ? ': ' + selectedGroup: ''}`}</FilterAction>}>
        {
            groupState.groups.items.map(g => <GroupListItem key={g.id}
                group={g}
                onSelected={() => onGroupSelected(g)}
                isSelected={(state) => state.players.group?.id === g.id}    
            />)
        }
        <GroupListItem
            group={{id: 0, name: '[all]'}}
            onSelected={() => onGroupSelected(null)}
            isSelected={(state) => state.players.group === null} />
    </Modal>
}