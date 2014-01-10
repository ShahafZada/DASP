document.onload = statistics_charts();

function statistics_charts(){

	var DataType=["players","maps","scores"];

	var ret=[];
	
	var Male = 0 ;var Female = 0;

	$.ajax({
		url : "GetData",
		async: false,
		data : { data_type : DataType[0] },
		error : function(data) {
			console.log("Error: ", data);
		}  ,
		type : "post",
		timeout : 30000
	});

	$.ajax({			
		url : "GetData",
		type: "get",
		async: false,
		dataType : "json",
		contentType:"application/json",
		timeout : 150000,
		error : function() {
			console.log("Error: loading the "+DataType[0]+" failed");			
		},
		success : function(data) {
			ret = data;
		}
	});
	
	for(var i = 0 ; i < ret.length ; i++){
		if(ret[i].sex === "Male")
			Male++;
		else
			Female++;
	}

	// Load the Visualization API and the piechart package.
	google.load('visualization', '1.0', {'packages':['corechart']});

	// Set a callback to run when the Google Visualization API is loaded.
	google.setOnLoadCallback(drawChart);

	// Callback that creates and populates a data table,
	// instantiates the pie chart, passes in the data and
	// draws it.
	function drawChart() {

		// Create the data table.
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Sex');
		data.addColumn('number', 'Age');
		data.addRows([
		              ['Male', Male],
		              ['Female', Female]
		              ]);

		// Set chart options
		var options = {'title':'Males vs. Females',
				'width':400,
				'height':300};

		// Instantiate and draw our chart, passing in some options.
		var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
		chart.draw(data, options);
	}
}