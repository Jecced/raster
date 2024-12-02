/**
 * 用32个二进制来保存rgba值, 即 4字节 无符号int类型
 * 0000 0000 | 0000 0000 | 0000 0000 | 0000 0000
 *     w     |     z     |     y     |     x
 * @param x [00-08) 位
 * @param y [08-16) 位
 * @param z [16-24) 位
 * @param w [24-32) 位
 */
export class Vec4 {
    private x: number;
    private y: number;
    private z: number;
    private w: number;

    constructor(x = 0, y = 0, z = 0, w = 0) {
        this.set(x, y, z, w);
    }

    public set(x: number, y: number, z: number, w: number): void {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    public add(vec4: Vec4, out?: Vec4): Vec4 {
        if (!out) {
            out = new Vec4();
        }
        out.x = this.x + vec4.x;
        out.y = this.y + vec4.y;
        out.z = this.z + vec4.z;
        return out;
    }

    public sub(vec4: Vec4, out?: Vec4): Vec4 {
        if (!out) {
            out = new Vec4();
        }
        out.x = this.x - vec4.x;
        out.y = this.y - vec4.y;
        out.z = this.z - vec4.z;
        return out;
    }

    public mul(vec4: Vec4, out?: Vec4): Vec4 {
        if (!out) {
            out = new Vec4();
        }
        out.x = this.x * vec4.x;
        out.y = this.y * vec4.y;
        out.z = this.z * vec4.z;
        return out;
    }

    public div(vec4: Vec4, out?: Vec4): Vec4 {
        if (!out) {
            out = new Vec4();
        }
        out.x = this.x / vec4.x;
        out.y = this.y / vec4.y;
        out.z = this.z / vec4.z;
        return out;
    }

    public scale(scale: number, out?: Vec4): Vec4 {
        if (!out) {
            out = new Vec4();
        }
        out.x = this.x * scale;
        out.y = this.y * scale;
        out.z = this.z * scale;
        return out;
    }

    public rotateX(rad: number): void {
        rad *= Math.PI / 180;
        const y = this.y * Math.cos(rad) - this.z * Math.sin(rad);
        const z = this.y * Math.sin(rad) + this.z * Math.cos(rad);
        this.y = y;
        this.z = z;
    }

    public rotateY(rad: number): void {
        rad *= Math.PI / 180;
        const x = this.z * Math.sin(rad) + this.x * Math.cos(rad);
        const y = this.z * Math.cos(rad) - this.x * Math.sin(rad);
        this.x = x;
        this.y = y;
    }

    public rotateZ(rad: number): void {
        rad *= Math.PI / 180;
        const x = this.x * Math.cos(rad) - this.y * Math.sin(rad);
        const y = this.x * Math.sin(rad) + this.y * Math.cos(rad);
    }

    public normalize(): void {
        let len = this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
        }
        this.x *= len;
        this.y *= len;
        this.z *= len;
        this.w *= len;
    }

    public standardized(): void {
        if (this.w === 0) {
            return;
        }
        this.x /= this.w;
        this.y /= this.w;
        this.z /= this.w;
        this.w = 1;
    }

    public isZero(): boolean {
        return this.x === 0 && this.y === 0 && this.z === 0;
    }

    public toPoint(): void {
        this.standardized();
        this.w = 1;
    }

    public toVec(): void {
        this.standardized();
        this.w = 0;
    }

    public clone(): Vec4 {
        const out = new Vec4();
        out.x = this.x;
        out.y = this.y;
        out.z = this.z;
        out.w = this.w;
        return out;
    }

    public toString(): string {
        return `vec4(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
    }

    public string(): string {
        return this.toString();
    }

}