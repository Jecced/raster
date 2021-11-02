// @ts-nocheck
import headObj from "../../res/african/african_head.obj";
import headImg from "../../res/african/african_head_diffuse.png";
import { Loader } from "../util/loader";
import { LoadObjUtil } from "../model/obj/load-obj-util";
import { ObjModel } from "../model/obj/load-obj-model";


export class Res {
    public static async loadHeadImg(): Promise<ImageData> {
        return await Loader.loadImg(headImg);
    }

    public static async loadHeadObj(): Promise<ObjModel> {
        return LoadObjUtil.loadObjModel(await Loader.loadText(headObj));
    }
}