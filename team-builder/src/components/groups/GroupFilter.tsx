import { FunctionComponent, useState } from "react";
import { AppDispatch, useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { GroupListItem } from "./GroupListItem";
import { setGroup } from "../../store/playerReducer";
import { GroupDto } from "../../dtos/GroupDto";

export const GroupFilter: FunctionComponent = () => {
    const playerState = useAppSelector((state) => state.players)
    const groupState = useAppSelector((state) => state.groups)
    const [open, setOpen] = useState(false)

    if (groupState.groups === null || groupState.loading) {
        return <LoadingSpinner />
    }

    const groupSelected = (group: GroupDto, dispatch: AppDispatch) => {
        dispatch(setGroup(group));
        setOpen(false);
    }

    return <>
        <div className="button" onClick={() => setOpen(true)}>
            {
                `Group: ${playerState.group?.name ?? '[none]'}`
            }
        </div>
        {
            open ?
            <div className="absolute size-full left-0 top-0 flex flex-row justify-center items-center">
                <div className="flex flex-row flex-wrap">
                    {
                        groupState.groups.items.map(g => <GroupListItem key={g.id} group={g} onSelected={groupSelected}/>)
                    }
                </div>
            </div>
            :<></>
        }
    </>
}