import { FunctionComponent } from "react";
import { useAppSelector } from "../../store/store";
import { ListAndDetails } from "../layout/ListAndDetails";
import { EditGroup } from "./EditGroup";
import { GroupList } from "./GroupList";
import { Paths } from "../../constants/Paths";
import { LinkBack } from "../shared/LinkBack";

export const GroupManager: FunctionComponent = () => {
  const showDetails = useAppSelector(
    (state) => state.groups.editingGroup !== null
  );

  return (
    <ListAndDetails
      list={<GroupList />}
      details={<EditGroup />}
      showDetails={showDetails}
      navigation={<LinkBack to={Paths.AdminMenuPath} />}
    />
  );
};
