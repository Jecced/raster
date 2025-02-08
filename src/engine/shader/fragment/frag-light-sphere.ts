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
        const specularStrength = 1.;
        const viewDir: Vec3 = normalize(sub(glData.cameraPos, v.position));
        const reflectDir = reflect(lightDir.reverse(), normal);
        const spec = pow(max(dot(viewDir, reflectDir), 0.0), 2);
        const specular: Vec3 = mul(specularStrength * spec, glData.sphereLitColor.xyz);


        const baseColor = texture2D(glData.texture0, v.uv);

        /**
         * 环境光 + 漫反射
         */
            // const result = mul(diffuse, baseColor.xyz);
        const result = mul(ambient.add(diffuse).add(specular), baseColor.xyz);

        return vec4(result, 1);
    }


}