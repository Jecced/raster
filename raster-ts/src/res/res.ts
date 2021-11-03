// @ts-nocheck
import headObj from "../../res/african/african_head.obj";
import headImg from "../../res/african/african_head_diffuse.png";
import diabloObj from "../../res/diablo3/diablo3_pose.obj";
import diabloImg from "../../res/diablo3/diablo3_pose_diffuse.png";
import bulbasaurObj from "../../res/bulbasaur/Bulbasaur.obj";
import bulbasaurImg1 from "../../res/bulbasaur/FushigidaneDh.png";
import bulbasaurImg2 from "../../res/bulbasaur/FushigidaneEyeDh.png";


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

    public static async loadDiabloImg(): Promise<ImageData> {
        return await Loader.loadImg(diabloImg);
    }

    public static async loadDiabloObj(): Promise<ObjModel> {
        return LoadObjUtil.loadObjModel(await Loader.loadText(diabloObj));
    }


    public static async loadBulbasaurImg1(): Promise<ImageData> {
        return await Loader.loadImg(bulbasaurImg1);
    }

    public static async loadBulbasaurImg2(): Promise<ImageData> {
        return await Loader.loadImg(bulbasaurImg2);
    }

    public static async loadBulbasaurObj(): Promise<ObjModel> {
        return LoadObjUtil.loadObjModel(await Loader.loadText(bulbasaurObj));
    }
}