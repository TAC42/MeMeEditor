'use strict'
let gMeme = null
// let gCanvasWidth
// let gCanvasHeight
function createMeme(imgId) {

    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,

        lines: [_createLine(75, 75)]
    }
}

function _createLine(x, y) {
    return {
        txt: 'Insert Desired Text',
        fontSize: 30,
        font: 'Impact',
        color: 'white',
        stroke: 'black',
        rotate: 0,
        position: { x, y },
        align: 'left',
        isMoving: false,
        isMarked: true
    }
}

function getMeme() {
    return gMeme
}
function setImg(imgId) {
    createMeme(imgId)
}

// set a new line of the image canvas
function setLineTxt(txt) {
    if (!gMeme.lines.length) return
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function setChangeFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function setChangeFontSize(fontSize) {
    gMeme.lines[gMeme.selectedLineIdx].fontSize = fontSize
}

function setChangeFillColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setChangeStrokeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].stroke = color
}

function setRotateDegree(rotateDegree) {
    gMeme.lines[gMeme.selectedLineIdx].rotate = rotateDegree
}


function isLineClicked(pos) {
    return gMeme.lines.findIndex(line => {
        const { xBegin, xEnd, yBegin, yEnd } = line.markCords
        return ((pos.offsetX >= xBegin && pos.offsetX <= xEnd) && (pos.offsetY >= yBegin && pos.offsetY <= yEnd))
    })
}

function setLineMarkCords(cords, idx) {
    const { xBegin, yBegin, xEnd, yEnd } = cords
    gMeme.lines[idx].markCords = { xBegin, xEnd: xBegin + xEnd, yBegin, yEnd: yBegin + yEnd }
}

function setLineMarked(isMarked) {
    gMeme.isLineSelected = isMarked
}
function isLineMoving(isMoving) {
    if (!gMeme.lines.length) return
    gMeme.lines[gMeme.selectedLineIdx].isMoving = isMoving
}

function removeLine() {
    let selectedLineIdx = gMeme.selectedLineIdx
    gMeme.lines.splice(selectedLineIdx, 1)
    gMeme.selectedLineIdx = 0
}

function switchLine() {
    let currentLineIdx = gMeme.selectedLineIdx
    if (currentLineIdx < gMeme.lines.length - 1) gMeme.selectedLineIdx += 1
    else if (currentLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    changeTextInput(getMeme())
}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].position.x += dx
    gMeme.lines[gMeme.selectedLineIdx].position.y += dy
}

function getTextMarkerCords(idx) {
    const line = gMeme.lines[idx]
    let height = line.fontSize
    let width = gCtx.measureText(line.txt).width
    let yBegin = line.position.y - height
    let xEnd = width + height / 2
    let yEnd = height + (height / 4)
    let xBegin = line.position.x - (height / 4)
    return { xBegin, yBegin, xEnd, yEnd }
}

function addLine() {
    gMeme.lines.push(_createLine(gCanvas.width/4,gCanvas.height/2))
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

