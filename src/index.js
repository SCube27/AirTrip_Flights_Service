const express = require('express');
const bodyParser = require('body-parser');

const { serverConfig } = require("./config/index");
const apiRouter = require('./routes');
const { errorHandler } = require("./utils/index");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());

app.use('/api', apiRouter);

app.use(errorHandler);

app.listen(serverConfig.PORT, (req, res) => {
    console.log(`Server started at PORT ${serverConfig.PORT}`);
});
