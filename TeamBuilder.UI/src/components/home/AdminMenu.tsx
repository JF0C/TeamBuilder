import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { LinkBack } from "../shared/LinkBack";

export const AdminMenu: FunctionComponent = () => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full">
      <NavLink to={Paths.UsersPath}>Users</NavLink>
      <NavLink to={Paths.GroupManagementPath}>Groups</NavLink>
      <LinkBack to={Paths.HomePath} />
    </div>
  );
};
