import { FunctionComponent, ReactNode } from "react";
import { BottomBarLayout } from "./BottomBarLayout";
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
        <BottomBarLayout navigation={navigation}>
            <div className="flex flex-col size-full flex-1 flex-wrap md:flex-row md:justify-end">
                <LeftOrTopHalf>
                    {list}
                </LeftOrTopHalf>
                {
                    showDetails ?
                        <RightOrBottomHalf>
                            {details}
                        </RightOrBottomHalf>
                        : <></>
                }
            </div>
        </BottomBarLayout>
    )
}