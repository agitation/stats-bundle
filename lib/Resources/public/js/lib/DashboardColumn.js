ag.ns("ag.stats");

(function(){
var
    dashboardColumn = function(className, widgets)
    {
        this.nodify();
        this.addClass(className);
        Object.keys(widgets).forEach(id => this.append(widgets[id]));
    };

dashboardColumn.prototype = Object.create(ag.ui.ctxt.Block.prototype);

dashboardColumn.prototype.nodify = function()
{
    this.extend(this, ag.ui.tool.tpl("agitstats", ".column"));
};

ag.stats.DashboardColumn = dashboardColumn;

})();
