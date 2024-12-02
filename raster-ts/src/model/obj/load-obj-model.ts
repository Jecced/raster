import { Vec4 } from "../../engine/base/math/vec4";


export class ObjFace {
    public v: Array<number> = [];
    public t: Array<number> = [];
    public n: Array<number> = [];
    public key: string = "";
}


export class ObjModel {

    public mat:Map<string, any> = new Map<string, any>();

    public v: Array<Vec4> = [];
    public t: Array<Vec4> = [];
    public n: Array<Vec4> = [];
    public face: Array<ObjFace> = [];
}
