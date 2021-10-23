package comm

import (
	"raster-go/gl"
	"raster-go/model3d"
)

func Scene01() *model3d.Scene {

	scene := model3d.NewScene(300, 300)

	scene.AddChild(GetNode0())

	return scene
}

func Scene02() *model3d.Scene {

	scene := model3d.NewScene(300, 300)

	scene.AddChild(GetNode1())

	return scene
}

func Scene03() *model3d.Scene {

	scene := model3d.NewScene(300, 300)

	node := GetNode2()

	for _, v := range node.Obj.V {
		v.Add(*gl.NewVec4f(0, -0.5, 0, 0))
	}

	scene.AddChild(node)

	return scene
}

func Scene05() *model3d.Scene {

	scene := model3d.NewScene(300, 300)

	node1 := GetNode0()
	node2 := GetNode0()

	scene.AddChild(node1)
	scene.AddChild(node2)

	return scene
}

func Scene07() *model3d.Scene {

	scene := model3d.NewScene(300, 300)

	node1 := GetNode3()
	node2 := GetNode0()

	scene.AddChild(node1)
	scene.AddChild(node2)

	return scene
}

func Scene06() *model3d.Scene {

	scene := model3d.NewScene(300, 300)

	node := GetNode2()

	for _, v := range node.Obj.V {
		v.Add(*gl.NewVec4f(0, -0.5, 0, 0))
	}

	scene.AddChild(node)

	node2 := GetFloor()

	for _, v := range node2.Obj.V {
		v.Add(*gl.NewVec4f(0, -0.5, 0, 0))
	}

	scene.AddChild(node2)

	return scene
}
