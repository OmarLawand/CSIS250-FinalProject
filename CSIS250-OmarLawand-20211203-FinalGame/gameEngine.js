class Game {

	constructor(canvasWidth, canvasHeight) {
		this.canvas = document.getElementById("mainGame");

		if (this.canvas.getContext) {
			this.ctx = this.canvas.getContext("2d");
		}

		this.sprites = [];
		this.cw = canvasWidth;
		this.ch = canvasHeight;
		this.mainMenuImage = mainMenuImage;
		this.gameOverImage = gameOverImage;
		this.firstLevelImage = firstLevelImage;
		this.secondLevelImage = secondLevelImage;
		this.thirdLevelImage = thirdLevelImage;
		this.gameOver = false;
		this.gameWin = false;
		this.gameStart = true;
		this.currentLevel = 1;
		this.mainMenuMusic = document.getElementById("mainMenuMusic");
		this.midLevelMusic = document.getElementById("midLevelMusic");
		this.bossMusic = document.getElementById("bossMusic");
		this.midLevelMusicOn = false;
		this.mainMenuMusicOn = false;
		this.bossMusicOn = false;
	}

	addSprite(sprite) {
		this.sprites.push(sprite);
	}

	update() {
		if (!this.gameOver && !this.gameWin && !this.gameStart) {
			var spritesLength = this.sprites.length;

			for (var i = 0; i < spritesLength; i++) {
				if (this.sprites[i].enabled) {
					this.sprites[i].update();
				}
			}

			this.updateSpriteArrays();
		}
		else if (this.gameStart) {
			if (13 in keysDown)
				this.gameStart = false;
		}
		else {
			if (13 in keysDown) {
				location.reload();
			}
		}
	}

	draw() {

		this.redrawBackground();

		if (this.gameStart) {
			this.mainMenuScreen();
		}
		else if (this.gameOver) {
			this.gameOverScreen();
		}
		else if (this.gameWin) {
			this.gameWinScreen();
		}
		else {

			switch (this.currentLevel) {
				case 1:
					this.firstLevel();

					this.mainMenuMusic.pause();

					if (!this.midLevelMusicOn) {
						this.midLevelMusic.play();

						this.midLevelMusic.loop = true;

						this.midLevelMusicOn = true;
					}
					break;
				case 2:
					this.secondLevel();

					if (!furnitureActive) {
						for (var i = 0; i < furniture.length; i++) {
							furniture[i].active = true;
						}

						furnitureActive = true;
					}

					if (!secondLevelEnemiesActive) {
						for (var i = 0; i < secondLevelEnemies.length; i++) {
							secondLevelEnemies[i].isActive = true;
						}

						secondLevelEnemiesActive = true;
					}
					break;
				case 3:
					this.thirdLevel();

					if (furniture.length != 0) {
						for (var i = 0; i < furniture.length; i++) {
							furniture[i].enabled = false;
						}
					}

					if (!bossActive) {
						boss.active = true;
						bossActive = true;

						for (var i = 0; i < 4; i++) {
							laserOrbs[i].active = true;
						}
					}

					this.midLevelMusic.pause();

					if (!this.bossMusicOn) {
						this.bossMusic.play();

						this.bossMusic.loop = true;

						this.bossMusicOn = true;
					}
					break;
			}

			var spritesLength = this.sprites.length;

			for (var i = 0; i < spritesLength; i++) {
				this.sprites[i].draw(this.ctx);
			}
		}
	}

	//refreshing the background
	redrawBackground() {
		//clearing past frames
		this.ctx.beginPath();
		this.ctx.clearRect(0, 0, this.cw, this.ch);
		this.ctx.closePath();
	}

	firstLevel() {
		//drawing background
		if (firstLevelImageLoaded) {
			this.ctx.beginPath();
			this.ctx.drawImage(this.firstLevelImage, 0, 0);
			this.ctx.font = "13px Futuristic";
			this.ctx.fillStyle = "white";
			this.ctx.fillText("Eliminate All Threats To Proceed", 170, 45);
			this.ctx.closePath();
		}
	}

	secondLevel() {
		//drawing background
		if (secondLevelImageLoaded) {
			this.ctx.beginPath();
			this.ctx.drawImage(this.secondLevelImage, 0, 0);
			this.ctx.font = "13px Futuristic";
			this.ctx.fillStyle = "white";
			this.ctx.fillText("Eliminate All Threats To Proceed", 170, 45);
			this.ctx.closePath();
		}
	}

	thirdLevel() {
		if (thirdLevelImageLoaded) {
			//drawing background
			this.ctx.beginPath();
			this.ctx.drawImage(this.thirdLevelImage, 0, 0);
			this.ctx.font = "13px Futuristic";
			this.ctx.fillStyle = "white";
			this.ctx.fillText("Eliminate The Boss To Win", 170, 45);
			this.ctx.closePath();
		}
	}

	gameOverScreen() {
		this.ctx.beginPath();
		this.ctx.drawImage(this.gameOverImage, 0, 0, 600, 600);
		this.ctx.font = "50px Futuristic";
		this.ctx.fillStyle = "white";
		this.ctx.fillText("Game Over", 125, 125);
		this.ctx.font = "15px Futuristic";
		this.ctx.fillText("Press Enter To Restart The Game", 150, 200);
		this.ctx.closePath();
	}

	gameWinScreen() {
		this.ctx.beginPath();
		this.ctx.drawImage(this.gameOverImage, 0, 0, 600, 600);
		this.ctx.font = "45px Futuristic";
		this.ctx.fillStyle = "white";
		this.ctx.fillText("You Win! Congrats!", 50, 125);
		this.ctx.font = "15px Futuristic";
		this.ctx.fillText("Press Enter To Restart The Game", 100, 200);
		this.ctx.closePath();
	}

	mainMenuScreen() {
		this.ctx.beginPath();
		this.ctx.drawImage(this.mainMenuImage, 0, 0, 600, 600);
		this.ctx.font = "40px Futuristic";
		this.ctx.fillStyle = "white";
		this.ctx.fillText("Space Adventurer", 10, 125);
		this.ctx.font = "13px Futuristic";
		this.ctx.fillText("The Enemy Has Infiltrated Your Space Ship, Traverse It And", 10, 250);
		this.ctx.fillText("Eliminate All Threats", 10, 270);
		this.ctx.fillText("Use WASD Keys To Move And Space To Shoot", 10, 350);
		this.ctx.fillText("You Have 10 HitPoints", 10, 370);
		this.ctx.fillText("Press Enter To Start The Game", 10, 400);
		this.ctx.closePath();

		//if (!this.mainMenuMusicOn) {
		//	this.mainMenuMusic.play();

		//	this.mainMenuMusic.loop = true;

		//	this.mainMenuMusicOn = true;
		//}
	}

	updateSpriteArrays() {
		if (!this.gameOver) {
			var spritesLength = this.sprites.length;

			for (var i = 0; i < spritesLength; i++) {
				if (this.sprites[i] != undefined && !this.sprites[i].enabled) {
					this.sprites.splice(i, 1);
				}
			}

			var enemyAmount = enemies.length;

			for (var i = 0; i < enemyAmount; i++) {
				if (enemies[i] != undefined && !enemies[i].enabled) {
					enemies.splice(i, 1);
				}
			}

			if (secondLevelEnemiesActive) {
				var sEnemiesLength = secondLevelEnemies.length;

				for (var i = 0; i < sEnemiesLength; i++) {
					if (secondLevelEnemies[i] != undefined && !secondLevelEnemies[i].enabled) {
						secondLevelEnemies.splice(i, 1);
					}
				}
			}
		}
	}
}

