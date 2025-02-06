import { FragmentShader } from "./fragment-shader";
import { GlData } from "../../data/gl-data";
import { Vec4 } from "../../../base/math/vec4";
import { ShaderVariable } from "../../data/shader-variable";
import { texture2D } from "../glsl-grammar/texture";

/**
 * 直接返回texture2d0的颜色
 */
export class FragTexture implements FragmentShader {
    main(glData: GlData, input: ShaderVariable): Vec4 {
        return texture2D(glData.texture0, input.uv);
    }
}