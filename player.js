'use strict';

function Player(canvas, lives) {
  var self = this;
  
  self.canvasElement = canvas;
  self.lives = lives; 
  self.direction = 0;
  self.size = 50;
  self.x = self.canvasElement.width / 2;
  self.y = self.canvasElement.height /2;
  self.direction = 0;
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

  const collidesRight = self.x + self.size / 2 > enemy.x - enemy.size / 2;
  const collidesLeft = self.x - self.size / 2 < enemy.x + enemy.size / 2;
  const collidesTop = self.y - self.size / 2 < enemy.y + enemy.size / 2;
  const collidesBottom = self.y + self.size / 2 > enemy.y - enemy.size / 2;

  if (collidesLeft && collidesRight && collidesTop && collidesBottom) {
    return true;
  }
  
  return false;
}


Player.prototype.setDirection = function (direction) {
  var self = this;

  self.direction = direction;
};

Player.prototype.update = function () {
  var self = this;

  self.x = self.x + self.direction * self.speed;

  if (self.x < 0){
    self.direction = 1;
  }

  if (self.x > self.canvasElement.width){
    self.direction = -1;
  }
};

Player.prototype.draw = function () {
  var self = this;

  self.ctx.fillStyle = 'blue';
  var xPosition = self.x - self.size / 2;
  var yPosition = self.y - self.size / 2;
  self.ctx.fillRect(xPosition, yPosition , self.size, self.size);
};