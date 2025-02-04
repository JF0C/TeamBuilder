import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { AuthProperties } from "../../constants/AuthProperties";
import { Paths } from "../../constants/Paths";
import { useSearchParams } from "react-router-dom";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { LoginStateDto } from "../../dtos/LoginStateDto";
import { codeAuthorizationRequest } from "../../thunks/authThunk";

export const Login: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const authState = useAppSelector((state) => state.auth);
    const [params, setParams] = useSearchParams()
    const authorizationCode = params.get('code')
    const loginStateParam = params.get('state')
    const loginState: LoginStateDto | null = loginStateParam ? JSON.parse(loginStateParam) : null

    const redirectToGithubLogin = () => {
        const loginState: LoginStateDto = {
            authProvider: 'github'
        }
        const url = `${AuthProperties.AuthorizationEndpoint}?client_id=${AuthProperties.ClientId}` +
            `&redirect_uri=${encodeURIComponent(AuthProperties.RedirectUri + Paths.LoginPath.substring(1))}` +
            `&state=${JSON.stringify(loginState)}`;
        window.location.href = url;
    }

    if (authState.access_token) {
        setParams('code', undefined)
        setParams('state', undefined)
        return <div>Logged in: {authState.access_token}</div>
    }
    if (authorizationCode && loginState) {
        if (!authState.loading) {
            dispatch(codeAuthorizationRequest({
                authProvider: loginState.authProvider,
                code: authorizationCode
            }))
        }
        return <div className="size-full flex flex-col justify-center items-center">
            Logging in with {JSON.stringify(loginState)} {authorizationCode} ...
            <LoadingSpinner />
        </div>
    }
    else {
        return <div className="size-full flex flex-row justify-center items-center">
            <div className="button" onClick={redirectToGithubLogin}>
                Login with Github
            </div>
        </div>
    }
}