export function convertTimeLeft (distance: number, timeAsHours: number) {
    const km = distance / 1000;
    let time = timeAsHours / 60;

    if (km > 5 && km <= 10) {
        time = time * 1.5;
    } else if (km > 10 && km <= 20) {
        time = time * 2;
    } else if (km > 20) {
        time = time * 2.5;
    }

    return time.toFixed(0);
}