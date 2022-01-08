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
import { VertRotationY } from "../../engine/shader/vertex/vert-rotation-y";
import { FragTexture } from "../../engine/shader/fragment/frag-texture";

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

        const moo1 = new Node();
        moo1.setVBO(Primitives.sphere(3), 3, 2, 3, 3, 0);
        moo1.setPosition(1, 0, 0)
        moo1.setScaleFull(1);
        moo1.vs = new VertRotationY();
        moo1.fs = new FragTexture();
        moo1.texture0 = new Texture(await Loader.loadImg(ResourcePng.Moon))
        scene.addChild(moo1);


        const moon2 = new Node();
        moon2.setVBO(Primitives.sphere(3), 3, 2, 3, 3, 0);
        moon2.setPosition(-1, 0, 0)
        moon2.setScaleFull(1);
        moon2.vs = new VertSimple();
        moon2.fs = new FragUVTexture(1 / 2 / Math.PI, 0);
        moon2.texture0 = new Texture(await Loader.loadImg(ResourcePng.Moon))
        scene.addChild(moon2);

        return scene;
    }

}