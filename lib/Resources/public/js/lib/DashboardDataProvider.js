ag.ns("ag.stats");

(function(){
var
    dashboardDataProvider = function(refreshInterval)
    {
        this.data = {};

        load.call(this);

        // var updateListener = window.setInterval(() => {
        //     load.call(this);
        // }, refreshInterval * 1000);
    },

    load = function()
    {
        $.get({
            url          : "/dashboard/load",
            success      : result => { this.data = result; this.pub(this.updateEventKey); },
            dataType     : "json"
        });
    };

dashboardDataProvider.prototype = Object.create(ag.common.PubSub.prototype);

dashboardDataProvider.prototype.updateEventKey = "ag.stats.update";

dashboardDataProvider.prototype.getData = function(key)
{
    return this.data[key];
};

ag.stats.DashboardDataProvider = dashboardDataProvider;

})();
