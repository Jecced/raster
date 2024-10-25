package model3d

import "raster-go/gl"

type Scene struct {
	Screen  *Screen
	ZBuffer *gl.ZBuffer
	Camera  *Camera
	Child   []*Node
}

func NewScene(width, height int) *Scene {
	camera := NewCamera()
	camera.SetPosition(0, 100, 0)

	zbuff := gl.NewZBuffer(width, height, 1)

	screen := NewScreen(width, height)

	return &Scene{Camera: camera, ZBuffer: zbuff, Screen: screen, Child: make([]*Node, 0, 0)}
}

func (s *Scene) AddChild(node *Node) {
	s.Child = append(s.Child, node)
}
