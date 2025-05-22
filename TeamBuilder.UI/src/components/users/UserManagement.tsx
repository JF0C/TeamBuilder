import { FunctionComponent } from "react";
import { useAppSelector } from "../../store/store";
import { ListAndDetails } from "../layout/ListAndDetails";
import { Paths } from "../../constants/Paths";
import { UserList } from "./UserList";
import { UserDetails } from "./UserDetails";
import { LinkBack } from "../shared/LinkBack";

export const UserManagement: FunctionComponent = () => {
  const isUserSelected = useAppSelector(
    (state) => state.users.selected !== null
  );

  return (
    <ListAndDetails
      list={<UserList />}
      details={<UserDetails />}
      showDetails={isUserSelected}
      navigation={<LinkBack to={Paths.AdminMenuPath} />}
    />
  );
};
