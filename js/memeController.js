'use strict'

// Canvas
let gCanvas
let gCtx

// Position and Touch Event
let gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function onInit() {
  gCanvas = document.querySelector('.canvas-meme')
  console.log('gCanvas:', gCanvas);
  gCtx = gCanvas.getContext('2d')
  resizeCanvas()
  addEventListeners()

  renderMeme()
}

// renders an image on the canvas and a line of text on top
function renderMeme() {
  onDrawImg()
  onDrawText()
}

function onDrawImg() {
  const meme = getMeme()
  if (!meme.selectedImgId) return

  const memeImg = getImage()
  const img = new Image()
  img.src = memeImg.url
  console.log('img:', img);
  gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}

function onDrawText() {
  const meme = getMeme()
  if (!meme.selectedImgId) return
  if (!meme.lines.length) return
  meme.lines.forEach(line => {
    drawText(line)
  })
  console.log('meme.lines:', meme.lines);
}

function drawText(line) {
  let { txt, fontSize, align, color, position, font } = line

  gCtx.lineWidth = 2
  gCtx.fillStyle = `${color}`
  gCtx.font = `${fontSize}px ${font}`
  gCtx.textAlign = align
  gCtx.fillText(txt, position.x, position.y)
  gCtx.strokeText(txt, position.x, position.y)
}


function setHighlightText(line) {
  switch (line.align) {
    case 'left':
      drawRectangle(
        line.position.x - 10,
        line.position.y - line.fontSize,
        line.txt.length * (  line.fontSize),
        1.3 * line.fontSize
      )
      break
    case 'center':
      drawRectangle(
        line.position.x - 10 - (line.txt.length * 0.5 * line.fontSize) / 2,
        line.position.y - 1 * line.fontSize,
        line.txt.length * line.fontSize,
        1.3 * line.fontSize
      )
      break
    case 'right':
      drawRectangle(
        line.position.x - 10 - line.txt.length * 0.5 * line.fontSize,
        line.position.y - line.fontSize,
        line.txt.length * line.fontSize,
        1.3 * line.fontSize
      )
      break
  }
}

function drawRectangle(x, y, width, height) {
  gCtx.beginPath()
  gCtx.rect(x, y, width , height)
  gCtx.strokeStyle = '#ffffff'
  gCtx.stroke()
}

function addEventListeners() {
  // Editor
  const elText = document.querySelector('.txt')
  elText.addEventListener('input', function () { onChangeText(this.value) })

  const elFontType = document.querySelector('.font-type')
  elFontType.addEventListener('change', function () { onChangeFont(this.value) })

  // // Mouse
  // gCanvas.addEventListener('mousedown', onDown)
  // gCanvas.addEventListener('mousemove', onMove)
  // gCanvas.addEventListener('mouseup', onUp)

  // // Touch
  // gCanvas.addEventListener('touchstart', onDown)
  // gCanvas.addEventListener('touchmove', onMove)
  // gCanvas.addEventListener('touchend', onUp)
}

// ON EDITOR CHANGE FUNCTIONS 

function onChangeText(txt) {
  setLineTxt(txt)
  renderMeme()
  const currLine = getCurrLine()
  setHighlightText(currLine)
}

function onChangeFont(font) {
  changeFont(font)
  renderMeme()
}





/////////////////////



function resizeCanvas() {
  const elCanvasControl = document.querySelector('.canvas-layout')
  gCanvas.width = elCanvasControl.offsetWidth
  gCanvas.height = elCanvasControl.offsetHeight
}




function onSaveMeme() {
  const memeUrl = gCanvas.toDataURL('image/png', 'image/jpeg')
  save(memeUrl)
}