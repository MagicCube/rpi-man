import ManagedObject from "../base/ManagedObject";

export default class Model extends ManagedObject
{
    constructor(id)
    {
        super(id);
        this._properties = {};
        this._data = {};
    }

    get properties()
    {
        return this._properties;
    }

    get keys()
    {
        return Object.keys(this._properties);
    }

    get data()
    {
        return this._data;
    }

    static createProxy(type = Model)
    {
        const model = new type();
        return Model.createProxyOfInstance(model);
    }

    static createProxyOfInstance(model)
    {
        const proxy = new Proxy(model, {
            get: (target, key) => {
                if (typeof(target[key]) === "function")
                {
                    return target[key].bind(target);
                }
                return target.get(key);
            },
            set: (target, key, value) => {
                target.set(key, value);
            },
            has: (target, key) => {
                return target.has(key);
            },
            deleteProperty: (target, key) => {
                target.unset(key);
            }
        });
        return proxy;
    }

    define(key, type = String, defaultValue = null)
    {
        if (this.has(key))
        {
            throw new Error(`Property ${key} has been already defined.`);
        }
        this._properties[key] = {
            key,
            type,
            defaultValue
        };
    }

    get(key)
    {
        if (this.has(key))
        {
            if (key in this._data)
            {
                return this._data[key];
            }
            else
            {
                return this._properties[key].defaultValue;
            }
        }
        else
        {
            throw new Error(`Property ${key} is not defined.`);
        }
    }

    set(key, value)
    {
        if (!this.has(key))
        {
            throw new Error(`Property ${key} is not defined.`);
        }

        if (this.isEqual(key, value, this.get(key)))
        {
            return;
        }

        this.validate(key, value);

        this._data[key] = value;
        this.trigger(key + "Changed");
    }

    has(key)
    {
        return key in this._properties;
    }

    unset(key)
    {
        delete this._properties[key];
        delete this._data[key];
    }




    validate(key, value)
    {
        const def = this._properties[key];
        if (!(value instanceof def.type))
        {
            throw new Error(`Invalid type of value for property ${key}.`);
        }
    }

    isEqual(key, a, b)
    {
        return a === b;
    }
}
