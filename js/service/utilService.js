'use strict'

function getRandomWords(gKeywords) {
    let keywords = []
    for (let i = 0; i < 3; i++) {
        keywords[i] = gKeywords[getRandomInt(0, gKeywords.length)]
    }
    return keywords
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}