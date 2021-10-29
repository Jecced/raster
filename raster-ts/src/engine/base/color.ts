/**
 * 用32个二进制来保存rgba值, 即 4字节 无符号int类型
 * 0000 0000 | 0000 0000 | 0000 0000 | 0000 0000
 *    alpha  |   blue    |   green   |    red
 * @param r [00-08) 位
 * @param g [08-16) 位
 * @param b [16-24) 位
 * @param a [24-32) 位
 */
export class Color {

    public static WHITE = new Color(255, 255, 255, 255);
    public static BLACK = new Color(0, 0, 0, 255);
    public static RED = new Color(255, 0, 0, 255);
    public static GREEN = new Color(0, 255, 0, 255);
    public static BLUE = new Color(0, 0, 255, 255);

    private _val: number = 0;

    constructor(r = 0, g = 0, b = 0, a = 255) {
        r &= 0xff;
        g &= 0xff;
        b &= 0xff;
        a &= 0xff;
        this._val = (a << 24 | b << 16 | g << 8 | r) >>> 0;
    }

    get r(): number {
        return this._val & 0x000000ff;
    }

    set r(v: number) {
        this._val = (this._val & 0xffffff00 | v & 255 << 0) >>> 0;
    }

    get g(): number {
        return (this._val & 0x0000ff00) >> 8;
    }

    set g(v: number) {
        this._val = (this._val & 0xffffff00 | v & 255 << 8) >>> 0;
    }


    get b(): number {
        return (this._val & 0x00ff0000) >> 16;
    }

    set b(v: number) {
        this._val = (this._val & 0xffffff00 | v & 255 << 16) >>> 0;
    }

    get a(): number {
        return (this._val & 0xff000000) >>> 24;
    }

    set a(v: number) {
        this._val = (this._val & 0xffffff00 | v & 255 << 24) >>> 0;
    }

    public toString(): string {
        return `color(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }

    public string():string{
        return this.toString()
    }

    /**
     * 16进制字符串转颜色类
     * example:
     *  Color.fromHEX("#fff")
     *  Color.fromHEX("#ffff")
     *  Color.fromHEX("#cccccc")
     *  Color.fromHEX("#ccccccff")
     * @param hexString
     */
    public static fromHEX(hexString: string): Color {
        hexString = (hexString.indexOf("#") === 0) ? hexString.substring(1) : hexString;
        let r = 0, g = 0, b = 0, a = 255;
        if (hexString.length > 4) {
            r = parseInt(hexString.substr(0, 2), 16) || 0;
            g = parseInt(hexString.substr(2, 2), 16) || 0;
            b = parseInt(hexString.substr(4, 2), 16) || 0;
            a = parseInt(hexString.substr(6, 2), 16) || 255;
        } else {
            r = parseInt(hexString.charAt(0) + hexString.charAt(0), 16) || 0;
            g = parseInt(hexString.charAt(1) + hexString.charAt(1), 16) || 0;
            b = parseInt(hexString.charAt(2) + hexString.charAt(2), 16) || 0;
            a = parseInt(hexString.charAt(3) + hexString.charAt(3), 16) || 255;
        }
        return new Color(r, g, b, a);
    }
}