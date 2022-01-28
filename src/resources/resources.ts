// @ts-nocheck
import african from "../../resources/african/african_head.obj";
import african_diffuse from "../../resources/african/african_head_diffuse.png";
import african_nm from "../../resources/african/african_head_nm.png";
import diablo from "../../resources/diablo3/diablo3_pose.obj";
import diablo_diffuse from "../../resources/diablo3/diablo3_pose_diffuse.png";
import grid from "../../resources/comm/grid.png";
import earth_map from "../../resources/earth/earthmap.jpg";
import earth_clouds from "../../resources/earth/earth_clouds.jpg";
import earth_nightmap from "../../resources/earth/earth_nightmap.jpg";
import moon from "../../resources/comm/moon.jpg";
import brick_wall from "../../resources/brickwall/brickwall.jpg"
import brick_wall_normal from "../../resources/brickwall/brickwall_normal.jpg"
import container2_diffuse from "../../resources/container2/container2_diffuse.png"
import container2_specular from "../../resources/container2/container2_specular.png"
import skybox1top from "../../resources/skybox/top.jpg"
import skybox1bottom from "../../resources/skybox/bottom.jpg"
import skybox1left from "../../resources/skybox/left.jpg"
import skybox1right from "../../resources/skybox/right.jpg"
import skybox1front from "../../resources/skybox/front.jpg"
import skybox1back from "../../resources/skybox/back.jpg"

export enum ResourcePng {
    Grid = grid,

    AfricanDiffuse = african_diffuse,
    AfricanNm = african_nm,

    DiabloDiffuse = diablo_diffuse,

    EarthMap = earth_map,
    EarthClouds = earth_clouds,
    EarthNightMap = earth_nightmap,

    BrickWall = brick_wall,
    BrickWallNormal = brick_wall_normal,

    Moon = moon,

    Container2Diffuse = container2_diffuse,
    Container2Specular = container2_specular,

    Skybox1Top = skybox1top,
    Skybox1Bottom = skybox1bottom,
    Skybox1Left = skybox1left,
    Skybox1Right = skybox1right,
    Skybox1Front = skybox1front,
    Skybox1Back = skybox1back,
}

export enum ResourceObj {
    African = african,
    Diablo = diablo,
}