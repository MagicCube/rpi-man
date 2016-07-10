const express = require("express");
const os = require("os")

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

module.exports = router;
