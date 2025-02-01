import { FunctionComponent } from "react";
import { useAppSelector } from "../../store/store";
import { GroupDto } from "../../dtos/GroupDto";
import { ListItem } from "../layout/ListItem";

export type GroupListItemProps = {
    group: GroupDto
    onSelected: () => void
}

export const GroupListItem: FunctionComponent<GroupListItemProps> = ({ group, onSelected }) => {
    const playerState = useAppSelector((state) => state.players);
    const isSelected = group.id === playerState.group?.id;

    return (
        <ListItem isSelected={isSelected} onSelected={onSelected}>
            {group.name}
        </ListItem>
    )
}