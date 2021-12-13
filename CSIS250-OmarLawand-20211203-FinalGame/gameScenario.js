var mainMenuImage = new Image();
mainMenuImage.src = "finalGameAssets/mainMenuBackground.png";
var mainMenuImageLoaded = false;
mainMenuImage.onload = function () {
	mainMenuImageLoaded = true;
}

var gameOverImage = new Image();
gameOverImage.src = "finalGameAssets/purple.png";
var gameOverImageLoaded = false;
gameOverImage.onload = function () {
	gameOverImageLoaded = true;
}

var firstLevelImage = new Image();
firstLevelImage.src = "finalGameAssets/Background1-smaller.png";
var firstLevelImageLoaded = false;
firstLevelImage.onload = function () {
	firstLevelImageLoaded = true;
}

var secondLevelImage = new Image();
secondLevelImage.src = "finalGameAssets/Background-2.png";
var secondLevelImageLoaded = false;
secondLevelImage.onload = function () {
	secondLevelImageLoaded = true;
}

var thirdLevelImage = new Image();
thirdLevelImage.src = "finalGameAssets/Background-3.png";
var thirdLevelImageLoaded = false;
thirdLevelImage.onload = function () {
	thirdLevelImageLoaded = true;
}

var chairImage = new Image();
chairImage.src = "finalGameAssets/Chair.png";
var chairImageLoaded = false;
chairImage.onload = function () {
	chairImageLoaded = true;
}

var deskImage = new Image();
deskImage.src = "finalGameAssets/Table.png";
var deskImageLoaded = false;
deskImage.onload = function () {
	deskImageLoaded = true;
}

var lockerImage = new Image();
lockerImage.src = "finalGameAssets/Locker.png";
var lockerImageLoaded = false;
lockerImage.onload = function () {
	lockerImageLoaded = true;
}

var playerImage = new Image();
playerImage.src = "finalGameAssets/character.png";
var playerImageLoaded = false;
playerImage.onload = function () {
	playerImageLoaded = true;
}

var playerBulletImage = new Image();
playerBulletImage.src = "finalGameAssets/laserBlue02.png";
var playerBulletImageLoaded = false;
playerBulletImage.onload = function () {
	playerBulletImageLoaded = true;
}

var sidewaysPlayerBulletImage = new Image();
sidewaysPlayerBulletImage.src = "finalGameAssets/laserBlue02-tilted.png";
var sidewaysPlayerBulletImageLoaded = false;
sidewaysPlayerBulletImage.onload = function () {
	sidewaysPlayerBulletImageLoaded = true;
}

var enemyBulletImage = new Image();
enemyBulletImage.src = "finalGameAssets/laserRed02.png";
var enemyBulletImageLoaded = false;
enemyBulletImage.onload = function () {
	enemyBulletImageLoaded = true;
}

var sidewaysEnemyBulletImage = new Image();
sidewaysEnemyBulletImage.src = "finalGameAssets/laserRed02-tilted.png";
var sidewaysEnemyBulletImageLoaded = false;
sidewaysEnemyBulletImage.onload = function () {
	sidewaysEnemyBulletImageLoaded = true;
}

var enemyImage = new Image();
enemyImage.src = "finalGameAssets/enemy.png";
var enemyImageLoaded = false;
enemyImage.onload = function () {
	enemyImageLoaded = true;
}

//var explosionImage = new Image();
//explosionImage.src = "spaceshooter_assets/PNG/explosion1.png";

//var bossImage = new Image();
//bossImage.src = "spaceshooter_assets/PNG/Enemies/enemyRed4.png";

//var playerLifeImage = new Image();
//var imageLoaded = false;
//playerLifeImage.onload = function () {
//	imageLoaded = true;
//};
//playerLifeImage.src = "spaceshooter_assets/PNG/UI/playerLife1_blue.png";

var myGame = new Game(600, 600);

var player = new Player(89, 282, 3, 3, 50, 50);

//var boss = new Boss(10, -10, 5, 2, 200, 200);

var enemies = [];

var x = 500,
	y = 300;

for (var i = 0; i < 4; i++) {
	enemies.push(new Enemy(x, y, 3, 0, 50, 50, i));
	x += 50;
	myGame.addSprite(enemies[i]);
}

var secondLevelEnemies = [];
var secondLevelEnemiesActive = false;

var sEnemyX = 200, sEnemyY = 225;

for (var i = 0; i < 2; i++) {
	secondLevelEnemies.push(new SecondLevelEnemy(sEnemyX, sEnemyY, 50, 50, false));
	sEnemyX += 200;
	sEnemyY += 200;
	myGame.addSprite(secondLevelEnemies[i]);
}

//var lives = new Lives(10, 550, 33, 26);

var furniture = [];
var furnitureActive = false;

var chairX = 225,
	chairY = 175,
	deskX = 190,
	deskY = 125;

for (var i = 0; i < 4; i++) {
	
	if (i == 2) {
		chairY = 375;
		chairX = 225;
	}

	furniture.push(new Chair(chairX, chairY, 28, 43));

	chairX += 200;

	myGame.addSprite(furniture[i]);
}

for (var i = 4; i < 8; i++) {

	if (i == 6) {
		deskY = 325;
		deskX = 190;
	}

	furniture.push(new Desk(deskX, deskY, 100, 50));

	deskX += 200;

	myGame.addSprite(furniture[i]);
}

//myGame.addSprite(lives);
//myGame.addSprite(boss);
myGame.addSprite(player);
animate(myGame);