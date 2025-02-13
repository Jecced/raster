export class Mat2 {
    private readonly data: Float32Array = undefined;

    constructor() {
        this.data = new Float32Array(4);
        for (let i = 0; i < 4; i++) {
            this.data[i] = 0;
        }
    }

    public set(index: number, v: number): void {
        this.data[index] = v;
    }

    public get(index: number): number {
        return this.data[index];
    }

    public setFromNumber(a: number, b: number, c: number, d: number): void {
        this.data[0] = a;
        this.data[1] = b;
        this.data[2] = c;
        this.data[3] = d;
    }

    /**
     * 转置
     * 0 1  0 2
     * 2 3  1 3
     */
    public transpose(): void {
        const a01 = this.data[1];

        this.data[1] = this.data[2];
        this.data[2] = a01;
    }

    public clone(): Mat2 {
        const mat = new Mat2();
        for (let i = 0; i < 4; i++) {
            mat.data[i] = this.data[i];
        }
        return mat;
    }

    public toString(): string {
        return `mat2(\n\t${this.data[0].toFixed(2)}, ${this.data[1].toFixed(2)},\n\t${this.data[2].toFixed(2)}, ${this.data[3].toFixed(2)}})`;
    }

    /**
     * 获取 0 矩阵
     * 0 0 0
     * 0 0 0
     * 0 0 0
     * @constructor
     */
    public static zero(): Mat2 {
        return new Mat2();
    }

    /**
     * 获取 单位矩阵
     * 1 0
     * 0 1
     * @constructor
     */
    public static identity(): Mat2 {
        const mat = new Mat2();
        mat.data[0] = 1;
        mat.data[3] = 1;
        return mat;
    }

    public static fromData(a: number, b: number, c: number, d: number): Mat2 {
        const mat = new Mat2();
        mat.setFromNumber(a, b, c, d);
        return mat;
    }

}