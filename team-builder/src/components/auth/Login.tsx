import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { AuthProperties } from "../../constants/AuthProperties";
import { ApiUrls } from "../../constants/ApiUrls";
import { Paths } from "../../constants/Paths";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { LoginStateDto } from "../../dtos/LoginStateDto";
import { codeAuthorizationRequest } from "../../thunks/authThunk";

export const Login: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const authState = useAppSelector((state) => state.auth);
    const authorizationCode = useParams()['code']
    const loginStateParam = useParams()['state']
    const loginState: LoginStateDto | null = loginStateParam ? JSON.parse(loginStateParam) : null

    const redirectToGithubLogin = () => {
        const loginState: LoginStateDto = {
            authProvider: 'github'
        }
        const url = `${AuthProperties.AuthorizationEndpoint}?client_id=${AuthProperties.ClientId}` +
            `&redirect_uri=${encodeURIComponent(ApiUrls.BaseUrl + Paths.LoginPath.substring(1))}` +
            `&state=${JSON.stringify(loginState)}`;
        window.location.href = url;
    }

    if (authState.access_token) {
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