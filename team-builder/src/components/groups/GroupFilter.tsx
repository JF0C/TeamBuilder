import { FunctionComponent, useState } from "react";
import { AppDispatch, useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { GroupListItem } from "./GroupListItem";
import { resetPlayers, setGroup } from "../../store/playerReducer";
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
        dispatch(resetPlayers());
        setOpen(false);
    }

    const selectNoGroup = (_group: GroupDto, dispatch: AppDispatch) => {
        dispatch(setGroup(null));
        dispatch(resetPlayers());
        setOpen(false);
    }

    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const clickedOutside = (e: any) => {
        if (e.target.className.includes('modal-background')) {
            setOpen(false);
        }
    }

    return <>
        <div className="button" onClick={() => setOpen(true)}>
            {
                `Group: ${playerState.group?.name ?? '[none]'}`
            }
        </div>
        {
            open ?
            <div className="absolute size-full left-0 top-0 flex flex-row justify-center items-center modal-background"
                onClick={clickedOutside}>
                <div className="flex flex-row flex-wrap gap-2 modal-content p-4 rounded-md">
                    {
                        groupState.groups.items.map(g => <GroupListItem key={g.id} group={g} onSelected={groupSelected}/>)
                    }
                    <GroupListItem group={{id: 0, name: '[none]'}} onSelected={selectNoGroup} />
                </div>
            </div>
            :<></>
        }
    </>
}