package load

import (
	"github.com/Jecced/go-tools/src/fileutil"
	"raster-go/gl"
	"strconv"
	"strings"
)

type ObjFace struct {
	V   []int
	VT  []int
	VN  []int
	Key string
}

func toFace(line, key string) ObjFace {
	f := ObjFace{Key: key}
	line = line[2:]
	vers := strings.Split(line, " ")

	v := make([]int, 3, 3)
	t := make([]int, 3, 3)
	n := make([]int, 3, 3)

	for i := 0; i < 3; i++ {
		fsplit := strings.Split(vers[i], "/")
		v[i], _ = strconv.Atoi(fsplit[0])
		if len(fsplit) > 1 {
			t[i], _ = strconv.Atoi(fsplit[1])
		}

		if len(fsplit) > 2 {
			n[i], _ = strconv.Atoi(fsplit[2])
		}
	}
	f.V = v
	f.VN = n
	f.VT = t
	return f
}

// ObjModel 3D 模型描述文件
type ObjModel struct {
	Mat     *ObjMat    // 材质部分
	V       []gl.Vec3f // 顶点
	VT      []gl.Vec3f // UV
	VN      []gl.Vec3f // 法线
	Face    []ObjFace  // 面信息
	FaceLen int        // 面数量
}

func LoadObjModelByPath(path string) (*ObjModel, error) {
	text, err := fileutil.ReadText(path)
	if err != nil {
		return nil, err
	}
	return LoadObjModel(text), nil
}

func LoadObjModel(text string) *ObjModel {
	var V = make([]gl.Vec3f, 0, 0)
	var VT = make([]gl.Vec3f, 0, 0)
	var VN = make([]gl.Vec3f, 0, 0)
	var Face = make([]ObjFace, 0, 0)

	var matKey string

	text = strings.ReplaceAll(text, "\r", "")
	lines := strings.Split(text, "\n")
	for _, line := range lines {
		switch true {
		case strings.HasPrefix(line, "v "):
			V = append(V, toVec3f(line, "v"))
		case strings.HasPrefix(line, "vt "):
			VT = append(VT, toVec3f(line, "vt"))
		case strings.HasPrefix(line, "vn "):
			VN = append(VN, toVec3f(line, "vn"))
		case strings.HasPrefix(line, "f "):
			Face = append(Face, toFace(line, matKey))
		case strings.HasPrefix(line, "usemtl "):
			matKey = line[7:]
		}
	}

	return &ObjModel{
		V: V, VT: VT, VN: VN, Face: Face, FaceLen: len(Face),
	}
}
