import { VAO } from "../engine/data/vao";

export class ObjParser {
    public static coverToVAO(content: string): VAO {
        const split = content.split("\n");
        let line: string;
        const vertex: number[] = [];
        const normal: number[] = [];
        const uvs: number[] = [];
        const indices: number[] = [];
        const uvLines: string[] = [];

        for (let i = 0, len = split.length; i < len; i++) {
            line = split[i];
            line.trim();
            if (line.startsWith("v ")) {
                const vertSplit = line.substring(2).trim().split(" ");
                vertex.push(parseFloat(vertSplit[0]));
                vertex.push(parseFloat(vertSplit[1]));
                vertex.push(parseFloat(vertSplit[2]));
            } else if (line.startsWith("vt ")) {
                // const uvsSplit = line.substring(3).trim().split(" ");
                // uvs.push(parseFloat(uvsSplit[0]));
                // uvs.push(parseFloat(uvsSplit[1]));
                uvLines.push(line.substring(3).trim());
            } else if (line.startsWith("vn ")) {
                const normalSplit = line.substring(3).trim().split(" ");
                normal.push(parseFloat(normalSplit[0]));
                normal.push(parseFloat(normalSplit[1]));
                normal.push(parseFloat(normalSplit[2]));
            } else if (line.startsWith("f ")) {
                const faceSplit = line.substring(2).trim().split(" ");
                indices.push(parseFloat(faceSplit[0].split("/")[0]) - 1);
                indices.push(parseFloat(faceSplit[1].split("/")[0]) - 1);
                indices.push(parseFloat(faceSplit[2].split("/")[0]) - 1);

                this.putUvs(faceSplit[0], uvLines, uvs);
                this.putUvs(faceSplit[1], uvLines, uvs);
                this.putUvs(faceSplit[2], uvLines, uvs);
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

    private static putUvs(f: string, uvLines: string[], uvs: number[]): void {
        const vertIndex = parseFloat(f.split("/")[0]) - 1;
        const uvIndex = parseFloat(f.split("/")[1]) - 1;
        const split = uvLines[uvIndex].split(" ");
        uvs[vertIndex * 2] = parseFloat(split[0]);
        uvs[vertIndex * 2 + 1] = parseFloat(split[1]);
    }
}