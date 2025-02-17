import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import { ListAndDetails } from "../layout/ListAndDetails";
import { EditGroup } from "./EditGroup";
import { GroupList } from "./GroupList";
import { Paths } from "../../constants/Paths";

export const GroupManager: FunctionComponent = () => {
    const showDetails = useAppSelector((state) => state.groups.editingGroup !== null);

    return <ListAndDetails 
        list={<GroupList />} 
        details={<EditGroup />} 
        showDetails={showDetails}
        navigation={<div className="button">
            <NavLink to={Paths.AdminMenuPath}>
                Back
            </NavLink>
        </div>} />
}