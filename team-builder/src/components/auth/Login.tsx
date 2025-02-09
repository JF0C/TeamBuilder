import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { AuthProperties } from "../../constants/AuthProperties";
import { Paths } from "../../constants/Paths";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { LoginStateDto } from "../../dtos/auth/LoginStateDto";
import { codeAuthorizationRequest } from "../../thunks/authThunk";

export const Login: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const authState = useAppSelector((state) => state.auth);
    const [params] = useSearchParams()
    const authorizationCode = params.get('code')
    const loginStateParam = params.get('state')
    const loginState: LoginStateDto | null = loginStateParam ? JSON.parse(loginStateParam) : null

    const redirectToGithubLogin = () => {
        const loginState: LoginStateDto = {
            authProvider: 'github'
        }
        const url = `${AuthProperties.AuthorizationEndpoint}?client_id=${AuthProperties.ClientId}` +
            `&redirect_uri=${encodeURIComponent(AuthProperties.RedirectUri + Paths.LoginPath.substring(1))}` +
            `&state=${JSON.stringify(loginState)}` +
            `&scope=user:email`;
        window.location.href = url;
    }

    if (authState.user) {
        let redirectMessage = '';
        if (authorizationCode && loginState) {
            setTimeout(() => {
                if (document.location.href.includes(Paths.LoginPath)) {
                    navigate(Paths.HomePath);
                }
            }, 3000)
            redirectMessage = 'Returning to home page...'
        }
        return <div className="size-full flex flex-col justify-center items-center">
            <div>
                {redirectMessage}
            </div>
            <div>
                Logged in as {authState.user.playerName}
            </div>
            <div>
                <NavLink to={Paths.HomePath}>
                    Back
                </NavLink>
            </div>
        </div>
    }
    if (authorizationCode && loginState && !authState.loginFailed) {
        if (authState.requestState !== 'loading') {
            dispatch(codeAuthorizationRequest({
                authProvider: loginState.authProvider,
                code: authorizationCode
            }))
        }
        return <div className="size-full flex flex-col justify-center items-center">
            Logging in ...
            <LoadingSpinner />
        </div>
    }
    else {
        return <div className="size-full flex flex-col justify-center items-center">
            <div className="button" onClick={redirectToGithubLogin}>
                Login with Github
            </div>
            <div>
                <NavLink to={Paths.HomePath}>
                    Back
                </NavLink>
            </div>
        </div>
    }
}