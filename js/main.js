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
	
	var newEnemy = new Object();
	
	var target = {
    	Ex: Math.round(Math.random() * (canvas.width - (playerSize * 4))), // retest this to see if the enemies stay in the game area
       	Ey: Math.round(Math.random() * (canvas.height - (playerSize * 4)))
    };
	
	var joyStickX = 0;
	var joyStickY = 0;
	
	// var enemy = {
	
	// 	x = target.Ex,
	// 	y = target.Ey,
	// 	color = "black",
		
	// 	draw: function() {
    // 		canvas.fillStyle = this.color;
    // 		canvas.fillRect(this.x, this.y, this.width, this.height);
  	// 	}			
		
	// };
	
	// var joyTest = setInterval(function(){// i feel like this is too slowwww
		
	//  	//----------------------this guys sets up the virtual joystick. Thank you virtualjoystick.js--------------------------------//
	// 	joystick = new VirtualJoystick({
	// 			container: document.getElementById('container'),
	// 			mouseSupport: true,
	// 			limitStickTravel: true,
	// 			stationaryBase: true, // to make the joystick appear anywhere, set to false and comment out BaseX and BaseY
    //                   baseX: joyStickX, // this size is only good for mobile not tablets
    //                   baseY: joyStickY, // this size is only good for mobile not tablets
	// 			stickRadius: 25
	// 		});	
		
	// },3000);
	
	
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
		
		 joystick = new VirtualJoystick({
				container: document.getElementById('container'),
				mouseSupport: true,
				limitStickTravel: true,
				stationaryBase: true, // to make the joystick appear anywhere, set to false and comment out BaseX and BaseY
                      baseX: joyStickX, // this size is only good for mobile not tablets
                      baseY: joyStickY, // this size is only good for mobile not tablets
				stickRadius: 25
			});	
			
			
		//this will create a new enemy every 3 seconds //known bug, if play button is hit more than once, everything seems to get duplicated
		setInterval(function(){
					
		    newEnemy = jQuery.extend(true, {}, enemy);
			newEnemy.x = Math.round(Math.random() * (canvas.width * .95));
			newEnemy.y = Math.round(Math.random() * (canvas.height * .95));
			newEnemy.direction = Math.round(Math.random() * 7);
					
			entities.push(newEnemy);
			//console.log(entities);
		}, 3000);	

	});
	
	//old method with new approach
	
	function joystickUpdate(){
		
			
		
		setInterval(function(){
			
			for(var i = 0; i <= 3; i++){
				
				if (joystick.up()) {
						if (velY > -speed) {
							velY--;
						}
					}

					if (joystick.down()) {
						if (velY < speed) {
							velY++;
						}
					}
					if (joystick.right()) {
						if (velX < speed) {
							velX++;
						}
					}
					if (joystick.left()) {
						if (velX > -speed) {
							velX--;
						}
					}
					
					if (joystick.up() && joystick.right()) {
						if (velY > -speed && velX < speed) {
							velY--;
							velX++;
						}
					}
					
					if (joystick.up() && joystick.left()) {
						if (velY > -speed && velX > -speed) {
							velY--;
							velX--;
						}
					}
					
					if (joystick.down() && joystick.right()) {
						if (velY < speed && velX < speed) {
							velY++;
							velX++;
						}
					}
					
					if (joystick.down() && joystick.left()) {
						if (velY < speed && velX > -speed) {
							velY++;
							velX--;
						}
					}
					
				}
			
		}, 10);
		
		
		
	}
	
	//------------------------end of virtual joystick------------------------------------------//

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
		
		//this is an attempt to calculate the size of the screen as a percentage to dynamically move the player and objects at screen size change
		//var widthMX = (canvas.width - x);
		//var heightMY = (canvas.height - y);
		
		//Xpercent = (widthMX / canvas.width) * 100;
		//YPercant = (heightMY / canvas.height) * 100;
		
		//playerPositionX = canvas.width * (Xpercent / 100); //* .50;
		//playerPositionY = canvas.height * (YPercant / 100); //* .50;
		
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
		canvas.height = (window.innerHeight) * .69;
		
		//console.log("Canvas Width " + canvas.width);
		//$("#result").html(canvas.width); //display the screen size
		
		// if(canvas.width > 1000){
			
		// 	$("#container").hide();
		// }
		
		// if(canvas.width < 999){
			
		// 	$("#container").show();
		// }
		
		if(canvas.width >= 428){
			
			//joystick.destroy();
			
			
			joyStickX = (window.innerWidth) * 1.58;
			joyStickY = (window.innerHeight) * .30;
			
			// setInterval(function(){
			// 	clearInterval(joyTest);
			// },3001);
			
			// joystick.baseX = joyStickX;
			// joystick.baseY = joyStickY;
			
			//canvas.clearRect(0, 0, canvas.width, canvas.height);
			
			//joystick._buildJoystickBase;
			//joystick._buildJoystickStick;
			
			
			
			console.log(joyStickX);
			
		}
		
		if(canvas.width >= 241){
			
			joyStickX = (window.innerWidth) * .89;
			joyStickY = (window.innerHeight) * .30;	
			
		}
		//playArea = canvas.width * canvas.height; //find the area and multiply to reposition characters at screen change. Find a percentage of the x and y's positon relative to playArea		
		
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
			
			//the update function does two things, draws the characters and tracks their movement positions
			
			//this will track what keys are pressed and will update the players position
			
			//this is for the arrow keys control
            if (keys[38]) {
                if (velY > -speed) {
                    velY--;
					//$("#result").html("X: " + x + " Y: " + y);
                }
            }

            if (keys[40]) {
                if (velY < speed) {
                    velY++;
					//$("#result").html("X: " + x + " Y: " + y);
                }
            }
            if (keys[39]) {
                if (velX < speed) {
                    velX++;
					//$("#result").html("X: " + x + " Y: " + y);
                }
            }
            if (keys[37]) {
                if (velX > -speed) {
                    velX--;
					//$("#result").html("X: " + x + " Y: " + y);
                }
            }
			
			
			//-----------------player movement with keyboard end --------------------------------------------//
			
			// for(var i = 0; i <= 1; i++){
			
			// if (joystick.up()) {
            //     if (velY > -speed) {
            //         velY--;
            //     }
            // }

            // if (joystick.down()) {
            //     if (velY < speed) {
            //         velY++;
            //     }
            // }
            // if (joystick.right()) {
            //     if (velX < speed) {
            //         velX++;
            //     }
            // }
            // if (joystick.left()) {
            //     if (velX > -speed) {
            //         velX--;
            //     }
            // }
			// }
			
			// if (joystick.up()) {
            //     if (velY > -speed) {
            //         velY--;
            //     }
            // }

            // if (joystick.down()) {
            //     if (velY < speed) {
            //         velY++;
            //     }
            // }
            // if (joystick.right()) {
            //     if (velX < speed) {
            //         velX++;
            //     }
            // }
            // if (joystick.left()) {
            //     if (velX > -speed) {
            //         velX--;
            //     }
            // }
			
            velY *= friction; //friction and final positioning
            y += velY;
            velX *= friction;
            x += velX;
			
			
			if (x >= canvas.width - playerSize) { // colision with game boarders x-axis //original size 15, now playerSize is about 19.43999
                x = canvas.width - playerSize;
            } else if (x <= playerSize) {
                x = playerSize;
            }
			
			if (y > canvas.height - playerSize) { // colision with game boarders y-axis //original size 15, now playerSize is about 19.43999
                y = canvas.height - playerSize;
            } else if (y <= playerSize) {
                y = playerSize;
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
            ctx.arc(x, y, playerSize, 0, Math.PI * 2); // draw the player //original size 15, now playerSize is about 19.43999
            ctx.fill();
            ctx.closePath();
			
						
            // ctx.beginPath(); // this is the ai guy
            // ctx.fillStyle = "black";
            // ctx.arc(target.Ex, target.Ey, playerSize, 0, Math.PI * 2); // draws the ai. ai has hard coded position
            // ctx.fill();
            // ctx.closePath();


            setTimeout(update, 3); //refresh the screen and sets the main loop for movement with keyboard 5
			//setTimeout(joystickUpdate, 3); //refresh the screen and sets the main loop for movement with the virtual joystick
			
			//----------------------------------------------------------
					

			draw();	//this draws all the enemies in the game area	
			//joystickUpdate();
        }
		
		
		
		var target = {
        	Ex: Math.round(Math.random() * (canvas.width * .95)), // retest this to see if the enemies stay in the game area
       	    Ey: Math.round(Math.random() * (canvas.height * .95))
         };
		
		
		
		var enemy = {
  			color: "black",
  			x: Math.round(Math.random() * (canvas.width * .95)),
  			y: Math.round(Math.random() * (canvas.height * .95)),
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
				 //console.log(this.direction);
				 
				 if(this.direction == 0){
					 this.x -= 1;
				 }
				 if(this.direction == 1){
					 this.x += 1;
				 }
				 if(this.direction == 2){
					 this.y -= 1;
				 }
				 if(this.direction == 3){
					 this.y += 1;
				 }
				 if(this.direction == 4){
					 this.y += 1;
					 this.x += 1;
				 }
				 if(this.direction == 5){
					 this.y -= 1;
					 this.x -= 1;
				 }
				 if(this.direction == 6){
					 this.y += 1;
					 this.x -= 1;
				 }
				 if(this.direction == 7){
					 this.y -= 1;
					 this.x += 1;
				 }
				 
				 //when an enemy hits the wall, this will check the direction it was moving and make it move the revirse direction
				if (this.x >= canvas.width - playerSize) { // colision with game boarders x-axis //original size 15, now playerSize is about 19.43999
                	this.x = canvas.width - playerSize;
					this.direction = 0;
            	}else if (this.x < playerSize) {
                	this.x = playerSize;
					this.direction = 1;
            	}
				if (this.y > canvas.height - playerSize) { // colision with game boarders y-axis //original size 15, now playerSize is about 19.43999
                	this.y = canvas.height - playerSize;
					this.direction = 2;
            	} else if (this.y < playerSize) {
                 	this.y = playerSize;
				 	this.direction = 3;
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
				
					velX *= friction - 10; //this will stop the player from moving
					velY *= friction - 10;
					entities.splice(i, 1); //this will destroy the enemy on colision with the player
				}
				
				
				if (entities[i].x > canvas.width - playerSize) { // this will check and destroy if an enemy is touching the x-axis //original size 15, now playerSize is about 19.43999
                	entities.splice(i, 1);
            	} else if (entities[i].x < playerSize) {
               		entities.splice(i, 1);
            	}
			
				if (entities[i].y > canvas.height - playerSize) { // this will check and destroy if an enemy is touching the y-axis //original size 15, now playerSize is about 19.43999
                	entities.splice(i, 1);
            	} else if (entities[i].y < playerSize) {
                	entities.splice(i, 1);
            	}
				
			}
			//console.log(newObject);
			  //EnemyCreate();
			 
			//console.log(entities);  
		}
		
		
		
		
		// function createEnemies(){
			
			
		// 	setInterval(function(){
				
		// 		var enemy = new Object();
		// 		enemy.color = "black";
		// 		enemy.x = Math.round(Math.random() * (canvas.width * .95));
		// 		enemy.y = Math.round(Math.random() * (canvas.height * .95));
		// 		enemy.size = playerSize;
		// 		enemy.draw = function() {
		// 			ctx.beginPath(); // this is the ai guy
    	// 			ctx.fillStyle = this.color;
    	// 			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		// 			ctx.fill();
        //     		ctx.closePath();
 		// 	 }
				
		// 	entities.push(enemy);
		// 	console.log(entities);	
				
		// 	}, 3000);
			  
		// 	  //enemy.draw();
			
		// }
		
		//createEnemies();
		
		
		// var enemies = setInterval(function(){ 
				
		// 		//enemy.x = Math.round(Math.random() * (canvas.width - (playerSize * 4)));
		// 		//enemy.y = Math.round(Math.random() * (canvas.height - (playerSize * 4)));
		// 		//console.log(enemy);
		// 		entities.push(enemy);
		// 		//enemy.draw();
				
		// 		for(var i = 0; i < entities.length; i++){
					
		// 			console.log(entities[i]);
		// 			entities[i].x = Math.round(Math.random() * (canvas.width - (playerSize * 4)));
		// 			entities[i].y = Math.round(Math.random() * (canvas.width - (playerSize * 4)));
		// 			entities[i];
		// 		}
				
		// 		//entities[0].draw();
		// 		//console.log(entities);
		// 		console.log("enemy created");
		// 		console.log(enemy.x + " " + enemy.y);
				
		// 	}, 3000);
		
		// //this will give the enemies random positions x and y
		
		
		
		
		// function makeEnemyShip(x, y) {
		// 	 target = {
		// 			Ex: x,
		// 			Ey: y
		// 		}
				
				
		// 	ctx.beginPath(); // this is the ai guy
        //     ctx.fillStyle = "black";
        //     ctx.arc(target.Ex, target.Ey, playerSize, 0, Math.PI * 2); // draws the ai. ai has hard coded position
        //     ctx.fill();
        //     ctx.closePath();
		// 	};
			
			

			// function start() {
				
				

			// 	for (var i = 0; i <= numOfEnemyShips; i++) {
					
			// 		var Newtarget = {
            //  			Ex: Math.round(Math.random() * (canvas.width - (playerSize * 4))), // retest this to see if the enemies stay in the game area
       	    //  			Ey: Math.round(Math.random() * (canvas.height - (playerSize * 4)))
         	// 		};
					
			// 		entities.push(enemy(Newtarget.Ex, Newtarget.Ey));
					
					
			// 		console.log("EX: " + Newtarget.Ex);
			// 		console.log("EY: " + Newtarget.Ey);
			// 	}
			// }
			
			
		
		//joystickUpdate();
		setTimeout(joystickUpdate, 3);
        update();// sets the keyboard press loop into motion
		
		
		
		//start();

        document.body.addEventListener("keydown", function (e) { // these make the keyboard do
            keys[e.keyCode] = true;
        });
        document.body.addEventListener("keyup", function (e) {
            keys[e.keyCode] = false;
        });
		
		
		
    });