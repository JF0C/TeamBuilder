import { FunctionComponent, ReactNode } from "react";

export const NavBarLayout: FunctionComponent<{ navigation: ReactNode | ReactNode[], children: ReactNode | ReactNode[] }> = ({ navigation, children }) => {
    return (
        <div className="size-full flex flex-col md:flex-col-reverse nav-bar-layout">
            <div className="flex-1 flex flex-row justify-center w-full h-[calc(100svh-52px)]">
                <div className="size-full max-w-screen-lg flex flex-col justify-center px-4 pt-2">
                    {children}
                </div>
            </div>
            <div className="w-full bg-darker flex flex-row justify-center">
                <div className="max-w-screen-lg px-4 py-2 w-full flex flex-row justify-between">
                    {navigation}
                </div>
            </div>
        </div>
    )
}