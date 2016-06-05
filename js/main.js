
//this is all the variables for the star background
var stars = [];
var numStars = 20; //<- 40 maybe good for mobile //250; <- that is good for desktop screen size//2000

var exitReload = 0;
var bulletPower = 0;
var bulletLoop;

$(document).ready(function () {
	
	// Obtain a reference to the canvas element
	// using its id.
	
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
	
	
	window.requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				function(callback) {
					window.setTimeout( callback, 1000 / 60 );
				};
})();

// starting hue for the explosion
var hue = 120;

var menu = true;
var mousePos;

var canvas2 = document.getElementById("canvas"),
   	ctx2 = canvas2.getContext("2d");
	   
	   
// Create all the stars
		for(var i = 0; i < numStars; i++) {
			var x = Math.round(Math.random() * canvas.width);
			var y = Math.round(Math.random() * canvas.height);
			var length = 1 + Math.random() * 2;
			var opacity = Math.random();
		
			// Create a new star and draw
			var star = new Star(x, y, length, opacity);
		
		// Add the the stars array
		stars.push(star);
		
		
	}
	   
	   

//setInterval(animateStar, 1000 / fps);

	
	// now we will setup our basic variables for the demo
 var canvas1 = document.getElementById("canvas"),
   	ctx1 = canvas1.getContext("2d"),
		//full screen dimensions
		//cw = canvas1.width,
		//ch = canvas1.height,
		// firework collection
		fireworks = [],
		// particle collection
		particles = [],
		
		// when launching fireworks with a click, too many get launched at once without a limiter, one launch per 5 loop ticks
		limiterTotal = 5,
		limiterTick = 0,
		// this will time the auto launches of fireworks, one launch per 80 loop ticks
		timerTotal = 60, //75
		timerTick = 0,
		mousedown = false;
		// mouse x coordinate,
		//mx,
		// mouse y coordinate
		//my;
		
