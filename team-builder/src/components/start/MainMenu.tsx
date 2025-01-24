import { FunctionComponent } from "react";
import { NavLink } from "react-router";
import { Paths } from "../../constants/Paths";

export const MainMenu: FunctionComponent = () => {

    return <div className="flex flex-col gap-2">
        <NavLink to={Paths.SelectionPath}>
            Create Teams
        </NavLink>
        <NavLink to={'asdf'}>
            Edit Players
        </NavLink>
    </div>
}