import "../css/index.css";
import { Raster } from "./engine/raster";
import { NormalZBuffer } from "./engine/zbuffer/normal-zbuffer";
import { Color } from "./engine/base/color";
import { Scene } from "./scene/scene";
import { ScenePreview } from "./res/scene-preview";
import { Calc } from "./engine/base/math/calc";

const raster = new Raster();

const buffer = new NormalZBuffer(raster.width, raster.height);

buffer.setClearColor(new Color(0, 0, 0));

let scene: Scene;

let i = 0;

function update() {

    console.time("render");

    i++;
    buffer.clear();

    const camera = scene.getCamera();
    const node = scene.getChild(0);
    const out = Calc.vec2ByAngleDist(i, 20);
    camera.setPosition(out.x, 10, out.y);
    camera.lookAt(node.getPosition());


    // raster.renderModel(model, buffer);
    raster.renderScene(scene, buffer);

    raster.render(buffer);

    requestAnimationFrame(update);

    console.timeEnd("render");
}


async function run() {

    scene = await ScenePreview.scene01();

    update();
}

run().then();