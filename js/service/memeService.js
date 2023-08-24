'use strict'
let gMeme =  {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{ txt: 'I sometimes eat Falafel', size: 20, color: 'red' }]
}



//returns meme to render the canvas
function getMeme () {
    return gMeme
}

// set a new line of the image canvas
function setLineTxt() {


    renderMeme()
}


function setImg() {



    renderMeme()
} 
