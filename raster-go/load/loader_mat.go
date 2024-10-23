package load

import (
	"github.com/Jecced/go-tools/src/fileutil"
	"github.com/Jecced/go-tools/src/imgutil"
	"image"
	"image/color"
	"raster-go/gl"
	"strconv"
	"strings"
)

type ObjMatMeta struct {
	Ns    int
	Ni    float64
	D     float64
	Tf    gl.Vec3f
	Illum int
	Ka    gl.Vec3f
	Kd    gl.Vec3f
	Ks    gl.Vec3f
	MapKd string

	Diffuse image.Image
	MaxX    int
	MaxY    int
}

func (o *ObjMatMeta) At(x, y int) color.Color {
	return (o.Diffuse).At(x, y)
}

// ObjMat Obj模型材质描述文件
type ObjMat map[string]*ObjMatMeta

func (o *ObjMat) Get(key string) (*ObjMatMeta, bool) {
	meta, ok := (*o)[key]
	return meta, ok
}

func (o *ObjMat) SetMapKd(key, mapKey string) {
	get, ok := o.Get(key)
	if !ok {
		return
	}
	get.MapKd = mapKey
	get.Diffuse, _ = imgutil.LoadImage(mapKey)

	get.MaxX = (get.Diffuse).Bounds().Max.X
	get.MaxY = (get.Diffuse).Bounds().Max.Y
}

func LoadMatByPath(path string) (*ObjMat, error) {
	text, err := fileutil.ReadText(path)
	if err != nil {
		return nil, err
	}
	return LoadMat(text), nil
}

func CreatDefault() *ObjMat {
	mat := make(ObjMat)
	return &mat
}

func CreatDefaultWithDiffuse(imgPath string) *ObjMat {
	mat := make(ObjMat)
	mat["default"] = &ObjMatMeta{}
	mat.SetMapKd("default", imgPath)
	return &mat
}

func LoadMat(text string) *ObjMat {
	text = strings.ReplaceAll(text, "\r", "")
	lines := strings.Split(text, "\n")

	mat := make(ObjMat)

	//var meta ObjMatMeta
	var key string

	for _, line := range lines {
		if strings.HasPrefix(line, "newmtl") {
			//meta =
			key = line[7:]
			mat[key] = &ObjMatMeta{}
			continue
		}
		line = strings.TrimLeft(line, "\t")
		switch true {
		case strings.HasPrefix(line, "Ns"):
			mat[key].Ns = toInt(line, "Ns")
		case strings.HasPrefix(line, "illum"):
			mat[key].Illum = toInt(line, "illum")
		case strings.HasPrefix(line, "Ni"):
			mat[key].Ni = toFloat64(line, "Ni")
		case strings.HasPrefix(line, "d"):
			mat[key].D = toFloat64(line, "d")
		case strings.HasPrefix(line, "map_Kd"):
			mat[key].MapKd = toString(line, "map_Kd")
		case strings.HasPrefix(line, "Tf"):
			mat[key].Tf = toVec3f(line, "Tf")
		case strings.HasPrefix(line, "Ka"):
			mat[key].Ka = toVec3f(line, "Ka")
		case strings.HasPrefix(line, "Kd"):
			mat[key].Kd = toVec3f(line, "Kd")
		case strings.HasPrefix(line, "Ks"):
			mat[key].Ks = toVec3f(line, "Ks")

		}
	}

	return &mat
}

func toInt(line, key string) int {
	line = strings.Trim(line, " ")
	to, _ := strconv.Atoi(line[len(key)+1:])
	return to
}

func toFloat64(line, key string) float64 {
	line = strings.Trim(line, " ")
	v2, _ := strconv.ParseFloat(line[len(key)+1:], 64)
	return v2
}

func toVec3f(line, key string) gl.Vec3f {
	line = line[len(key)+1:]
	line = strings.Trim(line, " ")
	split := strings.Split(line, " ")
	l := len(split)
	x, _ := strconv.ParseFloat(split[0], 64)
	y, _ := strconv.ParseFloat(split[1], 64)
	z := 0.0
	if l > 2 {
		z, _ = strconv.ParseFloat(split[2], 64)
	}
	//return gl.Vec3f{X: x, Y: y, Z: z}
	return *gl.NewVec3f(x, y, z)
}

func toVec3fAddr(line, key string) *gl.Vec3f {
	f := toVec3f(line, key)
	return &f
}

func toVec4fAddr(line, key string) *gl.Vec4f {
	f := toVec3f(line, key)
	return gl.NewVec4f(f.X(), f.Y(), f.Z(), 1)
}

func toString(line, key string) string {
	return line[len(key)+1:]
}
