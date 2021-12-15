import { Camera } from "./camera";
import { Node } from "./node";

export class Scene {
    private camera: Camera;
    private child: Array<Node> = [];

    constructor() {
        this.camera = new Camera();
    }

    public addChild(node: Node): void {
        this.child.push(node);
    }

    public getChild(index: number): Node {
        return this.child[index];
    }

    public size(): number {
        return this.child.length;
    }

    public getCamera(): Camera {
        return this.camera;
    }
}