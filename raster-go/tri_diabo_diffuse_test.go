package raster_go

import (
	"fmt"
	"github.com/Jecced/go-tools/src/imgutil"
	"image"
	"image/color"
	"testing"
)

var obj *ObjModel

var diffuse image.Image

var mx, my int

func init() {
	objPath := "BR_Bulbasaur.obj"
	obj = LoadObj(objPath)

	diffuse, _ = imgutil.LoadImage("FushigidaneDh.png")

	mx = diffuse.Bounds().Max.X
	my = diffuse.Bounds().Max.Y
}

func TestDrawBulbasaurFace(t *testing.T) {
	u1, v1 := 0.109, 0.367
	u2, v2 := 0.108, 0.326
	u3, v3 := 0.187, 0.395
	fmt.Println(u1, v1, u2, v2, u3, v3)
	const x1, y1, x2, y2, x3, y3 = 1000, 1000, 1000, 0, 0, 1000
	png := imgutil.CreatPng(1000, 1000)

	BarycentricTriColorDiffuseTest(x1, y1, x2, y2, x3, y3, png)
	pngPath := "/Users/bytedance/test/tri_diffuse.png"
	imgutil.SaveImage(pngPath, png)
}

func BarycentricTriColorDiffuseTest(x1, y1, x2, y2, x3, y3 int, png *image.RGBA) {
	maxX := Max(x1, x2, x3)
	maxY := Max(y1, y2, y3)
	minX := Min(x1, x2, x3)
	minY := Min(y1, y2, y3)

	u1, v1 := 0.191, 0.455
	u2, v2 := 0.108, 0.326
	u3, v3 := 0.177, 0.338

	for x := minX; x < maxX; x++ {
		for y := minY; y < maxY; y++ {
			a, b, c := Barycentric(x1, y1, x2, y2, x3, y3, x, y)
			// 判断是否在三角形内
			if a < 0 || b < 0 || c < 0 {
				continue
			}

			ux := int((a*u1 + b*u2 + c*u3) * float64(mx))
			vy := my - int((a*v1+b*v2+c*v3)*float64(my))
			at := diffuse.At(ux, vy)

			png.SetRGBA(x, y, at.(color.RGBA))
		}
	}
}

func TestDrawDiablo(t *testing.T) {

	const pngPath = "/Users/bytedance/test/tri_diffuse.png"

	// 输出的渲染宽高大小
	const w, h = 1000, 1000

	png := imgutil.CreatPng(w, h)

	// 绘制三角形
	for i, _ := range obj.fv {
		drawTri1(obj.v, obj.fv[i], obj.vt, obj.fuv[i], png)
	}

	i := 100
	drawTri1(obj.v, obj.fv[i], obj.vt, obj.fuv[i], png)

	imgutil.SaveImage(pngPath, png)

}

func drawTri1(v [][]float64, fv []int, uv [][]float64, fuv []int, png *image.RGBA) {
	// 从所有三角形顶点坐标中找到索引的位置信息
	float64s1 := v[fv[0]-1]
	float64s2 := v[fv[1]-1]
	float64s3 := v[fv[2]-1]

	// 三角形坐标
	x1, y1 := getXy1(float64s1[0], float64s1[1])
	x2, y2 := getXy1(float64s2[0], float64s2[1])
	x3, y3 := getXy1(float64s3[0], float64s3[1])

	// 从所有的顶点信息中, 找到索引的顶点位置信息
	uv1 := uv[fuv[0]-1]
	uv2 := uv[fuv[1]-1]
	uv3 := uv[fuv[2]-1]
	fmt.Println("111", uv1, uv2, uv3)

	BarycentricDiabloDiffuseTest(x1, y1, x2, y2, x3, y3, uv1[0], uv1[1], uv2[0], uv2[1], uv3[0], uv3[1], png)
}

func BarycentricDiabloDiffuseTest(x1, y1, x2, y2, x3, y3 int, u0, v0, u1, v1, u2, v2 float64, png *image.RGBA) {
	maxX := Max(x1, x2, x3)
	maxY := Max(y1, y2, y3)
	minX := Min(x1, x2, x3)
	minY := Min(y1, y2, y3)

	//u0, v0 := 0.0, 0.0
	//u1, v1 := 0.0, 1.0
	//u2, v2 := 1.0, 0.0

	fmt.Println(u0, u1, u2, v0, v1, v2)

	for x := minX; x < maxX; x++ {
		for y := minY; y < maxY; y++ {
			a, b, c := Barycentric(x1, y1, x2, y2, x3, y3, x, y)
			// 判断是否在三角形内
			if a < 0 || b < 0 || c < 0 {
				continue
			}

			//ux := mx - int((a*u0+b*u1+c*u2)*float64(mx))
			//vy := my - int((a*v0+b*v1+c*v2)*float64(my))
			ux := int((a*u0 + b*u1 + c*u2) * float64(mx))
			vy := my - int((a*v0+b*v1+c*v2)*float64(my))
			//fmt.Println(ux, vy, x, y)

			at := diffuse.At(ux, vy)

			png.SetRGBA(x, y, at.(color.RGBA))
		}
	}
}

func getXy1(x, y float64) (int, int) {
	return int(x*100) + 500, (-int(y*100) + 500)
}
