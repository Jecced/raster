import { VertexShader } from "./vertex-shader";
import { VAO } from "../../data/vao";
import { Vec4 } from "../../../base/math/vec4";
import { GlData } from "../../data/gl-data";
import { ShaderVariable } from "../../data/shader-variable";
import { mul, normalize, vec2, vec4 } from "../glsl-grammar/glsl";

export class VertSimple implements VertexShader {
    main(glData: GlData, input: VAO, v: ShaderVariable): Vec4 {

        const position = vec4(input.position, 1);

        v.position = mul(glData.matWorld, position).xyz;

        v.normal = normalize(mul(glData.matWorldIT, vec4(input.normal, 0)).xyz);

        v.uv = vec2(input.uv);
        v.color = vec4(input.color);


        return mul(glData.matMVP, position);
    }

}