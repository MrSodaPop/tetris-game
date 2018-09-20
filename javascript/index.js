$(document).ready(function() {
    console.log("Document ready");
    generateGameArea();
    gameData = generateGameData();
    generateTetrominoe();
    gameTick();

    $('html').keypress(function(key){
      switch (key.keyCode) {
        case 13: if (gameData.activeTetrominoe){return}else{generateTetrominoe()} break;
        case 97: if(gameData.tickrate === gameData.dropRate){return}moveTetrominoe('left'); break;
        case 100: if(gameData.tickrate === gameData.dropRate){return}moveTetrominoe('right'); break;
        case 32: if (gameData.activeTetrominoe){gameData.tickrate = gameData.dropRate;}; break;
        default: console.log('invalid key');
      }
    })
});

var gameTick = function() {
  gameData.lastTick = Date.now();
  var tick = setInterval(function(){
    gameUpdate()
  },1)
}

var gameUpdate = function() {
  if (Date.now() - gameData.lastTick > gameData.tickrate) {
    gameData.lastTick = Date.now();
    if (gameData.activeTetrominoe) {
      fallTetrominoe();
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

var moveTetrominoe = function(direction) {
  if (direction === 'right') {
    for (let i = 0; i < gameData.activeTiles.length; i++) {
      if (findStaticTiles(gameData.activeTiles[i].X + 1,gameData.activeTiles[i].Y) || gameData.activeTiles[i].X === 9) {
        return;
      }
    }
    for (let i = 0; i < gameData.activeTiles.length; i++) {
      $('#' + gameData.activeTiles[i].X + gameData.activeTiles[i].Y).removeClass('active')
      $('#' + gameData.activeTiles[i].X + gameData.activeTiles[i].Y).removeClass('tetrominoe-' + gameData.tetrominoeShapes[gameData.activeTetrominoeShape]);
      gameData.activeTiles[i].X++;
    }
    for (let i = 0; i < gameData.activeTiles.length; i++) {
            $('#' + gameData.activeTiles[i].X + gameData.activeTiles[i].Y).addClass('active')
      $('#' + gameData.activeTiles[i].X + gameData.activeTiles[i].Y).addClass('tetrominoe-' + gameData.tetrominoeShapes[gameData.activeTetrominoeShape]);
    }
  }
  else {
    for (let i = 0; i < gameData.activeTiles.length; i++) {
      if (findStaticTiles(gameData.activeTiles[i].X - 1,gameData.activeTiles[i].Y) || gameData.activeTiles[i].X === 0) {
        return;
      }
    }
    for (let i = 0; i < gameData.activeTiles.length; i++) {
      $('#' + gameData.activeTiles[i].X + gameData.activeTiles[i].Y).removeClass('active')
        $('#' + gameData.activeTiles[i].X + gameData.activeTiles[i].Y).removeClass('tetrominoe-' + gameData.tetrominoeShapes[gameData.activeTetrominoeShape]);
        gameData.activeTiles[i].X--;
        $('#' + gameData.activeTiles[i].X + gameData.activeTiles[i].Y).addClass('active')
        $('#' + gameData.activeTiles[i].X + gameData.activeTiles[i].Y).addClass('tetrominoe-' + gameData.tetrominoeShapes[gameData.activeTetrominoeShape]);
    }
  }
}

var fallTetrominoe = function() {
  for (let i = 0; i < gameData.activeTiles.length; i++) {
    if (findStaticTiles(gameData.activeTiles[i].X,gameData.activeTiles[i].X)) {
      console.log('found static')
      gameOver();
      return;
    }
  }
  var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t'];
  var ending = false;
  var currentTile = gameData.activeTiles[0];
  var currentTileIndex = findFirstIndexFromArray(alphabet,currentTile);
  var nextTile = alphabet[currentTileIndex + 1];
  for (let i = 0; i < gameData.activeTiles.length; i++) {
    currentTile = gameData.activeTiles[i];
    currentTileIndex = findFirstIndexFromArray(alphabet,currentTile.Y);
    nextTile = alphabet[currentTileIndex + 1]
    if (findStaticTiles(currentTile.X,nextTile) || gameData.activeTiles[i].Y === 't'){
      ending = true;
    }
  }
  if (ending) {
    for (let i = 0; i < gameData.activeTiles.length; i++) {
      $('#' + String(gameData.activeTiles[i].X) + String(gameData.activeTiles[i].Y)).addClass('static');
      $('#' + String(gameData.activeTiles[i].X) + String(gameData.activeTiles[i].Y)).removeClass('active');
    }
    for (let i = 0; i < gameData.activeTiles.length; i++) {
      addTileToStatic(gameData.activeTiles[i]);
    }
      gameData.activeTiles = [{Y:null,X:null},{Y:null,X:null},{Y:null,X:null},{Y:null,X:null}];
      gameData.activeTetrominoe = false;
      gameData.tickrate = 250;
  }
  else {
    for (let i = 0; i < gameData.activeTiles.length; i++) {
      $('#' + String(gameData.activeTiles[i].X) + String(gameData.activeTiles[i].Y)).removeClass('tetrominoe-' + gameData.tetrominoeShapes[gameData.activeTetrominoeShape]);
      $('#' + String(gameData.activeTiles[i].X) + String(gameData.activeTiles[i].Y)).removeClass('active');
    }
    for (let i = 0; i < gameData.activeTiles.length; i++) {
      gameData.activeTiles[i].Y = alphabet[findFirstIndexFromArray(alphabet,gameData.activeTiles[i].Y) + 1];
      $('#' + String(gameData.activeTiles[i].X) + String(gameData.activeTiles[i].Y)).addClass('tetrominoe-' + gameData.tetrominoeShapes[gameData.activeTetrominoeShape]);
      $('#' + String(gameData.activeTiles[i].X) + String(gameData.activeTiles[i].Y)).addClass('active');
    }
  }
}

var rotateTetrominoe = function() {
  switch (gameData.activeTetrominoeShape) {
    case 'I': 
      switch (gameData.activeTetrominoeRotation) {
        case 0: 
          if(!$('#'+gameData.activeTiles[1].X + findYValue(gameData.activeTiles[0].Y,false)).hasClass('static') && !$('#'+gameData.activeTiles[1].X + findYValue(gameData.activeTiles[0].Y,true)).hasClass('static') && !$('#'+gameData.activeTiles[1].X + findYValue(findYValue(gameData.activeTiles[0].Y,true),true)).hasClass('static')) {

          }
        break;
        case 1:
        case 2:
        case 3:
        default: console.log('Invalid rotation paramter');
      }
    break;
    case 'O':

    break;
    case 'T': 

    break;
    case 'S': 

    break;
    case 'Z': 

    break;
    case 'J': 

    break;
    case 'L': 

    break;
    default: return;
  }
}

var findFirstIndexFromArray = function(array, variable) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === variable) {
      return i;
    }
  }
}

