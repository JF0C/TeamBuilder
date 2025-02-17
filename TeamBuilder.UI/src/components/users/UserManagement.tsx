import { FunctionComponent } from "react";
import { useAppSelector } from "../../store/store";
import { NavLink } from "react-router-dom";
import { ListAndDetails } from "../layout/ListAndDetails";
import { Paths } from "../../constants/Paths";
import { UserList } from "./UserList";
import { UserDetails } from "./UserDetails";

export const UserManagement: FunctionComponent = () => {
    const isUserSelected = useAppSelector((state) => state.users.selected !== null);
    
    return (
        <ListAndDetails
            list={<UserList />}
            details={<UserDetails />}
            showDetails={isUserSelected}
            navigation={<div className="button">
                <NavLink to={Paths.AdminMenuPath}>
                    Back
                </NavLink>
            </div>}
        />
    )
}