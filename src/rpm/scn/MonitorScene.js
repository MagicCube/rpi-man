import Scene from "./Scene";

import smoothie from "smoothie";
const SmoothieChart = smoothie.SmoothieChart;
const TimeSeries = smoothie.TimeSeries;

export default class MonitorScene extends Scene
{
    init()
    {
        super.init();
        this.addStyleClass("rpm-monitor-scene");

        this._initGroups();
        this._initCharts();
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
                this.$cell().attr("id", "cpu-chart-container").addClass("chart-container"),
                this.$cell("Speed", $(`<span id="cpu-speed"></span>`)),
                this.$cell("Temperature", $(`<span id="cpu-temperature"></span>`))
            ]
        );

        this.$group(
            "Memory",
            [
                this.$cell("Usage", $(`<span id="mem-usage"></span>`)),
                this.$cell().attr("id", "mem-chart-container").addClass("chart-container"),
                this.$cell("Free", $(`<span id="mem-free"></span>`)),
                this.$cell("Total", $(`<span id="mem-total"></span>`))
            ]
        );
    }

    _initCharts()
    {
        let $canvas = $(`<canvas width="345" height="85" />`);
        this.$("#cpu-chart-container").append($canvas);
        const grid = {
            fillStyle: 'transparent',
            strokeStyle: 'rgba(128,128,128,0.2)'
        };
        const style = {
            minValue: 0,
            maxValueScale: 1.4,
            yMinFormatter: y => parseInt(y) + "%",
            yMaxFormatter: y => parseInt(y) + "%",
            yRangeFunction: range => {
                if (range.max > 100)
                {
                    range.max = 100;
                }
                range.max = parseInt(range.max / 10) * 10;
                if (range.max <= 10)
                {
                    range.max = 10;
                }
                return range;
            },
            grid,
            labels: { fillStyle: "rgba(0, 0, 0, 0.5)" }
        };
        let chart = new SmoothieChart(style);
        chart.streamTo($canvas[0]);
        this._cpuTimeSeries = new TimeSeries();
        chart.addTimeSeries(this._cpuTimeSeries, {lineWidth:2,strokeStyle:'#ff0000',fillStyle:'rgba(240,150,92,0.30)'});
        this._cpuChart = chart;

        $canvas = $(`<canvas width="345" height="85" />`);
        this.$("#mem-chart-container").append($canvas);
        chart = new SmoothieChart(style);
        chart.streamTo($canvas[0]);
        this._memTimeSeries = new TimeSeries();
        chart.addTimeSeries(this._memTimeSeries, {lineWidth:2,strokeStyle:'#00ff00',fillStyle:'rgba(150,230,92,0.30)'});
        this._memChart = chart;

        this.stopChart();
    }

    renderStatus()
    {
        this._cpuTimeSeries.append(this.sysStatus.timestamp, Math.round(this.sysStatus.cpu.usage * 1000) / 10);
        this._memTimeSeries.append(this.sysStatus.timestamp, Math.round((this.sysInfo.machine.mem.total - this.sysStatus.mem.free) / this.sysInfo.machine.mem.total * 100));

        this.$("#cpu-usage").text(this._formatPercentage(this.sysStatus.cpu.usage));
        this.$("#cpu-speed").text(this._formatMHz(this.sysStatus.cpu.speed));
        this.$("#cpu-temperature").text(this._formatTemperature(this.sysStatus.cpu.temperature));

        this.$("#mem-free").text(this._formatByte(this.sysStatus.mem.free));
        this.$("#mem-usage").text(this._formatPercentage((this.sysInfo.machine.mem.total - this.sysStatus.mem.free) / this.sysInfo.machine.mem.total));
    }

    startChart()
    {
        this.chartRunning = true;
        if (this._cpuChart)
        {
            this._cpuChart.start();
        }
        if (this._memChart)
        {
            this._memChart.start();
        }
    }

    stopChart()
    {
        this.chartRunning = false;
        if (this._cpuChart)
        {
            this._cpuChart.stop();
            this._cpuTimeSeries.clear();
        }

        if (this._memChart)
        {
            this._memChart.stop();
            this._memTimeSeries.clear();
        }
    }

    _formatPercentage(percentage)
    {
        return Math.round(percentage * 1000) / 10 + " %";
    }

    _formatTemperature(temp)
    {
        return temp ? ((Math.round(temp / 1000 * 100) / 100) + " °C") : "N/A";
    }

    _formatByte(b)
    {
        const mb = Math.round(b / 1024 / 1024);
        return mb >= (1024 * 0.5) ? (parseInt(mb / 1024 * 100) / 100) + " GB" : mb + " MB";
    }

    _formatMB(b)
    {
        const mb = Math.round(b / 1024 / 1024);
        return mb;
    }

    _formatMHz(mhz)
    {
        return mhz >= 1000 ? (parseInt(mhz / 1000 * 100) / 100) + " GHz" : mhz + " MHz";
    }
}
