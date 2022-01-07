import { Scene } from "../../scene/scene";
import { Camera } from "../../scene/camera";
import { Vec3 } from "../../base/math/vec3";
import { Node } from "../../scene/node";
import { Primitives } from "../../engine/geometry/primitives";
import { FragVertexColor } from "../../engine/shader/fragment/frag-vertex-color";
import { VertRotationY } from "../../engine/shader/vertex/vert-rotation-y";
import { VertSimple } from "../../engine/shader/vertex/vert-simple";
import { Texture } from "../../base/texture";
import { Loader } from "../../util/loader";
import { ResourcePng } from "../../resources/resources";
import { FragTexture } from "../../engine/shader/fragment/frag-texture";

export class Scene04 {
    /**
     * 渲染一个纹理地面, 一个立方体
     * @param width
     * @param height
     */
    public static async creat(width: number, height: number): Promise<Scene> {
        const scene = new Scene();

        // 设置摄像机信息
        const camera = new Camera(width, height, -1, -100, 90);
        camera.usePerspective();
        camera.setPosition(0, 1, -2);
        camera.lookAt(new Vec3(0, 0, 0));
        scene.setCamera(camera);

        const cube = new Node();
        cube.setVBO(Primitives.cube(), 3, 0, 3, 0, 0);
        cube.setPosition(0, 0, 0);
        cube.vs = new VertRotationY();
        cube.fs = new FragVertexColor();
        scene.addChild(cube);


        const floor = new Node();
        floor.setVBO(Primitives.plane(), 3, 2, 3, 3, 0);
        floor.setPosition(0, -0.5, 0);
        floor.setScaleFull(3);
        floor.vs = new VertSimple();
        floor.fs = new FragTexture();
        floor.texture0 = new Texture(await Loader.loadImg(ResourcePng.Grid));
        scene.addChild(floor);

        return scene;
    }
}