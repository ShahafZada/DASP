var Splayers = false;
var Smaps = false;
var Sscores = false;

var Plist;
var Mlist;
var GSlist;

var ret;

var td;
var tr;
var div;
var options;

var countyNames=[];
var countycount=[];

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
	
	if(Splayers)
		PlayersStatistics();
	if(Smaps)
		MapsStatistics();
	if(Sscores)
		ScoresStatistics();
}

function PlayersStatistics() {
	
	// Load the Visualization API and the piechart package.
	google.load('visualization', '1.0', {'packages':['corechart']});

	// Set a callback to run when the Google Visualization API is loaded.
	google.setOnLoadCallback(drawPlayerCharts);

	// Callback that creates and populates a data table,
	// instantiates the pie chart, passes in the data and
	// draws it.
	
	 google.load('visualization', '1', {'packages': ['geochart']});
     google.setOnLoadCallback(drawRegionsMap);
}

function drawPlayerCharts(){
	var males = 0 , females = 0;
	
	var malesEducations = [0,0,0,0,0,0];
	var femalesEducations = [0,0,0,0,0,0];
	
	for(var i = 0 ; i < Plist.length ; i++)
		if(Plist[i].sex == "Male") {
			males++;
			switch( Plist[i].education ) {
			case "Kindergarten":		malesEducations[0]++;break;
			case "Elementary school":	malesEducations[1]++;break;
			case "High School":			malesEducations[2]++;break;
			case "Student":				malesEducations[3]++;break;
			case "Bachelor Degree":		malesEducations[4]++;break;
			case "Masters Degree":		malesEducations[5]++;break;
			}
		}
		else {
			females++;
			switch( Plist[i].education ) {
			case "Kindergarten":		femalesEducations[0]++;break;
			case "Elementary school":	femalesEducations[1]++;break;
			case "High School":			femalesEducations[2]++;break;
			case "Student":				femalesEducations[3]++;break;
			case "Bachelor Degree":		femalesEducations[4]++;break;
			case "Masters Degree":		femalesEducations[5]++;break;
			}
		}
	
	// Create the data1 table.
	var data1 = new google.visualization.DataTable();
	
	data1.addColumn('string', 'Sex');
	data1.addColumn('number', 'Age');
	data1.addRows([
	              ['Male', males],
	              ['Female', females]
	              ]);

	// Set chart options
	options = {'title':'Males vs. Females',
			'width':400,
			'height':300};
	
	AddChartToHtml( data1 , 1);
	
	var data2 = new google.visualization.DataTable();
	
	data2.addColumn('string', 'Education');
	data2.addColumn('number', 'count');
	data2.addRows([
	              ['Kindergarten',		 malesEducations[0]],
	              ['Elementary school',	 malesEducations[1]],
	              ['High School',		 malesEducations[2]],
	              ['Student',			 malesEducations[3]],
	              ['Bachelor Degree',	 malesEducations[4]],
	              ['Masters Degree', 	 malesEducations[5]],
	              ]);

	// Set chart options
	options = {'title':'Education of Males',
			'width':400,
			'height':300};
	
	AddChartToHtml( data2 , 2);
	
	var data3 = new google.visualization.DataTable();
	
	data3.addColumn('string', 'Education');
	data3.addColumn('number', 'count');
	data3.addRows([
	              ['Kindergarten',		 femalesEducations[0]],
	              ['Elementary school',	 femalesEducations[1]],
	              ['High School',		 femalesEducations[2]],
	              ['Student',			 femalesEducations[3]],
	              ['Bachelor Degree',	 femalesEducations[4]],
	              ['Masters Degree', 	 femalesEducations[5]],
	              ]);

	// Set chart options
	options = {'title':'Education of Females',
			'width':400,
			'height':300};

	AddChartToHtml( data3 , 3);
}

function MapsStatistics() {
	alert("nothing yet!");
}

function ScoresStatistics() {
	alert("nothing yet!");
}

function AddChartToHtml( data , i ) {
	
	td = document.createElement('td');
	td.id = "chart_td" + i ;
	document.getElementById('charts_row').appendChild(td);
	
	div = document.createElement('div');
	div.id = "chart_div" + i;
	document.getElementById('chart_td'+i).appendChild(div);

	// Instantiate and draw our chart, passing in some options.
	var chart = new google.visualization.PieChart(document.getElementById('chart_td'+i));
	chart.draw(data, options);	
}


function drawRegionsMap() {
	
	div = document.createElement('div');
	div.id = "Mapchart" ;
	document.getElementById('MapChart_div').appendChild(div);
	
	var c=[];
	loadArr(c);
	
    var data = google.visualization.arrayToDataTable(c);

      var options = {};

      var chart = new google.visualization.GeoChart(document.getElementById('Mapchart'));
      chart.draw(data, options);
  };
  
function loadArr(arr) {
	
	arr.push( ['Country', 'Number of Players'] );
	addNamesToArr();
	countCountries();
	for(var i = 0 ; i < Plist.length ; i++) {
		var a=[];
		a.push(Plist[i].country);
		a.push( countycount[ countyNames.indexOf(Plist[i].country) ] );
		arr.push(a);
	}
}

