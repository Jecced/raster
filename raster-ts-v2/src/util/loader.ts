export class Loader {

    /**
     * 读取某个纹理图片文件
     * @param path
     */
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

    /**
     * 读取某个文本文件
     * @param path
     */
    public static async loadText(path: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", path);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(xhr.responseText);
                    } else {
                        reject(`error with http code: ${xhr.status}`);
                    }
                }
            };
            xhr.send();
        });
    }
}