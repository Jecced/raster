export enum TimeEventEnum {
    Rendering
}

export class TimeEvent {
    private static map: Map<TimeEventEnum, (time: number) => void> = new Map<TimeEventEnum, (time: number) => void>();

    public static dispatch(key: TimeEventEnum, time: number): void {
        const fn = this.map.get(key);
        fn && fn(time);
    }

    public static addListener(key: TimeEventEnum, fn: (time: number) => void): void {
        this.map.set(key, fn);
    }
}