var latitude = {
  min: 51.43581847,
  max: 51.5533802,
}
var longitude = {
  min: -0.25285721,
  max: -0.00600815,
}

var time = {
  h: 0,
  m: 0,
}

var table;

function  preload(){
  table = loadTable('location_hours_day0.csv', 'csv', 'header');
}

let businesses = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (var r = 0; r < table.getRowCount(); r++){

    var lat_in = table.getString(r, 2);
    var lon_in = table.getString(r, 3);
    var open = split(table.getString(r, 4), ':');
    var close = split(table.getString(r, 1), ':');

    var lat = map(float(lat_in), latitude.min, latitude.max, windowHeight, 0);
    var lon = map(float(lon_in), longitude.min, longitude.max, 0, windowWidth);

    let b = new Business(lat, lon, open, close);
    businesses.push(b);
  }
}

function draw() {

  background(40);
  runTime(20);

  fill(255);
  textSize(50);
  if(time.h <10){
    text('0' + time.h + ':' + time.m, 10, 50);
  }
  else {
    text(time.h + ':' + time.m, 10, 50);
  }

  for(let bus of businesses){
    if(bus.open()){

      bus.show();
    }
  }
  print(time.h + ' - ' + time.m);
  // print('10 - 30');
  // print(timeLess(10, 30, time.h, time.m));
  print(businesses[0].openH + ' - ' + businesses[0].openM);
  print('')
}

class Business {

  constructor(lat, lon, open, close) {
    this.lat = lat;
    this.lon = lon;
    this.openH = int(open[0]);
    this.openM = int(open[1]);
    this.closeH = int(close[0]);
    this.closeM = int(close[1]);
  }

  show(){
    noStroke();

    fill('#F012BE');
    ellipse(this.lon, this.lat, 5, 5);
  }

  open(){

    var output;

    if (timeLess(this.closeH, this.closeM, this.openH, this.openM) && (timeLess(this.openH, this.openM, time.h, time.m) || timeLess(time.h, time.m, this.closeH, this.closeM)) ) {
      output = true;
    }
    else if ((timeLess(this.openH, this.openM, time.h, time.m) && timeLess(time.h, time.m, this.closeH, this.closeM))) {
      output = true;
    }
    else {
      output = false;
    }
    return output;
  }
}


function runTime(interval_mins){

  if (time.m == 60){
    time.m = 0;
    if (time.h == 24){
      time.h = 0
    }
    else {
      time.h = time.h + 1;
    }
  }
  else {
    time.m = time.m + interval_mins;
  }
}

function timeLess(thisH, thisM, thatH, thatM){

  var output;

  if (thisH < thatH){
    output = true;
  }
  else if (thisH == thatH && thisM < thatM) {
    output = true;
  }
  else {
    output = false;
  }
  return output;
}
