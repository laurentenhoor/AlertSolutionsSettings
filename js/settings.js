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


var channelTypes = {
	'voltage' : {
		name : '0-10 V',
		default_sensors : VOLT_SENSORS,
		hideFields : ['debouncetime', 'name']
	},
	'pulse' : {
		name : 'Pulse',
		default_sensors : PULS_SENSORS,
		hideFields : ['measuretime']
	},
	'baro' : {
		name : 'Barometer',
		default_sensors : BARO_SENSORS,
		hideFields : ['debouncetime']
	},
	'batt' : {
		name : 'Battery',
		default_sensors : BARO_SENSORS,
		hideFields : ['debouncetime']
	}
};

var DEVICES = {
	'modemlogger' : {
		channels : [{
			id : 1,
			channelType : channelTypes['voltage']
		}, {
			id : 2,
			channelType : channelTypes['pulse']
		}, {
			id : 3,
			channelType : channelTypes['baro']
		}, {
			id : 5,
			channelType : channelTypes['batt']
		}]
	}
};

console.log(DEVICES);
