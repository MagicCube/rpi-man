const express = require("express");
const os = require("os")

const router = express.Router();

router.get("/info", (req, res) => {
    const networkInterfaces = os.networkInterfaces()
    const networks = [];
    for (let name in networkInterfaces)
    {
        const items = networkInterfaces[name];
        for (let index in items)
        {
            const item = items[index];
            if (!item.internal)
            {
                networks.push({
                    name,
                    address: item.address,
                    netmask: item.netmask,
                    family: item.family,
                    mac: item.mac
                });
                break;
            }
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
            cpus: os.cpus().map(cpu => ({ model: cpu.model, speed: cpu.speed })),
            mem: {
                total: os.totalmem()
            },
            networks
        }
    });
});

module.exports = router;
