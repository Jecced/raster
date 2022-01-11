import { Scheduler } from "../scheduler/scheduler";
import { RenderingScheduler } from "../scheduler/rendering-scheduler";
import { SphereLight } from "../sphere-light";
import { Calc } from "../../base/math/calc";
import { Vec4 } from "../../base/math/vec4";

/**
 * 绕z轴旋转的点光源
 */
export class RotationZSphere extends SphereLight implements Scheduler {

    private readonly speed: number = 0;
    private readonly radius: number = 0;

    /**
     * @param speed
     * @param radius
     */
    constructor(speed: number, radius: number) {
        super();
        RenderingScheduler.reg(this);
        this.speed = speed;
        this.radius = radius;
    }

    private oX: number;
    private oY: number;
    private oZ: number;

    public setPosition(x: number, y: number, z: number): this {
        super.setPosition(x, y, z);
        this.oX = x;
        this.oY = y;
        this.oZ = z;
        return this;
    }

    private time = 0;

    private out: Vec4 = new Vec4();

    update(dt?: number) {
        this.time += dt * this.speed;
        Calc.vec2ByAngleDist(this.time, this.radius, this.out);

        super.setPosition(
            this.oX + this.out.x,
            this.oY + this.out.y,
            this.oZ,
        )
    }
}