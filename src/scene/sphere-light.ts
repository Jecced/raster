import { Vec4 } from "../base/math/vec4";
import { Base } from "./base";


/**
 * 点光源
 */
export class SphereLight implements Base{
    private position: Vec4;

    public color: Vec4;

    constructor() {
        this.position = new Vec4(0, 0, 0, 1);
        this.color = new Vec4(1, 1, 1, 1);
    }

    public setPosition(x: number, y: number, z: number):void{
        this.position.set(x, y, z, 1);
    }

    public setColor(color: Vec4):void{
        this.color.fromVec4(color);
    }

    public getColor():Vec4{
        return this.color;
    }

    public getPosition(): Vec4 {
        return this.position.clone();
    }

}