import { FunctionComponent } from "react";
import { useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { NavLink } from "react-router";
import { Paths } from "../../constants/Paths";
import { MembersAvailable } from "./MembersAvailable";
import { MembersCurrent } from "./MembersCurrent";

export const GroupMembers: FunctionComponent = () => {
    const groupState = useAppSelector((state) => state.groups)
    const playerState = useAppSelector((state) => state.players)

    if (groupState.groups === null || groupState.loading 
        || playerState.players === null || playerState.loading
        || groupState.editingGroup === null
    ) {
        return <LoadingSpinner />
    }

    const availableMembers = playerState.players.items.filter(p => 
        groupState.editingGroupPlayers?.items.find(g => g.id === p.id) === undefined)

    return <div className="flex flex-col h-full p-4">
    <div className="flex-1 flex flex-row">
        <div className="w-1/2">
            <MembersAvailable group={groupState.editingGroup} availableMembers={availableMembers}/>
        </div>
        <div className="w-1/2">
            <MembersCurrent group={groupState.editingGroup}/>
        </div>
    </div>
    <div className="w-full flex flex-row justify-between">
        <NavLink to={Paths.GroupManagementPath}>
            Back
        </NavLink>
    </div>
</div>
}