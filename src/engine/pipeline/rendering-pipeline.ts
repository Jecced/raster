import { VertexShader } from "../shader/vertex/vertex-shader";
import { FragmentShader } from "../shader/fragment/fragment-shader";
import { VBO } from "../data/vbo";
import { GlData } from "../data/gl-data";
import { ShaderVariable } from "../data/shader-variable";
import { Vec4 } from "../../base/math/vec4";
import { Rasterizer } from "../rasterizer/rasterizer";
import { Mat4 } from "../../base/math/mat4";

/**
 * 渲染管线
 */
export class RenderingPipeline {
    /**
     * 顶点着色器
     * @private
     */
    public vs: VertexShader;
    /**
     * 省略内容
     * 曲面细分
     * 几何着色器
     */

    /**
     * TODO
     * 图元组装 PrimitiveAssembly
     */

    /**
     * TODO
     * Culling and Clipping
     */

    /**
     * Fragment Shader
     */
    public fs: FragmentShader;

    /**
     * TODO
     * AlphaTest And Blend
     */

    /**
     * Rasterizer
     */
    public rasterizer: Rasterizer[] = [];

    /**
     * 渲染一个模型信息, 返回frame buffer
     * @param vbo
     * @param ebo
     * @param glData
     */
    public run(vbo: VBO, ebo: number[], glData: GlData): void {
        // 顶点, 都先执行一次顶点着色器
        const vertexCount = vbo.getVertexCount();
        // 着色器传递变量
        const variable: ShaderVariable[] = new Array(vertexCount);
        // 顶点着色器执行后的位置
        const positions: Vec4[] = new Array(vertexCount);
        /**
         * 预先算好屏幕矩阵
         * 先正交到-1~1的标准空间
         */
        let matO = Mat4.identity();
        matO = matO.mul(glData.matScreen, matO).mul(glData.matOrthographic, matO);
        for (let i = 0; i < vertexCount; i++) {
            variable[i] = new ShaderVariable();
            const point = this.vs.main(glData, vbo.getVertex(i), variable[i]);
            positions[i] = matO.mul(point);
        }

        // 遍历三角形的面
        for (let i = 0, len = ebo.length / 3; i < len; i++) {
            let i0 = ebo[i * 3];
            let i1 = ebo[i * 3 + 1];
            let i2 = ebo[i * 3 + 2];
            const p0 = positions[i0];
            const p1 = positions[i1];
            const p2 = positions[i2];

            const v0 = variable[i0];
            const v1 = variable[i1];
            const v2 = variable[i2];

            if (!this.isCCW(p0.clone(), p1.clone(), p2.clone())) {
                continue;
            }

            // 光栅化
            for (let i = 0, len = this.rasterizer.length; i < len; i++) {
                this.rasterizer[i].run(
                    p0.clone(), p1.clone(), p2.clone(),
                    v0, v1, v2,
                    this.fs, glData,
                );
            }
        }

    }

    /**
     * 行列式, 计算三角形是顺时针还是逆时针, 用于背面剔除
     * @param p0
     * @param p1
     * @param p2
     * @private
     */
    private isCCW(p0: Vec4, p1: Vec4, p2: Vec4): boolean {
        p0.standardized();
        p1.standardized();
        p2.standardized();
        const a = p1.x - p0.x;
        const b = p1.y - p0.y;
        const c = p2.x - p0.x;
        const d = p2.y - p0.y;
        return a * d - b * c < 0;
    }

    public clear(): void {
        for (let i = 0, len = this.rasterizer.length; i < len; i++) {
            this.rasterizer[i].clear();
        }
    }
}