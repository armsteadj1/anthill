const Ant = require('gd-ant-plus');

const tryOpen = (stick, stickid) => () => {
  let token = stick.openAsync((err) => {
    token = null;
    if (err) {
      console.error(stickid, err);
    } else {
      console.log(stickid, 'Stick found');
    }
  });
};

const closeStick = (stick) => () => stick.close();

const onStartup = ({stick, stickid, setIsUp}) => (sensors) => {
  stick.on('startup', function() {
    console.log(stickid, 'startup');

    console.log(stickid, 'Max channels:', stick.maxChannels);

    setIsUp();
  });
}

const getStick = () => {
  const objects = {
    stick: new Ant.GarminStick2(),
    stickId: 1
  };

  objects.setIsUp = () => objects.isUp = true;
  objects.tryOpen = tryOpen(objects.stick, objects.stickId);
  objects.closeStick = closeStick(objects.stick);
  objects.onStartup = onStartup(objects);


  objects.stick.on('shutdown', function() { console.log(1, 'shutdown'); });

  return objects;
};

exports.getStick = getStick;