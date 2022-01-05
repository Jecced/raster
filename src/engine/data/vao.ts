/**
 * 顶点数组对象
 * Vertex Array Object
 */
export interface VAO {
    // 局部坐标信息
    position: number[];
    // 纹理坐标信息
    uv: number[];
    // 颜色信息
    color: number[];
    // 法线信息
    normal: number[];
    // 切线信息
    tangent: number[];
    // 三角形索引信息 EBO信息
    indices?: number[];
}