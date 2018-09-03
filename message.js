'use strict'

function Message(canvas, x, y, text) {
  var self = this;  

  self.canvas = canvas;
  self.x = x;
  self.y = y;
  self.text = text;
}


Message.prototype.update = function () {
  var self = this;

  if (self.side === 'top') {
    self.y = self.y + self.speed
  } else if (self.side === 'right') {
    self.x = self.x - self.speed;
  } else if (self.side === 'left') {
    self.x = self.x + self.speed
  }
};

Message.prototype.draw = function() {
  var self = this;

  self.canvas.fillText(self.text, self.x, self.y);
  
};