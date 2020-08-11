HR_COLOR = 'rgb(255, 100, 150)';
MIN_COLOR = 'rgb(150, 100, 255)';
SEC_COLOR = 'rgb(150, 255, 100)';
WHITE = 'rgb(255, 255, 255)';
WHITE_ARCS = 'rgba(255, 255, 255, 0.1)';

runClock = (ctx, canvas, showArcs, showHands) => {

	ctx.clearRect(-250, -250, canvas.width, canvas.height);

	// linear gardinet background
	ctx.rect(-(canvas.width/2), -(canvas.height/2), canvas.width, canvas.height);
	var grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
	grd.addColorStop(0, '#203A43');   
	grd.addColorStop(1, '#2C5364');
	ctx.fillStyle = grd;
	ctx.fill();

	// white arcs
	drawArc(ctx, 130, 0, 2*Math.PI, WHITE_ARCS, 2);
	ctx.moveTo(170,0);
	drawArc(ctx, 160, 0, 2*Math.PI, WHITE_ARCS, 2);
	ctx.moveTo(190,0);
	drawArc(ctx, 200, 0, 2*Math.PI, WHITE_ARCS, 2);


	// getting current system time
	let date = new Date();
	let hh = date.getHours()%12;
	let mm = date.getMinutes();
	let ss = date.getSeconds();
	hh = (hh*Math.PI/6) + (mm*Math.PI/(6*60)) + (ss*Math.PI/(360*60)) + Math.PI / 2;
	mm = (mm*Math.PI/30)+(ss*Math.PI/(30*60)) + Math.PI / 2;
	ss = (ss*Math.PI/30) + Math.PI / 2;

	// drawing arcs
	if(showArcs){
		drawArc(ctx, 130, 0, hh - Math.PI/2, HR_COLOR, 7);
		ctx.moveTo(170,0);
		drawArc(ctx, 160, 0, mm - Math.PI/2, MIN_COLOR, 6);
		ctx.moveTo(190,0);
		drawArc(ctx, 200, 0, ss - Math.PI/2, SEC_COLOR, 4);
	}

    // clock hands
    if(showHands){
    	drawHand(ctx, hh, 90, 6, HR_COLOR);
    	drawHand(ctx, mm, 140 - 20, 6, MIN_COLOR);
    	drawHand(ctx, ss , 190 - 20, 4, SEC_COLOR);

	    // center point (white dot)
	    ctx.beginPath();
	    ctx.arc(0,0, 4, 0, 2*Math.PI);
	    ctx.fillStyle = WHITE;
	    ctx.fill();
	    ctx.strokeStyle = WHITE;
	    ctx.stroke();
	}
}

drawArc = (ctx, radius, start, end, colour, linewid) => {
	ctx.beginPath();
	ctx.lineWidth = linewid;
	ctx.arc(0,0, radius, start, end);
	ctx.strokeStyle = colour;
	ctx.stroke();
}

drawHand = (ctx, pos, length, width, col) => {
	ctx.beginPath();
	ctx.lineWidth = width;
	ctx.lineCap = "round";
	ctx.strokeStyle = col;
	ctx.moveTo(0,0);
	ctx.rotate(pos);
	ctx.lineTo(0, -length);
	ctx.stroke();
	ctx.rotate(-pos);
}

window.addEventListener('DOMContentLoaded', (event) => {
	var canvas = document.getElementById('clock');
	var ctx = canvas.getContext('2d');
	ctx.translate(canvas.width / 2,canvas.height / 2);
	ctx.rotate(Math.PI / 180 * 270);
	
	var showArcs = document.getElementById('showArcs');
	var showHands = document.getElementById('showHands');

	setInterval(function() { runClock(ctx, canvas, showArcs.checked, showHands.checked) }, 500);
});