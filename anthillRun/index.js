const { getHeartRateSensor } = require("./ant/heartRate");
const { getPowerSensor } = require("./ant/power");
const {getStick} = require("./ant/stick");

let sensors = [];
const stickObject = getStick();

stickObject.onStartup([]);

stickObject.tryOpen();

const http = require('http');
const hostname = '127.0.0.1';
const port = 3001;
const server = http.createServer((req, res) => {
  let response = {};
  if(req.url === '/connect' && sensors.length === 0) {
    sensors = [getHeartRateSensor(stickObject),  getPowerSensor(stickObject.stick)];
  }
  if(req.url === '/disconnect') {
    console.log("disconnecting");
    sensors.forEach(sensor => sensor.sensor.detach());
    sensors = [];
  }
  if(req.url === '/sensors') {
    response = sensors.map(sensor => ({name: sensor.getName(), id: sensor.getId(), connected: sensor.isConnected()}));
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(response));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});