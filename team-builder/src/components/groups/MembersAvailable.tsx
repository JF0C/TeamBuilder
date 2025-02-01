import { FunctionComponent } from "react";
import { PlayerDto } from "../../dtos/PlayerDto";
import { MemberItem } from "./MemberItem";
import { GroupDto } from "../../dtos/GroupDto";
import { Pagination } from "../shared/Pagination";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { reloadPlayers } from "../../store/playerReducer";

export const MembersAvailable: FunctionComponent<{availableMembers: PlayerDto[], group: GroupDto}> = ({availableMembers, group}) => {
    const dispatch = useAppDispatch();
    const playerState = useAppSelector((state) => state.players)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFilterChange = (e: any) => {
        dispatch(reloadPlayers({name: e.target.value}))
    }

    const pageChange = (page: number) => {
        dispatch(reloadPlayers({page: page}))
    }

    return (
        <div className="border-r p-2 h-full">
            <div className="size-full flex flex-col">
                <div className="size-full flex-1">
                    <div className="flex flex-row flex-wrap gap-2">
                        <div className="w-full">
                            Available
                        </div>
                        <div className="w-full">
                            <input className="w-full" placeholder="filter" onInput={onFilterChange} />
                        </div>
                        {
                            availableMembers.map(p => <MemberItem key={p.id} player={p} group={group} />)
                        }
                    </div>
                </div>
                <div>
                    <Pagination pageData={playerState.players} onPageChange={pageChange}/>
                </div>
            </div>
        </div>
    )
}