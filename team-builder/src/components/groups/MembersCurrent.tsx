import { FunctionComponent } from "react";
import { GroupDto } from "../../dtos/GroupDto";
import { MemberItem } from "./MemberItem";
import { useAppSelector } from "../../store/store";

export const MembersCurrent: FunctionComponent<{group: GroupDto}> = ({group}) => {
    const editingGroupPlayers = useAppSelector((state) => state.groups.editingGroupPlayers);

    if (editingGroupPlayers === null) {
        return <></>
    }

    return (
        <div className="p-2 h-full">
            <div className="flex flex-row flex-wrap gap-2">
                <div className="w-full">
                    Members of {group.name}
                </div>
                {
                    editingGroupPlayers.items.map(p => <MemberItem key={p.id} player={p} group={group} />)
                }
            </div>
        </div>
    )
}