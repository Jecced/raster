import { Vec4 } from "../engine/base/math/vec4";
import { ObjModel } from "../model/obj/load-obj-model";
import { Base } from "./base";
import { Mat4 } from "../engine/base/math/mat4";

export class Node implements Base {
    private positions: Vec4;
    private obj: ObjModel;

    private mat: Mat4;

    constructor(obj: ObjModel) {
        this.positions = new Vec4(0, 0, 0, 1);
        this.obj = obj;
        this.setPosition(0, 0, 0);
    }

    public setPosition(x: number, y: number, z: number) {
        this.positions.set(x, y, z, 1);
        if (!this.mat) {
            this.mat = new Mat4();
        }
        this.mat.setFromNumber(
            1, 0, 0, x,
            0, 1, 0, y,
            0, 0, 1, z,
            0, 0, 0, 1,
        );
    }

    public getPosition(): Vec4 {
        return this.positions.clone();
    }

    public getPositionMat4(): Mat4 {
        return this.mat;
    }

    public getModel(): ObjModel {
        return this.obj;
    }

}