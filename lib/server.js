const http = require("http");

/**
 * Modules
 */
const app = require("./app");
const socket = require("./socket");


/**
 * Server
 */
const server = http.createServer(app);
socket.io.listen(server, {
    log: false
});

/**
 * Event listener for HTTP server "error" event.
 */
server.onError = function(error) {
    if (error.syscall !== "listen") {
        console.error(error);
    }

    const bind = typeof port === "string"
        ? "Pipe " + port
        : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code)
    {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            console.error(error);
    }
};

/**
 * Event listener for HTTP server "listening" event.
 */
server.onListening = function()
{
    const addr = server.address();
    const bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port;
    console.log("rpi-man is now listening on " + bind);
};

server.on("error", server.onError);
server.on("listening", server.onListening);

module.exports = server;
