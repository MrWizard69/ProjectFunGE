$(document).ready(function () {
	
	// Obtain a reference to the canvas element
	// using its id.
	
    var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");
	
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
	var Xpercent = 0;
	var YPercant = 0;
	
	var x = 0;
	var y = 0;
	
	var playArea = 0;
	
	//var entities = [];
	var RandomShipFleet = [];
	var HunterFleet = [];
	var StalkerFleet = [];
	
	var score = 0;
	
	var bulletClip = [];
	//var numOfEnemyShips = 4;
	
	var bullet = new Object();
	
	var Enemy1 = new Object();
	var Enemy2 = new Object();
	var Enemy3 = new Object();
	
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
	
	$("#dwnload").click(function(){
		
		addtohome.show();
		
	});
	
	
	
	//when the game is quit, the screen goes back to normal and the page is reloaded or a message appears
	$("#RG").click(function(){
		
		
		
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
			
			console.log("shoot stick");	
			
		var bulletLoop = setInterval(function(){
					
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
				
		}, 250);
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
					
			RandomShipFleet.push(Enemy1);
			//$("#result").html(entities.length);
			//console.log(entities);
		}, 3000);
		
		setInterval(function(){
					
		    Enemy2 = jQuery.extend(true, {}, Hunter);
			Enemy2.x = Math.round(Math.random() * (canvas.width * .90));
			Enemy2.y = Math.round(Math.random() * (canvas.height * .90));
					
			HunterFleet.push(Enemy2);
			//console.log(entities);
		}, 5000);	
		
		setInterval(function(){
					
		    Enemy3 = jQuery.extend(true, {}, Stalker);
			Enemy3.x = Math.round(Math.random() * (canvas.width * .90));
			Enemy3.y = Math.round(Math.random() * (canvas.height * .90));
					
			StalkerFleet.push(Enemy3);
			//console.log(entities);
		}, 7000);	
		
		$("#play").closest('.ui-btn').css("margin-top", "90%");
		$("h2").hide();
		$("#score").show();

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
		
		var bulletSizeW = canvas.width * .003;
		var bulletSizeH = canvas.width * .003;
		
		playerSize = (playersSizeW + playerSizeH); //playerSize is about 19.43999 px
		bulletSize = (bulletSizeW + bulletSizeH);
		
		
		//when the screen size changes, the player will be redirected to the center of the screen
		playerPositionX = canvas.width * .50;
		playerPositionY = canvas.height * .50;
		
		//this will update the players position if the screen size changes
		x = playerPositionX;
        y = playerPositionY;
		
		
		
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
		
		// if(canvas.width <= 428){		
			
		// 	joyStickX = (window.innerWidth) * .68;
		// 	joyStickY = (window.innerHeight) * .30;
			
		// }
		
		if(canvas.width >= 241){
			
			joyStickX = (window.innerWidth) * .89;
			joyStickY = (window.innerHeight) * .60;	
			
			shootStickX = (window.innerWidth) * .05;
			shootStickY = (window.innerHeight) * 0.75;
			
			//$("#play").closest('.ui-btn').show();
			
		}
		
		if(canvas.width <= 300){
			
			$("#play").closest('.ui-btn').hide();
			$("#dwnload").closest('.ui-btn').show();
			$("#rotWar").show();
			
		}
		
		 else if(canvas.width >= 399){
			
		 	$("#play").closest('.ui-btn').show();
			 $("#dwnload").closest('.ui-btn').hide();
			 $("#rotWar").hide();
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
            speed = 2,
            friction = 0.5, //0.98
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
                    velY -= 1;
					//$("#result").html("X: " + x + " Y: " + y);
                }
            }

            if (keys[40]) {
                if (velY < speed) {
                    velY += 1;
					//$("#result").html("X: " + x + " Y: " + y);
                }
            }
            if (keys[39]) {
                if (velX < speed) {
                    velX += 1;
					//$("#result").html("X: " + x + " Y: " + y);
                }
            }
            if (keys[37]) {
                if (velX > -speed) {
                    velX -= 1;
					//$("#result").html("X: " + x + " Y: " + y);
                }
            }
			
			
			//-----------------player movement with keyboard end --------------------------------------------//
			
			//-----------------player movement with VirtualJoyStick.js Thank You!-------------------------------//
			
		if(joyTouch == true){
			
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
						
							velX -= 3;
							velY -= 3;
						
					}
					else if(joyDirX == "left" && joyDirY == "down" ){
						
							velY += 3;
							velX -= 3;
						
					}
					else if(joyDirY == "up" && joyDirX == "right"){
						
							velY -= 3;
							velX += 3;
						
					}
					else if(joyDirY == "down" && joyDirX == "right"){
						
							velY += 3;
							velX += 3;
						
					}
					else if(joyDirX == "left"){
						
							velX -= 3;
						
					}
					else if(joyDirX == "right"){
						
							velX += 3;
						
					}
					else if(joyDirY == "up"){
						
							velY -= 3;
						
					}
					else if(joyDirY == "down"){
						
							velY += 3;
						
					}
			
			}
			
			
			//------------------This is how the left joystick shoots ---------------------//
		if(shootStickTouch == true){
			
			
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
			
            ctx.beginPath(); //this is the player
            ctx.fillStyle = "#A23BEC";
            ctx.arc(x, y, playerSize, 0, Math.PI * 2); // draw the player playerSize is about 19.43999
            ctx.fill();
            ctx.closePath();
			
						
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
				 
				 
			 }
			  
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
		
		function draw() {									
				 						
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
					
					bulletClip.splice(j, 1);
				} else if (bulletClip[j].x < playerSize) {
					
					bulletClip.splice(j, 1);
				}
				
				if (bulletClip[j].y > canvas.height - playerSize) { // colision with game boarders y-axis playerSize is about 19.43999
					
					bulletClip.splice(j, 1);
				} else if (bulletClip[j].y < playerSize) {
					
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
						$("#score").html("Score: " + score);
				
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
						$("#score").html("Score: " + score);
				
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
						$("#score").html("Score: " + score);
				
						StalkerFleet.splice(i, 1); //this will destroy the enemy on colision with the bullet
						bulletClip.splice(j, 1);
					 }
				}
			
			}				
			 
			//console.log(entities);  
		}
		
		
        update();// sets the main loop into motion
		
        document.body.addEventListener("keydown", function (e) { // these make the keyboard do
            keys[e.keyCode] = true;
        });
        document.body.addEventListener("keyup", function (e) {
            keys[e.keyCode] = false;
        });
		
		
		
    });