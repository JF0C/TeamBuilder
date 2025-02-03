import { FunctionComponent, ReactNode } from "react";
import { NavBarLayout } from "./NavbarLayout";
import { LeftOrTopHalf } from "./LeftOrTopHalf";
import { RightOrBottomHalf } from "./RightOrBottomHalf";

export type ListAndDetailsProps = {
    showDetails: boolean
    list: ReactNode
    details: ReactNode
    navigation: ReactNode | ReactNode[]
}

export const ListAndDetails: FunctionComponent<ListAndDetailsProps> = ({ showDetails, list, details, navigation }) => {
    return (
        <NavBarLayout navigation={navigation}>
            <div className="flex flex-col size-full flex-1 flex-wrap md:flex-row md:justify-end">
                <LeftOrTopHalf>
                    {list}
                </LeftOrTopHalf>
                <RightOrBottomHalf contracted={!showDetails}>
                    {details}
                </RightOrBottomHalf>
            </div>
        </NavBarLayout>
    )
}