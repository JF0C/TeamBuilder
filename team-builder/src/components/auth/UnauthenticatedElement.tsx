import { FunctionComponent, ReactNode } from "react";
import { useAppSelector } from "../../store/store";

export const UnauthenticatedElement: FunctionComponent<{roles?: string[], children: ReactNode}> = ({roles, children}) => {
    const user = useAppSelector((state) => state.auth.user);

    if (!user) {
        return children
    }

    if (roles && !user.roles.find(r => roles?.includes(r))) {
        return children
    }

    return <></>
}