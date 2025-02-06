import { Vec4 } from "../base/math/vec4";
import { Base } from "./base";
import { Mat4 } from "../base/math/mat4";
import { VertexShader } from "../engine/shader/vertex/vertex-shader";
import { FragmentShader } from "../engine/shader/fragment/fragment-shader";
import { VAO } from "../engine/data/vao";
import { VBO } from "../engine/data/vbo";
import { VertexUtil } from "../util/vertex-util";
import { Texture } from "../base/texture";

export class Node implements Base {
    private position: Vec4;
    private scale: Vec4;

    private vbo: VBO;
    private ebo: number[];

    public vs: VertexShader;
    public fs: FragmentShader;

    public texture0: Texture;
    public texture1: Texture;
    public texture2: Texture;
    public texture3: Texture;
    public texture4: Texture;
    public texture5: Texture;
    public texture6: Texture;
    public texture7: Texture;
    public texture8: Texture;
    public texture9: Texture;

    constructor() {
        this.position = new Vec4(0, 0, 0, 1);
        this.scale = new Vec4(1, 1, 1, 0);
        this.setPosition(0, 0, 0);
    }

    public setVBO(vao: VAO, position: number, uv: number, color: number, normal: number, tangent: number): void {
        this.vbo = VertexUtil.VAO2VBO(vao, position, uv, color, normal, tangent);
        this.ebo = vao.indices;
    }

    /**
     * 获取vbo信息
     */
    public getVBO(): VBO {
        return this.vbo;
    }

    /**
     * 获取三角形面索引
     */
    public getIndices(): number[] {
        return this.ebo;
    }

    /**
     * 获取有多少顶点
     */
    public getVertexCount(): number {
        return this.vbo.getVertexCount();
    }

    /**
     * 获取一共有多少三角形
     */
    public getTriangleCount(): number {
        return ~~(this.ebo.length / 3);
    }

    /**
     * 获取一个三角形的索引
     * @param index
     * @param out
     */
    public getTriangle(index: number, out?: number[]): number[] {
        if (!out) {
            out = [0, 0, 0];
        }

        const start = index * 3;
        out[0] = this.ebo[start];
        out[1] = this.ebo[start + 1];
        out[2] = this.ebo[start + 2];
        return out;
    }

    public setPosition(x: number, y: number, z: number): void {
        this.position.set(x, y, z, 1);
    }

    public setScale(x: number, y: number, z: number): void {
        this.scale.set(x, y, z, 0);
    }

    public setScaleFull(scale: number): void {
        this.setScale(scale, scale, scale);
    }

    public getPosition(): Vec4 {
        return this.position.clone();
    }

    public getMatWorld(): Mat4 {
        return Mat4.fromData(
            this.scale.x, 0, 0, this.position.x,
            0, this.scale.y, 0, this.position.y,
            0, 0, this.scale.z, this.position.z,
            0, 0, 0, 1,
        );
    }

    public getMatWorldIT(): Mat4 {
        return Mat4.fromData(
            1 / this.scale.x, 0, 0, -this.position.x,
            0, 1 / this.scale.y, 0, -this.position.y,
            0, 0, 1 / this.scale.z, -this.position.z,
            0, 0, 0, 1,
        );
    }


}