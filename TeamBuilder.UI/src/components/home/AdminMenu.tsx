import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import { Paths } from "../../constants/Paths";

export const AdminMenu: FunctionComponent = () => {

    return <div className="flex flex-col gap-2 justify-center items-center w-full">
            <NavLink to={Paths.UsersPath}>
                Users
            </NavLink>
            <NavLink to={Paths.GroupManagementPath}>
                Groups
            </NavLink>
            <NavLink to={Paths.HomePath}>
                Back
            </NavLink>
    </div>
}