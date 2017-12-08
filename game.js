/* preloading stuff */

const imagesToLoad = [
  "letter.png", "letter-hover.png", "letter-open-full.png",
  "blush.png", "blush-hover.png",
  "condom.png", "condom-hover.png",
  "cursor-arrow.png", "cursor-pointer.png",
  "done.png", "done-hover.png",
  "drawer-button-hover.png", "drawer-button.png", "drawer.png",
  "empty.png", "eyeshadow.png", "eyeshadow-hover.png",
  "foundation.png", "foundation-hover.png",
  "intro-1.gif", "intro-2.gif", "intro-3.gif", "intro-4.gif",
  "lipstick.png", "lipstick-hover.png", "mirror.png",
  "next.png", "next-hover.png", "open.png", "open-hover.png",
  "polaroid.png", "polaroid-close.png", "polaroid-hover.png",
  "prozac.png", "prozac-hover.png", "razor.png", "razor-hover.png",
  "restart.png", "restart-hover.png", "start.png", "start-hover.png",
  "wash-1.png", "wash-2.png"
]

const soundsToLoad = ["munch.wav", "pop.mp3", "background-music.mp3"]



preload()

function preload() {
  imagesToLoad.map((imgSrc, i) => {
    let img = new Image()
    img.src = imgPath + imgSrc
    img.onload = loaded
   })

   soundsToLoad.map((soundSrc, i) => {
     let snd = new Audio()
     snd.src = soundSrc
     snd.canplaythrough = loaded
   })
}

var numLoaded = 0

function loaded() {
  numLoaded++
  if (numLoaded = imagesToLoad.length + soundsToLoad.length) {
    document.getElementById("js_loading").style.display = "none"
    document.getElementById("after_load").style.display = "block"
  }
}

const makeupTypes = [
  {
    name: "letter",
    funName: "...",
    extraText: "mark? that's not daddy's name...",
    extraImg: "letter-open",
    noMark: true,
    noCursor: true,
    x: 160,
    y: 100,
    degrees: -15,
    h: 90,
    drawFn: () => {},
  },
  {
    name: "razor",
    funName: "this one looks sharp",
    markImgs: ["razor-mark1.png", "razor-mark2.png", "razor-mark3.png", "razor-mark4.png", "razor-mark5.png"],
    noMark: true,
    drawFn: () => {
      tint(255, 255)
      image(makeupTypes[1].empty, 0, 0)
    },
    x: 430,
    y: 80,
    degrees: -15,
    h: 350,
    t_off: 0,
    w_off: 50,
  },
  {
    name: "foundation",
    funName: "looks like skin powder",
    drawFn: () => {
      tint(255, 100)
      image(makeupTypes[2].empty, 0, 0)
    },
    x: 480,
    y: 120,
    degrees: 20,
    h: 370,
    t_off: -2,
  },
  {
    name: "polaroid",
    funName: "whoa, this was ages ago",
    extraText: "aww.",
    extraImg: "polaroid-close",
    noMark: true,
    noCursor: true,
    x: 640,
    y: 90,
    degrees: 7,
    h: 180,
    drawFn: () => {},
  },
  {
    name: "condom",
    funName: "lubricated... ooh, I bet it's moisturizer!",
    drawFn: () => {
      tint(255, 90)
      image(makeupTypes[4].empty, 0, 0)
    },
    x: 170,
    y: 300,
    degrees: 10,
    h: 170,
    t_off: -40,
  },
  {
    name: "blush",
    funName: "a soft brush",
    drawFn: () => {
      tint(255, 40)
      image(makeupTypes[5].empty, 0, 0)
    },
    x: 250,
    y: 150,
    degrees: -15,
    h: 340,
    t_off: -20,
  },
  {
    name: "lipstick",
    funName: "LIPSTICK! i'm gonna look so good",
    drawFn: () => {
      tint(255, 170)
      image(makeupTypes[6].empty, 0, 0)
    },
    x: 650,
    y: 290,
    degrees: -3,
    h: 200,
    t_off: -7,
  },
  {
    name: "eyeshadow",
    funName: "smudgey dark stuff",
    drawFn: () => {
      tint(255, 80)
      image(makeupTypes[7].empty, 0, 0)
    },
    x: 360,
    y: 80,
    degrees: 3,
    w: 50,
    h: 380,
    t_off: -7,
  },
  {
    name: "prozac",
    funName: "maybe if I eat this, I can be happy like mommy",
    extraText: "",
    extraSound: "munch.wav",
    extraImg: "empty",
    noMark: true,
    noCursor: true,
    special: true,
    drawFn: () => {},
    x: 750,
    y: 400,
    degrees: -45,
    h: 30,
  },
]

