import { FunctionComponent } from "react";
import { Paths } from "../../constants/Paths";
import { LinkBack } from "../shared/LinkBack";
import { MenuLink } from "../shared/MenuLink";
import { faUser, faUserGroup } from "@fortawesome/free-solid-svg-icons";

export const AdminMenu: FunctionComponent = () => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full">
      <MenuLink to={Paths.UsersPath} label="Users" icon={faUser} />
      <MenuLink
        to={Paths.GroupManagementPath}
        label="Groups"
        icon={faUserGroup}
      />
      <LinkBack to={Paths.HomePath} />
    </div>
  );
};
