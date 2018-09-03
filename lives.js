'use strict;'

function Live(canvas, side) {
  var self = this;  

  self.canvas = canvas;
  self.direction = 0;
  self.size = 23;
  self.side = side
  if (self.side === 'top') {
    self.x =  canvas.width * Math.random();
    self.y = 0 - self.size
  } else if (self.side === 'left') {
    self.x =  0 - self.size
    self.y = canvas.height * Math.random();
  } else if (self.side === 'right') {
    self.x =  canvas.width + self.size;
    self.y = canvas.height * Math.random();
  }
  self.ctx = self.canvas.getContext('2d');
  self.speed = 8;
}


Live.prototype.isInScreen = function () {
  var self = this;
  if (self.side === 'right') {
    return self.x + self.size / 2 > 0;
  } else if (self.side === 'left') {
    return self.x + self.size / 2 < self.canvas.width;
  } else if (self.side === 'top') {
    return self.y + self.size / 2 < self.canvas.height;
  }
};

Live.prototype.update = function () {
  var self = this;
  
  if (self.side === 'top') {
    self.y = self.y + self.speed
  } else if (self.side === 'right') {
    self.x = self.x - self.speed;
  } else if (self.side === 'left') {
    self.x = self.x + self.speed
  }
};

Live.prototype.draw = function() {
  var self = this;
  self.ctx.fillStyle = 'yellow';
  var xPosition = self.x - self.size / 2;
  var yPosition = self.y - self.size / 2;
  self.ctx.fillRect(xPosition, yPosition, self.size, self.size);
};