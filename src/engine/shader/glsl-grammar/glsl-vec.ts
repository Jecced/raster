import { Vec4 } from "../../../base/math/vec4";
import { Vec3 } from "../../../base/math/vec3";
import { Vec2 } from "../../../base/math/vec2";
import { Tools } from "./tools";

export function vec4(x: number | Vec2 | Vec3 | Vec4 | number[], y?: number | Vec2 | Vec3 | number[], z?: number | Vec2 | number[], w?: number | number[]): Vec4 {
    const arr: number[] = Tools.VecTypedToArray(x);
    arr.push(...Tools.VecTypedToArray(y));
    arr.push(...Tools.VecTypedToArray(z));
    arr.push(...Tools.VecTypedToArray(w));
    if (arr.length === 1) {
        return new Vec4(arr[0], arr[0], arr[0], arr[0]);
    }
    return Vec4.fromArray(arr);
}


export function vec3(x: number | Vec2 | Vec3 | number[], y?: number | Vec2 | number[], z?: number | number[]): Vec3 {
    const arr: number[] = Tools.VecTypedToArray(x);
    arr.push(...Tools.VecTypedToArray(y));
    arr.push(...Tools.VecTypedToArray(z));
    if (arr.length === 1) {
        return new Vec3(arr[0], arr[0], arr[0]);
    }
    return Vec3.fromArray(arr);
}

export function vec2(x: number | Vec2 | number[], y?: number | number[]): Vec2 {
    const arr: number[] = Tools.VecTypedToArray(x);
    arr.push(...Tools.VecTypedToArray(y));
    if (arr.length === 1) {
        return new Vec2(arr[0], arr[0]);
    }
    return Vec2.fromArray(arr);
}