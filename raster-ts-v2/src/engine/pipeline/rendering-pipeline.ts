import { VertexShader } from "../shader/vertex/vertex-shader";
import { FragmentShader } from "../shader/fragment/fragment-shader";
import { VBO } from "../data/vbo";
import { FrameBuffer } from "../buffer/frame-buffer";
import { ZBuffer } from "../buffer/z-buffer";
import { GlData } from "../data/gl-data";
import { ShaderVariable } from "../data/shader-variable";
import { Vec4 } from "../../base/math/vec4";
import { Calc } from "../../base/math/calc";

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
     * TODO
     * Rasterization
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
     * FrameBuffer
     */
    public frameBuffer: FrameBuffer;

    /**
     * ZBuffer
     */
    public zBuffer: ZBuffer;

    /**
     * 渲染一个模型信息, 返回frame buffer
     * @param vbo
     * @param ebo
     * @param glData
     */
    public run(vbo: VBO, ebo: number[], glData: GlData): Float32Array {
        // 顶点, 都先执行一次顶点着色器
        const vertexCount = vbo.getVertexCount();
        // 着色器传递变量
        const variable: ShaderVariable[] = new Array(vertexCount);
        // 顶点着色器执行后的位置
        const positions: Vec4[] = new Array(vertexCount);
        for (let i = 0; i < vertexCount; i++) {
            variable[i] = new ShaderVariable();
            const point = this.vs.main(glData, vbo.getVertex(i), variable[i]);
            positions[i] = Calc.mat4MulVec4(glData.matOrthographic, point);
        }

        // 遍历三角形的面
        for (let i = 0, len = ebo.length / 3; i < len; i++) {
            let i0 = ebo[i * 3];
            let i1 = ebo[i * 3 + 1];
            let i2 = ebo[i * 3 + 2];
            const p0 = positions[i0];
            const p1 = positions[i1];
            const p2 = positions[i2];
            console.log(p0.toString());
            console.log(p1.toString());
            console.log(p2.toString());
        }
        return undefined;
    }
}