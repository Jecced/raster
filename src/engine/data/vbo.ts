/**
 * 顶点缓冲对象
 * Vertex Buffer Object
 */
import { VAO } from "./vao";

export class VBO {
    private data: number[] = undefined;

    private position = 3;
    private uv = 2;
    private color = 3;
    private normal = 4;
    private tangent = 4;

    /**
     * 顶点大小
     * @private
     */
    private size = 14;

    /**
     * 顶点数量
     * @private
     */
    private vertexCount = 0;

    public setSize(position = 3, uv = 2, color = 3, normal = 4, tangent = 4): void {
        this.position = position;
        this.uv = uv;
        this.color = color;
        this.normal = normal;
        this.tangent = tangent;

        this.size = position + uv + color + normal + tangent;
    }

    public setData(data: number[]): void {
        this.data = data;
    }

    public getData(): number[] {
        return this.data;
    }

    public setVertexCount(vertexCount: number): void {
        this.vertexCount = vertexCount;
    }

    public getVertexCount(): number {
        return this.vertexCount;
    }

    public clear(): void {
        this.data = undefined;
    }

    /**
     * 获取某一个顶点的数据
     */
    public getVertex(index: number, vao?: VAO): VAO {
        if (!vao) {
            vao = this.creatEmptyVAO();
        }
        let offset = 0;
        offset = this.getSplitData(index, this.data, vao.position, this.position, offset);
        offset = this.getSplitData(index, this.data, vao.uv, this.uv, offset);
        offset = this.getSplitData(index, this.data, vao.color, this.color, offset);
        offset = this.getSplitData(index, this.data, vao.normal, this.normal, offset);
        offset = this.getSplitData(index, this.data, vao.tangent, this.tangent, offset);
        return vao;
    }

    private getSplitData(index: number, input: number[], out: number[], size: number, offset: number) {
        const start = this.size * index + offset;
        for (let i = 0, len = size; i < len; i++) {
            out[i] = input[start + i];
        }
        return offset + size;
    }

    public creatEmptyVAO(): VAO {
        return {
            position: new Array(this.position),
            uv: new Array(this.uv),
            color: new Array(this.color),
            normal: new Array(this.normal),
            tangent: new Array(this.tangent),
        };
    }

    public toString(): string {
        if (!this.data) {
            return "no data";
        }
        let str = "";
        for (let i = 0; i < this.data.length; i++) {
            let data = `${this.data[i]}`;
            str += data + "\t";
            if ((i + 1) % this.size === 0) {
                str += "\n";
            }
        }
        return str;
    }
}