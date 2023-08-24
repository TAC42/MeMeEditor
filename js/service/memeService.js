'use strict'
let gMeme =  {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{ 
        txt: 'I sometimes eat Falafel', 
        fontSize: 20, 
        font: 'Impact',
        color: 'red',
        position: { x: 75, y: 75 },
        align: 'left',
        isMove: false,
    }]
}

//returns meme to render the canvas
function getMeme () {
    return gMeme
}

// set a new line of the image canvas
function setLineTxt(txt) {
    if (!gMeme.lines.length) return;
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function changeFont(font) {
    gMeme.lines.font = font
}


function setImg() {



    renderMeme()
} 
