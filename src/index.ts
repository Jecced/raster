import "../css/index.css";
import { Scene } from "./scene/scene";
import { RenderingPipeline } from "./engine/pipeline/rendering-pipeline";
import { WebCanvas } from "./h5/web-canvas";
import { GlData } from "./engine/data/gl-data";
import { Vec4 } from "./base/math/vec4";
import { Calc } from "./base/math/calc";
import { RenderingScheduler } from "./scene/scheduler/rendering-scheduler";
import { TimeEvent, TimeEventEnum } from "./event/time-event";
import { DomText } from "./event/dom-text";
import { RasterizerNormal } from "./engine/rasterizer/rasterizer-normal";
import { CanvasRasterizerMapping } from "./h5/canvas-rasterizer-mapping";
import { Vec3 } from "./base/math/vec3";
import { Scene01 } from "./priview/scene01/scene01";
import { Scene02 } from "./priview/scene02/scene02";
import { Scene03 } from "./priview/scene03/scene03";
import { Scene04 } from "./priview/scene04/scene04";
import { Scene05 } from "./priview/scene05/sceen05";
import { Scene06 } from "./priview/scene06/scene06";
import { Scene07 } from "./priview/scene07/scene07";
import { Scene08 } from "./priview/scene08/scene08";
import { Scene09 } from "./priview/scene09/scene09";
import { RasterizerTriangle } from "./engine/rasterizer/rasterizer-triangle";
import { RasterizerDepth } from "./engine/rasterizer/rasterizer-depth";
import { Scene10 } from "./priview/scene10/scene10";
import { Mat4 } from "./base/math/mat4";


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


    const scene = await Scene10.creat(width, height);
    const camera = scene.getCamera();


    //glData
    const glData = new GlData();
    // 只设置一次
    glData.screenSize = new Vec4(width, height, 1 / width, 1 / height);
    glData.matScreen = camera.getScreenMat();
    glData.mainLitDir = new Vec3(0, 1, 0).normalize();
    glData.mainLitColor = new Vec4(1, 1, 1, 1);

    const renderOnce = function () {
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
    const sphereLight = scene.getSphereLight();
    // 每次渲染设置一次
    glData.matView = camera.getViewMat();
    glData.matProjection = camera.getProjectionMat();
    glData.matOrthographic = camera.getOrthographicMat();
    glData.time = RenderingScheduler.getTime();
    glData.cameraPos = camera.getPosition().xyz;
    if (sphereLight) {
        glData.sphereLitPos = sphereLight.getPosition().xyz;
        glData.sphereLitColor = sphereLight.getColor();
    }
    for (let i = 0, len = scene.size(); i < len; i++) {
        const node = scene.getChild(i);
        // 每个模型设置一次
        glData.matWorld = node.getMatWorld();
        glData.matWorldIT = node.getMatWorldIT();
        // const matMVP = Calc.mat4Mul(glData.matView, glData.matWorld);
        // Calc.mat4Mul(glData.matProjection, matMVP, matMVP);
        // const matMVP = Calc.mat4Mul(glData.matView, glData.matProjection);
        // Calc.mat4Mul(glData.matWorld, matMVP, matMVP);
        const matMVP = Mat4.identity();
        matMVP.mul(glData.matProjection, matMVP).mul(glData.matView, matMVP).mul(glData.matWorld, matMVP);
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