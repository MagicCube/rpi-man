import View from "nju/view/View";

export default class Scene extends View
{
    init()
    {
        super.init();
        this.addStyleClass("rpm-scene");
        this.initLayout();
    }

    initLayout()
    {
        this.$element.append(`
            <header><h1>${this.title}</h1></header>
            <main></main>`);
        this.$container = this.$element.children("main");
    }



    get title()
    {
        return "";
    }


    $group(title, $childCells)
    {
        const $group = $(`<div class="rpm-scene-group"/>`);
        this.$element.append($group);

        if (title)
        {
            const $title = $(`<div class="weui_cells_title">${title}</div>`);
            $group.append($title);
        }

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

    $cell(title, $content)
    {
        const $cell = $(`<div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary">
                ${title ? "<p>" + title + "</p>" : ""}
            </div>
        </div>`);
        if ($content !== undefined)
        {
            const $ft = $(`<div class="weui_cell_ft"></div>`);
            $cell.append($ft);
            $ft.append($($content));
        }
        return $cell;
    }

    $checkBoxCell(title, id)
    {
        const $checkBox = $(`<input id="${id}" class="weui_switch" type="checkbox" title="${title}" />`);
        const $cell = this.$cell(title, $checkBox);
        return $cell;
    }

    $button(title, type="primary")
    {
        const $button = $(`<a class="weui_btn weui_btn_${type}" href="javascript:">${title}</a>`);
        const $area = $(`<div class="weui_btn_area"></div>`);
        $area.append($button);
        this.$element.append($area);
        return $button;
    }
}
