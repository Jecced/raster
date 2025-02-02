import { ZBuffer } from "./z-buffer";

export class ZBuffer1x implements ZBuffer {
    private readonly z: Float32Array = undefined;

    private readonly width: number;
    private readonly height: number;

    public constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.z = new Float32Array(width * height * 4);
    }


    public zTest(x: number, y: number, z: number): boolean {
        const index = x + y * this.width;
        const nz = this.z[index];
        return isNaN(nz) || z > nz;
    }

    public setZ(x: number, y: number, z: number): void {
        const index = x + y * this.width;
        this.z[index] = z;
    }

    public clear(): void {
        for (let i = 0, len = this.z.length; i < len; i++) {
            this.z[i] = NaN;
        }
    }
}