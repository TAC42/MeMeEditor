'use strict'

function onInitGallery() {
    renderGallery()
    addGalleryListeners()
}

function renderGallery() {
    const imgs = getImgs()
    const strHTMLs = imgs.map((img, idx) => `<img src="${img.url}" 
        class="meme-img"  onclick="onImgSelect(${idx+1})" alt="Image ${idx + 1}">`)
    const msg = `<p>Sorry, no matches.Try searching for something else.<p>`
    document.querySelector('.gallery-container').innerHTML = (imgs.length) ? strHTMLs.join('') : msg
}
 
function onImgSelect(imgId) {
    document.querySelector('.gallery-container').classList.add('hide')
    document.querySelector('.nav-gallery').classList.remove('pressed')

    document.querySelector('.meme-editor').classList.remove('hide')
    document.querySelector('.meme-editor').classList.add('flex')
    document.querySelector('main').classList.add('flex')
   
    setImg(imgId)
    renderMeme()
}

function addGalleryListeners() {
    
    const elNavPhone = document.querySelector('.btn-toggle-menu')
    elNavPhone.addEventListener('click', toggleMenu() )

    const elMainScreen = document.querySelector('.main-screen')
    elMainScreen.addEventListener('click', toggleMenu() )

}

function toggleMenu() {
    document.querySelector('nav').classList.toggle('menu-open');
    document.querySelector('body').classList.toggle('menu-open');
}

