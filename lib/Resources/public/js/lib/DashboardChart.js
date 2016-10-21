ag.ns("ag.stats");

(function(){
var
    dashboardChart = function()
    {
        ag.stats.DashboardContent.call(this);
        this.provider = ag.srv("dashboard");
        this.broker = ag.srv("broker");
    };

dashboardChart.prototype = Object.create(ag.stats.DashboardContent.prototype);

ag.stats.DashboardChart = dashboardChart;

})();
