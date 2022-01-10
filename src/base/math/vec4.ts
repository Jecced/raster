import { Vec3 } from "./vec3";
import { Vec2 } from "./vec2";

export class Vec4 {
    public x: number;
    public y: number;
    public z: number;
    public w: number;

    constructor(x = 0, y = 0, z = 0, w = 0) {
        this.set(x, y, z, w);
    }

    public set(x: number, y: number, z: number, w: number): void {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    public fromVec4(other: Vec4): void {
        this.x = other.x;
        this.y = other.y;
        this.z = other.z;
        this.w = other.w;
    }

    public get xyz(): Vec3 {
        return new Vec3(this.x, this.y, this.z);
    }

    public get xy(): Vec2 {
        return new Vec2(this.x, this.y);
    }

    public get zw(): Vec2 {
        return new Vec2(this.z, this.w);
    }

    public add(value: number, out?: Vec4): Vec4;
    public add(value: Vec4, out?: Vec4): Vec4;
    public add(vec4: Vec4 | number, out?: Vec4): Vec4 {
        if (!out) {
            out = new Vec4();
        }
        if (vec4 instanceof Vec4) {
            out.x = this.x + vec4.x;
            out.y = this.y + vec4.y;
            out.z = this.z + vec4.z;
            out.w = this.w + vec4.w;
        } else if (typeof vec4 === "number") {
            out.x = this.x + vec4;
            out.y = this.y + vec4;
            out.z = this.z + vec4;
            out.w = this.w + vec4;
        }
        return out;
    }

    public sub(value: number, out?: Vec4): Vec4;
    public sub(value: Vec4, out?: Vec4): Vec4;
    public sub(vec4: Vec4 | number, out?: Vec4): Vec4 {
        if (!out) {
            out = new Vec4();
        }
        if (vec4 instanceof Vec4) {
            out.x = this.x - vec4.x;
            out.y = this.y - vec4.y;
            out.z = this.z - vec4.z;
            out.w = this.w - vec4.w;
        } else if (typeof vec4 === "number") {
            out.x = this.x - vec4;
            out.y = this.y - vec4;
            out.z = this.z - vec4;
            out.w = this.w - vec4;
        }
        return out;
    }

    public mul(value: number, out?: Vec4): Vec4;
    public mul(value: Vec4, out?: Vec4): Vec4;
    public mul(vec4: Vec4 | number, out?: Vec4): Vec4 {
        if (!out) {
            out = new Vec4();
        }
        if (vec4 instanceof Vec4) {
            out.x = this.x * vec4.x;
            out.y = this.y * vec4.y;
            out.z = this.z * vec4.z;
            out.w = this.w * vec4.w;
        } else if (typeof vec4 === "number") {
            out.x = this.x * vec4;
            out.y = this.y * vec4;
            out.z = this.z * vec4;
            out.w = this.w * vec4;
        }
        return out;
    }

    public div(value: number, out?: Vec4): Vec4;
    public div(value: Vec4, out?: Vec4): Vec4;
    public div(vec4: Vec4 | number, out?: Vec4): Vec4 {
        if (!out) {
            out = new Vec4();
        }
        if (vec4 instanceof Vec4) {
            out.x = this.x / vec4.x;
            out.y = this.y / vec4.y;
            out.z = this.z / vec4.z;
            out.w = this.w / vec4.w;
        } else if (typeof vec4 === "number") {
            out.x = this.x / vec4;
            out.y = this.y / vec4;
            out.z = this.z / vec4;
            out.w = this.w / vec4;
        }
        return out;
    }

    public scale(scale: number): void {
        this.x *= scale;
        this.y *= scale;
        this.z *= scale;
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
        const z = this.z * Math.cos(rad) - this.x * Math.sin(rad);
        this.x = x;
        this.z = z;
    }

    public rotateZ(rad: number): void {
        rad *= Math.PI / 180;
        const x = this.x * Math.cos(rad) - this.y * Math.sin(rad);
        const y = this.x * Math.sin(rad) + this.y * Math.cos(rad);
    }

    public normalize(): this {
        let len = this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
        }
        this.x *= len;
        this.y *= len;
        this.z *= len;
        this.w *= len;
        return this;
    }

    public normalize3(): this {
        let len = this.x * this.x + this.y * this.y + this.z * this.z;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
        }
        this.x *= len;
        this.y *= len;
        this.z *= len;
        return this;
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

    public reverse(): Vec4 {
        return new Vec4(-this.x, -this.y, -this.z, -this.w);
    }

    public toString(): string {
        return `vec4(${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.z.toFixed(2)}, ${this.w.toFixed(2)})`;
    }

    public static fromArray(array: number[]): Vec4 {
        const len = array.length;
        const out = new Vec4();
        if (len > 0) {
            out.x = array[0];
        }
        if (len > 1) {
            out.y = array[1];
        }
        if (len > 2) {
            out.z = array[2];
        }
        if (len > 3) {
            out.w = array[3];
        }
        return out;
    }
}