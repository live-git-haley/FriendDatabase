



 $(document).ready(function() {
  $('#map').usmap({
    'stateSpecificStyles': {
      'AZ': {fill: '#9370DB'}
      
      
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

