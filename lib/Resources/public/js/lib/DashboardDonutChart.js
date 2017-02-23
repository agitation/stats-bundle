ag.ns("ag.stats");

(function(){
var
    letters = [ "a", "b", "c", "d", "e", "f", "g", "h" ],

    dashboardDonutChart = function(title, updateCallback)
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

        this.broker.sub(this.provider.updateEventKey, () => {
            var
                result = updateCallback(),
                data = result.data,
                total = 0,
                labels = {};

            if (data.series.length)
            {
                this.removeClass("no-data");
                total = data.series.reduce((s1, s2) => s1 + s2);

                result.labels.forEach((label, idx) => {
                    labels[letters[idx]] = label;
                });
            }
            else
            {
                this.addClass("no-data");
                labels["0"] = ag.intl.t("(no data available yet)");
                data.series.push(1);
            }

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
