import { Vec4 } from "./vec4";

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

    public setFromNumber(a: number, b: number, c: number, d: number,
                         e: number, f: number, g: number, h: number,
                         i: number, j: number, k: number, l: number,
                         m: number, n: number, o: number, p: number): void {
        this.data[0] = a;
        this.data[1] = b;
        this.data[2] = c;
        this.data[3] = d;
        this.data[4] = e;
        this.data[5] = f;
        this.data[6] = g;
        this.data[7] = h;
        this.data[8] = i;
        this.data[9] = j;
        this.data[10] = k;
        this.data[11] = l;
        this.data[12] = m;
        this.data[13] = n;
        this.data[14] = o;
        this.data[15] = p;
    }

    /**
     * 转置
     * a b c d      a e i m
     * e f g h  →   b f j n
     * i j k l  →   c g k o
     * m n o p      d h l p
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
        return `mat4(\n\t${this.data[0].toFixed(2)}, ${this.data[1].toFixed(2)}, ${this.data[2].toFixed(2)}, ${this.data[3].toFixed(2)},\n\t${this.data[4].toFixed(2)}, ${this.data[5].toFixed(2)}, ${this.data[6].toFixed(2)}, ${this.data[7].toFixed(2)},\n\t${this.data[8].toFixed(2)}, ${this.data[9].toFixed(2)}, ${this.data[10].toFixed(2)}, ${this.data[11].toFixed(2)},\n\t${this.data[12].toFixed(2)}, ${this.data[13].toFixed(2)}, ${this.data[14].toFixed(2)}, ${this.data[15].toFixed(2)})`;
    }

    /**
     * 获取 0 矩阵
     * 0 0 0 0
     * 0 0 0 0
     * 0 0 0 0
     * 0 0 0 0
     * @constructor
     */
    public static zero(): Mat4 {
        return new Mat4();
    }

    /**
     * 获取 单位矩阵
     * 1 0 0 0
     * 0 1 0 0
     * 0 0 1 0
     * 0 0 0 1
     * @constructor
     */
    public static identity(): Mat4 {
        const mat = new Mat4();
        mat.data[0] = 1;
        mat.data[5] = 1;
        mat.data[10] = 1;
        mat.data[15] = 1;
        return mat;
    }

    public static fromData(a: number, b: number, c: number, d: number,
                           e: number, f: number, g: number, h: number,
                           i: number, j: number, k: number, l: number,
                           m: number, n: number, o: number, p: number): Mat4 {
        const mat = new Mat4();
        mat.setFromNumber(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p);
        return mat;
    }

    public mul(mat4: Mat4, out?: Mat4): Mat4;
    public mul(vec4: Vec4, out?: Vec4): Vec4;
    public mul(value: Vec4 | Mat4, out?: Vec4 | Mat4): Vec4 | Mat4 {
        if (value instanceof Vec4) {
            const a = this;
            const b = value;
            const x = a.get(0) * b.x + a.get(1) * b.y + a.get(2) * b.z + a.get(3) * b.w;
            const y = a.get(4) * b.x + a.get(5) * b.y + a.get(6) * b.z + a.get(7) * b.w;
            const z = a.get(8) * b.x + a.get(9) * b.y + a.get(10) * b.z + a.get(11) * b.w;
            const w = a.get(12) * b.x + a.get(13) * b.y + a.get(14) * b.z + a.get(15) * b.w;
            if (!out) {
                out = new Vec4();
            }
            out.set(x, y, z, w);
            return out;
        } else if (value instanceof Mat4) {
            if (!out) {
                out = new Mat4();
            }
            out = out as Mat4;

            /**
             * b取横, a取纵
             */
            const a = value;
            const b = this;
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
        return undefined;
    }

}