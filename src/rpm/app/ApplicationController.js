import NJUApplicationController from "nju/app/ApplicationController";

import Application from "./Application";
import HomeSceneController from "../scn/HomeSceneController";
import MonitorSceneController from "../scn/MonitorSceneController";
import SysInfoSceneController from "../scn/SysInfoSceneController";

import api from "../api";
import model from "../model";

export default class ApplicationController extends NJUApplicationController
{
    init()
    {
        super.init();

        this._homeSceneController = new HomeSceneController();
        this._monitorSceneController = new MonitorSceneController();
        this._sysInfoSceneController = new SysInfoSceneController();

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

    get sysInfoSceneController()
    {
        return this._sysInfoSceneController;
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
        this.activateSceneController(sceneController, { animation: (this.activeSceneController ? "push" : false) });
    }

    activateSceneController(sceneController, { animation = false } = {})
    {
        if (this.activeSceneController === sceneController)
        {
            return;
        }
        let viewToBeRemoved = null;
        if (this.activeSceneController)
        {
            this.activeSceneController.trigger("deactivating");
            viewToBeRemoved = this.activeSceneController.view;
            this.activeSceneController.trigger("deactivated");
            this._activeSceneController = null;
        }
        this._activeSceneController = sceneController;
        sceneController.parent = this;
        this.activeSceneController.trigger("activating");
        if (animation)
        {
            if (animation === "push")
            {
                sceneController.view.css({
                    x: window.innerWidth,
                    y: 0,
                    opacity: 0
                });
                this.view.addSubview(sceneController.view);
                sceneController.view.$element.transition({
                    x: 0,
                    opacity: 1
                }, 300, () => {
                    if (viewToBeRemoved)
                    {
                        viewToBeRemoved.removeFromParent();
                    }
                });
            }
            else
            {
                animation = false;
            }
        }
        if (!animation)
        {
            if (viewToBeRemoved)
            {
                this.view.removeSubview(viewToBeRemoved);
            }
            sceneController.view.css({
                x: 0,
                y: 0
            });
            this.view.addSubview(sceneController.view);
        }
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
