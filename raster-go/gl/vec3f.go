package gl

import (
	"fmt"
	"math"
)

//type Vec3f struct {
//	X float64
//	Y float64
//	Z float64
//}
type Vec3f [3]float64

func (v Vec3f) Clone() *Vec3f {
	clone := new(Vec3f)
	return clone
	//return &Vec3f{X: v.X, Y: v.Y, Z: v.Z}
}

func NewVec3f(x, y, z float64) *Vec3f {
	vec3f := new(Vec3f)
	vec3f[0] = x
	vec3f[1] = y
	vec3f[2] = z
	return vec3f
}

func (v *Vec3f) X() float64 {
	return v[0]
}

func (v *Vec3f) Y() float64 {
	return v[1]
}

func (v *Vec3f) Z() float64 {
	return v[2]
}

func (v *Vec3f) SetX(value float64) {
	v[0] = value
}

func (v *Vec3f) SetY(value float64) {
	v[1] = value
}

func (v *Vec3f) SetZ(value float64) {
	v[2] = value
}

func (v *Vec3f) Set(x, y, z float64) {
	//v.X = x
	//v.Y = y
	//v.Z = z
	v[0] = x
	v[1] = y
	v[2] = z
}

func (v *Vec3f) Add(o Vec3f) {
	v[0] += o[0]
	v[1] += o[1]
	v[2] += o[2]
}

func (v *Vec3f) Sub(o Vec3f) {
	v[0] -= o[0]
	v[1] -= o[1]
	v[2] -= o[2]
}

func (v *Vec3f) Mul(o Vec3f) {
	v[0] *= o[0]
	v[1] *= o[1]
	v[2] *= o[2]
}

func (v *Vec3f) Div(o Vec3f) {
	v[0] /= o[0]
	v[1] /= o[1]
	v[2] /= o[2]
}

func (v *Vec3f) RotateX(rad float64) {
	rad *= math.Pi / 180
	y := v[1]*math.Cos(rad) - v[2]*math.Sin(rad)
	z := v[1]*math.Sin(rad) + v[2]*math.Cos(rad)
	v[1] = y
	v[2] = z
}
func (v *Vec3f) RotateY(rad float64) {
	rad *= math.Pi / 180
	x := v[2]*math.Sin(rad) + v[0]*math.Cos(rad)
	z := v[2]*math.Cos(rad) - v[0]*math.Sin(rad)
	v[2] = z
	v[0] = x
}
func (v *Vec3f) RotateZ(rad float64) {
	rad *= math.Pi / 180
	x := v[0]*math.Cos(rad) - v[1]*math.Sin(rad)
	y := v[0]*math.Sin(rad) + v[1]*math.Cos(rad)
	v[0] = x
	v[1] = y
}

func (v *Vec3f) Normalize() {
	x := v[0]
	y := v[1]
	z := v[2]
	length := x*x + y*y + z*z
	if length > 0 {
		//TODO: evaluate use of glm_invsqrt here?
		length = 1 / math.Sqrt(length)
	}
	v[0] *= length
	v[1] *= length
	v[2] *= length
}

func (v *Vec3f) String() string {
	return fmt.Sprintf("vec3(%f, %f, %f)", v.X(), v.Y(), v.Z())
}
