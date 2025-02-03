import { FunctionComponent, ReactNode } from "react";

export const NavBarLayout: FunctionComponent<{ navigation: ReactNode | ReactNode[], children: ReactNode | ReactNode[] }> = ({ navigation, children }) => {
    return (
        <div className="size-full flex flex-col md:flex-col-reverse">
            <div className="flex-1 w-full flex flex-row justify-center">
                <div className="size-full max-w-screen-md flex flex-col justify-center p-4">
                    {children}
                </div>
            </div>
            <div className="w-full bg-darker flex flex-row justify-center">
                <div className="max-w-screen-md px-4 py-1 w-full">
                    {navigation}
                </div>
            </div>
        </div>
    )
}