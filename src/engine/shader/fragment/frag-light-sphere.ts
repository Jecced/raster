import { FragmentShader } from "./fragment-shader";
import { GlData } from "../../data/gl-data";
import { Vec4 } from "../../../base/math/vec4";
import { ShaderVariable } from "../../data/shader-variable";
import { dot, max, mul, normalize, pow, reflect, sub, texture2D, vec3, vec4 } from "../glsl-grammar/glsl";
import { Vec3 } from "../../../base/math/vec3";

/**
 * 点光源片段着色器
 */
export class FragLightSphere implements FragmentShader {

    /**
     * 镜面高光系数
     */
    private readonly u_specularStrength: number = 1.5;

    /**
     * 镜面高光指数
     */
    private readonly u_specularPow: number = 32;

    public constructor(strength: number, pow: number) {
        this.u_specularPow = pow;
        this.u_specularStrength = strength;
    }

    main(glData: GlData, v: ShaderVariable): Vec4 {
        /**
         * 环境光照阶段
         */
        const ambientStrength = 0.1;// 环境光强度
        const ambient = mul(ambientStrength, glData.sphereLitColor.xyz);

        /**
         * 漫反射阶段
         */
        const normal: Vec3 = v.normal;
        const lightDir: Vec3 = normalize(sub(glData.sphereLitPos, v.position));
        // const lightDir: Vec3 = glData.mainLitDir;

        const diff = max(dot(normal, lightDir), 0.0);
        const diffuse = mul(diff, glData.sphereLitColor.xyz);

        /**
         * 镜面高光
         */
        const specularStrength = this.u_specularStrength;
        const viewDir: Vec3 = normalize(sub(glData.cameraPos, v.position));
        const reflectDir = reflect(lightDir.reverse(), normal);
        const spec = pow(max(dot(viewDir, reflectDir), 0.0), this.u_specularPow);
        const specular: Vec3 = mul(specularStrength * spec, glData.sphereLitColor.xyz);


        let baseColor: Vec4;
        if (glData.texture0) {
            baseColor = texture2D(glData.texture0, v.uv);
        } else {
            baseColor = v.color;
        }

        /**
         * 环境光 + 漫反射
         */
            // const result = mul(diffuse, baseColor.xyz);
        const result = mul(ambient.add(diffuse).add(specular), baseColor.xyz);

        return vec4(result, 1);
    }


}