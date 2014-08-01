var SENSORS = {
	'TL15' : {
		name : 'Tilt Logger 15deg',
		defaults : []
	},
	'TL90' : {
		name : 'Tilt Logger 90deg',
		defaults : []
	},
	'PIEZ' : {
		name : 'Tilt Logger Piezometer',
		defaults : []
	},
	'CUSTOM' : {
		name : 'Custom Sensor',
		defaults : []
	}
};

var PULS_SENSORS = [SENSORS['TL15'], SENSORS['TL90'], SENSORS['PIEZ'], SENSORS['CUSTOM']];
var VOLT_SENSORS = [SENSORS['CUSTOM']];
var BARO_SENSORS = [SENSORS['CUSTOM']];
var BATT_SENSORS = [SENSORS['CUSTOM']];


var CHANNEL_TYPES = {
	'voltage' : {
		name : '0-10 V',
		default_sensors : VOLT_SENSORS,
		hide_fields : {}
	},
	'pulse' : {
		name : 'Pulse',
		default_sensors : PULS_SENSORS,
		hide_fields : {}
	},
	'baro' : {
		name : 'Barometer',
		default_sensors : BARO_SENSORS,
		hide_fields : {}
	},
	'batt' : {
		name : 'Battery',
		default_sensors : BARO_SENSORS,
		hide_fields : {}
	}
};

var DEVICES = {
	'modemlogger' : {
		channels : [{
			id : 1,
			channel_type : CHANNEL_TYPES['voltage']
		}, {
			id : 2,
			channel_type : CHANNEL_TYPES['pulse']
		}, {
			id : 3,
			channel_type : CHANNEL_TYPES['baro']
		}, {
			id : 5,
			channel_type : CHANNEL_TYPES['batt']
		}]
	}
};

console.log(DEVICES);
