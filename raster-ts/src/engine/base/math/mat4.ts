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
        return `mat4(\n\t${this.data[0]}, ${this.data[1]}, ${this.data[2]}, ${this.data[3]},\n\t${this.data[4]}, ${this.data[5]}, ${this.data[6]}, ${this.data[7]},\n\t${this.data[8]}, ${this.data[9]}, ${this.data[10]}, ${this.data[11]},\n\t${this.data[12]}, ${this.data[13]}, ${this.data[14]}, ${this.data[15]})`;
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

}