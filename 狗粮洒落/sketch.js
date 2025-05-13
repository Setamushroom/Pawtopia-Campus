let kibbleImg;
let bowlImg;
let kibbles = [];

function preload() {
  kibbleImg = loadImage("kibble.png");
  bowlImg = loadImage("bowl.png");
}

function setup() {
  createCanvas(600, 400);
  clear();
  frameRate(60);
}

function draw() {
  clear();
  image(bowlImg, 250, 300, 100, 60);

  for (let kibble of kibbles) {
    kibble.update();
    kibble.display();
  }
}

// ✅ 注意：mousePressed 应该写在 draw() 外面
function mousePressed() {
  for (let i = 0; i < 5; i++) {
    kibbles.push(new Kibble(mouseX, mouseY));
  }
}

class Kibble {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-2, 2);
    this.vy = random(-6, -3);
    this.ay = 0.3;
    this.size = random(10, 16);
    this.isOnGround = false;
  }

  update() {
    if (!this.isOnGround) {
      this.vy += this.ay;
      this.x += this.vx;
      this.y += this.vy;
      if (this.y > height - 40) {
        this.y = height - 40;
        this.vy *= -0.3;
        this.vx *= 0.5;
        if (abs(this.vy) < 0.5) {
          this.isOnGround = true;
        }
      }
    }
  }

  display() {
    image(kibbleImg, this.x, this.y, this.size, this.size);
  }
}
