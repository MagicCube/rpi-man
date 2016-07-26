import View from "nju/view/View";

export default class Scene extends View
{
    init()
    {
        super.init();
        this.addStyleClass("nju-scene");
    }

    get title()
    {
        return "";
    }
}
