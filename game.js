/* preloading stuff */

const imagesToLoad = [
  "letter.png", "letter-hover.png", "letter-open-full.png",
  "blush.png", "blush-hover.png",
  "condom.png", "condom-hover.png",
  "cursor-arrow.png", "cursor-pointer.png",
  "drawer-button-hover.png", "drawer-button.png", "drawer.png",
  "eyeshadow.png", "eyeshadow-hover.png",
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

currentState = "makeup"

document.currentMakeup = makeupTypes[0]
document.makeupChanged = false
document.allMakeup = makeupTypes
let popAudio = new Audio('pop.mp3')

window.onload = () => {

  setInterval(() => {
    let wash = document.getElementById("wash")
    let washText = wash.src.split('img/')[1]
    if (washText === "wash-1.png") wash.src = "./img/wash-2.png"
    else wash.src = "./img/wash-1.png"
  }, 350)

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
