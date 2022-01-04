import { FragmentShader } from "./fragment-shader";
import { GlData } from "../../data/gl-data";
import { Vec4 } from "../../../base/math/vec4";
import { ShaderVariable } from "../../data/shader-variable";

/**
 * 顶点色着色器
 */
export class FragVertexColor implements FragmentShader {
    main(glData: GlData, input: ShaderVariable): Vec4 {
        return new Vec4(
            input.color.x,
            input.color.y,
            input.color.z,
            1,
        );
    }


}