class Sprite {

	constructor(x, y, velocityX, velocityY, width, height) {
		this.x = x;
		this.y = y;
		this.velocityX = velocityX;
		this.velocityY = velocityY;
		this.width = width;
		this.height = height;
		this.enabled = true;
	}

	update() { }

	draw() { }
}

class Bullet extends Sprite {

	constructor(x, y, velocityX, velocityY, width, height, shotByPlayer, directionShot) {
		super(x, y, velocityX, velocityY, width, height);

		this.shotByPlayer = shotByPlayer;

		if (this.shotByPlayer)
			this.image = playerBulletImage;
		else
			this.image = enemyBulletImage;

		this.directionShot = directionShot;
	}

	update() {
		switch (this.directionShot) {
			case 0:
				this.y += this.velocityY;
				break;
			case 1:
				this.x -= this.velocityX;
				break;
			case 2:
				this.x += this.velocityX;
				break;
			case 3:
				this.y -= this.velocityY;
				break;
		}

		if (this.y < 78 || this.x < 78 || this.x > 500 || this.y > 500) {
			this.enabled = false;
		}
		else if (this.enabled) {
			this.checkCollision();
		}
	}

	draw(pContext) {
		if (this.enabled) {
			if (playerBulletImageLoaded || sidewaysPlayerBulletImageLoaded || enemyBulletImageLoaded || sidewaysEnemyBulletImageLoaded) { //or enemy bullet
				pContext.beginPath();
				pContext.drawImage(this.image, this.x, this.y, this.width, this.height);
				pContext.closePath();
			}
		}
	}

