import { ApiUrls } from "../constants/ApiUrls";
import { CodeAuthorizationDto } from "../dtos/auth/CodeAuthorizationDto";
import { createPostThunk } from "./thunkBase";

export const codeAuthorizationRequest = createPostThunk<string, CodeAuthorizationDto>(
    'code-authorization',
    () => `${ApiUrls.BaseUrl + ApiUrls.AuthenticationEndpoint}`,
    (response) => response.text()
)