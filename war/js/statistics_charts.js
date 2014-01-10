var Splayers = false;
var Smaps = false;
var Sscores = false;

var Plist;
var Mlist;
var GSlist;

var ret;

document.onload = statistics_charts();

function statistics_charts(){
	
	$.ajax({			
		url : "DataServlet",
		type: "get",
		async: false,
		dataType : "json",
		contentType:"application/json",
		timeout : 150000,
		error : function() {
			console.log("Error: loading failed");			
		},
		success : function(data) {
			ret = data;
		}
	});
	
	if(ret.data_type == "players") {
		Splayers = true;
		Plist = ret.Plist;
	}
	else if(ret.data_type == "maps") {
		Smaps = true;
		Mlist = ret.Mlist;
	}
	else if(ret.data_type == "scores") {
		Sscores = true;
		GSlist = ret.GSlist;
	}
	
	// Load the Visualization API and the piechart package.
	google.load('visualization', '1.0', {'packages':['corechart']});

	// Set a callback to run when the Google Visualization API is loaded.
	google.setOnLoadCallback(drawChart);

	// Callback that creates and populates a data table,
	// instantiates the pie chart, passes in the data and
	// draws it.
}

function drawChart() {

	if(Splayers)
		PlayersStatistics();
	if(Smaps)
		MapsStatistics();
	if(Sscores)
		ScoresStatistics();
}

function PlayersStatistics() {
	
		var m = 0 , f = 0;
		for(var i = 0 ; i < Plist.length ; i++)
			if(Plist[i].sex == "Male")
				m++;
			else
				f++;
		
		// Create the data table.
		var data = new google.visualization.DataTable();
		
		data.addColumn('string', 'Sex');
		data.addColumn('number', 'Age');
		data.addRows([
		              ['Male', m],
		              ['Female', f]
		              ]);

		// Set chart options
		var options = {'title':'Males vs. Females',
				'width':400,
				'height':300};

		// Instantiate and draw our chart, passing in some options.
		var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
		chart.draw(data, options);
}

function MapsStatistics() {
	alert("nothing yet!");
}

function ScoresStatistics() {
	alert("nothing yet!");
}