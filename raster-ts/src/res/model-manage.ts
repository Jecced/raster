import { ObjModel } from "../model/obj/load-obj-model";
import { Res } from "./res";

export class ModelManage {

    public static async getHeadModel(): Promise<ObjModel> {

        const model = await Res.loadHeadObj();

        model.setMatUV("default", await Res.loadHeadImg());

        return model;
    }
}