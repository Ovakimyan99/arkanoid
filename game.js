let game = {
    ctx: null,
    rows: 4,
    columns: 8,
    blocks: [], // массив объектов расположения
    sprites: {
        background: null,
        ball: null,
        platform: null,
        block: [] // массив картинок
    },
    init: function () {
        this.ctx = document.getElementById('mycanvas').getContext('2d');
    },
    setEvents() {

    },
    preload: function (callback) {
        let loaded = 0;
        const required = Object.keys(this.sprites).length;
        const onLoadImage = ()=> {
            ++loaded;
            if (loaded >= required) {
                callback();
            }
        };

        for (let key in this.sprites) {
            this.sprites[key] = new Image();
            this.sprites[key].src = `./img/${key}.png`;
            this.sprites[key].addEventListener('load', onLoadImage)
        }
    },
    run: function () {
        window.requestAnimationFrame(() => {
            this.render();
        });
    },
    create() {
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                this.blocks.push({
                    x: 64 * column + 60,
                    y: 24 * row + 50
                })
            }
        }
    },
    renderBlocks: function () {
        for (let block of this.blocks) {
            // this.block - объект
            // this.sprites.block - картинка, которую мы создаем с 25 строки
            // если пробегаться через for in - получим числа, индексы
            // если через for of, то объекты
            this.ctx.drawImage(this.sprites.block, block.x, block.y);
        }
    },
    render: function () {
        this.ctx.drawImage(this.sprites.background, 0, 0);
        this.ctx.drawImage(this.sprites.ball, 0, 0, this.ball.width, this.ball.height, this.ball.x, this.ball.y, this.ball.width, this.ball.height);
        this.ctx.drawImage(this.sprites.platform, this.platform.x, this.platform.y);
        this.renderBlocks();
    },
    start: function() {
        this.init();
        this.preload(() => {
            this.create();
            this.run();
        });
    }
};

game.ball = {
    x: 320,
    y: 280,
    width: 20,
    height: 20
}

game.platform = {
    x: 280,
    y: 300
}

window.addEventListener("load", () => {
    game.start();
});
