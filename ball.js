export function createBallSketch(containerId) {
const sketch = (p) => {
    let a = 3; // 缩放比例
    let x = 204.02; // x 位置
    let y = -800; // 初始 y 位置

    let offsetX, offsetY;
    let angleOffset = 0;

    let ballImg;

    let letters = [
        // Grooming
        {char: "G", x: 213.57, y: 477.72, angle: 73.5},
        {char: "r", x: 220.71, y: 501, angle: 68.19},
        {char: "o", x: 226.32, y: 515.32, angle: 63.2},
        {char: "o", x: 235.92, y: 534.33, angle: 57.48},
        {char: "m", x: 246.64, y: 551.86, angle: 50.46},
        {char: "i", x: 267.77, y: 576.59, angle: 44.66},
        {char: "n", x: 275.78, y: 584.75, angle: 40.17},
        {char: "g", x: 292.11, y: 598.49, angle: 34.53},

        // Boarding
        {char: "B", x: 359.82, y: 636.51, angle: 9.73},
        {char: "o", x: 382.5, y: 640.37, angle: 6.32},
        {char: "a", x: 404.14, y: 642.69, angle: 2.86},
        {char: "r", x: 424.78, y: 643.67, angle: 0},
        {char: "d", x: 440.62, y: 643.74, angle: -2.86},
        {char: "i", x: 463.36, y: 642.41, angle: -5.71},
        {char: "n", x: 475.29, y: 641.31, angle: -8.63},
        {char: "g", x: 496.78, y: 638.11, angle: -11.31},

        // Training
        {char: "T", x: 560.61, y: 611.14, angle: -38.55},
        {char: "r", x: 577.77, y: 597.31, angle: -42.35},
        {char: "a", x: 590.67, y: 585.62, angle: -46.2},
        {char: "i", x: 606.46, y: 568.86, angle: -49.67},
        {char: "n", x: 614.96, y: 559.06, angle: -53.26},
        {char: "i", x: 629.42, y: 539.31, angle: -56.85},
        {char: "n", x: 636.63, y: 528.52, angle: -60.45},
        {char: "g", x: 648.36, y: 507.72, angle: -64.96}
    ];

    let paragraphs = [
        {
            word: "Grooming",
            range: [0, 7],
            link: "./grooming.html"
        },
        {
            word: "Boarding",
            range: [8, 15],
            link: "./boarding.html"
        },
        {
            word: "Training",
            range: [16, 23],
            link: "./training.html"
        }
    ];

    p.preload = function() {
        ballImg = p.loadImage("狗子网页素材/球.png");
    }

    p.setup = function() {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.elt.style.background = 'transparent';
        p.textFont("Passion One");
        p.textSize(50);
        p.textAlign(p.LEFT, p.TOP);
        p.fill("#603813");
    }

    p.draw = function() {
        p.clear();

        if (y < -350) {
            y += 10;
            if (y > -350) y = -350;
        }

        offsetX = x - (204.02 - 60);
        offsetY = y - (100.47 + 40);

        drawBall(a, x, y, 196.19, 65.89);
    }

    function drawBall(scaleFactor = 1.0, xPos = 0, yPos = 0, w, h) {
        p.push();
        p.translate(xPos, yPos);

        let aspectRatio = ballImg.width / ballImg.height;
        let scaledW = w * scaleFactor;
        let scaledH = scaledW / aspectRatio;
        p.image(ballImg, 0, 0, scaledW, scaledH);

        // 绘制每个字母
        for (let i = 0; i < letters.length; i++) {
            let letter = letters[i];
            drawLetter(letter.char, letter.x - xPos + offsetX, letter.y - yPos + offsetY, letter.angle + angleOffset);
        }

        p.pop();
    }

    function drawLetter(letter, offsetXLocal, offsetYLocal, angleDeg) {
        p.push();
        p.translate(offsetXLocal, offsetYLocal);
        p.rotate(p.radians(angleDeg));
        p.text(letter, 0, 0);
        p.pop();
    }

    p.mousePressed = function() {
        // 检测点击是否在任意字母附近
        for (let i = 0; i < letters.length; i++) {
            let letter = letters[i];
            // 计算字母位置
            let lx = letter.x - x + offsetX;
            let ly = letter.y - y + offsetY;

            // 计算旋转后的点击点相对字母的坐标
            let angleRad = p.radians(letter.angle + angleOffset);
            let dx = p.mouseX - (x + lx);
            let dy = p.mouseY - (y + ly);
            let rotatedX = dx * p.cos(-angleRad) - dy * p.sin(-angleRad);
            let rotatedY = dx * p.sin(-angleRad) + dy * p.cos(-angleRad);

            // 文字区域假设为宽40，高50的矩形，从(0,0)开始
            if (rotatedX >= 0 && rotatedX <= 40 && rotatedY >= 0 && rotatedY <= 50) {
                // 找到对应段落跳转链接
                for (let pIndex = 0; pIndex < paragraphs.length; pIndex++) {
                    let range = paragraphs[pIndex].range;
                    if (i >= range[0] && i <= range[1]) {
                        window.location.href = paragraphs[pIndex].link;
                        break;
                    }
                }
                break;
            }
        }
    }
};
return new p5(sketch, document.getElementById(containerId));
}