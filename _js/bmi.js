//geting information from JSON File when link loads up
$(document).ready(function() {
    $.getJSON("bmi.json", function(data){
		//getting header and logo from JSON File
		$("#header1").html("<h1 class='ui-title ui-shadow'> <img src='"+ data.calc.logo +"' height='40' width='40'> "+ data.calc.name + "</h1>");
		$("#header2").html("<h1 class='ui-title ui-shadow'> <img src='"+ data.calc.logo +"' height='40' width='40'> "+ data.calc.name + "</h1>");
	    $("#header3").html("<h1 class='ui-title ui-shadow'> <img src='"+ data.calc.logo +"' height='40' width='40'> "+ data.calc.name + "</h1>");
		$("#header4").html("<h1 class='ui-title ui-shadow'> <img src='"+ data.calc.logo +"' height='40' width='40'> "+ data.calc.name + "</h1>");
		$("#header5").html("<h1 class='ui-title ui-shadow'> <img src='"+ data.calc.logo +"' height='40' width='40'> "+ data.calc.name + "</h1>");
		$("#header6").html("<h1 class='ui-title ui-shadow'> <img src='"+ data.calc.logo +"' height='40' width='40'> "+ data.calc.name + "</h1>");
		//getting footer from JSON File
		$("#footer1").html("<h4 align='center'>"+ data.calc.right + "</h4>");
		$("#footer2").html("<h4 align='center'>"+ data.calc.right + "</h4>");
		$("#footer3").html("<h4 align='center'>"+ data.calc.right + "</h4>");
		$("#footer4").html("<h4 align='center'>"+ data.calc.right + "</h4>");
		$("#footer5").html("<h4 align='center'>"+ data.calc.right + "</h4>");
		$("#footer6").html("<h4 align='center'>"+ data.calc.right + "</h4>");
		//getting navigation text from JSON File
		$("#home1").html(data.calc.nav1);
		$("#cal1").html(data.calc.nav2);
		$("#abt").html(data.calc.nav3);
		$("#loc").html(data.calc.nav4);
		$("#con").html(data.calc.nav5);
		//getting "about" info from JSON File
		
		$("#abt1").html("<h4 align='center'>About BMI</h4>"+data.calc.about);
		//getting contact information from JSON File
		 $("#contact").html("<h4 align='center'>"+ data.calc.name1 + "</h4>");
		 $("#contact").append("<h5 align='center'>"+ data.calc.email1 + "</h5>");
		 $("#contact").append("<h4 align='center'>"+ data.calc.name2 + "</h4>");
		 $("#contact").append("<h5 align='center'>"+ data.calc.email2 + "</h5>");
		 $("#contact").append("<h4 align='center'>"+ data.calc.name3 + "</h4>");
		 $("#contact").append("<h5 align='center'>"+ data.calc.email3 + "</h5>");
		 
		
	});
});


//function to find BMI
function calcBMI() 
{	
	var z = document.forms["myForm"]["weight"].value;
    //checking that weight entered is in digits only
	if(!z.match(/^\d+$/))
        {
        alert("Please enter digits for your weight! (Allowed input:0-9)")
        }
	else 
		{	
		//getting last resultant value of BMI from local Storage
		$("#last").html("<b>Last Recorded BMI : </b>"+localStorage.getItem("result"));
		//variable for weight
		var w = document.getElementById("weight").value * 1;
	//variable for height in feet
		var feet= document.getElementById("feet").value * 1;
	//variable for height in inches
		var inch = document.getElementById("inch").value * 1;
		feet_in_inches = feet* 12;
		h = feet_in_inches + inch;
	//formula to calculate BMI
		displaybmi = (Math.round((w * 703) / (h * h)));
		var chkr = true;
		if ( (w <= 10) || (w >= 999) || (h <= 36) || (h >= 108) ) 
			{	alert ("Invalid Weight. Please check and re-enter it between 10 to 999");
				chkr = false;
			}
		else
	// redirecting to result page if calculator page validates
			window.location.href="#cal2";
		if (chkr) 
		{	
			if (displaybmi <19){
				 $("#comment").html("Underweight");
			
			     // bar chart data
					var barData = {
						labels : ["Underweight","Desirable","Health risks","Obese","Extremely obese"],
						datasets : [
							{
							fillColor : "#F06715",
							strokeColor : "#48A4D1",
							data : [displaybmi,0,0,0,0]
							}
							]
					}
					
			}
					
			if (displaybmi >=19 && displaybmi <=25){
			 		$("#comment").html("Desirable");
			      // bar chart data
					var barData = {
						labels : ["Underweight","Desirable","Health risks","Obese","Extremely obese"],
						datasets : [
							{
							fillColor : "#94F92B",
							strokeColor : "#48A4D1",
							data : [0,displaybmi,0,0,0]
							}
							]
						}
					
		
				}
			if (displaybmi >=26 && displaybmi <=29){
					$("#comment").html("Health risks");
				      // bar chart data
					var barData = {
						labels : ["Underweight","Desirable","Health risks","Obese","Extremely obese"],
						datasets : [
							{
							fillColor : "#E58527",
							strokeColor : "#48A4D1",
							data : [0,0,displaybmi,0,0]
							}
							]
						}
			
				}
			if (displaybmi >=30 && displaybmi <=40){
					$("#comment").html("Obese");
							  // bar chart data
					var barData = {
						labels : ["Underweight","Desirable","Health risks","Obese","Extremely obese"],
						datasets : [
							{
							fillColor : "#E58527",
							strokeColor : "#48A4D1",
							data : [0,0,0,displaybmi,0]
							}
							]
						}
					
				}
			if (displaybmi >40){
					$("#comment").html("Extremely obese");
							  // bar chart data
					var barData = {
						labels : ["Underweight","Desirable","Health risks","Obese","Extremely obese"],
						datasets : [
							{
							fillColor : "#F14309",
							strokeColor : "#48A4D1",
							data : [0,0,0,0,displaybmi]
							}
							]
						}
			
		}	
		//drawing a graph in id="graph1
			$("#graph1").html("");
			$("#graph1").html("<canvas id='graph' width='280' height='200'></canvas>");
			var val = document.getElementById("graph").getContext("2d");
			new Chart(val).Bar(barData);
			//displaying BMI value
			$("#answer").html(displaybmi);
			
		//storing the result using Local Storage	
		if (typeof(Storage) != "undefined") {
    	// Store
    	localStorage.setItem("result", displaybmi);
    
		}
 	else {
    alert("Local storage not supported");
		}
							
	}
	return chkr;
	}
}

