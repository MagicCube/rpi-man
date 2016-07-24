import Scene from "./Scene";

export default class MonitorScene extends Scene
{
    init()
    {
        super.init();
        this.addStyleClass("rpm-monitor-scene");

        this._initGroups();
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
            this.$("#mem-total").text(this._formatByte(this.sysInfo.machine.mem.total));
        }
        else
        {
            this.$("#mem-total").text("");
        }
    }

    get sysStatus()
    {
        return this._sysStatus;
    }
    set sysStatus(value)
    {
        this._sysStatus = value;
        this.renderStatus();
    }

    _initGroups()
    {
        this.$group(
            "CPU",
            [
                this.$cell("Usage", $(`<span id="cpu-usage"></span>`)),
                this.$cell("Speed", $(`<span id="cpu-speed"></span>`)),
                this.$cell("Temperature", $(`<span id="cpu-temperature"></span>`))
            ]
        );

        this.$group(
            "Memory",
            [
                this.$cell("Usage", $(`<span id="mem-usage"></span>`)),
                this.$cell("Free", $(`<span id="mem-free"></span>`)),
                this.$cell("Total", $(`<span id="mem-total"></span>`))
            ]
        );
    }

    active()
    {

    }

    renderStatus()
    {
        this.$("#cpu-usage").text(this._formatPercentage(this.sysStatus.cpu.usage));
        this.$("#cpu-speed").text(this._formatMHz(this.sysStatus.cpu.speed));
        this.$("#cpu-temperature").text(this._formatTemperature(this.sysStatus.cpu.temperature));

        this.$("#mem-free").text(this._formatByte(this.sysStatus.mem.free));
        this.$("#mem-usage").text(this._formatPercentage((this.sysInfo.machine.mem.total - this.sysStatus.mem.free) / this.sysInfo.machine.mem.total));
    }

    _formatPercentage(percentage)
    {
        return Math.round(percentage * 1000) / 10 + "%";
    }

    _formatTemperature(temp)
    {
        return (temp ? (Math.round(temp * 100) / 100) : 0) + "°C";
    }

    _formatByte(b)
    {
        const mb = Math.round(b / 1024 / 1024);
        return mb >= 1024 ? (parseInt(mb / 1024 * 100) / 100) + " GB" : mb + " MB";
    }

    _formatMHz(mhz)
    {
        return mhz >= 1000 ? (parseInt(mhz / 1000 * 100) / 100) + " GHz" : mhz + " MHz";
    }
}
