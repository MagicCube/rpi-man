const io = require("socket.io")();

io.sockets.on("connection", socket => {
    socket.emit("message", {
        status: 200,
        content: {
            text: "welcome"
        }
    });
});

module.exports = io;
