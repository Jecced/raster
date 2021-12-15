import { Vec4 } from "../base/math/vec4";
import { Base } from "./base";
import { Mat4 } from "../base/math/mat4";
import { VertexShader } from "../engine/shader/vertex/vertex-shader";
import { FragmentShader } from "../engine/shader/fragment/fragment-shader";

export class Node implements Base {
    private position: Vec4;

    private vs: VertexShader;
    private fs: FragmentShader;

    constructor() {
        this.position = new Vec4(0, 0, 0, 1);
        this.setPosition(0, 0, 0);
    }

    public setPosition(x: number, y: number, z: number) {
        this.position.set(x, y, z, 1);
    }

    public getPosition(): Vec4 {
        return this.position.clone();
    }

    public getMatWorld(): Mat4 {
        return Mat4.fromData(
            1, 0, 0, this.position.x,
            0, 1, 0, this.position.y,
            0, 0, 1, this.position.z,
            0, 0, 0, 1,
        );
    }


}