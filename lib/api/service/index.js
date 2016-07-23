const execFile = require('child_process').execFile;
const express = require("express");

const router = express.Router();

router.post("/:name/start", (req, res) => {
    const name = req.params.name;
    startService(name).then(result => res.send(result), result => res.send(result));
});

router.post("/:name/stop", (req, res) => {
    const name = req.params.name;
    stopService(name).then(result => res.send(result), result => res.send(result));
});




startService(name)
{
    return new Promise((resolve, reject) => {
        console.log(`Starting [${name}] service...`);
        execFile("service", [ name, "start" ], (error, stdout, stderr) => {
            if (!error)
            {
                console.log(`[${name}] is now active.`);
                resolve({
                    successful: true
                });
            }
            else
            {
                console.error(error);
                reject({
                    successful: false,
                    stderr,
                    error
                });
            }
        });
    });
}

stopService(name)
{
    return new Promise((resolve, reject) => {
        console.log(`Stopping [${name}] service...`);
        execFile("service", [ name, "stop" ], (error, stdout, stderr) => {
            if (!error)
            {
                console.log(`[${name}] is now inactive.`);
                resolve({
                    successful: true
                });
            }
            else
            {
                console.error(error);
                reject({
                    successful: false,
                    stderr,
                    error
                });
            }
        });
    });
}

module.exports = router;
