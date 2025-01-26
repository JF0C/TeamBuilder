import { FunctionComponent } from "react";
import { AppDispatch, useAppDispatch, useAppSelector } from "../../store/store";
import { GroupDto } from "../../dtos/GroupDto";

export type GroupListItemProps = {
    group: GroupDto
    onSelected: (group: GroupDto, dispatch: AppDispatch) => void
}

export const GroupListItem: FunctionComponent<GroupListItemProps> = ({group, onSelected}) => {
    const dispatch = useAppDispatch();
        const playerState = useAppSelector((state) => state.players);
        const isSelected = group.id === playerState.group?.id;
    
    
        return <div className={`${isSelected ? 'highlighted' : ''} rounded-md border border-2 px-2`} 
            onClick={() => onSelected(group, dispatch)}>
                <div className="button">
                    {group.name}
                </div>
        </div>
}