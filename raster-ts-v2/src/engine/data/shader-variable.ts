import { Vec4 } from "../../base/math/vec4";

/**
 * 顶点着色器传给片段着色器的变量
 */
export class ShaderVariable {

    /**
     * 坐标
     */
    public position: Vec4;

    /**
     * 法线
     */
    public normal: Vec4;

    /**
     * uv信息
     */
    public uv: Vec4;

    /**
     * 颜色
     */
    public color: Vec4;

}