import { TimeEvent, TimeEventEnum } from "./time-event";

export class DomText {
    public constructor() {
        TimeEvent.addListener(TimeEventEnum.Rendering, this.flashRenderingTime);
    }

    private flashRenderingTime(time: number): void {
        document.getElementById("rendering-time").textContent = `渲染耗时: ${time}ms`;
    }
}