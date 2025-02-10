import { Mat4 } from "../base/math/mat4";
import { Base } from "./base";
import { Calc } from "../base/math/calc";
import { Vec3 } from "../base/math/vec3";
import { Vec4 } from "../base/math/vec4";

export class Camera implements Base {
    // 位置
    private position: Vec4;
    // 朝向
    private readonly direct: Vec3;
    // 上方向
    private readonly up: Vec3;
    // 是否使用透视
    private perspective: boolean = false;
    // fov可视角
    private fov: number = 45;

    // 摄像机分辨率
    private readonly width: number;
    private readonly height: number;

    // 近平面n的距离
    private near: number;
    // 远平面f的距离
    private far: number;

    /**
     * 将标准-1~1的矩阵变换到屏幕大小的矩阵
     * 将宽/高, 由-1 ~ 1变成-w/2 ~ w/2和 h/2 ~ -h/2
     * 注意, 这里h相当于做了一次翻转
     * @private
     */
    private matScreen: Mat4;

    /**
     * 将rl, tb, nf, 变换到-1 ~ 1的标准矩阵中
     * @private
     */
    private matOrthographic: Mat4;

    /**
     * 观察矩阵, 将摄像机摆放到0,0,0, 并且将世界看向-z方向
     * @private
     */
    private matView: Mat4;
    private matViewIT: Mat4;

    /**
     * 透视矩阵, 将世界根据近大远小进行变换
     * @private
     */
    private matProjection: Mat4;
    private matProjectionIT: Mat4;

    /**
     * @param width 屏幕宽度
     * @param height 屏幕高度
     * @param near
     * @param far
     * @param fov fov角度, 默认为45度
     */
    constructor(width: number, height: number, near: number, far: number, fov = 45) {
        this.position = new Vec4(0, 0, 0, 1);
        this.direct = new Vec3(0, 0, -1);
        this.up = new Vec3(0, 1, 0);
        this.width = width;
        this.height = height;
        this.near = near;
        this.far = far;
        this.fov = fov;

        // 计算变换到屏幕的矩阵
        this.calcMatScreen();
        // 计算
        this.calcMatOrthographic();
    }

    public setPosition(x: number, y: number, z: number): this {
        this.position.set(x, y, z, 1);
        this.calcMatView();
        this.calcMatProjection();
        return this;
    }

    public getPosition(): Vec4 {
        return this.position.clone();
    }

    public lookAt(at: Vec3): this {
        this.direct.fromVec3(this.position.xyz.sub(at));
        this.direct.normalize();
        this.calcMatView();
        this.calcMatProjection();
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

    private calcMatView(): void {
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
        // w.scale(-1);

        const u = Calc.crossVec3(this.up, w);
        u.normalize();
        if (u.isZero()) {
            u.set(0, 0, 1);
        }

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

        this.matView = Calc.mat4Mul(matMove, matAngle);


        // 逆矩阵
        const matAngleIT = Mat4.fromData(
            u.x, v.y, w.z, 0,
            u.x, v.y, w.z, 0,
            u.x, v.y, w.z, 0,
            0, 0, 0, 1,
        );

        const matMoveIT = Mat4.fromData(
            1, 0, 0, this.position.x,
            0, 1, 0, this.position.y,
            0, 0, 1, this.position.z,
            0, 0, 0, 1,
        );

        this.matViewIT = Calc.mat4Mul(matAngleIT, matMoveIT);
    }

    /**
     * 获取观察矩阵
     */
    public getViewMat(): Mat4 {
        return this.matView;
    }

    /**
     * 获取观察矩阵的逆矩阵
     */
    public getViewMatIT(): Mat4 {
        return this.matViewIT;
    }

    /**
     * 计算正交矩阵 / 正射投影视体
     * 将rl, tb, nf, 变换到-1 ~ 1的标准矩阵中
     * @private
     */
    private calcMatOrthographic(): void {
        /**
         * tan(fov/2) = t / n
         */
        const t = Math.tan(this.fov / 360 * 2 * Math.PI / 2) * Math.abs(this.near);
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
        this.matOrthographic = Mat4.fromData(
            2 / (r - l), 0, 0, -(r + l) / (r - l),
            0, 2 / (t - b), 0, -(t + b) / (t - b),
            0, 0, 2 / (n - f), -(n + f) / (n - f),
            0, 0, 0, 1,
        );
    }

    /**
     * 获取正交矩阵 / 正射投影视体
     */
    public getOrthographicMat(): Mat4 {
        return this.matOrthographic;
    }

    /**
     * 将标准-1~1的矩阵变换到屏幕大小的矩阵
     * 将宽/高, 由-1 ~ 1变成-w/2 ~ w/2和 h/2 ~ -h/2
     * 注意, 这里h相当于做了一次翻转
     */
    public calcMatScreen(): void {
        const w = this.width;
        const h = this.height;
        this.matScreen = Mat4.fromData(
            w / 2, 0, 0, w / 2,
            0, -h / 2, 0, h / 2,
            0, 0, 1, 0,
            0, 0, 0, 1,
        );
    }

    public getScreenMat(): Mat4 {
        return this.matScreen;
    }

    /**
     * 计算透视矩阵, 实现近大远小
     * @private
     */
    private calcMatProjection(): void {
        if (this.isOrthographic()) {
            this.matProjection = Mat4.identity();
            this.matProjectionIT = Mat4.identity();
            return;
        }
        const n = this.near;
        const f = this.far;
        this.matProjection = Mat4.fromData(
            n, 0, 0, 0,
            0, n, 0, 0,
            0, 0, n + f, -f * n,
            0, 0, 1, 0,
        );

        this.matProjectionIT = Mat4.fromData(
            f, 0, 0, 0,
            0, f, 0, 0,
            0, 0, 0, f * n,
            0, 0, -1, n + f,
        );
    }

    /**
     * 获取透视矩阵
     */
    public getProjectionMat(): Mat4 {
        return this.matProjection;
    }

    /**
     * 透视矩阵的逆矩阵
     */
    public getProjectionMatIT(): Mat4 {
        return this.matProjectionIT
    }


}

// const camera = new Camera(800, 600, -5, -10);
// camera.setPosition(0, 10, 0);
// camera.lookAt(new Vec4(0, 1, -2));
// console.log(camera.getViewMat().toString());
