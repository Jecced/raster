package load

import (
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
}

func LoadMat(text string) *ObjMat {
	text = strings.ReplaceAll(text, "\r", "")
	lines := strings.Split(text, "\n")

	mat := make(ObjMat)

	var meta ObjMatMeta

	for _, line := range lines {
		if strings.HasPrefix(line, "newmtl") {
			meta = ObjMatMeta{}
			mat[line[7:]] = &meta
			continue
		}
		line = strings.TrimLeft(line, "\t")
		switch true {
		case strings.HasPrefix(line, "Ns"):
			meta.Ns = toInt(line, "Ns")
		case strings.HasPrefix(line, "illum"):
			meta.Illum = toInt(line, "illum")
		case strings.HasPrefix(line, "Ni"):
			meta.Ni = toFloat64(line, "Ni")
		case strings.HasPrefix(line, "d"):
			meta.D = toFloat64(line, "d")
		case strings.HasPrefix(line, "map_Kd"):
			meta.MapKd = toString(line, "map_Kd")
		case strings.HasPrefix(line, "Tf"):
			meta.Tf = toVec3f(line, "Tf")
		case strings.HasPrefix(line, "Ka"):
			meta.Ka = toVec3f(line, "Ka")
		case strings.HasPrefix(line, "Kd"):
			meta.Kd = toVec3f(line, "Kd")
		case strings.HasPrefix(line, "Ks"):
			meta.Ks = toVec3f(line, "Ks")

		}
	}

	return &mat
}

func toInt(line, key string) int {
	to, _ := strconv.Atoi(line[len(key)+1:])
	return to
}

func toFloat64(line, key string) float64 {
	v2, _ := strconv.ParseFloat(line[len(key)+1:], 64)
	return v2
}

func toVec3f(line, key string) gl.Vec3f {
	line = line[len(key)+1:]
	split := strings.Split(line, " ")
	l := len(split)
	x, _ := strconv.ParseFloat(split[0], 64)
	y, _ := strconv.ParseFloat(split[1], 64)
	z := 0.0
	if l > 2 {
		z, _ = strconv.ParseFloat(split[2], 64)
	}
	return gl.Vec3f{X: x, Y: y, Z: z}
}

func toString(line, key string) string {
	return line[len(key)+1:]
}
