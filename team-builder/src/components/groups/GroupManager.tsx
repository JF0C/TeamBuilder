import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import { EditGroup } from "./EditGroup";
import { useAppSelector } from "../../store/store";
import { GroupList } from "./GroupList";

export const GroupManager: FunctionComponent = () => {

    const editingGroup = useAppSelector((state) => state.groups.editingGroup);

    return <div className="flex flex-col w-full h-full p-4">
        <div className="flex flex-col w-full flex-1 flex-wrap md:flex-row-reverse">
            <div className="md:w-1/2">
                <EditGroup />
            </div>
            <div className={`${editingGroup ? 'md:w-1/2' : ''}`}>
                <GroupList />
            </div>
        </div>
        <div className="w-full">
            <div className="button">
                <NavLink to={'/'}>
                    Back
                </NavLink>
            </div>
        </div>
    </div>
}