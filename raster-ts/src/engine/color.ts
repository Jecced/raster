export class Color {

    public static WHITE = new Color(255, 255, 255, 255);
    public static BLACK = new Color(0, 0, 0, 255);
    public static RED = new Color(255, 0, 0, 255);
    public static GREEN = new Color(0, 255, 0, 255);
    public static BLUE = new Color(0, 0, 255, 255);

    public r: number = 0;
    public g: number = 0;
    public b: number = 0;
    public a: number = 0;

    constructor(r = 0, g = 0, b = 0, a = 255) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    public static fromHEX(hexString: string): Color {
        hexString = (hexString.indexOf("#") === 0) ? hexString.substring(1) : hexString;
        const out = new Color();
        if (hexString.length > 4) {
            out.r = parseInt(hexString.substr(0, 2), 16) || 0;
            out.g = parseInt(hexString.substr(2, 2), 16) || 0;
            out.b = parseInt(hexString.substr(4, 2), 16) || 0;
            out.a = parseInt(hexString.substr(6, 2), 16) || 255;
        } else {
            out.r = parseInt(hexString.substr(0, 1), 16) || 0;
            out.g = parseInt(hexString.substr(1, 1), 16) || 0;
            out.b = parseInt(hexString.substr(2, 1), 16) || 0;
            out.a = parseInt(hexString.substr(3, 1), 16) || 255;
        }
        return out;
    }
}