var findYValue = function(Y,next) {
  var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t'];

}

var findStaticTiles = function (X,Y) {
  for (let i = 0; i < gameData.staticTiles.length; i++) {
    if (Y === gameData.staticTiles[i].Y && X === gameData.staticTiles[i].X) {
      return true;
    }
  }
  return false;
}

var addTileToStatic = function (tile) {
  console.log('adding to static')
  var flag = false;
  var counter = 0;
  while (!flag) {
    if (gameData.staticTiles[counter].Y === null) {
      gameData.staticTiles[counter].Y = tile.Y
      gameData.staticTiles[counter].X = tile.X
      flag = true;
    }
    else {
      counter++
    }
  }
}

var gameOver = function() {
  gameData.gameOver = true;
  $('.instructions').replace('<div class="instructions">GAMEOVER</div>');
}

var generateTetrominoe = function() {
    if (gameData.gameOver) {
      return;
    }
    gameData.activeTetrominoeRotation = 0;
    gameData.activeTetrominoeShape = Math.floor(Math.random()*7)
    var currentTetrominoe = gameData.tetrominoeConfigurations[gameData.activeTetrominoeShape];
    var currentTile = currentTetrominoe[0]
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
    tetrominoeConfigurations: [['1','2','3','4'],['2','3','6','7'],['2','5','6','7'],['2','3','5','6'],['1','2','6','7'],['1','5','6','7'],['3','5','6','7']],
    tetrominoeColors: ['#2ae0ed','#fce93c','#b539ba','#38bc31','#e04d1d','#4773e0','#ed911a'],
    activeTetrominoe: false,
    activeTetrominoeShape: null,
    activeTetrominoeRotation: 0,
    activeTiles: [{Y:null,X:null},{Y:null,X:null},{Y:null,X:null},{Y:null,X:null}],
    staticTiles: staticTiles,

    gameOver: false,
    dropRate: 20,
    tickrate:250,
    lastTick: 0
  }
}

var gameData;