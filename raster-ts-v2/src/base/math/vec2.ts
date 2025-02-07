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

    public add(vec2: Vec2, out?: Vec2): Vec2 {
        if (!out) {
            out = new Vec2();
        }
        out.x = this.x + vec2.x;
        out.y = this.y + vec2.y;
        return out;
    }

    public sub(vec2: Vec2, out?: Vec2): Vec2 {
        if (!out) {
            out = new Vec2();
        }
        out.x = this.x - vec2.x;
        out.y = this.y - vec2.y;
        return out;
    }

    public mul(vec2: Vec2, out?: Vec2): Vec2 {
        if (!out) {
            out = new Vec2();
        }
        out.x = this.x * vec2.x;
        out.y = this.y * vec2.y;
        return out;
    }

    public div(vec2: Vec2, out?: Vec2): Vec2 {
        if (!out) {
            out = new Vec2();
        }
        out.x = this.x / vec2.x;
        out.y = this.y / vec2.y;
        return out;
    }

    public scale(scale: number): void {
        this.x *= scale;
        this.y *= scale;
    }


    public normalize(): void {
        let len = this.x * this.x + this.y * this.y;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
        }
        this.x *= len;
        this.y *= len;
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