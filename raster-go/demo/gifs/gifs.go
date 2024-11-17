package gifs

import (
	"image"
	"image/color"
	"image/color/palette"
	"image/draw"
	"image/gif"
	"os"
)

type Gif struct {
	disposals []byte
	images    []*image.Paletted
	delays    []int
	W         int
	H         int
}

func NewGif(w, h int) *Gif {
	return &Gif{
		W: w,
		H: h,
	}
}

func (g *Gif) Push(img image.Image) {
	cp := getPalette(img)
	//cp:=append(palette.WebSafe,color.Transparent)
	g.disposals = append(g.disposals, gif.DisposalBackground) //透明图片需要设置
	p := image.NewPaletted(image.Rect(0, 0, g.W, g.H), cp)
	draw.Draw(p, p.Bounds(), img, image.ZP, draw.Src)
	g.images = append(g.images, p)
	g.delays = append(g.delays, 4)
}

func (g *Gif) Save(path string) error {
	giff := &gif.GIF{
		Image:     g.images,
		Delay:     g.delays,
		LoopCount: -1,
		Disposal:  g.disposals,
	}
	f, err := os.Create(path)
	if err != nil {
		return err
	}
	defer func() { _ = f.Close() }()
	err = gif.EncodeAll(f, giff)
	return err
}

func getPalette(m image.Image) color.Palette {
	p := color.Palette{color.RGBA{0x00, 0x00, 0x00, 0x00}}
	p9 := color.Palette(palette.Plan9)
	b := m.Bounds()
	black := false
	for y := b.Min.Y; y < b.Max.Y; y++ {
		for x := b.Min.X; x < b.Max.X; x++ {
			c := m.At(x, y)
			cc := p9.Convert(c)
			if cc == p9[0] {
				black = true
			}
			if isInPalette(p, cc) == -1 {
				p = append(p, cc)
			}
		}
	}
	if len(p) < 256 && black == true {
		p[0] = color.RGBA{0x00, 0x00, 0x00, 0x00} // transparent
		p = append(p, p9[0])
	}
	return p
}

func isInPalette(p color.Palette, c color.Color) int {
	ret := -1
	for i, v := range p {
		if v == c {
			return i
		}
	}
	return ret
}
