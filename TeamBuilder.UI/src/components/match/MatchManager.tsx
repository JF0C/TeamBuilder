import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import { ListAndDetails } from "../layout/ListAndDetails";
import { MatchList } from "./MatchList";
import { MatchOverview } from "./MatchOverview";
import { Paths } from "../../constants/Paths";

export const MatchManager: FunctionComponent = () => {
    const isMatchSelected = useAppSelector((state) => state.match.selected !== null);

    return (
        <ListAndDetails
            list={<MatchList />}
            details={<MatchOverview />}
            showDetails={isMatchSelected}
            navigation={
                <div className="button">
                    <NavLink to={Paths.HomePath}>
                        Back
                    </NavLink>
                </div>
            }
        />
    )
}