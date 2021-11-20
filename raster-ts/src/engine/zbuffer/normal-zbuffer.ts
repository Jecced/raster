/**
 * 基础的深度测试
 */
import { Color } from "../base/color";
import { ZBuffer } from "./interface";

export class NormalZBuffer implements ZBuffer {
    private readonly width;
    private readonly height;

    private readonly z: Float32Array = undefined;

    private clearColor: Color = Color.BLACK.clone();

    private frameBuffer: Uint8ClampedArray;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        const size = width * height;
        this.z = new Float32Array(size);
        for (let i = 0, len = this.z.length; i < len; i++) {
            this.z[i] = undefined;
        }
    }

    public setFrameBuffer(frameBuffer: Uint8ClampedArray): void {
        this.frameBuffer = frameBuffer;
    }

    public zTest(x: number, y: number, z: number): boolean {
        const index = x + y * this.width;
        const nz = this.z[index];
        return isNaN(nz) || z > nz;
    }

    public setZ(x: number, y: number, z: number): void {
        const index = x + y * this.width;
        this.z[index] = z;
    }

    public setClearColor(color: Color): void {
        this.clearColor.fromColor(color);
    }

    public clear(): void {
        for (let i = 0, len = this.z.length; i < len; i++) {
            this.z[i] = NaN;
        }
        const r = this.clearColor.r;
        const g = this.clearColor.g;
        const b = this.clearColor.b;
        const a = this.clearColor.a;
        for (let i = 0, len = this.height * this.width; i < len; i++) {
            this.frameBuffer[i * 4] = r;
            this.frameBuffer[i * 4 + 1] = g;
            this.frameBuffer[i * 4 + 2] = b;
            this.frameBuffer[i * 4 + 3] = a;
        }
    }

    public setColor(x: number, y: number, color: Color): void {
        x = x >> 0;
        y = y >> 0;
        const index = (x + y * this.width);
        this.frameBuffer[index * 4] = color.r;
        this.frameBuffer[index * 4 + 1] = color.g;
        this.frameBuffer[index * 4 + 2] = color.b;
        this.frameBuffer[index * 4 + 3] = color.a;
    }

}