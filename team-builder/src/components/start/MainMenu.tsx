import { FunctionComponent } from "react";
import { NavLink } from "react-router";
import { Paths } from "../../constants/Paths";

export const MainMenu: FunctionComponent = () => {

    return <div className="flex flex-col gap-2 justify-center items-center w-full">
        <div>
            <NavLink to={Paths.SelectionPath}>
                Create Teams
            </NavLink>
        </div>
        <div>
            <NavLink to={Paths.PlayerManagementPath}>
                Manage Players
            </NavLink>
        </div>
    </div>
}