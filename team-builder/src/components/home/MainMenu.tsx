import { FunctionComponent } from "react";
import { NavLink } from "react-router";
import { Paths } from "../../constants/Paths";
import { useAppDispatch } from "../../store/store";
import { logout } from "../../store/authReducer";
import { AuthenticatedElement } from "../auth/AuthenticatedElement";
import { UnauthenticatedElement } from "../auth/UnauthenticatedElement";
import { Roles } from "../../constants/Roles";

export const MainMenu: FunctionComponent = () => {
    const dispatch = useAppDispatch()

    return <div className="flex flex-col gap-2 justify-center items-center w-full">
        <div>
            <NavLink to={Paths.SelectionPath}>
                Begin Match
            </NavLink>
        </div>
        <AuthenticatedElement roles={[Roles.Admin]}>
            <div>
                <NavLink to={Paths.PlayerManagementPath}>
                    Manage Players
                </NavLink>
            </div>
            <div>
                <NavLink to={Paths.GroupManagementPath}>
                    Manage Groups
                </NavLink>
            </div>
        </AuthenticatedElement>
        <div>
            <NavLink to={Paths.MatchManagementPath}>
                Past Matches
            </NavLink>
        </div>
        <AuthenticatedElement>
            <div className="button" onClick={() => dispatch(logout())}>
                Logout
            </div>
        </AuthenticatedElement>
        <UnauthenticatedElement>
            <div>
                <NavLink to={Paths.LoginPath}>
                    Login
                </NavLink>
            </div>
            <div>
                <NavLink to={Paths.RegisterPath}>
                    Register
                </NavLink>
            </div>
        </UnauthenticatedElement>
    </div>
}