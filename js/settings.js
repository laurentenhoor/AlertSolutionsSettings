var CHANNEL_TYPES = {
	'0-10V' : {
		defaults : {},
		hide_fields : {}
	},
	'pulse' : {
		defaults : {},
		hide_fields : {}
	}
};

var DEVICES = {
	'modemlogger' : {
		channels : [{
			id : 1,
			channel_type : CHANNEL_TYPES['0-10V']
		}, {
			id : 2,
			channel_type : CHANNEL_TYPES['pulse']
		}]
	}
};

console.log(DEVICES.modemlogger);
