package test

import (
	"raster-go/gl"
	"raster-go/model3d"
	"testing"
)

func init() {
	up := gl.NewVec3f(0, 1, 0)

	scene := model3d.NewScene(1000, 1000)

	node1 := model3d.NewNode()
	node1.SetObjModel("../obj/diablo3_pose.obj")
	node1.SetObjDefaultMat("../obj/diablo3_pose_diffuse.png")

	scene.AddChild(node1)
	scene.Camera.SetPosition(0, 500, 400)
	scene.Camera.LookAt(node1, *up)
}

func Test1111(t *testing.T) {

}
