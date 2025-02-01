import { FunctionComponent } from "react";
import { useAppSelector } from "../../store/store";

export const MatchDetails: FunctionComponent = () => {

    const match = useAppSelector((state) => state.match.selected)

    if (!match) {
        return <></>
    }

    return <div>
        {match.id}
    </div>
}