# Project name: "Gay Heaven"

“Gay Heaven” is a Canvas based game with 1 player. 

The goal of the game is for the player to collect 10 “good”, gay-friendly items (which equals to 10 points) within 30 seconds. 
Items can be selected through colliding with the moving item. 

If the player picks a “wrong”, homophobe or Trump-friendly item, one point is deducted from the score. 

If the player doesn’t collect 10 points in 30 seconds, the game is over, and a “re-play” is offered on the game-over screen.

## MVP 

Technique

Html 5 and Vanilla Javascript

## Game states

- Splash screen
    - Title
    - Play button (transition to game screen)
  
- Game screen
    - Canvas
    - Transition: if you win or lose you go to the Game over screen
  
- Game Over Screen
    - with dom manipulation I will dynamicaly change the innerText of the message
    - Play again button (transiton to game screen)
    - Go to start screen button (transition to the splash screen)
  
## Tasks

- Create screen
- Create player
- Create enemies and friends
- Move player
    - Click on any of the "arrow" keys to move the player
- Move enemies and friends
- Check for collision
    - If collision with "friend", add point to score
    - If collision with "enemy", remove point from score
- Once 10 points have been reached -> Game Over -> Show Game Over screen 

## Back Log

-	Images (and GIFs?) that replace basic CANVAS objects (player and "friends" and "enemies").
-	Welcome screen background.
-	Add "special items" that provide player with extra time.
-	Sound.
-	A hellish background.
-	Transition to gay heaven when game ends.

## Data Structure

main.js
```
createSplashScreen(id);
createGameScreen(id);
createGameOverScreen(id);

destroyStartSreen();
destroyGameScreen();
destroyGameOverScreen();

var game = new Game ({
      this.rows , 
      this.columns , 
      ctx: ctx ,
      this.friends ,
      this. enemies ,
      this.player
});

game.init();
```
game.js
```
  function Game(){
    this.rows, 
    this.columns, 
    this.ctx,
    this.friends,
    this.enemies,
    this.player,
  };
  
  Game.drawScreen();
  Game.drawPlayer();
  Game.generateFriends();
  Game.generateEnemies();
  Game.gameOver();
  Game.init();
  Game.startLoop();

gameDestroy;
```
player.js
```
  function Player() {
    this.width;
    this.height;
    this.color;
  };
  Player.move();
  Player.checkCollisionsWithObjects();
  Player.checkBoundaries();
```
enemy.js
```
  function Enemies() {
    this.width;
    this.height;
    this.color;
  };
  Enemy.move();
  Enemy.checkCollisionsWithObjects();
  Enemy.checkBoundaries();
```
friend.js
``` 
  function Friends() {
    this.width;
    this.height;
    this.color;
  };
  Friend.move();
  Friend.checkCollisionsWithObjects();
  Friend.checkBoundaries();
```



     



