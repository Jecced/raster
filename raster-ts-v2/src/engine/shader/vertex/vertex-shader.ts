import { Vec4 } from "../../../base/math/vec4";
import { VAO } from "../../data/vao";
import { GlData } from "../../data/gl-data";

export interface VertexShader {
    main(glData: GlData, input: VAO, output: VAO): Vec4;
}