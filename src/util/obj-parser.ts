import { VAO } from "../engine/data/vao";

export class ObjParser {
    public static coverToVAO(content: string): VAO {
        const split = content.split("\n");
        let line: string;
        const vertex: number[] = [];
        const normal: number[] = [];
        const uvs: number[] = [];
        const indices: number[] = [];

        const v: string[] = [];
        const vt: string[] = [];
        const vn: string[] = [];
        const f: string[] = [];


        for (let i = 0, len = split.length; i < len; i++) {
            line = split[i];
            line.trim();
            if (line.startsWith("v ")) {
                v.push(line.substring(2).trim());
                // const vertSplit = line.substring(2).trim().split(" ");
                // vertex.push(parseFloat(vertSplit[0]));
                // vertex.push(parseFloat(vertSplit[1]));
                // vertex.push(parseFloat(vertSplit[2]));
            } else if (line.startsWith("vt ")) {
                vt.push(line.substring(3).trim())
                // const uvsSplit = line.substring(3).trim().split(" ");
                // uvs.push(parseFloat(uvsSplit[0]));
                // uvs.push(parseFloat(uvsSplit[1]));
            } else if (line.startsWith("vn ")) {
                vn.push(line.substring(3).trim())
                // const normalSplit = line.substring(3).trim().split(" ");
            } else if (line.startsWith("f ")) {
                f.push(line.substring(2).trim());
                // const faceSplit = line.substring(2).trim().split(" ");
            }
        }

        const set: Set<string> = new Set<string>();

        let index = 0;

        for (let i = 0, len = f.length; i < len; i++) {
            const triangle = f[i].split(" ");
            if (this.applyVert(set, triangle[0], v, vn, vt, vertex, normal, uvs)) {
                indices.push(index);
                index++;
            }
            if (this.applyVert(set, triangle[1], v, vn, vt, vertex, normal, uvs)) {
                indices.push(index);
                index++;
            }
            if (this.applyVert(set, triangle[2], v, vn, vt, vertex, normal, uvs)) {
                indices.push(index);
                index++;
            }
        }

        return {
            position: vertex,
            color: [],
            uv: uvs,
            normal,
            tangent: [],
            indices,
        };
    }

    private static applyVert(
        set: Set<string>, triangle: string,
        v: string[], vn: string[], vt: string[],
        vertex: number[], normal: number[], uvs: number[],
    ): boolean {
        triangle = triangle.trim();
        if (set.has(triangle)) {
            return false;
        }
        const block = triangle.split("/");
        this.applyInfo(v[parseFloat(block[0].trim()) - 1], vertex, 3);
        this.applyInfo(vt[parseFloat(block[1].trim()) - 1], uvs, 2);
        this.applyInfo(vn[parseFloat(block[2].trim()) - 1], normal, 3);
        return true;
    }

    private static applyInfo(line: string, info: number[], size: number): void {
        const block = line.split(" ");
        for (let i = 0, len = size; i < len; i++) {
            info.push(parseFloat(block[i]))
        }
    }
}