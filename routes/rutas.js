const Zone = require('./zoneRouter');
const User = require('./userRouter');
const Device = require('./deviceRouter');
const Sensor = require('./sensorRouter');
const Reading = require('./readingRouter');

function routerApi(app){
 app.use('/api/Zone', Zone);
 app.use('/api/User', User);
 app.use('/api/Device', Device);
 app.use('/api/Sensor', Sensor);
 app.use('/api/Reading', Reading);
}



module.exports = routerApi;
