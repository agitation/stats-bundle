ag.ns("ag.stats");

(function(){
var
    dashboardDataProvider = function(refreshInterval)
    {
        this.data = {};

        load.call(this);
        this.broker = ag.srv("broker");

        window.setInterval(() => {
            load.call(this);
        }, refreshInterval * 1000);
    },

    load = function()
    {
        $.get({
            url          : "/dashboard/load",
            success      : result => { this.data = result; this.broker.pub(this.updateEventKey); },
            dataType     : "json"
        });
    };

dashboardDataProvider.prototype.updateEventKey = "ag.stats.update";

dashboardDataProvider.prototype.getData = function(key)
{
    return this.data[key];
};

ag.stats.DashboardDataProvider = dashboardDataProvider;

})();
