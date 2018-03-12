ag.ns("ag.stats");

(function(){
var
    dashboardContent = function()
    {
        this.nodify();
        this.header = this.find("h3");
        this.elem = this.find(".elem");
    };

dashboardContent.prototype = Object.create(jQuery.prototype);

dashboardContent.prototype.nodify = function()
{
    this.extend(this, ag.u.tpl("agitstats", ".common.content"));
};

dashboardContent.prototype.setHeader = function(text)
{
    this.header.text(text);
};

dashboardContent.prototype.setElement = function(elem)
{
    this.elem.html(elem);
};

ag.stats.DashboardContent = dashboardContent;

})();
