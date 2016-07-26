import SysInfoScene from "./SysInfoScene";
import SceneController from "./SceneController";

import model from "../model";

export default class SysInfoSceneController extends SceneController
{
    get path()
    {
        return "/sys/info";
    }

    createView()
    {
        return new SysInfoScene();
    }

    initView()
    {
        model.on("sysInfoChanged", () => {
            this.view.sysInfo = model.get("sysInfo");
        });
    }
}
