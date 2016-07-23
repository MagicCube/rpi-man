import View from "../view/View";

export default class Application extends View
{
    static _instance = null;

    constructor(...args)
    {
        super(...args);
        if (Application._instance === null)
        {
            Application._instance = this;
        }
        else
        {
            throw new Error("Application is a singleton object. It can only be constructed once.");
        }
    }

    static getInstance()
    {
        if (!Application._instance)
        {
            throw new Error("Application has not been instantiated yet.");
        }
        return Application._instance;
    }

    init()
    {
        super.init();
        this.addStyleClass("nju-app");
    }
}
