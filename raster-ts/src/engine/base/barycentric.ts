/**
 * 重心坐标相关
 */
import { Vec4 } from "./math/vec4";

export class Barycentric {

    /**
     * 计算重心坐标
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param x3
     * @param y3
     * @param x
     * @param y
     */
    public static test(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x: number, y: number): Vec4 {
        // 计算三角形面积
        const s = this.cross(x2 - x1, y2 - y1, x3 - x1, y3 - y1) / 2;
        if (s === 0) {
            return new Vec4(-1, -1, -1);
        }

        const alpha = this.cross(x - x2, y - y2, x - x3, y - y3) / 2 / s;
        const beta = this.cross(x - x3, y - y3, x - x1, y - y1) / 2 / s;
        const gamma = 1 - alpha - beta;
        return new Vec4(alpha, beta, gamma);
    }

    /**
     * 叉乘
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @private
     */
    private static cross(x1: number, y1: number, x2: number, y2: number): number {
        return x1 * y2 - x2 * y1;
    }
}