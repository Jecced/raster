import { Scene } from "../../scene/scene";
import { Camera } from "../../scene/camera";
import { Vec3 } from "../../base/math/vec3";
import { Primitives } from "../../engine/geometry/primitives";
import { VertSimple } from "../../engine/shader/vertex/vert-simple";
import { ResourcePng } from "../../resources/resources";
import { Vec4 } from "../../base/math/vec4";
import { FragmentShader } from "../../engine/shader/fragment/fragment-shader";
import { GlData } from "../../engine/data/gl-data";
import { ShaderVariable } from "../../engine/data/shader-variable";
import { texture2D, textureCube } from "../../engine/shader/glsl-grammar/glsl-texture";
import { dot, mat4, max, normalize, pow, reflect, vec3, vec4 } from "../../engine/shader/glsl-grammar/glsl";
import { LoopMoveSphereLight } from "../../scene/custom/loop-move-light-sphere";
import { FragLightLambert } from "../../engine/shader/fragment/frag-light-lambert";
import { LoopMoveNode } from "../../scene/custom/loop-move-node";
import { TextureCube } from "../../base/texture-cube";
import { Node } from "../../scene/node";
import { VertexShader } from "../../engine/shader/vertex/vertex-shader";
import { VAO } from "../../engine/data/vao";
import { LoopMoveCamera } from "../../scene/custom/loop-move-camera";

class SkyboxVertex implements VertexShader {
    main(glData: GlData, input: VAO, v: ShaderVariable): Vec4 {
        v.position = vec3(input.position);

        // const view = glData.matView;
        // const view2 = mat4(
        //     view.get(0), view.get(1), view.get(2), 0,
        //     view.get(4), view.get(5), view.get(6), 0,
        //     view.get(8), view.get(9), view.get(10), 0,
        //     0, 0, 0, 1,
        // )
        //
        // let position = glData.matProjection.mul(
        //     view2
        // ).mul(
        //     vec4(v.position, 1)
        // )

        return glData.matMVP.mul(vec4(v.position, 1));
        // return position;
    }

}

class SkyboxFragment implements FragmentShader {
    private skybox: TextureCube = undefined;

    constructor(cube: TextureCube) {
        this.skybox = cube;
    }

    main(glData: GlData, input: ShaderVariable): Vec4 {
        return textureCube(this.skybox, input.position);
        // return vec4(1.0);
    }

}

class EnvFragment implements FragmentShader {
    private env: TextureCube = undefined;

    constructor(cube: TextureCube) {
        this.env = cube;
    }

    main(glData: GlData, input: ShaderVariable): Vec4 {
        const I = normalize(input.position.sub(glData.cameraPos));
        const R = reflect(I, normalize(input.normal));

        return textureCube(this.env, R);
    }
}

export class Scene12 {
    /**
     * 渲染一个天空盒
     * @param width
     * @param height
     */
    public static async creat(width: number, height: number): Promise<Scene> {
        const scene = new Scene();

        // 设置摄像机信息
        const camera = new Camera(width, height, -0.11, -1111, 45);
        camera.usePerspective();
        camera.setPosition(0.1, 0.1, 0.1);
        // camera.lookAt(new Vec3(-1, -1, 1));
        camera.lookAt(new Vec3(0, 0, -1));
        scene.setCamera(camera);

        // 设置点光源信息
        // const sphereLight = new LoopMoveSphereLight(0, 2, 0, 1);
        // // const sphereLight = new LoopMoveSphereLight(5, 2, 0, 1);
        // sphereLight.setPosition(0, 3, 0);
        // sphereLight.setColor(new Vec4(1, 1, 1, 1));
        // scene.setSphereLight(sphereLight);


        const cubeMap = await TextureCube.loadCubeMap({
            top: ResourcePng.Skybox1Top,
            bottom: ResourcePng.Skybox1Bottom,
            left: ResourcePng.Skybox1Left,
            right: ResourcePng.Skybox1Right,
            front: ResourcePng.Skybox1Front,
            back: ResourcePng.Skybox1Back,
        })

        const skybox = new Node();
        skybox.setVBO(Primitives.sphere(2), 3, 0, 0, 0, 0);
        skybox.setPosition(0, 0, 0);
        skybox.vs = new SkyboxVertex();
        skybox.fs = new SkyboxFragment(cubeMap);
        scene.addChild(skybox);

        const sphere = new Node();
        sphere.setVBO(Primitives.sphere(3), 3, 0, 0, 3, 0);
        sphere.setPosition(0, 0, -0.4);
        sphere.setScaleFull(0.1)
        sphere.vs = new VertSimple();
        sphere.fs = new EnvFragment(cubeMap);
        scene.addChild(sphere);

        // const cube = new Node();
        // cube.setVBO(Primitives.cube(), 3, 0, 0, 3, 0);
        // cube.setPosition(0.2, 0, -0.4);
        // cube.setScaleFull(0.1)
        // cube.vs = new VertSimple();
        // cube.fs = new EnvFragment(cubeMap);
        // scene.addChild(cube);


        // cube.setPosition(0, 0, -5)
        // cube.setScaleFull(7);
        // // cube.setScale(3, 3, 3);
        // cube.vs = new VertRotationY();
        // // cube.fs = new FragTexture();
        // // cube.fs = new FragLightSphere(1, 8);
        // cube.fs = new NormalTextureShader(22, 128);//法线贴图的光照
        // cube.texture0 = new Texture(await Loader.loadImg(ResourcePng.Container2Diffuse));
        // // 镜面光照贴图
        // cube.texture1 = new Texture(await Loader.loadImg(ResourcePng.Container2Specular));
        // scene.addChild(cube);


        // const light = new Node();
        // const light = new LoopMoveNode(0, 2, 0, 1);
        // light.setVBO(Primitives.sphere(2), 3, 0, 0, 3, 0);
        // // 将位置设置成点光源位置
        // light.setPosition(sphereLight.getPosition().x, sphereLight.getPosition().y, sphereLight.getPosition().z);
        // light.setScaleFull(0.2);
        // light.vs = new VertSimple();
        // light.fs = new FragLightLambert();
        // scene.addChild(light);

        return scene;
    }

}