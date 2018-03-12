ag.ns("ag.stats");

ag.stats.createLegend = function(seriesLabels)
{
    var legend = [];

    Object.keys(seriesLabels).forEach(key => {
        var label = ag.u.tpl("agitstats", ".label");
        label.addClass("ct-label-" + key);
        label.find(".name").text(seriesLabels[key]);
        legend.push(label);
    });

    return legend;
};

ag.stats.numAbbr = function(num)
{
    var suffix = "";


    if (num >= 1000000 || num <= -1000000)
    {
        num = Math.round(num / 100000) / 10;
        suffix = "M";
    }
    else if (num >= 1000 || num <= -1000)
    {
        num = Math.round(num / 100) / 10;
        suffix = "k";
    }

    return ag.u.numberFormat(num, 1, true) + (suffix ? "\u2009" + suffix : "");
};
