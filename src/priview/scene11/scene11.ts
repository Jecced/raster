import { Scene } from "../../scene/scene";
import { Camera } from "../../scene/camera";
import { Vec3 } from "../../base/math/vec3";
import { Node } from "../../scene/node";
import { Primitives } from "../../engine/geometry/primitives";
import { VertSimple } from "../../engine/shader/vertex/vert-simple";
import { Texture } from "../../base/texture";
import { Loader } from "../../util/loader";
import { ResourceObj, ResourcePng } from "../../resources/resources";
import { Vec4 } from "../../base/math/vec4";
import { FragmentShader } from "../../engine/shader/fragment/fragment-shader";
import { GlData } from "../../engine/data/gl-data";
import { ShaderVariable } from "../../engine/data/shader-variable";
import { texture2D } from "../../engine/shader/glsl-grammar/glsl-texture";
import { dot, max, normalize, pow, reflect, vec4 } from "../../engine/shader/glsl-grammar/glsl";
import { LoopMoveSphereLight } from "../../scene/custom/loop-move-light-sphere";
import { FragLightSphere } from "../../engine/shader/fragment/frag-light-sphere";
import { FragLightLambert } from "../../engine/shader/fragment/frag-light-lambert";
import { LoopMoveNode } from "../../scene/custom/loop-move-node";
import { ObjParser } from "../../util/obj-parser";
import { VertRotationY } from "../../engine/shader/vertex/vert-rotation-y";
import { FragTexture } from "../../engine/shader/fragment/frag-texture";
import { SphereLight } from "../../scene/sphere-light";

class NormalTextureShader implements FragmentShader {

    /**
     * 镜面高光系数
     */
    private readonly u_specularStrength: number = 1.5;

    /**
     * 镜面高光指数
     */
    private readonly u_specularPow: number = 32;

    public constructor(strength: number, pow: number) {
        this.u_specularPow = pow;
        this.u_specularStrength = strength;
    }

    main(glData: GlData, v: ShaderVariable): Vec4 {


        /**
         * 环境光照阶段
         */
        const ambientStrength = 1.1;// 环境光强度
        // const ambient = glData.sphereLitColor.xyz.mul(ambientStrength);
        const ambient = texture2D(glData.texture0, v.uv).mul(ambientStrength).xyz;

        /**
         //  * 漫反射阶段
         //  */
            // const normal: Vec3 = v.normal;
            // 从贴图中获取0-1的法线
            // 法线改为从贴图中获取
            // let normal = texture2D(glData.texture1, v.uv).xyz;
            // 将法线转为-1到1
            // normal = normal.mul(2).sub(1);
            // normal.y = -normal.y;
            // normal = glData.matWorldIT.mul(vec4(normal, 0)).xyz;//mul(glData.matWorldIT, vec4(normal, 0)).xyz;
            // normal = normalize(normal);
        let normal = v.normal;

        const lightDir: Vec3 = normalize(glData.sphereLitPos.sub(v.position));
        // const lightDir: Vec3 = glData.mainLitDir;

        let diff = max(dot(normal, lightDir), 0.0);
        const diffuse = texture2D(glData.texture0, v.uv).mul(diff).xyz;//glData.sphereLitColor.xyz.mul(diff);

        /**
         * 镜面高光
         */
        const specularStrength = this.u_specularStrength;
        const viewDir: Vec3 = normalize(glData.cameraPos.sub(v.position));
        const reflectDir = reflect(lightDir.reverse(), normal);
        const spec = pow(max(dot(viewDir, reflectDir), 0.0), this.u_specularPow);
        // 应用镜面光照贴图
        const specular: Vec3 = glData.sphereLitColor.xyz.mul(texture2D(glData.texture1, v.uv).xyz).mul(spec * specularStrength);
        // const specular: Vec3 = glData.sphereLitColor.xyz.mul(specularStrength * spec);


        let baseColor: Vec4;
        if (glData.texture0) {
            baseColor = texture2D(glData.texture0, v.uv);
        } else {
            baseColor = v.color;
        }

        /**
         * 环境光 + 漫反射
         */
        const result = baseColor.xyz.mul(ambient.add(diffuse).add(specular));

        return vec4(result, 1);
    }

}

export class Scene11 {
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
        camera.setPosition(0, 5, 5);
        camera.lookAt(new Vec3(0, 0, 0));
        scene.setCamera(camera);

        // 设置点光源信息
        const sphereLight = new LoopMoveSphereLight(0, 2, 0, 1);
        // const sphereLight = new LoopMoveSphereLight(5, 2, 0, 1);
        sphereLight.setPosition(0, 3, 0);
        sphereLight.setColor(new Vec4(1, 1, 1, 1));
        scene.setSphereLight(sphereLight);

        // const light = new Node();
        const light = new LoopMoveNode(0, 2, 0, 1);
        light.setVBO(Primitives.sphere(2), 3, 0, 0, 3, 0);
        // 将位置设置成点光源位置
        light.setPosition(sphereLight.getPosition().x, sphereLight.getPosition().y, sphereLight.getPosition().z);
        light.setScaleFull(0.2);
        light.vs = new VertSimple();
        light.fs = new FragLightLambert();
        scene.addChild(light);

        const cube = new Node();
        cube.setVBO(Primitives.cube(), 3, 2, 3, 3, 0);
        cube.setPosition(0, 0, -5)
        cube.setScaleFull(7);
        // cube.setScale(3, 3, 3);
        cube.vs = new VertRotationY();
        // cube.fs = new FragTexture();
        // cube.fs = new FragLightSphere(1, 8);
        cube.fs = new NormalTextureShader(22, 128);//法线贴图的光照
        cube.texture0 = new Texture(await Loader.loadImg(ResourcePng.Container2Diffuse));
        // 镜面光照贴图
        cube.texture1 = new Texture(await Loader.loadImg(ResourcePng.Container2Specular));
        scene.addChild(cube);


        return scene;
    }

}