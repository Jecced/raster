/**
 * 提供给shader的gl数据
 */
import { Mat4 } from "../../base/math/mat4";
import { Vec4 } from "../../base/math/vec4";

export class GlData {
    /**
     * 局部坐标系转世界坐标系
     */
    matWorld: Mat4;
    /**
     * 局部坐标转世界坐标的逆矩阵
     */
    matWorldIT: Mat4;
    /**
     * 观察者坐标
     */
    matView: Mat4;
    /**
     * 正交矩阵, 转换到屏幕空间
     */
    matOrthographic: Mat4;
    /**
     * 投影矩阵
     */
    matProjection: Mat4;
    /**
     * 摄像机世界坐标
     * xyz
     */
    cameraPos: Vec4;
    /**
     * 光源方向
     */
    mainLitDir: Vec4;
    /**
     * xy：屏幕尺寸
     * zw：屏幕尺寸倒数
     */
    screenSize: Vec4;
    /**
     * 当前时间(s)
     */
    time: number;
}