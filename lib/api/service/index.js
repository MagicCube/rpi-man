const execFile = require('child_process').execFile;
const express = require("express");

const router = express.Router();

router.get("/:name", (req, res) => {
    const name = req.params.name;
    getServiceStatus(name).then(result => res.send(result), error => res.status(500).send({ message: error }));
});

router.post("/:name/start", (req, res) => {
    const name = req.params.name;
    startService(name).then(() => res.send({}), error => res.status(500).send({ messag: error }));
});

router.post("/:name/stop", (req, res) => {
    const name = req.params.name;
    stopService(name).then(() => res.send({}), error => res.status(500).send({ message: error }));
});




function startService(name)
{
    return new Promise((resolve, reject) => {
        console.log(`Starting [${name}] service...`);
        execFile("service", [ name, "start" ], (error, stdout, stderr) => {
            if (!error)
            {
                console.log(`[${name}] is now active.`);
                resolve();
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
                console.log(`[${name}] is now inactive.`);
                resolve();
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
    return new Promise((resolve, reject) => {
        console.log(`Querying [${name}] service status...`);
        execFile("service", [ name, "status" ], (error, stdout, stderr) => {
            if (!error)
            {
                resolve({
                    active: true
                });
            }
            else
            {
                if (error.code === 3)
                {
                    resolve({
                        active: false
                    });
                }
                else
                {
                    console.error(error);
                    reject(stderr.toString());
                }
            }
        });
    });
}


module.exports = router;
