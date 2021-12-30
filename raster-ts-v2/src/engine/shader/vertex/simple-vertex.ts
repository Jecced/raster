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

        /**
         * 局部坐标转世界坐标
         * 只需要使用xyz
         */
        output.v_position = Calc.mat4MulVec4(glData.matWorld, position);

        /**
         * 计算法线
         */
        output.v_normal = Calc.mat4MulVec4(glData.matWorldIT, Vec4.fromArray(input.normal));
        output.v_normal.normalize3();

        output.v_uv = Vec4.fromArray(input.uv);

        output.v_color = Vec4.fromArray(input.color);

        const mat = Calc.mat4Mul(glData.matView, glData.matWorld);
        Calc.mat4Mul(glData.matProjection, mat, mat);


        return Calc.mat4MulVec4(mat, position);
    }

}