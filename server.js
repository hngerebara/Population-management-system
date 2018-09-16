const express = require('express'),
    mongoose = require('mongoose'),
    winston = require('winston'),
    bodyParser = require('body-parser'),
    dbConfig = require('./config/database.config.js');
    app = express();


// Assign port and create server
const port = process.env.PORT || '3000';
app.set('port', port);


winston.info('adding middleware - body parser...');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose.Promise = global.Promise;

winston.info('Connecting to the database...');

if(process.env.NODE_ENV === 'test'){
    dbUrl = dbConfig.test.url
} else {
    dbUrl = dbConfig.development.url
}
mongoose.connect(dbUrl, {
    useNewUrlParser: true
}).then(() => {
    winston.info(`Successfully connected to the database ${dbUrl}`);    
}).catch(err => {
    winston.error('Could not connect to the database. Exiting now...');
    process.exit();
});


winston.info('Configuring routes...');
require('./server/routes/index')(app);

// Catch all other routes.
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to hopeaz sms application.',
}));



try {
    //Listen on assigned port
    app.listen(port, () => winston.info(`App running on localhost:${port}`));
} catch (e) {
    winston.error(`Error startig servers`, e);
}

module.exports = app;
