export const matchTypeToString = (type: number): string => {
    switch(type) {
        case 0: return 'Match'
        case 1: return 'Flunkyball'
        case 2: return 'Beerpong'
        case 3: return 'Fireball'
        default: return 'Error'
    }
}