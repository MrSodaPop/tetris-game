$(document).ready(function() {
    console.log("Document ready");
    generateGameArea();
    gameData = generateGameData();
    generateTetrominoe();
});

var gameTick = function() {
  gameData.lastTick = Date.now();
  var tick = setInterval(function(){
    gameUpdate()
  },1)
}

var gameUpdate = function() {

};


var generateGameArea = function() {
  for (let u = 0; u < 20; u++) {
    for (let i = 0; i < 10; i++) {
      $('.game-area').append('<div class=\'game-tile X-' + i + ' Y-' + u + '\'></div>')
    }
  }
}

var generateTetrominoe = function() {
    var currentTetrominoe = gameData.tetrominoeConfigurations[(Math.floor(Math.random()*7))];
    var currentTile = currentTetrominoe[0]
    for (let i = 0; i < 4; i++) {
      currentTile = currentTetrominoe[i]
      if (currentTile > 4) {
        gameData.activeTiles[i].Y = currentTile = 1;
        gameData.activeTiles[i].X = currentTile - 2;
      }
      else {
        gameData.activeTiles[i].Y = currentTile = 0;
        gameData.activeTiles[i].X = currentTile + 2;
      }
      console.log('Attempting recolor')
      $('.X-' + gameData.activeTiles[i].X + ' .Y-' + gameData.activeTiles[i].Y).css('background-color','black');
    }
}

generateGameData = function() {
  return {
    tetrominoeConfigurations: [['5','6','7','8'],['2','3','6','7'],['2','5','6','7'],['2','3','5','6'],['1','2','6','7'],['1','5','6','7'],['3','5','6','7']],
    activeTiles: [{Y:null,X:null},{Y:null,X:null},{Y:null,X:null},{Y:null,X:null}]
  }
}

var gameData;
