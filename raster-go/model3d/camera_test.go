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
}