makeupTypes.map((makeup, i) => {
  makeup["img"] = makeup.name + ".png"
  makeup["hoverImg"] = makeup.name + "-hover.png"
  if (!makeup.noMark) makeup["markImg"] = makeup.name + "-mark.png"
  if (!makeup.noCursor) makeup["cursorImg"] = makeup.name + "-cursor.png"
})




document.makeupTypes = makeupTypes

currentState = "makeup"

document.currentMakeup = makeupTypes[0]
document.makeupChanged = false
document.allMakeup = makeupTypes
let popAudio = new Audio('pop.mp3')

window.onload = () => {

  makeupTypes.map((mkup, i) => {
    let snd;
    let parent = document.getElementById("drawer-state")
    let makeupImg = document.createElement("img")
    let mouseOverAudio = new Audio('pop.mp3')
    if (mkup.extraSound) {
      snd = new Audio(mkup.extraSound)
    }
    makeupImg.id = mkup.img
    makeupImg.src = "./img/" + mkup.img
    makeupImg.style.position = 'absolute'
    makeupImg.style.left = mkup.x + 'px'
    makeupImg.style.top = mkup.y + 'px'
    makeupImg.className = "pointer";
    makeupImg.style.transform = `rotate(${mkup.degrees}deg)`;
    makeupImg.style.height = `${mkup.h}px`;
    makeupImg.onclick = () => {
      document.currentMakeup = makeupTypes[i];
      makeupTypes[i].used = true
      if (mkup.extraImg) {
        document.getElementById(mkup.extraImg).style.display = "block"
        makeupImg.style.display = "none"
        document.getElementById("drawer-text").innerHTML = mkup.extraText
        snd.play()
      }
      else {
        changeState()
      }
    }
    mkup['currentImg'] = mkup.img
    makeupImg.addEventListener("mouseenter", () => {
      makeupImg.src = imgPath + mkup.hoverImg
      makeupImg.style.height = `${mkup.h + mkup.h/10}px`;
      makeupImg.style.top = mkup.y - mkup.h/20 + 'px'
      makeupImg.style.left = mkup.x - mkup.h/50 + 'px'
      mouseOverAudio.play();
      document.getElementById('drawer-text').innerHTML = mkup.funName
    })
    makeupImg.addEventListener("mouseleave", () => {
      makeupImg.src = imgPath + mkup.img
      makeupImg.style.height = `${mkup.h}px`;
      makeupImg.style.top = mkup.y + 'px'
      makeupImg.style.left = mkup.x + 'px'
      if (document.getElementById('drawer-text').innerHTML != mkup.extraText) {
        document.getElementById('drawer-text').innerHTML = ""
      }
    })
    parent.appendChild(makeupImg)
  })
  document.makeupTypes = makeupTypes
  stateCheck()
}

const states = ["intro", "makeup", "box", "end"]


const changeState = () => {
  if (currentState === "makeup") {
    currentState = "drawer-state"
  }
  else if (currentState === "drawer-state") {
    currentState = "makeup"
    if (document.currentMakeup.cursorImg) {
      document.currentMakeup.currentImg = document.currentMakeup.cursorImg
    }
  }
  stateCheck();
}

const stateCheck = () => {
  if (currentState === "makeup") {
    document.makeupChanged = true
    document.getElementById("drawer-state").style.display = "none"
    document.getElementById("mirror").style.display = "block"
    document.getElementById("empty-hover").style.display = "block"
    document.getElementById("drawer-button").style.display = "block"
    if (document.getElementById("defaultCanvas0")) document.getElementById("defaultCanvas0").style.display = "block"
  }

  if (currentState === "drawer-state") {
    document.getElementById("defaultCanvas0").style.display = "none"
    document.getElementById("mirror").style.display = "none"
    document.getElementById("empty-hover").style.display = "none"
    document.getElementById("drawer-button").style.display = "none"
    document.getElementById("drawer-state").style.display = "block"
  }
}
