export class ApiUrls {
    public static readonly PlayersEndpoint = 'Players'
    public static readonly UsersEndpoint = 'Users'
    public static readonly GroupsEndpoint = 'Groups'
    public static readonly MatchesEndpoint = 'Matches'
    public static readonly AuthenticationEndpoint = 'Authentication'
    public static get BaseUrl(): string {
        if (location.href.includes('192.168.178.43')) {
            return 'http://192.168.178.43:5032/';
        }
        if (location.href.includes('localhost') || location.href.includes('0.0.0.0')) {
            return 'http://localhost:5032/';
        }
        else {
            return 'https://teambuilder.c11g.net/';
        }
    }
}