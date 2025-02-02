import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import { EditGroup } from "./EditGroup";
import { useAppSelector } from "../../store/store";
import { GroupList } from "./GroupList";
import { ListAndDetails } from "../layout/ListAndDetails";

export const GroupManager: FunctionComponent = () => {

    const showDetails = useAppSelector((state) => state.groups.editingGroup !== null);

    return <ListAndDetails 
        list={<GroupList />} 
        details={<EditGroup />} 
        showDetails={showDetails}
        navigation={<div className="button">
            <NavLink to={'/'}>
                Back
            </NavLink>
        </div>} />
}