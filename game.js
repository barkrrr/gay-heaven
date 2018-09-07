'use strict';

var MAX_SCORE = 5;
var TIMER_UPDATE_INTERVAL = 1000;
var CLEAR_RAINBOWS_INTERVAL = 2000;
var LIVES = 3;


function Game(username) {
  var self = this;

  self.gameIsOver = false;
  self.score = 0;
  self.isPause = false;
  self.username = username;
  self.message = '';
  self.playerHasWon = false;
  self.timer = 30;
  self.intervalId;
}

Game.prototype.start = function () {
  var self = this;

  self.createDom();

  self.player = new Player(self.canvasElement, LIVES);
  self.rainbows = [];
  self.enemies = [];
  self.friends = [];
  self.lives = [];
  self.gameIsOver = false;
  
  self.setupEventHandlers()
  self.startLoop();
  self.startTimer()
};


Game.prototype.createDom = function () {
  var self = this;

  self.gameMain = buildDom(`
    <main class="game container">
      <header>
        <div class="lives">
          <span class="label">Lives:</span>
          <span class="value"></span>
        </div>
        <div class="score">
          <span class="label">Score:</span>
          <span class="value"></span>
        </div>
        <div class="username">
          <p></p>
        </div>
      </header>
      <div class="canvas">
        <canvas></canvas>
      </div>
    </main>
  `);
  
  document.body.appendChild(self.gameMain);

  self.gameMain.querySelector('p').innerText = self.username;
  self.canvasParentElement = self.gameMain.querySelector('.canvas');
  self.canvasElement = self.gameMain.querySelector('canvas');
  
  self.livesElement = self.gameMain.querySelector('.lives .value');
  self.scoreElement = self.gameMain.querySelector('.score .value');

  self.meow = new Audio('./music/Cat-meow-cuter.mp3');
  self.fart = new Audio('./music/Trump-fart.mp3');
  self.roar = new Audio('./music/Lion-roar.mp3');

  self.width = self.canvasParentElement.offsetWidth;
  self.height = self.canvasParentElement.offsetHeight;

  self.canvasElement.setAttribute('width', self.width);
  self.canvasElement.setAttribute('height', self.height);
};

Game.prototype.setupEventHandlers = function () {
  var self = this;
  
  self.handleKeyDown = function (event) {
    if (self.player.isExploding || self.gameIsOver) {
      return;
    }
    if (event.key === 'ArrowRight') {
      self.player.setDirection('x', 1);
    } else if (event.key === 'ArrowLeft') {
      self.player.setDirection('x', -1);
    } else if (event.key === 'ArrowUp') {
      self.player.setDirection('y', -1);
    } else if (event.key === 'ArrowDown') {
      self.player.setDirection('y', 1);
    }
  };

  self.handleKeyUp = function (event) {
    if (self.player.isExploding || self.gameIsOver) {
      return;
    }
    if (event.key === 'ArrowRight') {
      self.player.setDirection('x', 0);
    } else if (event.key === 'ArrowLeft') {
      self.player.setDirection('x', 0);
    } else if (event.key === 'ArrowUp') {
      self.player.setDirection('y', 0);
    } else if (event.key === 'ArrowDown') {
      self.player.setDirection('y', 0);
    }  else if (event.key === ' ') {
      self.isPause = !self.isPause;
      if (!self.isPause) {
        self.startLoop();
      }
    }
  };

  document.body.addEventListener('keydown', self.handleKeyDown);
  document.body.addEventListener('keyup', self.handleKeyUp);
};

Game.prototype.startTimer = function () {
  var self = this;
  self.intervalId = setInterval(function(){
    self.timer--;
  }, TIMER_UPDATE_INTERVAL)
}

Game.prototype.startLoop = function () {
  var self = this;

  var ctx = self.canvasElement.getContext('2d');

  self.clearRainbowInterval = setInterval(function() {
    self.rainbows = [];
  }, CLEAR_RAINBOWS_INTERVAL)
  
  function loop() {
  
    self.spawnEnemies();
    self.updateObjects();

    self.removeEnemiesThatAreOutsideOfScreen();
    
    if (!self.player.isExploding && !self.gameIsOver) {
      self.checkIfEnemiesCollidedPlayer();
      self.checkIfFriendCollidedPlayer();
      self.checkIfLivesCollidedPlayer();
    }
      
    self.livesElement.innerText = self.player.lives;
    self.scoreElement.innerText = self.score;
    
    self.draw(ctx);

    if (!self.gameIsOver) {
      self.checkGameOver();
    }
    
    if (self.gameIsOver) {
      self.gameOverCounter--;
      if (!self.gameOverCounter) {
        self.gameOverAnimation = false;
      }
    }
    
    if (self.gameIsOver && !self.gameOverAnimation) {
      self.destroyGame();
    }
    
    if ((!self.gameIsOver || self.gameOverAnimation) && !self.isPause) { 
      window.requestAnimationFrame(loop);
    }
  }

  window.requestAnimationFrame(loop);
};

