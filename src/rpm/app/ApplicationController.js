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
        this.mainMenuView.on("serviceStatusChanging", this._serviceStatusChanging.bind(this));
    }

    async run()
    {
        this.view.showLoading();
        this.sysInfo = await api.sys.info();
        this.services = await api.service.all();
        this.view.hideLoading();
    }

    async _serviceStatusChanging(e)
    {
        this.view.showMask();
        try
        {
            const result = await api.service.toggle(e.service.name, e.service.status.active);
            this.view.showToast(`${e.service.name} ${e.service.status.active ? "started" : "stopped"}`);
        }
        catch (err)
        {
            console.error(err);
            alert(`Sorry, can not ${e.service.status.active ? "start" : "stop"} service.`);
            this.services[e.service.name].active = !e.service.status.active;
            this.mainMenuView.renderServices();
            this.view.hideMask();
        }
    }
}
