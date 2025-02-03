// import "../css/index.css";
import { VAO } from "./engine/data/vao";
import { Scene } from "./scene/scene";
import { Camera } from "./scene/camera";
import { Node } from "./scene/node";
import { RenderingPipeline } from "./engine/pipeline/rendering-pipeline";
import { SimpleVertex } from "./engine/shader/vertex/simple-vertex";
import { RandFragment } from "./engine/shader/fragment/rand-fragment";
import { WebCanvas } from "./h5/web-canvas";
import { GlData } from "./engine/data/gl-data";
import { Vec4 } from "./base/math/vec4";
import { NormalRasterizer } from "./engine/rasterizer/normal-rasterizer";

function run() {

    const canvas = new WebCanvas("canvas");
    const width = canvas.width;
    const height = canvas.height;

    // 定义一个三角形
    let vao: VAO = {
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

    const scene = new Scene();
    const camera = new Camera(400, 300, -1, -10, 45);
    scene.setCamera(camera);
    const node = new Node();
    node.setVBO(vao, 3, 0, 3, 0, 0);

    camera.setPosition(0, 0, 1);
    node.setPosition(0, 0, -2);
    /**
     * 设置简易顶点着色器和随机颜色片元着色器
     */
    node.vs = new SimpleVertex();
    node.fs = new RandFragment();

    camera.lookAt(node.getPosition());

    /**
     * 创建渲染管线
     */
    const pipeline = new RenderingPipeline();
    // 初始化光栅器
    pipeline.rasterizer = new NormalRasterizer(width, height);

    // 切换渲染管线的顶点着色器和片断着色器为模型中设定的
    pipeline.vs = node.vs;
    pipeline.fs = node.fs;

    //glData
    const glData = new GlData();
    // 每个模型设置一次
    glData.matWorld = node.getMatWorld();
    glData.matWorldIT = node.getMatWorldIT();

    // 每次渲染设置一次
    glData.matView = camera.getViewMat();
    glData.matProjection = camera.getProjectionMat();
    glData.matOrthographic = camera.getOrthographicMat();
    glData.time = ~~(Date.now() / 1000);
    glData.cameraPos = camera.getPosition();

    // 只设置一次
    glData.screenSize = new Vec4(width, height, 1 / width, 1 / height);

    pipeline.run(node.getVBO(), node.getIndices(), glData);


}

run();