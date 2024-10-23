package model3d

import (
	"fmt"
	"raster-go/gl"
)

type Camera struct {
	position *gl.Vec3f // 位置
	Direct   *gl.Vec3f // 朝向
	Up       *gl.Vec3f // 向上方向

	Distance float64 // 距离

	perspective bool // 是否为透视

	TR *gl.Mat4f // lookAt计算出来的矩阵信息

	Nera float64 // 透视n举例

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

func (c *Camera) SetNera(n float64) {
	c.Nera = n
}

func (c *Camera) LookAt(node NodeBase) {
	var up gl.Vec3f = *gl.NewVec3f(0, 1, 0)

	x1, y1, z1 := node.Position()
	x2, y2, z2 := c.Position()
	c.Direct = gl.NewVec3f(x1-x2, y1-y2, z1-z2)
	c.Direct.Normalize()
	//dir 叉乘up 得到x轴向量
	xAxis := gl.CrossVec3f(c.Direct, &up)
	xAxis.Normalize()
	if xAxis.IsZero() {
		xAxis.Set(1, 0, 0)
		fmt.Println("look at x 轴是0向量, 强制改为:", xAxis)
	}
	// x 轴叉乘dir, 得到向上的y轴向量
	newUp := gl.CrossVec3f(xAxis, c.Direct)
	newUp.Normalize()
	c.Up = newUp

	TView := gl.NewMat4fIdentity()
	TView[3] = -c.position.X()
	TView[7] = -c.position.Y()
	TView[11] = -c.position.Z()

	RView := gl.NewMat4fIdentity()
	RView[0] = xAxis.X()
	RView[4] = xAxis.Y()
	RView[8] = xAxis.Z()

	RView[1] = c.Up.X()
	RView[5] = c.Up.Y()
	RView[9] = c.Up.Z()

	RView[2] = -c.Direct.X()
	RView[6] = -c.Direct.Y()
	RView[10] = -c.Direct.Z()
	// 转置
	RView.Transpose()

	c.TR = gl.Mat4fMul(RView, TView)
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
