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

}