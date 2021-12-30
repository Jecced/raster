import { Vec4 } from "../../base/math/vec4";

/**
 * 顶点着色器传给片段着色器的变量
 */
export class ShaderVariable {
    /**
     * 坐标
     */
    public v_position: Vec4;
    /**
     * 法线
     */
    public v_normal: Vec4;
    /**
     * uv信息
     */
    public v_uv: Vec4;
    /**
     * 颜色
     */
    public v_color: Vec4;

}