function RemoveChrtsFromHtml( NumOfCharts ) {
	
	for( var i = 0 ; i < NumOfCharts ; i++ ) {
		document.getElementById('chart_td'+i).remove('chart_div'+i);
		document.getElementById('charts_row').remove('chart_td'+i);
	}
}

function countCountries()
{
	for(var i = 0 ; i < 247 ; i ++)
		countycount.push(0);
	
	for(var i = 0 ; i < Plist.length ; i++)
		countycount[ countyNames.indexOf(Plist[i].country) ]++;
}

function addNamesToArr() {	
	countyNames.push("Afghanistan");
	countyNames.push("Albania");
	countyNames.push("Algeria");
	countyNames.push("American Samoa");
	countyNames.push("Andorra");
	countyNames.push("Angola");
	countyNames.push("Anguilla");
	countyNames.push("Antigua &amp; Barbuda");
	countyNames.push("Argentina");
	countyNames.push("Armenia");
	countyNames.push("Aruba");
	countyNames.push("Australia");
	countyNames.push("Austria");
	countyNames.push("Azerbaijan");
	countyNames.push("Bahamas");
	countyNames.push("Bahrain");
	countyNames.push("Bangladesh");
	countyNames.push("Barbados");
	countyNames.push("Belarus");
	countyNames.push("Belgium");
	countyNames.push("Belize");
	countyNames.push("Benin");
	countyNames.push("Bermuda");
	countyNames.push("Bhutan");
	countyNames.push("Bolivia");
	countyNames.push("Bonaire");
	countyNames.push("Bosnia &amp; Herzegovina");
	countyNames.push("Botswana");
	countyNames.push("Brazil");
	countyNames.push("British Indian Ocean Ter");
	countyNames.push("Brunei");
	countyNames.push("Bulgaria");
	countyNames.push("Burkina Faso");
	countyNames.push("Burundi");
	countyNames.push("Cambodia");
	countyNames.push("Cameroon");
	countyNames.push("Canada");
	countyNames.push("Canary Islands");
	countyNames.push("Cape Verde");
	countyNames.push("Cayman Islands");
	countyNames.push("Central African Republic");
	countyNames.push("Chad");
	countyNames.push("Channel Islands");
	countyNames.push("Chile");
	countyNames.push("China");
	countyNames.push("Christmas Island");
	countyNames.push("Cocos Island");
	countyNames.push("Colombia");
	countyNames.push("Comoros");
	countyNames.push("Congo");
	countyNames.push("Cook Islands");
	countyNames.push("Costa Rica");
	countyNames.push("Cote D'Ivoire");
	countyNames.push("Croatia");
	countyNames.push("Cuba");
	countyNames.push("Curacao");
	countyNames.push("Cyprus");
	countyNames.push("Czech Republic");
	countyNames.push("Denmark");
	countyNames.push("Djibouti");
	countyNames.push("Dominica");
	countyNames.push("Dominican Republic");
	countyNames.push("East Timor");
	countyNames.push("Ecuador");
	countyNames.push("Egypt");
	countyNames.push("El Salvador");
	countyNames.push("Equatorial Guinea");
	countyNames.push("Eritrea");
	countyNames.push("Estonia");
	countyNames.push("Ethiopia");
	countyNames.push("Falkland Islands");
	countyNames.push("Faroe Islands");
	countyNames.push("Fiji");
	countyNames.push("Finland");
	countyNames.push("France");
	countyNames.push("French Guiana");
	countyNames.push("French Polynesia");
	countyNames.push("French Southern Ter");
	countyNames.push("Gabon");
	countyNames.push("Gambia");
	countyNames.push("Georgia");
	countyNames.push("Germany");
	countyNames.push("Ghana");
	countyNames.push("Gibraltar");
	countyNames.push("Great Britain");
	countyNames.push("Greece");
	countyNames.push("Greenland");
	countyNames.push("Grenada");
	countyNames.push("Guadeloupe");
	countyNames.push("Guam");
	countyNames.push("Guatemala");
	countyNames.push("Guinea");
	countyNames.push("Guyana");
	countyNames.push("Haiti");
	countyNames.push("Hawaii");
	countyNames.push("Honduras");
	countyNames.push("Hong Kong");
	countyNames.push("Hungary");
	countyNames.push("Iceland");
	countyNames.push("India");
	countyNames.push("Indonesia");
	countyNames.push("Iran");
	countyNames.push("Iraq");
	countyNames.push("Ireland");
	countyNames.push("Isle of Man");
	countyNames.push("Israel");
	countyNames.push("Italy");
	countyNames.push("Jamaica");
	countyNames.push("Japan");
	countyNames.push("Jordan");
	countyNames.push("Kazakhstan");
	countyNames.push("Kenya");
	countyNames.push("Kiribati");
	countyNames.push("Korea North");
	countyNames.push("Korea South");
	countyNames.push("Kuwait");
	countyNames.push("Kyrgyzstan");
	countyNames.push("Laos");
	countyNames.push("Latvia");
	countyNames.push("Lebanon");
	countyNames.push("Lesotho");
	countyNames.push("Liberia");
	countyNames.push("Libya");
	countyNames.push("Liechtenstein");
	countyNames.push("Lithuania");
	countyNames.push("Luxembourg");
	countyNames.push("Macau");
	countyNames.push("Macedonia");
	countyNames.push("Madagascar");
	countyNames.push("Malaysia");
	countyNames.push("Malawi");
	countyNames.push("Maldives");
	countyNames.push("Mali");
	countyNames.push("Malta");
	countyNames.push("Marshall Islands");
	countyNames.push("Martinique");
	countyNames.push("Mauritania");
	countyNames.push("Mauritius");
	countyNames.push("Mayotte");
	countyNames.push("Mexico");
	countyNames.push("Midway Islands");
	countyNames.push("Moldova");
	countyNames.push("Monaco");
	countyNames.push("Mongolia");
	countyNames.push("Montserrat");
	countyNames.push("Morocco");
	countyNames.push("Mozambique");
	countyNames.push("Myanmar");
	countyNames.push("Nambia");
	countyNames.push("Nauru");
	countyNames.push("Nepal");
	countyNames.push("Netherland Antilles");
	countyNames.push("Netherlands (Holland, Europe)");
	countyNames.push("Nevis");
	countyNames.push("New Caledonia");
	countyNames.push("New Zealand");
	countyNames.push("Nicaragua");
	countyNames.push("Niger");
	countyNames.push("Nigeria");
	countyNames.push("Niue");
	countyNames.push("Norfolk Island");
	countyNames.push("Norway");
	countyNames.push("Oman");
	countyNames.push("Pakistan");
	countyNames.push("Palau Island");
	countyNames.push("Palestine");
	countyNames.push("Panama");
	countyNames.push("Papua New Guinea");
	countyNames.push("Paraguay");
	countyNames.push("Peru");
	countyNames.push("Philippines");
	countyNames.push("Pitcairn Island");
	countyNames.push("Poland");
	countyNames.push("Portugal");
	countyNames.push("Puerto Rico");
	countyNames.push("Qatar");
	countyNames.push("Republic of Montenegro");
	countyNames.push("Republic of Serbia");
	countyNames.push("Reunion");
	countyNames.push("Romania");
	countyNames.push("Russia");
	countyNames.push("Rwanda");
	countyNames.push("St Barthelemy");
	countyNames.push("St Eustatius");
	countyNames.push("St Helena");
	countyNames.push("St Kitts-Nevis");
	countyNames.push("St Lucia");
	countyNames.push("St Maarten");
	countyNames.push("St Pierre &amp; Miquelon");
	countyNames.push("St Vincent &amp; Grenadines");
	countyNames.push("Saipan");
	countyNames.push("Samoa");
	countyNames.push("Samoa American");
	countyNames.push("San Marino");
	countyNames.push("Sao Tome &amp; Principe");
	countyNames.push("Saudi Arabia");
	countyNames.push("Senegal");
	countyNames.push("Serbia");
	countyNames.push("Seychelles");
	countyNames.push("Sierra Leone");
	countyNames.push("Singapore");
	countyNames.push("Slovakia");
	countyNames.push("Slovenia");
	countyNames.push("Solomon Islands");
	countyNames.push("Somalia");
	countyNames.push("South Africa");
	countyNames.push("Spain");
	countyNames.push("Sri Lanka");
	countyNames.push("Sudan");
	countyNames.push("Suriname");
	countyNames.push("Swaziland");
	countyNames.push("Sweden");
	countyNames.push("Switzerland");
	countyNames.push("Syria");
	countyNames.push("Tahiti");
	countyNames.push("Taiwan");
	countyNames.push("Tajikistan");
	countyNames.push("Tanzania");
	countyNames.push("Thailand");
	countyNames.push("Togo");
	countyNames.push("Tokelau");
	countyNames.push("Tonga");
	countyNames.push("Trinidad &amp; Tobago");
	countyNames.push("Tunisia");
	countyNames.push("Turkey");
	countyNames.push("Turkmenistan");
	countyNames.push("Turks &amp; Caicos Is");
	countyNames.push("Tuvalu");
	countyNames.push("Uganda");
	countyNames.push("Ukraine");
	countyNames.push("United Arab Emirates");
	countyNames.push("United Kingdom");
	countyNames.push("United States of America");
	countyNames.push("Uruguay");
	countyNames.push("Uzbekistan");
	countyNames.push("Vanuatu");
	countyNames.push("Vatican City State");
	countyNames.push("Venezuela");
	countyNames.push("Vietnam");
	countyNames.push("Virgin Islands (Brit)");
	countyNames.push("Virgin Islands (USA)");
	countyNames.push("Wake Island");
	countyNames.push("Wallis &amp; Futana Is");
	countyNames.push("Yemen");
	countyNames.push("Zaire");
	countyNames.push("Zambia");
	countyNames.push("Zimbabwe");
}