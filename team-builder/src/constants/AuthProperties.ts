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
        if (location.href.includes('localhost')) {
            return 'http://localhost:5173/';
        }
        else {
            return 'https://teambuilder.c11g.net/';
        }
    }
}