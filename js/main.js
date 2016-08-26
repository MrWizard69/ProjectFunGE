
//this is all the variables for the star background
var stars = [];
var numStars = 20; //<- 40 maybe good for mobile //250; <- that is good for desktop screen size//2000

var exitReload = 0;
var bulletPower = 0;
var bulletLoop;
var bulletSpeed = 0;
var shootStickTouch = false;
var playersSizeW;
var playerSizeH;
var bulletSizeW;
var bulletSizeH;
var slowMoWatch = 0;
var slowMotion = false;
var slowMoDelay;
var x = 0;
var y = 0;
var ctx;
var slowHue = 240;
var slowShade = 100;
var slowBrightness = 60;
var borderHue = 50;
var borderShade = 29;
var borderBrightness = 61;
var KeyboardBulletDelay = 10;


$(document).ready(function () {
	
	// Obtain a reference to the canvas element
	// using its id.
	
    var canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
	
	
	
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
	

	
	var playArea = 0;
	
	//var entities = [];
	var RandomShipFleet = [];
	var HunterFleet = [];
	var StalkerFleet = [];
	var BlackBox = [];
	var BHEnemys = [];
	var InfectedFleet = [];
	
	var score = 0;
	var lives = 3;
	
	
	var bulletClip = [];
	var LifePowerPack = [];
	var BulletPowerPack = [];
	var LazerBattery = [];
	//var numOfEnemyShips = 4;
	
	var bullet = new Object();
	var bulletPC = new Object();

	var bigLazer = new Object();
	
	var Enemy1 = new Object();
	var Enemy2 = new Object();
	var Enemy3 = new Object();
	var Enemy4 = new Object();
	var Enemy5 = new Object();
	var Enemy6 = new Object();
	
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

	var moveReady = false;
	var shootReady = false;
	
	
	var addtohome = addToHomescreen({
		maxDisplayCount: 0,
    	autostart: false,
		startDelay: .5,
		displayPace: .1
	});
	
	$("#score").hide();
	//$("#restartBtn").closest('.ui-btn').hide();
	$("#restartDiv").hide();
	$("#RotWarBox").hide();

	$("#MoveStickInfo").hide();
	$("#ShootStickInfo").hide();
	
	$("#dwnload").click(function(){
		
		addtohome.show();
		
	});

	$("#canvas").click(function(){

		if(canvas.width <= 300 && exitReload == 0){

			$("#RotWarBox").show();

		}

	});

	$("#closeRotWar").click(function(){

		$("#RotWarBox").hide();

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
		
		physicsLoop = 30;
		slowMotion = false;
		clearTimeout(slowMoDelay);
		exitReload = 0;
		score = 0;
		lives = 3;
		bulletSpeed = 0;
		bulletPower = 0;
		KeyboardBulletDelay = 10;
		menu = false;
		RandomShipFleet = [];
		HunterFleet = [];
		StalkerFleet = [];
		bulletClip = [];
		LifePowerPack = [];
		BulletPowerPack = [];
		BlackBox = [];
		BHEnemys = [];
		InfectedFleet = [];
		LazerBattery = [];
		$("#score").html("Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower);
		//$("#restartBtn").closest('.ui-btn').hide();
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
			moveReady = true;//this checks the joystick to see if the player knows what it does. First touch starts the game
			$("#MoveStickInfo").hide();//hides the message
			$("#ShootStickInfo").css("margin-top","-13.8%");
			
		});

		$("#shootStick").on("touchstart",function(){
			
			//console.log("shoot stick");
			
			shootReady = true; //this checks the shootStick to see if the player knows what it does. First touch starts the game
			$("#MoveStickInfo").css("margin-top","-14%");

			$("#ShootStickInfo").hide();//hides the message
			
			if(bulletPower >= 9){
				
				bulletSpeed = 100;
				//console.log(bulletSpeed);
				
			}
			if(bulletPower == 8){
				
				bulletSpeed = 125;
				//console.log(bulletSpeed);
				
			}
			if(bulletPower == 7){
				
				bulletSpeed = 150;
				//console.log(bulletSpeed);
				
			}
			if(bulletPower == 6){
				
				bulletSpeed = 175;
				//console.log(bulletSpeed);
				
			}
			if(bulletPower == 5){
				
				bulletSpeed = 200;
				//console.log(bulletSpeed);
				
			}
			if(bulletPower == 4){
				
				bulletSpeed = 225;
				//console.log(bulletSpeed);
				
			}
			if(bulletPower == 3){
				
				bulletSpeed = 250;
				//console.log(bulletSpeed);
				
			}
			if(bulletPower == 2){
				
				bulletSpeed = 300;
				//console.log(bulletSpeed);
				
			}
			if(bulletPower == 1){
				
				bulletSpeed = 325;
				//console.log(bulletSpeed);
				
			}
			if(bulletPower == 0){
				
				bulletSpeed = 350;
				//console.log(bulletSpeed);
			} 
			
			BulletsFire();
			
			//console.log(bulletSpeed);
			shootStickTouch = true;
			
				

			
		});
		
		$("#shootStick").on("touchend",function(){
				
				shootStickTouch = false;
				//console.log(shootStickTouch);					
				shootStickDirX = "";
				shootStickDirY = "";
				clearInterval(bulletLoop);
				
		
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
		
		setTimeout(function() {
			

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

		}, 400);

		
			
			
		//this will create new enemies
		setInterval(function(){

			if(moveReady == true && shootReady == true){
					
				Enemy1 = jQuery.extend(true, {}, RandomShip);
				Enemy1.x = Math.round(Math.random() * (canvas.width * .90));
				Enemy1.y = Math.round(Math.random() * (canvas.height * .90));
				Enemy1.direction = Math.round(Math.random() * 7);
				
				if (exitReload == 0 || x > Enemy1.x && x < Enemy1.x && //TODO: Figure out a way to get the enemys to ONLY spawn around the player
					y > Enemy1.y && y < Enemy1.y + (playerSize * 15)) {
						
					RandomShipFleet.push(Enemy1);
				
				}
			}
			//$("#result").html(entities.length);
			//console.log(entities);
		}, 1100);
		
		setInterval(function(){

			if(moveReady == true && shootReady == true){
					
				Enemy2 = jQuery.extend(true, {}, Hunter);
				Enemy2.x = Math.round(Math.random() * (canvas.width * .90));
				Enemy2.y = Math.round(Math.random() * (canvas.height * .90));
				
				if (exitReload == 0 || !x < Enemy2.x + (playerSize * 15)  && !x + (playerSize * 15)  > Enemy2.x &&
					!y < Enemy2.y + (playerSize * 15) && !y + (playerSize * 15) > Enemy2.y) {
					
					HunterFleet.push(Enemy2);
				}
				
			}
			//console.log(entities);
		}, 5000);	
		
		setInterval(function(){

			if(moveReady == true && shootReady == true){
					
				Enemy3 = jQuery.extend(true, {}, Stalker);
				Enemy3.x = Math.round(Math.random() * (canvas.width * .90));
				Enemy3.y = Math.round(Math.random() * (canvas.height * .90));
				
				if (exitReload == 0 || !x < Enemy3.x + (playerSize * 15)  && !x + (playerSize * 15)  > Enemy3.x &&
					!y < Enemy3.y + (playerSize * 15) && !y + (playerSize * 15) > Enemy3.y) {
						
					StalkerFleet.push(Enemy3);
				}
			}
			//console.log(entities);
		}, 9000);	
		
		
		setInterval(function(){

			if(moveReady == true && shootReady == true){
					
				LifePup = jQuery.extend(true, {}, LifePowerUp);
				LifePup.x = Math.round(Math.random() * (canvas.width * .90));
				LifePup.y = Math.round(Math.random() * (canvas.height * .90));
				
				if(exitReload == 0){
						
					LifePowerPack.push(LifePup);
				}
			}
			//console.log(entities);
		}, 25000); //60000
		
		setInterval(function(){

			if(moveReady == true && shootReady == true){
					
				BulletPup = jQuery.extend(true, {}, BulletPowerUp);
				BulletPup.x = Math.round(Math.random() * (canvas.width * .90));
				BulletPup.y = Math.round(Math.random() * (canvas.height * .90));
				
				if(exitReload == 0){
						
					BulletPowerPack.push(BulletPup);
				}
			}
			//console.log(entities);
		}, 20000);	//30000	


		setInterval(function(){

			if(moveReady == true && shootReady == true){
					
				Enemy4 = jQuery.extend(true, {}, BlackHole);
				Enemy4.x = Math.round(Math.random() * (canvas.width * .90));
				Enemy4.y = Math.round(Math.random() * (canvas.height * .90));
				
				if (exitReload == 0 || !x < Enemy3.x + (playerSize * 15)  && !x + (playerSize * 15)  > Enemy3.x &&
					!y < Enemy3.y + (playerSize * 15) && !y + (playerSize * 15) > Enemy3.y) {
						
					BlackBox.push(Enemy4);
				}
			}
			//console.log(Enemy4);
		}, 55000);	

		setInterval(function(){

			if(moveReady == true && shootReady == true){
					
				Enemy5 = jQuery.extend(true, {}, InfectedShip);
				Enemy5.x = Math.round(Math.random() * (canvas.width * .90));
				Enemy5.y = Math.round(Math.random() * (canvas.height * .90));
				Enemy5.direction = Math.round(Math.random() * 7);
				
				if (exitReload == 0 || !x < Enemy3.x + (playerSize * 15)  && !x + (playerSize * 15)  > Enemy5.x &&
					!y < Enemy5.y + (playerSize * 15) && !y + (playerSize * 15) > Enemy5.y) {
						
					InfectedFleet.push(Enemy5);
				}
			}
			//console.log(Enemy5);
		}, 30000);	
			
		
		// Enemy4 = jQuery.extend(true, {}, BlackHole);
		// 	Enemy4.x = Math.round(Math.random() * (canvas.width * .90));
		// 	Enemy4.y = Math.round(Math.random() * (canvas.height * .90));
			
		// 	if (exitReload == 0 || !x < Enemy3.x + (playerSize * 10)  && !x + (playerSize * 10)  > Enemy3.x &&
		// 		!y < Enemy3.y + (playerSize * 10) && !y + (playerSize * 10) > Enemy3.y) {
					
		// 		BlackBox.push(Enemy4);
		// 	}	
		
		
		//$("#play").closest('.ui-btn').css("margin-top", "90%");
		$("#play").closest('.ui-btn').hide();
		$("#pDiv").hide();
		$("#title").hide();
		$("#score").show();
		$("#MoveStickInfo").show();
		$("#ShootStickInfo").show();

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
		//ctx.lineWidth = '1';
		//ctx.strokeRect(0, 0, window.innerWidth, window.innerHeight);
		
		//Resize character sizes
		playersSizeW = canvas.width * .01;
		playerSizeH = canvas.height * .01;
		
		bulletSizeW = canvas.width * .004;
		bulletSizeH = canvas.height * .004;
		
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
			joyStickY = (window.innerHeight) * .55;	
			
			shootStickX = (window.innerWidth) * .07;
			shootStickY = (window.innerHeight) * 0.55;

			//console.log("one");
			
			//$("#play").closest('.ui-btn').show();

			// if(canvas.width > 450){

			// 	joyStickX = (window.innerWidth) * .96;
			// 	joyStickY = (window.innerHeight) * .70;
			// 	//console.log("Yo");	
			// }
			
		}
		
		if(canvas.width <= 300){
			
			$("#play").closest('.ui-btn').hide();
			$("#pDiv").hide();
			$("#dwnload").closest('.ui-btn').show();
			// $("#restartBtn").closest('.ui-btn').hide();
			// $("#restartDiv").hide();
			$("#ShootStickInfo").css("margin-top","-8.5%");
			// $("#MoveStickInfo").css("margin-top","-12%");
			$("#rotWar").show();
			$("#shootStick").hide();
			$("#container").hide();
			
		}
		else if(canvas.width >= 350 && menu == false){

			$("#play").closest('.ui-btn').hide();
			$("#pDiv").hide();

		}		
		 else if(canvas.width >= 350){
			
		 	 $("#play").closest('.ui-btn').show();
			 $("#pDiv").show();
			 $("#dwnload").closest('.ui-btn').hide();
			 $("#shootStick").show();
			 $("#container").show();
			
			 
			 if(exitReload == 1){

			 	//$("#restartBtn").closest('.ui-btn').show();
				$("#play").closest('.ui-btn').hide();
				$("#pDiv").hide();
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

            if (keys[87]) { // up arrow key[38] w key[87]
                if (velY > -speed) {
                    //velY -= 6;

					//shootStickDirX = "";
					//shootStickDirY = "up";

					if(slowMotion == true){

						velY -= (canvas.height) * 0.005;
					}
					else if(slowMotion == false){

						velY -= (canvas.height) * 0.01;
					}					
					
					//$("#result").html("X: " + x + " Y: " + y);
                }
				
			}

            if (keys[83]) { // down arrow key[40] s key[83]
                if (velY < speed) {
                    //velY += 6;

					//shootStickDirX = "";
					//shootStickDirY = "down";

					if(slowMotion == true){

						velY += (canvas.height) * 0.005;
					}
					else if(slowMotion == false){

						velY += (canvas.height) * 0.01;
					}
							
					//$("#result").html("X: " + x + " Y: " + y);
                }
            }
            if (keys[68]) { // right arrow key[39] a key[68]
                if (velX < speed) {
                    //velX += 6;

					//shootStickDirX = "right";
					//shootStickDirY = "";

					if(slowMotion == true){

						velX += (canvas.width) * 0.005;
					}
					else if(slowMotion == false){

						velX += (canvas.width) * 0.01;
					}
					
					//$("#result").html("X: " + x + " Y: " + y);
                }
            }
            if (keys[65]) { // left arrow key[37] d key[65]
                if (velX > -speed) {
                    //velX -= 6;

					//shootStickDirX = "left";
					//shootStickDirY = "";

					if(slowMotion == true){

						velX -= (canvas.width) * 0.005;
					}
					else if(slowMotion == false){

						velX -= (canvas.width) * 0.01;
					}

							
					//$("#result").html("X: " + x + " Y: " + y);
                }
            }			

			if(keys[39] && keys[38]){ //arrow keys right up

				shootStickDirX = "right";
				shootStickDirY = "up";

				if(bulletPower == 0 && KeyboardBulletDelay == 10){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 1 && KeyboardBulletDelay == 9){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 2 && KeyboardBulletDelay == 8){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 3 && KeyboardBulletDelay == 7){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 4 && KeyboardBulletDelay == 6){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 5 && KeyboardBulletDelay == 5){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 6 && KeyboardBulletDelay == 4){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 7 && KeyboardBulletDelay == 3){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 8 && KeyboardBulletDelay == 2){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower >= 9 && KeyboardBulletDelay == 1){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				KeyboardBulletDelay -= 1;

				if(KeyboardBulletDelay <= 0){

					if(bulletPower == 0){

						KeyboardBulletDelay = 10;
					}
					else if(bulletPower == 1){

						KeyboardBulletDelay = 9;
					}
					else if(bulletPower == 2){

						KeyboardBulletDelay = 8;
					}
					else if(bulletPower == 3){

						KeyboardBulletDelay = 7;
					}
					else if(bulletPower == 4){

						KeyboardBulletDelay = 6;
					}
					else if(bulletPower == 5){

						KeyboardBulletDelay = 5;
					}
					else if(bulletPower == 6){

						KeyboardBulletDelay = 4;
					}
					else if(bulletPower == 7){

						KeyboardBulletDelay = 3;
					}
					else if(bulletPower == 8){

						KeyboardBulletDelay = 2;
					}
					else if(bulletPower >= 9){

						KeyboardBulletDelay = 1;
					}
					
				}
			}

			else if(keys[39] && keys[40]){ //arrow keys right down

				shootStickDirX = "right";
				shootStickDirY = "down";

				if(bulletPower == 0 && KeyboardBulletDelay == 10){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 1 && KeyboardBulletDelay == 9){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 2 && KeyboardBulletDelay == 8){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 3 && KeyboardBulletDelay == 7){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 4 && KeyboardBulletDelay == 6){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 5 && KeyboardBulletDelay == 5){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 6 && KeyboardBulletDelay == 4){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 7 && KeyboardBulletDelay == 3){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 8 && KeyboardBulletDelay == 2){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower >= 9 && KeyboardBulletDelay == 1){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				KeyboardBulletDelay -= 1;

				if(KeyboardBulletDelay <= 0){

					if(bulletPower == 0){

						KeyboardBulletDelay = 10;
					}
					else if(bulletPower == 1){

						KeyboardBulletDelay = 9;
					}
					else if(bulletPower == 2){

						KeyboardBulletDelay = 8;
					}
					else if(bulletPower == 3){

						KeyboardBulletDelay = 7;
					}
					else if(bulletPower == 4){

						KeyboardBulletDelay = 6;
					}
					else if(bulletPower == 5){

						KeyboardBulletDelay = 5;
					}
					else if(bulletPower == 6){

						KeyboardBulletDelay = 4;
					}
					else if(bulletPower == 7){

						KeyboardBulletDelay = 3;
					}
					else if(bulletPower == 8){

						KeyboardBulletDelay = 2;
					}
					else if(bulletPower >= 9){

						KeyboardBulletDelay = 1;
					}
					
				}
			}

			else if(keys[37] && keys[40]){ //arrow keys left down

				shootStickDirX = "left";
				shootStickDirY = "down";
	
				if(bulletPower == 0 && KeyboardBulletDelay == 10){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 1 && KeyboardBulletDelay == 9){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 2 && KeyboardBulletDelay == 8){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 3 && KeyboardBulletDelay == 7){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 4 && KeyboardBulletDelay == 6){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 5 && KeyboardBulletDelay == 5){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 6 && KeyboardBulletDelay == 4){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 7 && KeyboardBulletDelay == 3){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 8 && KeyboardBulletDelay == 2){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower >= 9 && KeyboardBulletDelay == 1){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				KeyboardBulletDelay -= 1;

				if(KeyboardBulletDelay <= 0){

					if(bulletPower == 0){

						KeyboardBulletDelay = 10;
					}
					else if(bulletPower == 1){

						KeyboardBulletDelay = 9;
					}
					else if(bulletPower == 2){

						KeyboardBulletDelay = 8;
					}
					else if(bulletPower == 3){

						KeyboardBulletDelay = 7;
					}
					else if(bulletPower == 4){

						KeyboardBulletDelay = 6;
					}
					else if(bulletPower == 5){

						KeyboardBulletDelay = 5;
					}
					else if(bulletPower == 6){

						KeyboardBulletDelay = 4;
					}
					else if(bulletPower == 7){

						KeyboardBulletDelay = 3;
					}
					else if(bulletPower == 8){

						KeyboardBulletDelay = 2;
					}
					else if(bulletPower >= 9){

						KeyboardBulletDelay = 1;
					}
					
				}
			}

			else if(keys[37] && keys[38]){ //arrow keys left up

				shootStickDirX = "left";
				shootStickDirY = "up";

				if(bulletPower == 0 && KeyboardBulletDelay == 10){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 1 && KeyboardBulletDelay == 9){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 2 && KeyboardBulletDelay == 8){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 3 && KeyboardBulletDelay == 7){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 4 && KeyboardBulletDelay == 6){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 5 && KeyboardBulletDelay == 5){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 6 && KeyboardBulletDelay == 4){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 7 && KeyboardBulletDelay == 3){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 8 && KeyboardBulletDelay == 2){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower >= 9 && KeyboardBulletDelay == 1){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				KeyboardBulletDelay -= 1;

				if(KeyboardBulletDelay <= 0){

					if(bulletPower == 0){

						KeyboardBulletDelay = 10;
					}
					else if(bulletPower == 1){

						KeyboardBulletDelay = 9;
					}
					else if(bulletPower == 2){

						KeyboardBulletDelay = 8;
					}
					else if(bulletPower == 3){

						KeyboardBulletDelay = 7;
					}
					else if(bulletPower == 4){

						KeyboardBulletDelay = 6;
					}
					else if(bulletPower == 5){

						KeyboardBulletDelay = 5;
					}
					else if(bulletPower == 6){

						KeyboardBulletDelay = 4;
					}
					else if(bulletPower == 7){

						KeyboardBulletDelay = 3;
					}
					else if(bulletPower == 8){

						KeyboardBulletDelay = 2;
					}
					else if(bulletPower >= 9){

						KeyboardBulletDelay = 1;
					}
					
				}
			}

			else if (keys[37]) { // left arrow key[37] d key[65]

				shootStickDirX = "left";
				shootStickDirY = "";


				if(bulletPower == 0 && KeyboardBulletDelay == 10){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 1 && KeyboardBulletDelay == 9){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 2 && KeyboardBulletDelay == 8){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 3 && KeyboardBulletDelay == 7){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 4 && KeyboardBulletDelay == 6){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 5 && KeyboardBulletDelay == 5){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 6 && KeyboardBulletDelay == 4){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 7 && KeyboardBulletDelay == 3){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 8 && KeyboardBulletDelay == 2){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower >= 9 && KeyboardBulletDelay == 1){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				KeyboardBulletDelay -= 1;

				if(KeyboardBulletDelay <= 0){

					if(bulletPower == 0){

						KeyboardBulletDelay = 10;
					}
					else if(bulletPower == 1){

						KeyboardBulletDelay = 9;
					}
					else if(bulletPower == 2){

						KeyboardBulletDelay = 8;
					}
					else if(bulletPower == 3){

						KeyboardBulletDelay = 7;
					}
					else if(bulletPower == 4){

						KeyboardBulletDelay = 6;
					}
					else if(bulletPower == 5){

						KeyboardBulletDelay = 5;
					}
					else if(bulletPower == 6){

						KeyboardBulletDelay = 4;
					}
					else if(bulletPower == 7){

						KeyboardBulletDelay = 3;
					}
					else if(bulletPower == 8){

						KeyboardBulletDelay = 2;
					}
					else if(bulletPower >= 9){

						KeyboardBulletDelay = 1;
					}
					
				}
            }
			else if (keys[39]) { // right arrow key[39] a key[68]

				shootStickDirX = "right";
				shootStickDirY = "";

				if(bulletPower == 0 && KeyboardBulletDelay == 10){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 1 && KeyboardBulletDelay == 9){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 2 && KeyboardBulletDelay == 8){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 3 && KeyboardBulletDelay == 7){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 4 && KeyboardBulletDelay == 6){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 5 && KeyboardBulletDelay == 5){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 6 && KeyboardBulletDelay == 4){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 7 && KeyboardBulletDelay == 3){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 8 && KeyboardBulletDelay == 2){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower >= 9 && KeyboardBulletDelay == 1){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				KeyboardBulletDelay -= 1;

				if(KeyboardBulletDelay <= 0){

					if(bulletPower == 0){

						KeyboardBulletDelay = 10;
					}
					else if(bulletPower == 1){

						KeyboardBulletDelay = 9;
					}
					else if(bulletPower == 2){

						KeyboardBulletDelay = 8;
					}
					else if(bulletPower == 3){

						KeyboardBulletDelay = 7;
					}
					else if(bulletPower == 4){

						KeyboardBulletDelay = 6;
					}
					else if(bulletPower == 5){

						KeyboardBulletDelay = 5;
					}
					else if(bulletPower == 6){

						KeyboardBulletDelay = 4;
					}
					else if(bulletPower == 7){

						KeyboardBulletDelay = 3;
					}
					else if(bulletPower == 8){

						KeyboardBulletDelay = 2;
					}
					else if(bulletPower >= 9){

						KeyboardBulletDelay = 1;
					}
					
				}
            }
			else if (keys[40]) { // down arrow key[40] s key[83]

				shootStickDirX = "";
				shootStickDirY = "down";

				if(bulletPower == 0 && KeyboardBulletDelay == 10){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 1 && KeyboardBulletDelay == 9){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 2 && KeyboardBulletDelay == 8){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 3 && KeyboardBulletDelay == 7){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 4 && KeyboardBulletDelay == 6){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 5 && KeyboardBulletDelay == 5){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 6 && KeyboardBulletDelay == 4){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 7 && KeyboardBulletDelay == 3){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 8 && KeyboardBulletDelay == 2){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower >= 9 && KeyboardBulletDelay == 1){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				KeyboardBulletDelay -= 1;

				if(KeyboardBulletDelay <= 0){

					if(bulletPower == 0){

						KeyboardBulletDelay = 10;
					}
					else if(bulletPower == 1){

						KeyboardBulletDelay = 9;
					}
					else if(bulletPower == 2){

						KeyboardBulletDelay = 8;
					}
					else if(bulletPower == 3){

						KeyboardBulletDelay = 7;
					}
					else if(bulletPower == 4){

						KeyboardBulletDelay = 6;
					}
					else if(bulletPower == 5){

						KeyboardBulletDelay = 5;
					}
					else if(bulletPower == 6){

						KeyboardBulletDelay = 4;
					}
					else if(bulletPower == 7){

						KeyboardBulletDelay = 3;
					}
					else if(bulletPower == 8){

						KeyboardBulletDelay = 2;
					}
					else if(bulletPower >= 9){

						KeyboardBulletDelay = 1;
					}
					
				}
            }
			else if (keys[38]) { // up arrow key[38] w key[87]

				shootStickDirX = "";
				shootStickDirY = "up";

				if(bulletPower == 0 && KeyboardBulletDelay == 10){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 1 && KeyboardBulletDelay == 9){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 2 && KeyboardBulletDelay == 8){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 3 && KeyboardBulletDelay == 7){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 4 && KeyboardBulletDelay == 6){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 5 && KeyboardBulletDelay == 5){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 6 && KeyboardBulletDelay == 4){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 7 && KeyboardBulletDelay == 3){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower == 8 && KeyboardBulletDelay == 2){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				else if(bulletPower >= 9 && KeyboardBulletDelay == 1){
					bullet = jQuery.extend(true, {}, PlayerBullet);
					bullet.directionX = shootStickDirX;
					bullet.directionY = shootStickDirY;
					bullet.x = x;
					bullet.y = y;
					
					bulletClip.push(bullet);
				}
				KeyboardBulletDelay -= 1;

				if(KeyboardBulletDelay <= 0){

					if(bulletPower == 0){

						KeyboardBulletDelay = 10;
					}
					else if(bulletPower == 1){

						KeyboardBulletDelay = 9;
					}
					else if(bulletPower == 2){

						KeyboardBulletDelay = 8;
					}
					else if(bulletPower == 3){

						KeyboardBulletDelay = 7;
					}
					else if(bulletPower == 4){

						KeyboardBulletDelay = 6;
					}
					else if(bulletPower == 5){

						KeyboardBulletDelay = 5;
					}
					else if(bulletPower == 6){

						KeyboardBulletDelay = 4;
					}
					else if(bulletPower == 7){

						KeyboardBulletDelay = 3;
					}
					else if(bulletPower == 8){

						KeyboardBulletDelay = 2;
					}
					else if(bulletPower >= 9){

						KeyboardBulletDelay = 1;
					}
					
				}
            }

			document.body.addEventListener("keydown", function (e) { // these make the keyboard do
				keys[e.keyCode] = true;
			});
			document.body.addEventListener("keyup", function (e) {
				keys[e.keyCode] = false;

			});
			
			
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
						
							//velX -= 6;
							//velY -= 6;

							if(slowMotion == true){

								velX -= (canvas.width) * 0.006;
								velY -= (canvas.height) * 0.006;
					 		}
					 		else if(slowMotion == false){

						 		velX -= (canvas.width) * 0.016;
								velY -= (canvas.height) * 0.016;
					 		}
						
					}
					else if(joyDirX == "left" && joyDirY == "down" ){
						
							//velY += 6;
							//velX -= 6;

							if(slowMotion == true){

								velX -= (canvas.width) * 0.006;
								velY += (canvas.height) * 0.006;
					 		}
					 		else if(slowMotion == false){

						 		velX -= (canvas.width) * 0.016;
								velY += (canvas.height) * 0.016;
					 		}
						
					}
					else if(joyDirY == "up" && joyDirX == "right"){
						
							//velY -= 6;
							//velX += 6;

							if(slowMotion == true){

								velX += (canvas.width) * 0.006;
								velY -= (canvas.height) * 0.006;
					 		}
					 		else if(slowMotion == false){

						 		velX += (canvas.width) * 0.016;
								velY -= (canvas.height) * 0.016;
					 		}
						
					}
					else if(joyDirY == "down" && joyDirX == "right"){
						
							//velY += 6;
							//velX += 6;

							if(slowMotion == true){

								velX += (canvas.width) * 0.006;
								velY += (canvas.height) * 0.006;
					 		}
					 		else if(slowMotion == false){

						 		velX += (canvas.width) * 0.016;
								velY += (canvas.height) * 0.016;
					 		}
						
					}
					else if(joyDirX == "left"){
						
							//velX -= 6;

							if(slowMotion == true){

								velX -= (canvas.width) * 0.006;
					 		}
					 		else if(slowMotion == false){

						 		velX -= (canvas.width) * 0.016;
					 		}		
						
					}
					else if(joyDirX == "right"){
						
							//velX += 6;

							if(slowMotion == true){

								velX += (canvas.width) * 0.006;
					 		}
					 		else if(slowMotion == false){

						 		velX += (canvas.width) * 0.016;
					 		}													
						
					}
					else if(joyDirY == "up"){
						
							//velY -= 6;

							if(slowMotion == true){

								velY -= (canvas.height) * 0.006;
					 		}
					 		else if(slowMotion == false){

						 		velY -= (canvas.height) * 0.016;
					 		}									
						
					}
					else if(joyDirY == "down"){
						
							//velY += 6;

							if(slowMotion == true){

								velY += (canvas.height) * 0.006;
					 		}
					 		else if(slowMotion == false){

						 		velY += (canvas.height) * 0.016;
					 		}									
						
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
			var flicker = Math.floor((Math.random() * 30) + 1);

			if(flicker == 15){

				borderBrightness = Math.floor((Math.random() * 60) + 30);

			}
			

			ctx.strokeStyle = 'hsl(' + borderHue + ',' + borderShade + '%, ' + borderBrightness + '%)';
			ctx.lineWidth = '5';
			ctx.strokeRect(0, 0, canvas.width, canvas.height);

				


			$("canvas:nth-child(2)").hide();
            setTimeout(update, 30); //refresh the screen to update positions//

			if(slowMotion == true){

				ctx.strokeStyle = 'hsl(' + slowHue + ',' + slowShade + '%, ' + slowBrightness + '%)';
				ctx.lineWidth = '20';
				ctx.strokeRect(0, 0, canvas.width, canvas.height);

				
				
			}
			else if(slowMotion == false){
				
				

				//ctx.clearRect(0, 0, canvas.width, canvas.height);

				

				slowBrightness = 60;
			}
			
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
						
							//this.x -= 7;
							//this.y -= 7;

							if(slowMotion == true){

								this.x -= (canvas.width) * 0.009;
								this.y -= (canvas.height) * 0.009;
					 		}
					 		else if(slowMotion == false){

						 		this.x -= (canvas.width) * 0.027;
								this.y -= (canvas.height) * 0.027;
					 		}										
						
					}
					else if(this.directionX == "left" && this.directionY == "down" ){
						
							//this.y += 7;
							//this.x -= 7;

							if(slowMotion == true){

								this.x -= (canvas.width) * 0.009;
								this.y += (canvas.height) * 0.009;
					 		}
					 		else if(slowMotion == false){

						 		this.x -= (canvas.width) * 0.027;
								this.y += (canvas.height) * 0.027;
					 		}							
						
					}
					else if(this.directionX == "right" && this.directionY == "up"){
						
							//this.y -= 7;
							//this.x += 7;

							if(slowMotion == true){

								this.x += (canvas.width) * 0.009;
								this.y -= (canvas.height) * 0.009;
					 		}
					 		else if(slowMotion == false){

						 		this.x += (canvas.width) * 0.027;
								this.y -= (canvas.height) * 0.027;
					 		}

							
						
					}
					else if(this.directionX == "right" && this.directionY == "down"){
						
							//this.y += 7;
							//this.x += 7;

							if(slowMotion == true){

								this.x += (canvas.width) * 0.009;
								this.y += (canvas.height) * 0.009;
					 		}
					 		else if(slowMotion == false){

						 		this.x += (canvas.width) * 0.027;
								this.y += (canvas.height) * 0.027;
					 		}							
						
					}
					else if(this.directionX == "left"){
						
							//this.x -= 7;

							if(slowMotion == true){

								this.x -= (canvas.width) * 0.009;
					 		}
					 		else if(slowMotion == false){

						 		this.x -= (canvas.width) * 0.027;
					 		}
						
					}
					else if(this.directionX == "right"){
						
							//this.x += 7;

							if(slowMotion == true){

								this.x += (canvas.width) * 0.009;
					 		}
					 		else if(slowMotion == false){

						 		this.x += (canvas.width) * 0.027;
					 		}							
						
					}
					else if(this.directionY == "up"){
						
							//this.y -= 7;

							if(slowMotion == true){

								this.y -= (canvas.height) * 0.009;
					 		}
					 		else if(slowMotion == false){

						 		this.y -= (canvas.height) * 0.027;
					 		}						
						
					}
					else if(this.directionY == "down"){
						
							//this.y += 7;

							if(slowMotion == true){

								this.y += (canvas.height) * 0.009;
					 		}
					 		else if(slowMotion == false){

						 		this.y += (canvas.height) * 0.027;
					 		}						
					}


				for(var i = 0; i < BlackBox.length; i++){

					 if (this.x < BlackBox[i].x + (playerSize * 17)  && this.x + (playerSize * 17)  > BlackBox[i].x &&
					 this.y < BlackBox[i].y + (playerSize * 17) && this.y + (playerSize * 17) > BlackBox[i].y) {

						 //this will make direct the enemy move in the direction of the player at varying speeds and times
				  if(this.x < BlackBox[i].x && this.y < BlackBox[i].y){
					 
					 //this.x += 1;
					 //this.y += 1;

					if(slowMotion == true){

						this.x += (canvas.width) * 0.0017;
					 	this.y += (canvas.height) * 0.0017;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0037;
					 	this.y += (canvas.height) * 0.0037;
					 } 
					 
				 }
				 if(this.x > BlackBox[i].x && this.y > BlackBox[i].y){
					 
					 //this.x -= 1;
					 //this.y -= 1;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0017;
					 	this.y -= (canvas.height) * 0.0017;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0037;
					 	this.y -= (canvas.height) * 0.0037;
					 } 

					 
				 }
				 if(this.x > BlackBox[i].x && this.y < BlackBox[i].y){
					 
					 //this.x -= 1;
					 //this.y += 1;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0017;
					 	this.y += (canvas.height) * 0.0017;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0037;
					 	this.y += (canvas.height) * 0.0037;
					 } 

					 
				 }
				 if(this.x > BlackBox[i].x && this.y < BlackBox[i].y){
					 
					 //this.x -= 1;
					 //this.y += 1;

					 if(slowMotion == true){

						this.x += (canvas.width) * 0.0017;
					 	this.y -= (canvas.height) * 0.0017;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0037;
					 	this.y -= (canvas.height) * 0.0037;
					 } 

					 
				 }
				 if(this.x < BlackBox[i].x){
					 
					 //this.x += 1.1;

					if(slowMotion == true){

						this.x += (canvas.width) * 0.0017;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0037;
					 } 

					 
				 }
				 if(this.y > BlackBox[i].y){
					 
					 //this.y -= 1.1;

					if(slowMotion == true){

						this.y -= (canvas.height) * 0.0017;
					 }
					 else if(slowMotion == false){

						this.y -= (canvas.height) * 0.0037;
					 } 

					 
				 }
				 if(this.x > BlackBox[i].x){
					 
					 //this.x -= 1.1;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0017;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0037;
					 } 

					 
				 }
				 if(this.y < BlackBox[i].y){
					 
					 //this.y += 1.1;

					 if(slowMotion == true){

						this.y += (canvas.height) * 0.0017;
					 }
					 else if(slowMotion == false){

						this.y += (canvas.height) * 0.0037;
					 } 

					 
				 } 
				 

			}
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
					 //this.x -= 1.7;

					if(slowMotion == true){

						 this.x -= (canvas.width) * 0.0015;
					 }
					 else if(slowMotion == false){

						 this.x -= (canvas.width) * 0.0048;
					 } 

					 
				 }
				 if(this.direction == 1){
					 //this.x += 1.7;


					if(slowMotion == true){

						 this.x += (canvas.width) * 0.0015;
					 }
					 else if(slowMotion == false){

						 this.x += (canvas.width) * 0.0048;
					 }
					 
				 }
				 if(this.direction == 2){
					 //this.y -= 1.7;


					if(slowMotion == true){

						 this.y -= (canvas.height) * 0.0015;
					 }
					 else if(slowMotion == false){

						 this.y -= (canvas.height) * 0.0048;
					 }
				 
				 }
				 if(this.direction == 3){
					 //this.y += 1.7;


					if(slowMotion == true){

						 this.y += (canvas.height) * 0.0015;
					 }
					 else if(slowMotion == false){

						 this.y += (canvas.height) * 0.0048;
					 }
					 
				 }
				 if(this.direction == 4){
					 //this.y += 1.7;
					 //this.x += 1.7;

					if(slowMotion == true){

						this.x += (canvas.width) * 0.0015;
					 	this.y += (canvas.height) * 0.0015;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0048;
					 	this.y += (canvas.height) * 0.0048;
					 }
				 }
				 if(this.direction == 5){
					 //this.y -= 1.7;
					 //this.x -= 1.7;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0015;
					 	this.y -= (canvas.height) * 0.0015;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0048;
					 	this.y -= (canvas.height) * 0.0048;
					 }
					
				 }
				 if(this.direction == 6){
					 //this.y += 1.7;
					 //this.x -= 1.7;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0015;
					 	this.y += (canvas.height) * 0.0015;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0048;
					 	this.y += (canvas.height) * 0.0048;
					 }					 					 
				 }
				 if(this.direction == 7){
					 //this.y -= 1.7;
					 //this.x += 1.7;

					if(slowMotion == true){

						this.x += (canvas.width) * 0.0015;
					 	this.y -= (canvas.height) * 0.0015;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0048;
					 	this.y -= (canvas.height) * 0.0048;
					 }					 

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
				 
				 for(var i = 0; i < BlackBox.length; i++){

					 if (this.x < BlackBox[i].x + (playerSize * 17)  && this.x + (playerSize * 17)  > BlackBox[i].x &&
					 this.y < BlackBox[i].y + (playerSize * 17) && this.y + (playerSize * 17) > BlackBox[i].y) {

				 if(this.x < BlackBox[i].x){
					 
					 //this.x += 1.1;

					if(slowMotion == true){

						this.x += (canvas.width) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0031;
					 } 

					 
				 }
				 if(this.y > BlackBox[i].y){
					 
					 //this.y -= 1.1;

					if(slowMotion == true){

						this.y -= (canvas.height) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.y -= (canvas.height) * 0.0031;
					 } 

					 
				 }
				 if(this.x > BlackBox[i].x){
					 
					 //this.x -= 1.1;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0031;
					 } 

					 
				 }
				 if(this.y < BlackBox[i].y){
					 
					 //this.y += 1.1;

					 if(slowMotion == true){

						this.y += (canvas.height) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.y += (canvas.height) * 0.0031;
					 } 

					 
				 } 
				 

					}


				 }

			 }
			  
		};

		var InfectedShip = {
  			color: "blue",
  			x: Math.round(Math.random() * (canvas.width * .90)),
  			y: Math.round(Math.random() * (canvas.height * .90)),
			direction: randomDirection = Math.round(Math.random() * 7),
			size: playerSize,
			hp: 7,
 			draw: function() {
				ctx.beginPath(); // this is the ai guy
    			ctx.fillStyle = this.color;
    			//ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
				ctx.rect(this.x,this.y,this.size,this.size);
				ctx.fill();
            	ctx.closePath();
 			 },
			 movement: function(){
				 
				 for(var i = 0; i < BlackBox.length; i++){

					 if (this.x < BlackBox[i].x + (playerSize * 20)  && this.x + (playerSize * 20)  > BlackBox[i].x &&
					 this.y < BlackBox[i].y + (playerSize * 20) && this.y + (playerSize * 20) > BlackBox[i].y) {

				 if(this.x < BlackBox[i].x){
					 
					 //this.x += 1.1;

					if(slowMotion == true){

						this.x += (canvas.width) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0031;
					 } 

					 
				 }
				 if(this.y > BlackBox[i].y){
					 
					 //this.y -= 1.1;

					if(slowMotion == true){

						this.y -= (canvas.height) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.y -= (canvas.height) * 0.0031;
					 } 

					 
				 }
				 if(this.x > BlackBox[i].x){
					 
					 //this.x -= 1.1;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0031;
					 } 

					 
				 }
				 if(this.y < BlackBox[i].y){
					 
					 //this.y += 1.1;

					 if(slowMotion == true){

						this.y += (canvas.height) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.y += (canvas.height) * 0.0031;
					 } 

					 
				 } 
				 

					}


				 }

				 for(var i = 0; i < RandomShipFleet.length; i++){

				//this will make direct the enemy move in the direction of the player
				 if(this.x < RandomShipFleet[i].x){
					 
					 //this.x += 1.6;

					 if(slowMotion == true){

						 this.x += (canvas.width) * 0.0010;
					 }
					 else if(slowMotion == false){

						 this.x += (canvas.width) * 0.0024;
					 } 
				 
				 }
				 if(this.x > RandomShipFleet[i].x){
					 
					 //this.x -= 1.6;

					 if(slowMotion == true){

						 this.x -= (canvas.width) * 0.0010;
					 }
					 else if(slowMotion == false){

						 this.x -= (canvas.width) * 0.0024;
					 } 
					 
				 }
				 if(this.y < RandomShipFleet[i].y){
					 
					 //this.y += 1.6;

					 if(slowMotion == true){

						 this.y += (canvas.height) * 0.0010;
					 }
					 else if(slowMotion == false){

						 this.y += (canvas.height) * 0.0024;
					 } 
					 
				 }
				 if(this.y > RandomShipFleet[i].y){
					 
					 //this.y -= 1.6;

					 if(slowMotion == true){

						 this.y -= (canvas.height) * 0.0010;
					 }
					 else if(slowMotion == false){

						 this.y -= (canvas.height) * 0.0024;
					 } 
				 }

			}





			if(this.x < x){
					 
					 //this.x += 1.6;

					 if(slowMotion == true){

						 this.x += (canvas.width) * 0.0010;
					 }
					 else if(slowMotion == false){

						 this.x += (canvas.width) * 0.0024;
					 } 
				 
				 }
				 if(this.x > x){
					 
					 //this.x -= 1.6;

					 if(slowMotion == true){

						 this.x -= (canvas.width) * 0.0010;
					 }
					 else if(slowMotion == false){

						 this.x -= (canvas.width) * 0.0024;
					 } 
					 
				 }
				 if(this.y < y){
					 
					 //this.y += 1.6;

					 if(slowMotion == true){

						 this.y += (canvas.height) * 0.0010;
					 }
					 else if(slowMotion == false){

						 this.y += (canvas.height) * 0.0024;
					 } 
					 
				 }
				 if(this.y > y){
					 
					 //this.y -= 1.6;

					 if(slowMotion == true){

						 this.y -= (canvas.height) * 0.0010;
					 }
					 else if(slowMotion == false){

						 this.y -= (canvas.height) * 0.0024;
					 } 
				 }
			 }
			  
		};


		var BHjectile = {
			hue: 90,
			shade: Math.floor((Math.random() * 100) + 1),
			brightness: Math.floor((Math.random() * 100) + 1),
  			color: 'hsl(' + this.hue + ',' + this.shade + '%, ' + this.brightness + '%)',
  			x: Math.round(Math.random() * (canvas.width * .90)),
  			y: Math.round(Math.random() * (canvas.height * .90)),
			direction: randomDirection = Math.round(Math.random() * 7),
 			draw: function() {
				ctx.beginPath(); // this is the ai guy
    			ctx.fillStyle = 'hsl(' + this.hue + ',' + this.shade + '%, ' + this.brightness + '%)';
    			ctx.arc(this.x, this.y, playerSize, 0, Math.PI * 2);
				ctx.fill();
            	ctx.closePath();
 			 },
			 movement: function(){
				 
				 //this will make direct the enemy to move in a random location
				 
				 if(this.direction == 0){
					 //this.x -= 1.7;

					if(slowMotion == true){

						 this.x -= (canvas.width) * 0.0020;
					 }
					 else if(slowMotion == false){

						 this.x -= (canvas.width) * 0.0060;
					 } 

					 
				 }
				 if(this.direction == 1){
					 //this.x += 1.7;


					if(slowMotion == true){

						 this.x += (canvas.width) * 0.0020;
					 }
					 else if(slowMotion == false){

						 this.x += (canvas.width) * 0.0060;
					 }
					 
				 }
				 if(this.direction == 2){
					 //this.y -= 1.7;


					if(slowMotion == true){

						 this.y -= (canvas.height) * 0.0020;
					 }
					 else if(slowMotion == false){

						 this.y -= (canvas.height) * 0.0060;
					 }
				 
				 }
				 if(this.direction == 3){
					 //this.y += 1.7;


					if(slowMotion == true){

						 this.y += (canvas.height) * 0.0020;
					 }
					 else if(slowMotion == false){

						 this.y += (canvas.height) * 0.0060;
					 }
					 
				 }
				 if(this.direction == 4){
					 //this.y += 1.7;
					 //this.x += 1.7;

					if(slowMotion == true){

						this.x += (canvas.width) * 0.0020;
					 	this.y += (canvas.height) * 0.0020;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0060;
					 	this.y += (canvas.height) * 0.0060;
					 }
				 }
				 if(this.direction == 5){
					 //this.y -= 1.7;
					 //this.x -= 1.7;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0020;
					 	this.y -= (canvas.height) * 0.0020;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0060;
					 	this.y -= (canvas.height) * 0.0060;
					 }
					
				 }
				 if(this.direction == 6){
					 //this.y += 1.7;
					 //this.x -= 1.7;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0020;
					 	this.y += (canvas.height) * 0.0020;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0060;
					 	this.y += (canvas.height) * 0.0060;
					 }					 					 
				 }
				 if(this.direction == 7){
					 //this.y -= 1.7;
					 //this.x += 1.7;

					if(slowMotion == true){

						this.x += (canvas.width) * 0.0020;
					 	this.y -= (canvas.height) * 0.0020;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0060;
					 	this.y -= (canvas.height) * 0.0060;
					 }					 

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
				 
				 for(var i = 0; i < BlackBox.length; i++){

					 if (this.x < BlackBox[i].x + (playerSize * 17)  && this.x + (playerSize * 17)  > BlackBox[i].x &&
					 this.y < BlackBox[i].y + (playerSize * 17) && this.y + (playerSize * 17) > BlackBox[i].y) {

						 
				 if(this.x < BlackBox[i].x){
					 
					 //this.x += 1.1;

					if(slowMotion == true){

						this.x += (canvas.width) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0031;
					 } 

					 
				 }
				 if(this.y > BlackBox[i].y){
					 
					 //this.y -= 1.1;

					if(slowMotion == true){

						this.y -= (canvas.height) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.y -= (canvas.height) * 0.0031;
					 } 

					 
				 }
				 if(this.x > BlackBox[i].x){
					 
					 //this.x -= 1.1;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0031;
					 } 

					 
				 }
				 if(this.y < BlackBox[i].y){
					 
					 //this.y += 1.1;

					 if(slowMotion == true){

						this.y += (canvas.height) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.y += (canvas.height) * 0.0031;
					 } 

					 
				 } 
				 

					}


				 }

			 }
			  
		};

		var InfectedLazer = {
			hue: 0,
			shade: 69,
			brightness: Math.floor((Math.random() * 100) + 1),
  			color: 'hsl(' + this.hue + ',' + this.shade + '%, ' + this.brightness + '%)',
  			x: 50,
  			y: 50,
 			draw: function() {
				ctx.beginPath(); // this is the ai guy
    			ctx.fillStyle = 'hsl(' + this.hue + ',' + this.shade + '%, ' + this.brightness + '%)';
    			ctx.arc(this.x, this.y, playerSize, 0, Math.PI * 2);
				ctx.fill();
            	ctx.closePath();
 			 },
			 movement: function(){
				 
				 for(var i = 0; i < BlackBox.length; i++){

					 if (this.x < BlackBox[i].x + (playerSize * 17)  && this.x + (playerSize * 17)  > BlackBox[i].x &&
					 this.y < BlackBox[i].y + (playerSize * 17) && this.y + (playerSize * 17) > BlackBox[i].y) {

						 
				 if(this.x < BlackBox[i].x){
					 
					 //this.x += 1.1;

					if(slowMotion == true){

						this.x += (canvas.width) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0031;
					 } 

					 
				 }
				 if(this.y > BlackBox[i].y){
					 
					 //this.y -= 1.1;

					if(slowMotion == true){

						this.y -= (canvas.height) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.y -= (canvas.height) * 0.0031;
					 } 

					 
				 }
				 if(this.x > BlackBox[i].x){
					 
					 //this.x -= 1.1;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0031;
					 } 

					 
				 }
				 if(this.y < BlackBox[i].y){
					 
					 //this.y += 1.1;

					 if(slowMotion == true){

						this.y += (canvas.height) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.y += (canvas.height) * 0.0031;
					 } 

					 
				 } 
				 

					}


				 }

				 //this will make direct the enemy move in the direction of the player
				 if(this.x < x){
					 
					 //this.x += 1.6;

					 if(slowMotion == true){

						 this.x += (canvas.width) * 0.0025;
					 }
					 else if(slowMotion == false){

						 this.x += (canvas.width) * 0.0070;
					 } 
				 
				 }
				 if(this.x > x){
					 
					 //this.x -= 1.6;

					 if(slowMotion == true){

						 this.x -= (canvas.width) * 0.0025;
					 }
					 else if(slowMotion == false){

						 this.x -= (canvas.width) * 0.0070;
					 } 
					 
				 }
				 if(this.y < y){
					 
					 //this.y += 1.6;

					 if(slowMotion == true){

						 this.y += (canvas.height) * 0.0025;
					 }
					 else if(slowMotion == false){

						 this.y += (canvas.height) * 0.0070;
					 } 
					 
				 }
				 if(this.y > y){
					 
					 //this.y -= 1.6;

					 if(slowMotion == true){

						 this.y -= (canvas.height) * 0.0025;
					 }
					 else if(slowMotion == false){

						 this.y -= (canvas.height) * 0.0070;
					 } 
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


				 	for(var i = 0; i < BlackBox.length; i++){

					 if (this.x < BlackBox[i].x + (playerSize * 17)  && this.x + (playerSize * 17)  > BlackBox[i].x &&
					 this.y < BlackBox[i].y + (playerSize * 17) && this.y + (playerSize * 17) > BlackBox[i].y) {

				 if(this.x < BlackBox[i].x){
					 
					 //this.x += 1.1;

					if(slowMotion == true){

						this.x += (canvas.width) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0031;
					 } 

					 
				 }
				 if(this.y > BlackBox[i].y){
					 
					 //this.y -= 1.1;

					if(slowMotion == true){

						this.y -= (canvas.height) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.y -= (canvas.height) * 0.0031;
					 } 

					 
				 }
				 if(this.x > BlackBox[i].x){
					 
					 //this.x -= 1.1;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0031;
					 } 

					 
				 }
				 if(this.y < BlackBox[i].y){
					 
					 //this.y += 1.1;

					 if(slowMotion == true){

						this.y += (canvas.height) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.y += (canvas.height) * 0.0031;
					 } 

					 
				 } 
				 

			}
			
		}
	 
				 //this will make direct the enemy move in the direction of the player
				 if(this.x < x){
					 
					 //this.x += 1.6;

					 if(slowMotion == true){

						 this.x += (canvas.width) * 0.0015;
					 }
					 else if(slowMotion == false){

						 this.x += (canvas.width) * 0.0044;
					 } 
				 
				 }
				 if(this.x > x){
					 
					 //this.x -= 1.6;

					 if(slowMotion == true){

						 this.x -= (canvas.width) * 0.0015;
					 }
					 else if(slowMotion == false){

						 this.x -= (canvas.width) * 0.0044;
					 } 
					 
				 }
				 if(this.y < y){
					 
					 //this.y += 1.6;

					 if(slowMotion == true){

						 this.y += (canvas.height) * 0.0015;
					 }
					 else if(slowMotion == false){

						 this.y += (canvas.height) * 0.0044;
					 } 
					 
				 }
				 if(this.y > y){
					 
					 //this.y -= 1.6;

					 if(slowMotion == true){

						 this.y -= (canvas.height) * 0.0015;
					 }
					 else if(slowMotion == false){

						 this.y -= (canvas.height) * 0.0044;
					 } 
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
					 
					 //this.x += 1;
					 //this.y += 1;

					if(slowMotion == true){

						this.x += (canvas.width) * 0.0015;
					 	this.y += (canvas.height) * 0.0015;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0035;
					 	this.y += (canvas.height) * 0.0035;
					 } 
					 
				 }
				 if(this.x > x && this.y > y){
					 
					 //this.x -= 1;
					 //this.y -= 1;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0015;
					 	this.y -= (canvas.height) * 0.0015;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0035;
					 	this.y -= (canvas.height) * 0.0035;
					 } 

					 
				 }
				 if(this.x > x && this.y < y){
					 
					 //this.x -= 1;
					 //this.y += 1;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0015;
					 	this.y += (canvas.height) * 0.0015;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0035;
					 	this.y += (canvas.height) * 0.0035;
					 } 

					 
				 }
				 if(this.x > x && this.y < y){
					 
					 //this.x -= 1;
					 //this.y += 1;

					 if(slowMotion == true){

						this.x += (canvas.width) * 0.0015;
					 	this.y -= (canvas.height) * 0.0015;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0035;
					 	this.y -= (canvas.height) * 0.0035;
					 } 

					 
				 }
				 if(this.x < x){
					 
					 //this.x += 1.1;

					if(slowMotion == true){

						this.x += (canvas.width) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0031;
					 } 

					 
				 }
				 if(this.y > y){
					 
					 //this.y -= 1.1;

					if(slowMotion == true){

						this.y -= (canvas.height) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.y -= (canvas.height) * 0.0031;
					 } 

					 
				 }
				 if(this.x > x){
					 
					 //this.x -= 1.1;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0031;
					 } 

					 
				 }
				 if(this.y < y){
					 
					 //this.y += 1.1;

					 if(slowMotion == true){

						this.y += (canvas.height) * 0.0011;
					 }
					 else if(slowMotion == false){

						this.y += (canvas.height) * 0.0031;
					 } 

					 
				 }


				for(var i = 0; i < BlackBox.length; i++){

					 if (this.x < BlackBox[i].x + (playerSize * 17)  && this.x + (playerSize * 17)  > BlackBox[i].x &&
					 this.y < BlackBox[i].y + (playerSize * 17) && this.y + (playerSize * 17) > BlackBox[i].y) {

						 //this will make direct the enemy move in the direction of the player at varying speeds and times//
				//   if(this.x < BlackBox[i].x && this.y < BlackBox[i].y){
					 
				// 	 //this.x += 1;
				// 	 //this.y += 1;

				// 	if(slowMotion == true){

				// 		this.x += (canvas.width) * 0.0017;
				// 	 	this.y += (canvas.height) * 0.0017;
				// 	 }
				// 	 else if(slowMotion == false){

				// 		this.x += (canvas.width) * 0.0037;
				// 	 	this.y += (canvas.height) * 0.0037;
				// 	 } 
					 
				//  }
				//  if(this.x > BlackBox[i].x && this.y > BlackBox[i].y){
					 
				// 	 //this.x -= 1;
				// 	 //this.y -= 1;

				// 	if(slowMotion == true){

				// 		this.x -= (canvas.width) * 0.0017;
				// 	 	this.y -= (canvas.height) * 0.0017;
				// 	 }
				// 	 else if(slowMotion == false){

				// 		this.x -= (canvas.width) * 0.0037;
				// 	 	this.y -= (canvas.height) * 0.0037;
				// 	 } 

					 
				//  }
				//  if(this.x > BlackBox[i].x && this.y < BlackBox[i].y){
					 
				// 	 //this.x -= 1;
				// 	 //this.y += 1;

				// 	if(slowMotion == true){

				// 		this.x -= (canvas.width) * 0.0017;
				// 	 	this.y += (canvas.height) * 0.0017;
				// 	 }
				// 	 else if(slowMotion == false){

				// 		this.x -= (canvas.width) * 0.0037;
				// 	 	this.y += (canvas.height) * 0.0037;
				// 	 } 

					 
				//  }
				//  if(this.x > BlackBox[i].x && this.y < BlackBox[i].y){
					 
				// 	 //this.x -= 1;
				// 	 //this.y += 1;

				// 	 if(slowMotion == true){

				// 		this.x += (canvas.width) * 0.0017;
				// 	 	this.y -= (canvas.height) * 0.0017;
				// 	 }
				// 	 else if(slowMotion == false){

				// 		this.x += (canvas.width) * 0.0037;
				// 	 	this.y -= (canvas.height) * 0.0037;
				// 	 } 

					 
				//  }
				 if(this.x < BlackBox[i].x){
					 
					 //this.x += 1.1;

					if(slowMotion == true){

						this.x += (canvas.width) * 0.0017;
					 }
					 else if(slowMotion == false){

						this.x += (canvas.width) * 0.0037;
					 } 

					 
				 }
				 if(this.y > BlackBox[i].y){
					 
					 //this.y -= 1.1;

					if(slowMotion == true){

						this.y -= (canvas.height) * 0.0017;
					 }
					 else if(slowMotion == false){

						this.y -= (canvas.height) * 0.0037;
					 } 

					 
				 }
				 if(this.x > BlackBox[i].x){
					 
					 //this.x -= 1.1;

					if(slowMotion == true){

						this.x -= (canvas.width) * 0.0017;
					 }
					 else if(slowMotion == false){

						this.x -= (canvas.width) * 0.0037;
					 } 

					 
				 }
				 if(this.y < BlackBox[i].y){
					 
					 //this.y += 1.1;

					 if(slowMotion == true){

						this.y += (canvas.height) * 0.0017;
					 }
					 else if(slowMotion == false){

						this.y += (canvas.height) * 0.0037;
					 } 

					 
				 } 
				 

			}
		}


				 		 
			 }
			  
		};
		
		var LifePowerUp = {
  			color: "DarkGreen",
  			x: Math.round(Math.random() * (canvas.width * .90)),
  			y: Math.round(Math.random() * (canvas.height * .90)),
 			draw: function() {
				 
				ctx.fillStyle = this.color;
				ctx.beginPath(); // this is the ai guy
				//ctx.moveTo(15, 15);
    			ctx.arc(this.x, this.y, bulletSize * 2.5, 0, Math.PI * 2);
				ctx.closePath();
				ctx.fill();
				//ctx.stroke();
				ctx.font = "25px serif";
				ctx.textAlign = "center";
				ctx.fillStyle = "rgba(255, 255, 200, 1)";
				ctx.fillText("H",this.x,this.y + (0.63 * 10));
				//ctx.moveTo(0, 0);
				//ctx.fillStyle = "green";
				//ctx.stroke();
 			 }						  
		};
		
		var BulletPowerUp = {
  			color: "DarkSlateGray",
  			x: Math.round(Math.random() * (canvas.width * .90)),
  			y: Math.round(Math.random() * (canvas.height * .90)),
 			draw: function() {
				 
				ctx.fillStyle = this.color;
				ctx.beginPath(); // this is the ai guy
				//ctx.moveTo(15, 15);
    			ctx.arc(this.x, this.y, bulletSize * 2.5, 0, Math.PI * 2);
				ctx.closePath();
				ctx.fill();
				ctx.beginPath();
				//ctx.stroke();
				ctx.font = "25px serif";
				ctx.textAlign = "center";
				ctx.fillStyle = "rgba(255, 255, 200, 1)";
				ctx.fillText("BP",this.x,this.y + (0.60 * 10));
				//ctx.moveTo(0, 0);
				//ctx.fillStyle = "yellow";
				//ctx.stroke();
            	ctx.closePath();
				
				
 			 }						  
		};

		var BlackHole = {
  			color: "Black",
  			x: Math.round(Math.random() * (canvas.width * .90)),
  			y: Math.round(Math.random() * (canvas.height * .90)),
			hue: 120,
			size: playerSize * 2,
			hp: 15,
			multiplier: 2,
			shade: Math.floor((Math.random() * 100) + 1),
			brightness: Math.floor((Math.random() * 100) + 1),
 			draw: function() {
				 
				ctx.fillStyle = this.color;
				ctx.strokeStyle = 'hsl(' + this.hue + ',' + this.shade + '%, ' + this.brightness + '%)';
				ctx.beginPath(); // this is the ai guy
				ctx.lineWidth = '3';
    			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
				ctx.closePath();
				ctx.fill();
				ctx.stroke();
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


				if(slowMoWatch == 30 && slowMotion == false){

					if (x < RandomShipFleet[i].x + (playerSize * 4)  && x + (playerSize * 4)  > RandomShipFleet[i].x &&
					y < RandomShipFleet[i].y + (playerSize * 4) && y + (playerSize * 4) > RandomShipFleet[i].y) {

						slowMo();
						
					}
				}
								
				//this is a colision with the randomly spawning ai guys
				if (x < RandomShipFleet[i].x + playerSize  && x + playerSize  > RandomShipFleet[i].x &&
				y < RandomShipFleet[i].y + playerSize && y + playerSize > RandomShipFleet[i].y) {
					// The objects are touching
				
					velX *= friction - 2; //this will stop the player from moving
					velY *= friction - 2;
					
					lives -= 1;
					slowMo();
					
					if(bulletPower > 0){
						
						bulletPower -= 1;
					}
					else{
						bulletPower = 0;
					}
					
					if(shootStickTouch == false){
						
						$("#shootStick").trigger('touchend');
					}
					else{
						$("#shootStick").trigger('touchend');
						$("#shootStick").trigger('touchstart');
					}
					
					fireworks.push( new Firework( canvas.width / 2, canvas.height, x, y ) );
					$("#score").html("Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower);
					
					if(lives < 1){
							
							exitReload = 1;
							slowMotion = false;
							lives = 0;
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

				for(var b = 0; b < BlackBox.length; b++){

					
					if (RandomShipFleet[i].x < BlackBox[b].x + (playerSize * 3)  && RandomShipFleet[i].x + (playerSize * 3)  > BlackBox[b].x &&
					 RandomShipFleet[i].y < BlackBox[b].y + (playerSize * 3) && RandomShipFleet[i].y + (playerSize * 3) > BlackBox[b].y) {

						 fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[b].x, BlackBox[b].y ) );
						 fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[b].x, BlackBox[b].y ) );
						 BlackBox[b].hp -= 1;
						 RandomShipFleet.splice(i, 1); //this will destroy the enemy

					 }

				}
				
			}

			//this will loop through the list of InfectedShip enemies
			for(var i = 0; i < InfectedFleet.length; i++){
				
				InfectedFleet[i].draw(); //this will draw the enemies as they are created
				InfectedFleet[i].movement();//this will activate the enemies movement


				// if(slowMoWatch == 30 && slowMotion == false){

				// 	if (x < InfectedFleet[i].x + (InfectedFleet[i].size  * 4)  && x + (InfectedFleet[i].size  * 4)  > InfectedFleet[i].x &&
				// 	y < InfectedFleet[i].y + (InfectedFleet[i].size  * 4) && y + (InfectedFleet[i].size  * 4) > InfectedFleet[i].y) {

				// 		slowMo();
						
				// 	}
				// }

				if(InfectedFleet[i].size >= (playerSize * 4)){

					bigLazer = jQuery.extend(true, {}, InfectedLazer);
					bigLazer.x = InfectedFleet[i].x + (InfectedFleet[i].size / 2);
					bigLazer.y = InfectedFleet[i].y + (InfectedFleet[i].size / 2);

					var launch = Math.floor((Math.random() * 70) + 1);

					if(launch == 35){

						LazerBattery.push(bigLazer);
					}
					

				}

				if(InfectedFleet[i].size >= (playerSize * 12)){
					
					InfectedFleet[i].size = (playerSize * 12);

				}

				for(var j = 0; j < RandomShipFleet.length; j++){

					//this is a colision with the randomly spawning ai guys
					if (RandomShipFleet[j].x < InfectedFleet[i].x + InfectedFleet[i].size  && RandomShipFleet[j].x + (InfectedFleet[i].size / (playerSize / 4))  > InfectedFleet[i].x &&
					RandomShipFleet[j].y < InfectedFleet[i].y + InfectedFleet[i].size && RandomShipFleet[j].y + (InfectedFleet[i].size / (playerSize / 4)) > InfectedFleet[i].y) {

						InfectedFleet[i].size += (playerSize / 2);
						//InfectedFleet[i].direction = Math.round(Math.random() * 7) + 1;
						InfectedFleet[i].hp += 2;
						RandomShipFleet.splice(j, 1);

					}

				}

				for(var j = 0; j < StalkerFleet.length; j++){

					//this is a colision with the randomly spawning ai guys
					if (StalkerFleet[j].x < InfectedFleet[i].x + InfectedFleet[i].size  && StalkerFleet[j].x + (InfectedFleet[i].size / (playerSize / 4))  > InfectedFleet[i].x &&
					StalkerFleet[j].y < InfectedFleet[i].y + InfectedFleet[i].size && StalkerFleet[j].y + (InfectedFleet[i].size / (playerSize / 4)) > InfectedFleet[i].y) {

						InfectedFleet[i].size += playerSize;
						//InfectedFleet[i].direction = Math.round(Math.random() * 7) + 1;
						InfectedFleet[i].hp += 3;
						StalkerFleet.splice(j, 1);

					}

				}

				for(var j = 0; j < HunterFleet.length; j++){

					//this is a colision with the randomly spawning ai guys
					if (HunterFleet[j].x < InfectedFleet[i].x + InfectedFleet[i].size  && HunterFleet[j].x + (InfectedFleet[i].size / (playerSize / 4))  > InfectedFleet[i].x &&
					HunterFleet[j].y < InfectedFleet[i].y + InfectedFleet[i].size && HunterFleet[j].y + (InfectedFleet[i].size / (playerSize / 4)) > InfectedFleet[i].y) {

						InfectedFleet[i].size += (playerSize / 2);
						//InfectedFleet[i].direction = Math.round(Math.random() * 7) + 1;
						InfectedFleet[i].hp += 3;
						HunterFleet.splice(j, 1);

					}

				}

				for(var j = 0; j < BHEnemys.length; j++){

					//this is a colision with the randomly spawning ai guys
					if (BHEnemys[j].x < InfectedFleet[i].x + InfectedFleet[i].size  && BHEnemys[j].x + (InfectedFleet[i].size / (playerSize / 4))  > InfectedFleet[i].x &&
					BHEnemys[j].y < InfectedFleet[i].y + InfectedFleet[i].size && BHEnemys[j].y + (InfectedFleet[i].size / (playerSize / 4)) > InfectedFleet[i].y) {

						InfectedFleet[i].size += playerSize;
						//InfectedFleet[i].direction = Math.round(Math.random() * 7) + 1;
						InfectedFleet[i].hp += 4;
						BHEnemys.splice(j, 1);

					}

				}

				for(var j = 0; j < InfectedFleet.length; j++){

					//this is a colision with the randomly spawning ai guys
					if (InfectedFleet[j].x < InfectedFleet[i].x + InfectedFleet[i].size  && InfectedFleet[j].x + (InfectedFleet[i].size / (playerSize / 4))  > InfectedFleet[i].x &&
					InfectedFleet[j].y < InfectedFleet[i].y + InfectedFleet[i].size && InfectedFleet[j].y + (InfectedFleet[i].size / (playerSize / 4)) > InfectedFleet[i].y) {

						if(InfectedFleet[i].size > InfectedFleet[j].size){

							InfectedFleet[i].size += playerSize;
							//InfectedFleet[i].direction = Math.round(Math.random() * 7) + 1;
							InfectedFleet[i].hp += 4;
							InfectedFleet.splice(j, 1);

						}						

					}

				}

				for(var k = 0; k < BulletPowerPack.length; k++){

					//this is a colision with the randomly spawning ai guys
					if (BulletPowerPack[k].x < InfectedFleet[i].x + InfectedFleet[i].size  && BulletPowerPack[k].x + (InfectedFleet[i].size / (playerSize / 4))  > InfectedFleet[i].x &&
					BulletPowerPack[k].y < InfectedFleet[i].y + InfectedFleet[i].size && BulletPowerPack[k].y + (InfectedFleet[i].size / (playerSize / 4)) > InfectedFleet[i].y) {

							InfectedFleet[i].size += playerSize;
							//InfectedFleet[i].direction = Math.round(Math.random() * 7) + 1;
							InfectedFleet[i].hp += 4;
							BulletPowerPack.splice(k, 1);					

					}

				}

				for(var l = 0; l < LifePowerPack.length; l++){

					//this is a colision with the randomly spawning ai guys
					if (LifePowerPack[l].x < InfectedFleet[i].x + InfectedFleet[i].size  && LifePowerPack[l].x + (InfectedFleet[i].size / (playerSize / 4))  > InfectedFleet[i].x &&
					LifePowerPack[l].y < InfectedFleet[i].y + InfectedFleet[i].size && LifePowerPack[l].y + (InfectedFleet[i].size / (playerSize / 4)) > InfectedFleet[i].y) {

							InfectedFleet[i].size += playerSize;
							//InfectedFleet[i].direction = Math.round(Math.random() * 7) + 1;
							InfectedFleet[i].hp += 4;
							LifePowerPack.splice(l, 1);						

					}

				}

								
				//this is a colision with the randomly spawning ai guys
				if (x < InfectedFleet[i].x + InfectedFleet[i].size  && x + (InfectedFleet[i].size / (playerSize / 4))  > InfectedFleet[i].x &&
				y < InfectedFleet[i].y + InfectedFleet[i].size && y + (InfectedFleet[i].size / (playerSize / 4)) > InfectedFleet[i].y) {
					// The objects are touching
				
					velX *= friction - 2; //this will stop the player from moving
					velY *= friction - 2;
					
					if(InfectedFleet[i].size >= (playerSize * 5)){

						lives -= 6;

					}
					else{

						lives -= 1;
					} 
					
					slowMo();
					
					if(bulletPower > 0){
						
						bulletPower -= 1;
					}
					else{
						bulletPower = 0;
					}
					
					if(shootStickTouch == false){
						
						$("#shootStick").trigger('touchend');
					}
					else{
						$("#shootStick").trigger('touchend');
						$("#shootStick").trigger('touchstart');
					}
					
					fireworks.push( new Firework( canvas.width / 2, canvas.height, x, y ) );
					$("#score").html("Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower);
					
					if(lives < 1){
							
							exitReload = 1;
							slowMotion = false;
							lives = 0;
							$("#score").html("Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower);
						}
					
					InfectedFleet.splice(i, 1); //this will destroy the enemy on colision with the player
				}
				
				

				for(var b = 0; b < BlackBox.length; b++){

					
					if (InfectedFleet[i].x < BlackBox[b].x + ((InfectedFleet[i].size / 4) * 3)  && InfectedFleet[i].x + ((InfectedFleet[i].size / (playerSize / 4)) * 3)  > BlackBox[b].x &&
					 InfectedFleet[i].y < BlackBox[b].y + ((InfectedFleet[i].size / 4) * 3) && InfectedFleet[i].y + ((InfectedFleet[i].size / (playerSize / 4)) * 3) > BlackBox[b].y) {

						 fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[b].x, BlackBox[b].y ) );
						 fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[b].x, BlackBox[b].y ) );
						 BlackBox[b].hp -= 1;

						 if(InfectedFleet[i].size > (playerSize * 5)){

							BlackBox[b].hp -= 15;

						}
						else{

							BlackBox[b].hp -= 10;
						} 

						 InfectedFleet.splice(i, 1); //this will destroy the enemy

					 }

				}
				
			}
			
			//this will loop through the list of Hunter enemies
			for(var i = 0; i < HunterFleet.length; i++){
				
				HunterFleet[i].draw(); //this will draw the enemies as they are created
				HunterFleet[i].movement();//this will activate the enemies movement

				if(slowMoWatch == 30 && slowMotion == false){

					if (x < HunterFleet[i].x + (playerSize * 4)  && x + (playerSize * 4)  > HunterFleet[i].x &&
					y < HunterFleet[i].y + (playerSize * 4) && y + (playerSize * 4) > HunterFleet[i].y) {

						slowMo();
					}
				}
								
				//this is a colision with the randomly spawning ai guys
				if (x < HunterFleet[i].x + playerSize  && x + playerSize  > HunterFleet[i].x &&
				y < HunterFleet[i].y + playerSize && y + playerSize > HunterFleet[i].y) {
					// The objects are touching
				
					velX *= friction - 2; //this will stop the player from moving
					velY *= friction - 2;
					lives -= 1;
					slowMo();
					
					if(bulletPower > 0){
						
						bulletPower -= 1;
					}
					else{
						bulletPower = 0;
					}
					
					if(shootStickTouch == false){
						
						$("#shootStick").trigger('touchend');
					}
					else{
						$("#shootStick").trigger('touchend');
						$("#shootStick").trigger('touchstart');
					}
					
					
					//$("#shootStick").trigger('touchend');
					//$("#shootStick").trigger('touchstart');
					
					fireworks.push( new Firework( canvas.width / 2, canvas.height, x, y ) );
					$("#score").html("Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower);
					
					if(lives < 1){
							
							exitReload = 1;
							lives = 0;
							slowMotion = false;
							$("#score").html("Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower);
						}
					
					HunterFleet.splice(i, 1); //this will destroy the enemy on colision with the player
				}

				for(var b = 0; b < BlackBox.length; b++){

					
					if (HunterFleet[i].x < BlackBox[b].x + (playerSize * 3)  && HunterFleet[i].x + (playerSize * 3)  > BlackBox[b].x &&
					 HunterFleet[i].y < BlackBox[b].y + (playerSize * 3) && HunterFleet[i].y + (playerSize * 3) > BlackBox[b].y) {

						 fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[b].x, BlackBox[b].y ) );
						 fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[b].x, BlackBox[b].y ) );
						 BlackBox[b].hp -= 1;
						 HunterFleet.splice(i, 1); //this will destroy the enemy on colision with the player

					 }

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

			//this will loop through the list of Hunter enemies
			for(var i = 0; i < LazerBattery.length; i++){
				
				LazerBattery[i].draw(); //this will draw the enemies as they are created
				LazerBattery[i].movement();//this will activate the enemies movement
				LazerBattery[i].brightness = Math.floor((Math.random() * 100) + 1);	

				if(slowMoWatch == 30 && slowMotion == false){

					if (x < LazerBattery[i].x + (playerSize * 4)  && x + (playerSize * 4)  > LazerBattery[i].x &&
					y < LazerBattery[i].y + (playerSize * 4) && y + (playerSize * 4) > LazerBattery[i].y) {

						slowMo();
					}
				}
								
				//this is a colision with the randomly spawning ai guys
				if (x < LazerBattery[i].x + playerSize  && x + playerSize  > LazerBattery[i].x &&
				y < LazerBattery[i].y + playerSize && y + playerSize > LazerBattery[i].y) {
					// The objects are touching
				
					velX *= friction - 2; //this will stop the player from moving
					velY *= friction - 2;
					lives -= 2;
					slowMo();
					
					if(bulletPower > 0){
						
						bulletPower -= 1;
					}
					else{
						bulletPower = 0;
					}
					
					if(shootStickTouch == false){
						
						$("#shootStick").trigger('touchend');
					}
					else{
						$("#shootStick").trigger('touchend');
						$("#shootStick").trigger('touchstart');
					}
					
					
					//$("#shootStick").trigger('touchend');
					//$("#shootStick").trigger('touchstart');
					
					fireworks.push( new Firework( canvas.width / 2, canvas.height, x, y ) );
					$("#score").html("Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower);
					
					if(lives < 1){
							
							exitReload = 1;
							lives = 0;
							slowMotion = false;
							$("#score").html("Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower);
						}
					
					LazerBattery.splice(i, 1); //this will destroy the enemy on colision with the player
				}

				for(var b = 0; b < BlackBox.length; b++){

					
					if (LazerBattery[i].x < BlackBox[b].x + (playerSize * 3)  && LazerBattery[i].x + (playerSize * 3)  > BlackBox[b].x &&
					 LazerBattery[i].y < BlackBox[b].y + (playerSize * 3) && LazerBattery[i].y + (playerSize * 3) > BlackBox[b].y) {

						 fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[b].x, BlackBox[b].y ) );
						 fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[b].x, BlackBox[b].y ) );
						 BlackBox[b].hp -= 2;
						 LazerBattery.splice(i, 1); //this will destroy the enemy on colision with the player

					 }

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


				if(slowMoWatch == 30 && slowMotion == false){

					if (x < StalkerFleet[i].x + (playerSize * 4)  && x + (playerSize * 4)  > StalkerFleet[i].x &&
					y < StalkerFleet[i].y + (playerSize * 4) && y + (playerSize * 4) > StalkerFleet[i].y) {

						slowMo();
					}
				}

								
				//this is a colision with the randomly spawning ai guys
				if (x < StalkerFleet[i].x + playerSize  && x + playerSize  > StalkerFleet[i].x &&
				y < StalkerFleet[i].y + playerSize && y + playerSize > StalkerFleet[i].y) {
					// The objects are touching
				
					velX *= friction - 2; //this will stop the player from moving
					velY *= friction - 2;					
					lives -= 1;
					slowMo();
					
					
					if(bulletPower > 0){
						
						bulletPower -= 1;
					}
					else{
						bulletPower = 0;
					}
					
					if(shootStickTouch == false){
						
						$("#shootStick").trigger('touchend');
					}
					else{
						$("#shootStick").trigger('touchend');
						$("#shootStick").trigger('touchstart');
					}
					
					//$("#shootStick").trigger('touchend');
					//$("#shootStick").trigger('touchstart');
					
					fireworks.push( new Firework( canvas.width / 2, canvas.height, x, y ) );
					$("#score").html("Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower);
					
					if(lives < 1){
							
							exitReload = 1;
							slowMotion = false;
							lives = 0;
							$("#score").html("Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower);
						}
					
					StalkerFleet.splice(i, 1); //this will destroy the enemy on colision with the player
				}

				for(var b = 0; b < BlackBox.length; b++){

					
					if (StalkerFleet[i].x < BlackBox[b].x + (playerSize * 3)  && StalkerFleet[i].x + (playerSize * 3)  > BlackBox[b].x &&
					 StalkerFleet[i].y < BlackBox[b].y + (playerSize * 3) && StalkerFleet[i].y + (playerSize * 3) > BlackBox[b].y) {

						 fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[b].x, BlackBox[b].y ) );
						 fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[b].x, BlackBox[b].y ) );
						 BlackBox[b].hp -= 1;
						 StalkerFleet.splice(i, 1); //this will destroy the enemy on colision with the player

					 }

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

			for(var i = 0; i < BHEnemys.length; i++){

				BHEnemys[i].draw();
				BHEnemys[i].hue = Math.floor((Math.random() * 120) + 1);
				BHEnemys[i].shade = Math.floor((Math.random() * 100) + 1);
				BHEnemys[i].brightness = Math.floor((Math.random() * 100) + 1);	
				BHEnemys[i].movement();//this will activate the enemies movement
				


				if(slowMoWatch == 30 && slowMotion == false){

					if (x < BHEnemys[i].x + (playerSize * 4)  && x + (playerSize * 4)  > BHEnemys[i].x &&
					y < BHEnemys[i].y + (playerSize * 4) && y + (playerSize * 4) > BHEnemys[i].y) {

						slowMo();
						
					}
				}
								
				//this is a colision with the randomly spawning ai guys
				if (x < BHEnemys[i].x + playerSize  && x + playerSize  > BHEnemys[i].x &&
				y < BHEnemys[i].y + playerSize && y + playerSize > BHEnemys[i].y) {
					// The objects are touching
				
					velX *= friction - 2; //this will stop the player from moving
					velY *= friction - 2;
					
					lives -= 1;
					slowMo();
					
					if(bulletPower > 0){
						
						bulletPower -= 1;
					}
					else{
						bulletPower = 0;
					}
					
					if(shootStickTouch == false){
						
						$("#shootStick").trigger('touchend');
					}
					else{
						$("#shootStick").trigger('touchend');
						$("#shootStick").trigger('touchstart');
					}
					
					fireworks.push( new Firework( canvas.width / 2, canvas.height, x, y ) );
					$("#score").html("Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower);
					
					if(lives < 1){
							
							exitReload = 1;
							lives = 0;
							slowMotion = false;
							$("#score").html("Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower);
						}
					
					BHEnemys.splice(i, 1); //this will destroy the enemy on colision with the player
				}
				
				if (BHEnemys[i].x > canvas.width - playerSize + 1) { // colision with game boarders x-axis playerSize is about 19.43999
				
					BHEnemys.splice(i, 1);
            	} else if (BHEnemys[i].x < playerSize - 1) {
				
					BHEnemys.splice(i, 1);
            	}
			
				if (BHEnemys[i].y > canvas.height - playerSize + 1) { // colision with game boarders y-axis playerSize is about 19.43999
				
					BHEnemys.splice(i, 1);
            	} else if (BHEnemys[i].y < playerSize - 1) {
				
					BHEnemys.splice(i, 1);
            	}

				for(var b = 0; b < BlackBox.length; b++){

					
					if (BHEnemys[i].x < BlackBox[b].x + (playerSize * 3)  && BHEnemys[i].x + (playerSize * 3)  > BlackBox[b].x &&
					 BHEnemys[i].y < BlackBox[b].y + (playerSize * 3) && BHEnemys[i].y + (playerSize * 3) > BlackBox[b].y) {

						 fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[b].x, BlackBox[b].y ) );
						 fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[b].x, BlackBox[b].y ) );
						 BlackBox[b].hp -= 1;
						 BHEnemys.splice(i, 1); //this will destroy the enemy

					 }

				}



			}

			//this will loop through the list of black holes
			for(var i = 0; i < BlackBox.length; i++){
				
				BlackBox[i].draw(); //this will draw the life black holes as they are created
				BlackBox[i].hue = Math.floor((Math.random() * 120) + 1);
				BlackBox[i].shade = Math.floor((Math.random() * 100) + 1);
				BlackBox[i].brightness = Math.floor((Math.random() * 100) + 1);																								

				if(BlackBox[i].hp < 7){

					var size = Math.floor(Math.random() * 2) + 1;

					if(size == 1){
						
						BlackBox[i].size = playerSize * 2;

					}
					else if(size == 2){

						BlackBox[i].size = playerSize * 3;
					}

				}
				if(BlackBox[i].hp <= 2){

					var size = Math.floor(Math.random() * 4) + 1;
					
					if(size == 1){
						
						BlackBox[i].size = playerSize;
						fireworks.push( new WCFirework( canvas.width / 2, canvas.height, BlackBox[i].x, BlackBox[i].y ) );

					}
					else if(size == 2){
						
						BlackBox[i].size = playerSize * 2;

					}
					else if(size == 3){
						
						BlackBox[i].size = playerSize * 3;

					}
					else if(size == 4){

						BlackBox[i].size = playerSize * 4;
					}

				}
								
				//this is a colision with the player and the black hole
				if (x < BlackBox[i].x + (playerSize * 2)  && x + (playerSize * 2)  > BlackBox[i].x &&
				y < BlackBox[i].y + (playerSize * 2) && y + (playerSize * 2) > BlackBox[i].y) {
					// The objects are touching
				
					lives -= 2;

					fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[i].x, BlackBox[i].y ) );
					fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[i].x, BlackBox[i].y ) );
					
					$("#score").html("Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower);
					
					if(lives < 1){
							
							exitReload = 1;
							slowMotion = false;
							lives = 0;
							$("#score").html("Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower);
						}
					
					BlackBox.splice(i, 1); //this will destroy the enemy on colision with the player
				}


			//when the player is flying close to the black hole

			if (x < BlackBox[i].x + (playerSize * 17)  && x + (playerSize * 17)  > BlackBox[i].x &&
			y < BlackBox[i].y + (playerSize * 17) && y + (playerSize * 17) > BlackBox[i].y) {

				//this will make make the player move towards the black hole

				  if(x < BlackBox[i].x && y < BlackBox[i].y){
					 
					 //this.x += 1;
					 //this.y += 1;

					if(slowMotion == true){

						x += (canvas.width) * 0.0010;
					 	y += (canvas.height) * 0.0010;
					 }
					 else if(slowMotion == false){

						x += (canvas.width) * 0.0020;
					 	y += (canvas.height) * 0.0020;
					 } 
					 
				 }
				 if(x > BlackBox[i].x && y > BlackBox[i].y){
					 
					 //this.x -= 1;
					 //this.y -= 1;

					if(slowMotion == true){

						x -= (canvas.width) * 0.0010;
					 	y -= (canvas.height) * 0.0010;
					 }
					 else if(slowMotion == false){

						x -= (canvas.width) * 0.0020;
					 	y -= (canvas.height) * 0.0020;
					 } 

					 
				 }
				 if(x > BlackBox[i].x && y < BlackBox[i].y){
					 
					 //this.x -= 1;
					 //this.y += 1;

					if(slowMotion == true){

						x -= (canvas.width) * 0.0010;
					 	y += (canvas.height) * 0.0010;
					 }
					 else if(slowMotion == false){

						x -= (canvas.width) * 0.0020;
					 	y += (canvas.height) * 0.0020;
					 } 

					 
				 }
				 if(x > BlackBox[i].x && y < BlackBox[i].y){
					 
					 //this.x -= 1;
					 //this.y += 1;

					 if(slowMotion == true){

						x += (canvas.width) * 0.0010;
					 	y -= (canvas.height) * 0.0010;
					 }
					 else if(slowMotion == false){

						x += (canvas.width) * 0.0020;
					 	y -= (canvas.height) * 0.0020;
					 } 

					 
				 }
				 if(x < BlackBox[i].x){
					 
					 //this.x += 1.1;

					if(slowMotion == true){

						x += (canvas.width) * 0.0010;
					 }
					 else if(slowMotion == false){

						x += (canvas.width) * 0.0020;
					 } 

					 
				 }
				 if(y > BlackBox[i].y){
					 
					 //this.y -= 1.1;

					if(slowMotion == true){

						y -= (canvas.height) * 0.0010;
					 }
					 else if(slowMotion == false){

						y -= (canvas.height) * 0.0020;
					 } 

					 
				 }
				 if(x > BlackBox[i].x){
					 
					 //this.x -= 1.1;

					if(slowMotion == true){

						x -= (canvas.width) * 0.0010;
					 }
					 else if(slowMotion == false){

						x -= (canvas.width) * 0.0020;
					 } 

					 
				 }
				 if(y < BlackBox[i].y){
					 
					 //this.y += 1.1;

					 if(slowMotion == true){

						y += (canvas.height) * 0.0010;
					 }
					 else if(slowMotion == false){

						y += (canvas.height) * 0.0020;
					 } 

					 
				 }


				}

				 if(BlackBox[i].hp < 1){

					slowMo();
					var superNova = 4;
					//superNova == true;
					BlackBox[i].size = playerSize * 4;
					BlackBox[i].hp = 0;
					//BlackBox.splice(i, 1);
					//clearTimeout(collapse);

					//black hole collapse animation
						if(superNova == 4){

							BlackBox[i].size = playerSize * 4;
							superNova = 3;

								if(superNova == 3){

									BlackBox[i].size = playerSize * 3;
									superNova = 2;									

										if(superNova == 2){

											BlackBox[i].size = playerSize * 2;
											superNova = 1;
											
												
												if(superNova == 1){

													//BlackBox[i].size = playerSize * 4;
													BlackBox[i].size = playerSize;
													
													

													for(var k = 0; k <= 14; k++){

														Enemy5 = jQuery.extend(true, {}, BHjectile);
														Enemy5.x = BlackBox[i].x;
														Enemy5.y = BlackBox[i].y;
														Enemy5.direction = Math.round(Math.random() * 7)
														BHEnemys.push(Enemy5);

													}

													BlackBox.splice(i, 1);

													// setTimeout(function() {

														
													// 	BlackBox.splice(i, 1);

													// }, 700);
													
													
													
												}

										}

								}

						}					

				}
				//end of animation

			}
			
			//draws the bullets and makes them move
			for(var j = 0; j < bulletClip.length; j++){
					
					bulletClip[j].draw();
					bulletClip[j].movement();					
					
				if (bulletClip[j].x > canvas.width - playerSize) { // colision with game boarders x-axis playerSize is about 19.43999
					
					fireworks.push( new WCFirework( canvas.width / 2, canvas.height, bulletClip[j].x, bulletClip[j].y ) );
					bulletClip.splice(j, 1);
				} else if (bulletClip[j].x < playerSize) {
					
					fireworks.push( new WCFirework( canvas.width / 2, canvas.height, bulletClip[j].x, bulletClip[j].y ) );
					bulletClip.splice(j, 1);
				}
				
				else if (bulletClip[j].y > canvas.height - playerSize) { // colision with game boarders y-axis playerSize is about 19.43999
					
					fireworks.push( new WCFirework( canvas.width / 2, canvas.height, bulletClip[j].x, bulletClip[j].y ) );
					bulletClip.splice(j, 1);
				} else if (bulletClip[j].y < playerSize) {
					
					fireworks.push( new WCFirework( canvas.width / 2, canvas.height, bulletClip[j].x, bulletClip[j].y ) );
					bulletClip.splice(j, 1);
				}
					
			}
									
			//this is what detects colisions for bullets and RandomShip enemys
			for(var j = 0; j < bulletClip.length; j++){
			
				//bulletClip[j].draw(); // this will add a cool blur to the bullet
			
				for(var i = 0; i < RandomShipFleet.length; i++){
					
					//RandomShipFleet[i].draw(); //this will add a cool blur to the enemys
				
					if (bulletClip[j].x < RandomShipFleet[i].x + (bulletSize * 3)  && bulletClip[j].x + (bulletSize * 3)  > RandomShipFleet[i].x &&
					bulletClip[j].y < RandomShipFleet[i].y + (bulletSize * 3) && bulletClip[j].y + (bulletSize * 3) > RandomShipFleet[i].y) {
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

			//this is what detects colisions for bullets and RandomShip enemys
			for(var j = 0; j < bulletClip.length; j++){
			
				//bulletClip[j].draw(); // this will add a cool blur to the bullet
			
				for(var i = 0; i < InfectedFleet.length; i++){
					
					//RandomShipFleet[i].draw(); //this will add a cool blur to the enemys
				
					if (bulletClip[j].x < InfectedFleet[i].x + (InfectedFleet[i].size)  && bulletClip[j].x + (InfectedFleet[i].size / (playerSize / 4))  > InfectedFleet[i].x &&
					bulletClip[j].y < InfectedFleet[i].y + (InfectedFleet[i].size) && bulletClip[j].y + (InfectedFleet[i].size / (playerSize / 4)) > InfectedFleet[i].y) {
						// The objects are touching
						
						score += 1;
						InfectedFleet[i].hp -= 1;
						//loop();
						fireworks.push( new Firework( canvas.width / 2, canvas.height, (InfectedFleet[i].x + (InfectedFleet[i].size / 2) ), (InfectedFleet[i].y + (InfectedFleet[i].size / 2) ) ));

						timerTick = 0;
						$("#score").html("Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower);

						if(InfectedFleet[i].hp < 1){

							InfectedFleet[i].size = playerSize;
							fireworks.push( new Firework( canvas.width / 2, canvas.height, InfectedFleet[i].x, InfectedFleet[i].y ) );
							fireworks.push( new Firework( canvas.width / 2, canvas.height, InfectedFleet[i].x, InfectedFleet[i].y ) );
							InfectedFleet.splice(i, 1); //this will destroy the enemy on colision with the bullet

						}

						//InfectedFleet.splice(i, 1); //this will destroy the enemy on colision with the bullet
						bulletClip.splice(j, 1);
						
					 }
				}
			
			}

			//this is what detects colisions for bullets and BHEnemys enemys
			for(var j = 0; j < bulletClip.length; j++){
			
				//bulletClip[j].draw(); // this will add a cool blur to the bullet
			
				for(var i = 0; i < BHEnemys.length; i++){
					
					//RandomShipFleet[i].draw(); //this will add a cool blur to the enemys
				
					if (bulletClip[j].x < BHEnemys[i].x + (bulletSize * 3)  && bulletClip[j].x + (bulletSize * 3)  > BHEnemys[i].x &&
					bulletClip[j].y < BHEnemys[i].y + (bulletSize * 3) && bulletClip[j].y + (bulletSize * 3) > BHEnemys[i].y) {
						// The objects are touching
						
						score += 1;
						//loop();
						fireworks.push( new Firework( canvas.width / 2, canvas.height, BHEnemys[i].x, BHEnemys[i].y ) );

						timerTick = 0;
						$("#score").html("Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower);
				
						BHEnemys.splice(i, 1); //this will destroy the enemy on colision with the bullet
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
					bulletClip[j].y < HunterFleet[i].y + (bulletSize * 3) && bulletClip[j].y + (bulletSize * 3) > HunterFleet[i].y) {
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

			//this is what detects colisions for bullets and Big Lazer enemys
			for(var j = 0; j < bulletClip.length; j++){
			
				//bulletClip[j].draw(); // this will add a cool blur to the bullet
			
				for(var i = 0; i < LazerBattery.length; i++){
					
					//RandomShipFleet[i].draw(); //this will add a cool blur to the enemys
				
					if (bulletClip[j].x < LazerBattery[i].x + (bulletSize * 3)  && bulletClip[j].x + (bulletSize * 3)  > LazerBattery[i].x &&
					bulletClip[j].y < LazerBattery[i].y + (bulletSize * 3) && bulletClip[j].y + (bulletSize * 3) > LazerBattery[i].y) {
						// The objects are touching
						
						score += 2;
						//loop();
						fireworks.push( new Firework( canvas.width / 2, canvas.height, LazerBattery[i].x, LazerBattery[i].y ) );
						timerTick = 0;
						$("#score").html("Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower);
				
						LazerBattery.splice(i, 1); //this will destroy the enemy on colision with the bullet
						bulletClip.splice(j, 1);
						
					 }
				}
			
			}
			
			//this is what detects colisions for bullets and Stalker enemys
			for(var j = 0; j < bulletClip.length; j++){
			
				//bulletClip[j].draw(); // this will add a cool blur to the bullet
			
				for(var i = 0; i < StalkerFleet.length; i++){
					
					//RandomShipFleet[i].draw(); //this will add a cool blur to the enemys
				
					if (bulletClip[j].x < StalkerFleet[i].x + (bulletSize * 3)  && bulletClip[j].x + (bulletSize * 3)  > StalkerFleet[i].x &&
					bulletClip[j].y < StalkerFleet[i].y + (bulletSize * 3) && bulletClip[j].y + (bulletSize * 3) > StalkerFleet[i].y) {
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

			//this is what detects colisions for bullets and RandomShip enemys
			for(var j = 0; j < bulletClip.length; j++){
			
				//bulletClip[j].draw(); // this will add a cool blur to the bullet
			
				for(var i = 0; i < BlackBox.length; i++){
					
					//RandomShipFleet[i].draw(); //this will add a cool blur to the enemys
				
					if (bulletClip[j].x < BlackBox[i].x + (bulletSize * 7)  && bulletClip[j].x + (bulletSize * 7)  > BlackBox[i].x &&
					bulletClip[j].y < BlackBox[i].y + (bulletSize * 7) && bulletClip[j].y + (bulletSize * 7) > BlackBox[i].y) {
						// The objects are touching
						
						BlackBox[i].hp -= 1;
						score += 1;
						//loop();
						fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[i].x, BlackBox[i].y ) );
						fireworks.push( new Firework( canvas.width / 2, canvas.height, BlackBox[i].x, BlackBox[i].y ) );

						timerTick = 0;
						$("#score").html("Score: " + score + " | Health: " + lives  + " | Bullet Power: " + bulletPower);

						bulletClip.splice(j, 1);

						//BlackBox[i].size = playerSize * 3;
						//clearTimeout(jump);

						// var jump = setTimeout(function() {
							
						// 	BlackBox[i].size = playerSize * 2;
						// 	//clearTimeout(jump);

						// }, 100);
						BlackBox[i].size = playerSize;
						BlackBox[i].size = playerSize * 2;

					 }
				}
			
			}
			
			
			//this will loop through the list of lives power ups
			for(var i = 0; i < LifePowerPack.length; i++){
				
				LifePowerPack[i].draw(); //this will draw the life power up as they are created
								
				//this is a colision with the player and the power up
				if (x < LifePowerPack[i].x + (playerSize * 2)  && x + (playerSize * 2)  > LifePowerPack[i].x &&
				y < LifePowerPack[i].y + (playerSize * 2) && y + (playerSize * 2) > LifePowerPack[i].y) {
					// The objects are touching
				
					//velX *= friction - 2; //this will stop the player from moving
					//velY *= friction - 2;
					lives += 1;//(Math.round( 0.5 * 10 ) / 10);
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
				if (x < BulletPowerPack[i].x + (playerSize * 2)  && x + (playerSize * 2)  > BulletPowerPack[i].x &&
				y < BulletPowerPack[i].y + (playerSize * 2) && y + (playerSize * 2) > BulletPowerPack[i].y) {
					// The objects are touching
				
					//velX *= friction - 2; //this will stop the player from moving
					//velY *= friction - 2;
					bulletPower += 2;
					score += 10;
					if(shootStickTouch == false){
						
						$("#shootStick").trigger('touchend');
					}
					else{
						$("#shootStick").trigger('touchend');
						$("#shootStick").trigger('touchstart');
					}
					
					//console.log(shootStickTouch);
					
					
					//clearInterval(bulletLoop);
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
				
				//$("#pDiv").css("margin-top", "90%");
				x = canvas.width * 0.50;
				y = canvas.height * 0.50;
				menu = true;
				//$("#restartBtn").closest('.ui-btn').show();
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
	  
	  function BulletsFire(){
			
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
			
		}

		function slowMo(){

			
			slowMotion = true;

				setTimeout(function() {

					slowBrightness += 10; //value: 70
					//console.log(slowBrightness);


				}, 500);

				setTimeout(function() {
						
					slowBrightness += 10; //value: 80
					//console.log(slowBrightness);

				}, 1000);

				setTimeout(function() {
				
					slowBrightness += 10; //value: 90
					//console.log(slowBrightness);

				}, 1500);

				setTimeout(function() {
						
					slowBrightness -= 10; // value: 80;
					//console.log(slowBrightness);

				}, 2000);
				setTimeout(function() {
						
					slowBrightness -= 10; //value: 70
					//console.log(slowBrightness);

				}, 2500);
				setTimeout(function() {
						
					slowBrightness -= 10; //value: 60
					//console.log(slowBrightness);

				}, 3000);
				setTimeout(function() {
					
					slowBrightness -= 10; //value: 50
					//console.log(slowBrightness);

				}, 3500);
				setTimeout(function() {

					slowBrightness -= 10; //value: 40;
					//console.log(slowBrightness);

				}, 4000);
				setTimeout(function() {
						
					slowBrightness -= 10; //value: 30
					//console.log(slowBrightness);

				}, 4500);
				setTimeout(function() {

					slowBrightness += 10; //value: 40
					//console.log(slowBrightness);

				}, 5000);
				setTimeout(function() {

					slowBrightness += 10; //value: 50
					//console.log(slowBrightness);

				}, 5500);

				slowMoDelay = setTimeout(function() {
				
					slowMotion = false;

				}, 6000);

				
				//console.log(slowBrightness);		
			
		}

		function slowMoGenerator(){

			setInterval(function(){

				slowMoWatch = Math.round(Math.random() * 60);
				//console.log(slowMoWatch);

			}, 30);

		}
		slowMoGenerator();
		
		
        
		
       
		
			
		
		
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

// create firework
function WCFirework( sx, sy, tx, ty ) {
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
	this.targetRadius = 10; //1
}

// create firework
function TitleFirework( sx, sy, tx, ty ) {
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
	this.targetRadius = 45; //1
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

// update firework
TitleFirework.prototype.update = function( index ) {
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
		createTitleParticles( this.tx, this.ty );
		// remove the firework, use the index passed into the update function to determine which to remove
		fireworks.splice( index, 1 );
	} else {
		// target not reached, keep traveling
		this.x += vx;
		this.y += vy;
	}
}

// update firework
WCFirework.prototype.update = function( index ) {
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
		createWCParticles( this.tx, this.ty );
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

// draw firework
WCFirework.prototype.draw = function() {
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

// draw firework
TitleFirework.prototype.draw = function() {
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

// create particle group/explosion
function createWCParticles( x, y ) {
	// increase the particle count for a bigger explosion, beware of the canvas performance hit with the increased particles though
	var particleCount = 3;//125
	while( particleCount-- ) {
		particles.push( new Particle( x, y ) );
	}
}

// create particle group/explosion
function createTitleParticles( x, y ) {
	// increase the particle count for a bigger explosion, beware of the canvas performance hit with the increased particles though
	var particleCount = 10;//7
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
			fireworks.push( new TitleFirework( canvas.width / 2, canvas.height, random( 0, canvas.width ), random( 0, canvas.height / 2 ) ) );
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
	