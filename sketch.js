let face;
let mark;
let cursor;
let allEmpties;
let clicked = false;
let cursorX;
let cursorY;
let mirror;
let makeups;
let anim;
let pastEmpties;
let faceOverlay;
let razorMakeup;
const imgPath = "./img/"

function preload() {
  face = loadImage(imgPath + "face.png")
  faceOverlay = loadImage(imgPath + "faceOverlay.png");
  mark = loadImage(imgPath + "blush-mark.png")
  cursor = loadImage(imgPath + "blush.png")
  mirror = loadImage(imgPath + "mirror.png")

  makeupTypes.map((makeup, i) => {
    makeup['empty'] = loadImage(imgPath + "empty.png");
    makeup['used'] = false;
    if (!makeup.noCursor) makeup['cursorP5'] = loadImage(imgPath + makeup.cursorImg)
    if (!makeup.noMark) makeup['markP5'] = loadImage(imgPath + makeup.markImg)

    if (makeup.name === "razor") razorMakeup = makeup.markImgs.map((img, i) => loadImage(imgPath + img))
  })
  pastEmpties = loadImage(imgPath + "empty.png")
}


function mouseDragged() {
  if (document.currentMakeup.img === "razor.png") {
    return;
  }

  let m = document.currentMakeup.markP5

  let w = m.width/2
  let h = m.height/2
  if (w < 0) w = 0
  if (h < 0) h = 0

  document.currentMakeup.empty.blend(m, 0, 0, m.width, m.height, mouseX - w, mouseY - h, m.width, m.height, DARKEST)
}

function mousePressed() {
  if (document.currentMakeup.img === "razor.png") {
    clicked = true;
    let i = Math.floor(Math.random() * document.currentMakeup.markImgs.length)
    document.currentMakeup.empty.blend(razorMakeup[i], 0, 0, razorMakeup[i].width, razorMakeup[i].height, mouseX, mouseY, razorMakeup[i].width, razorMakeup[i].height, DARKEST)
  }
}


function setup() {
  canvas = createCanvas(980, 620);
  background(255)
}

function doneDraw() {
  document.getElementById("mirror").style.display = "none";
  document.getElementById("wash").style.display = "block";
  document.getElementById("drawer-button").style.display = "none";
  document.getElementById("done-button").style.display = "none";
  document.getElementById("restart-button").style.display = "block";
}

function draw() {

  if (document.done) {
    doneDraw();
    return;
  }

  if (currentState != "makeup") return;

  image(face, 160, 15);

  makeupTypes.map((makeup, i) => {
    if (makeup.used)
      makeup.drawFn();
  })

  tint(255, 255);

  image(faceOverlay, 160, 15);

  let off_w = 0;
  if (document.currentMakeup.w_off) off_w = document.currentMakeup.w_off;

  if (mouseY < 520 && document.currentMakeup.cursorP5) {
    image(document.currentMakeup.cursorP5, mouseX - document.currentMakeup.cursorP5.width / 2 + off_w, mouseY + document.currentMakeup.t_off);
  }
}
