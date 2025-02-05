export type LoginResponseDto = {
    accessToken: string
    scope: string
    email: string
    playerId: string
    playerName: string
    roles: string[]
}