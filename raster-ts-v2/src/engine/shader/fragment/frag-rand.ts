import { FragmentShader } from "./fragment-shader";
import { GlData } from "../../data/gl-data";
import { Vec4 } from "../../../base/math/vec4";
import { ShaderVariable } from "../../data/shader-variable";

/**
 * 不做任何运算, 随机返回一个颜色的着色器
 */
export class FragRand implements FragmentShader {
    main(glData: GlData, input: ShaderVariable): Vec4 {
        return new Vec4(
            Math.random(),
            Math.random(),
            Math.random(),
            1,
        );
    }


}