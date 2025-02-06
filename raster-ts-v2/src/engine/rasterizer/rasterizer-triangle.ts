import { Rasterizer } from "./rasterizer";
import { Vec4 } from "../../base/math/vec4";
import { ShaderVariable } from "../data/shader-variable";
import { FrameBuffer } from "../buffer/frame-buffer";
import { FragmentShader } from "../shader/fragment/fragment-shader";
import { FrameBuffer1x } from "../buffer/frame-buffer-1x";
import { GlData } from "../data/gl-data";

export class RasterizerTriangle implements Rasterizer {

    private frameBuffer: FrameBuffer;

    private readonly width: number = 0;
    private readonly height: number = 0;

    private color: Vec4 = new Vec4(1, 1, 1, 1);

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.frameBuffer = new FrameBuffer1x(width, height);
    }

    public run(
        p0: Vec4, p1: Vec4, p2: Vec4,
        v0: ShaderVariable, v1: ShaderVariable, v2: ShaderVariable,
        fs: FragmentShader, glData: GlData,
    ): void {
        this.line(p0.x, p0.y, p1.x, p1.y);
        this.line(p2.x, p2.y, p1.x, p1.y);
        this.line(p0.x, p0.y, p2.x, p2.y);

    }

    /**
     * https://zhuanlan.zhihu.com/p/74990578
     */
    private line(x0: number, y0: number, x1: number, y1: number): void {
        x0 = Math.round(x0);
        y0 = Math.round(y0);
        y1 = Math.round(y1);
        x1 = Math.round(x1);
        const steep = Math.abs(y1 - y0) > Math.abs(x1 - x0);
        let temp = 0;
        if (steep) {
            temp = x0;
            x0 = y0;
            y0 = temp;
            temp = x1;
            x1 = y1;
            y1 = temp;
        }
        if (x0 > x1) {
            temp = x0;
            x0 = x1;
            x1 = temp;
            temp = y0;
            y0 = y1;
            y1 = temp;
        }
        const deltaX = x1 - x0;
        const deltaY = Math.abs(y1 - y0);

        let error = deltaX / 2;
        let yStep: number;
        let y = y0;

        if (y0 < y1) {
            yStep = 1;
        } else {
            yStep = -1;
        }

        for (let x = x0; x < x1; x++) {
            if (steep) {
                this.frameBuffer.setColor(y, x, this.color);
            } else {
                this.frameBuffer.setColor(x, y, this.color);
            }
            error = error - deltaY;
            if (error < 0) {
                y = y + yStep;
                error = error + deltaX;
            }
        }


    }

    public getFrameBuffer(): Float32Array {
        return this.frameBuffer.getFrameBuffer();
    }

    public clear(): void {
        this.frameBuffer.clearBuffer();
    }


}