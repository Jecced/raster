package test

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

func Test2222(t *testing.T) {
	for i := 0; i < 360; i++ {
		run(i)
	}
}

func run(angle int) {
	up := gl.NewVec3f(0, 1, 0)

	scene := model3d.NewScene(1000, 1000)

	node1 := model3d.NewNode()
	node1.SetPosition(0, 0, 0)
	node1.SetObjModel("../obj/african/african_head.obj")
	node1.SetObjDefaultMat("../obj/african/african_head_diffuse.png")

	scene.AddChild(node1)

	x, z := ma.CalcVec2ByAngleDist(float64(angle), 1)

	scene.Camera.SetPosition(x, 0.4, z)
	scene.Camera.LookAt(node1, *up)

	node := scene.Child[0]

	camera := scene.Camera

	// 摄像机摆放到原点
	for _, vert := range node.Obj.V {
		vec3, _ := gl.Mat4MulVec3(camera.TR, vert, 1)
		vert.Set(vec3.X(), vec3.Y(), vec3.Z())
		//fmt.Println(vert, vec3)
	}

	// 绘制三角形
	for i, l := 0, node.Obj.FaceLen; i < l; i++ {
		drawTri2(node.Obj, node.Mat, scene.Screen, i)
	}

	png := imgutil.CreatPng(scene.Screen.W, scene.Screen.H)

	// 屏幕中的颜色绘制到png中
	for x := 0; x < scene.Screen.W; x++ {
		for y := 0; y < scene.Screen.H; y++ {
			png.Set(x, y, scene.Screen.GetColor(x, y))
		}
	}
	path := "../out/angle/tri_diffuse_" + strconv.Itoa(angle) + ".png"
	fmt.Println(path)
	imgutil.SaveImage(path, png)
}

func Test1111(t *testing.T) {
	up := gl.NewVec3f(0, 1, 0)

	scene := model3d.NewScene(1000, 1000)

	node1 := model3d.NewNode()
	node1.SetPosition(0, 0, 0)
	node1.SetObjModel("../obj/african/african_head.obj")
	node1.SetObjDefaultMat("../obj/african/african_head_diffuse.png")

	scene.AddChild(node1)
	scene.Camera.SetPosition(0.3, 0.4, 1.1)
	scene.Camera.LookAt(node1, *up)

	node := scene.Child[0]

	camera := scene.Camera

	// 摄像机摆放到原点, 然后看做相对运动
	for _, vert := range node.Obj.V {
		vec3, _ := gl.Mat4MulVec3(camera.TR, vert, 1)
		vert.Set(vec3.X(), vec3.Y(), vec3.Z())
		//fmt.Println(vert, vec3)
	}

	// 绘制三角形
	for i, l := 0, node.Obj.FaceLen; i < l; i++ {
		drawTri2(node.Obj, node.Mat, scene.Screen, i)
	}

	png := imgutil.CreatPng(scene.Screen.W, scene.Screen.H)

	// 屏幕中的颜色绘制到png中
	for x := 0; x < scene.Screen.W; x++ {
		for y := 0; y < scene.Screen.H; y++ {
			png.Set(x, y, scene.Screen.GetColor(x, y))
		}
	}
	imgutil.SaveImage("../out/tri_diffuse2.png", png)
}

func drawTri2(obj *load.ObjModel, mat *load.ObjMat, screen *model3d.Screen, i int) {
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
	BarycentricDiabloDiffuseTest(v1, v2, v3, uv0, uv1, uv2, meta, screen)
}

func BarycentricDiabloDiffuseTest(v1, v2, v3 *gl.Vec3f, uv0, uv1, uv2 gl.Vec3f, meta *load.ObjMatMeta, screen *model3d.Screen) {
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
