export class WebCanvas {

    private readonly ctx: CanvasRenderingContext2D = undefined;

    private readonly imgData: ImageData;

    /**
     * 默认屏幕宽高为400*300
     * 实际为真实初始化环境的canvas大小
     */
    readonly height: number = 400;
    readonly width: number = 300;


    public constructor(elementId: string = "canvas") {
        if (!document) {
            return;
        }
        const canvas: HTMLCanvasElement = document.getElementById(elementId) as HTMLCanvasElement;
        this.ctx = canvas.getContext("2d");
        this.height = canvas.height;
        this.width = canvas.width;
        this.imgData = this.ctx.getImageData(0, 0, this.width, this.height);
    }

    public render(frameBuffer: Float32Array): void {
        if (frameBuffer.length !== this.imgData.data.length) {
            console.error("frame buffer和canvas长度不一致, 无法渲染");
            return;
        }
        const len = frameBuffer.length;
        for (let i = 0; i < len; i++) {
            this.imgData.data[i] = frameBuffer[i] * 255;
        }
        this.ctx.putImageData(this.imgData, 0, 0);
    }
}