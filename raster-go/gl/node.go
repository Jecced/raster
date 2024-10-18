package gl

type Node struct {
	position *Vec3f // 位置
}

func (n *Node) SetPosition(x, y, z float64) {
	if n.position == nil {
		n.position = NewVec3f(x, y, z)
	} else {
		n.position.Set(x, y, z)
	}
}

func (n *Node) Position() (float64, float64, float64) {
	return n.position.X(), n.position.Y(), n.position.Z()
}
