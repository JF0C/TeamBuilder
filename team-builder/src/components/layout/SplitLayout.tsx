import { FunctionComponent, ReactNode } from "react"
import { BottomBarLayout } from "./BottomBarLayout"
import { LeftOrBottomHalf } from "./LeftOrBottomHalf"
import { RightOrTopHalf } from "./RightOrTopHalf"

export const SplitLayout: FunctionComponent<{ source: ReactNode, selected: ReactNode, navigation: ReactNode | ReactNode[] }> = ({ source, selected, navigation }) => {
    return (
        <BottomBarLayout navigation={navigation}>
            <div className="flex-1 flex flex-col md:flex-row-reverse">
                <RightOrTopHalf>
                    {selected}
                </RightOrTopHalf>
                <LeftOrBottomHalf>
                    {source}
                </LeftOrBottomHalf>
            </div>
        </BottomBarLayout >
    )
}