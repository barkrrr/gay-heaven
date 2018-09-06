'use strict'

function Rainbow(canvasElement, x, y) {
  var self = this;

  self.canvasElement = canvasElement;
  self.x = x;
  self.y = y;
  self.ctx = self.canvasElement.getContext('2d');
  self.radius = 80;

  self.image = new Image();
  self.image.src = './images/rainbow.png';
} 

Rainbow.prototype.draw = function () {
  var self = this;
  
  var xPosition = self.x - self.radius / 2;
  var yPosition = self.y - self.radius / 2;
  self.ctx.drawImage(self.image, xPosition, yPosition, self.radius +10, self.radius +10);
};