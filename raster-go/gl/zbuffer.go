package gl

// https://github.com/laomoi/toy-raster/blob/29a79d96d255d858ca1080e8445f993326d5df90/src/core/shading/buffer.ts#L33

type ZBuffer interface {
	//Get() string
}

// ZBufferNormal  深度检测
type ZBufferNormal struct {
	Width       int
	Height      int
	ZBuffer     []float64
	FrameBuffer []uint8
}

// ZBufferMsaa 带MSAA的深度检测
type ZBufferMsaa struct {
	*ZBufferNormal
	msaaColorBuffer []uint8
}

// NewZBufferNormal 深度检测
func NewZBufferNormal(width, height int) ZBuffer {
	z := &ZBufferNormal{}
	return z
}

// NewZBufferMsaa 带msaa的深度检测
// msaa : 2 => 2x2过滤
func NewZBufferMsaa(width, height int, msaa int) ZBuffer {

	normal := &ZBufferNormal{}
	z := &ZBufferMsaa{
		normal,
		make([]uint8, width*height*4*msaa*msaa),
	}
	return z
}
