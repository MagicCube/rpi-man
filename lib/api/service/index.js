const execFile = require('child_process').execFile;
const express = require("express");

const router = express.Router();

router.post("/start-xunlei", (req, res) => {
    console.log("Starting Xunlei service...");
    execFile("service", [ "xware", "start" ], (error) => {
        if (!error)
        {
            console.log("done");
            res.send({
                successful: true
            });
        }
        else
        {
            console.error(error);
            res.send({
                successful: false,
                error
            });
        }
    });
});

router.post("/stop-xunlei", (req, res) => {
    console.log("Stopping Xunlei service...");
    execFile("service", [ "xware", "stop" ], (error) => {
        if (!error)
        {
            console.log("done");
            res.send({
                successful: true
            });
        }
        else
        {
            console.error(error);
            res.send({
                successful: false,
                error
            });
        }
    });
});

module.exports = router;
