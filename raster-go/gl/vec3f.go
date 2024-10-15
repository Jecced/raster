package gl

import "math"

type Vec3f struct {
	X float64
	Y float64
	Z float64
}

func (v Vec3f) Clone() *Vec3f {
	return &Vec3f{X: v.X, Y: v.Y, Z: v.Z}
}

func (v *Vec3f) Set(x, y, z float64) {
	v.X = x
	v.Y = y
	v.Z = z
}

func (v *Vec3f) Add(o Vec3f) {
	v.X += o.X
	v.Y += o.Y
	v.Z += o.Z
}

func (v *Vec3f) Sub(o Vec3f) {
	v.X -= o.X
	v.Y -= o.Y
	v.Z -= o.Z
}

func (v *Vec3f) Mul(o Vec3f) {
	v.X *= o.X
	v.Y *= o.Y
	v.Z *= o.Z
}

func (v *Vec3f) Div(o Vec3f) {
	v.X /= o.X
	v.Y /= o.Y
	v.Z /= o.Z
}

func (v *Vec3f) RotateX(rad float64) {
	rad *= math.Pi / 180
	y := v.Y*math.Cos(rad) - v.Z*math.Sin(rad)
	z := v.Y*math.Sin(rad) + v.Z*math.Cos(rad)
	v.Y = y
	v.Z = z
}
func (v *Vec3f) RotateY(rad float64) {
	rad *= math.Pi / 180
	x := v.Z*math.Sin(rad) + v.X*math.Cos(rad)
	z := v.Z*math.Cos(rad) - v.X*math.Sin(rad)
	v.Z = z
	v.X = x
}
func (v *Vec3f) RotateZ(rad float64) {
	rad *= math.Pi / 180
	x := v.X*math.Cos(rad) - v.Y*math.Sin(rad)
	y := v.X*math.Sin(rad) + v.Y*math.Cos(rad)
	v.X = x
	v.Y = y
}
