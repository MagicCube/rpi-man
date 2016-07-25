import NJUApplication from "../../nju/app/Application";

export default class Application extends NJUApplication
{
    init()
    {
        super.init();
        this.addStyleClass("rpm-app");

        this.$container = $(`<div class="scene-container">`);
        this.$element.append(this.$container);
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
}
