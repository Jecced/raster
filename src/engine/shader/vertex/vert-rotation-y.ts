import { VertexShader } from "./vertex-shader";
import { VAO } from "../../data/vao";
import { Vec4 } from "../../../base/math/vec4";
import { GlData } from "../../data/gl-data";
import { ShaderVariable } from "../../data/shader-variable";
import { Mat4 } from "../../../base/math/mat4";
import { normalize, vec2, vec4 } from "../glsl-grammar/glsl";

export class VertRotationY implements VertexShader {
    main(glData: GlData, input: VAO, v: ShaderVariable): Vec4 {

        let position = vec4(input.position, 1);

        const c = glData.time;
        const rotationMat = Mat4.fromData(
            Math.cos(c), 0, -Math.sin(c), 0,
            0, 1, 0, 0,
            Math.sin(c), 0, Math.cos(c), 0,
            0, 0, 0, 1,
        );
        position = rotationMat.mul(position);// mul(rotationMat, position);
        /**
         * 局部坐标转世界坐标
         * 只需要使用xyz
         */
        v.position = glData.matWorld.mul(position).xyz;//mul(glData.matWorld, position).xyz;

        let matWorldIT = glData.matWorldIT;

        // rotationMat.transpose();
        matWorldIT = matWorldIT.mul(rotationMat);//mul(rotationMat, matWorldIT);

        // matWorldIT = mul(matWorldIT, rotationMat);

        /**
         * 计算法线
         */
        v.normal = normalize(matWorldIT.mul(vec4(input.normal, 0)).xyz);// normalize(mul(matWorldIT, vec4(input.normal, 0)).xyz);

        v.uv = vec2(input.uv);

        v.color = vec4(input.color);

        return glData.matMVP.mul(position);//mul(glData.matMVP, position);
    }

}