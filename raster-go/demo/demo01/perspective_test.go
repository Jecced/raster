package demo01

import (
	"fmt"
	"github.com/Jecced/go-tools/src/imgutil"
	"raster-go/demo/comm"
	"raster-go/demo/gifs"
	"raster-go/ma"
	"testing"
)

func TestPerspective01(t *testing.T) {

	scene := comm.Scene05()
	path := "../../temp/perspective_01_1.png"
	w, h := scene.Screen.W, scene.Screen.H

	camera := scene.Camera

	x, z := ma.CalcVec2ByAngleDist(float64(90), 20)

	camera.SetPosition(x, 0, z)
	//camera.UsePerspective()
	//camera.SetNera(-20)
	camera.LookAt(scene.Child[0])
	scene.Child[0].SetPosition(-0.4, 0, 0)
	scene.Child[1].SetPosition(0.4, 0, -20)

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

func TestPerspective02(t *testing.T) {

	w, h := 300, 300

	path := "../../temp/perspective_01.gif"

	gif := gifs.NewGif(w, h)

	for i := 0; i < 40; i++ {

		scene := comm.Scene05()
		camera := scene.Camera
		x, z := ma.CalcVec2ByAngleDist(float64(90), 20)

		camera.SetPosition(x, 0, z)
		camera.UsePerspective()
		camera.SetNera(-20)
		camera.LookAt(scene.Child[0])
		scene.Child[0].SetPosition(-0.4, 0, 0)
		zz := i
		if zz > 20 {
			zz -= 20
			zz = 20 - zz
		}
		scene.Child[1].SetPosition(0.4, 0, float64(-zz))

		drawScene(scene)

		png := imgutil.CreatPng(w, h)

		// 屏幕中的颜色绘制到png中
		for x := 0; x < scene.Screen.W; x++ {
			for y := 0; y < scene.Screen.H; y++ {
				png.Set(x, y, scene.Screen.GetColor(x, y))
			}
		}
		gif.Push(png)
	}

	gif.Save(path)
}

func TestPerspective03(t *testing.T) {

	scene := comm.Scene06()
	path := "../../temp/perspective_03_1.png"
	w, h := scene.Screen.W, scene.Screen.H

	camera := scene.Camera

	x, z := ma.CalcVec2ByAngleDist(float64(90), 20)

	camera.SetPosition(x, 10, z)
	camera.UsePerspective()
	camera.SetNera(-20)
	camera.LookAt(scene.Child[0])
	//scene.Child[0].SetPosition(-0.4, 0, 0)
	//scene.Child[1].SetPosition(0.4, 0, -20)

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

func TestPerspective04(t *testing.T) {

	path := "../../temp/perspective_03_1.gif"
	w, h := 300, 300
	gif := gifs.NewGif(w, h)
	for i := 0; i < 360; i++ {

		scene := comm.Scene06()

		camera := scene.Camera

		x, z := ma.CalcVec2ByAngleDist(float64(90+i), 20)

		camera.SetPosition(x, 10, z)
		camera.UsePerspective()
		camera.SetNera(-20)
		camera.LookAt(scene.Child[0])
		//scene.Child[0].SetPosition(-0.4, 0, 0)
		//scene.Child[1].SetPosition(0.4, 0, -20)

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
