import NJUApplicationController from "../../nju/app/ApplicationController";

import Application from "./Application";
import HomeSceneController from "../scn/HomeSceneController";
import MonitorSceneController from "../scn/MonitorSceneController";

import api from "../api";
import model from "../model";

export default class ApplicationController extends NJUApplicationController
{
    init()
    {
        super.init();

        this._homeSceneController = new HomeSceneController();
        this._monitorSceneController = new MonitorSceneController();

        this._initHash();
    }

    get sceneControllers()
    {
        if (!this._sceneControllers)
        {
            this._sceneControllers = {};
        }
        return this._sceneControllers;
    }

    get activeSceneController()
    {
        return this._activeSceneController;
    }

    get homeSceneController()
    {
        return this._homeSceneController;
    }

    get monitorSceneController()
    {
        return this._monitorSceneController;
    }

    createView(options)
    {
        return new Application();
    }

    async run()
    {
        this.view.showLoading();
        model.load();
        this.pushSceneController(this.homeSceneController, "/");
        this.view.hideLoading();
    }

    pushSceneController(sceneController, path)
    {
        if (this.getHashPath() === path && path === "/")
        {

        }
        else
        {
            this.setHashPath(path);
        }
        this.mapScene(path, sceneController);
        this.activateSceneController(sceneController);
    }

    activateSceneController(sceneController)
    {
        if (this.activeSceneController === sceneController)
        {
            return;
        }
        if (this.activeSceneController)
        {
            this.activeSceneController.trigger("deactivating");
            this.view.removeSubview(this.activeSceneController.view);
            this.activeSceneController.trigger("deactivated");
            this._activeSceneController = null;
        }
        this._activeSceneController = sceneController;
        sceneController.parent = this;
        this.view.title = sceneController.title;
        this.activeSceneController.trigger("activating");
        this.view.addSubview(sceneController.view);
        this.activeSceneController.trigger("activated");
    }




    _initHash()
    {
        window.addEventListener("hashchange", () => {
            const path = this.getHashPath();
            if (this.sceneControllers[path])
            {
                this.activateSceneController(this.sceneControllers[path]);
            }
        });
    }

    getHashPath()
    {
        if (location.hash === "" || location.hash === "#")
        {
            return "/";
        }
        else
        {
            return location.hash.substr(1);
        }
    }
    setHashPath(path)
    {
        location.hash = path;
    }

    mapScene(path, sceneController)
    {
        this.sceneControllers[path] = sceneController;
    }
}
