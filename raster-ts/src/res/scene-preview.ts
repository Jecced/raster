import { Scene } from "../scene/scene";
import { ModelManage } from "./model-manage";

export class ScenePreview {
    public static async scene01(): Promise<Scene> {
        const scene = new Scene();
        const node = await ModelManage.getNode0();
        scene.addChild(node);
        scene.getCamera()
            .setPosition(0, 10, 20)
            .lookAt(node.getPosition())
            .usePerspective()
            .setNera(-10)
            .setFar(-20);
        return scene;
    }

    public static async scene02(): Promise<Scene> {
        const scene = new Scene();
        const node = await ModelManage.getNode1();
        scene.addChild(node);
        scene.getCamera()
            .setPosition(0, 10, 20)
            .lookAt(node.getPosition())
            .usePerspective()
            .setNera(-10)
            .setFar(-20);
        return scene;
    }

    public static async scene03(): Promise<Scene> {
        const scene = new Scene();
        const node = await ModelManage.getNode2();
        scene.addChild(node);
        scene.getCamera()
            .setPosition(0, 10, 20)
            .lookAt(node.getPosition())
            .usePerspective()
            .setNera(-10)
            .setFar(-20);
        return scene;
    }
}