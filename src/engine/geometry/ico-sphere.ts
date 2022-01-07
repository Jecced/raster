import { VAO } from "../data/vao";

interface SphereStruct {
    cells: number[][];
    positions: number[][];
}

export class IcoSphere {

    public static calcUV(x: number, y: number, z: number, out?: number[]): number[] {
        if (!out) {
            out = [0, 0];
        }
        const theta = Math.acos(-y);
        const phi = Math.atan2(-z, x) + Math.PI;
        out[0] = phi / (2 * Math.PI);
        out[1] = theta / Math.PI;
        return out;
    }


    private static normalize(point: number[]): void {
        let len = point[0] * point[0] + point[1] * point[1] + point[2] * point[2];
        if (len > 0) {
            len = 1 / Math.sqrt(len);
        }
        point[0] *= len;
        point[1] *= len;
        point[2] *= len;
    }

    public static icoSphere(subdivisions: number): SphereStruct {
        subdivisions = +subdivisions | 0

        let positions = []
        const faces = []
        const t = 0.5 + Math.sqrt(5) / 2

        positions.push([-1, +t, 0])
        positions.push([+1, +t, 0])
        positions.push([-1, -t, 0])
        positions.push([+1, -t, 0])

        positions.push([0, -1, +t])
        positions.push([0, +1, +t])
        positions.push([0, -1, -t])
        positions.push([0, +1, -t])

        positions.push([+t, 0, -1])
        positions.push([+t, 0, +1])
        positions.push([-t, 0, -1])
        positions.push([-t, 0, +1])

        faces.push([0, 11, 5])
        faces.push([0, 5, 1])
        faces.push([0, 1, 7])
        faces.push([0, 7, 10])
        faces.push([0, 10, 11])

        faces.push([1, 5, 9])
        faces.push([5, 11, 4])
        faces.push([11, 10, 2])
        faces.push([10, 7, 6])
        faces.push([7, 1, 8])

        faces.push([3, 9, 4])
        faces.push([3, 4, 2])
        faces.push([3, 2, 6])
        faces.push([3, 6, 8])
        faces.push([3, 8, 9])

        faces.push([4, 9, 5])
        faces.push([2, 4, 11])
        faces.push([6, 2, 10])
        faces.push([8, 6, 7])
        faces.push([9, 8, 1])

        let complex = {
            cells: faces
            , positions: positions
        }

        while (subdivisions-- > 0) {
            complex = this.subdivide(complex)
        }

        positions = complex.positions
        for (let i = 0; i < positions.length; i++) {
            this.normalize(positions[i])
        }

        return complex
    }

// TODO: work out the second half of loop subdivision
// and extract this into its own module.
    public static subdivide(complex: SphereStruct): SphereStruct {
        const positions = complex.positions
        const cells = complex.cells

        const newCells = []
        const newPositions = []
        const midpoints: Map<string, number[]> = new Map<string, number[]>();
        const f = [0, 1, 2]
        let l = 0

        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i]
            const c0 = cell[0]
            const c1 = cell[1]
            const c2 = cell[2]
            const v0 = positions[c0]
            const v1 = positions[c1]
            const v2 = positions[c2]

            const a = this.getMidpoint(v0, v1, midpoints)
            const b = this.getMidpoint(v1, v2, midpoints)
            const c = this.getMidpoint(v2, v0, midpoints)

            let ai = newPositions.indexOf(a)
            if (ai === -1) ai = l++, newPositions.push(a)
            let bi = newPositions.indexOf(b)
            if (bi === -1) bi = l++, newPositions.push(b)
            let ci = newPositions.indexOf(c)
            if (ci === -1) ci = l++, newPositions.push(c)

            let v0i = newPositions.indexOf(v0)
            if (v0i === -1) v0i = l++, newPositions.push(v0)
            let v1i = newPositions.indexOf(v1)
            if (v1i === -1) v1i = l++, newPositions.push(v1)
            let v2i = newPositions.indexOf(v2)
            if (v2i === -1) v2i = l++, newPositions.push(v2)

            newCells.push([v0i, ai, ci])
            newCells.push([v1i, bi, ai])
            newCells.push([v2i, ci, bi])
            newCells.push([ai, bi, ci])
        }

        return {
            cells: newCells
            , positions: newPositions
        }

        // reuse midpoint vertices between iterations.
        // Otherwise, there'll be duplicate vertices in the final
        // mesh, resulting in sharp edges.


    }

    private static midpoint(a: number[], b: number[]): number[] {
        return [
            (a[0] + b[0]) / 2
            , (a[1] + b[1]) / 2
            , (a[2] + b[2]) / 2
        ]
    }

    private static getMidpoint(a: number[], b: number[], midpoints: Map<string, number[]>) {
        let point = this.midpoint(a, b);
        let pointKey = this.pointToKey(point);
        let cachedPoint = midpoints.get(pointKey);
        if (cachedPoint) {
            return cachedPoint;
        } else {
            // return midpoints[pointKey] = point
            midpoints.set(pointKey, point);
            return point;
        }
    }

    private static pointToKey(point: number[]): string {
        return point[0].toPrecision(6) + ','
            + point[1].toPrecision(6) + ','
            + point[2].toPrecision(6)
    }
}