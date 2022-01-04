export interface ZBuffer {

    /**
     * 测试一个位置的深度信息
     * @param x
     * @param y
     * @param z
     * @param extra
     */
    zTest(x: number, y: number, z: number, extra?: any): boolean;

    /**
     * 给一个位置设置深度
     * @param x
     * @param y
     * @param z
     * @param extra
     */
    setZ(x: number, y: number, z: number, extra?: any): void;

    /**
     * 清空所有深度
     */
    clear(): void;

    /**
     * 获取ZBuffer信息
     */
    getZBuffer(): Float32Array;
}