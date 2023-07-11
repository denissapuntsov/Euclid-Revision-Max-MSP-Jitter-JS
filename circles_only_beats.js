outlets = 2;

setinletassist(0, "(list) Beats Pulses Offset");
setoutletassist(0, "(list) x and y coordinates");
var width = 350;
var height = 350;
var offset = 25;
var ui = this.patcher.getnamed("ui");
var circle = this.patcher.getnamed("mess");
var ring = this.patcher.getnamed("ring");

function list() {
	
	ui.message("size", width + offset * 2, height + offset * 2);
	
	var beats = arguments.length;
	
	var x, y = 0;

	for (var i = 180, j = 0; i > -180; i = i - 360 / beats, j++) {
	
		x = Math.sin(i * (Math.PI / 180));
		y = Math.cos(i * (Math.PI / 180));
		
		if (arguments[j] != 0 && j < beats) {
			var ring_oval = new Array(x * height / 2 + height / 2 + offset, y * height / 2 + height / 2 + offset);
			ring.message(ring_oval);
			ring.message("bang");
		
			// prepare coordinates for pulse oval
			var oval = new Array();
			oval[0] = ring_oval[0] - offset / 5;
			oval[1] = ring_oval[1] - offset / 5;
		
			// draw the oval, set the line
			circle.message(oval);
			circle.message("bang");
			outlet(0, "to_lines", ring_oval);
		}
	}
}


