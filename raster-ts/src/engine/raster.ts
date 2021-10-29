import { ZBuffer } from "./zbuffer/interface";
import { Color } from "./base/color";

export class Raster {

    private readonly ctx: CanvasRenderingContext2D = undefined;

    private readonly imgData: ImageData;

    readonly height: number;
    readonly width: number;

    constructor() {
        const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;

        this.ctx = canvas.getContext("2d");

        this.height = canvas.height;

        this.width = canvas.width;

        this.imgData = this.ctx.getImageData(0, 0, this.width, this.height);

        this.clear();
    }

    public render(buffer: ZBuffer): void {
        let index = -1;
        let color:Color;
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {

                index = y * this.width + x;

                color = buffer.getColor(x, y)

                this.imgData.data[4 * index] = color.r;
                this.imgData.data[4 * index + 1] = color.g;
                this.imgData.data[4 * index + 2] = color.b;
                this.imgData.data[4 * index + 3] = color.a;
                // this.ctx.fillStyle = color.toHEX();
                // this.ctx.fillRect(x, y, 1, 1)
            }
        }

        this.ctx.putImageData(this.imgData, 0, 0);
    }

    public clear(): void {
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
}