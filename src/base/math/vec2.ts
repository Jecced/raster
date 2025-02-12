export class Vec2 {
    public x: number;
    public y: number;

    constructor(x = 0, y = 0) {
        this.set(x, y);
    }

    public set(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    public fromVec2(other: Vec2): void {
        this.x = other.x;
        this.y = other.y;
    }


    public add(value: number, out?: Vec2): Vec2;
    public add(value: Vec2, out?: Vec2): Vec2;
    public add(vec4: Vec2 | number, out?: Vec2): Vec2 {
        if (!out) {
            out = new Vec2();
        }
        if (vec4 instanceof Vec2) {
            out.x = this.x + vec4.x;
            out.y = this.y + vec4.y;
        } else if (typeof vec4 === "number") {
            out.x = this.x + vec4;
            out.y = this.y + vec4;
        }
        return out;
    }

    public sub(value: number, out?: Vec2): Vec2;
    public sub(value: Vec2, out?: Vec2): Vec2;
    public sub(vec4: Vec2 | number, out?: Vec2): Vec2 {
        if (!out) {
            out = new Vec2();
        }
        if (vec4 instanceof Vec2) {
            out.x = this.x - vec4.x;
            out.y = this.y - vec4.y;
        } else if (typeof vec4 === "number") {
            out.x = this.x - vec4;
            out.y = this.y - vec4;
        }
        return out;
    }

    public mul(value: number, out?: Vec2): Vec2;
    public mul(value: Vec2, out?: Vec2): Vec2;
    public mul(vec4: Vec2 | number, out?: Vec2): Vec2 {
        if (!out) {
            out = new Vec2();
        }
        if (vec4 instanceof Vec2) {
            out.x = this.x * vec4.x;
            out.y = this.y * vec4.y;
        } else if (typeof vec4 === "number") {
            out.x = this.x * vec4;
            out.y = this.y * vec4;
        }
        return out;
    }

    public div(value: number, out?: Vec2): Vec2;
    public div(value: Vec2, out?: Vec2): Vec2;
    public div(vec4: Vec2 | number, out?: Vec2): Vec2 {
        if (!out) {
            out = new Vec2();
        }
        if (vec4 instanceof Vec2) {
            out.x = this.x / vec4.x;
            out.y = this.y / vec4.y;
        } else if (typeof vec4 === "number") {
            out.x = this.x / vec4;
            out.y = this.y / vec4;
        }
        return out;
    }

    public scale(scale: number): void {
        this.x *= scale;
        this.y *= scale;
    }


    public normalize(): this {
        let len = this.x * this.x + this.y * this.y;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
        }
        this.x *= len;
        this.y *= len;
        return this;
    }

    public isZero(): boolean {
        return this.x === 0 && this.y === 0;
    }

    public clone(): Vec2 {
        const out = new Vec2();
        out.x = this.x;
        out.y = this.y;
        return out;
    }


    public reverse(): Vec2 {
        return new Vec2(-this.x, -this.y);
    }

    public toString(): string {
        return `vec2(${this.x.toFixed(2)}, ${this.y.toFixed(2)}}})`;
    }

    public static fromArray(array: number[]): Vec2 {
        const len = array.length;
        const out = new Vec2();
        if (len > 0) {
            out.x = array[0];
        }
        if (len > 1) {
            out.y = array[1];
        }
        return out;
    }
}