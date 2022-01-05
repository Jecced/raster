import { Calc } from "../../../base/math/calc";
import { Mat4 } from "../../../base/math/mat4";
import { Vec4 } from "../../../base/math/vec4";
import { Vec3 } from "../../../base/math/vec3";
import { Vec2 } from "../../../base/math/vec2";

export function add(a: Vec2, b: Vec2): Vec2;
export function add(a: Vec3, b: Vec3): Vec3;
export function add(a: Vec4, b: Vec4): Vec4;
export function add(a: Vec2 | Vec3 | Vec4, b: Vec2 | Vec3 | Vec4): Vec2 | Vec3 | Vec4 {
    if (a instanceof Vec4 && b instanceof Vec4) {
        return new Vec4(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
    } else if (a instanceof Vec3 && b instanceof Vec3) {
        return new Vec3(a.x + b.x, a.y + b.y, a.z + b.z);
    } else if (a instanceof Vec2 && b instanceof Vec2) {
        return new Vec2(a.x + b.x, a.y + b.y);
    }
    console.error("glsl add param error");
}

export function sub(a: Vec2, b: Vec2): Vec2;
export function sub(a: Vec3, b: Vec3): Vec3;
export function sub(a: Vec4, b: Vec4): Vec4;
export function sub(a: Vec2 | Vec3 | Vec4, b: Vec2 | Vec3 | Vec4): Vec2 | Vec3 | Vec4 {
    if (a instanceof Vec4 && b instanceof Vec4) {
        return new Vec4(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
    } else if (a instanceof Vec3 && b instanceof Vec3) {
        return new Vec3(a.x - b.x, a.y - b.y, a.z - b.z);
    } else if (a instanceof Vec2 && b instanceof Vec2) {
        return new Vec2(a.x - b.x, a.y - b.y);
    }
    console.error("glsl sub param error");
}

export function mul(x: number, y: Vec2): Vec2;
export function mul(x: Vec2, y: number): Vec2;
export function mul(x: Vec2, y: Vec2): Vec2;
export function mul(x: number, y: Vec3): Vec3;
export function mul(x: Vec3, y: number): Vec3;
export function mul(x: Vec3, y: Vec3): Vec3;
export function mul(x: number, y: Vec4): Vec4;
export function mul(x: Vec4, y: number): Vec4;
export function mul(x: Vec4, y: Vec4): Vec4;
export function mul(x: Mat4, y: Vec4): Vec4;
export function mul(x: Mat4, y: Mat4): Mat4;
export function mul(x: number | Vec2 | Vec3 | Vec4 | Mat4, y: number | Vec2 | Vec3 | Vec4 | Mat4): Vec2 | Vec3 | Vec4 | Mat4 {
    if (x instanceof Mat4 && y instanceof Mat4) {
        return Calc.mat4Mul(x, y);
    } else if (x instanceof Mat4 && y instanceof Vec4) {
        return Calc.mat4MulVec4(x, y);
    } else if (x instanceof Vec4 && y instanceof Vec4) {
        return new Vec4(x.x * y.x, x.y * y.y, x.z * y.z, x.w * y.w);
    } else if (typeof x === "number" && y instanceof Vec4) {
        return new Vec4(x * y.x, x * y.y, x * y.z, x * y.w);
    } else if (x instanceof Vec4 && typeof y === "number") {
        return new Vec4(x.x * y, x.y * y, x.z * y, x.w * y);
    } else if (x instanceof Vec3 && y instanceof Vec3) {
        return new Vec3(x.x * y.x, x.y * y.y, x.z * y.z);
    } else if (typeof x === "number" && y instanceof Vec3) {
        return new Vec3(x * y.x, x * y.y, x * y.z);
    } else if (x instanceof Vec3 && typeof y === "number") {
        return new Vec3(x.x * y, x.y * y, x.z * y);
    } else if (x instanceof Vec2 && y instanceof Vec2) {
        return new Vec2(x.x * y.x, x.y * y.y);
    } else if (typeof x === "number" && y instanceof Vec2) {
        return new Vec2(x * y.x, x * y.y);
    } else if (x instanceof Vec2 && typeof y === "number") {
        return new Vec2(x.x * y, x.y * y);
    }
    console.error("glsl mul param error");
    return undefined;
}

export function div(x: number, y: Vec2): Vec2;
export function div(x: Vec2, y: number): Vec2;
export function div(x: Vec2, y: Vec2): Vec2;
export function div(x: number, y: Vec3): Vec3;
export function div(x: Vec3, y: number): Vec3;
export function div(x: Vec3, y: Vec3): Vec3;
export function div(x: number, y: Vec4): Vec4;
export function div(x: Vec4, y: number): Vec4;
export function div(x: Vec4, y: Vec4): Vec4;
export function div(x: number | Vec2 | Vec3 | Vec4, y: number | Vec2 | Vec3 | Vec4): Vec2 | Vec3 | Vec4 {
    if (x instanceof Vec4 && y instanceof Vec4) {
        return new Vec4(x.x / y.x, x.y / y.y, x.z / y.z, x.w / y.w);
    } else if (typeof x === "number" && y instanceof Vec4) {
        return new Vec4(x / y.x, x / y.y, x / y.z, x / y.w);
    } else if (x instanceof Vec4 && typeof y === "number") {
        return new Vec4(x.x / y, x.y / y, x.z / y, x.w / y);
    } else if (x instanceof Vec3 && y instanceof Vec3) {
        return new Vec3(x.x / y.x, x.y / y.y, x.z / y.z);
    } else if (typeof x === "number" && y instanceof Vec3) {
        return new Vec3(x / y.x, x / y.y, x / y.z);
    } else if (x instanceof Vec3 && typeof y === "number") {
        return new Vec3(x.x / y, x.y / y, x.z / y);
    } else if (x instanceof Vec2 && y instanceof Vec2) {
        return new Vec2(x.x / y.x, x.y / y.y);
    } else if (typeof x === "number" && y instanceof Vec2) {
        return new Vec2(x / y.x, x / y.y);
    } else if (x instanceof Vec2 && typeof y === "number") {
        return new Vec2(x.x / y, x.y / y);
    }
    console.error("glsl div param error");
    return undefined;
}