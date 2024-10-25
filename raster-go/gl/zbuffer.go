package gl

// https://github.com/laomoi/toy-raster/blob/29a79d96d255d858ca1080e8445f993326d5df90/src/core/shading/buffer.ts#L33

// ZBuffer  深度检测
type ZBuffer struct {
	Width           int
	Height          int
	FrameBuffer     []uint8
	buff            []float64
	buffFlag        []bool
	msaa            int
	MsaaSize        int
	msaaColorBuffer []uint8
}

// NewZBuffer 深度检测
// msaa < 2 则不启动
func NewZBuffer(width, height int, msaa int) *ZBuffer {
	var buff []float64
	var buffFlag []bool
	if msaa > 1 {
		buff = make([]float64, width*height*msaa*msaa)
		buffFlag = make([]bool, width*height*msaa*msaa)
	} else {
		buff = make([]float64, width*height)
		buffFlag = make([]bool, width*height)
	}
	z := &ZBuffer{
		Width:       width,
		Height:      height,
		buff:        buff,
		FrameBuffer: make([]uint8, width*height*4),
		msaa:        msaa,
		buffFlag:    buffFlag,
		MsaaSize:    msaa * msaa,
	}
	if z.UseMass() {
		z.msaaColorBuffer = make([]uint8, width*height*4*z.MsaaSize)
	}
	return z
}

func (z *ZBuffer) UseMass() bool {
	return z.msaa > 1
}

func (z *ZBuffer) getZIndex(x, y, index int) int {
	if z.UseMass() {
		return (z.Width*y+x)*z.MsaaSize + index
	}
	return z.Width*y + x
}

func (z *ZBuffer) ZTest(x, y int, rhw float64, index int) bool {
	i := z.getZIndex(x, y, index)
	if !z.buffFlag[i] {
		return true
	}
	if z.buff[i] > rhw {
		return true
	}
	return false
}

func (z *ZBuffer) SetZ(x, y int, rhw float64, index int) {
	i := z.getZIndex(x, y, index)
	z.buff[i] = rhw
	z.buffFlag[i] = true
}

func (z *ZBuffer) SetColor(x, y int, r, g, b, a uint8, index int) {
	if !z.UseMass() {
		z.SetFrameBufferPixel(x, y, r, g, b, a)
		return
	}
	i := (z.Width*y+x)*4*z.MsaaSize + index*z.MsaaSize
	z.msaaColorBuffer[i+0] = r
	z.msaaColorBuffer[i+1] = g
	z.msaaColorBuffer[i+2] = b
	z.msaaColorBuffer[i+3] = a
}

func (z *ZBuffer) SetFrameBufferPixel(x, y int, r, g, b, a uint8) {
	i := (z.Width*y + x) * 4
	z.FrameBuffer[i+0] = r
	z.FrameBuffer[i+1] = g
	z.FrameBuffer[i+2] = b
	// TODO 我觉得应该是指定值, 而不是255
	//z.FrameBuffer[i+3] = a
	z.FrameBuffer[i+3] = 255
}

// Clear 默认背景色
func (z *ZBuffer) Clear(r, g, b, a uint8) {
	for i, l := 0, len(z.FrameBuffer); i < l; i += 4 {
		z.FrameBuffer[i+0] = r
		z.FrameBuffer[i+1] = g
		z.FrameBuffer[i+2] = b
		z.FrameBuffer[i+3] = a
	}
	for i, l := 0, len(z.buffFlag); i < l; i++ {
		z.buffFlag[i] = false
		z.buff[i] = 0
	}
	if !z.UseMass() {
		return
	}
	for i, l := 0, len(z.msaaColorBuffer); i < l; i += 4 {
		z.msaaColorBuffer[i+0] = r
		z.msaaColorBuffer[i+1] = b
		z.msaaColorBuffer[i+2] = g
		z.msaaColorBuffer[i+3] = a
	}
}

func (z *ZBuffer) ApplyMSAAFilter(x, y int) {
	if !z.UseMass() {
		return
	}
	s := (z.Width*y + x) * 4 * z.MsaaSize
	var r, g, b, a float64 = 0, 0, 0, 0
	for i := 0; i < 4; i++ {
		index := s + i*4
		r += 0.25 * float64(z.msaaColorBuffer[index+0])
		g += 0.25 * float64(z.msaaColorBuffer[index+1])
		b += 0.25 * float64(z.msaaColorBuffer[index+2])
		a += 0.25 * float64(z.msaaColorBuffer[index+3])
	}
	z.SetFrameBufferPixel(x, y, uint8(r), uint8(g), uint8(b), uint8(a))
}
