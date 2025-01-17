import { VAO } from "./vao";
import { VBO } from "./vbo";

export class VertexUtil {

    /**
     * 将VAO离散数据合并成单一完整的VBO数据
     * @param vao
     * @param position
     * @param uv
     * @param color
     * @param normal
     * @param tangent
     * @constructor
     */
    public static VAO2VBO(vao: VAO, position = 3, uv = 2, color = 3, normal = 4, tangent = 4): VBO {
        const vbo = new VBO();
        vbo.setSize(position, uv, color, normal, tangent);

        const size = position + uv + color + normal + tangent;

        // pLen 为所有坐标xyz的集合
        const pLen = vao.position.length;
        // pCount 将所有集合 / 坐标长度, 结果为顶点数量
        const pCount = pLen / position;

        vbo.setVertexCount(pCount);


        const data: number[] = new Array(pCount * size);

        let offset = 0;
        // position
        offset = this.dataMerge(data, vao.position, size, position, pCount, offset);
        offset = this.dataMerge(data, vao.uv, size, uv, pCount, offset);
        offset = this.dataMerge(data, vao.color, size, color, pCount, offset);
        offset = this.dataMerge(data, vao.normal, size, normal, pCount, offset);
        offset = this.dataMerge(data, vao.tangent, size, tangent, pCount, offset);

        vbo.setData(data);

        return vbo;
    }

    /**
     *
     * @param out 最终输出数组
     * @param input voa输入的各个数组
     * @param lineSize voa 每个顶点数据的长度
     * @param variableSize 这一次处理的数据长度
     * @param vertexCount 总共有多少顶点要处理
     * @param offset 这一次处理的数据的偏移量
     * @private
     */
    private static dataMerge(out: number[], input: number[], lineSize: number, variableSize: number, vertexCount: number, offset: number): number {
        for (let i = 0; i < vertexCount; i++)
            for (let j = 0; j < variableSize; j++)
                out[i * lineSize + j + offset] = input[i * variableSize + j];

        return offset + variableSize;
    }
}


// 测试代码 GetVBOFromVAO
// const vao: VAO = {
//     position: [1, 2, 3, 4, 5, 6, 7, 8, 9],
//     uv: [11, 12, 13, 14, 15, 16],
//     color: [21, 22, 23, 24, 25, 26, 27, 28, 29],
//     normal: [31, 32, 33, 34, 35, 36, 37, 38, 39],
//     tangent: [41, 42, 43, 44, 45, 46, 47, 48, 49],
// };
//
// const vbo = VertexUtil.VAO2VBO(vao, 3, 2, 3, 3, 3);
// console.log(vbo.toString());
// console.log("=======");
// console.log(vbo.getVertex(0));
// console.log(vbo.getVertex(1));
// console.log(vbo.getVertex(2));
