var canvas = document.createElement('canvas'),
	image = new Image(),
	name = 'http://assets.sbnation.com/assets/1994067/nyc-panorama-serget-semenov.jpeg',
	topLeftX = 0,
	topLeftY = 0,
	totalZoom = 1.0,
	isMouseDown = false;

window.onload = function(e) {
	canvas.style.position = 'absolute';
	canvas.style.width = '600px';
	canvas.style.height = '600px';
	canvas.style.border = '4px solid black';
	canvas.style.top = (window.innerHeight - 600) / 2 + 'px';
	canvas.style.left = (window.innerWidth - 600) / 2 + 'px';
	canvas.width = 600;
	canvas.height = 600;
	
	var ctx = canvas.getContext('2d');
	
	image.src = name;
	
	image.onload = function(e) {
		ctx.drawImage(image,
			0, 0, image.width, image.height,
			0, 0, canvas.width, canvas.height
		);
		
		// ZOOM
		canvas.addEventListener("mousewheel", function(e) {
			var delta = e.wheelDelta,
				mouseX = e.offsetX,
				mouseY = e.offsetY,
				zoom = 1.1;
				
			if (delta < 0)
				zoom = 1 / 1.1;
				
			if (totalZoom * zoom < 1.0)
				return;
			
			var x = mouseX + Math.abs(topLeftX),
				y = mouseY + Math.abs(topLeftY);
			
			totalZoom *= zoom;
			
			topLeftX = (mouseX - x * zoom);
			topLeftY = (mouseY - y * zoom);
			
			if (topLeftX > 0)
				topLeftX = 0;
			if (topLeftY > 0)
				topLeftY = 0;
			if (topLeftX + canvas.width * totalZoom < canvas.width)
				topLeftX = canvas.width * (1 - totalZoom);
			if (topLeftY + canvas.height * totalZoom < canvas.height)
				topLeftY = canvas.height * (1 - totalZoom);
			
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(image,
				0, 0, image.width, image.height,
				topLeftX, topLeftY, canvas.width * totalZoom, canvas.height * totalZoom
			);
		}, false);
		// ZOOM
		
		// PANNING
		canvas.addEventListener("mousedown", function(e) {
			isMouseDown = true;
		}, false);
		
		canvas.addEventListener("mouseup", function(e) {
			isMouseDown = false;
		}, false);
		
		canvas.addEventListener("mousemove", function(e) {
			if (isMouseDown) {
				var tX = e.movementX,
					tY = e.movementY;
				
				topLeftX += tX;
				topLeftY += tY;
				
				if (topLeftX > 0)
					topLeftX = 0;
				if (topLeftY > 0)
					topLeftY = 0;
				if (topLeftX + canvas.width * totalZoom < canvas.width)
					topLeftX = canvas.width * (1 - totalZoom);
				if (topLeftY + canvas.height * totalZoom < canvas.height)
					topLeftY = canvas.height * (1 - totalZoom);
				
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.drawImage(image,
					0, 0, image.width, image.height,
					topLeftX, topLeftY, canvas.width * totalZoom, canvas.height * totalZoom
				);
			}
		}, false);
		// PANNING
	};
	
	document.body.appendChild(canvas);
};