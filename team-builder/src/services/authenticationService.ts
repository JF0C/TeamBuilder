import { AuthProperties } from "../constants/AuthProperties";
import { Paths } from "../constants/Paths";
import { LoginStateDto } from "../dtos/auth/LoginStateDto";

export const AuthenticationService = {
    RedirectToAuthentication: (loginState: LoginStateDto) => {
        const url = `${AuthProperties.AuthorizationEndpoint}?client_id=${AuthProperties.ClientId}` +
            `&redirect_uri=${encodeURIComponent(AuthProperties.RedirectUri + Paths.LoginPath.substring(1))}` +
            `&state=${JSON.stringify(loginState)}` +
            `&scope=user:email`;
        window.location.href = url;
    }
}