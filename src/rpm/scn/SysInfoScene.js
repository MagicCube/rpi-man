import Scene from "./Scene";

export default class SysInfoScene extends Scene
{
    init()
    {
        super.init();
        this.addStyleClass("rpm-sys-info-scene");
        this._initGroups();
    }

    get title()
    {
        return "Machine";
    }

    get sysInfo()
    {
        return this._sysInfo;
    }
    set sysInfo(value)
    {
        this._sysInfo = value;
        this.render();
    }

    _initGroups()
    {
        this.$group(null, [
            this.$cell("Host", $(`<small id="host-name"></small>`))
        ]);
        this.$group(
            "Basis",
            [
                this.$cell("CPU", $(`<small id="cpu"></small>`)),
                this.$cell("CPU count", $(`<span id="cpu-count"></span>`)),
                this.$cell("Memory size", $(`<span id="mem-total"></span>`))
            ]
        );
    }

    render()
    {
        this.$("#host-name").text(this.sysInfo.hostname);

        this.$("#cpu").text(this.sysInfo.machine.cpus.model);
        this.$("#cpu-count").text(this.sysInfo.machine.cpus.count);
        this.$("#mem-total").text(this._formatByte(this.sysInfo.machine.mem.total));

        if (this.sysInfo.machine.networks.length)
        {
            this.sysInfo.machine.networks.forEach(network => {
                const $cells = [];
                network.interfaces.forEach(i => {
                    if (i.family === "IPv4")
                    {
                        $cells.push(this.$cell("MACv4", $(`<span>${i.mac}</span>`)));
                        $cells.push(this.$cell("IPv4", $(`<span>${i.address}</span>`)));
                    }
                    else if (i.family === "IPv6")
                    {
                        $cells.push(this.$cell("MACv6", $(`<span>${i.mac}</span>`)));
                        $cells.push(this.$cell("IPv6", $(`<span>${i.address}</span>`)));
                    }
                });
                if (network.name.startsWith("en"))
                {
                    this.$group("Enthernet", $cells);
                }
                else if (network.name.startsWith("wlan") || network.name === "awdl0")
                {
                    this.$group("Wi-Fi", $cells);
                }
                else
                {
                    this.$group(network.name, $cells);
                }
            });
        }
    }


    _formatByte(b)
    {
        const mb = Math.round(b / 1024 / 1024);
        return mb >= (1024 * 0.5) ? (parseInt(mb / 1024 * 100) / 100) + " GB" : mb + " MB";
    }
}