	checkCollision() {
		if (this.shotByPlayer) {
			
			if (secondLevelEnemiesActive) {
				for (var i = 0; i < secondLevelEnemies.length; i++) {
					if (this.x + this.width >= secondLevelEnemies[i].x &&
						this.x <= secondLevelEnemies[i].x + secondLevelEnemies[i].width &&
						this.y + this.height >= secondLevelEnemies[i].y &&
						this.y <= secondLevelEnemies[i].y + secondLevelEnemies[i].height) {

						secondLevelEnemies[i].hitsTaken++;

						this.enabled = false;

						myGame.addSprite(new BloodAnim(secondLevelEnemies[i].x + 15, secondLevelEnemies[i].y + 10, 30, 30));
					}
				}
			}
			else {
				var enemyAmount = enemies.length;

				for (var i = 0; i < enemyAmount; i++) {
					if (this.x + this.width >= enemies[i].x &&
						this.x <= enemies[i].x + enemies[i].width &&
						this.y + this.height >= enemies[i].y &&
						this.y <= enemies[i].y + enemies[i].height) {

						enemies[i].hitsTaken++;

						this.enabled = false;

						myGame.addSprite(new BloodAnim(enemies[i].x + 15, enemies[i].y + 10, 30, 30));
					}
				}
			}

			if (boss.active &&
				boss.enabled &&
				this.x + this.width >= boss.x &&
				this.x <= boss.x + boss.width &&
				this.y + this.height >= boss.y &&
				this.y <= boss.y + boss.height) {

				boss.hitsTaken++;

				this.enabled = false;

				myGame.addSprite(new BloodAnim(boss.x + 30, boss.y + 30, 50, 50));
			}
		}
		else {
			if (this.x + this.width >= player.x &&
				this.x <= player.x + player.width &&
				this.y + this.height >= player.y &&
				this.y <= player.y + player.height) {

				player.hitsTaken++;
				//lives.lifeCount--;

				this.enabled = false;

				myGame.addSprite(new BloodAnim(player.x + 15, player.y + 10, 30, 30));
			}
		}
	}
}

class Enemy extends Sprite {

	constructor(x, y, velocityX, velocityY, width, height, enemyIndex) {
		super(x, y, velocityX, velocityY, width, height);
		this.image = enemyImage;
		this.hitsTaken = 0;
		this.hitPoints = 5;
		this.enemyIndex = enemyIndex;

		//used for timing the change of enemy turning directions
		this.prev = 0;

		this.frameIndexX = 0;
		this.frameIndexY = 0;
		this.tickCount = 0;
		this.ticksPerFrame = 4;
		this.numberOfFrames = 4;

		this.isMoving = true;
	}

	update() {
		this.tickCount++;

		if (this.tickCount > this.ticksPerFrame) {
			this.tickCount = 0;

			if (this.isMoving && this.frameIndexX < this.numberOfFrames) {
				this.frameIndexX++;
			}
			else if (this.frameIndexX == this.numberOfFrames) {
				this.frameIndexX = 0;
			}
		}

		if (this.hitsTaken == this.hitPoints)
			this.enabled = false;

		if (this.enabled)
			this.move();
	}

	draw(pContext) {
		if (this.enabled && enemyImageLoaded) {
			pContext.beginPath();
			pContext.drawImage(this.image, this.frameIndexX * 128, this.frameIndexY * 190, 128, 190, this.x, this.y, this.width, this.height);
			pContext.closePath();
		}
	}

