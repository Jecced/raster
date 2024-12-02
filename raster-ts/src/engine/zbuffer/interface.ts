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
     * @param z
     * @param color
     */
    setColor(x: number, y: number, z: number, color: Color): void;

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
    isFull(x:number, y:number):boolean;

}

