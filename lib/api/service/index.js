const execFile = require('child_process').execFile;
const execFileSync = require('child_process').execFileSync;
const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    res.send({
        bluetooth: getServiceStatus("bluetooth"),
        vnc: getServiceStatus("vnc"),
        xware: getServiceStatus("xware"),
    });
});
router.post("/:name/start", (req, res) => {
    const name = req.params.name;
    startService(name).then(result => res.send(result), error => res.status(500).send({ messag: error }));
});
router.post("/:name/stop", (req, res) => {
    const name = req.params.name;
    stopService(name).then(result => res.send(result), error => res.status(500).send({ message: error }));
});





function startService(name)
{
    return new Promise((resolve, reject) => {
        console.log(`Starting [${name}] service...`);
        execFile("service", [ name, "start" ], (error, stdout, stderr) => {
            if (!error)
            {
                resolve(getServiceStatus(name));
            }
            else
            {
                console.error(error);
                reject(stderr.toString());
            }
        });
    });
}

function stopService(name)
{
    return new Promise((resolve, reject) => {
        console.log(`Stopping [${name}] service...`);
        execFile("service", [ name, "stop" ], (error, stdout, stderr) => {
            if (!error)
            {
                resolve(getServiceStatus(name));
            }
            else
            {
                console.error(error);
                reject(stderr.toString());
            }
        });
    });
}

function getServiceStatus(name)
{
    try
    {
        execFileSync("service", [ name, "status" ]);
        return {
            active: true
        };
    }
    catch (e)
    {
        return {
            active: false
        };
    }
}

module.exports = router;
