import HomeScene from "./HomeScene";
import SceneController from "./SceneController";

import api from "../api";
import model from "../model";

export default class HomeSceneController extends SceneController
{
    createView()
    {
        return new HomeScene();
    }

    initView()
    {
        this.view.on("monitorClick", this._onMonitorClick.bind(this));
        this.view.on("serviceStatusChanging", this._onServiceStatusChanging.bind(this));
        this.view.on("powerActionClick", this._onPowerActionClick.bind(this));

        model.on("sysInfoChanged", () => {
            this.view.sysInfo = model.sysInfo;
        });

        model.on("servicesChanged", () => {
            this.view.services = model.services;
        });
    }


    async _onServiceStatusChanging(e)
    {
        this.showMask();
        try
        {
            const result = await api.service.toggle(e.service.id, e.service.status.active);
            this.showToast(`${e.service.name} ${e.service.status.active ? "started" : "stopped"}`);
        }
        catch (err)
        {
            console.error(err);
            alert(`Sorry, can not ${e.service.status.active ? "start" : "stop"} ${e.service.name} service right now.`);
            model.services[e.service.id].active = !e.service.status.active;
            this.view.renderServices();
            this.hideMask();
        }
    }

    async _onPowerActionClick(e)
    {
        if (e.action === "shutdown")
        {
            await api.sys.shutdown();
            this.showToast("Bye", -1);
        }
        else if (e.action === "reboot")
        {
            await api.sys.reboot();
            this.showLoading("Rebooting");
            setTimeout(() => {
                window.location.reload(true);
            }, 30 * 1000);
        }
    }

    _onMonitorClick()
    {
        this.parent.pushSceneController(this.parent.monitorSceneController, "/monitor");
    }
}
