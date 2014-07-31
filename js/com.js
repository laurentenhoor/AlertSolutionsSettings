var serialPort = require('serialport');
var comPort;
var sp;

var results = {};
var subresults = [];
var nextCmd = '';
var receivingCmd = '';
var isReceiving = false;

serialPort.list(function (err, ports) {
  ports.forEach(function(port) {
  	
  	// console.log(port.comName);
  	// console.log(port.pnpId);
  	
  	if (port.pnpId.split('\\')[1] == "VID_2047&PID_082F&MI_01") {

  		sp = new serialPort.SerialPort(port.comName, {
		  baudrate: 9600,
		  dataBits: 8, 
		  
		  stopBits: 1
		}, false);
		
		sp.open(function () {
		  console.log('open on port: ' + port.comName);
		  alert('Device found on port: ' + port.comName);
		  sp.on('data', function(data) {
		    console.log('>>> ' +data);
		    
		    // if (isReceiving) {
		    	// subresults.push(data);
		    // } else if (data.indexOf(nextCmd)) {
		    	// console.log('isReceiving!!');
		    	// receivingCmd = nextCmd;
		    	// isReceiving = true;
		    // } else if (data == '') {
		    	// console.log('end of receiving')
		    	// isReceiving = false;
		    	// results[receivingCmd] = subresults;
		    // }
		    
		  });
		  sp.write('ver?\r');
		});	
		
  	};
  });
  if (!sp) {
  	console.log('No device connected!');
  	alert('No device connected!');
  };

});



function getData(cmd) {
	
	nextCmd = cmd;
	sp.write(nextCmd+'\r');
	
};
