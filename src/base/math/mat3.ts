import { Vec3 } from "./vec3";

export class Mat3 {
    private readonly data: Float32Array = undefined;

    constructor() {
        this.data = new Float32Array(9);
        for (let i = 0; i < 9; i++) {
            this.data[i] = 0;
        }
    }

    public set(index: number, v: number): void {
        this.data[index] = v;
    }

    public get(index: number): number {
        return this.data[index];
    }

    public setFromNumber(a: number, b: number, c: number,
                         d: number, e: number, f: number,
                         g: number, h: number, i: number): void {
        this.data[0] = a;
        this.data[1] = b;
        this.data[2] = c;
        this.data[3] = d;
        this.data[4] = e;
        this.data[5] = f;
        this.data[6] = g;
        this.data[7] = h;
        this.data[8] = i;
    }

    /**
     * 转置
     * 0 1 2    0 3 6
     * 3 4 5  → 1 4 7
     * 6 7 8    2 5 8
     */
    public transpose(): void {
        const a01 = this.data[1];
        const a02 = this.data[2];
        const a05 = this.data[5];

        this.data[1] = this.data[3];
        this.data[3] = a01;
        this.data[2] = this.data[6];
        this.data[6] = a02;
        this.data[5] = this.data[7];
        this.data[7] = a05;
    }

    public clone(): Mat3 {
        const mat = new Mat3();
        for (let i = 0; i < 9; i++) {
            mat.data[i] = this.data[i];
        }
        return mat;
    }

    public toString(): string {
        return `mat3(\n\t${this.data[0].toFixed(2)}, ${this.data[1].toFixed(2)}, ${this.data[2].toFixed(2)},\n\t${this.data[3].toFixed(2)}, ${this.data[4].toFixed(2)}, ${this.data[5].toFixed(2)},\n\t${this.data[6].toFixed(2)}, ${this.data[7].toFixed(2)}, ${this.data[8].toFixed(2)})`;
    }

    /**
     * 获取 0 矩阵
     * 0 0 0
     * 0 0 0
     * 0 0 0
     * @constructor
     */
    public static zero(): Mat3 {
        return new Mat3();
    }

    /**
     * 获取 单位矩阵
     * 1 0 0
     * 0 1 0
     * 0 0 1
     * @constructor
     */
    public static identity(): Mat3 {
        const mat = new Mat3();
        mat.data[0] = 1;
        mat.data[4] = 1;
        mat.data[8] = 1;
        return mat;
    }

    public static fromData(a: number, b: number, c: number,
                           d: number, e: number, f: number,
                           g: number, h: number, i: number): Mat3 {
        const mat = new Mat3();
        mat.setFromNumber(a, b, c, d, e, f, g, h, i);
        return mat;
    }

    public mul(mat3: Mat3, out?: Mat3): Mat3;
    public mul(vec3: Vec3, out?: Vec3): Vec3;
    public mul(value: Vec3 | Mat3, out?: Vec3 | Mat3): Vec3 | Mat3 {
        if (value instanceof Vec3) {
            const a = this;
            const b = value;
            const x = a.get(0) * b.x + a.get(1) * b.y + a.get(2) * b.z;
            const y = a.get(3) * b.x + a.get(4) * b.y + a.get(5) * b.z;
            const z = a.get(6) * b.x + a.get(7) * b.y + a.get(8) * b.z;
            if (!out) {
                out = new Vec3();
            }
            out.set(x, y, z);
            return out;
        } else if (value instanceof Mat3) {
            if (!out) {
                out = new Mat3();
            }
            out = out as Mat3;

            /**
             * b取横, a取纵
             */
            const a = value;
            const b = this;
            const a00 = a.get(0),
                a01 = a.get(1),
                a02 = a.get(2),
                a10 = a.get(3),
                a11 = a.get(4),
                a12 = a.get(5),
                a20 = a.get(6),
                a21 = a.get(7),
                a22 = a.get(8)

            // Cache only the current line of the second matrix
            let b0 = b.get(0),
                b1 = b.get(1),
                b2 = b.get(2);
            out.set(0, b0 * a00 + b1 * a10 + b2 * a20);
            out.set(1, b0 * a01 + b1 * a11 + b2 * a21);
            out.set(2, b0 * a02 + b1 * a12 + b2 * a22);

            b0 = b.get(3);
            b1 = b.get(4);
            b2 = b.get(5);
            out.set(4, b0 * a00 + b1 * a10 + b2 * a20);
            out.set(5, b0 * a01 + b1 * a11 + b2 * a21);
            out.set(6, b0 * a02 + b1 * a12 + b2 * a22);

            b0 = b.get(6);
            b1 = b.get(7);
            b2 = b.get(8);
            out.set(8, b0 * a00 + b1 * a10 + b2 * a20);
            out.set(9, b0 * a01 + b1 * a11 + b2 * a21);
            out.set(10, b0 * a02 + b1 * a12 + b2 * a22);

            return out;
        }
        return undefined;
    }

}