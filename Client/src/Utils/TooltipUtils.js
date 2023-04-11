import * as d3 from 'd3';

export class TooltipUtils {
    static tooltipCountry = d3.select("body").append("div")
        .attr("class", "custom-tooltip-country")
        .style("opacity", 0);

    static tooltipPermCovid = d3.select("body").append("div")
        .attr("class", "custom-tooltipPermCovid")
        .style("opacity", 0);

    static tooltipPermCovid = d3.select("body").append("div")
        .attr("class", "custom-tooltipPermCovid")
        .style("opacity", 0);

    static createTooltip = (tooltipId, tooltipClass) => {
        return d3.select("body").append("div")
            .attr("id", tooltipId)
            .attr("class", tooltipClass)
            .style("opacity", 0);
    }
}
