export class Loader {

    public static async loadImg(path: string): Promise<ImageData> {
        return new Promise<ImageData>(resolve => {
            let img = new Image();
            img.crossOrigin = "*";
            img.onload = function() {
                const width = img.width;
                const height = img.height;
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");
                canvas.width = width;
                canvas.height = height;
                context.drawImage(img, 0, 0, width, height);
                const imageData = context.getImageData(0, 0, width, height);
                img = undefined;
                resolve(imageData);
            };
            img.src = path;
        });
    }
}