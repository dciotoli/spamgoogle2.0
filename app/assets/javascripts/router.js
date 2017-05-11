function rating(data){
  var sumIncline=0;
  for(i = 1;i<data.length;i++){
    if(data[i].elevation - data[i-1].elevation>0){
      sumIncline+=Math.pow((data[i].elevation-data[i-1].elevation)*6,2);
    }
  }
  return sumIncline;
}

//
//
//
// google.load('visualization', '1', {packages: ['linechart']});

var map;
var directionsService;
var directionsDisplay;
var currLocation;
var elevationService;
var lastRequest;
var tempID=0;
var ratings=[];
var datas=[];
var espans=[];
function saveLocation(position){
  currLocation= {lat: position.coords.latitude, lng: position.coords.longitude};
  initMap();
}
function getTopography(){
  if(tempID==-1){
    ratings=[];
    datas=[];
    while(espans.length){
      espans.pop().remove();
    }
  }
  console.log(lastRequest.routes.length);
  console.log(tempID);
  if(tempID>=lastRequest.routes.length){
    tempID=0;
    return;
  }
  elevationService.getElevationAlongPath({
    'path':lastRequest.routes[tempID].overview_path,
    'samples': 100    //Don't know what the limit is for samples.  seems to be flat, which means longer paths will have lower accuracy
  },showElevation);
}
function showElevation(elevations, status){
  if(status!=='OK'){
    var error=document.createElement("p");
    document.getElementById('dynamic').appendChild(error);
    return;
  } else if(status==='OK'){
    var numChilds = document.getElementsByClassName('adp-listinfo')[tempID].childNodes.length;
    var ttemp = document.getElementsByClassName('adp-listinfo')[tempID].childNodes[numChilds-1];

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Sample');
    data.addColumn('number', 'Elevation');
    for (var i = 0; i < elevations.length; i++) {
      data.addRow(['', elevations[i].elevation]);
    }
    datas.push(data);


    ratings.push(rating(elevations)/100);
    ttemp = document.getElementsByClassName('adp-listinfo')[tempID].childNodes[numChilds-2];
    var espan = document.createElement('span');
    espan.innerHTML=" <b>Elevation Rating: </b>"+ratings[tempID].toFixed(3);
    espan.setAttribute("data-toggle","modal");
    espan.setAttribute("data-target","#elevationChart");
    espan.setAttribute("href","#elevationChart");
    espan.setAttribute("onClick","drawModal("+tempID+")");
    ttemp.appendChild(espan);
    espans.push(espan);
    tempID++;
    getTopography();
  }
}
function drawModal(index){
  var body=document.getElementById('modal-body');
  while(body.childNodes.length>0){
    body.childNodes[0].remove();
  }
  var chartContainer = document.createElement('div');
  chartContainer.width = $('#modal-body').parent().parent().width() - 50;
  body.appendChild(chartContainer);
  var chart = new google.visualization.LineChart(chartContainer);
  chart.draw(datas[index], {
    height: 150,
    width: $('#modal-body').parent().parent().width() - 50,
    legend: 'none',
    titleY: 'Elevation (m)',
    curveType: 'function'
  });
  $('#elevationChart').modal();
}
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(saveLocation);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function initMap() {
  directionsService= new google.maps.DirectionsService;
  directionsDisplay= new google.maps.DirectionsRenderer;
  elevationService= new google.maps.ElevationService;
  var position = getLocation();
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: currLocation
  });
  var marker = new google.maps.Marker({
    position: currLocation,
    map: map
  });
  directionsDisplay.setMap(map);

  var onChangeHandler = function() {
    calculateAndDisplayRoute();
  };
  document.getElementById('start').addEventListener('change', onChangeHandler);
  document.getElementById('end').addEventListener('change', onChangeHandler);
}

function calculateAndDisplayRoute() {
  var panel=document.getElementsByClassName("Panel");
  while(panel[0]){
    panel[0].remove();
  }
  var panel=document.createElement("div");
  panel.classList.add('Panel');
  document.getElementById('dynamic').appendChild(panel);
  directionsDisplay.setPanel(panel);
  var start=document.getElementById('start').value;
  var end=document.getElementById('end').value;
  if(start === "Current Location"){
    start = currLocation;
  }
  if(end === "Current Location"){
    end = currLocation;
  }
  directionsService.route({
    origin: start,
    destination: end,
    travelMode: 'BICYCLING',
    provideRouteAlternatives: true
  }, function(response, status) {
    if (status === 'OK') {
      lastRequest=response;
      directionsDisplay.setDirections(lastRequest);
      getTopography();
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
