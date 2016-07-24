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
        this.mainMenuView.on("powerButtonClick", () => {
            this.showPowerActionSheet();
        });
        this.addSubview(this.mainMenuView, this.$element.children("main"));
    }


    showMask()
    {
        if (!this.$mask)
        {
            this.$mask = $(`<div class="weui_mask_transparent">`);
        }
        this.$element.append(this.$mask);
        this.$mask.show();
    }

    hideMask()
    {
        this.$mask.hide();
        this.$mask.remove();
    }

    showLoading(text = "Loading")
    {
        this.showMask();
        this.$mask.addClass("weui_loading_toast");
        this.$mask.html(`
            <div class="weui_toast">
                <div class="weui_loading">
                    <div class="weui_loading_leaf weui_loading_leaf_0"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_1"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_2"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_3"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_4"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_5"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_6"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_7"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_8"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_9"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_10"></div>
                    <div class="weui_loading_leaf weui_loading_leaf_11"></div>
                </div>
                <p class="weui_toast_content">${text}</p>
            </div>`);
    }

    hideLoading()
    {
        this.$mask.removeClass("weui_loading_toast");
        this.$mask.children().remove();
        this.hideMask();
    }

    showToast(text = "Success", duration = 1000)
    {
        this.showMask();
        this.$mask.html(`
            <div class="weui_toast">
                <i class="weui_icon_toast"></i>
                <p class="weui_toast_content">${text}</p>
            </div>`);
        if (duration !== -1)
        {
            setTimeout(() => {
                this.$mask.children().remove();
                this.hideMask();
            }, duration);
        }
    }

    showPowerActionSheet()
    {
        if (!this.$actionSheet)
        {
            this.$actionSheet = $(`
                <div class="power_action_sheet action_sheet">
                    <div class="weui_mask_transition" id="mask" style="display:block;"></div>
                    <div class="weui_actionsheet" id="actionsheet">
                        <div class="weui_actionsheet_menu">
                            <div id="reboot" class="weui_actionsheet_cell">Reboot</div>
                            <div id="shutdown" class="weui_actionsheet_cell">Shutdown</div>
                        </div>
                        <div class="weui_actionsheet_action">
                            <div class="weui_actionsheet_cell" id="cancel">Cancel</div>
                        </div>
                    </div>
                </div>
            `);
            this.$element.append(this.$actionSheet);
            this.$actionSheet.on("click", "#mask", e => {
                this.hidePowerActionSheet();
            });
            this.$actionSheet.on("click", ".weui_actionsheet_cell", e => {
                const action = e.currentTarget.id;
                if (action !== "cancel")
                {
                    this.trigger("powerAction", { action });
                }
                this.hidePowerActionSheet();
            });
        }
        setTimeout(() => {
            this.$actionSheet.find("#mask").show().addClass("weui_fade_toggle");
            this.$actionSheet.find("#actionsheet").addClass("weui_actionsheet_toggle");
        });
    }

    hidePowerActionSheet()
    {
        if (this.$actionSheet)
        {
            this.$actionSheet.find("#mask").hide().removeClass("weui_fade_toggle");
            this.$actionSheet.find("#actionsheet").removeClass("weui_actionsheet_toggle");
        }
    }
}
