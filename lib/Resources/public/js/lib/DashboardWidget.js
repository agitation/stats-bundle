ag.ns("ag.stats");

(function(){
var
    dashboardWidget = function()
    {
        this.nodify();
        this.caption = this.find(".caption");
        this.footer = this.find(".footer");
    };

dashboardWidget.prototype = Object.create(jQuery.prototype);

dashboardWidget.prototype.nodify = function()
{
    this.extend(this, ag.ui.tool.tpl("agitstats", ".dashboard-widget"));
};

dashboardWidget.prototype.setCaption = function(text)
{
    this.caption.text(text);
    this.toggleClass("has-caption", !!text);
};

dashboardWidget.prototype.setContent = function(content)
{
    this.footer.before(content);
};

dashboardWidget.prototype.setFooter = function(content)
{
    this.footer.html(content);
};

ag.stats.DashboardWidget = dashboardWidget;

})();
