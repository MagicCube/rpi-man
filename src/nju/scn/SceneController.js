import ViewController from "nju/view/ViewController";

export default class SceneController extends ViewController
{
    get path()
    {
        return null;
    }

    activate()
    {
        this.trigger("activated");
    }

    deactivate()
    {
        this.trigger("deactivated");
    }
}
