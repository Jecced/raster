import { WebCanvas } from "./web-canvas";
import { Rasterizer } from "../engine/rasterizer/rasterizer";

export class CanvasRasterizerMapping {
    private static mapping: Map<WebCanvas, Rasterizer> = new Map<WebCanvas, Rasterizer>();

    public static bind(canvas: WebCanvas, rasterizer: Rasterizer): void {
        this.mapping.set(canvas, rasterizer);
    }

    public static renderCanvas(): void {
        this.mapping.forEach((rasterizer, canvas) => {
            canvas.render(rasterizer.getFrameBuffer());
        });
    }

}