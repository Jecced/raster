import { Vec3 } from "../../../base/math/vec3";
import { Vec4 } from "../../../base/math/vec4";
import { Vec2 } from "../../../base/math/vec2";

export class Tools {
    public static VecTypedToArray(value: number | Vec3 | Vec2 | Vec4 | number[]): number[] {
        const out: number[] = [];
        if (value instanceof Vec4) {
            out.push(value.x, value.y, value.z, value.w);
        } else if (value instanceof Vec3) {
            out.push(value.x, value.y, value.z);
        } else if (value instanceof Vec2) {
            out.push(value.x, value.y);
        } else if (typeof value === "number") {
            out.push(value);
        } else if (Array.isArray(value)) {
            out.push(...value);
        }
        return out;
    }

}