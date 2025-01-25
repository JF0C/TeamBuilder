export class ApiUrls {
    public static readonly PlayersEndpoint = 'Players'
    public static get BaseUrl(): string {
        // eslint-disable-next-line no-restricted-globals
        if (location.href.includes('localhost')) {
            return 'http://localhost:5032/';
        }
        else {
            return './';
        }
    }
}