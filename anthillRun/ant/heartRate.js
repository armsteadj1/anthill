const Ant = require('gd-ant-plus');
const {getAntSensor} = require("./antSensor");

let heartRateData = {
  history: [],
  current: {
    ComputedHeartRate: 0
  }
};

const getHeartRateData = function() {
  return heartRateData;
};

const getName = (sensor) => "Heart Rate Monitor";

const getHeartRateSensor = function ({stick, stickId, isUp}) {
  const object = getAntSensor(new Ant.HeartRateSensor(stick), getName);

  object.sensor.on('hbdata', function(data) {
    if(heartRateData.current.ComputedHeartRate !== 0 && data.BeatCount === 0) {
      heartRateData.history.push(heartRateData.current);
    }

    heartRateData.current = data;
  });

  object.sensor.on('attached', function(t) { console.log(t, stickId, 'sensor1 attached'); });

  object.sensor.on('detached', function() { console.log(stickId, 'sensor1 detached'); });

  if(isUp) {
    object.sensor.attach(0, 0)
  }

  return object;
};

exports.getHeartRateSensor = getHeartRateSensor;
exports.getHeartRateData = getHeartRateData;