import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { ListItem } from "../shared/ListItem";
import { UserDto } from "../../dtos/users/UserDto";
import { setSelectedUser } from "../../store/userReducer";

export const UserListItem: FunctionComponent<{user: UserDto}> = ({ user }) => {
    const dispatch = useAppDispatch();
    const userState = useAppSelector((state) => state.users);
    const isSelected = user.id === userState.selected?.id;

    return <ListItem isSelected={isSelected} onSelected={() => dispatch(setSelectedUser(user))}>
        {user.name}
    </ListItem>
}