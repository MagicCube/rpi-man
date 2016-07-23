import NJUApplicationController from "../../nju/app/ApplicationController";

import Application from "./Application";

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
    }

    async run()
    {
        this.sysInfo = await $.ajax({
            url: "/api/sys/info"
        });
        this.services = await $.ajax({
            url: "/api/service"
        });
    }
}
