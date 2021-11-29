import { Vec4 } from "../../engine/base/math/vec4";
import { Texture } from "../../engine/base/texture";
import { Vertices } from "../vertices";


export class ObjFace {
    public v: Array<number> = [];
    public t: Array<number> = [];
    public n: Array<number> = [];
    public key: string = "";
}


export class ObjModel {

    public mat: Map<string, Texture> = new Map<string, Texture>();

    public v: Array<Vec4> = [];
    public t: Array<Vec4> = [];
    public n: Array<Vec4> = [];
    public face: Array<ObjFace> = [];

    public setMatUV(key: string, imageData: ImageData): void {
        this.mat.set(key, new Texture(imageData));
    }

    public faceToVertices(index: number, vert0: Vertices, vert1: Vertices, vert2: Vertices): void {
        this.trans2Vertices(vert0, this.face[index], 0);
        this.trans2Vertices(vert1, this.face[index], 1);
        this.trans2Vertices(vert2, this.face[index], 2);
    }

    private trans2Vertices(vert: Vertices, face: ObjFace, index: 0 | 1 | 2): void {
        // 位置信息
        const vec4 = this.v[face.v[index] - 1];
        // uv信息
        const uv0 = this.t[face.t[index] - 1];

        // 法线
        const normal = this.n[face.t[index] - 1];

        if (normal) {
            if (vert.normal) {
                vert.normal.set(normal.x, normal.y, normal.z, normal.w);
            } else {
                vert.normal = normal.clone();
            }
        }

        vert.u = uv0.x;
        vert.v = uv0.y;

        if (!vert.vec) {
            vert.vec = new Vec4();
        }
        vert.vec.set(vec4.x, vec4.y, vec4.z, vec4.w);
    }

}
