package raster_go

import (
	"github.com/Jecced/go-tools/src/imgutil"
	"image"
	"image/color"
	"testing"
)

// 三角形 重心法, 顶点颜色插值
func TestBarycentric(t *testing.T) {

	pngPath := "/Users/bytedance/test/tri.png"

	x1, y1, x2, y2, x3, y3 :=
		0, 1000,
		500, 0,
		1000, 1000
	w, h := 1000, 1000

	png := imgutil.CreatPng(w, h)

	BarycentricTriColorTest(x1, y1, x2, y2, x3, y3, png)

	imgutil.SaveImage(pngPath, png)
}

func BarycentricTriColorTest(x1, y1, x2, y2, x3, y3 int, png *image.RGBA) {
	maxX := Max(x1, x2, x3)
	maxY := Max(y1, y2, y3)
	minX := Min(x1, x2, x3)
	minY := Min(y1, y2, y3)
	// TODO 测试颜色的数据, 临时写死
	// a点颜色 255, 0, 0
	cr1, cg1, cb1 := 51.0, 255.0, 153.0
	//cr1, cg1, cb1 := 255.0, 0.0, 0.0
	// b点颜色 0, 255, 0
	cr2, cg2, cb2 := 0.0, 153.0, 255.0
	//cr2, cg2, cb2 := 0.0, 255.0, 0.0
	// c点颜色 0, 0, 255
	cr3, cg3, cb3 := 255.0, 102.0, 153.0
	//cr3, cg3, cb3 := 0.0, 0.0, 255.0

	for x := minX; x < maxX; x++ {
		for y := minY; y < maxY; y++ {
			a, b, c := Barycentric(x1, y1, x2, y2, x3, y3, x, y)
			// 判断是否在三角形内
			if a < 0 || b < 0 || c < 0 {
				continue
			}
			// 对颜色进行插值
			co := color.RGBA{
				R: uint8(a*cr1 + b*cr2 + c*cr3),
				G: uint8(a*cg1 + b*cg2 + c*cg3),
				B: uint8(a*cb1 + b*cb2 + c*cb3),
				A: 255,
			}
			png.SetRGBA(x, y, co)
		}
	}
}

func Max(a ...int) (out int) {
	out = a[0]
	for i, l := 1, len(a); i < l; i++ {
		if out < a[i] {
			out = a[i]
		}
	}
	return out
}

func Min(a ...int) (out int) {
	out = a[0]
	for i, l := 1, len(a); i < l; i++ {
		if out > a[i] {
			out = a[i]
		}
	}
	return out
}

// 求一个点的重心坐标
func Barycentric(x1, y1, x2, y2, x3, y3, px, py int) (a, b, c float64) {
	s := Cross(x2-x1, y2-y1, x3-x1, y3-y1) / 2

	a = Cross(px-x3, py-y3, px-x1, py-y1) / 2 / s
	b = Cross(px-x1, py-y1, px-x2, py-y2) / 2 / s
	c = Cross(px-x2, py-y2, px-x3, py-y3) / 2 / s
	return a, b, c
}

// 叉乘
func Cross(x1, y1, x2, y2 int) float64 {
	return float64(x1*y2 - x2*y1)
}
