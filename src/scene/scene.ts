import { Camera } from "./camera";
import { Node } from "./node";

export class Scene {
    private camera: Camera;
    private child: Array<Node> = [];

    constructor() {
    }

    public setCamera(camera: Camera): void {
        this.camera = camera;
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