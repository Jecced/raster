package gl

import "fmt"

type Mat4f [16]float64

func NewMat4fZero() *Mat4f {
	mat := new(Mat4f)
	mat[0] = 0
	mat[1] = 0
	mat[2] = 0
	mat[3] = 0
	mat[4] = 0
	mat[5] = 0
	mat[6] = 0
	mat[7] = 0
	mat[8] = 0
	mat[9] = 0
	mat[10] = 0
	mat[11] = 0
	mat[12] = 0
	mat[13] = 0
	mat[14] = 0
	mat[15] = 0
	return mat
}

func NewMat4fIdentity() *Mat4f {
	mat := new(Mat4f)
	mat[0] = 1
	mat[1] = 0
	mat[2] = 0
	mat[3] = 0
	mat[4] = 0
	mat[5] = 1
	mat[6] = 0
	mat[7] = 0
	mat[8] = 0
	mat[9] = 0
	mat[10] = 1
	mat[11] = 0
	mat[12] = 0
	mat[13] = 0
	mat[14] = 0
	mat[15] = 1
	return mat
}

// Transpose 转置
func (m *Mat4f) Transpose() {
	a01 := m[1]
	a02 := m[2]
	a03 := m[3]
	a12 := m[6]
	a13 := m[7]
	a23 := m[11]

	m[1] = m[4]
	m[2] = m[8]
	m[3] = m[12]
	m[4] = a01
	m[6] = m[9]
	m[7] = m[13]
	m[8] = a02
	m[9] = a12
	m[11] = m[14]
	m[12] = a03
	m[13] = a13
	m[14] = a23
}

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

func (m *Mat4f) String() string {
	return fmt.Sprintf(
		"mat4f(\t%.2f, %.2f, %.2f, %.2f\n\t\t%.2f, %.2f, %.2f, %.2f\n\t\t%.2f, %.2f, %.2f, %.2f\n\t\t%.2f, %.2f, %.2f, %.2f)",
		m[0], m[1], m[2], m[3],
		m[4], m[5], m[6], m[7],
		m[8], m[9], m[10], m[11],
		m[12], m[13], m[14], m[15],
	)
}
