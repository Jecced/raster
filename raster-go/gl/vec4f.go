package gl

import "math"

type Vec4f [4]float64

func (v Vec4f) Clone() *Vec4f {
	clone := new(Vec4f)
	clone.SetX(v.X())
	clone.SetY(v.Y())
	clone.SetZ(v.Z())
	return clone
}

func NewVec4f(x, y, z, w float64) *Vec4f {
	vec := new(Vec4f)
	vec[0] = x
	vec[1] = y
	vec[2] = z
	vec[3] = w
	return vec
}

func (v *Vec4f) X() float64 {
	return v[0]
}

func (v *Vec4f) Y() float64 {
	return v[1]
}

func (v *Vec4f) Z() float64 {
	return v[2]
}

func (v *Vec4f) W() float64 {
	return v[3]
}

func (v *Vec4f) SetX(value float64) {
	v[0] = value
}

func (v *Vec4f) SetY(value float64) {
	v[1] = value
}

func (v *Vec4f) SetZ(value float64) {
	v[2] = value
}

func (v *Vec4f) SetW(value float64) {
	v[3] = value
}

func (v *Vec4f) Set(x, y, z, w float64) {
	v[0] = x
	v[1] = y
	v[2] = z
	v[3] = w
}

func (v *Vec4f) Add(o Vec4f) {
	v[0] += o[0]
	v[1] += o[1]
	v[2] += o[2]
	v[3] += o[3]
}

func (v *Vec4f) Sub(o Vec4f) {
	v[0] -= o[0]
	v[1] -= o[1]
	v[2] -= o[2]
	v[3] -= o[3]
}

func (v *Vec4f) Mul(o Vec4f) {
	v[0] *= o[0]
	v[1] *= o[1]
	v[2] *= o[2]
	v[3] *= o[3]
}

func (v *Vec4f) Div(o Vec4f) {
	v[0] /= o[0]
	v[1] /= o[1]
	v[3] /= o[3]
}

func (v *Vec4f) RotateX(rad float64) {
	rad *= math.Pi / 180
	y := v[1]*math.Cos(rad) - v[2]*math.Sin(rad)
	z := v[1]*math.Sin(rad) + v[2]*math.Cos(rad)
	v[1] = y
	v[2] = z
}
func (v *Vec4f) RotateY(rad float64) {
	rad *= math.Pi / 180
	x := v[2]*math.Sin(rad) + v[0]*math.Cos(rad)
	z := v[2]*math.Cos(rad) - v[0]*math.Sin(rad)
	v[2] = z
	v[0] = x
}
func (v *Vec4f) RotateZ(rad float64) {
	rad *= math.Pi / 180
	x := v[0]*math.Cos(rad) - v[1]*math.Sin(rad)
	y := v[0]*math.Sin(rad) + v[1]*math.Cos(rad)
	v[0] = x
	v[1] = y
}

func (v *Vec4f) Normalize() {
	x := v[0]
	y := v[1]
	z := v[2]
	w := v[3]
	length := x*x + y*y + z*z + w*w
	if length > 0 {
		//TODO: evaluate use of glm_invsqrt here?
		length = 1 / math.Sqrt(length)
	}
	v[0] *= length
	v[1] *= length
	v[2] *= length
	v[3] *= length
}

func DotVec4f(a, b *Vec4f) float64 {
	return a.X()*b.X() + a.Y()*b.Y() + a.Z()*b.Z() + a.W()*b.W()
}
