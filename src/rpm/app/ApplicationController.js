import NJUApplicationController from "../../nju/app/ApplicationController";

import Application from "./Application";

import api from "../api";

export default class ApplicationController extends NJUApplicationController
{
    init()
    {
        super.init();
    }

    get sysInfo()
    {
        return this._sysInfo;
    }
    set sysInfo(value)
    {
        this._sysInfo = value;
        document.title = this.sysInfo.hostname + " - Raspberry PI Manager";
        this.mainMenuView.sysInfo = this.sysInfo;
    }

    get services()
    {
        return this._services;
    }
    set services(value)
    {
        this._services = value;
        this.mainMenuView.services = this.services;
    }

    createView(options)
    {
        return new Application();
    }

    initView()
    {
        this.mainMenuView = this.view.mainMenuView;
        this.view.on("powerAction", this._onPowerAction.bind(this));
        this.mainMenuView.on("serviceStatusChanging", this._onServiceStatusChanging.bind(this));
    }

    async run()
    {
        this.view.showLoading();
        this.sysInfo = await api.sys.info();
        this.services = await api.service.all();
        this.view.hideLoading();
    }

    async _onServiceStatusChanging(e)
    {
        this.view.showMask();
        try
        {
            const result = await api.service.toggle(e.service.id, e.service.status.active);
            this.view.showToast(`${e.service.name} ${e.service.status.active ? "started" : "stopped"}`);
        }
        catch (err)
        {
            console.error(err);
            alert(`Sorry, can not ${e.service.status.active ? "start" : "stop"} ${e.service.name} service right now.`);
            this.services[e.service.id].active = !e.service.status.active;
            this.mainMenuView.renderServices();
            this.view.hideMask();
        }
    }

    async _onPowerAction(e)
    {
        if (e.action === "shutdown")
        {
            await api.sys.shutdown();
            this.view.showToast("Bye", -1);
        }
        else if (e.action === "reboot")
        {
            await api.sys.reboot();
            this.view.showLoading("Rebooting");
            setTimeout(() => {
                window.location.reload(true);
            }, 30 * 1000);
        }
    }
}
