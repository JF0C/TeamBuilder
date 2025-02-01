
export const millisToDateString = (millis: number) => {
    const date = new Date(millis);
    const m = date.getMonth() + 1;
    const month = (m < 10 ? '0' : '') + m.toString();
    const day = (date.getDate() < 10 ? '0': '') + date.getDate().toString();
    return `${day}.${month}.${date.getFullYear()}`
}

export const shortMonthName = (month: number) => {
    switch(month) {
        case 1: return 'Jan'
        case 2: return 'Feb'
        case 3: return 'Mar'
        case 4: return 'Apr'
        case 5: return 'May'
        case 6: return 'Jun'
        case 7: return 'Jul'
        case 8: return 'Aug'
        case 11: return 'Sep'
        case 12: return 'Dec'
        default: return 'Date Error'
    }
}

export const millisToDayMonthString = (millis: number) => {
    const date = new Date(millis);
    const month = date.getMonth() + 1;
    const day = (date.getDate() < 10 ? '0': '') + date.getDate().toString();
    return `${shortMonthName(month)} ${day}`
}

export const millisToTimeString = (millis: number) => {
    const date = new Date(millis);
    const hours = date.getHours();
    const hourStr = hours < 10 ? '0' + hours.toString() : hours.toString();
    const minutes = date.getMinutes();
    const minuteStr = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
    const seconds = date.getSeconds();
    const secondStr = seconds < 10 ? '0' + seconds.toString() : seconds.toString();
    return `${hourStr}:${minuteStr}:${secondStr}`
}

export const millisToDateTimeString = (millis: number) => {
    return `${millisToDateString(millis)} ${millisToTimeString(millis)}`
}

export const millisToClosestDateOrTime = (millis: number) => {
    const millisPerDay = 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const inputDate = new Date(millis);
    if (currentDate.valueOf() - millis < millisPerDay) {
        return millisToTimeString(millis);
    }
    else {
        if (currentDate.getFullYear() === inputDate.getFullYear()) {
            return millisToDayMonthString(millis);
        }
        else {
            return millisToDateString(millis);
        }
    }
}