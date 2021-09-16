package model3d

type Scene struct {
	Screen *Screen
	Camera *Camera
	Child  []*Node
}

func NewScene(width, height int) *Scene {
	camera := NewCamera()
	camera.SetPosition(0, 100, 0)

	screen := NewScreen(width, height)

	return &Scene{Camera: camera, Screen: screen, Child: make([]*Node, 0, 0)}
}

func (s *Scene) AddChild(node *Node) {
	s.Child = append(s.Child, node)
}
