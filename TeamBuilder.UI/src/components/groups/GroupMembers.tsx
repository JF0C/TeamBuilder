import { FunctionComponent } from "react";
import { useAppSelector } from "../../store/store";
import { Paths } from "../../constants/Paths";
import { MembersAvailable } from "./MembersAvailable";
import { MembersCurrent } from "./MembersCurrent";
import { SplitLayout } from "../layout/SplitLayout";
import { LinkBack } from "../shared/LinkBack";

export const GroupMembers: FunctionComponent = () => {
  const groupState = useAppSelector((state) => state.groups);

  return (
    <SplitLayout
      source={<MembersAvailable group={groupState.editingGroup} />}
      selected={<MembersCurrent group={groupState.editingGroup} />}
      navigation={<LinkBack to={Paths.GroupManagementPath} />}
    />
  );
};
