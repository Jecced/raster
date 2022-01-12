import { Vec3 } from "../../../base/math/vec3";
import { Vec2 } from "../../../base/math/vec2";
import { Vec4 } from "../../../base/math/vec4";

export function max(a: number, b: number): number {
    return Math.max(a, b);
}

export function min(a: number, b: number): number {
    return Math.min(a, b);
}

export function pow(a: number, pow: number): number;
export function pow(a: Vec2, pow: number): Vec2;
export function pow(a: Vec3, pow: number): Vec3;
export function pow(a: Vec4, pow: number): Vec4;
export function pow(a: number | Vec2 | Vec3 | Vec4, pow: number): number | Vec2 | Vec3 | Vec4 {
    if (a instanceof Vec4) {
        a.x = Math.pow(a.x, pow);
        a.y = Math.pow(a.y, pow);
        a.z = Math.pow(a.z, pow);
        a.w = Math.pow(a.w, pow);
        return a;
    } else if (a instanceof Vec3) {
        a.x = Math.pow(a.x, pow);
        a.y = Math.pow(a.y, pow);
        a.z = Math.pow(a.z, pow);
        return a;
    } else if (a instanceof Vec2) {
        a.x = Math.pow(a.x, pow);
        a.y = Math.pow(a.y, pow);
        return a;
    } else if (typeof a === "number") {
        return Math.pow(a, pow);
    }
    console.error("glsl pow param error");
    return a;
}


// 反射函数
export function reflect(i: Vec3, n: Vec3): Vec3 {
    // i - 2.0 * n * dot(n, i);
    // return sub(i, mul(mul(n, dot(n, i)), 2.0));
    return i.sub(n.mul(2).mul(dot(n, i)));
}

/**
 * 折射函数
 * @param i 入射向量
 * @param n 法线
 * @param eta 折射系数
 */
export function refract(i: Vec3, n: Vec3, eta: number) {
    let cosi = Math.max(-1, Math.min(1, dot(i, n)));
    // if(cosi < 0){
    //     cosi = -cosi;
    //     n = n.mul(-1);
    // }
    const k = 1 - eta * eta * (1 - cosi * cosi);
    if (k < 0) {
        return new Vec3(0, 0, 0);
    } else {
        return i.mul(eta).add(n.mul(eta * cosi - Math.sqrt(k)));
    }

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