	move() {
		switch (this.enemyIndex) {
			case 0:
				if (this.y > 400) {
					//moves the enemy to the left
					this.velocityY = 0;
					this.velocityX = 3;
					this.frameIndexY = 1;
				}
				else if (this.x < 400) {
					//moves the enemy downwards
					this.velocityY = 3;
					this.velocityX = 0;
					this.frameIndexY = 0;
				}
				else
					this.frameIndexY = 1;

				if (this.x < 100) {
					//stops the enemy moving
					this.velocityX = 0;
					this.velocityY = 0;
					this.frameIndexY = 3;
					this.isMoving = false;

					var now = new Date().getTime();

					if (now - this.prev > 700) {
						this.prev = now;

						myGame.addSprite(new Bullet(this.x + 23, this.y - 25, 5, 5, 8, 32, false, this.frameIndexY));
					}
				}
				break;
			case 1:
				if (this.y < 100) {
					//moves the enemy to the left
					this.velocityY = 0;
					this.velocityX = 3;
					this.frameIndexY = 1;
				}
				else if (this.x < 400) {
					//moves the enemy upwards
					this.velocityY = -3;
					this.velocityX = 0;
					this.frameIndexY = 3;
				}
				else
					this.frameIndexY = 1;

				if (this.x < 200) {
					//stops the enemy from moving
					this.velocityX = 0;
					this.velocityY = 0;
					this.frameIndexY = 0;
					this.isMoving = false;

					var now = new Date().getTime();

					if (now - this.prev > 500) {
						this.prev = now;

						myGame.addSprite(new Bullet(this.x + 23, this.y + 50, 7, 7, 8, 32, false, this.frameIndexY));
					}
				}
				break;
			case 2:
				if (this.y > 400) {
					//moves the enemy to the left
					this.velocityY = 0;
					this.velocityX = 3;
					this.frameIndexY = 1;
				}
				else if (this.x < 400) {
					//moves the enemy downwards
					this.velocityY = 3;
					this.velocityX = 0;
					this.frameIndexY = 0;
				}
				else
					this.frameIndexY = 1;

				if (this.x < 300) {
					//stops the enemy from moving
					this.velocityX = 0;
					this.velocityY = 0;
					this.frameIndexY = 3;
					this.isMoving = false;

					var now = new Date().getTime();

					if (now - this.prev > 700) {
						this.prev = now;

						myGame.addSprite(new Bullet(this.x + 23, this.y - 25, 5, 5, 8, 32, false, this.frameIndexY));
					}
				}
				break;
			case 3:
				if (this.y < 100) {
					//moves the enemy to the left
					this.velocityY = 0;
					this.velocityX = 3;
					this.frameIndexY = 1;
				}
				else if (this.x < 400) {
					//moves the enemy upwards
					this.velocityY = -3;
					this.velocityX = 0;
					this.frameIndexY = 3;
				}
				else
					this.frameIndexY = 1;

				if (this.x < 390) {
					//stops the enemy from moving
					this.velocityX = 0;
					this.velocityY = 0;
					this.frameIndexY = 0;
					this.isMoving = false;

					var now = new Date().getTime();

					if (now - this.prev > 500) {
						this.prev = now;

						myGame.addSprite(new Bullet(this.x + 23, this.y + 50, 7, 7, 8, 32, false, this.frameIndexY));
					}
				}
				break;
		}

		this.x -= this.velocityX;
		this.y += this.velocityY;
	}
}

class SecondLevelEnemy extends Sprite {
	constructor(x, y, width, height, isActive) {
		super(x, y, 0, 0, width, height);

		this.hitPoints = 10;
		this.hitsTaken = 0;
		this.isActive = isActive;
		this.image = enemyImage;

		//used for timing the change of enemy turning directions
		this.prev = 0;

		this.frameIndexX = 0;
		this.frameIndexY = 0;
		this.tickCount = 0;
		this.ticksPerFrame = 4;
		this.numberOfFrames = 4;
	}

	update() {
		if (this.isActive) {
			this.tickCount++;

			if (this.tickCount > this.ticksPerFrame) {
				this.tickCount = 0;

				if (this.isMoving && this.frameIndexX < this.numberOfFrames) {
					this.frameIndexX++;
				}
				else if (this.frameIndexX == this.numberOfFrames) {
					this.frameIndexX = 0;
				}
			}

			if (this.hitsTaken == this.hitPoints)
				this.enabled = false;

			if (this.enabled)
				this.shoot();
		}
	}

