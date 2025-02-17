import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { reloadPlayers } from "../../store/playerReducer";
import { GroupFilter } from "./GroupFilter";

export const PlayerGroupFilter: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const playerState = useAppSelector((state) => state.players)

    return <GroupFilter selectedGroup={playerState.group?.name}
        onGroupSelected={(group) => dispatch(reloadPlayers({group: group}))}/>
}