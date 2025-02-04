export class AuthProperties {
    public static readonly AuthorizationEndpoint = 'https://github.com/login/oauth/authorize'
    public static readonly ClientId = 'Ov23lizljk9Gr4o7Miit'
    public static get RedirectUri() {
        if (location.href.includes('localhost')) {
            return 'http://localhost:5173/';
        }
        else {
            return 'https://teambuilder.c11g.net/';
        }
    }
}