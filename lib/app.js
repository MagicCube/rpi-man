const Express = require("express");
const osUtils = require("os-utils");

const app = Express();

app.get("/api/sys/status", (req, res) => {
    osUtils.cpuUsage(usage => {
        res.send({
            sys: {
                uptime: osUtils.sysUptime()
            },
            cpu: {
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
