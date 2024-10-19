package raster_go

import (
	"fmt"
	"github.com/Jecced/go-tools/src/imgutil"
	"raster-go/gl"
	"raster-go/load"
	"raster-go/ma"
	"raster-go/model3d"
	"strconv"
	"testing"
)

var obj *load.ObjModel

var mat *load.ObjMat

//var diffuse image.Image
//
//var mx, my int

var screen *model3d.Screen = model3d.NewScreen(1000, 1000)

func init() {
	obj, _ = load.LoadObjModelByPath("obj/diablo3_pose.obj")

	//mat, _ = load.LoadMatByPath("obj/Bulbasaur/Fushigidane.mtl")
	//
	//mat.SetMapKd("mat1", "obj/FushigidaneDh.png")
	//mat.SetMapKd("mat2", "obj/FushigidaneEyeDh.png")

	mat = load.CreatDefaultWithDiffuse("obj/diablo3_pose_diffuse.png")
}

func TestDrawDiablo360(t *testing.T) {
	for i := 0; i < 360; i++ {

		png := imgutil.CreatPng(screen.W, screen.H)

		for _, vert := range obj.V {
			vert.RotateY(1)
		}

		// 绘制三角形
		for i, l := 0, obj.FaceLen; i < l; i++ {
			drawTri2(obj, i)
		}

		for x := 0; x < screen.W; x++ {
			for y := 0; y < screen.H; y++ {
				png.Set(x, y, screen.GetColor(x, y))
			}
		}

		out := "out/c/tri_diffuse_" + strconv.Itoa(i) + ".png"
		// 写出文件
		imgutil.SaveImage(out, png)
		fmt.Println("write:", out)
		screen.Clean()
	}
}

func TestDrawDiablo(t *testing.T) {

	png := imgutil.CreatPng(screen.W, screen.H)

	// 旋转40度
	for _, vert := range obj.V {
		vert.RotateY(-40)
	}

	// 绘制三角形
	for i, l := 0, obj.FaceLen; i < l; i++ {
		drawTri2(obj, i)
	}

	// 屏幕中的颜色绘制到png中
	for x := 0; x < screen.W; x++ {
		for y := 0; y < screen.H; y++ {
			png.Set(x, y, screen.GetColor(x, y))
		}
	}

	// 绘制三角形的线
	//for _, fvs := range obj.fv {
	//	drawTri(obj.v, fvs, png)
	//}
	// 写出文件
	imgutil.SaveImage("out/tri_diffuse.png", png)

}

func drawTri2(obj *load.ObjModel, i int) {
	face := obj.Face[i]
	// 从所有三角形顶点坐标中找到索引的位置信息
	v1 := obj.V[face.V[0]-1]
	v2 := obj.V[face.V[1]-1]
	v3 := obj.V[face.V[2]-1]

	// 从所有的顶点信息中, 找到索引的顶点位置信息
	uv0 := obj.VT[face.VT[0]-1]
	uv1 := obj.VT[face.VT[1]-1]
	uv2 := obj.VT[face.VT[2]-1]

	meta, _ := mat.Get(face.Key)
	BarycentricDiabloDiffuseTest(v1, v2, v3, uv0, uv1, uv2, meta)
}

func BarycentricDiabloDiffuseTest(v1, v2, v3 *gl.Vec3f, uv0, uv1, uv2 gl.Vec3f, meta *load.ObjMatMeta) {
	x1, y1 := getXy1(v1.X(), v1.Y())
	x2, y2 := getXy1(v2.X(), v2.Y())
	x3, y3 := getXy1(v3.X(), v3.Y())

	maxX, maxY, minX, minY := screen.Bound(x1, y1, x2, y2, x3, y3)
	for x := minX; x < maxX; x++ {
		for y := minY; y < maxY; y++ {
			a, b, c := ma.Barycentric(x1, y1, x2, y2, x3, y3, x, y)
			// 判断是否在三角形内
			if a < 0 || b < 0 || c < 0 {
				continue
			}

			// UV 坐标 0, 0 在左下角
			ux := int((a*uv1.X() + b*uv2.X() + c*uv0.X()) * float64(meta.MaxX))
			vy := meta.MaxY - int((a*uv1.Y()+b*uv2.Y()+c*uv0.Y())*float64(meta.MaxY))
			z := a*v1.Z() + b*v2.Z() + c*v3.Z()

			at := meta.At(ux, vy)

			rr, gg, bb, aa := at.RGBA()
			screen.SetColor(x, y, uint8(rr), uint8(gg), uint8(bb), uint8(aa), z)
		}
	}
}

func getXy1(x, y float64) (int, int) {
	//return int(x*100) + 500, -int(y*100) + 500 + 400
	return int(x*300) + 500, -int(y*300) + 500
}
