import { Texture } from "../../base/texture";
import { Color } from "../../base/color";

export class LoadObjMat {
    mapKd: string;
    diffuse: Texture;
    width: number;
    height: number;

    public at(u: number, v: number): Color {
        return this.diffuse.getColorByUV(u, v);
    }
}

