import { Vec4 } from "../base/math/vec4";
import { Mat4 } from "../base/math/mat4";
import { Base } from "./base";
import { Calc } from "../base/math/calc";

enum FovAxis {
    X,
    Y
}

export class Camera implements Base {
    // 位置
    private position: Vec4;
    // 朝向
    private readonly direct: Vec4;
    // 上方向
    private readonly up: Vec4;
    // 是否使用透视
    private perspective: boolean = false;
    // fov可视角
    private fov: number = 45;
    // fov轴
    private fovAxis: FovAxis = FovAxis.X;

    // 摄像机分辨率
    private readonly width: number;
    private readonly height: number;

    // 近平面n的距离
    private near: number;
    // 远平面f的距离
    private far: number;

    /**
     * @param width 屏幕宽度
     * @param height 屏幕高度
     * @param near
     * @param far
     * @param fov fov角度, 默认为45度
     * @param axisX fov相对轴是否为X轴, 默认为true, TODO 目前只支持为true
     */
    constructor(width: number, height: number, near: number, far: number, fov = 45, axisX = true) {
        this.position = new Vec4(0, 0, 0, 1);
        this.direct = new Vec4(0, 0, -1);
        this.up = new Vec4(0, 1, 0);
        this.width = width;
        this.height = height;
        this.setNera(near);
        this.setFar(far);
        this.setFov(fov, axisX ? FovAxis.X : FovAxis.Y);
    }

    /**
     * 设置摄像机FOV信息
     * @param fov
     * @param fovAxis
     */
    public setFov(fov: number, fovAxis: FovAxis): void {
        this.fov = fov;
        this.fovAxis = fovAxis;
    }

    public setPosition(x: number, y: number, z: number): this {
        this.position.set(x, y, z, 1);
        return this;
    }

    public getPosition(): Vec4 {
        return this.position.clone();
    }

    public setNera(n: number): this {
        this.near = n;
        return this;
    }

    public setFar(f: number): this {
        this.far = f;
        return this;
    }

    public lookAt(at: Vec4): this {
        // this.direct.set(at.x, at.y, at.z, 0);
        this.direct.fromVec4(this.position.clone().sub(at));
        this.direct.normalize3();
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

    /**
     * 获取观察矩阵
     */
    public getViewMat(): Mat4 {
        /**
         * 凝视方向g: this.direct
         * 向上方向t: this.up
         * 眼睛位置e: this.position.xyz
         *
         * w = -normalize(g)
         * u = normalize(t x w)
         * v = w x u
         */
        const w = this.direct.clone();
        w.scale(-1);

        const u = Calc.crossVec3(this.up, w);
        u.normalize();

        const v = Calc.crossVec3(w, u);

        const matAngle = Mat4.fromData(
            u.x, u.y, u.z, 0,
            v.x, v.y, v.z, 0,
            w.x, w.y, w.z, 0,
            0, 0, 0, 1,
        );

        const matMove = Mat4.fromData(
            1, 0, 0, -this.position.x,
            0, 1, 0, -this.position.y,
            0, 0, 1, -this.position.z,
            0, 0, 0, 1,
        );

        return Calc.mat4Mul(matAngle, matMove);
    }

    /**
     * 获取观察矩阵的逆矩阵
     */
    public getViewMatIT(): Mat4 {
        const w = this.direct.clone();
        w.scale(-1);

        const u = Calc.crossVec3(this.up, w);
        u.normalize();

        const v = Calc.crossVec3(w, u);

        const matAngle = Mat4.fromData(
            u.x, u.y, u.z, 0,
            v.x, v.y, v.z, 0,
            w.x, w.y, w.z, 0,
            0, 0, 0, 1,
        );
        matAngle.transpose();

        const matMove = Mat4.fromData(
            1, 0, 0, this.position.x,
            0, 1, 0, this.position.y,
            0, 0, 1, this.position.z,
            0, 0, 0, 1,
        );

        return Calc.mat4Mul(matAngle, matMove);
    }

    /**
     * 获取正交矩阵 / 正射投影视体
     */
    public getOrthographicMat(): Mat4 {
        /**
         * tan(fov/2) = t / n
         */
        const t = Math.tan(this.fov / 2) * Math.abs(this.near);
        const b = -t;
        /**
         *  nx     r
         * ---- = ---
         *  ny     t
         */
        const r = (this.width / this.height) * t;
        const l = -r;

        const n = this.near;
        const f = this.far;

        /**
         * 正交矩阵, 将矩阵移动缩放到lrtbnf方块内
         */
        const matOrt = Mat4.fromData(
            2 / (r - l), 0, 0, -(r + l) / (r - l),
            0, 2 / (t - b), 0, -(t + b) / t - b,
            0, 0, 2 / (n - f), -(n + f) / n - f,
            0, 0, 0, 1,
        );

        const w = this.width;
        const h = this.height;
        /**
         * 屏幕矩阵, 将正交矩阵变换到屏幕上
         */
        const matScreen = Mat4.fromData(
            w / 2, 0, 0, (w - 1) / 2,
            0, h / 2, 0, (h - 1) / 2,
            0, 0, 1, 0,
            0, 0, 0, 1,
        );

        return Calc.mat4Mul(matScreen, matOrt);
    }

    /**
     * 获取透视矩阵
     */
    public getProjectionMat(): Mat4 {
        if (this.useOrthographic()) {
            return Mat4.identity();
        }
        const n = this.near;
        const f = this.far;
        return Mat4.fromData(
            n, 0, 0, 0,
            0, n, 0, 0,
            0, 0, n + f, -f * n,
            0, 0, 1, 0,
        );
    }

    /**
     * 透视矩阵的逆矩阵
     */
    public getProjectionMatIT(): Mat4 {
        if (this.useOrthographic()) {
            return Mat4.identity();
        }
        const n = this.near;
        const f = this.far;
        return Mat4.fromData(
            f, 0, 0, 0,
            0, f, 0, 0,
            0, 0, 0, f * n,
            0, 0, -1, n + f,
        );
    }


}

// const camera = new Camera(800, 600, -5, -10);
// camera.setPosition(0, 10, 0);
// camera.lookAt(new Vec4(0, 1, -2));
// console.log(camera.getViewMat().toString());
