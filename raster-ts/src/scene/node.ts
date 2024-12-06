import { Vec4 } from "../engine/base/math/vec4";
import { ObjModel } from "../model/obj/load-obj-model";
import { Base } from "./base";

export class Node implements Base {
    private positions: Vec4;
    private obj: ObjModel;

    constructor(obj: ObjModel) {
        this.positions = new Vec4(0, 0, 0, 1);
        this.obj = obj;
    }

    public setPosition(x: number, y: number, z: number) {
        this.positions.set(x, y, z, 1);
    }

    public getPosition(): Vec4 {
        return this.positions.clone();
    }

    public getModel(): ObjModel {
        return this.obj;
    }

}