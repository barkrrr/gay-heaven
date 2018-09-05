'use strict';

function Friend(canvas, side) {
  var self = this;
  
  self.friendsChoices = ['./images/kitty-downsized.png', './images/ice-cream-downsized.png'];
  self.image = new Image();
  self.image.src = self.getRandomImage();
  self.canvas = canvas;
  self.direction = 0;
  self.width = 40;
  self.height = 40;
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

Friend.prototype.getRandomImage = function() {
  var self = this;

  var randomNum = Math.floor(Math.random() * self.friendsChoices.length);
  return self.friendsChoices[randomNum];
};

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
  //self.ctx.fillRect(xPosition, yPosition, self.width, self.height)
  self.ctx.drawImage(self.image, 0, 0, self.width, self.height, xPosition, yPosition, self.width +20, self.height+20);
};