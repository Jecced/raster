import { VertexShader } from "./vertex-shader";
import { VAO } from "../../data/vao";
import { Vec4 } from "../../../base/math/vec4";
import { GlData } from "../../data/gl-data";

export class SimpleVertex implements VertexShader {
    main(glData: GlData, input: VAO, output: VAO): Vec4 {
        return undefined;
    }

}