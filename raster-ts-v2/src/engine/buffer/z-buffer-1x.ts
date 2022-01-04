import { ZBuffer } from "./z-buffer";

export class ZBuffer1x implements ZBuffer {
    private readonly z: Float32Array = undefined;

    private readonly width: number;
    private readonly height: number;

    public constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.z = new Float32Array(width * height);
    }


    public zTest(x: number, y: number, z: number): boolean {
        if (z > 1 || z < -1) {
            return false;
        }
        const index = x + y * this.width;
        const nz = this.z[index];
        return z > nz;
    }

    public setZ(x: number, y: number, z: number): void {
        const index = x + y * this.width;
        this.z[index] = z;
    }

    public clear(): void {
        for (let i = 0, len = this.z.length; i < len; i++) {
            this.z[i] = -1;
        }
    }

    getZBuffer(): Float32Array {
        return this.z;
    }
}