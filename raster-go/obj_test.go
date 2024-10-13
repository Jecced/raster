package raster_go

import (
	"github.com/Jecced/go-tools/src/fileutil"
	"github.com/Jecced/go-tools/src/imgutil"
	"image"
	"image/color"
	"math"
	"strconv"
	"strings"
	"testing"
)

func TestObjDraw(t *testing.T) {
	objPath := "/Users/bytedance/test/diablo3_pose.obj"
	pngPath := "/Users/bytedance/test/diablo3_pose.png"

	w, h := 1000, 1000
	png := imgutil.CreatPng(w, h)

	o := LoadObj(objPath)

	// 绘制顶点
	//for _, float64s := range o.v {
	//	x, y := getXy(float64s[0], float64s[1])
	//	dot(x, y, png)
	//}

	// 旋转180度
	//for _, vs := range o.v {
	//	vs[0], vs[1], vs[2] = rotateY(vs[0], vs[1], vs[2], math.Pi/180*180)
	//}

	// 绘制三角形
	for _, fvs := range o.fv {
		drawTri(o.v, fvs, png)
	}

	imgutil.SaveImage(pngPath, png)
}

func TestObjDrawRotationY360(t *testing.T) {
	objPath := "/Users/bytedance/test/african_head.obj"

	w, h := 1000, 1000

	o := LoadObj(objPath)

	for i := 0; i < 360; i++ {

		png := imgutil.CreatPng(w, h)

		for _, vs := range o.v {
			vs[0], vs[1], vs[2] = rotateY(vs[0], vs[1], vs[2], math.Pi/180)
		}

		for _, fvs := range o.fv {
			drawTri(o.v, fvs, png)
		}

		imgutil.SaveImage("/Users/bytedance/test/face/"+strconv.Itoa(i)+".png", png)
	}
}

func getXy(x, y float64) (int, int) {
	return int(x*300) + 500, -int(y*300) + 500
}

// 所有顶点索引
// 三角形的顶点顺序索引
// png图片
func drawTri(uv [][]float64, fvs []int, png *image.RGBA) {
	float64s1 := uv[fvs[0]-1]
	float64s2 := uv[fvs[1]-1]
	float64s3 := uv[fvs[2]-1]

	x1, y1 := getXy1(float64s1[0], float64s1[1])
	x2, y2 := getXy1(float64s2[0], float64s2[1])
	x3, y3 := getXy1(float64s3[0], float64s3[1])

	line(x1, y1, x2, y2, png)
	line(x2, y2, x3, y3, png)
	line(x3, y3, x1, y1, png)
}

//type ObjModel struct {
//	v   [][]float64 //顶点信息
//	vt  [][]float64 //代表点的贴图坐标
//	vn  [][]float64 //法线
//	fv  [][]int     //顶点索引
//	fuv [][]int     //uv点索引
//	fvn [][]int     //法线索引
//}
//
//func LoadObj(path string) *ObjModel {
//	text, _ := fileutil.ReadText(path)
//	lines := strings.Split(text, "\n")
//	v := make([][]float64, 0, 0)
//	vt := make([][]float64, 0, 0)
//	vn := make([][]float64, 0, 0)
//	fv := make([][]int, 0, 0)
//	fuv := make([][]int, 0, 0)
//	fvn := make([][]int, 0, 0)
//	for _, line := range lines {
//		if strings.HasPrefix(line, "v ") {
//			vers := strings.Split(line[2:], " ")
//			vs := make([]float64, len(vers), len(vers))
//			for i := 0; i < len(vers); i++ {
//				vs[i], _ = strconv.ParseFloat(vers[i], 64)
//			}
//			v = append(v, vs)
//			continue
//		}
//		if strings.HasPrefix(line, "vt ") {
//			vers := strings.Split(line[3:], " ")
//			vs := make([]float64, len(vers), len(vers))
//			for i := 0; i < len(vers); i++ {
//				vs[i], _ = strconv.ParseFloat(vers[i], 64)
//			}
//			vt = append(vt, vs)
//			continue
//		}
//
//		if strings.HasPrefix(line, "vn ") {
//			vers := strings.Split(line[3:], " ")
//			vs := make([]float64, len(vers), len(vers))
//			for i := 0; i < len(vers); i++ {
//				vs[i], _ = strconv.ParseFloat(vers[i], 64)
//			}
//			vn = append(vn, vs)
//			continue
//		}
//
//		// 格式："f 顶点索引/uv点索引/法线索引"。
//		// https://blog.csdn.net/szchtx/article/details/8628265
//		if strings.HasPrefix(line, "f ") {
//			vers := strings.Split(line[2:], " ")
//			fvs := make([]int, len(vers), len(vers))
//			fuvs := make([]int, len(vers), len(vers))
//			fvns := make([]int, len(vers), len(vers))
//			for i := 0; i < len(vers); i++ {
//				//vs[i], _ = strconv.ParseFloat(vers[i], 64)
//				fsplit := strings.Split(vers[i], "/")
//				fvs[i], _ = strconv.Atoi(fsplit[0])
//
//				if len(fsplit) > 1 {
//					fuvs[i], _ = strconv.Atoi(fsplit[1])
//				}
//
//				if len(fsplit) > 2 {
//					fvns[i], _ = strconv.Atoi(fsplit[2])
//				}
//			}
//			fv = append(fv, fvs)
//			fuv = append(fv, fuvs)
//			fvn = append(fv, fvns)
//		}
//	}
//	return &ObjModel{v: v, vt: vt, fv: fv, vn: vn, fuv: fuv, fvn: fvn}
//}

