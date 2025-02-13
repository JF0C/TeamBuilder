import { FunctionComponent } from "react";
import { useAppSelector } from "../../store/store";
import { NavLink } from "react-router";
import { Paths } from "../../constants/Paths";
import { MembersAvailable } from "./MembersAvailable";
import { MembersCurrent } from "./MembersCurrent";
import { SplitLayout } from "../layout/SplitLayout";

export const GroupMembers: FunctionComponent = () => {
    const groupState = useAppSelector((state) => state.groups)
    const groupMemberState = useAppSelector((state) => state.groupMembers)
    const playerState = useAppSelector((state) => state.players)

    const availableMembers = playerState.players?.items.filter(p =>
        groupMemberState.members?.items.find(g => g.id === p.id) === undefined) ?? []

    return (
        <SplitLayout
            source={<MembersAvailable group={groupState.editingGroup} availableMembers={availableMembers} />}
            selected={<MembersCurrent group={groupState.editingGroup} />}
            navigation={<NavLink to={Paths.GroupManagementPath}>
                Back
            </NavLink>}
        />
    )
}