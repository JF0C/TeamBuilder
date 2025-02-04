export class ApiUrls {
    public static readonly PlayersEndpoint = 'Players'
    public static readonly GroupsEndpoint = 'Groups'
    public static readonly MatchesEndpoint = 'Matches'
    public static readonly AuthenticationEndpoint = 'Authentication'
    public static get BaseUrl(): string {
        if (location.href.includes('localhost')) {
            return 'http://localhost:5032/';
        }
        else {
            return 'https://teambuilder.c11g.net/';
        }
    }
}