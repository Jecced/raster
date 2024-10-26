package gl

// Color 颜色类
type Color struct {
	R uint8
	G uint8
	B uint8
	A uint8
}

func CalculateBlend(a1, a2, c1, c2 float64) float64 {
	return (c1*a1*(1.0-a2) + c2*a2) / (a1 + a2 - a1*a2)
}

// BlendColor 混合两个rgba
// https://blog.csdn.net/qq_21950929/article/details/78989215
func BlendColor(color1, color2 *Color) *Color {
	fa1 := float64(color1.A) / 255.0
	fa2 := float64(color2.A) / 255.0
	alphaBlend := fa1 + fa2 - fa1*fa2

	fr1 := float64(color1.R) / 255.0
	fr2 := float64(color2.R) / 255.0
	redBlend := CalculateBlend(fa1, fa2, fr1, fr2)

	fg1 := float64(color1.G) / 255.0
	fg2 := float64(color2.G) / 255.0
	greenBlend := CalculateBlend(fa1, fa2, fg1, fg2)

	fb1 := float64(color1.B) / 255.0
	fb2 := float64(color2.B) / 255.0
	blueBlend := CalculateBlend(fa1, fa2, fb1, fb2)

	a := uint8(alphaBlend * 255)
	r := uint8(redBlend * 255)
	g := uint8(greenBlend * 255)
	b := uint8(blueBlend * 255)
	return &Color{
		R: r,
		G: g,
		B: b,
		A: a,
	}
}
