import { FunctionComponent, ReactNode } from "react";
import { BottomBarLayout } from "./BottomBarLayout";
import { LeftOrBottomHalf } from "./LeftOrBottomHalf";
import { RightOrTopHalf } from "./RightOrTopHalf";

export type ListAndDetailsProps = {
    showDetails: boolean
    list: ReactNode
    details: ReactNode
    navigation: ReactNode | ReactNode[]
}

export const ListAndDetails: FunctionComponent<ListAndDetailsProps> = ({ showDetails, list, details, navigation }) => {
    return (
        <BottomBarLayout navigation={navigation}>
            <div className="flex flex-col w-full flex-1 flex-wrap md:flex-row-reverse md:justify-end">
                {
                    showDetails ?
                        <RightOrTopHalf>
                            {details}
                        </RightOrTopHalf>
                        : <></>
                }
                <LeftOrBottomHalf expanded={!showDetails}>
                    {list}
                </LeftOrBottomHalf>
            </div>
        </BottomBarLayout>
    )
}