import { Res } from "./res";
import { Node } from "../scene/node";

export class ModelManage {

    // 非洲人
    public static async getNode0(): Promise<Node> {

        const model = await Res.loadHeadObj();

        model.setMatUV("default", await Res.loadHeadImg());

        return new Node(model);
    }

    // 大菠萝
    public static async getNode1(): Promise<Node> {

        const model = await Res.loadDiabloObj();

        model.setMatUV("default", await Res.loadDiabloImg());

        return new Node(model);
    }


    // 妙蛙种子
    public static async getNode2(): Promise<Node> {

        const model = await Res.loadBulbasaurObj();

        model.setMatUV("mat1", await Res.loadBulbasaurImg1());
        model.setMatUV("mat2", await Res.loadBulbasaurImg2());

        // 缩放一下
        for (let i = 0; i < model.v.length; i++) {
            model.v[i].scale(0.2)
        }

        return new Node(model);
    }
}