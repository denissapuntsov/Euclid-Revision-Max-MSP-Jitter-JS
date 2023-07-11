inlets = 2;

var line_coord = new Array();
var pulse = 0;
var cycle = 0;
var off = 0;
var x0 = 0;
var y0 = 0;

function pulses(p) {
	pulse = p;
	for (var i = 0; i < 4; i++) {
		line_coord[i] = 0;
	}
}

function offset(o) {
	cycle = o;
	off = o;
}

function to_lines(a, b) {
	
	var line = this.patcher.getnamed("line");
	
	if (cycle == off) {
		x0 = a;
		y0 = b;
		cycle++;
	}
	
	pulse--;
	if (line_coord[0] == 0 && line_coord[1] == 0) {
		line_coord[0] = a;
		line_coord[1] = b;
	} 
	else {
		line_coord[2] = line_coord[0];
		line_coord[3] = line_coord[1];
		line_coord[0] = a;
		line_coord[1] = b;
		line.message(line_coord);
	}
	if (pulse == 0) {
		line_coord[2] = line_coord[0];
		line_coord[3] = line_coord[1];
		line_coord[0] = x0;
		line_coord[1] = y0;
		line.message(line_coord);
	}
}	

