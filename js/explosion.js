
//Thank you Zeke Y for the inspiration

$(document).ready(function () {



// when animating on canvas, it is best to use requestAnimationFrame instead of setTimeout or setInterval
// not supported in all browsers though and sometimes needs a prefix, so we need a shim

window.requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				function(callback) {
					window.setTimeout( callback, 1000 / 60 );
				};
})();


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
		//ctx.lineWidth = '.1';
		//ctx.strokeRect(0, 0, window.innerWidth, window.innerHeight);
				
		
	}
	// Runs each time the DOM window resize event fires.
	// Resets the canvas dimensions to match window,
	// then draws the new borders accordingly.
	function resizeCanvas() {
		
		//This will dynamically resize the game play area		
		canvas.width = (window.innerWidth) * .72;
		canvas.height = (window.innerHeight) * .80; //.80		
		
		redraw();
	}


// starting hue
var hue = 120;


// // now we will setup our basic variables for the demo
 var canvas1 = document.getElementById("canvas"),
    ctx1 = canvas1.getContext("2d"),
		// full screen dimensions
		cw = canvas.width,
		ch = canvas.height,
		// firework collection
		fireworks = [],
		// particle collection
		particles = [],
		
		// when launching fireworks with a click, too many get launched at once without a limiter, one launch per 5 loop ticks
		limiterTotal = 5,
		limiterTick = 0,
		// this will time the auto launches of fireworks, one launch per 80 loop ticks
		timerTotal = 75,
		timerTick = 0,
		mousedown = false,
		// mouse x coordinate,
		mx,
		// mouse y coordinate
		my;
		
// set canvas dimensions
canvas1.width = cw;
canvas1.height = ch;




// now we are going to setup our function placeholders for the entire demo

// get a random number within a range
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
	this.coordinateCount = 2;//2
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
	this.coordinateCount = 5;//
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
	var particleCount = 125;
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
	
	// normally, clearRect() would be used to clear the canvas
	// we want to create a trailing effect though
	// setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
	ctx1.globalCompositeOperation = 'destination-out';
	// decrease the alpha property to create more prominent trails
	ctx1.fillStyle = 'rgba(0, 0, 0, 0)';
	ctx1.fillRect( 0, 0, cw, ch );
	// change the composite operation back to our main mode
	// lighter creates bright highlight points as the fireworks and particles overlap each other
	ctx1.globalCompositeOperation = 'lighter';
	
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
	// if( timerTick >= timerTotal ) {
	// 	if( !mousedown ) {
	// 		// start the firework at the bottom middle of the screen, then set the random target coordinates, the random y coordinates will be set within the range of the top half of the screen
	// 		fireworks.push( new Firework( cw / 2, ch, random( 0, cw ), random( 0, ch / 2 ) ) );
	// 		timerTick = 0;
	// 	}
	// } else {
	// 	timerTick++;
	// }
	
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
window.onload = loop;
//fireworks.push( new Firework( cw / 2, ch, random( 0, cw ), random( 0, ch / 2 ) ) );
 
//  function EnemyExplode1(){
//     window.onload = loop;
//     fireworks.push( new Firework( cw / 2, ch, random( 0, cw ), random( 0, ch / 2 ) ) );
// }

});



// function EnemyExplode1(){
    
//     // now we will setup our basic variables for the demo
//  var canvas1 = document.getElementById("canvas"),
//     ctx1 = canvas.getContext("2d"),
// 		// full screen dimensions
// 		cw = canvas.width,
// 		ch = canvas.height,
// 		// firework collection
// 		fireworks = [],
// 		// particle collection
// 		particles = [],
		
// 		// when launching fireworks with a click, too many get launched at once without a limiter, one launch per 5 loop ticks
// 		limiterTotal = 5,
// 		limiterTick = 0,
// 		// this will time the auto launches of fireworks, one launch per 80 loop ticks
// 		timerTotal = 75,
// 		timerTick = 0,
// 		mousedown = false,
// 		// mouse x coordinate,
// 		mx,
// 		// mouse y coordinate
// 		my;
		
// // set canvas dimensions
// canvas1.width = cw;
// canvas1.height = ch;


// // create firework
// function Firework( sx, sy, tx, ty ) {
// 	// actual coordinates
// 	this.x = sx;
// 	this.y = sy;
// 	// starting coordinates
// 	this.sx = sx;
// 	this.sy = sy;
// 	// target coordinates
// 	this.tx = tx;
// 	this.ty = ty;
// 	// distance from starting point to target
// 	this.distanceToTarget = calculateDistance( sx, sy, tx, ty );
// 	this.distanceTraveled = 0;
// 	// track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
// 	this.coordinates = [];
// 	this.coordinateCount = 2;//2
// 	// populate initial coordinate collection with the current coordinates
// 	while( this.coordinateCount-- ) {
// 		this.coordinates.push( [ this.x, this.y ] );
// 	}
// 	this.angle = Math.atan2( ty - sy, tx - sx );
// 	this.speed = 5;//5
// 	this.acceleration = 500;//500
// 	this.brightness = random( 50, 99 );//random( 50, 70 );
// 	// circle target indicator radius
// 	this.targetRadius = 30; //1
// }

// // get a random number within a range
// function random( min, max ) {
// 	return Math.random() * ( max - min ) + min;
// }

// // calculate the distance between two points
// function calculateDistance( p1x, p1y, p2x, p2y ) {
// 	var xDistance = p1x - p2x,
// 			yDistance = p1y - p2y;
// 	return Math.sqrt( Math.pow( xDistance, 2 ) + Math.pow( yDistance, 2 ) );
// }
    
//     fireworks.push( new Firework( cw / 2, ch, random( 0, cw ), random( 0, ch / 2 ) ) );
    
//  }