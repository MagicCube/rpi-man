import View from "../../nju/view/View";

export default class MainMenuView extends View
{
    init()
    {
        super.init();
        this.addStyleClass("rpm-main-menu-view");
        this._initInfoGroup();
        this._initServiceGroup();
        this._initPowerButton();
    }


    _initInfoGroup()
    {
        this._$group(
            "System info",
            [
                this._$cell("Host name", $(`<div id="hostname"></div>`))
            ]
        );
    }

    _initServiceGroup()
    {
        this.$serviceGroup = this._$group(
            "Services",
            [
                this._$checkBoxCell("Bluetooth", "bluetooth"),
                this._$checkBoxCell("VNC", "vnc"),
                this._$checkBoxCell("Xware", "xware")
            ]
        ).addClass("weui_cells_form");
        this.$serviceGroup.on("change", ".weui_switch", e => {
            const active = e.currentTarget.checked
            this.trigger("serviceStatusChanging", {
                service: {
                    name: e.currentTarget.id,
                    status: {
                        active: e.currentTarget.checked
                    }
                }
            });
        });
    }

    _initPowerButton()
    {
        this._$button("Power").on("click", () => {
            this.trigger("powerButtonClick");
        });
    }


    get sysInfo()
    {
        return this._sysInfo;
    }
    set sysInfo(value)
    {
        this._sysInfo = value;
        if (this._sysInfo)
        {
            this.$("#hostname").text(this._sysInfo.hostname);
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



    _$group(title, $childCells)
    {
        const $group = $(`<div class="group"/>`);
        this.$element.append($group);

        const $title = $(`<div class="weui_cells_title">${title}</div>`);
        $group.append($title);

        const $cells = $(`<div class="weui_cells"></div>`);
        $group.append($cells);

        if ($childCells)
        {
            if (!Array.isArray($childCells))
            {
                $childCells = [ $childCells ];
            }
            $childCells.forEach($childCell => {
                $cells.append($($childCell));
            });
        }
        return $group;
    }

    _$cell(title, $content)
    {
        const $cell = $(`<div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
                <p>${title}</p>
            </div>
            <div class="weui_cell_ft"></div>
        </div>`);
        if ($content)
        {
            const $ft = $cell.children(".weui_cell_ft");
            $ft.append($($content));
        }
        return $cell;
    }

    _$checkBoxCell(title, id)
    {
        const $checkBox = $(`<input id="${id}" class="weui_switch" type="checkbox" />`);
        const $cell = this._$cell(title, $checkBox);
        return $cell;
    }

    _$button(title)
    {
        const $button = $(`<a class="weui_btn weui_btn_primary" href="javascript:">${title}</a>`);
        const $area = $(`<div class="weui_btn_area"></div>`);
        $area.append($button);
        this.$element.append($area);
        return $button;
    }
}
