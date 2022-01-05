import { Vec4 } from "../../base/math/vec4";

/**
 * frame buffer
 */
export interface FrameBuffer {
    /**
     * 给buffer设置一个位置颜色
     */
    setColor(x: number, y: number, rgba: Vec4, extra?: any): void;

    /**
     * 设置清除颜色
     * @param color
     */
    setClearColor(color: Vec4): void;

    /**
     * 将buffer所有颜色设置回背景色
     */
    clearBuffer(): void;

    /**
     * 转为1倍的buffer
     */
    getFrameBuffer(): Float32Array;
}