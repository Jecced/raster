import { Color } from "../base/color";

export interface ZBuffer {
    /**
     * 清空缓存
     */
    clear(): void;

    /**
     * 设置颜色
     * @param x
     * @param y
     * @param color
     * @param i 扩展字段, msaa用
     */
    setColor(x: number, y: number, color: Color, i?: number): void;

    /**
     * 获取颜色
     * @param x
     * @param y
     */
    getColor(x: number, y: number): Color;

    /**
     * 判断一个像素是否需要被填充
     * @param x
     * @param y
     */
    // isFull(x: number, y: number): boolean;

    /**
     * 深度测试
     * @param x
     * @param y
     * @param z
     * @param i 扩展字段, msaa用
     */
    zTest(x: number, y: number, z: number, i?: number): boolean;

    /**
     * 设置指定位置的z值
     * @param x
     * @param y
     * @param z
     * @param i
     */
    setZ(x: number, y: number, z: number, i?: number): void;
}

