import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { RadioGroup } from "./RadioGroup";
import { setMatchType } from "../../store/matchReducer";

export const MatchTypeRadio: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const matchState = useAppSelector((state) => state.match);

    const changeMatchState = (type: number) => {
        dispatch(setMatchType(type))
    }

    const matchTypes = [
        {
            id: 0,
            name: 'None'
        },
        {
            id: 1,
            name: 'Flunkyball'
        },
        {
            id: 2,
            name: 'Beerpong'
        },
        {
            id: 3,
            name: 'Fireball'
        }
    ]

    return <RadioGroup selectedId={matchState.current.type} items={matchTypes} onSelectionChanged={changeMatchState}/>
}