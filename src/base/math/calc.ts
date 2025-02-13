import { Vec4 } from "./vec4";

export class Calc {

    /**
     * 叉乘
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @private
     */
    public static cross(x1: number, y1: number, x2: number, y2: number): number {
        return x1 * y2 - x2 * y1;
    }

    public static vec2ByAngleDist(angle: number, distance: number, out?: Vec4): Vec4 {
        if (!out) {
            out = new Vec4();
        }
        angle = Math.PI / 180 * angle;
        out.x = distance * Math.cos(angle);
        out.y = distance * Math.sin(angle);
        return out;
    }

    /**
     * 计算三个点的包围盒
     * @param width
     * @param height
     * @param p0
     * @param p1
     * @param p2
     * @param out
     * @private
     */
    public static bound(width: number, height: number, p0: Vec4, p1: Vec4, p2: Vec4, out?: Vec4): Vec4 {
        out.x = Math.min(p0.x, p1.x, p2.x);
        if (out.x < 0) {
            out.x = 0;
        }

        out.y = Math.min(p0.y, p1.y, p2.y);
        if (out.y < 0) {
            out.y = 0;
        }

        out.z = Math.max(p0.x, p1.x, p2.x);
        if (out.z > width) {
            out.z = width;
        }

        out.w = Math.max(p0.y, p1.y, p2.y);
        if (out.w > height) {
            out.w = height;
        }
        out.x = Math.round(out.x);
        out.y = Math.round(out.y);
        out.z = Math.round(out.z);
        out.w = Math.round(out.w);
        return out;
    }

}