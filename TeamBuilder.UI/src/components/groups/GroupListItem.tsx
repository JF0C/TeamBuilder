import { FunctionComponent } from "react";
import { RootState, useAppSelector } from "../../store/store";
import { GroupDto } from "../../dtos/groups/GroupDto";
import { ListItem } from "../shared/ListItem";

export type GroupListItemProps = {
    group: GroupDto
    onSelected: () => void
    isSelected: (state: RootState) => boolean
}

export const GroupListItem: FunctionComponent<GroupListItemProps> = ({ group, onSelected, isSelected }) => {
    return (
        <div className="closes-modal">
            <ListItem isSelected={useAppSelector(isSelected)} onSelected={onSelected}>
                {group.name}
            </ListItem>
        </div>
    )
}