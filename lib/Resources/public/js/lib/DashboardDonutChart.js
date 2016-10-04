ag.ns("ag.stats");

(function(){
var
    letters = [ "a", "b", "c", "d", "e", "f", "g", "h" ],

    dashboardDonutChart = function(dataSourceKey, title)
    {
        ag.stats.DashboardChart.call(this);
        this.setHeader(title);

        this.elem = this.find(".elem");
        this.total = this.find(".total");
        this.legend = this.find(".legend");

        this.chart = new Chartist.Pie(this.elem[0], {}, {
            showLabel: false,
            donut : true,
            donutWidth: 7,
            chartPadding : { top: 0, right: 0, bottom: 0, left: 0 },
        });

        this.provider.sub(this.provider.updateEventKey, () => {
            var
                rawData = this.provider.getData(dataSourceKey) || [],
                data = { series : [] },
                total = 0,
                labels = {};

            rawData.forEach((point, idx) => {
                labels[letters[idx]] = ag.ui.tool.fmt.out(point.name);
                data.series.push(point.num);
                total += point.num;
            });

            this.chart.update(data);
            this.setTotal(total);
            this.setLegend(ag.stats.createLegend(labels));
            this.addClass("loaded");
        });
    };

dashboardDonutChart.prototype = Object.create(ag.stats.DashboardChart.prototype);

dashboardDonutChart.prototype.nodify = function()
{
    this.extend(this, ag.ui.tool.tpl("agitstats", ".donut-chart"));
};


dashboardDonutChart.prototype.setTotal = function(total)
{
    this.total.text(ag.stats.numAbbr(total));
};

dashboardDonutChart.prototype.setLegend = function(legend)
{
    this.legend.html(legend);
};

ag.stats.DashboardDonutChart = dashboardDonutChart;

})();