func abs(a int) int {
	return int(math.Abs(float64(a)))
}

//https://tech.bytedance.net/articles/6874215532715835400
func line(x1, y1, x2, y2 int, png *image.RGBA) {
	c := color.RGBA{
		R: 0,
		G: 0,
		B: 0,
		A: 255,
	}
	steep := false
	if abs(x1-x2) < abs(y1-y2) {
		steep = true
		x1, y1 = y1, x1
		x2, y2 = y2, x2
	}
	if x1 > x2 {
		x1, x2 = x2, x1
		y1, y2 = y2, y1
	}
	delta_x := x2 - x1
	delta_y := y2 - y1
	derror2 := abs(delta_y) * 2
	error2 := 0
	y := y1
	//fmt.Println(delta_x, delta_y)
	y_step := -1
	if y2 > y1 {
		y_step = 1
	}
	for x := x1; x <= x2; x++ {
		if steep {
			png.SetRGBA(y, x, c)
		} else {
			png.SetRGBA(x, y, c)
		}
		error2 += derror2
		if error2 > delta_x {
			y += y_step
			error2 -= delta_x * 2
		}
	}
}

func dot(x, y int, png *image.RGBA) {
	c := color.RGBA{
		R: 255,
		G: 0,
		B: 0,
		A: 255,
	}
	png.SetRGBA(x, y, c)

	png.SetRGBA(x+1, y, c)
	png.SetRGBA(x, y+1, c)
	png.SetRGBA(x+1, y+1, c)
	png.SetRGBA(x+2, y, c)
	png.SetRGBA(x, y+2, c)
	png.SetRGBA(x+2, y+1, c)
	png.SetRGBA(x+1, y+2, c)
	png.SetRGBA(x+2, y+2, c)
}

type ObjModel struct {
	v   [][]float64 //顶点信息
	vt  [][]float64 //代表点的贴图坐标
	vn  [][]float64 //法线
	fv  [][]int     //顶点索引
	fuv [][]int     //uv点索引
	fvn [][]int     //法线索引
}

func LoadObj(path string) *ObjModel {
	text, _ := fileutil.ReadText(path)
	lines := strings.Split(text, "\n")
	v := make([][]float64, 0, 0)
	vt := make([][]float64, 0, 0)
	vn := make([][]float64, 0, 0)
	fv := make([][]int, 0, 0)
	fuv := make([][]int, 0, 0)
	fvn := make([][]int, 0, 0)
	for _, line := range lines {
		line = strings.ReplaceAll(line, "\r", "")
		if strings.HasPrefix(line, "v ") {
			vers := strings.Split(strings.Trim(line[2:], " "), " ")
			vs := make([]float64, len(vers), len(vers))
			for i := 0; i < len(vers); i++ {
				vs[i], _ = strconv.ParseFloat(vers[i], 64)
			}
			v = append(v, vs)
			continue
		}
		if strings.HasPrefix(line, "vt ") {
			vers := strings.Split(strings.Trim(line[3:], " "), " ")
			l := len(vers)
			vs := make([]float64, l, l)
			for i := 0; i < l; i++ {
				vs[i], _ = strconv.ParseFloat(vers[i], 64)
			}
			vt = append(vt, vs)
			continue
		}

		if strings.HasPrefix(line, "vn ") {
			vers := strings.Split(strings.Trim(line[3:], " "), " ")
			vs := make([]float64, len(vers), len(vers))
			for i := 0; i < len(vers); i++ {
				vs[i], _ = strconv.ParseFloat(vers[i], 64)
			}
			vn = append(vn, vs)
			continue
		}

		// 格式："f 顶点索引/uv点索引/法线索引"。
		// https://blog.csdn.net/szchtx/article/details/8628265
		if strings.HasPrefix(line, "f ") {
			vers := strings.Split(strings.Trim(line[2:], " "), " ")
			fvs := make([]int, len(vers), len(vers))
			fuvs := make([]int, len(vers), len(vers))
			fvns := make([]int, len(vers), len(vers))
			for i := 0; i < len(vers); i++ {
				//vs[i], _ = strconv.ParseFloat(vers[i], 64)
				fsplit := strings.Split(vers[i], "/")
				fvs[i], _ = strconv.Atoi(fsplit[0])

				if len(fsplit) > 1 {
					fuvs[i], _ = strconv.Atoi(fsplit[1])
				}

				if len(fsplit) > 2 {
					fvns[i], _ = strconv.Atoi(fsplit[2])
				}
			}
			fv = append(fv, fvs)
			fuv = append(fv, fuvs)
			fvn = append(fv, fvns)
		}
	}
	return &ObjModel{v: v, vt: vt, fv: fv, vn: vn, fuv: fuv, fvn: fvn}
}

func rotateX(x, y, z float64, rad float64) (x1, y1, z1 float64) {
	x1 = x
	y1 = y*math.Cos(rad) - y*math.Sin(rad)
	z1 = y*math.Sin(rad) + y*math.Cos(rad)
	return x1, y1, z1
}

func rotateY(x, y, z float64, rad float64) (x1, y1, z1 float64) {
	x1 = z*math.Sin(rad) + x*math.Cos(rad)
	y1 = y
	z1 = z*math.Cos(rad) - x*math.Sin(rad)
	return x1, y1, z1
}

func rotateZ(x, y, z float64, rad float64) (x1, y1, z1 float64) {
	x1 = x*math.Cos(rad) - y*math.Sin(rad)
	y1 = x*math.Sin(rad) + y*math.Cos(rad)
	z1 = z
	return x1, y1, z1
}
