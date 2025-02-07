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

export function normalize(value: Vec2): Vec2;
export function normalize(value: Vec3): Vec3;
export function normalize(value: Vec4): Vec4;
export function normalize(value: Vec2 | Vec3 | Vec4): Vec2 | Vec3 | Vec4 {
    const copy = value.clone();
    copy.normalize();
    return copy;
}

export function dot(a: Vec2, b: Vec2): number;
export function dot(a: Vec3, b: Vec3): number;
export function dot(a: Vec4, b: Vec4): number;
export function dot(a: Vec2 | Vec3 | Vec4, b: Vec2 | Vec3 | Vec4): number {
    if (a instanceof Vec4 && b instanceof Vec4) {
        return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
    } else if (a instanceof Vec3 && b instanceof Vec3) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    } else if (a instanceof Vec2 && b instanceof Vec2) {
        return a.x * b.x + a.y * b.y;
    }
    console.error("glsl dot param error");
    return 0;
}
