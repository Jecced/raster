package gl

import (
	"fmt"
	"testing"
)

func TestCamera(t *testing.T) {
	node := &Node{}
	node.SetPosition(100.0, 200.0, 0.0)

	camera := NewCamera()
	camera.SetPosition(0, 500, -400)
	camera.LookAt(node)
	fmt.Println(camera.Direct.String())
	fmt.Println(camera.Up.String())
}
