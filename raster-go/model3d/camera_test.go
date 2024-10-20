package model3d

import (
	"fmt"
	"raster-go/gl"
	"testing"
)

func TestCamera(t *testing.T) {
	node := &Node{}
	node.SetPosition(0, 0, -100.0)

	camera := NewCamera()
	camera.SetPosition(0, 100, 0)
	camera.LookAt(node, *gl.NewVec3f(0, 1, 0))
	fmt.Println(camera.Direct.String())
	fmt.Println(camera.Up.String())
	fmt.Println(camera.TR)

	vec3, f2 := gl.Mat4MulVec3(camera.TR, gl.NewVec3f(node.Position()), 1)
	fmt.Println(vec3)
	fmt.Println(f2)
}
