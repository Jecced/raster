package model3d

import (
	"image/color"
)

// Pixi 记录屏幕中每个像素的信息
type Pixi struct {
	r      uint8
	g      uint8
	b      uint8
	a      uint8
	z      float64 // 深度缓冲信息, z越大, 越靠近屏幕
	isFull bool    // 是否已经被填充
}

// Clean 清空一个像素信息
func (p *Pixi) Clean() {
	p.r = 0
	p.g = 0
	p.b = 0
	p.a = 0
	p.z = 0
	p.isFull = false
}

func (p Pixi) GetColor() *color.RGBA {
	if !p.isFull {
		return &color.RGBA{}
	}
	return &color.RGBA{R: p.r, G: p.g, B: p.b, A: p.a}
}

func (p *Pixi) SetColor(r, g, b, a uint8, z float64) {
	// 像素已经被填充, 且填充的深度比当前大, 则不能赋予颜色
	if p.isFull && p.z > z {
		return
	}
	p.r = r
	p.g = g
	p.b = b
	p.a = a
	p.z = z
	p.isFull = true
}

type Screen struct {
	W      int
	H      int
	pixies []*Pixi
}

func NewScreen(w, h int) *Screen {
	pixies := make([]*Pixi, 0, 0)
	for i, l := 0, w*h; i < l; i++ {
		pixies = append(pixies, &Pixi{})
	}
	s := &Screen{
		W:      w,
		H:      h,
		pixies: pixies,
	}
	return s
}

func (s *Screen) SetColor(x, y int, r, g, b, a uint8, z float64) {
	if x < 0 || y < 0 || x >= s.W || y >= s.H {
		return
	}
	p := s.pixies[x+y*s.W]
	p.SetColor(r, g, b, a, z)
}

func (s *Screen) GetColor(x, y int) *color.RGBA {
	if x < 0 || y < 0 || x >= s.W || y >= s.H {
		return &color.RGBA{}
	}
	p := s.pixies[x+y*s.W]
	return p.GetColor()
}

func (s Screen) Bound(x1, y1, x2, y2, x3, y3 int) (maxX, maxY, minX, minY int) {
	maxX = s.MaxX(x1, x2, x3)
	maxY = s.MaxY(y1, y2, y3)
	minX = s.MinX(x1, x2, x3)
	minY = s.MinY(y1, y2, y3)
	return
}

func (s *Screen) Clean() {
	for _, pixi := range s.pixies {
		pixi.Clean()
	}
}

func (s Screen) MaxX(a ...int) int {
	return s.min(s.max(a...), s.W)
}

func (s Screen) MaxY(a ...int) int {
	return s.min(s.max(a...), s.H)
}

func (s Screen) MinX(a ...int) int {
	return s.max(s.min(a...), 0)
}

func (s Screen) MinY(a ...int) int {
	return s.max(s.min(a...), 0)
}

func (s Screen) min(a ...int) (out int) {
	out = a[0]
	for i, l := 1, len(a); i < l; i++ {
		if out > a[i] {
			out = a[i]
		}
	}
	return out
}

func (s Screen) max(a ...int) (out int) {
	out = a[0]
	for i, l := 1, len(a); i < l; i++ {
		if out < a[i] {
			out = a[i]
		}
	}
	return out
}
