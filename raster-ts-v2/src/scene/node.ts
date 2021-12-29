import { Vec4 } from "../base/math/vec4";
import { Base } from "./base";
import { Mat4 } from "../base/math/mat4";
import { VertexShader } from "../engine/shader/vertex/vertex-shader";
import { FragmentShader } from "../engine/shader/fragment/fragment-shader";
import { VAO } from "../engine/data/vao";
import { VBO } from "../engine/data/vbo";
import { VertexUtil } from "../engine/data/vertex-util";

export class Node implements Base {
    private position: Vec4;

    private vbo: VBO;
    private ebo: number[];

    private vs: VertexShader;
    private fs: FragmentShader;

    constructor() {
        this.position = new Vec4(0, 0, 0, 1);
        this.setPosition(0, 0, 0);
    }

    public setVBO(vao: VAO, position: number, uv: number, color: number, normal: number, tangent: number): void {
        this.vbo = VertexUtil.VAO2VBO(vao, position, uv, color, normal, tangent);
        this.ebo = vao.indices;
    }

    public getVBO(): VBO {
        return this.vbo;
    }

    public getIndices(): number[] {
        return this.ebo;
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