export class Raster {

    private readonly ctx: CanvasRenderingContext2D = undefined;

    private readonly height: number;
    private readonly width: number;

    constructor() {
        const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;

        this.ctx = canvas.getContext("2d");

        this.height = canvas.height;

        this.width = canvas.width;

        this.clear();
    }

    public clear(): void {
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
}