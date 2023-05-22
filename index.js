var express = require("express");

var cors = require("cors");
const appConfig = require("./config/app-config.json");
const path = require("path");

const mainRoute = require("./routes/main");

var app = express();

const PORT = process.env.PORT || appConfig.port;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors());

app.use("/main", mainRoute);
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(PORT, () => {
    console.log("server started at port" + PORT);
});