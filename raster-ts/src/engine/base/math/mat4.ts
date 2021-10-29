import { mad } from "mathjs";

export class Mat4 {
    private readonly data: Float32Array = undefined;

    constructor() {
        this.data = new Float32Array(16);
        for (let i = 0; i < 16; i++) {
            this.data[i] = 0;
        }
    }

    public set(index: number, v: number): void {
        this.data[index] = v;
    }

    public get(index: number): number {
        return this.data[index];
    }

    /**
     * 转置
     */
    public transpose(): void {
        const a01 = this.data[1];
        const a02 = this.data[2];
        const a03 = this.data[3];
        const a12 = this.data[6];
        const a13 = this.data[7];
        const a23 = this.data[11];

        this.data[1] = this.data[4];
        this.data[2] = this.data[8];
        this.data[3] = this.data[12];
        this.data[4] = a01;
        this.data[6] = this.data[9];
        this.data[7] = this.data[13];
        this.data[8] = a02;
        this.data[9] = a12;
        this.data[11] = this.data[14];
        this.data[12] = a03;
        this.data[13] = a13;
        this.data[14] = a23;
    }

    public clone(): Mat4 {
        const mat = new Mat4();
        for (let i = 0; i < 16; i++) {
            mat.data[i] = this.data[i];
        }
        return mat;
    }


    public toString(): string {
        return `mat4(\n\t${this.data[0]}, ${this.data[1]}, ${this.data[2]}, ${this.data[3]},\n\t${this.data[4]}, ${this.data[5]}, ${this.data[6]}, ${this.data[7]},\n\t${this.data[8]}, ${this.data[9]}, ${this.data[10]}, ${this.data[11]},\n\t${this.data[12]}, ${this.data[13]}, ${this.data[14]}, ${this.data[15]})`;
    }

    /**
     * 矩阵乘法
     * @param a
     * @param b
     */
    public static mul(a: Mat4, b: Mat4): Mat4 {
        const out = new Mat4();

        const a00 = a.data[0],
            a01 = a.data[1],
            a02 = a.data[2],
            a03 = a.data[3],
            a10 = a.data[4],
            a11 = a.data[5],
            a12 = a.data[6],
            a13 = a.data[7],
            a20 = a.data[8],
            a21 = a.data[9],
            a22 = a.data[10],
            a23 = a.data[11],
            a30 = a.data[12],
            a31 = a.data[13],
            a32 = a.data[14],
            a33 = a.data[15];

        // Cache only the current line of the second matrix
        let b0 = b.data[0],
            b1 = b.data[1],
            b2 = b.data[2],
            b3 = b.data[3];
        out.data[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out.data[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out.data[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out.data[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = b.data[4];
        b1 = b.data[5];
        b2 = b.data[6];
        b3 = b.data[7];
        out.data[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out.data[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out.data[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out.data[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = b.data[8];
        b1 = b.data[9];
        b2 = b.data[10];
        b3 = b.data[11];
        out.data[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out.data[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out.data[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out.data[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = b.data[12];
        b1 = b.data[13];
        b2 = b.data[14];
        b3 = b.data[15];
        out.data[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out.data[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out.data[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out.data[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        return out;
    }

    /**
     * 矩阵连乘
     * @param a
     * @param b
     * @param mats
     */
    public static mulLinked(a: Mat4, b: Mat4, ...mats: Mat4[]): Mat4 {
        mats.unshift(a, b);
        // 取出最后一个矩阵
        let lastMat = mats[mats.length - 1];

        /**
         * 矩阵依次从后往前进行矩阵乘法运算
         */
        for (let i = 0, len = mats.length - 1; i < len; i++) {
            const nowMat = mats[len - i - 1];
            lastMat = Mat4.mul(nowMat, lastMat);
        }

        return lastMat;
    }

    /**
     * 0 矩阵
     * @constructor
     */
    public static Zero(): Mat4 {
        return new Mat4();
    }

    /**
     * 单位矩阵
     * @constructor
     */
    public static Identity(): Mat4 {
        const mat = new Mat4();
        mat.data[0] = 1;
        mat.data[5] = 1;
        mat.data[10] = 1;
        mat.data[15] = 1;
        return mat;
    }

}