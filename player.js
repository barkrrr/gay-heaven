'use strict';

function Player(canvas, lives) {
  var self = this;
  
  self.image = new Image();
  self.image.src = './images/gay-god-downsized.png';
  self.canvasElement = canvas;
  self.lives = lives; 
  self.width = 80;
  self.height = 120;
  self.x = self.canvasElement.width / 2;
  self.y = self.canvasElement.height / 2;
  self.direction = {
    x: 0, 
    y: 0
  };
  self.speed = 5;
  self.ctx = self.canvasElement.getContext('2d');
}

Player.prototype.collided = function () {
  var self= this;

  self.lives--;
};

Player.prototype.collidedLive = function () {
  var self = this;
  self.lives++;

}  

Player.prototype.collidesWithEnemy = function (enemy) {
  var self = this;

  const collidesRight = self.x + self.width / 2 > enemy.x - enemy.width / 2;
  const collidesLeft = self.x - self.width / 2 < enemy.x + enemy.width / 2;
  const collidesTop = self.y - self.height / 2 < enemy.y + enemy.height / 2;
  const collidesBottom = self.y + self.height / 2 > enemy.y - enemy.height / 2;

  if (collidesLeft && collidesRight && collidesTop && collidesBottom) {
    self.direction.x = self.direction.x * -1
    self.direction.y = self.direction.y * -1
    return true;
  }
  
  return false;
}


Player.prototype.setDirection = function (axis, direction) {
  var self = this;
  if (axis === "y") {
    self.direction.y = direction;
  } else if (axis === "x") {
    self.direction.x = direction;
  }
};


Player.prototype.update = function () {
  var self = this;

  self.x = self.x + self.direction.x * self.speed;
  self.y = self.y + self.direction.y * self.speed;

  //Check X boundaries
  var minX = self.width / 2;
  var maxX = self.canvasElement.width - self.width / 2;
  if (self.x < minX) {
    self.x = minX;
  }
  if (self.x > maxX) {
    self.x = maxX;
  }
  
  //Check Y boundaries
  var minY = self.height / 2
  var maxY = self.canvasElement.height - self.height / 2;
  if (self.y < minY) {
    self.y = minY;
  }
  if (self.y > maxY) {
    self.y = maxY;
  }
};

Player.prototype.draw = function () {
  var self = this;

  var xPosition = self.x - self.width / 2;
  var yPosition = self.y - self.height / 2;
  self.ctx.drawImage(self.image, 0, 0, 80, 120, xPosition, yPosition, self.width, self.height);
};