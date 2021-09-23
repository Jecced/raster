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

func TestAngle(t *testing.T) {
	for i := 0; i < 360; i++ {
		go run(i)
	}
	select {}
}

func TestOneAngle(t *testing.T) {
	run(90)
}

func getNode() *model3d.Node {
	node1 := model3d.NewNode()
	node1.SetPosition(0, 0, 0)
	node1.SetObjModel("../obj/african/african_head.obj")
	node1.SetObjDefaultMat("../obj/african/african_head_diffuse.png")
	return node1
}

func getNode1() *model3d.Node {
	node1 := model3d.NewNode()
	node1.SetPosition(0, 0, 0)
	node1.SetObjModel("../obj/diablo3_pose.obj")
	node1.SetObjDefaultMat("../obj/diablo3_pose_diffuse.png")
	return node1
}

func getNode2() *model3d.Node {
	node1 := model3d.NewNode()
	node1.SetPosition(0, 0, 0)

	node1.SetObjModel("../obj/Bulbasaur/Bulbasaur.obj")

	// 缩放一下
	for _, v := range node1.Obj.V {
		v.Mul(*gl.NewVec4f(0.2, 0.2, 0.2, 1))
	}
	node1.SetObjMat("../obj/Bulbasaur/Fushigidane.mtl")
	node1.SetMatDiffuse("mat1", "../obj/FushigidaneDh.png")
	node1.SetMatDiffuse("mat2", "../obj/FushigidaneEyeDh.png")
	return node1
}

func getFloor() *model3d.Node {
	node := model3d.NewNode()
	vert := make([]*gl.Vec4f, 0, 4)
	vert = append(vert, gl.NewVec4f(-1, 0, -1, 1))
	vert = append(vert, gl.NewVec4f(1, 0, -1, 1))
	vert = append(vert, gl.NewVec4f(1, 0, 1, 1))
	vert = append(vert, gl.NewVec4f(-1, 0, 1, 1))

	uv := make([]gl.Vec3f, 0, 4)
	uv = append(uv, *gl.NewVec3f(0, 0, 0))
	uv = append(uv, *gl.NewVec3f(0, 1, 0))
	uv = append(uv, *gl.NewVec3f(1, 1, 0))
	uv = append(uv, *gl.NewVec3f(1, 0, 0))

	a := load.ObjFace{Key: "default", V: []int{1, 2, 3}, VT: []int{1, 2, 3}}
	b := load.ObjFace{Key: "default", V: []int{3, 4, 1}, VT: []int{3, 4, 1}}

	face := []load.ObjFace{a, b}

	node.Obj = &load.ObjModel{
		V: vert, VT: uv, Face: face, FaceLen: len(face),
	}
	node.SetObjDefaultMat("../obj/floor_diffuse.png")

	return node
}

func getScene() *model3d.Scene {

	scene := model3d.NewScene(1000, 1000)

	scene.AddChild(getNode2())

	scene.AddChild(getFloor())

	//scene.AddChild(clone(node3))

	//x, z := ma.CalcVec2ByAngleDist(float64(angle), 1)
	//
	//scene.Camera.SetPosition(x, 0.4, z)
	//scene.Camera.LookAt(node1)

	return scene
}

