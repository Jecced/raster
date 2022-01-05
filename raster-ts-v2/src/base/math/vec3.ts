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

    public add(vec3: Vec3, out?: Vec3): Vec3 {
        if (!out) {
            out = new Vec3();
        }
        out.x = this.x + vec3.x;
        out.y = this.y + vec3.y;
        out.z = this.z + vec3.z;
        return out;
    }

    public sub(vec3: Vec3, out?: Vec3): Vec3 {
        if (!out) {
            out = new Vec3();
        }
        out.x = this.x - vec3.x;
        out.y = this.y - vec3.y;
        out.z = this.z - vec3.z;
        return out;
    }

    public mul(vec3: Vec3, out?: Vec3): Vec3 {
        if (!out) {
            out = new Vec3();
        }
        out.x = this.x * vec3.x;
        out.y = this.y * vec3.y;
        out.z = this.z * vec3.z;
        return out;
    }

    public div(vec3: Vec3, out?: Vec3): Vec3 {
        if (!out) {
            out = new Vec3();
        }
        out.x = this.x / vec3.x;
        out.y = this.y / vec3.y;
        out.z = this.z / vec3.z;
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