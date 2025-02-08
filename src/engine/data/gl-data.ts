/**
 * 提供给shader的gl数据
 */
import { Mat4 } from "../../base/math/mat4";
import { Vec4 } from "../../base/math/vec4";
import { Texture } from "../../base/texture";
import { Vec3 } from "../../base/math/vec3";

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
     * MVP矩阵
     */
    matMVP: Mat4;
    /**
     * mat 屏幕矩阵
     */
    matScreen: Mat4;
    /**
     * 摄像机世界坐标
     * xyz
     */
    cameraPos: Vec3;
    /**
     * 光源方向
     */
    mainLitDir: Vec3;
    /**
     * 光源颜色
     */
    mainLitColor: Vec4;
    /**
     * 点光源位置
     */
    sphereLitPos: Vec3;
    /**
     * 点光源颜色
     */
    sphereLitColor: Vec4;
    /**
     * xy：屏幕尺寸
     * zw：屏幕尺寸倒数
     */
    screenSize: Vec4;
    /**
     * 当前时间(s)
     */
    time: number;

    /**
     * 纹理
     */
    texture0: Texture;
    texture1: Texture;
    texture2: Texture;
    texture3: Texture;
    texture4: Texture;
    texture5: Texture;
    texture6: Texture;
    texture7: Texture;
    texture8: Texture;
    texture9: Texture;
}