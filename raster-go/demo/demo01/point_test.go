package demo01

import (
	"fmt"
	"github.com/Jecced/go-tools/src/imgutil"
	"image/color"
	"raster-go/demo/comm"
	"raster-go/demo/gifs"
	"testing"
)

func TestPoint01(t *testing.T) {
	scene := comm.Scene02()
	w, h := scene.Screen.W, scene.Screen.H
	node := scene.Child[0]

	img := imgutil.CreatPng(w, h)

	black := color.RGBA{
		R: 0,
		G: 0,
		B: 0,
		A: 255,
	}

	for _, v := range node.Obj.V {
		x, y := scene.Screen.GetXY(v.X(), v.Y())
		img.Set(x, y, black)
		img.Set(x+1, y, black)
		img.Set(x, y+1, black)
		img.Set(x+1, y+1, black)
	}

	imgutil.SaveImage("../../temp/02.png", img)
}

func TestPoint02(t *testing.T) {
	scene := comm.Scene01()
	w, h := scene.Screen.W, scene.Screen.H
	node := scene.Child[0]

	gif := gifs.NewGif(w, h)

	black := color.RGBA{
		R: 0,
		G: 0,
		B: 0,
		A: 255,
	}

	for i := 0; i < 360; i++ {
		img := imgutil.CreatPng(w, h)
		for _, v := range node.Obj.V {
			v.RotateY(1)
			x, y := scene.Screen.GetXY(v.X(), v.Y())
			img.Set(x, y, black)
			img.Set(x+1, y, black)
			img.Set(x, y+1, black)
			img.Set(x+1, y+1, black)

		}
		gif.Push(img)
		fmt.Println(i)
	}

	gif.Save("../../temp/gif01.gif")

}
