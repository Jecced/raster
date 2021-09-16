package ma

// Barycentric 求一个点的重心坐标
func Barycentric(x1, y1, x2, y2, x3, y3, px, py int) (a, b, c float64) {
	s := CrossInt2(x2-x1, y2-y1, x3-x1, y3-y1) / 2

	a = CrossInt2(px-x3, py-y3, px-x1, py-y1) / 2 / s
	b = CrossInt2(px-x1, py-y1, px-x2, py-y2) / 2 / s
	c = CrossInt2(px-x2, py-y2, px-x3, py-y3) / 2 / s
	return a, b, c
}

// CrossInt2 叉乘
func CrossInt2(x1, y1, x2, y2 int) float64 {
	return float64(x1*y2 - x2*y1)
}
