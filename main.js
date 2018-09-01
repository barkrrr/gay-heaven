'use strict';

var idName;

function buildDom(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}

function main() {

  var splashMain;
  var gameOverMain;

  var game; // instance of Game
  

  // -- splash

 function buildSplash() {

    splashMain = buildDom(`
      <main class="splash">
      <div>
        <h1>Gay Heaven</h1>
      </div>
        <div>
          <label>Username:</label>
          <input type="text" placeholder="What's your favorite ice cream?"></input>
        </div>
        <div>
        <button>Start</button>
        </div>
      </main>
    `);
    
    document.body.appendChild(splashMain);

    var input = document.querySelector('input');
    input.setAttribute('size',input.getAttribute('placeholder').length);

    input.addEventListener('keyup', function (){
        idName = username(input);
    })
    function username (item) {
      return item.value;
    };

    var button = splashMain.querySelector('button');
    button.addEventListener('click', startGame);

  }

  function destroySplash() {
    splashMain.remove();
  }

  
  // -- game

  function startGame() {
    destroySplash();
    destroyGameOver();

    game = new Game();
    game.start();
    game.onOver(function () {
      gameOver(game.score, game.username);
    });
  }

  function destroyGame() {
    game.destroy();
  }

  // -- game over 


  function gameOver(score, username) {
    destroyGame();
    buildGameOver(score, username);
  }

  function buildGameOver(score, username) {

    gameOverMain = buildDom(`
      <main class="gameover">
      <div>
        <h1>Game over :( </h1>
      </div>
      <div>
        <p><span></span></p>
        <button>Restart</button>
      </div>
      </main>
    `);

    var button = gameOverMain.querySelector('button');
    button.addEventListener('click', startGame);    
    
    var span = gameOverMain.querySelector('span');
    span.innerText = username+' your score is: ' + score + ' !!';

    document.body.appendChild(gameOverMain);
  }

  function destroyGameOver() {
    if (gameOverMain) {
      gameOverMain.remove();
    }
  }

  // -- initialize

  buildSplash();
}

window.addEventListener('load', main);