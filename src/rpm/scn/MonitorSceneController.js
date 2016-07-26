import MonitorScene from "./MonitorScene";
import SceneController from "./SceneController";

import api from "../api";
import model from "../model";

export default class MonitorSceneController extends SceneController
{
    get path()
    {
        return "/monitor";
    }

    createView()
    {
        return new MonitorScene();
    }

    initView()
    {
        model.on("sysInfoChanged", () => {
            this.view.sysInfo = model.sysInfo;
        });
        model.on("sysStatusChanged", () => {
            this.view.sysStatus = model.sysStatus;
        });
    }

    activate()
    {
        super.activate();
        model.startMonitorStatus();
        this.view.startChart();
    }

    deactivate()
    {
        super.deactivate();
        model.stopMonitorStatus();
        this.view.stopChart();
    }
}
