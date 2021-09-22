package ma

import "math"

// Barycentric 求一个点的重心坐标
func Barycentric(x1, y1, x2, y2, x3, y3 int, px, py float64) (a, b, c float64) {
	s := CrossInt(x2-x1, y2-y1, x3-x1, y3-y1) / 2

	a = CrossFloat64(px-float64(x3), py-float64(y3), px-float64(x1), py-float64(y1)) / 2 / s
	b = CrossFloat64(px-float64(x1), py-float64(y1), px-float64(x2), py-float64(y2)) / 2 / s
	c = CrossFloat64(px-float64(x2), py-float64(y2), px-float64(x3), py-float64(y3)) / 2 / s
	return a, b, c
}

// CrossInt 叉乘
func CrossInt(x1, y1, x2, y2 int) float64 {
	return float64(x1*y2 - x2*y1)
}

// CrossFloat64 叉乘
func CrossFloat64(x1, y1, x2, y2 float64) float64 {
	return x1*y2 - x2*y1
}

//x1=x+s·cosθ y1=y+s·sinθ

func CalcVec2ByAngleDist(angle, distance float64) (x, y float64) {

	angle = math.Pi / 180 * angle
	x = distance * math.Cos(angle)
	y = distance * math.Sin(angle)
	return
}
