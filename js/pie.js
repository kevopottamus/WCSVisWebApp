/*
    Kehinde Orogbangba
    pie.js
    
    javascript file that defines d3 pie chart
    
*/

var width = 400,
	height = 400,
	radius = 200,
	colors = d3.scale.category20c();

/*
    temporary pieData to display
*/

/*
var piedata = [
	{
		label: "Barot",
		value: 10
	},{
		label: "Gerad",
		value: 30
	},{
		label: "Jennifer",
		value: 70
	}
]
*/
var piedata = pieData


//var piedata = pieData;

var pie = d3.layout.pie()
    .sort(null)
	.value(function(d){
		return d.value;
	})

var arc = d3.svg.arc()
	.outerRadius(radius)

var myChart = d3.select('#pie').append('svg')
	.attr('width', width)
	.attr('height', height)
	.append('g')
		.attr('transform', 'translate('+(width - radius)+ ',' +(height - radius)+')')
		.selectAll('path').data(pie(piedata))
		.enter().append('path')
			.attr('fill', function(d,i){
				return colors(i);
			})
			.attr('d', arc)