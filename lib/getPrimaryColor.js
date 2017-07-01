
((doc, win) => {
    class primaryColor {
        constructor() {
            this.colors = {};
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
        }

        getPrimaryColor(options = {
            cover: "",
            success: () => { },
            error: () => { }
        }) {
            const {
                cover,
                success,
                error
            } = options;

            if (!cover) error && error(new Error('cover can not be empty'));


            this.loadCover(cover).then((img) => {
                this.canvas.width = img.width;
                this.canvas.height = img.height;
                this.ctx.drawImage(img, 0, 0, img.width, img.height);
                const { data, width: imgDataWidth, height: imgdataHeight } = this.ctx.getImageData(0, 0, img.width, img.height);
                for (let i = 0, len = imgDataWidth * imgdataHeight; i < len; i++) {
                    const [
                        r, g, b, a
                    ] = [
                            data[i * 4],
                            data[i * 4 + 1],
                            data[i * 4 + 2],
                            data[i * 4 + 3]
                        ];

                    const rgba = `rgba(${r},${g},${b},${a})`;

                    if (this.colors[rgba]) {
                        this.colors[rgba].num++
                    } else {
                        this.colors[rgba] = {
                            color: rgba,
                            num: 1
                        }
                    }

                }
                const primaryColor = this.getMax(this.colors);
                success && success(primaryColor)
            })
        }
        getMax(data) {
            const sort = this.getValues(data).sort((a, b) => a.num - b.num);
            return sort[sort.length - 1]['color']
        }
        loadCover(cover) {
            return new Promise((res, rej) => {
                const img = new Image();
                img.src = cover;
                img.onload = res(img);
                img.onerror = rej;
            })
        }
        getValues(obj) {
            return Object.values && Object.values(obj) || Object.keys(obj).map(v => obj[v])
        }
    }
    window.primaryColor = primaryColor;
})(document, window)
