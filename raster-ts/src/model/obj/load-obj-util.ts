import { Vec4 } from "../../engine/base/math/vec4";
import { ObjFace, ObjModel } from "./load-obj-model";

export class LoadObjUtil {
    private static toVec3f(line: string, key: string): Vec4 {
        line = line.substring(key.length);
        line = line.trim();
        const splits = line.split(" ");
        const x = parseFloat(splits[0]);
        const y = parseFloat(splits[1]);
        let z = 0;
        if (splits.length > 2) {
            z = parseFloat(splits[2]);
        }
        return new Vec4(x, y, z);
    }

    private static toVec4f(line: string, key: string): Vec4 {
        const vec4 = this.toVec3f(line, key);
        vec4.w = 1;
        return vec4;
    }

    private static toString(line: string, key: string): string {
        return line.substring(key.length);
    }

    private static toFace(line: string, key: string): ObjFace {
        line = line.substring(key.length + 1);
        const face = new ObjFace();
        let vers = line.split(" ");

        for (let i = 0; i < 3; i++) {
            const fsplit = vers[i].split("/");
            face.v.push(parseFloat(fsplit[0]));
            if (fsplit.length > 1) {
                face.t.push(parseFloat(fsplit[1]));
            }
            if (fsplit.length > 2) {
                face.n.push(parseFloat(fsplit[2]));
            }
        }
        return face;
    }


    /**
     * 将一段text文本解析成obj模型文件
     * @param text
     */
    public static loadObjModel(text: string): ObjModel {
        let matKey = "default";

        text = text.replace(/\r/g, "");

        const lines = text.split("\n");

        const obj = new ObjModel();

        let line = undefined;
        for (let i = 0, len = lines.length; i < len; i++) {
            line = lines[i];
            switch (true) {
                case line.startsWith("v "):
                    obj.v.push(LoadObjUtil.toVec4f(line, "v "));
                    break;
                case line.startsWith("vt "):
                    obj.t.push(LoadObjUtil.toVec3f(line, "vt"));
                    break;
                case line.startsWith("vn "):
                    obj.n.push(LoadObjUtil.toVec3f(line, "vn"));
                    break;
                case line.startsWith("f "):
                    obj.face.push(LoadObjUtil.toFace(line, "f"));
                    break;
                case line.startsWith("usemtl "):
                    matKey = line.substring(7);
                    break;
            }
        }
        return obj;
    }

}