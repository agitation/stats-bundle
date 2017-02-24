ag.ns("ag.stats");

(function(){
var
    dashboardChart = function()
    {
        ag.stats.DashboardContent.call(this);
    };

dashboardChart.prototype = Object.create(ag.stats.DashboardContent.prototype);

ag.stats.DashboardChart = dashboardChart;

})();
