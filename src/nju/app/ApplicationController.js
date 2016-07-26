import Application from "./Application";
import ViewController from "../view/ViewController";

export default class ApplicationController extends ViewController
{
    static _instance = null;

    constructor(...args)
    {
        super(...args);
        if (ApplicationController._instance === null)
        {
            ApplicationController._instance = this;
        }
        else
        {
            throw new Error("ApplicationController is a singleton object. It can only be constructed once.");
        }
    }

    static getInstance()
    {
        if (!ApplicationController._instance)
        {
            throw new Error("ApplicationController has not been instantiated yet.");
        }
        return ApplicationController._instance;
    }

    run()
    {

    }
}
