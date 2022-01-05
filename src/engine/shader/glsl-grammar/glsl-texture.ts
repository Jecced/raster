import { Texture } from "../../../base/texture";
import { Vec4 } from "../../../base/math/vec4";
import { Vec2 } from "../../../base/math/vec2";

/**
 * glsl 语法模拟, 纹理系列
 */

/**
 * texture2d函数
 * @param sampler2d
 * @param uv
 */
export function texture2D(sampler2d: Texture, uv: Vec2): Vec4 {
    /**
     * 纹理图片不存在, 直接返回一个默认颜色1, 0, 0 纯黄色用于判断错误
     */
    if (!sampler2d) {
        return new Vec4(1.0, 1.0, 0.0, 1.0);
    }
    return sampler2d.getColorByUV(uv.x, uv.y);
}