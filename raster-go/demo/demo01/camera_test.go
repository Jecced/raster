package demo01

import (
	"fmt"
	"github.com/Jecced/go-tools/src/imgutil"
	"raster-go/demo/comm"
	"raster-go/demo/gifs"
	"raster-go/ma"
	"testing"
)

// 模型自己旋转的示意图
func TestCamera01(t *testing.T) {

	path := "../../temp/camera01.gif"
	gif := gifs.NewGif(300, 300)
	for i := 0; i < 360; i++ {
		scene := comm.Scene07()
		w, h := scene.Screen.W, scene.Screen.H

		camera := scene.Camera

		x, z := ma.CalcVec2ByAngleDist(float64(60), 50)

		camera.SetPosition(x, 30, z)
		camera.UsePerspective()
		camera.SetNera(-20)
		camera.LookAt(scene.Child[0])
		scene.Child[0].SetPosition(0, 0, 3)
		scene.Child[1].SetPosition(0, 0, 0)

		for _, v := range scene.Child[0].Obj.V {
			v.RotateY(180)
		}

		for _, v := range scene.Child[1].Obj.V {
			v.RotateY(float64(i))
		}

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
}

// 摄像机旋转的示意图
func TestCamera02(t *testing.T) {

	path := "../../temp/camera02.gif"
	gif := gifs.NewGif(300, 300)
	for i := 0; i < 360; i++ {
		scene := comm.Scene07()
		w, h := scene.Screen.W, scene.Screen.H

		camera := scene.Camera

		x, z := ma.CalcVec2ByAngleDist(float64(60), 50)

		xx, zz := ma.CalcVec2ByAngleDist(float64(i), 3)

		camera.SetPosition(x, 30, z)
		camera.UsePerspective()
		camera.SetNera(-20)
		camera.LookAt(scene.Child[0])
		scene.Child[0].SetPosition(xx, 0, zz)
		scene.Child[1].SetPosition(0, 0, 0)

		for _, v := range scene.Child[0].Obj.V {
			v.RotateY(-float64(i) - 90)
		}

		//for _, v := range scene.Child[1].Obj.V {
		//	v.RotateY(float64(i))
		//}

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
}

// 摄像机抬高的示意图
func TestCamera03(t *testing.T) {

	path := "../../temp/camera03.gif"
	gif := gifs.NewGif(300, 300)
	for i := 0; i < 360; i++ {
		scene := comm.Scene07()
		w, h := scene.Screen.W, scene.Screen.H

		camera := scene.Camera

		x, z := ma.CalcVec2ByAngleDist(float64(60), 50)

		xx, zz := ma.CalcVec2ByAngleDist(float64(i), 3)

		camera.SetPosition(x, 30, z)
		camera.UsePerspective()
		camera.SetNera(-20)
		camera.LookAt(scene.Child[0])
		scene.Child[0].SetPosition(xx, 1.5, zz)
		scene.Child[1].SetPosition(0, 0, 0)

		for _, v := range scene.Child[0].Obj.V {
			v.RotateX(20)
			v.RotateY(-float64(i) - 90)
		}

		//for _, v := range scene.Child[1].Obj.V {
		//	v.RotateY(float64(i))
		//}

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
}

func TestCamera4(t *testing.T) {

	i := 90

	path := "../../temp/camera04.png"

	scene := comm.Scene07()
	w, h := scene.Screen.W, scene.Screen.H

	camera := scene.Camera

	x, z := ma.CalcVec2ByAngleDist(float64(0), 50)

	xx, zz := ma.CalcVec2ByAngleDist(float64(i), 2.5)

	camera.SetPosition(x, 40, z)
	camera.UsePerspective()
	camera.SetNera(-20)
	camera.LookAt(scene.Child[0])
	scene.Child[0].SetPosition(xx, 1, zz)
	scene.Child[1].SetPosition(0, 0, 0)

	for _, v := range scene.Child[0].Obj.V {
		v.RotateX(20)
		v.RotateY(-float64(i) - 90)
		//v.Scale(10)
	}

	//for _, v := range scene.Child[1].Obj.V {
	//	v.RotateY(float64(i))
	//}

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
