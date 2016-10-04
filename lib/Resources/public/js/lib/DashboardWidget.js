ag.ns("ag.stats");

(function(){
var
    dashboardWidget = function()
    {
        this.nodify();
        this.caption = this.find(".caption");
    };

dashboardWidget.prototype = Object.create(ag.ui.ctxt.Element.prototype);

dashboardWidget.prototype.nodify = function()
{
    this.extend(this, ag.ui.tool.tpl("agitstats", ".widget"));
};

dashboardWidget.prototype.setCaption = function(text)
{
    this.caption.text(text);
    this.toggleClass("has-caption", !!text);
};

ag.stats.DashboardWidget = dashboardWidget;

})();
