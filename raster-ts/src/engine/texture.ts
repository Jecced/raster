import { Color } from "./color";

export class Texture {
    private img: ImageData = undefined;

    constructor(data?: ImageData) {
        if (data) {
            this.img = data;
        }
    }

    public setImageData(data: ImageData): void {
        if (!data || data instanceof ImageData) {
            console.error("set image data error, data is invalid, data: ", data);
            return;
        }
        this.img = data;
    }

    public getWidth(): number {
        if (!this.img) {
            return 0;
        }
        return this.img.width;
    }

    public getHeight(): number {
        if (!this.img) {
            return 0;
        }
        return this.img.height;
    }

    public getColorByUV(u: number, v: number): Color {
        if (!this.img) {
            return Color.BLACK;
        }
        if (u < 0 || u > 1 || v < 0 || v > 1) {
            return Color.BLACK;
        }

        const w = this.getWidth(), h = this.getHeight();
        const x = Math.round(w * u);
        const y = Math.round(h * (1 - v));
        const i = (y * w + x) * 4;
        const data = this.img.data;
        return new Color(data[i], data[i + 1], data[i + 2], data[i + 3]);
    }
}