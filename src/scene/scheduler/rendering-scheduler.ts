import { Scheduler } from "./scheduler";

/**
 * 渲染调度器
 */
export class RenderingScheduler {


    /**
     * 运行开始到现在的时间, 单位(s)
     * @private
     */
    private static time: number = 0;

    /**
     * 最后一次执行调度器的时间, 单位(s)
     * @private
     */
    private static lastSchedulerTime: number = 0;

    /**
     * 最后一次执行调度器的dt时间
     * @private
     */
    private static lastDaleyTime: number = 0;

    public static init() {
        this.lastSchedulerTime = Date.now() * 0.001;
    }

    /**
     * 所有需要进行调度的节点, 需要实现 scheduler接口
     * @private
     */
    private static node: Scheduler[] = [];

    /**
     * 注册一个调度器进来
     * @param scheduler
     */
    public static reg(scheduler: Scheduler): void {
        this.node.push(scheduler);
    }

    /**
     * 执行一次调度器
     * 可以交给requestAnimation进行调度
     */
    public static go(): void {
        const now = Date.now() * 0.001;
        const dt = now - this.lastSchedulerTime;
        const len = this.node.length;
        for (let i = 0; i < len; i++) {
            this.node[i].update(dt);
        }
        this.lastSchedulerTime = now;
        this.lastDaleyTime = dt;
        this.time += dt;
    }

    /**
     * 获取当前时间, 单位(s)
     */
    public static getTime(): number {
        return this.time;
    }

    /**
     * 获取最后一次的dt时间
     */
    public static getDT(): number {
        return this.lastDaleyTime;
    }


}