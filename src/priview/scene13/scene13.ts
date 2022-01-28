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
import { dot, max, normalize, refract, vec2, vec3, vec4 } from "../../engine/shader/glsl-grammar/glsl";
import { Node } from "../../scene/node";
import { Texture } from "../../base/texture";
import { Loader } from "../../util/loader";
import { SphereLight } from "../../scene/sphere-light";
import { FragLightLambert } from "../../engine/shader/fragment/frag-light-lambert";

class EarthFragment implements FragmentShader {

    constructor() {
    }

    main(glData: GlData, input: ShaderVariable): Vec4 {

        let uv1 = input.uv.clone();
        let uv2 = input.uv.clone();

        uv1 = uv1.add(vec2(1, 0).mul(glData.time * 0.03));
        uv2 = uv2.add(vec2(1, 0).mul(glData.time * 0.07));


        let lightDir = glData.sphereLitPos.sub(input.position);
        let viewDir = glData.cameraPos.sub(input.position);

        let diffuseScale = max(0.0, dot(input.normal, lightDir));
        let albedo = texture2D(glData.texture0, uv1).xyz;


        let ambient = glData.sphereLitColor.xyz.mul(albedo);
        albedo = albedo.mul(ambient).mul(diffuseScale);


        const colorNight = texture2D(glData.texture2, uv1).xyz.mul(1 - diffuseScale);

        const colorCloud = texture2D(glData.texture1, uv2).xyz.mul(diffuseScale);

        return vec4(albedo.add(colorNight).add(colorCloud), 1.0);
    }

}


export class Scene13 {
    /**
     * 渲染一个地球
     * @param width
     * @param height
     */
    public static async creat(width: number, height: number): Promise<Scene> {
        const scene = new Scene();

        // 设置摄像机信息
        const camera = new Camera(width, height, -1, -20, 45);
        camera.usePerspective();
        camera.setPosition(0, 0, 0);
        // camera.lookAt(new Vec3(-1, -1, 1));
        camera.lookAt(new Vec3(0, 0, -1));
        scene.setCamera(camera);


        // 设置点光源信息
        const sphereLight = new SphereLight();
        sphereLight.setPosition(-1, 0.5, -2);
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


        const sphere = new Node();
        sphere.setVBO(Primitives.sphere(3), 3, 2, 0, 3, 0);
        sphere.setPosition(0, 0, -3.4);
        sphere.setScaleFull(1)
        sphere.vs = new VertSimple();
        sphere.fs = new EarthFragment();
        sphere.texture0 = new Texture(await Loader.loadImg(ResourcePng.EarthMap));
        sphere.texture1 = new Texture(await Loader.loadImg(ResourcePng.EarthClouds));
        sphere.texture2 = new Texture(await Loader.loadImg(ResourcePng.EarthNightMap));
        scene.addChild(sphere);


        return scene;
    }

}