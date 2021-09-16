package model3d

import (
	"raster-go/gl"
)

type Camera struct {
	position *gl.Vec3f // 位置
	Direct   *gl.Vec3f // 朝向
	Up       *gl.Vec3f // 向上方向

	Distance float64 // 距离

	perspective bool // 是否为透视
}

func NewCamera() *Camera {
	camera := &Camera{
		position: gl.NewVec3f(0, 0, 0),
		Direct:   gl.NewVec3f(0, 0, -1),
		Up:       gl.NewVec3f(0, 1, 0),
	}
	return camera
}

func (c *Camera) SetPosition(x, y, z float64) {
	c.position.Set(x, y, z)
}

func (c *Camera) Position() (float64, float64, float64) {
	return c.position.X(), c.position.Y(), c.position.Z()
}

func (c *Camera) LookAt(node NodeBase, up gl.Vec3f) {
	x1, y1, z1 := node.Position()
	x2, y2, z2 := c.Position()
	c.Direct = gl.NewVec3f(x1-x2, y1-y2, z1-z2)
	c.Direct.Normalize()
	// 叉乘, up叉乘-z, 得到一个-y的向量, 取hat
	parallel := gl.CrossVec3f(&up, c.Direct)
	parallel.Normalize()
	// 重新叉乘新的-y方向的parallel, 得到新的up方向, 取hat
	newUp := gl.CrossVec3f(c.Direct, parallel)
	newUp.Normalize()
	c.Up = newUp

	//TView := gl.NewMat4fIdentity()
	//TView[3] = -c.position.X()
	//TView[7] = -c.position.Y()
	//TView[11] = -c.position.Z()
	//
	//RView := gl.NewMat4fIdentity()
	//
	//RView.Transpose()
	//fmt.Println(TView)
	//fmt.Println(RView)
	//
	//fmt.Println(gl.Mat4fMul(RView, TView))
}

// UsePerspective 透视模式
func (c *Camera) UsePerspective() {
	c.perspective = true
}

// UseOrthographic 正交模式
func (c *Camera) UseOrthographic() {
	c.perspective = false
}

// IsPerspective 是否透视模式
func (c *Camera) IsPerspective() bool {
	return c.perspective
}

// IsOrthographic 是否正交模式
func (c *Camera) IsOrthographic() bool {
	return !c.perspective
}
