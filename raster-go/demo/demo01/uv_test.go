package demo01

import (
	"fmt"
	"github.com/Jecced/go-tools/src/imgutil"
	"raster-go/demo/comm"
	"raster-go/demo/gifs"
	"raster-go/gl"
	"raster-go/load"
	"raster-go/ma"
	"raster-go/model3d"
	"testing"
)

func TestUv01(t *testing.T) {

	scene := comm.Scene03()
	path := "../../temp/uv_03.png"
	w, h := scene.Screen.W, scene.Screen.H
	node := scene.Child[0]

	camera := scene.Camera

	camera.SetPosition(0, 0, 5)
	camera.LookAt(node)

	drawScene(scene)

	png := imgutil.CreatPng(w, h)

	// 屏幕中的颜色绘制到png中
	for x := 0; x < scene.Screen.W; x++ {
		for y := 0; y < scene.Screen.H; y++ {
			png.Set(x, y, scene.Screen.GetColor(x, y))
		}
	}

	imgutil.SaveImage(path, png)

}

func TestUv02(t *testing.T) {

	path := "../../temp/uv_01.gif"

	gif := gifs.NewGif(300, 300)

	for i := 0; i < 360; i++ {

		scene := comm.Scene01()
		w, h := scene.Screen.W, scene.Screen.H
		node := scene.Child[0]

		camera := scene.Camera

		x, z := ma.CalcVec2ByAngleDist(float64(i), 5)

		camera.SetPosition(x, 0, z)
		camera.LookAt(node)

		scene.Screen.Clean()
		drawScene(scene)

		png := imgutil.CreatPng(w, h)

		// 屏幕中的颜色绘制到png中
		for x := 0; x < scene.Screen.W; x++ {
			for y := 0; y < scene.Screen.H; y++ {
				png.Set(x, y, scene.Screen.GetColor(x, y))
			}
		}
		gif.Push(png)
		fmt.Println(i)
	}

	gif.Save(path)

	//imgutil.SaveImage(path, png)

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
				vert.Set(vec4.X(), vec4.Y(), vert.Z(), vec4.W())
			}
		}

		// 绘制三角形
		for i, l := 0, node.Obj.FaceLen; i < l; i++ {
			drawTri2(node.Obj, node.Mat, scene.Screen, i)
		}
	}

	//fmt.Println(camera.Nera)
	//mat := camera.GetPerspectiveMat4(-30)
	//fmt.Println(mat)
	//fmt.Println(gl.Mat4MulVec4(mat, gl.NewVec4f(10, 10, -13, 1)).Standardized())
	//fmt.Println(gl.Mat4MulVec4(mat, gl.NewVec4f(10, 10, -14, 1)).Standardized())
	//fmt.Println(gl.Mat4MulVec4(mat, gl.NewVec4f(10, 10, -15, 1)).Standardized())
	//fmt.Println(gl.Mat4MulVec4(mat, gl.NewVec4f(10, 10, -16, 1)).Standardized())
	//fmt.Println(gl.Mat4MulVec4(mat, gl.NewVec4f(10, 10, -17, 1)).Standardized())
	//fmt.Println(gl.Mat4MulVec4(mat, gl.NewVec4f(10, 10, -18, 1)).Standardized())
	//fmt.Println(gl.Mat4MulVec4(mat, gl.NewVec4f(10, 10, -19, 1)).Standardized())
	//fmt.Println(gl.Mat4MulVec4(mat, gl.NewVec4f(10, 10, -20, 1)).Standardized())

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
	x0, y0 := screen.GetXY(v0.X(), v0.Y())
	x1, y1 := screen.GetXY(v1.X(), v1.Y())
	x2, y2 := screen.GetXY(v2.X(), v2.Y())

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

			// 修正透视变形的alpha, beta, gamma
			// 1 / z = (1/z1 * alpha) + (1/z2 * beta) + (1/z3 * gamma)
			uz := 1/v0.Z()*a + 1/v1.Z()*b + 1/v2.Z()*c
			z := 1 / uz

			a = a / v0.Z() * z
			b = b / v1.Z() * z
			c = c / v2.Z() * z

			// UV 坐标 0, 0 在左下角
			ux := int((a*uv0.X() + b*uv1.X() + c*uv2.X()) * float64(meta.MaxX))
			vy := meta.MaxY - int((a*uv0.Y()+b*uv1.Y()+c*uv2.Y())*float64(meta.MaxY))

			at := meta.At(ux, vy)

			rr, gg, bb, aa := at.RGBA()
			screen.SetColor(x, y, uint8(rr), uint8(gg), uint8(bb), uint8(aa), z)
		}
	}
}
