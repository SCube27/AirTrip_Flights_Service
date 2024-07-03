const express = require('express');
const bodyParser = require('body-parser');

const { serverConfig } = require("./config/index");
const apiRouter = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());

app.use('/api', apiRouter);

app.listen(serverConfig.PORT, (req, res) => {
    console.log(`Server started at PORT ${serverConfig.PORT}`);
});
