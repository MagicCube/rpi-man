const execFile = require('child_process').execFile;
const express = require("express");
const fs = require("fs");
const os = require("os");
const osUtil = require("os-utils");

const router = express.Router();
router.get("/info", (req, res) => {
    res.send(getSysInfo());
});
router.get("/status", (req, res) => {
    geSysStatus().then(result => req.send(result));
});
router.post("/reboot", (req, res) => {
    reboot();
});
router.post("/shutdown", (req, res) => {
    shutdown();
});





function getSysInfo()
{
    const cpus = os.cpus();
    return {
        hostname: os.hostname(),
        os: {
            type: os.type(),
            platform: os.platform(),
            release: os.release()
        },
        machine: {
            arch: os.arch(),
            cpus: {
                model: cpus[0].model,
                count: cpus.length
            },
            mem: {
                total: os.totalmem()
            },
            networks: getNetworksInfo()
        }
    };
}

function getNetworksInfo()
{
    const networkInterfaces = os.networkInterfaces()
    const networks = [];
    for (let name in networkInterfaces)
    {
        const items = networkInterfaces[name];
        const interfaces = []
        for (let index in items)
        {
            const item = items[index];
            if (!item.internal)
            {
                interfaces.push({
                    name,
                    mac: item.mac,
                    family: item.family,
                    address: item.address,
                    netmask: item.netmask
                });
            }
        }
        if (interfaces.length)
        {
            networks.push({
                name,
                interfaces
            });
        }
    }
    return networks;
}

function geSysStatus()
{
    return new Promise((resolve, reject) => {
        let temp = getCpuTemperature();
        osUtil.cpuUsage(usage => {
            resolve({
                cpu: {
                    usage,
                    temperature: temp
                },
                mem: {
                    free: os.freemem()
                }
            });
        });
    });
}

function reboot()
{
    execFile("reboot");
}

function shutdown()
{
    execFile("shutdown", [ "-h", "now" ]);
}

function getCpuTemperature()
{
    let temp = undefined;
    const tempFile = "/sys/class/thermal/thermal_zone0/temp";
    if (fs.existsSync(tempFile))
    {
        try {
            temp = parseInt(fs.readFileSync(tempFile).toString());
        } catch (e) { }
    }
    return temp;
}


module.exports = router;
