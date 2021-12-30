import { Mat4 } from "./mat4";
import { Vec4 } from "./vec4";

export class Calc {

    /**
     * 矩阵乘法, 左矩阵横向, 右矩阵纵向
     * @param a 左矩阵
     * @param b 右矩阵
     * @param out
     */
    public static mat4Mul(a: Mat4, b: Mat4, out?: Mat4): Mat4 {
        // const out = new Mat4();
        if (!out) {
            out = new Mat4();
        }
        const a00 = a.get(0),
            a01 = a.get(1),
            a02 = a.get(2),
            a03 = a.get(3),
            a10 = a.get(4),
            a11 = a.get(5),
            a12 = a.get(6),
            a13 = a.get(7),
            a20 = a.get(8),
            a21 = a.get(9),
            a22 = a.get(10),
            a23 = a.get(11),
            a30 = a.get(12),
            a31 = a.get(13),
            a32 = a.get(14),
            a33 = a.get(15);

        // Cache only the current line of the second matrix
        let b0 = b.get(0),
            b1 = b.get(1),
            b2 = b.get(2),
            b3 = b.get(3);
        out.set(0, b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30);
        out.set(1, b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31);
        out.set(2, b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32);
        out.set(3, b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33);

        b0 = b.get(4);
        b1 = b.get(5);
        b2 = b.get(6);
        b3 = b.get(7);
        out.set(4, b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30);
        out.set(5, b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31);
        out.set(6, b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32);
        out.set(7, b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33);

        b0 = b.get(8);
        b1 = b.get(9);
        b2 = b.get(10);
        b3 = b.get(11);
        out.set(8, b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30);
        out.set(9, b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31);
        out.set(10, b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32);
        out.set(11, b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33);

        b0 = b.get(12);
        b1 = b.get(13);
        b2 = b.get(14);
        b3 = b.get(15);
        out.set(12, b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30);
        out.set(13, b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31);
        out.set(14, b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32);
        out.set(15, b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33);
        return out;
    }

    /**
     * 矩阵连乘
     * @param a
     * @param b
     * @param mats
     */
    public static mat4MulLinked(...mats: Mat4[]): Mat4 {
        // 取出最后一个矩阵
        let lastMat = mats[mats.length - 1];

        /**
         * 矩阵依次从后往前进行矩阵乘法运算
         */
        for (let i = 0, len = mats.length - 1; i < len; i++) {
            const nowMat = mats[len - i - 1];
            lastMat = Calc.mat4Mul(nowMat, lastMat);
        }

        return lastMat;
    }

    /**
     * 矩阵和一个向量相乘
     * @param a
     * @param b
     * @param out
     */
    public static mat4MulVec4(a: Mat4, b: Vec4, out?: Vec4): Vec4 {
        const x = a.get(0) * b.x + a.get(1) * b.y + a.get(2) * b.z + a.get(3) * b.w;
        const y = a.get(4) * b.x + a.get(5) * b.y + a.get(6) * b.z + a.get(7) * b.w;
        const z = a.get(8) * b.x + a.get(9) * b.y + a.get(10) * b.z + a.get(11) * b.w;
        const w = a.get(12) * b.x + a.get(13) * b.y + a.get(14) * b.z + a.get(15) * b.w;
        if (!out) {
            out = new Vec4();
        }
        out.set(x, y, z, w);
        return out;
    }

    /**
     * 矩阵和一个向量相乘
     * @param a
     * @param b
     */
    public static mat4MulVec3(a: Mat4, b: Vec4, w: number): Vec4 {
        const x = a.get(0) * b.x + a.get(1) * b.y + a.get(2) * b.z + a.get(3) * w;
        const y = a.get(4) * b.x + a.get(5) * b.y + a.get(6) * b.z + a.get(7) * w;
        const z = a.get(8) * b.x + a.get(9) * b.y + a.get(10) * b.z + a.get(11) * w;
        const vv = a.get(12) * b.x + a.get(13) * b.y + a.get(14) * b.z + a.get(15) * w;
        return new Vec4(x, y, z, vv);
    }


    public static dotVec3(a: Vec4, b: Vec4): number {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    public static dotVec4(a: Vec4, b: Vec4): number {
        return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
    }

    public static crossVec3(a: Vec4, b: Vec4, out?: Vec4): Vec4 {
        if (!out) {
            out = new Vec4();
        }
        out.set(
            a.y * b.z - a.z * b.y,
            a.z * b.x - a.x * b.z,
            a.x * b.y - a.y * b.x,
            0,
        );
        return out;
    }

    public static vec2ByAngleDist(angle: number, distance: number, out?: Vec4): Vec4 {
        if (!out) {
            out = new Vec4();
        }
        angle = Math.PI / 180 * angle;
        out.x = distance * Math.cos(angle);
        out.y = distance * Math.sin(angle);
        return out;
    }

}