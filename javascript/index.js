$(document).ready(function() {
    console.log("Document ready");
    generateGameArea();
    gameData = generateGameData();
    generateTetrominoe();
    gameTick();
});

var gameTick = function() {
  gameData.lastTick = Date.now();
  var tick = setInterval(function(){
    gameUpdate()
  },1)
}

var gameUpdate = function() {
  if (Date.now() - gameData.lastTick > 250) {
    gameData.lastTick = Date.now();
    if (gameData.activeTetrominoe) {
      moveTetrominoe();
    }
  }
};


var generateGameArea = function() {
  var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t'];
  for (let u = 0; u < 20; u++) {
    for (let i = 0; i < 10; i++) {
      $('.game-area').append('<div id=\'' + String(i) + alphabet[u] + '\' class=\'game-tile X-' + i + ' Y-' + u + '\'></div>')
    }
  }
}

var moveTetrominoe = function() {
  var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t'];
  for (let i = 0; i < gameData.activeTiles.length; i++) {
    console.log(gameData.activeTiles[i].Y, alphabet[i+1])
    if (gameData.activeTiles[i].Y === gameData.staticTiles[findStaticTiles(alphabet[findFirstIndexFromArray(alphabet,gameData.activeTiles[i].Y)+1])].Y || gameData.activeTiles[i].Y === 't'){
      for (let u = 0; u < gameData.activeTiles.length; i++) {
        $('#' + String(gameData.activeTiles[i].X) + String(gameData.activeTiles[i].Y)).addClass('static');
        $('#' + String(gameData.activeTiles[i].X) + String(gameData.activeTiles[i].Y)).removeClass('active');
      }
        gameData.activeTiles = [{Y:null,X:null},{Y:null,X:null},{Y:null,X:null},{Y:null,X:null}];
        gameData.activeTetrominoe = false;
        return;
    }
  }
  for (let i = 0; i < gameData.activeTiles.length; i++) {
    $('#' + String(gameData.activeTiles[i].X) + String(gameData.activeTiles[i].Y)).removeClass('tetrominoe-' + gameData.tetrominoeShapes[gameData.activeTetrominoeShape]);
    $('#' + String(gameData.activeTiles[i].X) + String(gameData.activeTiles[i].Y)).removeClass('active');
    console.log('removed classes');
  }
  for (let i = 0; i < gameData.activeTiles.length; i++) {
    console.log('added classes');
    gameData.activeTiles[i].Y = alphabet[findFirstIndexFromArray(alphabet,gameData.activeTiles[i].Y) + 1];
    $('#' + String(gameData.activeTiles[i].X) + String(gameData.activeTiles[i].Y)).addClass('tetrominoe-' + gameData.tetrominoeShapes[gameData.activeTetrominoeShape]);
    $('#' + String(gameData.activeTiles[i].X) + String(gameData.activeTiles[i].Y)).addClass('active');
  }
}

var findFirstIndexFromArray = function(array, variable) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === variable) {
      return i;
    }
  }
}

var findStaticTiles = function (Y) {
  for (let i = 0; i < gameData.staticTiles.length; i++) {
    if (Y === gameData.staticTiles[i].Y) {
      return i;
    }
  }
}

var generateTetrominoe = function() {
    gameData.activeTetrominoeShape = Math.floor(Math.random()*7)
    var currentTetrominoe = gameData.tetrominoeConfigurations[gameData.activeTetrominoeShape];
    var currentTile = currentTetrominoe[0]
    console.log(currentTetrominoe);
    for (let i = 0; i < 4; i++) {
      currentTile = parseInt(currentTetrominoe[i])
      if (currentTile > 4) {
        gameData.activeTiles[i].Y = 'b';
        gameData.activeTiles[i].X = currentTile - 2;
      }
      else {
        gameData.activeTiles[i].Y = 'a';
        gameData.activeTiles[i].X = currentTile + 2;
      }
      console.log('#' + String(gameData.activeTiles[i].X) + String(gameData.activeTiles[i].Y))
      $('#' + String(gameData.activeTiles[i].X) + String(gameData.activeTiles[i].Y)).addClass('tetrominoe-' + gameData.tetrominoeShapes[gameData.activeTetrominoeShape]);
      $('#' + String(gameData.activeTiles[i].X) + String(gameData.activeTiles[i].Y)).addClass('active');
    }
    gameData.activeTetrominoe = true;
}

generateGameData = function() {
  var staticTiles = [];
  for (let i = 0; i < 200; i++) {
    staticTiles[i] = {Y:null,X:null};
  }
  return {
    tetrominoeShapes: ['I','O','T','S','Z','J','L'],
    tetrominoeConfigurations: [['5','6','7','8'],['2','3','6','7'],['2','5','6','7'],['2','3','5','6'],['1','2','6','7'],['1','5','6','7'],['3','5','6','7']],
    tetrominoeColors: ['#2ae0ed','#fce93c','#b539ba','#38bc31','#e04d1d','#4773e0','#ed911a'],
    activeTetrominoe: false,
    activeTetrominoeShape: null,
    activeTiles: [{Y:null,X:null},{Y:null,X:null},{Y:null,X:null},{Y:null,X:null}],
    staticTiles: staticTiles,


    lastTick: 0
  }
}

var gameData;
