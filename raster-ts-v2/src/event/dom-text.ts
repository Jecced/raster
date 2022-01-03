import { TimeEvent, TimeEventEnum } from "./time-event";

export class DomText {
    public static init(): void {
        TimeEvent.addListener(TimeEventEnum.Rendering, this.flashRenderingTime);
    }

    private static flashRenderingTime(time: number): void {
        document.getElementById("rendering-time").textContent = `渲染耗时: ${time}ms`;
    }
}