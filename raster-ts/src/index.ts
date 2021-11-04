import "../css/index.css";
import { Color } from "./engine/base/color";
import { Scene } from "./scene/scene";
import { ScenePreview } from "./res/scene-preview";
import { Calc } from "./engine/base/math/calc";
import { MsaaZBuffer } from "./engine/zbuffer/msaa-zbuffer";
import { MsaaRaster } from "./engine/msaa-raster";
import { NormalZBuffer } from "./engine/zbuffer/normal-zbuffer";
import { Raster } from "./engine/raster";

const raster = new MsaaRaster();
const buffer = new MsaaZBuffer(raster.width, raster.height, 2);
// const raster = new Raster();
// const buffer = new NormalZBuffer(raster.width, raster.height);

buffer.setClearColor(Color.RED);

let scene: Scene;

let i = 90;

function update() {

    console.time("render");

    buffer.clear();

    const camera = scene.getCamera();
    const node = scene.getChild(0);
    const out = Calc.vec2ByAngleDist(i, 20);
    camera.setPosition(out.x, 10, out.y);
    camera.lookAt(node.getPosition());


    raster.renderScene(scene, buffer);

    raster.render(buffer);

    requestAnimationFrame(update);

    console.timeEnd("render");
    i++;
}


async function run() {

    scene = await ScenePreview.scene01();

    update();
}

run().then();