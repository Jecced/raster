import "../css/index.css";
import { Scene } from "./scene/scene";
import { Camera } from "./scene/camera";
import { Node } from "./scene/node";
import { RenderingPipeline } from "./engine/pipeline/rendering-pipeline";
import { WebCanvas } from "./h5/web-canvas";
import { GlData } from "./engine/data/gl-data";
import { Vec4 } from "./base/math/vec4";
import { Calc } from "./base/math/calc";
import { RenderingScheduler } from "./scene/scheduler/rendering-scheduler";
import { TimeEvent, TimeEventEnum } from "./event/time-event";
import { DomText } from "./event/dom-text";
import { FragTexture } from "./engine/shader/fragment/frag-texture";
import { Loader } from "./util/loader";
import { Texture } from "./base/texture";
import { VertRotationY } from "./engine/shader/vertex/vert-rotation-y";
import { VertSimple } from "./engine/shader/vertex/vert-simple";
import { FragVertexColor } from "./engine/shader/fragment/frag-vertex-color";
import { Primitives } from "./engine/geometry/primitives";
import { RasterizerNormal } from "./engine/rasterizer/rasterizer-normal";
import { CanvasRasterizerMapping } from "./h5/canvas-rasterizer-mapping";
import { RasterizerDepth } from "./engine/rasterizer/rasterizer-depth";
import { RasterizerTriangle } from "./engine/rasterizer/rasterizer-triangle";
import { ObjParser } from "./util/obj-parser";
import { ResourceObj, ResourcePng } from "./resources/resources";
import { FragLightLambert } from "./engine/shader/fragment/frag-light-lambert";
import { FragLightTest } from "./engine/shader/fragment/frag-light-test";
import { Vec3 } from "./base/math/vec3";


async function initScene(width: number, height: number): Promise<Scene> {
    const scene = new Scene();
    const camera = new Camera(width, height, -1, -100, 90);
    camera.usePerspective();
    camera.setPosition(0, 0, 2);
    scene.setCamera(camera);

    const cube = new Node();
    cube.setVBO(Primitives.cube2(), 3, 2, 0, 3, 0);
    cube.setPosition(0, 0, -1);
    cube.vs = new VertSimple();
    cube.fs = new FragLightTest();
    cube.texture0 = new Texture(await Loader.loadImg(ResourcePng.Grid));
    scene.addChild(cube);

    // const light = new Node();
    // light.setVBO(Primitives.cube(), 3, 0, 3, 0, 0);
    // light.setPosition(1.2, 1.0, -2);
    // light.setScaleFull(0.2);
    // light.vs = new VertSimple();
    // light.fs = new FragLightLambert();
    // scene.addChild(light);


    // const floor = new Node();
    // floor.setVBO(Primitives.plane(), 3, 2, 3, 0, 0);
    // floor.setPosition(0, -1, -1);
    // floor.setScaleFull(5);
    // floor.vs = new VertSimple();
    // floor.fs = new FragTexture();
    // floor.texture0 = new Texture(await Loader.loadImg(ResourcePng.Grid));
    // scene.addChild(floor);
    //
    // const african = new Node();
    // african.setVBO(ObjParser.coverToVAO(await Loader.loadText(ResourceObj.African)), 3, 2, 0, 3, 0);
    // african.setPosition(1.5, 0, -1);
    // african.vs = new VertRotationY();
    // african.fs = new FragTexture();
    // african.texture0 = new Texture(await Loader.loadImg(ResourcePng.AfricanDiffuse));
    // scene.addChild(african);
    //
    const diablo = new Node();
    diablo.setVBO(ObjParser.coverToVAO(await Loader.loadText(ResourceObj.Diablo)), 3, 2, 0, 3, 0);
    diablo.setPosition(2.5, 0, -1.5);
    diablo.setScaleFull(1.5);
    diablo.vs = new VertSimple();
    diablo.fs = new FragLightTest();
    diablo.texture0 = new Texture(await Loader.loadImg(ResourcePng.DiabloDiffuse));
    scene.addChild(diablo);

    camera.lookAt(new Vec4(0, 0, -3));

    return scene;
}

