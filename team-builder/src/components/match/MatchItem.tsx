import { FunctionComponent } from "react";
import { MatchDto } from "../../dtos/MatchDto";
import { ListItem } from "../shared/ListItem";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectMatch } from "../../store/matchReducer";
import { matchTypeToString } from "../../mapping/matchTypeMapper";
import { millisToClosestDateOrTime } from "../../mapping/timestampMapper";

export const MatchItem: FunctionComponent<{match: MatchDto}> = ({match}) => {
    const dispatch = useAppDispatch();
    const isSelected = useAppSelector((state) => state.match.selected?.id === match.id)

    return <ListItem isSelected={isSelected} onSelected={() => dispatch(selectMatch(match))} >
        {
            `${millisToClosestDateOrTime(match.created)} ${matchTypeToString(match.type)}`
        }
    </ListItem>
}