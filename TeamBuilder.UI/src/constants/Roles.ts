export class Roles {
    public static readonly Admin = 'admin'
    public static get All(): string[] {
        return [this.Admin]
    }
}