ag.ns("ag.stats");

(function(){
var
    dashboardLineChart = function(dataSourceKey, title, style)
    {
        ag.stats.DashboardChart.call(this);
        this.setHeader(title);
        this.addClass("chart line-chart");

        this.chart = new Chartist.Line(this.elem[0], {}, {
            showArea : true,
            fullWidth : true,
            lineSmooth : true,
            chartPadding : { top: 10, right: 0, bottom: -15, left: 0 },
            axisX : {
                showGrid : false,
                labelInterpolationFnc : (value, index) => index % 7 === 0 ? value : null
            },
            axisY : {
                position: "end",
                labelInterpolationFnc : ag.stats.numAbbr
            },
            low : 0
        });

        this.broker.sub(this.provider.updateEventKey, () => {
            var
                rawData = this.provider.getData(dataSourceKey) || [],
                data = {
                    labels : [],
                    series : [ { data: [], className : "ct-series-" + style } ]
                };

            rawData.forEach(point => {
                var date = new Date(point.time * 1000);
                data.labels.push(ag.ui.tool.date.format(date, ag.intl.x("day/month", "d/m")));
                data.series[0].data.push(point.data);
            });

            this.chart.update(data);
            this.addClass("loaded");
        });
    };

dashboardLineChart.prototype = Object.create(ag.stats.DashboardChart.prototype);

ag.stats.DashboardLineChart = dashboardLineChart;

})();
