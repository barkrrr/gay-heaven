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
  var gameInstructionsMain;
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
        <button id="start-button">Start</button>
        <button id="instructions-button">Instructions</button>
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
      if(input.value = null) {
        idName = 'Trash';
      }
    };

    var startButton = splashMain.querySelector('#start-button');
    startButton.addEventListener('click', startGame);

    addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
        startGame();
      }
    }); 

    var instructionsButton = splashMain.querySelector('#instructions-button');
    instructionsButton.addEventListener('click', startInstructions);
  }

  function destroySplash() {
    splashMain.remove();
  }

  // -- Instructions

  function startInstructions () {
    destroySplash();
    buildInstructions();
  }

  function buildInstructions() {

    gameInstructionsMain = buildDom(`
      <main class="instructions">
      <div>
        <h1>How to... </h1>
      </div>
      </div>
        <p>Help Clint go to gay heaven ^-^ ...by avoiding his enemies, and collide with his favorite objects.</p>
        <p>Catch extra lives to extend the game! Or the fun is over after 30 secs, bro!</p>
        <p>Yayaya :) </p>
        <button id="return-button">Return to Start</button>
      </main>
    `);

    document.body.appendChild(gameInstructionsMain);

    var button = gameInstructionsMain.querySelector('button');
    button.addEventListener('click', startSplash);    
 

    function destroyInstructions() {
      gameInstructionsMain.remove();
    }

    function startSplash() {
      destroyInstructions();
      buildSplash();
    }

  }

  
  // -- game

  function startGame() {
    destroySplash();
    destroyGameOver();

    game = new Game();
    game.start();
    game.onOver(function () {
      gameOver(game.score, game.username, game.playerHasWon);
    });
  }

  function destroyGame() {
    game.destroy();
  }

  // -- game over 


  function gameOver(score, username, result) {
    destroyGame();
    buildGameOver(score, username, result);
  }

  function buildGameOver(score, username, result) {

    gameOverMain = buildDom(`
      <main class="gameover">
      <div>
        <h1></h1>
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

    var h1 = gameOverMain.querySelector('h1');
    if (result) {
      h1.innerText = "Yayaya you go to Gay Heaven!"
    } else {
      h1.innerText = "Dang! You stay in hell :("
    }

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