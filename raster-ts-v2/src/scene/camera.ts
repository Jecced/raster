import { Vec4 } from "../base/math/vec4";
import { Mat4 } from "../base/math/mat4";
import { Base } from "./base";
import { Calc } from "../base/math/calc";

export class Camera implements Base {
    // 位置
    private position: Vec4;
    // 朝向
    private direct: Vec4;
    // 上方向
    private up: Vec4;
    // 是否使用透视
    private perspective: boolean = false;
    // 矩阵, look at 计算出来的矩阵信息
    public tr: Mat4;

    // 近平面n的距离
    private nera: number;
    // 远平面f的距离
    private far: number;

    constructor() {
        this.position = new Vec4(0, 0, 0, 1);
        this.direct = new Vec4(0, 0, -1);
        this.up = new Vec4(0, 1, 0);
    }

    public setPosition(x: number, y: number, z: number): this {
        this.position.set(x, y, z, 1);
        return this;
    }

    public getPosition(): Vec4 {
        return this.position.clone();
    }

    public setNera(n: number): this {
        this.nera = n;
        return this;
    }

    public setFar(f: number): this {
        this.far = f;
        return this;
    }

    public lookAt(at: Vec4): this {

        this.direct.set(
            at.x - this.position.x,
            at.y - this.position.y,
            at.z - this.position.z,
            0,
        );
        this.direct.normalize();

        // dir 叉乘 up, 得到x轴向量
        const xAxis = Calc.crossVec3(
            this.direct,
            new Vec4(0, 1, 0),
        );
        xAxis.normalize();
        if (xAxis.isZero()) {
            xAxis.set(1, 0, 0, 0);
            console.log("look at x 轴是0向量, 强制改为:", xAxis.toString());
        }
        // x 轴叉乘dir, 得到新的向上的y轴向量
        Calc.crossVec3(xAxis, this.direct, this.up);

        const tView = new Mat4();
        tView.setFromNumber(
            1, 0, 0, -this.position.x,
            0, 1, 0, -this.position.y,
            0, 0, 1, -this.position.z,
            0, 0, 0, 1,
        );

        const rView = new Mat4();
        rView.setFromNumber(
            xAxis.x, this.up.x, -this.direct.x, 0,
            xAxis.y, this.up.y, -this.direct.y, 0,
            xAxis.z, this.up.z, -this.direct.z, 0,
            0, 0, 0, 1,
        );
        // 转置
        rView.transpose();

        this.tr = Calc.mat4Mul(tView, rView);
        return this;
    }

    /**
     * 使用透视模式
     */
    public usePerspective(): this {
        this.perspective = true;
        return this;
    }

    /**
     * 使用正交模式
     */
    public useOrthographic(): this {
        this.perspective = false;
        return this;
    }

    /**
     * 是否透视模式
     */
    public isPerspective(): boolean {
        return this.perspective;
    }

    /**
     * 是否正交模式
     */
    public isOrthographic(): boolean {
        return !this.perspective;
    }

    public getPerspectiveMat4(): Mat4 {
        const mat = new Mat4();
        mat.setFromNumber(
            this.nera, 0, 0, 0,
            0, this.nera, 0, 0,
            0, 0, this.nera + this.far, -this.nera * this.far,
            0, 0, 1, 0,
        );
        return mat;
    }
}