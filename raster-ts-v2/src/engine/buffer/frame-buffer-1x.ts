/**
 * 1倍的frame buffer
 */
import { Color } from "../../base/color";
import { FrameBuffer } from "./frame-buffer";

export class FrameBuffer1x implements FrameBuffer {
    private readonly buffer: Float32Array;

    private clearColor = Color.BLACK;


    public constructor(width: number, height: number) {
        this.buffer = new Float32Array(width * height * 4);
    }

    /**
     * 获取FrameBuffer
     */
    public getFrameBuffer(): Float32Array {
        return this.buffer;
    }

    /**
     * 设置清除颜色
     * @param color
     */
    public setClearColor(color: Color): void {
        this.clearColor.fromColor(color);
    }

    /**
     * 将buffer所有颜色设置回背景色
     */
    public clearBuffer(): void {
        const r = this.clearColor.r / 255, g = this.clearColor.g / 255, b = this.clearColor.b / 255,
            a = this.clearColor.a / 255;
        for (let i = 0, len = this.buffer.length / 4; i < len; i++) {
            this.buffer[4 * i] = r;
            this.buffer[4 * i + 1] = g;
            this.buffer[4 * i + 2] = b;
            this.buffer[4 * i + 3] = a;
        }
    }

    /**
     * 转为1倍的buffer
     */
    public coverToNormalBuffer(): Float32Array {
        return this.buffer;
    }
}