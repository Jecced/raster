/**
 * msaa的深度测试
 */
import { Color } from "../base/color";
import { ZBuffer } from "./interface";
import { Vec4 } from "../base/math/vec4";

export class MsaaZBuffer implements ZBuffer {
    private readonly width: number;
    private readonly height: number;
    private readonly msaa: number;

    private readonly msaaSize: number;

    private readonly colors: Array<Color> = undefined;

    private frameBuffer: Uint8ClampedArray;

    private readonly z: Float32Array = undefined;

    private clearColor: Color = Color.BLACK.clone();

    private points: Array<Vec4> = [];

    constructor(width: number, height: number, msaa: number) {
        msaa >>= 0;
        this.width = width;
        this.height = height;
        this.msaa = msaa;
        this.msaaSize = msaa * msaa;
        const size = width * height * this.msaaSize;
        this.colors = new Array<Color>(size);
        for (let i = 0; i < size; i++) {
            this.colors[i] = new Color();
        }
        this.z = new Float32Array(size);

        const diff = 1 / (msaa + 1);
        for (let h = 0; h < msaa; h++) {
            for (let v = 0; v < msaa; v++) {
                this.points.push(new Vec4((h + 1) * diff, (v + 1) * diff));
            }
        }
    }

    public setFrameBuffer(frameBuffer: Uint8ClampedArray): void {
        this.frameBuffer = frameBuffer;
    }

    private getZPosition(x: number, y: number, index: number): number {
        return (this.width * y + x) * this.msaaSize + index;
    }

    public zTest(x: number, y: number, z: number, index: number): boolean {
        const zPos = this.getZPosition(x, y, index);
        return isNaN(this.z[zPos]) || this.z[zPos] < z;
    }

    public setZ(x: number, y: number, z: number, index: number): void {
        const zPos = this.getZPosition(x, y, index);
        this.z[zPos] = z;
    }


    public setClearColor(color: Color): void {
        this.clearColor.fromColor(color);
    }

    public clear(): void {
        for (let i = 0, len = this.colors.length; i < len; i++) {
            this.colors[i].fromColor(this.clearColor);
        }
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

    public setColor(x: number, y: number, color: Color, i: number): void {
        x >>= 0;
        y >>= 0;
        const index = this.getZPosition(x, y, i);
        this.colors[index].fromColor(color);
    }

    public getPoints(): Array<Vec4> {
        return this.points;
    }

    public applyMSAAFilter(x: number, y: number): void {
        const index = this.getZPosition(x, y, 0);

        let r = 0, g = 0, b = 0, a = 0;
        for (let i = 0, len = this.msaaSize; i < len; i++) {
            const ii = i + index;
            const c = this.colors[ii];
            r += c.r;
            g += c.g;
            b += c.b;
            a += c.a;
        }
        r /= this.msaaSize;
        g /= this.msaaSize;
        b /= this.msaaSize;
        a /= this.msaaSize;

        const i = (x + y * this.width);
        this.frameBuffer[i * 4] = r;
        this.frameBuffer[i * 4 + 1] = g;
        this.frameBuffer[i * 4 + 2] = b;
        this.frameBuffer[i * 4 + 3] = a;
    }

}