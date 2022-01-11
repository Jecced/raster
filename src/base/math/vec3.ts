export class Vec3 {
    public x: number;
    public y: number;
    public z: number;

    constructor(x = 0, y = 0, z = 0) {
        this.set(x, y, z);
    }

    public set(x: number, y: number, z: number): void {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public fromVec3(other: Vec3): void {
        this.x = other.x;
        this.y = other.y;
        this.z = other.z;
    }

    public add(value: number, out?: Vec3): Vec3;
    public add(value: Vec3, out?: Vec3): Vec3;
    public add(vec4: Vec3 | number, out?: Vec3): Vec3 {
        if (!out) {
            out = new Vec3();
        }
        if (vec4 instanceof Vec3) {
            out.x = this.x + vec4.x;
            out.y = this.y + vec4.y;
            out.z = this.z + vec4.z;
        } else if (typeof vec4 === "number") {
            out.x = this.x + vec4;
            out.y = this.y + vec4;
            out.z = this.z + vec4;
        }
        return out;
    }

    public sub(value: number, out?: Vec3): Vec3;
    public sub(value: Vec3, out?: Vec3): Vec3;
    public sub(vec4: Vec3 | number, out?: Vec3): Vec3 {
        if (!out) {
            out = new Vec3();
        }
        if (vec4 instanceof Vec3) {
            out.x = this.x - vec4.x;
            out.y = this.y - vec4.y;
            out.z = this.z - vec4.z;
        } else if (typeof vec4 === "number") {
            out.x = this.x - vec4;
            out.y = this.y - vec4;
            out.z = this.z - vec4;
        }
        return out;
    }

    public mul(value: number, out?: Vec3): Vec3;
    public mul(value: Vec3, out?: Vec3): Vec3;
    public mul(vec4: Vec3 | number, out?: Vec3): Vec3 {
        if (!out) {
            out = new Vec3();
        }
        if (vec4 instanceof Vec3) {
            out.x = this.x * vec4.x;
            out.y = this.y * vec4.y;
            out.z = this.z * vec4.z;
        } else if (typeof vec4 === "number") {
            out.x = this.x * vec4;
            out.y = this.y * vec4;
            out.z = this.z * vec4;
        }
        return out;
    }

    public div(value: number, out?: Vec3): Vec3;
    public div(value: Vec3, out?: Vec3): Vec3;
    public div(vec4: Vec3 | number, out?: Vec3): Vec3 {
        if (!out) {
            out = new Vec3();
        }
        if (vec4 instanceof Vec3) {
            out.x = this.x / vec4.x;
            out.y = this.y / vec4.y;
            out.z = this.z / vec4.z;
        } else if (typeof vec4 === "number") {
            out.x = this.x / vec4;
            out.y = this.y / vec4;
            out.z = this.z / vec4;
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
        let len = this.x * this.x + this.y * this.y + this.z * this.z;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
        }
        this.x *= len;
        this.y *= len;
        this.z *= len;
        return this;
    }

    public isZero(): boolean {
        return this.x === 0 && this.y === 0 && this.z === 0;
    }

    public clone(): Vec3 {
        const out = new Vec3();
        out.x = this.x;
        out.y = this.y;
        out.z = this.z;
        return out;
    }

    public reverse(): Vec3 {
        return new Vec3(-this.x, -this.y, -this.z);
    }

    public toString(): string {
        return `vec3(${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.z.toFixed(2)}})`;
    }

    public static cross(a: Vec3, b: Vec3, out?: Vec3): Vec3 {
        if (!out) {
            out = new Vec3();
        }
        out.set(
            a.y * b.z - a.z * b.y,
            a.z * b.x - a.x * b.z,
            a.x * b.y - a.y * b.x,
        );
        return out;
    }

    public static fromArray(array: number[]): Vec3 {
        const len = array.length;
        const out = new Vec3();
        if (len > 0) {
            out.x = array[0];
        }
        if (len > 1) {
            out.y = array[1];
        }
        if (len > 2) {
            out.z = array[2];
        }
        return out;
    }
}