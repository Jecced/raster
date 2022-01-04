export class Bytes {

    private static zBufferCopy2FrameBuffer: Float32Array = undefined;

    public static ZBuffer2FrameBuffer(z: Float32Array): Float32Array {
        if (!this.zBufferCopy2FrameBuffer) {
            this.zBufferCopy2FrameBuffer = new Float32Array(z.length * 4);
        }
        const copy = this.zBufferCopy2FrameBuffer;
        for (let i = 0, len = z.length; i < len; i++) {
            const v = (z[i] + 1) * 0.5;
            copy[i * 4] = v;
            copy[i * 4 + 1] = v;
            copy[i * 4 + 2] = v;
            copy[i * 4 + 3] = 1;
        }
        return copy;
    }
}