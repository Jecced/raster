import { ZBuffer } from "./zbuffer/interface";
import { Color } from "./base/color";
import { Vec4 } from "./base/math/vec4";
import { ObjModel } from "../model/obj/load-obj-model";
import { Vertices } from "../model/vertices";
import { Texture } from "./base/texture";
import { Barycentric } from "./base/barycentric";

export class Raster {

    private readonly ctx: CanvasRenderingContext2D = undefined;

    private readonly imgData: ImageData;

    readonly height: number;
    readonly width: number;

    constructor() {
        const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;

        this.ctx = canvas.getContext("2d");

        this.height = canvas.height;

        this.width = canvas.width;

        this.imgData = this.ctx.getImageData(0, 0, this.width, this.height);

    }

    public render(buffer: ZBuffer): void {
        let index = -1;
        let color: Color;
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {

                index = y * this.width + x;

                color = buffer.getColor(x, y);

                this.imgData.data[4 * index] = color.r;
                this.imgData.data[4 * index + 1] = color.g;
                this.imgData.data[4 * index + 2] = color.b;
                this.imgData.data[4 * index + 3] = color.a;
                // this.ctx.fillStyle = color.toHEX();
                // this.ctx.fillRect(x, y, 1, 1)
            }
        }

        this.ctx.putImageData(this.imgData, 0, 0);
    }

    private size = -1;
    private hw = -1;
    private hh = -1;

    public getXy(input: Vec4, output: Vec4): void {
        if (this.size === -1) {
            this.size = Math.min(this.width, this.height) / 2;
            this.hw = this.width / 2;
            this.hh = this.height / 2;
        }

        output.set(
            Math.round(input.x * this.size + this.hw),
            Math.round(-input.y * this.size + this.hh),
            0, 0);
    }

    private bound(v1: Vec4, v2: Vec4, v3: Vec4, out: Vec4): Vec4 {
        out.x = Math.min(v1.x, v2.x, v3.x);
        if (out.x < 0) {
            out.x = 0;
        }

        out.y = Math.min(v1.y, v2.y, v3.y);
        if (out.y < 0) {
            out.y = 0;
        }

        out.z = Math.max(v1.x, v2.x, v3.x);
        if (out.z > this.width) {
            out.z = this.width;
        }

        out.w = Math.max(v1.y, v2.y, v3.y);
        if (out.w > this.height) {
            out.w = this.height;
        }

        out.x >>= 0;
        out.y >>= 0;
        out.z >>= 0;
        out.w >>= 0;
        return out;
    }

    private v1 = {} as Vertices;
    private v2 = {} as Vertices;
    private v3 = {} as Vertices;


    public renderModel(model: ObjModel, buffer: ZBuffer): void {
        for (let i = 0, len = model.face.length; i < len; i++) {
            const face = model.face[i];
            let key = face.key;
            if (key === "") {
                key = "default";
            }
            const texture = model.mat.get(key);
            model.faceToVertices(i, this.v1, this.v2, this.v3);

            this.renderFace(texture, this.v1, this.v2, this.v3, buffer);
        }
    }

    public renderModelTest(i: number, model: ObjModel, buffer: ZBuffer): void {
        this.renderTest(i, model, buffer);
    }

    private renderTest(i: number, model: ObjModel, buffer: ZBuffer) {
        const face = model.face[i];
        let key = face.key;
        if (key === "") {
            key = "default";
        }
        const texture = model.mat.get(key);
        model.faceToVertices(i, this.v1, this.v2, this.v3);
        this.renderFace(texture, this.v1, this.v2, this.v3, buffer);
    }

    private tempVecOutV0: Vec4 = new Vec4();
    private tempVecOutV1: Vec4 = new Vec4();
    private tempVecOutV2: Vec4 = new Vec4();

    private tempVecBound: Vec4 = new Vec4();
    private tempBarycentricOut: Vec4 = new Vec4();
    private tempColor: Color = new Color();

    private renderFace(texture: Texture, v0: Vertices, v1: Vertices, v2: Vertices, buffer: ZBuffer): void {
        this.getXy(v0.vec, this.tempVecOutV0);
        this.getXy(v1.vec, this.tempVecOutV1);
        this.getXy(v2.vec, this.tempVecOutV2);

        this.bound(this.tempVecOutV0, this.tempVecOutV1, this.tempVecOutV2, this.tempVecBound);

        for (let x = this.tempVecBound.x; x < this.tempVecBound.z; x++) {
            for (let y = this.tempVecBound.y; y < this.tempVecBound.w; y++) {
                Barycentric.test(
                    this.tempVecOutV0.x, this.tempVecOutV0.y,
                    this.tempVecOutV1.x, this.tempVecOutV1.y,
                    this.tempVecOutV2.x, this.tempVecOutV2.y,
                    x + 0.5, y + 0.5,
                    this.tempBarycentricOut,
                );

                if (
                    this.tempBarycentricOut.x < 0 ||
                    this.tempBarycentricOut.y < 0 ||
                    this.tempBarycentricOut.z < 0
                ) {
                    continue;
                }

                // let z =
                //     1 / v0.vec.z * this.tempBarycentricOut.x +
                //     1 / v1.vec.z * this.tempBarycentricOut.y +
                //     1 / v2.vec.z * this.tempBarycentricOut.z;
                // z = 1 / z;
                //
                // this.tempBarycentricOut.x = this.tempBarycentricOut.x / v0.vec.z * z;
                // this.tempBarycentricOut.y = this.tempBarycentricOut.y / v1.vec.z * z;
                // this.tempBarycentricOut.z = this.tempBarycentricOut.z / v2.vec.z * z;

                const z = this.tempBarycentricOut.x * v0.vec.z +
                    this.tempBarycentricOut.y * v1.vec.z +
                    this.tempBarycentricOut.z * v2.vec.z;

                const u = this.tempBarycentricOut.x * v0.u + this.tempBarycentricOut.y * v1.u + this.tempBarycentricOut.z * v2.u;
                const v = this.tempBarycentricOut.x * v0.v + this.tempBarycentricOut.y * v1.v + this.tempBarycentricOut.z * v2.v;

                texture.getColorByUV(u, v, this.tempColor);

                buffer.setColor(x, y, z, this.tempColor);

            }
        }
    }
}