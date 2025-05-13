let headImg, hairImg, eyeImg, eyeFrameImg, noseImg;
let angle = 0;
let noseState = false;
let scaleFactor = 0.7; // 增大缩放因子
let noseOffset = 0; // 鼻子的偏移变量

function preload() {
  headImg = loadImage("dog_head.png");
  hairImg = loadImage("dog_hair.png");
  eyeImg = loadImage("dog_eye.png");
  eyeFrameImg = loadImage("eye_frame.png");
  noseImg = loadImage("dog_nose.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER); // 所有图像以中心点对齐
  clear();
}

function draw() {
  clear();

  // 狗头（中心）
  let centerX = width / 2;
  let centerY = height / 2;
  image(headImg, centerX, centerY, headImg.width * scaleFactor, headImg.height * scaleFactor);

  // 毛发摆动，围绕某个固定圆心
  angle += 0.05;
  let hairOffsetX = sin(angle) * 5 * scaleFactor; // 缩放摆动范围
  let hairCenterX = centerX + 0;
  let hairCenterY = centerY - 0 * scaleFactor; // 原本偏移 180
  image(hairImg, hairCenterX + hairOffsetX, hairCenterY, hairImg.width * scaleFactor, hairImg.height * scaleFactor);

  // 眼睛位置（右眼举例，假设眼框图大小和眼球图相同）
  let eyeOffsetX = 0 * scaleFactor; // 原图偏移量
  let eyeOffsetY = -0 * scaleFactor;
  let eyeCenterX = centerX + eyeOffsetX;
  let eyeCenterY = centerY + eyeOffsetY;

  let eyeMoveX = constrain(mouseX - eyeCenterX, -2, 2);
  let eyeMoveY = constrain(mouseY - eyeCenterY, -2, 2);

  image(eyeFrameImg, eyeCenterX, eyeCenterY, eyeFrameImg.width * scaleFactor, eyeFrameImg.height * scaleFactor);
  image(eyeImg, eyeCenterX + eyeMoveX, eyeCenterY + eyeMoveY, eyeImg.width * scaleFactor, eyeImg.height * scaleFactor);

  // 鼻子（动画）
  if (noseState) {
    noseOffset = sin(frameCount * 0.1) * 5; // 鼻子上下移动
  }
  let noseX = centerX + 0;  // 中心对齐
  let noseY = centerY + 0 * scaleFactor + noseOffset; // 鼻子的偏移
  image(noseImg, noseX, noseY, noseImg.width * scaleFactor, noseImg.height * scaleFactor);
}

// 鼻子点击后动
function mousePressed() {
  noseState = !noseState; // 鼠标点击切换鼻子的状态
}
