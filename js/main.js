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
			
	
	var playerSize = 0;
	
	var playerPositionX = 0;
	var playerPositionY = 0;
	var Xpercent = 0;
	var YPercant = 0;
	
	var x = 0;
	var y = 0;
	
	var playArea = 0;
	
	var entities = [];
	var numOfEnemyShips = 4;
	
	var Enemy1 = new Object();
	var Enemy2 = new Object();
	var Enemy3 = new Object();
	
	var joyStickX = 0;
	var joyStickY = 0;
	var joyDirX = "";
	var joyDirY = "";
	var joyTouch = false;
	
	var addtohome = addToHomescreen({
		maxDisplayCount: 0,
    	autostart: false,
		startDelay: .5,
		displayPace: .1
	});
	
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
		else if(canvas.width <= 450){
			
			if(canvas.width <= 250){
				
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
			
		}
		
	});
	
	$("#RG").closest('.ui-btn').hide();
	$("#dwnload").closest('.ui-btn').hide();
	
	$("#container").on("vmouseup",function(){
									
		joyDirX = "";
		joyDirY = "";
		joyTouch = false;
		
	});
	
		$("#container").on("vmousedown",function(){
									
			joyTouch = true; // the joystick was touched and now in the Update function it will be checking the direction of the joystick
			
		});
	
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
			
			
			
		//this will create new enemies
		setInterval(function(){
					
		    Enemy1 = jQuery.extend(true, {}, RandomShip);
			Enemy1.x = Math.round(Math.random() * (canvas.width * .95));
			Enemy1.y = Math.round(Math.random() * (canvas.height * .95));
			Enemy1.direction = Math.round(Math.random() * 7);
					
			entities.push(Enemy1);
			//console.log(entities);
		}, 3000);
		
		setInterval(function(){
					
		    Enemy2 = jQuery.extend(true, {}, Hunter);
			Enemy2.x = Math.round(Math.random() * (canvas.width * .95));
			Enemy2.y = Math.round(Math.random() * (canvas.height * .95));
					
			entities.push(Enemy2);
			//console.log(entities);
		}, 5000);	
		
		setInterval(function(){
					
		    Enemy3 = jQuery.extend(true, {}, Stalker);
			Enemy3.x = Math.round(Math.random() * (canvas.width * .95));
			Enemy3.y = Math.round(Math.random() * (canvas.height * .95));
					
			entities.push(Enemy3);
			//console.log(entities);
		}, 7000);	
		
		$("#play").closest('.ui-btn').css("margin-top", "90%");
		$("h2").hide();

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
		
		playerSize = (playersSizeW + playerSizeH); //playerSize is about 19.43999 px
		
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
		canvas.width = (window.innerWidth) * .67;
		canvas.height = (window.innerHeight) * .80;
		
		//console.log("Canvas Width " + canvas.width);
		//$("#result").html(canvas.width); //display the screen size
		
		if(canvas.width <= 428){		
			
			joyStickX = (window.innerWidth) * .68;
			joyStickY = (window.innerHeight) * .30;
			
		}
		
		if(canvas.width >= 241){
			
			joyStickX = (window.innerWidth) * .89;
			joyStickY = (window.innerHeight) * .60;	
			
			//$("#play").closest('.ui-btn').show();
			
		}
		
		if(canvas.width <= 251){
			
			$("#play").closest('.ui-btn').hide();
			$("#dwnload").closest('.ui-btn').show();
			$("#rotWar").show();
			
		}
		
		 if(canvas.width > 399){
			
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
            ctx.fillStyle = "blue";
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
		
		
		
		var RandomShip = {
  			color: "black",
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
					 this.x -= 3;
				 }
				 if(this.direction == 1){
					 this.x += 3;
				 }
				 if(this.direction == 2){
					 this.y -= 3;
				 }
				 if(this.direction == 3){
					 this.y += 3;
				 }
				 if(this.direction == 4){
					 this.y += 3;
					 this.x += 3;
				 }
				 if(this.direction == 5){
					 this.y -= 3;
					 this.x -= 3;
				 }
				 if(this.direction == 6){
					 this.y += 3;
					 this.x -= 3;
				 }
				 if(this.direction == 7){
					 this.y -= 3;
					 this.x += 3;
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
			//direction: randomDirection = Math.round(Math.random() * 7),
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
					 
					 this.x += 2.5;
				 }
				 if(this.x > x){
					 
					 this.x -= 2.5;
				 }
				 if(this.y < y){
					 
					 this.y += 2.5;
				 }
				 if(this.y > y){
					 
					 this.y -= 2.5;
				 }
				 
				 
			 }
			  
		};
		
		var Stalker = {
  			color: "red",
  			x: Math.round(Math.random() * (canvas.width * .90)),
  			y: Math.round(Math.random() * (canvas.height * .90)),
			//direction: randomDirection = Math.round(Math.random() * 7),
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
					 
					 this.x += 2.5;
				 }
				 if(this.y > y){
					 
					 this.y -= 2.5;
				 }
				 if(this.x > x){
					 
					 this.x -= 2.5;
				 }
				 if(this.y < y){
					 
					 this.y += 2.5;
				 } 
				 		 
			 }
			  
		};								
		
		function draw() {
  			
			
			//enemy.draw();
			//this will loop through the list of enemies
			for(var i = 0; i < entities.length; i++){
				
				entities[i].draw(); //this will draw the enemies as they are created
				entities[i].movement();//this will activate the enemies movement
				
				//this is a colision with the randomly spawning ai guys
				if (x < entities[i].x + playerSize  && x + playerSize  > entities[i].x &&
				y < entities[i].y + playerSize && y + playerSize > entities[i].y) {
					// The objects are touching
				
					velX *= friction - 4; //this will stop the player from moving
					velY *= friction - 4;
					entities.splice(i, 1); //this will destroy the enemy on colision with the player
				}
				
				
				if (entities[i].x > canvas.width - playerSize + 1) { // this will check and destroy if an enemy is touching the x-axis //original size 15, now playerSize is about 19.43999
                	entities.splice(i, 1);
            	} else if (entities[i].x < playerSize - 1) {
               		entities.splice(i, 1);
            	}
			
				if (entities[i].y > canvas.height - playerSize + 1) { // this will check and destroy if an enemy is touching the y-axis //original size 15, now playerSize is about 19.43999
                	entities.splice(i, 1);
            	} else if (entities[i].y < playerSize - 1) {
                	entities.splice(i, 1);
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