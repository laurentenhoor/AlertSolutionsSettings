var serialPort = require('serialport');
var comPort;
var sp;

var results = [];

serialPort.list(function (err, ports) {
  ports.forEach(function(port) {
  	
  	console.log(port.comName);
  	console.log(port.pnpId);
  	
  	if (port.pnpId.split('\\')[1] == "VID_2047&PID_082F&MI_01") {

  		sp = new serialPort.SerialPort(port.comName, {
		  baudrate: 9600,
		  dataBits: 8, 
		  parity: 'odd', 
		  stopBits: 1,
		  parser: serialPort.parsers.readline("\n"),
		  flowControl: true
		}, false);

		sp.open(function () {
		  console.log('open on port: ' + port.comName);
		  sp.on('data', function(data) {
		    console.log('>>> ' +data);
		    results.push(data);
		  });
		  sp.write('ver?\r');
		});	
		
  	};
  });
  if (!sp) {
  	console.log('No device connected!');
  };

});

