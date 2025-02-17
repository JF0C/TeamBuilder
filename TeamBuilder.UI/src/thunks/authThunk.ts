import { ApiUrls } from "../constants/ApiUrls";
import { CodeAuthorizationDto } from "../dtos/auth/CodeAuthorizationDto";
import { CreateUserDto } from "../dtos/auth/CreateUserDto";
import { LoginResponseDto } from "../dtos/auth/LoginResponseDto";
import { RegisterUserDto } from "../dtos/auth/RegisterUserDto";
import { createPostThunk, createPutThunk } from "./thunkBase";

export const codeAuthorizationRequest = createPostThunk<LoginResponseDto, CodeAuthorizationDto>(
    'code-authorization',
    () => `${ApiUrls.BaseUrl + ApiUrls.AuthenticationEndpoint}`,
    (response) => response.json()
)

export const registerUserRequest = createPutThunk<RegisterUserDto>(
    'register-user',
    (request) => `${ApiUrls.BaseUrl + ApiUrls.UsersEndpoint}/${request.playerId}/Email/${request.email}`
)

export const createUserRequest = createPostThunk<number, CreateUserDto>(
    'create-user',
    () => `${ApiUrls.BaseUrl + ApiUrls.UsersEndpoint}`,
    (response) => response.json()
)
