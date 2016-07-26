import EventEmitter from "wolfy87-eventemitter";

export default class ManagedObject
{
    constructor(id = null)
    {
        this._id = id;
        this._parent = null;
        this._eventEmitter = null;
        this.init();
    }

    init()
    {

    }

    get id()
    {
        return this._id;
    }

    get parent()
    {
        return this._parent;
    }
    set parent(value)
    {
        this._parent = value;
    }

    get eventEmitter()
    {
        if (!this._eventEmitter)
        {
            this._eventEmitter = new EventEmitter();
        }
        return this._eventEmitter;
    }


    on(type, listener)
    {
        this.eventEmitter.on(type, listener);
        return this;
    }

    off(type, listener)
    {
        this.eventEmitter.off(type, listener);
        return this;
    }

    trigger(type, parameters = {})
    {
        parameters.type = type;
        parameters.target = this;
        this.eventEmitter.trigger(type, [ parameters ]);
    }
}
