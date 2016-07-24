import ViewController from "../../nju/view/ViewController";

export default class SceneController extends ViewController
{
    get title()
    {
        throw new Error("'title' property must be implemented in derived class.");
    }

    showMask(...args)
    {
        if (this.view && this.view.parent)
        {
            this.view.parent.showMask(...args);
        }
    }

    hideMask(...args)
    {
        if (this.view && this.view.parent)
        {
            this.view.parent.hideMask(...args);
        }
    }

    showLoading(...args)
    {
        if (this.view && this.view.parent)
        {
            this.view.parent.showLoading(...args);
        }
    }

    hideLoading(...args)
    {
        if (this.view && this.view.parent)
        {
            this.view.parent.hideLoading(...args);
        }
    }

    showToast(...args)
    {
        if (this.view && this.view.parent)
        {
            this.view.parent.showToast(...args);
        }
    }
}
