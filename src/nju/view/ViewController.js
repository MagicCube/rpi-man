import ManagedObject from "../base/ManagedObject";
import View from "./View";

export default class ViewController extends ManagedObject
{
    constructor(id, options = {})
    {
        super(id);
        this._childViewControllers = [];
        this._view = this.createView(options);
        this.initView(options);
    }

    get view()
    {
        return this._view;
    }

    get childViewControllers()
    {
        return this._childViewControllers;
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




    addChildViewController(viewController, $container)
    {
        if (viewController instanceof ViewController)
        {
            if (viewController.parent)
            {
                viewController.removeFromParent();
            }
            viewController._parent = this;
            this.childViewControllers.push(viewController);
            this.view.addSubview(viewController.view, $container);
        }
    }

    removeChildViewController(viewController, neverUseAgain = false)
    {
        const index = this.childViewControllers.indexOf(viewController);
        if (index !== -1)
        {
            viewController._parent = null;
            this.childViewControllers.splice(index, 1);
            this.view.removeSubview(viewController.view, neverUseAgain);
        }
    }

    removeAllChildViewControllers(neverUseAgain = false)
    {
        while (this.childViewControllers.length > 0)
        {
            this.removeChildViewController(this.childViewControllers[0], neverUseAgain);
        }
    }

    removeFromParent()
    {
        if (this.parent)
        {
            this.parent.removeChildViewController(this);
        }
    }
}
