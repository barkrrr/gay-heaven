'use strict';

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

  self.gameMain.querySelector('p').innerText = self.username;
  self.canvasParentElement = self.gameMain.querySelector('.canvas');
  self.canvasElement = self.gameMain.querySelector('canvas');

  self.livesElement = self.gameMain.querySelector('.lives .value');
  self.scoreElement = self.gameMain.querySelector('.score .value');


  document.body.appendChild(self.gameMain);

  self.width = self.canvasParentElement.offsetWidth;
  self.height = self.canvasParentElement.offsetHeight;

  self.canvasElement.setAttribute('width', self.width);
  self.canvasElement.setAttribute('height', self.height);

  self.player = new Player(self.canvasElement, 2);


  self.handleKeyDown = function (event) {
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
    if (event.key === 'ArrowRight') {
      self.player.setDirection('x', 0);
    } else if (event.key === 'ArrowLeft') {
      self.player.setDirection('x', 0);
    } else if (event.key === 'ArrowUp') {
      self.player.setDirection('y', 0);
    } else if (event.key === 'ArrowDown') {
      self.player.setDirection('y', 0);
    }
  };

  document.body.addEventListener('keydown', self.handleKeyDown);
  document.body.addEventListener('keyup', self.handleKeyUp);
  
  self.rainbows = [];
  self.enemies = [];
  self.friends = [];
  self.lives = [];

  self.startLoop();

  self.gameIsOver = false;

  self.startTimer()

};

Game.prototype.startTimer = function () {
  var self = this;
  self.intervalId = setInterval(function(){
    self.timer--;
  }, 1000)
}

Game.prototype.startLoop = function () {
  var self = this;

  var ctx = self.canvasElement.getContext('2d');

  document.body.addEventListener('keyup', function(){
    if (event.key === ' ') {
      self.isPause = !self.isPause;
      if (!self.isPause) {
          loop();
      //     self.music.play();
      // }
      // if (self.pause) {
      //   self.music.pause();
      }
    }
  });

  setInterval(function() {
      self.rainbows = [];
    }, 2000)
  

  function loop() {
  
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

    // run through the array of enemies
    // if x < 0 filter enemies out from array
    self.enemies = self.enemies.filter(function(item) {
      return item.isInScreen();
    })

    self.checkIfEnemiesCollidedPlayer();
    self.checkIfFriendCollidedPlayer();
    self.checkIfLivesCollidedPlayer();

    self.livesElement.innerText = self.player.lives;
    self.scoreElement.innerText = self.score;

    ctx.clearRect(0, 0, self.width, self.height);

    // Draw

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

    if (self.score === 10) {
      self.playerHasWon = true;
      self.gameOver();
    }
    
    if (self.timer <= 0) {
      clearInterval(self.intervalId)
      self.gameOver();
    }

    if (!self.gameIsOver && !self.isPause) { 
      window.requestAnimationFrame(loop);
    }
  }

  window.requestAnimationFrame(loop);
};

Game.prototype.checkIfEnemiesCollidedPlayer = function () {
var self = this;

  self.enemies.forEach(function (item, index) {
    if (self.player.collidesWithEnemy(item)) {
      self.player.collided();
      self.message = new Message (self.canvasElement.getContext('2d'), item.x, item.y, 'oh nooooo');
      self.enemies.splice(index, 1);

      if(!self.player.lives) {
        self.gameOver();
      }  
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
      self.lives.splice(index, 1);
    }
  });
};

Game.prototype.onOver = function (callback) {
  var self = this;

  self.onGameOverCallback = callback;
};

Game.prototype.gameOver = function () {
  var self = this;

  self.gameIsOver = true;
  self.onGameOverCallback();
};


Game.prototype.destroy = function () {
  var self = this;

  self.gameMain.remove();
};