'use strict';

function Friend(canvas, side) {
  var self = this;
  
  self.image = new Image();
  self.image.src = './images/friendly-downsized.png';
  self.canvas = canvas;
  self.direction = 0;
  self.width = 25;
  self.height = 30;
  self.side = side
  if (self.side === 'top') {
    self.x =  canvas.width * Math.random();
    self.y = 0 - self.height
  } else if (self.side === 'left') {
    self.x =  0 - self.width
    self.y = canvas.height * Math.random();
  } else if (self.side === 'right') {
    self.x =  canvas.width + self.width;
    self.y = canvas.height * Math.random();
  }
  self.ctx = self.canvas.getContext('2d');
  self.speed = 6;
}


Friend.prototype.isInScreen = function () {
  var self = this;
  if (self.side === 'right') {
    return self.x + self.width / 2 > 0;
  } else if (self.side === 'left') {
    return self.x + self.width / 2 < self.canvas.width;
  } else if (self.side === 'top') {
    return self.y + self.height / 2 < self.canvas.height;
  }
};

Friend.prototype.update = function () {
  var self = this;

  if (self.side === 'top') {
    self.y = self.y + self.speed
  } else if (self.side === 'right') {
    self.x = self.x - self.speed;
  } else if (self.side === 'left') {
    self.x = self.x + self.speed
  }
};

Friend.prototype.draw = function () {
  var self = this;
  
  var xPosition = self.x - self.width / 2;
  var yPosition = self.y - self.height / 2;
  self.ctx.drawImage(self.image, 0, 0, 25, 30, xPosition, yPosition, self.width, self.height);
};