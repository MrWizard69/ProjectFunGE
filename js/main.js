$(document).ready(function () {
	
	// Obtain a reference to the canvas element
	// using its id.
	
    var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");
	
	var joystick;
	var playerSize = 0;
	
	var playerPositionX = 0;
	var playerPositionY = 0;
	var Xpercent = 0;
	var YPercant = 0;
	
	var x = 0;
	var y = 0;
	
	var playArea = 0;
	
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
		
		//----------------------this guys sets up the virtual joystick. Thank you virtualjoystick.js--------------------------------//
		joystick	= new VirtualJoystick({
				container	: document.getElementById('container'),
				mouseSupport	: true,
				limitStickTravel: true,
				stationaryBase: true, // to make the joystick appear anywhere, set to false and comment out BaseX and BaseY
                      baseX: (window.innerWidth) * 1.4, // this size is only good for mobile not tablets
                      baseY: (window.innerHeight) * .30, // this size is only good for mobile not tablets
				stickRadius: 25,
				Position: "absolute"
			});		

	});
	
	
	function joystickUpdate(){
		
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
            speed = 3,
            friction = 0.5, //0.98
            keys = [];
			
		var buttup = $("#UpButton");
		var timeout;
		
		//---------------------------------touch screen movement-----------------------------------------------//
		
		
		
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
			
		//------------------------Touch screen movement end---------------------------------------------//	

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
			
			// if (object1.x < object2.x + object2.width  && object1.x + object1.width  > object2.x &&
			// object1.y < object2.y + object2.height && object1.y + object1.height > object2.y) {
			// 	// The objects are touching
			// }
			
			//this is a colision with the test ai guy
			if (x < target.Ex + playerSize  && x + playerSize  > target.Ex &&
			y < target.Ey + playerSize && y + playerSize > target.Ey) {
				// The objects are touching
				
				velX *= friction - 10; //this will stop the player from moving
				velY *= friction - 10;
			}
			
			//this part will draw the characters
            
            ctx.beginPath(); //this is the player
            ctx.clearRect(0, 0, canvas.width, canvas.height); // this will clear and redraw the canvas for new values and positions
            ctx.fillStyle = "blue";
            ctx.arc(x, y, playerSize, 0, Math.PI * 2); // draw the player //original size 15, now playerSize is about 19.43999
            ctx.fill();
            ctx.closePath();
			
						
            ctx.beginPath(); // this is the ai
            ctx.fillStyle = "black";
            ctx.arc(target.Ex, target.Ey, playerSize, 0, Math.PI * 2); // draws the ai. ai has hard coded position
            ctx.fill();
            ctx.closePath();


            setTimeout(update, 5); //refresh the screen and sets the main loop for movement with keyboard 
			setTimeout(joystickUpdate, 5); //refresh the screen and sets the main loop for movement with the virtual joystick
        }
		
		
		// //this will give the enemies random positions x and y
		
		var target = {
             	Ex: Math.round(Math.random() * canvas.width + playerSize),
       	     	Ey: Math.round(Math.random() * canvas.height + playerSize)
         	};
		
		//this will hopefully make more enemies in random places, right?
		
		// function findNewTarget() {
        // 	var target = {
        //     	Ex: Math.round(Math.random() * 600),
        //     	Ey: Math.round(Math.random() * 300)
        // 	};

        // 	return target;
    	// }
		
		// function makeEnemyShip(x, y) {
    	// 	var position = {
        // 		Ex: x,
        // 		Ey: y
    	// };
		
		//  var entities = [];
    	//  var numOfEnemyShips = 4;

    	// function start() {

        // 	for (var i = 0; i <= numOfEnemyShips; i++) {
        //     	entities.push(makeEnemyShip(i * 10, i));
        // 	}
    	// }
		
        update();// sets the keyboard press loop into motion

        document.body.addEventListener("keydown", function (e) { // these make the keyboard do
            keys[e.keyCode] = true;
        });
        document.body.addEventListener("keyup", function (e) {
            keys[e.keyCode] = false;
        });
		
		
		
    });