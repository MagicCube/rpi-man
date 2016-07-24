import MonitorScene from "./MonitorScene";
import SceneController from "./SceneController";

import api from "../api";
import model from "../model";

export default class MonitorSceneController extends SceneController
{
    get title()
    {
        return "Monitor";
    }

    createView()
    {
        return new MonitorScene();
    }

    initView()
    {
        this.on("activated", this._onActivated.bind(this));
        this.on("deactivated", this._onDeactivated.bind(this));
        model.on("sysInfoChanged", () => {
            this.view.sysInfo = model.sysInfo;
        });
        model.on("sysStatusChanged", () => {
            this.view.sysStatus = model.sysStatus;
        });
    }

    _onActivated()
    {
        model.startMonitorStatus();
        this.view.startChart();
    }

    _onDeactivated()
    {
        model.stopMonitorStatus();
        this.view.stopChart();
    }
}
