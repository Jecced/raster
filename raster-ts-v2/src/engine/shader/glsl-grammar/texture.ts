import { Texture } from "../../../base/texture";
import { Vec4 } from "../../../base/math/vec4";

/**
 * glsl 语法模拟, 纹理系列
 */

/**
 * texture2d函数
 * @param sampler2d
 * @param uv
 */
export function texture2D(sampler2d: Texture, uv: Vec4): Vec4 {
    return sampler2d.getColorByUV(uv.x, uv.y);
}