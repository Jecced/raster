import { Texture } from "./texture";
import { ResourcePng } from "../resources/resources";
import { Loader } from "../util/loader";
import { Vec4 } from "./math/vec4";
import { Vec2 } from "./math/vec2";

export interface TextureCubeParam {
    front?: ResourcePng;
    back?: ResourcePng;
    left?: ResourcePng;
    right?: ResourcePng;
    top?: ResourcePng;
    bottom?: ResourcePng;
}

export class TextureCube {
    private readonly top: Texture = undefined;
    private readonly bottom: Texture = undefined;
    private readonly left: Texture = undefined;
    private readonly right: Texture = undefined;
    private readonly front: Texture = undefined;
    private readonly back: Texture = undefined;

    /**
     * 将六面定义进数组, 并且拥有顺序
     * 0 前
     * 1 上
     * 2 左
     * 3 后
     * 4 下
     * 5 右
     * @private
     */
    private cube: Texture[] = [];

    private constructor() {
        this.top = new Texture();
        this.bottom = new Texture()
        this.left = new Texture();
        this.right = new Texture();
        this.front = new Texture();
        this.back = new Texture();
        this.cube.push(
            this.front,
            this.top,
            this.right,
            this.back,
            this.bottom,
            this.left,
        )
    }

    public getColorByVec(x: number, y: number, z: number, out?: Vec4): Vec4 {
        const dir = [x, y, z];
        // 确定碰撞到哪一面
        const index = this.getFace(dir);
        const texture = this.cube[index];
        const uv = this.getUV(index, dir);
        return texture.getColorByUV(uv.x, uv.y, out);
    }

    /**
     * 根据向量确定碰撞到了哪一面
     * @param dir
     */
    private getFace(dir: number[]): number {
        let max = 0;
        for (let i = 1; i < 3; i++) {
            if (Math.abs(dir[i]) > Math.abs(dir[max])) max = i;
        }
        return max + (dir[max] < 0 ? 3 : 0);
    }

    private getUV(index: number, dir: number[]): Vec2 {
        let u = 0;
        let v = 0;
        let factor;
        switch (index) {
            case 0: //前
                factor = 1 / dir[0];
                u = 1 + dir[2] * factor;
                v = 1 + dir[1] * factor;
                break;
            case 1://上
                factor = 1 / dir[1];
                u = 1 + dir[2] * factor;
                v = 1 + dir[0] * factor;
                v = 2 - v;
                break;
            case 2://右
                factor = 1 / dir[2];
                u = 1 + dir[0] * factor;
                u = 2 - u;
                v = 1 + dir[1] * factor;
                break;
            case 3: //后
                factor = 1 / dir[0];
                u = 1 + dir[2] * factor;
                v = 1 + dir[1] * factor;
                v = 2 - v;
                break;
            case 4: //底
                factor = 1 / dir[1];
                u = 1 + dir[2] * factor;
                u = 2 - u;
                v = 1 + dir[0] * factor;
                v = 2 - v;
                break;
            case 5: //左
                factor = 1 / dir[2];
                u = 1 + dir[0] * factor;
                u = 2 - u;
                v = 1 + dir[1] * factor;
                v = 2 - v;
                break;
        }
        return new Vec2(u / 2, v / 2);
    }

    public static async loadCubeMap(param: TextureCubeParam): Promise<TextureCube> {
        const cube = new TextureCube();
        if (!param) {
            return cube;
        }
        if (param.top) {
            cube.top.setImageData(await Loader.loadImg(param.top));
        }
        if (param.bottom) {
            cube.bottom.setImageData(await Loader.loadImg(param.bottom));
        }
        if (param.left) {
            cube.left.setImageData(await Loader.loadImg(param.left));
        }
        if (param.right) {
            cube.right.setImageData(await Loader.loadImg(param.right));
        }
        if (param.front) {
            cube.front.setImageData(await Loader.loadImg(param.front));
        }
        if (param.back) {
            cube.back.setImageData(await Loader.loadImg(param.back));
        }
        return cube;
    }
}