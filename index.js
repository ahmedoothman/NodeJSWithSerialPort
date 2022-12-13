const { SerialPort } = require('serialport');
const { ByteLengthParser } = require('@serialport/parser-byte-length');
const parser = new ByteLengthParser({ length: 1 });
const config = {
  path: 'COM6',
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  autoOpen: false,
};
const port = new SerialPort(config);
port.open((err) => {
  if (err) {
    console.log('error opening the port' + err.messages);
  }
});
port.write('Hi From Node js', (err) => {
  if (err) {
    console.log('Error writing ' + err.message);
  }
});

port.pipe(parser);
parser.on('data', (data) => {
  console.log(data.toString());
});
