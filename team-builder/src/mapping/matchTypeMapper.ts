import { MatchProperties } from "../constants/MatchProperties"

export const matchTypeToString = (type: number): string => {
    if (type >= 0 && type < MatchProperties.length) {
        return MatchProperties[type].name;
    }
    else {
        return 'Error';
    }
}

export const matchTypeWinningScore = (type: number): number => {
    if (type >= 0 && type < MatchProperties.length) {
        return MatchProperties[type].winningScore;
    }
    else {
        return 0;
    }
}