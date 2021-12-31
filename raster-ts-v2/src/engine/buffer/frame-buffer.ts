import { Color } from "../../base/color";

/**
 * frame buffer
 */
export interface FrameBuffer {
    getFrameBuffer(): Float32Array;

    /**
     * 设置清除颜色
     * @param color
     */
    setClearColor(color: Color): void;

    /**
     * 将buffer所有颜色设置回背景色
     */
    clearBuffer(): void;

    /**
     * 转为1倍的buffer
     */
    coverToNormalBuffer(): Float32Array;
}