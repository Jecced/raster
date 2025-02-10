// @ts-nocheck
import african from "../../resources/african/african_head.obj";
import african_diffuse from "../../resources/african/african_head_diffuse.png";
import diablo from "../../resources/diablo3/diablo3_pose.obj";
import diablo_diffuse from "../../resources/diablo3/diablo3_pose_diffuse.png";
import grid from "../../resources/comm/grid.png";
import earth_map from "../../resources/comm/earthmap.jpg";
import moon from "../../resources/comm/moon.jpg";
import brick_wall from "../../resources/brickwall/brickwall.jpg"
import brick_wall_normal from "../../resources/brickwall/brickwall_normal.jpg"

export enum ResourcePng {
    Grid = grid,
    AfricanDiffuse = african_diffuse,
    DiabloDiffuse = diablo_diffuse,
    EarthMap = earth_map,
    BrickWall = brick_wall,
    BrickWallNormal = brick_wall_normal,
    Moon = moon,
}

export enum ResourceObj {
    African = african,
    Diablo = diablo,
}