import { FunctionComponent } from "react";
import { PaginatedListLayout } from "../layout/PaginatedListLayout";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { reloadUsers } from "../../store/userReducer";
import { GroupDto } from "../../dtos/groups/GroupDto";
import { GroupFilter } from "../groups/GroupFilter";
import { UserListItem } from "./UserListItem";

export const UserList: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const userState = useAppSelector((state) => state.users);

    const changePage = (page: number) => {
        dispatch(reloadUsers({ page }));
    }

    const changeGroup = (group: GroupDto | null) => {
        dispatch(reloadUsers({group}))
    }

    return <PaginatedListLayout pageData={userState.users} onPageChange={changePage}
        title={<>
            <div>
                Users
            </div>
            <div className="w-full">
                <GroupFilter selectedGroup={userState.group?.name} onGroupSelected={changeGroup}/>
            </div>
        </>}>
            {
                userState.users?.items.map(u => <UserListItem user={u} />)
            }
    </PaginatedListLayout>
}