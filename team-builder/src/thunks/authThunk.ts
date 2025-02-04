import { ApiUrls } from "../constants/ApiUrls";
import { CodeAuthorizationDto } from "../dtos/auth/CodeAuthorizationDto";
import { TokenResponseDto } from "../dtos/auth/TokenResponseDto";
import { createPostThunk } from "./thunkBase";

export const codeAuthorizationRequest = createPostThunk<TokenResponseDto, CodeAuthorizationDto>(
    'code-authorization',
    () => `${ApiUrls.BaseUrl + ApiUrls.AuthenticationEndpoint}`,
    (response) => response.json()
)