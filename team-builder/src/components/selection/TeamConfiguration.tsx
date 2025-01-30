import { FunctionComponent } from "react";
import { Modal } from "../shared/Modal";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { RadioGroup } from "../shared/RadioGroup";
import { setTeamCount, setTeamName } from "../../store/teamConfigurationReducer";

export const TeamConfiguration: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const teamConfig = useAppSelector((state) => state.teamConfig);

    const teamCounts = [
        { id: 2, name: '2' },
        { id: 3, name: '3' },
        { id: 4, name: '4' },
        { id: 5, name: '5' },
        { id: 6, name: '6' },
        { id: 7, name: '7' },
        { id: 8, name: '8' },
        { id: 9, name: '9' },
        { id: 10, name: '10' }
    ]

    const changeTeamCount = (count: number) => {
        dispatch(setTeamCount(count))
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const teamNameChange = (index: number, e: any) => {
        dispatch(setTeamName({
            index: index,
            name: e.target.value
        }))
    }

    return <Modal buttonContent='Configure'>
        <div className="flex flex-col max-w-xs gap-2">
            <div className="text-center font-bold">
                Team Configuration
            </div>
            <div className="flex flex-row items-center">
                <div className="text-left" style={{ width: '100px' }}>
                    Count
                </div>
                <div className="flex-1">
                    <RadioGroup items={teamCounts} selectedId={teamConfig.teamsCount}
                        onSelectionChanged={changeTeamCount} />
                </div>
            </div>
            <div className="flex flex-row items-center">
                <div className="text-left" style={{ width: '100px' }}>
                    Names
                </div>
                <div className="flex-1">
                    {
                        [...Array(teamConfig.teamsCount)].map((_, i) =>
                            <input defaultValue={teamConfig.teamNames[i]}
                                onInput={(e) => teamNameChange(i, e)}
                                className="w-full"
                                key={`team-name-${i}`}
                                placeholder={`Team ${i + 1}`} />
                        )
                    }
                </div>
            </div>
            <div className="button closes-modal">
                Close
            </div>
        </div>
    </Modal>
}