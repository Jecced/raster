import { Scene } from "../../scene/scene";
import { Camera } from "../../scene/camera";
import { Vec3 } from "../../base/math/vec3";
import { Node } from "../../scene/node";
import { Primitives } from "../../engine/geometry/primitives";
import { VertSimple } from "../../engine/shader/vertex/vert-simple";
import { Texture } from "../../base/texture";
import { Loader } from "../../util/loader";
import { ResourcePng } from "../../resources/resources";
import { Vec4 } from "../../base/math/vec4";
import { FragmentShader } from "../../engine/shader/fragment/fragment-shader";
import { GlData } from "../../engine/data/gl-data";
import { ShaderVariable } from "../../engine/data/shader-variable";
import { texture2D } from "../../engine/shader/glsl-grammar/glsl-texture";

class FragUVTexture implements FragmentShader {
    private u_speedU: number = 0;
    private u_speedV: number = 0;

    constructor(u_speedU: number, u_speedV: number) {
        this.u_speedU = u_speedU;
        this.u_speedV = u_speedV;
    }

    main(glData: GlData, input: ShaderVariable): Vec4 {
        const uv = input.uv;
        uv.x = uv.x + this.u_speedU * glData.time;
        uv.y = uv.y + this.u_speedV * glData.time;
        return texture2D(glData.texture0, uv);
    }
}

export class Scene09 {
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

        const sphere = new Node();
        sphere.setVBO(Primitives.sphere(3), 3, 2, 3, 3, 0);
        sphere.setPosition(0, 0, 0)
        sphere.setScaleFull(1);
        sphere.vs = new VertSimple();
        sphere.fs = new FragUVTexture(0.02, 0);
        sphere.texture0 = new Texture(await Loader.loadImg(ResourcePng.Moon))
        scene.addChild(sphere);

        return scene;
    }

}