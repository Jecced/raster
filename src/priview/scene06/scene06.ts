import { Scene } from "../../scene/scene";
import { Camera } from "../../scene/camera";
import { Vec3 } from "../../base/math/vec3";
import { Node } from "../../scene/node";
import { Primitives } from "../../engine/geometry/primitives";
import { VertSimple } from "../../engine/shader/vertex/vert-simple";
import { Texture } from "../../base/texture";
import { Loader } from "../../util/loader";
import { ResourceObj, ResourcePng } from "../../resources/resources";
import { FragTexture } from "../../engine/shader/fragment/frag-texture";
import { ObjParser } from "../../util/obj-parser";
import { SphereLight } from "../../scene/sphere-light";
import { Vec4 } from "../../base/math/vec4";
import { FragLightLambert } from "../../engine/shader/fragment/frag-light-lambert";
import { VertRotationY } from "../../engine/shader/vertex/vert-rotation-y";
import { FragVertexColor } from "../../engine/shader/fragment/frag-vertex-color";
import { FragLightSphere } from "../../engine/shader/fragment/frag-light-sphere";

export class Scene06 {
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
        camera.setPosition(0, 1, 2);
        camera.lookAt(new Vec3(0, 0, 0));
        scene.setCamera(camera);

        // 设置点光源信息
        const sphereLight = new SphereLight();
        sphereLight.setPosition(1, 1, 0);
        sphereLight.setColor(new Vec4(1, 1, 1, 1));
        scene.setSphereLight(sphereLight);

        const light = new Node();
        light.setVBO(Primitives.sphere(2), 3, 0, 0, 3, 0);
        // 将位置设置成点光源位置
        light.setPosition(sphereLight.getPosition().x, sphereLight.getPosition().y, sphereLight.getPosition().z);
        light.setScaleFull(0.2);
        light.vs = new VertSimple();
        light.fs = new FragLightLambert();
        scene.addChild(light);


        const cube = new Node();
        cube.setVBO(Primitives.cube(), 3, 2, 3, 3, 0);
        cube.setPosition(0, 0, 0);
        cube.vs = new VertRotationY();
        cube.fs = new FragLightSphere(1, 2);
        cube.texture0 = new Texture(await Loader.loadImg(ResourcePng.Grid));
        scene.addChild(cube);

        const floor = new Node();
        floor.setVBO(Primitives.plane(), 3, 2, 3, 3, 0);
        floor.setPosition(0, -0.5, 0);
        floor.setScaleFull(3);
        floor.vs = new VertSimple();
        floor.fs = new FragLightSphere(1, 32);
        floor.texture0 = new Texture(await Loader.loadImg(ResourcePng.Grid));
        scene.addChild(floor);

        return scene;
    }
}