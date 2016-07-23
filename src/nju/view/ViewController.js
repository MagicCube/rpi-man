import ManagedObject from "../base/ManagedObject";
import View from "./View";

export default class ViewController extends ManagedObject
{
    constructor(id, options = {})
    {
        super(id);
        this._view = this.createView(options);
        this.initView(options);
    }

    get view()
    {
        return this._view;
    }




    createView(options)
    {
        throw new Error("createView(options) must be override in the derived class.");
    }

    initView(options)
    {
        this.applyViewOptions(options);
    }

    applyViewOptions(options = {})
    {
        for (let key in options)
        {
            this.view[key] = options[key];
        }
    }
}
