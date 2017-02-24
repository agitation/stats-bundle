ag.ns("ag.stats");

(function(){
var
    dashboardLineChart = function(title)
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
    };

dashboardLineChart.prototype = Object.create(ag.stats.DashboardChart.prototype);

dashboardLineChart.prototype.update = function(data)
{
    this.chart.update(data);
    this.addClass("loaded");
};

ag.stats.DashboardLineChart = dashboardLineChart;

})();
