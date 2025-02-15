export class AuthProperties {
    public static readonly AuthorizationEndpoint = 'https://github.com/login/oauth/authorize'
    public static get ClientId() {
        if (location.href.includes('localhost')) {
            return 'Ov23liYDHecizl9oZqjd'
        }
        else {
            return 'Ov23lizljk9Gr4o7Miit';
        }
    }
    public static get RedirectUri() {
        if (location.href.includes('localhost') || location.href.includes('0.0.0.0')) {
            return 'http://localhost:5173/';
        }
        else {
            return 'https://teambuilder.c11g.net/';
        }
    }
    public static readonly Providers = {
        Github: 'github'
    }
    public static readonly LocalStorageUserKey = 'authenticated-user'
}