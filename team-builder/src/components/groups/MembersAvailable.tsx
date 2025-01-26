import { FunctionComponent, useState } from "react";
import { PlayerDto } from "../../dtos/PlayerDto";
import { MemberItem } from "./MemberItem";
import { GroupDto } from "../../dtos/GroupDto";

export const MembersAvailable: FunctionComponent<{availableMembers: PlayerDto[], group: GroupDto}> = ({availableMembers, group}) => {
    const [filter, setFilter] = useState('');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFilterChange = (e: any) => {
        setFilter(e.target.value)
    }

    const filteredMembers = availableMembers.filter(m => m.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div className="border-r p-2 h-full">
            <div className="flex flex-row flex-wrap gap-2">
                <div className="w-full">
                    Available
                </div>
                <div className="w-full">
                    <input className="w-full" placeholder="filter" onInput={onFilterChange} />
                </div>
                {
                    filteredMembers.map(p => <MemberItem key={p.id} player={p} group={group} />)
                }
            </div>
        </div>
    )
}