	draw(pContext) {
		if (this.isActive && enemyImageLoaded) {
			pContext.beginPath();
			pContext.drawImage(this.image, this.frameIndexX * 128, this.frameIndexY * 190, 128, 190, this.x, this.y, this.width, this.height);
			pContext.closePath();
		}
	}

	shoot() {
		var now = new Date().getTime();

		if (now - this.prev > 500) {
			this.prev = now;

			switch (this.frameIndexY) {
				case 0:
					myGame.addSprite(new Bullet(this.x + 23, this.y + 50, 10, 10, 8, 32, false, this.frameIndexY));
					break;
				case 1:
					myGame.addSprite(new Bullet(this.x - 20, this.y + 23, 10, 10, 32, 8, false, this.frameIndexY));
					break;
				case 2:
					myGame.addSprite(new Bullet(this.x + 50, this.y + 23, 10, 10, 32, 8, false, this.frameIndexY));
					break;
				case 3:
					myGame.addSprite(new Bullet(this.x + 23, this.y - 25, 10, 10, 8, 32, false, this.frameIndexY));
					break;
			}

			switch (this.frameIndexY) {
				case 0:
					this.frameIndexY = 1;
					break;
				case 1:
					this.frameIndexY = 3;
					break;
				case 2:
					this.frameIndexY = 0;
					break;
				case 3:
					this.frameIndexY = 2;
					break;
			}
		}
	}
}

class Boss extends Sprite {
	constructor(x, y, velocityX, velocityY, width, height) {
		super(x, y, velocityX, velocityY, width, height);
		this.image = enemyImage;
		this.hitsTaken = 0;
		this.hitPoints = 30;
		this.active = false;

		this.prev = 0;
	}

	update() {
		if (this.active) {
			if (this.hitsTaken == this.hitPoints) {
				this.enabled = false;
				myGame.gameWin = true;
			}
		}
	}

	draw(pContext) {
		if (this.active) {
			pContext.beginPath();
			pContext.drawImage(this.image, 0, 0, 128, 190, this.x, this.y, this.width, this.height);
			pContext.closePath();
		}
	}
}

var keysArePressed = [false, false, false, false];

var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;

	if (e.keyCode == 87) {
		keysArePressed[0] = true;
	}
	else if (e.keyCode == 83) {
		keysArePressed[1] = true;
	}
	else if (e.keyCode == 65) {
		keysArePressed[2] = true;
	}
	else if (e.keyCode == 68) {
		keysArePressed[3] = true;
	}

}, false);

addEventListener("keyup", function (e) {
	if (e.keyCode == 87) {
		keysArePressed[0] = false;
	}
	else if (e.keyCode == 83) {
		keysArePressed[1] = false;
	}
	else if (e.keyCode == 65) {
		keysArePressed[2] = false;
	}
	else if (e.keyCode == 68) {
		keysArePressed[3] = false;
	}

	delete keysDown[e.keyCode];
}, false);

class Player extends Sprite {
	constructor(x, y, velocityX, velocityY, width, height) {
		super(x, y, velocityX, velocityY, width, height);
		this.image = playerImage;
		this.hitsTaken = 0;
		this.hitPoints = 10;

		//used to throttle shooting
		this.prevBullet = 0;
		this.prevCollision = 0;

		this.frameIndexX = 0;
		this.frameIndexY = 0;
		this.tickCount = 0;
		this.ticksPerFrame = 5;
		this.numberOfFrames = 4;

		this.relocatePlayer1 = true;
		this.relocatePlayer2 = true;

		this.indexOfCollidedObj = -1;
	}

