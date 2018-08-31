# Project name: "Gay Heaven"

“Gay Heaven” is a Canvas based game with 1 player. 

The goal of the game is for the player to collect 10 “good”, gay-friendly items (which equals to 10 points) within 30 seconds. 
Items can be selected through colliding with the moving item. 

Once 10 items have been collected, the game will end, and the player will move to “Gay Heaven”. 

If the player picks a “wrong”, homophobe or Trump-friendly item, one point is deducted from the score. 

If the player doesn’t collect 10 points in 30 seconds, the game is over, and a “re-play” is offered on the game-over screen.

## MVP 

Technique

Html 5 and Vanilla Javascript

Game states

- Splash screen
  Title
  Play button
  
- Game screen
  Canvas
  
- Game Over Screen
  Play again button
  Go to start screen button
  
Game

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

Back Log

-	Images (and GIFs?) that replace basic CANVAS objects (player and "friends" and "enemies")
-	Welcome screen background
-	Add "special items" that provide player with extra time
-	Sound (The Weather Girls, really?)
-	A hellish background (NYC wall of faces)
-	Transition to gay heaven when game ends (and “hot dog face” GIF)

Data Structure

main.js
createStartScreen(id);
createGameScreen(id);
createGameOverScreen(id);

destroyStartSreen();
destroyGameScreen();
destroyGameOverScreen();


- 	splashScreen
  build splash DOM
  add event listener

-   gameScreen
  remove splash / remove game over if game was played previously
  create the game
  key press event listeners
  create player
  create good items
  create bad items
  start loop

-   gameoverScreen
  game destroy
  build game over
  add event listener
  restart game

- 	heavenScreen
  game destroy
  build heaven screen
  add event listener
  restart game]

