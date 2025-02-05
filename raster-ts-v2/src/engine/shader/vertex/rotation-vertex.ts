import { VertexShader } from "./vertex-shader";
import { VAO } from "../../data/vao";
import { Vec4 } from "../../../base/math/vec4";
import { GlData } from "../../data/gl-data";
import { Calc } from "../../../base/math/calc";
import { ShaderVariable } from "../../data/shader-variable";
import { Mat4 } from "../../../base/math/mat4";

export class RotationVertex implements VertexShader {
    main(glData: GlData, input: VAO, v: ShaderVariable): Vec4 {
        // return cc_matProj * (cc_matView * matWorld) * In.position;

        const position = new Vec4(input.position[0], input.position[1], input.position[2], 1);

        // position.rotateY(45);
        // position.rotateX(20);
        const c = glData.time;// / 360 * 2 * Math.PI;
        const rotationMat = Mat4.fromData(
            Math.cos(c), 0, -Math.sin(c), 0,
            0, 1, 0, 0,
            Math.sin(c), 0, Math.cos(c), 0,
            0, 0, 0, 1,
        );
        Calc.mat4MulVec4(rotationMat, position, position);
        /**
         * 局部坐标转世界坐标
         * 只需要使用xyz
         */
        v.position = Calc.mat4MulVec4(glData.matWorld, position);

        /**
         * 计算法线
         */
        v.normal = Calc.mat4MulVec4(glData.matWorldIT, Vec4.fromArray(input.normal));
        v.normal.normalize3();

        v.uv = Vec4.fromArray(input.uv);

        v.color = Vec4.fromArray(input.color);


        return Calc.mat4MulVec4(glData.matMVP, position);
    }

}