	update() {

		this.tickCount++;

		if (this.tickCount > this.ticksPerFrame) {
			this.tickCount = 0;

			var keysDownIsEmpty = true;

			for (var i = 0; i < keysArePressed.length; i++) {
				if (keysArePressed[i] == true)
					keysDownIsEmpty = false;
			}

			if (!keysDownIsEmpty && this.frameIndexX < this.numberOfFrames) {
				this.frameIndexX++;
			}
			else if (this.frameIndexX == this.numberOfFrames) {
				this.frameIndexX = 0;
			}
		}

		if (this.hitsTaken == this.hitPoints) {
			myGame.gameOver = true;
		}

		if (myGame.currentLevel == 1) {
			if (87 in keysDown && this.y > 78 && this.x < 500) {
				this.y -= this.velocityY;
				this.frameIndexY = 3;
			}
			if (83 in keysDown && this.y < 480 && this.x < 500) {
				this.y += this.velocityY;
				this.frameIndexY = 0;
			}
			if (65 in keysDown && this.x > 78) {
				this.x -= this.velocityX;
				this.frameIndexY = 1;
			}
			if (68 in keysDown && (this.x < 480 || (this.x < 600 && this.y > 270 && (this.y < 343 - this.height) && enemies.length == 0))) {
				this.x += this.velocityX;
				this.frameIndexY = 2;
			}
		}
		else if (myGame.currentLevel == 2) {
			if (87 in keysDown && this.y > 78 && this.x > 65) {
				if (this.checkCollision()) {
					if (this.checkSideCollision() != 1) {
						this.y -= this.velocityY;
					}
				}
				else {
					this.y -= this.velocityY;
				}
					
				this.frameIndexY = 3;
			}
			if (83 in keysDown && ((this.y < 480 && this.x > 65) || this.y < 600 && this.x > 250 && (this.x < 350 - this.width))) {
				if (this.checkCollision()) {
					if (this.checkSideCollision() != 3) {
						this.y += this.velocityY;
					}
				}
				else {
					this.y += this.velocityY;
				}

				this.frameIndexY = 0;
			}
			if (65 in keysDown && (this.x > 78 || (this.x > 0 && this.y > 250 && (this.y < 350 - this.height)))) {
				if (this.y < 485) {
					if (this.checkCollision()) {
						if (this.checkSideCollision() != 4) {
							this.x -= this.velocityX;
						}
					}
					else {
						this.x -= this.velocityX;
					}
				}

				this.frameIndexY = 1;
			}
			if (68 in keysDown && this.x < 480) {
				if (this.y < 485) {
					if (this.checkCollision()) {
						if (this.checkSideCollision() != 2) {
							this.x += this.velocityX;
						}
					}
					else {
						this.x += this.velocityX;
					}
				}

				this.frameIndexY = 2;
			}
		}
		else if (myGame.currentLevel == 3) {
			if (87 in keysDown && (this.y > 78 || (this.y > 0 && this.x > 250 && (this.x + this.width) < 340)) ) {
				this.y -= this.velocityY;
				this.frameIndexY = 3;
			}
			if (83 in keysDown && this.y < 480) {
				this.y += this.velocityY;
				this.frameIndexY = 0;
			}
			if (65 in keysDown && this.x > 78 && this.y > 70) {
				this.x -= this.velocityX;
				this.frameIndexY = 1;
			}
			if (68 in keysDown && this.x < 480 && this.y > 70) {
				this.x += this.velocityX;
				this.frameIndexY = 2;
			}
		}

		if (myGame.currentLevel == 1) {
			if (this.x > 590 && enemies.length == 0) {
				myGame.currentLevel++;

				if (this.relocatePlayer1) {
					this.x = 20;
					this.y = 270;
					this.relocatePlayer1 = false;
				}
			}
		}
		else if (myGame.currentLevel == 2) {
			if (this.y > 590 && secondLevelEnemies.length == 0) {
				myGame.currentLevel++;

				if (this.relocatePlayer2) {
					this.x = 275;
					this.y = 20;
					this.relocatePlayer2 = false;
				}
			}
		}

		var now = new Date().getTime();

		if (32 in keysDown) {
			if (now - this.prevBullet > 200) {
				this.prevBullet = now;

				switch (this.frameIndexY) {
					case 0:
						myGame.addSprite(new Bullet(this.x + 23, this.y + 50, 10, 10, 8, 32, true, this.frameIndexY));
						break;
					case 1:
						myGame.addSprite(new Bullet(this.x - 20, this.y + 23, 10, 10, 32, 8, true, this.frameIndexY));
						break;
					case 2:
						myGame.addSprite(new Bullet(this.x + 50, this.y + 23, 10, 10, 32, 8, true, this.frameIndexY));
						break;
					case 3:
						myGame.addSprite(new Bullet(this.x + 23, this.y - 25, 10, 10, 8, 32, true, this.frameIndexY));
						break;
				}
			}
		}
	}

