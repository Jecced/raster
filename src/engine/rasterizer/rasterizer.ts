import { Vec4 } from "../../base/math/vec4";
import { ShaderVariable } from "../data/shader-variable";
import { FragmentShader } from "../shader/fragment/fragment-shader";
import { GlData } from "../data/gl-data";

/**
 * 光栅化
 */
export interface Rasterizer {
    run(
        p0: Vec4, p1: Vec4, p2: Vec4,
        v0: ShaderVariable, v1: ShaderVariable, v2: ShaderVariable,
        fs: FragmentShader, glData: GlData,
    ): void;

    getFrameBuffer(): Float32Array;

    clear(): void;

}