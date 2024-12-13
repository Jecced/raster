import "../css/index.css";
import { Color } from "./engine/base/color";
import { Scene } from "./scene/scene";
import { ScenePreview } from "./res/scene-preview";
import { Calc } from "./engine/base/math/calc";
import { MsaaZBuffer } from "./engine/zbuffer/msaa-zbuffer";
import { MsaaRaster } from "./engine/msaa-raster";
import { NormalZBuffer } from "./engine/zbuffer/normal-zbuffer";
import { NormalRaster } from "./engine/normal-raster";


class RasterCtl {
    raster: MsaaRaster | NormalRaster;
    buffer: MsaaZBuffer | NormalZBuffer;

    private normalRaster: NormalRaster = undefined;
    private normalZBuffer: NormalZBuffer = undefined;

    private msaaRaster: MsaaRaster = undefined;
    private msaaZBuffer: MsaaZBuffer = undefined;

    constructor() {
        this.msaaRaster = new MsaaRaster();
        this.msaaZBuffer = new MsaaZBuffer(this.msaaRaster.width, this.msaaRaster.height, 2);
        this.normalRaster = new NormalRaster();
        this.normalZBuffer = new NormalZBuffer(this.normalRaster.width, this.normalRaster.height);

        this.useNormal();
    }

    public setClearColor(color: Color): void {
        this.normalZBuffer.setClearColor(color);
        this.msaaZBuffer.setClearColor(color);
    }

    public getBuffer() {
        return this.buffer;
    }

    public getRaster() {
        return this.raster;
    }

    public useNormal() {
        this.buffer = this.normalZBuffer;
        this.raster = this.normalRaster;
    }

    public useMsaa() {
        this.buffer = this.msaaZBuffer;
        this.raster = this.msaaRaster;
    }

}


const rasterCtl = new RasterCtl();

rasterCtl.setClearColor(Color.WHITE);

let scene: Scene;

let i = 90;

function update() {

    const buffer = rasterCtl.getBuffer();
    const raster = rasterCtl.getRaster();


    console.time("render");

    buffer.clear();

    const camera = scene.getCamera();
    const node = scene.getChild(0);
    const out = Calc.vec2ByAngleDist(i, 30);
    camera.setPosition(out.x, 2, out.y);
    camera.lookAt(node.getPosition());


    // @ts-ignore
    raster.renderScene(scene, buffer);

    // @ts-ignore
    raster.render(buffer);

    // requestAnimationFrame(update);

    console.timeEnd("render");
}


async function run() {

    scene = await ScenePreview.scene01();

    update();
}

run().then();


// @ts-ignore
window["ctl"] = {
    msaa: function(a: any) {
        if (a.checked) {
            rasterCtl.useMsaa();
        } else {
            rasterCtl.useNormal();
        }
        update();
    },
};