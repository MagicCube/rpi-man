const API_PATH = "/api";

export default {
    sys: {
        async info()
        {
            return await $.ajax({
                url: `${API_PATH}/sys/info`
            });
        },

        async status()
        {
            return await $.ajax({
                url: `${API_PATH}/sys/status`
            });
        },

        async shutdown()
        {
            return await $.ajax({
                method: "post",
                url: `${API_PATH}/sys/shutdown`
            });
        },

        async reboot()
        {
            return await $.ajax({
                method: "post",
                url: `${API_PATH}/sys/reboot`
            });
        }
    },


    service: {
        async all()
        {
            return await $.ajax({
                url: `${API_PATH}/service`
            });
        },

        async toggle(name, active)
        {
            return await $.ajax({
                method: "post",
                url: `${API_PATH}/service/${name}/${active ? "start" : "stop"}`
            });
        },

        async start(name)
        {
            return this.toggle(name, false);
        },

        async stop(name)
        {
            return this.toggle(name, false);
        }
    }
};
