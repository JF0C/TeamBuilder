import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { AuthState } from "../store/authReducer";
import { AuthenticationService } from "../services/authenticationService";
import { AuthProperties } from "../constants/AuthProperties";

export const createAuthenticatedThrowingAsyncThunk = <Tout, Tin>(name: string,
    fetchFunction: (arg: Tin, state: AuthState, body?: string) => Promise<Response>,
    parseFunction: (response: Response, arg: Tin | undefined) => Promise<Tout>,
    bodyFunction?: (arg: Tin) => string) => {
    return createAsyncThunk(name, async (arg: Tin, { getState }) => {
        const state: RootState = getState() as RootState;
        const response = await fetchFunction(arg, state.auth, bodyFunction?.(arg) ?? JSON.stringify(arg));
        if (response.status === 401 && state.auth.user) {
            AuthenticationService.RedirectToAuthentication({
                authProvider: AuthProperties.Providers.Github
            })
        }
        if (!response.ok) {
            throw new Error(await response.text());
        }
        return await parseFunction(response, arg);
    });
}

export const createPostThunk = <Tout, Tin>(name: string, url: (arg: Tin) => string,
    parseFunction: (response: Response) => Promise<Tout>,
    bodyFunction?: (arg: Tin) => string) => {
    return createAuthenticatedThrowingAsyncThunk(name, (arg: Tin, auth: AuthState, body?: string) => fetch(url(arg), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.user?.accessToken}`
        },
        credentials: 'include',
        body: body ?? JSON.stringify(arg)
    }), parseFunction, bodyFunction);
}

export const createPutThunk = <Tin>(name: string, url: (arg: Tin) => string,
    bodyFunction?: (arg: Tin) => string) => {
    return createAuthenticatedThrowingAsyncThunk(name, (arg: Tin, auth: AuthState, body?: string) => fetch(url(arg), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.user?.accessToken}`
        },
        credentials: 'include',
        body: body ?? JSON.stringify(arg)
    }), async () => { }, bodyFunction);
}

export const createResponsePutThunk = <Tout, Tin>(name: string, url: (arg: Tin) => string,
    parseFunction: (response: Response) => Promise<Tout>,
    bodyFunction?: (arg: Tin) => string) => {
    return createAuthenticatedThrowingAsyncThunk(name, (arg: Tin, auth: AuthState, body?: string) => fetch(url(arg), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.user?.accessToken}`
        },
        credentials: 'include',
        body: body ?? JSON.stringify(arg)
    }), parseFunction, bodyFunction);
}

export const createGetThunk = <Tout, Tin>(name: string, url: (arg: Tin) => string,
    parseFunction: (response: Response) => Promise<Tout>) => {
    return createAuthenticatedThrowingAsyncThunk(name, (arg: Tin, auth: AuthState) => fetch(url(arg), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${auth.user?.accessToken}`}
    }), parseFunction);
}

export const createDeleteThunk = <Tin>(name: string, url: (arg: Tin) => string,
    bodyFunction?: (arg: Tin) => string) => {
    return createAuthenticatedThrowingAsyncThunk(name, (arg: Tin, auth: AuthState, body?: string) => fetch(url(arg), {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.user?.accessToken}`
        },
        body: body
    }), async () => { }, bodyFunction);
}

export const createResponseDeleteThunk = <Tout, Tin>(name: string, url: (arg: Tin) => string,
    parseFunction: (response: Response) => Promise<Tout>,
    bodyFunction?: (arg: Tin) => string) => {
    return createAuthenticatedThrowingAsyncThunk(name, (arg: Tin, auth: AuthState, body?: string) => fetch(url(arg), {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.user?.accessToken}`
        },
        body: body
    }), parseFunction, bodyFunction);
}
