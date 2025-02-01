import { VertexShader } from "./vertex-shader";
import { VAO } from "../../data/vao";
import { Vec4 } from "../../../base/math/vec4";
import { GlData } from "../../data/gl-data";
import { Calc } from "../../../base/math/calc";
import { ShaderVariable } from "../../data/shader-variable";

export class SimpleVertex implements VertexShader {
    main(glData: GlData, input: VAO, output: ShaderVariable): Vec4 {
        // return cc_matProj * (cc_matView * matWorld) * In.position;

        const position = Vec4.fromArray(input.position);

        Calc.mat4MulVec4(glData.matWorld, position);

        return undefined;
    }

}