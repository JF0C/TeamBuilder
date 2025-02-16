export class PaginationDefaults {
    public static get Count() {
        return window.screen.width >= 768 ? 50 : 12;
    }
    public static readonly Page = 1;
}