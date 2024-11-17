package demo01

import (
	"fmt"
	"github.com/Jecced/go-tools/src/imgutil"
	"image"
	"image/color"
	"math"
	"raster-go/demo/comm"
	"raster-go/demo/gifs"
	"testing"
)

func TestLine01(t *testing.T) {
	scene := comm.Scene01()
	w, h := scene.Screen.W, scene.Screen.H
	node := scene.Child[0]

	img := imgutil.CreatPng(w, h)

	for _, face := range node.Obj.Face {
		v1 := node.Obj.V[face.V[0]-1]
		v2 := node.Obj.V[face.V[1]-1]
		v3 := node.Obj.V[face.V[2]-1]
		px1, py1 := scene.Screen.GetXY(v1.X(), v1.Y())
		px2, py2 := scene.Screen.GetXY(v2.X(), v2.Y())
		px3, py3 := scene.Screen.GetXY(v3.X(), v3.Y())
		line(px1, py1, px2, py2, img)
		line(px2, py2, px3, py3, img)
		line(px3, py3, px1, py1, img)
	}

	imgutil.SaveImage("../../temp/line_01.png", img)
}

func TestLine02(t *testing.T) {
	scene := comm.Scene01()
	w, h := scene.Screen.W, scene.Screen.H
	node := scene.Child[0]

	gif := gifs.NewGif(w, h)

	for i := 0; i < 360; i++ {

		img := imgutil.CreatPng(w, h)
		for _, v := range node.Obj.V {
			v.RotateY(1)
		}

		for _, face := range node.Obj.Face {
			v1 := node.Obj.V[face.V[0]-1]
			v2 := node.Obj.V[face.V[1]-1]
			v3 := node.Obj.V[face.V[2]-1]
			px1, py1 := scene.Screen.GetXY(v1.X(), v1.Y())
			px2, py2 := scene.Screen.GetXY(v2.X(), v2.Y())
			px3, py3 := scene.Screen.GetXY(v3.X(), v3.Y())
			line(px1, py1, px2, py2, img)
			line(px2, py2, px3, py3, img)
			line(px3, py3, px1, py1, img)
		}
		gif.Push(img)
		fmt.Println(i)
	}
	gif.Save("../../temp/line_01.gif")
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

func abs(a int) int {
	return int(math.Abs(float64(a)))
}
