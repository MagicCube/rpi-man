const fs = require("fs");
const pty = require("pty.js");

const io = require("../../socket").io;

io.sockets.on("connection", socket => {
    let term = createTerm(socket, "zsh");

    socket.on("rpiman.terminal.client.data", clientData => {
        term.write(clientData);
    });

    socket.on("disconnect", () => {
        if (term !== null)
        {
            term.destroy();
            term = null;
        }
    });
});


function createTerm(socket, sh="sh", options={})
{
    const defaultOptions = {
        name: require('fs').existsSync('/usr/share/terminfo/x/xterm+256color')
            ? 'xterm+256color'
            : 'xterm',
        cols: 80,
        rows: 24
    };
    options = Object.assign({}, options, defaultOptions);

    const term = pty.fork(sh, [], options);
    term.on("data", serverData => {
        socket.emit("rpiman.terminal.server.data", serverData);
    });
    return term;
}
