export function parseDuration(durationStr: string): string {
    const [hh, mm, ss] = durationStr.split(":");
    const hours = parseInt(hh, 10);
    const minutes = parseInt(mm, 10);
    const seconds = parseFloat(ss);

    return `${hours} hours ${minutes} min ${Math.floor(seconds)} sec`;
}
