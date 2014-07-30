var serialPort = require('serialport');
var comPort;
var sp;

serialPort.list(function (err, ports) {
  ports.forEach(function(port) {
  	if (port.pnpId == "USB\\VID_2047&PID_082F&MI_01\\6&20B65F81&0&0001") {

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
		  });
		  sp.write('status\r');
		});	
  	}
  });
  if (!sp) {
  	console.log('No device connected!');
  }
});