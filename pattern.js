inlets = 1;
outlets = 1;

var debug = this.patcher.getnamed("debug_pattern");
var lines = this.patcher.getnamed("lines");

function list(beats, pulses, offset) {
	
	var pattern = new Array();
		
	if (pulses == 0) {
		for (var i = 0; i < beats; i++) {
			pattern[i] = 0;	
		}	
	}
	
	else if (beats < pulses) {
		for (var i = 0; i < beats; i++) {
			pattern[i] = 1;	
		}
		
	}
	
	else {
		
		var residue_modulus = new Array();
	
		for (var i = -1; i < beats; i++) {
			residue_modulus[i] = ((((i * pulses) % beats) + beats) % beats);
		}
		for(var i = 0; i < beats; i++) {
			if (residue_modulus[i] <= residue_modulus[i-1]) {
				pattern[i] = 1;
			}
			else pattern[i] = 0;
		}
		if (offset != 0) {
			var temp = 0
			for (var i = 0; i < offset; i++) {
				temp = pattern[beats - 1];
				for (var j = beats - 1; j > 0; j--) {
					pattern[j] = pattern[j-1];
				}
				pattern[0] = temp;
			}
		}
	}	
	debug.message("set", pattern);
	if (pulses > beats) {
		pulses = beats;
	}
	lines.message("pulses", pulses);
	lines.message("offset", offset);
	outlet (0, pattern);
	
}
	