	draw(pContext) {
		if (playerImageLoaded) {
			pContext.beginPath();
			pContext.drawImage(this.image, this.frameIndexX * 128, this.frameIndexY * 190, 128, 190, this.x, this.y, this.width, this.height);
			pContext.closePath();
		}
	}

	checkCollision() {
		var isColliding = false;

		for (var i = 0; i < furniture.length; i++) {
			if (this.x + this.width >= furniture[i].x &&
				this.x <= furniture[i].x + furniture[i].width &&
				this.y + this.height >= furniture[i].y &&
				this.y <= furniture[i].y + furniture[i].height) {
				isColliding = true;
				this.indexOfCollidedObj = i;
				break;
			}
		}

		return isColliding;
	}

	checkSideCollision() {
		var minimumDistance = 0,
			collidedSide = 0,
			distLeft, distRight, distTop, distBottom;

		for (var i = 0; i < furniture.length; i++) {
			if (i == this.indexOfCollidedObj) {
				distLeft = Math.abs(this.x - (furniture[i].x + furniture[i].width));
				distRight = Math.abs((this.x + this.width) - furniture[i].x);
				distTop = Math.abs(this.y - (furniture[i].y + furniture[i].height));
				distBottom = Math.abs((this.y + this.height) - furniture[i].y);

				minimumDistance = distRight;
				collidedSide = 2;

				if (distLeft < minimumDistance) {
					minimumDistance = distLeft;

					collidedSide = 4;
				}
				if (distTop < minimumDistance) {
					minimumDistance = distTop;

					collidedSide = 1;
				}
				if (distBottom < minimumDistance) {
					minimumDistance = distBottom;

					collidedSide = 3;
				}

				break;
			}
		}

		return collidedSide;
	}
}

class Lives extends Sprite {
	constructor(x, y, width, height) {
		super(x, y, 0, 0, width, height);
		this.image = playerLifeImage;
		this.lifeCount = 3;
	}

	update() {

	}

	draw(pContext) {
		var lifeX = 0;

		pContext.beginPath();
		
		for (var i = 0; i < this.lifeCount; i++) {
			if(imageLoaded){
				pContext.drawImage(this.image, this.x + lifeX, this.y, this.width, this.height);
				lifeX += this.width;
			}
		}
		pContext.closePath();
	}
}

class Chair extends Sprite {
	constructor(x, y, width, height) {
		super(x, y, 0, 0, width, height);
		this.image = chairImage;
		this.active = false;
	}

	update() { }

	draw(pContext) {
		if (this.active && chairImageLoaded) {
			pContext.beginPath();
			pContext.drawImage(this.image, this.x, this.y, this.width, this.height);
			pContext.closePath();
		}
	}
}

class Desk extends Sprite {
	constructor(x, y, width, height) {
		super(x, y, 0, 0, width, height);
		this.image = deskImage;
		this.active = false;
	}

	update() { }

	draw(pContext) {
		if (this.active && deskImageLoaded) {
			pContext.beginPath();
			pContext.drawImage(this.image, this.x, this.y, this.width, this.height);
			pContext.closePath();
		}
	}
}

class Locker extends Sprite {
	constructor(x, y, width, height) {
		super(x, y, 0, 0, width, height);
		this.image = lockerImage;
		this.active = false;
	}

	update() { }

	draw(pContext) {
		if (this.active && lockerImageLoaded) {
			pContext.beginPath();
			pContext.drawImage(this.image, this.x, this.y, this.width, this.height);
			pContext.closePath();
		}
	}
}

class LaserOrb extends Sprite {
	constructor(x, y, velocityX, velocityY, width, height, direction) {
		super(x, y, velocityX, velocityY, width, height);

		this.image = laserOrbImage;
		this.active = false;
		this.direction = direction;
		this.prev = 0;
		this.alternateShots = true;
		this.isMoving = true;
	}

