package gl

type Camera struct {
	positions *[3]float64
	Direct    *Vec3f // 朝向
	Up        *Vec3f // 向上方向
}

func NewCamera() *Camera {
	camera := &Camera{
		positions: new([3]float64),
	}
	return camera
}

func (c *Camera) Position() (float64, float64, float64) {
	return c.positions[0], c.positions[1], c.positions[2]
}

func (c *Camera) LookAt(node NodeBase) {
	x1, y1, z1 := node.Position()
	x2, y2, z2 := c.Position()
	c.Direct = NewVec3f(x1-x2, y1-y2, z1-z2)
	//c.Direct.N
}
