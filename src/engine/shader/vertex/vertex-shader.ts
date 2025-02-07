import { Vec4 } from "../../../base/math/vec4";
import { VAO } from "../../data/vao";
import { GlData } from "../../data/gl-data";
import { ShaderVariable } from "../../data/shader-variable";

export interface VertexShader {
    main(glData: GlData, input: VAO, v: ShaderVariable): Vec4;
}