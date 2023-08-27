'use strict'
let gMeme = null
// let gCanvasWidth
// let gCanvasHeight
function createMeme(imgId){
    
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,

        lines: [_createLine()]
    }
}

function _createLine(){
    return {
            txt: 'Insert Desired Text',
            fontSize: 40,
            font: 'Impact',
            color: 'white',
            position: { x: 75, y: 75 },
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
    gMeme.lines.font = font
}

function setChangeFontSize(fontSize) {
    gMeme.lines.fontSize = fontSize
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

function switchLine(idx = gMeme.selectedLineIdx) {
    gMeme.lines[idx].isMarked = true
    if (idx >= 0) gMeme.selectedLineIdx = idx
    else {
        gMeme.selectedLineIdx = (gMeme.selectedLineIdx === gMeme.lines.length - 1)
            ? 0
            : gMeme.selectedLineIdx + 1
    }
}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].position.x += dx
    gMeme.lines[gMeme.selectedLineIdx].position.y += dy
}

function getTextMarkerCords(idx) {
    const line = gMeme.lines[idx]
    let height = line.fontSize
    let width = gCtx.measureText(line.txt).width
    let yBegin = line.position.y  - height
    let xEnd = width + height/2
    let yEnd = height + (height / 4)
    let xBegin = line.position.x - (height / 4)
    return { xBegin, yBegin, xEnd, yEnd }
}

function addLine() {
    console.log('Hey im here:');
    gMeme.lines.push(_createLine())
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    console.log('gMeme:', gMeme);
}

