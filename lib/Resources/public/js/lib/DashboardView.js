ag.ns("ag.stats");

(function(){
var
    dashboardView = function(columns)
    {
        ag.ui.ctxt.View.call(this, columns);
        this.addClass("dashboard");
    };

dashboardView.prototype = Object.create(ag.ui.ctxt.View.prototype);

ag.stats.DashboardView = dashboardView;

})();
