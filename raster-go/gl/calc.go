package gl

// Mat4fMul 两个4*4矩阵相乘
func Mat4fMul(a, b *Mat4f) *Mat4f {
	out := NewMat4fZero()

	a00 := a[0]
	a01 := a[1]
	a02 := a[2]
	a03 := a[3]
	a10 := a[4]
	a11 := a[5]
	a12 := a[6]
	a13 := a[7]
	a20 := a[8]
	a21 := a[9]
	a22 := a[10]
	a23 := a[11]
	a30 := a[12]
	a31 := a[13]
	a32 := a[14]
	a33 := a[15]

	// Cache only the current line of the second matrix
	b0 := b[0]
	b1 := b[1]
	b2 := b[2]
	b3 := b[3]
	out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30
	out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31
	out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32
	out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33

	b0 = b[4]
	b1 = b[5]
	b2 = b[6]
	b3 = b[7]
	out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30
	out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31
	out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32
	out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33

	b0 = b[8]
	b1 = b[9]
	b2 = b[10]
	b3 = b[11]
	out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30
	out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31
	out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32
	out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33

	b0 = b[12]
	b1 = b[13]
	b2 = b[14]
	b3 = b[15]
	out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30
	out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31
	out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32
	out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33

	return out
}

// Mat4MulVec3 mat4 x vec3, vec3的第四个值用w来代替, 一般是 0 or 1, 结果还是vec3, 带一个w
func Mat4MulVec3(a *Mat4f, b *Vec3f, w float64) (*Vec3f, float64) {
	x := a[0]*b[0] + a[1]*b[1] + a[2]*b[2] + a[3]*w
	y := a[4]*b[0] + a[5]*b[1] + a[6]*b[2] + a[7]*w
	z := a[8]*b[0] + a[9]*b[1] + a[10]*b[2] + a[11]*w
	v := a[12]*b[0] + a[13]*b[1] + a[14]*b[2] + a[15]*w
	return NewVec3f(x, y, z), v
}
