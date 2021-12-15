import { Vec4 } from "../base/math/vec4";
import { Color } from "../base/color";

/**
 * 每个顶点的定义
 */
export interface Vertices {
    // 顶点位置
    vec: Vec4;
    // 法线
    normal: Vec4;
    // 颜色
    color: Color;
    // uv
    u: number;
    v: number;
}