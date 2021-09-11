package raster_go

import (
	"github.com/Jecced/go-tools/src/fileutil"
	"raster-go/load"
	"testing"
)

func TestLoadObjModel(t *testing.T) {
	objPath := "obj/Bulbasaur/Bulbasaur.obj"
	matPath := "obj/Bulbasaur/Fushigidane.mtl"
	objText, _ := fileutil.ReadText(objPath)
	matText, _ := fileutil.ReadText(matPath)
	objMat := load.LoadMat(matText)
	model := load.LoadObjModel(objText)
	model.Mat = objMat

}
