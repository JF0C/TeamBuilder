import { FunctionComponent, ReactNode } from "react";

export const BottomBarLayout: FunctionComponent<{ navigation: ReactNode | ReactNode[], children: ReactNode | ReactNode[] }> = ({ navigation, children }) => {

    return (
        <div className="size-full flex flex-col">
            <div className="flex-1 flex flex-col justify-center w-full h-full p-4">
                {children}
            </div>
            <div className="w-full border-t p-4">
                {navigation}
            </div>
        </div>
    )
}