package model3d

import (
	"raster-go/gl"
	"raster-go/load"
)

type Node struct {
	position *gl.Vec4f // 位置

	Obj *load.ObjModel

	Mat *load.ObjMat
}

func NewNode() *Node {
	node := &Node{
		position: gl.NewVec4f(0, 0, 0, 1),
	}
	return node
}

func (n *Node) SetObjModel(path string) error {
	obj, err := load.LoadObjModelByPath(path)
	if err != nil {
		return err
	}
	n.Obj = obj
	return nil
}

func (n *Node) SetObjDefaultMat(diffuse string) {
	mat := load.CreatDefaultWithDiffuse(diffuse)
	n.Mat = mat
}

func (n *Node) SetObjMat(mat string) error {
	loadMat, err := load.LoadMatByPath(mat)
	if err != nil {
		return err
	}
	n.Mat = loadMat
	return nil
}

func (n *Node) SetMatDiffuse(key, diffuse string) {
	n.Mat.SetMapKd(key, diffuse)
}

func (n *Node) SetPosition(x, y, z float64) {
	if n.position == nil {
		n.position = gl.NewVec4f(x, y, z, 1)
	} else {
		n.position.Set(x, y, z, 1)
	}
}

func (n *Node) Position() (float64, float64, float64) {
	return n.position.X(), n.position.Y(), n.position.Z()
}