// // set canvas dimensions
canvas1.width = canvas.width;
canvas1.height = canvas.height;
	
	
	
	
	//var joystick;
	
	//----------------------this guys sets up the virtual joystick. Thank you virtualjoystick.js--------------------------------//
		var joystick = new VirtualJoystick({
				container: document.getElementById('container'),
				mouseSupport: true,
				limitStickTravel: true,
				stationaryBase: true, // to make the joystick appear anywhere, set to false and comment out BaseX and BaseY
                      baseX: joyStickX, // this size is only good for mobile not tablets
                      baseY: joyStickY, // this size is only good for mobile not tablets
				stickRadius: 25
			});	
			
			joystick.destroy();
			
		var shootStick = new VirtualJoystick({
				container: document.getElementById('shootStick'),
				mouseSupport: true,
				limitStickTravel: true,
				stationaryBase: true, // to make the joystick appear anywhere, set to false and comment out BaseX and BaseY
                      baseX: shootStickX, // this size is only good for mobile not tablets
                      baseY: shootStickY, // this size is only good for mobile not tablets
				stickRadius: 25
			});
			
			shootStick.destroy();	
			
	
	var playerSize = 0;
	var bulletSize = 0;
	
	var playerPositionX = 0;
	var playerPositionY = 0;
	
	var x = 0;
	var y = 0;
	
	var playArea = 0;
	
	//var entities = [];
	var RandomShipFleet = [];
	var HunterFleet = [];
	var StalkerFleet = [];
	
	var score = 0;
	var lives = 3;
	
	
	var bulletClip = [];
	var LifePowerPack = [];
	var BulletPowerPack = [];
	//var numOfEnemyShips = 4;
	
	var bullet = new Object();
	var bulletPC = new Object();
	
	var Enemy1 = new Object();
	var Enemy2 = new Object();
	var Enemy3 = new Object();
	
	var LifePup = new Object();
	var BulletPup = new Object();
	
	var joyStickX = 0;
	var joyStickY = 0;
	var shootStickX = 0;
	var shootStickY = 0;
	var joyDirX = "";
	var joyDirY = "";
	var shootStickDirX = "";
	var shootStickDirY = "";
	var joyTouch = false;
	var shootStickTouch = false;
	
	var addtohome = addToHomescreen({
		maxDisplayCount: 0,
    	autostart: false,
		startDelay: .5,
		displayPace: .1
	});
	
	$("#score").hide();
	$("#restartBtn").closest('.ui-btn').hide();
	$("#restartDiv").hide();
	
	$("#dwnload").click(function(){
		
		addtohome.show();
		
	});
	
	
	
	//when the game is quit, the screen goes back to normal and the page is reloaded or a message appears
	$("#RG").click(function(){
		
		
		//window.location.reload();
		if(canvas.width > 500){
			
			if (document.exitFullscreen) {
					document.exitFullscreen();
			} else if (document.msExitFullscreen) {
					document.msExitFullscreen();
			} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
					document.webkitExitFullscreen();
			}
			
			
			window.location.reload();
			//alert("reload");
		}
		else if(canvas.width < 499){
			if(canvas.width < 261){
				
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.msExitFullscreen) {
					document.msExitFullscreen();
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if (document.webkitExitFullscreen) {
					document.webkitExitFullscreen();
				}
				
				
				window.location.reload();
			}
			else{
				alert("Please rotate your device and tap this button again to properly quit.");
			}
			//alert("hit the button");
		}
		
	
	});
	
	$("#restartBtn").click(function(){
		
		exitReload = 0;
		score = 0;
		lives = 3;
		bulletSpeed = 0;
		menu = false;
		RandomShipFleet = [];
		HunterFleet = [];
		StalkerFleet = [];
		bulletClip = [];
		LifePowerPack = [];
		BulletPowerPack = [];
		$("#score").html("Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower);
		$("#restartBtn").closest('.ui-btn').hide();
		$("#restartDiv").hide();
		
	});
	
	$("#RG").closest('.ui-btn').hide();
	$("#dwnload").closest('.ui-btn').hide();
	
	$("#container").on("touchend",function(){
									
		joyDirX = "";
		joyDirY = "";
		joyTouch = false;
		
	});
	
		$("#container").on("touchstart",function(){
									
			joyTouch = true; // the joystick was touched and now in the Update function it will be checking the direction of the joystick
			
		});

		$("#shootStick").on("touchstart",function(){
			
			//console.log("shoot stick");
			var bulletSpeed = 0;
			
			
			if(bulletPower >= 5){
				
				bulletSpeed = 200;
				//console.log(bulletSpeed);
				
			}
			if(bulletPower == 4){
				
				bulletSpeed = 250;
				//console.log(bulletSpeed);
				
			}
			if(bulletPower == 3){
				
				bulletSpeed = 300;
				//console.log(bulletSpeed);
				
			}
			if(bulletPower == 2){
				
				bulletSpeed = 350;
				//console.log(bulletSpeed);
				
			}
			if(bulletPower == 1){
				
				bulletSpeed = 400;
				//console.log(bulletSpeed);
				
			}
			if(bulletPower == 0){
				
				bulletSpeed = 500;
				//console.log(bulletSpeed);
			} 
				
			bulletLoop = setInterval(function(){
					
		    	bullet = jQuery.extend(true, {}, PlayerBullet);
				bullet.directionX = shootStickDirX;
				bullet.directionY = shootStickDirY;
				bullet.x = x;
				bullet.y = y;
				
				//Enemy1.x = Math.round(Math.random() * (canvas.width * .95));
				//Enemy1.y = Math.round(Math.random() * (canvas.height * .95));
				//Enemy1.direction = Math.round(Math.random() * 7);
				
				bulletClip.push(bullet);
				//console.log(bulletClip);
				
			}, bulletSpeed);
				shootStickTouch = true;
			
				$("#shootStick").on("touchend",function(){
									
				shootStickDirX = "";
				shootStickDirY = "";
				clearInterval(bulletLoop);
				shootStickTouch = false;
		
			});

			
		});
		
		
				//console.log(shootStickDirX);
				//console.log(shootStickDirY);
	
	//when the play button is pressed the full screen is started, the joystick is set up and the enemy interval is started
	$("#play").click(function(){
		
		//------------------------------this guys sets up full screen for the browsers--------------------------//
		
		if (!document.fullscreenElement &&    // alternative standard method
			!document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
				if (document.documentElement.requestFullscreen) {
						document.documentElement.requestFullscreen();
				} else if (document.documentElement.msRequestFullscreen) {
							document.documentElement.msRequestFullscreen();
				} else if (document.documentElement.mozRequestFullScreen) {
							document.documentElement.mozRequestFullScreen();
				} else if (document.documentElement.webkitRequestFullscreen) {
							document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
				}
		} //else {
			//if (document.exitFullscreen) {
					//document.exitFullscreen();
			//} else if (document.msExitFullscreen) {
					//document.msExitFullscreen();
			//} else if (document.mozCancelFullScreen) {
					//document.mozCancelFullScreen();
			//} else if (document.webkitExitFullscreen) {
					//document.webkitExitFullscreen();
			//}
		//}
		//----------------------End of full screen------------------------------------------//
		
		menu = false;
		
		$("#RG").closest('.ui-btn').show();
		
		//this makes the joystick
		 joystick = new VirtualJoystick({
				container: document.getElementById('container'),
				mouseSupport: true,
				limitStickTravel: true,
				stationaryBase: true, // to make the joystick appear anywhere, set to false and comment out BaseX and BaseY
                      baseX: joyStickX, // this size is only good for mobile maybe not tablets
                      baseY: joyStickY, // this size is only good for mobile maybe not tablets
				stickRadius: 25
			});	
			
		 shootStick = new VirtualJoystick({
				container: document.getElementById('shootStick'),
				mouseSupport: true,
				limitStickTravel: true,
				stationaryBase: true, // to make the joystick appear anywhere, set to false and comment out BaseX and BaseY
                      baseX: shootStickX, // this size is only good for mobile not tablets
                      baseY: shootStickY, // this size is only good for mobile not tablets
				stickRadius: 25
			});
			
			
		//this will create new enemies
		setInterval(function(){
					
		    Enemy1 = jQuery.extend(true, {}, RandomShip);
			Enemy1.x = Math.round(Math.random() * (canvas.width * .90));
			Enemy1.y = Math.round(Math.random() * (canvas.height * .90));
			Enemy1.direction = Math.round(Math.random() * 7);
			
			if(exitReload == 0){
					
				RandomShipFleet.push(Enemy1);
			
			}
			//$("#result").html(entities.length);
			//console.log(entities);
		}, 2500);
		
		setInterval(function(){
					
		    Enemy2 = jQuery.extend(true, {}, Hunter);
			Enemy2.x = Math.round(Math.random() * (canvas.width * .90));
			Enemy2.y = Math.round(Math.random() * (canvas.height * .90));
			
			if(exitReload == 0){
				
				HunterFleet.push(Enemy2);
			}
				
			
			//console.log(entities);
		}, 4500);	
		
		setInterval(function(){
					
		    Enemy3 = jQuery.extend(true, {}, Stalker);
			Enemy3.x = Math.round(Math.random() * (canvas.width * .90));
			Enemy3.y = Math.round(Math.random() * (canvas.height * .90));
			
			if(exitReload == 0){
					
				StalkerFleet.push(Enemy3);
			}
			//console.log(entities);
		}, 8000);	
		
		
		setInterval(function(){
					
		    LifePup = jQuery.extend(true, {}, LifePowerUp);
			LifePup.x = Math.round(Math.random() * (canvas.width * .90));
			LifePup.y = Math.round(Math.random() * (canvas.height * .90));
			
			if(exitReload == 0){
					
				LifePowerPack.push(LifePup);
			}
			//console.log(entities);
		}, 60000);
		
		setInterval(function(){
					
		    BulletPup = jQuery.extend(true, {}, BulletPowerUp);
			BulletPup.x = Math.round(Math.random() * (canvas.width * .90));
			BulletPup.y = Math.round(Math.random() * (canvas.height * .90));
			
			if(exitReload == 0){
					
				BulletPowerPack.push(BulletPup);
			}
			//console.log(entities);
		}, 30000);		
		
		
		
		
		$("#play").closest('.ui-btn').css("margin-top", "90%");
		$("h2").hide();
		$("#score").show();

	});
	
	
	//going to be used to shoot using the mouse
	$("#canvas").click(function(evt){
		
		mousePos = getMousePos(canvas, evt);
        var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
		//console.log(message);
		
		if(menu == false){
			//bullet = jQuery.extend(true, {}, PlayerBullet);
			//bullet.directionX = mousePos.x;
			//bullet.directionY = mousePos.y;
			//bullet.x = x;
			//bullet.y = y;
				
			//bulletClip.push(bullet);
		}
	});
	

	// Start listening to resize events and
	// draw canvas and character sizes.
	initialize(); // this is the function that will look at the browser window size and will resize everything

	function initialize() {
	// Register an event listener to
	// call the resizeCanvas() function each time
	// the window is resized.
		window.addEventListener('resize', resizeCanvas, false);
		
	// Draw canvas border for the first time.
		resizeCanvas();
	}
	
	// Display custom canvas.
	function redraw() {
		//ctx.strokeStyle = 'blue';
		ctx.lineWidth = '.1';
		ctx.strokeRect(0, 0, window.innerWidth, window.innerHeight);
		
		//Resize character sizes
		var playersSizeW = canvas.width * .01;
		var playerSizeH = canvas.height * .01;
		
		var bulletSizeW = canvas.width * .004;
		var bulletSizeH = canvas.height * .004;
		
		playerSize = (playersSizeW + playerSizeH); //playerSize is about 19.43999 px
		bulletSize = (bulletSizeW + bulletSizeH);
		
		
		//when the screen size changes, the player will be redirected to the center of the screen
		playerPositionX = canvas.width * .50;
		playerPositionY = canvas.height * .50;
		
		//this will update the players position if the screen size changes
		x = playerPositionX;
        y = playerPositionY;
		
		canvas1.width = canvas.width;
		canvas1.height = canvas.height;
					
		
	}
	// Runs each time the DOM window resize event fires.
	// Resets the canvas dimensions to match window,
	// then draws the new borders accordingly.
	function resizeCanvas() {
		
		//This will dynamically resize the game play area		
		canvas.width = (window.innerWidth) * .72;
		canvas.height = (window.innerHeight) * .80; //.80
		
		//console.log("Canvas Width " + canvas.width);
		//$("#result").html(canvas.width); //display the screen size/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		
		
		
		// Create all the stars
		for(var i = 0; i < numStars; i++) {
			var x = Math.round(Math.random() * canvas.width);
			var y = Math.round(Math.random() * canvas.height);
			var length = 1 + Math.random() * 2;
			var opacity = Math.random();
		
			// Create a new star and draw
			var star = new Star(x, y, length, opacity);
		
		// Add the the stars array
		stars.push(star);
		
		
	}
		
		
		
		
		// if(canvas.width <= 428){		
			
		// 	joyStickX = (window.innerWidth) * .68;
		// 	joyStickY = (window.innerHeight) * .30;
			
		// }
		
		if(canvas.width >= 241){
			
			joyStickX = (window.innerWidth) * .93;
			joyStickY = (window.innerHeight) * .60;	
			
			shootStickX = (window.innerWidth) * .05;
			shootStickY = (window.innerHeight) * 0.75;
			
			//$("#play").closest('.ui-btn').show();
			
		}
		
		if(canvas.width <= 300){
			
			$("#play").closest('.ui-btn').hide();
			$("#dwnload").closest('.ui-btn').show();
			// $("#restartBtn").closest('.ui-btn').hide();
			// $("#restartDiv").hide();
			$("#rotWar").show();
			
		}
		
		 else if(canvas.width >= 399){
			
		 	$("#play").closest('.ui-btn').show();
			 $("#dwnload").closest('.ui-btn').hide();
			 
			 if(exitReload == 1){
			 
			 	$("#restartBtn").closest('.ui-btn').show();
				 $("#restartDiv").show();
			 }
			 $("#rotWar").hide();
			 //exitReload = 0;
		 }	
		
		//console.log("Canvas Height " + canvas.height);		
		
		redraw();
	}
		
		//this is the players starting position. This is the center of the play area
		playerPositionX = canvas.width * .50;
		playerPositionY = canvas.height * .50;
		
		x = playerPositionX; //player 1 positioning
		y = playerPositionY;
		
        // This is the players velocity, speed, friction and an array of keys that are being pressed    
        var velY = 0,
            velX = 0,
            speed = 6,
            friction = 0.3, //0.98
            keys = [];
			
		var buttup = $("#UpButton");
		var timeout;
		
		//---------------------------------button movements-----------------------------------------------//
		
		
		
		$("#UpButton").on("touchstart",function() {
			 timeout = setInterval(function(){
				if (velY > -speed) {
						velY--;
						
                }
			}, 10);
			
		});
		
		//$("#UpButton").on("vmouseover",function() { // an attempt to hit two buttons at once. Good for some kind of drunk maze game combined with touchstart movement
			 //timeout = setInterval(function(){
				//if (velY > -speed) {
						//velY--;
						
                //}
			//}, 10);
			
		//});
		
		$("#UpButton").on("touchend",function(){
			
			clearInterval(timeout);
			
		});
		
		//$("#UpButton").on("vmouseout",function(){ // an attempt to hit two buttons at once. Good for some kind of drunk maze game combined with touchstart movement
			
			//clearInterval(timeout);
			
		//});
		
		
		$("#DwnButton").on("touchstart",function() {
			 timeout = setInterval(function(){
				if (velY < speed) {
                    velY++;
                }
			}, 10);
			
		});
		
		//$("#DwnButton").on("vmouseover",function() { // an attempt to hit two buttons at once. Good for some kind of drunk maze game combined with touchstart movement
			 //timeout = setInterval(function(){
				//if (velY < speed) {
                    //velY++;
                //}
			//}, 10);
			
		//});
		
		$("#DwnButton").on("touchend",function(){
			
			clearInterval(timeout);
			
		});
		
		//$("#DwnButton").on("vmouseout",function(){ // an attempt to hit two buttons at once. Good for some kind of drunk maze game combined with touchstart movement
			
			//clearInterval(timeout);
			
		//});
		
		
		$("#lftButton").on("touchstart",function() {
			 timeout = setInterval(function(){
				if (velX > -speed) {
                    velX--;
                }
			}, 10);
			
		});
		
		//$("#lftButton").on("vmouseover",function() { // an attempt to hit two buttons at once. Good for some kind of drunk maze game combined with touchstart movement
			 //timeout = setInterval(function(){
				//if (velX > -speed) {
                    //velX--;
                //}
			//}, 10);
			
		//});
		
		$("#lftButton").on("touchend",function(){
			
			clearInterval(timeout);
			
		});
		
		//$("#lftButton").on("vmouseout",function(){ // an attempt to hit two buttons at once. Good for some kind of drunk maze game combined with touchstart movement
			
			//clearInterval(timeout);
			
		//});
		
		
		$("#rghtButton").on("touchstart",function() {
			 timeout = setInterval(function(){
				if (velX < speed) {
                    velX++;
                }
			}, 10);
			
		});
		
		//$("#rghtButton").on("vmouseover",function() { // an attempt to hit two buttons at once. Good for some kind of drunk maze game combined with touchstart movement
			 //timeout = setInterval(function(){
				//if (velX < speed) {
                    //velX++;
                //}
			//}, 10);
			
		//});
		
		$("#rghtButton").on("touchend",function(){
			
			clearInterval(timeout);
			
		});
		
		//$("#rghtButton").on("vmouseout",function(){ // an attempt to hit two buttons at once. Good for some kind of drunk maze game combined with touchstart movement
			
			//clearInterval(timeout);
			
		//});
			
		//------------------------button movements end---------------------------------------------//	

        function update() { //------------player movement with keyboard---------------------------------//
			
			//the update function does two things, draws the characters and enemies and tracks their movement positions
			
			//this will track what keys are pressed and will update the players position
			
			//this is for the arrow keys control
            if (keys[38]) {
                if (velY > -speed) {
                    velY -= 6;
					//$("#result").html("X: " + x + " Y: " + y);
                }
            }

            if (keys[40]) {
                if (velY < speed) {
                    velY += 6;
					//$("#result").html("X: " + x + " Y: " + y);
                }
            }
            if (keys[39]) {
                if (velX < speed) {
                    velX += 6;
					//$("#result").html("X: " + x + " Y: " + y);
                }
            }
            if (keys[37]) {
                if (velX > -speed) {
                    velX -= 6;
					//$("#result").html("X: " + x + " Y: " + y);
                }
            }
			
			
			//-----------------player movement with keyboard end --------------------------------------------//
			
			
		
			
			
			
			//-----------------player movement with VirtualJoyStick.js Thank You!-------------------------------//
			
		if(joyTouch == true && exitReload == 0){
			
			if (joystick.up()) {
	
				joyDirY = "up";
				joyDirX = "";
						
				if (joystick.right()) {
						
					joyDirX = "right";

					}
						
					if (joystick.left()) {

						joyDirX = "left";

					}
				}

				if (joystick.down()) {

					joyDirY = "down";
					joyDirX = "";
						
					if (joystick.right()) {

						joyDirX = "right";
					}
					if (joystick.left()) {
						
						joyDirX = "left";
					}
				}
					
					
				if (joystick.right()) {

					joyDirX = "right";
					joyDirY = "";
						
					if(joystick.up()){
							
						joyDirY = "up";
					}
					if(joystick.down()){
							
						joyDirY = "down";
					}
						
				}
				if (joystick.left()) {

					joyDirX = "left";
					joyDirY = "";
						
					if(joystick.up()){
							
						joyDirY = "up";
					}
					if(joystick.down()){
							
						joyDirY = "down";
					}
				}
				
					//console.log(joyDirX);
					//console.log(joyDirY);
					
				if(joyDirX == "left" && joyDirY == "up"){
						
							velX -= 6;
							velY -= 6;
						
					}
					else if(joyDirX == "left" && joyDirY == "down" ){
						
							velY += 6;
							velX -= 6;
						
					}
					else if(joyDirY == "up" && joyDirX == "right"){
						
							velY -= 6;
							velX += 6;
						
					}
					else if(joyDirY == "down" && joyDirX == "right"){
						
							velY += 6;
							velX += 6;
						
					}
					else if(joyDirX == "left"){
						
							velX -= 6;
						
					}
					else if(joyDirX == "right"){
						
							velX += 6;
						
					}
					else if(joyDirY == "up"){
						
							velY -= 6;
						
					}
					else if(joyDirY == "down"){
						
							velY += 6;
						
					}
			
			}
			
			
			//------------------This is how the left joystick shoots ---------------------//
		if(shootStickTouch == true && exitReload == 0){
			
			
			if (shootStick.up()) {
	
				shootStickDirY = "up";
				shootStickDirX = "";
						
				if (shootStick.right()) {
						
					shootStickDirX = "right";

					}
						
					if (shootStick.left()) {

						shootStickDirX = "left";

					}
				}

				if (shootStick.down()) {

					shootStickDirY = "down";
					shootStickDirX = "";
						
					if (shootStick.right()) {

						shootStickDirX = "right";
					}
					if (shootStick.left()) {
						
						shootStickDirX = "left";
					}
				}
					
					
				if (shootStick.right()) {

					shootStickDirX = "right";
					shootStickDirY = "";
						
					if(shootStick.up()){
							
						shootStickDirY = "up";
					}
					if(shootStick.down()){
							
						shootStickDirY = "down";
					}
						
				}
				if (shootStick.left()) {

					shootStickDirX = "left";
					shootStickDirY = "";
						
					if(shootStick.up()){
							
						shootStickDirY = "up";
					}
					if(shootStick.down()){
							
						shootStickDirY = "down";
					}
				}
			}		
			//console.log(shootStickDirX);
			//console.log(shootStickDirY);
			
			
            velY *= friction; //friction and final positioning
            y += velY;
            velX *= friction;
            x += velX;
			
			
			if (x > canvas.width - playerSize) { // colision with game boarders x-axis playerSize is about 19.43999
                x = canvas.width - playerSize;
            } else if (x < playerSize) {
                x = playerSize + 2;
            }
			
			if (y > canvas.height - playerSize) { // colision with game boarders y-axis playerSize is about 19.43999
                y = canvas.height - playerSize;
            } else if (y < playerSize) {
                y = playerSize + 2;
            }
			
			
			
			
			
			
			
			
			//-----------This will detect colisions in the game--------------------//
			
			//this is a boiler plate colision test
			// if (object1.x < object2.x + object2.width  && object1.x + object1.width  > object2.x &&
			// object1.y < object2.y + object2.height && object1.y + object1.height > object2.y) {
			// 	// The objects are touching
			// }
			
			//this is a colision with the test ai guy
			// if (x < enemy.x + playerSize  && x + playerSize  > enemy.x &&
			// y < enemy.y + playerSize && y + playerSize > enemy.y) {
			// 	// The objects are touching
				
			// 	velX *= friction - 10; //this will stop the player from moving
			// 	velY *= friction - 10;
			// }
			
			
			
			//this part will draw the characters
            
			ctx.clearRect(0, 0, canvas.width, canvas.height); // this will clear and redraw the canvas for new values and positions
			
			

			// if(menu == false){
			
			// 	ctx.beginPath(); //this is the player
			// 	ctx.fillStyle = "#A23BEC";
			// 	ctx.arc(x, y, playerSize, 0, Math.PI * 2); // draw the player playerSize is about 19.43999
			// 	ctx.fill();
			// 	ctx.closePath();
			// }
						
            // ctx.beginPath(); // this is the ai guy
            // ctx.fillStyle = "black";
            // ctx.arc(target.Ex, target.Ey, playerSize, 0, Math.PI * 2); // draws the ai. ai has hard coded position
            // ctx.fill();
            // ctx.closePath();

			$("canvas:nth-child(2)").hide();
            setTimeout(update, 30); //refresh the screen to update positions
			
			//----------------------------------------------------------
			draw();	//this draws all the enemies in the game area
			
			
				

        }
		
		
		
		var target = {
        	Ex: Math.round(Math.random() * (canvas.width * .90)),
       	    Ey: Math.round(Math.random() * (canvas.height * .90))
         };
		 
		 
		 var PlayerBullet = {
  			color: "yellow",
  			x: x,
  			y: y,
			directionX: shootStickDirX,
			directionY: shootStickDirY,
 			draw: function() {
				ctx.beginPath(); // this is the ai guy
    			ctx.fillStyle = this.color;
    			ctx.arc(this.x, this.y, bulletSize, 0, Math.PI * 7);
				ctx.fill();
            	ctx.closePath();
 			 },
			 movement: function(){
				 
				 //this will make make the bullet move to the direction of the joystick
				if(this.directionX == "left" && this.directionY == "up"){
						
							this.x -= 7;
							this.y -= 7;
						
					}
					else if(this.directionX == "left" && this.directionY == "down" ){
						
							this.y += 7;
							this.x -= 7;
						
					}
					else if(this.directionX == "right" && this.directionY == "up"){
						
							this.y -= 7;
							this.x += 7;
						
					}
					else if(this.directionX == "right" && this.directionY == "down"){
						
							this.y += 7;
							this.x += 7;
						
					}
					else if(this.directionX == "left"){
						
							this.x -= 7;
						
					}
					else if(this.directionX == "right"){
						
							this.x += 7;
						
					}
					else if(this.directionY == "up"){
						
							this.y -= 7;
						
					}
					else if(this.directionY == "down"){
						
							this.y += 7;
						
					}
				 
				 
			 },
			//  movementPC: function(){
				 
			// 	 console.log(mousePos.x)
			// 	 //this will make direct the enemy move in the direction of the player
			// 	 if(this.x < mousePos.x){
					 
			// 		 this.x += 7;
			// 	 }
			// 	 if(this.x >= mousePos.x){
					 
			// 		 this.x -= 7;
			// 	 }
			// 	 if(this.y <= mousePos.y){
					 
			// 		 this.y += 7;
			// 	 }
			// 	 if(this.y >= mousePos.y){
					 
			// 		 this.y -= 7;
			// 	 }
				 
				 
			//  }
			  
		};
		
		
		
		var RandomShip = {
  			color: "green",
  			x: Math.round(Math.random() * (canvas.width * .90)),
  			y: Math.round(Math.random() * (canvas.height * .90)),
			direction: randomDirection = Math.round(Math.random() * 7),
 			draw: function() {
				ctx.beginPath(); // this is the ai guy
    			ctx.fillStyle = this.color;
    			ctx.arc(this.x, this.y, playerSize, 0, Math.PI * 2);
				ctx.fill();
            	ctx.closePath();
 			 },
			 movement: function(){
				 
				 //this will make direct the enemy to move in a random location
				 
				 if(this.direction == 0){
					 this.x -= 1.7;
				 }
				 if(this.direction == 1){
					 this.x += 1.7;
				 }
				 if(this.direction == 2){
					 this.y -= 1.7;
				 }
				 if(this.direction == 3){
					 this.y += 1.7;
				 }
				 if(this.direction == 4){
					 this.y += 1.7;
					 this.x += 1.7;
				 }
				 if(this.direction == 5){
					 this.y -= 1.7;
					 this.x -= 1.7;
				 }
				 if(this.direction == 6){
					 this.y += 1.7;
					 this.x -= 1.7;
				 }
				 if(this.direction == 7){
					 this.y -= 1.7;
					 this.x += 1.7;
				 }				 
				 //when an enemy hits the wall, this will check the direction it was moving and make it move the revirse direction
				if (this.direction == 1 && this.x >= canvas.width - playerSize) { // colision with game boarders x-axis //original size 15, now playerSize is about 19.43999
                	this.x = canvas.width - playerSize;
					this.direction = 0;
            	}
				else if (this.direction == 4 && this.x >= canvas.width - playerSize) { // colision with game boarders x-axis //original size 15, now playerSize is about 19.43999
                	this.x = canvas.width - playerSize;
					this.direction = 6;
            	}
				else if (this.direction == 7 && this.x >= canvas.width - playerSize) { // colision with game boarders x-axis //original size 15, now playerSize is about 19.43999
                	this.x = canvas.width - playerSize;
					this.direction = 5;
            	}
				else if (this.direction == 0 && this.x < playerSize) {
                	this.x = playerSize;
					this.direction = 1;
            	}
				else if (this.direction == 5 && this.x < playerSize) {
                	this.x = playerSize;
					this.direction = 7;
            	}
				else if (this.direction == 6 && this.x < playerSize) {
                	this.x = playerSize;
					this.direction = 4;
            	}
				else if (this.direction == 3 && this.y > canvas.height - playerSize) { // colision with game boarders y-axis //original size 15, now playerSize is about 19.43999
                	this.y = canvas.height - playerSize;
					this.direction = 2;
            	}
				else if (this.direction == 4 && this.y > canvas.height - playerSize) { // colision with game boarders y-axis //original size 15, now playerSize is about 19.43999
                	this.y = canvas.height - playerSize;
					this.direction = 7;
            	}
				else if (this.direction == 6 && this.y > canvas.height - playerSize) { // colision with game boarders y-axis //original size 15, now playerSize is about 19.43999
                	this.y = canvas.height - playerSize;
					this.direction = 5;
            	}    
				else if (this.direction == 2 && this.y < playerSize) {
                 	this.y = playerSize;
				 	this.direction = 3;
            	 }
				 else if (this.direction == 5 && this.y < playerSize) {
                 	this.y = playerSize;
				 	this.direction = 6;
            	 }
				  else if (this.direction == 7 && this.y < playerSize) {
                 	this.y = playerSize;
				 	this.direction = 4;
					
            	 }
				 
			 }
			  
		};
		
		var Hunter = {
  			color: "orange",
  			x: Math.round(Math.random() * (canvas.width * .90)),
  			y: Math.round(Math.random() * (canvas.height * .90)),
 			draw: function() {
				ctx.beginPath(); // this is the ai guy
    			ctx.fillStyle = this.color;
    			ctx.arc(this.x, this.y, playerSize, 0, Math.PI * 2);
				ctx.fill();
            	ctx.closePath();
 			 },
			 movement: function(){
				 
				 //this will make direct the enemy move in the direction of the player
				 if(this.x < x){
					 
					 this.x += 1.6;
				 }
				 if(this.x > x){
					 
					 this.x -= 1.6;
				 }
				 if(this.y < y){
					 
					 this.y += 1.6;
				 }
				 if(this.y > y){
					 
					 this.y -= 1.6;
				 }
				 
				 
			 }
			  
		};
		
		var Stalker = {
  			color: "red",
  			x: Math.round(Math.random() * (canvas.width * .90)),
  			y: Math.round(Math.random() * (canvas.height * .90)),
 			draw: function() {
				ctx.beginPath(); // this is the ai guy
    			ctx.fillStyle = this.color;
    			ctx.arc(this.x, this.y, playerSize, 0, Math.PI * 2);
				ctx.fill();
            	ctx.closePath();
 			 },
			 movement: function(){
				 
				 //this will make direct the enemy move in the direction of the player at varying speeds and times
				  if(this.x < x && this.y < y){
					 
					 this.x += 1;
					 this.y += 1;
				 }
				 if(this.x > x && this.y > y){
					 
					 this.x -= 1;
					 this.y -= 1;
				 }
				 if(this.x > x && this.y < y){
					 
					 this.x -= 1;
					 this.y += 1;
				 }
				 if(this.x > x && this.y < y){
					 
					 this.x -= 1;
					 this.y += 1;
				 }
				 if(this.x < x){
					 
					 this.x += 1.1;
				 }
				 if(this.y > y){
					 
					 this.y -= 1.1;
				 }
				 if(this.x > x){
					 
					 this.x -= 1.1;
				 }
				 if(this.y < y){
					 
					 this.y += 1.1;
				 } 
				 		 
			 }
			  
		};
		
		var LifePowerUp = {
  			color: "blue",
  			x: Math.round(Math.random() * (canvas.width * .90)),
  			y: Math.round(Math.random() * (canvas.height * .90)),
 			draw: function() {
				 
				ctx.beginPath(); // this is the ai guy
				//ctx.moveTo(15, 15);
    			ctx.fillStyle = this.color;
    			ctx.arc(this.x, this.y, bulletSize * 2.5, 0, Math.PI * 2);
				ctx.fill();
				ctx.stroke();
				
				//ctx.moveTo(0, 0);
				ctx.fillStyle = "Green";
				ctx.stroke();
				
            	ctx.closePath();
 			 }						  
		};
		
		var BulletPowerUp = {
  			color: "purple",
  			x: Math.round(Math.random() * (canvas.width * .90)),
  			y: Math.round(Math.random() * (canvas.height * .90)),
 			draw: function() {
				 
				ctx.beginPath(); // this is the ai guy
				//ctx.moveTo(15, 15);
    			ctx.fillStyle = this.color;
    			ctx.arc(this.x, this.y, bulletSize * 2.5, 0, Math.PI * 2);
				ctx.fill();
				ctx.stroke();
				
				//ctx.moveTo(0, 0);
				ctx.fillStyle = "yellow";
				ctx.stroke();
				
            	ctx.closePath();
 			 }						  
		};												
		
		function draw() {	
			
			animateStar();
			
			if(exitReload == 0){
			
			//console.log(exitReload);
			
			if(menu == false){
			
				ctx.beginPath(); //this is the player
				ctx.fillStyle = "#A23BEC";
				ctx.arc(x, y, playerSize, 0, Math.PI * 2); // draw the player playerSize is about 19.43999
				ctx.fill();
				ctx.closePath();
			}
			
															 						
			//enemy.draw();
			//this will loop through the list of RandomShip enemies
			for(var i = 0; i < RandomShipFleet.length; i++){
				
				RandomShipFleet[i].draw(); //this will draw the enemies as they are created
				RandomShipFleet[i].movement();//this will activate the enemies movement
								
				//this is a colision with the randomly spawning ai guys
				if (x < RandomShipFleet[i].x + playerSize  && x + playerSize  > RandomShipFleet[i].x &&
				y < RandomShipFleet[i].y + playerSize && y + playerSize > RandomShipFleet[i].y) {
					// The objects are touching
				
					velX *= friction - 2; //this will stop the player from moving
					velY *= friction - 2;
					lives -= 1;
					bulletPower -= 1;
					fireworks.push( new Firework( canvas.width / 2, canvas.height, x, y ) );
					$("#score").html("Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower);
					
					if(lives < 1){
							
							exitReload = 1;
							lives = 0;
							clearInterval(bulletLoop);
							$("#score").html("Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower);
						}
					
					RandomShipFleet.splice(i, 1); //this will destroy the enemy on colision with the player
				}
				
				if (RandomShipFleet[i].x > canvas.width - playerSize + 1) { // colision with game boarders x-axis playerSize is about 19.43999
				
					RandomShipFleet.splice(i, 1);
            	} else if (RandomShipFleet[i].x < playerSize - 1) {
				
					RandomShipFleet.splice(i, 1);
            	}
			
				if (RandomShipFleet[i].y > canvas.height - playerSize + 1) { // colision with game boarders y-axis playerSize is about 19.43999
				
					RandomShipFleet.splice(i, 1);
            	} else if (RandomShipFleet[i].y < playerSize - 1) {
				
					RandomShipFleet.splice(i, 1);
            	}
				
			}
			
			//this will loop through the list of Hunter enemies
			for(var i = 0; i < HunterFleet.length; i++){
				
				HunterFleet[i].draw(); //this will draw the enemies as they are created
				HunterFleet[i].movement();//this will activate the enemies movement
								
				//this is a colision with the randomly spawning ai guys
				if (x < HunterFleet[i].x + playerSize  && x + playerSize  > HunterFleet[i].x &&
				y < HunterFleet[i].y + playerSize && y + playerSize > HunterFleet[i].y) {
					// The objects are touching
				
					velX *= friction - 2; //this will stop the player from moving
					velY *= friction - 2;
					lives -= 1;
					bulletPower -= 1;
					fireworks.push( new Firework( canvas.width / 2, canvas.height, x, y ) );
					$("#score").html("Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower);
					
					if(lives < 1){
							
							exitReload = 1;
							lives = 0;
							clearInterval(bulletLoop);
							$("#score").html("Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower);
						}
					
					HunterFleet.splice(i, 1); //this will destroy the enemy on colision with the player
				}
				
				// if (HunterFleet[i].x > canvas.width) { // colision with game boarders x-axis playerSize is about 19.43999
				
				// 	HunterFleet.splice(i, 1);
            	// } else if (HunterFleet[i].x < playerSize) {
				
				// 	HunterFleet.splice(i, 1);
            	// }
			
				// if (HunterFleet[i].y > canvas.height) { // colision with game boarders y-axis playerSize is about 19.43999
				
				// 	HunterFleet.splice(i, 1);
            	// } else if (HunterFleet[i].y < playerSize) {
				
				// 	HunterFleet.splice(i, 1);
            	// }
				
			}
			
			//this will loop through the list of Stalker enemies
			for(var i = 0; i < StalkerFleet.length; i++){
				
				StalkerFleet[i].draw(); //this will draw the enemies as they are created
				StalkerFleet[i].movement();//this will activate the enemies movement
								
				//this is a colision with the randomly spawning ai guys
				if (x < StalkerFleet[i].x + playerSize  && x + playerSize  > StalkerFleet[i].x &&
				y < StalkerFleet[i].y + playerSize && y + playerSize > StalkerFleet[i].y) {
					// The objects are touching
				
					velX *= friction - 2; //this will stop the player from moving
					velY *= friction - 2;
					lives -= 1;
					bulletPower -= 1;
					fireworks.push( new Firework( canvas.width / 2, canvas.height, x, y ) );
					$("#score").html("Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower);
					
					if(lives < 1){
							
							exitReload = 1;
							lives = 0;
							clearInterval(bulletLoop);
							$("#score").html("Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower);
						}
					
					StalkerFleet.splice(i, 1); //this will destroy the enemy on colision with the player
				}
				
				// if (StalkerFleet[i].x > canvas.width - playerSize + 1) { // colision with game boarders x-axis playerSize is about 19.43999
				
				// 	StalkerFleet.splice(i, 1);
            	// } else if (StalkerFleet[i].x < playerSize - 1) {
				
				// 	StalkerFleet.splice(i, 1);
            	// }
			
				// if (StalkerFleet[i].y > canvas.height - playerSize + 1) { // colision with game boarders y-axis playerSize is about 19.43999
				
				// 	StalkerFleet.splice(i, 1);
            	// } else if (StalkerFleet[i].y < playerSize - 1) {
				
				// 	StalkerFleet.splice(i, 1);
            	// }
				
			}
			
			//draws the bullets and makes them move
			for(var j = 0; j < bulletClip.length; j++){
					
					bulletClip[j].draw();
					bulletClip[j].movement();					
					
				if (bulletClip[j].x > canvas.width - playerSize) { // colision with game boarders x-axis playerSize is about 19.43999
					
					fireworks.push( new Firework( canvas.width / 2, canvas.height, bulletClip[j].x, bulletClip[j].y ) );
					bulletClip.splice(j, 1);
				} else if (bulletClip[j].x < playerSize) {
					
					fireworks.push( new Firework( canvas.width / 2, canvas.height, bulletClip[j].x, bulletClip[j].y ) );
					bulletClip.splice(j, 1);
				}
				
				else if (bulletClip[j].y > canvas.height - playerSize) { // colision with game boarders y-axis playerSize is about 19.43999
					
					fireworks.push( new Firework( canvas.width / 2, canvas.height, bulletClip[j].x, bulletClip[j].y ) );
					bulletClip.splice(j, 1);
				} else if (bulletClip[j].y < playerSize) {
					
					fireworks.push( new Firework( canvas.width / 2, canvas.height, bulletClip[j].x, bulletClip[j].y ) );
					bulletClip.splice(j, 1);
				}
					
			}
									
			//this is what detects colisions for bullets and RandomShip enemys
			for(var j = 0; j < bulletClip.length; j++){
			
				//bulletClip[j].draw(); // this will add a cool blur to the bullet
			
				for(var i = 0; i < RandomShipFleet.length; i++){
					
					//RandomShipFleet[i].draw(); //this will add a cool blur to the enemys
				
					if (bulletClip[j].x < RandomShipFleet[i].x + (bulletSize * 3)  && bulletClip[j].x + (bulletSize * 3)  > RandomShipFleet[i].x &&
					bulletClip[j].y < RandomShipFleet[i].y + (bulletSize * 3) && bulletClip[j].y + playerSize > RandomShipFleet[i].y) {
						// The objects are touching
						
						score += 1;
						//loop();
						fireworks.push( new Firework( canvas.width / 2, canvas.height, RandomShipFleet[i].x, RandomShipFleet[i].y ) );
						timerTick = 0;
						$("#score").html("Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower);
				
						RandomShipFleet.splice(i, 1); //this will destroy the enemy on colision with the bullet
						bulletClip.splice(j, 1);
						
					 }
				}
			
			}
			
			//this is what detects colisions for bullets and Hunter enemys
			for(var j = 0; j < bulletClip.length; j++){
			
				//bulletClip[j].draw(); // this will add a cool blur to the bullet
			
				for(var i = 0; i < HunterFleet.length; i++){
					
					//RandomShipFleet[i].draw(); //this will add a cool blur to the enemys
				
					if (bulletClip[j].x < HunterFleet[i].x + (bulletSize * 3)  && bulletClip[j].x + (bulletSize * 3)  > HunterFleet[i].x &&
					bulletClip[j].y < HunterFleet[i].y + (bulletSize * 3) && bulletClip[j].y + playerSize > HunterFleet[i].y) {
						// The objects are touching
						
						score += 2;
						//loop();
						fireworks.push( new Firework( canvas.width / 2, canvas.height, HunterFleet[i].x, HunterFleet[i].y ) );
						timerTick = 0;
						$("#score").html("Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower);
				
						HunterFleet.splice(i, 1); //this will destroy the enemy on colision with the bullet
						bulletClip.splice(j, 1);
						
					 }
				}
			
			}
			
			//this is what detects colisions for bullets and Hunter enemys
			for(var j = 0; j < bulletClip.length; j++){
			
				//bulletClip[j].draw(); // this will add a cool blur to the bullet
			
				for(var i = 0; i < StalkerFleet.length; i++){
					
					//RandomShipFleet[i].draw(); //this will add a cool blur to the enemys
				
					if (bulletClip[j].x < StalkerFleet[i].x + (bulletSize * 3)  && bulletClip[j].x + (bulletSize * 3)  > StalkerFleet[i].x &&
					bulletClip[j].y < StalkerFleet[i].y + (bulletSize * 3) && bulletClip[j].y + playerSize > StalkerFleet[i].y) {
						// The objects are touching
						
						score += 3;
						
						fireworks.push( new Firework( canvas.width / 2, canvas.height, StalkerFleet[i].x, StalkerFleet[i].y ) );
						timerTick = 0;
						$("#score").html("Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower);
				
						StalkerFleet.splice(i, 1); //this will destroy the enemy on colision with the bullet
						bulletClip.splice(j, 1);
						
					 }
				}
			
			}
			
			
			//this will loop through the list of lives power ups
			for(var i = 0; i < LifePowerPack.length; i++){
				
				LifePowerPack[i].draw(); //this will draw the life power up as they are created
								
				//this is a colision with the player and the power up
				if (x < LifePowerPack[i].x + playerSize  && x + playerSize  > LifePowerPack[i].x &&
				y < LifePowerPack[i].y + playerSize && y + playerSize > LifePowerPack[i].y) {
					// The objects are touching
				
					//velX *= friction - 2; //this will stop the player from moving
					//velY *= friction - 2;
					lives += (Math.round( 0.5 * 10 ) / 10);
					score += 10;
					//lives.toFixed(1);
					$("#score").html("Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower);
					
					// if(lives == 0){
							
					// 		exitReload = 1;
					// 	}
					
					LifePowerPack.splice(i, 1); //this will destroy the enemy on colision with the player
				}
				
			// 	if (LifePowerPack[j].x > canvas.width - bulletSize) { // colision with game boarders x-axis playerSize is about 19.43999
					
			// 		LifePowerPack.splice(j, 1);
			// 	} else if (LifePowerPack[j].x < bulletSize) {
					
			// 		LifePowerPack.splice(j, 1);
			// 	}
				
			// 	else if (LifePowerPack[j].y > canvas.height - bulletSize) { // colision with game boarders y-axis playerSize is about 19.43999
					
			// 		LifePowerPack.splice(j, 1);
			// 	} else if (LifePowerPack[j].y < bulletSize) {
					
			// 		LifePowerPack.splice(j, 1);
			// 	}
				
			 }
			 
			 			//this will loop through the list of lives power ups
			for(var i = 0; i < BulletPowerPack.length; i++){
				
				BulletPowerPack[i].draw(); //this will draw the life power up as they are created
								
				//this is a colision with the player and the power up
				if (x < BulletPowerPack[i].x + playerSize  && x + playerSize  > BulletPowerPack[i].x &&
				y < BulletPowerPack[i].y + playerSize && y + playerSize > BulletPowerPack[i].y) {
					// The objects are touching
				
					//velX *= friction - 2; //this will stop the player from moving
					//velY *= friction - 2;
					bulletPower += 1;
					clearInterval(bulletLoop);
					score += 10;
					//lives.toFixed(1);
					$("#score").html("Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower);
					
					// if(lives == 0){
							
					// 		exitReload = 1;
					// 	}
					
					BulletPowerPack.splice(i, 1); //this will destroy the enemy on colision with the player
				}
				
			// 	if (LifePowerPack[j].x > canvas.width - bulletSize) { // colision with game boarders x-axis playerSize is about 19.43999
					
			// 		LifePowerPack.splice(j, 1);
			// 	} else if (LifePowerPack[j].x < bulletSize) {
					
			// 		LifePowerPack.splice(j, 1);
			// 	}
				
			// 	else if (LifePowerPack[j].y > canvas.height - bulletSize) { // colision with game boarders y-axis playerSize is about 19.43999
					
			// 		LifePowerPack.splice(j, 1);
			// 	} else if (LifePowerPack[j].y < bulletSize) {
					
			// 		LifePowerPack.splice(j, 1);
			// 	}
				
			 }
			
			
			
			}
			
			else{
				
				$("#pDiv").css("margin-top", "90%");
				x = canvas.width * 0.50;
				y = canvas.height * 0.50;
				menu = true;
				$("#restartBtn").closest('.ui-btn').show();
				$("#restartDiv").show();
				
				
			}
			
			
			
			//animateStar();	
			 
			//console.log(entities);  
		}
		
	//gets the mouse position
	function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
		
		
        
		
        document.body.addEventListener("keydown", function (e) { // these make the keyboard do
            keys[e.keyCode] = true;
        });
        document.body.addEventListener("keyup", function (e) {
            keys[e.keyCode] = false;
        });
		
			
		
		
		//----------------------------------Explosion-----------------------------------//
		
		






// now we are going to setup our function placeholders for the entire demo

//get a random number within a range
function random( min, max ) {
	return Math.random() * ( max - min ) + min;
}

// calculate the distance between two points
function calculateDistance( p1x, p1y, p2x, p2y ) {
	var xDistance = p1x - p2x,
			yDistance = p1y - p2y;
	return Math.sqrt( Math.pow( xDistance, 2 ) + Math.pow( yDistance, 2 ) );
}

// create firework
function Firework( sx, sy, tx, ty ) {
	// actual coordinates
	this.x = sx;
	this.y = sy;
	// starting coordinates
	this.sx = sx;
	this.sy = sy;
	// target coordinates
	this.tx = tx;
	this.ty = ty;
	// distance from starting point to target
	this.distanceToTarget = calculateDistance( sx, sy, tx, ty );
	this.distanceTraveled = 0;
	// track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
	this.coordinates = [];
	this.coordinateCount = 2;//5
	// populate initial coordinate collection with the current coordinates
	while( this.coordinateCount-- ) {
		this.coordinates.push( [ this.x, this.y ] );
	}
	this.angle = Math.atan2( ty - sy, tx - sx );
	this.speed = 5;//5
	this.acceleration = 500;//500
	this.brightness = random( 50, 99 );//random( 50, 70 );
	// circle target indicator radius
	this.targetRadius = 30; //1
}



// update firework
Firework.prototype.update = function( index ) {
	// remove last item in coordinates array
	this.coordinates.pop();
	// add current coordinates to the start of the array
	this.coordinates.unshift( [ this.x, this.y ] );
	
	// cycle the circle target indicator radius
	if( this.targetRadius < 8 ) {
		this.targetRadius += 0.3;
	} else {
		this.targetRadius = 1;
	}
	
	// speed up the firework
	this.speed *= this.acceleration;
	
	// get the current velocities based on angle and speed
	var vx = Math.cos( this.angle ) * this.speed,
			vy = Math.sin( this.angle ) * this.speed;
	// how far will the firework have traveled with velocities applied?
	this.distanceTraveled = calculateDistance( this.sx, this.sy, this.x + vx, this.y + vy );
	
	// if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
	if( this.distanceTraveled >= this.distanceToTarget ) {
		createParticles( this.tx, this.ty );
		// remove the firework, use the index passed into the update function to determine which to remove
		fireworks.splice( index, 1 );
	} else {
		// target not reached, keep traveling
		this.x += vx;
		this.y += vy;
	}
}

// draw firework
Firework.prototype.draw = function() {
	ctx1.beginPath();
	// move to the last tracked coordinate in the set, then draw a line to the current x and y
	ctx1.moveTo( this.coordinates[ this.coordinates.length - 1][ 0 ], this.coordinates[ this.coordinates.length - 1][ 1 ] );
	ctx1.lineTo( this.x, this.y );
	ctx1.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)';
	ctx1.stroke();
	
	ctx1.beginPath();
	// draw the target for this firework with a pulsing circle
	ctx1.arc( this.tx, this.ty, this.targetRadius, 0, Math.PI * 2 );
	ctx1.stroke();
}

// create particle
function Particle( x, y ) {
	this.x = x;
	this.y = y;
	// track the past coordinates of each particle to create a trail effect, increase the coordinate count to create more prominent trails
	this.coordinates = [];
	this.coordinateCount = 1;//5
	while( this.coordinateCount-- ) {
		this.coordinates.push( [ this.x, this.y ] );
	}
	// set a random angle in all possible directions, in radians
	this.angle = random( 0, Math.PI * 2 );
	this.speed = random( 1, 20 );
	// friction will slow the particle down
	this.friction = 0.95;
	// gravity will be applied and pull the particle down
	this.gravity = 1;
	// set the hue to a random number +-20 of the overall hue variable
	this.hue = random( hue - 20, hue + 20 );
	this.brightness = random( 60, 90 );//50,80
	this.alpha = 1;
	// set how fast the particle fades out
	this.decay = random( 0.015, 0.01 );
}

// update particle
Particle.prototype.update = function( index ) {
	// remove last item in coordinates array
	this.coordinates.pop();
	// add current coordinates to the start of the array
	this.coordinates.unshift( [ this.x, this.y ] );
	// slow down the particle
	this.speed *= this.friction;
	// apply velocity
	this.x += Math.cos( this.angle ) * this.speed;
	this.y += Math.sin( this.angle ) * this.speed + this.gravity;
	// fade out the particle
	this.alpha -= this.decay;
	
	// remove the particle once the alpha is low enough, based on the passed in index
	if( this.alpha <= this.decay ) {
		particles.splice( index, 1 );
	}
}

// draw particle
Particle.prototype.draw = function() {
	ctx1. beginPath();
	// move to the last tracked coordinates in the set, then draw a line to the current x and y
	ctx1.moveTo( this.coordinates[ this.coordinates.length - 1 ][ 0 ], this.coordinates[ this.coordinates.length - 1 ][ 1 ] );
	ctx1.lineTo( this.x, this.y );
	ctx1.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
	ctx1.stroke();
}

// create particle group/explosion
function createParticles( x, y ) {
	// increase the particle count for a bigger explosion, beware of the canvas performance hit with the increased particles though
	var particleCount = 5;//125
	while( particleCount-- ) {
		particles.push( new Particle( x, y ) );
	}
}

// main demo loop
function loop() {
	// this function will run endlessly with requestAnimationFrame
	requestAnimFrame( loop );
	
	// increase the hue to get different colored fireworks over time
	hue += 0.3;
	
	//new explosion style, thicker particles
	ctx.lineWidth = 3;
	
	// normally, clearRect() would be used to clear the canvas
	// we want to create a trailing effect though
	// setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
	//ctx1.globalCompositeOperation = 'destination-out';
	// decrease the alpha property to create more prominent trails
	//ctx1.fillStyle = 'rgba(0, 0, 0, 0)';
	//ctx1.fillRect( 0, 0, canvas.width, canvas.height );
	// change the composite operation back to our main mode
	// lighter creates bright highlight points as the fireworks and particles overlap each other
	//ctx1.globalCompositeOperation = 'lighter';
	
	// loop over each firework, draw it, update it
	var i = fireworks.length;
	while( i-- ) {
		fireworks[ i ].draw();
		fireworks[ i ].update( i );
	}
	
	// loop over each particle, draw it, update it
	var i = particles.length;
	while( i-- ) {
		particles[ i ].draw();
		particles[ i ].update( i );
	}
	
	// launch fireworks automatically to random coordinates, when the mouse isn't down
	if(menu == true){
	
	if( timerTick >= timerTotal ) {
		if( !mousedown ) {
			// start the firework at the bottom middle of the screen, then set the random target coordinates, the random y coordinates will be set within the range of the top half of the screen
			fireworks.push( new Firework( canvas.width / 2, canvas.height, random( 0, canvas.width ), random( 0, canvas.height / 2 ) ) );
			timerTick = 0;
		}
	} else {
		timerTick++;
	}
	}
	
	// // limit the rate at which fireworks get launched when mouse is down
	// if( limiterTick >= limiterTotal ) {
	// 	if( mousedown ) {
	// 		// start the firework at the bottom middle of the screen, then set the current mouse coordinates as the target
	// 		fireworks.push( new Firework( cw / 500, ch, mx, my ) );
	// 		limiterTick = 0;
	// 	}
	// } else {
	// 	limiterTick++;
	// }
    
}



// mouse event bindings
// update the mouse coordinates on mousemove
// canvas1.addEventListener( 'mousemove', function(e) {
// 	mx = e.pageX - canvas1.offsetLeft;
// 	my = e.pageY - canvas1.offsetTop;
// });

// // toggle mousedown state and prevent canvas from being selected
// canvas1.addEventListener( 'mousedown', function(e) {
// 	e.preventDefault();
// 	mousedown = true;
// });

// canvas1.addEventListener( 'mouseup', function( e ) {
// 	e.preventDefault();
// 	mousedown = false;
// });

// once the window loads, we are ready for some fireworks!

//fireworks.push( new Firework( cw / 2, ch, random( 0, cw ), random( 0, ch / 2 ) ) );


//-------------------------This is where the star background begins, Thank you WillemCrnlssn for the inspiration----------------------------------//

function animateStar() {
	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	$.each(stars, function() {
		this.draw(ctx2);
	})
}

function Star(x, y, length, opacity) {
	this.x = parseInt(x);
	this.y = parseInt(y);
	this.length = parseInt(length);
	this.opacity = opacity;
	this.factor = 1;
	this.increment = Math.random() * .03;
}

/**
 * Draw a star
 * 
 * This function draws a start.
 * You need to give the contaxt as a parameter 
 * 
 * @param context
 */
Star.prototype.draw = function() {
	ctx2.rotate((Math.PI * 1 / 10));
	
	// Save the context
	ctx2.save();
	
	// move into the middle of the canvas, just to make room
	ctx2.translate(this.x, this.y);
	
	// Change the opacity
	if(this.opacity > 1) {
		this.factor = -1;
	}
	else if(this.opacity <= 0) {
		this.factor = 1;
		
		this.x = Math.round(Math.random() * canvas.width);
		this.y = Math.round(Math.random() * canvas.height);
	}
		
	this.opacity += this.increment * this.factor;
	
	ctx2.beginPath()
	for (var i = 5; i--;) {
		ctx2.lineTo(0, this.length);
		ctx2.translate(0, this.length);
		ctx2.rotate((Math.PI * 2 / 10));
		ctx2.lineTo(0, - this.length);
		ctx2.translate(0, - this.length);
		ctx2.rotate(-(Math.PI * 6 / 10));
	}
	ctx2.lineTo(0, this.length);
	ctx2.closePath();
	ctx2.fillStyle = "rgba(255, 255, 200, " + this.opacity + ")";
	ctx2.shadowBlur = 5;
	ctx2.shadowColor = '#ffff33';
	ctx2.fill();
	
	ctx2.restore();
}


//---------------An attempt of engine thrust-------------------//




		
	loop();
	update();// sets the main loop into motion
	
		
    });
	