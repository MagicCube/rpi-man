import Scene from "./Scene";

export default class HomeScene extends Scene
{
    init()
    {
        super.init();
        this.addStyleClass("rpm-home-scene");
        this._initInfoGroup();
        this._initServiceGroup();
        this._initPowerButton();
    }

    _initInfoGroup()
    {
        this.$group(
            "System",
            [
                this.$cell("Machine", $(`<span id="hostname" style="font-size:14px;"></span>`)).on("click", () => {
                    this.trigger("machineClick");
                }),
                this.$cell("Monitor", "").on("click", () => {
                    this.trigger("monitorClick");
                })
            ]
        ).addClass("weui_cells_access");
    }

    _initServiceGroup()
    {
        this.$serviceGroup = this.$group(
            "Services",
            [
                this.$checkBoxCell("Bluetooth", "bluetooth"),
                this.$checkBoxCell("CoAP", "coap"),
                this.$checkBoxCell("VNC", "vnc"),
                this.$checkBoxCell("Xware", "xware"),
            ]
        ).addClass("weui_cells_form");
        this.$serviceGroup.on("change", ".weui_switch", e => {
            const active = e.currentTarget.checked
            this.trigger("serviceStatusChanging", {
                service: {
                    id: e.currentTarget.id,
                    name: e.currentTarget.title,
                    status: {
                        active: e.currentTarget.checked
                    }
                }
            });
        });
    }

    _initPowerButton()
    {
        this.$button("Power off", "warn").on("click", () => {
            this.showPowerActionSheet();
        });
    }


    get title()
    {
        return "Home";
    }



    get sysInfo()
    {
        return this._sysInfo;
    }
    set sysInfo(value)
    {
        this._sysInfo = value;
        if (this.sysInfo)
        {
            this.$("#hostname").text(this.sysInfo.hostname);
        }
        else
        {
            this.$("#hostname").text("");
        }
    }

    get services()
    {
        return this._services;
    }
    set services(value)
    {
        this._services = value;
        this.renderServices();
    }



    renderServices()
    {
        if (this.services)
        {
            for (let name in this.services)
            {
                this.$("input.weui_switch#" + name)[0].checked = this.services[name].active;
            }
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
                    this.trigger("powerActionClick", { action });
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
