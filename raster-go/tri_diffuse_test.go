package raster_go

//import (
//	"fmt"
//	"github.com/Jecced/go-tools/src/imgutil"
//	"image"
//	"image/color"
//	"testing"
//)
//
//// 贴图 uv
//var diffuse image.Image
//
//// 输出贴图
//const PngPath = "/Users/bytedance/test/tri_diffuse.png"
//
//// 三角形信息
//const x1, y1, x2, y2, x3, y3 = 0, 800,
//	800, 800,
//	800, 000
//
//// 输出的渲染宽高大小
//const w, h = 1000, 1000
//
//func init() {
//	diffuse, _ = imgutil.LoadImage("floor_diffuse.png")
//}
//
//// 三角形 插值 图片
//func TestTriDiffuse(t *testing.T) {
//	png := imgutil.CreatPng(w, h)
//	BarycentricTriColorDiffuseTest(x1, y1, x2, y2, x3, y3, png)
//	_ = imgutil.SaveImage(PngPath, png)
//}
//
//func BarycentricTriColorDiffuseTest(x1, y1, x2, y2, x3, y3 int, png *image.RGBA) {
//	maxX := Max(x1, x2, x3)
//	maxY := Max(y1, y2, y3)
//	minX := Min(x1, x2, x3)
//	minY := Min(y1, y2, y3)
//
//	u0, v0 := 0.0, 0.0
//	u1, v1 := 0.0, 1.0
//	u2, v2 := 1.0, 0.0
//
//	fmt.Println(u0, v0, u1, v1, u2, v2)
//
//	for x := minX; x < maxX; x++ {
//		for y := minY; y < maxY; y++ {
//			a, b, c := Barycentric(x1, y1, x2, y2, x3, y3, x, y)
//			// 判断是否在三角形内
//			if a < 0 || b < 0 || c < 0 {
//				continue
//			}
//
//			ux := int((a*u0 + b*u1 + c*u2) * 600)
//			vy := int((a*v0 + b*v1 + c*v2) * 600)
//			at := diffuse.At(ux, vy)
//
//			png.SetRGBA(x, y, at.(color.RGBA))
//		}
//	}
//}
