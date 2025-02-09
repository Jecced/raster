import { Scene } from "../../scene/scene";
import { Camera } from "../../scene/camera";
import { Vec3 } from "../../base/math/vec3";
import { Node } from "../../scene/node";
import { Primitives } from "../../engine/geometry/primitives";
import { VertSimple } from "../../engine/shader/vertex/vert-simple";
import { FragVertexColor } from "../../engine/shader/fragment/frag-vertex-color";

export class Scene02 {
    /**
     * 渲染一个立方体
     * 通过顶点色进行差值
     * @param width
     * @param height
     */
    public static async creat(width: number, height: number): Promise<Scene> {
        const scene = new Scene();

        // 设置摄像机信息
        const camera = new Camera(width, height, -1, -100, 90);
        camera.usePerspective();
        camera.setPosition(1, 1, -2);
        camera.lookAt(new Vec3(0, 0, 0));
        scene.setCamera(camera);

        const cube = new Node();
        cube.setVBO(Primitives.cube(), 3, 0, 3, 0, 0);
        cube.setPosition(0, 0, 0);
        cube.vs = new VertSimple();
        cube.fs = new FragVertexColor();
        scene.addChild(cube);

        return scene;
    }
}