async function run() {

    /**
     * 创建渲染管线
     */
    const pipeline = new RenderingPipeline();

    // dom 调试文本初始化
    DomText.init();

    const canvas = new WebCanvas("canvas");
    const width = canvas.width;
    const height = canvas.height;

    // 普通光栅器
    const rasterizerNormal = new RasterizerNormal(width, height);
    CanvasRasterizerMapping.bind(canvas, rasterizerNormal);
    pipeline.rasterizer.push(rasterizerNormal);

    // 深度光栅器
    const depth = new WebCanvas("depth");
    const rasterizerDepth = new RasterizerDepth(width, height);
    CanvasRasterizerMapping.bind(depth, rasterizerDepth);
    pipeline.rasterizer.push(rasterizerDepth);

    // 三角形光栅器
    const triangle = new WebCanvas("triangle");
    const rasterizerTriangle = new RasterizerTriangle(width, height);
    CanvasRasterizerMapping.bind(triangle, rasterizerTriangle);
    pipeline.rasterizer.push(rasterizerTriangle);


    const scene = await initScene(width, height);
    const camera = scene.getCamera();


    //glData
    const glData = new GlData();
    // 只设置一次
    glData.screenSize = new Vec4(width, height, 1 / width, 1 / height);
    glData.matScreen = camera.getScreenMat();
    glData.mainLitDir = new Vec3(0, 1, 0).normalize();
    glData.mainLitColor = new Vec4(1, 1, 1, 1);

    const renderOnce = function() {
        // 记录开始渲染的时间
        const renderTime = Date.now();
        // 清空pipeline中的FrameBuffer和zBuffer信息
        pipeline.clear();
        // 执行所有调度器
        RenderingScheduler.go();
        // 渲染整个scene到pipeline中
        render(scene, glData, pipeline);
        // 获取更新后的frameBuffer绘制到canvas中
        CanvasRasterizerMapping.renderCanvas();
        TimeEvent.dispatch(TimeEventEnum.Rendering, Date.now() - renderTime);
        requestAnimationFrame(renderOnce);
    };

    requestAnimationFrame(renderOnce);


}

function render(scene: Scene, glData: GlData, pipeline: RenderingPipeline): void {
    const camera = scene.getCamera();
    // 每次渲染设置一次
    glData.matView = camera.getViewMat();
    glData.matProjection = camera.getProjectionMat();
    glData.matOrthographic = camera.getOrthographicMat();
    glData.time = RenderingScheduler.getTime();
    glData.cameraPos = camera.getPosition().xyz;
    for (let i = 0, len = scene.size(); i < len; i++) {
        const node = scene.getChild(i);
        // 每个模型设置一次
        glData.matWorld = node.getMatWorld();
        glData.matWorldIT = node.getMatWorldIT();
        // const matMVP = Calc.mat4Mul(glData.matView, glData.matWorld);
        // Calc.mat4Mul(glData.matProjection, matMVP, matMVP);
        const matMVP = Calc.mat4Mul(glData.matView, glData.matProjection);
        Calc.mat4Mul(glData.matWorld, matMVP, matMVP);
        glData.matMVP = matMVP;

        // 切换渲染管线的顶点着色器和片断着色器为模型中设定的
        pipeline.vs = node.vs;
        pipeline.fs = node.fs;
        glData.texture0 = node.texture0;
        glData.texture1 = node.texture1;
        glData.texture2 = node.texture2;
        glData.texture3 = node.texture3;
        glData.texture4 = node.texture4;
        glData.texture5 = node.texture5;
        glData.texture6 = node.texture6;
        glData.texture7 = node.texture7;
        glData.texture8 = node.texture8;
        glData.texture9 = node.texture9;

        /**
         * 运行pipeline 进行渲染一个模型
         * vbo
         * ebo
         * GlData
         */
        pipeline.run(node.getVBO(), node.getIndices(), glData);
    }

}

run();