	update() {
		if (this.active) {
			var now = new Date().getTime();

			switch (this.direction) {
				case 0:
					if (this.y > 100)
						this.y -= this.velocityY;
					else if (this.y <= 100)
						this.isMoving = false;

					if (now - this.prev > 500 && !this.isMoving) {
						this.prev = now;

						if (this.alternateShots) {
							myGame.addSprite(new Bullet(this.x + 50, this.y + 50, 10, 10, 8, 32, false, 3));
							myGame.addSprite(new Bullet(this.x + 50, this.y + 50, 10, 10, 8, 32, false, 0));
						}
						else {
							myGame.addSprite(new Bullet(this.x + 50, this.y + 50, 10, 10, 32, 8, false, 1));
							myGame.addSprite(new Bullet(this.x + 50, this.y + 50, 10, 10, 32, 8, false, 2));
						}

						this.alternateShots = !this.alternateShots;
					}
					break;
				case 1:
					if (this.x < 400)
						this.x += this.velocityX;
					else if (this.x >= 400)
						this.isMoving = false;

					if (now - this.prev > 500 && !this.isMoving) {
						this.prev = now;

						if (this.alternateShots) {
							myGame.addSprite(new Bullet(this.x + 50, this.y + 50, 10, 10, 32, 8, false, 1));
							myGame.addSprite(new Bullet(this.x + 50, this.y + 50, 10, 10, 32, 8, false, 2));
						}
						else {
							myGame.addSprite(new Bullet(this.x + 50, this.y + 50, 10, 10, 8, 32, false, 3));
							myGame.addSprite(new Bullet(this.x + 50, this.y + 50, 10, 10, 8, 32, false, 0));
						}

						this.alternateShots = !this.alternateShots;
					}
					break;
				case 2:
					if (this.y < 400)
						this.y += this.velocityY;
					else if (this.y >= 400)
						this.isMoving = false;

					if (now - this.prev > 500 && !this.isMoving) {
						this.prev = now;

						if (this.alternateShots) {
							myGame.addSprite(new Bullet(this.x + 50, this.y + 50, 10, 10, 8, 32, false, 3));
							myGame.addSprite(new Bullet(this.x + 50, this.y + 50, 10, 10, 8, 32, false, 0));
						}
						else {
							myGame.addSprite(new Bullet(this.x + 50, this.y + 50, 10, 10, 32, 8, false, 1));
							myGame.addSprite(new Bullet(this.x + 50, this.y + 50, 10, 10, 32, 8, false, 2));
						}

						this.alternateShots = !this.alternateShots;
					}
					break;
				case 3:
					if (this.x > 100)
						this.x -= this.velocityX;
					else if (this.x <= 100)
						this.isMoving = false;

					if (now - this.prev > 500 && !this.isMoving) {
						this.prev = now;

						if (this.alternateShots) {
							myGame.addSprite(new Bullet(this.x + 50, this.y + 50, 10, 10, 32, 8, false, 1));
							myGame.addSprite(new Bullet(this.x + 50, this.y + 50, 10, 10, 32, 8, false, 2));
						}
						else {
							myGame.addSprite(new Bullet(this.x + 50, this.y + 50, 10, 10, 8, 32, false, 3));
							myGame.addSprite(new Bullet(this.x + 50, this.y + 50, 10, 10, 8, 32, false, 0));
						}

						this.alternateShots = !this.alternateShots;
					}
					break;
			}
		}
	}

	draw(pContext) {
		if (this.active) {
			pContext.beginPath();
			pContext.drawImage(this.image, this.x, this.y);
			pContext.closePath();
		}	
	}
}

class BloodAnim extends Sprite {
	constructor(x, y, width, height) {
		super(x, y, 0, 0, width, height);

		this.image = bloodImage;
		this.frameIndexX = 0;
		this.tickCount = 0;
		this.ticksPerFrame = 5;
		this.numberOfFrames = 4;
	}

	update() {
		this.tickCount++;

		if (this.tickCount > this.ticksPerFrame) {
			this.tickCount = 0;

			if (this.frameIndexX < this.numberOfFrames) {
				this.frameIndexX++;
			}
			else if (this.frameIndexX == this.numberOfFrames) {
				this.enabled = false;
			}
		}
	}

	draw(pContext) {
		pContext.beginPath();
		pContext.drawImage(this.image, this.frameIndexX * 103, 0, 103, 93, this.x, this.y, this.width, this.height);
		pContext.closePath();
	}
}

window.requestAnimFrame = (function (callback) {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function (callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();

function animate(myGame) {
	myGame.update();
	myGame.draw();

	requestAnimationFrame(function () {
		animate(myGame);
	});
};