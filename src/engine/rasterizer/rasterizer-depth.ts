import { Rasterizer } from "./rasterizer";
import { Vec4 } from "../../base/math/vec4";
import { ShaderVariable } from "../data/shader-variable";
import { ZBuffer } from "../buffer/z-buffer";
import { FragmentShader } from "../shader/fragment/fragment-shader";
import { ZBuffer1x } from "../buffer/z-buffer-1x";
import { GlData } from "../data/gl-data";
import { Calc } from "../../base/math/calc";

export class RasterizerDepth implements Rasterizer {
    private readonly zBuffer: ZBuffer;

    private readonly width: number = 0;
    private readonly height: number = 0;

    private boundBox: Vec4 = new Vec4();

    private readonly zBufferCopy2FrameBuffer: Float32Array = undefined;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.zBuffer = new ZBuffer1x(width, height);
        this.zBufferCopy2FrameBuffer = new Float32Array(width * height * 4);
    }

    public run(
        p0: Vec4, p1: Vec4, p2: Vec4,
        v0: ShaderVariable, v1: ShaderVariable, v2: ShaderVariable,
        fs: FragmentShader, glData: GlData,
    ): void {
        p0.standardized();
        p1.standardized();
        p2.standardized();

        // 计算三角形面积
        const s = Calc.cross(p1.x - p0.x, p1.y - p0.y, p2.x - p0.x, p2.y - p0.y) / 2;
        if (s === 0) {
            return;
        }

        /**
         * 计算三角形包围盒
         */
        Calc.bound(this.width, this.height, p0, p1, p2, this.boundBox);

        let currX = 0;
        let currY = 0;

        // 包围盒内, 逐像素遍历
        for (let x = this.boundBox.x; x < this.boundBox.z; x++) {
            for (let y = this.boundBox.y; y < this.boundBox.w; y++) {
                currX = x + 0.5;
                currY = y + 0.5;

                // 计算重心坐标
                let alpha = Calc.cross(currX - p1.x, currY - p1.y, currX - p2.x, currY - p2.y) / 2 / s;
                let beta = Calc.cross(currX - p2.x, currY - p2.y, currX - p0.x, currY - p0.y) / 2 / s;
                let gamma = 1 - alpha - beta;

                // 不在三角形内, 跳过
                if (alpha < 0 || beta < 0 || gamma < 0) {
                    continue;
                }

                let z = 1 / p0.z * alpha + 1 / p1.z * beta + 1 / p2.z * gamma;
                z = 1 / z;

                // 深度测试
                if (!this.zBuffer.zTest(x, y, z)) {
                    continue;
                }
                this.zBuffer.setZ(x, y, z);
            }
        }
    }


    public getFrameBuffer(): Float32Array {
        const z = this.zBuffer.getZBuffer();
        const copy = this.zBufferCopy2FrameBuffer;
        for (let i = 0, len = z.length; i < len; i++) {
            const v = (z[i] + 1) * 0.5;
            copy[i * 4] = v;
            copy[i * 4 + 1] = v;
            copy[i * 4 + 2] = v;
            copy[i * 4 + 3] = 1;
        }
        return copy;
    }

    public clear(): void {
        this.zBuffer.clear();
    }


}