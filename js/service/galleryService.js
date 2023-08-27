'use strict'
const gWords = ['funny', 'tough', 'crazy', 'angry', 'rofl', 'animal', 'human']
const gImgs = _createImgs()
let gKeywordSearchCountMap = _createKeywordSearchCountMap()

function _createImgs() {
  let imgs = []
  for (let i = 0; i < 18; i++) {
    imgs[i] = {
          id: i + 1,
          url: `img/${i + 1}.jpg`,
          keywords: getRandomWords(gWords)
      }  
  }
  return imgs
}

function _createKeywordSearchCountMap() {
  return gWords.reduce((acc, keyword) => {
      if(!acc[keyword]) {acc[keyword] = 0}
      acc[keyword]++
      return acc
  }, { })
}

function getImgs() {
  return gImgs
}

function getImage(id) {
    return gImgs.find(img => img.id === +id)
}





