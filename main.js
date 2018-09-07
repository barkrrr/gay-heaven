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
  var username;
  var input;
  
  function handleClickInputUsername(event) {
    if (!input.value) {
      username = 'Sweetie'
    } else {
      username = input.value;
    }
    startGame();
  }
  
  function handleEnterKeyUp(event) {
    if (event.key === 'Enter') {
      if (!input.value) {
        username = 'Trashy'
      } else {
        username = input.value;
      }
      startGame();
    }
  }

  // -- splash

  function buildSplash() {

    splashMain = buildDom(`
      <main class="splash">
      <div>
        <h1>Gay Heaven</h1>
      </div>
        <div>
          <img src="./images/kitty-downsized.png">
        </div>
        <div class="user-input">
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

    input = document.querySelector('input');
    input.setAttribute('size',input.getAttribute('placeholder').length);


    var startButton = splashMain.querySelector('#start-button');

    
    startButton.addEventListener('click', handleClickInputUsername); 

    document.addEventListener('keyup', handleEnterKeyUp); 

    var instructionsButton = splashMain.querySelector('#instructions-button');
    instructionsButton.addEventListener('click', startInstructions);

    // self.music = self.splashMain.querySelector('audio');
    // self.music.autoplay = true;
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
        <p>Help Clint escape from this Trumpish nightmare ^-^ ...by avoiding his enemies, and collide with his favorite objects.</p>
        <p>Catch extra lives to extend the game! You start with 3 lives, but the fun is over after 30 secs, lol!</p>
        <p>Of course you can take a pause for an extra sip of Mountain Dew...</p>
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

    document.removeEventListener('click', handleClickInputUsername);
    document.removeEventListener('keyup', handleEnterKeyUp);

    game = new Game(username);
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
        <div class="content">
          <h1></h1>
          <p><span></span></p>
          <button>Restart</button>
        </div>
        <footer>
          <p>Listen to Clint\'s new record "\Centuries\" on <a href="https://kiamrecords.bandcamp.com/album/centuries"</a> Kiam records <span>♥</span></p>
        </foooter>
      </main>
    `);

    var button = gameOverMain.querySelector('button');
    button.addEventListener('click', startGame);   
    
    var span = gameOverMain.querySelector('span');
    span.innerText = username+' your score is: ' + score + ' !!';

    var h1 = gameOverMain.querySelector('h1');
    if (result) {
      h1.innerText = "Yayaya you go to heaven!"
    } else {
      h1.innerText = "Dang! You stay in hell :("
    }

    document.body.appendChild(gameOverMain);
    
    var iframe = buildDom(`
      <iframe src="./music/LCDSoundsystem-New-York.mp3" allow="autoplay" style="display:none" id="iframeAudio"></iframe>
    `)

    document.body.appendChild(iframe);
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