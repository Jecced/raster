import { Texture } from "../../../base/texture";
import { Vec4 } from "../../../base/math/vec4";
import { Vec2 } from "../../../base/math/vec2";
import { TextureCube } from "../../../base/texture-cube";
import { Vec3 } from "../../../base/math/vec3";

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

/**
 * textureCube函数
 * @param sample3d
 * @param dir
 */
export function textureCube(sample3d: TextureCube, dir: Vec3): Vec4 {
    if (!sample3d) {
        return new Vec4(1.0, 1.0, 0.0, 1.0);
    }
    return sample3d.getColorByVec(dir.x, dir.y, dir.z);
}