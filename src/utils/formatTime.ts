export function formatHour(h: number): string {
    return `${h}:00`;
}

export function formatDecToTime(dec: number | null): string {
    if (dec === null || dec === undefined) return "";
    const h = Math.floor(dec);
    const m = Math.round((dec - h) * 60);
    return `${h}:${m < 10 ? "0" : ""}${m}`;
}