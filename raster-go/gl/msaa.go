package gl

import "raster-go/ma"

// Msaa 反走样抗锯齿,对tri进行模糊操作 msaa x2, x4, x8, x16
// 一个像素进行拆分成多个像素
func Msaa(msaa, x1, y1, x2, y2, x3, y3 int, x, y int) float64 {

	base := 1.0 / float64(msaa)

	size := msaa * msaa
	count := 0

	for xx, yy := 0, 0; yy < msaa; {

		xxx := float64(x) + float64(xx)*base
		yyy := float64(y) + float64(yy)*base

		if ma.Inside(x1, y1, x2, y2, x3, y3, xxx, yyy) {
			count++
		}

		xx++
		if xx >= msaa {
			yy++
			xx = 0
		}
	}
	return float64(count) / float64(size)
}
