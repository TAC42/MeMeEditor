'use strict'

// On Load
onload = () => {
  onInitGallery()
  onInitMeme()
}

// Canvas
let gCanvas
let gCtx

// Position and Touch Event
let gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function onInitMeme() {
  createMeme()
  gCanvas = document.querySelector('.canvas-meme')
  gCtx = gCanvas.getContext('2d')

  addEventListeners()

  //renderMeme()
}

// renders an image on the canvas and a line of text on top
function renderMeme() {
  onDrawImg()
  onDrawText()
}

function onDrawImg() {
  const meme = getMeme()
  if (!meme.selectedImgId) return

  const memeImg = getImage(meme.selectedImgId)
  const img = new Image()
  img.src = memeImg.url
  gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}

function onDrawText() {
  const meme = getMeme()
  if (!meme.selectedImgId) return
  if (!meme.lines.length) return
  meme.lines.forEach((line, idx) => {
    drawText(line, idx)
  })
}

function drawText(line, idx) {
  let { txt, fontSize, align, color, position: pos, font } = line
  gCtx.lineWidth = 2
  gCtx.fillStyle = `${color}`
  gCtx.textAlign = line.align
  gCtx.font = `${fontSize}px ${font}`
  gCtx.textAlign = align
  gCtx.lineWidth = 1
  gCtx.fillText(txt, pos.x, pos.y)
  gCtx.strokeText(txt, pos.x, pos.y)


  const textMarkCords = getTextMarkerCords(idx)
  setLineMarkCords(textMarkCords, idx)
  const meme = getMeme()
  if (idx === meme.selectedLineIdx && meme.lines[idx].isMarked) {
    setTextMarker(textMarkCords)
  }
}

function setTextMarker(cords) {
  const { xBegin, yBegin, xEnd, yEnd } = cords
  gCtx.beginPath()
  gCtx.rect(xBegin, yBegin, xEnd, yEnd)
  gCtx.lineWidth = 3;
  gCtx.strokeStyle = 'black'
  gCtx.stroke()
  gCtx.closePath()
}


function addEventListeners() {
  // Editor
  const elText = document.querySelector('.txt')
  elText.addEventListener('input', function () { onChangeText(this.value) })

  const elFontType = document.querySelector('.font-type')
  elFontType.addEventListener('change', function () { onChangeFont(this.value) })

  const elFontSize = document.querySelector('.font-size')
  elFontSize.addEventListener('change', function () { onChangeFontSize(this.value) })

  const elAddLineBtn = document.querySelector('.add-line')
  elAddLineBtn.addEventListener('click', function () { onAddLine() })

  const elSwitchLineBtn = document.querySelector('.switch-line')
  elSwitchLineBtn.addEventListener('click', function () { onSwitchLine() })

  const elRemoveLineBtn = document.querySelector('.trash-line')
  elRemoveLineBtn.addEventListener('click', function () { onRemoveLine() })

  

  // Mouse
  gCanvas.addEventListener('mousedown', onDown)
  gCanvas.addEventListener('mousemove', onMove)
  gCanvas.addEventListener('mouseup', onUp)

  // Touch
  gCanvas.addEventListener('touchstart', onDown)
  gCanvas.addEventListener('touchmove', onMove)
  gCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
  const pos = getEvPos(ev)
  let lineIdx = isLineClicked(pos)
  if (lineIdx < 0) {
    setLineMarked(false)
    renderMeme()
    return
  } else {
    switchLine(lineIdx)
    setLineText()
    renderMeme()
    isLineMoving(true)
  }

  gStartPos = pos
  gCanvas.style.cursor = 'grabbing'
}

function onMove(ev) {
  const line = getCurrLine()
  if (!line || !line.isMoving) return
  const pos = getEvPos(ev)
  const dx = pos.offsetX - gStartPos.offsetX
  const dy = pos.offsetY - gStartPos.offsetY
  if (line.isMoving) moveLine(dx, dy)

  gStartPos = pos
  renderMeme()
  gCanvas.style.cursor = 'grabbing'
}

function onUp() {
  isLineMoving(false)
  gCanvas.style.cursor = 'grab'
}

function getEvPos(ev) {
  let pos = {
    offsetX: ev.offsetX,
    offsetY: ev.offsetY
  }
  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault()
    ev = ev.changedTouches[0]
    let rect = ev.target.getBoundingClientRect()
    pos = {
      offsetX: ev.pageX - rect.left,
      offsetY: ev.pageY - rect.top
    }
  }
  return pos
}

function setLineText() {
  const meme = getMeme()
  const txt = (meme.lines.length) ? meme.lines[meme.selectedLineIdx].txt : 'No Lines!'
  document.querySelector('.txt').value = txt
}

// ON EDITOR CHANGE FUNCTIONS 

function onChangeText(txt) {
  setLineTxt(txt)
  renderMeme()
}

function onChangeFont(font) {
  setChangeFont(font)
  renderMeme()
}

function onChangeFontSize(fontSize) {
  setChangeFontSize(fontSize)
  renderMeme()
}

function onRemoveLine() {
  removeLine();
  renderMeme();
}

function onAddLine() {
  addLine();
  renderMeme();
}

function onSwitchLine() {
  switchLine();
  updateTextInput();
  renderMeme();
}


function resizeCanvas() {
  const elCanvasControl = document.querySelector('.canvas-layout')
  gCanvas.width = elCanvasControl.offsetWidth
  gCanvas.height = elCanvasControl.offsetHeight
  gCanvasWidth = gCanvas.width
  gCanvasHeight = gCanvas.height
}

function onSaveMeme() {
  const memeUrl = gCanvas.toDataURL('image/png', 'image/jpeg')
  save(memeUrl)
}