Game.prototype.spawnEnemies = function () {
  var self = this;

  // create more enemies now and then
  var randomNumber = Math.random();

  if (Math.random() > 0.97) {
    if (randomNumber <= 0.33) {
      self.enemies.push(new Enemy(self.canvasElement, 'top'));
    } else if (randomNumber > 0.33 && randomNumber <= 0.66) {
      self.enemies.push(new Enemy(self.canvasElement, 'left'));
    } else if (randomNumber > 0.66) {
      self.enemies.push(new Enemy(self.canvasElement, 'right'));
    }
  }

  if (Math.random() > 0.99) {
    if (randomNumber <= 0.33) {
      self.friends.push(new Friend(self.canvasElement, 'top'));
    } else if (randomNumber > 0.33 && randomNumber <= 0.66) {
      self.friends.push(new Friend(self.canvasElement, 'left'));
    } else if (randomNumber > 0.66) {
      self.friends.push(new Friend(self.canvasElement, 'right'));
    }
  }

  if (Math.random() > 0.995) {
    if (randomNumber <= 0.33) {
      self.lives.push(new Live(self.canvasElement, 'top'));
    } else if (randomNumber > 0.33 && randomNumber <= 0.66) {
      self.lives.push(new Live(self.canvasElement, 'left'));
    } else if (randomNumber > 0.66) {
      self.lives.push(new Live(self.canvasElement, 'right'));
    }
  }

  if (self.rainbows.length < 10){
    if (Math.random() > 0.97){
      var y = self.canvasElement.height * Math.random();
      var x = self.canvasElement.width * Math.random();
      self.rainbows.push(new Rainbow(self.canvasElement, x , y));
    }
  } 
};

Game.prototype.updateObjects = function () {
  var self = this;

  // update player position
  self.player.update();

  self.enemies.forEach(function(item) {
    item.update();
  });

  self.friends.forEach(function(item) {
    item.update()
  });

  self.lives.forEach(function(item) {
    item.update();
  });
};

Game.prototype.removeEnemiesThatAreOutsideOfScreen = function () {
  var self = this;
  self.enemies = self.enemies.filter(function(item) {
    return item.isInScreen();
  })
};

Game.prototype.checkIfEnemiesCollidedPlayer = function () {
  var self = this;

  self.enemies.forEach(function (item, index) {
    if (self.player.collidesWithEnemy(item)) {
      self.player.collided();
      self.message = new Message (self.canvasElement.getContext('2d'), item.x, item.y, 'oh nooooo');
      self.enemies.splice(index, 1);
      self.fart.play(); 
    }
  });
}

Game.prototype.checkIfFriendCollidedPlayer = function () {
  var self = this;

  self.friends.forEach( function(item, index) {
    if (self.player.collidesWithEnemy(item)) {
      self.score++;
      self.message = new Message (self.canvasElement.getContext('2d'), item.x, item.y, 'SUPER CUTE');
      self.friends.splice(index, 1);
      self.meow.play();
    }
  });
};

Game.prototype.checkIfLivesCollidedPlayer = function () {
  var self = this;
  self.lives.forEach( function(item, index) {
    if(self.player.collidesWithEnemy(item)) {
      self.player.collidedLive();
      self.message = new Message (self.canvasElement.getContext('2d'), item.x, item.y, 'Mountain Dew for LIFE!');
      self.live ++;
      self.player.drawCollision();
      self.lives.splice(index, 1);
      self.roar.play();
    }
  });
};

Game.prototype.draw = function (ctx) {
  var self = this;

  ctx.clearRect(0, 0, self.width, self.height);
  
  self.rainbows.forEach(function(item) {
    item.draw();
  });
  
  self.enemies.forEach(function (item) {
    item.draw();
  });
  
  self.friends.forEach(function(item) {
    item.draw()
  });
  
  self.lives.forEach(function(item) {
    item.draw()
  });
  
  self.player.draw();
  if (self.message) {
    self.message.draw();
    
    setTimeout(function() {
      self.message = "";
    }, 1000)
  }
  
  if (self.gameOverCounter > 0) {
    var alpha = 1 - self.gameOverCounter / 100;
    if (self.playerHasWon) {
      ctx.fillStyle = 'rgba(255, 255, 255, ' + alpha + ')';
    }
    else {
      ctx.fillStyle = 'rgba(0, 0, 0, ' + alpha + ')';
    }
    ctx.fillRect(0, 0, self.width, self.height);
  }
};

Game.prototype.checkGameOver = function () {
  var self = this;
  
  if (self.score === MAX_SCORE) {
    self.playerHasWon = true;
    self.gameOver();
  }
  
  if (self.timer <= 0) {
    clearInterval(self.intervalId)
    self.gameOver();
  }

  if (!self.player.lives) {
    self.gameOver();
  } 
};

Game.prototype.onOver = function (callback) {
  var self = this;

  self.onGameOverCallback = callback;
};

Game.prototype.gameOver = function () {
  var self = this;

  self.gameIsOver = true;
  self.gameOverAnimation = true;
  self.gameOverCounter = 100;
};

Game.prototype.destroyGame = function () {
  var self = this;

  window.clearInterval(self.clearRainbowInterval);
  document.body.removeEventListener('keydown', self.handleKeyDown);
  document.body.removeEventListener('keyup', self.handleKeyUp);
  self.onGameOverCallback();
};


Game.prototype.destroy = function () {
  var self = this;

  self.gameMain.remove();
};