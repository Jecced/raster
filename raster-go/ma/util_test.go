package ma

import (
	"fmt"
	"math"
	"testing"
)

func TestAngle(t *testing.T) {
	for i := 0; i < 360; i++ {

		x, y := CalcVec2ByAngleDist(math.Pi/180*float64(i), 100)
		fmt.Println(i, x, y)
	}

}
