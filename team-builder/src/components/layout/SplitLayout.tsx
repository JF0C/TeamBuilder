import { FunctionComponent, ReactNode } from "react"
import { NavBarLayout } from "./NavbarLayout"
import { LeftOrBottomHalf } from "./LeftOrBottomHalf"
import { RightOrTopHalf } from "./RightOrTopHalf"

export const SplitLayout: FunctionComponent<{ source: ReactNode, selected: ReactNode, navigation: ReactNode | ReactNode[] }> = ({ source, selected, navigation }) => {
    return (
        <NavBarLayout navigation={navigation}>
            <div className="flex-1 flex flex-col md:flex-row-reverse split-layout md:justify-end">
                <RightOrTopHalf>
                    {selected}
                </RightOrTopHalf>
                <LeftOrBottomHalf>
                    {source}
                </LeftOrBottomHalf>
            </div>
        </NavBarLayout >
    )
}