import { Vec4 } from "../../base/math/vec4";
import { Vec3 } from "../../base/math/vec3";
import { Vec2 } from "../../base/math/vec2";

/**
 * 顶点着色器传给片段着色器的变量
 */
export class ShaderVariable {

    /**
     * 坐标
     */
    public position: Vec3;

    /**
     * 法线
     */
    public normal: Vec3;

    /**
     * uv信息
     */
    public uv: Vec2;

    /**
     * 颜色
     */
    public color: Vec4;

}