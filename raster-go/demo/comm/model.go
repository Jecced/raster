package comm

import (
	"raster-go/gl"
	"raster-go/load"
	"raster-go/model3d"
)

// GetNode0 非洲人头像
func GetNode0() *model3d.Node {
	node1 := model3d.NewNode()
	node1.SetPosition(0, 0, 0)
	node1.SetObjModel("../../obj/african/african_head.obj")
	node1.SetObjDefaultMat("../../obj/african/african_head_diffuse.png")
	return node1
}

// GetNode1 大菠萝pose
func GetNode1() *model3d.Node {
	node1 := model3d.NewNode()
	node1.SetPosition(0, 0, 0)
	node1.SetObjModel("../../obj/diablo3_pose.obj")
	node1.SetObjDefaultMat("../../obj/diablo3_pose_diffuse.png")
	return node1
}

// GetNode2 妙蛙种子
func GetNode2() *model3d.Node {
	node1 := model3d.NewNode()
	node1.SetPosition(0, 0, 0)

	node1.SetObjModel("../../obj/Bulbasaur/Bulbasaur.obj")

	// 缩放一下
	for _, v := range node1.Obj.V {
		v.Mul(*gl.NewVec4f(0.2, 0.2, 0.2, 1))
	}
	node1.SetObjMat("../../obj/Bulbasaur/Fushigidane.mtl")
	node1.SetMatDiffuse("mat1", "../../obj/FushigidaneDh.png")
	node1.SetMatDiffuse("mat2", "../../obj/FushigidaneEyeDh.png")
	return node1
}

// GetFloor 地板
func GetFloor() *model3d.Node {
	node := model3d.NewNode()
	vert := make([]*gl.Vec4f, 0, 4)
	vert = append(vert, gl.NewVec4f(-1, 0, -1, 1))
	vert = append(vert, gl.NewVec4f(1, 0, -1, 1))
	vert = append(vert, gl.NewVec4f(1, 0, 1, 1))
	vert = append(vert, gl.NewVec4f(-1, 0, 1, 1))

	uv := make([]gl.Vec3f, 0, 4)
	uv = append(uv, *gl.NewVec3f(0, 0, 0))
	uv = append(uv, *gl.NewVec3f(0, 1, 0))
	uv = append(uv, *gl.NewVec3f(1, 1, 0))
	uv = append(uv, *gl.NewVec3f(1, 0, 0))

	a := load.ObjFace{Key: "default", V: []int{1, 2, 3}, VT: []int{1, 2, 3}}
	b := load.ObjFace{Key: "default", V: []int{3, 4, 1}, VT: []int{3, 4, 1}}

	face := []load.ObjFace{a, b}

	node.Obj = &load.ObjModel{
		V: vert, VT: uv, Face: face, FaceLen: len(face),
	}
	node.SetObjDefaultMat("../../obj/floor_diffuse.png")

	return node
}
