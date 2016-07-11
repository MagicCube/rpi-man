const express = require("express");
const fs = require("fs");
const os = require("os");
const osUtil = require("os-utils");

const router = express.Router();

router.get("/info", (req, res) => {
    const cpus = os.cpus();

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


    res.send({
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
            networks
        }
    });
});


router.get("/status", (req, res) => {
    let temp = getCpuTemperature();
    osUtil.cpuUsage(usage => {
        res.send({
            cpu: {
                usage,
                temp
            },
            mem: {
                free: os.freemem()
            }
        });
    });
});

function getCpuTemperature()
{
    let temp = undefined;
    const tempFile = "/sys/class/thermal/thermal_zone0/temp";
    if (fs.existsSync(tempFile))
    {
        try {
            temp = parseInt(fs.readSync(tempFile).toString());
        } catch (e) { }
    }
    return temp;
}


module.exports = router;
