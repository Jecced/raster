import { Camera } from "./camera";
import { Node } from "./node";
import { SphereLight } from "./sphere-light";

export class Scene {
    private camera: Camera;
    private sphereLight: SphereLight;
    private child: Array<Node> = [];

    public addChild(node: Node): void {
        this.child.push(node);
    }

    public getChild(index: number): Node {
        return this.child[index];
    }

    public size(): number {
        return this.child.length;
    }

    public setCamera(camera: Camera): void {
        this.camera = camera;
    }

    public getCamera(): Camera {
        return this.camera;
    }

    public setSphereLight(sphereLight: SphereLight):void{
        this.sphereLight = sphereLight;
    }

    public getSphereLight():SphereLight{
        return this.sphereLight;
    }
}