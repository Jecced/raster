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

func (m *Mat4f) String() string {
	return fmt.Sprintf(
		"mat4f(\t%.2f, %.2f, %.2f, %.2f\n\t\t%.2f, %.2f, %.2f, %.2f\n\t\t%.2f, %.2f, %.2f, %.2f\n\t\t%.2f, %.2f, %.2f, %.2f)",
		m[0], m[1], m[2], m[3],
		m[4], m[5], m[6], m[7],
		m[8], m[9], m[10], m[11],
		m[12], m[13], m[14], m[15],
	)
}
