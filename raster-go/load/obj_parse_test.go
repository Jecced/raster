package load

import (
	"fmt"
	"github.com/Jecced/go-tools/src/fileutil"
	"testing"
)

func TestLoadMat(t *testing.T) {
	path := "../obj/Bulbasaur/Fushigidane.mtl"
	text, _ := fileutil.ReadText(path)
	mat := LoadMat(text)
	fmt.Println(mat)
	get, b := mat.Get("mat2")
	fmt.Println(get, b)
}

func TestLoadObjModel(t *testing.T) {
	path := "../obj/Bulbasaur/Bulbasaur.obj"
	text, _ := fileutil.ReadText(path)
	LoadObjModel(text)
}
