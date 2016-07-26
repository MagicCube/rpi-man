import SuperModel from "nju/model/Model";

import api from "../api";

class Model extends SuperModel
{
    constructor(...args)
    {
        super(...args);
        this.define("sysInfo", Object);
        this.define("sysStatus", Object);
        this.define("services", Object);
    }

    async load()
    {
        this.set("sysInfo", await api.sys.info());
        this.set("services", await api.service.all());
    }

    startMonitorStatus()
    {
        this._statusMonitoring = true;
        this._monitorStatusLoop();
    }

    stopMonitorStatus()
    {
        this._statusMonitoring = false;
    }

    async _monitorStatusLoop()
    {
        if (!this._statusMonitoring) return;

        this.set("sysStatus", await api.sys.status());
        if (this._statusMonitoring)
        {
            window.setTimeout(() => {
                if (this._statusMonitoring)
                {
                    this._monitorStatusLoop();
                }
            }, 1000);
        }
    }
}

const modelProxy = SuperModel.createProxy(Model);
export default modelProxy;
