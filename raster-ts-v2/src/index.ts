import "../css/index.css";
import { VAO } from "./engine/data/vao";
import { Scene } from "./scene/scene";
import { Camera } from "./scene/camera";
import { Node } from "./scene/node";
import { RenderingPipeline } from "./engine/pipeline/rendering-pipeline";
import { WebCanvas } from "./h5/web-canvas";
import { GlData } from "./engine/data/gl-data";
import { Vec4 } from "./base/math/vec4";
import { NormalRasterizer } from "./engine/rasterizer/normal-rasterizer";
import { Calc } from "./base/math/calc";
import { VertexColorFragment } from "./engine/shader/fragment/vertex-color-fragment";
import { RenderingScheduler } from "./scene/scheduler/rendering-scheduler";
import { RotationVertex } from "./engine/shader/vertex/rotation-vertex";
import { TimeEvent, TimeEventEnum } from "./event/time-event";
import { DomText } from "./event/dom-text";


// 三角形的VAO
function getTriangleVAO(): VAO {
    return {
        position: [
            -0.5, -0.5, 0.0,
            0.5, -0.5, 0.0,
            0.0, 0.5, 0.0],
        color: [
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0],
        uv: [],
        tangent: [],
        normal: [],
        indices: [0, 1, 2],
    };
}

// 正方体的VAO
function getCubeVAO(): VAO {
    return {
        position: [
            // front
            -0.5, -0.5, 0.5,
            -0.5, 0.5, 0.5,
            0.5, 0.5, 0.5,
            0.5, -0.5, 0.5,
            // back
            -0.5, -0.5, -0.5,
            -0.5, 0.5, -0.5,
            0.5, 0.5, -0.5,
            0.5, -0.5, -0.5,
        ],
        color: [
            0.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            1.0, 1.0, 0.0,
            1.0, 0.0, 0.0,
            0.0, 0.0, 1.0,
            0.0, 1.0, 1.0,
            1.0, 1.0, 1.0,
            1.0, 0.0, 1.0,
        ],
        uv: [],
        tangent: [],
        normal: [],
        indices: [
            0, 1, 2, 2, 3, 0, // front
            4, 5, 6, 6, 7, 4, // back
            3, 2, 6, 6, 7, 3, // right
            0, 1, 5, 5, 4, 0, // left
            1, 5, 6, 6, 2, 1, // top
            0, 4, 7, 7, 3, 0, // bottom
        ],
    };
}

// 正方形面
function getQuadVAO(): VAO {
    return {
        position: [
            // front
            -0.5, -0.5, 0.,
            -0.5, 0.5, 0.,
            0.5, 0.5, 0.,
            0.5, -0.5, 0.,
        ],
        color: [
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0,
            1.0, 1.0, 0.0,
        ],
        uv: [],
        tangent: [],
        normal: [],
        indices: [
            0, 1, 2, 2, 3, 0,
        ],
    };
}


function run() {

    // dom 调试文本初始化
    new DomText();

    const canvas = new WebCanvas("canvas");
    const width = canvas.width;
    const height = canvas.height;

    const scene = new Scene();
    const camera = new Camera(width, height, -2, -50, 90);
    camera.usePerspective();
    scene.setCamera(camera);
    const node = new Node();
    node.setVBO(getCubeVAO(), 3, 0, 3, 0, 0);
    scene.addChild(node);

    camera.setPosition(2, 1, 1);
    node.setPosition(0, 0, -2);
    /**
     * 设置简易顶点着色器和随机颜色片元着色器
     */
    node.vs = new RotationVertex();
    node.fs = new VertexColorFragment();

    camera.lookAt(node.getPosition());

    /**
     * 创建渲染管线
     */
    const pipeline = new RenderingPipeline();
    // 初始化光栅器
    pipeline.rasterizer = new NormalRasterizer(width, height);

    //glData
    const glData = new GlData();
    // 只设置一次
    glData.screenSize = new Vec4(width, height, 1 / width, 1 / height);
    glData.matScreen = camera.getScreenMat();

    const renderOnce = function() {
        const renderTime = Date.now();
        pipeline.clear();
        RenderingScheduler.go();
        render(scene, glData, pipeline);
        const frameBuffer = pipeline.getFrameBuffer();
        canvas.render(frameBuffer);
        const renderTimeDelay = Date.now() - renderTime;
        TimeEvent.dispatch(TimeEventEnum.Rendering, renderTimeDelay);
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
    glData.cameraPos = camera.getPosition();
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