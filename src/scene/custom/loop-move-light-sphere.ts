import { Scheduler } from "../scheduler/scheduler";
import { RenderingScheduler } from "../scheduler/rendering-scheduler";
import { SphereLight } from "../sphere-light";

export class LoopMoveSphereLight extends SphereLight implements Scheduler {

    private readonly moveX: number = 0;
    private readonly moveY: number = 0;
    private readonly moveZ: number = 0;

    private readonly speed: number = 0;

    /**
     * 各个轴的移动范围和移动速度
     * @param x
     * @param y
     * @param z
     * @param speed
     */
    constructor(x: number, y: number, z: number, speed: number) {
        super();
        RenderingScheduler.reg(this);

        this.moveX = x / 2;
        this.moveY = y / 2;
        this.moveZ = z / 2;
        this.speed = speed;
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

    update(dt?: number) {
        this.time += dt * this.speed;
        const sin = Math.sin(this.time);
        super.setPosition(
            this.oX + sin * this.moveX,
            this.oY + sin * this.moveY,
            this.oZ + sin * this.moveZ,
        )
    }
}