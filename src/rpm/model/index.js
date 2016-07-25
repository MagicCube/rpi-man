import ManagedObject from "nju/base/ManagedObject";

import api from "../api";

class Model extends ManagedObject
{
    get sysInfo()
    {
        return this._sysInfo;
    }
    set sysInfo(value)
    {
        this._sysInfo = value;
        document.title = this.sysInfo.hostname + " - Raspberry PI Manager";
        this.trigger("sysInfoChanged");
    }

    get sysStatus()
    {
        return this._sysStatus;
    }
    set sysStatus(value)
    {
        this._sysStatus = value;
        this.trigger("sysStatusChanged");
    }

    get services()
    {
        return this._services;
    }
    set services(value)
    {
        this._services = value;
        this.trigger("servicesChanged");
    }


    async load()
    {
        this.sysInfo = await api.sys.info();
        this.services = await api.service.all();
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

        this.sysStatus = await api.sys.status();
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

const model = new Model();
export default model;
