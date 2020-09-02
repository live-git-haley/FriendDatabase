


 

function initialize(){
  getLocations("api/friend/locations");
  var allLocations = JSON.parse(localStorage.getItem("allLocations"));
console.log(createStyle(allLocations));

  
}



$(document).ready(function() {

  $('#map').usmap({
    'stateSpecificStyles': { 
      'AZ': {fill: '#9370DB'},
      'NY': {fill: '#9370DB'}
      
      
    },
  
    'click' : function(event, data) {
      $('#alert')
        .text('Click '+data.name+' on map 1')
        .stop()
        .css('backgroundColor', '#ff0')
        .animate({backgroundColor: '#ddd'}, 1000);
    }
  });

$('#over-md').click(function(event){
$('#map').usmap('trigger', 'MD', 'mouseover', event);
});

$('#out-md').click(function(event){
$('#map').usmap('trigger', 'MD', 'mouseout', event);
});
});

function getLocations(url){
  var xhttpList = new XMLHttpRequest();
  xhttpList.open("GET", url, true);

  xhttpList.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
          localStorage.setItem("allLocations", xhttpList.responseText);
      }
  };
  xhttpList.send();
  console.log("Friend locations Stored.");
}


function createStyle(data){
  var value = ""
  for(var i = 0; i < data.length; i++){
	  
	if(i == data.length-1){
		var one = "'" + data[i] + "':" + "{fill: '#9370DB'}";
	}
	else{
    var one = "'" + data[i] + "':" + "{fill: '#9370DB'},";
    value = value  + one;
  }
	value2 = value.slice(0,value.length-1);
  //console.log(value[value.length-1]);
  console.log(value2);
  }
  return(value2);

}