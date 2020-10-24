const defaultGetId = (sensor) => sensor.deviceID;
const defaultIsConnected = (sensor) => sensor.deviceID !== undefined && sensor.deviceID !== 0;

const getAntSensor = (sensor, getName, getId = defaultGetId, isConnected = defaultIsConnected) => ({
    sensor,
    getName: () => getName(sensor),
    getId: () => getId(sensor),
    isConnected: () => isConnected(sensor),
});

exports.getAntSensor = getAntSensor;