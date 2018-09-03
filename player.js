'use strict';

function Player(canvas, lives) {
  var self = this;
  
  self.canvasElement = canvas;
  self.lives = lives; 
  self.size = 50;
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

  const collidesRight = self.x + self.size / 2 > enemy.x - enemy.size / 2;
  const collidesLeft = self.x - self.size / 2 < enemy.x + enemy.size / 2;
  const collidesTop = self.y - self.size / 2 < enemy.y + enemy.size / 2;
  const collidesBottom = self.y + self.size / 2 > enemy.y - enemy.size / 2;

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
  //Check X collisions
  if (self.x - self.size / 2 < 0) self.direction.x = 0;
  if (self.x + self.size / 2 > self.canvasElement.width) self.direction.x = 0;

  //Check Y collisions
  if (self.y - self.size / 2 < 0) self.direction.y = 0;
  if (self.y + self.size / 2 > self.canvasElement.height) self.direction.y = 0;
};

Player.prototype.draw = function () {
  var self = this;

  self.ctx.fillStyle = 'blue';
  var xPosition = self.x - self.size / 2;
  var yPosition = self.y - self.size / 2;
  self.ctx.fillRect(xPosition, yPosition , self.size, self.size);
};