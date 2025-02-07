// @ts-nocheck
import african from "../../resources/african/african_head.obj";
import african_diffuse from "../../resources/african/african_head_diffuse.png";
import diablo from "../../resources/diablo3/diablo3_pose.obj";
import diablo_diffuse from "../../resources/diablo3/diablo3_pose_diffuse.png";
// import bulbasaurObj from "../../res/bulbasaur/Bulbasaur.obj";
// import bulbasaurImg1 from "../../res/bulbasaur/FushigidaneDh.png";
// import bulbasaurImg2 from "../../res/bulbasaur/FushigidaneEyeDh.png";
import grid from "../../resources/comm/grid.png";

export enum ResourcePng {
    Grid = grid,
    AfricanDiffuse = african_diffuse,
    DiabloDiffuse = diablo_diffuse,

}

export enum ResourceObj {
    African = african,
    Diablo = diablo,
}