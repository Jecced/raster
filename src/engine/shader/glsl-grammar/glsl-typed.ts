import { Vec4 } from "../../../base/math/vec4";
import { Vec3 } from "../../../base/math/vec3";
import { Vec2 } from "../../../base/math/vec2";
import { Mat2 } from "../../../base/math/mat2";
import { Mat3 } from "../../../base/math/mat3";
import { Mat4 } from "../../../base/math/mat4";

type VecTyped = number | number[] | Vec2 | Vec3 | Vec4;

function VecTypedToArray(value: VecTyped): number[] {
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

export function vec4(x: number | Vec2 | Vec3 | Vec4 | number[], y?: number | Vec2 | Vec3 | number[], z?: number | Vec2 | number[], w?: number | number[]): Vec4 {
    const arr = [];
    for (let i = 0, len = arguments.length; i < len; i++) {
        arr.push(...VecTypedToArray(arguments[i]));
    }
    if (arr.length === 1) {
        return new Vec4(arr[0], arr[0], arr[0], arr[0]);
    } else if (arr.length === 0) {
        return new Vec4();
    }
    return Vec4.fromArray(arr);
}


export function vec3(x?: VecTyped, y?: VecTyped, z?: VecTyped): Vec3 {
    const arr = [];
    for (let i = 0, len = arguments.length; i < len; i++) {
        arr.push(...VecTypedToArray(arguments[i]));
    }
    if (arr.length === 1) {
        return new Vec3(arr[0], arr[0], arr[0]);
    } else if (arr.length === 0) {
        return new Vec3();
    }
    return Vec3.fromArray(arr);
}

export function vec2(x?: VecTyped, y?: VecTyped): Vec2 {
    const arr = [];
    for (let i = 0, len = arguments.length; i < len; i++) {
        arr.push(...VecTypedToArray(arguments[i]));
    }
    if (arr.length === 1) {
        return new Vec2(arr[0], arr[0]);
    } else if (arr.length === 0) {
        return new Vec2();
    }
    return Vec2.fromArray(arr);
}

export function mat2(x?: VecTyped, y?: VecTyped, z?: VecTyped, w?: VecTyped): Mat2 {
    const arr = [];
    for (let i = 0, len = arguments.length; i < len; i++) {
        arr.push(...VecTypedToArray(arguments[i]));
    }
    if (arr.length === 0) {
        return Mat2.identity();
    } else if (arr.length !== 4) {
        console.error("mat2 param count error")
        return Mat2.identity();
    }
    return Mat2.fromData(arr[0], arr[1], arr[2], arr[3]);
}

export function mat3(a?: VecTyped, b?: VecTyped, c?: VecTyped,
                     d?: VecTyped, e?: VecTyped, f?: VecTyped,
                     g?: VecTyped, h?: VecTyped, i?: VecTyped,
): Mat3 {
    const arr = [];
    for (let i = 0, len = arguments.length; i < len; i++) {
        arr.push(...VecTypedToArray(arguments[i]));
    }
    if (arr.length === 0) {
        return Mat3.identity();
    } else if (arr.length !== 8) {
        console.error("mat3 param count error")
        return Mat3.identity();
    }
    return Mat3.fromData(
        arr[0], arr[1], arr[2],
        arr[3], arr[4], arr[5],
        arr[6], arr[7], arr[8]);
}

export function mat4(
    a?: VecTyped, b?: VecTyped, c?: VecTyped, d?: VecTyped,
    e?: VecTyped, f?: VecTyped, g?: VecTyped, h?: VecTyped,
    i?: VecTyped, j?: VecTyped, k?: VecTyped, l?: VecTyped,
    m?: VecTyped, n?: VecTyped, o?: VecTyped, p?: VecTyped,
): Mat4 {
    const arr = [];
    for (let i = 0, len = arguments.length; i < len; i++) {
        arr.push(...VecTypedToArray(arguments[i]));
    }
    if (arr.length === 0) {
        return Mat4.identity();
    } else if (arr.length !== 16) {
        console.error("mat4 param count error")
        return Mat4.identity();
    }
    return Mat4.fromData(
        arr[0], arr[1], arr[2], arr[3],
        arr[4], arr[5], arr[6], arr[7],
        arr[8], arr[9], arr[10], arr[11],
        arr[12], arr[13], arr[14], arr[15],
    );
}