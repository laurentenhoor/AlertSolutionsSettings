// 
// var serialPort = require('serialport');
// 
// 
// // serialPort.list(function (err, ports) {
  // // ports.forEach(function(port) {
    // // console.log(port.comName, port.pnpId, port.manufacturer);
  // // });
// // });
// 
// var sp = new serialPort.SerialPort("COM8", {
  // baudrate: 9600,
  // dataBits: 8, 
  // parity: 'odd', 
  // stopBits: 1,
  // parser: serialPort.parsers.readline("\n"),
  // flowControl: true
// }, false);
// 
// 
// sp.open(function () {
  // console.log('open');
  // sp.on('data', function(data) {
    // console.log('>>> ' +data);
  // });
  // sp.write('status\r');
// });
// 
