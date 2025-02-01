import { Vec4 } from "../../../base/math/vec4";
import { GlData } from "../../data/gl-data";
import { ShaderVariable } from "../../data/shader-variable";

export interface FragmentShader {
    main(glData: GlData, input: ShaderVariable): Vec4;
}