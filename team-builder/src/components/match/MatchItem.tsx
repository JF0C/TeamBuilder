import { FunctionComponent } from "react";
import { MatchDto } from "../../dtos/MatchDto";
import { ListItem } from "../layout/ListItem";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectMatch } from "../../store/matchReducer";

export const MatchItem: FunctionComponent<{match: MatchDto}> = ({match}) => {
    const dispatch = useAppDispatch();
    const isSelected = useAppSelector((state) => state.match.selected?.id === match.id)

    return <ListItem isSelected={isSelected} onSelected={() => dispatch(selectMatch(match))} >
        {match.teams.map(t => t.name).join(' vs. ')}
    </ListItem>
}