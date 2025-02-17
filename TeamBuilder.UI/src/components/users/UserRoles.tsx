import { FunctionComponent } from "react";
import { UserDto } from "../../dtos/users/UserDto";
import { ConfirmModal } from "../shared/ConfirmModal";
import { useAppDispatch } from "../../store/store";
import { addRoleRequest, removeRoleRequest } from "../../thunks/adminThunk";
import { Roles } from "../../constants/Roles";
import { Modal } from "../shared/Modal";
import { ListItem } from "../shared/ListItem";

export const UserRoles: FunctionComponent<{user: UserDto}> = ({user}) => {
    const dispatch = useAppDispatch()

    const removeRole = (role: string) => {
        dispatch(removeRoleRequest({
            playerId: user.id,
            role: role
        }))
    }

    const addRole = (role: string) => {
        dispatch(addRoleRequest({
            playerId: user.id,
            role: role
        }))
    }

    const availableRoles = Roles.All.filter(r => !user.roles.includes(r))
    
    return <div className="flex flex-row flex-wrap gap-2">
        {
            user.roles.map(r => <ConfirmModal key={`u-${user.id}-r-${r}`} onConfirm={() => removeRole(r)} buttonContent={r}>
                Remove Role {r}?
            </ConfirmModal>)
        }
        {
            availableRoles ?
            <Modal buttonContent={`Add Role`}>
                {
                    availableRoles.map(r => <ListItem key={`available-role-${r}`} onSelected={() => addRole(r)}>{r}</ListItem>)
                }
            </Modal>
            : <></>
        }
    </div>
} 