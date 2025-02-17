import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { DetailsLayout } from "../layout/DetailsLayout";
import { setSelectedUser } from "../../store/userReducer";
import { UserRoles } from "./UserRoles";

export const UserDetails: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.users.selected);

    if (!user) {
        return <></>
    }

    return (
        <DetailsLayout title={user.name} id={user.id.toString()} onClose={() => dispatch(setSelectedUser(null))}>
            <UserRoles user={user} />
        </DetailsLayout>
    )
}