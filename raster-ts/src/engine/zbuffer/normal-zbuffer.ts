/**
 * 基础的深度测试
 */
import { Color } from "../base/color";
import { ZBuffer } from "./interface";

export class NormalZBuffer implements ZBuffer {
    private readonly width;
    private readonly height;

    private readonly colors: Array<Color> = undefined;
    private readonly z: Array<number> = undefined;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        const size = width * height;
        this.colors = new Array<Color>(size);
        for (let i = 0; i < size; i++) {
            this.colors[i] = new Color();
        }
        this.z = new Array<number>(width * height);
        for (let i = 0, len = this.z.length; i < len; i++) {
            this.z[i] = undefined;
        }
    }

    public clear(): void {
        for (let i = 0, len = this.colors.length; i < len; i++) {
            this.colors[i].set(0, 0, 0, 255);
        }
        for (let i = 0, len = this.z.length; i < len; i++) {
            this.z[i] = undefined;
        }
    }

    public isFull(x: number, y: number): boolean {
        return this.z[x + y * this.width] === undefined;
    }

    public getColor(x: number, y: number): Color {
        const index = x + y * this.width;
        return this.colors[index];
    }

    public setColor(x: number, y: number, z: number, color: Color): void {
        const index = x + y * this.width;
        const tempColor = this.colors[index];
        const nz = this.z[index];
        if (nz === undefined || z > nz) {
            this.z[index] = z;
            tempColor.fromColor(color);
        }
    }

}