import { Vec4 } from "../../base/math/vec4";

/**
 * 顶点着色器传给片段着色器的变量
 */
export class ShaderVariable {
    private alpha: number;
    private beta: number;
    private gamma: number;

    public setBarycentric(alpha: number, beta: number, gamma: number): void {
        this.alpha = alpha;
        this.beta = beta;
        this.gamma = gamma;
    }

    /**
     * 坐标
     */
    private _position: Vec4;
    public set position(val: Vec4) {
        this._position = val;
    }

    public get position(): Vec4 {
        return this._position;
    }

    /**
     * 法线
     */
    private _normal: Vec4;
    public set normal(val: Vec4) {
        this._normal = val;
    }

    public get normal(): Vec4 {
        return this._normal;
    }

    /**
     * uv信息
     */
    private _uv: Vec4;
    public set uv(val: Vec4) {
        this._uv = val;
    }

    public get uv(): Vec4 {
        return this._uv;
    }

    /**
     * 颜色
     */
    private _color: Vec4;
    public set color(val: Vec4) {
        this._color = val;
    }

    public get color(): Vec4 {
        return this._color;
    }

}