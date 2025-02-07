import { FragmentShader } from "./fragment-shader";
import { GlData } from "../../data/gl-data";
import { Vec4 } from "../../../base/math/vec4";
import { ShaderVariable } from "../../data/shader-variable";
import { mul, vec3, vec4 } from "../glsl-grammar/glsl";

/**
 * 不做任何运算, 随机返回一个颜色的着色器
 */
const u_objectColor = vec3(1, 0.5, 0.31);
const u_lightColor = vec3(1);

export class FragLightTest implements FragmentShader {

    main(glData: GlData, input: ShaderVariable): Vec4 {
        return vec4(mul(u_objectColor, u_lightColor), 1);
    }


}