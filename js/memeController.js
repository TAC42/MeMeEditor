'use strict'

// Canvas
let gCanvas
let gCtx

// Position and Touch Event
let gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function onInit() {
  gCanvas = document.querySelector('canvas')
  console.log('gCanvas:', gCanvas);
  gCtx = gCanvas.getContext('2d')
  resizeCanvas()

  renderMeme()
}

// renders an image on the canvas and a line of text on top
function renderMeme() {
  onDrawImg()
}

function onDrawImg() {
  const meme = getMeme()
  // invalid meme check
  if (!meme.selectedImgId) return

  console.log('here');
  const memeImg = getImage()
  console.log('memeImg:', memeImg)
  const img = new Image()
  img.src = memeImg.url
  console.log('img:', img);
  gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}


function addEditorListeners() {
  // Mouse
  gCanvas.addEventListener('mousedown', onDown)
  gCanvas.addEventListener('mousemove', onMove)
  gCanvas.addEventListener('mouseup', onUp)

  // Touch
  gCanvas.addEventListener('touchstart', onDown)
  gCanvas.addEventListener('touchmove', onMove)
  gCanvas.addEventListener('touchend', onUp)
}

function resizeCanvas() {
  const elCanvasControl = document.querySelector('.canvas-layout')
  gCanvas.width = elCanvasControl.offsetWidth
  gCanvas.height = elCanvasControl.offsetHeight
}


function onSaveMeme() {
  const memeUrl = gCanvas.toDataURL('image/png', 'image/jpeg')
  save(memeUrl)
}