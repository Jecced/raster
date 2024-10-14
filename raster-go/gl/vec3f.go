package gl

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
