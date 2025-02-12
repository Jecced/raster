import { Scheduler } from "../scheduler/scheduler";
import { RenderingScheduler } from "../scheduler/rendering-scheduler";
import { Camera } from "../camera";
import { vec3 } from "../../engine/shader/glsl-grammar/glsl-vec";

export class LoopMoveCamera extends Camera implements Scheduler {

    private readonly moveX: number = 0;
    private readonly moveY: number = 0;
    private readonly moveZ: number = 0;

    private readonly speed: number = 0;

    /**
     * 各个轴的移动范围和移动速度
     * @param width
     * @param height
     * @param near
     * @param far
     * @param fov
     * @param x
     * @param y
     * @param z
     * @param speed
     */
    constructor(width: number, height: number, near: number, far: number, fov = 45, x: number, y: number, z: number, speed: number) {
        super(width, height, near, far, fov);
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
        super.lookAt(vec3(0))
    }
}