const Ant = require('gd-ant-plus');
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('../db/anthill.db');
const {getAntSensor} = require("./antSensor");

const getName = (sensor) => "Power Meter";

const getPowerSensor = function (stick) {
  const object = getAntSensor(new Ant.HeartRateSensor(stick), getName);

  object.sensor.on('powerData', data => {
    db.run(`INSERT INTO data(time,power) VALUES(?, ?)`, [new Date().getTime(), data.Power], (err) => {
      if (err) {
        return console.log(err.message);
      }
    });
  });

  return object;
};

exports.getPowerSensor = getPowerSensor;