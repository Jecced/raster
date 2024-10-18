package gl

import (
	"fmt"
	"testing"
)

func TestCamera(t *testing.T) {
	node := &Node{}
	node.SetPosition(0, 0, -100.0)

	camera := NewCamera()
	camera.SetPosition(0, 100, 0)
	camera.LookAt(node, *NewVec3f(0, 1, 0))
	fmt.Println(camera.Direct.String())
	fmt.Println(camera.Up.String())
}