func run(angle int) {

	scene := getScene()
	node := scene.Child[0]

	node.SetPosition(0, 0, 0)
	camera := scene.Camera

	x, z := ma.CalcVec2ByAngleDist(float64(angle), 2)

	camera.SetPosition(x, 0.7, z)
	//camera.SetPosition(0, 100, 10)
	camera.LookAt(node)
	camera.UsePerspective()
	camera.SetNera(-2)

	drawScene(scene)

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

func TestCameraLookAt(t *testing.T) {
	scene := getScene()
	node0 := scene.Child[0]
	camera := scene.Camera

	node0.SetPosition(-2, 0, 0)
	camera.SetPosition(5, 3, 3)

	camera.LookAt(node0)

	camera.UsePerspective()
	camera.SetNera(-10.0)

	drawScene(scene)

	png := imgutil.CreatPng(scene.Screen.W, scene.Screen.H)

	// 屏幕中的颜色绘制到png中
	for x := 0; x < scene.Screen.W; x++ {
		for y := 0; y < scene.Screen.H; y++ {
			png.Set(x, y, scene.Screen.GetColor(x, y))
		}
	}
	imgutil.SaveImage("../out/perspective/tri_diffuse_test.png", png)
}

func Test1111(t *testing.T) {
	runTestPerspective(300)
}

func TestPerspective(t *testing.T) {
	for i := 0; i < 360; i++ {
		go runTestPerspective(i)
	}
	select {}
}

func runTestPerspective(angle int) {

	zz := angle
	if zz > 180 {
		zz = 360 - angle
	}
	scene := getScene()
	node0 := scene.Child[0]
	node1 := scene.Child[1]
	camera := scene.Camera

	//node.SetPosition(0., 0., -10)
	node0.SetPosition(0, 0, -15)
	node1.SetPosition(0, 0.5, -13)

	x, z := ma.CalcVec2ByAngleDist(float64(angle), 1+float64(zz*2)/10)

	//camera.SetPosition(-4, 3, 1+float64(angle*2)/10)
	camera.SetPosition(x, 3, z)

	camera.LookAt(node0)

	//camera.UsePerspective()
	camera.SetNera(-10.0)

	drawScene(scene)

	png := imgutil.CreatPng(scene.Screen.W, scene.Screen.H)

	// 屏幕中的颜色绘制到png中
	for x := 0; x < scene.Screen.W; x++ {
		for y := 0; y < scene.Screen.H; y++ {
			png.Set(x, y, scene.Screen.GetColor(x, y))
		}
	}
	path := fmt.Sprintf("../out/perspective/tri_diffuse_%d.png", angle)
	fmt.Println(path)
	imgutil.SaveImage(path, png)
}

func drawScene(scene *model3d.Scene) {
	camera := scene.Camera

	for _, node := range scene.Child {
		// 模型移动到Node位置
		for _, vert := range node.Obj.V {
			//vert.Add(*gl.NewVec4f(node.Position()))
			x, y, z := node.Position()
			vec4 := gl.NewVec4f(x, y, z, 1)
			vert.Add(*vec4)
			vert.SetW(1)
		}

		// 视窗变换
		// 摄像机摆放到原点, 然后看做相对变换
		for _, vert := range node.Obj.V {
			//vec3, _ := gl.Mat4MulVec3(camera.TR, vert, 1)
			//vert.Set(vec3.X(), vec3.Y(), vec3.Z())
			vec4 := gl.Mat4MulVec4(camera.TR, vert)
			vert.Set(vec4.X(), vec4.Y(), vec4.Z(), vec4.W())
		}

		// 使用透视投影
		if camera.IsPerspective() {
			for _, vert := range node.Obj.V {
				mat := camera.GetPerspectiveMat4(vert.Z())
				vec4 := gl.Mat4MulVec4(mat, vert)
				vec4.Standardized()
				vert.Set(vec4.X(), vec4.Y(), vec4.Z(), vec4.W())
			}
		}

		// 绘制三角形
		for i, l := 0, node.Obj.FaceLen; i < l; i++ {
			drawTri2(node.Obj, node.Mat, scene.Screen, i)
		}
	}

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

func BarycentricDiabloDiffuseTest(v0, v1, v2 *gl.Vec4f, uv0, uv1, uv2 gl.Vec3f, meta *load.ObjMatMeta, screen *model3d.Screen) {
	x0, y0 := getXy1(v0.X(), v0.Y())
	x1, y1 := getXy1(v1.X(), v1.Y())
	x2, y2 := getXy1(v2.X(), v2.Y())

	maxX, maxY, minX, minY := screen.Bound(x0, y0, x1, y1, x2, y2)
	for x := minX; x < maxX; x++ {
		for y := minY; y < maxY; y++ {
			a, b, c := ma.Barycentric(
				// tri
				x0, y0, x1, y1, x2, y2,
				// x+0.5
				float64(x)+0.5,
				// y+0.5
				float64(y)+.5)
			// 判断是否在三角形内
			if a < 0 || b < 0 || c < 0 {
				continue
			}

			z := a*v0.Z() + b*v1.Z() + c*v2.Z()

			//a1, b1, c1 := a, b, c
			//a = a / v0.Z() * z
			//b = b / v1.Z() * z
			//c = c / v2.Z() * z
			//fmt.Println(a, b, c, a1, b1, c1)

			// UV 坐标 0, 0 在左下角
			ux := int((a*uv0.X() + b*uv1.X() + c*uv2.X()) * float64(meta.MaxX))
			vy := meta.MaxY - int((a*uv0.Y()+b*uv1.Y()+c*uv2.Y())*float64(meta.MaxY))

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
