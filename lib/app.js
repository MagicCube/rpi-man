const Express = require("express");
const os = require("os");
const osUtils = require("os-utils");

const app = Express();

app.get("/api/sys/status", (req, res) => {
    osUtils.cpuUsage(usage => {
        res.send({
            sys: {
                arch: os.arch(),
                platform: os.platform(),
                release: os.release(),
                hostname: os.hostname(),
                user: os.userInfo(),
                uptime: osUtils.sysUptime()
            },
            network: os.networkInterfaces(),
            cpu: {
                info: os.cpus(),
                usage
            },
            mem: {
                free: osUtils.freemem(),
                total: osUtils.totalmem()
            }
        });
    });
});

module.exports = app;
