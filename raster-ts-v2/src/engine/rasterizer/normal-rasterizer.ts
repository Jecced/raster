import { Rasterizer } from "./rasterizer";
import { Vec4 } from "../../base/math/vec4";
import { ShaderVariable } from "../data/shader-variable";
import { FrameBuffer } from "../buffer/frame-buffer";
import { ZBuffer } from "../buffer/z-buffer";
import { FragmentShader } from "../shader/fragment/fragment-shader";
import { ZBuffer1x } from "../buffer/z-buffer-1x";
import { FrameBuffer1x } from "../buffer/frame-buffer-1x";
import { VertexUtil } from "../data/vertex-util";
import { GlData } from "../data/gl-data";
import { Calc } from "../../base/math/calc";

export class NormalRasterizer implements Rasterizer {
    private zBuffer: ZBuffer;

    private frameBuffer: FrameBuffer;

    private readonly width: number = 0;
    private readonly height: number = 0;

    private boundBox: Vec4 = new Vec4();

    private variable: ShaderVariable;

    constructor(width: number, height: number) {
        this.variable = new ShaderVariable();
        this.width = width;
        this.height = height;
        this.zBuffer = new ZBuffer1x(width, height);
        this.frameBuffer = new FrameBuffer1x(width, height);
    }

    public run(
        p0: Vec4, p1: Vec4, p2: Vec4,
        v0: ShaderVariable, v1: ShaderVariable, v2: ShaderVariable,
        fs: FragmentShader, glData: GlData,
    ): void {

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

                alpha = alpha / p0.z * z;
                beta = beta / p1.z * z;
                gamma = gamma / p2.z * z;

                // 顶点数据variable插值
                VertexUtil.barycentric(v0, v1, v2, alpha, beta, gamma, this.variable);

                this.frameBuffer.setColor(x, y, fs.main(glData, this.variable));
            }
        }
    }

    public getFrameBuffer(): Float32Array {
        return this.frameBuffer.getFrameBuffer();
    }
    }

    public clear(): void {
        this.zBuffer.clear();
        this.frameBuffer.clearBuffer();
    }


}