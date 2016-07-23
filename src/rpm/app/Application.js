import NJUApplication from "../../nju/app/Application";
import MainMenuView from "../view/MainMenuView";

export default class Application extends NJUApplication
{
    init()
    {
        super.init();
        this.addStyleClass("rpm-app");
        this._initLayout();
        this._initMainMenuView();
    }

    _initLayout()
    {
        this.$element.append(`
            <header><h1>Raspberry PI</h1></header>
            <main></main>`);
    }

    _initMainMenuView()
    {
        this.mainMenuView = new MainMenuView("main-menu");
        this.addSubview(this.mainMenuView, this.$element.children("main"));
    }
}
